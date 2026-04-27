const placeholderImage = 'assets/placeholders/portfolio-placeholder.svg';

export const portfolioContent = {
  profile: {
    name: 'Tianyu Zhang',
    wordmark: {
      primary: 'Tianyu',
      secondary: 'Zhang',
    },
    heroStatementLines: ["Hello, I'm Tianyu"],
    availability: 'Open to software engineering internship opportunities',
    summary:
      'I am a Master of Engineering student with a Computer Science background. I build full-stack web systems, backend APIs, robotics interfaces, data tools, and secure-system prototypes for practical workflows.',
    education: [
      {
        school: 'McMaster University',
        program: 'Master of Engineering in Systems and Technology',
        period: '2025.09 - Present',
      },
      {
        school: 'Carleton University',
        program: 'Bachelor of Science in Computer Science',
        period: '2020.09 - 2025.07',
      },
    ],
    technicalStack: [
      {
        label: 'Languages',
        items: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'C++', 'Java', 'HTML', 'CSS'],
      },
      {
        label: 'Frontend',
        items: ['React', 'Angular', 'Responsive HTML/CSS'],
      },
      {
        label: 'Backend and APIs',
        items: ['Node.js', 'Express.js', 'Flask', 'REST APIs', 'WebSocket'],
      },
      {
        label: 'Databases and Cloud',
        items: ['PostgreSQL', 'MongoDB', 'MySQL', 'AWS S3', 'JSON data stores'],
      },
      {
        label: 'Tools and Platforms',
        items: ['Git', 'GitHub', 'Docker', 'Arduino UNO', 'ESP32-S3', 'Intel SGX'],
      },
    ],
  },
  navigation: [
    { label: 'Projects', href: 'index.html#projects' },
    { label: 'About Me', href: 'about.html' },
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
        <p>
          Before I took ownership of this part of the project, the system already had its
          <strong class="detail-emphasis">core modeling, saving, and computation features</strong> in place. Users
          could create factory flow diagrams, edit node parameters, and submit models to the backend solver for
          computation. In other words, the application was already
          <strong class="detail-emphasis">functionally complete</strong>, but its
          <strong class="detail-emphasis">performance and responsiveness</strong> still had clear room for improvement.
          As the models became larger, with more nodes, <strong class="detail-emphasis">nested subnetworks</strong>,
          and <strong class="detail-emphasis">time-period data</strong>, the save flow started to slow down because of
          <strong class="detail-emphasis"
            >redundant writes, full-page refreshes, and multi-layer data synchronization</strong
          >, while the computation flow became slower due to the
          <strong class="detail-emphasis">large volume of results</strong> and the complexity of writing them back into
          the system. My role was to improve these areas
          <strong class="detail-emphasis">without disrupting existing functionality</strong>, helping move the product
          from something that simply <strong class="detail-emphasis">worked</strong> to something that felt
          <strong class="detail-emphasis">smooth and reliable in practice</strong>.
        </p>
        <h4>Approach</h4>
        <p>
          Rather than <strong class="detail-emphasis">rewriting the existing system</strong>, I focused on making
          <strong class="detail-emphasis">targeted performance improvements</strong> on top of the current
          implementation. For saving, I changed the workflow from a largely
          <strong class="detail-emphasis">full-save process</strong> to a more efficient
          <strong class="detail-emphasis">incremental save approach</strong>, so that only the data that had actually
          changed would be persisted. I also added <strong class="detail-emphasis">request deduplication</strong> and
          <strong class="detail-emphasis">save guards</strong> to reduce unnecessary writes and prevent disruptive user
          interactions. For computation, I restructured the workflow around
          <strong class="detail-emphasis">asynchronous queued execution</strong> and optimized the result write-back
          path through
          <strong class="detail-emphasis">controlled concurrency, batched database writes, and cache reuse</strong>.
          At the same time, I made sure to
          <strong class="detail-emphasis">preserve user-entered values</strong>, so that improving performance would
          not come at the cost of <strong class="detail-emphasis">correctness or stability</strong>.
        </p>
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
      result: 'Gamepad teleoperation, live video, and host-side vision feedback integrated into one robot workflow.',
      title: 'Vision-Assisted Arduino Robot Car',
      subtitle: 'A team robotics project combining Arduino control, ESP32-S3 streaming, and browser-based operation.',
      summary:
        'In a four-person SEP 780 project, we turned an ELEGOO robot car kit into a browser-operated system with controller input, live telemetry, and host-side vision assistance.',
      visit: {
        href: '../assets/project-documents/robot-car-sep780-final-report.pdf',
        label: 'Download Project PDF',
      },
      detailMeta: {
        siteType: 'Embedded Robotics Project',
        platform: 'Arduino + ESP32-S3 + Angular',
        disciplines: ['Embedded Control', 'Operator UI', 'Computer Vision Integration'],
      },
      stack: ['Angular', 'WebSocket', 'Python', 'Arduino UNO R3', 'ESP32-S3', 'YOLO26l', 'ByteTrack'],
      media: {
        featuredImage: 'assets/diagrams/robot-car-featured-hero.jpg',
        featuredAlt: 'Assembled ELEGOO robot car with camera, ultrasonic sensor, and battery pack',
        longformImage: 'assets/diagrams/robot-car-system-architecture.png',
        longformAlt: 'System architecture diagram for the robot car control, sensing, and actuation layers',
      },
      detailAsideAction: {
        href: 'assets/project-documents/robot-car-sep780-final-report.pdf',
        label: 'Download Project PDF',
        wordmarkLines: ['Download PDF'],
        download: 'SEP 780 Arduino Robotics Project Final Report_Group 2 (1).pdf',
        ariaLabel: 'Download the SEP 780 robot car project report PDF',
      },
      detailLeadSections: [
        {
          title: 'Project Description',
          bodyHtml: `
        <p>
          This four-person SEP 780 project started with the <span class="detail-emphasis">ELEGOO Robot Car Kit V4.0</span>
          and expanded it beyond stock classroom demos. We first validated the kit's built-in behaviors such as
          <span class="detail-emphasis">IR remote control, line tracking, obstacle avoidance, and automatic following</span>,
          then rebuilt the interaction layer around a browser-based operator console and a host-side vision pipeline.
        </p>
        <p>
          In the final system, the <span class="detail-emphasis">Arduino UNO R3 handled execution and local safety</span>,
          the <span class="detail-emphasis">ESP32-S3 handled camera, Wi-Fi, UI hosting, and serial bridging</span>,
          the Angular frontend became the operator dashboard, and a local Python backend processed detections for
          assisted driving.
        </p>
      `,
        },
        {
          title: 'System Design',
          bodyHtml: `
        <p>
          The operator console captured <span class="detail-emphasis">XBOX controller and keyboard input</span>,
          maintained <span class="detail-emphasis">low-latency WebSocket communication</span>, displayed live video,
          and surfaced drive modes, runtime charts, and target-lock feedback. The ESP32-S3 served the static UI,
          exposed the HTTP and WebSocket endpoints in SoftAP mode, and forwarded higher-level commands to the UNO.
        </p>
        <p>
          On the robot side, the UNO translated those commands into motor and servo outputs while enforcing
          <span class="detail-emphasis">local stop logic when serial input was lost</span>. For vision, selected
          frames were relayed to a Python backend that used <span class="detail-emphasis">YOLO26l + ByteTrack</span>
          to detect and track a person before returning normalized detections to the dashboard.
        </p>
      `,
        },
      ],
      detailsHtml: `
        <h4>Challenge</h4>
        <p>
          The difficult part was not assembling the kit; it was turning it into a
          <strong class="detail-emphasis">stable multi-layer robotics demo</strong> where browser inputs, Wi-Fi
          streaming, serial control, and host-side perception could all stay synchronized. The team had to work through
          <strong class="detail-emphasis">wireless architecture trade-offs</strong>, limited camera bandwidth, serial
          corruption, target-loss edge cases, and motion instability caused by steering aggressiveness and battery
          variation.
        </p>
        <h4>Approach</h4>
        <p>
          We converged on a <strong class="detail-emphasis">single ESP32-S3 SoftAP architecture</strong>, used a
          <strong class="detail-emphasis">serial JSON protocol with incremental state synchronization</strong>, and kept
          the UNO responsible for low-level execution and safety. On the operator side, the Angular console unified
          controller input, telemetry, live video, and drive-mode management, while the host Python backend handled
          <strong class="detail-emphasis">real-time detection, target locking, smoothing, and recovery behavior</strong>.
        </p>
        <h4>Outcome</h4>
        <p>
          The final demo supported <strong class="detail-emphasis">manual, assist, and auto drive modes</strong>,
          browser-based XBOX control, live video, local telemetry charts, and target-aware feedback in one loop. After
          tuning the stream resolution, JPEG quality, relay size, and frame rate, the system brought
          <strong class="detail-emphasis">end-to-end streaming latency below 200 ms on average</strong> while keeping
          <strong class="detail-emphasis">backend inference under 70 ms per frame</strong>.
        </p>
      `,
      quote: {
        body: '',
        credit: '',
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
        featuredImage: 'assets/diagrams/secure-gateway-architecture.svg',
        featuredAlt: 'Architecture of the unidirectional data transmission platform',
        longformImage: placeholderImage,
        longformAlt: 'Placeholder longform visual for the secure gateway project',
      },
      hideLongformMedia: true,
      detailAsideAction: {
        href: 'assets/project-documents/secure-gateway-sgx-group-report.pdf',
        label: 'Download Project PDF',
        wordmarkLines: ['Download PDF'],
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
        <p>
          I owned the project's <strong>Design & Implementation</strong> and <strong>Security Analysis</strong>
          sections, defining how SGX-backed trusted processing fits into the receiving and sending units.
        </p>
        <p>
          I mapped trusted versus untrusted components and explained how the gateway mitigates inbound injection,
          in-transit tampering, and misuse from compromised internal components.
        </p>
        <p>
          I specified a dual-SGX verification model in which the receiving side processes and signs trusted data,
          while the sending side validates the local proof report and data integrity before forwarding outward.
        </p>
        <p>
          I framed a fully offline authentication workflow using pre-issued trusted certificates so enclave
          validation can still work in deployments that do not permit active outbound attestation.
        </p>
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
      slug: 'dns-parking-detection',
      category: 'network-cybersecurity',
      domain: 'DNS Research',
      wordmarkLines: ['DNS Parking', 'Detection'],
      result: 'WHOIS and recursive DNS analysis to identify broadly parked domains in a 10,000-domain sample.',
      title: 'DNS-Based Parking Website Detection System',
      subtitle: 'An honours research project using OpenIntel DNS data, WHOIS filtering, and recursive record analysis.',
      summary:
        'Built a Python pipeline around OpenIntel DNS measurements to separate broadly parked domains from active, recent, or unregistered sites.',
      visit: {
        href: '../assets/project-documents/dns-parking-detection-honours-project.pdf',
        label: 'Download Project PDF',
      },
      detailMeta: {
        siteType: 'Honours Research Project',
        platform: 'Python + OpenIntel',
        disciplines: ['DNS Analysis', 'WHOIS Processing', 'Dataset Research'],
      },
      stack: ['Python', 'OpenIntel DNS Data', 'python-whois', 'dnspython', 'Pandas', 'Matplotlib'],
      media: {
        featuredImage: 'assets/diagrams/dns-parking-detection-workflow-report.png',
        featuredAlt: 'Original workflow figure from the DNS parking honours project report',
        longformImage: 'assets/diagrams/dns-screenshot-table-4-1.png',
        longformAlt: 'Table 4.1 WHOIS-based classification of sampled domains',
      },
      detailAsideAction: {
        href: 'assets/project-documents/dns-parking-detection-honours-project.pdf',
        label: 'Download Project PDF',
        wordmarkLines: ['Download PDF'],
        download: 'Honours_Project.pdf',
        ariaLabel: 'Download the DNS-Based Parking Website Detection System project PDF',
      },
      detailLeadSections: [
        {
          title: 'Project Description',
          bodyHtml: `
        <p>
          This honours project studied how to identify <span class="detail-emphasis">broadly parked domains</span>
          from DNS infrastructure data rather than from webpage screenshots or ad redirects alone. Using OpenIntel's
          October 2023 DNS measurements, I focused on domains that had been registered for a meaningful period but
          still showed no signs of operational web or mail service.
        </p>
      `,
        },
        {
          title: 'Method & Pipeline',
          bodyHtml: `
        <p>
          I built a local preprocessing pipeline that extracted query names from the raw OpenIntel files, removed
          duplicates, normalized them to second-level domains, and produced a <span class="detail-emphasis">10,000-domain
          random sample</span> for the experiment.
        </p>
        <p>
          From there, I used <span class="detail-emphasis">python-whois</span> to separate domains into unregistered,
          recently registered, and older-than-90-days groups, then ran <span class="detail-emphasis">recursive A, MX,
          CNAME, and NS resolution</span> with loop protection and depth limits to decide whether a domain still had
          usable DNS configuration.
        </p>
      `,
        },
        {
          title: 'Key Contributions',
          bodyHtml: `
        <p>
          The zip archive captures the full engineering path behind the report: chunked CSV extraction, de-duplication,
          domain normalization, batch WHOIS classification, recursive DNS analysis, and follow-up statistics scripts for
          WHOIS aggregation and box-plot generation.
        </p>
        <p>
          That let me turn the report into a <span class="detail-emphasis">reproducible research workflow</span> rather
          than a one-off manual inspection, with each stage writing structured intermediate outputs for later analysis.
        </p>
      `,
        },
      ],
      detailsHtml: `
    <h4>Results</h4>
    <p>
      In the 10,000-domain sample, <span class="detail-emphasis">5,656 domains</span> had been registered for more than
      three months. After DNS analysis, <span class="detail-emphasis">169 domains had no usable DNS information</span>
      and <span class="detail-emphasis">129 exposed only NS records</span>, producing
      <span class="detail-emphasis">298 broadly parked domains</span>. That is about
      <span class="detail-emphasis">2.98% of the full sample</span> and about
      <span class="detail-emphasis">5% of the older-than-90-days subset</span>.
    </p>
    <h4>Research Findings</h4>
    <p>
      The parked set was dominated by gTLDs, with <span class="detail-emphasis">228 gTLDs</span> versus
      <span class="detail-emphasis">70 ccTLDs</span>, but several ccTLD groups such as <span class="detail-emphasis">.ru,
      .cn, and .ro</span> showed much longer average holding periods. The WHOIS follow-up also found
      <span class="detail-emphasis">226 domains using privacy protection</span>,
      <span class="detail-emphasis">196 with EPP lock enabled</span>, and
      <span class="detail-emphasis">226 without DNSSEC</span>.
    </p>
    <h4>Outcome</h4>
    <p>
      The project demonstrated that combining <span class="detail-emphasis">WHOIS age filtering</span> with
      <span class="detail-emphasis">multi-layer DNS queries</span> can surface parked domains efficiently at dataset
      scale, while also highlighting where stricter follow-up checks such as HTTP, HTTPS, SMTP, SSH, or content
      inspection would strengthen future classification.
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
      domain: 'Marketplace DApp',
      wordmarkLines: ['Cloud &', 'Decentralized', 'Platforms'],
      result:
        'Product listing, wallet purchases, shipping-state updates, and IPFS-backed media packaged into one Ethereum marketplace flow.',
      title: 'Software Development on Cloud and Decentralized Platforms',
      subtitle: 'Ethereum marketplace DApp with React, Solidity, Web3, and QuickNode IPFS.',
      summary:
        'Built a marketplace prototype that keeps product and order state on-chain while storing images and descriptions off-chain through an IPFS upload and retrieval flow.',
      visit: {
        href: 'https://github.com/connorzty/PACSJF-401004-final',
        label: 'View Repository',
      },
      detailMeta: {
        siteType: 'Marketplace DApp',
        platform: 'React + Solidity + Truffle',
        disciplines: ['Smart Contract Design', 'Frontend Integration', 'Decentralized App Architecture'],
      },
      stack: ['React', 'JavaScript', 'Solidity', 'Truffle', 'Web3.js', 'MetaMask', 'QuickNode IPFS'],
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
          This project is an <span class="detail-emphasis">Ethereum marketplace DApp</span> that lets users list
          products, browse items, purchase them with a connected wallet, and follow order progress after checkout.
          The frontend is built in <span class="detail-emphasis">React</span>, while a Solidity marketplace contract
          stores each product's core sale state on-chain.
        </p>
        <p>
          Instead of pushing rich product content directly onto the blockchain, the app packages each image together
          with a <span class="detail-emphasis">description.txt</span> file, uploads that bundle through
          <span class="detail-emphasis">QuickNode IPFS</span>, and reloads the content when products are rendered in
          the storefront and purchased-order views.
        </p>
      `,
        },
        {
          title: 'Outcome',
          bodyHtml: `
        <p>
          The final prototype demonstrates a full marketplace loop: sellers can publish products, buyers can connect a
          wallet and complete purchases, and the app can continue tracking fulfillment through shipping-status updates.
        </p>
        <p>
          More importantly, it proves a workable split between
          <span class="detail-emphasis">minimal on-chain transaction state</span> and
          <span class="detail-emphasis">off-chain product media delivery</span>, making the DApp practical enough to
          present as an integrated product flow instead of a smart-contract demo in isolation.
        </p>
      `,
        },
      ],
      detailsHtml: `
    <h4>Challenge</h4>
    <p>
      The hard part was balancing what belongs <strong class="detail-emphasis">on-chain</strong> versus what should
      stay off-chain. Product images and long descriptions are too heavy for contract storage, but the interface still
      needs to make wallet state, contract reads, IPFS content loading, and route-specific behavior feel like one
      coherent marketplace. On top of that, the project goes beyond a simple buy button by keeping
      <strong class="detail-emphasis">purchasable items, purchased orders, and shipping-state management</strong> in
      sync with the evolving contract state.
    </p>
    <h4>Approach</h4>
    <p>
      I treated the contract as the source of truth for <strong class="detail-emphasis">product identity, price,
      buyer assignment, sale status, and order status</strong>, then moved rich content off-chain. The React client
      zips each uploaded image together with a description file, sends that package to
      <strong class="detail-emphasis">QuickNode IPFS</strong>, and later unpacks it when rendering cards. The UI is
      separated into four flows
      <strong class="detail-emphasis">Home, Add Product, Manage Shipping, and Purchased Orders</strong>
      so listing, checkout, fulfillment updates, and buyer review each have a clear path through the app.
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
    {
      slug: 'ctest',
      category: 'personal-interest',
      domain: 'Study Tool',
      wordmarkLines: ['Bilingual', 'Question', 'System'],
      result:
        'Bilingual question banks, practice and mock exam modes, wrong-question review, and local progress archives.',
      title: 'Ctest Bilingual Practice System',
      subtitle:
        'A local-first frontend study tool with bilingual question banks, exam simulation, and progress tracking.',
      summary:
        'Built a lightweight browser-based practice system that supports Chinese and English question sets, mock exams, mistake review, and local learning archives.',
      visit: {
        href: 'https://github.com/ConnorZTY001108/Ctest',
        label: 'View Repository',
      },
      detailMeta: {
        siteType: 'Study Tool',
        platform: 'HTML + CSS + JavaScript',
        disciplines: ['Frontend Interaction', 'Local Persistence'],
      },
      stack: ['HTML', 'CSS', 'JavaScript', 'Python', 'Node.js'],
      media: {
        featuredImage: placeholderImage,
        featuredAlt: 'Placeholder visual for the Ctest bilingual practice system',
        longformImage: placeholderImage,
        longformAlt: 'Placeholder longform visual for the Ctest bilingual practice system',
      },
      detailLeadSections: [
        {
          title: 'Project Description',
          bodyHtml: `
        <p>
          Ctest is a <span class="detail-emphasis">pure frontend question-practice system</span> built for studying
          with both <span class="detail-emphasis">Chinese and English question banks</span>. It supports normal
          practice, simulated exams, wrong-question review, and local progress persistence without requiring a backend
          service.
        </p>
        <p>
          The repo also includes a small data-preparation path built with
          <span class="detail-emphasis">Python and pypdf</span> so extracted question sets can be turned into the JSON
          data files the browser app uses.
        </p>
      `,
        },
        {
          title: 'Key Contributions',
          bodyHtml: `
        <ul>
          <li>Implemented bilingual question-bank switching for <span class="detail-emphasis">Chinese and English study flows</span>.</li>
          <li>Built separate <span class="detail-emphasis">practice and mock exam modes</span> with instant feedback and score review.</li>
          <li>Added a <span class="detail-emphasis">wrong-question notebook</span> so missed items can be revisited and cleared after review.</li>
          <li>Designed a local archive flow around <span class="detail-emphasis">question-archive.json</span> to persist study state and sync progress on future sessions.</li>
        </ul>
      `,
        },
      ],
      detailsHtml: `
    <h4>Challenge</h4>
    <p>
      The project needed to stay <strong class="detail-emphasis">simple to run and maintain</strong> while still
      handling multiple learning workflows. That meant supporting bilingual content, instant practice feedback, exam
      scoring, and progress persistence in a <strong class="detail-emphasis">local-first frontend experience</strong>
      without relying on a hosted backend.
    </p>
    <h4>Approach</h4>
    <p>
      I kept the app lightweight by building it with <strong class="detail-emphasis">plain HTML, CSS, and
      JavaScript</strong>, then separated content into JSON question banks and archive files. A small Python parser
      path handled data extraction, while the browser app focused on <strong class="detail-emphasis">mode switching,
      wrong-question tracking, and local progress storage</strong>.
    </p>
    <h4>Outcome</h4>
    <p>
      The result is a <strong class="detail-emphasis">focused frontend study tool</strong> that is easy to launch
      locally, practical for repeated review, and structured so new question banks or archive data can be added without
      changing the core UI flow.
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
