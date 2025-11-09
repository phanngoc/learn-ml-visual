'use client';

import React from 'react';
import Editor from '@monaco-editor/react';

interface EditorPanelProps {
  value: string;
  onChange: (value: string | undefined) => void;
  fileName?: string;
}

export default function EditorPanel({ value, onChange, fileName }: EditorPanelProps) {
  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 flex items-center justify-between">
        <h2 className="text-lg font-bold">Editor</h2>
        {fileName && (
          <span className="text-sm opacity-90">{fileName}</span>
        )}
      </div>
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="markdown"
          value={value}
          onChange={onChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            formatOnPaste: true,
            formatOnType: true,
          }}
        />
      </div>
    </div>
  );
}
