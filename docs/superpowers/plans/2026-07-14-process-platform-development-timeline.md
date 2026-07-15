# Process Platform Personal Development Timeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a public-safe, evidence-based personal development timeline beside the Hybrid Process Network Optimization Software project narrative.

**Architecture:** Curate one static `developmentTimeline` data object from the private local HYPRONET Git history, then render it through focused helpers in the existing shared project-detail module. The process-platform shell supplies the only timeline mount point; CSS creates a narrative-plus-timeline grid inside the existing 80% content column while preserving the current 20% media aside.

**Tech Stack:** Static HTML, CSS, ES modules, Node.js built-in test runner, local Git history.

## Global Constraints

- Analyze only commits authored with `edmchzty@gmail.com`; treat `Connor` and `ConnorZTY001108` as the same contributor.
- Use the private local HYPRONET checkout under `$HOME\Desktop\Project` as evidence; do not send diffs or source code to an external service.
- Publish no commit SHA, raw commit message, private URL, branch name, private file path, or source-code excerpt.
- Publish exactly 22 curated milestones, including exactly one consolidated Documentation milestone.
- Use static data only; do not add GitHub API calls, tokens, scheduled workflows, or automatic regeneration.
- Default to newest-first order and support an oldest-first switch without losing expanded-card state.
- Keep other project detail pages visually and behaviorally unchanged.
- Preserve the existing project media aside and image lightbox.
- Use native buttons with `aria-expanded`, `aria-controls`, `aria-pressed`, visible focus, and reduced-motion support.
- Do not repair the five pre-existing unrelated test failures unless the user separately expands scope.

---

## File Structure

- Modify `content.js`: add the 22-entry curated `developmentTimeline` object to `process-platform`.
- Modify `projects/process-platform.html`: add the narrative/timeline wrapper and the only timeline mount point.
- Modify `project-detail.js`: add pure sorting/rendering helpers, bind expansion and ordering controls, and mount optional timeline data.
- Modify `styles.css`: add timeline visuals, desktop grid, responsive stacking, focus states, and reduced-motion rules.
- Modify `tests/web/test_app.js`: add data-contract, shell, renderer, interaction, mounting, privacy, and style assertions.

No new runtime dependency or production file is required.

---

### Task 1: Curate and Add the Public Timeline Data

**Files:**
- Modify: `content.js`
- Test: `tests/web/test_app.js`

**Interfaces:**
- Consumes: the local HYPRONET Git history filtered by author email.
- Produces: `portfolioContent.projects.find(({ slug }) => slug === 'process-platform').developmentTimeline` with `{ generatedThrough, defaultOrder, entries }`.

- [ ] **Step 1: Reconfirm the evidence boundary before editing**

Run:

```powershell
$repo = Join-Path $HOME 'Desktop\Project\HYPRONET-GUI'
git -C $repo log --all --no-merges --author='edmchzty@gmail.com' --date=short --pretty=format:'%ad`t%h`t%s'
git -C $repo rev-list --all --count --author='edmchzty@gmail.com'
git -C $repo rev-list --all --count --author='edmchzty@gmail.com' --no-merges
```

Expected:

- contribution period starts at `2025-11-29` and reaches `2026-07-14`;
- total personal commits are `155`;
- non-merge personal commits are `140`.

Inspect representative evidence with:

```powershell
$repo = Join-Path $HOME 'Desktop\Project\HYPRONET-GUI'
git -C $repo log --all --no-merges --author='edmchzty@gmail.com' --since='2026-02-01' --until='2026-02-28' --stat
git -C $repo log --all --no-merges --author='edmchzty@gmail.com' --since='2026-03-01' --until='2026-04-30' --stat
git -C $repo log --all --no-merges --author='edmchzty@gmail.com' --since='2026-05-01' --until='2026-07-14 23:59:59' --stat
```

Expected: the representative diffs cover save performance, multi-TP synchronization, computation-data integrity, economic modeling, Extract Selection, plant-measurement mapping, and solver payload integration.

- [ ] **Step 2: Write the failing timeline data-contract test**

Add this test after the existing portfolio-content contract test in `tests/web/test_app.js`:

```js
test('process platform development timeline data is complete and public-safe', () => {
  const project = portfolioContent.projects.find(({ slug }) => slug === 'process-platform');
  const timeline = project?.developmentTimeline;

  assert.ok(timeline);
  assert.equal(timeline.generatedThrough, '2026-07-14');
  assert.equal(timeline.defaultOrder, 'desc');
  assert.equal(timeline.entries.length, 22);
  assert.equal(new Set(timeline.entries.map(({ id }) => id)).size, 22);
  assert.deepEqual(
    timeline.entries.map(({ title }) => title),
    [
      'New Model Metadata Persistence',
      'Subnetwork Cache Preloading',
      'Stream Deletion State Preservation',
      'Subnetwork Port Mapping and Navigation',
      'Stream Selection and Orthogonal Routing',
      'Incremental Save and Autosave',
      'Computation Save Guard',
      'Save-as-Subnetwork Reliability',
      'Authentication and Token Recovery',
      'Run Configuration Portability',
      'Time-Period and Wrapper Synchronization',
      'Export and Diagram Duplication Reliability',
      'Responsive Canvas and Display Filtering',
      'Computation Result Write-Back Batching',
      'Model Migration and Version Normalization',
      'Stream and Computation Data Integrity',
      'Economic Cost UI and Multi-TP Modeling',
      'Economic Validation and Solver Integration',
      'Extract Selection Workflow',
      'Plant Measurement and Instrument Mapping',
      'Stream Deduplication and Selection',
      'Documentation and Knowledge System',
    ],
  );

  const requiredKeys = [
    'id',
    'startDate',
    'dateLabel',
    'title',
    'category',
    'summary',
    'technicalWork',
    'impact',
    'technologies',
    'commitCount',
  ];
  timeline.entries.forEach((entry) => {
    requiredKeys.forEach((key) => assert.ok(Object.hasOwn(entry, key), `${entry.id} missing ${key}`));
    assert.match(entry.startDate, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(Array.isArray(entry.technicalWork) && entry.technicalWork.length > 0);
    assert.ok(Array.isArray(entry.technologies) && entry.technologies.length > 0);
    assert.ok(Number.isInteger(entry.commitCount) && entry.commitCount > 0);
  });

  assert.equal(timeline.entries.filter(({ category }) => category === 'Documentation').length, 1);

  const forbiddenKeys = new Set([
    'sha',
    'commitSha',
    'commitMessage',
    'rawMessage',
    'href',
    'url',
    'filePath',
    'branch',
  ]);
  timeline.entries.forEach((entry) => {
    Object.keys(entry).forEach((key) => assert.equal(forbiddenKeys.has(key), false));
  });

  const serialized = JSON.stringify(timeline);
  assert.doesNotMatch(serialized, /github\.com\/bluehydrogenplant123/i);
  assert.doesNotMatch(serialized, /src\/src|\.tsx\b|\.prisma\b/i);
  assert.doesNotMatch(serialized, /(^|[^a-z0-9])[0-9a-f]{7,40}([^a-z0-9]|$)/i);
});
```

- [ ] **Step 3: Run the data-contract test and verify it fails**

Run:

```powershell
node --test --test-name-pattern="development timeline data" tests/web/test_app.js
```

Expected: FAIL because `developmentTimeline` is not defined.

- [ ] **Step 4: Add the exact curated timeline object**

Insert this property into the `process-platform` project object in `content.js`, after `detailMeta` and before `stack`:

```js
developmentTimeline: {
  generatedThrough: '2026-07-14',
  defaultOrder: 'desc',
  entries: [
    {
      id: 'new-model-metadata-persistence',
      startDate: '2025-11-29',
      dateLabel: 'Nov 2025',
      title: 'New Model Metadata Persistence',
      category: 'Feature',
      summary: 'Aligned new-model metadata with the canvas state expected after navigation.',
      technicalWork: [
        'Mapped temporary model fields to the canvas name and description contract.',
        'Preserved the new model metadata while resetting unrelated diagram state.',
      ],
      impact: 'Prevented newly created model names and descriptions from being lost during the page transition.',
      technologies: ['React', 'Redux', 'Local Storage'],
      commitCount: 1,
    },
    {
      id: 'subnetwork-cache-preloading',
      startDate: '2025-12-26',
      dateLabel: 'Dec 2025',
      title: 'Subnetwork Cache Preloading',
      category: 'Feature',
      summary: 'Loaded model-version data for every node when the subnetwork editor opened.',
      technicalWork: [
        'Preloaded node cache entries in one editor-open lifecycle.',
        'Resolved available port mappings without requiring a user to click each node first.',
      ],
      impact: 'Made subnetwork port configuration immediately available and reduced repetitive editor interaction.',
      technologies: ['React Hooks', 'Node Cache', 'React Flow'],
      commitCount: 1,
    },
    {
      id: 'stream-deletion-state-preservation',
      startDate: '2025-12-26',
      dateLabel: 'Dec 2025',
      title: 'Stream Deletion State Preservation',
      category: 'Reliability',
      summary: 'Stopped stream deletion from resetting unrelated node configuration.',
      technicalWork: [
        'Removed only stream-generated component variables for the affected port.',
        'Kept the selected model version and user-entered node values intact.',
      ],
      impact: 'Made edge deletion non-destructive for the rest of the configured node state.',
      technologies: ['React Flow', 'Redux', 'Node Cache'],
      commitCount: 1,
    },
    {
      id: 'subnetwork-port-mapping-navigation',
      startDate: '2026-01-06',
      endDate: '2026-01-15',
      dateLabel: 'Jan 2026',
      title: 'Subnetwork Port Mapping and Navigation',
      category: 'Feature',
      summary: 'Improved nested-network authoring with richer port mappings and parent navigation.',
      technicalWork: [
        'Supported repeated wrapper ports mapped to different internal nodes.',
        'Added parent-network navigation and internal node names in wrapper-port tooltips.',
      ],
      impact: 'Made larger nested models easier to understand and move through without losing port context.',
      technologies: ['React', 'React Flow', 'TypeScript'],
      commitCount: 5,
    },
    {
      id: 'stream-selection-orthogonal-routing',
      startDate: '2026-01-14',
      endDate: '2026-02-08',
      dateLabel: 'Jan–Feb 2026',
      title: 'Stream Selection and Orthogonal Routing',
      category: 'Feature',
      summary: 'Added deliberate stream selection, editable paths, and orthogonal connection routing.',
      technicalWork: [
        'Introduced manual path editing for stream edges.',
        'Normalized source and target handles while generating orthogonal routes.',
      ],
      impact: 'Gave users clearer control over dense process diagrams and reduced ambiguous edge layouts.',
      technologies: ['React Flow', 'TypeScript', 'CSS'],
      commitCount: 3,
    },
    {
      id: 'incremental-save-autosave',
      startDate: '2026-02-05',
      endDate: '2026-02-18',
      dateLabel: 'Feb 2026',
      title: 'Incremental Save and Autosave',
      category: 'Performance',
      summary: 'Reworked diagram persistence around cached diffs, autosave state, and parallel writes.',
      technicalWork: [
        'Sent node-cache differences instead of rebuilding every unchanged value.',
        'Parallelized node upserts and exposed save, restore, and auto-reload state in the header.',
      ],
      impact: 'Reduced the measured save path to approximately 1.5 seconds while keeping model versions persistent.',
      technologies: ['Node.js', 'Express', 'MongoDB', 'React'],
      commitCount: 7,
    },
    {
      id: 'computation-save-guard',
      startDate: '2026-02-08',
      dateLabel: 'Feb 2026',
      title: 'Computation Save Guard',
      category: 'Reliability',
      summary: 'Required users to resolve unsaved diagram changes before starting computation.',
      technicalWork: [
        'Detected dirty diagram state from the computation entry point.',
        'Presented an explicit save confirmation before submitting solver work.',
      ],
      impact: 'Reduced the risk of computing against stale or partially persisted model data.',
      technologies: ['React', 'Redux', 'Computation Workflow'],
      commitCount: 1,
    },
    {
      id: 'save-as-subnetwork-reliability',
      startDate: '2026-02-18',
      dateLabel: 'Feb 2026',
      title: 'Save-as-Subnetwork Reliability',
      category: 'Reliability',
      summary: 'Simplified node and port handling in the reusable-subnetwork save flow.',
      technicalWork: [
        'Consolidated node selection and port-mapping logic.',
        'Removed duplicated branches that could produce inconsistent wrapper metadata.',
      ],
      impact: 'Made reusable subnetwork creation easier to maintain and less error-prone.',
      technologies: ['React', 'TypeScript', 'Subnetwork Modeling'],
      commitCount: 1,
    },
    {
      id: 'authentication-token-recovery',
      startDate: '2026-02-19',
      dateLabel: 'Feb 2026',
      title: 'Authentication and Token Recovery',
      category: 'Reliability',
      summary: 'Hardened authentication across backend middleware and frontend session state.',
      technicalWork: [
        'Added token refresh and user-resolution paths for expired sessions.',
        'Aligned login, API middleware, and subnetwork requests around the recovered identity.',
      ],
      impact: 'Reduced workflow interruptions caused by stale authentication state.',
      technologies: ['React Context', 'Express Middleware', 'JWT'],
      commitCount: 1,
    },
    {
      id: 'run-configuration-portability',
      startDate: '2026-02-23',
      endDate: '2026-04-01',
      dateLabel: 'Feb–Apr 2026',
      title: 'Run Configuration Portability',
      category: 'Feature',
      summary: 'Added import and export support for solver run configuration.',
      technicalWork: [
        'Created backend endpoints and normalization utilities for run configuration data.',
        'Connected diagram import, export, and computation-time controls to the portable format.',
      ],
      impact: 'Let users move repeatable solver settings between diagrams and external files.',
      technologies: ['Express', 'React', 'CSV', 'Python'],
      commitCount: 2,
    },
    {
      id: 'time-period-wrapper-sync',
      startDate: '2026-02-23',
      endDate: '2026-03-14',
      dateLabel: 'Feb–Mar 2026',
      title: 'Time-Period and Wrapper Synchronization',
      category: 'Reliability',
      summary: 'Unified node identity, port location, and time-period overrides across nested models.',
      technicalWork: [
        'Normalized canonical node IDs, port locations, and time-period identifiers.',
        'Mirrored wrapper overrides and synchronized node-variable and specification tabs.',
      ],
      impact: 'Kept nested-network values consistent as users switched time periods and edited wrapper ports.',
      technologies: ['TypeScript', 'MongoDB', 'React', 'Prisma'],
      commitCount: 5,
    },
    {
      id: 'export-duplication-reliability',
      startDate: '2026-03-13',
      endDate: '2026-03-14',
      dateLabel: 'Mar 2026',
      title: 'Export and Diagram Duplication Reliability',
      category: 'Feature',
      summary: 'Strengthened diagram export and copy workflows with explicit validation.',
      technicalWork: [
        'Validated database identifiers and centralized browser download utilities.',
        'Added a duplicate-diagram modal with copy-specific input validation.',
      ],
      impact: 'Made model export and duplication safer for users working across multiple saved diagrams.',
      technologies: ['React', 'Express', 'MongoDB'],
      commitCount: 2,
    },
    {
      id: 'responsive-canvas-display-filter',
      startDate: '2026-03-16',
      endDate: '2026-03-24',
      dateLabel: 'Mar 2026',
      title: 'Responsive Canvas and Display Filtering',
      category: 'Feature',
      summary: 'Improved canvas scaling and added controls for filtering visible model nodes.',
      technicalWork: [
        'Adjusted canvas, sidebar, header, node, and edge presentation for changing resolutions.',
        'Added a display-filter button and node overlay driven by reusable filtering utilities.',
      ],
      impact: 'Kept complex diagrams readable across screen sizes and let users focus on relevant nodes.',
      technologies: ['React Flow', 'React', 'CSS'],
      commitCount: 2,
    },
    {
      id: 'computation-result-writeback-batching',
      startDate: '2026-03-25',
      dateLabel: 'Mar 2026',
      title: 'Computation Result Write-Back Batching',
      category: 'Performance',
      summary: 'Restructured computation-result persistence around batched time-period writes.',
      technicalWork: [
        'Grouped time-period result updates instead of issuing repeated individual writes.',
        'Adjusted the computation task handler and storage utilities for the batched path.',
      ],
      impact: 'Reduced result-processing overhead for large solver responses.',
      technologies: ['Node.js', 'MongoDB', 'Worker Queue'],
      commitCount: 1,
    },
    {
      id: 'migration-model-version-normalization',
      startDate: '2026-04-06',
      dateLabel: 'Apr 2026',
      title: 'Model Migration and Version Normalization',
      category: 'Data Migration',
      summary: 'Normalized spreadsheet migrations and centralized model-version state helpers.',
      technicalWork: [
        'Added a reusable normalization layer to the Excel migration pipeline.',
        'Separated model-version state and conversion rules from UI components.',
      ],
      impact: 'Made imported models more consistent across schema generations and easier to upgrade.',
      technologies: ['Python', 'TypeScript', 'Excel Migration'],
      commitCount: 1,
    },
    {
      id: 'stream-computation-data-integrity',
      startDate: '2026-04-08',
      endDate: '2026-06-30',
      dateLabel: 'Apr–Jun 2026',
      title: 'Stream and Computation Data Integrity',
      category: 'Reliability',
      summary: 'Protected user-entered values while normalizing stream and solver result data.',
      technicalWork: [
        'Sanitized stream properties and deduplicated time-period reads before translation.',
        'Applied computed outputs selectively so fixed inputs and human-entered values remained intact.',
      ],
      impact: 'Improved result correctness without overwriting configuration that users intended to keep fixed.',
      technologies: ['Node.js', 'TypeScript', 'Data Translation'],
      commitCount: 4,
    },
    {
      id: 'economic-cost-multi-tp',
      startDate: '2026-04-16',
      endDate: '2026-05-06',
      dateLabel: 'Apr–May 2026',
      title: 'Economic Cost UI and Multi-TP Modeling',
      category: 'Feature',
      summary: 'Built a structured cost editor with multi-time-period economic ranges.',
      technicalWork: [
        'Grouped economic entities into readable sections and refined mapping controls.',
        'Added range-based multi-TP editing, base-value application, and serialization support.',
      ],
      impact: 'Let users configure reusable economic assumptions across multiple operating periods.',
      technologies: ['React', 'TypeScript', 'Prisma', 'PostgreSQL'],
      commitCount: 5,
    },
    {
      id: 'economic-validation-solver-integration',
      startDate: '2026-05-13',
      endDate: '2026-07-09',
      dateLabel: 'May–Jul 2026',
      title: 'Economic Validation and Solver Integration',
      category: 'Feature',
      summary: 'Completed economic configuration with validation, units, persistence, and solver payloads.',
      technicalWork: [
        'Added uncertainty guards, completeness rules, scoped saves, unit conversion, and default dimensions.',
        'Resolved solver aliases and translated economic configuration into computation requests.',
      ],
      impact: 'Connected the economic editor to a validated end-to-end computation workflow.',
      technologies: ['React', 'Express', 'Prisma', 'Solver API'],
      commitCount: 10,
    },
    {
      id: 'extract-selection-workflow',
      startDate: '2026-06-04',
      endDate: '2026-07-14',
      dateLabel: 'Jun–Jul 2026',
      title: 'Extract Selection Workflow',
      category: 'Feature',
      summary: 'Added a full-stack workflow for extracting selected diagram content into a reusable model.',
      technicalWork: [
        'Built backend extraction routes and frontend selection, validation, and confirmation logic.',
        'Integrated the extracted result with node, edge, shape, and header-bar behavior.',
      ],
      impact: 'Let users turn selected portions of a diagram into reusable modeling structures.',
      technologies: ['React Flow', 'React', 'Express', 'TypeScript'],
      commitCount: 2,
    },
    {
      id: 'plant-measurement-instrument-mapping',
      startDate: '2026-06-08',
      endDate: '2026-07-09',
      dateLabel: 'Jun–Jul 2026',
      title: 'Plant Measurement and Instrument Mapping',
      category: 'Feature',
      summary: 'Built a full-stack workflow for mapping plant measurements and instruments to model variables.',
      technicalWork: [
        'Added persistence, validation, service, API, Redux, and table-editing layers.',
        'Supported import, field-level errors, model-path resolution, row synchronization, and unit conversion.',
      ],
      impact: 'Created a validated bridge between recorded plant data and computation-ready model inputs.',
      technologies: ['React', 'Redux Toolkit', 'Express', 'MongoDB'],
      commitCount: 3,
    },
    {
      id: 'stream-deduplication-selection',
      startDate: '2026-05-27',
      endDate: '2026-06-25',
      dateLabel: 'May–Jun 2026',
      title: 'Stream Deduplication and Selection',
      category: 'Reliability',
      summary: 'Standardized stream identity and selection across backend and frontend state.',
      technicalWork: [
        'Used stream names consistently for uniqueness and user-facing labels.',
        'Added shared selection utilities and aligned persisted stream records with domain state.',
      ],
      impact: 'Reduced duplicate stream choices and made selector behavior more predictable.',
      technologies: ['React', 'Redux', 'PostgreSQL'],
      commitCount: 2,
    },
    {
      id: 'documentation-knowledge-system',
      startDate: '2026-01-21',
      endDate: '2026-07-09',
      dateLabel: 'Jan–Jul 2026',
      title: 'Documentation and Knowledge System',
      category: 'Documentation',
      summary: 'Built a maintainable documentation system covering setup, architecture, and GUI workflows.',
      technicalWork: [
        'Created and organized Docusaurus setup guides, CodeExplanation pages, and feature-by-feature user manuals.',
        'Added sync workflows, deployment fixes, maintenance guidance, screenshots, and navigation structure.',
      ],
      impact: 'Turned scattered project knowledge into a publishable reference for developers and users.',
      technologies: ['Docusaurus', 'GitHub Actions', 'Markdown'],
      commitCount: 41,
    },
  ],
},
```

- [ ] **Step 5: Run the data-contract test and verify it passes**

Run:

```powershell
node --test --test-name-pattern="development timeline data" tests/web/test_app.js
```

Expected: PASS with one matching test and no failures.

- [ ] **Step 6: Commit the curated data and contract**

```powershell
git add -- content.js tests/web/test_app.js
git commit -m "feat: add process platform timeline data"
```

---

### Task 2: Add the Process-Platform Timeline Mount Point

**Files:**
- Modify: `projects/process-platform.html`
- Test: `tests/web/test_app.js`

**Interfaces:**
- Consumes: existing `#detail-details-body` and project quote markup.
- Produces: `.project-narrative-layout` containing `.project-details` and `#detail-development-timeline`.

- [ ] **Step 1: Write the failing shell test**

Add after the existing project-detail shell test:

```js
test('process platform shell places a timeline beside the project narrative', () => {
  const processHtml = fs.readFileSync(
    new URL('../../projects/process-platform.html', import.meta.url),
    'utf8',
  );
  const robotHtml = fs.readFileSync(
    new URL('../../projects/robot-car.html', import.meta.url),
    'utf8',
  );

  assert.match(processHtml, /class="project-narrative-layout"/);
  assert.match(processHtml, /id="detail-details-body"[\s\S]*id="detail-development-timeline"/);
  assert.match(
    processHtml,
    /id="detail-development-timeline"[\s\S]*aria-label="Personal development timeline"[\s\S]*hidden/,
  );
  assert.doesNotMatch(robotHtml, /detail-development-timeline/);
});
```

- [ ] **Step 2: Run the shell test and verify it fails**

Run:

```powershell
node --test --test-name-pattern="timeline beside the project narrative" tests/web/test_app.js
```

Expected: FAIL because the wrapper and mount point do not exist.

- [ ] **Step 3: Add the narrative/timeline wrapper**

Replace the current `.project-details` block in `projects/process-platform.html` with:

```html
<div class="project-narrative-layout">
  <div class="project-details">
    <div id="detail-details-body"></div>

    <blockquote id="detail-project-quote" class="project-quote">
      <div id="detail-quote-body"></div>
      <div>
        <p><strong id="detail-quote-credit"></strong></p>
      </div>
    </blockquote>
  </div>

  <section
    id="detail-development-timeline"
    class="development-timeline"
    aria-label="Personal development timeline"
    hidden
  ></section>
</div>
```

- [ ] **Step 4: Run the shell test and verify it passes**

Run:

```powershell
node --test --test-name-pattern="timeline beside the project narrative" tests/web/test_app.js
```

Expected: PASS.

- [ ] **Step 5: Commit the shell change**

```powershell
git add -- projects/process-platform.html tests/web/test_app.js
git commit -m "feat: add process timeline mount point"
```

---

### Task 3: Render Timeline Markup and Deterministic Order

**Files:**
- Modify: `project-detail.js`
- Test: `tests/web/test_app.js`

**Interfaces:**
- Consumes: `developmentTimeline` from Task 1.
- Produces:
  - `sortDevelopmentTimelineEntries(entries, order)` returning a copied sorted array;
  - `renderDevelopmentTimeline(timeline)` returning public timeline markup or an empty string.

- [ ] **Step 1: Import the new helpers in the test file and write failing renderer tests**

Add `renderDevelopmentTimeline` and `sortDevelopmentTimelineEntries` to the existing `project-detail.js` import, then add:

```js
test('sortDevelopmentTimelineEntries supports newest and oldest order without mutating data', () => {
  const entries = [
    { id: 'middle', startDate: '2026-02-01' },
    { id: 'oldest', startDate: '2025-11-29' },
    { id: 'newest', startDate: '2026-07-14' },
  ];

  assert.deepEqual(
    sortDevelopmentTimelineEntries(entries, 'desc').map(({ id }) => id),
    ['newest', 'middle', 'oldest'],
  );
  assert.deepEqual(
    sortDevelopmentTimelineEntries(entries, 'asc').map(({ id }) => id),
    ['oldest', 'middle', 'newest'],
  );
  assert.deepEqual(entries.map(({ id }) => id), ['middle', 'oldest', 'newest']);
});

test('renderDevelopmentTimeline outputs compact accessible milestone cards', () => {
  const timeline = {
    generatedThrough: '2026-07-14',
    defaultOrder: 'desc',
    entries: [
      {
        id: 'save-performance',
        startDate: '2026-02-05',
        endDate: '2026-02-18',
        dateLabel: 'Feb 2026',
        title: 'Incremental Save and Autosave',
        category: 'Performance',
        summary: 'Reworked diagram persistence around cached diffs.',
        technicalWork: ['Sent only changed node data.', 'Parallelized node upserts.'],
        impact: 'Reduced the measured save path to approximately 1.5 seconds.',
        technologies: ['Node.js', 'MongoDB'],
        commitCount: 7,
      },
      {
        id: 'summary-only',
        startDate: '2025-11-29',
        dateLabel: 'Nov 2025',
        title: 'Summary Only',
        category: 'Feature',
        summary: 'A milestone without expandable detail fields.',
        technicalWork: [],
        impact: '',
        technologies: [],
        commitCount: 0,
      },
    ],
  };
  const markup = renderDevelopmentTimeline(timeline);
  const fallbackMarkup = renderDevelopmentTimeline({ ...timeline, defaultOrder: 'sideways' });

  assert.match(markup, /Development Timeline/);
  assert.match(markup, /Nov 2025–Feb 2026/);
  assert.match(markup, /data-development-timeline-order="desc"[\s\S]*aria-pressed="true"/);
  assert.match(markup, /data-development-timeline-order="asc"[\s\S]*aria-pressed="false"/);
  assert.match(markup, /data-development-timeline-entry/);
  assert.match(markup, /data-start-date="2026-02-05"/);
  assert.match(markup, /aria-expanded="false"/);
  assert.match(markup, /aria-controls="development-timeline-details-save-performance"/);
  assert.match(markup, /id="development-timeline-details-save-performance"[\s\S]*hidden/);
  assert.match(markup, /Incremental Save and Autosave/);
  assert.match(markup, /7 curated commits/);
  assert.match(markup, /disabled aria-disabled="true"[\s\S]*Summary Only/);
  assert.doesNotMatch(markup, /id="development-timeline-details-summary-only"/);
  assert.match(
    fallbackMarkup,
    /data-development-timeline-order="desc"[\s\S]*aria-pressed="true"/,
  );
  assert.equal(renderDevelopmentTimeline({ entries: [] }), '');
});
```

- [ ] **Step 2: Run the renderer tests and verify they fail**

Run:

```powershell
node --test --test-name-pattern="sortDevelopmentTimelineEntries|renderDevelopmentTimeline" tests/web/test_app.js
```

Expected: FAIL because both exports are missing.

- [ ] **Step 3: Implement the pure timeline helpers**

Add these helpers after `renderDisciplineItems` in `project-detail.js`:

```js
export function sortDevelopmentTimelineEntries(entries = [], order = 'desc') {
  const direction = order === 'asc' ? 1 : -1;
  return [...entries].sort(
    (left, right) => String(left.startDate).localeCompare(String(right.startDate)) * direction,
  );
}

function getDevelopmentTimelinePeriod(entries = []) {
  const ordered = sortDevelopmentTimelineEntries(entries, 'asc');
  if (!ordered.length) {
    return '';
  }

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const formatMonth = (date) => {
    const [year, month] = String(date).split('-');
    return `${monthNames[Number(month) - 1]} ${year}`;
  };
  const first = ordered[0];
  const last = ordered[ordered.length - 1];
  return `${formatMonth(first.startDate)}–${formatMonth(last.endDate || last.startDate)}`;
}

function hasDevelopmentTimelineDetails(entry) {
  return Boolean(
    entry.technicalWork?.length ||
      entry.impact ||
      entry.technologies?.length ||
      entry.commitCount,
  );
}

function renderDevelopmentTimelineDetails(entry, detailsId) {
  if (!hasDevelopmentTimelineDetails(entry)) {
    return '';
  }

  const technicalWork = entry.technicalWork?.length
    ? `<ul class="development-timeline-work">${entry.technicalWork
        .map((item) => `<li>${item}</li>`)
        .join('')}</ul>`
    : '';
  const impact = entry.impact
    ? `<p class="development-timeline-impact"><strong>Impact:</strong> ${entry.impact}</p>`
    : '';
  const technologies = entry.technologies?.length
    ? `<ul class="development-timeline-technologies" aria-label="Technologies">${entry.technologies
        .map((technology) => `<li>${technology}</li>`)
        .join('')}</ul>`
    : '';
  const commitLabel = entry.commitCount === 1 ? '1 curated commit' : `${entry.commitCount} curated commits`;

  return `
    <div
      class="development-timeline-details"
      id="${detailsId}"
      data-development-timeline-details
      hidden
    >
      ${technicalWork}
      ${impact}
      ${technologies}
      <p class="development-timeline-evidence">${commitLabel}</p>
    </div>
  `;
}

function renderDevelopmentTimelineEntry(entry) {
  const detailsId = `development-timeline-details-${entry.id}`;
  const expandable = hasDevelopmentTimelineDetails(entry);
  const toggleAttributes = expandable
    ? `data-development-timeline-toggle aria-expanded="false" aria-controls="${detailsId}"`
    : 'disabled aria-disabled="true"';

  return `
    <li
      class="development-timeline-entry"
      data-development-timeline-entry
      data-start-date="${entry.startDate}"
      data-entry-id="${entry.id}"
    >
      <article class="development-timeline-card">
        <div class="development-timeline-meta">
          <time datetime="${entry.startDate}">${entry.dateLabel}</time>
          <span>${entry.category}</span>
        </div>
        <button
          class="development-timeline-toggle"
          type="button"
          ${toggleAttributes}
        >
          <span class="development-timeline-card-copy">
            <strong>${entry.title}</strong>
            <span>${entry.summary}</span>
          </span>
          <span class="development-timeline-arrow" aria-hidden="true">&gt;</span>
        </button>
        ${renderDevelopmentTimelineDetails(entry, detailsId)}
      </article>
    </li>
  `;
}

export function renderDevelopmentTimeline(timeline = {}) {
  if (!timeline.entries?.length) {
    return '';
  }

  const order = timeline.defaultOrder === 'asc' ? 'asc' : 'desc';
  const entries = sortDevelopmentTimelineEntries(timeline.entries, order);
  const period = getDevelopmentTimelinePeriod(timeline.entries);

  return `
    <div class="development-timeline-header">
      <div>
        <p class="development-timeline-eyebrow">Personal Contribution</p>
        <h2>Development Timeline</h2>
        <p class="development-timeline-period">${period}</p>
      </div>
      <div class="development-timeline-order" role="group" aria-label="Timeline order">
        <button
          type="button"
          data-development-timeline-order="desc"
          aria-pressed="${order === 'desc'}"
        >Newest</button>
        <button
          type="button"
          data-development-timeline-order="asc"
          aria-pressed="${order === 'asc'}"
        >Oldest</button>
      </div>
    </div>
    <ol id="detail-development-timeline-list" class="development-timeline-list">
      ${entries.map(renderDevelopmentTimelineEntry).join('')}
    </ol>
  `;
}
```

- [ ] **Step 4: Run the renderer tests and verify they pass**

Run:

```powershell
node --test --test-name-pattern="sortDevelopmentTimelineEntries|renderDevelopmentTimeline" tests/web/test_app.js
```

Expected: both matching tests PASS.

- [ ] **Step 5: Commit the pure rendering layer**

```powershell
git add -- project-detail.js tests/web/test_app.js
git commit -m "feat: render process development timeline"
```

---

### Task 4: Mount the Timeline and Bind Expansion and Ordering

**Files:**
- Modify: `project-detail.js`
- Modify: `tests/web/test_app.js`

**Interfaces:**
- Consumes: `renderDevelopmentTimeline(timeline)` from Task 3 and `#detail-development-timeline` from Task 2.
- Produces: `bindDevelopmentTimeline(doc)` plus optional mounting inside `renderProjectDetail`.

- [ ] **Step 1: Write failing mount and interaction tests**

Add `bindDevelopmentTimeline` to the project-detail import and add:

```js
test('renderProjectDetail mounts a timeline only for the process platform', () => {
  const processDocument = createMockDetailDocument('process-platform');
  const robotDocument = createMockDetailDocument('robot-car');

  renderProjectDetail(processDocument);
  renderProjectDetail(robotDocument);

  const processTimeline = processDocument.getElementById('detail-development-timeline');
  const robotTimeline = robotDocument.getElementById('detail-development-timeline');
  assert.equal(processTimeline.hasAttribute('hidden'), false);
  assert.match(processTimeline.innerHTML, /Development Timeline/);
  assert.equal(robotTimeline.getAttribute('hidden'), '');
  assert.equal(robotTimeline.innerHTML, '');
});

test('bindDevelopmentTimeline expands cards and reverses DOM order without losing state', () => {
  const details = createMockNode('development-timeline-details-save');
  details.setAttribute('hidden', '');
  const toggle = createMockTimelineToggleButton(details.id);
  const newest = createMockTimelineOrderButton('desc', true);
  const oldest = createMockTimelineOrderButton('asc', false);
  const entries = [
    createMockTimelineEntry('newest', '2026-07-14'),
    createMockTimelineEntry('oldest', '2025-11-29'),
  ];
  const list = createMockTimelineList(entries);
  const doc = {
    getElementById(id) {
      if (id === details.id) return details;
      if (id === 'detail-development-timeline-list') return list;
      return null;
    },
    querySelectorAll(selector) {
      if (selector === '[data-development-timeline-toggle]') return [toggle];
      if (selector === '[data-development-timeline-order]') return [newest, oldest];
      return [];
    },
  };

  bindDevelopmentTimeline(doc);
  toggle.listeners.click();
  assert.equal(toggle.getAttribute('aria-expanded'), 'true');
  assert.equal(details.hasAttribute('hidden'), false);

  oldest.listeners.click();
  assert.deepEqual(list.children.map(({ dataset }) => dataset.entryId), ['oldest', 'newest']);
  assert.equal(newest.getAttribute('aria-pressed'), 'false');
  assert.equal(oldest.getAttribute('aria-pressed'), 'true');
  assert.equal(toggle.getAttribute('aria-expanded'), 'true');
});
```

- [ ] **Step 2: Extend the test mocks for optional timeline hooks**

Add `'detail-development-timeline'` to the `ids` array in `createMockDetailDocument`. Update its `querySelectorAll` fallback so unknown optional timeline selectors return an empty array:

```js
if (
  selector === '[data-development-timeline-toggle]' ||
  selector === '[data-development-timeline-order]'
) {
  return [];
}
```

Add these helpers beside the existing project-section button helper:

```js
function createMockTimelineToggleButton(controlsId) {
  const button = createMockNode('timeline-toggle');
  button.setAttribute('aria-controls', controlsId);
  button.setAttribute('aria-expanded', 'false');
  return button;
}

function createMockTimelineOrderButton(order, pressed) {
  const button = createMockNode(`timeline-order-${order}`);
  button.dataset.developmentTimelineOrder = order;
  button.setAttribute('aria-pressed', String(pressed));
  return button;
}

function createMockTimelineEntry(id, startDate) {
  const entry = createMockNode(`timeline-entry-${id}`);
  entry.dataset.entryId = id;
  entry.dataset.startDate = startDate;
  return entry;
}

function createMockTimelineList(entries) {
  return {
    children: [...entries],
    querySelectorAll(selector) {
      assert.equal(selector, '[data-development-timeline-entry]');
      return [...this.children];
    },
    appendChild(entry) {
      this.children = this.children.filter((item) => item !== entry);
      this.children.push(entry);
      return entry;
    },
  };
}
```

- [ ] **Step 3: Run the mount and interaction tests and verify they fail**

Run:

```powershell
node --test --test-name-pattern="mounts a timeline|bindDevelopmentTimeline" tests/web/test_app.js
```

Expected: FAIL because the timeline is not mounted and `bindDevelopmentTimeline` is missing.

- [ ] **Step 4: Implement expansion and DOM ordering**

Add after `bindProjectDetailSectionToggles` in `project-detail.js`:

```js
function setDevelopmentTimelineExpanded(button, details, expanded) {
  button.setAttribute('aria-expanded', String(expanded));
  if (expanded) {
    details.removeAttribute('hidden');
    return;
  }
  details.setAttribute('hidden', '');
}

export function bindDevelopmentTimeline(doc = document) {
  if (!doc?.querySelectorAll || !doc?.getElementById) {
    return;
  }

  const toggleButtons = doc.querySelectorAll('[data-development-timeline-toggle]');
  toggleButtons.forEach((button) => {
    const detailsId = button.getAttribute('aria-controls');
    const details = detailsId ? doc.getElementById(detailsId) : null;
    if (!details || button.dataset.bound === 'true') {
      return;
    }

    button.dataset.bound = 'true';
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') !== 'true';
      setDevelopmentTimelineExpanded(button, details, expanded);
    });
  });

  const list = doc.getElementById('detail-development-timeline-list');
  const orderButtons = doc.querySelectorAll('[data-development-timeline-order]');
  if (!list) {
    return;
  }

  orderButtons.forEach((button) => {
    if (button.dataset.bound === 'true') {
      return;
    }

    button.dataset.bound = 'true';
    button.addEventListener('click', () => {
      const order = button.dataset.developmentTimelineOrder === 'asc' ? 'asc' : 'desc';
      const entries = Array.from(list.querySelectorAll('[data-development-timeline-entry]'));
      const direction = order === 'asc' ? 1 : -1;

      entries
        .sort(
          (left, right) =>
            String(left.dataset.startDate).localeCompare(String(right.dataset.startDate)) * direction,
        )
        .forEach((entry) => list.appendChild(entry));

      orderButtons.forEach((candidate) => {
        candidate.setAttribute(
          'aria-pressed',
          String(candidate.dataset.developmentTimelineOrder === order),
        );
      });
    });
  });
}
```

- [ ] **Step 5: Mount optional timeline data inside `renderProjectDetail`**

In the missing-project branch, clear and hide the timeline:

```js
setNodeHTML(doc, 'detail-development-timeline', '');
setNodeHidden(doc, 'detail-development-timeline', true);
```

After rendering `detail-details-body` for a real project, add:

```js
const timelineMarkup = renderDevelopmentTimeline(project.developmentTimeline);
setNodeHTML(doc, 'detail-development-timeline', timelineMarkup);
setNodeHidden(doc, 'detail-development-timeline', !timelineMarkup);
```

Before `bindProjectDetailLightbox(doc)`, add:

```js
bindDevelopmentTimeline(doc);
```

- [ ] **Step 6: Run the mount and interaction tests and verify they pass**

Run:

```powershell
node --test --test-name-pattern="mounts a timeline|bindDevelopmentTimeline" tests/web/test_app.js
```

Expected: both tests PASS.

- [ ] **Step 7: Commit the mounted interaction layer**

```powershell
git add -- project-detail.js tests/web/test_app.js
git commit -m "feat: add timeline controls"
```

---

### Task 5: Style the Three-Column Detail Layout and Timeline

**Files:**
- Modify: `styles.css`
- Test: `tests/web/test_app.js`

**Interfaces:**
- Consumes: `.project-narrative-layout` and `.development-timeline*` markup from Tasks 2–4.
- Produces: stacked base layout, desktop 2:1 narrative/timeline grid, classic vertical rail, focus states, and reduced-motion behavior.

- [ ] **Step 1: Write the failing style-contract test**

Add:

```js
test('styles define the process narrative grid and classic development timeline rail', () => {
  const css = fs.readFileSync(new URL('../../styles.css', import.meta.url), 'utf8');

  assert.match(css, /\.project-narrative-layout\s*\{/);
  assert.match(css, /\.development-timeline-list::before/);
  assert.match(css, /\.development-timeline-entry::before/);
  assert.match(css, /\.development-timeline-toggle\[aria-expanded='true'\]/);
  assert.match(css, /\[data-development-timeline-order\]\[aria-pressed='true'\]/);
  assert.match(css, /@media \(min-width: 1100px\)[\s\S]*grid-template-columns:\s*minmax\(0, 2fr\) minmax\(240px, 1fr\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*development-timeline/);
});
```

- [ ] **Step 2: Run the style test and verify it fails**

Run:

```powershell
node --test --test-name-pattern="classic development timeline rail" tests/web/test_app.js
```

Expected: FAIL because the new selectors do not exist.

- [ ] **Step 3: Add the base timeline and responsive layout styles**

Append this scoped block after the existing responsive rules in `styles.css`:

```css
.project-narrative-layout {
  display: grid;
  gap: 48px;
  width: 100%;
}

.project-narrative-layout .project-details {
  width: 100%;
}

.development-timeline {
  min-width: 0;
  padding: 24px;
  border: 1px solid var(--panel-border);
  background: rgba(0, 8, 10, 0.72);
  backdrop-filter: blur(6px);
}

.development-timeline[hidden] {
  display: none;
}

.development-timeline-header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 28px;
}

.development-timeline-eyebrow,
.development-timeline-period,
.development-timeline-evidence {
  margin: 0;
  font-family: 'PostMono', sans-serif;
  color: var(--muted);
}

.development-timeline-eyebrow {
  margin-bottom: 6px;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.development-timeline-header h2 {
  margin: 0;
  font-family: 'PostMono', sans-serif;
  font-size: clamp(22px, 2.1vw, 34px);
  font-weight: 300;
  color: var(--accent);
  text-shadow: 0 0 10px rgba(0, 247, 255, 0.7);
}

.development-timeline-period {
  margin-top: 6px;
  font-size: 13px;
}

.development-timeline-order {
  display: inline-grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border: 1px solid var(--panel-border);
}

.development-timeline-order button {
  min-height: 36px;
  padding: 7px 10px;
  border: 0;
  background: transparent;
  font-family: 'PostMono', sans-serif;
  color: var(--muted);
  cursor: pointer;
}

.development-timeline-order button + button {
  border-left: 1px solid var(--panel-border);
}

[data-development-timeline-order][aria-pressed='true'] {
  color: #001113;
  background: var(--accent);
  text-shadow: none;
}

.development-timeline-order button:focus-visible,
.development-timeline-toggle:focus-visible {
  outline: 2px solid var(--accent-hot);
  outline-offset: 3px;
}

.development-timeline-list {
  position: relative;
  display: grid;
  gap: 18px;
  margin: 0;
  padding: 0 0 0 28px;
  list-style: none;
}

.development-timeline-list::before {
  content: '';
  position: absolute;
  top: 7px;
  bottom: 7px;
  left: 7px;
  width: 1px;
  background: rgba(0, 247, 255, 0.48);
  box-shadow: 0 0 9px rgba(0, 247, 255, 0.52);
}

.development-timeline-entry {
  position: relative;
}

.development-timeline-entry::before {
  content: '';
  position: absolute;
  top: 19px;
  left: -24px;
  width: 9px;
  height: 9px;
  border: 1px solid var(--accent);
  border-radius: 50%;
  background: #001113;
  box-shadow: 0 0 9px rgba(0, 247, 255, 0.8);
}

.development-timeline-card {
  border: 1px solid rgba(0, 247, 255, 0.2);
  background: rgba(0, 12, 14, 0.78);
}

.development-timeline-meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
  padding: 13px 14px 0;
  font-family: 'PostMono', sans-serif;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--accent);
  text-transform: uppercase;
}

.development-timeline-toggle {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 14px;
  width: 100%;
  padding: 12px 14px 15px;
  border: 0;
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
}

.development-timeline-toggle:disabled {
  cursor: default;
}

.development-timeline-card-copy {
  display: grid;
  gap: 6px;
}

.development-timeline-card-copy strong {
  font-family: 'PostMono', sans-serif;
  font-size: 17px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.98);
}

.development-timeline-card-copy > span {
  color: var(--muted);
  line-height: 1.55;
}

.development-timeline-arrow {
  color: var(--accent);
  transform: rotate(90deg);
  transition: transform 0.18s ease;
}

.development-timeline-toggle[aria-expanded='true'] .development-timeline-arrow {
  transform: rotate(-90deg);
}

.development-timeline-details {
  padding: 0 14px 16px;
  border-top: 1px solid rgba(0, 247, 255, 0.12);
}

.development-timeline-details[hidden] {
  display: none;
}

.development-timeline-work {
  margin: 14px 0;
  padding-left: 18px;
  color: var(--muted);
}

.development-timeline-work li + li {
  margin-top: 7px;
}

.development-timeline-impact {
  margin: 14px 0;
  color: var(--muted);
}

.development-timeline-impact strong {
  color: rgba(255, 255, 255, 0.96);
}

.development-timeline-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin: 14px 0;
  padding: 0;
  list-style: none;
}

.development-timeline-technologies li {
  padding: 4px 7px;
  border: 1px solid rgba(0, 247, 255, 0.26);
  font-family: 'PostMono', sans-serif;
  font-size: 11px;
  color: var(--accent);
}

.development-timeline-evidence {
  font-size: 11px;
}

@media (min-width: 1100px) {
  .project-narrative-layout {
    grid-template-columns: minmax(0, 2fr) minmax(240px, 1fr);
    align-items: start;
  }
}

@media (max-width: 1099px) {
  .development-timeline {
    margin-top: 6px;
  }
}

@media (max-width: 520px) {
  .development-timeline {
    padding: 18px 14px;
  }

  .development-timeline-header {
    align-items: stretch;
  }

  .development-timeline-order {
    width: 100%;
  }

  .development-timeline-order button,
  .development-timeline-toggle {
    min-height: 44px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .development-timeline-arrow {
    transition: none;
  }
}
```

- [ ] **Step 4: Run the style-contract test and verify it passes**

Run:

```powershell
node --test --test-name-pattern="classic development timeline rail" tests/web/test_app.js
```

Expected: PASS.

- [ ] **Step 5: Run timeline-focused automated tests**

Run:

```powershell
node --test --test-name-pattern="development timeline|timeline beside|mounts a timeline|bindDevelopmentTimeline|classic development timeline" tests/web/test_app.js
```

Expected: every matching timeline test PASS and zero matching failures.

- [ ] **Step 6: Verify the layout in a real browser**

Start the static site:

```powershell
Start-Process -FilePath python -ArgumentList '-m','http.server','4173' -WorkingDirectory (Get-Location).Path -WindowStyle Hidden
```

Open `http://localhost:4173/projects/process-platform.html` and verify:

- at 1440px and wider, narrative and timeline share the 80% content column while the image gallery remains in the 20% aside;
- at 1024px and 768px, the narrative, timeline, and media remain readable without horizontal overflow;
- at 390px, the order is narrative, timeline, then media, and controls meet a 44px touch target;
- default order is newest-first;
- switching to oldest-first reverses the cards;
- expanding two cards keeps both open;
- switching order preserves those expanded states;
- keyboard focus is visible and Enter/Space activates native buttons;
- reduced-motion emulation removes the arrow transition;
- the dotted background does not reduce card readability;
- the image lightbox still opens and closes.

Also open `http://localhost:4173/projects/robot-car.html` and verify no timeline or empty timeline gap appears.

- [ ] **Step 7: Commit the responsive visual layer**

```powershell
git add -- styles.css tests/web/test_app.js
git commit -m "feat: style process development timeline"
```

---

### Task 6: Final Regression and Scope Verification

**Files:**
- Verify: `content.js`
- Verify: `projects/process-platform.html`
- Verify: `project-detail.js`
- Verify: `styles.css`
- Verify: `tests/web/test_app.js`
- Verify: `design-qa.md` as the required sanitized product-design QA artifact

**Interfaces:**
- Consumes: all completed timeline tasks.
- Produces: evidence that timeline behavior passes and no new unrelated failure has been introduced.

- [ ] **Step 1: Run whitespace and scope checks**

Run:

```powershell
git diff --check origin/main...HEAD
git diff --name-only origin/main...HEAD
git status --short --branch
```

Expected:

- `git diff --check` prints no errors;
- implementation changes are limited to the five approved runtime/test files, the sanitized project-root `design-qa.md` product-design QA artifact, and the approved design and plan documents;
- no `.superpowers/` visual-companion files are tracked.

- [ ] **Step 2: Re-run every timeline test as a clean focused gate**

Run:

```powershell
node --test --test-name-pattern="development timeline|timeline beside|mounts a timeline|bindDevelopmentTimeline|classic development timeline" tests/web/test_app.js
```

Expected: all matching tests PASS and zero matching failures.

- [ ] **Step 3: Run the complete baseline suite and compare failure signatures**

Run:

```powershell
node --test tests/web/test_app.js
```

Expected:

- all new timeline tests PASS;
- the suite may still report exactly the five pre-existing failures recorded before implementation:
  - three stale certification expectations;
  - two missing style-validation prototype expectations;
- no timeline, layout, lightbox, project-section, or other new failure appears.

If the failure count or signatures differ, stop and fix the regression before completion.

- [ ] **Step 4: Recheck the public/private boundary**

Run:

```powershell
rg -n "bluehydrogenplant123|[0-9a-f]{40}|src/src|\.tsx|\.prisma" content.js projects/process-platform.html project-detail.js styles.css
```

Expected: no private repository URL, full SHA, private source path, or private source filename appears in the public timeline data or markup.

- [ ] **Step 5: Inspect the final commit series**

Run:

```powershell
git log --oneline --decorate origin/main..HEAD
git status --short --branch
```

Expected: the design and plan documentation commits plus five focused feature commits are present, and the worktree is clean.
