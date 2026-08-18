/**
 * Breakpoint media queries as JS-usable strings, kept in sync with
 * Tailwind's `md`/`lg` values (48rem/64rem) for use in
 * window.matchMedia() calls — Tailwind's own breakpoints aren't
 * accessible from JS directly.
 */

export const MEDIA_QUERIES = Object.freeze({
  tablet: "(min-width: 48rem)",
});