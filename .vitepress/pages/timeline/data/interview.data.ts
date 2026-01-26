import { loadTweets } from "../../../utils/tweetFetch";
import { EventType, Post } from "../timeline.types";
type InterviewDetails = Omit<Post, 'type' | 'tweet' | 'date' | 'id' | 'source'>

const officialInterviews: InterviewDetails[] = [
  {
    url: 'https://x.com/11AMdotclub/status/1999877254533496834',
  },
  {
    url: "https://x.com/mikeygnft/status/2001308759046693032" // BROADCAST
  },
  {
    url: 'https://x.com/11AMdotclub/status/2006410028014772501'
  }
]
const interviewData: InterviewDetails[] = [...officialInterviews]
export declare const data: Post[]

export default {
  async load(): Promise<Post[]> {
    const interviews = await loadTweets(interviewData, EventType.INTERVIEW)
    // const mikeygnftInterview = interviews.find(interview => interview.url === 'https://x.com/mikeygnft/status/2001308759046693032')
    // console.log(mikeygnftInterview)
    // console.log(mikeygnftInterview?.tweet.entities)
    // console.log(mikeygnftInterview?.tweet.card)
    return interviews
  }
}