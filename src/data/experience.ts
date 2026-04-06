export interface ExperienceEntry {
  period:  string
  title:   string
  company: string
  type?:   string
  bullets: string[]
}

export const experiences: ExperienceEntry[] = [
  {
    period:  'Aug 2021 – Present',
    title:   'Software Engineer',
    company: 'WiseTech Global',
    bullets: [
      'Joined as a junior engineer resolving bugs and integration issues across an internal TypeScript/Vue 3 frontend framework published to an internal npm registry and consumed by 645+ developers across 41 CargoWise product teams.',
      'Progressed to owning and designing a type-generator package — a core TypeScript utility enabling product teams to migrate from a low-code portal platform to fully coded implementations with end-to-end type safety.',
      'Took initiative on architectural and implementation decisions independently, presenting solutions to the team lead for review — moving from directed work to self-directed design within the first two years.',
      'Built and maintained YAML-based portal workflow configurations and typed Vue 3 utilities, enabling product teams to define UI sequences using shared, type-safe APIs rather than bespoke implementations.',
      'Contributed to an internal developer runner script that replaced multiple manual setup steps with a single unified dashboard — saving each developer 1+ hour previously spent on setup; extended the script with a local MCP server integration to surface GitHub Copilot assistance directly within VS Code.',
      'Appointed to fix and improve a legacy translation pipeline integrated into an in-house CI/CD system — resolved inconsistent behaviour across repositories and now co-owns the pipeline in production.',
      'Onboarded new team members and reviewed code from junior engineers, sharing platform knowledge and upholding code quality standards.',
    ],
  },
  {
    period:  '1/2021 – 12/2021',
    title:   'Autonomous Steering Engineer',
    company: 'Melbourne University Racing Motorsports',
    bullets: [
      'Designed and implemented an autonomous steering system for a Formula SAE vehicle as part of the capstone project.',
      'Integrated CANopen communication protocol for motor control and sensor feedback.',
      'Developed and simulated control algorithms in MATLAB/Simulink before real-world deployment.',
    ],
  },
  {
    period:  'Dec 2020 – Mar 2021',
    title:   'IoT Product Development Intern',
    company: 'AquaTerra',
    type:    'Internship',
    bullets: [
      'Developed embedded software in C++ for IoT sensor prototypes and conducted end-to-end hardware/software testing for field deployment environments.',
      'Produced engineering documentation including assembly documents and Bills of Materials (BOM), and maintained inventory systems to support prototype production.',
    ],
  },
]
