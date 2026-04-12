# Internship Portfolio Website Design

## Goal

Build an English personal internship portfolio website for GitHub Pages that presents Tianyu Zhang as a strong student candidate for software engineering internships. The site should highlight a concise self-introduction, three featured projects, and clear contact paths, while staying easy to update as real screenshots and resume assets become available.

## Constraints

- Deployable on GitHub Pages as a static site.
- Initial version uses placeholder visuals because project screenshots and resume PDF are not ready yet.
- Visual direction is balanced: professional and clean first, with tasteful design details that make the page feel intentional rather than template-like.
- The site is single-page for faster delivery and simpler maintenance.
- The page must work well on desktop and mobile.

## Audience And Outcome

Primary audience:
- Recruiters and hiring managers scanning internship candidates quickly.
- Engineers or technical interviewers checking whether the projects show real implementation depth.

Desired outcome:
- A visitor understands within the first screen that Tianyu is a current M.Eng student seeking internship opportunities in software-related roles.
- A visitor can quickly see evidence of technical ability through selected projects.
- A visitor can contact Tianyu or download the resume with minimal friction.

## Recommended Approach

Chosen approach: single-page static portfolio.

Alternatives considered:
- Multi-page static site: clearer content separation, but too heavy for the current goal.
- Framework-based portfolio: more extensible, but adds engineering overhead before the core story and assets are ready.

Why the single-page static approach wins:
- Simplest path to a polished GitHub Pages deployment.
- Fastest to launch while assets are incomplete.
- Easy to maintain by editing text, links, screenshots, and the resume file later.
- Keeps recruiter attention focused on the core hiring story instead of navigation depth.

## Site Structure

The page will contain six sections in this order:

1. Header
2. Hero
3. About
4. Featured Projects
5. Resume Call To Action
6. Contact and Footer

### Header

Purpose:
- Provide lightweight navigation and immediate identity.

Content:
- Site wordmark or plain text name: `Tianyu Zhang`.
- Navigation links: `About`, `Projects`, `Contact`.

Behavior:
- Sticky header on scroll.
- Smooth anchor navigation to sections.
- Compact layout on mobile with simplified spacing.

### Hero

Purpose:
- Deliver the strongest first impression and summarize candidacy immediately.

Content:
- Name.
- Internship-oriented title, for example: `M.Eng Student in Systems and Technology`.
- One short paragraph introducing internship interest and technical direction.
- Two primary actions:
  - `View Projects`
  - `Download Resume`

Layout:
- Editorial-style asymmetrical layout.
- Left side prioritizes text hierarchy.
- Right side uses a polished visual block that can be an abstract graphic, portrait placeholder, or branded shape treatment.

Design intent:
- Clean and confident, not flashy.
- Strong typography and spacing carry most of the visual identity.

### About

Purpose:
- Expand the hiring story without repeating the full CV.

Content themes:
- Current academic status.
- Interest in internships.
- Technical strengths in full-stack, backend, and systems-oriented project work.
- Evidence of working on performance-sensitive, applied, and team-based software projects.

Structure:
- Two to three short paragraphs.
- Optional supporting stat row if it helps clarity, such as:
  - `M.Eng Student`
  - `Full-Stack + Backend`
  - `Performance-Focused Projects`

### Featured Projects

Purpose:
- Show concrete engineering experience through a focused, curated set of projects.

Projects to include in version 1:
- Industrial Process Modeling Platform
- Vision-Assisted Arduino Robot Car
- Consumer Behaviour Analytics Dashboard

Each project card will include:
- Project title.
- One-line project summary.
- Placeholder screenshot block in version 1, replaceable later with a real image.
- Two to three outcome-oriented bullet points.
- Tech stack tags.

Content emphasis by project:

Industrial Process Modeling Platform:
- Performance optimization.
- Full-stack ownership.
- Batched and incremental update design.

Vision-Assisted Arduino Robot Car:
- Systems integration across frontend, backend, vision, and embedded control.
- Real-time control and telemetry.
- Practical engineering collaboration.

Consumer Behaviour Analytics Dashboard:
- Data-driven analysis and decision support.
- Interpretable modeling.
- Dashboard communication and insight delivery.

Interaction:
- Cards may include subtle hover elevation and screenshot emphasis.
- No modal or separate detail page in version 1.

### Resume Call To Action

Purpose:
- Give recruiters a direct next step after reviewing the page.

Version 1 behavior:
- Show a dedicated resume section with a prominent `Download Resume` button.
- If the PDF is not available yet, the button is visually present but handled safely.

Safe fallback behavior:
- The site must not link to a missing file.
- Until the resume exists, either:
  - show a disabled button with `Resume PDF coming soon`, or
  - route to a non-broken placeholder message on the page.

Preferred version 1 choice:
- Disabled button plus helper text, because it is honest and avoids sending the user to a dead destination.

### Contact And Footer

Purpose:
- Make outreach frictionless.

Contact content:
- Email.
- GitHub.
- LinkedIn.
- Optional phone number if Tianyu later decides it should be public on the site.

Behavior:
- Hide empty contact fields instead of rendering dead or blank links.
- Use a card or panel layout so the section feels deliberate rather than tacked on.

Footer content:
- Short copyright line.
- Optional location or internship availability note.

## Visual Design Direction

Style:
- Balanced professional portfolio.
- Clean editorial feel.
- Slightly warmer and more distinctive than a generic resume website.

Visual rules:
- Strong typography hierarchy.
- Generous whitespace.
- Neutral or warm-toned palette rather than default blue-purple startup styling.
- Purposeful shapes, shadows, and surfaces to add depth without clutter.
- Screenshot areas designed to look polished even when they still use placeholders.

Avoid:
- Overly technical neon aesthetics.
- Busy motion.
- Dense text blocks.
- Generic white-page resume look.

## Content Strategy

All editable content should be centralized so later updates do not require layout refactoring.

Centralized data should include:
- Name.
- Headline.
- Intro paragraph.
- About text.
- Contact links.
- Resume file path or availability state.
- Project summaries, bullets, tech tags, and screenshot paths.

Benefits:
- Easy replacement of placeholder assets.
- Lower risk of inconsistent updates.
- Cleaner separation between content and presentation.

## Technical Architecture

Recommended file layout:

- `index.html` for semantic page structure.
- `styles.css` for layout, theme, animation, and responsive behavior.
- `script.js` for lightweight interactions.
- `content.js` or equivalent inline data object for editable content.
- `assets/` for screenshots, portrait or abstract visual assets, and the resume PDF.

Implementation notes:
- No framework or build tooling required for version 1.
- Keep deployment compatible with plain GitHub Pages hosting.
- Prefer semantic HTML and simple DOM behavior.

## Data Flow

Static content flow:
- Content object defines the page data.
- Page sections render from that content.
- Asset references point to placeholder files first, then real files later.

Update flow after launch:
- Replace placeholder screenshot files with final images.
- Add the real resume PDF to `assets/`.
- Update GitHub and LinkedIn links once ready.
- Revise self-introduction text as internship targeting becomes more specific.

## Error Handling

The page should fail gracefully for incomplete assets.

Required safeguards:
- Missing resume PDF must not create a broken download link.
- Missing project screenshot must show a polished placeholder instead of a broken image icon.
- Missing external profile links must remove or hide the relevant action.
- Sections should remain visually balanced even when some optional content is absent.

## Responsive Behavior

Desktop:
- Hero can use asymmetrical two-column layout.
- Project cards may appear in a multi-column grid.

Mobile:
- Hero collapses into a clean single-column stack.
- Typography scales down without weakening hierarchy.
- Navigation remains usable and simple.
- Project cards become vertical and keep screenshots readable.

## Accessibility And Usability

Requirements:
- Clear semantic heading order.
- Keyboard-accessible navigation and buttons.
- Sufficient contrast in text and controls.
- Alt text for project screenshots and decorative images handled appropriately.
- Visible focus states for interactive elements.

## Testing And Validation

Version 1 acceptance criteria:
- The page loads correctly as a static GitHub Pages site.
- Navigation anchors work.
- Layout reads well on desktop and mobile widths.
- Buttons and external links behave correctly.
- Placeholder states are intentional and do not show broken assets.
- The site presents a clear internship-candidate narrative within the first screen and first project section.

Manual verification checklist for implementation:
- Test in a desktop browser.
- Test in a narrow mobile viewport.
- Verify all section spacing and typography hierarchy.
- Verify no broken image or resume link appears.
- Verify all visible buttons have valid behavior.

## Scope Boundaries

Included in version 1:
- One polished single-page website.
- Placeholder screenshot treatment.
- Placeholder resume handling.
- Three featured projects.
- Contact section with core links.

Explicitly not included in version 1:
- Blog.
- Separate project detail pages.
- CMS or admin editing.
- Dark mode.
- Animation-heavy interactions.
- Backend services or contact form submission.

## Open Decisions Already Resolved

- Language: English only.
- Style: balanced, professional, and slightly design-forward.
- Initial project selection: three featured projects only.
- Assets: placeholder-first launch.
- Layout: single-page site.

## Implementation Readiness

This design is ready to translate into an implementation plan. The next phase should define:
- exact file structure,
- content model,
- section-by-section build order,
- placeholder asset strategy,
- responsive styling tasks,
- verification steps for GitHub Pages readiness.
