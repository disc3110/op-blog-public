import { apiRequest } from "./apiClient";

const TOKEN_KEY = "authToken";

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function register({ name, email, password }) {
  const data = await apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

  // assuming API returns { user, token }
  if (data.token) {
    saveToken(data.token);
  }

  return data;
}

export async function login({ email, password }) {
  const data = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (data.token) {
    saveToken(data.token);
  }

  return data;
}

export async function getCurrentUser() {
  return apiRequest("/auth/me", {
    method: "GET",
  });
}

export function logout() {
  clearToken();
}