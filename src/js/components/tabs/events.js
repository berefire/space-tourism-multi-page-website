/**
 * Register tab events for click and keyboard (arrow/Home/End) navigation.
 *
 * @param {ReturnType<import("./controller.js").createTabsController>} controller
 * @param {(id: string | null) => void} onChange - Always receives the active tab id (string), never the DOM element.
 */

const KEYBOARD = {
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  HOME: "Home",
  END: "End",
};

function getTabs(controller) {
  return controller.tabs;
}

function getNextIndex(index, total) {
  return (index + 1) % total;
}

function getPreviousIndex(index, total) {
  return (index - 1 + total) % total;
}

function getTargetTab(event, tabs, currentIndex) {
  switch (event.key) {
    case KEYBOARD.RIGHT:
      return tabs[getNextIndex(currentIndex, tabs.length)];

    case KEYBOARD.LEFT:
      return tabs[getPreviousIndex(currentIndex, tabs.length)];

    case KEYBOARD.HOME:
      return tabs[0];

    case KEYBOARD.END:
      return tabs[tabs.length - 1];

    default:
      return null;
  }
}

export function registerTabEvents(controller, onChange) {
  controller.tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      controller.select(tab);

      onChange(controller.getActiveId());
    });

    tab.addEventListener("keydown", (event) => {
      const tabs = getTabs(controller);
      const currentIndex = tabs.indexOf(tab);
      const targetTab = getTargetTab(event, tabs, currentIndex);

      if (!targetTab) {
        return;
      }

      event.preventDefault();
      controller.select(targetTab);
      targetTab.focus();
      onChange(controller.getActiveId());
    });
  });
}
