import { compile } from '@mdx-js/mdx';
import { VFile } from 'vfile';

export async function compileMDXToJS(source: string): Promise<string> {
  try {
    const file = new VFile({ value: source, path: 'input.mdx' });
    const compiled = await compile(file, {
      outputFormat: 'function-body',
      development: false,
      baseUrl: import.meta.url,
    });

    return String(compiled);
  } catch (error) {
    throw new Error(`MDX compilation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export function extractFrontmatter(content: string): {
  frontmatter: Record<string, any>;
  body: string;
} {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, body: content };
  }

  const [, frontmatterStr, body] = match;
  const frontmatter: Record<string, any> = {};

  frontmatterStr.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      // Try to parse arrays
      if (value.startsWith('[') && value.endsWith(']')) {
        frontmatter[key.trim()] = value
          .slice(1, -1)
          .split(',')
          .map((item) => item.trim().replace(/['"]/g, ''));
      } else {
        frontmatter[key.trim()] = value.replace(/['"]/g, '');
      }
    }
  });

  return { frontmatter, body };
}

export function createMDXWithFrontmatter(
  content: string,
  metadata: {
    title: string;
    date: string;
    author: string;
    description: string;
    tags: string[];
  }
): string {
  const frontmatter = `---
title: "${metadata.title}"
date: "${metadata.date}"
author: "${metadata.author}"
description: "${metadata.description}"
tags: [${metadata.tags.map((tag) => `"${tag}"`).join(', ')}]
---

${content}`;

  return frontmatter;
}

export function validateMDXSyntax(content: string): {
  isValid: boolean;
  errors: string[];
} {
  try {
    // Check for common MDX issues
    const issues: string[] = [];

    // Check for unclosed JSX tags
    const jsxTagRegex = /<([A-Z][a-zA-Z0-9]*)[^>]*>/g;
    const openTags: string[] = [];
    let match;

    while ((match = jsxTagRegex.exec(content)) !== null) {
      const tagName = match[1];
      if (!match[0].endsWith('/>')) {
        openTags.push(tagName);
      }
    }

    // Check for unmatched curly braces
    let braceCount = 0;
    for (const char of content) {
      if (char === '{') braceCount++;
      if (char === '}') braceCount--;
      if (braceCount < 0) {
        issues.push('Unmatched closing curly brace');
        break;
      }
    }
    if (braceCount > 0) {
      issues.push('Unmatched opening curly brace');
    }

    return {
      isValid: issues.length === 0,
      errors: issues,
    };
  } catch (error) {
    return {
      isValid: false,
      errors: [error instanceof Error ? error.message : 'Unknown validation error'],
    };
  }
}
