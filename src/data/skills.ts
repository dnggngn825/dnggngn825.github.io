export interface SkillGroup {
  category: string
  icon:     string
  items:    string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    icon:     'code',
    items:    ['TypeScript', 'JavaScript (ES6+)', 'C#', 'Python', 'Java', 'C/C++', 'SQL'],
  },
  {
    category: 'Frontend Frameworks & Libraries',
    icon:     'web',
    items:    ['React', 'Vue 3', 'Vite'],
  },
  {
    category: 'Backend & Cloud',
    icon:     'layers',
    items:    ['Node.js', 'ASP.NET Core', '.NET Framework', 'Entity Framework', 'RESTful APIs', 'GraphQL', 'AWS', 'AWS Amplify'],
  },
  {
    category: 'Testing',
    icon:     'bug_report',
    items:    ['Vitest', 'Jest', 'Jasmine', 'NUnit'],
  },
  {
    category: 'DevOps & Tooling',
    icon:     'construction',
    items:    ['Git', 'CI/CD', 'GitHub Actions', 'Docker', 'ESLint'],
  },
  {
    category: 'Databases',
    icon:     'storage',
    items:    ['SQL Server', 'DynamoDB', 'PostgreSQL'],
  },
  {
    category: 'Engineering',
    icon:     'precision_manufacturing',
    items:    ['ROS', 'MATLAB', 'Simulink'],
  },
]
