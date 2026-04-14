# Process Platform Overview Gallery Design

## Goal

Add a screenshot gallery to the `Project Overview` section of the `process-platform` detail page so recruiters and interviewers can quickly understand what the product looks like in use.

The gallery should feel like a polished product showcase rather than a plain list of images.

## Approved Direction

Chosen approach: a horizontally scrollable screenshot carousel with snap-aligned cards.

Each card includes:

- a product screenshot
- a short English feature title

Interaction requirements:

- horizontal scrolling with drag support on desktop
- natural horizontal swipe support on touch devices and trackpads
- slight scale-up on hover
- click to open an enlarged preview
- click outside the preview to close it
- `Esc` closes the preview

## Why This Approach

This direction is the best fit for the current portfolio page because:

- it shows multiple product surfaces quickly without pushing the page into a heavy slideshow pattern
- it feels closer to a real software product gallery than a simple image strip
- it keeps the page recruiter-friendly: visually rich, but still easy to scan
- it can be added with small, contained changes to the existing static site

Alternatives rejected:

- plain filmstrip:
  - simpler, but less product-like
- large hero image with thumbnail rail:
  - stronger single-image focus, but weaker for feature browsing

## User Experience

### Default State

The gallery sits below the `Project Overview` text content.

On desktop:

- show roughly two to three cards per viewport width
- cards scroll horizontally
- cards align cleanly using snap points

On mobile:

- cards remain horizontally scrollable
- card width increases so screenshots remain readable

### Hover State

When the pointer is over a card:

- the card scales up slightly
- the shadow becomes stronger
- the current card feels active without disrupting layout

### Expanded Preview

When a user clicks a screenshot:

- a page-level overlay opens
- the selected image appears enlarged
- the image title remains visible

Closing behavior:

- click on the dimmed background closes the overlay
- pressing `Esc` closes the overlay
- clicking inside the enlarged image area does not close it

## Content Mapping

The gallery titles should use concise English feature labels:

- `Start Menu`
- `UI Overview`
- `Material Editor`
- `Stream Data`
- `Computation Panel`
- `Cost Breakdown`
- `Data Export`
- `Excel Data`
- `TP Setup`
- `TP Settings`

The screenshots come from:

- `assets/Industrial Process Modeling Platform/`

Expected asset mapping:

- `start_menu.png` -> `Start Menu`
- `ui_overview.png` -> `UI Overview`
- `MaterialEditor.png` -> `Material Editor`
- `StramData.png` -> `Stream Data`
- `Computation Pane.png` -> `Computation Panel`
- `Cost.png` -> `Cost Breakdown`
- `DataExport.png` -> `Data Export`
- `ExcelData.png` -> `Excel Data`
- `TPset.png` -> `TP Setup`
- `TPseting.png` -> `TP Settings`

## Technical Design

### Files To Change

- `content.js`
- `project-detail.js`
- `styles.css`
- `tests/web/test_app.js`

`projects/process-platform.html` does not need structural changes because the current `Project Overview` section already renders arbitrary HTML inside `detail-project-body`.

### Content Model

The `process-platform` `projectDetail` body will include:

- existing overview copy
- a gallery block inserted after the overview paragraphs

The gallery block should be data-driven enough to keep image paths and titles centralized, even if the markup is ultimately rendered as HTML content.

### Styling

New CSS responsibilities:

- horizontal carousel container
- card sizing and spacing
- scroll snapping
- subtle hover transform and shadow enhancement
- title styling
- hidden or softened scrollbar treatment
- fullscreen overlay styling
- responsive behavior

The gallery should reuse existing tokens from `styles.css`:

- `--surface`
- `--line`
- `--shadow`
- `--radius-lg`
- `--accent`

### Behavior Layer

`project-detail.js` will own lightweight interaction logic:

- delegated click handling for opening preview
- overlay close on outside click
- `Esc` key handling
- optional pointer drag helper for click-and-drag horizontal scrolling

The behavior should stay local to detail pages and avoid adding a separate framework or heavy custom state system.

## Accessibility

Requirements:

- each gallery card must remain keyboard focusable if clickable
- enlarged preview must have a clear close path
- image `alt` text should describe the screen plus the feature title
- the overlay must not trap the user without an obvious escape route

## Testing Strategy

Update the existing lightweight test suite to confirm:

- the process-platform detail content includes the gallery markup
- the expected feature titles are present
- image paths target the process-platform asset folder
- the process-platform page still renders correctly with the existing detail-page shell

Manual verification should confirm:

- horizontal dragging works
- hover scale looks subtle
- click-to-expand works
- click-away close works
- `Esc` closes the preview
- layout reads well on desktop and mobile

## Scope Limits

Included:

- screenshot carousel in `Project Overview`
- hover and expand interactions
- concise titles per image

Not included:

- auto-advancing slides
- arrows or pagination dots unless later requested
- video support
- changes to the other project detail pages

## Success Criteria

This change is complete when:

- the `process-platform` `Project Overview` section includes a polished screenshot carousel
- users can browse screenshots horizontally
- each screenshot has a concise title
- clicking a screenshot opens an enlarged preview
- the preview closes by clicking outside or pressing `Esc`
- the interaction feels smooth and visually aligned with the existing portfolio design
