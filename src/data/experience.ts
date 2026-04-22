export interface ExperienceEntry {
  period:  string
  title:   string
  company: string
  type?:   string
  bullets: string[]
  projects?: { name: string, description: string[], techStack: string[] }[]
}

export const experiences: ExperienceEntry[] = [
  {
    period: "Aug 2021 – Present",
    title: "Software Engineer",
    company: "WiseTech Global",
    type: "Full-time",
    bullets: [
      "Built and maintained a CLI tool that reads YAML-serialized form flow metadata and uses the TypeScript compiler API to resolve types and emit declaration files via module augmentation — providing end-to-end compile-time type safety between C# backend models and TypeScript form definitions.",
      "Led a repo-wide migration from YAML-based form flows to TypeScript-coded implementations — extended an AST-based parser using the TypeScript compiler API to statically extract JSDoc metadata, parameter types, and C#↔TypeScript type mappings from source files without compilation, serving the form flow pipeline used across 41 product teams.",
      "Fixed bugs and built new features in Platform Builder, a low-code platform used across CargoWise to build and configure web portal applications for end clients — working across the Vue 3 frontend and C#/.NET backend, covering UI layouts, form flows, and business rules.",
      "Maintained an internal localisation/translation pipeline integrated into an in-house CI/CD system, added support for extracting translatable strings defined in Vue files, and worked closely with the translation team to ensure it runs smoothly across repositories.",
      "Extended Glow Runner — an internal Node.js process orchestrator (TypeScript, Express, PubSub-JS) for managing parallel frontend build pipelines — by integrating new processes into the pub/sub message bus for real-time state propagation across monitoring and notification systems, and expanded pipeline coverage to the organisation's frontend product repository.",
      "Mentored junior engineers through code reviews, covering platform internals and best practices.",
      "Developed a solid understanding of engineering best practices including Agile, design patterns, and test-driven development through day-to-day work on the team.",
      "Took ownership of features end-to-end — from scoping and design through to implementation, testing, and release — with growing autonomy and reduced oversight over time.",
    ],
    projects: [
      {
        name: "Glow-runner — Internal Developer Tooling",
        description: [
          "Contributed to a **CLI-driven process orchestrator** used to manage and coordinate multiple parallel frontend build tools, dev servers, and file watchers from a single parent process",
          "Extended the tool to support frontend product development workflows, enabling the product team to onboard onto the standardized runner infrastructure",
          "Worked with an **event-driven pub/sub architecture** (`PubSub-JS`) that decoupled process management, file watching, and multiple control surfaces (HTTP dashboard, MCP, console)",
          "Gained hands-on experience with **MCP (Model Context Protocol)** — the open standard that allows AI coding agents to query and control dev processes via `JSON-RPC 2.0`",
        ],
        techStack: [
          "TypeScript",
          "Node.js",
          "Express",
          "WebSocket",
          "MCP (Model Context Protocol)",
        ],
      },
      {
        name: "Coded Form Flow Pipeline",
        description: [
          "Owned `type-generator`, a CLI that consumes YAML-serialized metadata and emits **TypeScript declaration files** via module augmentation, providing compile-time type safety between C# backend models and TypeScript consumers",
          "Contributed to a **5-package build pipeline** using `TypeScript Compiler API` for static AST parsing, custom `worker_threads` pool for parallel processing, and `webpack ContextReplacementPlugin` for dynamic import mapping",
          "Eliminated manual type wiring for form flow contracts across the monorepo; generated types are **deterministic** and Prettier-formatted for clean diffs in code review",
          "Pipeline utilises `TypeScript Compiler API` for static AST analysis, `Node.js worker_threads` for parallel file processing, and **Prettier** for deterministic code generation output",
        ],
        techStack: [
          "TypeScript",
          "Node.js",
          "TypeScript Compiler API",
          "worker_threads",
          "YAML",
          "Prettier",
          "webpack",
          "Vitest",
        ],
      },
    ],
  },
  {
    period: "1/2021 – 12/2021",
    title: "Autonomous Steering Engineer",
    company: "Melbourne University Racing Motorsports",
    type: "University Project",
    bullets: [
      "Designed and implemented an autonomous steering system for a Formula SAE vehicle as part of the capstone project.",
      "Integrated CANopen communication protocol for motor control and sensor feedback.",
      "Developed and simulated control algorithms in MATLAB/Simulink before real-world deployment.",
    ],
  },
  {
    period: "Dec 2020 – Mar 2021",
    title: "IoT Product Development Intern",
    company: "AquaTerra",
    type: "Internship",
    bullets: [
      "Wrote embedded C++ firmware for IoT soil and water sensor prototypes designed for outdoor field deployment.",
      "Ran end-to-end hardware and software tests to verify sensors were ready for field deployment, and wrote assembly guides, Bills of Materials, and managed component inventory to support prototype production.",
    ],
  },
];
