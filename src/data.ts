export const personalInfo = {
  name: "Divyam Jha",
  pronunciation: "/dɪv.jəm dʒɑː/",
  partOfSpeech: "noun",
  // Where the hero globe drops its marker.
  location: { city: "Pune, Maharashtra", country: "India", lat: 18.5204, lng: 73.8567 },
  bio: [
    {
      text: "A full-stack developer and ",
      links: [
        {
          label: "product builder",
          url: "https://en.wikipedia.org/wiki/Product_design",
        },
      ],
      suffix:
        " with a keen curiosity across engineering, product strategy, and user-centric design.",
    },
    {
      text: "A ",
      links: [
        {
          label: "polymath",
          url: "https://en.wikipedia.org/wiki/Polymath",
        },
      ],
      suffix:
        " who bridges technical architecture with business outcomes to create impactful, scalable solutions.",
    },
  ],
};

/** Compact icon links shown beside an experience title. `kind` picks the mark:
 *  "lfx" renders the Linux Foundation logo, "proposal" a document icon. */
export type ExperienceLink = {
  kind: "lfx" | "proposal";
  label: string;
  url: string;
};

export const experiences: {
  role: string;
  organization: string;
  year: string;
  points: string[];
  links?: ExperienceLink[];
}[] = [
  {
    role: "LFX Mentee — Paladin Java SDK",
    organization: "Linux Foundation Decentralized Trust (LFDT)",
    year: "June 2025 — Present",
    points: [
      "Building the Java SDK for Paladin, a privacy-preserving blockchain platform, covering all nine JSON-RPC namespaces over HTTP and WebSocket transport.",
      "Designed a multi-module Gradle architecture and authored RFCs defining the SDK's public API surface.",
    ],
    links: [
      {
        kind: "lfx",
        label: "LFX mentorship project",
        url: "https://mentorship.lfx.linuxfoundation.org/project/b0a24d64-fc7d-4a9c-8314-9c282298e904",
      },
      {
        kind: "proposal",
        label: "My LFX proposal (PDF)",
        url: "https://jobspring-prod-uploads.s3.amazonaws.com/98493ffe-f1db-4db5-817a-1635bb999436-.pdf",
      },
    ],
  },
];

export const education = {
  institution: "Vedam School of Technology",
  year: "2025 - Surviving",
  degree: "Computer Science Engineering"
};

export const techStack = {
  description:
    "I’m a generalist at heart who can build with anything, but here’s the core stack I’ve spent the most time with:",
  categories: [
    {
      name: "Languages",
      items: ["TypeScript", "JavaScript", "Python", "Java"],
    },
    {
      name: "Frontend",
      items: ["React", "Bootstrap", "Tailwind CSS", "shadcn/ui", "EJS"],
    },
    {
      name: "Backend",
      items: ["Node.js", "Bun", "FastAPI", "Express", "Supabase", "Firebase"],
    },
    {
      name: "Infrastructure",
      items: ["Docker", "AWS", "MongoDB", "PostgreSQL", "Redis"],
    },
  ],
};

/** Blogify is the CMS behind /writing — my own blogging app. Linked from the
 *  writing section and from the failure states, so a reader can still reach the
 *  writing when the fetch or the proxy is having a bad day. */
export const BLOGIFY_SITE = "https://blogging-application-eight.vercel.app";

const MEDIUM_URL = "https://medium.com/@divyamjha.70055594";

const EXCALIDRAW_URL =
  "https://excalidraw.com/#json=aKrDEkF8JRIYi6U50fdWL,RT9UdMcQBG2Q-dt3izsBXA";

export const writings = {
  platform: "Medium",
  url: MEDIUM_URL,
  // Each paragraph is split around its linked name so the link sits inside the
  // sentence rather than trailing it.
  paragraphs: [
    {
      lead: "I write the technical stuff on ",
      link: { label: "Medium", url: MEDIUM_URL },
      suffix:
        " — AI systems, product strategy, architecture. The things I want other engineers to read.",
    },
    {
      lead: "I document the journey on ",
      link: { label: "Blogify", url: BLOGIFY_SITE },
      suffix:
        " — build logs, case studies, and what actually broke along the way. Blogify is the blogging platform I built, and the CMS behind this page: these posts are fetched from its API at runtime, so I hit every rough edge before anyone else does.",
    },
  ],
};


export const aboutMe = {
  paragraphs: [
    "My approach to building is driven by curiosity — a need to understand how things work at their core rather than just how to use them. That is as true of a distributed system as it is of anything else I pick up.",
    "I believe the best products are built by people with a range of interests. Technical depth gets a thing working; human perspective is what makes it resonate. The list below is where the second half comes from."
  ],
};

/** What I do away from a keyboard. Rendered as a card grid in the Beyond the
 *  Code section, so each entry stays one tight line of copy. */
export const beyondCode = {
  intro:
    "Engineering is what I do most, not all of what I do. A few things that keep the rest of me sharp:",
  interests: [
    {
      icon: "gym",
      title: "The gym",
      text: "Five days a week. Nothing has taught me more about compounding: no single session moves the number, and every skipped week does.",
    },
    {
      icon: "badminton",
      title: "Badminton",
      text: "Where I go to think about nothing. Fast enough that the moment you start planning the rally, you have already lost it.",
    },
    {
      icon: "startups",
      title: "How startups work",
      text: "I read teardowns, funding stories, and post-mortems constantly — how companies find a market, price a thing, and occasionally fall apart.",
    },
  ],
};

/** The Now section: a live pointer at current work rather than a shipped-things
 *  list. `boardUrl` is the public Excalidraw board — a read-only share link,
 *  since anyone with an edit link can change the board. */
export const now = {
  intro:
    "A live look at what I’m building, learning, and thinking about right now.",
  board: {
    label: "Excalidraw board",
    description:
      "My Excalidraw board is where I sketch product ideas, architecture, feature flows, and the things I’m currently exploring.",
    action: "View my live workspace",
    url: EXCALIDRAW_URL,
  },
};

export const projects = [
  {
    title: "Paladin Java SDK",
    description: "Java client for the LFDT Paladin programmable-privacy platform. Wraps Paladin's JSON-RPC 2.0 API over HTTP (request/reply) and WebSocket (subscriptions).",
    url: "https://github.com/divyam-jha123/paladin-java-sdk",
    tech: ["Java", "Gradle", "JSON-RPC", "WebSocket"],
    githubRepo: "https://github.com/divyam-jha123/paladin-java-sdk"
  },
  {
    title: "AskMyNotes",
    description: "An intuitive web application for organizing, storing, and asking questions against your personal notes using AI.",
    url: "https://ask-my-notes-kryptonian-coders.vercel.app/",
    tech: ["React", "TypeScript", "Vite", "Gemini API"],
    githubRepo: "https://github.com/divyam-jha123/AskMyNotes-Kryptonian-coders-"
  },
  {
    title: "Blogify",
    description: "A full-stack blogging platform with comprehensive user authentication, allowing users to create, read, and manage articles. It is also the CMS behind the writing on this site — the posts and series here are authored in Blogify and fetched from its API at runtime.",
    url: "https://blogging-application-eight.vercel.app/",
    tech: ["Express", "Node.js", "MongoDB", "EJS"],
    githubRepo: "https://github.com/divyam-jha123/Blogify"
  },
  {
    title: "Chatly",
    description: "A real-time chat application for secure private messaging, with WebSocket-backed conversations, push notifications and an SFU-based conference room for group calls.",
    url: "https://chatly-eight-sigma.vercel.app",
    tech: ["React", "TypeScript", "WebSocket", "Firebase", "Tailwind CSS"],
    githubRepo: "https://github.com/divyam-jha123/chatly"
  }
];

export const socials = {
  github: "https://github.com/divyam-jha123",
  linkedin: "https://www.linkedin.com/in/divyam-kumar-jha",
  x: "https://x.com/_nikhil_jha",
  email: "divyamjha.70055594@gmail.com",
  cal: "https://cal.com/divyamjha27/15min",

};

type ProductAction = {
  label: string;
  url: string;
  variant: "primary" | "secondary";
};

export type Product = {
  name: string;
  role: string;
  period: string;
  status: "live" | "building";
  statusLabel: string;
  description: string[];
  note?: string;
  actions: ProductAction[];
};

export const products: Product[] = [
  {
    name: "BrainExpo",
    role: "Developer & Product",
    period: "2026 — Present",
    status: "live",
    statusLabel: "Live",
    description: [
      "I kept saving things on the internet and almost never coming back to them. So I built BrainExpo.",
      "It’s a second brain for the things you don’t want to lose — links, ideas, resources, notes, and everything else you tell yourself you’ll revisit later. BrainExpo keeps them in one place and brings them back to you through weekly reminders, so saved doesn’t become forgotten.",
    ],
    actions: [
      { label: "Visit BrainExpo", url: "https://www.brainexpo.me/", variant: "primary" },
      { label: "Case study", url: "/writing/brainexpo", variant: "secondary" },
    ],
  },
  {
    name: "Vorkium",
    role: "Founder & Engineering",
    period: "2026 — Present",
    status: "building",
    statusLabel: "In development",
    description: [
      "Remote work gave us meetings, messages and tabs. It never really gave us a place to work together.",
      "Vorkium is a virtual workspace where remote teams can actually feel present — move around a shared space, walk up to someone, start a conversation, collaborate, and work together without scheduling another call.",
      "I’m currently building the product from the ground up — from the virtual world and interactions to the systems underneath it.",
    ],
    note: "Not ready yet. Still being built in the open.",
    actions: [
      { label: "Follow the journey", url: "/writing/building-vorkium", variant: "secondary" },
    ],
  },
];

export const blogifyPostUrl = (postId: string) => `${BLOGIFY_SITE}/blog/${postId}`;

/** Posts are authored in Blogify and fetched at runtime. `/api/blog` is a
 *  same-origin proxy to that API — see vercel.json and vite.config.ts; the
 *  upstream sends no CORS headers, so the browser can't call it directly. */
export const BLOG_API_BASE = "/api/blog";

/** Series (multi-part build logs) come from `/api/series`, proxied the same way. */
export const SERIES_API_BASE = "/api/series";
export const blogifySeriesUrl = (slug: string) => `${BLOGIFY_SITE}/series/${slug}`;

export type BlogPost = {
  id: string;
  title: string;
  body: string;
  coverImageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  author?: { userName?: string; profileImageURL?: string };
};

/** One post inside a series. Bodies are authored as Markdown, unlike standalone posts. */
export type SeriesPart = BlogPost & {
  partNumber: number;
  series?: { id: string; title: string; slug: string };
};

export type Series = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  parts: SeriesPart[];
};

/**
 * Jargon a non-technical reader shouldn't have to already know. Only the FIRST
 * occurrence of each term in a post is linked — linking every repeat turns the
 * prose into a minefield. A term written with a capital is matched
 * case-sensitively so the proper noun "Express" never catches the verb.
 * Every destination was checked against the MediaWiki API.
 */
export const glossary: { term: string; url: string }[] = [
  { term: "full-stack application", url: "https://en.wikipedia.org/wiki/Full-stack_developer" },
  { term: "browser extension", url: "https://en.wikipedia.org/wiki/Browser_extension" },
  { term: "user experience", url: "https://en.wikipedia.org/wiki/User_experience" },
  { term: "market research", url: "https://en.wikipedia.org/wiki/Market_research" },
  { term: "Stack Overflow", url: "https://en.wikipedia.org/wiki/Stack_Overflow" },
  { term: "landing page", url: "https://en.wikipedia.org/wiki/Landing_page" },
  { term: "open source", url: "https://en.wikipedia.org/wiki/Open-source_software" },
  { term: "DNS records", url: "https://en.wikipedia.org/wiki/Domain_Name_System" },
  { term: "authentication", url: "https://en.wikipedia.org/wiki/Authentication" },
  { term: "deployment", url: "https://en.wikipedia.org/wiki/Software_deployment" },
  { term: "debugging", url: "https://en.wikipedia.org/wiki/Debugging" },
  { term: "frontend", url: "https://en.wikipedia.org/wiki/Front_end_and_back_end" },
  { term: "backend", url: "https://en.wikipedia.org/wiki/Front_end_and_back_end" },
  { term: "React", url: "https://en.wikipedia.org/wiki/React_(software)" },
  { term: "Express", url: "https://en.wikipedia.org/wiki/Express.js" },
  { term: "server", url: "https://en.wikipedia.org/wiki/Server_(computing)" },
  { term: "cloud", url: "https://en.wikipedia.org/wiki/Cloud_computing" },
  { term: "repo", url: "https://en.wikipedia.org/wiki/Repository_(version_control)" },
  { term: "SPF", url: "https://en.wikipedia.org/wiki/Sender_Policy_Framework" },
  { term: "hoarder", url: "https://en.wikipedia.org/wiki/Compulsive_hoarding" },
  { term: "amnesia", url: "https://en.wikipedia.org/wiki/Amnesia" },
];

/** URL slug -> Blogify post id. Add a row to publish another piece. */
export const writingRoutes: { slug: string; postId: string }[] = [
  { slug: "brainexpo", postId: "6a9aedc1df7f3a9f163533d1" },
];

/** URL slug -> Blogify series slug. `/writing/<slug>/<n>` deep-links to part n.
 *  The eyebrow is what the series is *for*, since the API only carries a title. */
export const seriesRoutes: { slug: string; seriesSlug: string; eyebrow: string }[] = [
  { slug: "building-vorkium", seriesSlug: "building-vorkium", eyebrow: "Build log" },
];
