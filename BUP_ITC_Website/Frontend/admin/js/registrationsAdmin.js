import { getRegistrations, updateRegistration } from "./adminApi.js";

const container = document.getElementById("registrationsList");

async function load() {
  try {

    const data = await getRegistrations();

    if (!data.length) {
      container.innerHTML = "<p>No registrations found.</p>";
      return;
    }

    container.innerHTML = data.map(r => `
      <div class="bg-gray-900 p-5 rounded-xl border border-gray-800">

        <h3 class="text-lg font-semibold">${r.name}</h3>

        <p class="text-sm text-gray-400">${r.email}</p>
        <p class="text-sm">ID: ${r.studentId}</p>
        <p class="text-sm">Dept: ${r.department}</p>
        <p class="text-sm">Batch: ${r.batch}</p>
        <p class="text-sm"><b>Portfolio:</b> ${r.portfolio || "-"}</p>

        <p class="mt-3 text-sm"><b>Skills:</b> ${r.skills || "-"}</p>
        <p class="text-sm"><b>Motivation:</b> ${r.motivation}</p>

        <div class="mt-4 flex justify-between items-center">

          <span class="
            px-3 py-1 rounded text-xs
            ${r.status === "accepted" ? "bg-green-700" :
              r.status === "rejected" ? "bg-red-700" :
              "bg-yellow-600"}
          ">
            ${r.status}
          </span>

          <div class="space-x-2">
            <button onclick="approve('${r._id}')" class="bg-green-600 px-3 py-1 rounded">
              Accept
            </button>

            <button onclick="reject('${r._id}')" class="bg-red-600 px-3 py-1 rounded">
              Reject
            </button>
          </div>

        </div>

      </div>
    `).join("");

  } catch (err) {
    console.error(err);
    container.innerHTML = "<p class='text-red-400'>Failed to load registrations</p>";
  }
}


window.approve = async (id) => {
  await updateRegistration(id, "accepted");
  load();
};

window.reject = async (id) => {
  await updateRegistration(id, "rejected");
  load();
};

load();
