export type TweetDataMinimal = {
  created_at: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

type FetchTweetOptions = {
  retries?: number
  timeoutMs?: number
  retryDelayMs?: number
}

const RETRYABLE_STATUSES = new Set([408, 429, 500, 502, 503, 504])
const RETRYABLE_ERROR_CODES = new Set(['ECONNRESET', 'ETIMEDOUT', 'EAI_AGAIN', 'ENOTFOUND'])

const defaultOptions: Required<FetchTweetOptions> = {
  retries: 2,
  timeoutMs: 12000,
  retryDelayMs: 500
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const formatErrorDetails = (error: unknown) => {
  if (error instanceof Error) {
    const cause = (error as Error & { cause?: { code?: string; message?: string } }).cause
    if (cause?.code || cause?.message) {
      return `${error.message} (cause: ${cause.code ?? 'unknown'}${cause.message ? ` - ${cause.message}` : ''})`
    }
    return error.message
  }
  return String(error)
}

const isRetryableError = (error: unknown) => {
  if (error instanceof Error && error.name === 'AbortError') return true
  const cause = (error as { cause?: { code?: string } })?.cause
  return Boolean(cause?.code && RETRYABLE_ERROR_CODES.has(cause.code))
}

export const mapWithConcurrency = async <T>(
  items: T[],
  limit: number,
  task: (item: T) => Promise<void>
) => {
  let index = 0
  const workerCount = Math.max(1, Math.min(limit, items.length))

  await Promise.all(
    Array.from({ length: workerCount }, async () => {
      while (true) {
        const current = index
        index += 1
        if (current >= items.length) break
        await task(items[current])
      }
    })
  )
}

export const fetchTweetData = async <T = TweetDataMinimal>(
  id: string,
  label: string,
  options: FetchTweetOptions = {}
): Promise<T | null> => {
  const { retries, timeoutMs, retryDelayMs } = { ...defaultOptions, ...options }
  const url = `https://react-tweet.vercel.app/api/tweet/${id}`

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), timeoutMs)

    try {
      const res = await fetch(url, {
        signal: controller.signal,
        headers: { 'User-Agent': 'neuko-timeline-fetch' }
      })

      if (!res.ok) {
        if (RETRYABLE_STATUSES.has(res.status) && attempt < retries) {
          await sleep(retryDelayMs * (attempt + 1))
          continue
        }

        console.warn(
          `[tweet-fetch] ${label} ${id} failed with status ${res.status} (${url})`
        )
        return null
      }

      const json = await res.json()
      if (!json?.data) {
        console.warn(`[tweet-fetch] No data found for ${label} ${id}`)
        return null
      }

      return json.data as T
    } catch (error) {
      if (attempt < retries && isRetryableError(error)) {
        await sleep(retryDelayMs * (attempt + 1))
        continue
      }

      console.error(
        `[tweet-fetch] ${label} ${id} error: ${formatErrorDetails(error)} (${url})`
      )
      return null
    } finally {
      clearTimeout(timeout)
    }
  }

  return null
}
