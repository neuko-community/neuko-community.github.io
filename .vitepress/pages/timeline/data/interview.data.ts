import { fetchTweetData, mapWithConcurrency, TweetDataMinimal } from "../../../utils/tweetFetch";
import {  EventType, Post, SourceType } from "../timeline.types";
type InterviewDetails = Omit<Post, 'type' | 'tweet' | 'date'> & { type?: EventType.INTERVIEW }
type OfficialInterviewDetails = Omit<InterviewDetails, 'source'> & { source: SourceType.OFFICIAL }

const officialInterviews: OfficialInterviewDetails[] = [
  {
    source: SourceType.OFFICIAL,
    url: 'https://x.com/11AMdotclub/status/1999877254533496834',
    id: '1999877254533496834'
  },
]

const interviewData: InterviewDetails[] = [...officialInterviews]

export declare const data: Post[]

export default {
  async load(): Promise<Post[]> {
    const interviewLookup = new Map()

    await mapWithConcurrency(interviewData, 6, async (interview) => {
      if (!interview.id) {
        return
      }

      const tweet = await fetchTweetData<TweetDataMinimal>(interview.id, 'interview')
      if (!tweet) {
        return
      }

      try {
        interviewLookup.set(interview.id, {
          type: EventType.INTERVIEW,
          ...interview,
          date: new Date(tweet.created_at).toISOString().slice(0, 10),
          tweet,
          user: tweet.user.screen_name
        })
      } catch (e) {
        console.error(`Error loading interview ${interview.id}:`, (e as Error).message)
      }
    })
    return interviewData
      .map((interview) => interviewLookup.get(interview.id ?? interview.url)!)
      .filter(Boolean)
  }
}