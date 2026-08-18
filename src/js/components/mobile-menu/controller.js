/**
 * Creates the state controller for the mobile navigation menu: tracks
 * open/closed state via aria-expanded, and keeps the nav's
 * accessibility state correct across the mobile/tablet breakpoint.
 *
 * @param {Object} params
 * @param {HTMLElement} params.menuButton - The hamburger toggle button.
 * @param {HTMLElement} params.primaryNavigation - The <nav> element
 *   containing the links, toggled open/closed on mobile.
 * @param {MediaQueryList} params.tabletMedia - Result of
 *   window.matchMedia(MEDIA_QUERIES.tablet) — determines whether the
 *   nav should behave as an always-visible bar (tablet+) or a
 *   toggleable off-canvas menu (mobile).
 * @returns {Readonly<{
 *   open: () => void,
 *   close: () => void,
 *   toggle: () => void,
 *   isOpen: () => boolean,
 *   syncResponsiveState: () => void
 * }>}
 */

export function createMenuController({
  menuButton,
  primaryNavigation,
  tabletMedia,
}) {
  const isOpen = () => menuButton.getAttribute("aria-expanded") === "true";

  const setButtonState = (expanded) => {
    menuButton.setAttribute("aria-expanded", String(expanded));
    menuButton.setAttribute(
      "aria-label",
      expanded ? "Close navigation" : "Open navigation",
    );
  };

  /**
   * Opens the mobile menu: updates the button's ARIA state and makes
   * the nav both visible (data-open, styled via CSS) and interactive
   * again (removing `inert`, which had blocked focus/clicks while closed).
   */

  const open = () => {
    setButtonState(true);

    primaryNavigation.dataset.open = "true";
    primaryNavigation.removeAttribute("inert");
  };

  /**
   * Closes the mobile menu. On mobile, also applies `inert` to the nav
   * — this prevents its (still visually present, off-canvas) links
   * from being focused via Tab or found by screen readers while
   * closed, which aria-hidden alone would not reliably do for
   * interactive elements. Skipped on tablet+, where the nav is always
   * visible and interactive regardless of this "open" state.
   */

  const close = () => {
    setButtonState(false);

    primaryNavigation.dataset.open = "false";

    if (!tabletMedia.matches) {
      primaryNavigation.setAttribute("inert", "");
    }
  };

  const toggle = () => {
    isOpen() ? close() : open();
  };

  /**
   * Resets the menu to the correct state for the current viewport.
   * Called on init and whenever the tablet breakpoint is crossed
   * (e.g. rotating a tablet, resizing a desktop window) — without
   * this, a menu left "open" on mobile before crossing into tablet
   * width would incorrectly stay `inert`-free but also keep stale
   * open/closed markup that no longer matches the new layout.
   */

  const syncResponsiveState = () => {
    setButtonState(false);
    primaryNavigation.dataset.open = "false";

    if (tabletMedia.matches) {
      primaryNavigation.removeAttribute("inert");
      return;
    }

    primaryNavigation.setAttribute("inert", "");
  };

  return Object.freeze({
    open,
    close,
    toggle,
    isOpen,
    syncResponsiveState,
  });
}
