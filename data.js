/* =========================================================
   Product catalog — shared across index.html and products.html
   ========================================================= */

window.ARTISAN_PRODUCTS = [
  {
    id: "candle-amber-oakmoss",
    name: "Amber & Oakmoss Candle",
    category: "candles",
    price: 28,
    desc: "Hand-poured soy wax in a reclaimed glass jar. Slow-burns for 45+ hours.",
    custom: "Choose your scent & vessel"
  },
  {
    id: "candle-fireside-trio",
    name: "Fireside Trio Set",
    category: "candles",
    price: 62,
    desc: "Three seasonal scents poured the same week you order, boxed as a set.",
    custom: "Pick 3 scents from the workshop list"
  },
  {
    id: "candle-birch-taper",
    name: "Birch Taper Pair",
    category: "candles",
    price: 19,
    desc: "Unscented beeswax tapers, hand-dipped and trimmed to your table's height.",
    custom: "Set your preferred length"
  },
  {
    id: "pottery-stoneware-mug",
    name: "Wheel-Thrown Stoneware Mug",
    category: "pottery",
    price: 34,
    desc: "A slightly-imperfect mug, thrown and glazed by hand in small batches.",
    custom: "Choose your glaze color"
  },
  {
    id: "pottery-serving-bowl",
    name: "Speckled Serving Bowl",
    category: "pottery",
    price: 58,
    desc: "Stoneware bowl with an iron-speckle glaze, food-safe and dishwasher-friendly.",
    custom: "Choose size: small, medium, large"
  },
  {
    id: "pottery-ring-dish",
    name: "Ceramic Ring Dish",
    category: "pottery",
    price: 22,
    desc: "A small catch-all dish for the nightstand, glazed inside and out.",
    custom: "Add a stamped initial"
  },
  {
    id: "wood-walnut-board",
    name: "Walnut Cutting Board",
    category: "woodwork",
    price: 76,
    desc: "End-grain walnut, oiled and ready for the kitchen counter or the table.",
    custom: "Engrave initials or a date"
  },
  {
    id: "wood-live-edge-shelf",
    name: "Live-Edge Floating Shelf",
    category: "woodwork",
    price: 94,
    desc: "A single slab shelf with the tree's natural edge left intact, hardware included.",
    custom: "Choose wood species & length"
  },
  {
    id: "keepsake-engraved-box",
    name: "Engraved Keepsake Box",
    category: "keepsakes",
    price: 48,
    desc: "A small hinged box for rings, letters, or anything worth keeping close.",
    custom: "Engrave a name, date, or short line"
  },
  {
    id: "keepsake-guest-book",
    name: "Wooden Wedding Guest Book",
    category: "keepsakes",
    price: 66,
    desc: "Pages bound between two hand-sanded wood covers, ready to be signed.",
    custom: "Add names & a wedding date"
  }
];

/* Simple line-icon markup by category, reused on card render */
window.ARTISAN_ICONS = {
  candles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c1.2 1.6 1.8 2.7 1.8 3.6a1.8 1.8 0 1 1-3.6 0C10.2 4.7 10.8 3.6 12 2Z"/><path d="M8 9h8l1 11.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7 20.5Z"/><path d="M8 13h8"/></svg>',
  pottery: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8c0-2.2 3.1-4 7-4s7 1.8 7 4-3.1 4-7 4-7-1.8-7-4Z"/><path d="M5 8v8.5C5 18.9 8.1 21 12 21s7-2.1 7-4.5V8"/><path d="M8 11.5c1 .6 2.5 1 4 1s3-.4 4-1"/></svg>',
  woodwork: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="9" width="18" height="7" rx="1.5"/><path d="M6 9V7.5A1.5 1.5 0 0 1 7.5 6h9A1.5 1.5 0 0 1 18 7.5V9"/><path d="M7 16v2M17 16v2"/></svg>',
  keepsakes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="9" width="17" height="11" rx="1.5"/><path d="M3.5 12.5h17"/><path d="M8 9V7a4 4 0 0 1 8 0v2"/><circle cx="12" cy="15.7" r="1.1" fill="currentColor" stroke="none"/></svg>'
};

window.ARTISAN_CATEGORY_LABELS = {
  candles: "Candles",
  pottery: "Pottery",
  woodwork: "Woodwork",
  keepsakes: "Keepsakes"
};
