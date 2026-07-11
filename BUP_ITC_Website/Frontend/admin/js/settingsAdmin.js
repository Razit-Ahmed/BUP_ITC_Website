import { adminFetchJson } from "./adminApi.js";

const statusDiv = document.getElementById("registrationStatus");
const toggleBtn = document.getElementById("toggleBtn");

let currentStatus = false;

async function loadStatus() {
  try {
    const data = await adminFetchJson("/api/settings");

    currentStatus = data.registrationOpen;
    statusDiv.innerHTML = currentStatus
      ? `<span class="text-green-400">Registration is OPEN</span>`
      : `<span class="text-gray-400">Registration is CLOSED</span>`;

    toggleBtn.textContent = currentStatus
      ? "Close Registration"
      : "Open Registration";
  } catch (error) {
    console.error("Failed to load settings:", error);
  }
}

toggleBtn.addEventListener("click", async () => {
  try {
    await adminFetchJson("/api/settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        registrationOpen: !currentStatus
      })
    });

    await loadStatus();
  } catch (error) {
    console.error("Toggle failed:", error);
  }
});

loadStatus();
