export function createMenuController({
  menuButton,
  primaryNavigation,
  tabletMedia,
}) {
  const isOpen = () =>
    menuButton.getAttribute("aria-expanded") === "true";

  const setButtonState = (expanded) => {
    menuButton.setAttribute("aria-expanded", String(expanded));
    menuButton.setAttribute(
      "aria-label",
      expanded ? "Close navigation" : "Open navigation",
    );
  };

  const open = () => {
    setButtonState(true);

    primaryNavigation.dataset.open = "true";
    primaryNavigation.removeAttribute("inert");
  };

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