'use client';

import React, { useEffect, useState } from 'react';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import { useMDXComponents } from '@/mdx-components';

interface PreviewPanelProps {
  content: string;
}

export default function PreviewPanel({ content }: PreviewPanelProps) {
  const [MDXContent, setMDXContent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const components = useMDXComponents({});

  useEffect(() => {
    const compileMDX = async () => {
      try {
        setError(null);
        const { default: Content } = await evaluate(content, {
          ...runtime,
          useMDXComponents: () => components,
        });
        setMDXContent(() => Content);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to compile MDX');
        setMDXContent(null);
      }
    };

    const timeoutId = setTimeout(compileMDX, 500); // Debounce compilation
    return () => clearTimeout(timeoutId);
  }, [content, components]);

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3">
        <h2 className="text-lg font-bold">Preview</h2>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="prose prose-lg dark:prose-invert max-w-none p-6">
          {error ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <h3 className="text-red-800 dark:text-red-400 font-bold mb-2">Compilation Error</h3>
              <pre className="text-sm text-red-700 dark:text-red-300 whitespace-pre-wrap">
                {error}
              </pre>
            </div>
          ) : MDXContent ? (
            <MDXContent />
          ) : (
            <div className="text-gray-500 dark:text-gray-400 text-center py-12">
              Compiling preview...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
