import API_BASE_URL from "./api.js";

const form = document.getElementById("statusForm");
const result = document.getElementById("result");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const formData = new FormData(form);
  const studentId = formData.get("studentId");
  const email = formData.get("email");

  try {

    const query = studentId
      ? `studentId=${studentId}`
      : `email=${email}`;

    const res = await fetch(
      `${API_BASE_URL}/api/registration/status?${query}`
    );

    const data = await res.json();

    if (!res.ok) {
      result.innerHTML =
        `<span class="text-red-400">${data.message}</span>`;
      return;
    }

    let color = "text-yellow-400";

    if (data.status === "accepted") color = "text-green-400";
    if (data.status === "rejected") color = "text-red-400";

    result.innerHTML = `
      <p class="text-lg font-semibold">${data.name}</p>
      <p class="mt-2 ${color}">
        Status: ${data.status.toUpperCase()}
      </p>
    `;

  } catch (err) {

    result.innerHTML =
      `<span class="text-red-400">Server error</span>`;

  }

});