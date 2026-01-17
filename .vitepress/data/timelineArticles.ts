import { EventType, SourceType, TimelineEvent } from './timeline.types'

export interface Article extends TimelineEvent {
  title: string
  postUrl: string
  author?: string
  subtitle?: string
  image?: string
}

interface BaseArticleDetails {
  source: SourceType
  date: string
  title: string
  postUrl: string
  author?: string
  subtitle?: string
  image?: string
}

export const articlesData: BaseArticleDetails[] = [
  {
    date: '2026-01-07',
    source: SourceType.COMMUNITY,
    title: 'Kezo Futura',
    postUrl: 'https://x.com/kezo_futura/status/2009003362423902536'
  },
  {
    date: '2026-01-07',
    source: SourceType.COMMUNITY,
    title: 'Receding Hare',
    postUrl: 'https://x.com/RecedingHare/status/2009084639344816275?s=20'
  },
  {
    date: '2026-01-07',
    source: SourceType.COMMUNITY,
    title: 'Marcotics',
    postUrl: 'https://x.com/Marcotics/status/2008954647055388929?s=20'
  },
  {
    date: '2026-01-01',
    source: SourceType.COMMUNITY,
    title: 'Marcotics',
    postUrl: 'https://x.com/Marcotics/status/2006849517258207318?s=20'
  },
  {
    date: '2026-01-10',
    source: SourceType.COMMUNITY,
    title: 'Satoshi Owl',
    postUrl: 'https://x.com/satoshi_owl/status/2009971714126446644?s=20'
  },
  {
    date: '2026-01-11',
    source: SourceType.COMMUNITY,
    title: 'DegenFigster',
    postUrl: 'https://x.com/DegenFigster/status/2010392722129944763?s=20'
  },
  {
    date: '2026-01-11',
    source: SourceType.COMMUNITY,
    title: 'Airdoror0',
    postUrl: 'https://x.com/airdoror0/status/2010370941772255575?s=20'
  },
  {
    date: '2026-01-12',
    source: SourceType.OFFICIAL,
    title: 'Austin Hurwitz',
    postUrl: 'https://x.com/austin_hurwitz/status/2010766430086610948?s=20'
  },
  {
    date: '2026-01-13',
    source: SourceType.OFFICIAL,
    title: 'Austin Hurwitz',
    postUrl: 'https://x.com/austin_hurwitz/status/2011048235322773546?s=20'
  },
  {
    date: '2026-01-13',
    source: SourceType.COMMUNITY,
    title: 'Airdoror0',
    postUrl: 'https://x.com/airdoror0/status/2011101017484742870?s=20'
  },
  {
    date: '2026-01-14',
    source: SourceType.COMMUNITY,
    author: 'airdoror0',
    image: 'https://pbs.twimg.com/media/G-qbY-vbQAI45Xf?format=jpg&name=900x900',
    title: 'This Isn’t Slow Growth. It’s a Behavioral Filter',
    postUrl: 'https://x.com/airdoror0/status/2011600600933527822?s=20'
  },
  {
    date: '2026-01-14',
    source: SourceType.COMMUNITY,
    title: '0xNickcrypto',
    postUrl: 'https://x.com/0xNickcrypto/status/2011560958569640268?s=20'
  },
  {
    date: '2026-01-14',
    source: SourceType.COMMUNITY,
    title: 'Receding Hare',
    postUrl: 'https://x.com/RecedingHare/status/2011476675469378013?s=20'
  }
]

export const articles: Article[] = articlesData.map((article) => ({
  type: EventType.ARTICLE,
  ...article
}))
