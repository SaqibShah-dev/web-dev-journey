# 🎨 Phases 2-10: Advanced CSS Layouts & Styling

Welcome to the **CSS (Cascading Style Sheets)** learning lab! This folder contains playgrounds, exercises, and real-world projects designed to help you transition from simple page structures to beautiful, production-ready layouts, designs, and animations.

We explore CSS starting from the core box spacing rules, progress to modern layout systems (Flexbox, CSS Grid, Positioning), cover clean styling architectures, and finish with modern frameworks and next-generation browser APIs.

---

## 📂 CSS Directory Map & Learning Milestones

Explore each subdirectory below to practice specific styling features:

### 1️⃣ Core Sizing & Alignments

* 📦 **[Box Model/](./Box%20Model/) — Phase 2**
  - Understanding element boundaries: content, padding, borders, and margins.
  - Features the **Margin Collapse** solution guide, 4 alignment approaches, and 5 practice tasks.
* ↔️ **[Flex Box/](./Flex%20Box/) — Phase 3**
  - Master one-dimensional alignments (either a single row or column).
  - Practice alignments (`justify-content`, `align-items`), item sizing (`flex-grow`, `flex-shrink`), and layouts (navbar grids, item distribution).
* 🕸️ **[grid/](./grid/) — Phase 4**
  - Master two-dimensional layouts (rows and columns simultaneously).
  - Practice track sizing (`fr`, `auto`), repetition helper (`repeat()`), named templates, responsive columns without media queries (`auto-fit`/`auto-fill`), and a masonry image gallery.
* 📌 **[Positioning Types/](./Positioning%20Types/) — Phase 5**
  - Master controlling layout flow.
  - Playground files for `static`, `relative`, `absolute`, `fixed`, and `sticky` styling.
  - Practical projects: fixed modal popups, icon notification badges, and scroll-sticky navbars.

### 2️⃣ Advanced Styling & Responsiveness

* 🌈 **[CSS-Variables+Transitions+Pseudo-classes/](./CSS-Variables+Transitions+Pseudo-classes/) — Phase 6**
  - Centralizing design tokens using custom properties (`--main-color`).
  - Styling interactive states (`:hover`, `:focus`, `:nth-child`) and adding smooth animation curves (`transition`).
* 📱 **[Responsive design/](./Responsive%20design/) — Phase 7**
  - Designing with mobile screens first, overrides with media queries, fluid sizing using `clamp()`, and responsive card designs.
* 🏗️ **[css-architecture/](./css-architecture/) — Phase 8**
  - Managing large styles. Practices Block-Element-Modifier (**BEM**) class names (e.g., `card__button--disabled`), component scoping, and scoped styling concepts.

### 3️⃣ Frameworks & Modern APIs

* 🧱 **[Tailwind css/](./Tailwind%20css/) — Phase 9**
  - Introduction to utility-first styling.
  - Demonstrates replacing custom styles with inline classes, viewport breakpoints (`md:`, `lg:`), and an interactive landing page mockup.
* ⚓ **[Anchor-Positioning/](./Anchor-Positioning/) — Phase 10**
  - Styling contextual overlays (tooltips, dropdowns) tethered directly to anchor targets using modern CSS APIs (`anchor-name`, `position-anchor`, `position-area`, `position-try-fallbacks`).
* 🏷️ **[Floating_label/](./Floating_label/)**
  - Practical playground building interactive form fields where input text labels float up dynamically when typing using pure CSS pseudo-selectors.

---

## 🏆 Capstone Projects

* 🎬 **[Netflix Landing Page](./Netflix%20Landing%20Page/)**
  - A responsive clone of Netflix's layout.
  - Combines grid carousels, accordion FAQs (`<details>`), custom language dropdowns, and linear overlays.
* 🏆 **[Tailwind Landing Page](./Tailwind%20css/Project.html)**
  - A modern layout built using Tailwind utility styles.
* 🖼️ **[Masonry Photo Gallery](./grid/image-gallery-prject.html)**
  - An image gallery showing block fitting with `grid-auto-flow: dense` and click-to-enlarge overlays.

---

## 🧠 Core CSS Checklist

Ensure you can answer these questions before starting JavaScript:

- [ ] Can you explain the difference between `content-box` and `border-box`?
- [ ] In Flexbox, how do the main axis and cross axis change when `flex-direction` is set to `column`?
- [ ] How do `auto-fit` and `auto-fill` differ in CSS Grid column repeats?
- [ ] What is the "containing block" of an element with `position: absolute`?
- [ ] Why should you design mobile-first rather than desktop-first?
- [ ] What does `block__element--modifier` represent in BEM architecture?
