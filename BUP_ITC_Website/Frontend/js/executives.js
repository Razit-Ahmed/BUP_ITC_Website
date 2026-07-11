import { getExecutives } from "./api.js";
import { createExecutiveCard } from "./cards/executiveCard.js";

async function loadExecutives() {
  const container = document.getElementById("executivesContainer");
  if (!container) return;

  try {
    let executives = await getExecutives();

    
    const isHome = document.body.dataset.page === "home";

    
    if (isHome) {
      executives = executives.filter(exec =>
        exec.position === "President" ||
        exec.position === "General Secretary" ||
        exec.position === "Vice President"
      );
    }

    container.innerHTML = "";

    executives.forEach(exec => {
      const card = createExecutiveCard(exec, isHome);
      container.appendChild(card);
    });

  } catch (error) {
    container.innerHTML =
      "<p class='text-red-500 text-center'>Unable to load executives.</p>";
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", loadExecutives);
