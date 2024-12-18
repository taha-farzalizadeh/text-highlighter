import { Highlighter, HighlightOptions } from "./Highlighter";

/**
 * Creates a highlighter instance and provides methods for highlighting text in elements.
 * @param options The highlight options to configure the highlighter.
 * @returns An object with methods to control the highlighter.
 */

export function createHighlighter(options: HighlightOptions) {
  const highlighter = new Highlighter(options);

  return {
    /**
     * Highlights the provided element or selector.
     * @param element The element or selector to highlight.
     */
    highlight: (element: HTMLElement | string) => {
      const targetElement =
        typeof element === "string" ? document.querySelector(element) : element;

      if (targetElement instanceof HTMLElement) {
        targetElement.setAttribute("data-highlighted", "true");
        highlighter.highlight(targetElement);
      } else {
        console.error("Invalid element provided for highlighting");
      }
    },
    /**
     * Updates the options used by the highlighter.
     * @param newOptions The new options to update.
     */
    updateOptions: (newOptions: Partial<HighlightOptions>) => {
      highlighter.updateOptions(newOptions);
    },

    /**
     * Destroys the highlighter instance and stops observing changes.
     */
    destroy: () => {
      highlighter.destroy();
    },
  };
}

export type { HighlightOptions };
