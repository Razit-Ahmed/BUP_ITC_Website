const API_BASE_URL =
 const API_BASE_URL =
  (window.location.hostname === "localhost" ||
   window.location.hostname === "127.0.0.1")
    ? "http://localhost:3000"
    : "https://bup-itc.onrender.com";
    
export default API_BASE_URL;

export function resolveImageUrl(imagePath, fallbackImage) {
  if (!imagePath) {
    return fallbackImage;
  }

  return imagePath.startsWith("/uploads")
    ? `${API_BASE_URL}${imagePath}`
    : imagePath;
}


async function request(endpoint, options = {}) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    throw new Error(data?.message || `API error: ${res.status}`);
  }

  return data;
}

/* Events */
export function getEvents() {
  return request("/api/events");
}

/* Press */
export function getPress() {
  return request("/api/press");
}

/* Executives */
export function getExecutives() {
  return request("/api/executives");
}

/* Alumni */
export function getAlumni() {
  return request("/api/alumni");
}

/* Registration status */
export function getSettings() {
  return request("/api/settings");
}

/* Submit registration form */
export function submitRegistration(data) {
  return request("/api/registration", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}
