import { EventType, Post } from "../pages/timeline/timeline.types"
import { loadTweets } from "../utils/tweetFetch"


//https://x.com/PathogenzTCG
type PathogenzDetails = Omit<Post, 'type' | 'tweet' | 'date' | 'id' | 'source'>
const pathogenz: PathogenzDetails[] = [
  { url: 'https://x.com/0161cassius/status/1998004200655986863' }, // Sins
  { url: 'https://x.com/0161cassius/status/2002715474220683711' }, // corphor aka 'The Pickler'
  { url: "https://x.com/0161cassius/status/2003091165290348812" }, // BlasphemousRoo
  { url: 'https://x.com/0161cassius/status/2003924838327767137' }, // The Keeper
  { url: 'https://x.com/0161cassius/status/2005642901146227068' }, // ghostygoobz
  { url: 'https://x.com/0161cassius/status/2007506872560168995' }, // Thrax
  { url: 'https://x.com/0161cassius/status/2008296614117396774' }, // Greenie
  { url: "https://x.com/0161cassius/status/2009626648380084283" }, // RoninTheKaiju
  { url: 'https://x.com/0161cassius/status/2010373906410918143' }, // Squinch
  { url: 'https://x.com/0161cassius/status/2011805820170678455' }, // owl
  { url: 'https://x.com/0161cassius/status/2013994399059902581' }, // kapz
  { url: 'https://x.com/0161cassius/status/2016555766166036968' }, // eleven
  { url: 'https://x.com/0161cassius/status/2017304102888194270' }, // DegenFigster

]

const pathogenzData: PathogenzDetails[] = [...pathogenz]

export declare const data: Post[]

export default {
  async load(): Promise<Post[]> {
    return await loadTweets(pathogenzData, EventType.POST)
  }
}