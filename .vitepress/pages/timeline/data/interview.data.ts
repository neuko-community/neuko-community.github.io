import { loadTweets } from "../../../utils/tweetFetch";
import { EventType, Post } from "../timeline.types";
type InterviewDetails = Omit<Post, 'type' | 'tweet' | 'date' | 'id' | 'source'>

const officialInterviews: InterviewDetails[] = [
  {
    url: 'https://x.com/11AMdotclub/status/1999877254533496834',
  },
]
const interviewData: InterviewDetails[] = [...officialInterviews]
export declare const data: Post[]

export default {
  async load(): Promise<Post[]> {
    return await loadTweets(interviewData, EventType.INTERVIEW)
  }
}