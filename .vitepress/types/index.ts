export interface Meme {
    slug: string
    title: string
    cf_asset_id: string
    uploader: {
        username: string
        avatar_url?: string | null
    }
    type?: string
    depot?: {
        slug: string
    }
    width?: number
    height?: number
    aspect_ratio?: number
}

export interface PositionedItem {
    type: 'MEME' | 'TITLE'
    id: string
    x: number
    y: number
    w: number
    h: number
    pixelX: number
    pixelY: number
    pixelW: number
    pixelH: number
    data?: Meme
}

export interface TweetUser {
    name: string
    screen_name: string
    profile_image_url_https: string
}

export interface TweetData {
    id_str: string
    text: string
    created_at: string
    user: TweetUser
    entities?: {
        urls?: Array<{
            url: string
            expanded_url: string
            display_url: string
        }>
    }
    video?: {
        poster: string
    }
    photos?: Array<{
        url: string
    }>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
}
