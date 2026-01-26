import { Article, EventType } from '../timeline.types'
import {
  loadTweets,
} from '../../../utils/tweetFetch'

type ArticleDetails = Omit<Article, 'type' | 'date' | 'source' | 'id'>
const officialArticles: ArticleDetails[] = [
  // @austin_hurwitz
  {
    image: 'https://pbs.twimg.com/media/G_MruaGWQAAlMGz?format=jpg&name=medium',
    title: "What Netflix's Earnings Reveal About the Future of Media",
    url: 'https://x.com/austin_hurwitz/status/2014001759169990881',
  },
  {
    image: 'https://pbs.twimg.com/media/G--b64dWAAAdxPn?format=jpg&name=medium',
    title: 'What Happens After Content Becomes Free',
    url: 'https://x.com/austin_hurwitz/status/2012999151991058745',
  },
  {
    image: 'https://pbs.twimg.com/media/G-itcIyXIAA-vcr?format=jpg&name=medium',
    title: 'Your Token is Broken',
    url: 'https://x.com/neukoai/status/2011048235322773546',
  },
  {
    image: 'https://pbs.twimg.com/media/G-etVwHXMAASWoX?format=jpg&name=900x900',
    title: '$GBOY - Treasury Report (1/12/26)',
    url: 'https://x.com/austin_hurwitz/status/2010766430086610948',
  },
  {
    image: 'https://pbs.twimg.com/media/G-BDZ-7XMAAVM8P?format=jpg&name=medium',
    title: '$GBOY: The Fastest Growing IP in Crypto - Introducing Animate',
    url: 'https://x.com/austin_hurwitz/status/2008679924199235718',
  },
  {
    image: 'https://pbs.twimg.com/media/G7WitsRXQAAnoMo?format=jpg&name=medium',
    title: 'How to Climb the G*BOY Leaderboard (Season 1) ',
    url: 'https://x.com/austin_hurwitz/status/1996683325990215684',
  },
  {
    image: 'https://pbs.twimg.com/media/G7RkTzCWMAA02Dj?format=jpg&name=medium',
    title: '$GBOY is Coming to Solana',
    url: 'https://x.com/austin_hurwitz/status/1996336634946805949',
  },
  {
    image: 'https://pbs.twimg.com/media/G6dfl5JWgAAO-5i?format=jpg&name=medium',
    title: "Pudgy Penguins, BE@RBRICK, & NFT's Central Dilemma",
    url: 'https://x.com/austin_hurwitz/status/1992668543469396198',
  },
  {
    image: 'https://pbs.twimg.com/media/G6JoFcAXMAAX5Cc?format=jpg&name=medium',
    title: 'G*BOY App - Beta Release ',
    url: 'https://x.com/austin_hurwitz/status/1991268896830288357',
  },
  {
    image: 'https://pbs.twimg.com/media/G5HjQbuXMAAL1s5?format=jpg&name=medium',
    title: 'The Attention Game',
    url: 'https://x.com/austin_hurwitz/status/1986618899870183486',
  },
  {
    image: 'https://pbs.twimg.com/media/G4nV1xbWcAE5eA1?format=jpg&name=medium',
    title: 'Wen App?',
    url: 'https://x.com/austin_hurwitz/status/1984706205139321114',
  },
  {
    image: 'https://pbs.twimg.com/media/G4cLgqRW4AAXjsX?format=jpg&name=medium',
    title: 'The NFT Death Spiral (and How to Climb Out)',
    url: 'https://x.com/austin_hurwitz/status/1983569041097941062',
  },
  {
    image: 'https://pbs.twimg.com/media/G4CMrsiXgAAK3j6?format=jpg&name=medium',
    title: 'Why Snakes Are Being Decentralized',
    url: 'https://x.com/austin_hurwitz/status/1981740564014834166',
  },
  {
    image: 'https://pbs.twimg.com/media/G3p7mFoW0AA9w9H?format=jpg&name=medium',
    title: 'Why We Are Here',
    url: 'https://x.com/austin_hurwitz/status/1980031016082264323',
  },
  {
    image: 'https://pbs.twimg.com/media/G3E8skBXwAA_Cjz?format=jpg&name=medium',
    title: 'Machiavelli, $VIBESTR, and Ideas Having Sex',
    url: 'https://x.com/austin_hurwitz/status/1977429231656173872',
  },

  // @neukoai
  {
    title: "IT'S $GBOY SEASON",
    image: 'https://pbs.twimg.com/media/G8jy1TaWcAE5-60?format=jpg&name=medium',
    url: 'https://x.com/neukoai/status/2002140529551630525',
  }
  // {
  //   author: '',
  //   image: '',
  //   title: '',
  //   url: '',
  //   id: ''
  // },
]
const communityArticles: ArticleDetails[] = [
  // @airdoror0
  {
    image: 'https://pbs.twimg.com/media/G_MD4aVasAAkPff?format=jpg&name=medium',
    title: '👁️Why G*BOY is stronger when he isn’t explained👁️',
    url: 'https://x.com/airdoror0/status/2013959367624933533',
  },
  {
    image: 'https://pbs.twimg.com/media/G-8OqQia4AAbztF?format=jpg&name=medium',
    title: 'The Unspoken Quiet Period',
    url: 'https://x.com/airdoror0/status/2012852172212654310',
  },
  {
    image: 'https://pbs.twimg.com/media/G-qbY-vbQAI45Xf?format=jpg&name=900x900',
    title: 'This Isn’t Slow Growth. It’s a Behavioral Filter',
    url: 'https://x.com/airdoror0/status/2011600600933527822',
  },
  {
    image: 'https://pbs.twimg.com/media/G-jQ3iSbQAEnOY9?format=jpg&name=900x900',
    title: 'Durability Is Not an Accident — It’s Designed ',
    url: 'https://x.com/airdoror0/status/2011101017484742870',
  },
  {
    image: 'https://pbs.twimg.com/media/G-YzpMWbsAAXv_P?format=png&name=900x900',
    title: '. Don’t buy $GBOY — It’s a Mirror by Design',
    url: 'https://x.com/airdoror0/status/2010370941772255575',
  },



  // @DegenFigster
  {
    image: 'https://pbs.twimg.com/media/G-ZZTTtWQAA3zIO?format=jpg&name=medium',
    title: 'From Lore to Covers: Building G*Boy Comics in the Neuko AI Universe',
    url: 'https://x.com/DegenFigster/status/2010392722129944763',
  },

  // @FSkifor
  {
    image: 'https://pbs.twimg.com/media/G-8dQI5WMAE6jx1?format=jpg&name=medium',
    title: 'HARMONY: THE COMPLETE SYMPHONY OF DISTORTION',
    url: 'https://x.com/FSkifor/status/2012868848475684931',
  },

  // @kezo_futura
  {
    image: 'https://pbs.twimg.com/media/G-FmWHSbkAAy6Y2?format=jpg&name=medium',
    title: '$GBOY & THE AI STORYTELLING ERA: the next billion dollar meta',
    url: 'https://x.com/kezo_futura/status/2009003362423902536',
  },

  // @Marcotics
  {
    image: 'https://pbs.twimg.com/media/G-EmC52W0AAfvIR?format=jpg&name=small',
    title: 'Neuko Animation Spotlight',
    url: 'https://x.com/Marcotics/status/2008954647055388929',
  },
  {
    image: 'https://pbs.twimg.com/media/G9muvJoWwAAd5LH?format=jpg&name=medium',
    title: 'Neuko',
    url: 'https://x.com/Marcotics/status/2006849517258207318',
  },

  // @RecedingHare
  {
    image: 'https://pbs.twimg.com/media/G-oyrp4agAAClCj?format=jpg&name=medium',
    title: 'The Neukoverse is coming alive',
    url: 'https://x.com/RecedingHare/status/2011476675469378013',
  },
  {
    image: 'https://pbs.twimg.com/media/G-GyaqjWwAA1-Js?format=jpg&name=medium',
    title: 'G*Boy in continuous motion',
    url: 'https://x.com/RecedingHare/status/2009084639344816275',
  },



  //@satoshi_owl
  {
    image: 'https://pbs.twimg.com/media/G-TSJy2XAAAdPS7?format=jpg&name=medium',
    title: 'NEUKO So Far, Episode 2 Starts Now',
    url: 'https://x.com/satoshi_owl/status/2009971714126446644',
  },
  {
    image: 'https://pbs.twimg.com/media/G-5mSLUXsAA_JYj?format=jpg&name=medium',
    title: 'How to Fix Your Entire Life in One Day (According to NEUKO Internal Logs)',
    url: 'https://x.com/satoshi_owl/status/2012660386713997693',
  },

  // @VipulPapriwal
  {
    image: 'https://pbs.twimg.com/media/G_HU1g4XIAADTnv?format=jpg&name=medium',
    title: 'The G*BOY Difference: How This Community Doesn’t Just Consume Culture But Makes It',
    url: 'https://x.com/VipulPapriwal/status/2013624874959544361',
  },

  // @0xChromospace
  {
    image: 'https://pbs.twimg.com/media/G--NlF4WwAEsu3u?format=jpg&name=medium',
    title: 'Simple Prompts = Great Gboy Images: My Workflow on gboyspecial.com',
    url: 'https://x.com/0xChromospace/status/2013260307905364478',
  },

  // 0xNickcrypto
  {
    image: 'https://pbs.twimg.com/media/G-p71opbQDklnWk?format=jpg&name=medium',
    title: 'EPISODE 2 LOADING…',
    url: 'https://x.com/0xNickcrypto/status/2011560958569640268',
  }
]

const articleData: ArticleDetails[] = [...officialArticles, ...communityArticles]

export declare const data: Article[]

export default {
  async load(): Promise<Article[]> {
    return await loadTweets(articleData, EventType.ARTICLE)
  }
}
