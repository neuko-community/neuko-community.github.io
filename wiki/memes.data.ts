export interface Meme {
    slug: string
    title: string
    blur_data_url: string
    aspect_ratio: number
    width: number
    height: number
    type: string
    cf_asset_id: string
    uploader: {
        username: string
        avatar_url: string | null
    }
}

export interface MemeData {
    memes: Meme[]
    totalMemes: number
}

declare const data: MemeData
export { data }

import fs from 'node:fs'
import path from 'node:path'

export default {
    async load(): Promise<MemeData> {
        try {
            // Try loading from static archive
            const archivePath = path.resolve(process.cwd(), 'wiki/data/memes-archive.json')
            if (fs.existsSync(archivePath)) {
                console.log('Loading memes from local archive:', archivePath)
                const content = fs.readFileSync(archivePath, 'utf-8')
                const json = JSON.parse(content)
                return {
                    memes: json.memes || [],
                    totalMemes: json.total || 0
                }
            } else {
                console.warn('Meme archive not found, falling back to empty.', archivePath)
            }
        } catch (e) {
            console.error('Error loading meme archive:', e)
        }
        return { memes: [], totalMemes: 0 }
    }
}
