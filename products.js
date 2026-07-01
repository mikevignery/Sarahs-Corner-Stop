/* =========================================================
   Renders product tag-cards into any [data-product-grid] container.
   Supports an optional filter bar and a result limit (for "featured").
   ========================================================= */
(function () {
  "use strict";

  function money(n) {
    return "$" + n.toFixed(0);
  }

  function cardHTML(p) {
    var icon = window.ARTISAN_ICONS[p.category] || "";
    var label = window.ARTISAN_CATEGORY_LABELS[p.category] || p.category;
    return (
      '<article class="product-card" data-category="' + p.category + '">' +
        '<div class="product-visual"><span class="punch"></span>' + icon + "</div>" +
        '<div class="product-body">' +
          '<span class="product-cat">' + label + "</span>" +
          "<h3>" + p.name + "</h3>" +
          '<p class="product-desc">' + p.desc + "</p>" +
          '<p class="product-custom">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>' +
            p.custom +
          "</p>" +
          '<div class="product-foot">' +
            '<span class="product-price">' + money(p.price) + "</span>" +
            '<a class="btn btn-outline btn-sm" href="contact.html?item=' + encodeURIComponent(p.name) + '">Start this order</a>' +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  function render(container, list) {
    container.innerHTML = list.map(cardHTML).join("");
  }

  document.querySelectorAll("[data-product-grid]").forEach(function (grid) {
    var all = window.ARTISAN_PRODUCTS.slice();
    var limit = grid.getAttribute("data-limit");
    var initial = limit ? all.slice(0, parseInt(limit, 10)) : all;
    render(grid, initial);

    var filterBar = document.querySelector("[data-filter-bar='" + grid.id + "']");
    if (filterBar) {
      filterBar.addEventListener("click", function (e) {
        var chip = e.target.closest(".filter-chip");
        if (!chip) return;
        filterBar.querySelectorAll(".filter-chip").forEach(function (c) {
          c.classList.remove("active");
        });
        chip.classList.add("active");
        var cat = chip.getAttribute("data-category");
        var filtered = cat === "all" ? all : all.filter(function (p) { return p.category === cat; });
        render(grid, filtered);
      });
    }
  });
})();
