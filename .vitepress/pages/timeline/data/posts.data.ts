import { EventType, Post } from '../timeline.types'
import {
  loadTweets,
} from '../../../utils/tweetFetch'

type PostType = EventType.POST | EventType.THREAD | EventType.INTERVIEW | EventType.VIDEO | EventType.INTERVIEW
type PostDetails = Omit<Post, 'type' | 'tweet' | 'date' | 'id' | 'source'> & { type?: PostType }

const officialPosts: PostDetails[] = [

  // @austin_hurwitz
  {
    url: 'https://x.com/austin_hurwitz/status/2008737719871304099',
  },
  {
    url: 'https://x.com/austin_hurwitz/status/2001705140873478450',
  },
  {
    url: 'https://x.com/austin_hurwitz/status/1996666112868851753',
  },

  // @boris0chuck
  {
    url: 'https://x.com/boris0chuck/status/2003556939188568413',
  },

  // @greenie_sr

  // @neukoai
  {
    url: 'https://x.com/neukoai/status/2013357568605765999',
  },
  {
    url: 'https://x.com/neukoai/status/2012218480636928007',
  },
  {
    url: 'https://x.com/neukoai/status/1977763395408429229',
  },
  {
    url: 'https://x.com/neukoai/status/1979268208340406384',
  },
  {
    url: 'https://x.com/neukoai/status/1980355518771392550',
  },
  {
    url: 'https://x.com/neukoai/status/1981125805104312473',
  },
  {
    url: 'https://x.com/neukoai/status/1981740247504269582',
  },
  {
    url: 'https://x.com/neukoai/status/1982894878280569063',
  },
  {
    url: 'https://x.com/neukoai/status/1984362507784351883',
  },
  {
    url: 'https://x.com/neukoai/status/1986152753412919577',
  },
  {
    url: 'https://x.com/neukoai/status/1988703965694111829',
  },
  {
    url: 'https://x.com/neukoai/status/1989425770524225554',
  },
  {
    url: 'https://x.com/neukoai/status/1993801736142909814',
  },
  {
    url: 'https://x.com/neukoai/status/1995902340365185090',
  },
  {
    url: 'https://x.com/neukoai/status/1996332652492943710',
  },
  {
    url: 'https://x.com/neukoai/status/1998483693195899014',
  },
  {
    url: 'https://x.com/neukoai/status/1998848567587582362',
  },
  {
    url: 'https://x.com/neukoai/status/1999215138872918507',
  },
  {
    type: EventType.THREAD,
    url: 'https://x.com/neukoai/status/1999824937666941295',
  },
  {
    url: 'https://x.com/opensea/status/1999827413421986236',
  },
  {
    url: 'https://x.com/neukoai/status/2001399818304840178',
  },
  {
    url: 'https://x.com/neukoai/status/2008635872254595310',
  },
  {
    url: 'https://x.com/neukoai/status/2008939518330827166',
  },
  {
    url: 'https://x.com/neukoai/status/2009756721275637907',
  },
  {
    url: 'https://x.com/neukoai/status/2010835979754525040',
  },
  {
    url: 'https://x.com/neukoai/status/2011106635662717284',
  },
  {
    url: 'https://x.com/wallstreetbets/status/2011861685943075158',
  },


  // @SQU1NCH
  {
    type: EventType.VIDEO,
    url: 'https://x.com/SQU1NCH/status/2006509264664461714',
  },
  {
    url: 'https://x.com/SQU1NCH/status/2003564428894109966',
  },
  {
    type: EventType.VIDEO,
    url: 'https://x.com/SQU1NCH/status/1997006321661489627',
  },
  {
    url: 'https://x.com/SQU1NCH/status/1996605658758521234',
  },
  {
    type: EventType.THREAD,
    url: 'https://x.com/SQU1NCH/status/1996600123208372394',
  }
]
const communityPosts: PostDetails[] = [
  // @afkboom
  {
    url: 'https://x.com/afkboom/status/1998181754713354379',
  },
  // @BAGFILLERR
  {
    type: EventType.VIDEO,
    url: 'https://x.com/BAGFILLERR/status/2006082909417939424',
  },
  {
    type: EventType.THREAD,
    url: 'https://x.com/BAGFILLERR/status/1987997186039402591',
  },

  // @DendiRedemption
  {
    type: EventType.THREAD,
    url: 'https://x.com/DendiRedemption/status/1983974904870400150',
  },

  // @eleven88eth
  {
    type: EventType.THREAD,
    url: 'https://x.com/eleven88eth/status/1994247572785926543',
  },

  // @feezybellz_ii
  {
    type: EventType.THREAD,
    url: 'https://x.com/feezybellz_ii/status/2010276385198067880',
  },

  //@ FSkifor
  {
    url: 'https://x.com/FSkifor/status/2012287148515299478',
  },

  // @kezo_futura
  {
    type: EventType.VIDEO,
    url: 'https://x.com/kezo_futura/status/1993398379217584410',
  },
  {
    type: EventType.VIDEO,
    url: 'https://x.com/kezo_futura/status/1999738873237373020',
  },



  // @LostSnow_Rin
  {
    url: 'https://x.com/LostSnow_Rin/status/1981349935489409266',
  },
  {
    url: 'https://x.com/LostSnow_Rin/status/1988946547250495549',
  },
  {
    type: EventType.VIDEO,
    url: 'https://x.com/LostSnow_Rin/status/1991992692524699866',
  },


  // @nuyorkinoeth
  {
    url: 'https://x.com/nuyorkinoeth/status/1986177138764947467',
  },

  // @opensea
  {
    url: 'https://x.com/opensea/status/1996333608769061101',
  },

  // @phygitals
  {
    url: 'https://x.com/phygitals/status/1997006280628621751',
  },

  // @solana
  {
    url: 'https://x.com/solana/status/1995959776828948609',
  },

  // @solanaspaces
  {
    url: 'https://x.com/solanaspaces/status/2004193154766143920',
  },

  // @satoshi_owl
  {
    url: 'https://x.com/satoshi_owl/status/2013607280080511349',
  },
]

//BROADCASST
// https://x.com/neukoai/status/1999467346663211438?s=20

const postData: PostDetails[] = [...officialPosts, ...communityPosts]

export declare const data: Post[]

export default {
  async load(): Promise<Post[]> {
    return loadTweets(postData, EventType.POST)
  }
}
