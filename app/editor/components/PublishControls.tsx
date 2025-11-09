'use client';

import React, { useState } from 'react';

interface PublishControlsProps {
  slug: string;
  onSlugChange: (slug: string) => void;
  onSave: (metadata: PostMetadata) => Promise<void>;
  onPublish: (metadata: PostMetadata) => Promise<void>;
  isSaving: boolean;
  isPublishing: boolean;
}

export interface PostMetadata {
  title: string;
  date: string;
  author: string;
  description: string;
  tags: string[];
}

export default function PublishControls({
  slug,
  onSlugChange,
  onSave,
  onPublish,
  isSaving,
  isPublishing,
}: PublishControlsProps) {
  const [metadata, setMetadata] = useState<PostMetadata>({
    title: '',
    date: new Date().toISOString().split('T')[0],
    author: '',
    description: '',
    tags: [],
  });
  const [tagsInput, setTagsInput] = useState('');
  const [showMetadata, setShowMetadata] = useState(false);

  const handleSave = async () => {
    await onSave(metadata);
  };

  const handlePublish = async () => {
    if (!metadata.title || !metadata.description) {
      alert('Please fill in title and description before publishing');
      setShowMetadata(true);
      return;
    }
    await onPublish(metadata);
  };

  const handleTagsChange = (value: string) => {
    setTagsInput(value);
    setMetadata({
      ...metadata,
      tags: value.split(',').map(tag => tag.trim()).filter(Boolean),
    });
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Slug:
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => onSlugChange(e.target.value)}
            className="flex-1 max-w-md px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="post-slug"
            disabled={isSaving || isPublishing}
          />
          <button
            onClick={() => setShowMetadata(!showMetadata)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
          >
            {showMetadata ? '✓ Metadata' : '+ Metadata'}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving || isPublishing || !slug}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSaving ? 'Saving...' : '💾 Save Draft'}
          </button>
          <button
            onClick={handlePublish}
            disabled={isSaving || isPublishing || !slug}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isPublishing ? 'Publishing...' : '🚀 Publish'}
          </button>
        </div>
      </div>

      {showMetadata && (
        <div className="px-6 pb-4 space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Title *
              </label>
              <input
                type="text"
                value={metadata.title}
                onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Post Title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Author
              </label>
              <input
                type="text"
                value={metadata.author}
                onChange={(e) => setMetadata({ ...metadata, author: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your Name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Date
            </label>
            <input
              type="date"
              value={metadata.date}
              onChange={(e) => setMetadata({ ...metadata, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Description *
            </label>
            <textarea
              value={metadata.description}
              onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Brief description of the post"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => handleTagsChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="AI, Machine Learning, Tutorial"
            />
            {metadata.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {metadata.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
