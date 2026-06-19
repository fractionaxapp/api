import Fastify, { type FastifyInstance } from 'fastify';
import { ZodError } from 'zod';
import { healthRoutes } from './platform/health.js';
import { appModule } from './modules/app/index.js';
import { publicModule } from './modules/public/index.js';
import { agentsModule } from './modules/agents/index.js';

export interface BuildOptions {
  /** Pino log level, or "silent" in tests. Defaults to Fastify's logger. */
  logLevel?: string;
}

/**
 * Builds the Fastify instance with every API surface mounted under its own prefix:
 *   /app     — BFF for the web/mobile app
 *   /v1      — public, versioned subscriber API
 *   /agents  — tool endpoints for agents
 */
export function buildApp({ logLevel }: BuildOptions = {}): FastifyInstance {
  const app = Fastify({
    logger: logLevel ? { level: logLevel } : true,
  });

  // Map request-validation failures to 400 instead of a generic 500.
  app.setErrorHandler((error, _request, reply) => {
    if (error instanceof ZodError) {
      return reply.status(400).send({ error: 'Bad Request', issues: error.issues });
    }
    return reply.send(error);
  });

  app.register(healthRoutes);
  app.register(appModule, { prefix: '/app' });
  app.register(publicModule, { prefix: '/v1' });
  app.register(agentsModule, { prefix: '/agents' });

  return app;
}
