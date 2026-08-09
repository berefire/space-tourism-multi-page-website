export function initNavHighlight() {
  const links = document.querySelectorAll("[data-nav-link]");

  const normalize = (pathname) =>
    pathname.replace(/index\.html$/, "").replace(/\/$/, "") || "/";

  const currentPath = normalize(window.location.pathname);

  links.forEach((link) => {
    const linkPath = normalize(new URL(link.href).pathname);

    if (linkPath === currentPath) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}