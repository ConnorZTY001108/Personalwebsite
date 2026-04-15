const placeholderImage = 'assets/placeholders/portfolio-placeholder.svg';

export const portfolioContent = {
  profile: {
    name: 'Tianyu Zhang',
    wordmark: {
      primary: 'Tianyu',
      secondary: 'Zhang',
    },
    heroStatementLines: ['Software Design', '& Build for', 'Workflow Systems'],
    availability: 'Open to software engineering internship opportunities',
    headline: 'Software engineer for workflow systems, product tooling, and applied backend work',
    summary:
      'I build workflow software, engineering tools, and applied systems that need clear interfaces, reliable data handling, and practical delivery.',
  },
  navigation: [
    { label: 'Projects', href: 'index.html#projects' },
    { label: 'About Me', href: 'about.html' },
    { label: 'Contact', href: 'contact.html' },
  ],
  about: {
    paragraphs: [
      'I work best on software that sits between people, operations, and technical systems: workflow platforms, internal tools, visual editors, and interfaces that turn a messy process into something readable.',
      'My strongest projects usually involve both product judgment and engineering rigor. I care about building systems that look intentional, survive real use, and make complex work easier to trust.',
    ],
  },
  projectCategories: [
    {
      slug: 'full-stack-development',
      title: 'Full-Stack Development',
      emptyStateCopy: 'Full-stack projects are coming soon.',
    },
    {
      slug: 'network-cybersecurity',
      title: 'Network & Cybersecurity',
      emptyStateCopy: 'Network & Cybersecurity projects are coming soon.',
    },
    {
      slug: 'hardware-development',
      title: 'Hardware Development',
      emptyStateCopy: 'Hardware projects are coming soon.',
    },
    {
      slug: 'data-analysis',
      title: 'Data Analysis',
      emptyStateCopy: 'Data analysis projects are coming soon.',
    },
    {
      slug: 'personal-interest',
      title: 'Personal Interest',
      emptyStateCopy: 'Personal interest projects are coming soon.',
    },
  ],
  projects: [
    {
      slug: 'process-platform',
      category: 'full-stack-development',
      domain: 'Workflow Software',
      wordmarkLines: ['Industrial', 'Process', 'Platform'],
      result: 'Safer saves, schema upgrades, and reusable subnetworks for a capstone process tool.',
      title: 'Industrial Process Modeling Platform',
      subtitle: 'A full-stack web app for drawing, saving, and computing industrial process diagrams.',
      summary:
        'For a McMaster capstone team, I helped build a visual process-modeling platform that replaces hard-to-read Excel workflows with an interactive canvas and reusable subnetworks.',
      visit: {
        href: 'https://example.com/process-platform',
        label: 'Visit Project',
      },
      detailMeta: {
        siteType: 'Workflow Platform',
        platform: 'React + Node.js',
        disciplines: ['Frontend Systems', 'Backend Reliability'],
      },
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
      media: {
        featuredImage: 'assets/Industrial Process Modeling Platform/ui_overview.png',
        featuredAlt: 'Industrial Process Modeling Platform interface overview',
        longformImage: 'assets/Industrial Process Modeling Platform/start_menu.png',
        longformAlt: 'Industrial Process Modeling Platform start menu view',
      },
      detailsHtml: `
        <p>
          This project is a full-stack web platform for building industrial process diagrams in a visual way. Instead of
          describing a plant through large Excel tables, users can place models on a canvas, connect them with streams,
          and understand the structure of a system much more quickly.
        </p>
        <p>
          The platform also supports the workflow around those diagrams: users can create and load networks, save their
          work, import and export complete snapshots, review computation history, and reuse repeated process sections as
          subnetwork blueprints.
        </p>
        <h4>Challenge</h4>
        <p>
          My main contribution was making the platform reliable enough for repeated use. A single save or load action had
          to keep the visual canvas, node settings, time-period data, nested subnetworks, and computation results
          consistent across both MongoDB and PostgreSQL.
        </p>
        <p>
          I also handled backward compatibility. As the project evolved, older saved diagrams and exported JSON files
          could break when the data format changed, which is a serious problem for a tool people rely on to reopen
          previous work.
        </p>
        <h4>Approach</h4>
        <p>
          I used React, React Flow, and Redux on the frontend to build the visual editor and dashboard experience. On the
          backend, I used Node.js, Express, and Prisma to manage APIs, persistence, authentication, import/export flows,
          and solver-related result handling.
        </p>
        <p>
          To improve reliability, I added schema version stamping and auto-upgrade logic with backup creation, safer save
          flows with deduplication guards and ID remapping, reusable subnetwork blueprints, and run-history management
          for computation results.
        </p>
        <h4>Outcome</h4>
        <p>
          The result is a platform that is much easier to explain in an interview setting: users can visually build and
          manage process networks instead of working through hard-to-read spreadsheets. Recent work also reduced save
          latency and lowered the risk of data loss during complex save or upgrade flows.
        </p>
      `,
      quote: {
        body:
          'Built to make process networks readable, reusable, and safe to save under real engineering workflows.',
        credit: 'McMaster Capstone / Team 18',
      },
    },
    {
      slug: 'robot-car',
      category: 'hardware-development',
      domain: 'Robotics Interface',
      wordmarkLines: ['Vision Assisted', 'Robot Car'],
      result: 'Browser control, live telemetry, and vision-assisted driving feedback in one loop.',
      title: 'Vision-Assisted Arduino Robot Car',
      subtitle: 'Browser-based robotics control with computer vision assistance.',
      summary:
        'Built a browser-driven robotics workflow that combines teleoperation, telemetry, and host-side computer vision feedback.',
      visit: {
        href: 'https://example.com/vision-assisted-robot-car',
        label: 'Visit Project',
      },
      detailMeta: {
        siteType: 'Robotics Interface',
        platform: 'Angular + Python',
        disciplines: ['Control UI', 'Computer Vision'],
      },
      stack: ['Angular', 'Python', 'WebSocket', 'Arduino UNO', 'ESP32-S3'],
      media: {
        featuredImage: placeholderImage,
        featuredAlt: 'Placeholder project visual for the robot car project',
        longformImage: placeholderImage,
        longformAlt: 'Placeholder longform visual for the robot car project',
      },
      detailsHtml: `
        <p>
          This project combines browser controls, live telemetry, and a host-side vision loop into one robotics workflow.
          The goal was to move beyond simple remote control and create a system where an operator could see the robot,
          steer it from a browser interface, and receive vision-assisted feedback in real time.
        </p>
        <h4>Challenge</h4>
        <p>
          The hard part was coordinating several moving pieces at once: browser inputs, WebSocket messaging, Arduino
          motion logic, ESP32-S3 camera streaming, and a Python vision pipeline all had to stay responsive enough for
          assisted driving.
        </p>
        <h4>Approach</h4>
        <p>
          I connected an Angular frontend to the control loop, used WebSocket messaging for browser-to-device updates,
          and integrated camera streaming with host-side vision processing so detections could feed back into the
          driving experience.
        </p>
        <h4>Outcome</h4>
        <p>
          The result was a more credible robotics interface: the operator could control the car from the browser, monitor
          telemetry, and use live detections as part of the driving loop rather than treating vision as a separate demo.
        </p>
      `,
      quote: {
        body: 'One control loop for browser inputs, telemetry, streaming, and machine-vision feedback.',
        credit: 'Embedded Robotics Project',
      },
    },
    {
      slug: 'analytics-dashboard',
      category: 'data-analysis',
      domain: 'Applied Analytics',
      wordmarkLines: ['Consumer Behaviour', 'Analytics'],
      result: 'Interpretable retail insights with 0.83 accuracy and dashboard-ready KPI views.',
      title: 'Consumer Behaviour Analytics Dashboard',
      subtitle: 'Retail analytics dashboard for interpretable business insights.',
      summary:
        'Turned shopping data into practical decision support with interpretable models and a Grafana dashboard.',
      visit: {
        href: 'https://example.com/consumer-behaviour-analytics',
        label: 'Visit Project',
      },
      detailMeta: {
        siteType: 'Analytics Dashboard',
        platform: 'Python + Grafana',
        disciplines: ['Data Analysis', 'Dashboard Design'],
      },
      stack: ['Python', 'Logistic Regression', 'Random Forest', 'Grafana'],
      media: {
        featuredImage: placeholderImage,
        featuredAlt: 'Placeholder dashboard visual for the analytics project',
        longformImage: placeholderImage,
        longformAlt: 'Placeholder longform visual for the analytics project',
      },
      detailsHtml: `
        <p>
          This project turns retail behaviour data into dashboard-ready decision support. Instead of treating the
          analysis as a notebook-only exercise, I focused on building a clear pipeline from dataset exploration to
          interpretable metrics and a presentable business dashboard.
        </p>
        <h4>Challenge</h4>
        <p>
          The challenge was making the output useful for decisions rather than just accurate on paper. The analysis had
          to surface trends, coupon-response behavior, and KPI views that someone outside the model-building process
          could still understand.
        </p>
        <h4>Approach</h4>
        <p>
          I analyzed a 3,900-record retail dataset, trained interpretable prediction models, and mapped the most useful
          metrics into a Grafana dashboard so the work could be communicated as a practical analytics product.
        </p>
        <h4>Outcome</h4>
        <p>
          The final output combined about 0.83 classification accuracy with a multi-panel KPI view, creating a stronger
          portfolio piece than a model report alone because the data, reasoning, and interface all supported one another.
        </p>
      `,
      quote: {
        body: 'Interpretable modelling paired with dashboard delivery makes the analysis easier to trust and easier to use.',
        credit: 'Applied Analytics Project',
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
    note: '',
  },
};
