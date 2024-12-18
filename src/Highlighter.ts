export interface HighlightOptions {
  texts: string[];
  colors: string[];
  caseSensitive: boolean;
}

export class Highlighter {
  private options: HighlightOptions;
  private observer: MutationObserver | null = null;

  constructor(options: HighlightOptions) {
    this.options = options;
  }

  public highlight(element: HTMLElement, observe: boolean = true): void {
    this.highlightElement(element);

    if (observe) {
      this.observeChanges(element);
    }
  }

  public updateOptions(options: Partial<HighlightOptions>): void {
    this.options = { ...this.options, ...options };
    this.rehighlightAll();
  }

  public destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }


  /**
   * Highlights the text content within a given element.
   * @param element The element in which to highlight text.
   */
  private highlightElement(element: HTMLElement): void {
    const { texts, colors, caseSensitive } = this.options;

    // Create a tree walker to iterate over text nodes
    const walk = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    let node;

    while ((node = walk.nextNode())) {
      const textNode = node as Text;
      const content = textNode.nodeValue || "";

      // Skip empty text nodes or nodes without a parent
      if (!content.trim() || !textNode.parentElement) continue;

      const matches: { start: number; end: number; color: string }[] = [];

      // Iterate through each text to search and highlight
      for (const [i, text] of texts.entries()) {

        // Create a regular expression to match the text, considering case sensitivity
        const regex = new RegExp(
          text.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"),
          caseSensitive ? "g" : "gi"
        );

        let match;
        while ((match = regex.exec(content)) !== null) {

          // Collect matches with their start and end positions and the corresponding color
          matches.push({
            start: match.index,
            end: match.index + match[0].length,
            color: colors[i % colors.length],
          });
        }
      }

      matches.sort((a, b) => a.start - b.start);

      // Create a document fragment to replace the original text node
      const fragment = document.createDocumentFragment();
      let lastIndex = 0;

      for (const match of matches) {
        if (match.start >= lastIndex) {
          if (match.start > lastIndex) {
            fragment.appendChild(
              // Add non-matching content
              document.createTextNode(content.slice(lastIndex, match.start))
            );
          }

          // Create a span for the matched text with the specified background color
          const span = document.createElement("span");
          span.textContent = content.slice(match.start, match.end);
          span.style.backgroundColor = match.color;
          fragment.appendChild(span);

          lastIndex = match.end; // Update the last index to avoid overlapping matches
        }
      }

      // Append any remaining content that wasn't part of a match
      if (lastIndex < content.length) {
        fragment.appendChild(document.createTextNode(content.slice(lastIndex)));
      }

      // Replace the original text node with the newly created fragment
      if (fragment.childNodes.length > 0) {
        textNode.replaceWith(fragment);
      }
    }
  }

  /**
   * Observes changes in the DOM (like new nodes being added) and highlights them as needed.
   * @param element The element to observe for changes.
   */
  private observeChanges(element: HTMLElement): void {
    this.observer = new MutationObserver((mutations) => {
      this.observer?.disconnect();

      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              this.highlightElement(node);
            }
          });
        }
      });

      this.observeChanges(element);
    });

    this.observer.observe(element, { childList: true, subtree: true });
  }

  /**
   * Reapplies highlighting to all previously highlighted elements.
   */
  private rehighlightAll(): void {
    const highlightedElements = document.querySelectorAll(
      '[data-highlighted="true"]'
    );
    highlightedElements.forEach((element) => {
      if (element instanceof HTMLElement) {
        this.highlightElement(element); // Re-highlight each element marked as highlighted
      }
    });
  }
}
