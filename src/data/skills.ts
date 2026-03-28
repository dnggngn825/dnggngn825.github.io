export interface SkillGroup {
  category: string
  icon:     string
  items:    string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Proficiency',
    icon:     'code',
    items:    ['C', 'C++', 'Python', 'Java', 'ROS', 'MATLAB', 'Simulink', 'OOP'],
  },
  {
    category: 'Familiar',
    icon:     'layers',
    items:    ['CSS', 'JavaScript', 'C#', 'UX/UI', 'MS Office', 'ANSYS'],
  },
  {
    category: 'Tools',
    icon:     'construction',
    items:    ['Git', 'LaTeX', 'Fusion 360', 'Arduino', 'Ubuntu/Linux', 'NVIDIA Jetson'],
  },
]
