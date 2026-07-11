import { adminFetchForm, adminFetchJson } from "./adminApi.js";

const API = "/admin/press";

let editingId = null;

const form = document.getElementById("pressForm");
const submitBtn = document.getElementById("submitBtn");

function resetForm() {
  editingId = null;
  form.reset();
  submitBtn.innerText = "Add Press";
}

async function fetchPress() {
  try {
    const data = await adminFetchJson(API);
    const container = document.getElementById("pressList");

    if (!data.length) {
      container.innerHTML = "<p class='text-gray-400'>No press items added yet.</p>";
      return;
    }

    container.innerHTML = data.map((item) => `
      <div class="bg-gray-800 p-4 rounded">
        <h3 class="text-white text-lg">${item.title}</h3>
        <p class="text-gray-400">${item.date || "Date not set"}</p>

        <div class="flex gap-2 mt-2">
          <button onclick="editPress('${item._id}')" class="bg-yellow-500 px-3 py-1 rounded">
            Edit
          </button>

          <button onclick="deletePress('${item._id}')" class="bg-red-500 px-3 py-1 rounded">
            Delete
          </button>
        </div>
      </div>
    `).join("");
  } catch (error) {
    console.error("Failed to load press:", error);
    document.getElementById("pressList").innerHTML =
      "<p class='text-red-400'>Failed to load press items.</p>";
  }
}

async function editPress(id) {
  try {
    const item = await adminFetchJson(`${API}/${id}`);

    editingId = item._id;

    document.getElementById("title").value = item.title || "";
    document.getElementById("description").value = item.description || "";
    document.getElementById("date").value = item.date || "";
    document.getElementById("category").value = item.category || "";

    submitBtn.innerText = "Update Press";
  } catch (error) {
    console.error("Failed to load press item:", error);
  }
}

async function deletePress(id) {
  try {
    await adminFetchJson(`${API}/${id}`, {
      method: "DELETE"
    });

    if (editingId === id) {
      resetForm();
    }

    await fetchPress();
  } catch (error) {
    console.error("Failed to delete press item:", error);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const formData = new FormData();

    formData.append("title", document.getElementById("title").value);
    formData.append("description", document.getElementById("description").value);
    formData.append("date", document.getElementById("date").value);
    formData.append("category", document.getElementById("category").value);

    const file = document.getElementById("imageFile").files[0];
    if (file) {
      formData.append("image", file);
    }

    if (editingId) {
      await adminFetchForm(`${API}/${editingId}`, "PUT", formData);
    } else {
      await adminFetchForm(API, "POST", formData);
    }

    resetForm();
    await fetchPress();
  } catch (error) {
    console.error("Failed to save press item:", error);
  }
});

window.editPress = editPress;
window.deletePress = deletePress;

fetchPress();
