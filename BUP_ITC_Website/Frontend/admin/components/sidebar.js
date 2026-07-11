document.addEventListener("DOMContentLoaded", () => {

  const sidebar = document.getElementById("adminSidebar");

  if (!sidebar) return;

  sidebar.innerHTML = `
    <div class="w-64 bg-gray-900 p-6 space-y-4 min-h-screen">

      <h2 class="text-xl font-bold mb-6">Admin Panel</h2>

      <a href="dashboard.html" class="block hover:text-blue-400">Dashboard</a>
      <a href="registrations.html" class="block hover:text-blue-400">Registrations</a>
      <a href="events.html" class="block hover:text-blue-400">Events</a>
      <a href="press.html" class="block hover:text-blue-400">Press</a>
      <a href="executives.html" class="block hover:text-blue-400">Executives</a>
      <a href="alumni.html" class="block hover:text-blue-400">Alumni</a>

    </div>
  `;
});