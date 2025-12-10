import { shallowRef, computed } from 'vue'
import type { Meme, PositionedItem } from '../types'

interface LayoutConfig {
    cellSize: number
    gutter: number
    chunkSize: number
}

export function useMasonryLayout(config: LayoutConfig) {
    const allItems = shallowRef<PositionedItem[]>([])
    const chunks = new Map<string, PositionedItem[]>()

    // Bounds
    const contentBounds = shallowRef({
        minX: Infinity,
        minY: Infinity,
        maxX: -Infinity,
        maxY: -Infinity
    })

    // Dynamic Canvas Size
    const canvasSize = shallowRef({ size: 0, dimensionCells: 0 })

    function updateBounds(x: number, y: number, w: number, h: number) {
        if (x < contentBounds.value.minX) contentBounds.value.minX = x
        if (y < contentBounds.value.minY) contentBounds.value.minY = y
        if (x + w > contentBounds.value.maxX) contentBounds.value.maxX = x + w
        if (y + h > contentBounds.value.maxY) contentBounds.value.maxY = y + h
    }

    function placeItem(list: PositionedItem[], grid: Set<string>, partial: any) {
        const pixelX = partial.x * (config.cellSize + config.gutter)
        const pixelY = partial.y * (config.cellSize + config.gutter)
        const pixelW = partial.w * config.cellSize + (partial.w - 1) * config.gutter
        const pixelH = partial.h * config.cellSize + (partial.h - 1) * config.gutter

        const item: PositionedItem = {
            ...partial,
            pixelX, pixelY, pixelW, pixelH
        }

        list.push(item)

        for (let i = 0; i < partial.w; i++) {
            for (let j = 0; j < partial.h; j++) {
                grid.add(`${partial.x + i},${partial.y + j}`)
            }
        }

        const startCX = Math.floor(pixelX / config.chunkSize)
        const startCY = Math.floor(pixelY / config.chunkSize)
        const endCX = Math.floor((pixelX + pixelW) / config.chunkSize)
        const endCY = Math.floor((pixelY + pixelH) / config.chunkSize)

        for (let cx = startCX; cx <= endCX; cx++) {
            for (let cy = startCY; cy <= endCY; cy++) {
                const key = `${cx},${cy}`
                if (!chunks.has(key)) chunks.set(key, [])
                chunks.get(key)!.push(item)
            }
        }
    }

    function canPlace(grid: Set<string>, x: number, y: number, w: number, h: number): boolean {
        for (let i = 0; i < w; i++) {
            for (let j = 0; j < h; j++) {
                if (grid.has(`${x + i},${y + j}`)) return false
            }
        }
        return true
    }

    function findSpiralPosition(grid: Set<string>, centerX: number, centerY: number, w: number, h: number, maxR: number) {
        let r = 0
        while (r < maxR) {
            for (let x = centerX - r; x <= centerX + r; x++) {
                if (canPlace(grid, x, centerY - r, w, h)) return { x, y: centerY - r }
            }
            for (let x = centerX - r; x <= centerX + r; x++) {
                if (canPlace(grid, x, centerY + r, w, h)) return { x, y: centerY + r }
            }
            for (let y = centerY - r + 1; y < centerY + r; y++) {
                if (canPlace(grid, centerX - r, y, w, h)) return { x: centerX - r, y }
            }
            for (let y = centerY - r + 1; y < centerY + r; y++) {
                if (canPlace(grid, centerX + r, y, w, h)) return { x: centerX + r, y }
            }
            r++
        }
        return null
    }

    function calculateLayout(memes: Meme[], isMobile: boolean) {
        // Canvas Sizing
        const totalCells = memes.length * 8 // Increased from 4 for more breathing room
        const dimensionCells = Math.ceil(Math.sqrt(totalCells * 3)) // Increased from 2.5
        const size = dimensionCells * (config.cellSize + config.gutter)

        canvasSize.value = { size, dimensionCells }
        const center = Math.floor(dimensionCells / 2)

        // Reset
        const grid = new Set<string>()
        const placedItems: PositionedItem[] = []
        chunks.clear()
        contentBounds.value = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }

        // Place Title
        const titleW = isMobile ? 3 : 8
        const titleH = isMobile ? 3 : 4
        const titleX = center - Math.floor(titleW / 2)
        const titleY = center - Math.floor(titleH / 2)

        placeItem(placedItems, grid, {
            type: 'TITLE',
            id: 'center-title',
            x: titleX, y: titleY, w: titleW, h: titleH
        })

        // Filter and shuffle
        const shuffledMemes = [...memes]
            .filter(m => !m.title.toLowerCase().endsWith('.gif'))
            .sort(() => Math.random() - 0.5)

        const total = shuffledMemes.length
        if (total === 0) {
            allItems.value = placedItems
            return { total: 0, placedItems, processGen: null }
        }

        // Generator for batch processing
        function* processGenerator() {
            let index = 0
            while (index < total) {
                const meme = shuffledMemes[index]
                const rand = Math.random()
                let w = 2, h = 2
                if (rand > 0.85) { w = 3; h = 3 }
                else if (rand > 0.65) { w = 2; h = 3 }
                else if (rand > 0.45) { w = 3; h = 2 }
                else if (rand > 0.15) { w = 2; h = 2 }
                else { w = 1; h = 1 }

                const pos = findSpiralPosition(grid, center, center, w, h, dimensionCells)
                if (pos) {
                    placeItem(placedItems, grid, {
                        type: 'MEME',
                        id: meme.slug || `meme-${index}`,
                        x: pos.x, y: pos.y, w: w, h: h,
                        data: meme
                    })
                    const placed = placedItems[placedItems.length - 1]
                    updateBounds(placed.pixelX, placed.pixelY, placed.pixelW, placed.pixelH)
                }
                index++
                if (index % 50 === 0) yield index // Yield every 50 items
            }
            allItems.value = placedItems
            return total
        }

        return {
            total,
            processGen: processGenerator(),
            canvasSize: size,
            placedItems // Initial items (title)
        }
    }

    return {
        allItems,
        chunks,
        contentBounds,
        canvasSize,
        calculateLayout
    }
}
