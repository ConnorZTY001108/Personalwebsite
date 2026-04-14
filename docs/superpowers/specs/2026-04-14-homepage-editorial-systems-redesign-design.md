# Homepage Editorial Systems Redesign

Date: 2026-04-14
Project: Personal_website
Scope: Homepage redesign only

## Summary

Redesign the homepage as an editorial-tech portfolio rather than a warm student portfolio or a terminal-inspired interface. Keep the existing content foundation, project set, and navigation targets, but replace the homepage visual language, information rhythm, and hierarchy so the site reads as a mature portfolio with clear taste and clear capability.

The intended first impression is: this person has design judgment and can also deliver substantial engineering work.

## Goals

- Make the homepage feel materially different from the current site, not like a light refresh.
- Preserve the user's actual content and featured projects while improving the way the content is framed.
- Establish a stronger visual identity through typography, spacing, alignment, and hierarchy rather than decorative effects.
- Show meaningful work early on the page so the homepage does not feel empty or over-indexed on mood.
- Present the user as an editorially minded engineer: visually sharp, technically credible, and professionally mature.

## Non-Goals

- Do not rewrite the entire portfolio's core content strategy.
- Do not redesign project detail page information architecture in this pass.
- Do not turn the homepage into a faux terminal, dashboard, or developer-console motif.
- Do not rely on oversized animation, trendy 3D visuals, or ornamental illustration to create identity.

## Design Direction

### Core Direction

The homepage should follow an "Editorial Systems" direction:

- editorial in composition
- systematic in information layout
- restrained in palette
- explicit in project signaling

The result should feel closer to a design-conscious portfolio cover and contents page than to a resume landing page.

### Visual Tone

- Cool, neutral palette with strong contrast and minimal warmth
- Strong headline typography with more presence than the current site
- Clear distinction between headline text, body copy, and metadata
- Thin rules, numbering, captions, and alignment-based structure instead of heavy card chrome
- Technical cues appear as indexing, taxonomy, and project metadata, not as a terminal skin

### Explicit Contrast With Current Homepage

The new homepage must not resemble the existing warm editorial card layout with only cosmetic adjustments. It must change:

- hero composition
- section rhythm
- project presentation style
- tone of metadata
- overall palette and typography hierarchy

If the updated homepage could reasonably be described as "the old design but sharper," it has failed the redesign goal.

## Information Architecture

### 1. Hero

The hero becomes a cover-style section with immediate proof of work.

Left column:

- name
- role / positioning statement
- concise summary with stronger judgment and less generic self-description

Right column:

- "Selected Work Index" block listing the 3 featured projects
- each entry includes project number, title, domain, and a short result-oriented descriptor

Hero footer strip:

- lightweight metadata row for location, focus area, availability, and technical keywords

The hero should feel substantial on first load, but not visually crowded. It should deliver both identity and evidence within the first viewport.

### 2. Selected Work

This section should appear early, directly after the hero.

Each featured project is presented as a structured feature block rather than a conventional card. Each block should include:

- project number
- title
- project category or discipline
- short summary
- stack / tooling metadata
- one result-oriented signal
- clear path into the detail page

Project presentation should prioritize hierarchy and composition over card decoration. The blocks should feel editorially laid out, not like a generic responsive card grid.

### 3. Profile

The current about section should be reduced into a sharper profile section focused on:

- how the user works
- what kind of engineering problems they are interested in
- what standards or principles shape their work

This section should read more like an authored profile note than a descriptive bio dump.

### 4. Resume

Keep the resume CTA, but fit it into the new editorial language. It should remain useful without visually reverting to the current "boxed card" pattern.

### 5. Contact

The contact section should behave like an editorial closing section:

- minimal
- confident
- easy to scan
- visually aligned with the overall page tone

It should feel like an ending note or footer spread, not a utility widget.

## Content Handling

- Keep the existing featured projects and homepage sections.
- Preserve the current navigation targets unless implementation reveals a concrete reason to rename them.
- Reframe existing copy through layout and hierarchy first; only make text edits where necessary to sharpen tone and reduce generic wording.
- Avoid adding filler content just to support a more designed layout.

## Interaction and Motion

- Use restrained editorial motion only.
- Prioritize entrance rhythm, reveal timing, hover precision, and subtle layout response.
- Avoid large theatrical animations, parallax-heavy behavior, and motion that competes with readability.
- Motion should reinforce composition and perceived polish, not act as the homepage concept.

## Responsive Behavior

- Mobile must be intentionally redesigned, not just compressed from desktop.
- The hero should reorder cleanly so the identity statement and project index remain readable and immediate.
- Metadata and project blocks should preserve hierarchy on smaller screens.
- The page should still feel like a complete editorial composition on mobile, not a degraded stack of blocks.

## Implementation Boundaries

- This pass is homepage-only.
- The homepage should establish the new visual language strongly enough that detail pages can be updated later to match.
- Detail page links, content data, and existing project routes should remain functional throughout.
- The redesign should use the current site structure where practical, but it is allowed to substantially change homepage section layout and styling.

## Acceptance Criteria

The redesign is successful when all of the following are true:

- The homepage reads as a clearly new design direction, not a mild iteration of the current site.
- The first impression aligns with "has taste and can do strong work."
- Users can understand who the portfolio belongs to and what work is featured without needing to scroll far.
- The page feels more mature and intentional than the current homepage.
- The implementation preserves project access and core content while materially improving presentation.
- The homepage works on both desktop and mobile without collapsing into a generic stacked layout.

## Implementation Notes For Planning

- Expect meaningful changes to `index.html`, `styles.css`, and homepage rendering helpers.
- Revisit homepage copy only where stronger editorial framing requires it.
- Treat typography, spacing, and section structure as first-class implementation work, not polish to add later.
