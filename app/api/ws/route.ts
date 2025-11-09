import { NextRequest } from 'next/server';
import { initializeWebSocketServer } from '@/app/editor/lib/websocket-server';

/**
 * WebSocket initialization endpoint
 * This endpoint is called once to start the WebSocket server in development
 */
export async function GET(request: NextRequest) {
  // Only allow in development mode
  if (process.env.NODE_ENV !== 'development') {
    return new Response(
      JSON.stringify({ error: 'WebSocket only available in development mode' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Initialize WebSocket server on configured port
    const wsPort = parseInt(process.env.WS_PORT || '3001', 10);
    const wss = initializeWebSocketServer(wsPort);

    if (wss) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'WebSocket server initialized',
          port: wsPort,
          url: `ws://localhost:${wsPort}`,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'WebSocket server already running or failed to initialize',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: 'Failed to initialize WebSocket server',
        details: error.message,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * Health check endpoint
 */
export async function POST(request: NextRequest) {
  return new Response(
    JSON.stringify({
      status: 'ok',
      mode: process.env.NODE_ENV,
      websocket: process.env.NODE_ENV === 'development',
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
