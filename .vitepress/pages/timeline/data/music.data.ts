import { fetchTweetData, mapWithConcurrency, TweetDataMinimal } from "../../../utils/tweetFetch"
import { EventType, Post, SourceType } from "../timeline.types"

type MusicPost = Post & { type: EventType.MUSIC }
type MusicDetails = Omit<Post, 'type' | 'tweet' | 'date' | 'id'> & { type?: EventType.MUSIC }
type CommunityMusicDetails = Omit<MusicDetails, 'source'> & { source: SourceType.COMMUNITY }
type OfficialMusicDetails = Omit<MusicDetails, 'source'> & { source: SourceType.OFFICIAL }

const getTweetIdFromUrl = (url: string) => url.match(/\/status\/(\d+)/)?.[1]

const officialMusic: OfficialMusicDetails[] = [
  // @SQU1NCH
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/SQU1NCH/status/1998856916676772152'
  }
]
const communityMusic: CommunityMusicDetails[] = [
  //@DyorMoon
  {
    source: SourceType.COMMUNITY,
    url: 'https://x.com/DyorMoon/status/2010869371716186343'
  },

  // @knollcaptures
  {
    source: SourceType.COMMUNITY,
    url: 'https://x.com/knollcaptures/status/1999109586595320178'
  },
  {
    source: SourceType.COMMUNITY,
    url: 'https://x.com/knollcaptures/status/1998962373772849264'
  },

    {
      source: SourceType.COMMUNITY,
      url: 'https://x.com/knollcaptures/status/1994753582818906242'
    },
    {
      source: SourceType.COMMUNITY,
      url: 'https://x.com/knollcaptures/status/1992960341828128897'
    },
    {
    source: SourceType.COMMUNITY,
    url: 'https://x.com/knollcaptures/status/1991904366526427594'
    },
    {
    source: SourceType.COMMUNITY,
    url: 'https://x.com/knollcaptures/status/1990940224579567820',
    },
    {
    source: SourceType.COMMUNITY,
    url: 'https://x.com/knollcaptures/status/1990576551667380697'
    },
  {
    source: SourceType.COMMUNITY,
    url: 'https://x.com/knollcaptures/status/1985023006528442598'
  },
  {
    source: SourceType.COMMUNITY,
    url: 'https://x.com/knollcaptures/status/1989508001557004533'
  },
]

const musicData: MusicDetails[] = [...officialMusic, ...communityMusic]

export declare const data: MusicPost[]

export default {
  async load(): Promise<MusicPost[]> {
    const musicLookup = new Map()

    await mapWithConcurrency(musicData, 6, async (music) => {
      const derivedId = getTweetIdFromUrl(music.url)
      if (!derivedId) {
        console.error(`Missing tweet id for music url ${music.url}`)
        return
      }

      const tweet = await fetchTweetData<TweetDataMinimal>(derivedId, 'music')
      if (!tweet) {
        return
      }

      try {
        const existing = {
          type: EventType.MUSIC,
          id: derivedId,
          url: music.url,
          source: music.source
        }

        musicLookup.set(derivedId, {
          ...existing,
          date: new Date(tweet.created_at).toISOString().slice(0, 10),
          tweet,
          user: tweet.user.screen_name
        })
      } catch (e) {
        console.error(`Error loading music ${derivedId}:`, (e as Error).message)
      }
    })
    return musicData
      .map((music) => musicLookup.get(getTweetIdFromUrl(music.url)!)!)
      .filter(Boolean)
  }
}