document.addEventListener("DOMContentLoaded", function () {

const footer = document.getElementById("footer");
if (!footer) return;

footer.innerHTML = `

<footer class="relative bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-gray-300 overflow-hidden">

<!-- Glow Effects -->
<div class="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-3xl"></div>
<div class="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500 opacity-20 rounded-full blur-3xl"></div>

<div class="relative z-10 max-w-7xl mx-auto px-6 py-16">

<div class="grid md:grid-cols-3 gap-12">

<!-- Club Info -->
<div>
<h3 class="text-white text-xl font-semibold mb-4">
BUP ITC
</h3>

<p class="text-gray-400 leading-relaxed mb-6">
Empowering students through technology, innovation, collaboration,
and hands-on learning experiences.
</p>

<div class="flex space-x-4">

<a href="https://www.facebook.com/share/1DpacDC5zB/"
   target="_blank"
   rel="noopener noreferrer"
   class="hover:text-white transition">
   Facebook
</a>

<a href="#" class="hover:text-white transition">
   LinkedIn
</a>

<a href="#" class="hover:text-white transition">
   GitHub
</a>

</div>

</div>

<!-- Quick Links -->
<div>

<h3 class="text-white text-xl font-semibold mb-4">
Quick Links
</h3>

<ul class="space-y-3">

<li>
<a href="about.html"
class="hover:text-white transition hover:translate-x-1 inline-block">
About
</a>
</li>

<li>
<a href="events.html"
class="hover:text-white transition hover:translate-x-1 inline-block">
Events
</a>
</li>

<li>
<a href="press.html"
class="hover:text-white transition hover:translate-x-1 inline-block">
Press
</a>
</li>

<li>
<a href="executive.html"
class="hover:text-white transition hover:translate-x-1 inline-block">
Executive Body
</a>
</li>

</ul>

</div>

<!-- Contact -->
<div>

<h3 class="text-white text-xl font-semibold mb-4">
Contact
</h3>

<p class="text-gray-400 mb-2">
Email: bupinfotech@gmail.com
</p>

<p class="text-gray-400 mb-4">
Location: BUP Campus, Dhaka
</p>

<a href="join.html"
class="inline-block bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white font-medium transition">
Join the Club
</a>

</div>

</div>

<!-- Divider -->
<div class="border-t border-blue-800 mt-12 pt-6 text-center text-gray-500 text-sm">

© ${new Date().getFullYear()} BUP Info Tech Club. All rights reserved.<br>
Developed by Asif Ahmed Rezvi.

</div>

</div>

</footer>

`;

});