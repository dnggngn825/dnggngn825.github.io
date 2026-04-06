export interface SkillGroup {
  category: string
  icon:     string
  items:    string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Primary',
    icon:     'code',
    items:    ['TypeScript', 'JavaScript (ES6+)', 'Vue 3', 'Node.js'],
  },
  {
    category: 'Backend & Platform',
    icon:     'layers',
    items:    ['.NET Framework', 'C#', 'RESTful APIs', 'Entity Framework'],
  },
  {
    category: 'Testing & Tooling',
    icon:     'construction',
    items:    ['Vitest', 'Jest', 'Jasmine', 'NUnit', 'ESLint', 'Git', 'CI/CD'],
  },
  {
    category: 'Other (Academic)',
    icon:     'school',
    items:    ['Python', 'C/C++', 'Java', 'SQL', 'ROS', 'MATLAB', 'Simulink'],
  },
]
