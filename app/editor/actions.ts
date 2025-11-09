'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { exec, spawn } from 'child_process';
import { promisify } from 'util';
import matter from 'gray-matter';
import streamLogger from '@/app/editor/lib/logger';

const execAsync = promisify(exec);

export interface PostMetadata {
  title: string;
  date: string;
  author: string;
  description: string;
  tags: string[];
}

export async function loadMDXFile(slug: string): Promise<{ content: string; metadata: PostMetadata } | null> {
  try {
    const filePath = path.join(process.cwd(), 'app', 'blog', slug, 'page.mdx');
    const fileContent = await fs.readFile(filePath, 'utf-8');

    const { data, content } = matter(fileContent);

    return {
      content,
      metadata: {
        title: data.title || '',
        date: data.date || '',
        author: data.author || '',
        description: data.description || '',
        tags: data.tags || [],
      },
    };
  } catch (error) {
    console.error('Error loading MDX file:', error);
    return null;
  }
}

export async function listMDXFiles(): Promise<string[]> {
  try {
    const blogDir = path.join(process.cwd(), 'app', 'blog');
    const entries = await fs.readdir(blogDir, { withFileTypes: true });

    const slugs = await Promise.all(
      entries
        .filter(entry => entry.isDirectory())
        .map(async (entry) => {
          const mdxPath = path.join(blogDir, entry.name, 'page.mdx');
          try {
            await fs.access(mdxPath);
            return entry.name;
          } catch {
            return null;
          }
        })
    );

    return slugs.filter((slug): slug is string => slug !== null);
  } catch (error) {
    console.error('Error listing MDX files:', error);
    return [];
  }
}

export async function saveMDXFile(
  slug: string,
  content: string,
  metadata: PostMetadata
): Promise<{ success: boolean; error?: string }> {
  try {
    // Create frontmatter
    const frontmatter = matter.stringify(content, {
      title: metadata.title,
      date: metadata.date,
      author: metadata.author,
      description: metadata.description,
      tags: metadata.tags,
    });

    // Create directory if it doesn't exist
    const blogDir = path.join(process.cwd(), 'app', 'blog', slug);
    await fs.mkdir(blogDir, { recursive: true });

    // Write file
    const filePath = path.join(blogDir, 'page.mdx');
    await fs.writeFile(filePath, frontmatter, 'utf-8');

    return { success: true };
  } catch (error) {
    console.error('Error saving MDX file:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function publishToGit(
  slug: string,
  content: string,
  metadata: PostMetadata
): Promise<{ success: boolean; error?: string }> {
  try {
    // First save the file
    const saveResult = await saveMDXFile(slug, content, metadata);
    if (!saveResult.success) {
      return saveResult;
    }

    // Git operations
    const filePath = `app/blog/${slug}/page.mdx`;

    // Add the file
    await execAsync(`git add ${filePath}`);

    // Commit
    const commitMessage = `Add blog post: ${metadata.title}`;
    await execAsync(`git commit -m "${commitMessage}"`);

    // Push to origin main
    await execAsync('git push origin main');

    return { success: true };
  } catch (error) {
    console.error('Error publishing to git:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Git operation failed',
    };
  }
}

/**
 * Execute Claude Code CLI with streaming JSON output (JSONL format)
 * Streams logs real-time via WebSocket and extracts the final response
 * @param prompt - The prompt to send to Claude
 * @param operation - Operation name for logging
 * @param projectPath - Optional project path to set as working directory
 */
async function executeWithStreaming(
  prompt: string,
  operation: string,
  projectPath?: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const effectiveProjectPath = projectPath || process.cwd();

    if (effectiveProjectPath) {
      streamLogger.info(`[STREAMING] ${operation} - Claude đang phân tích... (project: ${effectiveProjectPath})`);
    } else {
      streamLogger.info(`[STREAMING] ${operation} - Claude đang phân tích...`);
    }

    const spawnOptions: any = {
      stdio: ['pipe', 'pipe', 'pipe'],
    };

    if (effectiveProjectPath) {
      spawnOptions.cwd = effectiveProjectPath;
      streamLogger.debug(`Setting working directory to: ${effectiveProjectPath}`);
    }

    const child = spawn('claude', ['-p', prompt, '--output-format', 'stream-json'], spawnOptions);

    let buffer = '';
    const jsonObjects: any[] = [];
    let stderrBuffer = '';

    // Set timeout
    const timeout = setTimeout(() => {
      child.kill();
      reject(new Error(`Claude Code timeout after 30s for ${operation}`));
    }, 30000);

    // Handle stdout stream - real-time processing
    if (child.stdout) {
      child.stdout.setEncoding('utf8');
      child.stdout.on('data', (chunk: string) => {
        buffer += chunk;

        // Split by newline to get complete lines
        const lines = buffer.split('\n');
        // Keep the last incomplete line in buffer
        buffer = lines.pop() || '';

        // Process each complete line
        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine) continue;

          try {
            const jsonObj = JSON.parse(trimmedLine);
            jsonObjects.push(jsonObj);

            // Log every JSON line in the stream real-time
            streamLogger.streamJson(operation, jsonObj);
          } catch (parseError) {
            // Log raw line if JSON parse fails
            streamLogger.debug(`[STREAM_JSON] ${operation} (parse error)`, trimmedLine);
          }
        }
      });
    }

    // Handle stderr
    if (child.stderr) {
      child.stderr.setEncoding('utf8');
      child.stderr.on('data', (chunk: string) => {
        stderrBuffer += chunk;
      });
    }

    // Handle process completion
    child.on('close', (exitCode: number | null) => {
      clearTimeout(timeout);

      // Process any remaining data in buffer
      if (buffer.trim()) {
        try {
          const jsonObj = JSON.parse(buffer.trim());
          jsonObjects.push(jsonObj);
          streamLogger.streamJson(operation, jsonObj);
        } catch {
          // Ignore parse errors for incomplete final buffer
        }
      }

      if (exitCode !== 0) {
        reject(new Error(`Claude Code exited with code ${exitCode}: ${stderrBuffer}`));
        return;
      }

      // Extract final response from stream
      let finalResponse = jsonObjects.find(
        (obj) => obj.type === 'response' || obj.type === 'message'
      );

      // If not found, look for the last object with 'text' or 'content' (from end to beginning)
      if (!finalResponse) {
        for (let i = jsonObjects.length - 1; i >= 0; i--) {
          const obj = jsonObjects[i];
          if (obj.text || obj.content || obj.response) {
            finalResponse = obj;
            break;
          }
        }
      }

      // Fallback: use the last valid JSON object
      if (!finalResponse && jsonObjects.length > 0) {
        finalResponse = jsonObjects[jsonObjects.length - 1];
      }

      // Log summary
      streamLogger.success(`[COMPLETE] ${operation} | Received ${jsonObjects.length} messages`);

      // Extract text from final response
      if (finalResponse) {
        const result =
          finalResponse.text ||
          finalResponse.content ||
          finalResponse.response ||
          JSON.stringify(finalResponse);
        resolve(result);
      } else {
        streamLogger.warning(`No valid response found in stream for ${operation}`);
        resolve('');
      }
    });

    // Handle errors
    child.on('error', (error: Error) => {
      clearTimeout(timeout);
      reject(error);
    });
  });
}

export async function generateWithClaude(
  prompt: string,
  visualizationType: string,
  currentContent: string
): Promise<{ success: boolean; generatedContent?: string; error?: string }> {
  try {
    // Check if we're in development mode and Claude CLI is available
    const isDevelopment = process.env.NODE_ENV === 'development';

    if (isDevelopment) {
      try {
        streamLogger.info('[GENERATE] Starting Claude Code generation with streaming...');

        const enhancedPrompt = `${prompt}

Current content context:
${currentContent.substring(0, 500)}...

Generate MDX content with a ${visualizationType} visualization using React Flow.
Include necessary imports and a complete, working React Flow component.`;

        // Use streaming execution in development mode
        const generatedContent = await executeWithStreaming(
          enhancedPrompt,
          'generate-mdx-content',
          process.cwd()
        );

        if (generatedContent && generatedContent.trim()) {
          streamLogger.complete('generate-mdx-content', {
            length: generatedContent.length,
            visualizationType,
          });

          return {
            success: true,
            generatedContent,
          };
        } else {
          streamLogger.warning('[GENERATE] Empty response from Claude, falling back to template');
          // Fall through to template generation
        }
      } catch (claudeError) {
        streamLogger.error(
          '[GENERATE] Claude Code execution failed, falling back to template',
          claudeError
        );
        // Fall through to template generation
      }
    }

    // Fallback: Template generation (production or if Claude CLI fails)
    streamLogger.info('[GENERATE] Using template generation (production mode or fallback)');

    const template = `
## Generated Section

import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';

<div className="my-8">
  <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-4 rounded-t-lg">
    <h3 className="text-xl font-bold">${visualizationType} Visualization</h3>
  </div>
  <div className="border border-gray-200 dark:border-gray-700 rounded-b-lg p-4">
    {/* Add your React Flow component here */}
    <p>Generated content will appear here when Claude Code integration is complete.</p>
    <p className="text-sm text-gray-500 mt-2">
      💡 Run in development mode with Claude CLI installed to enable AI generation with real-time streaming.
    </p>
  </div>
</div>

### Key Concepts

1. **Think**: Break down the problem into manageable parts
2. **Explain**: Provide clear, accessible explanations
3. **Visualize**: Create interactive diagrams to enhance understanding

`;

    return {
      success: true,
      generatedContent: template,
    };
  } catch (error) {
    streamLogger.error('Error generating content:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Generation failed',
    };
  }
}
