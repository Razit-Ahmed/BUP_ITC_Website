import { adminFetchForm, adminFetchJson } from "./adminApi.js";

const API = "/admin/events";

let editingId = null;

const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("image");
const preview = document.getElementById("previewImage");
const form = document.getElementById("eventForm");
const submitBtn = document.getElementById("submitBtn");

dropZone.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", () => {
  handleFile(fileInput.files[0]);
});

dropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropZone.classList.add("border-blue-500");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("border-blue-500");
});

dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  dropZone.classList.remove("border-blue-500");

  const file = event.dataTransfer.files[0];
  fileInput.files = event.dataTransfer.files;

  handleFile(file);
});

function handleFile(file) {
  if (!file) {
    return;
  }

  const reader = new FileReader();

  reader.onload = (event) => {
    preview.src = event.target.result;
    preview.classList.remove("hidden");
  };

  reader.readAsDataURL(file);
}

function resetForm() {
  editingId = null;
  form.reset();
  preview.classList.add("hidden");
  preview.removeAttribute("src");
  submitBtn.innerText = "Add Event";
}

function normalizeTagsForInput(tags) {
  if (Array.isArray(tags)) {
    return tags.join(", ");
  }

  return tags || "";
}

async function fetchEvents() {
  try {
    const data = await adminFetchJson(API);
    const container = document.getElementById("eventsList");

    if (!data.length) {
      container.innerHTML = "<p class='text-gray-400'>No events added yet.</p>";
      return;
    }

    container.innerHTML = data.map((event) => `
      <div class="bg-gray-800 p-4 rounded">
        <h3 class="text-white text-lg font-semibold">${event.title}</h3>
        <p class="text-gray-400">${event.date || "Date not set"}</p>

        <div class="flex gap-2 mt-2">
          <button onclick="editEvent('${event._id}')" class="bg-yellow-500 px-3 py-1 rounded">
            Edit
          </button>

          <button onclick="deleteEvent('${event._id}')" class="bg-red-500 px-3 py-1 rounded">
            Delete
          </button>
        </div>
      </div>
    `).join("");
  } catch (error) {
    console.error("Failed to load events:", error);
    document.getElementById("eventsList").innerHTML =
      "<p class='text-red-400'>Failed to load events.</p>";
  }
}

async function editEvent(id) {
  try {
    const event = await adminFetchJson(`${API}/${id}`);

    editingId = event._id;

    document.getElementById("title").value = event.title || "";
    document.getElementById("description").value = event.description || "";
    document.getElementById("date").value = event.date || "";
    document.getElementById("time").value = event.time || "";
    document.getElementById("location").value = event.location || "";
    document.getElementById("tags").value = normalizeTagsForInput(event.tags);
    document.getElementById("attendees").value = event.attendees || "";

    submitBtn.innerText = "Update Event";
  } catch (error) {
    console.error("Failed to load event:", error);
  }
}

async function deleteEvent(id) {
  try {
    await adminFetchJson(`${API}/${id}`, {
      method: "DELETE"
    });

    if (editingId === id) {
      resetForm();
    }

    await fetchEvents();
  } catch (error) {
    console.error("Failed to delete event:", error);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const formData = new FormData();

    formData.append("title", document.getElementById("title").value);
    formData.append("description", document.getElementById("description").value);
    formData.append("date", document.getElementById("date").value);
    formData.append("time", document.getElementById("time").value);
    formData.append("location", document.getElementById("location").value);
    formData.append("tags", document.getElementById("tags").value);
    formData.append("attendees", document.getElementById("attendees").value);

    if (fileInput.files[0]) {
      formData.append("image", fileInput.files[0]);
    }

    if (editingId) {
      await adminFetchForm(`${API}/${editingId}`, "PUT", formData);
    } else {
      await adminFetchForm(API, "POST", formData);
    }

    resetForm();
    await fetchEvents();
  } catch (error) {
    console.error("Failed to save event:", error);
  }
});

window.editEvent = editEvent;
window.deleteEvent = deleteEvent;

fetchEvents();
