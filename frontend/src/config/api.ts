// src/config/api.ts
import { Platform } from "react-native";


/* -------------------------------------------------------------------------- */
/*                               Base URL & Env                               */
/* -------------------------------------------------------------------------- */
const DEFAULTS = {
  ios: "http://172.20.10.2:4000",
  android: "http://172.20.10.2:4000",
  deviceFallback: "http://172.20.10.2:4000",
};

let API_PREFIX = "";

function joinURL(base: string, ...parts: string[]) {
  const strip = (s: string) => s.replace(/(^\/+|\/+$)/g, "");
  return [base.replace(/\/+$/, ""), ...parts.map(strip)].join("/");
}

function resolveDefaultBaseURL() {
  const envUrl = process.env.EXPO_PUBLIC_API_BASE_URL || process.env.API_BASE_URL;
  if (envUrl) return String(envUrl).replace(/\/+$/, "");
  if (Platform.OS === "ios") return DEFAULTS.ios;
  if (Platform.OS === "android") return DEFAULTS.android;
  return DEFAULTS.deviceFallback;
}

let BASE_URL = resolveDefaultBaseURL();
export function setBaseURL(url: string) {
  BASE_URL = url.replace(/\/+$/, "");
}
export function getBaseURL() {
  return BASE_URL;
}
export function setApiPrefix(prefix: string) {
  API_PREFIX = prefix.startsWith("/") ? prefix : `/${prefix}`;
}
export function getApiPrefix() {
  return API_PREFIX;
}

/* -------------------------------------------------------------------------- */
/*                                Auth Scheme                                 */
/* -------------------------------------------------------------------------- */
let AUTH_SCHEME: "Bearer" | "JWT" | "Token" = "Bearer";
export function setAuthScheme(s: "Bearer" | "JWT" | "Token") {
  AUTH_SCHEME = s;
}
export function getAuthScheme() {
  return AUTH_SCHEME;
}

/* -------------------------------------------------------------------------- */
/*                           AsyncStorage Token Utils                          */
/* -------------------------------------------------------------------------- */
async function getAsyncStorage() {
  try {
    const mod = await import("@react-native-async-storage/async-storage").catch(() => null);
    return mod?.default || null;
  } catch {
    return null;
  }
}
const TOKEN_KEY = "auth_token";
const REFRESH_KEY = "auth_refresh_token";

export async function setToken(token: string | null) {
  const AS = await getAsyncStorage();
  if (!AS) {
    (global as any).__TMP_TOKEN__ = token;
    return;
  }
  if (token == null) await AS.removeItem(TOKEN_KEY);
  else await AS.setItem(TOKEN_KEY, String(token));
}
export async function getToken(): Promise<string | null> {
  const AS = await getAsyncStorage();
  if (!AS) return (global as any).__TMP_TOKEN__ ?? null;
  return (await AS.getItem(TOKEN_KEY)) as string | null;
}
export async function setRefreshToken(token: string | null) {
  const AS = await getAsyncStorage();
  if (!AS) {
    (global as any).__TMP_REFRESH__ = token;
    return;
  }
  if (token == null) await AS.removeItem(REFRESH_KEY);
  else await AS.setItem(REFRESH_KEY, String(token));
}
export async function getRefreshToken(): Promise<string | null> {
  const AS = await getAsyncStorage();
  if (!AS) return (global as any).__TMP_REFRESH__ ?? null;
  return (await AS.getItem(REFRESH_KEY)) as string | null;
}
export async function clearToken() {
  await setToken(null);
  await setRefreshToken(null);
}

/* -------------------------------------------------------------------------- */
/*                                 Debugging                                   */
/* -------------------------------------------------------------------------- */
export async function debugAuth(label: string = "[api]") {
  const access = await getToken();
  const refresh = await getRefreshToken();
  const shown = access ? `${String(access).slice(0, 12)}…` : "(null)";
  console.log(`${label} baseURL: ${getBaseURL()}`);
  console.log(`${label} prefix : ${getApiPrefix()}`);
  console.log(`${label} scheme : ${getAuthScheme()}`);
  console.log(`${label} token  : ${shown}  refresh: ${refresh ? "yes" : "no"}`);
}

export async function authPing(): Promise<number> {
  try {
    const { res } = await request("/auth/me", { method: "GET" });
    return res.status;
  } catch (e: any) {
    return e?.status ?? -1;
  }
}

/* -------------------------------------------------------------------------- */
/*                                Core Wrapper                                 */
/* -------------------------------------------------------------------------- */
type ReqOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: any;
  auth?: boolean;
  timeoutMs?: number;
  retrySchemesOn401?: boolean;
};

async function doFetch(url: string, init: RequestInit, timeoutMs: number) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(t);
  }
}
async function makeUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path;

  const prefix = getApiPrefix();
  const base = getBaseURL();

  // prefix empty ho to beech ka empty segment hata do
  if (!prefix) {
    return joinURL(base, path);
  }

  return joinURL(base, prefix, path);
}


/* ----------------------------- Refresh Handling ---------------------------- */
let refreshInFlight = false;
let refreshWaiters: Array<(t: string | null) => void> = [];

async function runRefresh(): Promise<string | null> {
  const [access, refresh] = await Promise.all([getToken(), getRefreshToken()]);
  if (!access || !refresh) return null;

  // parallel refresh avoid karo
  if (refreshInFlight) {
    return new Promise<string | null>((resolve) => refreshWaiters.push(resolve));
  }

  refreshInFlight = true;

  try {
    const url = await makeUrl("/auth/refresh");

    const res = await doFetch(
      url,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          // tumhara backend yahi expect karta hai
          Authorization: `${AUTH_SCHEME} ${access}`,
          "x-refresh-token": refresh,
        },
      },
      20000
    );

    let data: any = null;
    try {
      data = await res.json();
    } catch {}

    if (!res.ok) {
      const msg =
        (data && (data.message || data.error || data.detail)) ||
        `HTTP ${res.status}`;
      throw new Error(msg);
    }

    const newAccess = pickAccessTokenFrom(data);
    const newRefresh = pickRefreshTokenFrom(data);

    if (newAccess) await setToken(newAccess);
    if (newRefresh) await setRefreshToken(newRefresh);

    // agar backend sirf refresh return kare, access nahi, to purana access use kar lo
    return newAccess ?? access;
  } catch (e) {
    // refresh fail to dono tokens clear
    await clearToken();
    return null;
  } finally {
    refreshInFlight = false;
    const token = await getToken();
    refreshWaiters.forEach((fn) => fn(token));
    refreshWaiters = [];
  }
}


async function request<T = any>(
  path: string,
  opts: ReqOptions = {}
): Promise<{ data: T; res: Response }> {
  const {
    method = "GET",
    headers = {},
    body,
    auth = true,
    timeoutMs = 20000,
    retrySchemesOn401 = true,
  } = opts;

  const url = await makeUrl(path);
  
  const hdrs: Record<string, string> = { Accept: "application/json", ...headers };
  
  console.log("🌐 [API] Final request URL:", url, "method:", method);


  let finalBody: any = body;
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
  if (body && typeof body === "object" && !isFormData) {
    hdrs["Content-Type"] = hdrs["Content-Type"] ?? "application/json";
    if (hdrs["Content-Type"].includes("application/json")) finalBody = JSON.stringify(body);
  }

  // Add Authorization
  let token: string | null = null;
  if (auth) {
    token = await getToken();
    if (token && !hdrs["Authorization"]) hdrs["Authorization"] = `${AUTH_SCHEME} ${token}`;
  }

  // First attempt
  let res = await doFetch(url, { method, headers: hdrs, body: finalBody }, timeoutMs);

  // Try header scheme permutations (Bearer/JWT/Token) if 401
  if (auth && token && res.status === 401 && retrySchemesOn401) {
    const schemes: Array<"Bearer" | "JWT" | "Token"> = ["Bearer", "JWT", "Token"];
    let startIdx = schemes.indexOf(AUTH_SCHEME);
    if (startIdx < 0) startIdx = 0;
    for (let i = 0; i < schemes.length; i++) {
      const sch = schemes[(startIdx + i) % schemes.length];
      if (`${sch} ${token}` === hdrs["Authorization"]) continue;
      const retryHeaders = { ...hdrs, Authorization: `${sch} ${token}` };
      res = await doFetch(url, { method, headers: retryHeaders, body: finalBody }, timeoutMs);
      if (res.status !== 401) {
        AUTH_SCHEME = sch;
        break;
      }
    }
  }

  // If still 401 → attempt refresh-token flow once
  if (auth && res.status === 401) {
    const newAccess = await runRefresh();
    if (newAccess) {
      const retryHeaders = { ...hdrs, Authorization: `${AUTH_SCHEME} ${newAccess}` };
      res = await doFetch(url, { method, headers: retryHeaders, body: finalBody }, timeoutMs);
    }
  }

  // Parse JSON
  let data: any = null;
  try {
    data = await res.json();
  } catch {}

    if (!res.ok) {
    let rawMsg = data && (data.message || data.error || data.detail);
    let msg: string;

    if (typeof rawMsg === "string") {
      msg = rawMsg;
    } else if (Array.isArray(rawMsg) && rawMsg.length > 0) {
      msg = String(rawMsg[0]);
    } else if (rawMsg && typeof rawMsg === "object") {
      // object aa gaya to JSON string bana do
      msg = JSON.stringify(rawMsg);
    } else {
      msg = `HTTP ${res.status}`;
    }

    const err: any = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }


  return { data, res };
}

/* -------------------------------------------------------------------------- */
/*                      Token pickers (flexible responses)                     */
/* -------------------------------------------------------------------------- */
function pickAccessTokenFrom(data: any): string | null {
  if (!data) return null;
  if (data.access) return String(data.access);

  // direct top level tokens
  const direct =
    data.token ||
    data.accessToken ||
    data.access_token ||
    data.jwt ||
    data.id_token ||
    null;
  if (direct) return String(direct);

  // common nested shapes
  if (data.session?.token) return String(data.session.token);
  if (data.data?.token) return String(data.data.token);
  if (data.data?.access) return String(data.data.access);
  if (data.data?.accessToken) return String(data.data.accessToken);
  if (data.data?.access_token) return String(data.data.access_token);

  // tumhara case: { tokens: { accessToken, refreshToken } }
  if (data.tokens?.accessToken) return String(data.tokens.accessToken);
  if (data.data?.tokens?.accessToken) return String(data.data.tokens.accessToken);

  if (data.tokens?.access?.token) return String(data.tokens.access.token);
  if (data.result?.token) return String(data.result.token);
  if (Array.isArray(data) && data[0]?.token) return String(data[0].token);
  return null;
}

function pickRefreshTokenFrom(data: any): string | null {
  if (!data) return null;
  if (data.refresh) return String(data.refresh);
  if (data.refreshToken) return String(data.refreshToken);
  if (data.refresh_token) return String(data.refresh_token);
  if (data.data?.refresh) return String(data.data.refresh);
  if (data.data?.refreshToken) return String(data.data.refreshToken);
  if (data.data?.refresh_token) return String(data.data.refresh_token);

  // tumhara case: { tokens: { accessToken, refreshToken } }
  if (data.tokens?.refreshToken) return String(data.tokens.refreshToken);
  if (data.data?.tokens?.refreshToken) return String(data.data.tokens.refreshToken);

  return null;
}

/* -------------------------------------------------------------------------- */
/*                              Public API Surface                             */
/* -------------------------------------------------------------------------- */
export const api = {
  get: <T = any>(path: string, headers?: Record<string, string>) =>
    request<T>(path, { method: "GET", headers }),
  post: <T = any>(path: string, body?: any, headers?: Record<string, string>) =>
    request<T>(path, { method: "POST", body, headers }),
  put: <T = any>(path: string, body?: any, headers?: Record<string, string>) =>
    request<T>(path, { method: "PUT", body, headers }),
  del: <T = any>(path: string, headers?: Record<string, string>) =>
    request<T>(path, { method: "DELETE", headers }),

  /** Login + persist tokens */
  async login(email: string, password: string, path: string = "/auth/login") {
    const { data } = await request<any>(path, {
      method: "POST",
      body: { email, password },
      auth: false,
    });

    const access = pickAccessTokenFrom(data);
    const refresh = pickRefreshTokenFrom(data);

    if (access) await setToken(access);
    if (refresh) await setRefreshToken(refresh);
    if (!access) console.warn("[api.login] No token found in response:", data);

    return data;
  },

  /** Manual refresh (rarely needed; request() does auto) */
  async refresh() {
    const token = await runRefresh();
    return token;
  },

  /** Logout helper */
  async logout() {
    await clearToken();
  },
};

/* -------------------------------------------------------------------------- */
/*                               Cloudinary Utils                              */
/* -------------------------------------------------------------------------- */
export async function uploadToCloudinaryUnsigned(
  localUri: string,
  opts: { cloudName: string; uploadPreset: string; folder?: string }
) {
  const fd = new FormData();
  fd.append(
    "file",
    { uri: localUri, name: "upload.jpg", type: "image/jpeg" } as any
  );
  fd.append("upload_preset", opts.uploadPreset);
  if (opts.folder) fd.append("folder", opts.folder);
  const url = `https://api.cloudinary.com/v1_1/${opts.cloudName}/image/upload`;
  const { data } = await request<any>(url, {
    method: "POST",
    body: fd,
    auth: false,
  });
  return data;
}
export async function uploadImageViaBackend(
  localUri: string,
  extra: Record<string, any> = { folder: "bepro/avatars" }
) {
  const fd = new FormData();
  fd.append(
    "file",
    { uri: localUri, name: "avatar.jpg", type: "image/jpeg" } as any
  );
  Object.entries(extra).forEach(([k, v]) => fd.append(k, String(v)));
  const { data } = await request<any>("/media/upload", {
    method: "POST",
    body: fd,
    auth: true,
  });
  return data;
}
