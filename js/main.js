(() => {
  const root = document.documentElement;
  const header = document.querySelector("[data-header]");
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  const mobileLinks = mobileNav?.querySelectorAll("a") ?? [];
  const yearElements = document.querySelectorAll("[data-current-year]");

  const getPreferredTheme = () => {
    const storedTheme = localStorage.getItem("portfolio-theme");

    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  };

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);

    if (themeToggle) {
      const nextTheme = theme === "dark" ? "light" : "dark";
      themeToggle.setAttribute(
        "aria-label",
        `Switch to ${nextTheme} color theme`
      );
      themeToggle.setAttribute(
        "title",
        `Switch to ${nextTheme} color theme`
      );
    }
  };

  const closeMenu = () => {
    if (!menuToggle || !mobileNav) {
      return;
    }

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    mobileNav.classList.remove("open");
    header?.classList.remove("menu-visible");
    document.body.classList.remove("menu-open");
  };

  const openMenu = () => {
    if (!menuToggle || !mobileNav) {
      return;
    }

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
    mobileNav.classList.add("open");
    header?.classList.add("menu-visible");
    document.body.classList.add("menu-open");
  };

  setTheme(getPreferredTheme());

  themeToggle?.addEventListener("click", () => {
    const currentTheme = root.dataset.theme;
    setTheme(currentTheme === "dark" ? "light" : "dark");
  });

  menuToggle?.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    isExpanded ? closeMenu() : openMenu();
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });

  const updateHeader = () => {
    header?.classList.toggle("scrolled", window.scrollY > 20);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  yearElements.forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
})();