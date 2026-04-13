# Project Detail Pages Design

## Goal

Extend the existing internship portfolio so each featured project card opens a dedicated project detail page. The detail pages should match the homepage visual language, work as static GitHub Pages URLs, and be ready for later content filling without looking unfinished today.

## Constraints

- Keep the site compatible with plain GitHub Pages hosting.
- Preserve the existing homepage look and overall design direction.
- Use independent static URLs for each project.
- Initial detail pages are structure-first: the layout and visual system should be complete, but most written content can remain intentionally sparse.
- The user wants only a `Back to Home` action on the detail pages, not full top navigation.
- The first version covers exactly three projects:
  - `Industrial Process Modeling Platform`
  - `Vision-Assisted Arduino Robot Car`
  - `Consumer Behaviour Analytics Dashboard`

## Current Site Context

The current site is a single-page static portfolio rendered from centralized data in `content.js` through `app.js`. The homepage already has:

- a hero section
- an about section
- a featured project grid
- a resume section
- a contact section

The project cards currently render as non-link cards. This change adds a project-detail layer without turning the site into a framework app or changing the static-hosting model.

## Recommended Approach

Chosen approach: independent static pages with a shared detail-page template system.

This means the site will add:

- `projects/process-platform.html`
- `projects/robot-car.html`
- `projects/analytics-dashboard.html`

These pages should not each contain fully duplicated custom markup and styling logic. Instead:

- they share one detail-page stylesheet or shared CSS layer
- they share one detail-page rendering script
- they share a centralized project data source
- each page identifies which project to render through a stable slug

Why this approach wins:

- gives clean URLs that work naturally on GitHub Pages
- keeps the homepage and detail pages visually consistent
- avoids hand-maintaining three separate copies of the same layout
- makes later content updates much easier because structure and content stay separated

Alternatives rejected:

- Single-page route switching inside the homepage:
  - less suitable for clean shareable URLs
  - weaker "dedicated project page" feel
- Fully hand-authored separate HTML pages:
  - acceptable short-term, but duplicates structure and styling too aggressively
  - creates unnecessary maintenance cost when the design changes later

## URL Structure

The site will expose these paths:

- `/Personalwebsite/`
- `/Personalwebsite/projects/process-platform.html`
- `/Personalwebsite/projects/robot-car.html`
- `/Personalwebsite/projects/analytics-dashboard.html`

Homepage project cards will link to these detail pages using relative paths.

Each detail page will include a `Back to Home` link that returns to:

- `../index.html#projects`

That return target is intentional. It should bring the user back to the project section instead of the top of the homepage.

## Homepage Changes

The homepage remains structurally the same, with one meaningful behavior change:

- every featured project card becomes a clickable link to its matching detail page

Interaction expectations:

- the whole card should feel clickable, not just a tiny text link
- the hover treatment should stay subtle and consistent with the current design
- keyboard users must also be able to focus and activate each card

The homepage should not attempt to preview every detail-page section. It stays concise and recruiter-friendly.

## Detail Page Structure

Each project detail page will follow the same structure, in this order:

1. Top Bar
2. Project Hero
3. Overview
4. Challenge
5. Approach
6. Tech Stack
7. Gallery
8. Outcome

### Top Bar

Purpose:

- provide a clear return path without recreating the full homepage navigation

Content:

- one `Back to Home` link

Behavior:

- always visible near the top of the page
- styled to feel like part of the same design system as the homepage
- no secondary nav links in version 1

### Project Hero

Purpose:

- immediately identify the project and keep the same visual confidence as the homepage

Content:

- project title
- one short subtitle or project descriptor
- project tags

Layout:

- generous whitespace
- strong editorial heading treatment
- same palette, surface styling, and type hierarchy as the homepage

### Overview

Purpose:

- reserve space for the project summary

Version 1 content behavior:

- include the section title and a visually complete text container
- do not require finished paragraph copy yet

### Challenge

Purpose:

- reserve space for problem definition, project background, or the reason the work mattered

Version 1 content behavior:

- section title visible
- container present even if detailed content is not filled yet

### Approach

Purpose:

- reserve space for architecture, implementation strategy, or personal contribution

Version 1 content behavior:

- section title visible
- layout ready for later text, lists, or architecture explanation

### Tech Stack

Purpose:

- show concrete technical signals even before full case-study writing is complete

Version 1 content behavior:

- render the project stack in styled tags or grouped chips
- this section should look complete even if the narrative sections are still sparse

### Gallery

Purpose:

- provide a dedicated screenshot or visual-demo area

Version 1 content behavior:

- use polished placeholder blocks or placeholder imagery
- do not show broken images
- keep enough height and card treatment that the section still feels intentional

### Outcome

Purpose:

- reserve space for results, impact, lessons, or closing summary

Version 1 content behavior:

- section title visible
- container present for later content entry

## Placeholder Strategy

Chosen placeholder mode: structure with section titles and minimal body content.

That means:

- detail pages should not be empty white shells
- they also should not contain fake long-form copy that the user later has to undo
- sections can use short structural placeholder text only when needed to stabilize spacing or explain that content will be added later

Preferred behavior by section:

- `Hero`: real project title, subtitle, and tags
- `Tech Stack`: real stack tags
- `Gallery`: designed placeholder visuals
- `Overview`, `Challenge`, `Approach`, `Outcome`: mostly title-first, sparse content containers

## Visual Design Direction

The detail pages must feel like a natural continuation of the homepage, not like a different template.

Design requirements:

- reuse the existing warm neutral palette
- reuse the same typography families and hierarchy
- reuse the same card, shadow, radius, and surface language
- preserve the editorial spacing rhythm of the homepage
- keep motion restrained and meaningful

The detail pages may feel slightly more focused and quieter than the homepage, but not flatter or more generic.

Visual differences that are acceptable:

- narrower reading width for long-form sections
- more stacked vertical rhythm
- clearer section dividers

Visual directions to avoid:

- adding a second competing theme
- turning detail pages into blog posts
- filling the screen with dense text blocks
- introducing a new navigation system

## Content Model Changes

The project data model should expand so each project can drive both the homepage card and its detail page.

Each project entry should be able to hold:

- `slug`
- `title`
- `subtitle`
- `summary`
- `stack`
- `image`
- `detailSections`

`detailSections` should support at least:

- `overview`
- `challenge`
- `approach`
- `outcome`

Even if these fields start sparse, they should exist in a shape that is easy to fill later.

The gallery data should also be future-ready for:

- one or more screenshots
- captions if needed later

## Technical Architecture

Recommended file additions:

- `projects/process-platform.html`
- `projects/robot-car.html`
- `projects/analytics-dashboard.html`
- `project-detail.js`

Existing files likely updated:

- `index.html`
- `styles.css`
- `content.js`
- `app.js`
- `tests/web/test_app.js`

Recommended implementation pattern:

- `content.js` remains the central content source
- homepage render helpers in `app.js` gain project-card link support
- `project-detail.js` reads the current page context and renders the matching project detail view
- detail pages use lightweight HTML shells with render targets instead of embedding repeated project markup

Page identification options:

- each detail HTML file may provide its slug through a stable attribute such as a `data-project-slug` value on `<body>` or `<main>`

This is preferred over trying to infer the slug from the pathname in version 1, because it keeps the pages simpler and easier to test.

## Error Handling

Required safeguards:

- if a detail page references a slug that does not exist, the page must render a safe fallback state rather than throwing a runtime error
- if a project has no gallery images yet, the gallery must render a designed placeholder instead of a broken image icon
- if narrative sections are empty, the page must keep its spacing and card structure intact
- `Back to Home` must remain valid even if the user lands directly on a detail page first

The safe fallback for an unknown project should be simple:

- a neutral page state
- clear heading such as `Project not found`
- a working `Back to Home` link

## Responsive Behavior

Desktop expectations:

- hero can use a split layout or weighted single-column composition
- stack tags can wrap naturally
- gallery can occupy a wider visual region than text sections

Mobile expectations:

- layout becomes single-column
- `Back to Home` remains easy to tap
- large titles wrap cleanly
- stack tags and gallery placeholders do not overflow

## Accessibility

Required accessibility behavior:

- homepage project cards remain keyboard focusable when converted to links
- detail pages preserve heading hierarchy
- placeholder imagery must not create misleading or noisy accessibility output
- `Back to Home` must have clear text, not icon-only navigation

## Testing Strategy

The current lightweight Node test setup should expand to cover:

- homepage project cards now render links to the three detail pages
- detail page shell files exist for all three projects
- detail rendering can resolve the correct project from the page slug
- unknown slug handling renders a safe fallback state
- missing gallery content still renders placeholder media
- `Back to Home` link points to `../index.html#projects`

Manual verification should also include:

- clicking into each project from the homepage
- returning from each detail page to the homepage project section
- checking desktop and mobile layout rhythm

## Out Of Scope For This Change

- writing final long-form case-study content for each project
- adding real project screenshots
- adding next or previous project navigation
- adding blog-style rich content formatting
- introducing a frontend router or build system

## Success Criteria

This feature is complete when:

- each homepage project card opens its own dedicated detail page
- all three detail pages share the homepage design language
- each detail page contains the agreed standard structure
- sparse or missing content still looks intentional instead of broken
- GitHub Pages can serve the homepage and all project pages as static files
