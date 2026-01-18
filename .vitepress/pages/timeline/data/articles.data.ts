import { Article, EventType, SourceType } from '../timeline.types'

type ArticleDetails = Omit<Article, 'type'>
type OfficialArticleDetails = Omit<ArticleDetails, 'source'> & { source: SourceType.OFFICIAL }
const officialArticles: OfficialArticleDetails[] = [
  {
    date: '2026-01-13',
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/2011048235322773546',
    title: 'Your Token is Broken',
    author: 'austin_hurwitz',
    image: 'https://pbs.twimg.com/media/G-itcIyXIAA-vcr?format=jpg&name=medium',
    id: '2011048235322773546'
  },
  {
    date: '2026-01-12',
    source: SourceType.OFFICIAL,
    url: 'https://x.com/austin_hurwitz/status/2010766430086610948',
    title: '$GBOY - Treasury Report (1/12/26)',
    author: 'austin_hurwitz',
    image: 'https://pbs.twimg.com/media/G-etVwHXMAASWoX?format=jpg&name=900x900',
    id: '2010766430086610948'
  },
  {
    date: '2026-01-14',
    source: SourceType.OFFICIAL,
    title: "IT'S $GBOY SEASON",
    author: 'neukoai',
    image: 'https://pbs.twimg.com/media/G8jy1TaWcAE5-60?format=jpg&name=medium',
    url: 'https://x.com/neukoai/status/2002140529551630525',
    id: '2002140529551630525'
  }
]

const communityArticles: ArticleDetails[] = [
  {
    date: '2026-01-07',
    source: SourceType.COMMUNITY,
    title: 'Kezo Futura',
    url: 'https://x.com/kezo_futura/status/2009003362423902536'
  },
  {
    date: '2026-01-07',
    source: SourceType.COMMUNITY,
    title: 'Receding Hare',
    url: 'https://x.com/RecedingHare/status/2009084639344816275?s=20'
  },
  {
    date: '2026-01-07',
    source: SourceType.COMMUNITY,
    title: 'Marcotics',
    url: 'https://x.com/Marcotics/status/2008954647055388929?s=20'
  },
  {
    date: '2026-01-01',
    source: SourceType.COMMUNITY,
    title: 'Marcotics',
    url: 'https://x.com/Marcotics/status/2006849517258207318?s=20'
  },
  {
    date: '2026-01-10',
    source: SourceType.COMMUNITY,
    title: 'Satoshi Owl',
    url: 'https://x.com/satoshi_owl/status/2009971714126446644?s=20'
  },
  {
    date: '2026-01-11',
    source: SourceType.COMMUNITY,
    title: 'DegenFigster',
    url: 'https://x.com/DegenFigster/status/2010392722129944763?s=20'
  },
  {
    date: '2026-01-11',
    source: SourceType.COMMUNITY,
    title: 'Airdoror0',
    url: 'https://x.com/airdoror0/status/2010370941772255575?s=20'
  },
  {
    date: '2026-01-12',
    source: SourceType.OFFICIAL,
    title: 'Austin Hurwitz',
    url: 'https://x.com/austin_hurwitz/status/2010766430086610948?s=20'
  },
  {
    date: '2026-01-13',
    source: SourceType.OFFICIAL,
    title: 'Austin Hurwitz',
    url: 'https://x.com/austin_hurwitz/status/2011048235322773546?s=20'
  },
  {
    date: '2026-01-13',
    source: SourceType.COMMUNITY,
    title: 'Airdoror0',
    url: 'https://x.com/airdoror0/status/2011101017484742870?s=20'
  },
  {
    date: '2026-01-14',
    source: SourceType.COMMUNITY,
    author: 'airdoror0',
    image: 'https://pbs.twimg.com/media/G-qbY-vbQAI45Xf?format=jpg&name=900x900',
    title: 'This Isn’t Slow Growth. It’s a Behavioral Filter',
    subtitle:
      'Airdoror0 on the slow growth of the crypto market and how it is a behavioral filter.',
    url: 'https://x.com/airdoror0/status/2011600600933527822?s=20'
  },
  {
    date: '2026-01-14',
    source: SourceType.COMMUNITY,
    title: '0xNickcrypto',
    url: 'https://x.com/0xNickcrypto/status/2011560958569640268?s=20'
  },
  {
    date: '2026-01-14',
    source: SourceType.COMMUNITY,
    title: 'Receding Hare',
    url: 'https://x.com/RecedingHare/status/2011476675469378013?s=20'
  }
]

const articleData: ArticleDetails[] = [...officialArticles, ...communityArticles]

export declare const data: Article[]

export default {
  async load(): Promise<Article[]> {
    const articleLookup = new Map()

    await Promise.all(
      articleData.map(async (article) => {
        const baseArticle: Article = {
          type: EventType.ARTICLE,
          ...article
        }

        if (!article.id) {
          articleLookup.set(article.url, baseArticle)
          return
        }

        try {
          const res = await fetch(`https://react-tweet.vercel.app/api/tweet/${article.id}`)
          if (!res.ok) throw new Error(`Status ${res.status}`)
          const json = await res.json()

          if (!json.data) {
            console.warn(`No data found for article ${article.id}`)
            articleLookup.set(article.id, baseArticle)
            return
          }

          articleLookup.set(article.id, {
            ...baseArticle,
            date: new Date(json.data.created_at).toISOString().slice(0, 10),
            tweet: json.data
          })
        } catch (e) {
          console.error(`Error loading article ${article.id}:`, (e as Error).message)
          articleLookup.set(article.id, baseArticle)
        }
      })
    )
    return articleData
      .map((article) => articleLookup.get(article.id ?? article.url)!)
      .filter(Boolean)
  }
}
