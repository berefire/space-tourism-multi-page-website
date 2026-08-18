/**
 * Marks the nav link matching the current page with aria-current="page",
 * comparing pathnames rather than relying on a server-rendered "active"
 * state (this is a static multi-page site with no templating).
 *
 * Both the current URL and each link's href are normalized before
 * comparing, so that the site root ("/base-path/") and its equivalent
 * "/base-path/index.html" are treated as the same page — without this,
 * the Home link never matches on first load, since the browser's root
 * URL never includes "index.html" even though the link itself points
 * there explicitly.
 *
 * Safe to call on every page unconditionally: if no [data-nav-link]
 * elements exist, the forEach below simply does nothing.
 */

export function initNavHighlight() {
  const links = document.querySelectorAll("[data-nav-link]");

  /**
   * Reduces a pathname to a comparable canonical form by stripping a
   * trailing "index.html" and/or trailing slash, so "/foo/",
   * "/foo/index.html", and "/foo" all normalize to the same value.
   *
   * @param {string} pathname
   * @returns {string}
   */

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
