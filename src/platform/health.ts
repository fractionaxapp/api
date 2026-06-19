import type { FastifyInstance } from 'fastify';

/** Liveness/readiness endpoint, unauthenticated. */
export async function healthRoutes(app: FastifyInstance): Promise<void> {
  app.get('/health', async () => ({ status: 'ok' }));
}
