import pino from 'pino';
import type { WebSocket } from 'ws';

// WebSocket clients registry for broadcasting
let wsClients: Set<WebSocket> = new Set();

// Configure Pino logger
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV === 'development' ? {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'HH:MM:ss',
      ignore: 'pid,hostname',
    },
  } : undefined,
});

/**
 * Register WebSocket client for streaming logs
 */
export function registerWsClient(ws: WebSocket): void {
  wsClients.add(ws);
  logger.info('WebSocket client connected for streaming');
}

/**
 * Unregister WebSocket client
 */
export function unregisterWsClient(ws: WebSocket): void {
  wsClients.delete(ws);
  logger.info('WebSocket client disconnected');
}

/**
 * Broadcast message to all connected WebSocket clients
 */
function broadcast(event: string, data: any): void {
  const message = JSON.stringify({ event, data, timestamp: Date.now() });

  wsClients.forEach((client) => {
    if (client.readyState === 1) { // OPEN
      try {
        client.send(message);
      } catch (error) {
        logger.error({ error }, 'Failed to send WebSocket message');
      }
    }
  });
}

/**
 * Enhanced logger with WebSocket streaming support
 */
export const streamLogger = {
  /**
   * Log streaming JSON object (both console and WebSocket)
   */
  streamJson(operation: string, jsonObj: any): void {
    const logData = {
      operation,
      type: jsonObj.type || 'unknown',
      data: jsonObj,
    };

    // Console logging
    if (jsonObj.type === 'error') {
      logger.error(logData, `[STREAM_JSON] ${operation}`);
    } else if (jsonObj.type === 'warning') {
      logger.warn(logData, `[STREAM_JSON] ${operation}`);
    } else {
      logger.info(logData, `[STREAM_JSON] ${operation}`);
    }

    // Broadcast to WebSocket clients
    broadcast('claude:stream', logData);
  },

  /**
   * Log info message
   */
  info(message: string, meta?: any): void {
    logger.info(meta || {}, message);
    broadcast('claude:info', { message, meta });
  },

  /**
   * Log success message
   */
  success(message: string, meta?: any): void {
    logger.info({ ...meta, level: 'success' }, message);
    broadcast('claude:success', { message, meta });
  },

  /**
   * Log warning message
   */
  warning(message: string, meta?: any): void {
    logger.warn(meta || {}, message);
    broadcast('claude:warning', { message, meta });
  },

  /**
   * Log error message
   */
  error(message: string, error?: any): void {
    logger.error({ error }, message);
    broadcast('claude:error', { message, error: error?.message || error });
  },

  /**
   * Log debug message
   */
  debug(message: string, meta?: any): void {
    logger.debug(meta || {}, message);
    broadcast('claude:debug', { message, meta });
  },

  /**
   * Log progress update
   */
  progress(operation: string, progress: number, message?: string): void {
    const data = { operation, progress, message };
    logger.info(data, `[PROGRESS] ${operation}`);
    broadcast('claude:progress', data);
  },

  /**
   * Log completion
   */
  complete(operation: string, result: any): void {
    const data = { operation, result };
    logger.info(data, `[COMPLETE] ${operation}`);
    broadcast('claude:complete', data);
  },
};

export default streamLogger;
