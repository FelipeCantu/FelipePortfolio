import 'server-only'
import { Redis } from '@upstash/redis'

/**
 * Tiny key-value facade over Upstash Redis (provisioned from the Vercel
 * Marketplace, which injects KV_REST_API_URL / KV_REST_API_TOKEN).
 *
 * For local development without Redis, set PORTAL_DEV_MEMORY=1 to use an
 * in-memory store (data is lost on restart; never used in production).
 */
export interface KV {
  get<T>(key: string): Promise<T | null>
  set(key: string, value: unknown): Promise<void>
  del(key: string): Promise<void>
  sadd(key: string, member: string): Promise<void>
  srem(key: string, member: string): Promise<void>
  smembers(key: string): Promise<string[]>
  hset(key: string, field: string, value: unknown): Promise<void>
  hget<T>(key: string, field: string): Promise<T | null>
  hgetall<T>(key: string): Promise<Record<string, T>>
  hdel(key: string, field: string): Promise<void>
  rpush(key: string, value: unknown): Promise<void>
  lpush(key: string, value: unknown): Promise<void>
  lrange<T>(key: string, start: number, stop: number): Promise<T[]>
  ltrim(key: string, start: number, stop: number): Promise<void>
  incr(key: string): Promise<number>
  expire(key: string, seconds: number): Promise<void>
}

function redisKV(redis: Redis): KV {
  return {
    get: (k) => redis.get(k),
    set: async (k, v) => void (await redis.set(k, v)),
    del: async (k) => void (await redis.del(k)),
    sadd: async (k, m) => void (await redis.sadd(k, m)),
    srem: async (k, m) => void (await redis.srem(k, m)),
    smembers: (k) => redis.smembers(k),
    hset: async (k, f, v) => void (await redis.hset(k, { [f]: v })),
    hget: (k, f) => redis.hget(k, f),
    hgetall: async <T,>(k: string) => ((await redis.hgetall<Record<string, T>>(k)) ?? {}),
    hdel: async (k, f) => void (await redis.hdel(k, f)),
    rpush: async (k, v) => void (await redis.rpush(k, v)),
    lpush: async (k, v) => void (await redis.lpush(k, v)),
    lrange: (k, a, b) => redis.lrange(k, a, b),
    ltrim: async (k, a, b) => void (await redis.ltrim(k, a, b)),
    incr: (k) => redis.incr(k),
    expire: async (k, s) => void (await redis.expire(k, s)),
  }
}

/* ---------- in-memory fallback (dev only) ---------- */
type Mem = Map<string, unknown>
const g = globalThis as unknown as { __portalMem?: Mem }
function memKV(): KV {
  const m: Mem = (g.__portalMem ??= new Map())
  const clone = <T,>(v: unknown) => (v === undefined ? null : (JSON.parse(JSON.stringify(v)) as T))
  const list = (k: string) => ((m.get(k) as unknown[]) ?? (m.set(k, []), m.get(k) as unknown[]))
  const hash = (k: string) => ((m.get(k) as Record<string, unknown>) ?? (m.set(k, {}), m.get(k) as Record<string, unknown>))
  const set = (k: string) => ((m.get(k) as Set<string>) ?? (m.set(k, new Set()), m.get(k) as Set<string>))
  const slice = (arr: unknown[], a: number, b: number) => arr.slice(a, b < 0 ? arr.length + b + 1 : b + 1)
  return {
    get: async (k) => clone(m.get(k)),
    set: async (k, v) => void m.set(k, clone(v)),
    del: async (k) => void m.delete(k),
    sadd: async (k, v) => void set(k).add(v),
    srem: async (k, v) => void set(k).delete(v),
    smembers: async (k) => [...set(k)],
    hset: async (k, f, v) => void (hash(k)[f] = clone(v)),
    hget: async (k, f) => clone(hash(k)[f]),
    hgetall: async (k) => clone(hash(k)) ?? {},
    hdel: async (k, f) => void delete hash(k)[f],
    rpush: async (k, v) => void list(k).push(clone(v)),
    lpush: async (k, v) => void list(k).unshift(clone(v)),
    lrange: async (k, a, b) => clone(slice(list(k), a, b)) ?? [],
    ltrim: async (k, a, b) => void m.set(k, slice(list(k), a, b)),
    incr: async (k) => {
      const n = (Number(m.get(k)) || 0) + 1
      m.set(k, n)
      return n
    },
    expire: async (k, s) => void setTimeout(() => m.delete(k), s * 1000).unref?.(),
  }
}

let instance: KV | null = null

export function kv(): KV {
  if (instance) return instance
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN
  if (url && token) {
    instance = redisKV(new Redis({ url, token }))
  } else if (process.env.PORTAL_DEV_MEMORY === '1') {
    instance = memKV()
  } else {
    throw new Error(
      'Client portal storage is not configured. Add an Upstash Redis database from the Vercel Marketplace (sets KV_REST_API_URL and KV_REST_API_TOKEN), or set PORTAL_DEV_MEMORY=1 for local testing.'
    )
  }
  return instance
}
