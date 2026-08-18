/**
 * Registers all interaction listeners for the mobile menu: toggle
 * button click, Escape-to-close, click-outside-nav-link-to-close, and
 * automatic state resync when crossing the tablet breakpoint.
 *
 * @param {Object} params
 * @param {HTMLElement} params.menuButton
 * @param {HTMLElement} params.primaryNavigation
 * @param {ReturnType<import("./controller.js").createMenuController>} params.controller
 * @param {MediaQueryList} params.tabletMedia
 */

export function bindMenuEvents({
  menuButton,
  primaryNavigation,
  controller,
  tabletMedia,
}) {
  const handleKeydown = (event) => {
    if (event.key !== "Escape") return;
    if (!controller.isOpen()) return;

    controller.close();
    menuButton.focus(); // Return focus to the trigger, per standard dismissible-menu behavior.
  };

  /**
   * Closes the menu after a nav link is clicked — only on mobile,
   * where the menu is an overlay that should get out of the way once
   * the user has navigated. On tablet+, the nav is a static bar, so
   * there's no "open" state to close.
   */

  const handleNavigationClick = (event) => {
    const link = event.target.closest("a");

    if (!link || !primaryNavigation.contains(link)) return;
    if (tabletMedia.matches) return;

    controller.close();
  };

  const handleBreakpointChange = () => {
    controller.syncResponsiveState();
  };

  menuButton.addEventListener("click", controller.toggle);
  document.addEventListener("keydown", handleKeydown);
  primaryNavigation.addEventListener("click", handleNavigationClick);

  tabletMedia.addEventListener("change", handleBreakpointChange);
}
