export interface ExperienceEntry {
  period:  string
  title:   string
  company: string
  type?:   string
  bullets: string[]
}

export const experiences: ExperienceEntry[] = [
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
    period:  '11/2020 – 3/2021',
    title:   'IoT Product Developer Officer',
    company: 'AquaTerra',
    type:    'Internship',
    bullets: [
      'Developed IoT firmware and software solutions for agricultural sensor deployment.',
      'Collaborated with cross-functional teams to integrate hardware and software subsystems.',
      'Contributed to prototyping and testing of embedded systems in field conditions.',
    ],
  },
]
