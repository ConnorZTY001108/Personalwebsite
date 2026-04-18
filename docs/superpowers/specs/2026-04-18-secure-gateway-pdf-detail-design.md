# Secure Gateway PDF Detail Design

## Goal

Update the `Unidirectional Secure Gateway Based on SGX` detail page so it better reflects the actual group report and provides a direct download path for that report from the right-side detail box.

The page should keep the site's current detail-page structure and visual language. The change is not a redesign of the detail template. It is a focused content and interaction upgrade for one project.

## Approved User Intent

- Keep the existing three-section detail structure:
  - `Project Description`
  - `Key Contributions`
  - `Outcome`
- Replace the current lightweight SGX summary with a stronger summary grounded in `C:/Users/19612/Downloads/COMP4900K Group 4 Project.pdf`
- On the SGX detail page only, replace the right-side box text from the project title to `Download Project PDF`
- Clicking that right-side box should download the PDF
- Do not change the homepage project card behavior
- Do not apply this download-box behavior to other projects

## Current State

The current SGX project entry in [content.js](C:/Users/19612/Desktop/job/Personal_website/content.js) uses the shared detail-page model:

- `detailLeadSections` contains:
  - `Project Description`
  - `Key Contributions`
- `detailsHtml` contains:
  - `Outcome`
- The right-side box is rendered through `renderAsideLogo(project)` in [project-detail.js](C:/Users/19612/Desktop/job/Personal_website/project-detail.js)
- Because the SGX project has no `logoImage`, that box currently renders the project's `wordmarkLines`
- The box is currently visual-only, not a download action

The report itself contains enough material to support a better portfolio summary:

- why unidirectional security gateways matter in OT and critical infrastructure
- the Ubuntu-based receive/send unit architecture
- pass-through mode and security-check mode
- SGX-backed trusted processing on both sides
- threat model and trusted/untrusted boundaries
- fully offline authentication using pre-generated trusted certificates
- explicit limitations, especially side-channel attacks and SGX performance overhead
- team division of work, including Tianyu Zhang on `Design & Implementation` and `Security Analysis`

## Approaches Considered

### 1. Renderer hardcode for this slug

Add a direct `if (project.slug === 'secure-gateway-sgx')` branch inside `renderAsideLogo()` and inject a one-off download card.

Pros:

- fast to implement
- minimal data-model change

Cons:

- special-case logic in shared rendering code
- does not scale if another project later needs a similar document card
- mixes content policy with rendering logic

### 2. Data-driven aside card action for projects

Extend the project content model with an optional aside-card action object. When present, the detail renderer uses it instead of the default wordmark/logo box. Only the SGX project will use it for now.

Pros:

- keeps the SGX behavior isolated in project data
- preserves the shared detail-page renderer pattern
- allows future document cards without adding more slug-specific branches

Cons:

- slightly larger data-model surface
- requires one small renderer extension plus targeted tests

### 3. Convert the entire detail page into a report-style layout

Replace the current three-section portfolio summary with a more report-like multi-section page and add a separate download module.

Pros:

- closest to the source report structure
- can show more detail directly on-page

Cons:

- breaks the current project-page consistency
- heavier scope than the user asked for
- creates a one-off page model inside a site that currently uses one shared detail format

## Recommendation

Use **Approach 2: data-driven aside card action**.

That keeps the site structurally consistent, solves the PDF-download requirement cleanly, and avoids hardcoding SGX-specific logic into the shared renderer. It also fits the user's approved scope: stronger report-based summary plus a downloadable document card in the existing right-side box.

## Approved Design

### 1. Content Structure

The SGX project detail page keeps the same three content buckets already used by the site:

- `Project Description`
- `Key Contributions`
- `Outcome`

No additional top-level sections will be introduced. The detail template, toggle behavior, and layout stay unchanged.

### 2. Content Rewrite Plan

The new summary content should be sourced from the PDF and compressed into portfolio-ready language rather than copied report-style.

#### Project Description

This section should explain:

- the purpose of a unidirectional security gateway in OT / industrial-control environments
- why one-way transfer matters for manufacturing, transportation, energy, and other critical infrastructure contexts
- the system architecture at a high level:
  - receive unit
  - send unit
  - storage and data-processing modules
  - Ethernet ports / I/O
  - unidirectional optical fiber link
- the two operating modes:
  - pass-through mode
  - security-check mode

The tone should stay concise and portfolio-oriented. It should read like a strong engineering summary, not like a course report abstract.

#### Key Contributions

This section should emphasize Tianyu Zhang's direct authorship areas from the report:

- `Design & Implementation`
- `Security Analysis`

The summary should cover:

- integrating SGX trusted execution into the gateway design
- using trusted processing on both the receiving and sending sides
- modeling trusted vs untrusted components
- describing how the system addresses inbound injection, tampering, and internal abuse scenarios
- explaining the fully offline authentication flow:
  - one-time enclave validation before deployment
  - pre-generated trusted certificates
  - local proof report generation
  - sender-side verification before forwarding outward
- why this design is useful when industrial equipment cannot rely on traditional secure transport protocols or when protocol overhead is undesirable

This should remain framed as portfolio contributions, not as a literature review.

#### Outcome

This section should summarize:

- the core security value of combining physical one-way transfer with SGX-backed trusted processing
- the system's fit for high-assurance industrial and infrastructure settings
- the main limitations stated in the report:
  - side-channel attacks against SGX are not solved
  - physical destruction / service interruption is still possible
  - SGX introduces overhead from enclave transitions, cache behavior, and paging

The section should close with a clear engineering takeaway: the design strengthens data-transfer trust but still involves real tradeoffs.

## PDF Download Box Behavior

### User-Facing Behavior

On the `secure-gateway-sgx` detail page only:

- the right-side detail box should display `Download Project PDF` instead of the current project title wordmark
- clicking the box should download the report PDF

Other projects should keep the current behavior:

- if they have `logoImage`, show the logo card
- otherwise, show the wordmark card

### Visual Behavior

The SGX download box should stay inside the current right-column card language:

- same card shell
- same box placement
- same visual family as the existing detail-side card

The visible copy must read `Download Project PDF`. If the existing wordmark layout naturally breaks it across lines, that is acceptable as long as the wording remains exactly that phrase.

### Asset Handling

The PDF cannot remain referenced from `C:/Users/19612/Downloads/...` because that path is local-machine-only and would fail in the actual site.

The implementation should copy the report into the repository as a static asset using an ASCII-safe filename:

- `assets/project-documents/secure-gateway-sgx-group-report.pdf`

The SGX download card should point to that in-repo asset and use a download-friendly filename:

- `COMP4900K Group 4 Project.pdf`

## Data Model Changes

Add an optional project-level field for detail-page aside actions. The intent is:

- most projects continue using the current logo / wordmark card
- a project can optionally override that box with a clickable CTA card

The spec does not require a specific final property name, but the data model should express:

- destination href
- visible label text
- whether the target should download
- optional download filename

For the SGX project, that data should resolve to:

- href: the new in-repo PDF asset
- label: `Download Project PDF`
- download enabled
- download filename: `COMP4900K Group 4 Project.pdf`

## Rendering Changes

The shared detail renderer should be extended narrowly:

- if the project includes the new aside-card action data, render the right-side card as a clickable download card
- otherwise preserve the current `renderAsideLogo()` behavior

This should stay data-driven. Do not hardcode `secure-gateway-sgx` inside the renderer.

## Testing Expectations

The implementation should keep verification focused and minimal.

Expected test updates:

- the SGX detail render test should assert the rewritten summary content
- the SGX detail render test should assert that the aside box now exposes `Download Project PDF`
- the SGX detail render test should assert that the SGX aside card links to the new PDF asset and uses download behavior
- a shell or asset existence assertion should confirm the PDF is present in the repo if needed

Expected manual verification:

- open the SGX detail page
- confirm the right-side card reads `Download Project PDF`
- click it and confirm the PDF downloads

## Scope Boundaries

Included:

- SGX detail-page summary rewrite based on the PDF
- SGX right-side detail box converted into a PDF download card
- adding the PDF asset to the repo
- minimal renderer and test updates needed to support that behavior

Not included:

- homepage card behavior changes
- redesign of the shared detail-page layout
- rewriting other projects to use document download cards
- converting the SGX page into a multi-section report page

## Risks And Constraints

- The repo currently contains unrelated uncommitted changes in `content.js`, `styles.css`, and `tests/web/test_app.js`, so implementation must work carefully and avoid overwriting existing local edits.
- The new download-card behavior should not regress the default right-side box rendering for all other projects.
- The PDF asset should use a stable repo path with ASCII-safe naming to avoid broken links later.

## Implementation Outcome

When complete, the SGX project page should feel like a stronger portfolio entry:

- the narrative reflects the actual group report
- the user's role is clearer
- the security model and tradeoffs are represented more accurately
- the detail-page box becomes a useful document-download action instead of a decorative repeat of the title
