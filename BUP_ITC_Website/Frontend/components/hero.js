(function () {

  function renderHero(el) {

    const title = el.dataset.title || "";
    const subtitle = el.dataset.subtitle || "";
    const badge = el.dataset.badge || "";

    const badgeHTML = badge
      ? '<div class="inline-block bg-blue-600/30 text-blue-200 px-4 py-1 rounded-full text-sm mb-6">' + badge + '</div>'
      : "";

    const heroHTML =
      '<section class="relative bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white pt-32 pb-28 overflow-hidden">' +

        '<div class="absolute inset-0 opacity-10 pointer-events-none ' +
        'bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),' +
        'linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] ' +
        'bg-[size:40px_40px]"></div>' +

        '<div class="max-w-5xl mx-auto px-6 text-center relative z-10">' +

          badgeHTML +

          '<h1 class="text-4xl md:text-5xl font-bold mb-6 ' +
          'bg-gradient-to-r from-white via-blue-200 to-blue-400 ' +
          'bg-clip-text text-transparent">' +
          title +
          '</h1>' +

          '<p class="text-gray-300 max-w-3xl mx-auto text-lg">' +
          subtitle +
          '</p>' +

        '</div>' +

      '</section>';

    el.outerHTML = heroHTML;
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-hero]").forEach(renderHero);
  });

})();