import { CDN_CONFIG } from '../config/constants'

export function getMemeImageUrl(
    assetId: string,
    options?: { width?: number; format?: 'auto' | 'webp' | 'jpg' }
): string {
    if (!assetId) return ''
    const variant = options?.width
        ? `width=${options.width},fit=contain,format=${options.format || 'auto'}`
        : 'public'
    return `${CDN_CONFIG.baseUrl}/${CDN_CONFIG.accountId}/${assetId}/${variant}`
}

export function getMemeSrcSet(
    assetId: string,
    widths: number[] = [200, 400, 800],
    format: 'auto' | 'webp' | 'jpg' = 'auto'
): string {
    if (!assetId) return ''
    return widths
        .map(w => {
            const url = getMemeImageUrl(assetId, { width: w, format })
            return `${url} ${w}w`
        })
        .join(', ')
}
