export const portfolioContent = {
  profile: {
    name: 'Tianyu Zhang',
    headline: 'M.Eng Student in Systems and Technology',
    intro:
      'I build software that makes complex workflows faster, clearer, and easier to use. I am currently looking for internship opportunities in software engineering, backend development, and full-stack product work.',
    availability: 'Open to internship opportunities',
  },
  navigation: [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ],
  about: {
    paragraphs: [
      'I am a Master of Engineering student at McMaster University with project experience across full-stack applications, data systems, and applied software for robotics workflows.',
      'My recent work focuses on performance-sensitive product improvements, practical system design, and building software that is useful in real operational settings.',
    ],
    stats: ['M.Eng Student', 'Full-Stack + Backend', 'Performance-Focused Projects'],
  },
  projects: [
    {
      slug: 'process-platform',
      kicker: 'Featured Project',
      title: 'Industrial Process Modeling Platform',
      subtitle: 'Performance improvements for a research process-modeling platform',
      summary:
        'Improved a research modeling platform by replacing slow full-model save flows with faster incremental updates and batched result handling.',
      bullets: [
        'Reduced save time from 40 seconds to 3 seconds.',
        'Reduced post-computation processing time from 30 seconds to 4 seconds.',
        'Contributed through a GitHub-based branch workflow with 50+ commits.',
      ],
      stack: ['TypeScript', 'React', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL'],
      image: {
        src: 'assets/placeholders/portfolio-placeholder.svg',
        alt: 'Placeholder preview for the Industrial Process Modeling Platform project',
      },
      detailSections: {
        projectDetail: '',
        challenge: '',
        approach: '',
        outcome: '',
      },
    },
    {
      slug: 'robot-car',
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
