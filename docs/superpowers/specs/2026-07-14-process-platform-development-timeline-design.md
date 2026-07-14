# Process Platform Personal Development Timeline Design

## Goal

Add a public-facing personal development timeline to the **Hybrid Process Network Optimization Software** project detail page. The timeline should turn Tianyu Zhang's private Git history into a concise, evidence-based account of the product features, performance work, fixes, and documentation systems he developed between November 2025 and July 2026.

The result should help recruiters and interviewers understand how the contribution evolved over time without exposing private repository details.

## Approved Direction

The project detail page will retain its existing project description and image gallery while adding a **Development Timeline** beside the narrative content.

The timeline will:

- contain 15–25 curated feature stages;
- show only Tianyu's personal contributions;
- combine Documentation, User Manual, and CodeExplanation work into one milestone;
- default to newest-first order and provide a control to switch to oldest-first;
- use a classic single vertical rail with compact milestone cards;
- keep cards collapsed by default and reveal technical details on demand;
- contain only public-safe summaries, aggregate counts, and technology labels;
- be generated once from the current repository history and maintained manually afterward.

## Source Evidence and Analysis Method

The source repository is private. Analysis will run locally against the existing checkout and will not send source code or diffs to an external service.

The initial source set contains 155 commits attributed to the email `edmchzty@gmail.com`, including the author names `Connor` and `ConnorZTY001108`. Of these, 140 are non-merge commits. The observed contribution period runs from 2025-11-29 through 2026-07-14.

The analysis process will:

1. Read commit history across all available local refs.
2. Select commits authored with `edmchzty@gmail.com`.
3. Exclude merge commits, GitHub Desktop stash commits, index snapshots, temporary file-only changes, and other non-product history artifacts.
4. Identify duplicate or equivalent changes introduced by branch movement or cherry-picking.
5. Cluster the remaining commits using date proximity, branch context, changed paths, commit messages, and actual diffs.
6. Inspect representative diffs for each cluster to determine the implemented behavior and contribution boundary.
7. Convert each verified cluster into a public milestone.
8. Review every milestone manually before adding it to the portfolio.

Commit messages are evidence, not final portfolio copy. Vague messages such as `bugfix` or `save sub` must be interpreted only after inspecting the corresponding diff and nearby commits.

## Public and Private Data Boundary

The public portfolio may include:

- milestone date or date range;
- curated feature title;
- one-sentence summary;
- technical-work description;
- outcome or impact statement;
- public technology labels;
- aggregate commit count;
- broad category such as Feature, Performance, Reliability, or Documentation.

The public portfolio must not include:

- commit SHA values;
- raw commit messages;
- private repository or pull-request links;
- private file paths;
- source-code excerpts or diffs;
- branch names that expose internal workflow details;
- authentication tokens or GitHub API credentials.

The deployed page will not call the GitHub API. It will render static, curated data from the portfolio repository, so visitors never receive access credentials for the private source repository.

## Page Structure

The existing desktop detail layout already reserves unused space beside `.project-details` within the 80% main-content column. The timeline will occupy that space instead of replacing the existing 20% image aside.

At desktop widths, the lower project area will contain three visual columns:

1. **Project narrative:** Project Description, Outcome, Challenge, and Approach.
2. **Development Timeline:** the new personal-contribution timeline.
3. **Project media aside:** the existing logo, long-form image, and screenshot gallery.

The narrative and timeline will share a new layout wrapper inside `.project-content`. The existing `.project-aside` remains a sibling of `.project-content` and continues to display media.

At tablet and mobile widths, the content order will be:

1. project narrative;
2. development timeline;
3. project media aside.

The timeline will use the normal page scroll. It will not introduce a nested scroll area or a sticky column.

## Timeline Visual Design

The timeline will follow the approved **Classic Vertical Rail** direction:

- a cyan vertical line establishes chronological flow;
- each milestone connects to the rail with a visible node marker;
- compact cards use the existing dark panel treatment and cyan accent;
- dates appear as small uppercase metadata;
- milestone titles carry the strongest text hierarchy;
- one-sentence summaries remain visible while cards are collapsed;
- expanded details use restrained spacing and the existing muted body color;
- technology labels appear as compact tags rather than a second paragraph;
- the Documentation milestone is visually distinguished by category text, not a separate visual system.

The design must remain legible over the animated dotted background and must match the current PostMono-based detail-page styling.

## Timeline Interaction

The timeline header will include:

- the label `Development Timeline`;
- a two-state `Newest / Oldest` order control;
- a short contribution-period label generated from the timeline data.

Default behavior:

- order is newest to oldest;
- every milestone is collapsed;
- each card shows its date, title, category, and one-sentence summary.

Expanded behavior:

- selecting a milestone reveals technical work, impact, technologies, and aggregate commit count;
- selecting the milestone again collapses it;
- multiple milestones may remain open at the same time;
- changing order preserves milestone expansion state by stable milestone ID.

Interaction controls will use native buttons and expose `aria-expanded`, `aria-controls`, and visible keyboard focus. Animation will be reduced or removed when `prefers-reduced-motion` is active.

## Content Model

The `process-platform` project object in `content.js` will receive a `developmentTimeline` property:

```js
developmentTimeline: {
  generatedThrough: '2026-07-14',
  defaultOrder: 'desc',
  entries: [
    {
      id: 'stable-public-id',
      startDate: '2026-06-08',
      endDate: '2026-07-09',
      dateLabel: 'Jun–Jul 2026',
      title: 'Public feature title',
      category: 'Feature',
      summary: 'One public sentence describing the user-facing contribution.',
      technicalWork: [
        'Public-safe implementation detail.',
        'Public-safe integration detail.',
      ],
      impact: 'Verified result or a neutral outcome statement.',
      technologies: ['React', 'Node.js', 'Prisma'],
      commitCount: 4,
    },
  ],
}
```

`startDate` is the canonical sort key. `endDate` is optional for work completed in a single day. `dateLabel` is curated display copy so the UI does not need locale-dependent date formatting.

`impact` must contain a measured result only when the underlying evidence supports the number. Otherwise it should describe the delivered capability without inventing a metric.

## Rendering Architecture

`project-detail.js` will add small, focused helpers for:

- normalizing and sorting timeline entries;
- rendering the timeline header and cards;
- rendering expandable card detail content;
- binding order controls;
- binding milestone expand/collapse controls;
- mounting or hiding the timeline region based on project data.

The helpers should remain generic enough for another project to supply timeline data later, but the initial content and HTML mount point apply only to `process-platform`.

`projects/process-platform.html` will add:

- a wrapper that groups project narrative and timeline content;
- a timeline mount point with an accessible region label.

The other project HTML files will not be changed. When a project lacks `developmentTimeline`, the renderer must not create a timeline or leave an empty layout column.

`styles.css` will add detail-page-scoped timeline and layout styles. Existing global project-card or homepage styles will not be repurposed in ways that alter other pages.

## Empty and Invalid States

- Missing `developmentTimeline`: hide the timeline region and preserve the existing detail layout.
- Empty `entries`: hide the timeline region.
- Missing optional `endDate`: render the single-date `dateLabel`.
- Empty `technicalWork`, `impact`, and `technologies`: render a non-expandable card rather than an empty details panel.
- Invalid entry data discovered during development: fail the data-contract test and correct the curated content instead of silently inventing fallback copy.
- Unrecognized `defaultOrder`: fall back to newest-first.

## Testing Strategy

Automated tests will verify:

- the `process-platform` project exposes a timeline with 15–25 entries;
- every entry has a unique stable ID, valid sort date, title, category, and summary;
- exactly one entry represents the combined documentation effort;
- public data contains no SHA-like identifiers, private URLs, raw file paths, or raw commit-message fields;
- newest-first and oldest-first sorting are correct;
- compact card markup and expanded detail markup are rendered correctly;
- milestone toggles update `aria-expanded` and visibility;
- the order control reverses the rendered order;
- expanded state is associated with stable IDs;
- missing timeline data leaves other projects unchanged;
- the `process-platform` shell exposes the timeline mount point.

Manual browser verification will cover:

- desktop layout at approximately 1440px and wider;
- the transition from three visual columns to stacked content;
- tablet layout near 1024px and 768px;
- mobile layout near 390px;
- sorting and multi-card expansion;
- keyboard focus and activation;
- reduced-motion behavior;
- readability over the animated background;
- no regression to the existing image lightbox or project-section toggles.

The current repository baseline contains five unrelated failing tests: three stale certification expectations and two missing style-validation prototype expectations. Timeline implementation must add and pass its own targeted tests. Final verification must report the pre-existing failures separately unless they are approved for repair in a separate scope.

## Out of Scope

- live GitHub API requests from the browser;
- scheduled or automatic timeline regeneration;
- publishing private commit or PR identifiers;
- a commit-by-commit activity feed;
- contribution charts or GitHub-style heatmaps;
- team-member timelines;
- filters by technology or category;
- changes to other project detail pages;
- independent timeline scrolling or sticky positioning.

## Success Criteria

The feature is complete when:

- 15–25 evidence-based personal milestones cover the contribution period;
- documentation work is represented by exactly one consolidated milestone;
- public content does not expose private repository evidence;
- the timeline appears beside the project narrative on desktop without displacing the media aside;
- the timeline stacks cleanly between narrative and media on smaller screens;
- newest-first is the default and the order control supports oldest-first;
- milestone cards are compact by default and reveal accessible technical details on demand;
- projects without timeline data retain their current layout and behavior;
- targeted automated tests and manual responsive checks pass;
- any remaining pre-existing test failures are reported accurately rather than attributed to the timeline feature.
