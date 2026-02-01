import { EventType, Post } from "../pages/timeline/timeline.types"
import { loadTweets } from "../utils/tweetFetch"


//https://x.com/PathogenzTCG
type CommunitySpotlightDetails = Omit<Post, 'type' | 'tweet' | 'date' | 'id' | 'source'>

const communitySpotlight: CommunitySpotlightDetails[] = [
  { url: 'https://x.com/Marcotics/status/1990160825462730847' }, // DegenFigster
  { url: 'https://x.com/Marcotics/status/1990903340859834680' }, // Austin
  { url: 'https://x.com/Marcotics/status/1997747445971996741' }, // Thrax
  { url: 'https://x.com/Marcotics/status/1998838081932140662' }, // Kapz
  { url: 'https://x.com/Marcotics/status/1995932475793809443' }, // Eleven
  { url: 'https://x.com/Marcotics/status/1988722580925145231' }, // Random
  { url: 'https://x.com/Marcotics/status/1989413478638260551' }, // Snow
  { url: 'https://x.com/Marcotics/status/1989073458320285987' }, // That Chill Guy
  { url: 'https://x.com/Marcotics/status/1991946814845563155' }, // Owl

]

const communitySpotlightData: CommunitySpotlightDetails[] = [...communitySpotlight]

export declare const data: Post[]

export default {
  async load(): Promise<Post[]> {
    return await loadTweets(communitySpotlightData, EventType.POST)
  }
}