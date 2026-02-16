/* =========================================
   KK Portfolio - Vanilla JS
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const overlay = document.getElementById("mobile-overlay");
  const drawer = document.getElementById("mobile-drawer");
  const hamburgerIcon = document.getElementById("hamburger-icon");
  const closeIcon = document.getElementById("close-icon");
  const navLinks = document.querySelectorAll("[data-nav-link]");
  const sections = document.querySelectorAll("section[id]");

  let mobileOpen = false;

  /* --- Mobile menu toggle --- */
  function toggleMobile() {
    mobileOpen = !mobileOpen;
    overlay.classList.toggle("open", mobileOpen);
    drawer.classList.toggle("open", mobileOpen);
    hamburgerIcon.style.display = mobileOpen ? "none" : "block";
    closeIcon.style.display = mobileOpen ? "block" : "none";
    hamburger.setAttribute(
      "aria-label",
      mobileOpen ? "Fermer le menu" : "Ouvrir le menu"
    );
  }

  function closeMobile() {
    mobileOpen = false;
    overlay.classList.remove("open");
    drawer.classList.remove("open");
    hamburgerIcon.style.display = "block";
    closeIcon.style.display = "none";
    hamburger.setAttribute("aria-label", "Ouvrir le menu");
  }

  hamburger.addEventListener("click", toggleMobile);
  overlay.addEventListener("click", closeMobile);

  /* --- Smooth scroll for nav links --- */
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var targetId = this.getAttribute("href").replace("#", "");
      var target = document.getElementById(targetId);
      if (target) {
        var isMobile = window.innerWidth < 1024;
        var offset = isMobile ? 65 + 16 : 16;
        var y =
          target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      closeMobile();
    });
  });

  /* --- Logo click scrolls to top --- */
  document.querySelectorAll("[data-logo]").forEach(function (logo) {
    logo.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      closeMobile();
    });
  });

  /* --- Active section tracking on scroll --- */
  function updateActiveSection() {
    var scrollOffset = 120;
    var current = "";

    sections.forEach(function (section) {
      var top = section.getBoundingClientRect().top;
      if (top <= scrollOffset) {
        current = section.id;
      }
    });

    navLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      if (href === "#" + current) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveSection, { passive: true });
  updateActiveSection();
});
