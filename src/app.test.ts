import { describe, expect, it } from 'vitest';
import { buildApp } from './app.js';

describe('api', () => {
  it('reports health', async () => {
    const app = buildApp({ logLevel: 'silent' });
    const res = await app.inject({ method: 'GET', url: '/health' });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ status: 'ok' });
    await app.close();
  });

  it('quotes via the public API using @fractionax/core', async () => {
    const app = buildApp({ logLevel: 'silent' });
    const res = await app.inject({ method: 'GET', url: '/v1/quote?amount=10000&currency=usd' });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ amount: 10000, currency: 'USD' });
    await app.close();
  });

  it('rejects an invalid quote request with 400', async () => {
    const app = buildApp({ logLevel: 'silent' });
    const res = await app.inject({ method: 'GET', url: '/v1/quote?amount=-5' });
    expect(res.statusCode).toBe(400);
    await app.close();
  });
});
