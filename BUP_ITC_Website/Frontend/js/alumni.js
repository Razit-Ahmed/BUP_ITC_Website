import { getAlumni } from "./api.js";
import { createExecutiveCard } from "./cards/executiveCard.js";

document.addEventListener("DOMContentLoaded", async () => {

  const container = document.getElementById("alumniContainer");
  if (!container) return;

  try {
    const alumni = await getAlumni();

    container.innerHTML = "";

    
    const groups = {};

    alumni.forEach(person => {
      const batch = person.batch || "Unknown";
      if (!groups[batch]) groups[batch] = [];
      groups[batch].push(person);
    });

    const batches = Object.keys(groups).sort().reverse();

    
    batches.forEach((batch, index) => {

      const members = groups[batch];

      const panel = document.createElement("div");
      panel.className =
        "bg-gray-900 rounded-xl overflow-hidden border border-gray-800";

      panel.innerHTML = `
        <button class="w-full flex justify-between items-center p-6
        text-left text-white font-semibold text-lg
        hover:bg-gray-800 transition">

          <span>${batch} — Alumni Panel</span>
          <span class="text-blue-400 text-xl">▼</span>

        </button>

        <div class="${index === 0 ? '' : 'hidden'} p-6 grid md:grid-cols-3 sm:grid-cols-2 gap-8"></div>
      `;

      const cardsContainer = panel.querySelector("div");

      
      members.forEach(member => {
        const card = createExecutiveCard({
          name: member.name,
          position: member.position,
          batch: member.batch,
          image: member.image,
          linkedin: member.linkedin
        });

        cardsContainer.appendChild(card);

      });

      container.appendChild(panel);

    });

   
    const buttons = container.querySelectorAll("button");

    buttons.forEach(btn => {

      btn.addEventListener("click", () => {

        const content = btn.nextElementSibling;
        const allPanels = container.querySelectorAll("button + div");

        allPanels.forEach(panel => {
          if (panel !== content) panel.classList.add("hidden");
        });

        content.classList.toggle("hidden");

      });

    });

  } catch (error) {

    container.innerHTML =
      "<p class='text-red-400 text-center'>Unable to load alumni.</p>";

    console.error(error);

  }

});
