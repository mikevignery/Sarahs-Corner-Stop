/* =========================================================
   Front-end-only account demo.
   IMPORTANT: This stores account + order data in the browser's
   localStorage only. There is no server, so data lives on this
   device/browser, isn't encrypted, and won't sync across devices.
   Replace this file with real API calls when a backend exists.
   ========================================================= */
(function () {
  "use strict";

  var USERS_KEY = "artisanoak_users";
  var SESSION_KEY = "artisanoak_session";
  var STORAGE_OK = true;

  try {
    var t = "__t__";
    localStorage.setItem(t, "1");
    localStorage.removeItem(t);
  } catch (err) {
    STORAGE_OK = false;
  }

  function getUsers() {
    if (!STORAGE_OK) return {};
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
    } catch (err) {
      return {};
    }
  }
  function saveUsers(users) {
    if (!STORAGE_OK) return;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
  function getSession() {
    if (!STORAGE_OK) return null;
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    } catch (err) {
      return null;
    }
  }
  function setSession(email) {
    if (!STORAGE_OK) return;
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email: email }));
  }
  function clearSession() {
    if (!STORAGE_OK) return;
    localStorage.removeItem(SESSION_KEY);
  }

  function seedDemoUser() {
    var users = getUsers();
    if (!users["demo@artisanandoak.com"]) {
      users["demo@artisanandoak.com"] = {
        name: "Demo Customer",
        email: "demo@artisanandoak.com",
        password: "demo1234",
        orders: [
          { id: "AO-1042", item: "Walnut Cutting Board — engraved \u201cThe Reyes Family\u201d", date: "2026-04-02", status: "delivered", price: 76 },
          { id: "AO-1078", item: "Amber & Oakmoss Candle", date: "2026-05-18", status: "shipped", price: 28 },
          { id: "AO-1103", item: "Engraved Keepsake Box — \u201cFor Mom\u201d", date: "2026-06-24", status: "workshop", price: 48 }
        ]
      };
      saveUsers(users);
    }
  }
  seedDemoUser();

  // ---------- DOM ----------
  var authShell = document.getElementById("auth-shell");
  var dashboard = document.getElementById("dashboard");
  if (!authShell && !dashboard) return; // not on account.html

  var tabs = document.querySelectorAll(".auth-tab");
  var panels = document.querySelectorAll(".auth-panel");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.remove("active"); });
      panels.forEach(function (p) { p.classList.remove("active"); });
      tab.classList.add("active");
      document.getElementById(tab.getAttribute("data-panel")).classList.add("active");
    });
  });

  var fillDemoBtn = document.getElementById("fill-demo");
  if (fillDemoBtn) {
    fillDemoBtn.addEventListener("click", function () {
      document.getElementById("login-email").value = "demo@artisanandoak.com";
      document.getElementById("login-password").value = "demo1234";
    });
  }

  function setError(fieldEl, message) {
    var field = fieldEl.closest(".field");
    field.classList.toggle("has-error", !!message);
    var err = field.querySelector(".field-error");
    if (err) err.textContent = message || "";
  }

  // ---------- Login ----------
  var loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = document.getElementById("login-email");
      var password = document.getElementById("login-password");
      setError(email, "");
      setError(password, "");

      if (!email.value.trim()) { setError(email, "Enter the email you signed up with."); return; }
      if (!password.value) { setError(password, "Enter your password."); return; }

      var users = getUsers();
      var user = users[email.value.trim().toLowerCase()];
      if (!user || user.password !== password.value) {
        setError(password, "That email and password don't match our demo records.");
        return;
      }
      setSession(user.email);
      renderApp();
    });
  }

  // ---------- Sign up ----------
  var signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("signup-name");
      var email = document.getElementById("signup-email");
      var password = document.getElementById("signup-password");
      [name, email, password].forEach(function (f) { setError(f, ""); });

      if (!name.value.trim()) { setError(name, "Tell us what to call you."); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { setError(email, "Enter a valid email address."); return; }
      if (password.value.length < 6) { setError(password, "Use at least 6 characters."); return; }

      var users = getUsers();
      var key = email.value.trim().toLowerCase();
      if (users[key]) { setError(email, "An account with this email already exists — try logging in."); return; }

      users[key] = { name: name.value.trim(), email: key, password: password.value, orders: [] };
      saveUsers(users);
      setSession(key);
      renderApp();
    });
  }

  // ---------- Logout ----------
  document.addEventListener("click", function (e) {
    if (e.target.matches("[data-logout]")) {
      clearSession();
      renderApp();
    }
  });

  // ---------- Dashboard render ----------
  var statusLabels = { workshop: "In the workshop", shipped: "Shipped", delivered: "Delivered" };

  function orderCard(o) {
    return (
      '<div class="order-card">' +
        '<span class="order-id">#' + o.id + "</span>" +
        '<div class="order-info"><h3>' + o.item + "</h3><span>Ordered " + o.date + "</span></div>" +
        '<span class="order-status status-' + o.status + '">' + statusLabels[o.status] + "</span>" +
        '<span class="order-price">$' + o.price + "</span>" +
      "</div>"
    );
  }

  function renderApp() {
    var session = getSession();
    if (!STORAGE_OK) {
      if (authShell) authShell.style.display = "block";
      if (dashboard) dashboard.style.display = "none";
      var warn = document.getElementById("storage-warning");
      if (warn) warn.style.display = "block";
      return;
    }

    if (session) {
      var users = getUsers();
      var user = users[session.email];
      if (!user) { clearSession(); renderApp(); return; }

      if (authShell) authShell.style.display = "none";
      if (dashboard) dashboard.style.display = "block";

      var nameEl = document.getElementById("dash-name");
      if (nameEl) nameEl.textContent = user.name.split(" ")[0];

      var listEl = document.getElementById("order-list");
      var emptyEl = document.getElementById("order-empty");
      if (user.orders && user.orders.length) {
        if (listEl) { listEl.style.display = "grid"; listEl.innerHTML = user.orders.map(orderCard).join(""); }
        if (emptyEl) emptyEl.style.display = "none";
      } else {
        if (listEl) { listEl.style.display = "none"; listEl.innerHTML = ""; }
        if (emptyEl) emptyEl.style.display = "block";
      }
    } else {
      if (authShell) authShell.style.display = "block";
      if (dashboard) dashboard.style.display = "none";
    }
  }

  renderApp();
})();
