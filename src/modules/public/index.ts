import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { money } from '@fractionax/core';

const quoteQuery = z.object({
  amount: z.coerce.number().int().positive(),
  currency: z.string().length(3).default('USD'),
});

/**
 * Public, versioned API for external subscribers (API-key authenticated).
 * Changes here are a stable contract — version under the /v1 prefix.
 */
export async function publicModule(app: FastifyInstance): Promise<void> {
  app.get('/quote', async (request) => {
    const { amount, currency } = quoteQuery.parse(request.query);
    const total = money(amount, currency);
    return { amount: total.amount, currency: total.currency };
  });
}
