import { createHmac, randomBytes, randomInt, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Admin sign-in: a one-time code is emailed to ADMIN_EMAIL, then a signed, httpOnly session cookie is set.
const COOKIE = "tsmg_admin";
const TTL_MS = 8 * 60 * 60 * 1000;

function secret() {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 32) throw new Error("SESSION_SECRET is missing or too short");
  return s;
}
const mac = (v: string) => createHmac("sha256", secret()).update(v).digest("base64url");
const same = (a: string, b: string) => {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

export const adminEmail = () => (process.env.ADMIN_EMAIL || "").trim().toLowerCase();

export function signSession(email: string, now = Date.now()) {
  const v = `${Buffer.from(email).toString("base64url")}.${now + TTL_MS}`;
  return `${v}.${mac(v)}`;
}

export function verifySession(token: string | undefined, now = Date.now()): string | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [e, exp, sig] = parts;
  if (!same(sig, mac(`${e}.${exp}`))) return null;
  if (!(Number(exp) > now)) return null;
  return Buffer.from(e, "base64url").toString();
}

export const hashCode = (email: string, code: string) => mac(`code:${email}:${code}`);
export const sameHash = same;
export const newCode = () => String(randomInt(0, 1_000_000)).padStart(6, "0");
export const newToken = () => randomBytes(32).toString("base64url");

export async function getAdmin() {
  const email = verifySession((await cookies()).get(COOKIE)?.value);
  const allowed = adminEmail();
  return email && allowed && email.toLowerCase() === allowed ? email : null;
}

export async function requireAdmin() {
  const a = await getAdmin();
  if (!a) redirect("/admin/login");
  return a;
}

export async function startSession(email: string) {
  (await cookies()).set(COOKIE, signSession(email), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: TTL_MS / 1000,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}
