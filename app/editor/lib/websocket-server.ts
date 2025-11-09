import { WebSocketServer, WebSocket } from 'ws';
import { IncomingMessage } from 'http';
import { registerWsClient, unregisterWsClient, streamLogger } from './logger';

let wss: WebSocketServer | null = null;

/**
 * Initialize WebSocket server (development only)
 */
export function initializeWebSocketServer(port: number = parseInt(process.env.WS_PORT || '3001', 10)): WebSocketServer | null {
  // Only run in development mode
  if (process.env.NODE_ENV !== 'development') {
    console.log('WebSocket server disabled in production mode');
    return null;
  }

  // Prevent multiple initializations
  if (wss) {
    console.log('WebSocket server already running');
    return wss;
  }

  try {
    wss = new WebSocketServer({ port });

    wss.on('listening', () => {
      console.log(`✅ WebSocket server listening on port ${port}`);
    });

    wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
      const clientIp = req.socket.remoteAddress;
      console.log(`🔌 Client connected from ${clientIp}`);

      // Register client for streaming logs
      registerWsClient(ws);

      // Send welcome message
      ws.send(JSON.stringify({
        event: 'connected',
        data: { message: 'Connected to Claude streaming server' },
        timestamp: Date.now(),
      }));

      // Handle incoming messages
      ws.on('message', (message: Buffer) => {
        try {
          const data = JSON.parse(message.toString());
          console.log('Received message from client:', data);

          // Broadcast client message to logger for UI visibility
          streamLogger.info(`Client message received: ${data.type || 'unknown'}`, {
            clientMessage: data,
            clientIp
          });

          // Echo back for testing
          if (data.type === 'ping') {
            ws.send(JSON.stringify({
              event: 'pong',
              data: { timestamp: Date.now() },
              timestamp: Date.now(),
            }));
            streamLogger.debug('Ping-pong exchange completed', { clientIp });
          }
        } catch (error) {
          console.error('Failed to parse message:', error);
          streamLogger.error('Failed to parse client message', error);
        }
      });

      // Handle client disconnect
      ws.on('close', () => {
        console.log(`🔌 Client disconnected from ${clientIp}`);
        unregisterWsClient(ws);
      });

      // Handle errors
      ws.on('error', (error) => {
        console.error('WebSocket error:', error);
        unregisterWsClient(ws);
      });
    });

    wss.on('error', (error) => {
      console.error('WebSocket server error:', error);
    });

    return wss;
  } catch (error) {
    console.error('Failed to initialize WebSocket server:', error);
    return null;
  }
}

/**
 * Get WebSocket server instance
 */
export function getWebSocketServer(): WebSocketServer | null {
  return wss;
}

/**
 * Close WebSocket server
 */
export function closeWebSocketServer(): void {
  if (wss) {
    wss.close(() => {
      console.log('WebSocket server closed');
    });
    wss = null;
  }
}

/**
 * Broadcast message to all connected clients
 */
export function broadcastToClients(event: string, data: any): void {
  if (!wss) return;

  const message = JSON.stringify({ event, data, timestamp: Date.now() });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

const websocketServer = {
  initializeWebSocketServer,
  getWebSocketServer,
  closeWebSocketServer,
  broadcastToClients,
};

export default websocketServer;
