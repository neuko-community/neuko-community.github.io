import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const OUT_DIR = path.resolve(__dirname, '../public')
const OUT_FILE = path.join(OUT_DIR, 'memes-archive.json')
const TARGET = Infinity // Fetch ALL memes
const API_BASE = 'https://memedepot.com/api/memes?depotSlug=gboy'
const EXCLUDE_VIDEOS = false

async function scrape() {
    console.log('Starting scrape for G*BOY memes...')

    if (!fs.existsSync(OUT_DIR)) {
        fs.mkdirSync(OUT_DIR, { recursive: true })
    }

    let allMemes: any[] = []
    let page = 1
    let hasNext = true

    // Loop until we run out of pages
    while (hasNext) {
        const url = `${API_BASE}&page=${page}&limit=100`
        console.log(`Fetching page ${page}... (${url})`)

        try {
            const res = await fetch(url)
            if (!res.ok) throw new Error(`Status ${res.status}`)

            const json = await res.json()
            const memes = json.memes || []

            if (memes.length === 0) {
                console.log('No more memes found.')
                hasNext = false
                break
            }

            // Filter
            let filtered = memes.filter((m: any) => m.depot?.slug === 'gboy')

            if (EXCLUDE_VIDEOS) {
                const preVideoCount = filtered.length
                filtered = filtered.filter((m: any) => m.type !== 'VIDEO' && !m.title.endsWith('.mp4') && !m.title.endsWith('.webm'))
                if (filtered.length < preVideoCount) {
                    // console.warn(`  - Excluded ${preVideoCount - filtered.length} video memes.`)
                }
            }

            allMemes.push(...filtered)
            console.log(`  + ${filtered.length} memes. Total: ${allMemes.length}`)

            hasNext = json.hasNextPage
            page++

            // Be nice to the API
            await new Promise(r => setTimeout(r, 200))

        } catch (err) {
            console.error('Fetch error:', err)
            break
        }
    }

    // Deduplicate just in case
    const uniqueMemes = Array.from(new Map(allMemes.map(m => [m.slug, m])).values())
    console.log(`Scraped ${allMemes.length} memes. Unique: ${uniqueMemes.length}`)

    // Write to file
    const output = {
        memes: uniqueMemes,
        total: uniqueMemes.length,
        scrapedAt: new Date().toISOString()
    }

    fs.writeFileSync(OUT_FILE, JSON.stringify(output, null, 2))
    console.log(`Saved to ${OUT_FILE}`)
}

scrape()
