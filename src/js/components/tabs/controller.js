/**
 * Creates an accessible tabs controller (WAI-ARIA APG tabs pattern).
 * Framework-agnostic: knows nothing about the visual style or the
 * data behind each tab — only manages selection state and ARIA
 * attributes on the DOM elements it's given.
 *
 * @param {Object} params
 * @param {HTMLElement[]} params.tabs - Tab button elements, in order
 *   (each should have role="tab", an id, and a data-id attribute).
 * @param {HTMLElement} params.panel - The role="tabpanel" element
 *   associated with these tabs.
 * @returns {Readonly<{
 *   tabs: HTMLElement[],
 *   init: () => void,
 *   select: (tab: HTMLElement) => void,
 *   getActiveId: () => string | null
 * }>} A frozen controller object. `tabs` is a defensive copy —
 *   mutating it does not affect the controller's internal state.
 */

export function createTabsController({ tabs, panel }) {
  let activeTab = null;

  function updateTabState(tab, selected) {
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  }

  function updateTabs(selectedTab) {
    tabs.forEach((tab) => {
      updateTabState(tab, tab === selectedTab);
    });
  }

  function updatePanel(selectedTab) {
    panel.setAttribute("aria-labelledby", selectedTab.id);
  }

  /**
   * Selects a tab: updates aria-selected/tabIndex on all tabs and
   * aria-labelledby on the panel. Does not move focus — callers
   * (e.g. events.js) handle focus separately, since click and
   * keyboard selection have different focus requirements.
   */

  function select(tab) {
    activeTab = tab;

    updateTabs(tab);
    updatePanel(tab);
  }

  /**
   * Selects the initially active tab (the one marked aria-selected="true"
   * in the HTML, or the first tab if none is marked) and applies its
   * state. Does nothing if no tabs were provided.
   */

  function init() {
    if (tabs.length === 0) {
      console.warn("createTabsController: no tabs provided, init() aborted.");

      return;
    }

    const initialTab =
      [...tabs].find((tab) => tab.getAttribute("aria-selected") === "true") ??
      tabs[0];

    select(initialTab);
  }

  /**
   * @returns {string | null} The data-id of the currently active tab,
   *   or null if no tab has been selected yet.
   */

  function getActiveId() {
    return activeTab?.dataset.id ?? null;
  }

  return Object.freeze({
    tabs: [...tabs],

    init,
    select,
    getActiveId,
  });
}
