export interface EducationEntry {
  period:      string
  degree:      string
  institution: string
  wam:         number
}

export const education: EducationEntry[] = [
  {
    period:      '7/2019 – 12/2021',
    degree:      'Master of Engineering (Mechatronics)',
    institution: 'University of Melbourne',
    wam:         78.25,
  },
  {
    period:      '7/2016 – 6/2019',
    degree:      'Bachelor of Science – Mechatronics',
    institution: 'University of Melbourne',
    wam:         74,
  },
]
