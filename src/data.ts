export const personalInfo = {
  name: "Divyam Jha",
  pronunciation: "/dɪv.jəm dʒɑː/",
  partOfSpeech: "noun",
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
        " with keen curiosity across engineering, product strategy, and user-centric design.",
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

export const inBetweenExperiences = {
  title: "In Between These Learnings",
  subtitle: "The Product Building Journey",
  content: `I've been building and experimenting on the product side for a long time. Each previous product always feels naive in hindsight, but looking back, I can see they were incrementally better, each iteration teaching me something new about users, infrastructure, and what it takes to build something people actually want.\n\n
  It started with participating in various hackathons, where I found my love for building products and solving real-world problems.
  So I built BrainExpo, a platform to store and share various kinds of links like YouTube, LinkedIn, GitHub, Twitter, any document, etc. \n\n
  I saw a problem: we never look back at our bookmarks. We eventually forget that we have saved something important,
  because bookmarks are not designed for thinking or learning — they're just storage.\n\n
  But BrainExpo keeps the user updated with weekly insights on their saved links.\n\n
  But what next for BrainExpo?\n
  Pivot - \n\n
  One day someone asked me why anyone would pay for this when free options are already available with ease.\n\n
  Then I re-thought this, and I remembered a thing from my childhood: how I used to spend hours finding that one photo of me and my brother in a gallery of 1000 photos.\n\n
  And after so many years, the exact problem still exists…\n\n
  And the main problem is not with individuals — it's with the agencies who have lakhs of videos, frames, pictures, etc.\n\n
Finding that one frame inside lakhs of videos and millions of frames is a headache.\n\n
Hence, I decided to rebuild BrainExpo as a search engine for photos, videos, files, documents — anything and everything.\n\n
And the journey of building will never stop.

`

};

export const experiences = [
  {
    role: "LFX Mentee — Paladin Java SDK",
    organization: "Linux Foundation Decentralized Trust (LFDT)",
    year: "June'25 - Present",
    points: [
      "Building the Java SDK for Paladin, a privacy-preserving blockchain platform, covering all nine JSON-RPC namespaces over HTTP and WebSocket transport.",
      "Designed a multi-module Gradle architecture and authored RFCs defining the SDK's public API surface.",
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
    "I'm a generalist at heart who can build with anything, but here's the core stack I've spent the most time with:",
  categories: [
    {
      name: "Languages",
      items: ["TypeScript", "JavaScript", "Python", "Java"],
    },
    {
      name: "Frontend",
      items: ["React", "Bootstrap", "Tailwind CSS"],
    },
    {
      name: "Backend",
      items: ["Node.js", "FastAPI", "Express", "Supabase", "Firebase"],
    },
    {
      name: "Infrastructure",
      items: ["Docker", "AWS", "MongoDB","PostgreSQL"],
    },
  ],
};

export const writings = {
  platform: "Medium",
  url: "https://medium.com/@divyamjha.70055594",
  description:
    "I host my thoughts on Medium rather than building a custom site. Instead of overengineering and reinventing the wheel, I prefer leveraging a mature platform that lets me focus on what matters: sharing insights on AI systems, product strategy, and technical architecture.",
};


export const aboutMe = {
  paragraphs: [
    "Beyond engineering and building systems, I find balance in the tactile and the thoughtful. Whether it's exploring the nuances of complex architectures or spending time in the real world, my approach to life is driven by curiosity and a desire to understand how things work at their core.",
    "I believe that the best products are built by people who have a diverse range of interests. It's the unique combination of technical depth and human perspective that allows us to create technology that actually resonates.",
    "And besides all this, I love to read and understand how tech startups operate and grow."
  ],
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
    tech: ["React", "TypeScript", "Vite" ,"Gemini API"],
    githubRepo: "https://github.com/divyam-jha123/AskMyNotes-Kryptonian-coders-"
  },
  {
    title: "Blogify",
    description: "A full-stack blogging platform with comprehensive user authentication, allowing users to create, read, and manage articles.",
    url: "https://blogging-application-eight.vercel.app/",
    tech: ["Express","Node.js", "MongoDB" ,"ejs"],
    githubRepo: "https://github.com/divyam-jha123/Blogify"
  },
  {
    title: "Brain Expo",
    description: "An interactive online platform and exhibition space designed to showcase innovative ideas and connect creators.",
    url: "https://www.brainexpo.me/",
    tech: ["TypeScript", "React", "Tailwind CSS", "Vite"],
    githubRepo: "https://github.com/divyam-jha123/Second-Brain"
  }
];

export const socials = {
  github: "https://github.com/divyam-jha123",
  linkedin: "https://www.linkedin.com/in/divyam-kumar-jha",
  x: "https://x.com/_nikhil_jha",
  email: "divyamjha.70055594@gmail.com",

};
