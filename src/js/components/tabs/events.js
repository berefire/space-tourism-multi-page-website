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

/**
 * Determines which tab keyboard navigation should move to, per the
 * WAI-ARIA APG tabs pattern (arrow keys wrap around; Home/End jump to
 * the first/last tab). Returns null for any other key, signaling the
 * caller to let the browser handle it normally.
 */
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

/**
 * Registers click and keyboard (arrows/Home/End) listeners on every
 * tab, implementing the roving-tabindex pattern: selection and focus
 * move together on keyboard navigation, matching WAI-ARIA APG tabs
 * behavior.
 *
 * @param {ReturnType<import("./controller.js").createTabsController>} controller
 * @param {(id: string | null) => void} onChange - Called after every
 *   selection change (click or keyboard) with the new active tab's id.
 *   Always receives a string id — never the DOM element — so callers
 *   don't need to know tabs are backed by buttons internally.
 */

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
