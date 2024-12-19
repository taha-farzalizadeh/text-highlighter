
# `js-text-highlighter` Documentation

---

### **Overview**

`js-text-highlighter` is a JavaScript library designed to help you highlight specific text in an HTML element. It provides customizable options for matching text and styling it with various colors. This package supports automatic text highlight updates when content changes and allows you to easily manage and configure highlighting settings.

The library supports React, Vue, Angular, and plain JavaScript environments.

---

### **Installation**

To get started with `js-text-highlighter`, you need to install the package.

#### **Using npm:**

```bash
npm install js-text-highlighter
```

#### **Using yarn:**

```bash
yarn add js-text-highlighter
```

---

### **Usage Guide**

#### **1. Basic Usage**

In this example, we'll show you how to highlight text in an HTML element.

```javascript
import { createHighlighter } from 'js-text-highlighter';

const options = {
  texts: ['highlight', 'text'],  // List of texts to be highlighted
  colors: ['yellow', 'lightblue'],  // Colors to apply for each text match
  caseSensitive: false,  // Whether the matching should be case-sensitive
};

const highlighter = createHighlighter(options);

// Highlight text inside an element with a specific id
highlighter.highlight('#content'); 
```

#### **2. React Integration**

In a React component, you can use the highlighter like this:

```jsx
import React, { useEffect, useRef } from 'react';
import { createHighlighter } from 'js-text-highlighter';

const HighlighterComponent = () => {
  const contentRef = useRef(null);

  useEffect(() => {
    const highlighter = createHighlighter({
      texts: ['React', 'JavaScript'],
      colors: ['yellow', 'lightgreen'],
      caseSensitive: false,
    });

    highlighter.highlight(contentRef.current);

    return () => {
      highlighter.destroy();
    };
  }, []);

  return (
    <div ref={contentRef} id="content">
      React is a JavaScript library for building user interfaces.
    </div>
  );
};

export default HighlighterComponent;
```

#### **3. Vue Integration**

In a Vue component, you can use the highlighter as follows:

```vue
<template>
  <div ref="content">
    Vue is a progressive JavaScript framework.
  </div>
</template>

<script>
import { createHighlighter } from 'js-text-highlighter';

export default {
  mounted() {
    const highlighter = createHighlighter({
      texts: ['Vue', 'JavaScript'],
      colors: ['yellow', 'lightblue'],
      caseSensitive: false,
    });

    highlighter.highlight(this.$refs.content);

    this.$once('hook:beforeDestroy', () => {
      highlighter.destroy();
    });
  },
};
</script>
```

#### **4. Angular Integration**

In an Angular component, you can integrate the highlighter like this:

```typescript
import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { createHighlighter } from 'js-text-highlighter';

@Component({
  selector: 'app-highlighter',
  template: `<div #content>Angular is a platform for building web applications.</div>`,
})
export class HighlighterComponent implements OnInit, OnDestroy {
  private highlighter: any;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.highlighter = createHighlighter({
      texts: ['Angular', 'web'],
      colors: ['yellow', 'lightcoral'],
      caseSensitive: false,
    });

    this.highlighter.highlight(this.el.nativeElement.querySelector('#content'));
  }

  ngOnDestroy(): void {
    if (this.highlighter) {
      this.highlighter.destroy();
    }
  }
}
```

#### **5. Plain JavaScript Integration**

For plain JavaScript usage, you can easily highlight an element like this:

```html
<div id="content">
  JavaScript is a versatile programming language.
</div>

<script src="node_modules/js-text-highlighter/dist/index.js"></script>
<script>
  const options = {
    texts: ['JavaScript', 'versatile'],
    colors: ['yellow', 'lightgreen'],
    caseSensitive: false,
  };

  const highlighter = createHighlighter(options);
  highlighter.highlight('#content');
</script>
```

---

### **API Reference**

#### **1. `createHighlighter(options: HighlightOptions)`**

- **Description**: Creates an instance of the highlighter with specified options.
- **Parameters**:
    - `options`: Object with the following properties:
        - `texts`: An array of strings to highlight.
        - `colors`: An array of color strings corresponding to each text match.
        - `caseSensitive`: A boolean indicating if the search should be case-sensitive.
- **Returns**: An object with methods to interact with the highlighter.

#### **2. `highlight(element: HTMLElement | string)`**

- **Description**: Highlights the text within the specified element.
- **Parameters**:
    - `element`: The HTML element to highlight. Can be a string selector or an HTMLElement.
- **Returns**: `void`.

#### **3. `updateOptions(newOptions: Partial<HighlightOptions>)`**

- **Description**: Updates the highlighting options and reapplies the highlighting.
- **Parameters**:
    - `newOptions`: Partial `HighlightOptions` object to update specific settings.
- **Returns**: `void`.

#### **4. `destroy()`**

- **Description**: Destroys the highlighter instance and disconnects the MutationObserver if active.
- **Returns**: `void`.

---

### **Customizing Highlights**

You can further customize the behavior of `js-text-highlighter`:

- **Text matching**: You can pass any string to the `texts` array to match specific words. The library supports regular expressions for more complex matching.
- **Multiple colors**: Each text match can have a different highlight color, and the library will cycle through the provided colors if more matches are found than the number of colors.
- **Case sensitivity**: The search can be case-sensitive or case-insensitive depending on the `caseSensitive` option.

---

### **Example with Dynamic Updates**

To highlight new content dynamically added to the page, the library supports MutationObserver integration. If you enable the `observe` parameter when calling `highlight`, the library will automatically highlight newly added text nodes.

```javascript
highlighter.highlight(document.getElementById('dynamic-content'), true);
```

---

### **Conclusion**

`js-text-highlighter` is a flexible and powerful tool for highlighting text in various JavaScript frameworks. It integrates seamlessly into React, Vue, Angular, and plain JavaScript environments, allowing you to customize the text highlight functionality as needed.
