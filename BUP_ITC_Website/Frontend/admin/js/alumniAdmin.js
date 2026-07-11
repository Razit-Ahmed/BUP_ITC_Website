import { adminFetchForm, adminFetchJson } from "./adminApi.js";

const API = "/admin/alumni";

let editingId = null;

const form = document.getElementById("alumniForm");
const submitBtn = document.getElementById("submitBtn");

function resetForm() {
  editingId = null;
  form.reset();
  submitBtn.innerText = "Add Alumni";
}

async function fetchAlumni() {
  try {
    const data = await adminFetchJson(API);
    const container = document.getElementById("alumniList");

    if (!data.length) {
      container.innerHTML = "<p class='text-gray-400'>No alumni added yet.</p>";
      return;
    }

    container.innerHTML = data.map((person) => `
      <div class="bg-gray-800 p-4 rounded">
        <h3 class="text-white text-lg font-semibold">${person.name || "No Name"}</h3>
        <p class="text-gray-400">${person.position || ""}</p>
        <p class="text-gray-500 text-sm">${person.batch || ""}</p>

        <div class="flex gap-2 mt-2">
          <button onclick="editAlumni('${person._id}')" class="bg-yellow-500 px-3 py-1 rounded">
            Edit
          </button>

          <button onclick="deleteAlumni('${person._id}')" class="bg-red-500 px-3 py-1 rounded">
            Delete
          </button>
        </div>
      </div>
    `).join("");
  } catch (error) {
    console.error("Failed to load alumni:", error);
    document.getElementById("alumniList").innerHTML =
      "<p class='text-red-400'>Failed to load alumni.</p>";
  }
}

async function editAlumni(id) {
  try {
    const data = await adminFetchJson(`${API}/${id}`);

    editingId = data._id;

    document.getElementById("name").value = data.name || "";
    document.getElementById("position").value = data.position || "";
    document.getElementById("batch").value = data.batch || "";
    document.getElementById("linkedin").value = data.linkedin || "";

    submitBtn.innerText = "Update Alumni";
  } catch (error) {
    console.error("Failed to load alumni:", error);
  }
}

async function deleteAlumni(id) {
  try {
    await adminFetchJson(`${API}/${id}`, {
      method: "DELETE"
    });

    if (editingId === id) {
      resetForm();
    }

    await fetchAlumni();
  } catch (error) {
    console.error("Failed to delete alumni:", error);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const formData = new FormData();

    formData.append("name", document.getElementById("name").value);
    formData.append("position", document.getElementById("position").value);
    formData.append("batch", document.getElementById("batch").value);
    formData.append("linkedin", document.getElementById("linkedin").value);

    const fileInput = document.getElementById("imageFile");
    if (fileInput.files[0]) {
      formData.append("image", fileInput.files[0]);
    }

    if (editingId) {
      await adminFetchForm(`${API}/${editingId}`, "PUT", formData);
    } else {
      await adminFetchForm(API, "POST", formData);
    }

    resetForm();
    await fetchAlumni();
  } catch (error) {
    console.error("Failed to save alumni:", error);
  }
});

window.editAlumni = editAlumni;
window.deleteAlumni = deleteAlumni;

fetchAlumni();
