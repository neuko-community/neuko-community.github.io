import { fetchTweetData, mapWithConcurrency, TweetDataMinimal } from "../../../utils/tweetFetch"
import { EventType, Post, SourceType } from "../timeline.types"

type MusicPost = Post & { type: EventType.MUSIC }
type MusicDetails = Omit<Post, 'type' | 'tweet' | 'date'> & { type?: EventType.MUSIC }
type CommunityMusicDetails = Omit<MusicDetails, 'source'> & { source: SourceType.COMMUNITY }
type OfficialMusicDetails = Omit<MusicDetails, 'source'> & { source: SourceType.OFFICIAL }

const officialMusic: OfficialMusicDetails[] = [
  // @SQU1NCH
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/SQU1NCH/status/1998856916676772152',
    id: '1998856916676772152'
  }
]
const communityMusic: CommunityMusicDetails[] = [
    // @knollcaptures
  {
    source: SourceType.COMMUNITY,
    url: 'https://x.com/knollcaptures/status/1989508001557004533',
    id: '1989508001557004533'
  },
]

const musicData: MusicDetails[] = [...officialMusic, ...communityMusic]

export declare const data: MusicPost[]

export default {
  async load(): Promise<MusicPost[]> {
    const musicLookup = new Map()

    await mapWithConcurrency(musicData, 6, async (music) => {
      const tweet = await fetchTweetData<TweetDataMinimal>(music.id, 'music')
      if (!tweet) {
        return
      }

      try {
        const existing = {
          type: EventType.MUSIC,
          id: music.id,
          url: music.url,
          source: music.source
        }

        musicLookup.set(music.id, {
          ...existing,
          date: new Date(tweet.created_at).toISOString().slice(0, 10),
          tweet,
          user: tweet.user.screen_name
        })
      } catch (e) {
        console.error(`Error loading music ${music.id}:`, (e as Error).message)
      }
    })
    return musicData.map((music) => musicLookup.get(music.id)!).filter(Boolean)
  }
}