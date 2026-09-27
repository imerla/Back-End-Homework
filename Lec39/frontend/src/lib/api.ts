import type { SignInBody, SignUpBody, UpdateUserBody, User } from "./types";

const TOKEN_KEY = "accessToken";

export const tokenStorage = {
  get: () => (typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY)),
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function request<T>(path: string, init: RequestInit = {}, auth = false): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body) headers.set("Content-Type", "application/json");
  if (auth) {
    const token = tokenStorage.get();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`/api${path}`, { ...init, headers });
  const text = await res.text();
  let data: unknown = text;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    // sign-up / sign-in raw string-ს აბრუნებს და არა JSON-ს
  }

  if (!res.ok) {
    const message = (data as { message?: string | string[] } | null)?.message;
    throw new ApiError(
      res.status,
      Array.isArray(message) ? message.join(", ") : message ?? res.statusText,
    );
  }
  return data as T;
}

export const api = {
  signUp: (body: SignUpBody) =>
    request<string>("/auth/sign-up", { method: "POST", body: JSON.stringify(body) }),
  signIn: (body: SignInBody) =>
    request<string>("/auth/sign-in", { method: "POST", body: JSON.stringify(body) }),
  currentUser: () => request<User>("/auth/current-user", {}, true),

  getUsers: () => request<User[]>("/users"),
  getUser: (id: string) => request<User>(`/users/${id}`),
  updateMe: (body: UpdateUserBody) =>
    request<User>("/users", { method: "PATCH", body: JSON.stringify(body) }, true),
  deleteMe: () => request<User>("/users", { method: "DELETE" }, true),
  deleteUser: (id: string) => request<User>(`/users/${id}`, { method: "DELETE" }, true),
};
