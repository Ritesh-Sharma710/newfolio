Act as an expert frontend developer and UI/UX engineer. 

Your task is to build a single, highly polished, premium landing page for a website named **"Syntax Sage"** using ONLY raw HTML, custom CSS (vanilla, no UI frameworks), and vanilla JavaScript. 

The design direction must strictly follow the "Linear-style Technical Brutalism" tech aesthetic (similar to FlytBase, Vercel, and Linear). Implement the exact styling rules, geometry, and layout system outlined below.

---

### 🎨 1. THE BRAND & SPECIFICATIONS
*   **Site Name:** Syntax Sage
*   **Aesthetic Theme:** Technical Brutalism / High-Precision Enterprise Dark Mode
*   **The Blueprint:** Zero rounded corners, sharp mathematical grid precision, high contrast text, and subtle data-heavy structural elements.

---

### 🛠 2. DESIGN & STYLING SYSTEM (CRITICAL RULES)

#### A. Color Palette
*   **Background Canvas:** Deep charcoal gray (`#0b0c0e` or `#0e1013`). Absolutely NO pure pitch black (#000000).
*   **Primary Accent:** "Signal Orange" (`#ff5722` or `#ff6b35`). Use this exclusively for key interactive highlights, focus states, or a singular hero gradient.
*   **Functional Signals:** Pure Green (`#00e676` or `#10b981`) must ONLY be used for live status indicators, "Active" nodes, or success messages. Do not use it as a general accent.
*   **Text Hierarchy:** 
    *   Primary Headings: Pure white (`#ffffff`)
    *   Body Copy: Muted Silver/Gray (`#a1a1aa` or `#8e9299`)
    *   Structural Borders: Very faint gray/charcoal (`#1f242c` or `#272d38`)

#### B. Geometry & Spacing
*   **Zero Border Radius:** Every element (buttons, containers, input boxes, cards, images) must have exactly `border-radius: 0px !important;`. No rounding anywhere.
*   **8px Layout Grid:** All padding, margins, and gaps must strictly use increments of 8px (e.g., `8px`, `16px`, `24px`, `32px`, `64px`). 
*   **Borders:** Use thin, clean 1px solid borders (`1px solid var(--border-color)`) to separate sections, cards, and navigation links.

#### C. Background Textures & Patterns
*   Implement a faint, subtle geometric background over the body canvas using CSS background gradients. Use either a 32px mesh grid layout or a 20px radial dot pattern at an extremely low opacity (between 4% and 8% alpha).
*   Add a subtle, diagonal "thermal" glowing gradient sweep behind the hero section using the primary Signal Orange color bleeding out into transparent charcoal.

#### D. Typography (Strict Integration)
Use Google Fonts to load and apply these exact font families:
1.  **Headlines/Display:** Use a clean, premium Serif font like **'Lora'** or **'Playfair Display'** in Sentence-case (not all-caps) for main hero titles.
2.  **Interface Copy:** Use a highly legible, modern Sans-Serif font like **'Geist'** or **'Inter'** for all body text, paragraphs, and primary navigation links.
3.  **Metadata/Labels:** Use a clean Monospaced font like **'Geist Mono'** or **'JetBrains Mono'** for tags, eyebrows, small technical descriptions, numbers, metrics, and code snippets.

#### E. Iconography
*   Include the **Phosphor Icons** CDN script in the HTML head.
*   Ensure all icons used have their stroke-weight configured to `thin` or `light` (1px visual weight) to match the high-precision dashboard aesthetic.

---

### 🧩 3. PAGE STRUCTURE & LAYOUT

*   **Top Navigation:** A thin, fixed/sticky header featuring the name **Syntax Sage**, a small green "System Active" status dot, a minimalist text menu, and a sharp "Launch" button on the far right. Separated from the canvas by a 1px bottom border.
*   **Hero Section:** A powerful, minimal split or centered layout. Features a large, elegant Serif title, a monospaced "eyebrow" tag above it, a short body description, and a primary CTA input/button combo with zero rounding.
*   **Feature/Metrics Grid:** A 3-column structural grid showcasing "Syntax Sage" capabilities (e.g., Code Auditing, Threat Modeling, Architecture Optimization). Each box must have sharp 1px borders, Monospaced headers, and Thin Phosphor icons.
*   **Live Console Widget:** A visual mockup section designed to look like a code IDE terminal or fleet monitoring interface, complete with raw code blocks and mock operational data.

---

### 💻 4. CODE EXECUTION REQUIREMENTS
*   **No Frameworks:** Write clean, modular, semantic HTML5. Write pure CSS variables at the `:root` level for colors and spacing. Use Vanilla JS for any UI interactions (e.g., active tabs, micro-animations, copy-to-clipboard actions).
*   **Responsive Layout:** Utilize CSS Grid and Flexbox dynamically so the grid system scales flawlessly from desktop monitors down to mobile viewports while maintaining the strict 8px alignment rules.
*   **Code Delivery:** Provide the complete HTML file, CSS file, and JS file clearly separated or as a single, cleanly commented codebase. Make sure it is completely production-ready and visually striking right out of the box.