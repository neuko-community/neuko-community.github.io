import { EventType, Post, SourceType } from '../timeline.types'

type PostType = EventType.POST | EventType.THREAD | EventType.INTERVIEW
type PostDetails = Omit<Post, 'type' | 'tweet' | 'date'> & { type?: PostType }
type OfficialPostDetails = Omit<PostDetails, 'source'> & { source: SourceType.OFFICIAL }
type CommunityPostDetails = Omit<PostDetails, 'source'> & { source: SourceType.COMMUNITY }

const officialPosts: OfficialPostDetails[] = [
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/2012218480636928007',
    id: '2012218480636928007'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/1976994494383112304',
    id: '1976994494383112304'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/1977763395408429229',
    id: '1977763395408429229'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/1979268208340406384',
    id: '1979268208340406384'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/1980355518771392550',
    id: '1980355518771392550'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/1981125805104312473',
    id: '1981125805104312473'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/1981740247504269582',
    id: '1981740247504269582'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/1982894878280569063',
    id: '1982894878280569063'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/1984362507784351883',
    id: '1984362507784351883'
  },
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/neukoai/status/1986152753412919577',
    id: '1986152753412919577'
  },
  {
    source: SourceType.OFFICIAL,
    type: EventType.POST,
    url: 'https://x.com/neukoai/status/1988703965694111829',
    id: '1988703965694111829'
  },
  {
    source: SourceType.OFFICIAL,
    type: EventType.POST,
    url: 'https://x.com/neukoai/status/1984362507784351883',
    id: '1984362507784351883'
  },
  {
    source: SourceType.OFFICIAL,
    type: EventType.POST,
    url: 'https://x.com/neukoai/status/1986152753412919577',
    id: '1986152753412919577'
  },
  {
    source: SourceType.OFFICIAL,
    type: EventType.POST,
    url: 'https://x.com/neukoai/status/1988703965694111829',
    id: '1988703965694111829'
  },
  {
    source: SourceType.OFFICIAL,
    type: EventType.POST,
    url: 'https://x.com/neukoai/status/1989425770524225554',
    id: '1989425770524225554'
  },
  // {
  //   source: SourceType.OFFICIAL,
  //   type: EventType.POST,
  //   url: 'https://x.com/neukoai/status/1991264007055974856',
  //   id: '1991264007055974856'
  // },
  {
    source: SourceType.OFFICIAL,
    type: EventType.POST,
    url: 'https://x.com/neukoai/status/1993801736142909814',
    id: '1993801736142909814'
  },
  {
    source: SourceType.OFFICIAL,
    type: EventType.POST,
    url: 'https://x.com/neukoai/status/1995902340365185090',
    id: '1995902340365185090'
  },
  {
    source: SourceType.OFFICIAL,
    type: EventType.POST,
    url: 'https://x.com/neukoai/status/1996332652492943710',
    id: '1996332652492943710'
  },
  {
    source: SourceType.OFFICIAL,
    type: EventType.POST,
    url: 'https://x.com/neukoai/status/1998483693195899014',
    id: '1998483693195899014'
  },
  {
    source: SourceType.OFFICIAL,
    type: EventType.POST,
    url: 'https://x.com/neukoai/status/1998848567587582362',
    id: '1998848567587582362'
  },
  {
    source: SourceType.OFFICIAL,
    type: EventType.POST,
    url: 'https://x.com/neukoai/status/1999215138872918507',
    id: '1999215138872918507'
  },
  {
    source: SourceType.OFFICIAL,
    type: EventType.THREAD,
    url: 'https://x.com/neukoai/status/1999824937666941295',
    id: '1999824937666941295'
  },
  {
    source: SourceType.OFFICIAL,
    type: EventType.POST,
    url: 'https://x.com/opensea/status/1999827413421986236',
    id: '1999827413421986236'
  },
  {
    source: SourceType.OFFICIAL,
    type: EventType.POST,
    url: 'https://x.com/neukoai/status/2001399818304840178',
    id: '2001399818304840178'
  },
  {
    source: SourceType.OFFICIAL,
    type: EventType.POST,
    url: 'https://x.com/neukoai/status/2008635872254595310',
    id: '2008635872254595310'
  },
  {
    source: SourceType.OFFICIAL,
    type: EventType.POST,
    url: 'https://x.com/neukoai/status/2008939518330827166',
    id: '2008939518330827166'
  },
  {
    source: SourceType.OFFICIAL,
    type: EventType.POST,
    url: 'https://x.com/neukoai/status/2009756721275637907',
    id: '2009756721275637907'
  },
  {
    source: SourceType.OFFICIAL,
    type: EventType.POST,
    url: 'https://x.com/neukoai/status/2010835979754525040',
    id: '2010835979754525040'
  },
  {
    source: SourceType.OFFICIAL,
    type: EventType.POST,
    url: 'https://x.com/neukoai/status/2011106635662717284',
    id: '2011106635662717284'
  },
  {
    source: SourceType.OFFICIAL,
    type: EventType.POST,
    url: 'https://x.com/wallstreetbets/status/2011861685943075158',
    id: '2011861685943075158'
  },
  // {
  //   source: SourceType.OFFICIAL,
  //   type: EventType.POST,
  //   url: 'https://x.com/neukoai/status/2011916650667116625',
  //   id: '2011916650667116625'
  // },
  {
    source: SourceType.OFFICIAL,
    type: EventType.POST,
    url: 'https://x.com/neukoai/status/1999215138872918507',
    id: '1999215138872918507'
  }
]
const communityPosts: CommunityPostDetails[] = []

//BROADCASST
// https://x.com/neukoai/status/1999467346663211438?s=20

const postData: PostDetails[] = [...officialPosts, ...communityPosts]

export declare const data: Post[]

export default {
  async load(): Promise<Post[]> {
    const postLookup = new Map()

    await Promise.all(
      postData.map(async (post) => {
        try {
          const res = await fetch(`https://react-tweet.vercel.app/api/tweet/${post.id}`)
          if (!res.ok) throw new Error(`Status ${res.status}`)
          const json = await res.json()
          if (!json.data) {
            console.warn(`No data found for post ${post.id}`)
            return
          }

          const existing = postLookup.get(post.id) ?? {
            type: post.type || EventType.POST,
            id: post.id,
            url: post.url,
            source: post.source
          }

          postLookup.set(post.id, {
            ...existing,
            date: new Date(json.data.created_at).toISOString().slice(0, 10),
            tweet: json.data
          })
        } catch (e) {
          console.error(`Error loading post ${post.id}:`, (e as Error).message)
        }
      })
    )
    return postData.map((post) => postLookup.get(post.id)!).filter(Boolean)
  }
}
