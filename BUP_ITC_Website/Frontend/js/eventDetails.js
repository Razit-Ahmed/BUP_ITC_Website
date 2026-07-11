import API_BASE_URL, { resolveImageUrl } from "./api.js";

const container = document.getElementById("eventDetails");

const params = new URLSearchParams(window.location.search);

const id = params.get("id");


async function loadEvent() {

  try {

    const response = await fetch(
      `${API_BASE_URL}/api/events/${id}`
    );

    const event = await response.json();

    const imageUrl = resolveImageUrl(
      event.image,
      "https://picsum.photos/1200/700"
    );

    const tags = Array.isArray(event.tags)
      ? event.tags
      : [];

    let tagsHTML = "";

    tags.forEach(tag => {

      tagsHTML += `
        <span class="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 text-sm">
          ${tag}
        </span>
      `;

    });

    container.innerHTML = `

<section class="relative h-[500px] overflow-hidden">

<img
src="${imageUrl}"
class="absolute inset-0 w-full h-full object-cover opacity-40"
/>

<div class="absolute inset-0 bg-black/60"></div>

<div class="relative z-10 h-full flex items-center">

<div class="max-w-6xl mx-auto px-6 w-full">

<div class="max-w-3xl">

<div class="inline-block px-4 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm mb-6">
${event.tags?.[0] || "Event"}
</div>

<h1 class="text-5xl font-bold mb-6">
${event.title}
</h1>

<div class="flex flex-wrap gap-6 text-gray-300">

<div>
📅 ${event.date || "TBA"}
</div>

<div>
🕒 ${event.time || "TBA"}
</div>

<div>
📍 ${event.location || "TBA"}
</div>

</div>

</div>

</div>

</div>

</section>



<section class="py-20">

<div class="max-w-5xl mx-auto px-6">

<div class="bg-gray-900 border border-gray-800 rounded-3xl p-10 mb-10">

<h2 class="text-3xl font-bold mb-6">
About This Event
</h2>

<p class="text-gray-300 leading-relaxed whitespace-pre-line">
${event.description || "No description available."}
</p>

</div>



<div class="bg-gray-900 border border-gray-800 rounded-3xl p-10">

<h2 class="text-3xl font-bold mb-10">
Event Details
</h2>

<div class="grid md:grid-cols-2 gap-6 mb-10">

<div class="bg-gray-800 rounded-2xl p-6">
<h3 class="text-xl font-semibold mb-2">Date</h3>
<p class="text-gray-400">
${event.date || "TBA"}
</p>
</div>

<div class="bg-gray-800 rounded-2xl p-6">
<h3 class="text-xl font-semibold mb-2">Time</h3>
<p class="text-gray-400">
${event.time || "TBA"}
</p>
</div>

<div class="bg-gray-800 rounded-2xl p-6">
<h3 class="text-xl font-semibold mb-2">Location</h3>
<p class="text-gray-400">
${event.location || "TBA"}
</p>
</div>

<div class="bg-gray-800 rounded-2xl p-6">
<h3 class="text-xl font-semibold mb-2">Attendees</h3>
<p class="text-gray-400">
${event.attendees || "N/A"}
</p>
</div>

</div>


<div>

<h3 class="text-2xl font-semibold mb-5">
Tags
</h3>

<div class="flex flex-wrap gap-3">
${tagsHTML}
</div>

</div>

</div>

</div>

</section>

`;

  } catch (error) {

    container.innerHTML = `

<div class="text-center py-20">

<h2 class="text-3xl font-bold text-red-400 mb-4">
Failed to load event
</h2>

<p class="text-gray-400">
Something went wrong.
</p>

</div>

`;

  }

}

loadEvent();