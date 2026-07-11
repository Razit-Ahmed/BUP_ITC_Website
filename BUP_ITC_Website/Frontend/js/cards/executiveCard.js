import { resolveImageUrl } from "../api.js";

export function createExecutiveCard(person, isHome) {
const fallbackImage = "../assets/images/executives/default.svg";
const imageUrl = resolveImageUrl(person.image, fallbackImage);
const departmentOrBatch = person.department || person.batch || "";

const linkedinUrl = person.linkedin
  ? (person.linkedin.startsWith("http://") || person.linkedin.startsWith("https://")
      ? person.linkedin
      : `https://${person.linkedin}`)
  : null;

const card = document.createElement("div");

card.className = isHome
  ? "bg-white rounded-2xl shadow-card-light hover:shadow-card-light-hover overflow-hidden transition transform hover:-translate-y-2 group"
  : "bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl shadow-card-dark hover:shadow-card-dark-hover overflow-hidden transition transform hover:-translate-y-2 group";


const linkedinButton = linkedinUrl
  ? `
<a href="${linkedinUrl}" target="_blank" rel="noopener noreferrer"
class="absolute top-3 right-3 bg-blue-600 hover:bg-blue-700 p-2 rounded-full shadow-lg transition">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
fill="white" viewBox="0 0 24 24">
<path d="M4.98 3.5C4.98 4.88 3.88 6 2.49 6 1.11 6 0 4.88 0 3.5 0 2.12
1.11 1 2.49 1c1.39 0 2.49 1.12 2.49 2.5zM.22 8.98h4.54V24H.22V8.98zM8.56
8.98h4.35v2.05h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.48 3.04
5.48 6.99V24h-4.54v-7.65c0-1.82-.03-4.16-2.53-4.16-2.53
0-2.92 1.98-2.92 4.03V24H8.56V8.98z"/>
</svg>
</a>
`
  : "";

card.innerHTML = `

<div class="relative overflow-hidden">

<img
src="${imageUrl}"
alt="${person.name}"
class="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
onerror="this.onerror=null; this.src='${fallbackImage}';"
/>

<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

${linkedinButton}

</div>

<div class="p-6 text-left">

<h3 class="text-lg font-semibold ${isHome ? 'text-gray-900' : 'text-white'}">
${person.name}
</h3>

<p class="${isHome ? 'text-blue-600' : 'text-blue-400'} text-sm mt-1">
• ${departmentOrBatch}
</p>

<p class="${isHome ? 'text-gray-600' : 'text-gray-300'} text-sm mt-2">
${person.position || ""}
</p>

</div>
`;

return card;

}
