'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

export interface StreamEvent {
  event: string;
  data: any;
  timestamp: number;
}

export interface StreamLog {
  id: string;
  event: string;
  message: string;
  data?: any;
  timestamp: number;
}

export interface UseClaudeStreamOptions {
  autoConnect?: boolean;
  reconnectAttempts?: number;
  reconnectDelay?: number;
  wsUrl?: string;
}

export function useClaudeStream(options: UseClaudeStreamOptions = {}) {
  const {
    autoConnect = true,
    reconnectAttempts = 3,
    reconnectDelay = 2000,
    wsUrl = `ws://localhost:${process.env.NEXT_PUBLIC_WS_PORT || '3001'}`,
  } = options;

  const [isConnected, setIsConnected] = useState(false);
  const [logs, setLogs] = useState<StreamLog[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectCountRef = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Add a log entry
   */
  const addLog = useCallback((event: string, message: string, data?: any) => {
    const log: StreamLog = {
      id: `${Date.now()}-${Math.random()}`,
      event,
      message,
      data,
      timestamp: Date.now(),
    };
    setLogs((prev) => [...prev, log]);
  }, []);

  /**
   * Clear all logs
   */
  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  /**
   * Handle incoming stream events
   */
  const handleStreamEvent = useCallback(
    (streamEvent: StreamEvent) => {
      const { event, data } = streamEvent;

      switch (event) {
        case 'connected':
          addLog('system', data.message);
          break;

        case 'claude:stream':
          setIsGenerating(true);
          const operation = data.operation || 'unknown';
          const type = data.type || 'info';
          const jsonData = data.data || {};

          // Format message based on type
          let message = `[${operation}] `;
          if (jsonData.text) {
            message += jsonData.text;
          } else if (jsonData.content) {
            message += jsonData.content;
          } else {
            message += JSON.stringify(jsonData).substring(0, 100);
          }

          addLog(event, message, data);
          break;

        case 'claude:info':
          addLog('info', data.message, data.meta);
          break;

        case 'claude:success':
          addLog('success', data.message, data.meta);
          break;

        case 'claude:warning':
          addLog('warning', data.message, data.meta);
          break;

        case 'claude:error':
          setError(data.message);
          addLog('error', data.message, data.error);
          setIsGenerating(false);
          break;

        case 'claude:progress':
          addLog('progress', data.message || `Progress: ${data.progress}%`, data);
          break;

        case 'claude:complete':
          addLog('success', `Completed: ${data.operation}`, data.result);
          setIsGenerating(false);
          break;

        case 'claude:debug':
          addLog('debug', data.message, data.meta);
          break;

        default:
          console.log('Unknown event:', event, data);
      }
    },
    [addLog]
  );

  /**
   * Connect to WebSocket server
   */
  const connect = useCallback(() => {
    // Don't connect in production or if already connected
    if (process.env.NODE_ENV !== 'development' || wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('✅ WebSocket connected');
        setIsConnected(true);
        setError(null);
        reconnectCountRef.current = 0;
        addLog('system', 'Connected to streaming server');
      };

      ws.onmessage = (event) => {
        try {
          const streamEvent: StreamEvent = JSON.parse(event.data);
          handleStreamEvent(streamEvent);
        } catch (err) {
          console.error('Failed to parse WebSocket message:', err);
        }
      };

      ws.onerror = (event) => {
        console.error('WebSocket error:', event);
        setError('WebSocket connection error');
        addLog('error', 'Connection error occurred');
      };

      ws.onclose = () => {
        console.log('🔌 WebSocket disconnected');
        setIsConnected(false);
        wsRef.current = null;

        // Attempt reconnection
        if (reconnectCountRef.current < reconnectAttempts) {
          reconnectCountRef.current++;
          addLog('system', `Reconnecting... (attempt ${reconnectCountRef.current}/${reconnectAttempts})`);

          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, reconnectDelay);
        } else {
          setError('Failed to connect after multiple attempts');
          addLog('error', 'Connection failed. Please refresh the page.');
        }
      };
    } catch (err) {
      console.error('Failed to create WebSocket:', err);
      setError('Failed to create WebSocket connection');
    }
  }, [wsUrl, reconnectAttempts, reconnectDelay, addLog, handleStreamEvent]);

  /**
   * Disconnect from WebSocket server
   */
  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    setIsConnected(false);
  }, []);

  /**
   * Initialize WebSocket server (call API route)
   */
  const initializeServer = useCallback(async () => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    try {
      const response = await fetch('/api/ws');
      const result = await response.json();

      if (result.success) {
        addLog('system', 'WebSocket server initialized');
        // Wait a bit before connecting
        setTimeout(() => connect(), 500);
      } else {
        addLog('warning', 'WebSocket server already running or failed to initialize');
        // Try to connect anyway
        setTimeout(() => connect(), 500);
      }
    } catch (err) {
      console.error('Failed to initialize WebSocket server:', err);
      // Try to connect anyway - server might already be running
      setTimeout(() => connect(), 500);
    }
  }, [connect, addLog]);

  /**
   * Auto-connect on mount
   */
  useEffect(() => {
    if (autoConnect && process.env.NODE_ENV === 'development') {
      initializeServer();
    }

    return () => {
      disconnect();
    };
  }, [autoConnect, initializeServer, disconnect]);

  return {
    isConnected,
    logs,
    isGenerating,
    error,
    connect,
    disconnect,
    clearLogs,
    initializeServer,
  };
}

export default useClaudeStream;
