import type { FastifyInstance } from 'fastify';

/**
 * Tool endpoints exposed to agents (scoped-token authenticated). A natural home
 * for an MCP/tool manifest the AI tier can discover and call.
 */
export async function agentsModule(app: FastifyInstance): Promise<void> {
  app.get('/tools', async () => ({
    tools: [{ name: 'get_quote', description: 'Get a fractional investment quote.' }],
  }));
}
