export function buildDOMRefs(selectors) {
  const elements = Object.fromEntries(
    Object.entries(selectors).map(([key, { selector, all }]) => {
      const result = all
        ? document.querySelectorAll(selector)
        : document.querySelector(selector);

      if (import.meta.env.DEV) {
        const isEmpty = all ? result.length === 0 : result === null;
        if (isEmpty) {
          console.warn(`[DOM] No element found for "${key}" → ${selector}`);
        }
      }

      return [key, result];
    }),
  );

  return Object.freeze(elements);
}






