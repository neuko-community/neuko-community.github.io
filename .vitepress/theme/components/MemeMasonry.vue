```vue
<script setup lang="ts">
import { ref, onMounted, nextTick, shallowRef, watch, reactive, computed } from 'vue'
import ScrollingBar from './ScrollingBar.vue'

// --- Types & Utils ---
import type { Meme } from '../../types'
import { getMemeImageUrl, getMemeSrcSet } from '../../utils/imageUrl'
import { data as loadedMemes } from '../../data/memes.data'

// --- Composables ---
import { useMasonryLayout } from '../../composables/useMasonryLayout'
import { useDraggableCanvas } from '../../composables/useDraggableCanvas'
import { useVisibilityCulling } from '../../composables/useVisibilityCulling'

// props removed as unused and causing collision
const isDev = import.meta.env.DEV

// --- Configuration ---
const CELL_SIZE = 100 
const GUTTER = 16     
const CHUNK_SIZE = 1000 

// --- State ---
const containerRef = ref<HTMLElement | null>(null)
const memes = shallowRef<Meme[]>(loadedMemes)
const showReturnCenter = ref(false)
const isLoading = ref(true)
const loadingProgress = ref(0)
const seenIds = reactive(new Set<string>())
const debugStats = ref({ visibleCount: 0, totalCount: 0, loadedSizeMB: '0.00' })

// 1. Layout Logic
const { 
  allItems, 
  chunks, 
  contentBounds, 
  canvasSize,
  calculateLayout 
} = useMasonryLayout({ cellSize: CELL_SIZE, gutter: GUTTER, chunkSize: CHUNK_SIZE })

const CANVAS_SIZE = computed(() => canvasSize.value.size)

// Helper for scroll center (Must be defined before usage)
function checkScrollCenter() {
  if (!containerRef.value) return
  const scrollX = containerRef.value.scrollLeft
  const scrollY = containerRef.value.scrollTop
  const cX = (CANVAS_SIZE.value - window.innerWidth) / 2
  const cY = (CANVAS_SIZE.value - window.innerHeight) / 2
  const dist = Math.sqrt(Math.pow(scrollX - cX, 2) + Math.pow(scrollY - cY, 2))
  showReturnCenter.value = dist > 600
}

// 2. Visibility Culling
const scale = ref(1)

const { visibleItems, updateVisibility } = useVisibilityCulling({
  containerRef,
  chunks,
  scale,
  chunkSize: CHUNK_SIZE,
  onCenterCheck: checkScrollCenter
})

// 3. Draggable Canvas
const {
  // isDragging, // unused
  dragThresholdPassed,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onWheel,
  scrollToCenter,
  scale: draggableScale
} = useDraggableCanvas(containerRef, {
  contentBounds,
  canvasSize: computed(() => canvasSize.value.size),
  updateVisibility
})

// Sync scale from draggable
watch(draggableScale, (val) => {
    scale.value = val
}, { flush: 'sync' })

// 4. Interaction Handlers & Helpers
function getImageUrl(meme: Meme, width?: number) {
  if (!meme) return ''
  return getMemeImageUrl(meme.cf_asset_id, width ? { width } : undefined)
}

function getSrcSet(meme: Meme) {
  if (!meme) return ''
  return getMemeSrcSet(meme.cf_asset_id)
}

function onLinkClick(e: MouseEvent) {
  if (dragThresholdPassed.value) {
    e.preventDefault()
    e.stopPropagation()
  }
}

// 5. Layout Execution
function runLayout() {
  isLoading.value = true
  // Mobile check
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const { total, processGen, placedItems } = calculateLayout(memes.value, isMobile)
  
  if (total === 0) {
      isLoading.value = false
      return
  }

  // Initial items
  allItems.value = placedItems

  function process() {
    const start = performance.now()
    let res = processGen?.next()
    while (!res?.done && performance.now() - start < 10) {
        res = processGen?.next()
    }
    
    if (res?.done) {
        // Finished - Clone array to trigger reactivity update for shallowRef if needed
        allItems.value = [...allItems.value] 
        loadingProgress.value = 100
        isLoading.value = false
        updateVisibility()
        nextTick(() => scrollToCenter())
    } else {
        // Progress
        if (typeof res?.value === 'number') {
             loadingProgress.value = Math.floor((res.value / total) * 100)
        }
        requestAnimationFrame(process)
    }
  }
  requestAnimationFrame(process)
}

function updateDebugStats() {
  debugStats.value.visibleCount = visibleItems.value.length
  debugStats.value.totalCount = allItems.value.length
  
  const resources = performance.getEntriesByType('resource')
  let totalBytes = 0
  resources.forEach(entry => {
    // @ts-expect-error - Resource timing type
    if (entry.decodedBodySize) totalBytes += entry.decodedBodySize
  })
  debugStats.value.loadedSizeMB = (totalBytes / (1024 * 1024)).toFixed(2)
}

onMounted(() => {
    runLayout()
    setInterval(updateDebugStats, 1000)
})

watch(visibleItems, (items) => {
    items.forEach(item => {
        if (item.data?.cf_asset_id) {
            seenIds.add(item.data.cf_asset_id)
        }
    })
}, { deep: true })
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
      <div class="loader-text">DROWN THEM IN HIS IMAGE... ({{ loadingProgress }}%)</div>
    </div>

    <!-- Nav -->
    <a href="/" class="nav-button home-button" title="Back to Home"><span class="icon">⌂</span> HOME</a>
    <div class="nav-button seen-counter" v-if="!isLoading">DISCOVERED: {{ seenIds.size }} / {{ memes.length }}</div>
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
            <h1 class="gboy-title">G*BOY MEMES</h1>
            <div class="gboy-subtitle">[ {{ memes.length }} IMAGES LOADED ]</div>
          </div>
        </div>

        <a v-else-if="item.data" 
           :href="`https://memedepot.com/d/gboy/${item.data.slug}`" 
           target="_blank" 
           rel="noopener" 
           class="meme-link"
           draggable="false"
           @click="onLinkClick($event)"
        >
          <div class="media-wrapper">
             <!-- Removed video tag since we filtered them out -->
            <img 
              :src="getImageUrl(item.data, 400)" 
              :srcset="getSrcSet(item.data)"
              sizes="(max-width: 768px) 50vw, 400px"
              :alt="item.data.title" 
              class="mosaic-media"
              :loading="index < 12 ? 'eager' : 'lazy'"
              draggable="false"
            />
          </div>
          <div class="attribution-overlay">
            <span class="attribution-text">by </span>
            <span class="attribution-handle">@{{ item.data.uploader?.username || 'Unknown' }}</span>
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
  flex-direction: column;
}
.gboy-title { font-family: "helvetica-lt-pro", sans-serif; font-size: 5rem; font-weight: 900; text-align: center; line-height: 0.9; color: #FFFF0A; text-transform: uppercase; margin: 0; white-space: nowrap; }
.gboy-subtitle { font-family: var(--vp-font-family-mono); color: #FFE600; font-size: 1.2rem; margin-top: 0.5rem; font-weight: bold; letter-spacing: 1px; }
.nav-button { position: fixed; z-index: 200; font-family: var(--vp-font-family-mono); font-weight: bold; cursor: pointer; background: rgba(0,0,0,0.8); color: #fff; border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; backdrop-filter: blur(8px); padding: 8px 12px; transition: all 0.2s ease; text-decoration: none; display: flex; align-items: center; gap: 6px; font-size: 0.8rem; }
.nav-button:hover { background: #fff; color: #000; border-color: #fff; }
.home-button { top: 20px; left: 20px; }
.seen-counter { bottom: 80px; left: 20px; border: 1px solid #FFE600; color: #FFE600; background: #000; font-family: var(--vp-font-family-mono); font-size: 0.8rem; padding: 8px 12px; cursor: default; box-shadow: 0 4px 12px rgba(0,0,0,0.5); }
.seen-counter:hover { background: #FFE600; color: #000; }
.center-button { bottom: 80px; right: 20px; background: #FFE600; color: #000; border: none; box-shadow: 0 4px 12px rgba(255, 230, 0, 0.3); opacity: 0; transform: translateY(20px); pointer-events: auto; transition: opacity 0.3s ease, transform 0.3s ease; }
.center-button:not(.visible) { opacity: 0; transform: translateY(20px); pointer-events: none; }
.meme-link { display: block; width: 100%; height: 100%; cursor: pointer; -webkit-user-drag: none; user-drag: none; text-decoration: none; border: none; }
.meme-link:hover { text-decoration: none; border: none; }
.media-wrapper { width: 100%; height: 100%; }
.mosaic-media { width: 100%; height: 100%; object-fit: cover; display: block; transition: opacity 0.3s; pointer-events: none; -webkit-user-drag: none; user-drag: none; }
.attribution-overlay { 
  position: absolute; 
  bottom: 8px; 
  right: 8px; 
  background: #FFE600; 
  padding: 4px 8px; 
  border-radius: 4px; 
  font-size: 0.65rem; 
  color: #000; 
  font-weight: bold; 
  opacity: 0; 
  transition: opacity 0.2s; 
  pointer-events: none;
  max-width: calc(100% - 16px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
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
