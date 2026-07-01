# Artisan & Oak — website

A 5-page responsive site: **Home, About, Products, Contact, Account**. Built with plain HTML, CSS, and JavaScript — no build step, no framework. Open `index.html` in a browser, or upload the whole folder to any static host.

## Folder structure
```
artisan-oak/
├── index.html         Home
├── about.html          About
├── products.html       Product catalog with category filters
├── contact.html        Contact form
├── account.html        Login / sign up / order-history dashboard
├── css/style.css        All styling (design tokens at the top)
├── js/
│   ├── main.js          Mobile nav, scroll reveal, footer year, newsletter demo
│   ├── data.js           Product catalog data + icons (edit this to add/remove products)
│   ├── products.js       Renders & filters the product grid
│   ├── auth.js            Login / sign up / dashboard logic
│   └── contact.js         Contact form validation + simulated send
└── images/               (empty — the design uses CSS/SVG instead of photos)
```

## Renaming the business
Search-and-replace across all `.html` files:
- `Artisan & Oak` → your business name
- `artisanandoak.com` / `hello@artisanandoak.com` → your domain/email
- `1420 SE Ash St, Portland, OR 97214` and `(503) 555-0148` → your real details
- Product list, categories, and prices live in `js/data.js`

Color palette, fonts, and spacing are all defined as CSS custom properties at the top of `css/style.css` under `:root` — change those values to re-theme the whole site at once.

## About the "log in to see purchases" feature
You asked for a **front-end-only demo**, so this is what's built:

- Accounts and orders are stored in the browser's `localStorage`. There is no server, no database, and no real password security — anyone using the same browser could open dev tools and read the stored data.
- Data does **not** sync across devices or browsers, and clearing browser data erases it.
- A demo account is seeded automatically the first time `account.html` loads:
  - **Email:** `demo@artisanandoak.com`
  - **Password:** `demo1234`
  - It comes with 3 sample orders so you can see the dashboard populated. New accounts you create through the "Create account" tab start with an empty order history (an empty state is shown).

### Moving to a real backend later
When you're ready for real accounts and order tracking, you'll need a backend (e.g. a small Node/Express, Django, or a hosted service like Firebase/Supabase) to:
1. Store users and hashed passwords securely (never store plain-text passwords, which this demo does for simplicity).
2. Create real orders when a purchase happens, instead of the simulated form in `contact.js`.
3. Replace the logic in `js/auth.js` (`getUsers`, `saveUsers`, login/signup handlers) with real API calls (`fetch('/api/login', ...)` etc.), and add a proper session mechanism (e.g. HTTP-only cookies) instead of `localStorage`.

The HTML/CSS structure (`#auth-shell`, `#dashboard`, `.order-card`, etc.) is ready to be driven by real data — only the JavaScript in `auth.js` would need to change.

## The contact form
`contact.html` validates input and shows a simulated "message sent" confirmation — it doesn't actually send anywhere yet. To make it real, point it at a form backend (Formspree, Netlify Forms, a serverless function, etc.) inside the `setTimeout` block in `js/contact.js`.

## Browser support
Modern evergreen browsers (Chrome, Firefox, Safari, Edge). Uses CSS Grid, `IntersectionObserver` (with a fallback), and respects `prefers-reduced-motion`.
