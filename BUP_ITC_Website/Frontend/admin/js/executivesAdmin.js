import { adminFetchForm, adminFetchJson } from "./adminApi.js";

const API = "/admin/executives";

let editingId = null;

const form = document.getElementById("executiveForm");
const submitBtn = document.getElementById("submitBtn");

function resetForm() {
  editingId = null;
  form.reset();
  submitBtn.innerText = "Add Executive";
}

async function fetchExecutives() {
  try {
    const data = await adminFetchJson(API);
    const container = document.getElementById("executivesList");

    if (!data.length) {
      container.innerHTML = "<p class='text-gray-400'>No executives added yet.</p>";
      return;
    }

    container.innerHTML = data.map((person) => `
      <div class="bg-gray-800 p-4 rounded">
        <h3 class="text-white text-lg font-semibold">${person.name}</h3>
        <p class="text-gray-400">${person.position || ""}</p>
        <p class="text-gray-500 text-sm">${person.department || ""}</p>

        <div class="flex gap-2 mt-2">
          <button onclick="editExecutive('${person._id}')" class="bg-yellow-500 px-3 py-1 rounded">
            Edit
          </button>

          <button onclick="deleteExecutive('${person._id}')" class="bg-red-500 px-3 py-1 rounded">
            Delete
          </button>
        </div>
      </div>
    `).join("");
  } catch (error) {
    console.error("Failed to load executives:", error);
    document.getElementById("executivesList").innerHTML =
      "<p class='text-red-400'>Failed to load executives.</p>";
  }
}

async function editExecutive(id) {
  try {
    const data = await adminFetchJson(`${API}/${id}`);

    editingId = data._id;

    document.getElementById("name").value = data.name || "";
    document.getElementById("position").value = data.position || "";
    document.getElementById("department").value = data.department || data.batch || "";
    document.getElementById("linkedin").value = data.linkedin || "";

    submitBtn.innerText = "Update Executive";
  } catch (error) {
    console.error("Failed to load executive:", error);
  }
}

async function deleteExecutive(id) {
  try {
    await adminFetchJson(`${API}/${id}`, {
      method: "DELETE"
    });

    if (editingId === id) {
      resetForm();
    }

    await fetchExecutives();
  } catch (error) {
    console.error("Failed to delete executive:", error);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const formData = new FormData();

    formData.append("name", document.getElementById("name").value);
    formData.append("position", document.getElementById("position").value);
    formData.append("department", document.getElementById("department").value);
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
    await fetchExecutives();
  } catch (error) {
    console.error("Failed to save executive:", error);
  }
});

window.editExecutive = editExecutive;
window.deleteExecutive = deleteExecutive;

fetchExecutives();
