# @fractionax/api

FractionAX platform/business API — [Fastify](https://fastify.dev) + TypeScript.

> **This repo is a submodule** of the [`fractionaxapp`](https://github.com/fractionaxapp/fractionaxapp)
> meta-monorepo and is developed from there. It depends on `@fractionax/core` via
> `workspace:*`, so install and run it from inside the meta-repo.

## API surfaces

A modular monolith — one deployable, three route groups by audience:

| Prefix | Audience | Auth | Notes |
| --- | --- | --- | --- |
| `/app` | the FractionAX web/mobile app | session/JWT | BFF, tailored to the UI; not a public contract |
| `/v1` | external subscribers | API keys / OAuth | stable, versioned public API |
| `/agents` | agents | scoped tokens | tool endpoints (MCP-friendly) |
| `/health` | infra | none | liveness/readiness |

Split a surface into its own submodule only when it needs an independent deploy
cadence or scaling profile. Model-serving / inference belongs in the `ai/` tier.

## Develop (from the meta-repo root)

```bash
moon run api:dev         # tsx watch (hot reload)
moon run api:build       # tsc build (builds @fractionax/core first)
moon run api:test        # vitest
moon run api:lint        # eslint
moon run api:typecheck   # tsc --noEmit
```

## Layout

```
src/
  server.ts            # entrypoint (loads config, listens)
  app.ts               # buildApp(): Fastify instance + error handling
  config.ts            # env config
  platform/            # cross-cutting (health; later: auth, db, billing)
  modules/
    app/  public/  agents/   # the three API surfaces
```
