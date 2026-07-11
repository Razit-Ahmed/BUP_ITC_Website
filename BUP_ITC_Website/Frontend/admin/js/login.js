const API_BASE =
  (window.location.hostname === "localhost" ||
   window.location.hostname === "127.0.0.1")
    ? "http://localhost:3000"
    : window.location.origin;

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const data = Object.fromEntries(new FormData(form));

  try {

    const res = await fetch(`${API_BASE}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (res.ok) {

      localStorage.setItem("adminToken", result.token);

      window.location.href = "./dashboard.html";

    } else {

      document.getElementById("message").innerHTML =
        `<span class="text-red-400">${result.message}</span>`;

    }

  } catch (err) {

    document.getElementById("message").innerHTML =
      `<span class="text-red-400">Server error</span>`;

  }

});