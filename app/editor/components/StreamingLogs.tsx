'use client';

import { useClaudeStream, StreamLog } from '../hooks/useClaudeStream';
import { useEffect, useRef } from 'react';

export function StreamingLogs() {
  const { isConnected, logs, isGenerating, error, clearLogs } = useClaudeStream({
    autoConnect: true,
  });
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const getLogIcon = (event: string) => {
    switch (event) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'progress':
        return '⏳';
      case 'system':
        return '🔧';
      case 'debug':
        return '🐛';
      case 'claude:stream':
        return '📡';
      default:
        return 'ℹ️';
    }
  };

  const getLogColor = (event: string) => {
    switch (event) {
      case 'success':
        return 'text-green-600 dark:text-green-400';
      case 'error':
        return 'text-red-600 dark:text-red-400';
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'progress':
        return 'text-blue-600 dark:text-blue-400';
      case 'system':
        return 'text-gray-600 dark:text-gray-400';
      case 'debug':
        return 'text-purple-600 dark:text-purple-400';
      case 'claude:stream':
        return 'text-indigo-600 dark:text-indigo-400';
      default:
        return 'text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
          <span className="font-semibold text-sm">Claude Streaming Logs</span>
          {isGenerating && (
            <span className="text-xs bg-white/20 px-2 py-1 rounded">Generating...</span>
          )}
        </div>
        <button
          onClick={clearLogs}
          className="text-xs hover:bg-white/20 px-2 py-1 rounded transition-colors"
          title="Clear logs"
        >
          Clear
        </button>
      </div>

      {/* Connection Status */}
      {error && (
        <div className="px-4 py-2 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">
          <p className="text-xs text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Logs Container */}
      <div className="h-64 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-2 font-mono text-xs">
        {logs.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>Waiting for logs...</p>
          </div>
        ) : (
          <>
            {logs.map((log) => (
              <LogEntry key={log.id} log={log} getLogIcon={getLogIcon} getLogColor={getLogColor} />
            ))}
            <div ref={logsEndRef} />
          </>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {logs.length} {logs.length === 1 ? 'log' : 'logs'} •
          {isConnected ? ' Connected' : ' Disconnected'}
        </p>
      </div>
    </div>
  );
}

function LogEntry({
  log,
  getLogIcon,
  getLogColor,
}: {
  log: StreamLog;
  getLogIcon: (event: string) => string;
  getLogColor: (event: string) => string;
}) {
  const timestamp = new Date(log.timestamp).toLocaleTimeString();

  return (
    <div className="mb-1 p-2 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <div className="flex items-start gap-2">
        <span className="text-sm">{getLogIcon(log.event)}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="text-gray-400 text-xs">{timestamp}</span>
            <span className={`text-xs font-semibold ${getLogColor(log.event)}`}>
              {log.event}
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mt-1 break-words">{log.message}</p>
          {log.data && (
            <details className="mt-1">
              <summary className="text-gray-500 cursor-pointer text-xs">View data</summary>
              <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-900 rounded text-xs overflow-x-auto">
                {JSON.stringify(log.data, null, 2)}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}

export default StreamingLogs;
