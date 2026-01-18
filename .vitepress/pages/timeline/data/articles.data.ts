import { Article, EventType, SourceType } from '../timeline.types'
import {
  fetchTweetData,
  mapWithConcurrency,
  type TweetDataMinimal
} from '../../../utils/tweetFetch'

type ArticleDetails = Omit<Article, 'type' | 'date'> & { date?: string }
type OfficialArticleDetails = Omit<ArticleDetails, 'source'> & { source: SourceType.OFFICIAL }
const officialArticles: OfficialArticleDetails[] = [
  // @austin_hurwitz
  {
    source: SourceType.OFFICIAL,
    author: 'austin_hurwitz',
    image: 'https://pbs.twimg.com/media/G-itcIyXIAA-vcr?format=jpg&name=medium',
    title: 'Your Token is Broken',
    url: 'https://x.com/neukoai/status/2011048235322773546',
    id: '2011048235322773546'
  },
  {
    source: SourceType.OFFICIAL,
    author: 'austin_hurwitz',
    image: 'https://pbs.twimg.com/media/G-etVwHXMAASWoX?format=jpg&name=900x900',
    title: '$GBOY - Treasury Report (1/12/26)',
    url: 'https://x.com/austin_hurwitz/status/2010766430086610948',
    id: '2010766430086610948'
  },
  {
    source: SourceType.OFFICIAL,
    author: 'austin_hurwitz',
    image: 'https://pbs.twimg.com/media/G-BDZ-7XMAAVM8P?format=jpg&name=medium',
    title: '$GBOY: The Fastest Growing IP in Crypto - Introducing Animate',
    url: 'https://x.com/austin_hurwitz/status/2008679924199235718',
    id: '2008679924199235718'
  },
  {
    source: SourceType.OFFICIAL,
    author: 'austin_hurwitz',
    image: 'https://pbs.twimg.com/media/G7WitsRXQAAnoMo?format=jpg&name=medium',
    title: 'How to Climb the G*BOY Leaderboard (Season 1) ',
    url: 'https://x.com/austin_hurwitz/status/1996683325990215684',
    id: '1996683325990215684'
  },
  {
    source: SourceType.OFFICIAL,
    author: 'austin_hurwitz',
    image: 'https://pbs.twimg.com/media/G7RkTzCWMAA02Dj?format=jpg&name=medium',
    title: '$GBOY is Coming to Solana',
    url: 'https://x.com/austin_hurwitz/status/1996336634946805949',
    id: '1996336634946805949'
  },
  {
    source: SourceType.OFFICIAL,
    author: 'austin_hurwitz',
    image: 'https://pbs.twimg.com/media/G6dfl5JWgAAO-5i?format=jpg&name=medium',
    title: "Pudgy Penguins, BE@RBRICK, & NFT's Central Dilemma",
    url: 'https://x.com/austin_hurwitz/status/1992668543469396198',
    id: '1992668543469396198'
  },
  {
    source: SourceType.OFFICIAL,
    author: 'austin_hurwitz',
    image: 'https://pbs.twimg.com/media/G6JoFcAXMAAX5Cc?format=jpg&name=medium',
    title: 'G*BOY App - Beta Release ',
    url: 'https://x.com/austin_hurwitz/status/1991268896830288357',
    id: '1991268896830288357'
  },
  {
    source: SourceType.OFFICIAL,
    author: 'austin_hurwitz',
    image: 'https://pbs.twimg.com/media/G5HjQbuXMAAL1s5?format=jpg&name=medium',
    title: 'The Attention Game',
    url: 'https://x.com/austin_hurwitz/status/1986618899870183486',
    id: '1986618899870183486'
  },
  {
    source: SourceType.OFFICIAL,
    author: 'austin_hurwitz',
    image: 'https://pbs.twimg.com/media/G4nV1xbWcAE5eA1?format=jpg&name=medium',
    title: 'Wen App?',
    url: 'https://x.com/austin_hurwitz/status/1984706205139321114',
    id: '1984706205139321114'
  },
  {
    source: SourceType.OFFICIAL,
    author: 'austin_hurwitz',
    image: 'https://pbs.twimg.com/media/G4cLgqRW4AAXjsX?format=jpg&name=medium',
    title: 'The NFT Death Spiral (and How to Climb Out)',
    url: 'https://x.com/austin_hurwitz/status/1983569041097941062',
    id: '1983569041097941062'
  },
  {
    source: SourceType.OFFICIAL,
    author: 'austin_hurwitz',
    image: 'https://pbs.twimg.com/media/G4CMrsiXgAAK3j6?format=jpg&name=medium',
    title: 'Why Snakes Are Being Decentralized',
    url: 'https://x.com/austin_hurwitz/status/1981740564014834166',
    id: '1981740564014834166'
  },
  {
    source: SourceType.OFFICIAL,
    author: 'austin_hurwitz',
    image: 'https://pbs.twimg.com/media/G3p7mFoW0AA9w9H?format=jpg&name=medium',
    title: 'Why We Are Here',
    url: 'https://x.com/austin_hurwitz/status/1980031016082264323',
    id: '1980031016082264323'
  },
  {
    source: SourceType.OFFICIAL,
    author: 'austin_hurwitz',
    image: 'https://pbs.twimg.com/media/G3E8skBXwAA_Cjz?format=jpg&name=medium',
    title: 'Machiavelli, $VIBESTR, and Ideas Having Sex',
    url: 'https://x.com/austin_hurwitz/status/1977429231656173872',
    id: '1977429231656173872'
  },

  // @neukoai
  {
    source: SourceType.OFFICIAL,
    title: "IT'S $GBOY SEASON",
    author: 'neukoai',
    image: 'https://pbs.twimg.com/media/G8jy1TaWcAE5-60?format=jpg&name=medium',
    url: 'https://x.com/neukoai/status/2002140529551630525',
    id: '2002140529551630525'
  }
  // {
  //   source: SourceType.OFFICIAL,
  //   author: '',
  //   image: '',
  //   title: '',
  //   url: '',
  //   id: ''
  // },
]
type CommunityArticleDetails = Omit<ArticleDetails, 'source'> & {
  source: SourceType.COMMUNITY
}
const communityArticles: CommunityArticleDetails[] = [
  // @airdoror0
  {
    source: SourceType.COMMUNITY,
    author: 'airdoror0',
    image: 'https://pbs.twimg.com/media/G-8OqQia4AAbztF?format=jpg&name=medium',
    title: 'The Unspoken Quiet Period',
    url: 'https://x.com/airdoror0/status/2012852172212654310',
    id: '2012852172212654310'
  },
  {
    source: SourceType.COMMUNITY,
    author: 'airdoror0',
    image: 'https://pbs.twimg.com/media/G-qbY-vbQAI45Xf?format=jpg&name=900x900',
    title: 'This Isn’t Slow Growth. It’s a Behavioral Filter',
    url: 'https://x.com/airdoror0/status/2011600600933527822',
    id: '2011600600933527822'
  },
  {
    source: SourceType.COMMUNITY,
    author: 'airdoror0',
    image: 'https://pbs.twimg.com/media/G-jQ3iSbQAEnOY9?format=jpg&name=900x900',
    title: 'Durability Is Not an Accident — It’s Designed ',
    url: 'https://x.com/airdoror0/status/2011101017484742870',
    id: '2011101017484742870'
  },
  {
    source: SourceType.COMMUNITY,
    author: 'airdoror0',
    image: 'https://pbs.twimg.com/media/G-YzpMWbsAAXv_P?format=png&name=900x900',
    title: '. Don’t buy $GBOY — It’s a Mirror by Design',
    url: 'https://x.com/airdoror0/status/2010370941772255575',
    id: '2010370941772255575'
  },

  // @DegenFigster
  {
    source: SourceType.COMMUNITY,
    author: 'DegenFigster',
    image: 'https://pbs.twimg.com/media/G-ZZTTtWQAA3zIO?format=jpg&name=medium',
    title: 'From Lore to Covers: Building G*Boy Comics in the Neuko AI Universe',
    url: 'https://x.com/DegenFigster/status/2010392722129944763',
    id: '2010392722129944763'
  },

  // @kezo_futura
  {
    source: SourceType.COMMUNITY,
    author: 'kezo_futura',
    image: 'https://pbs.twimg.com/media/G-FmWHSbkAAy6Y2?format=jpg&name=medium',
    title: '$GBOY & THE AI STORYTELLING ERA: the next billion dollar meta',
    url: 'https://x.com/kezo_futura/status/2009003362423902536',
    id: '2009003362423902536'
  },

  // @Marcotics
  {
    date: '2026-01-07',
    source: SourceType.COMMUNITY,
    author: 'Marcotics',
    image: 'https://pbs.twimg.com/media/G-EmC52W0AAfvIR?format=jpg&name=small',
    title: 'Neuko Animation Spotlight',
    url: 'https://x.com/Marcotics/status/2008954647055388929',
    id: '2008954647055388929'
  },
  {
    source: SourceType.COMMUNITY,
    author: 'Marcotics',
    image: 'https://pbs.twimg.com/media/G9muvJoWwAAd5LH?format=jpg&name=medium',
    title: 'Neuko',
    url: 'https://x.com/Marcotics/status/2006849517258207318',
    id: '2006849517258207318'
  },

  // @RecedingHare
  {
    source: SourceType.COMMUNITY,
    author: 'RecedingHare',
    image: 'https://pbs.twimg.com/media/G-oyrp4agAAClCj?format=jpg&name=medium',
    title: 'The Neukoverse is coming alive',
    url: 'https://x.com/RecedingHare/status/2011476675469378013',
    id: '2011476675469378013'
  },
  {
    source: SourceType.COMMUNITY,
    author: 'RecedingHare',
    image: 'https://pbs.twimg.com/media/G-GyaqjWwAA1-Js?format=jpg&name=medium',
    title: 'G*Boy in continuous motion',
    url: 'https://x.com/RecedingHare/status/2009084639344816275',
    id: '2009084639344816275'
  },

  //@satoshi_owl
  {
    source: SourceType.COMMUNITY,
    author: 'satoshi_owl',
    image: 'https://pbs.twimg.com/media/G-TSJy2XAAAdPS7?format=jpg&name=medium',
    title: 'NEUKO So Far, Episode 2 Starts Now',
    url: 'https://x.com/satoshi_owl/status/2009971714126446644',
    id: '2009971714126446644'
  },
  {
    source: SourceType.COMMUNITY,
    author: 'satoshi_owl',
    image: 'https://pbs.twimg.com/media/G-5mSLUXsAA_JYj?format=jpg&name=medium',
    title: 'How to Fix Your Entire Life in One Day (According to NEUKO Internal Logs)',
    url: 'https://x.com/satoshi_owl/status/2012660386713997693',
    id: '2012660386713997693'
  },

  // 0xNickcrypto
  {
    source: SourceType.COMMUNITY,
    author: '0xNickcrypto',
    image: 'https://pbs.twimg.com/media/G-p71opbQDklnWk?format=jpg&name=medium',
    title: 'EPISODE 2 LOADING…',
    url: 'https://x.com/0xNickcrypto/status/2011560958569640268',
    id: '2011560958569640268'
  }
]

const articleData: ArticleDetails[] = [...officialArticles, ...communityArticles]

export declare const data: Article[]

export default {
  async load(): Promise<Article[]> {
    const articleLookup = new Map()

    await mapWithConcurrency(articleData, 6, async (article) => {
      if (!article.id) {
        return
      }

      const tweet = await fetchTweetData<TweetDataMinimal>(article.id, 'article')
      if (!tweet) {
        return
      }

      try {
        articleLookup.set(article.id, {
          type: EventType.ARTICLE,
          ...article,
          date: new Date(tweet.created_at).toISOString().slice(0, 10),
          tweet
        })
      } catch (e) {
        console.error(`Error loading article ${article.id}:`, (e as Error).message)
      }
    })
    return articleData
      .map((article) => articleLookup.get(article.id ?? article.url)!)
      .filter(Boolean)
  }
}
