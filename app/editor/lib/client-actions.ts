// Client-side actions for the editor
// These replace server actions since we're using static export

export interface PostMetadata {
  title: string;
  date: string;
  author: string;
  description: string;
  tags: string[];
}

// Note: These are client-side placeholders
// In development, you'd use API routes or a local dev server
// For production GitHub Pages, these would download files instead of saving

export async function downloadMDXFile(
  slug: string,
  content: string,
  metadata: PostMetadata
): Promise<{ success: boolean; error?: string }> {
  try {
    // Create frontmatter
    const frontmatter = `---
title: "${metadata.title}"
date: "${metadata.date}"
author: "${metadata.author}"
description: "${metadata.description}"
tags: [${metadata.tags.map(tag => `"${tag}"`).join(', ')}]
---

${content}`;

    // Create blob and download
    const blob = new Blob([frontmatter], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${slug}.mdx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Download failed',
    };
  }
}

export async function generateWithClaude(
  prompt: string,
  visualizationType: string,
  currentContent: string
): Promise<{ success: boolean; generatedContent?: string; error?: string }> {
  try {
    // This is a template generator
    // In a real implementation with a backend, you would call Claude API here

    const visualizationTemplates: Record<string, string> = {
      'reasoning-flow': `
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

export function ReasoningFlowVisualization() {
  const nodes = [
    {
      id: '1',
      type: 'default',
      data: { label: 'Input' },
      position: { x: 100, y: 100 },
      style: { background: '#3b82f6', color: 'white', padding: 10 },
    },
    {
      id: '2',
      type: 'default',
      data: { label: 'Process' },
      position: { x: 300, y: 100 },
      style: { background: '#8b5cf6', color: 'white', padding: 10 },
    },
    {
      id: '3',
      type: 'default',
      data: { label: 'Output' },
      position: { x: 500, y: 100 },
      style: { background: '#10b981', color: 'white', padding: 10 },
    },
  ];

  const edges = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: true },
  ];

  return (
    <div className="my-8 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-4">
        <h3 className="text-xl font-bold">Reasoning Flow</h3>
      </div>
      <div style={{ height: '400px' }} className="bg-white dark:bg-gray-900">
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 p-4 text-sm text-gray-600 dark:text-gray-400">
        Interactive visualization showing the step-by-step reasoning process
      </div>
    </div>
  );
}

<ReasoningFlowVisualization />
`,
      'comparison': `
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

export function ComparisonVisualization() {
  const nodes = [
    {
      id: 'a1',
      data: { label: 'Approach A' },
      position: { x: 100, y: 50 },
      style: { background: '#3b82f6', color: 'white', padding: 10 },
    },
    {
      id: 'b1',
      data: { label: 'Approach B' },
      position: { x: 400, y: 50 },
      style: { background: '#8b5cf6', color: 'white', padding: 10 },
    },
  ];

  return (
    <div className="my-8 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-4">
        <h3 className="text-xl font-bold">Comparison</h3>
      </div>
      <div style={{ height: '300px' }} className="bg-white dark:bg-gray-900">
        <ReactFlow nodes={nodes} edges={[]} fitView>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

<ComparisonVisualization />
`,
      'workflow': `
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

export function WorkflowVisualization() {
  const nodes = [
    { id: '1', data: { label: 'Start' }, position: { x: 100, y: 100 } },
    { id: '2', data: { label: 'Step 1' }, position: { x: 250, y: 100 } },
    { id: '3', data: { label: 'Step 2' }, position: { x: 400, y: 100 } },
    { id: '4', data: { label: 'End' }, position: { x: 550, y: 100 } },
  ];

  const edges = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: true },
    { id: 'e3-4', source: '3', target: '4', animated: true },
  ];

  return (
    <div className="my-8 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4">
        <h3 className="text-xl font-bold">Workflow</h3>
      </div>
      <div style={{ height: '300px' }} className="bg-white dark:bg-gray-900">
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

<WorkflowVisualization />
`,
    };

    const template = visualizationTemplates[visualizationType] || visualizationTemplates['reasoning-flow'];

    const generatedContent = `
## Generated Section

${template}

### Key Points

1. **Think**: ${visualizationType === 'custom' ? 'Analyze the problem systematically' : 'Break down the concept'}
2. **Explain**: Provide clear, step-by-step explanations
3. **Visualize**: Use interactive diagrams to enhance understanding

---

*This section was generated using AI. Customize the visualization above to match your content.*
`;

    return {
      success: true,
      generatedContent,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Generation failed',
    };
  }
}

export async function loadMDXFromURL(url: string): Promise<{ content: string; metadata: PostMetadata } | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;

    const content = await response.text();

    // Extract frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!frontmatterMatch) {
      return { content, metadata: getDefaultMetadata() };
    }

    const [, frontmatterStr, body] = frontmatterMatch;
    const metadata = parseFrontmatter(frontmatterStr);

    return { content: body, metadata };
  } catch (error) {
    console.error('Error loading MDX:', error);
    return null;
  }
}

function parseFrontmatter(frontmatterStr: string): PostMetadata {
  const metadata: any = {};
  frontmatterStr.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim().replace(/['"]/g, '');
      if (key.trim() === 'tags' && value.startsWith('[')) {
        metadata.tags = value
          .slice(1, -1)
          .split(',')
          .map((tag: string) => tag.trim().replace(/['"]/g, ''));
      } else {
        metadata[key.trim()] = value;
      }
    }
  });

  return {
    title: metadata.title || '',
    date: metadata.date || '',
    author: metadata.author || '',
    description: metadata.description || '',
    tags: metadata.tags || [],
  };
}

function getDefaultMetadata(): PostMetadata {
  return {
    title: '',
    date: new Date().toISOString().split('T')[0],
    author: '',
    description: '',
    tags: [],
  };
}
