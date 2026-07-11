import { getPress } from "./api.js";
import { createPressCard } from "./cards/pressCard.js";

document.addEventListener("DOMContentLoaded", async () => {

  const container = document.getElementById("pressContainer");
  if (!container) return;

  try {
    let press = await getPress();

    
    const isHome = document.body.dataset.page === "home";

    if (isHome) {
      press = press.slice(0, 2);
    }

    container.innerHTML = "";

    
    press.forEach(item => {
      const card = createPressCard(item, isHome);
      container.appendChild(card);
    });

  } catch (error) {

    container.innerHTML =
      "<p class='text-center text-gray-500'>Unable to load press releases.</p>";

    console.error(error);

  }

});
