export type ProjectEntry = {
  title: string
  description: string
  image: string
  contributors: string[]
  link: string
}

export const projectsConfig: {
  title: string
  description: string
  projects: ProjectEntry[]
} = {
  title: 'Projects',
  description: 'Community-led projects across the Neuko universe. Dive in and explore.',
  projects: [
    {
      title: 'Pathogenz TCG',
      description: 'A collectible trading card game built by badge-holding community members.',
      image: '/images/pathogenz.jpg',
      contributors: ['PathogenzTCG', '0161cassius'],
      link: '/pathogenz'
    },
    {
      title: 'Comics',
      description: 'Community-made comic book collection inspired by Neuko characters.',
      image: '/images/img-1.jpg',
      contributors: ['DegenFigster'],
      link: '/comics'
    }
  ]
}
