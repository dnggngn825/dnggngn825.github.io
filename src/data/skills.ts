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
    items:    ['.NET Framework', 'Node.js', 'Entity Framework', 'AWS Amplify', 'DynamoDB', 'RESTful APIs', 'GraphQL'],
  },
  {
    category: 'Testing',
    icon:     'bug_report',
    items:    ['Vitest', 'Jest', 'Jasmine', 'NUnit'],
  },
  {
    category: 'DevOps & Tooling',
    icon:     'construction',
    items:    ['Git', 'CI/CD', 'ESLint'],
  },
  {
    category: 'Engineering',
    icon:     'precision_manufacturing',
    items:    ['ROS', 'MATLAB', 'Simulink'],
  },
]
