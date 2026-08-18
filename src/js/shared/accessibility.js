/**
 * Checks the user's OS-level "reduce motion" accessibility preference.
 * Used to skip transition-dependent code paths (e.g. waiting on a
 * `transitionend` event that would never fire if the transition itself
 * is disabled via `motion-reduce:transition-none` in CSS).
 *
 * @returns {boolean} True if the user has requested reduced motion.
 */

export function prefersReducedMotion(){
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}