import { resolveImageUrl } from "../api.js";

export function createPressCard(item, isHome) {
const imageUrl = resolveImageUrl(item.image, "https://picsum.photos/600/400");


const fullText = item.description || "";
const shortText =
  fullText.length > 120 ? fullText.slice(0, 120) + "..." : fullText;

let expanded = false;

const card = document.createElement("div");

card.className = isHome
? "bg-white rounded-2xl shadow-card-light overflow-hidden transition"
: "bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl shadow-card-dark overflow-hidden transition";

card.innerHTML = `

<div class="h-48 overflow-hidden">
  <img 
    src="${imageUrl}"
    class="w-full h-full object-cover transition duration-500"
    onerror="this.onerror=null; this.src='https://picsum.photos/600/400';"
  />
</div>

<div class="p-6">

<div class="flex items-center justify-between mb-4">

<span class="text-xs font-semibold px-3 py-1 rounded-full
${isHome ? 'bg-blue-100 text-blue-700' : 'bg-blue-500/20 text-blue-300'}">
${item.category || "Announcement"}
</span>

<span class="text-sm text-gray-400">
${item.date}
</span>

</div>

<h3 class="text-xl font-semibold mb-3
${isHome ? 'text-gray-900' : 'text-white'}">
${item.title}
</h3>

<p id="desc" class="text-sm mb-4
${isHome ? 'text-gray-600' : 'text-gray-300'}">
${shortText}
</p>

<button id="toggleBtn"
class="font-semibold text-sm
${isHome ? 'text-blue-600 hover:text-blue-800' : 'text-blue-400 hover:text-blue-300'}">
Read More →
</button>

</div>
`;

const desc = card.querySelector("#desc");
const btn = card.querySelector("#toggleBtn");


btn.addEventListener("click", () => {
  expanded = !expanded;

  if (expanded) {
    desc.textContent = fullText;
    btn.textContent = "Show Less ↑";
  } else {
    desc.textContent = shortText;
    btn.textContent = "Read More →";
  }
});

return card;
}
