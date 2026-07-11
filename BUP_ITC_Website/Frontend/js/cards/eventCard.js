import { resolveImageUrl } from "../api.js";

function normalizeTags(tags) {
  if (Array.isArray(tags)) {
    return tags
      .flatMap(tag => String(tag).split(","))
      .map(tag => tag.trim())
      .filter(Boolean);
  }

  if (typeof tags === "string") {
    return tags
      .split(",")
      .map(tag => tag.trim())
      .filter(Boolean);
  }

  return [];
}

export function createEventCard(event, isHome) {

let status = "Upcoming";
let statusClass = "bg-blue-600";

if (event.date) {
  const today = new Date();
  const eventDate = new Date(event.date);

  if (eventDate < today) {
    status = "Completed";
    statusClass = "bg-gray-600";
  }
}

let tagsHTML = "";
const tags = normalizeTags(event.tags);

if (tags.length > 0) {

  const visibleTags = tags.slice(0, 3);
  const remaining = tags.length - visibleTags.length;

  visibleTags.forEach(tag => {
    tagsHTML += `
      <span class="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-md">
        ${tag}
      </span>
    `;
  });

  if (remaining > 0) {
    tagsHTML += `
      <span class="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded-md">
        +${remaining}
      </span>
    `;
  }

}

const imageUrl = resolveImageUrl(event.image, "https://picsum.photos/600/400");

const card = document.createElement("div");

card.className = isHome
? "bg-white rounded-2xl shadow-card-light hover:shadow-card-light-hover overflow-hidden transition transform hover:-translate-y-2 group"
: "bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl shadow-card-dark hover:shadow-card-dark-hover overflow-hidden transition transform hover:-translate-y-2 group";

card.innerHTML = `

<div class="relative h-48 overflow-hidden">

<img 
  src="${imageUrl}"
  alt="event image"
  loading="lazy"
  class="w-full h-full object-cover group-hover:scale-110 transition duration-500"
  onerror="this.onerror=null; this.src='https://picsum.photos/600/400';"
/>

<span class="absolute top-3 right-3 text-xs px-3 py-1 rounded-full text-white ${statusClass}">
${status}
</span>

</div>

<div class="p-6">

<h3 class="text-xl font-semibold ${isHome ? 'text-gray-900' : 'text-blue-400'} mb-2">
${event.title || "Untitled Event"}
</h3>

<p class="text-sm ${isHome ? 'text-gray-500' : 'text-gray-400'} mb-4">
${event.description || ""}
</p>

<div class="flex flex-wrap gap-2 mb-4">
${tagsHTML}
</div>

<div class="space-y-2 text-sm ${isHome ? 'text-gray-600' : 'text-gray-300'} mb-6">

<div class="flex items-center gap-2">
<span>📅</span>
<span>${event.date || "TBA"}</span>
</div>

<div class="flex items-center gap-2">
<span>🕒</span>
<span>${event.time || "TBA"}</span>
</div>

<div class="flex items-center gap-2">
<span>📍</span>
<span>${event.location || "TBA"}</span>
</div>

<div class="flex items-center gap-2">
<span>👥</span>
<span>${event.attendees || "Attendees"}</span>
</div>

</div>

<a href="event-details.html?id=${event._id}"
class="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
View Details
</a>

</div>
`;

return card;

}
