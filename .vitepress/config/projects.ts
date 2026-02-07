export type ProjectEntry = {
  title: string
  description: string
  image?: string
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
      image: '/images/comics.jpg',
      contributors: ['DegenFigster'],
      link: '/comics'
    },
    {
      title: 'Operative Identity Card',
      description: 'Create and download your custom ID with your hooded PFP, Operative Type and Number.',
      image: '/images/gboy-identity-card.jpg',
      contributors: ['feezybellz_ii'],
      link: 'https://neukoai.feezybellz.me/dp/'
    },
    {
      title: 'Bloc Translator',
      description: 'A tool to translate Bloc encrypted messages into English.',
      image: '/images/bloc-translator.jpg',
      contributors: ['HelveticVault'],
      link: 'https://thebloctranslator.vercel.app/'
    },
    {
      title: 'G*BOY Character Selector Skill for AI Assistants',
      description: `Turns your personal assistant into one of our characters from the neuko ep 2 rollout`,
      contributors: ['austin_hurwitz'],
      link: 'https://github.com/basedmereum/gboy-character-openclaw/tree/main'
    }, {
      title: 'Bloc Chat',
      description: 'A chatbot that enables you to chat with the EP2 characters.',
      image: '/images/bloc-chat.jpg',
      contributors: ['FSkifor'],
      link: 'https://www.bloc-chat.online/'
    },
    {
      title: 'The Bloc Radio',
      description: 'Playlist of Bloc hits',
      image: 'https://www.bloc.rocks/walkman-hi-ref.png',
      contributors: ['afkboom'],
      link: 'https://www.bloc.rocks'
    }
  ]
}
