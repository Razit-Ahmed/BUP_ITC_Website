import { getSettings, submitRegistration } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {

  const status = document.getElementById("registrationStatus");
  const form = document.getElementById("registrationForm");

  try {
    const data = await getSettings();

    if (data.registrationOpen) {

      status.innerHTML = `
      <span class="inline-block bg-green-900 text-green-400 px-4 py-2 rounded-full text-sm">
      Registration Open
      </span>
      `;

      form.classList.remove("hidden");

    } else {

      
      status.innerHTML = `
      <span class="inline-block bg-gray-800 text-gray-400 px-4 py-2 rounded-full text-sm">
      Registration Closed
      </span>

      <div class="mt-6 text-center">
        <p class="text-gray-400 mb-3">
          Already applied? Check your application status.
        </p>
        <a href="check-status.html"
           class="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg">
           Check Status
        </a>
      </div>
      `;

      form.classList.add("hidden");
    }

  } catch (err) {

    console.error("Failed to fetch registration status:", err);

    status.innerHTML = `
    <span class="inline-block bg-red-900 text-red-400 px-4 py-2 rounded-full text-sm">
    Unable to load registration status
    </span>
    `;

  }

  const joinForm = document.getElementById("joinForm");

  if (joinForm) {

    joinForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(joinForm);
      const data = Object.fromEntries(formData.entries());

      try {
        const result = await submitRegistration(data);

        document.getElementById("formMessage").innerHTML =
          `<span class='text-green-400'>${result.message}</span>`;

        joinForm.reset();

      } catch (err) {

        console.error(err);

        document.getElementById("formMessage").innerHTML =
          "<span class='text-red-400'>Server error. Please try later.</span>";

      }

    });

  }

});
