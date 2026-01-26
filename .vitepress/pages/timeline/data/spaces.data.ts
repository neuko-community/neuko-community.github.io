import { loadTweets } from "../../../utils/tweetFetch"
import { EventType, Post } from "../timeline.types"

type SpaceDetails = Omit<Post, 'type' | 'tweet' | 'date' | 'id' | 'source'>
const communitySpaces: SpaceDetails[] = [
  // @CryptoVonDoom
  {
    url: "https://x.com/CryptoVonDoom/status/2011876061278323152",
  }

]

const spaceData: SpaceDetails[] = [...communitySpaces]

export declare const data: Post[]

export default {
  async load(): Promise<Post[]> {
    return await loadTweets(spaceData, EventType.SPACES)
  }
}