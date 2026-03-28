export const personalInfo = {
  name: "Divyam Jha",
  pronunciation: "/dɪv.jəm dʒɑː/",
  partOfSpeech: "noun",
  bio: [
    {
      text: "a full-stack developer and ",
      links: [
        {
          label: "product builder",
          url: "https://en.wikipedia.org/wiki/Product_design",
        },
      ],
      suffix:
        " with deep experience across engineering, product strategy, and user-centric design.",
    },
    {
      text: "a ",
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

export interface ExperienceEntry {
  company: string;
  companyUrl?: string;
  badge?: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  details: string[];
}

export const experiences: ExperienceEntry[] = [
  {
    company: "Resonate",
    badge: "YC W24",
    companyUrl: "https://www.ycombinator.com/companies/resonate",
    role: "Software Engineer",
    location: "San Francisco, CA",
    period: "2024 - Present",
    summary:
      "As an early software engineer bridging product strategy and technical execution, driving the development of an AI-native messaging platform from zero to one.",
    details: [
      "Architecting and building core product features for an AI-focused messaging ecosystem.",
      "Developing real-time systems and innovating ways to transform and present information dynamically within messaging interfaces.",
      "Collaborating within a lean team to build robust tools for AI-driven communication.",
      "Operating top-to-bottom, from product conception to complete software development.",
    ],
  },
  {
    company: "Entrepreneur First",
    companyUrl: "https://www.joinef.com/",
    role: "Founder in Residence",
    location: "London, UK",
    period: "2024",
    summary:
      "As a Founder in Residence at EF, a premier global talent investor and startup accelerator, immersed in designing and developing cutting-edge Agentic AI systems.",
    details: [
      "Built autonomous, goal-driven AI agents that shifted from suggestion-based tools to proactive execution.",
      "Drove a bold vision for the future of computing: making traditional web browsing obsolete.",
      "Operated in a high-intensity environment surrounded by world-class cofounders and mentors.",
      "Positioned at the forefront of a paradigm shift in AI, tackling hard technical and conceptual challenges.",
    ],
  },
  {
    company: "Google Summer of Code",
    companyUrl: "https://summerofcode.withgoogle.com/",
    role: "Open Source Contributor",
    location: "Remote",
    period: "2023",
    summary:
      "Designed and developed a comprehensive system for managing ACL permissions across multiple Linux file system servers.",
    details: [
      "Built a robust backend capable of processing millions of permission change requests.",
      "Implemented two Linux systemd daemons communicating via Unix sockets.",
      "Created a user-friendly Next.js frontend enabling secure login and backend communication.",
    ],
  },
  {
    company: "Freelance",
    companyUrl: "https://www.upwork.com/",
    role: "Full-Stack Developer & Technical Writer",
    location: "Remote",
    period: "2022 - 2024",
    summary:
      "Authored comprehensive technical documentation for SCA tools and developed custom scraping solutions for real estate platforms.",
    details: [
      "Authored comprehensive, highly technical documentation (50+ pages) for a Software Composition Analysis (SCA) tool.",
      "Ghostwrote in-depth content on Reachability Analysis for a security company CTO.",
      "Deployed and configured Flipt on cloud infrastructure to support video production workflows.",
      "Developed custom scraping tools targeting real estate platforms for efficient data extraction.",
    ],
  },
];

export const inBetweenExperiences = {
  title: "In Between These Experiences",
  subtitle: "The Product Building Journey",
  content: `I've been building and experimenting on the product side for a long time. Each previous product always feels naive in hindsight, but looking back, I can see they were incrementally better, each iteration teaching me something new about users, infrastructure, and what it takes to build something people actually want.

It started with **MetaWiper** during my sophomore year, a tool that cleaned image metadata. No one would use it, but I was proud. It was my first real attempt at shipping something complete.

Next came **Stockic**, a news app where I spent months doing serious infrastructure work. This was where I learned to build systems that could scale, not just features that looked good.

Then I worked on **Gloss Card**, and for the first time, a customer actually wanted to buy it for their product. That validation, knowing someone saw enough value to pay, was a turning point.

After that, I built **NeuraLeap**, where I had the most meaningful user interactions yet. I worked on data pipelines capable of handling 50 million LinkedIn profiles and processing them with AI. The scale was different, the stakes were higher, and the technical challenges forced me to level up.

Most recently, I worked on **Meteor**, an AI SEO toolkit at Entrepreneurs First. This time, my product was being used by 6 YC-backed companies. Real users. Real traction. Real feedback loops.

So yes, hard work and consistency pay off. Each product was a step forward, even when it didn't feel like it at the time.`,
};

export const education = {
  institution: "vedam school of techonolgy",
  year: "2025 - Surviving",
};

export const techStack = {
  description:
    "I'm a generalist at heart who can build with anything, but here's the core stack i've spent the most time with:",
  categories: [
    {
      name: "Languages",
      items: ["TypeScript", "javascript", "Python", "java"],
    },
    {
      name: "Frontend",
      items: ["React", "Next.js", "bootstrap", "Tailwind CSS"],
    },
    {
      name: "Backend",
      items: ["Node.js", "FastAPI", "Express", "SupaBase" ,"FireBase"],
    },
    {
      name: "Infrastructure",
      items: ["Docker", "AWS", "MongoDB","PostgreSQL", "Redis" ],
    },
  ],
};

export interface Publication {
  title: string;
  conference: string;
  year: number;
  authors: string;
  doi: string;
  abstract: string;
}

export const publications: Publication[] = [
  {
    title:
      "An Adapter Device for Enhancing the Security of the Modbus Protocol in Legacy Systems",
    conference:
      "2025 17th International Conference on COMmunication Systems and NETworks (COMSNETS)",
    year: 2025,
    authors: "Divyam Jha; T. S. Sreeram",
    doi: "https://doi.org/10.1109/COMSNETS63942.2025.10885597",
    abstract:
      "Supervisory Control and Data Acquisition systems are the backbone of managing critical infrastructure in modern industrial control systems, spanning sectors from power generation to logistics. This paper proposes an adapter device for enhancing the security of the Modbus protocol without replacing devices in legacy systems.",
  },
];

export const explainerVideos = {
  channelUrl: "https://www.youtube.com/@theracecondition",
  videos: [
    {
      title: "Spotify System Design",
      url: "https://www.youtube.com/watch?v=m84tBP_4DWE",
    },
  ],
};

export const writings = {
  platform: "Medium",
  url: "https://medium.com/@divyamjha",
  description:
    "i host my thoughts on medium rather than building a custom site. instead of overengineering and reinventing the wheel, i prefer leveraging a mature platform that lets me focus on what matters: sharing insights on ai systems, product strategy, and technical architecture.",
};

export const library = {
  description: "and many more, these are just one of my best reads",
  books: [
    { title: "Zero to One", author: "Peter Thiel" },
    { title: "The Lean Startup", author: "Eric Ries" },
    { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann" },
    { title: "Clean Code", author: "Robert C. Martin" },
    { title: "The Pragmatic Programmer", author: "Andy Hunt & Dave Thomas" },
  ],
};

export const aboutMe = {
  paragraphs: [
    "Beyond engineering and building systems, I find balance in the tactile and the thoughtful. Whether it's exploring the nuances of complex architectures or spending time in the real world, my approach to life is driven by curiosity and a desire to understand how things work at their core.",
    "I believe that the best products are built by people who have a diverse range of interests. It's the unique combination of technical depth and human perspective that allows us to create technology that actually resonates.",
    "And beside all this i love to read or understand how tech startups operate and grow."
  ],
};

export const socials = {
  github: "https://github.com/divyam-jha123",
  linkedin: "https://www.linkedin.com/in/divyam-kumar-jha",
  x: "https://x.com/_nikhil_jha",
  email: "divyamjha.70055594@gmail.com",

};
