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
      wordmarkLines: ['Hybrid Process', 'Network Optimization', 'Software'],
      result: 'Safer saves, schema upgrades, and reusable subnetworks for a capstone process tool.',
      title: 'Hybrid Process Network Optimization Software',
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
        'React',
        'TypeScript',
        'Vite',
        'Node.js',
        'Express',
        'Prisma',
        'PostgreSQL',
        'MongoDB',
        'Redis',
        'Python',
        'Docker Compose',
      ],
      logoImage: 'assets/logos/hypronet-logo.png',
      media: {
        featuredImage: 'assets/Industrial Process Modeling Platform/ui_overview.png',
        featuredAlt: 'Hybrid Process Network Optimization Software interface overview',
        longformImage: 'assets/Industrial Process Modeling Platform/start_menu.png',
        longformAlt: 'Hybrid Process Network Optimization Software start menu view',
      },
      detailLeadSections: [
        {
          title: 'Project Description',
          bodyHtml: `
            <p>
              This project is a web-based modeling and version management tool for industrial plant simulation. It replaces
              spreadsheet-based diagram creation with an interactive node-and-edge interface, allowing users to build, edit,
              and manage plant networks in a more visual and efficient way.
            </p>
            <p>
              A typical workflow is to sign in, create or load a diagram, choose a domain and calculation type, add
              equipment models and stream connections, configure materials, costs, and run settings, then save the network
              and submit it to a computation server. In the end, users get a structured and reusable digital plant model,
              along with processed computation results that can be viewed in the interface and exported for further
              analysis.
            </p>
          `,
        },
        {
          title: 'Outcome',
          bodyHtml: `
          <p>
            I mainly worked on reducing save time, improving computation speed, and migrating new data into the database.
          </p>
          <blockquote class="project-quote project-inline-quote">
            <p>
              Reduced large-network save time <span class="project-inline-quote-emphasis">from 40 seconds to 1.5 seconds</span>.<br />
              Reduced backend parsing time for computation results returned by the compute server
              <span class="project-inline-quote-emphasis">from 20 seconds to 3 seconds</span>.
            </p>
          </blockquote>
        `,
        },
      ],
      detailsHtml: `
        <h4>Challenge</h4>
        <h4>Approach</h4>
      `,
      quote: {
        body: '',
        credit: '',
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
    {
      slug: 'secure-gateway-sgx',
      category: 'network-cybersecurity',
      domain: 'Secure Systems',
      wordmarkLines: ['Secure Gateway', 'Based on SGX'],
      result: 'One-way critical-data transfer with SGX-backed security checks for industrial networks.',
      title: 'Unidirectional Secure Gateway Based on SGX',
      subtitle: 'One-way secure data transfer for critical infrastructure scenarios.',
      summary:
        'Designed a unidirectional secure gateway that paired physical one-way transfer with SGX-backed trusted processing for industrial-control data.',
      visit: {
        href: '../assets/project-documents/secure-gateway-sgx-group-report.pdf',
        label: 'Download Project PDF',
      },
      detailMeta: {
        siteType: 'Secure Gateway',
        platform: 'Ubuntu + Intel SGX',
        disciplines: ['Trusted Computing', 'Network Security'],
      },
      stack: ['Intel SGX', 'Ubuntu', 'Trusted Execution'],
      media: {
        featuredImage: placeholderImage,
        featuredAlt: 'Placeholder visual for the secure gateway project',
        longformImage: placeholderImage,
        longformAlt: 'Placeholder longform visual for the secure gateway project',
      },
      detailAsideAction: {
        href: 'assets/project-documents/secure-gateway-sgx-group-report.pdf',
        label: 'Download Project PDF',
        wordmarkLines: ['Download Project PDF'],
        download: 'COMP4900K Group 4 Project.pdf',
        ariaLabel: 'Download the Unidirectional Secure Gateway Based on SGX project PDF',
      },
      detailLeadSections: [
        {
          title: 'Project Description',
          bodyHtml: `
        <p>
          This project explored how a unidirectional security gateway (USG) can protect operational technology (OT) environments by enforcing one-way data flow from a secure internal network to an external network. In
          industrial settings such as manufacturing, transportation, and energy, that allows teams to expose
          operational data for monitoring without opening a return path for remote attacks.
        </p>
        <p>
          We designed an Ubuntu-based receive/send architecture with Ethernet and I/O interfaces, local storage,
          data-processing modules, and a unidirectional optical-fiber link. The platform supports both a
          pass-through mode, which forwards data unchanged in one direction, and a security-check mode, which
          filters content, applies error-correcting codes, and verifies integrity before release.
        </p>
      `,
        },
        {
          title: 'Key Contributions',
          bodyHtml: `
        <ul>
          <li>Owned the project's <strong>Design & Implementation</strong> and <strong>Security Analysis</strong> sections, defining how SGX-backed trusted processing fits into the receiving and sending units.</li>
          <li>Mapped trusted versus untrusted components and explained how the gateway mitigates inbound injection, in-transit tampering, and misuse from compromised internal components.</li>
          <li>Specified a dual-SGX verification model in which the receiving side processes and signs trusted data, while the sending side validates the local proof report and data integrity before forwarding outward.</li>
          <li>Framed a fully offline authentication workflow using pre-issued trusted certificates so enclave validation can still work in deployments that do not permit active outbound attestation.</li>
        </ul>
      `,
        },
      ],
      detailsHtml: `
    <h4>Outcome</h4>
    <p>
      The design combines physical one-way transfer with SGX-backed trusted processing, making it a stronger fit for
      high-assurance industrial and infrastructure settings than a traditional one-way box alone. It protects
      outbound data transfer while still allowing verification, filtering, and certificate-backed trust decisions to
      run inside a protected execution environment.
    </p>
    <p>
      The tradeoffs are explicit. The system does not solve side-channel attacks against SGX, cannot prevent
      physical destruction or service interruption, and introduces overhead from enclave transitions, cache
      behavior, and paging. In practice, it improves trust in outbound data transfer, but it still depends on
      careful hardware choices and realistic performance budgeting.
    </p>
  `,
      quote: {
        body: '',
        credit: '',
      },
    },
    {
      slug: 'intel-sgx-enclave-lab',
      category: 'network-cybersecurity',
      domain: 'Trusted Computing',
      wordmarkLines: ['Intel SGX', 'Enclave Lab'],
      result: 'Hands-on enclave calls, trusted output, and file-writing experiments inside Intel SGX.',
      title: 'Intel SGX Enclave Lab',
      subtitle: "Hands-on SGX enclave experiments inside Intel's Docker lab environment.",
      summary:
        "Extended Intel's sample SGX environment to compare trusted and untrusted execution paths through small, targeted experiments.",
      visit: {
        href: 'https://example.com/intel-sgx-enclave-lab',
        label: 'Visit Project',
      },
      detailMeta: {
        siteType: 'Security Lab',
        platform: 'Docker + Intel SGX',
        disciplines: ['Trusted Execution', 'Systems Experiments'],
      },
      stack: ['Intel SGX', 'Docker', 'Ubuntu'],
      media: {
        featuredImage: placeholderImage,
        featuredAlt: 'Placeholder visual for the Intel SGX lab project',
        longformImage: placeholderImage,
        longformAlt: 'Placeholder longform visual for the Intel SGX lab project',
      },
      detailLeadSections: [
        {
          title: 'Project Description',
          bodyHtml: `
        <p>
          This lab project was a hands-on introduction to Intel SGX. I worked inside Intel's pre-configured Docker
          image, built and ran the sample project, and then modified the sample to compare trusted and untrusted
          behavior.
        </p>
      `,
        },
        {
          title: 'Key Contributions',
          bodyHtml: `
        <ul>
          <li>Ran Intel's sample enclave project inside the SGX Docker environment.</li>
          <li>Added trusted and untrusted calls that append text to a file during enclave execution.</li>
          <li>Added trusted and untrusted calls to compute a square root inside the enclave workflow.</li>
        </ul>
      `,
        },
      ],
      detailsHtml: `
    <h4>Notes</h4>
    <p>
      The lab made SGX much more concrete by showing how enclave boundaries affect real execution paths rather than
      treating trusted execution as an abstract security concept.
    </p>
  `,
      quote: {
        body: '',
        credit: '',
      },
    },
    {
      slug: 'dns-parking-detection',
      category: 'network-cybersecurity',
      domain: 'Network Diagnostics',
      wordmarkLines: ['DNS Parking', 'Detection'],
      result: 'DNS-record and service-port analysis to distinguish parked domains from live websites.',
      title: 'DNS-Based Parking Website Detection System',
      subtitle: 'Domain classification using DNS records and live service checks.',
      summary:
        'Analyzed DNS records and service availability to determine whether a domain was a parked page or an active site.',
      visit: {
        href: 'https://example.com/dns-parking-detection',
        label: 'Visit Project',
      },
      detailMeta: {
        siteType: 'Detection Tool',
        platform: 'DNS + Service Checks',
        disciplines: ['DNS Analysis', 'Network Diagnostics'],
      },
      stack: ['DNS', 'A/MX Records', 'CNAME/NS', 'Port Checks'],
      media: {
        featuredImage: placeholderImage,
        featuredAlt: 'Placeholder visual for the DNS parking detection project',
        longformImage: placeholderImage,
        longformAlt: 'Placeholder longform visual for the DNS parking detection project',
      },
      detailLeadSections: [
        {
          title: 'Project Description',
          bodyHtml: `
        <p>
          This project focused on recognizing parked domains instead of just resolving hostnames. I combined DNS
          record analysis with service verification to move from name lookup into operational classification.
        </p>
      `,
        },
        {
          title: 'Key Contributions',
          bodyHtml: `
        <ul>
          <li>Queried A, MX, and CNAME/NS records to resolve domain ownership and routing details.</li>
          <li>Checked whether the resolved IP address exposed an active service port.</li>
          <li>Used DNS registration timing as an additional signal when classifying parked pages.</li>
        </ul>
      `,
        },
      ],
      detailsHtml: `
    <h4>Outcome</h4>
    <p>
      The result was a stronger detection workflow than DNS lookup alone because it combined record inspection,
      registration context, and live-service checks in one decision path.
    </p>
  `,
      quote: {
        body: '',
        credit: '',
      },
    },
    {
      slug: 'decentralized-platforms',
      category: 'full-stack-development',
      domain: 'Cloud Commerce',
      wordmarkLines: ['Cloud &', 'Decentralized', 'Platforms'],
      result: 'Ethereum smart contracts, backend services, and S3-backed storage for a research commerce stack.',
      title: 'Software Development on Cloud and Decentralized Platforms',
      subtitle: 'Research prototype combining Ethereum smart contracts, backend logic, and cloud storage.',
      summary:
        'Explored how an e-commerce workflow could mix Ethereum smart contracts with backend services and AWS S3-backed storage.',
      visit: {
        href: 'https://example.com/decentralized-platforms',
        label: 'Visit Project',
      },
      detailMeta: {
        siteType: 'Research Prototype',
        platform: 'Ethereum + AWS S3',
        disciplines: ['Backend Systems', 'Smart Contracts'],
      },
      stack: ['Ethereum', 'Solidity', 'AWS S3', 'Backend Logic'],
      media: {
        featuredImage: placeholderImage,
        featuredAlt: 'Placeholder visual for the cloud and decentralized platforms project',
        longformImage: placeholderImage,
        longformAlt: 'Placeholder longform visual for the cloud and decentralized platforms project',
      },
      detailLeadSections: [
        {
          title: 'Project Description',
          bodyHtml: `
        <p>
          This research project examined how cloud-hosted services and decentralized platforms can work together in
          a commerce workflow. Ethereum handled transaction logic, while backend services and AWS S3 supported
          application behavior and storage.
        </p>
      `,
        },
        {
          title: 'Key Contributions',
          bodyHtml: `
        <ul>
          <li>Selected Ethereum as the decentralized platform and wrote Solidity smart contracts for product posting, purchasing, and payment.</li>
          <li>Built backend logic to handle user requests, interact with contracts, and manage user data.</li>
          <li>Used AWS S3 to provide reliable cloud storage and backup for application data.</li>
        </ul>
      `,
        },
      ],
      detailsHtml: `
    <h4>Outcome</h4>
    <p>
      The project connected smart contracts, backend orchestration, and cloud storage into one research prototype,
      making the tradeoffs between centralized and decentralized components easier to evaluate.
    </p>
  `,
      quote: {
        body: '',
        credit: '',
      },
    },
    {
      slug: 'smart-home-management',
      category: 'full-stack-development',
      domain: 'Web Application',
      wordmarkLines: ['Smart Home', 'Management'],
      result: 'Flask-backed smart-home simulation with realtime JSON-driven control flows.',
      title: 'Smart Home Management System',
      subtitle: 'Smart-home management workflow with Flask and JSON-backed state.',
      summary:
        'Built a smart-home management system with an HTML/CSS interface, Flask backend logic, and JSON-based state updates.',
      visit: {
        href: 'https://example.com/smart-home-management',
        label: 'Visit Project',
      },
      detailMeta: {
        siteType: 'Management App',
        platform: 'Flask + HTML/CSS',
        disciplines: ['Backend Logic', 'UI Simulation'],
      },
      stack: ['Flask', 'HTML', 'CSS', 'JSON'],
      media: {
        featuredImage: placeholderImage,
        featuredAlt: 'Placeholder visual for the smart home project',
        longformImage: placeholderImage,
        longformAlt: 'Placeholder longform visual for the smart home project',
      },
      detailLeadSections: [
        {
          title: 'Project Description',
          bodyHtml: `
        <p>
          This project simulated a mobile-style smart-home management interface backed by Flask. The goal was to tie
          simple frontend controls to backend logic and persistent user actions.
        </p>
      `,
        },
        {
          title: 'Key Contributions',
          bodyHtml: `
        <ul>
          <li>Built the interface with HTML and CSS to simulate a mobile control experience.</li>
          <li>Used Flask to handle backend workflow and user actions.</li>
          <li>Adopted JSON files to store and update smart-home state in real time.</li>
        </ul>
      `,
        },
      ],
      detailsHtml: `
    <h4>Outcome</h4>
    <p>
      The result was a compact but complete control workflow covering furniture management, device control, and
      add-furniture flows inside one application.
    </p>
  `,
      quote: {
        body: '',
        credit: '',
      },
    },
    {
      slug: 'gym-membership-management',
      category: 'full-stack-development',
      domain: 'Management System',
      wordmarkLines: ['Gym Membership', 'Management'],
      result: 'Member and admin workflows for registration, classes, equipment, points, and fee handling.',
      title: 'Gym Membership Management System',
      subtitle: 'Member and administrator workflows built with Flask and MongoDB.',
      summary:
        'Built separate member and admin workflows for registration, profile updates, classes, coaches, equipment, and fee logic.',
      visit: {
        href: 'https://example.com/gym-membership-management',
        label: 'Visit Project',
      },
      detailMeta: {
        siteType: 'Management System',
        platform: 'Flask + MongoDB',
        disciplines: ['CRUD Workflows', 'Admin Systems'],
      },
      stack: ['Flask', 'MongoDB', 'HTML'],
      media: {
        featuredImage: placeholderImage,
        featuredAlt: 'Placeholder visual for the gym management project',
        longformImage: placeholderImage,
        longformAlt: 'Placeholder longform visual for the gym management project',
      },
      detailLeadSections: [
        {
          title: 'Project Description',
          bodyHtml: `
        <p>
          This project modeled the daily operations of a gym through separate member and administrator interfaces.
          It focused on managing people, schedules, and fees inside a single system.
        </p>
      `,
        },
        {
          title: 'Key Contributions',
          bodyHtml: `
        <ul>
          <li>Used MongoDB for the underlying data model and Flask for backend behavior.</li>
          <li>Implemented registration, profile updates, and course participation for members.</li>
          <li>Built admin flows to manage courses, coaches, equipment, points, and fee generation.</li>
        </ul>
      `,
        },
      ],
      detailsHtml: `
    <h4>Outcome</h4>
    <p>
      The system covered both user-facing and administrative operations, making it a stronger CRUD workflow project
      than a single-role dashboard.
    </p>
  `,
      quote: {
        body: '',
        credit: '',
      },
    },
    {
      slug: 'community-refrigerator',
      category: 'full-stack-development',
      domain: 'Community Platform',
      wordmarkLines: ['Community', 'Refrigerator'],
      result: 'Inventory browsing, item removal, and realtime MongoDB-backed updates for a community fridge.',
      title: 'Community Refrigerator Web App',
      subtitle: 'Community inventory workflow with realtime MongoDB-backed updates.',
      summary:
        'Developed a small web app for browsing shared fridge inventory, viewing items, and updating data in real time.',
      visit: {
        href: 'https://example.com/community-refrigerator',
        label: 'Visit Project',
      },
      detailMeta: {
        siteType: 'Community Web App',
        platform: 'HTML/CSS/JS + MongoDB',
        disciplines: ['Frontend Basics', 'Realtime Data'],
      },
      stack: ['HTML', 'CSS', 'JavaScript', 'MongoDB', 'JSON'],
      media: {
        featuredImage: placeholderImage,
        featuredAlt: 'Placeholder visual for the community refrigerator project',
        longformImage: placeholderImage,
        longformAlt: 'Placeholder longform visual for the community refrigerator project',
      },
      detailLeadSections: [
        {
          title: 'Project Description',
          bodyHtml: `
        <p>
          This project focused on a simple shared-inventory workflow for a community refrigerator. The emphasis was
          on clear browsing and item updates rather than visual complexity.
        </p>
      `,
        },
        {
          title: 'Key Contributions',
          bodyHtml: `
        <ul>
          <li>Built the web interface with HTML, CSS, and JavaScript.</li>
          <li>Stored and loaded data in JSON format backed by MongoDB.</li>
          <li>Implemented browsing, item viewing, item removal, and realtime data updates.</li>
        </ul>
      `,
        },
      ],
      detailsHtml: `
    <h4>Outcome</h4>
    <p>
      The app turned a small community use case into a practical data workflow and gave me hands-on experience with
      simple realtime update paths.
    </p>
  `,
      quote: {
        body: '',
        credit: '',
      },
    },
    {
      slug: 'aed-interface-simulation',
      category: 'hardware-development',
      domain: 'Medical Device Interface',
      wordmarkLines: ['AED Interface', 'Simulation'],
      result: 'Qt and C++ training interface for ECG, CPR, shock logic, and patient-state simulation.',
      title: 'AED Interface Simulation',
      subtitle: 'Qt-based AED interface and training-mode simulation.',
      summary:
        'Created an AED software simulation that combined interface design, training flow, and patient-state logic.',
      visit: {
        href: 'https://example.com/aed-interface-simulation',
        label: 'Visit Project',
      },
      detailMeta: {
        siteType: 'Training Interface',
        platform: 'Qt + C++',
        disciplines: ['Embedded UI', 'Simulation Logic'],
      },
      stack: ['Qt', 'C++'],
      media: {
        featuredImage: placeholderImage,
        featuredAlt: 'Placeholder visual for the AED simulation project',
        longformImage: placeholderImage,
        longformAlt: 'Placeholder longform visual for the AED simulation project',
      },
      detailLeadSections: [
        {
          title: 'Project Description',
          bodyHtml: `
        <p>
          This project simulated the logic and interface flow of an AED training device. The work combined user
          interface design with procedural device behavior.
        </p>
      `,
        },
        {
          title: 'Key Contributions',
          bodyHtml: `
        <ul>
          <li>Used Qt and C++ to build the training interface and underlying simulation logic.</li>
          <li>Implemented ECG output, CPR analysis, shock simulation, and heart-rate feedback.</li>
          <li>Built input-driven logic to determine whether defibrillation was required for different patient types.</li>
        </ul>
      `,
        },
      ],
      detailsHtml: `
    <h4>Outcome</h4>
    <p>
      The result was both a UI exercise and a procedure simulator, combining training guidance with device-like
      state transitions.
    </p>
  `,
      quote: {
        body: '',
        credit: '',
      },
    },
    {
      slug: 'interactive-documentary',
      category: 'personal-interest',
      domain: 'Interactive Media',
      wordmarkLines: ['Interactive', 'Documentary'],
      result: 'Dynamic local and YouTube playback with synchronized controls for an interactive documentary.',
      title: 'Interactive Documentary Created with HTML',
      subtitle: 'Interactive documentary with synchronized local and YouTube video playback.',
      summary:
        'Built an HTML, CSS, and JavaScript documentary experience that coordinated local video, YouTube embeds, and timed interaction.',
      visit: {
        href: 'https://example.com/interactive-documentary',
        label: 'Visit Project',
      },
      detailMeta: {
        siteType: 'Interactive Experience',
        platform: 'HTML + JavaScript',
        disciplines: ['Frontend Interaction', 'Media Integration'],
      },
      stack: ['HTML', 'CSS', 'JavaScript', 'YouTube IFrame API'],
      media: {
        featuredImage: placeholderImage,
        featuredAlt: 'Placeholder visual for the interactive documentary project',
        longformImage: placeholderImage,
        longformAlt: 'Placeholder longform visual for the interactive documentary project',
      },
      detailLeadSections: [
        {
          title: 'Project Description',
          bodyHtml: `
        <p>
          This project explored interactive storytelling through synchronized media playback. It combined local video
          assets, YouTube embeds, and responsive interface controls to shape how the documentary unfolded.
        </p>
      `,
        },
        {
          title: 'Key Contributions',
          bodyHtml: `
        <ul>
          <li>Used HTML, CSS, and JavaScript to coordinate local and YouTube videos.</li>
          <li>Built a multi-device adaptive interface with cover screens, buttons, and dropdown controls.</li>
          <li>Implemented time-triggered logic and custom JavaScript animations with the YouTube IFrame API.</li>
        </ul>
      `,
        },
      ],
      detailsHtml: `
    <h4>Outcome</h4>
    <p>
      The project emphasized timing, media control, and interactivity, showing how frontend logic can shape a
      narrative experience rather than just present static content.
    </p>
  `,
      quote: {
        body: '',
        credit: '',
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
