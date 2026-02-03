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
      title: 'GBOYSPECIAL Prompt Library',
      description: 'A library of prompts for the GBOYSPECIAL AI tool.',
      image: '/images/prompt-library.jpeg',
      contributors: ['FSkifor'],
      link: 'https://www.gboy-lib.art/feed'
    },
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
    },
    {
      title: 'Operative Identity Card',
      description: 'Create and download your custom ID with your hooded PFP, Operative Type and Number.',
      image: '/images/gboy-identity-card.jpg',
      contributors: ['feezybellz_ii'],
      link: 'https://neukoai.feezybellz.me/dp/'
    }
  ]
}
