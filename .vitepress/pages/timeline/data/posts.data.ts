import { EventType, Post } from '../timeline.types'
import {
  loadTweets,
} from '../../../utils/tweetFetch'

type PostType = EventType.POST | EventType.THREAD | EventType.INTERVIEW | EventType.VIDEO | EventType.INTERVIEW
type PostDetails = Omit<Post, 'type' | 'tweet' | 'date' | 'id' | 'source'> & { type?: PostType }

const officialPosts: PostDetails[] = [

  // @austin_hurwitz
  { url: 'https://x.com/austin_hurwitz/status/2018380486184501436', type: EventType.THREAD },
  { url: 'https://x.com/austin_hurwitz/status/1998056897501417520' },
  { url: 'https://x.com/austin_hurwitz/status/2009038538679992797' },
  { url: "https://x.com/austin_hurwitz/status/2011460329943826520" },
  {
    url: 'https://x.com/austin_hurwitz/status/2008861601714118884'
  },
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
  { url: 'https://x.com/neukoai/status/2018376412323860913', type: EventType.VIDEO },
  { url: 'https://x.com/neukoai/status/2017371470100414911', type: EventType.VIDEO },
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
    url: 'https://x.com/SQU1NCH/status/2012246421504721061',
    type: EventType.THREAD,
  },
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

  // @DegenFigster
  { url: 'https://x.com/DegenFigster/status/2012569459127443709' },
  { url: 'https://x.com/DegenFigster/status/2012928585221238877' },

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
  { url: 'https://x.com/feezybellz_ii/status/2015398622544752938' },
  {
    type: EventType.THREAD,
    url: 'https://x.com/feezybellz_ii/status/2010276385198067880',
  },

  //@ FSkifor
  { url: 'https://x.com/FSkifor/status/2015900472272413030' },
  {
    url: 'https://x.com/FSkifor/status/2012287148515299478',
  },

  // @greenknight_sol
  { url: "https://x.com/greenknight_sol/status/2011373543037042973" },
  { url: 'https://x.com/greenknight_sol/status/2011893996990144813' },

  // @HelveticaVault

  {
    url: 'https://x.com/HelveticVault/status/2014053051061936555'
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

  // @knollcaptures
  { url: 'https://x.com/knollcaptures/status/2012567279670804655' },
  { url: 'https://x.com/knollcaptures/status/2012920107522289701' },



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

  // @Marcotics
  { url: 'https://x.com/Marcotics/status/2012593030675529984' },
  { url: 'https://x.com/Marcotics/status/2012956018469122121' },

  // @mikeygnft
  { url: 'https://x.com/mikeygnft/status/2009725799868575786' },


  // @nuyorkinoeth
  {
    url: 'https://x.com/nuyorkinoeth/status/1986177138764947467',
  },

  // @opensea
  {
    url: 'https://x.com/opensea/status/1996333608769061101',
  },

  // @orca_so
  { url: 'https://x.com/orca_so/status/1996333595917762861' },

  // @phygitals
  {
    url: 'https://x.com/phygitals/status/1997006280628621751',
  },
  { url: 'https://x.com/phygitals/status/1996338738599743630' },

  // @solana
  {
    url: 'https://x.com/solana/status/1995959776828948609',
  },

  // @solanaspaces
  {
    url: 'https://x.com/solanaspaces/status/2004193154766143920',
  },

  // @satoshi_owl
  { url: 'https://x.com/satoshi_owl/status/2012600264767819971' },
  { url: 'https://x.com/satoshi_owl/status/2012947684315779236' },
  {
    url: 'https://x.com/satoshi_owl/status/2013607280080511349',
  },

  // @Sinsonx
  {
    url: 'https://x.com/Sinsonx/status/1989423048941080590',
    type: EventType.THREAD,
  },

  // @xeetdotai
  { url: 'https://x.com/xeetdotai/status/1996348571290148910' },

  // @veeman_eth
  {
    url: 'https://x.com/veeman_eth/status/1997834837777088860',
    type: EventType.THREAD,
  },

  // @wasabi_protocol
  { url: 'https://x.com/wasabi_protocol/status/2007851601936212016' },
  { url: 'https://x.com/wasabi_protocol/status/1996335723214156123' }
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
