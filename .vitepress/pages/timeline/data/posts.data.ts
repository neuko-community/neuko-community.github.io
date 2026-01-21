import { EventType, Post, SourceType } from '../timeline.types'
import {
  fetchTweetData,
  mapWithConcurrency,
  type TweetDataMinimal
} from '../../../utils/tweetFetch'

type PostType = EventType.POST | EventType.THREAD | EventType.INTERVIEW | EventType.VIDEO | EventType.INTERVIEW
type PostDetails = Omit<Post, 'type' | 'tweet' | 'date'> & { type?: PostType }
type OfficialPostDetails = Omit<PostDetails, 'source'> & { source: SourceType.OFFICIAL }
type CommunityPostDetails = Omit<PostDetails, 'source'> & { source: SourceType.COMMUNITY }

const officialPosts: OfficialPostDetails[] = [

  // @austin_hurwitz
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/austin_hurwitz/status/2008737719871304099',
    id: '2008737719871304099'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/austin_hurwitz/status/2001705140873478450',
    id: '2001705140873478450'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/austin_hurwitz/status/1996666112868851753',
    id: '1996666112868851753'
  },

  // @boris0chuck
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/boris0chuck/status/2003556939188568413',
    id: '2003556939188568413'
  },

  // @greenie_sr

  // @neukoai
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/2013357568605765999',
    id: '2013357568605765999'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/2012218480636928007',
    id: '2012218480636928007'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/1977763395408429229',
    id: '1977763395408429229'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/1979268208340406384',
    id: '1979268208340406384'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/1980355518771392550',
    id: '1980355518771392550'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/1981125805104312473',
    id: '1981125805104312473'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/1981740247504269582',
    id: '1981740247504269582'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/1982894878280569063',
    id: '1982894878280569063'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/1984362507784351883',
    id: '1984362507784351883'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/1986152753412919577',
    id: '1986152753412919577'
  },
  {
    source: SourceType.OFFICIAL,
    type: EventType.POST,
    url: 'https://x.com/neukoai/status/1988703965694111829',
    id: '1988703965694111829'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/1989425770524225554',
    id: '1989425770524225554'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/1993801736142909814',
    id: '1993801736142909814'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/1995902340365185090',
    id: '1995902340365185090'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/1996332652492943710',
    id: '1996332652492943710'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/1998483693195899014',
    id: '1998483693195899014'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/1998848567587582362',
    id: '1998848567587582362'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/1999215138872918507',
    id: '1999215138872918507'
  },
  {
    source: SourceType.OFFICIAL,
    type: EventType.THREAD,
    url: 'https://x.com/neukoai/status/1999824937666941295',
    id: '1999824937666941295'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/opensea/status/1999827413421986236',
    id: '1999827413421986236'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/2001399818304840178',
    id: '2001399818304840178'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/2008635872254595310',
    id: '2008635872254595310'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/2008939518330827166',
    id: '2008939518330827166'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/2009756721275637907',
    id: '2009756721275637907'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/2010835979754525040',
    id: '2010835979754525040'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/2011106635662717284',
    id: '2011106635662717284'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/wallstreetbets/status/2011861685943075158',
    id: '2011861685943075158'
  },


  // @SQU1NCH
  {
    source: SourceType.OFFICIAL,
    type: EventType.VIDEO,
    url: 'https://x.com/SQU1NCH/status/2006509264664461714',
    id: '2006509264664461714'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/SQU1NCH/status/2003564428894109966',
    id: '2003564428894109966'
  },
  {
    source: SourceType.OFFICIAL,
    type: EventType.VIDEO,
    url: 'https://x.com/SQU1NCH/status/1997006321661489627',
    id: '1997006321661489627'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/SQU1NCH/status/1996605658758521234',
    id: '1996605658758521234'
  },
  {
    source: SourceType.OFFICIAL,
    type: EventType.THREAD,
    url: 'https://x.com/SQU1NCH/status/1996600123208372394',
    id: '1996600123208372394'
  }
]
const communityPosts: CommunityPostDetails[] = [
  // @afkboom
  {
    source: SourceType.COMMUNITY,
    url: 'https://x.com/afkboom/status/1998181754713354379',
    id: '1998181754713354379'
  },
  // @BAGFILLERR
  {
    source: SourceType.COMMUNITY,
    type: EventType.VIDEO,
    url: 'https://x.com/BAGFILLERR/status/2006082909417939424',
    id: '2006082909417939424'
  },
  {
    source: SourceType.COMMUNITY,
    type: EventType.THREAD,
    url: 'https://x.com/BAGFILLERR/status/1987997186039402591',
    id: '1987997186039402591'
  },

  // @DendiRedemption
  {
    source: SourceType.COMMUNITY,
    type: EventType.THREAD,
    url: 'https://x.com/DendiRedemption/status/1983974904870400150',
    id: '1983974904870400150'
  },

  // @eleven88eth
  {
    source: SourceType.COMMUNITY,
    type: EventType.THREAD,
    url: 'https://x.com/eleven88eth/status/1994247572785926543',
    id: '1994247572785926543'
  },

  // @feezybellz_ii
  {
    source: SourceType.COMMUNITY,
    type: EventType.THREAD,
    url: 'https://x.com/feezybellz_ii/status/2010276385198067880',
    id: '2010276385198067880'
  },

  //@ FSkifor
  {
    source: SourceType.COMMUNITY,
    url: 'https://x.com/FSkifor/status/2012287148515299478',
    id: '2012287148515299478'
  },

  // @kezo_futura
  {
    source: SourceType.COMMUNITY,
    type: EventType.VIDEO,
    url: 'https://x.com/kezo_futura/status/1993398379217584410',
    id: '1993398379217584410'
  },
  {
    source: SourceType.COMMUNITY,
    type: EventType.VIDEO,
    url: 'https://x.com/kezo_futura/status/1999738873237373020',
    id: '1999738873237373020'
  },



  // @LostSnow_Rin
  {
    source: SourceType.COMMUNITY,
    url: 'https://x.com/LostSnow_Rin/status/1981349935489409266',
    id: '1981349935489409266'
  },
  {
    source: SourceType.COMMUNITY,
    url: 'https://x.com/LostSnow_Rin/status/1988946547250495549',
    id: '1988946547250495549'
  },
  {
    source: SourceType.COMMUNITY,
    type: EventType.VIDEO,
    url: 'https://x.com/LostSnow_Rin/status/1991992692524699866',
    id: '1991992692524699866'
  },


  // @nuyorkinoeth
  {
    source: SourceType.COMMUNITY,
    url: 'https://x.com/nuyorkinoeth/status/1986177138764947467',
    id: '1986177138764947467'
  },

  // @opensea
  {
    source: SourceType.COMMUNITY,
    url: 'https://x.com/opensea/status/1996333608769061101',
    id: '1996333608769061101'
  },

  // @phygitals
  {
    source: SourceType.COMMUNITY,
    url: 'https://x.com/phygitals/status/1997006280628621751',
    id: '1997006280628621751'
  },

  // @solana
  {
    source: SourceType.COMMUNITY,
    url: 'https://x.com/solana/status/1995959776828948609',
    id: '1995959776828948609',
  },

  // @solanaspaces
  {
    source: SourceType.COMMUNITY,
    url: 'https://x.com/solanaspaces/status/2004193154766143920',
    id: '2004193154766143920'
  },

  // @satoshi_owl
  {
    source: SourceType.COMMUNITY,
    url: 'https://x.com/satoshi_owl/status/2013607280080511349',
    id: '2013607280080511349'
  },
]

//BROADCASST
// https://x.com/neukoai/status/1999467346663211438?s=20

const postData: PostDetails[] = [...officialPosts, ...communityPosts]

export declare const data: Post[]

export default {
  async load(): Promise<Post[]> {
    const postLookup = new Map()

    await mapWithConcurrency(postData, 6, async (post) => {
      const tweet = await fetchTweetData<TweetDataMinimal>(post.id, 'post')
      if (!tweet) {
        return
      }

      try {
        const existing = postLookup.get(post.id) ?? {
          type: post.type || EventType.POST,
          id: post.id,
          url: post.url,
          source: post.source
        }

        postLookup.set(post.id, {
          ...existing,
          date: new Date(tweet.created_at).toISOString().slice(0, 10),
          tweet,
          user: tweet.user.screen_name
        })
      } catch (e) {
        console.error(`Error loading post ${post.id}:`, (e as Error).message)
      }
    })
    return postData.map((post) => postLookup.get(post.id)!).filter(Boolean)
  }
}
