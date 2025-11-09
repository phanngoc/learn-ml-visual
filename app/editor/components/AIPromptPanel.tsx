'use client';

import React, { useState } from 'react';
import { useClaudeStream } from '../hooks/useClaudeStream';

interface AIPromptPanelProps {
  onGenerate: (prompt: string, visualizationType: string) => void;
  isGenerating: boolean;
}

const DEFAULT_PROMPT = `You are a blogger and developer creating educational content.

Think => Explain => Visualize

Your goal:
1. THINK: Break down complex concepts into clear, logical steps
2. EXPLAIN: Write engaging, accessible explanations that inspire learning
3. VISUALIZE: Create interactive React Flow diagrams that help readers understand

Make the content:
- Easy to understand for readers at different skill levels
- Inspiring and engaging with real-world examples
- Interactive with meaningful visualizations
- Practical with actionable insights

Focus on clarity, accessibility, and inspiration.`;

const VISUALIZATION_TYPES = [
  { value: 'reasoning-flow', label: 'Reasoning Flow', description: 'Step-by-step thought process' },
  { value: 'comparison', label: 'Comparison Diagram', description: 'Side-by-side comparison' },
  { value: 'workflow', label: 'Workflow Diagram', description: 'Process or pipeline visualization' },
  { value: 'architecture', label: 'Architecture Diagram', description: 'System structure and components' },
  { value: 'timeline', label: 'Timeline', description: 'Sequential events or phases' },
  { value: 'custom', label: 'Custom', description: 'Let AI decide the best visualization' },
];

export default function AIPromptPanel({ onGenerate, isGenerating }: AIPromptPanelProps) {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [visualizationType, setVisualizationType] = useState('custom');
  const [isExpanded, setIsExpanded] = useState(false);
  const { isConnected } = useClaudeStream({ autoConnect: true });

  const handleGenerate = () => {
    onGenerate(prompt, visualizationType);
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-3 flex items-center justify-between bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="font-bold">🤖 AI Content Generator</span>
          {process.env.NODE_ENV === 'development' && (
            <div className="flex items-center gap-2 text-xs bg-white/20 px-2 py-1 rounded">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
              <span>{isConnected ? 'WebSocket Connected' : 'WebSocket Disconnected'}</span>
            </div>
          )}
        </div>
        <span className="text-sm">
          {isExpanded ? '▼ Collapse' : '▲ Expand'}
        </span>
      </button>

      {isExpanded && (
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Visualization Type
            </label>
            <select
              value={visualizationType}
              onChange={(e) => setVisualizationType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={isGenerating}
            >
              {VISUALIZATION_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label} - {type.description}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              AI Prompt Template
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={10}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              placeholder="Enter your AI prompt..."
              disabled={isGenerating}
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-bold hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isGenerating ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Generating Content...
              </span>
            ) : (
              '✨ Generate Content'
            )}
          </button>

          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <p>💡 Tip: The AI will generate MDX content with React Flow visualizations based on your prompt.</p>
            <p>🎯 The generated content will be inserted at the current cursor position in the editor.</p>
          </div>
        </div>
      )}
    </div>
  );
}
