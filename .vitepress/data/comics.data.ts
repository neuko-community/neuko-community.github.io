import { EventType, Post } from "../pages/timeline/timeline.types"
import { loadTweets } from "../utils/tweetFetch"


type ComicDetails = Omit<Post, 'type' | 'tweet' | 'date' | 'id' | 'source'>

const comics: ComicDetails[] = [
  { url: 'https://x.com/DegenFigster/status/2018734123611799910' }, //DIEHARD
  { url: 'https://x.com/DegenFigster/status/2016597687609458760' },  // Owl
  { url: 'https://x.com/DegenFigster/status/2016809571138908294' }, // N0tt
  { url: 'https://x.com/DegenFigster/status/2016137288334311467' }, // InsideMan
  { url: 'https://x.com/DegenFigster/status/2013725967890440571' }, // Think Tank
  { url: 'https://x.com/DegenFigster/status/2011449879575527767' }, // Krakhead
  { url: 'https://x.com/DegenFigster/status/2011114855403565514' }, // Headcase
  { url: 'https://x.com/DegenFigster/status/2010660485927182843' }, // GBOY 15,
  { url: 'https://x.com/DegenFigster/status/2009914060100563042' }, // Daydreamer,
  // { url: 'https://x.com/DegenFigster/status/2006397200226550216' }, // GBOYS Unite ???
  { url: 'https://x.com/DegenFigster/status/2006399764414201955' }, // GBOYS Unite also
  { url: 'https://x.com/DegenFigster/status/2003463123790172485' }, // 1nk & GUMM1 89
  { url: 'https://x.com/DegenFigster/status/2003111588618961358' }, // ZLINE 1
  { url: 'https://x.com/DegenFigster/status/2002819378082206073' }, // Denise, 
  { url: 'https://x.com/DegenFigster/status/2002718420140527838' }, // Blowpie,
  { url: 'https://x.com/DegenFigster/status/1996268489435205959' }, //neuko Adult //WONT LOAD
  { url: 'https://x.com/DegenFigster/status/2010314711209046300' }, // Nikita,
  { url: 'https://x.com/DegenFigster/status/2003542136629919766' }, // The Amazing GBOY
  { url: 'https://x.com/DegenFigster/status/2002865299205578957' }, // Bradleigh 

]

//https://x.com/DegenFigster/status/2002858886345465901 4 issue post

const comicsData: ComicDetails[] = [...comics]

export declare const data: Post[]

export default {
  async load(): Promise<Post[]> {
    return await loadTweets(comicsData, EventType.POST)
  }
}