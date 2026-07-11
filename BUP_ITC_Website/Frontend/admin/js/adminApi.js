export const API_BASE =
  (window.location.hostname === "localhost" ||
   window.location.hostname === "127.0.0.1")
    ? "http://localhost:3000"
    : window.location.origin;

function getAuthToken() {
  return localStorage.getItem("adminToken");
}

function redirectToLogin() {
  localStorage.removeItem("adminToken");
  window.location.href = "./login.html";
}

export function createAuthHeaders(headers = {}) {
  const token = getAuthToken();

  return token
    ? {
        ...headers,
        Authorization: `Bearer ${token}`
      }
    : headers;
}

async function parseResponse(res) {
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : null;

  if (res.status === 401) {
    redirectToLogin();
    throw new Error(data?.message || "Unauthorized");
  }

  if (!res.ok) {
    throw new Error(data?.message || `Request failed with status ${res.status}`);
  }

  return data;
}

export async function adminFetchJson(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: createAuthHeaders(options.headers || {})
  });

  return parseResponse(res);
}

export async function adminFetchForm(endpoint, method, formData) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers: createAuthHeaders(),
    body: formData
  });

  return parseResponse(res);
}

export async function getRegistrations() {
  return adminFetchJson("/admin/registrations");
}

export async function updateRegistration(id, status) {
  return adminFetchJson(`/admin/registrations/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status })
  });
}
