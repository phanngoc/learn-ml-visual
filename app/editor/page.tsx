'use client';

import React, { useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import EditorPanel from './components/EditorPanel';
import PreviewPanel from './components/PreviewPanel';
import AIPromptPanel from './components/AIPromptPanel';
import PublishControls, { PostMetadata } from './components/PublishControls';
import StreamingLogs from './components/StreamingLogs';
import {
  downloadMDXFile,
  generateWithClaude,
} from './lib/client-actions';

const INITIAL_CONTENT = `---
title: "New Blog Post"
date: "${new Date().toISOString().split('T')[0]}"
author: "Your Name"
description: "A new blog post"
tags: ["AI", "Tutorial"]
---

# Welcome to the MDX Editor

Start writing your blog post here...

## Features

- Live preview
- AI-powered content generation
- React Flow visualizations
- Easy publishing

Try editing this content and see the live preview update!
`;

export default function EditorPage() {
  const [content, setContent] = useState(INITIAL_CONTENT);
  const [slug, setSlug] = useState('new-post');
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  const showStatus = (type: 'success' | 'error' | 'info', message: string) => {
    setStatusMessage({ type, message });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleSave = async (metadata: PostMetadata) => {
    if (!slug) {
      showStatus('error', 'Please enter a slug');
      return;
    }

    setIsSaving(true);
    try {
      // Extract content without frontmatter
      const contentWithoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n/, '');

      const result = await downloadMDXFile(slug, contentWithoutFrontmatter, metadata);

      if (result.success) {
        showStatus('success', `Downloaded: ${slug}.mdx`);
      } else {
        showStatus('error', result.error || 'Download failed');
      }
    } catch (error) {
      showStatus('error', 'Error downloading file');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async (metadata: PostMetadata) => {
    if (!slug) {
      showStatus('error', 'Please enter a slug');
      return;
    }

    // In static export mode, we can only download
    // For actual publishing, you need a backend server
    showStatus('info', 'Publishing requires a backend server. Downloading file instead...');
    await handleSave(metadata);
  };

  const handleGenerate = async (prompt: string, visualizationType: string) => {
    setIsGenerating(true);
    try {
      const result = await generateWithClaude(prompt, visualizationType, content);

      if (result.success && result.generatedContent) {
        // Insert generated content at the end
        setContent(content + '\n\n' + result.generatedContent);
        showStatus('success', 'Content generated successfully');
      } else {
        showStatus('error', result.error || 'Generation failed');
      }
    } catch (error) {
      showStatus('error', 'Error generating content');
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleContentChange = (value: string | undefined) => {
    if (value !== undefined) {
      setContent(value);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              📝 MDX Editor
            </h1>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Note:</span> Static export mode - files will be downloaded
              </div>
            </div>
          </div>

          {/* Status Message */}
          {statusMessage && (
            <div
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                statusMessage.type === 'success'
                  ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                  : statusMessage.type === 'error'
                  ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300'
                  : 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300'
              }`}
            >
              {statusMessage.message}
            </div>
          )}
        </div>

        <PublishControls
          slug={slug}
          onSlugChange={setSlug}
          onSave={handleSave}
          onPublish={handlePublish}
          isSaving={isSaving}
          isPublishing={isPublishing}
        />
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={50} minSize={30}>
            <EditorPanel
              value={content}
              onChange={handleContentChange}
              fileName={`${slug}.mdx`}
            />
          </Panel>

          <PanelResizeHandle className="w-2 bg-gray-300 dark:bg-gray-700 hover:bg-blue-500 transition-colors cursor-col-resize" />

          <Panel defaultSize={50} minSize={30}>
            <PreviewPanel content={content} />
          </Panel>
        </PanelGroup>
      </div>

      {/* AI Panel */}
      <AIPromptPanel onGenerate={handleGenerate} isGenerating={isGenerating} />

      {/* WebSocket Streaming Logs */}
      <StreamingLogs />
    </div>
  );
}
