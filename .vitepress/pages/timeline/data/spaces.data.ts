import { fetchTweetData, mapWithConcurrency, TweetDataMinimal } from "../../../utils/tweetFetch"
import { EventType, Post, SourceType } from "../timeline.types"

type SpaceDetails = Omit<Post, 'type' | 'tweet' | 'date'> & { type?: EventType.SPACES }
type CommunitySpacesDetails = Omit<SpaceDetails, 'source'> & { source: SourceType.COMMUNITY }
const communitySpaces: CommunitySpacesDetails[] = [
  // @CryptoVonDoom
  {
    source: SourceType.COMMUNITY,
    url: "https://x.com/CryptoVonDoom/status/2011876061278323152",
    id: '2011876061278323152'
  }

]

const spaceData: SpaceDetails[] = [...communitySpaces]

export declare const data: Post[]

export default {
  async load(): Promise<Post[]> {
    const spaceLookup = new Map()

    await mapWithConcurrency(spaceData, 6, async (space) => {
      const tweet = await fetchTweetData<TweetDataMinimal>(space.id, 'space')
      if (!tweet) {
        return
      }

      try {
        const existing = {
          type: EventType.SPACES,
          id: space.id,
          url: space.url,
          source: space.source
        }

        spaceLookup.set(space.id, {
          ...existing,
          date: new Date(tweet.created_at).toISOString().slice(0, 10),
          tweet,
          user: tweet.user.screen_name
        })
      } catch (e) {
        console.error(`Error loading space ${space.id}:`, (e as Error).message)
      }
    })
    return spaceData.map((space) => spaceLookup.get(space.id)!).filter(Boolean)
  }
}