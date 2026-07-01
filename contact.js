/* =========================================================
   Contact form — client-side validation + simulated submission.
   No backend is connected; swap the setTimeout block for a real
   fetch() to your form endpoint / email service when ready.
   ========================================================= */
(function () {
  "use strict";

  var form = document.getElementById("contact-form");
  if (!form) return;

  // Pre-fill from ?item= when arriving via a "Start this order" link
  var params = new URLSearchParams(window.location.search);
  var item = params.get("item");
  if (item) {
    var msg = document.getElementById("contact-message");
    var select = document.getElementById("contact-interest");
    if (msg) msg.value = 'I\u2019d like to start a custom order for: ' + item + '.\n\nHere\u2019s what I have in mind: ';
    if (select) {
      var lower = item.toLowerCase();
      ["candles", "pottery", "woodwork", "keepsakes"].forEach(function (cat) {
        if (lower.indexOf(cat.slice(0, -1)) !== -1 || lower.indexOf(cat) !== -1) {
          select.value = cat;
        }
      });
    }
  }

  function setError(fieldEl, message) {
    var field = fieldEl.closest(".field");
    field.classList.toggle("has-error", !!message);
    var err = field.querySelector(".field-error");
    if (err) err.textContent = message || "";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = document.getElementById("contact-name");
    var email = document.getElementById("contact-email");
    var message = document.getElementById("contact-message");
    var status = document.getElementById("form-status");
    var submitBtn = form.querySelector("button[type='submit']");

    [name, email, message].forEach(function (f) { setError(f, ""); });
    var valid = true;

    if (!name.value.trim()) { setError(name, "Let us know your name."); valid = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { setError(email, "Enter a valid email address."); valid = false; }
    if (!message.value.trim() || message.value.trim().length < 10) { setError(message, "Tell us a little more (10+ characters)."); valid = false; }

    if (!valid) {
      status.className = "form-status show error";
      status.textContent = "Please fix the highlighted fields and try again.";
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending\u2026";
    status.className = "form-status";

    // Simulated network delay — this is a front-end demo, nothing is sent anywhere.
    setTimeout(function () {
      status.className = "form-status show success";
      status.textContent = "Message sent \u2014 thank you! We reply within 2 business days.";
      submitBtn.disabled = false;
      submitBtn.textContent = "Send message";
      form.reset();
    }, 900);
  });
})();
