interface Env {
  ASSETS: Fetcher;
}

const json = (data: unknown, init?: ResponseInit) =>
  Response.json(data, {
    headers: {
      "cache-control": "no-store",
    },
    ...init,
  });

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      return json({
        ok: true,
        app: "internwise-eu",
        runtime: "cloudflare-workers",
        timestamp: new Date().toISOString(),
      });
    }

    if (url.pathname === "/api/config") {
      return json({
        ok: true,
        app: "internwise-eu",
        mode: "static-assets-worker",
        features: ["spa-routing", "api-ready", "supabase-ready"],
      });
    }

    return env.ASSETS.fetch(request);
  },
};
