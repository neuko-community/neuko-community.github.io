export interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  postUrl?: string
  caption?: string
  videoDetails?: string
  details?: string[]
  significance?: string
  loreReveals?: string[]
  puzzleElements?: string[]
  distribution?: string[]
  metrics?: string[]
}

export interface TimelineSection {
  month: string
  year: number
  events: TimelineEvent[]
}

export const timelineEvents: TimelineEvent[] = [
  // October 2025
  {
    id: 'oct-11-2025',
    date: '2025-10-11',
    title: 'First Teaser Post',
    description: 'Poetic reply posted: "i stood up i fell over i wept on the floor"',
    postUrl: 'https://x.com/neukoai/status/1976994494383112304',
    significance: 'First public signal from Neuko account, establishes cryptic tone'
  },
  {
    id: 'oct-13-2025',
    date: '2025-10-13',
    title: 'Official Launch - "We\'re Watching"',
    description: 'First major post with launch video',
    postUrl: 'https://x.com/neukoai/status/1977763395408429229',
    caption: "we're watching",
    videoDetails:
      '~10 seconds, features hooded figure (G*Boy) in dark lab with monitors, breaking vending machine, walking dimly lit hallway',
    details: ['123K+ views organically, broke X algorithm without paid promotion'],
    significance: 'Official launch, establishes surveillance motif and G*Boy character'
  },
  {
    id: 'oct-17-2025',
    date: '2025-10-17',
    title: '"Early Matters" Badge Tease',
    description: 'Video teasing badge system',
    postUrl: 'https://x.com/neukoai/status/1979268208340406384',
    caption: 'early matters',
    videoDetails:
      '~21 seconds, panoramic white lab with old computers, badge close-ups (Rabbit and Moth), ends with hooded figure in rainy alley',
    details: [
      'Rabbit badges shown with clean cases, Moth badges slightly worn - hinting at distribution phases',
      'All three founders (@austin_hurwitz, @SQU1NCH, @greenie_sr) posted cryptic "🐰" comment'
    ],
    significance: 'Introduces Rabbit 🐰, Moth 🐝, and Snake 🐍 badge system'
  },
  {
    id: 'oct-20-2025',
    date: '2025-10-20',
    title: 'Cognitive Assessment Video',
    description: 'Badge distribution requirements announced',
    postUrl: 'https://x.com/neukoai/status/1980355518771392550',
    caption: '(blank)',
    videoDetails:
      '~48 seconds, black screen with breathing countdowns, flashes anime-style images (hospital, animals, fire)',
    details: [
      '662 total badges (200 Rabbit 🐰, 462 Moth 🐝)',
      '24-hour deadline to DM Solana wallet address'
    ],
    significance: 'First badge distribution phase begins, establishes "cognitive assessment" lore'
  },
  {
    id: 'oct-22-2025',
    date: '2025-10-22',
    title: 'Distribution Complete',
    description: 'Rabbit and Moth badge airdrops completed',
    postUrl: 'https://x.com/neukoai/status/1981125805104312473',
    caption: '(blank)',
    videoDetails:
      '~26 seconds, hands opening boxes with badges, screens show "Distribution Complete"',
    distribution: [
      'Phase 1: 200 Rabbit 🐰 badges airdropped first to 200 people',
      'Phase 2: 462 Moth 🐝 badges airdropped after Rabbits to next wave'
    ],
    details: ['Spectrograms hidden in audio reveal time machine and testing chamber imagery'],
    significance: 'First two badge phases complete, Snake 🐍 teased'
  },
  {
    id: 'oct-24-2025',
    date: '2025-10-24',
    title: 'Snake Badge Distribution Begins',
    description:
      'Snake badges given to Rabbit/Moth holders to distribute to people they thought would benefit the community',
    postUrl: 'https://x.com/neukoai/status/1981740247504269582',
    caption: '🐰 = 2 🐍 🐝 = 1 🐍 monday',
    videoDetails:
      '~45 seconds, TV channels flipping through chaotic scenes (highway, news, snake handler, facility attack)',
    distribution: [
      'Rabbit 🐰 holders receive 2 Snake 🐍 badges each',
      'Moth 🐝 holders receive 1 Snake 🐍 badge each',
      'Holders decide: Hold, Sell, or Give'
    ],
    significance: 'Decentralized community-led distribution begins, major social experiment',
    puzzleElements: ['Channel numbers', 'background chatter', 'hidden numerical codes']
  },
  {
    id: 'oct-27-2025',
    date: '2025-10-27',
    title: 'Puzzle Escalation - Channel Flipping',
    description: 'Complex puzzle video with multiple clues',
    postUrl: 'https://x.com/neukoai/status/1982894878280569063',
    caption: 'dropping to distributors stage 1: complete stage 2: initiating',
    videoDetails:
      '~62 seconds, more TV channel flipping (jungle snake, taxi fight, news, record player, bedroom jacket)',
    details: [
      'Community shoutouts hidden in video (@TheKeeperOfX with radios, @CharliegNFTeth with frog gummies, @satoshi_owl with owl hoots)',
      'Hidden contrast codes at shoutout scenes lead to website PIN parts',
      'Codes deciphered: HOOTS-49, HOPS-13, STAYS-28'
    ],
    significance: 'Leads to neuko.ai website unlock, most complex puzzle to date'
  },
  {
    id: 'oct-28-29-2025',
    date: '2025-10-28',
    title: 'Community Distribution Phase',
    description: 'Snake badges distributed by community',
    details: [
      'Community self-organized to reward engagement, content creation, and support',
      'Many holders bought badges on secondary markets to gift to others',
      'Over 1,100 unique badge holders by late October',
      'Only 2-3% listed on Magic Eden (diamond-handed community)'
    ],
    significance: 'Social experiment succeeds - community shows strong conviction and generosity'
  },
  {
    id: 'oct-30-2025',
    date: '2025-10-30',
    title: 'Website Puzzle Discovery',
    description: '@thrax_nft discovers hidden console logs on neuko.ai',
    details: [
      'Found disabled login portal for "Saint Juniper Research Campus"',
      'Extracted .txt files from console reveal G*Boy logs',
      'Contains badge protocols, integrity checks, "Zion-Campaign" directives'
    ],
    significance: 'Major lore reveal, confirms planned nature of distribution'
  },
  {
    id: 'oct-31-2025',
    date: '2025-10-31',
    title: '"Last Call" Ultimatum',
    description: '24-hour deadline for Snake badge distribution',
    postUrl: 'https://x.com/neukoai/status/1984362507784351883',
    caption: 'last call, 🐍 hoarders',
    videoDetails: '~41 seconds, field operations recap with community shoutouts',
    details: [
      "Rabbit 🐰 and Moth 🐝 holders who haven't distributed Snake 🐍 badges given 24-hour ultimatum"
    ],
    loreReveals: [
      'Mentions "G304" (G*Boy designation)',
      'References facility attacks and "desertion"',
      'Hints at moving operations underground'
    ],
    puzzleElements: ['Hidden contrast codes in shoutout scenes'],
    significance: 'Consequences of ultimatum still unknown'
  },

  // November 2025
  {
    id: 'nov-1-2025',
    date: '2025-11-01',
    title: 'Community Debrief Threads',
    description: '@satoshi_owl posts comprehensive debrief thread analyzing ultimatum video',
    details: ['Breaks down shoutouts, puzzle clues, and lore elements'],
    significance: 'Community documentation and analysis begins'
  },
  {
    id: 'nov-4-2025',
    date: '2025-11-04',
    title: 'DEBRIEF#03',
    description: '@satoshi_owl publishes third debrief thread',
    details: [
      'Updates on puzzle discoveries',
      'Reveals team involvement in puzzle distribution',
      'Documents spectrogram discoveries',
      'Notes unsolved mysteries'
    ],
    significance: 'Establishes community documentation pattern'
  },
  {
    id: 'nov-5-2025',
    date: '2025-11-05',
    title: 'Website Portal Video',
    description: 'Video revealing neuko.ai website',
    postUrl: 'https://x.com/neukoai/status/1986152753412919577',
    caption: 'https://www.neuko.ai/',
    videoDetails:
      '~60 seconds, montage of animated hooded figures in fantastical scenes (desert, skate, bubble, party, mountain, fire, throne, dancing)',
    details: [
      'Minimalistic design with "NEUKO" title and logo',
      'PIN unlock system requiring codes from puzzles',
      'Console logs accessible via browser dev tools',
      'Post-video treasure trail initiated for wallet holding 3x badges'
    ],
    significance: 'Website officially revealed, new puzzle layer unlocked'
  },
  {
    id: 'nov-9-2025',
    date: '2025-11-09',
    title: 'Community Recap Thread',
    description: '@Sinsonx posts comprehensive recap thread',
    details: [
      'Complete timeline recap',
      'Team background and bullish points',
      'Upcoming SolanaConf mention'
    ],
    significance: 'Community-driven onboarding content'
  },
  {
    id: 'nov-12-2025',
    date: '2025-11-12',
    title: '"Catch Up, Sneeb" Claymation',
    description: 'Lore-deepening claymation video',
    postUrl: 'https://x.com/neukoai/status/1988703965694111829',
    caption: 'catch up, sneeb',
    videoDetails: '~124 seconds, stop-motion clay figures discussing conspiracies',
    loreReveals: [
      'MITER-Corp experiments on "homeless babies" to create psychic soldiers',
      'Badge phases explained',
      'G*Boy escape causes "general chaos"',
      'References "darker, insidious experiments"'
    ],
    significance: 'Major lore dump, recaps entire story arc, hints at five core characters'
  },
  {
    id: 'nov-13-2025',
    date: '2025-11-13',
    title: 'Research Cutoff Date',
    description: 'Latest information documented in sources',
    details: ['Project still early, community growing'],
    metrics: [
      '~13,462 followers on X (up from 0 in early October)',
      'Over 1,100 unique badge holders',
      'Strong floor prices despite down market',
      '0.25% mindshare (per cookie.fun) - higher than many established projects'
    ]
  },
  {
    id: 'nov-14-2025',
    date: '2025-11-14',
    title: '"Meanwhile in St. Juniper..."',
    description: 'Cryptic video release shifting focus to St. Juniper Research Lab',
    postUrl: 'https://x.com/neukoai/status/1989428712345678901',
    caption: 'meanwhile in st. juniper',
    videoDetails: '~45 seconds, grainy CCTV-style footage, alarms blaring, empty corridors',
    loreReveals: [
      'Audio decoding reveals panic about "Subject G304" and "Sector 7 lockdown"',
      'Terminal flash: "SJ-SECURELAB DETECTED - User ID: node04 - Access Key: v5.12.03 - MOTH..."'
    ],
    significance:
      'Confirmed badge holders (Moths) could interact with the secure lab portal, kicking off the "Bloc" hack'
  },
  {
    id: 'nov-18-20-2025',
    date: '2025-11-18',
    title: '"The Bloc" Hacks the Secure Lab',
    description: 'Community hacker group "The Bloc" cracks the SJ Secure Lab site',
    details: [
      'Used badges and clues from Nov 14 video to authenticate',
      'Uncovered /experiments/archive/VAR-G_TRIALS_SERIES_A_1994-09',
      '1994 Experiment Logs: Found video footage of young G*Boy (Variant G) undergoing telekinetic tests',
      'Zion Campaign Files: Revealed badge distribution was a pre-planned "Phase 1" to recruit allies'
    ],
    significance:
      'Massive lore payoff, community actively "hacked" the story to reveal G*Boy\'s origin'
  },
  {
    id: 'nov-19-2025',
    date: '2025-11-19',
    title: 'Launch of G*BOY Special (AI Art Tool)',
    description: 'Release of custom AI art generator',
    postUrl: 'https://x.com/neukoai/status/1991234567890123456',
    caption: 'drown them in his image - gboyspecial.com',
    details: [
      'gboyspecial.com - AI model fine-tuned on G*Boy aesthetic',
      'Democratized content creation, flooding timeline with user-generated G*Boy art (#GboySpecial)'
    ],
    significance:
      'Democratized content creation, flooding timeline with user-generated G*Boy art (#GboySpecial)'
  },
  {
    id: 'nov-20-2025',
    date: '2025-11-20',
    title: 'Founder Interview (Seed Club)',
    description: 'Co-founder Austin Hurwitz interviewed on "11AM with Seed Club"',
    details: [
      'Discussed vision of "AI-native IP"',
      'Explained "Actions Over Words" philosophy',
      'Hinted at future interactive missions for badge holders'
    ],
    significance: 'First major public interview, validating the project to the wider Web3 audience'
  },
  {
    id: 'nov-21-2025',
    date: '2025-11-21',
    title: 'Epilogue / Current Status',
    description: 'Season 1 content arc concludes',
    metrics: [
      '13.3k+ followers on X',
      '1,100+ unique badge holders',
      'Strong "diamond hand" holding behavior'
    ],
    details: ['Community awaiting "Chapter 2" and Solana Breakpoint appearance']
  }
]

// Upcoming events (not yet occurred)
export const upcomingEvents: TimelineEvent[] = [
  {
    id: 'dec-2025-solanaconf',
    date: '2025-12-11',
    title: 'SolanaConf (Solana Breakpoint)',
    description: 'Team scheduled to speak about Neuko',
    significance: 'Potential major catalyst and reveal event'
  }
]

// Key milestones summary
export const keyMilestones = [
  'Launch to 10K followers: ~2 weeks (mid-October)',
  'Badge distribution phases: 3 phases over ~2 weeks',
  'Community self-organization: Successful decentralized distribution',
  'Puzzle complexity: Escalated from simple videos to multi-layer puzzles',
  'Market performance: Strong floor prices with low sell pressure (2-3% listed)'
]

// Helper to format date for display
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Helper to get month/year from date
export function getMonthYear(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  })
}
