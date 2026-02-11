import { withBase } from 'vitepress'

export type ProjectEntry = {
  title: string
  description: string
  image?: string
  contributors: string[]
  link: string
}

// Local image paths (no withBase here — applied in component so base is correct in production).
// Use full URLs for external images (GitHub opengraph, etc.).
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
      link: withBase('/pathogenz')
    },
    {
      title: 'Comics',
      description: 'Community-made comic book collection inspired by Neuko characters.',
      image: '/images/comic.jpeg',
      contributors: ['DegenFigster'],
      link: withBase('/comics')
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
      image: '/images/bloc-translator.jpeg',
      contributors: ['HelveticVault'],
      link: 'https://thebloctranslator.vercel.app/'
    },
    {
      title: 'G*BOY Character Selector',
      description: `An OpenCLAW skill for switching your agent's personality between curated characters from the G*BOY universe.`,
      image: 'https://opengraph.githubassets.com/1/https://github.com/basedmereum/gboy-character-openclaw/tree/main',
      contributors: ['austin_hurwitz'],
      link: 'https://github.com/basedmereum/gboy-character-openclaw/tree/main'
    },
    {
      title: "Solprism",
      description: 'SOLPRISM adds cryptographic accountability to AI agent payments. Before an agent sends USDC, it commits a hash of its reasoning onchain.',
      image: 'https://opengraph.githubassets.com/1/https://github.com/basedmereum/solprism-usdc',
      contributors: ['basedmereum'],
      link: 'https://github.com/basedmereum/solprism-usdc'
    },
    {
      title: 'AI Journal',
      description: 'An AI-powered journaling web app with local Markdown storage and Claude-powered reflection.',
      image: 'https://opengraph.githubassets.com/1/https://github.com/basedmereum/ai-journal',
      contributors: ['austin_hurwitz'],
      link: 'https://github.com/basedmereum/ai-journal',
    },
    {
      title: 'Bloc Chat',
      description: 'A chatbot that enables you to chat with the EP2 characters.',
      image: '/images/bloc-chat.png',
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
