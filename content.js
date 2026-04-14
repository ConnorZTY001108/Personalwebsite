const processPlatformGalleryItems = [
  { title: 'Start Menu', file: 'start_menu.png' },
  { title: 'UI Overview', file: 'ui_overview.png' },
  { title: 'Computation Panel', file: 'Computation Pane.png' },
  { title: 'Material Editor', file: 'MaterialEditor.png' },
  { title: 'Data Export', file: 'DataExport.png' },
  { title: 'Excel Data', file: 'ExcelData.png' },
  { title: 'Stream Data', file: 'StramData.png' },
  { title: 'TP Setup', file: 'TPset.png' },
  { title: 'TP Settings', file: 'TPseting.png' },
  { title: 'Cost Breakdown', file: 'Cost.png' },
];

function renderProcessPlatformGallery(items) {
  const cards = items
    .map(
      ({ title, file }) => `
        <button
          type="button"
          class="gallery-card"
          data-gallery-item
          data-gallery-title="${title}"
          data-gallery-src="../assets/Industrial Process Modeling Platform/${file}"
          aria-label="Open ${title} screenshot"
        >
          <img
            src="../assets/Industrial Process Modeling Platform/${file}"
            alt="${title} screenshot"
            loading="lazy"
            draggable="false"
          />
          <span class="gallery-card-caption">
            <span class="gallery-card-title">${title}</span>
          </span>
        </button>
      `,
    )
    .join('');

  return `
    <div class="project-gallery" data-gallery-root>
      <div class="project-gallery-track" data-gallery-track aria-label="Process platform screenshots">
        ${cards}
      </div>
      <div class="gallery-preview" data-gallery-preview aria-hidden="true">
        <button
          type="button"
          class="gallery-preview-scrim"
          data-gallery-close
          tabindex="-1"
          aria-label="Close screenshot preview"
        ></button>
        <div class="gallery-preview-panel" role="dialog" aria-modal="true" aria-labelledby="gallery-preview-title">
          <button type="button" class="gallery-preview-close" data-gallery-close aria-label="Close screenshot preview">
            Close
          </button>
          <img data-gallery-preview-image alt="" />
          <div class="gallery-preview-copy">
            <p class="gallery-preview-kicker">Screenshot Preview</p>
            <h3 id="gallery-preview-title" data-gallery-preview-title></h3>
          </div>
        </div>
      </div>
    </div>
  `;
}

export const portfolioContent = {
  profile: {
    name: 'Tianyu Zhang',
    availability: 'Open to software engineering internship opportunities',
    headline: 'Software engineer for workflow systems, product tooling, and applied backend work',
    summary:
      'I turn messy operational workflows into software that feels clear to use, reliable to maintain, and credible in real engineering settings.',
    metaStrip: [
      'Hamilton, Ontario',
      'M.Eng, McMaster University',
      'Full-Stack + Backend',
      'Open to internships',
    ],
    intro:
      'I build practical software for product, backend, and workflow systems where clarity, reliability, and engineering judgment matter.',
    heroPanel: {
      label: 'featured_focus',
      title: 'Industrial Process Modeling Platform',
      summary:
        'Full-stack workflow tool with safer save paths, schema upgrades, reusable subnetworks, and computation history support.',
      items: ['React / Redux', 'Node.js / Prisma', 'Reliability-first delivery'],
    },
  },
  navigation: [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ],
  about: {
    paragraphs: [
      'I work best on products where the interface and the system design have to support each other: workflow tools, internal platforms, and data-heavy software that people actually use to make decisions.',
      'My recent projects sit at the intersection of frontend clarity, backend reliability, and practical delivery. I care about making complex tools easier to trust, easier to understand, and easier to extend.',
    ],
    stats: ['M.Eng Student', 'Full-Stack + Backend', 'Performance-Focused Projects'],
    principles: [
      {
        title: 'Structure the interface around the real workflow',
        description: 'Build the experience around how people actually move through the task, not around internal implementation details.',
      },
      {
        title: 'Treat reliability as product work',
        description: 'Safer saves, compatibility layers, and stable data handling matter because they change whether people can trust the tool.',
      },
      {
        title: 'Make complex systems readable',
        description: 'Use naming, hierarchy, and reduction so technical software still feels understandable under real use.',
      },
    ],
  },
  projects: [
    {
      slug: 'process-platform',
      domain: 'Workflow Software',
      result: 'Safer saves, schema upgrades, and reusable subnetworks for a capstone process tool.',
      kicker: 'Featured Project',
      title: 'Industrial Process Modeling Platform',
      subtitle: 'A full-stack web app for drawing, saving, and computing industrial process diagrams',
      summary:
        'For a McMaster capstone team, I helped build a visual process-modeling platform that replaces hard-to-read Excel workflows with an interactive canvas and reusable subnetworks.',
      bullets: [
        'Replaced spreadsheet-style process descriptions with a node-and-edge modeling workflow.',
        'Built save/load, import/export, reusable subnetworks, and computation history support for real project use.',
        'Improved reliability with safer saves, schema upgrades for older files, and cleaner data flows.',
      ],
      stack: [
        'TypeScript',
        'React',
        'React Flow',
        'Redux',
        'Node.js',
        'Express.js',
        'Prisma',
        'MongoDB',
        'PostgreSQL',
      ],
      image: {
        src: 'assets/placeholders/portfolio-placeholder.svg',
        alt: 'Placeholder preview for the Industrial Process Modeling Platform project',
      },
      detailSections: {
        projectDetail: `
          <p>
            This project is a full-stack web platform for building industrial process diagrams in a visual way.
            Instead of describing a plant with large Excel tables, users can place models on a canvas, connect them
            with streams, and understand the structure of the system much more quickly.
          </p>
          <p>
            The platform supports the day-to-day workflow around those diagrams as well: users can create and load
            networks, save their work, import and export a complete network as JSON, review computation history, and
            reuse repeated parts of a process as subnetwork blueprints.
          </p>
          ${renderProcessPlatformGallery(processPlatformGalleryItems)}
        `,
        challenge: `
          <p>
            My main contribution was making the platform reliable enough for repeated use. A single save or load
            action had to keep the visual canvas, node settings, time-period data, nested subnetworks, and
            computation results consistent across both MongoDB and PostgreSQL.
          </p>
          <p>
            I also handled backward compatibility. As the project evolved, older saved diagrams and exported JSON
            files could break when the data format changed, which is a serious problem for a tool people rely on to
            reopen previous work.
          </p>
          <p>
            At the same time, the product had to stay understandable for users who think in terms of factory
            processes, not internal data models. The system needed to feel simpler than the Excel-based workflow it
            was replacing, not more technical.
          </p>
        `,
        approach: `
          <p>
            I used React, React Flow, and Redux on the frontend to build the visual editor and dashboard experience.
            On the backend, I used Node.js, Express, and Prisma to manage APIs, persistence, authentication, import
            and export flows, and solver-related result handling.
          </p>
          <p>
            I organized the data so the canvas layout stayed lightweight while node configurations, time-period
            records, and computation results were stored and synchronized more safely. I also added full-network
            snapshot import/export and duplication so an entire process model could move as one package instead of
            breaking into partial files.
          </p>
          <p>
            To improve reliability, I added schema version stamping and auto-upgrade logic with backup creation,
            safer save flows with deduplication guards and ID remapping, reusable subnetwork blueprints, and run
            history management for computation results.
          </p>
        `,
        outcome: `
          <p>
            The result is a platform that is much easier to explain in an interview setting: users can visually build
            and manage process networks instead of working through hard-to-read spreadsheets.
          </p>
          <p>
            The system now supports an end-to-end workflow that includes creating diagrams, editing them on a visual
            canvas, saving and reopening work, importing and exporting complete snapshots, reusing subnetworks, and
            reviewing computation runs and outputs.
          </p>
          <p>
            Recent engineering work also made the platform more robust by reducing save latency, preserving
            compatibility for older diagrams, and lowering the risk of data loss during complex save or upgrade flows.
          </p>
          <p>
            This project was delivered as Team 18&apos;s capstone for SFWRENG 4G06 at McMaster University.
          </p>
        `,
      },
    },
    {
      slug: 'robot-car',
      domain: 'Robotics Interface',
      result: 'Browser control, live telemetry, and vision-assisted driving feedback in one loop.',
      kicker: 'Featured Project',
      title: 'Vision-Assisted Arduino Robot Car',
      subtitle: 'Browser-based robotics control with computer vision assistance',
      summary:
        'Built a browser-driven robotics workflow that combines teleoperation, telemetry, and host-side computer vision feedback.',
      bullets: [
        'Connected Angular controls, WebSocket messaging, and Arduino motion logic.',
        'Integrated ESP32-S3 camera streaming and a Python vision pipeline.',
        'Supported assisted driving with real-time detections and operator feedback.',
      ],
      stack: ['Angular', 'Python', 'WebSocket', 'Arduino UNO', 'ESP32-S3'],
      image: {
        src: 'assets/placeholders/portfolio-placeholder.svg',
        alt: 'Placeholder preview for the Vision-Assisted Arduino Robot Car project',
      },
      detailSections: {
        projectDetail: '',
        challenge: '',
        approach: '',
        outcome: '',
      },
    },
    {
      slug: 'analytics-dashboard',
      domain: 'Applied Analytics',
      result: 'Interpretable retail insights with 0.83 accuracy and dashboard-ready KPI views.',
      kicker: 'Featured Project',
      title: 'Consumer Behaviour Analytics Dashboard',
      subtitle: 'Retail analytics dashboard for interpretable business insights',
      summary:
        'Turned shopping data into practical decision support with interpretable models and a Grafana dashboard.',
      bullets: [
        'Analyzed a 3,900-record retail dataset for targeting and inventory insights.',
        'Reached about 0.83 accuracy and 0.81 AUC on coupon-usage prediction.',
        'Presented KPI, sales, and regional trends through a multi-panel dashboard.',
      ],
      stack: ['Python', 'Logistic Regression', 'Random Forest', 'Grafana'],
      image: {
        src: 'assets/placeholders/portfolio-placeholder.svg',
        alt: 'Placeholder preview for the Consumer Behaviour Analytics Dashboard project',
      },
      detailSections: {
        projectDetail: '',
        challenge: '',
        approach: '',
        outcome: '',
      },
    },
  ],
  resume: {
    available: false,
    label: 'Download Resume',
    fallbackLabel: 'Resume PDF coming soon',
    helperText: 'A polished PDF version will be added before applications are shared.',
    path: 'assets/resume/Tianyu_Zhang_Resume.pdf',
  },
  contact: [
    {
      label: 'Email',
      value: 'zhant173@mcmaster.ca',
      href: 'mailto:zhant173@mcmaster.ca',
      available: true,
    },
    {
      label: 'GitHub',
      value: 'github.com/ConnorZTY001108',
      href: 'https://github.com/ConnorZTY001108',
      available: true,
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/tianyu-zhang-9470a7266',
      href: 'https://www.linkedin.com/in/tianyu-zhang-9470a7266/',
      available: true,
    },
  ],
  footer: {
    note: 'Copyright 2026 Tianyu Zhang. Open to internship opportunities.',
  },
};
