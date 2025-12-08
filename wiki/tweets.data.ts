const TWEET_IDS = [
    '1997007767085724120', // G*Boy Statues
    '1997747437252022470', // Spotlight 1 & 3
    '1990160825462730847'  // Spotlight 2
]

export interface TweetData {
    [id: string]: any
}

declare const data: TweetData
export { data }

export default {
    async load(): Promise<TweetData> {
        const tweets: TweetData = {}

        await Promise.all(TWEET_IDS.map(async (id) => {
            try {
                const res = await fetch(`https://react-tweet.vercel.app/api/tweet/${id}`)
                if (!res.ok) throw new Error(`Status ${res.status}`)
                const json = await res.json()
                if (json.data) {
                    tweets[id] = json.data
                } else {
                    console.warn(`No data found for tweet ${id}`)
                    tweets[id] = null
                }
            } catch (e: any) {
                console.error(`Error loading tweet ${id}:`, e.message)
                // Keep previous fallback logic or null
                // If we added fallback above, we are good.
                if (!tweets[id]) tweets[id] = null
            }
        }))

        return tweets
    }
}
