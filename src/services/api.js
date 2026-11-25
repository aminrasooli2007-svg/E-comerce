
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000/api";

async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("nik-market-token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type");

  const data = contentType?.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    const message =
      data?.detail ||
      data?.message ||
      "خطایی در ارتباط با سرور رخ داد";

    throw new Error(message);
  }

  return data;
}

const api = {
  get: (endpoint) =>
    apiRequest(endpoint),

  post: (endpoint, body) =>
    apiRequest(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: (endpoint, body) =>
    apiRequest(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  patch: (endpoint, body) =>
    apiRequest(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  delete: (endpoint) =>
    apiRequest(endpoint, {
      method: "DELETE",
    }),
};

export default api;
