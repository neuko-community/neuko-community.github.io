import { EventType, Post } from "../pages/timeline/timeline.types"
import { loadTweets } from "../utils/tweetFetch"


//https://x.com/PathogenzTCG
type PathogenzDetails = Omit<Post, 'type' | 'tweet' | 'date' | 'id' | 'source'> & {
  rank: "legendary" | "mythic",
  hp: number
}
const pathogenz: PathogenzDetails[] = [
  { url: 'https://x.com/0161cassius/status/1998004200655986863', rank: 'legendary', hp: 360 }, // Sins
  { url: 'https://x.com/0161cassius/status/2002715474220683711', rank: 'legendary', hp: 360 }, // corphor aka 'The Pickler'
  { url: "https://x.com/0161cassius/status/2003091165290348812", rank: 'mythic', hp: 420 }, // BlasphemousRoo
  { url: 'https://x.com/0161cassius/status/2003924838327767137', rank: 'legendary', hp: 500 }, // The Keeper
  { url: 'https://x.com/0161cassius/status/2005642901146227068', rank: 'legendary', hp: 400 }, // ghostygoobz
  { url: 'https://x.com/0161cassius/status/2007506872560168995', rank: 'legendary', hp: 350 }, // Thrax
  { url: 'https://x.com/0161cassius/status/2008296614117396774', rank: 'mythic', hp: 400 }, // Greenie
  { url: "https://x.com/0161cassius/status/2009626648380084283", rank: 'legendary', hp: 380 }, // RoninTheKaiju
  { url: 'https://x.com/0161cassius/status/2010373906410918143', rank: 'mythic', hp: 500 }, // Squinch
  { url: 'https://x.com/0161cassius/status/2011805820170678455', rank: 'legendary', hp: 390 }, // owl
  { url: 'https://x.com/0161cassius/status/2013994399059902581', rank: 'legendary', hp: 370 }, // kapz
  { url: 'https://x.com/0161cassius/status/2016555766166036968', rank: 'legendary', hp: 360 }, // eleven
  { url: 'https://x.com/0161cassius/status/2017304102888194270', rank: 'legendary', hp: 390 }, // DegenFigster

]

const pathogenzData: PathogenzDetails[] = [...pathogenz]

export declare const data: Post[]

export default {
  async load(): Promise<Post[]> {
    return await loadTweets(pathogenzData, EventType.POST)
  }
}