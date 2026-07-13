// Fixed-window rate limiter. Uses Vercel KV / Upstash Redis when configured
// so limits hold across serverless instances; falls back to an in-process
// Map (single-instance only — fine for local dev, not for prod scaling).

type RateLimitOptions = {
  max: number;
  windowSeconds: number;
};

type RateLimitResult = {
  limited: boolean;
  retryAfterSeconds?: number;
};

function getKvConfig() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return { url: url.replace(/\/$/, ""), token };
}

const memoryStore = new Map<string, { count: number; resetAt: number }>();

function checkMemory(key: string, { max, windowSeconds }: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const current = memoryStore.get(key);
  if (!current || current.resetAt <= now) {
    memoryStore.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return { limited: false };
  }
  current.count += 1;
  if (current.count > max) {
    return { limited: true, retryAfterSeconds: Math.ceil((current.resetAt - now) / 1000) };
  }
  return { limited: false };
}

export async function checkRateLimit(key: string, options: RateLimitOptions): Promise<RateLimitResult> {
  const kv = getKvConfig();
  if (!kv) {
    return checkMemory(key, options);
  }

  try {
    const response = await fetch(`${kv.url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${kv.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, String(options.windowSeconds), "NX"],
        ["TTL", key],
      ]),
      cache: "no-store",
    });

    if (!response.ok) {
      return checkMemory(key, options);
    }

    const payload = (await response.json()) as Array<{ result: number }>;
    const count = Number(payload[0]?.result ?? 0);
    const ttl = Number(payload[2]?.result ?? options.windowSeconds);

    if (count > options.max) {
      return { limited: true, retryAfterSeconds: ttl > 0 ? ttl : options.windowSeconds };
    }
    return { limited: false };
  } catch {
    return checkMemory(key, options);
  }
}
