import { loadTweets } from "../../../utils/tweetFetch"
import { EventType, Post } from "../timeline.types"

type MusicPost = Post & { type: EventType.MUSIC }
type MusicDetails = Omit<Post, 'type' | 'tweet' | 'date' | 'id' | 'source'>


const officialMusic: MusicDetails[] = [
  // @SQU1NCH
  {
    url: 'https://x.com/SQU1NCH/status/1998856916676772152'
  }
]
const communityMusic: MusicDetails[] = [
  //@DyorMoon
  {
    url: 'https://x.com/DyorMoon/status/2010869371716186343'
  },

  // @knollcaptures
  {
    url: 'https://x.com/knollcaptures/status/1999109586595320178'
  },
  {
    url: 'https://x.com/knollcaptures/status/1998962373772849264'
  },

  {
    url: 'https://x.com/knollcaptures/status/1994753582818906242'
  },
  {
    url: 'https://x.com/knollcaptures/status/1992960341828128897'
  },
  {
    url: 'https://x.com/knollcaptures/status/1991904366526427594'
  },
  {
    url: 'https://x.com/knollcaptures/status/1990940224579567820',
  },
  {
    url: 'https://x.com/knollcaptures/status/1990576551667380697'
  },
  {
    url: 'https://x.com/knollcaptures/status/1985023006528442598'
  },
  {
    url: 'https://x.com/knollcaptures/status/1989508001557004533'
  },
]

const musicData: MusicDetails[] = [...officialMusic, ...communityMusic]

export declare const data: MusicPost[]

export default {
  async load(): Promise<MusicPost[]> {
    return await loadTweets(musicData, EventType.MUSIC)
  }
}