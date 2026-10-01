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
    title: "Fullstack Software Engineer",
    company: "WiseTech Global",
    type: "Full-time",
    bullets: [
      "Re-architected a YAML-based form flow engine and Knockout.js UI into a code-driven TypeScript and Vue 3 framework, adding Playwright integration tests to validate correctness with zero regressions.",
      "Led the rollout of the migration across 41 product teams over 15+ months as the primary point of contact, triaging issues and sustaining adoption momentum across the organisation.",
      "Drove the migration of 70+ core JavaScript modules to TypeScript, improving type safety and reducing runtime errors across shared frontend surfaces.",
      "Built internal developer tooling including a Node.js process orchestrator with MCP server and CLI interfaces on an event-driven architecture, improving productivity for 200+ engineers.",
      "Replaced legacy form flow components with redesigned implementations, engineering backward compatibility validation, integration tests, and unit tests before rolling changes out safely across 30+ product teams.",
      "Owned and extended Platform Builder, a low-code CargoWise portal configuration platform, adding full-stack capabilities across Vue 3 via WebView2 and C# .NET Framework that unblocked product teams to build their own business logic without platform team involvement.",
      "Extended a localisation pipeline supporting translation of globally used CargoWise web portals into 49 languages, expanding coverage across multiple product repositories.",
      "Maintained frontend build infrastructure across multiple repositories including Vite, Rspack, and Webpack configurations, enforcing code quality and consistency through ESLint standards and Vitest/Jest test suites.",
      "Mentored junior engineers on platform architecture, code quality, and best practices through code reviews and direct guidance, drawing on deep expertise across large-scale TypeScript and JavaScript frontend systems.",
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
    period: "Jan 2021 – Dec 2021",
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
