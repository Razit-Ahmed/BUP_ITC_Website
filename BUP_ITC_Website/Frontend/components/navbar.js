document.addEventListener("DOMContentLoaded", function () {

const navbar = document.getElementById("navbar");
if (!navbar) return;

navbar.innerHTML = `

<header id="mainNavbar"
class="fixed top-0 left-0 w-full z-50 transition duration-300
backdrop-blur-md bg-blue-950/70 border-b border-blue-800/40">

  <!-- Glow Effects -->
  <div class="absolute -top-20 -left-20 w-72 h-72 bg-blue-500 opacity-20 rounded-full blur-3xl"></div>
  <div class="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-500 opacity-20 rounded-full blur-3xl"></div>

  <div class="relative z-10 max-w-7xl mx-auto px-6">

    <nav class="flex items-center justify-between py-4">

      <!-- Logo -->
      <div class="text-xl font-bold text-blue-400">
        BUP ITC
      </div>

      <!-- Menu -->
      <ul class="hidden md:flex items-center space-x-8 text-gray-200">

        <li>
          <a href="index.html"
          class="nav-link relative group">
          Home
          <span class="absolute left-0 -bottom-2 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </li>

        <li>
          <a href="about.html"
          class="nav-link relative group">
          About
          <span class="absolute left-0 -bottom-2 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </li>

        <li>
          <a href="alumni.html"
          class="nav-link relative group">
          Alumni
          <span class="absolute left-0 -bottom-2 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </li>

        <li>
          <a href="events.html"
          class="nav-link relative group">
          Events
          <span class="absolute left-0 -bottom-2 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </li>

        <li>
          <a href="press.html"
          class="nav-link relative group">
          Press
          <span class="absolute left-0 -bottom-2 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </li>

        <li>
          <a href="executive.html"
          class="nav-link relative group">
          Executive Body
          <span class="absolute left-0 -bottom-2 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </li>

      </ul>

      <!-- Join Button -->
      <a href="join.html"
      class="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-medium transition">
      Join Now
      </a>

    </nav>

  </div>

</header>
`;




const mainNavbar = document.getElementById("mainNavbar");

window.addEventListener("scroll", function () {

if (window.scrollY > 50) {
mainNavbar.classList.add("bg-blue-950/90","shadow-lg");
} else {
mainNavbar.classList.remove("bg-blue-950/90","shadow-lg");
}

});




const currentPage = window.location.pathname.split("/").pop();

const links = document.querySelectorAll(".nav-link");

links.forEach(link => {

const linkPage = link.getAttribute("href");

if (linkPage === currentPage) {

link.classList.add("text-blue-400","font-semibold");

const underline = link.querySelector("span");
underline.classList.remove("w-0");
underline.classList.add("w-full");

}

});

});