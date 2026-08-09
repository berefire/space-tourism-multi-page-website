/**
 * Create an accessible tabs controller (WAI-ARIA APG pattern).
 *
 * @param {Object} params
 * @param {HTMLElement[]} params.tabs - Elements <button role="tab"></button> in order.
 * @param {HTMLElement} params.panel - The associated <div role="tabpanel"></div>.
 * @returns {Readonly<{
 *   tabs: HTMLElement[],
 *   init: () => void,
 *   select: (tab: HTMLElement) => void,
 *   getActiveTab: () => HTMLElement | null,
 *   getActiveId: () => string | null
 * }>}
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

  function select(tab) {
    activeTab = tab;

    updateTabs(tab);
    updatePanel(tab);
  }

  function init() {
    if (tabs.length === 0 ) {
      console.warn("createTabsController: no tabs provided, init() aborted.");

      return;
    }

    const initialTab =
      [...tabs].find(
        (tab) => tab.getAttribute("aria-selected") === "true",
      ) ?? tabs[0];

    select(initialTab);
  }

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