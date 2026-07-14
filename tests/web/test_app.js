import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { portfolioContent } from '../../content.js';
import {
  bindHeroContactActions,
  bindProjectCategoryToggles,
  copyHeroContactValue,
  registerPortfolioBoot,
  renderHeroContactLinks,
  renderNavigation,
  renderCertificationItems,
  renderProjectCards,
  renderProjectGroups,
  renderContactLinks,
  renderPortfolio,
} from '../../app.js';
import {
  bindProjectDetailSectionToggles,
  bindProjectDetailLightbox,
  getProjectBySlug,
  getProjectDetailState,
  renderProjectDetail,
  registerProjectDetailBoot,
} from '../../project-detail.js';
import {
  mountInteractiveBackground,
  registerInteractiveBackgroundBoot,
} from '../../background.js';
import {
  bindContactCardActions,
  copyContactValue,
  renderContactCards,
  renderContactPage,
  registerContactPageBoot,
} from '../../contact.js';
import {
  bindAboutPlatformActions,
  copyAboutPlatformValue,
  renderAboutPersonalItems,
  renderAboutPage,
  registerAboutPageBoot,
} from '../../about.js';

test('portfolio content exposes the cloned dekiru-style homepage contract', () => {
  assert.equal(portfolioContent.profile.name, 'Tianyu Zhang');
  assert.equal(portfolioContent.profile.wordmark.primary, 'Tianyu');
  assert.equal(portfolioContent.profile.wordmark.secondary, 'Zhang');
  assert.equal(Object.hasOwn(portfolioContent.profile, 'greeting'), false);
  assert.equal(Object.hasOwn(portfolioContent.profile, 'headline'), false);
  assert.deepEqual(portfolioContent.profile.heroStatementLines, ["Hello, I'm Tianyu"]);
  assert.match(portfolioContent.profile.summary, /Master of Engineering student/);
  assert.deepEqual(
    portfolioContent.profile.education.map((item) => item.school),
    ['McMaster University', 'Carleton University'],
  );
  assert.match(
    portfolioContent.profile.technicalStack.find((group) => group.label === 'Languages')?.items.join(' '),
    /Python/,
  );
  assert.deepEqual(
    portfolioContent.profile.certifications.map((item) => item.title),
    ['AWS Machine Learning Foundations', 'CompTIA A+'],
  );
  assert.deepEqual(
    portfolioContent.profile.certifications.map((item) => item.href),
    [
      'https://www.credly.com/badges/594233e4-cbe0-4f63-8039-418ee7335fc4/linked_in_profile',
      'https://www.credly.com/badges/1bd9beb4-8796-4833-aca0-c7aefb83c6da/linked_in_profile',
    ],
  );
  assert.equal(portfolioContent.navigation.length, 2);
  assert.deepEqual(
    portfolioContent.navigation.map((item) => item.href),
    ['index.html#projects', 'about.html'],
  );
  assert.deepEqual(
    portfolioContent.navigation.map((item) => item.label),
    ['Projects', 'About Me'],
  );
  assert.deepEqual(
    portfolioContent.projects.map((project) => project.slug),
    [
      'process-platform',
      'robot-car',
      'analytics-dashboard',
      'secure-gateway-sgx',
      'dns-parking-detection',
      'decentralized-platforms',
      'interactive-documentary',
      'ctest',
    ],
  );
  assert.equal(portfolioContent.projects.length, 8);
  assert.equal(
    portfolioContent.projects.find((project) => project.slug === 'community-refrigerator'),
    undefined,
  );
  assert.equal(
    portfolioContent.projects.find((project) => project.slug === 'intel-sgx-enclave-lab'),
    undefined,
  );
  assert.equal(
    portfolioContent.projects.find((project) => project.slug === 'secure-gateway-sgx')
      ?.category,
    'network-cybersecurity',
  );
  assert.equal(
    portfolioContent.projects.find((project) => project.slug === 'aed-interface-simulation'),
    undefined,
  );
  assert.equal(
    portfolioContent.projects.find((project) => project.slug === 'interactive-documentary')
      ?.category,
    'personal-interest',
  );
  assert.equal(
    portfolioContent.projects.find((project) => project.slug === 'ctest')?.category,
    'personal-interest',
  );
  assert.deepEqual(
    portfolioContent.projectCategories.map((category) => category.slug),
    [
      'full-stack-development',
      'network-cybersecurity',
      'hardware-development',
      'data-analysis',
      'personal-interest',
    ],
  );
  assert.equal(portfolioContent.projects[0].detailMeta.siteType, 'Workflow Platform');
  assert.equal(portfolioContent.projects[1].detailMeta.platform, 'Arduino + ESP32-S3 + Angular');
  assert.equal(portfolioContent.projects[2].detailMeta.disciplines.length, 2);
  assert.equal(
    portfolioContent.projects.find((project) => project.slug === 'decentralized-platforms')
      ?.detailMeta.siteType,
    'Marketplace DApp',
  );
  assert.equal(
    portfolioContent.projects.find((project) => project.slug === 'decentralized-platforms')
      ?.visit.href,
    'https://github.com/connorzty/PACSJF-401004-final',
  );
  assert.match(
    portfolioContent.projects.find((project) => project.slug === 'decentralized-platforms')
      ?.stack.join(' '),
    /QuickNode IPFS/,
  );
  assert.equal(portfolioContent.projects[0].category, 'full-stack-development');
  assert.equal(portfolioContent.projects[1].category, 'hardware-development');
  assert.equal(portfolioContent.projects[2].category, 'data-analysis');
  assert.equal(portfolioContent.projects[0].logoImage, 'assets/logos/hypronet-logo.png');
  assert.equal(portfolioContent.projects[0].detailLeadSections[0].title, 'Project Description');
  assert.equal(portfolioContent.projects[0].detailLeadSections[1].title, 'Outcome');
  assert.match(portfolioContent.projects[0].detailLeadSections[0].bodyHtml, /web-based modeling and version management tool/i);
  assert.match(portfolioContent.projects[0].detailLeadSections[1].bodyHtml, /reducing save time, improving computation speed/i);
  assert.equal(
    portfolioContent.contact.find((entry) => entry.label === 'Email')?.href,
    'mailto:zhant173@mcmaster.ca',
  );
});

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

  assertPublicTimelineContract(timeline);
  assert.equal(timeline.entries.filter(({ category }) => category === 'Documentation').length, 1);
});

const timelineRequiredEntryKeys = [
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

const timelineStringEntryKeys = [
  'id',
  'startDate',
  'dateLabel',
  'title',
  'category',
  'summary',
  'impact',
];

const publicTimelineSourceConfigFilenameForm = String.raw`(?:(?:[a-z0-9_-]+\.)+(?:c|cc|cjs|cpp|cs|css|cxx|env|go|gql|gradle|graphql|h|hpp|html?|java|json|jsx?|kt|kts|less|mdx?|mjs|php|prisma|properties|py|rb|rs|sass|scala|scss|sh|sql|svelte|swift|toml|tsx?|vue|xml|ya?ml)|Dockerfile|Makefile|CMakeLists\.txt|\.env)`;

const publicTimelineSourceFilenamePattern = new RegExp(
  String.raw`(?:^|[^a-z0-9_.-])${publicTimelineSourceConfigFilenameForm}(?=$|[^a-z0-9_-])`,
  'i',
);

const publicTimelineSourcePathPattern = new RegExp(
  String.raw`(?:^|[^a-z0-9_.-])(?:[a-z0-9@_.-]+[\\/])+${publicTimelineSourceConfigFilenameForm}(?=$|[^a-z0-9_-])`,
  'i',
);

const publicTimelineAllowedTechnologyNames = new Set(['ASP.NET', 'Socket.IO', 'Node.js']);

const publicTimelinePrivacyPredicates = [
  {
    label: 'email',
    matches: (value) => /\b[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+\b/i.test(value),
  },
  {
    label: 'filesystem path',
    matches: (value) => /\b[a-z]:[\\/][^\s"'<>|?*]+/i.test(value),
  },
  {
    label: 'URL',
    matches: (value) => /\b(?:https?|ftp|ssh|git):\/\/[^\s"'<>]+|(?:^|\s)www\.[^\s"'<>]+|git@[a-z0-9.-]+:[^\s]+|\b(?:[a-z0-9-]+\.)+(?:com|org|net|io|dev|app|edu|gov)\/[^\s"'<>]*/i.test(value),
  },
  {
    label: 'URI',
    matches: (value) => /\b[a-z][a-z0-9+.-]*:(?=[^\s])/i.test(value),
  },
  {
    label: 'filesystem path',
    matches: (value) => /\\\\(?:\?\\)?[^\\/\s]+\\[^\\/\s]+|\/\/[^/\s]+\/[^/\s]+/.test(value),
  },
  {
    label: 'filesystem path',
    matches: (value) => /(?:^|[\s"'(\[<{])\/(?!\/)[^\s"'()<>{}\[\]]+/.test(value),
  },
  {
    label: 'source path',
    matches: (value) => publicTimelineSourcePathPattern.test(value),
  },
  {
    label: 'Git ref',
    matches: (value) => /\brefs\/[^\s"'<>~^:?*\[\\\]]+/i.test(value),
  },
  {
    label: 'commit metadata',
    matches: (value) => /(?:^|\n)\s*(?:(?:commit|tree|parent)\s+[0-9a-f]{7,64}\b|(?:author|authordate|commit|commitdate|committer|date|merge|subject):\s*\S)/im.test(value),
  },
  {
    label: 'commit metadata',
    matches: (value) => /(?:^|\n)\s*(?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)(?:\([a-z0-9._/-]+\))?!?:\s+\S/im.test(value),
  },
  {
    label: 'commit hash',
    matches: (value) => /(^|[^a-z0-9])[0-9a-f]{7,40}([^a-z0-9]|$)/i.test(value),
  },
  {
    label: 'source filename',
    matches: (value, field) => !(
      field === 'technologies' && publicTimelineAllowedTechnologyNames.has(value)
    ) && publicTimelineSourceFilenamePattern.test(value),
  },
];

function assertPublicSafeTimelineValue(value, path, field) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => assertPublicSafeTimelineValue(item, `${path}[${index}]`, field));
    return;
  }

  if (value !== null && typeof value === 'object') {
    assert.fail(`${path} contains nested metadata`);
  }

  if (typeof value !== 'string') return;

  publicTimelinePrivacyPredicates.forEach(({ label, matches }) => {
    assert.equal(
      matches(value, field),
      false,
      `${path} contains forbidden ${label}`,
    );
  });
}

function assertRealIsoDate(value, path) {
  assert.match(value, /^\d{4}-\d{2}-\d{2}$/, `${path} must use YYYY-MM-DD`);
  const parsed = new Date(`${value}T00:00:00.000Z`);
  assert.ok(!Number.isNaN(parsed.getTime()), `${path} must be a real date`);
  assert.equal(parsed.toISOString().slice(0, 10), value, `${path} must be a real date`);
}

function assertPublicTimelineContract(timeline) {
  assert.deepEqual(
    Object.keys(timeline).sort(),
    ['defaultOrder', 'entries', 'generatedThrough'],
    'timeline has unexpected keys',
  );
  assert.equal(typeof timeline.generatedThrough, 'string');
  assertRealIsoDate(timeline.generatedThrough, 'timeline.generatedThrough');
  assert.equal(timeline.defaultOrder, 'desc');
  assert.ok(Array.isArray(timeline.entries));

  timeline.entries.forEach((entry, index) => {
    const expectedKeys = [
      ...timelineRequiredEntryKeys,
      ...(Object.hasOwn(entry, 'endDate') ? ['endDate'] : []),
    ].sort();
    assert.deepEqual(
      Object.keys(entry).sort(),
      expectedKeys,
      `timeline.entries[${index}] has an invalid key schema`,
    );

    timelineStringEntryKeys.forEach((key) => {
      assert.equal(typeof entry[key], 'string', `${entry.id}.${key} must be a string`);
      assert.ok(entry[key].length > 0, `${entry.id}.${key} must not be empty`);
    });
    if (Object.hasOwn(entry, 'endDate')) {
      assert.equal(typeof entry.endDate, 'string', `${entry.id}.endDate must be a string`);
    }

    assertRealIsoDate(entry.startDate, `${entry.id}.startDate`);
    assert.ok(
      entry.startDate <= timeline.generatedThrough,
      `${entry.id}.startDate must not be after generatedThrough`,
    );
    if (Object.hasOwn(entry, 'endDate')) {
      assertRealIsoDate(entry.endDate, `${entry.id}.endDate`);
      assert.ok(entry.startDate <= entry.endDate, `${entry.id}.endDate must not precede startDate`);
      assert.ok(
        entry.endDate <= timeline.generatedThrough,
        `${entry.id}.endDate must not be after generatedThrough`,
      );
    }

    Object.entries(entry).forEach(([key, value]) => {
      assertPublicSafeTimelineValue(value, `${entry.id}.${key}`, key);
    });

    ['technicalWork', 'technologies'].forEach((key) => {
      assert.ok(Array.isArray(entry[key]) && entry[key].length > 0, `${entry.id}.${key} must be a non-empty array`);
      entry[key].forEach((item) => {
        assert.equal(typeof item, 'string', `${entry.id}.${key} must contain only strings`);
        assert.ok(item.length > 0, `${entry.id}.${key} must not contain empty strings`);
      });
    });
    assert.ok(Number.isInteger(entry.commitCount) && entry.commitCount > 0);
  });
}

test('development timeline data contract rejects private metadata probes', async (t) => {
  const project = portfolioContent.projects.find(({ slug }) => slug === 'process-platform');
  const timeline = project?.developmentTimeline;
  assert.ok(timeline);

  const probes = [
    {
      name: 'unexpected entry key',
      expected: /invalid key schema/,
      mutate: (entry) => {
        entry.commitMessage = 'Internal implementation detail';
      },
    },
    {
      name: 'missing required entry key',
      expected: /invalid key schema/,
      mutate: (entry) => {
        delete entry.impact;
      },
    },
    {
      name: 'nested metadata',
      expected: /nested metadata/,
      mutate: (entry) => {
        entry.technicalWork.push({ metadata: { rawMessage: 'Internal implementation detail' } });
      },
    },
    {
      name: 'URL',
      expected: /forbidden URL/,
      mutate: (entry) => {
        entry.summary = 'See https://internal.example.com/private for details.';
      },
    },
    {
      name: 'email',
      expected: /forbidden email/,
      mutate: (entry) => {
        entry.impact = 'Contact owner@example.com for access.';
      },
    },
    {
      name: 'filesystem path',
      expected: /forbidden filesystem path/,
      mutate: (entry) => {
        entry.summary = 'Stored at C:\\Users\\owner\\private-repo\\secret.txt.';
      },
    },
    {
      name: 'source path',
      expected: /forbidden source path/,
      mutate: (entry) => {
        entry.summary = 'Implemented in src/backend/routes/private.ts.';
      },
    },
    {
      name: 'Git ref',
      expected: /forbidden Git ref/,
      mutate: (entry) => {
        entry.summary = 'Based on refs/heads/private-feature.';
      },
    },
    {
      name: 'commit hash',
      expected: /forbidden commit hash/,
      mutate: (entry) => {
        entry.summary = 'Derived from commit deadbeef.';
      },
    },
    {
      name: 'commit metadata',
      expected: /forbidden commit metadata/,
      mutate: (entry) => {
        entry.summary = 'Author: Private Developer\nCommitDate: 2026-07-14';
      },
    },
  ];

  for (const { name, expected, mutate } of probes) {
    await t.test(name, () => {
      const candidate = structuredClone(timeline);
      mutate(candidate.entries[0]);
      assert.throws(
        () => assertPublicTimelineContract(candidate),
        expected,
        `${name} should be rejected`,
      );
    });
  }
});

test('development timeline privacy predicates reject high-confidence variants', async (t) => {
  const project = portfolioContent.projects.find(({ slug }) => slug === 'process-platform');
  const timeline = project?.developmentTimeline;
  assert.ok(timeline);

  const probes = [
    {
      name: 'custom URI scheme',
      field: 'summary',
      value: 'Loaded from artifact+private://team/repository.',
      expected: /forbidden URI/,
    },
    {
      name: 'opaque URI scheme',
      field: 'impact',
      value: 'Tracked by urn:internal:timeline-record.',
      expected: /forbidden URI/,
    },
    {
      name: 'Windows drive path with forward slashes',
      field: 'summary',
      value: 'Stored at D:/work/private-repo/config.json.',
      expected: /forbidden filesystem path/,
    },
    {
      name: 'UNC share path',
      field: 'summary',
      value: 'Stored at \\\\build-server\\private-share\\config.json.',
      expected: /forbidden filesystem path/,
    },
    {
      name: 'absolute POSIX path outside common roots',
      field: 'technicalWork',
      value: ['/data/team/private-repo/config.yaml'],
      expected: /forbidden filesystem path/,
    },
    {
      name: 'Git notes ref',
      field: 'summary',
      value: 'Based on refs/notes/private-review.',
      expected: /forbidden Git ref/,
    },
    {
      name: 'Git pull ref',
      field: 'impact',
      value: 'Validated against refs/pull/42/head.',
      expected: /forbidden Git ref/,
    },
    {
      name: 'Git ref with a valid special-leading component',
      field: 'summary',
      value: 'Based on refs/heads/@private-release.',
      expected: /forbidden Git ref/,
    },
    {
      name: 'source path in technologies',
      field: 'technologies',
      value: ['React', 'src/private/handler.ts'],
      expected: /forbidden source path/,
    },
    {
      name: 'JSON source path in prose',
      field: 'summary',
      value: 'Configured through src/private/config.json.',
      expected: /forbidden source path/,
    },
    {
      name: 'Dockerfile source path in technologies',
      field: 'technologies',
      value: ['React', 'src/private/Dockerfile'],
      expected: /forbidden source path/,
    },
    {
      name: 'environment source path in technologies',
      field: 'technologies',
      value: ['React', 'src/private/.env'],
      expected: /forbidden source path/,
    },
    {
      name: 'package source path in technologies',
      field: 'technologies',
      value: ['React', 'packages/api/handler.ts'],
      expected: /forbidden source path/,
    },
    {
      name: 'bare TypeScript source filename',
      field: 'summary',
      value: 'Implemented in PrivateRoute.tsx.',
      expected: /forbidden source filename/,
    },
    {
      name: 'bare Prisma source filename',
      field: 'technicalWork',
      value: ['Updated schema.prisma for persistence.'],
      expected: /forbidden source filename/,
    },
    {
      name: 'scoped conventional commit subject',
      field: 'summary',
      value: 'feat(api): expose the internal solver route',
      expected: /forbidden commit metadata/,
    },
    {
      name: 'breaking conventional commit subject',
      field: 'impact',
      value: 'refactor!: replace the private data contract',
      expected: /forbidden commit metadata/,
    },
    {
      name: 'commit-log subject metadata',
      field: 'technicalWork',
      value: ['Subject: fix(auth): recover private tokens'],
      expected: /forbidden commit metadata/,
    },
  ];

  for (const { name, field, value, expected } of probes) {
    await t.test(name, () => {
      const candidate = structuredClone(timeline);
      candidate.entries[0][field] = value;
      assert.throws(
        () => assertPublicTimelineContract(candidate),
        expected,
        `${name} should be rejected`,
      );
    });
  }
});

test('development timeline privacy predicates allow public technology and architecture wording', async (t) => {
  const project = portfolioContent.projects.find(({ slug }) => slug === 'process-platform');
  const timeline = project?.developmentTimeline;
  assert.ok(timeline);

  const fixtures = [
    {
      name: 'ASP.NET technology',
      field: 'technologies',
      value: ['ASP.NET', 'React'],
    },
    {
      name: 'Socket.IO technology',
      field: 'technologies',
      value: ['Socket.IO', 'React'],
    },
    {
      name: 'Node.js technology',
      field: 'technologies',
      value: ['Node.js', 'React'],
    },
    {
      name: 'client/server prose',
      field: 'summary',
      value: 'Coordinated client/server responsibilities through a stable public API.',
    },
  ];

  for (const { name, field, value } of fixtures) {
    await t.test(name, () => {
      const candidate = structuredClone(timeline);
      candidate.entries[0][field] = value;
      assert.doesNotThrow(
        () => assertPublicTimelineContract(candidate),
        `${name} should remain valid public copy`,
      );
    });
  }
});

test('development timeline data contract rejects invalid date ranges', async (t) => {
  const project = portfolioContent.projects.find(({ slug }) => slug === 'process-platform');
  const timeline = project?.developmentTimeline;
  assert.ok(timeline);

  const probes = [
    {
      name: 'impossible generated-through date',
      expected: /must be a real date/,
      mutate: (candidate) => {
        candidate.generatedThrough = '2026-02-30';
      },
    },
    {
      name: 'impossible start date',
      expected: /must be a real date/,
      mutate: (candidate) => {
        candidate.entries[0].startDate = '2026-02-30';
      },
    },
    {
      name: 'malformed end date',
      expected: /must use YYYY-MM-DD/,
      mutate: (candidate) => {
        candidate.entries[0].endDate = 'July 14, 2026';
      },
    },
    {
      name: 'impossible end date',
      expected: /must be a real date/,
      mutate: (candidate) => {
        candidate.entries[0].endDate = '2026-02-30';
      },
    },
    {
      name: 'start date after generated-through date',
      expected: /must not be after generatedThrough/,
      mutate: (candidate) => {
        candidate.entries[0].startDate = '2026-07-15';
      },
    },
    {
      name: 'end date before start date',
      expected: /must not precede startDate/,
      mutate: (candidate) => {
        candidate.entries[0].startDate = '2026-02-02';
        candidate.entries[0].endDate = '2026-02-01';
      },
    },
    {
      name: 'end date after generated-through date',
      expected: /must not be after generatedThrough/,
      mutate: (candidate) => {
        candidate.entries[0].endDate = '2026-07-15';
      },
    },
  ];

  for (const { name, expected, mutate } of probes) {
    await t.test(name, () => {
      const candidate = structuredClone(timeline);
      mutate(candidate);
      assert.throws(
        () => assertPublicTimelineContract(candidate),
        expected,
        `${name} should be rejected`,
      );
    });
  }
});

test('homepage shell declares the dekiru-like header, tagline, and logo-wall hooks', () => {
  const html = fs.readFileSync(new URL('../../index.html', import.meta.url), 'utf8');

  assert.match(html, /<body class="home-page">/);
  assert.match(html, /<div id="dots"><\/div>/);
  assert.match(html, /class="site-header"/);
  assert.match(html, /id="wordmark-primary"/);
  assert.match(html, /id="wordmark-secondary"/);
  assert.match(html, /id="nav-list"/);
  assert.match(html, /class="hero-profile-copy"/);
  assert.match(html, /id="hero-statement"/);
  assert.match(html, /id="hero-summary"/);
  assert.match(html, /id="hero-contact"/);
  assert.match(html, /class="hero-photo-slot"/);
  assert.match(html, /class="hero-photo"/);
  assert.match(html, /src="\.\/assets\/profile\/tianyu-portrait\.svg\?v=20260427-033033"/);
  assert.match(html, /id="education-list"/);
  assert.match(html, /id="tech-stack-list"/);
  assert.match(html, /<article class="profile-panel profile-certifications">/);
  assert.match(html, /id="certification-list"/);
  const techPanelStart = html.indexOf('<article class="profile-panel profile-tech-stack">');
  const techPanelEnd = html.indexOf('</article>', techPanelStart);
  const certificationPanelStart = html.indexOf('<article class="profile-panel profile-certifications">');
  assert.ok(certificationPanelStart > techPanelEnd);
  assert.match(html, /id="project-grid"/);
  assert.doesNotMatch(html, /id="hero-greeting"/);
  assert.doesNotMatch(html, /id="hero-headline"/);
  assert.doesNotMatch(html, /id="about-copy"/);
  assert.doesNotMatch(html, /<section class="page-copy" id="about">/);
  assert.doesNotMatch(html, /class="site-footer"/);
  assert.doesNotMatch(html, /id="contact-list"/);
  assert.doesNotMatch(html, /id="footer-note"/);
  assert.match(html, /src="\.\/assets\/vendor\/three\.min\.js"/);
  assert.match(html, /href="\.\/styles\.css\?v=20260427-hero-v14"/);
  assert.match(html, /src="\.\/assets\/vendor\/vanta\.dots\.min\.js"/);
  assert.match(html, /<script type="module" src="\.\/app\.js\?v=20260427-hero-v14"><\/script>/);
});

test('renderCertificationItems outputs compact certification rows', () => {
  const markup = renderCertificationItems(portfolioContent.profile.certifications);

  assert.match(markup, /class="profile-certification-item"/);
  assert.match(
    markup,
    /href="https:\/\/www\.credly\.com\/badges\/594233e4-cbe0-4f63-8039-418ee7335fc4\/linked_in_profile"/,
  );
  assert.match(
    markup,
    /href="https:\/\/www\.credly\.com\/badges\/1bd9beb4-8796-4833-aca0-c7aefb83c6da\/linked_in_profile"/,
  );
  assert.match(markup, /target="_blank" rel="noreferrer"/);
  assert.match(markup, /<a class="profile-certification-title profile-certification-link suppressed"[^>]*>AWS Machine Learning Foundations<\/a>/);
  assert.match(markup, /<a class="profile-certification-title profile-certification-link suppressed"[^>]*>CompTIA A\+<\/a>/);
});

test('about page shell declares the shared header and standalone about hooks', () => {
  const html = fs.readFileSync(new URL('../../about.html', import.meta.url), 'utf8');

  assert.match(html, /<body class="about-page">/);
  assert.match(
    html,
    /content="Personal links for Tianyu Zhang, including Steam, Discord, League of Legends, and Bilibili profiles\."/
  );
  assert.match(html, /<div id="dots"><\/div>/);
  assert.match(html, /id="wordmark-primary"/);
  assert.match(html, /id="wordmark-secondary"/);
  assert.match(html, /id="nav-list"/);
  assert.match(html, /id="about-page-copy"/);
  assert.match(html, /aria-label="Personal links for Tianyu Zhang"/);
  assert.doesNotMatch(html, /software engineering focus on workflow systems/i);
  assert.doesNotMatch(html, /class="site-footer"/);
  assert.match(html, /src="\.\/assets\/vendor\/three\.min\.js"/);
  assert.match(html, /src="\.\/assets\/vendor\/vanta\.dots\.min\.js"/);
  assert.match(html, /<script type="module" src="\.\/about\.js"><\/script>/);
});

test('style validation page shell declares an isolated cyber-terminal prototype surface', () => {
  const fileUrl = new URL('../../style-validation.html', import.meta.url);

  assert.equal(fs.existsSync(fileUrl), true);

  const html = fs.readFileSync(fileUrl, 'utf8');

  assert.match(html, /<body class="style-validation-page">/);
  assert.match(html, /<div id="style-validation-dots"><\/div>/);
  assert.match(html, /id="style-validation-app"/);
  assert.match(html, /href="\.\/style-validation\.css"/);
  assert.match(html, /<script type="module" src="\.\/style-validation\.js"><\/script>/);
});

test('style validation boot renders the approved hero, support rail, and CTA copy', async () => {
  const fileUrl = new URL('../../style-validation.js', import.meta.url);

  assert.equal(fs.existsSync(fileUrl), true);

  const { renderStyleValidation, registerStyleValidationBoot } = await import(fileUrl);
  const mockDocument = createMockDocument([
    'style-validation-app',
  ]);

  renderStyleValidation(mockDocument);

  assert.match(mockDocument.getElementById('style-validation-app').innerHTML, /Signal-grade portfolio systems/i);
  assert.match(mockDocument.getElementById('style-validation-app').innerHTML, /Command navigation/i);
  assert.match(mockDocument.getElementById('style-validation-app').innerHTML, /Validation frame/i);
  assert.match(mockDocument.getElementById('style-validation-app').innerHTML, /Request full build/i);

  const loadingDocument = createMockDocument([
    'style-validation-app',
  ]);
  loadingDocument.readyState = 'loading';
  let domReadyHandler;

  loadingDocument.addEventListener = (eventName, handler) => {
    assert.equal(eventName, 'DOMContentLoaded');
    domReadyHandler = handler;
  };

  registerStyleValidationBoot(loadingDocument);
  assert.equal(typeof domReadyHandler, 'function');
  assert.equal(loadingDocument.getElementById('style-validation-app').innerHTML, '');

  domReadyHandler();

  assert.match(loadingDocument.getElementById('style-validation-app').innerHTML, /Signal-grade portfolio systems/i);
});

test('project detail shells expose pagination, metadata, media, and aside hooks', () => {
  const detailPages = [
    ['process-platform', '../../projects/process-platform.html'],
    ['robot-car', '../../projects/robot-car.html'],
    ['analytics-dashboard', '../../projects/analytics-dashboard.html'],
    ['secure-gateway-sgx', '../../projects/secure-gateway-sgx.html'],
    ['dns-parking-detection', '../../projects/dns-parking-detection.html'],
    ['decentralized-platforms', '../../projects/decentralized-platforms.html'],
    ['interactive-documentary', '../../projects/interactive-documentary.html'],
    ['ctest', '../../projects/ctest.html'],
  ];

  for (const [slug, file] of detailPages) {
    const html = fs.readFileSync(new URL(file, import.meta.url), 'utf8');

    assert.match(html, new RegExp(`data-project-slug="${slug}"`));
    assert.match(html, /id="detail-prev-link"/);
    assert.match(html, /id="detail-next-link"/);
    assert.match(html, /id="detail-title"/);
    assert.match(html, /id="detail-visit-link"/);
    assert.match(html, /id="detail-meta-stack"/);
    assert.match(html, /id="detail-featured-image"/);
    assert.match(html, /id="detail-details-body"/);
    assert.match(html, /id="detail-project-quote"/);
    assert.match(html, /id="detail-quote-body"/);
    assert.match(html, /id="detail-quote-credit"/);
    assert.match(html, /id="detail-aside-logo"/);
    assert.match(html, /id="detail-longform-link"/);
    assert.match(html, /id="detail-longform-image"/);
    assert.match(html, /id="detail-image-lightbox"/);
    assert.match(html, /id="detail-image-lightbox-backdrop"/);
    assert.match(html, /id="detail-image-lightbox-dialog"/);
    assert.match(html, /id="detail-image-lightbox-close"/);
    assert.match(html, /id="detail-image-lightbox-image"/);
    assert.match(html, /id="detail-image-lightbox-caption"/);
    assert.match(html, /id="detail-image-lightbox-prev"/);
    assert.match(html, /id="detail-image-lightbox-next"/);
    assert.doesNotMatch(html, /class="site-footer"/);
    assert.doesNotMatch(html, /id="contact-list"/);
    assert.match(html, /src="\.\.\/assets\/vendor\/three\.min\.js"/);
    assert.match(html, /src="\.\.\/assets\/vendor\/vanta\.dots\.min\.js"/);
    assert.match(html, /src="\.\.\/project-detail\.js"/);
  }
});

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

test('secure gateway pdf asset exists for the detail download card', () => {
  assert.equal(
    fs.existsSync(
      new URL('../../assets/project-documents/secure-gateway-sgx-group-report.pdf', import.meta.url),
    ),
    true,
  );
});

test('dns parking report pdf asset exists for the detail download card', () => {
  assert.equal(
    fs.existsSync(
      new URL('../../assets/project-documents/dns-parking-detection-honours-project.pdf', import.meta.url),
    ),
    true,
  );
});

test('robot car report pdf asset exists for the detail download card', () => {
  assert.equal(
    fs.existsSync(
      new URL('../../assets/project-documents/robot-car-sep780-final-report.pdf', import.meta.url),
    ),
    true,
  );
});

test('process platform detail page exposes stacked gallery images in the aside', () => {
  const html = fs.readFileSync(new URL('../../projects/process-platform.html', import.meta.url), 'utf8');

  assert.match(html, /class="project-media-gallery"/);
  assert.match(html, /data-detail-gallery-link/);
  assert.match(html, /Computation Pane\.png/);
  assert.match(html, /MaterialEditor\.png/);
  assert.doesNotMatch(html, /TPseting\.png/);
});

test('dns parking detail page exposes report tables in the aside gallery', () => {
  const html = fs.readFileSync(new URL('../../projects/dns-parking-detection.html', import.meta.url), 'utf8');

  assert.match(html, /class="project-media-gallery"/);
  assert.match(html, /dns-screenshot-table-4-2\.png/);
  assert.match(html, /dns-screenshot-table-4-3\.png/);
  assert.match(html, /dns-screenshot-figure-4-1\.png/);
  assert.match(html, /dns-screenshot-figure-4-2\.png/);
  assert.match(html, /dns-screenshot-table-4-4\.png/);
  assert.match(html, /dns-screenshot-table-4-5\.png/);
  assert.match(html, /dns-screenshot-table-4-6\.png/);
  assert.match(html, /dns-screenshot-table-4-7\.png/);
  assert.doesNotMatch(html, /dns-table-source-29\.png/);
  assert.doesNotMatch(html, /dns-table-source-36\.png/);
  assert.doesNotMatch(html, /dns-table-source-37\.png/);
  assert.doesNotMatch(html, /dns-table-source-38\.png/);
});

test('robot car detail page exposes extracted project visuals in the aside gallery', () => {
  const html = fs.readFileSync(new URL('../../projects/robot-car.html', import.meta.url), 'utf8');

  assert.match(html, /class="project-media-gallery"/);
  assert.match(html, /robot-car-hardware-components-1\.png/);
  assert.match(html, /robot-car-hardware-components-2\.png/);
  assert.match(html, /robot-car-console-ui\.jpg/);
  assert.match(html, /robot-car-controller-architecture\.png/);
  assert.match(html, /robot-car-camera-cv-architecture\.png/);
  assert.match(html, /robot-car-debug-snapshot\.jpg/);
  assert.match(html, /robot-car-controller-demo\.jpg/);
  assert.match(html, /robot-car-live-dashboard\.jpg/);
});

test('styles define local postmono font faces and cloned homepage/detail layout classes', () => {
  const css = fs.readFileSync(new URL('../../styles.css', import.meta.url), 'utf8');

  assert.match(css, /font-family:\s*'PostMono'/);
  assert.match(css, /src:\s*url\('\.\/assets\/fonts\/PostMono-Light\.woff2'\)/);
  assert.match(css, /font-family:\s*'SpaceMono'/);
  assert.match(css, /src:\s*url\('\.\/assets\/fonts\/SpaceMono-Regular\.woff2'\)/);
  assert.match(css, /\.site-header\b/);
  assert.match(css, /\.dots-canvas\b/);
  assert.match(css, /\.header-content\b/);
  assert.match(css, /\.tagline\b/);
  assert.match(css, /\.hero-profile\b/);
  assert.match(css, /\.hero-profile-copy\b/);
  assert.match(css, /\.hero-photo-slot\b/);
  assert.match(css, /\.hero-photo\b/);
  assert.match(css, /object-fit:\s*cover/);
  assert.match(css, /\.hero-contact\b/);
  assert.match(css, /\.hero-contact-button\b/);
  assert.match(css, /\.hero-contact-card-inner\b/);
  assert.match(css, /\.hero-contact-label\b/);
  assert.match(css, /grid-template-columns:\s*repeat\(auto-fit,\s*minmax\(92px,\s*1fr\)\)/);
  assert.match(css, /grid-template-columns:\s*minmax\(0,\s*0\.95fr\)\s*minmax\(260px,\s*0\.6fr\)/);
  assert.match(
    css,
    /grid-template-columns:\s*minmax\(220px,\s*0\.9fr\)\s*minmax\(320px,\s*1\.35fr\)\s*minmax\(220px,\s*0\.8fr\)/,
  );
  assert.match(css, /justify-self:\s*start/);
  const heroContactHoverCss = css.slice(
    css.indexOf('.hero-contact-link:hover::before'),
    css.indexOf(".hero-contact-button[data-copy-state='copied']"),
  );
  assert.match(heroContactHoverCss, /transform:\s*scale\(1\.9\)/);
  assert.match(heroContactHoverCss, /width:\s*clamp\(5px,\s*4%,\s*8px\)/);
  assert.match(css, /\.profile-overview\b/);
  assert.match(css, /\.profile-panel\b/);
  assert.match(css, /\.profile-education-list\b/);
  assert.match(css, /\.tech-stack-list\b/);
  assert.match(css, /\.about-platform-list\b/);
  assert.match(css, /\.about-platform-icon-row\b/);
  assert.match(css, /\.about-platform-detail-list\b/);
  assert.match(css, /\.about-platform-item\b/);
  assert.match(css, /\.about-platform-copy-button\b/);
  assert.match(css, /\.about-platform-copy-button\[data-copy-state='copied'\]/);
  assert.match(css, /\.about-platform-icon-only\b/);
  assert.match(css, /\.about-platform-icon img\b/);
  assert.match(css, /\.profile-certifications\b/);
  assert.match(css, /\.certification-list\b/);
  assert.match(css, /\.profile-certification-title\b/);
  const profileCertificationTitleCss = css.slice(
    css.indexOf('.profile-school,'),
    css.indexOf('.profile-period {'),
  );
  assert.match(profileCertificationTitleCss, /\.profile-certification-title\s*\{/);
  assert.match(profileCertificationTitleCss, /font-family:\s*'PostMono'/);
  assert.match(profileCertificationTitleCss, /text-transform:\s*uppercase/);
  assert.match(profileCertificationTitleCss, /text-shadow:\s*0 0 10px rgba\(255,\s*255,\s*255,\s*0\.75\)/);
  assert.doesNotMatch(profileCertificationTitleCss, /text-transform:\s*none/);
  assert.match(css, /\.tagline-line\b/);
  assert.match(css, /\.work\b/);
  assert.match(css, /\.project-grid\b/);
  assert.match(css, /\.project-groups\b/);
  assert.match(css, /\.project-category\b/);
  assert.match(css, /\.project-category-title\b/);
  assert.match(css, /\.project-empty-state\b/);
  assert.match(css, /\.project-logo\b/);
  assert.match(css, /\.project-card\b/);
  assert.match(css, /\.project-card-wordmark\b/);
  assert.match(css, /\.project-hover-copy\b/);
  assert.match(css, /\.project-title\b/);
  assert.match(css, /\.project-pagination\b/);
  assert.match(css, /\.project-header\b/);
  assert.match(css, /\.project-content\b/);
  assert.match(css, /\.featured-image\b/);
  assert.match(css, /\.featured-image img\s*\{[\s\S]*width:\s*100%/);
  assert.match(css, /\.project-aside\b/);
  assert.match(css, /\.project-longform-image\b/);
  assert.match(css, /\.project-media-gallery\b/);
  assert.match(css, /\.project-details-lead\b/);
  assert.match(css, /\.project-details-intro\b/);
  assert.match(css, /\.project-section\b/);
  assert.match(css, /\.project-section-toggle\b/);
  assert.match(css, /\.project-section-arrow\b/);
  assert.match(css, /\.project-section-body\b/);
  assert.match(css, /\.project-section-body strong\b/);
  assert.match(css, /\.detail-emphasis\b/);
  assert.match(css, /box-decoration-break:\s*clone/);
  assert.match(css, /font-weight:\s*700/);
  assert.match(css, /\.project-quote\b/);
  assert.match(css, /\.aside-project-logo-shell\b/);
  assert.match(css, /\.aside-project-logo-image\b/);
  assert.match(css, /\.detail-image-lightbox\b/);
  assert.match(css, /\.detail-image-lightbox-backdrop\b/);
  assert.match(css, /\.detail-image-lightbox-close\b/);
  assert.match(css, /\.detail-image-lightbox-caption\b/);
  assert.match(css, /\.detail-image-lightbox-pagination\b/);
  assert.match(css, /\.detail-image-lightbox-nav\b/);
  assert.match(css, /\.detail-lightbox-open\b/);
  assert.match(css, /\.about-page \.site-main\b/);
  assert.match(css, /\.about-page-panel\b/);
  assert.match(css, /\.about-page-copy\b/);
  assert.match(css, /\.contact-card\b/);
  assert.match(css, /\.contact-card-icon\b/);
  assert.match(css, /\.contact-card-copy\b/);
  assert.match(css, /\.contact-page \.site-content\b/);
  assert.match(css, /\.contact-page \.content-area\b/);
  assert.match(css, /\.contact-page \.site-main\b/);
  assert.match(css, /aspect-ratio:\s*1\s*\/\s*1/);
  assert.match(css, /justify-content:\s*flex-start/);
  assert.match(css, /align-items:\s*flex-start/);
  assert.match(css, /padding-top:\s*clamp\(/);
  assert.match(css, /@media\s*\(max-width:\s*960px\)/);
});

test('renderNavigation outputs linked menu items using explicit hrefs', () => {
  const markup = renderNavigation(portfolioContent.navigation);

  assert.match(markup, /class="menu-item"/);
  assert.match(markup, /href="index\.html#projects"/);
  assert.match(markup, /href="about\.html"/);
  assert.match(markup, />About Me</);
  assert.doesNotMatch(markup, /href="contact\.html"/);
  assert.doesNotMatch(markup, />Contact</);
});

test('renderProjectCards outputs logo-wall cards with a wordmark and short result line', () => {
  const markup = renderProjectCards(portfolioContent.projects);

  assert.match(markup, /class="project project-card"/);
  assert.match(markup, /class="project-logo project-card-wordmark"/);
  assert.match(markup, /class="project-hover-copy"/);
  assert.match(markup, /class="project-card-result"/);
  assert.match(markup, /Hybrid Process Network Optimization Software/);
  assert.match(markup, /Vision-Assisted Arduino Robot Car/);
  assert.match(markup, /Safer saves, schema upgrades/i);
  assert.match(markup, /href="projects\/process-platform\.html"/);
  assert.doesNotMatch(markup, /Smart Home Management System/);
  assert.doesNotMatch(markup, /Gym Membership Management System/);
  assert.doesNotMatch(markup, /Community Refrigerator Web App/);
  assert.doesNotMatch(markup, /Intel SGX Enclave Lab/);
});

test('renderProjectGroups outputs grouped project sections across the populated category taxonomy', () => {
  const markup = renderProjectGroups(
    portfolioContent.projects,
    portfolioContent.projectCategories,
  );

  assert.match(markup, /project-category-toggle/);
  assert.match(markup, /aria-expanded="true"/);
  assert.match(markup, /project-category-grid-full-stack-development/);
  assert.match(markup, /Full-Stack Development/);
  assert.match(markup, /Network &amp; Cybersecurity|Network & Cybersecurity/);
  assert.match(markup, /Hardware Development/);
  assert.match(markup, /Data Analysis/);
  assert.match(markup, /Personal Interest/);
  assert.match(markup, /Hybrid Process Network Optimization Software/);
  assert.match(markup, /Unidirectional Secure Gateway Based on SGX/);
  assert.match(markup, /Vision-Assisted Arduino Robot Car/);
  assert.match(markup, /Consumer Behaviour Analytics Dashboard/);
  assert.match(markup, /Interactive Documentary Created with HTML/);
  assert.doesNotMatch(markup, /Smart Home Management System/);
  assert.doesNotMatch(markup, /Gym Membership Management System/);
  assert.doesNotMatch(markup, /Community Refrigerator Web App/);
  assert.doesNotMatch(markup, /Intel SGX Enclave Lab/);
  assert.doesNotMatch(markup, /project-empty-state/);
  assert.doesNotMatch(markup, /Projects coming soon\./);
});

test('renderProjectGroups preserves the empty-category placeholder branch', () => {
  const markup = renderProjectGroups([], [portfolioContent.projectCategories[0]]);

  assert.match(markup, /project-empty-state/);
  assert.match(markup, /Projects coming soon\./);
});

test('bindProjectCategoryToggles animates collapse and re-expands a category grid', () => {
  const button = createMockProjectCategoryToggleButton('project-category-grid-full-stack-development');
  const grid = createMockNode('project-category-grid-full-stack-development');
  const doc = {
    defaultView: {
      requestAnimationFrame(handler) {
        handler();
      },
    },
    querySelectorAll(selector) {
      assert.equal(selector, '[data-project-category-toggle]');
      return [button];
    },
    getElementById(id) {
      assert.equal(id, 'project-category-grid-full-stack-development');
      return grid;
    },
  };

  bindProjectCategoryToggles(doc);
  assert.equal(grid.style.overflow, '');
  assert.equal(grid.style.transform, '');
  assert.equal(grid.style.opacity, '');

  button.listeners.click();

  assert.equal(button.getAttribute('aria-expanded'), 'false');
  assert.equal(grid.dataset.collapsed, 'true');
  assert.equal(grid.style.maxHeight, '0px');
  assert.equal(grid.style.opacity, '0');
  assert.equal(grid.style.transform, 'translateY(-12px)');
  assert.equal(grid.style.overflow, 'hidden');
  assert.equal(grid.hasAttribute('hidden'), false);

  grid.listeners.transitionend({ target: grid });

  assert.equal(grid.getAttribute('hidden'), '');

  button.listeners.click();

  assert.equal(button.getAttribute('aria-expanded'), 'true');
  assert.equal(grid.hasAttribute('hidden'), false);
  assert.equal(grid.dataset.collapsed, 'false');
  assert.equal(grid.style.maxHeight, '320px');
  assert.equal(grid.style.opacity, '1');
  assert.equal(grid.style.transform, 'translateY(0)');
  assert.equal(grid.style.overflow, 'hidden');

  grid.listeners.transitionend({ target: grid });

  assert.equal(grid.style.maxHeight, '');
  assert.equal(grid.style.opacity, '');
  assert.equal(grid.style.transform, '');
  assert.equal(grid.style.overflow, '');
});

test('renderContactLinks outputs footer-style contact endpoints', () => {
  const markup = renderContactLinks(portfolioContent.contact);

  assert.match(markup, /class="footer-link"/);
  assert.match(markup, /mailto:zhant173@mcmaster\.ca/);
  assert.match(markup, /github\.com\/ConnorZTY001108/);
});

test('renderHeroContactLinks outputs a copy button and external profile links', () => {
  const markup = renderHeroContactLinks(portfolioContent.contact);

  assert.match(markup, /class="hero-contact-link hero-contact-button"/);
  assert.match(markup, /data-hero-contact-copy="zhant173@mcmaster\.ca"/);
  assert.match(markup, /class="hero-contact-card-inner"/);
  assert.match(markup, /class="hero-contact-label">Email<\/span>/);
  assert.doesNotMatch(markup, /hero-contact-hover-copy/);
  assert.match(markup, /class="hero-contact-link suppressed"/);
  assert.match(markup, /href="https:\/\/github\.com\/ConnorZTY001108"/);
  assert.match(markup, /href="https:\/\/www\.linkedin\.com\/in\/tianyu-zhang-9470a7266\/"/);
  assert.doesNotMatch(markup, /Contact Page/);
  assert.doesNotMatch(markup, /href="mailto:zhant173@mcmaster\.ca"/);
});

test('copyHeroContactValue writes the requested hero contact value to clipboard', async () => {
  const clipboard = {
    copiedText: '',
    async writeText(value) {
      this.copiedText = value;
    },
  };

  await copyHeroContactValue('zhant173@mcmaster.ca', clipboard);
  assert.equal(clipboard.copiedText, 'zhant173@mcmaster.ca');
});

test('copyHeroContactValue falls back to document copy when clipboard access is blocked', async () => {
  const textarea = createMockCopyTextarea();
  const doc = {
    appendedNode: null,
    body: {
      appendChild(node) {
        doc.appendedNode = node;
      },
    },
    createElement(tagName) {
      assert.equal(tagName, 'textarea');
      return textarea;
    },
    execCommand(command) {
      assert.equal(command, 'copy');
      return true;
    },
  };
  const clipboard = {
    async writeText() {
      throw new Error('Clipboard blocked');
    },
  };

  const copied = await copyHeroContactValue('zhant173@mcmaster.ca', clipboard, doc);

  assert.equal(copied, true);
  assert.equal(doc.appendedNode, textarea);
  assert.equal(textarea.value, 'zhant173@mcmaster.ca');
  assert.equal(textarea.removed, true);
});

test('bindHeroContactActions wires the hero email button to copy state', async () => {
  const button = createMockInteractiveHeroContactButton();
  let resetHandler;
  let resetDelay;
  const clipboard = {
    copiedText: '',
    async writeText(value) {
      this.copiedText = value;
    },
  };
  const doc = {
    querySelectorAll(selector) {
      assert.equal(selector, '[data-hero-contact-copy]');
      return [button];
    },
  };

  bindHeroContactActions(doc, clipboard, {
    setTimeout(handler, delay) {
      resetHandler = handler;
      resetDelay = delay;
      return 'reset-timer';
    },
  });
  await button.listeners.click();

  assert.equal(clipboard.copiedText, 'zhant173@mcmaster.ca');
  assert.equal(button.dataset.copyState, 'copied');
  assert.equal(button.label.textContent, 'Copied');
  assert.equal(button.attributes['aria-label'], 'Email copied to clipboard');
  assert.equal(resetDelay, 2000);
  assert.equal(button._heroContactResetTimer, 'reset-timer');

  resetHandler();

  assert.equal(button.label.textContent, 'Email');
  assert.equal(button.dataset.copyState, undefined);
  assert.equal(button.attributes['aria-label'], 'Copy email address');
  assert.equal(button._heroContactResetTimer, undefined);
});

test('renderContactCards outputs project-style tiles with copy and external actions', () => {
  const markup = renderContactCards(portfolioContent.contact);

  assert.match(markup, /class="project project-card contact-card contact-card-button"/);
  assert.match(markup, /data-contact-copy="zhant173@mcmaster\.ca"/);
  assert.match(markup, />Email</);
  assert.match(markup, /class="project project-card contact-card suppressed"/);
  assert.match(markup, /href="https:\/\/github\.com\/ConnorZTY001108"/);
  assert.match(markup, /href="https:\/\/www\.linkedin\.com\/in\/tianyu-zhang-9470a7266\/"/);
  assert.match(markup, />GitHub</);
  assert.match(markup, />LinkedIn</);
  assert.doesNotMatch(markup, /Copy my McMaster email address to the clipboard/i);
  assert.doesNotMatch(markup, /View repositories and project work/i);
  assert.doesNotMatch(markup, /Open my professional profile/i);
});

test('copyContactValue writes the requested value to clipboard when available', async () => {
  const clipboard = {
    copiedText: '',
    async writeText(value) {
      this.copiedText = value;
    },
  };

  await copyContactValue('zhant173@mcmaster.ca', clipboard);
  assert.equal(clipboard.copiedText, 'zhant173@mcmaster.ca');
});

test('bindContactCardActions wires email copy cards to the clipboard action', async () => {
  const button = createMockInteractiveContactButton();
  const clipboard = {
    copiedText: '',
    async writeText(value) {
      this.copiedText = value;
    },
  };
  const doc = {
    querySelectorAll(selector) {
      assert.equal(selector, '[data-contact-copy]');
      return [button];
    },
  };

  bindContactCardActions(doc, clipboard);
  await button.listeners.click();

  assert.equal(clipboard.copiedText, 'zhant173@mcmaster.ca');
  assert.equal(button.dataset.copyState, 'copied');
});

test('renderContactPage mounts the shared wordmark and standalone contact list', () => {
  const mockDocument = createMockContactDocument();

  renderContactPage(mockDocument);

  assert.equal(mockDocument.getElementById('wordmark-primary').textContent, 'Tianyu');
  assert.equal(mockDocument.getElementById('wordmark-secondary').textContent, 'Zhang');
  assert.doesNotMatch(mockDocument.getElementById('nav-list').innerHTML, /contact\.html/);
  assert.match(mockDocument.getElementById('contact-page-list').innerHTML, /contact-card/);
  assert.match(mockDocument.getElementById('contact-page-list').innerHTML, /data-contact-copy="zhant173@mcmaster\.ca"/);
  assert.match(mockDocument.getElementById('contact-page-list').innerHTML, /github\.com\/ConnorZTY001108/i);
  assert.match(mockDocument.getElementById('contact-page-list').innerHTML, /linkedin\.com\/in\/tianyu-zhang-9470a7266/i);
});

test('renderAboutPersonalItems outputs platform icon rows, profile links, and plain text IDs', () => {
  const markup = renderAboutPersonalItems(portfolioContent.about.personalItems);

  assert.match(markup, /class="about-platform-list"/);
  assert.match(markup, /class="about-platform-icon-row"/);
  assert.match(markup, /class="about-platform-item/);
  assert.match(markup, /class="about-platform-item about-platform-copy-button about-platform-icon-only"/);
  assert.match(markup, /class="about-platform-icon"/);
  assert.match(markup, /src="https:\/\/cdn\.simpleicons\.org\/steam\/00f7ff"/);
  assert.match(markup, /src="https:\/\/cdn\.simpleicons\.org\/discord\/00f7ff"/);
  assert.match(markup, /src="https:\/\/cdn\.simpleicons\.org\/leagueoflegends\/00f7ff"/);
  assert.match(markup, /src="https:\/\/cdn\.simpleicons\.org\/bilibili\/00f7ff"/);
  assert.match(markup, /href="https:\/\/steamcommunity\.com\/id\/Zty20001108\/"/);
  assert.match(markup, /href="https:\/\/steamcommunity\.com\/profiles\/76561199104733654\/"/);
  assert.match(markup, /href="https:\/\/www\.leagueofgraphs\.com\/summoner\/na\/ELO%E4%B8%8D/);
  assert.match(markup, /href="https:\/\/space\.bilibili\.com\/95648542"/);
  assert.match(markup, /target="_blank" rel="noreferrer"/);
  assert.match(markup, /type="button" data-about-platform-copy="edmchzty"/);
  assert.match(markup, /aria-label="Copy Discord ID: edmchzty"/);
  assert.match(markup, /about-platform-icon-only/);
  assert.match(markup, /aria-label="Steam: Zty20001108"/);
  assert.doesNotMatch(markup, />Zty20001108</);
  assert.doesNotMatch(markup, />76561199104733654</);
  assert.doesNotMatch(markup, />space\.bilibili\.com\/95648542</);
  assert.doesNotMatch(markup, />edmchzty</);
  assert.match(markup, /edmchzty/);
  assert.match(markup, /title="Discord: edmchzty"/);
  assert.match(markup, /title="League of Legends:/);
});

test('copyAboutPlatformValue writes the requested platform ID to clipboard', async () => {
  const clipboard = {
    copiedText: '',
    async writeText(value) {
      this.copiedText = value;
    },
  };

  await copyAboutPlatformValue('edmchzty', clipboard);
  assert.equal(clipboard.copiedText, 'edmchzty');
});

test('bindAboutPlatformActions wires Discord icon copy state', async () => {
  const button = createMockAboutPlatformCopyButton();
  let resetHandler;
  let resetDelay;
  const clipboard = {
    copiedText: '',
    async writeText(value) {
      this.copiedText = value;
    },
  };
  const doc = {
    querySelectorAll(selector) {
      assert.equal(selector, '[data-about-platform-copy]');
      return [button];
    },
  };

  bindAboutPlatformActions(doc, clipboard, {
    setTimeout(handler, delay) {
      resetHandler = handler;
      resetDelay = delay;
      return 'about-reset-timer';
    },
    clearTimeout() {},
  });
  await button.listeners.click();

  assert.equal(clipboard.copiedText, 'edmchzty');
  assert.equal(button.dataset.copyState, 'copied');
  assert.equal(button.attributes['aria-label'], 'edmchzty copied to clipboard');
  assert.equal(resetDelay, 2000);
  assert.equal(button._aboutPlatformResetTimer, 'about-reset-timer');

  resetHandler();

  assert.equal(button.dataset.copyState, undefined);
  assert.equal(button.attributes['aria-label'], 'Copy Discord ID: edmchzty');
  assert.equal(button._aboutPlatformResetTimer, undefined);
});

test('renderAboutPage mounts the shared wordmark and personal about profile', () => {
  const mockDocument = createMockAboutDocument();

  renderAboutPage(mockDocument);

  assert.equal(mockDocument.getElementById('wordmark-primary').textContent, 'Tianyu');
  assert.equal(mockDocument.getElementById('wordmark-secondary').textContent, 'Zhang');
  assert.match(mockDocument.getElementById('nav-list').innerHTML, /about\.html/);
  assert.match(mockDocument.getElementById('nav-list').innerHTML, />About Me</);
  assert.match(
    mockDocument.getElementById('about-page-copy').innerHTML,
    /steamcommunity\.com\/id\/Zty20001108/i,
  );
  assert.match(
    mockDocument.getElementById('about-page-copy').innerHTML,
    /space\.bilibili\.com\/95648542/i,
  );
  assert.match(mockDocument.getElementById('about-page-copy').innerHTML, /edmchzty/);
  assert.match(mockDocument.getElementById('about-page-copy').innerHTML, /data-about-platform-copy="edmchzty"/);
  assert.doesNotMatch(mockDocument.getElementById('about-page-copy').innerHTML, />edmchzty</);
  assert.match(mockDocument.getElementById('about-page-copy').innerHTML, /leagueofgraphs\.com\/summoner\/na\/ELO%E4%B8%8D/i);
  assert.doesNotMatch(
    mockDocument.getElementById('about-page-copy').innerHTML,
    />ELO不让我赢的我坚决不赢#ELO的狗</,
  );
  assert.doesNotMatch(
    mockDocument.getElementById('about-page-copy').innerHTML,
    /software that sits between people, operations, and technical systems/i,
  );
  assert.doesNotMatch(mockDocument.getElementById('about-page-copy').innerHTML, /product judgment and engineering rigor/i);
});

test('mountInteractiveBackground appends an animated canvas and registers pointer listeners', () => {
  const { doc, root, win } = createMockBackgroundDocument();

  assert.equal(mountInteractiveBackground(doc), true);
  assert.equal(root.dataset.enhanced, 'true');
  assert.equal(root.children.length, 1);
  assert.equal(root.children[0].className, 'dots-canvas');
  assert.equal(typeof win.listeners.pointermove, 'function');
  assert.equal(typeof win.listeners.resize, 'function');
  assert.equal(mountInteractiveBackground(doc), false);
});

test('mountInteractiveBackground prefers source-site VANTA DOTS when available', () => {
  const { doc, root, win } = createMockBackgroundDocument({ withVanta: true });

  assert.equal(mountInteractiveBackground(doc), true);
  assert.equal(root.dataset.enhanced, 'true');
  assert.deepEqual(win.vantaCalls[0], {
    el: root,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200,
    minWidth: 200,
    scale: 5,
    size: 10,
    scaleMobile: 1,
    color: 2242616,
    color2: 16777215,
    backgroundColor: 0,
    spacing: 100,
    showLines: false,
  });
});

test('registerInteractiveBackgroundBoot mounts immediately and via DOMContentLoaded', () => {
  const { doc: readyDoc, root: readyRoot } = createMockBackgroundDocument();
  readyDoc.readyState = 'interactive';

  registerInteractiveBackgroundBoot(readyDoc);
  assert.equal(readyRoot.dataset.enhanced, 'true');

  const { doc: loadingDoc, root: loadingRoot } = createMockBackgroundDocument();
  loadingDoc.readyState = 'loading';
  let loadingHandler;

  loadingDoc.addEventListener = (eventName, handler) => {
    assert.equal(eventName, 'DOMContentLoaded');
    loadingHandler = handler;
  };

  registerInteractiveBackgroundBoot(loadingDoc);
  assert.equal(typeof loadingHandler, 'function');
  loadingHandler();
  assert.equal(loadingRoot.dataset.enhanced, 'true');
});

test('renderPortfolio mounts the dekiru-like wordmark, navigation, tagline, grid, and footer endpoints', () => {
  const mockDocument = createMockHomeDocument();

  renderPortfolio(portfolioContent, mockDocument);

  assert.equal(mockDocument.getElementById('wordmark-primary').textContent, 'Tianyu');
  assert.equal(mockDocument.getElementById('wordmark-secondary').textContent, 'Zhang');
  assert.match(mockDocument.getElementById('hero-statement').innerHTML, /tagline-line/);
  assert.match(mockDocument.getElementById('hero-statement').innerHTML, /Hello, I'm Tianyu/);
  assert.match(mockDocument.getElementById('hero-summary').textContent, /Master of Engineering student/i);
  assert.match(mockDocument.getElementById('hero-contact').innerHTML, /data-hero-contact-copy="zhant173@mcmaster\.ca"/);
  assert.match(mockDocument.getElementById('hero-contact').innerHTML, /GitHub/);
  assert.match(mockDocument.getElementById('hero-contact').innerHTML, /LinkedIn/);
  assert.doesNotMatch(mockDocument.getElementById('hero-contact').innerHTML, /Contact Page/);
  assert.match(mockDocument.getElementById('education-list').innerHTML, /McMaster University/);
  assert.match(mockDocument.getElementById('tech-stack-list').innerHTML, /TypeScript/);
  assert.match(mockDocument.getElementById('certification-list').innerHTML, /AWS Machine Learning Foundations/);
  assert.match(mockDocument.getElementById('certification-list').innerHTML, /CompTIA A\+/);
  assert.match(mockDocument.getElementById('certification-list').innerHTML, /594233e4-cbe0-4f63-8039-418ee7335fc4/);
  assert.match(mockDocument.getElementById('certification-list').innerHTML, /1bd9beb4-8796-4833-aca0-c7aefb83c6da/);
  assert.match(mockDocument.getElementById('nav-list').innerHTML, /Projects/);
  assert.match(mockDocument.getElementById('project-grid').innerHTML, /project-category-title/);
  assert.match(mockDocument.getElementById('project-grid').innerHTML, /project-card-wordmark/);
});

test('registerPortfolioBoot wires DOMContentLoaded and mounts immediately for ready documents', () => {
  const loadingDoc = createMockHomeDocument();
  loadingDoc.readyState = 'loading';
  let loadingHandler;

  loadingDoc.addEventListener = (eventName, handler) => {
    assert.equal(eventName, 'DOMContentLoaded');
    loadingHandler = handler;
  };

  registerPortfolioBoot(loadingDoc);
  assert.equal(typeof loadingHandler, 'function');
  loadingHandler();
  assert.equal(loadingDoc.getElementById('wordmark-primary').textContent, 'Tianyu');

  const readyDoc = createMockHomeDocument();
  readyDoc.readyState = 'interactive';
  readyDoc.addEventListener = () => {
    throw new Error('ready documents should mount immediately');
  };

  registerPortfolioBoot(readyDoc);
  assert.equal(readyDoc.getElementById('wordmark-primary').textContent, 'Tianyu');
});

test('registerContactPageBoot mounts immediately and via DOMContentLoaded', () => {
  const readyDoc = createMockContactDocument();
  readyDoc.readyState = 'interactive';
  readyDoc.addEventListener = () => {
    throw new Error('ready contact documents should mount immediately');
  };

  registerContactPageBoot(readyDoc);
  assert.equal(readyDoc.getElementById('wordmark-primary').textContent, 'Tianyu');

  const loadingDoc = createMockContactDocument();
  loadingDoc.readyState = 'loading';
  let loadingHandler;

  loadingDoc.addEventListener = (eventName, handler) => {
    assert.equal(eventName, 'DOMContentLoaded');
    loadingHandler = handler;
  };

  registerContactPageBoot(loadingDoc);
  assert.equal(typeof loadingHandler, 'function');
  loadingHandler();
  assert.match(loadingDoc.getElementById('contact-page-list').innerHTML, /GitHub/i);
});

test('registerAboutPageBoot mounts immediately and via DOMContentLoaded', () => {
  const readyDoc = createMockAboutDocument();
  readyDoc.readyState = 'interactive';
  readyDoc.addEventListener = () => {
    throw new Error('ready about documents should mount immediately');
  };

  registerAboutPageBoot(readyDoc);
  assert.equal(readyDoc.getElementById('wordmark-primary').textContent, 'Tianyu');

  const loadingDoc = createMockAboutDocument();
  loadingDoc.readyState = 'loading';
  let loadingHandler;

  loadingDoc.addEventListener = (eventName, handler) => {
    assert.equal(eventName, 'DOMContentLoaded');
    loadingHandler = handler;
  };

  registerAboutPageBoot(loadingDoc);
  assert.equal(typeof loadingHandler, 'function');
  loadingHandler();
  assert.match(loadingDoc.getElementById('about-page-copy').innerHTML, /steamcommunity\.com\/profiles\/76561199104733654/i);
});

test('detail helpers resolve projects, prev-next pagination, and a safe missing-project state', () => {
  assert.equal(getProjectBySlug('robot-car').title, 'Vision-Assisted Arduino Robot Car');
  assert.equal(getProjectBySlug('missing-project'), null);

  const foundState = getProjectDetailState('robot-car');
  const missingState = getProjectDetailState('missing-project');

  assert.equal(foundState.isMissing, false);
  assert.equal(foundState.project.slug, 'robot-car');
  assert.equal(foundState.prevProject.slug, 'process-platform');
  assert.equal(foundState.nextProject.slug, 'analytics-dashboard');
  assert.equal(missingState.isMissing, true);
  assert.equal(missingState.title, 'Project not found');
});

test('renderProjectDetail mounts cloned detail-page metadata, media, and narrative sections', () => {
  const mockDocument = createMockDetailDocument('process-platform');

  renderProjectDetail(mockDocument);

  assert.equal(mockDocument.getElementById('detail-title').textContent, 'Hybrid Process Network Optimization Software');
  assert.equal(mockDocument.getElementById('detail-visit-link').textContent, 'Visit Project');
  assert.match(mockDocument.getElementById('detail-visit-link').href, /process-platform/i);
  assert.match(mockDocument.getElementById('detail-meta-stack').innerHTML, /TypeScript/);
  assert.match(mockDocument.getElementById('detail-meta-stack').innerHTML, /Vite/);
  assert.match(mockDocument.getElementById('detail-meta-stack').innerHTML, /MongoDB/);
  assert.match(mockDocument.getElementById('detail-meta-stack').innerHTML, /Docker Compose/);
  assert.match(mockDocument.getElementById('detail-featured-image').attributes.src, /ui_overview\.png/);
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /project-details-lead/);
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /detail-section-body-lead-1/);
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /detail-section-body-lead-2/);
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /Project Description[\s\S]*This project is a web-based modeling and version management tool[\s\S]*Outcome[\s\S]*reducing save time, improving computation speed[\s\S]*Challenge/i,
  );
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /data-project-section-toggle/);
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /detail-section-body-1/);
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /project-inline-quote/);
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /project-inline-quote-emphasis/,
  );
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /Outcome[\s\S]*Reduced large-network save time[\s\S]*from 40 seconds to 1\.5 seconds/i,
  );
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /Challenge[\s\S]*Before I took ownership of this part of the project[\s\S]*core modeling, saving, and computation features[\s\S]*Approach[\s\S]*rewriting the existing system/i,
  );
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /detail-emphasis/,
  );
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /core modeling, saving, and computation features/,
  );
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /Challenge/i);
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /Approach/i);
  assert.doesNotMatch(mockDocument.getElementById('detail-details-body').innerHTML, /MongoDB and PostgreSQL/i);
  assert.doesNotMatch(mockDocument.getElementById('detail-details-body').innerHTML, /schema version stamping/i);
  assert.match(mockDocument.getElementById('detail-aside-logo').innerHTML, /assets\/logos\/hypronet-logo\.png/);
  assert.match(mockDocument.getElementById('detail-aside-logo').innerHTML, /<article class="project project-card aside-project-card"/);
  assert.doesNotMatch(mockDocument.getElementById('detail-aside-logo').innerHTML, /aside-project-title/);
  assert.doesNotMatch(mockDocument.getElementById('detail-aside-logo').innerHTML, /href="https:\/\/example\.com\/process-platform"/);
  assert.match(mockDocument.getElementById('detail-longform-image').attributes.src, /portfolio-placeholder\.svg|start_menu\.png|ui_overview\.png/);
  assert.equal(mockDocument.getElementById('detail-quote-body').textContent, '');
  assert.equal(mockDocument.getElementById('detail-quote-credit').textContent, '');
  assert.equal(mockDocument.getElementById('detail-project-quote').getAttribute('hidden'), '');
});

test('renderProjectDetail mounts the SGX report summary and PDF download card', () => {
  const mockDocument = createMockDetailDocument('secure-gateway-sgx');

  renderProjectDetail(mockDocument);

  assert.equal(
    mockDocument.getElementById('detail-title').textContent,
    'Unidirectional Secure Gateway Based on SGX',
  );
  assert.match(mockDocument.getElementById('detail-meta-stack').innerHTML, /Intel SGX/);
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /Project Description/);
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /operational technology \(OT\) environments/i,
  );
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /pass-through mode/i,
  );
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /security-check mode/i,
  );
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /Key Contributions/);
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /Design & Implementation/i,
  );
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /fully offline authentication workflow/i,
  );
  assert.doesNotMatch(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /<ul>|<li>/i,
  );
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /Outcome/i);
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /side-channel attacks/i,
  );
  assert.match(
    mockDocument.getElementById('detail-aside-logo').innerHTML,
    /aside-action-card/,
  );
  assert.match(
    mockDocument.getElementById('detail-aside-logo').innerHTML,
    /Download PDF/,
  );
  assert.equal(mockDocument.getElementById('detail-visit-link').textContent, 'Download Project PDF');
  assert.match(
    mockDocument.getElementById('detail-visit-link').href,
    /\.\.\/assets\/project-documents\/secure-gateway-sgx-group-report\.pdf/,
  );
  assert.match(
    mockDocument.getElementById('detail-aside-logo').innerHTML,
    /assets\/project-documents\/secure-gateway-sgx-group-report\.pdf/,
  );
  assert.match(
    mockDocument.getElementById('detail-aside-logo').innerHTML,
    /download="COMP4900K Group 4 Project\.pdf"/,
  );
  assert.match(
    mockDocument.getElementById('detail-featured-image').attributes.src,
    /secure-gateway-architecture\.svg/,
  );
  assert.equal(mockDocument.getElementById('detail-featured-image').attributes.alt, 'Architecture of the unidirectional data transmission platform');
  assert.equal(mockDocument.getElementById('detail-longform-link').getAttribute('hidden'), '');
  assert.equal(mockDocument.getElementById('detail-longform-link').href, '');
  assert.equal(mockDocument.getElementById('detail-longform-link').style.display, 'none');
  assert.equal(mockDocument.getElementById('detail-longform-image').getAttribute('src'), undefined);
  assert.equal(mockDocument.getElementById('detail-project-quote').getAttribute('hidden'), '');
});

test('renderProjectDetail mounts the DNS honours summary, visuals, and PDF download card', () => {
  const mockDocument = createMockDetailDocument('dns-parking-detection');

  renderProjectDetail(mockDocument);

  assert.equal(
    mockDocument.getElementById('detail-title').textContent,
    'DNS-Based Parking Website Detection System',
  );
  assert.match(mockDocument.getElementById('detail-meta-stack').innerHTML, /OpenIntel DNS Data/);
  assert.match(mockDocument.getElementById('detail-meta-stack').innerHTML, /python-whois/);
  assert.match(mockDocument.getElementById('detail-meta-stack').innerHTML, /dnspython/);
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /Project Description/);
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /broadly parked domains/i,
  );
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /Method & Pipeline/);
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /10,000-domain[\s\S]*random sample/i,
  );
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /Key Contributions/);
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /reproducible research workflow/i,
  );
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /Results/i);
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /298 broadly parked domains/i,
  );
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /226 domains using privacy protection/i,
  );
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /HTTP, HTTPS, SMTP, SSH/i,
  );
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /detail-emphasis/);
  assert.match(
    mockDocument.getElementById('detail-aside-logo').innerHTML,
    /aside-action-card/,
  );
  assert.match(
    mockDocument.getElementById('detail-aside-logo').innerHTML,
    /Download PDF/,
  );
  assert.equal(mockDocument.getElementById('detail-visit-link').textContent, 'Download Project PDF');
  assert.match(
    mockDocument.getElementById('detail-visit-link').href,
    /\.\.\/assets\/project-documents\/dns-parking-detection-honours-project\.pdf/,
  );
  assert.match(
    mockDocument.getElementById('detail-aside-logo').innerHTML,
    /assets\/project-documents\/dns-parking-detection-honours-project\.pdf/,
  );
  assert.match(
    mockDocument.getElementById('detail-aside-logo').innerHTML,
    /download="Honours_Project\.pdf"/,
  );
  assert.match(
    mockDocument.getElementById('detail-featured-image').attributes.src,
    /dns-parking-detection-workflow-report\.png/,
  );
  assert.equal(
    mockDocument.getElementById('detail-featured-image').attributes.alt,
    'Original workflow figure from the DNS parking honours project report',
  );
  assert.match(
    mockDocument.getElementById('detail-longform-image').attributes.src,
    /dns-screenshot-table-4-1\.png/,
  );
  assert.equal(
    mockDocument.getElementById('detail-longform-image').attributes.alt,
    'Table 4.1 WHOIS-based classification of sampled domains',
  );
  assert.equal(mockDocument.getElementById('detail-project-quote').getAttribute('hidden'), '');
});

test('renderProjectDetail mounts the robot car report summary, visuals, and PDF download card', () => {
  const mockDocument = createMockDetailDocument('robot-car');

  renderProjectDetail(mockDocument);

  assert.equal(
    mockDocument.getElementById('detail-title').textContent,
    'Vision-Assisted Arduino Robot Car',
  );
  assert.match(mockDocument.getElementById('detail-meta-stack').innerHTML, /ESP32-S3/);
  assert.match(mockDocument.getElementById('detail-meta-stack').innerHTML, /YOLO26l/);
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /Project Description/);
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /ELEGOO Robot Car Kit V4\.0/i,
  );
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /System Design/);
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /serial JSON protocol/i,
  );
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /Challenge/i);
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /wireless architecture trade-offs/i,
  );
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /Outcome/i);
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /manual, assist, and auto drive modes/i,
  );
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /detail-emphasis/,
  );
  assert.match(
    mockDocument.getElementById('detail-aside-logo').innerHTML,
    /aside-action-card/,
  );
  assert.match(
    mockDocument.getElementById('detail-aside-logo').innerHTML,
    /Download PDF/,
  );
  assert.equal(mockDocument.getElementById('detail-visit-link').textContent, 'Download Project PDF');
  assert.match(
    mockDocument.getElementById('detail-visit-link').href,
    /\.\.\/assets\/project-documents\/robot-car-sep780-final-report\.pdf/,
  );
  assert.match(
    mockDocument.getElementById('detail-aside-logo').innerHTML,
    /assets\/project-documents\/robot-car-sep780-final-report\.pdf/,
  );
  assert.match(
    mockDocument.getElementById('detail-aside-logo').innerHTML,
    /download="SEP 780 Arduino Robotics Project Final Report_Group 2 \(1\)\.pdf"/,
  );
  assert.match(
    mockDocument.getElementById('detail-featured-image').attributes.src,
    /robot-car-featured-hero\.jpg/,
  );
  assert.equal(
    mockDocument.getElementById('detail-featured-image').attributes.alt,
    'Assembled ELEGOO robot car with camera, ultrasonic sensor, and battery pack',
  );
  assert.match(
    mockDocument.getElementById('detail-longform-image').attributes.src,
    /robot-car-system-architecture\.png/,
  );
  assert.equal(
    mockDocument.getElementById('detail-longform-image').attributes.alt,
    'System architecture diagram for the robot car control, sensing, and actuation layers',
  );
  assert.equal(mockDocument.getElementById('detail-quote-body').textContent, '');
  assert.equal(mockDocument.getElementById('detail-quote-credit').textContent, '');
  assert.equal(mockDocument.getElementById('detail-project-quote').getAttribute('hidden'), '');
});

test('renderProjectDetail mounts the decentralized marketplace case study and repository link', () => {
  const mockDocument = createMockDetailDocument('decentralized-platforms');

  renderProjectDetail(mockDocument);

  assert.equal(
    mockDocument.getElementById('detail-title').textContent,
    'Software Development on Cloud and Decentralized Platforms',
  );
  assert.equal(
    mockDocument.getElementById('detail-visit-link').href,
    'https://github.com/connorzty/PACSJF-401004-final',
  );
  assert.equal(mockDocument.getElementById('detail-visit-link').textContent, 'View Repository');
  assert.match(mockDocument.getElementById('detail-meta-stack').innerHTML, /QuickNode IPFS/);
  assert.match(mockDocument.getElementById('detail-meta-stack').innerHTML, /Web3\.js/);
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /Project Description/);
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /Ethereum marketplace DApp/i,
  );
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /Outcome/i);
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /full marketplace loop|shipping-status updates/i,
  );
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /Challenge/i);
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /on-chain[\s\S]*off-chain/i,
  );
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /Approach/i);
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /Home, Add Product, Manage Shipping, and Purchased Orders/i,
  );
  assert.match(mockDocument.getElementById('detail-featured-image').attributes.src, /portfolio-placeholder\.svg/);
  assert.equal(mockDocument.getElementById('detail-quote-body').textContent, '');
  assert.equal(mockDocument.getElementById('detail-quote-credit').textContent, '');
  assert.equal(mockDocument.getElementById('detail-project-quote').getAttribute('hidden'), '');
});

test('renderProjectDetail mounts the Ctest study tool summary and repository link', () => {
  const mockDocument = createMockDetailDocument('ctest');

  renderProjectDetail(mockDocument);

  assert.equal(
    mockDocument.getElementById('detail-title').textContent,
    'Ctest Bilingual Practice System',
  );
  assert.match(mockDocument.getElementById('detail-meta-stack').innerHTML, /JavaScript/);
  assert.match(mockDocument.getElementById('detail-meta-stack').innerHTML, /Python/);
  assert.equal(mockDocument.getElementById('detail-visit-link').href, 'https://github.com/ConnorZTY001108/Ctest');
  assert.equal(mockDocument.getElementById('detail-visit-link').textContent, 'View Repository');
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /Project Description/);
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /Chinese and English question banks|bilingual content/i,
  );
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /Key Contributions/);
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /question-archive\.json/i,
  );
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /Outcome/i);
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /frontend study tool|local-first/i,
  );
  assert.match(
    mockDocument.getElementById('detail-featured-image').attributes.src,
    /portfolio-placeholder\.svg/,
  );
});

test('renderProjectDetail preserves a root-relative aside action href override', () => {
  const contentOverride = JSON.parse(JSON.stringify(portfolioContent));
  const sgxProject = contentOverride.projects.find((project) => project.slug === 'secure-gateway-sgx');

  assert.ok(sgxProject);
  sgxProject.detailAsideAction.href = '/downloads/spec.pdf';

  const mockDocument = createMockDetailDocument('secure-gateway-sgx');

  renderProjectDetail(mockDocument, contentOverride);

  assert.match(mockDocument.getElementById('detail-aside-logo').innerHTML, /href="\/downloads\/spec\.pdf"/);
});

test('bindProjectDetailSectionToggles collapses and re-expands a detail section body', () => {
  const button = createMockProjectDetailSectionToggleButton('detail-section-body-1');
  const body = createMockNode('detail-section-body-1');
  const mockDocument = createMockDetailDocument('process-platform', {
    sectionToggleButtons: [button],
    sectionBodies: [body],
  });

  bindProjectDetailSectionToggles(mockDocument);

  assert.equal(body.style.overflow, '');
  assert.equal(body.style.transform, '');
  assert.equal(body.style.opacity, '');

  button.listeners.click();

  assert.equal(button.getAttribute('aria-expanded'), 'false');
  assert.equal(body.dataset.collapsed, 'true');
  assert.equal(body.style.maxHeight, '0px');
  assert.equal(body.style.opacity, '0');
  assert.equal(body.style.transform, 'translateY(-8px)');
  assert.equal(body.style.overflow, 'hidden');
  assert.equal(body.hasAttribute('hidden'), false);

  body.listeners.transitionend({ target: body });

  assert.equal(body.getAttribute('hidden'), '');

  button.listeners.click();

  assert.equal(button.getAttribute('aria-expanded'), 'true');
  assert.equal(body.hasAttribute('hidden'), false);
  assert.equal(body.dataset.collapsed, 'false');
  assert.equal(body.style.maxHeight, '320px');
  assert.equal(body.style.opacity, '1');
  assert.equal(body.style.transform, 'translateY(0)');
  assert.equal(body.style.overflow, 'hidden');

  body.listeners.transitionend({ target: body });

  assert.equal(body.style.maxHeight, '');
  assert.equal(body.style.opacity, '');
  assert.equal(body.style.transform, '');
  assert.equal(body.style.overflow, '');
});

test('renderProjectDetail mounts a safe fallback when the slug is unknown', () => {
  const mockDocument = createMockDetailDocument('missing-project');

  renderProjectDetail(mockDocument);

  assert.equal(mockDocument.getElementById('detail-title').textContent, 'Project not found');
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /Return to the homepage/i);
  assert.equal(mockDocument.getElementById('detail-visit-link').textContent, 'Back to Home');
  assert.match(mockDocument.getElementById('detail-visit-link').href, /\.\.\/index\.html#projects/);
});

test('bindProjectDetailLightbox opens images in a dismissible overlay', () => {
  const mockDocument = createMockDetailDocument('process-platform');

  renderProjectDetail(mockDocument);
  bindProjectDetailLightbox(mockDocument);

  const featuredImage = mockDocument.getElementById('detail-featured-image');
  const longformLink = mockDocument.getElementById('detail-longform-link');
  const longformImage = mockDocument.getElementById('detail-longform-image');
  const lightbox = mockDocument.getElementById('detail-image-lightbox');
  const lightboxImage = mockDocument.getElementById('detail-image-lightbox-image');
  const lightboxCaption = mockDocument.getElementById('detail-image-lightbox-caption');
  const backdrop = mockDocument.getElementById('detail-image-lightbox-backdrop');
  const closeButton = mockDocument.getElementById('detail-image-lightbox-close');
  const prevButton = mockDocument.getElementById('detail-image-lightbox-prev');
  const nextButton = mockDocument.getElementById('detail-image-lightbox-next');

  featuredImage.listeners.click();

  assert.equal(lightbox.hasAttribute('hidden'), false);
  assert.equal(lightbox.getAttribute('aria-hidden'), 'false');
  assert.equal(lightboxImage.getAttribute('src'), featuredImage.getAttribute('src'));
  assert.equal(lightboxCaption.textContent, featuredImage.getAttribute('alt'));
  assert.equal(prevButton.disabled, true);
  assert.equal(nextButton.disabled, false);
  assert.equal(mockDocument.body.classList.contains('detail-lightbox-open'), true);

  backdrop.listeners.click();

  assert.equal(lightbox.getAttribute('hidden'), '');
  assert.equal(lightboxImage.getAttribute('src'), '');
  assert.equal(lightboxCaption.textContent, '');
  assert.equal(mockDocument.body.classList.contains('detail-lightbox-open'), false);

  const clickEvent = {
    prevented: false,
    preventDefault() {
      this.prevented = true;
    },
  };

  longformLink.listeners.click(clickEvent);

  assert.equal(clickEvent.prevented, true);
  assert.equal(lightbox.hasAttribute('hidden'), false);
  assert.equal(lightboxImage.getAttribute('src'), longformImage.getAttribute('src'));
  assert.equal(lightboxCaption.textContent, longformImage.getAttribute('alt'));

  closeButton.listeners.click({ stopPropagation() {} });

  assert.equal(lightbox.getAttribute('hidden'), '');
  assert.equal(lightbox.getAttribute('aria-hidden'), 'true');
});

test('bindProjectDetailLightbox opens stacked gallery images with the same overlay', () => {
  const galleryImage = createMockNode('gallery-image');
  galleryImage.setAttribute('src', '../assets/Industrial Process Modeling Platform/Computation Pane.png');
  galleryImage.setAttribute('alt', 'Hybrid Process Network Optimization Software computation pane');
  const galleryLink = createMockGalleryLink(galleryImage);
  const mockDocument = createMockDetailDocument('process-platform', { galleryLinks: [galleryLink] });

  renderProjectDetail(mockDocument);
  bindProjectDetailLightbox(mockDocument);

  const lightbox = mockDocument.getElementById('detail-image-lightbox');
  const lightboxImage = mockDocument.getElementById('detail-image-lightbox-image');
  const lightboxCaption = mockDocument.getElementById('detail-image-lightbox-caption');
  const prevButton = mockDocument.getElementById('detail-image-lightbox-prev');
  const nextButton = mockDocument.getElementById('detail-image-lightbox-next');

  const clickEvent = {
    prevented: false,
    preventDefault() {
      this.prevented = true;
    },
    currentTarget: galleryLink,
  };

  galleryLink.listeners.click(clickEvent);

  assert.equal(clickEvent.prevented, true);
  assert.equal(lightbox.hasAttribute('hidden'), false);
  assert.equal(lightboxImage.getAttribute('src'), '../assets/Industrial Process Modeling Platform/Computation Pane.png');
  assert.equal(lightboxCaption.textContent, 'Hybrid Process Network Optimization Software computation pane');

  prevButton.listeners.click({ stopPropagation() {} });
  assert.equal(lightboxImage.getAttribute('src'), mockDocument.getElementById('detail-longform-image').getAttribute('src'));

  nextButton.listeners.click({ stopPropagation() {} });
  assert.equal(lightboxImage.getAttribute('src'), '../assets/Industrial Process Modeling Platform/Computation Pane.png');
});

test('registerProjectDetailBoot mounts immediately and via DOMContentLoaded for detail pages', () => {
  const readyDoc = createMockDetailDocument('analytics-dashboard');
  readyDoc.readyState = 'interactive';
  readyDoc.addEventListener = (eventName, handler) => {
    assert.equal(eventName, 'keydown');
    readyDoc.listeners[eventName] = handler;
  };

  registerProjectDetailBoot(readyDoc);
  assert.equal(readyDoc.getElementById('detail-title').textContent, 'Consumer Behaviour Analytics Dashboard');

  const loadingDoc = createMockDetailDocument('robot-car');
  loadingDoc.readyState = 'loading';
  let loadingHandler;

  loadingDoc.addEventListener = (eventName, handler) => {
    if (eventName === 'DOMContentLoaded') {
      loadingHandler = handler;
      return;
    }

    assert.equal(eventName, 'keydown');
    loadingDoc.listeners[eventName] = handler;
  };

  registerProjectDetailBoot(loadingDoc);
  assert.equal(typeof loadingHandler, 'function');
  loadingHandler();
  assert.equal(loadingDoc.getElementById('detail-title').textContent, 'Vision-Assisted Arduino Robot Car');
});

function createMockHomeDocument() {
  const ids = [
    'wordmark-primary',
    'wordmark-secondary',
    'nav-list',
    'hero-statement',
    'hero-summary',
    'hero-contact',
    'education-list',
    'tech-stack-list',
    'certification-list',
    'project-grid',
  ];

  return createMockDocument(ids);
}

function createMockContactDocument() {
  const ids = [
    'wordmark-primary',
    'wordmark-secondary',
    'nav-list',
    'contact-page-list',
  ];

  return createMockDocument(ids);
}

function createMockAboutDocument() {
  const ids = [
    'wordmark-primary',
    'wordmark-secondary',
    'nav-list',
    'about-page-copy',
  ];

  return createMockDocument(ids);
}

function createMockDetailDocument(slug, options = {}) {
  const {
    galleryLinks = [],
    sectionToggleButtons = [],
    sectionBodies = [],
  } = options;
  const ids = [
    'detail-prev-link',
    'detail-next-link',
    'detail-title',
    'detail-visit-link',
    'detail-meta-stack',
    'detail-featured-image',
    'detail-details-body',
    'detail-project-quote',
    'detail-quote-body',
    'detail-quote-credit',
    'detail-aside-logo',
    'detail-longform-link',
    'detail-longform-image',
    'detail-image-lightbox',
    'detail-image-lightbox-backdrop',
    'detail-image-lightbox-dialog',
    'detail-image-lightbox-close',
    'detail-image-lightbox-image',
    'detail-image-lightbox-caption',
    'detail-image-lightbox-prev',
    'detail-image-lightbox-next',
  ];

  const doc = createMockDocument(ids);
  doc.body.dataset.projectSlug = slug;
  sectionBodies.forEach((body) => {
    doc.nodes.set(body.id, body);
  });
  doc.getElementById('detail-image-lightbox').setAttribute('hidden', '');
  doc.getElementById('detail-image-lightbox').setAttribute('aria-hidden', 'true');
  doc.querySelectorAll = (selector) => {
    if (selector === '[data-detail-gallery-link]') {
      return galleryLinks;
    }

    if (selector === '[data-project-section-toggle]') {
      return sectionToggleButtons;
    }

    assert.fail(`Unexpected selector: ${selector}`);
  };
  return doc;
}

function createMockBackgroundDocument(options = {}) {
  const { withVanta = false } = options;
  const root = {
    id: 'dots',
    dataset: {},
    children: [],
    clientWidth: 1280,
    clientHeight: 720,
    appendChild(node) {
      this.children.push(node);
      return node;
    },
  };

  const win = {
    innerWidth: 1280,
    innerHeight: 720,
    devicePixelRatio: 1,
    listeners: {},
    vantaCalls: [],
    addEventListener(eventName, handler) {
      this.listeners[eventName] = handler;
    },
    requestAnimationFrame(handler) {
      this.lastAnimationFrame = handler;
      return 1;
    },
  };

  if (withVanta) {
    win.VANTA = {
      DOTS(config) {
        win.vantaCalls.push(config);
        return { destroy() {} };
      },
    };
  }

  const doc = {
    readyState: 'interactive',
    body: {
      dataset: {},
    },
    defaultView: win,
    getElementById(id) {
      if (id === 'dots') {
        return root;
      }

      return null;
    },
    createElement(tagName) {
      return createMockElement(tagName);
    },
    addEventListener() {},
  };

  return { doc, root, win };
}

function createMockDocument(ids) {
  const nodes = new Map(ids.map((id) => [id, createMockNode(id)]));
  const listeners = {};

  return {
    readyState: 'interactive',
    body: {
      dataset: {},
      classList: createClassList(),
    },
    listeners,
    defaultView: {},
    nodes,
    getElementById(id) {
      return nodes.get(id) ?? null;
    },
    addEventListener(eventName, handler) {
      listeners[eventName] = handler;
    },
  };
}

function createMockProjectDetailSectionToggleButton(controlsId) {
  return {
    listeners: {},
    attributes: {
      'aria-controls': controlsId,
      'aria-expanded': 'true',
    },
    addEventListener(eventName, handler) {
      this.listeners[eventName] = handler;
    },
    setAttribute(name, value) {
      this.attributes[name] = String(value);
    },
    getAttribute(name) {
      return this.attributes[name];
    },
  };
}

function createMockElement(tagName) {
  return {
    tagName: String(tagName).toUpperCase(),
    className: '',
    attributes: {},
    style: {},
    width: 0,
    height: 0,
    setAttribute(name, value) {
      this.attributes[name] = String(value);
    },
    getContext() {
      return {
        clearRect() {},
        fillRect() {},
        beginPath() {},
        arc() {},
        fill() {},
        setTransform() {},
      };
    },
  };
}

function createMockCopyTextarea() {
  return {
    value: '',
    style: {},
    removed: false,
    attributes: {},
    setAttribute(name, value) {
      this.attributes[name] = String(value);
    },
    focus() {},
    select() {},
    setSelectionRange() {},
    remove() {
      this.removed = true;
    },
  };
}

function createMockInteractiveHeroContactButton() {
  const label = {
    textContent: 'Email',
  };

  return {
    dataset: {
      heroContactCopy: 'zhant173@mcmaster.ca',
    },
    label,
    listeners: {},
    attributes: {},
    addEventListener(eventName, handler) {
      this.listeners[eventName] = handler;
    },
    querySelector(selector) {
      assert.equal(selector, '.hero-contact-label');
      return label;
    },
    setAttribute(name, value) {
      this.attributes[name] = String(value);
    },
  };
}

function createMockInteractiveContactButton() {
  return {
    dataset: {
      contactCopy: 'zhant173@mcmaster.ca',
    },
    listeners: {},
    attributes: {},
    addEventListener(eventName, handler) {
      this.listeners[eventName] = handler;
    },
    setAttribute(name, value) {
      this.attributes[name] = String(value);
    },
  };
}

function createMockAboutPlatformCopyButton() {
  return {
    dataset: {
      aboutPlatformCopy: 'edmchzty',
    },
    listeners: {},
    attributes: {
      'aria-label': 'Copy Discord ID: edmchzty',
    },
    addEventListener(eventName, handler) {
      this.listeners[eventName] = handler;
    },
    setAttribute(name, value) {
      this.attributes[name] = String(value);
    },
    getAttribute(name) {
      return this.attributes[name];
    },
  };
}

function createMockProjectCategoryToggleButton(controlsId) {
  return {
    dataset: {
      projectCategoryToggle: '',
    },
    listeners: {},
    attributes: {
      'aria-controls': controlsId,
      'aria-expanded': 'true',
    },
    addEventListener(eventName, handler) {
      this.listeners[eventName] = handler;
    },
    setAttribute(name, value) {
      this.attributes[name] = String(value);
    },
    getAttribute(name) {
      return this.attributes[name];
    },
  };
}

function createMockGalleryLink(imageNode) {
  return {
    listeners: {},
    addEventListener(eventName, handler) {
      this.listeners[eventName] = handler;
    },
    querySelector(selector) {
      assert.equal(selector, 'img');
      return imageNode;
    },
  };
}

function createMockNode(id) {
  return {
    id,
    textContent: '',
    innerHTML: '',
    href: '',
    attributes: {},
    dataset: {},
    style: {},
    listeners: {},
    scrollHeight: 320,
    classList: createClassList(),
    addEventListener(eventName, handler) {
      this.listeners[eventName] = handler;
    },
    removeEventListener(eventName) {
      delete this.listeners[eventName];
    },
    setAttribute(name, value) {
      this.attributes[name] = String(value);
      if (name === 'href') {
        this.href = String(value);
      }
    },
    getAttribute(name) {
      return this.attributes[name];
    },
    removeAttribute(name) {
      delete this.attributes[name];
      if (name === 'href') {
        this.href = '';
      }
    },
    hasAttribute(name) {
      return Object.hasOwn(this.attributes, name);
    },
  };
}

function createClassList() {
  const values = new Set();

  return {
    add(...items) {
      items.forEach((item) => values.add(item));
    },
    remove(...items) {
      items.forEach((item) => values.delete(item));
    },
    contains(item) {
      return values.has(item);
    },
  };
}
