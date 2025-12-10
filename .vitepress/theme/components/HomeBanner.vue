<script setup>
import { withBase } from 'vitepress'
import { ref, onMounted } from 'vue'

const bgImage = ref(withBase('/images/home-banner.jpg'))
const creatorHandle = ref('')
const badgeStats = ref({ Rabbit: 0, Moth: 0, Snake: 0 })

onMounted(async () => {
  // Fetch badge stats
  try {
    const res = await fetch('/badge_stats.json')
    if (res.ok) {
      badgeStats.value = await res.json()
    }
  } catch (e) {
    console.error('Failed to load badge stats', e)
  }

  // Use glob only to get filenames. Eager is false to avoid importing public assets via relative path,
  // which triggers Vite warnings.
  const images = import.meta.glob('../../../public/hero/*.{jpg,jpeg,png,webp}', { eager: false })
  const paths = Object.keys(images)
  
  if (paths.length > 0) {
    const randomPath = paths[Math.floor(Math.random() * paths.length)]
    const filename = randomPath.split('/').pop()
    
    // Construct URL manually for public assets
    bgImage.value = withBase(`/hero/${filename}`)
    creatorHandle.value = filename.substring(0, filename.lastIndexOf('.')).replace(/-\d+$/, '')
  }
})
</script>

<template>
  <div class="banner-container">
    <div class="banner-wrapper">
      <!-- Top Section: Image & Main Text -->
      <div class="banner-top" :style="{ backgroundImage: `url(${bgImage})` }">
        <div class="banner-overlay">
          <div class="banner-main-text">
            <img :src="withBase('/images/badge-array.png')" class="badge-detail" alt="Badge Detail" />
            <h1 class="title">THE COMMUNITY </h1>
            <h2 class="subtitle">NEUKO<span class="lowered-asterisk">*</span>WIKI</h2>
            <p class="tagline">UNOFFICIAL ARCHIVE OF NEUKO.AI AND THE STORY OF G*BOY SO FAR</p>
          </div>
        </div>
        
        <div v-if="creatorHandle" class="attribution-overlay">
            <span class="attribution-text">IMG BY: </span>
            <a :href="`https://x.com/${creatorHandle}`" target="_blank" class="attribution-link">@{{ creatorHandle.toUpperCase() }}</a>
        </div>
      </div>

      <!-- Bottom Section: Info Bar -->
      <div class="banner-bottom">
        <div class="bottom-left">
          <div class="ticker-text">
            <div class="links-group">
                <span>BUY ON: </span>
                <a href="https://magiceden.us/marketplace/gboy_badges_" target="_blank" class="banner-link">MAGIC EDEN</a>
                <span class="separator">|</span>
                <a href="https://x.com/neukoai" target="_blank" class="banner-link">OFFICIAL X ACCOUNT @NEUKOAI</a>
            </div>
            
            <span class="separator mobile-hide">|</span>
            
            <!-- Badge Stats -->
            <a href="https://x.com/neukoai/status/1998483693195899014" target="_blank" class="badge-stats-group">
                <span class="stat-item" title="Rabbit Sent / Total">
                    <img :src="withBase('/images/badges/rabbit.png')" alt="Rabbit" class="badge-icon" /> 
                    {{ badgeStats.Rabbit }}/200 <span class="mobile-hide">({{ Math.round((badgeStats.Rabbit/200)*100) }}%)</span>
                </span>
                <span class="stat-item" title="Moth Sent / Total">
                     <img :src="withBase('/images/badges/moth.png')" alt="Moth" class="badge-icon" /> 
                     {{ badgeStats.Moth }}/462 <span class="mobile-hide">({{ Math.round((badgeStats.Moth/462)*100) }}%)</span>
                </span>
                <span class="stat-item" title="Snake Sent / Total">
                     <img :src="withBase('/images/badges/snake.png')" alt="Snake" class="badge-icon" /> 
                     {{ badgeStats.Snake }}/834 <span class="mobile-hide">({{ Math.round((badgeStats.Snake/834)*100) }}%)</span>
                </span>
                
                <span class="highlight-text mobile-hide">
                     sent to save G*BOY
                </span>
                <span class="highlight-text mobile-only">
                     sent
                </span>
            </a>
          </div>
        </div>

        <div class="bottom-right">
          <a href="/whats-neuko" class="action-btn primary">START HERE</a>
          <a href="https://gboyspecial.com" target="_blank" class="action-btn secondary">GBOYSPECIAL.COM</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.banner-container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto 2rem auto;
  padding: 0 2rem;
}

.banner-wrapper {
  position: relative;
  width: 100%;
  height: auto; /* Fixed: Remove fixed height to avoid gap */
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1); /* Light outline */
}

.banner-top {
  position: relative;
  width: 100%;
  height: 320px;
  background-size: cover;
  background-position: center;
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  padding-left: 4rem;
}

.banner-main-text {
  text-align: left;
}

.title, .subtitle {
  font-family: var(--vp-font-family-mono);
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1;
  color: var(--vp-c-brand-1); /* Yellow */
  margin: 0;
  word-spacing: -0.3em; /* Tighten space for monospace */
}

.badge-detail {
    height: 30px;
    width: auto;
    margin-bottom: 0.5rem;
    display: block;
}

.subtitle {
  margin-bottom: 0.5rem;
}

.tagline {
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem; /* Doubled from 0.8rem */
  margin-top: 1rem;
  color: #ccc;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.banner-bottom {
  background-color: var(--vp-c-brand-1); /* Yellow Background */
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem 0 4rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.7rem;
  color: black; /* Black Text */
  border-top: 1px solid #333;
}

.bottom-left {
    display: flex;
    align-items: center;
    flex: 1;
    overflow: hidden;
}

.bottom-right {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.ticker-text {
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.links-group {
    display: flex;
    align-items: center;
    white-space: nowrap;
}

.badge-stats-group {
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    margin: 0 0.5rem;
    color: black;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    padding: 2px 8px;
    background: rgba(255, 255, 255, 0.1);
    text-decoration: none;
    transition: all 0.2s;
}

.badge-stats-group:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: black;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.stat-item {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-weight: 800;
}

.badge-icon {
    height: 1.8em;
    width: auto;
    display: inline-block;
    vertical-align: middle;
}

.highlight-text {
    text-decoration: none;
    margin-left: 0.5rem;
    font-weight: 800;
    border-bottom: none;
}

.arrow {
    color: black;
    margin: 0 0.25rem;
}

.action-btn {
    padding: 8px 20px;
    font-weight: bold;
    border-radius: 8px;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 0.75rem;
    transition: all 0.2s;
    border: 1px solid black;
    white-space: nowrap;
}

.action-btn.primary {
    background-color: black;
    color: var(--vp-c-brand-1);
}

.action-btn.primary:hover {
    background-color: #333;
    color: white;
}

.action-btn.secondary {
    background-color: transparent;
    color: black;
}

.action-btn.secondary:hover {
    background-color: black;
    color: var(--vp-c-brand-1);
}

/* Responsive */
.mobile-only {
    display: none;
}

@media (max-width: 1024px) {
    .banner-bottom {
        height: auto;
        padding: 1rem;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: center;
    }
    
    .bottom-left, .bottom-right {
        width: 100%;
        justify-content: center;
        text-align: center;
    }

    .attribution-overlay {
        right: 1rem;
    }
}

@media (max-width: 768px) {
    .banner-container {
        padding: 0 1rem;
        margin-bottom: 1rem;
    }

    .banner-top {
        height: 240px;
    }
    .banner-overlay {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
    }
    .title {
        font-size: 1.9rem !important; /* Force uniform size */
    }
    .subtitle {
        font-size: 1.9rem !important; /* Force uniform size */
    }
    .tagline {
        font-size: 0.9rem; /* Doubled from 0.6rem */
        line-height: 1.4;
        max-width: 85% ; /* Shorten line wrapping by 20% */
    }
    .desktop-only {
        display: none;
    }
    
    /* Hide specific mobile-hide elements */
    .mobile-hide {
        display: none !important;
    }
    
    .mobile-only {
        display: inline-block !important; /* or inline, but consistent */
    }
    
    .banner-bottom {
        flex-direction: column;
        height: auto;
        padding: 1rem 0.5rem;
        gap: 0.5rem; /* Tighter gap */
    }

    .bottom-left, .bottom-right {
        width: 100%;
        justify-content: center;
        flex-wrap: wrap;
    }

    .ticker-text {
        font-size: 0.65rem; /* Small font to fit text */
        flex-direction: column; /* Stack top lines vs bottom lines */
        flex-wrap: nowrap;
        justify-content: center;
        height: auto;
        line-height: 1.4;
        overflow: visible;
        width: 100%;
    }
    
    .links-group {
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        gap: 0.25rem;
        width: 100%;
    }

    .badge-stats-group {
        flex-wrap: nowrap; /* Force single line */
        white-space: nowrap;
        justify-content: center;
        margin: 0.25rem 0 0 0;
        width: 100%;
        gap: 0.5rem; /* Reduce gap */
    }

    .action-btn {
        width: auto; /* Allow buttons to size naturally or flex */
        flex: 1; /* Make them share width equally */
        text-align: center;
        margin-bottom: 0; /* Remove bottom margin */
        padding: 8px 12px; /* Slightly smaller padding for mobile */
        font-size: 0.7rem; /* Slightly smaller text */
    }
    
    .bottom-right {
        flex-direction: row; /* Side by side */
        gap: 0.5rem;
        padding: 0 0.5rem; /* Ensure buttons don't touch edges */
        margin-top: 0.5rem;
    }
}

.banner-link {
    color: black;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
    margin: 0 0.25rem;
}

.banner-link:hover {
    border-bottom-color: black;
}

.separator {
    color: rgba(0,0,0,0.4);
    margin: 0 0.25rem;
}

.lowered-asterisk {
    position: relative;
    top: 0.25em;
    font-size: 0.68em;
    margin: 0 0.05em;
}

.attribution-overlay {
    position: absolute;
    bottom: 0.25rem;
    right: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--vp-font-family-mono);
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.6);
    z-index: 10;
}

.attribution-text {
    font-weight: 400;
}

.attribution-link {
    color: white;
    font-weight: 700;
    text-decoration: none;
}

.attribution-link:hover {
    text-decoration: underline;
}
</style>
