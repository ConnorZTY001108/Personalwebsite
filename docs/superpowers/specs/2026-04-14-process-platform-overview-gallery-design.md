# Process Platform Overview Gallery Design

## Goal

Add a screenshot gallery to the `Project Overview` section of the `process-platform` detail page so recruiters and interviewers can quickly understand what the product looks like in use.

The gallery should feel like a polished product showcase rather than a plain list of images, and it should visually read as a continuous stitched ribbon of screenshots.

## Approved Direction

Chosen approach: a two-row stitched screenshot ribbon that prefers filling the available width first and only falls back to horizontal dragging when the full ribbon no longer fits.

Each screenshot tile includes:

- a product screenshot with sharp corners
- a short English feature title placed inside the image at the bottom-left corner
- a small, local frosted-glass label behind the title rather than a full-image overlay

Interaction requirements:

- horizontal dragging only when the stitched ribbon overflows the available width
- natural horizontal swipe support on touch devices and trackpads
- slight scale-up on hover
- click to open an enlarged preview with reliable real-browser behavior
- click outside the preview to close it
- `Esc` closes the preview

## Why This Approach

This direction is the best fit for the current portfolio page because:

- it feels closer to the stitched editorial reference the user provided
- it shows multiple product surfaces quickly without turning the section into a slideshow
- it keeps visual density high while still leaving the surrounding copy readable
- it keeps the page recruiter-friendly: visually rich, but still easy to scan
- it can be added with contained changes to the existing static site

Alternatives rejected:

- single-row carousel cards:
  - visually too separate and not close enough to the stitched reference
- full-image caption overlay:
  - hides too much of the product UI
- large hero image with thumbnail rail:
  - stronger single-image focus, but weaker for fast scanning

## User Experience

### Default State

The gallery sits below the `Project Overview` text content, at the bottom of the section.

On desktop:

- screenshots are arranged in two stacked rows
- the ribbon reads like a continuous collage instead of isolated cards
- tiles use little to no spacing so the gallery feels stitched together
- if the stitched ribbon fits inside the section, no drag is required
- if it overflows, users can drag horizontally to reveal more columns

On mobile:

- the gallery remains horizontally scrollable
- the two-row structure is preserved where practical
- tiles stay large enough for the UI details to remain readable

### Hover State

When the pointer is over a screenshot:

- the screenshot scales up slightly
- the tile feels active without disrupting the stitched layout
- the hover effect should not introduce obvious gaps between tiles

### Caption Treatment

Each screenshot title appears inside the image:

- anchored to the bottom-left corner
- using concise English feature labels
- sitting on a small blurred translucent label background
- the label background covers only the title area, not the whole image

### Expanded Preview

When a user clicks a screenshot:

- a page-level overlay opens
- the selected image appears enlarged
- the image title remains visible

Closing behavior:

- clicking on the dimmed background closes the overlay
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
- a gallery block inserted after the overview paragraphs, at the bottom of the `Project Overview` section

The gallery block should remain data-driven enough to keep image paths and titles centralized even if the markup is rendered as HTML content.

### Styling

New CSS responsibilities:

- two-row horizontal ribbon layout
- screenshot tile sizing with stitched spacing
- overflow behavior for horizontal dragging
- subtle hover transform
- in-image caption positioning
- local frosted label styling behind the caption
- hidden or softened scrollbar treatment
- fullscreen overlay styling
- responsive behavior

The gallery should reuse existing tokens from `styles.css` where practical:

- `--surface`
- `--line`
- `--shadow`
- `--radius-lg`
- `--accent`

### Behavior Layer

`project-detail.js` will own lightweight interaction logic:

- click handling attached directly to screenshot tiles rather than relying on brittle track-level delegation
- overlay close on outside click
- `Esc` key handling
- pointer drag behavior that only activates after an actual drag threshold is crossed
- pointer capture only after drag intent is clear, to avoid stealing ordinary click interactions

The behavior should stay local to detail pages and avoid adding a separate framework or heavy custom state system. Real-browser click reliability is more important than preserving the earlier drag implementation.

## Accessibility

Requirements:

- each gallery tile must remain keyboard focusable if clickable
- enlarged preview must have a clear close path
- image `alt` text should describe the screen plus the feature title
- the overlay must not trap the user without an obvious escape route

## Testing Strategy

Update the existing lightweight test suite to confirm:

- the process-platform detail content includes the gallery markup
- the expected feature titles are present
- image paths target the process-platform asset folder
- caption markup is present inside each screenshot tile
- the process-platform page still renders correctly with the existing detail-page shell

Manual verification should confirm:

- the gallery renders as a two-row stitched ribbon
- captions stay in the bottom-left with a local blurred label
- horizontal dragging works only when overflow exists
- hover scale looks subtle
- click-to-expand works reliably in a real browser
- click-away close works
- `Esc` closes the preview
- layout reads well on desktop and mobile

## Scope Limits

Included:

- two-row stitched screenshot ribbon in `Project Overview`
- hover and expand interactions
- concise titles per image
- local frosted caption labels inside each image

Not included:

- auto-advancing slides
- arrows or pagination dots unless later requested
- video support
- changes to the other project detail pages

## Success Criteria

This change is complete when:

- the `process-platform` `Project Overview` section includes a polished two-row stitched screenshot ribbon
- users see titles inside the screenshots at the bottom-left corner
- each title sits on a small blurred label instead of a full-image overlay
- the gallery only requires horizontal dragging when it truly overflows the section width
- clicking a screenshot opens an enlarged preview reliably
- the preview closes by clicking outside or pressing `Esc`
- the interaction feels smooth and visually aligned with the existing portfolio design
