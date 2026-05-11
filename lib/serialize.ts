// Convert Mongoose lean() docs (with ObjectId, Date, Buffer) into plain
// JSON-safe objects for passing across the server/client boundary.
// Faster and clearer than JSON.parse(JSON.stringify(x)).

export function serialize<T = any>(value: any): T {
  if (value === null || value === undefined) return value as T;

  if (Array.isArray(value)) return value.map((v) => serialize(v)) as T;

  if (value instanceof Date) return value.toISOString() as unknown as T;

  if (typeof value === "object") {
    const v = value as Record<string, unknown>;

    if (typeof (v as { toHexString?: () => string }).toHexString === "function") {
      return (v as { toHexString: () => string }).toHexString() as unknown as T;
    }

    if (v.constructor && v.constructor.name === "Buffer") {
      return undefined as unknown as T;
    }

    const out: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(v)) {
      if (key === "__v") continue;
      const s = serialize(val);
      if (s !== undefined) out[key] = s;
    }
    return out as T;
  }

  return value as T;
}
