# Homepage Project Pool From CV Design

## Goal

Populate the homepage project pool using the projects listed in `C:/Users/19612/Desktop/job/career-ops/cv.md`, while preserving the current homepage card format and generating matching lightweight detail pages for the newly added projects.

The homepage should feel fuller and more representative of the CV immediately, without forcing every new project to become a long-form case study on day one.

## Approved Direction

Chosen approach: extend the existing `content.js` portfolio data with as many CV projects as practical, keep the current homepage card system unchanged, and generate lightweight placeholder detail pages for every new project using the same detail-page shell already used by the three existing projects.

Behavior contract:

- homepage cards keep the current layout, hover behavior, and category grouping
- existing detailed projects remain unchanged in depth and structure
- new projects appear in the same grid/card format as current homepage projects
- each new homepage card links to a real detail page shell, not a missing-project fallback
- new detail pages use a shorter content structure derived directly from CV content

## Why This Approach

This is the right fit for the current site because:

- it satisfies the user's request to expand the homepage project pool using the CV
- it avoids redesigning the homepage just to accommodate more content
- it keeps existing strong projects intact while adding breadth
- it gives every new card a working click target and a consistent destination
- it creates a stable baseline that can later be upgraded project-by-project into fuller case studies

Alternatives rejected:

- homepage-only expansion with no real detail pages:
  - creates a broken browsing experience once users click into the new cards
- selecting only 6 to 8 projects:
  - conflicts with the approved direction to add as many CV projects as practical
- making every new project a full case study immediately:
  - too much manual writing for this step and would slow down the expansion unnecessarily

## Project Inventory

The current site already includes:

- `Industrial Process Modeling Platform`
- `Vision-Assisted Arduino Robot Car`
- `Consumer Behaviour Analytics and Retail Decision Support`

The additional CV projects to add are:

- `Unidirectional Secure Gateway Based on SGX`
- `Intel SGX Enclave Lab`
- `Interactive Documentary Created with HTML`
- `DNS-Based Parking Website Detection System`
- `Research on Software Development Based on Cloud Computing Platforms and Decentralized Platforms`
- `AED Interface Simulation`
- `Smart Home Management System`
- `Gym Membership Management System`
- `Community Refrigerator Web App`

This brings the total homepage project pool to twelve projects.

## Category Mapping

The existing category system remains unchanged:

- `full-stack-development`
- `network-cybersecurity`
- `hardware-development`
- `data-analysis`
- `personal-interest`

Approved mapping:

- `full-stack-development`
  - `Industrial Process Modeling Platform`
  - `Research on Software Development Based on Cloud Computing Platforms and Decentralized Platforms`
  - `Smart Home Management System`
  - `Gym Membership Management System`
  - `Community Refrigerator Web App`
- `network-cybersecurity`
  - `Unidirectional Secure Gateway Based on SGX`
  - `Intel SGX Enclave Lab`
  - `DNS-Based Parking Website Detection System`
- `hardware-development`
  - `Vision-Assisted Arduino Robot Car`
  - `AED Interface Simulation`
- `data-analysis`
  - `Consumer Behaviour Analytics and Retail Decision Support`
- `personal-interest`
  - `Interactive Documentary Created with HTML`

## Homepage Card Design

No homepage card redesign is needed.

Each new project card should keep the current data model:

- `slug`
- `category`
- `domain`
- `wordmarkLines`
- `result`
- `title`
- `subtitle`
- `summary`
- `visit`
- `detailMeta`
- `stack`
- `media`
- `detailsHtml`
- `quote`

Visual rules:

- same card frame and corner treatment
- same hover behavior
- same wordmark-based resting state
- same category grouping layout

The homepage should still read as one coherent system rather than a mix of card types.

## Lightweight Detail Page Design

New projects should use the same detail-page shell but lighter content.

The standard placeholder detail structure for newly added projects is:

- `Project Description`
  - 1 to 2 short paragraphs derived from CV summary bullets
- `Key Contributions`
  - 2 to 4 concise points adapted from CV bullets
- `Outcome` or `Notes`
  - metrics, system value, deployment notes, or a short concluding statement when hard metrics are absent

These pages should stay useful and credible without pretending to be full case studies.

The three existing major projects keep their richer structure and are not rewritten into the placeholder format.

## Media Strategy

Existing real project assets remain in place for the current three featured projects.

For newly added projects:

- use the current placeholder image asset when no project-specific screenshot or logo already exists in the repo
- keep the same featured-image and longform-image hooks populated so the detail-page template stays stable
- do not block project expansion on sourcing new visuals

## Technical Design

### Files To Change

- `content.js`
- `projects/*.html`
- `tests/web/test_app.js`

No homepage layout rewrite is planned. `app.js` and `styles.css` should remain unchanged unless a small follow-up fix is required by project count growth.

### Content Layer

`content.js` becomes the source of truth for the expanded project pool.

Responsibilities:

- add new project entries derived from CV content
- normalize titles and summaries into the site's current tone
- keep all slugs unique
- provide lightweight `detailsHtml` and metadata for new detail pages

### Detail Page Shells

Each new project requires a matching `projects/<slug>.html` file using the same shell pattern as the existing detail pages:

- same header and navigation hooks
- same `data-project-slug`
- same title/media/details/aside containers
- same `project-detail.js` boot path

Only the page `<title>` and `data-project-slug` need to vary per file.

## Testing Strategy

Update the existing Node test suite to confirm:

- the expanded project list includes the new slugs
- category mapping is reflected in the project data
- each new detail page shell exists and exposes the expected hooks
- selected new projects render correctly through `renderProjectDetail()`
- the site still preserves the existing homepage and detail-page contract

Manual smoke checks should confirm:

- homepage shows the new cards in the expected categories
- clicking new cards opens the correct detail pages
- placeholder detail pages render without missing-state fallbacks

## Scope Limits

Included:

- homepage project-pool expansion from CV projects
- lightweight placeholder detail pages for new projects
- tests covering the expanded content contract

Not included:

- redesigning the homepage layout for the larger project count
- writing full long-form case studies for every new project
- sourcing custom imagery for every newly added project
- changing the current category taxonomy

## Success Criteria

This change is complete when:

- the homepage project pool reflects the current CV project inventory
- all new homepage cards use the same card format as the existing ones
- each new card links to a real detail page shell
- the new detail pages render lightweight but usable project information instead of missing-page fallbacks
- existing project cards and existing detailed projects continue to work without regression
