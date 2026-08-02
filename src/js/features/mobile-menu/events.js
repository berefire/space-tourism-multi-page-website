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
    menuButton.focus();
  };

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

  primaryNavigation.addEventListener(
    "click",
    handleNavigationClick,
  );

  tabletMedia.addEventListener(
    "change",
    handleBreakpointChange,
  );
}