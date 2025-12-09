
import { ref, onMounted, computed, nextTick, shallowRef } from 'vue'
import ScrollingBar from './ScrollingBar.vue'

const props = defineProps<{}>()
const isDev = import.meta.env.DEV

// --- Configuration ---
const CELL_SIZE = 100 
const GUTTER = 16     
const CHUNK_SIZE = 4000 

// --- Types ---
interface Meme {
    slug: string
    title: string
    cf_asset_id: string
    uploader: {
        username: string
    }
    type?: string
}

// --- State ---
const memes = shallowRef<Meme[]>([])
const allItems = shallowRef<PositionedItem[]>([])
type PositionedItem = {
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



const containerRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const dragThresholdPassed = ref(false)
const startX = ref(0)
const startY = ref(0)
const scrollLeft = ref(0)
const scrollTop = ref(0)
const scale = ref(1)
const showReturnCenter = ref(false)
// Bounds for clamping scroll
const contentBounds = ref({
  minX: Infinity,
  minY: Infinity,
  maxX: -Infinity,
  maxY: -Infinity
})

function updateBounds(x: number, y: number, w: number, h: number) {
  if (x < contentBounds.value.minX) contentBounds.value.minX = x
  if (y < contentBounds.value.minY) contentBounds.value.minY = y
  if (x + w > contentBounds.value.maxX) contentBounds.value.maxX = x + w
  if (y + h > contentBounds.value.maxY) contentBounds.value.maxY = y + h
}

function clampScroll(x: number, y: number) {
  if (!containerRef.value) return { x, y }
  const vw = window.innerWidth
  const vh = window.innerHeight
  const padding = 200 // Buffer in pixels
  
  const minX = contentBounds.value.minX - padding
  const maxX = contentBounds.value.maxX + padding - vw
  const minY = contentBounds.value.minY - padding
  const maxY = contentBounds.value.maxY + padding - vh

  return {
    x: Math.max(minX, Math.min(x, maxX)),
    y: Math.max(minY, Math.min(y, maxY))
  }
}



const isLoading = ref(true)

// Dynamic Canvas Size (Computed because memes are loaded async)
const canvasConfig = computed(() => {
  const totalCells = memes.value.length * 4 
  const dimensionCells = Math.ceil(Math.sqrt(totalCells * 2.5)) 
  const size = dimensionCells * (CELL_SIZE + GUTTER)
  return { size, dimensionCells }
})
const dimensionCells = computed(() => canvasConfig.value.dimensionCells)
const CANVAS_SIZE = computed(() => canvasConfig.value.size)
 

// --- Logic ---

function getImageUrl(meme: Meme, width?: number) {
  if (!meme) return ''
  const variant = width ? `width=${width},fit=contain,format=auto` : 'public'
  return `https://memedepot.com/cdn-cgi/imagedelivery/naCPMwxXX46-hrE49eZovw/${meme.cf_asset_id}/${variant}`
}

function layoutItems() {
  isLoading.value = true
  
  setTimeout(() => {
    const grid = new Set<string>() 
    const placedItems: PositionedItem[] = []
    
    chunks.clear()
    
    // Reset bounds
    contentBounds.value = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }

    const center = Math.floor(CANVAS_SIZE.value / (CELL_SIZE + GUTTER) / 2)
    
    // -- Place Title --
    // Responsive Title Size
    const isMobile = window.innerWidth < 768
    const titleW = isMobile ? 3 : 8
    const titleH = isMobile ? 3 : 4 
    
    const titleX = center - Math.floor(titleW / 2)
    const titleY = center - Math.floor(titleH / 2)
    
    placeItem(placedItems, grid, {
      type: 'TITLE',
      id: 'center-title',
      x: titleX, y: titleY, w: titleW, h: titleH
    })

    // Filter out GIFs as requested for performance
    const shuffledMemes = [...memes.value]
      .filter(m => !m.title.toLowerCase().endsWith('.gif'))
      .sort(() => Math.random() - 0.5)
    
    shuffledMemes.forEach((meme, i) => {
      const rand = Math.random()
      let w = 2, h = 2
      if (rand > 0.85) { w = 3; h = 3 } 
      else if (rand > 0.65) { w = 2; h = 3 } 
      else if (rand > 0.45) { w = 3; h = 2 } 
      else if (rand > 0.15) { w = 2; h = 2 } 
      else { w = 1; h = 1 } 
      
      const pos = findSpiralPosition(grid, center, center, w, h)
      if (pos) {
        placeItem(placedItems, grid, {
          type: 'MEME',
          id: meme.slug || `meme-${i}`,
          x: pos.x, y: pos.y, w: w, h: h,
          data: meme
        })
        const placed = placedItems[placedItems.length - 1]
        updateBounds(placed.pixelX, placed.pixelY, placed.pixelW, placed.pixelH)
      }
    })

    allItems.value = placedItems
    updateVisibility()
    isLoading.value = false
    
    nextTick(() => scrollToCenter())
  }, 50)
}

function placeItem(list: PositionedItem[], grid: Set<string>, partial: any) {
  const pixelX = partial.x * (CELL_SIZE + GUTTER)
  const pixelY = partial.y * (CELL_SIZE + GUTTER)
  const pixelW = partial.w * CELL_SIZE + (partial.w - 1) * GUTTER
  const pixelH = partial.h * CELL_SIZE + (partial.h - 1) * GUTTER

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

  const startCX = Math.floor(pixelX / CHUNK_SIZE)
  const startCY = Math.floor(pixelY / CHUNK_SIZE)
  const endCX = Math.floor((pixelX + pixelW) / CHUNK_SIZE)
  const endCY = Math.floor((pixelY + pixelH) / CHUNK_SIZE)

  for(let cx = startCX; cx <= endCX; cx++) {
    for(let cy = startCY; cy <= endCY; cy++) {
      const key = `${cx},${cy}`
      if (!chunks.has(key)) chunks.set(key, [])
      chunks.get(key)!.push(item)
    }
  }
}

function findSpiralPosition(grid: Set<string>, centerX: number, centerY: number, w: number, h: number) {
  let r = 0
  const maxR = dimensionCells.value  
  
  while (r < maxR) {
    for(let x = centerX - r; x <= centerX + r; x++) {
       if (canPlace(grid, x, centerY - r, w, h)) return { x, y: centerY - r }
    }
    for(let x = centerX - r; x <= centerX + r; x++) {
       if (canPlace(grid, x, centerY + r, w, h)) return { x, y: centerY + r }
    }
    for(let y = centerY - r + 1; y < centerY + r; y++) {
       if (canPlace(grid, centerX - r, y, w, h)) return { x: centerX - r, y }
    }
    for(let y = centerY - r + 1; y < centerY + r; y++) {
       if (canPlace(grid, centerX + r, y, w, h)) return { x: centerX + r, y }
    }
    r++
  }
  return null
}

function canPlace(grid: Set<string>, x: number, y: number, w: number, h: number): boolean {
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      if (grid.has(`${x + i},${y + j}`)) return false
    }
  }
  return true
}

function updateVisibility() {
  if (!containerRef.value) return

  const sL = containerRef.value.scrollLeft
  const sT = containerRef.value.scrollTop
  const vpW = window.innerWidth
  const vpH = window.innerHeight

  const effW = vpW / scale.value
  const effH = vpH / scale.value
  
  const startCX = Math.floor((sL - CHUNK_SIZE) / CHUNK_SIZE)
  const startCY = Math.floor((sT - CHUNK_SIZE) / CHUNK_SIZE)
  const endCX = Math.floor((sL + effW + CHUNK_SIZE) / CHUNK_SIZE)
  const endCY = Math.floor((sT + effH + CHUNK_SIZE) / CHUNK_SIZE)

  const gathered = new Set<PositionedItem>()
  
  for(let cx = startCX; cx <= endCX; cx++) {
    for(let cy = startCY; cy <= endCY; cy++) {
      const key = `${cx},${cy}`
      const chunkItems = chunks.get(key)
      if (chunkItems) {
        chunkItems.forEach(item => gathered.add(item))
      }
    }
  }
  
  visibleItems.value = Array.from(gathered)
  checkScrollCenter()
}

function scrollToCenter() {
  if (containerRef.value) {
    const scrollX = (CANVAS_SIZE.value - window.innerWidth) / 2
    const scrollY = (CANVAS_SIZE.value - window.innerHeight) / 2
    containerRef.value.scrollTo({ left: scrollX, top: scrollY, behavior: 'instant' }) 
    updateVisibility()
  }
}

function checkScrollCenter() {
  if (!containerRef.value) return
  const scrollX = containerRef.value.scrollLeft
  const scrollY = containerRef.value.scrollTop
  const centerX = (CANVAS_SIZE.value - window.innerWidth) / 2
  const centerY = (CANVAS_SIZE.value - window.innerHeight) / 2
  const dist = Math.sqrt(Math.pow(scrollX - centerX, 2) + Math.pow(scrollY - centerY, 2))
  showReturnCenter.value = dist > 600
}

// --- Interaction Handlers ---

const onMouseDown = (e: MouseEvent) => {
  if ((e.target as HTMLElement).closest('.nav-button')) return
  isDragging.value = true
  dragThresholdPassed.value = false
  startX.value = e.pageX - (containerRef.value?.offsetLeft || 0)
  startY.value = e.pageY - (containerRef.value?.offsetTop || 0)
  scrollLeft.value = containerRef.value?.scrollLeft || 0
  scrollTop.value = containerRef.value?.scrollTop || 0
  if (containerRef.value) containerRef.value.style.cursor = 'grabbing'
}

const onMouseMove = (e: MouseEvent) => {
  if (!isDragging.value || !containerRef.value) return
  e.preventDefault()
  const x = e.pageX - (containerRef.value.offsetLeft || 0)
  const y = e.pageY - (containerRef.value.offsetTop || 0)
  const walkX = x - startX.value
  const walkY = y - startY.value
  
  if (Math.abs(walkX) > 5 || Math.abs(walkY) > 5) {
     dragThresholdPassed.value = true
  }

  const nextScrollLeft = scrollLeft.value - walkX
  const nextScrollTop = scrollTop.value - walkY
  
  const clamped = clampScroll(nextScrollLeft, nextScrollTop)
  containerRef.value.scrollLeft = clamped.x
  containerRef.value.scrollTop = clamped.y
  
  requestAnimationFrame(updateVisibility)
}

const onMouseUp = () => {
  isDragging.value = false
  if (containerRef.value) containerRef.value.style.cursor = 'grab'
}

const onLinkClick = (e: MouseEvent, meme: Meme) => {
  if (dragThresholdPassed.value) {
    e.preventDefault()
    e.stopPropagation()
    return
  }
}

// Mobile Touch Support
const onTouchStart = (e: TouchEvent) => {
  if ((e.target as HTMLElement).closest('.nav-button')) return
  isDragging.value = true
  dragThresholdPassed.value = false
  const touch = e.touches[0]
  startX.value = touch.pageX - (containerRef.value?.offsetLeft || 0)
  startY.value = touch.pageY - (containerRef.value?.offsetTop || 0)
  scrollLeft.value = containerRef.value?.scrollLeft || 0
  scrollTop.value = containerRef.value?.scrollTop || 0
}

const onTouchMove = (e: TouchEvent) => {
  if (!isDragging.value || !containerRef.value) return
  if (e.touches.length > 1) return 
  e.preventDefault() 
  const touch = e.touches[0]
  const x = touch.pageX - (containerRef.value.offsetLeft || 0)
  const y = touch.pageY - (containerRef.value.offsetTop || 0)
  const walkX = x - startX.value
  const walkY = y - startY.value
  
  if (Math.abs(walkX) > 5 || Math.abs(walkY) > 5) {
     dragThresholdPassed.value = true
  }

  const nextScrollLeft = scrollLeft.value - walkX
  const nextScrollTop = scrollTop.value - walkY
  
  const clamped = clampScroll(nextScrollLeft, nextScrollTop)
  containerRef.value.scrollLeft = clamped.x
  containerRef.value.scrollTop = clamped.y
  
  requestAnimationFrame(updateVisibility)
}

const onTouchEnd = () => {
  isDragging.value = false
}


const onWheel = (e: WheelEvent) => {
  e.preventDefault()
  if (e.ctrlKey || e.metaKey) {
    const zoomSpeed = 0.002
    scale.value = Math.min(Math.max(scale.value - (e.deltaY * zoomSpeed), 0.3), 1.5)
    requestAnimationFrame(updateVisibility)
  } else {
    if (containerRef.value) {
      const nextX = containerRef.value.scrollLeft + e.deltaX
      const nextY = containerRef.value.scrollTop + e.deltaY
      const clamped = clampScroll(nextX, nextY)
      containerRef.value.scrollLeft = clamped.x
      containerRef.value.scrollTop = clamped.y
      requestAnimationFrame(updateVisibility)
    }
  }
}

// Debug Stats
const debugStats = ref({
  visibleCount: 0,
  totalCount: 0,
  loadedSizeMB: '0.00'
})

function updateDebugStats() {
  debugStats.value.visibleCount = visibleItems.value.length
  debugStats.value.totalCount = allItems.value.length
  
  // Calculate approximate image transfer size
  const resources = performance.getEntriesByType('resource')
  let totalBytes = 0
  resources.forEach(entry => {
    // @ts-ignore
    if (entry.initiatorType === 'img' || entry.initiatorType === 'css' || (entry.name && (entry.name.includes('.jpg') || entry.name.includes('.webp') || entry.name.includes('imagedelivery')))) {
      // @ts-ignore
      let size = entry.transferSize || entry.decodedBodySize || 0
      if (size === 0) size = 40000 // Fallback estimate for CORS-restricted or cached images (approx 40KB)
      totalBytes += size
    }
  })
  debugStats.value.loadedSizeMB = (totalBytes / (1024 * 1024)).toFixed(2)
}

onMounted(async () => {
    try {
        const res = await fetch('/memes-archive.json')
        if (res.ok) {
            const json = await res.json()
            memes.value = json.memes || []
        }
    } catch (e) {
        console.error('Failed to load memes', e)
    }
    
    // Fallback or empty if failed, but still run layout to show title
    layoutItems()
    setInterval(updateDebugStats, 1000)
})
</script>

<template>
  <div 
    class="mosaic-viewport" 
    ref="containerRef"
    @mousedown="onMouseDown"
    @mouseleave="onMouseUp"
    @mouseup="onMouseUp"
    @mousemove="onMouseMove"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @wheel="onWheel"
  >
    <!-- Debug Overlay -->
    <div v-if="isDev" class="debug-overlay">
      <div>DOM Nodes: {{ debugStats.visibleCount }} / {{ debugStats.totalCount }}</div>
      <div>Est. Load: {{ debugStats.loadedSizeMB }} MB</div>
    </div>

    <!-- Loading Overlay -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loader-text">DROWN THEM IN HIS IMAGE...</div>
    </div>

    <!-- Nav -->
    <a href="/" class="nav-button home-button" title="Back to Home"><span class="icon">⌂</span> HOME</a>
    <button class="nav-button center-button" :class="{ 'visible': showReturnCenter }" @click="scrollToCenter">RETURN TO CENTER</button>

    <!-- Marquee Overlay -->
    <div class="marquee-overlay">
      <ScrollingBar />
    </div>
    
    <div class="mosaic-canvas" :style="{ 
      width: CANVAS_SIZE + 'px', 
      height: CANVAS_SIZE + 'px',
      transform: `scale(${scale})`,
      transformOrigin: '50% 50%' 
    }">
      
      <div 
        v-for="(item, index) in visibleItems" 
        :key="item.id" 
        class="mosaic-item"
        :class="{ 'title-item': item.type === 'TITLE' }"
        :style="{
          left: item.pixelX + 'px',
          top: item.pixelY + 'px',
          width: item.pixelW + 'px',
          height: item.pixelH + 'px'
        }"
      >
        <div v-if="item.type === 'TITLE'" class="center-title">
          <div class="title-bg">
            <h1 class="gboy-title">G*BOY<br>MEMES</h1>
          </div>
        </div>

        <a v-else-if="item.data" 
           :href="`https://memedepot.com/d/gboy/${item.data.slug}`" 
           target="_blank" 
           rel="noopener" 
           class="meme-link"
           draggable="false"
           @click="onLinkClick($event, item.data)"
        >
          <div class="media-wrapper">
             <video 
              v-if="item.data.type === 'VIDEO' || item.data.title.endsWith('.mp4') || item.data.title.endsWith('.webm')"
              :src="getImageUrl(item.data)"
              class="mosaic-media"
              autoplay loop muted playsinline
              draggable="false"
            ></video>
            <img 
              v-else
              :src="getImageUrl(item.data, 400)" 
              :alt="item.data.title" 
              class="mosaic-media"
              :loading="index < 12 ? 'eager' : 'lazy'"
              draggable="false"
            />
          </div>
          <div v-if="item.data.uploader?.username" class="attribution-overlay">
            <span class="attribution-text">by </span>
            <span class="attribution-handle">@{{ item.data.uploader.username }}</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.debug-overlay {
  position: fixed;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.85);
  color: #0f0;
  font-family: monospace;
  font-size: 12px;
  padding: 8px;
  border: 1px solid #0f0;
  border-radius: 4px;
  z-index: 1000;
  pointer-events: none;
}
.mosaic-viewport { width: 100%; height: 100vh; position: fixed; top: 0; left: 0; z-index: 100; overflow: hidden; background: #000; cursor: grab; user-select: none; touch-action: none; /* Critical for drag */ }
.mosaic-canvas { position: relative; background-color: #050505; background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px); background-size: 50px 50px; transition: transform 0.1s linear; }
.mosaic-item { position: absolute; border-radius: 4px; overflow: hidden; background: #222; transition: transform 0.1s; will-change: transform; }
.mosaic-item:hover { transform: scale(1.05); z-index: 50; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
.title-item { background: transparent; display: flex; align-items: center; justify-content: center; pointer-events: none; box-shadow: none; overflow: visible; z-index: 10; }
.center-title { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
.title-bg { 
  background-color: #ED1C25; 
  width: 100%; 
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px; 
  box-shadow: 0 10px 40px rgba(237, 28, 37, 0.4); 
}
.gboy-title { font-family: "helvetica-lt-pro", sans-serif; font-size: 5rem; font-weight: 900; text-align: center; line-height: 0.9; color: #FFFF0A; text-transform: uppercase; margin: 0; white-space: nowrap; }
.nav-button { position: fixed; z-index: 200; font-family: var(--vp-font-family-mono); font-weight: bold; cursor: pointer; background: rgba(0,0,0,0.8); color: #fff; border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; backdrop-filter: blur(8px); padding: 8px 12px; transition: all 0.2s ease; text-decoration: none; display: flex; align-items: center; gap: 6px; font-size: 0.8rem; }
.nav-button:hover { background: #fff; color: #000; border-color: #fff; }
.home-button { top: 20px; left: 20px; }
.center-button { bottom: 20px; right: 20px; background: #FFE600; color: #000; border: none; box-shadow: 0 4px 12px rgba(255, 230, 0, 0.3); opacity: 0; transform: translateY(20px); pointer-events: auto; transition: opacity 0.3s ease, transform 0.3s ease; }
.center-button:not(.visible) { opacity: 0; transform: translateY(20px); pointer-events: none; }
.meme-link { display: block; width: 100%; height: 100%; cursor: pointer; -webkit-user-drag: none; user-drag: none; }
.media-wrapper { width: 100%; height: 100%; }
.mosaic-media { width: 100%; height: 100%; object-fit: cover; display: block; transition: opacity 0.3s; pointer-events: none; -webkit-user-drag: none; user-drag: none; }
.attribution-overlay { position: absolute; bottom: 8px; right: 8px; background: rgba(0,0,0,0.8); backdrop-filter: blur(4px); padding: 4px 8px; border-radius: 4px; font-size: 0.65rem; color: rgba(255,255,255,0.9); opacity: 0; transition: opacity 0.2s; pointer-events: none; }
.mosaic-item:hover .attribution-overlay { opacity: 1; }

.loading-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: #000; z-index: 500; display: flex; align-items: center; justify-content: center; }
.loader-text { font-family: var(--vp-font-family-mono); color: #FFE600; font-size: 1.2rem; animation: blink 1s infinite; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }

/* Marquee Style */
.marquee-overlay {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 200; /* Above items */
  /* pointer-events: auto; if marquee has links */
}

@media (max-width: 768px) { 
  .gboy-title { font-size: 2rem; } 
  .title-bg { padding: 0.5rem; }
}
</style>
