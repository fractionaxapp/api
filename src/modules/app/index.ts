import type { FastifyInstance } from 'fastify';

/**
 * BFF surface for the FractionAX web/mobile app (session-authenticated).
 * Tailored to the app's UI needs; not a stable public contract.
 */
export async function appModule(app: FastifyInstance): Promise<void> {
  app.get('/me', async () => ({ user: null }));
}
