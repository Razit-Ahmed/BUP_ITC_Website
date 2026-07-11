import { getEvents } from "./api.js";
import { createEventCard } from "./cards/eventCard.js";

document.addEventListener("DOMContentLoaded", async () => {

  const container = document.getElementById("eventsContainer");
  if (!container) return;

  try {

    
    const events = await getEvents();

    
    const isHome = document.body.dataset.page === "home";

    
    let displayEvents = events;
    if (isHome) {
      displayEvents = events.slice(0, 3);
    }

    container.innerHTML = "";

    displayEvents.forEach(event => {
      const card = createEventCard(event, isHome);
      container.appendChild(card);
    });

  } catch (error) {

    container.innerHTML =
      "<p class='text-center text-gray-500'>Unable to load events.</p>";

    console.error("Error loading events:", error);

  }

});