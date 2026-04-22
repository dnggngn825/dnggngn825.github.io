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
      // 'Built and maintained a type-generator package used by 645+ developers across 41 product teams, and helped business teams migrate from YAML-based form-flows to fully coded implementations using TypeScript and Vue 3, debugging issues to make sure the transition was smooth.',
      // 'Fixed bugs and built new features in Platform Builder, a desktop tool used by product and business teams across CargoWise to build and configure web portal applications — working across the Vue 3 frontend and C#/.NET backend, covering areas like UI layouts, form-flows, and business rules.',
      "Maintained a legacy translation pipeline integrated into an in-house CI/CD system, added support for extracting translatable strings defined in Vue files, and worked closely with the translation team to ensure it runs smoothly across repositories.",
      // 'Helped build an internal setup script that replaced several manual steps with a single dashboard, saving developers an hour or more each, and built new features for an internal MCP server that surfaces GitHub Copilot suggestions directly in VS Code.',
      "Built and maintained a multi-package TypeScript build toolchain that automates form workflow type generation across frontend monorepo packages.",
      "Reviewed code from junior engineers, provided feedback, and mentored them on platform knowledge and best practices.",
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
