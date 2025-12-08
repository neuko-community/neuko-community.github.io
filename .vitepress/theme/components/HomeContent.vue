<script setup>
import { withBase } from 'vitepress'
import Tweet from './Tweet.vue'
import { data as tweets } from '../../../wiki/tweets.data.ts'
</script>

<template>
  <div class="home-content">
    
    <!-- Row 1: Feature Shortcuts (Full Width Grid) - Text Only -->
    <div class="features-grid">
      <a href="/lore" class="feature-card">
        <h4>THE STORY</h4>
        <p>The complete timeline of G*Boy, MITER-Corp, and the Operatives.</p>
      </a>
      <a href="/gboy-statues" class="feature-card">
        <h4>G*BOY STATUES</h4>
        <p>The 6" premium vinyl collection, drop details, and winners list.</p>
      </a>
      <a href="/community/overview" class="feature-card">
        <h4>ECOSYSTEM</h4>
        <p>Badges, Markets, and Community stats.</p>
      </a>
      <a href="/transmissions/overview" class="feature-card">
        <h4>TRANSMISSIONS</h4>
        <p>Archive of all video signals and hidden messages.</p>
      </a>
    </div>



    <!-- Row 2: Video Intro -->
    <div class="video-intro-section">
      <div class="video-text">
        <span class="section-tag">VIDEO INTRO</span>
        <h2 class="video-title">WHAT THE HELL IS NEUKO?</h2>
        <p class="intro-desc">
          Community member <a href="https://x.com/kezo_futura" target="_blank">@kezo_futura</a> put together an amazing <a href="https://x.com/kezo_futura/status/1993398379217584410" target="_blank">12 minute intro video</a> on everything Neuko and G*boy.
        </p>
        <p class="intro-desc">
          A must watch if you are diving in for the first time.
        </p>
      </div>
      <div class="video-embed">
        <video 
          class="neuko-video-embed" 
          controls 
          playsinline 
          poster="https://pbs.twimg.com/amplify_video_thumb/1993397046053834752/img/cJbwGhMttPFpsjOW.jpg"
        >
          <source src="https://video.twimg.com/amplify_video/1993397046053834752/vid/avc1/1920x1080/x10bIwOwtauTsexk.mp4?tag=21" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
    </div>

    <!-- Row 3: How it Started & Latest Transmission -->
    <div class="content-grid">
      
      <!-- How it Started -->
      <div class="grid-item large-item">
        <h3 class="section-title">HOW IT STARTED</h3>
        <div class="card-content">
          <p class="lore-text">
            Neuko's lore centers on a cryptic conspiracy involving psychic experiments, a mysterious character known as <strong>G*Boy (G304)</strong>, and the fictional <strong>MITER-Corp</strong>.
          </p>
          <p class="lore-text">
            What began as experiments on "homeless babies" to create psychic soldiers evolved into a story of escape, rebellion, and a decentralized network of "operatives" — you.
          </p>
          <a href="/lore" class="read-more-btn">READ THE FULL LORE →</a>
        </div>
      </div>

      <!-- Latest Transmission -->
      <div class="grid-item">
        <h3 class="section-title">LATEST TRANSMISSION</h3>
        <div class="card-content">
          <div class="transmission-preview">
            <img :src="withBase('/images/img-1.jpg')" alt="Transmission Thumbnail" class="transmission-img" />
            <div class="transmission-info">
              <h4>THE 1994 ARCHIVES</h4>
              <p>Archived video logs from September 1994 reveal the origin of G*Boy.</p>
              <a href="/transmissions/overview" class="watch-btn">VIEW LOGS</a>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Row 4: Community Spotlight -->
    <div class="community-section">
      <h3 class="section-title">COMMUNITY MEMBER SPOTLIGHT BY <a href="https://x.com/_Marcotics_" target="_blank" class="highlight-link">@_Marcotics_</a></h3>
      <div class="community-grid">
        <div class="community-card tweet-card">
          <Tweet :data="tweets['1997747437252022470']" />
        </div>
        <div class="community-card tweet-card">
          <Tweet :data="tweets['1990160825462730847']" />
        </div>
        <div class="community-card tweet-card">
          <Tweet :data="tweets['1997747437252022470']" />
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.home-content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  font-family: var(--vp-font-family-mono);
}

.section-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin-bottom: 1rem;
  text-transform: uppercase;
  border-bottom: 2px solid #333;
  padding-bottom: 0.5rem;
}

/* Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 4rem; /* Increased to match other sections */
}

.feature-card {
  background: #111;
  border: 1px solid rgba(255, 255, 255, 0.1); /* Light outline */
  padding: 1.5rem;
  border-radius: 12px;
  text-decoration: none;
  transition: transform 0.2s, border-color 0.2s;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Left align text */
  text-align: left;
}

.feature-card:hover {
  transform: translateY(-5px);
  border-color: var(--vp-c-brand-1);
}

.feature-card h4 {
  color: var(--vp-c-brand-1);
  margin: 0 0 0.5rem 0;
  font-weight: bold;
  font-size: 1.1rem;
}

.feature-card p {
  font-size: 0.85rem;
  color: #aaa;
  line-height: 1.4;
  margin: 0;
}

/* Video Intro Section */
.video-intro-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
  align-items: center;
  /* border-bottom: 1px solid #333; Removed border */
  /* padding-bottom: 4rem; Removed padding */
  padding-top: 2rem; /* Added padding above */
}

.video-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.section-tag {
  display: inline-block;
  font-size: 0.85rem;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-brand-1);
  /* border: 1px solid var(--vp-c-brand-1); Removed border */
  padding: 0; /* Removed padding to align with text */
  margin-bottom: 0.25rem; /* Reduced margin to be closer to title */
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.video-title {
  font-family: var(--vp-font-family-mono);
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.1;
  color: white;
  margin: 0 0 1.5rem 0;
  text-transform: uppercase;
}

.intro-desc {
  font-size: 1.05rem;
  line-height: 1.7;
  color: #bbb;
  margin-bottom: 1rem;
  max-width: 90%;
}

.intro-desc a {
  color: white;
  text-decoration: none;
  border-bottom: 1px solid var(--vp-c-brand-1);
  transition: all 0.2s;
  font-weight: bold;
}

.intro-desc a:hover {
  background-color: var(--vp-c-brand-1);
  color: black;
  box-shadow: 0 0 10px rgba(255, 232, 0, 0.3);
}

.video-embed {
  width: 100%;
  display: flex;
  justify-content: center;
  /* Removed border and background */
}

.neuko-video-embed {
  width: 100%;
  border-radius: 12px;
  /* Removed border to match request */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  display: block;
}

/* Grid Layouts */
.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 4rem;
}

.grid-item {
  background: #111;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 12px;
}

.lore-text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #ccc;
  margin-bottom: 1rem;
}

.read-more-btn {
  display: inline-block;
  margin-top: 1rem;
  color: var(--vp-c-brand-1);
  font-weight: bold;
  text-decoration: none;
}

.read-more-btn:hover {
  text-decoration: underline;
}

/* Transmission Card */
.transmission-preview {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.transmission-img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  object-fit: cover;
}

.transmission-info h4 {
  color: white;
  margin: 0 0 0.5rem 0;
}

.transmission-info p {
  font-size: 0.85rem;
  color: #aaa;
  margin-bottom: 1rem;
}

.watch-btn {
  display: block;
  width: 100%;
  text-align: center;
  background: #333;
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  text-decoration: none;
  transition: background 0.2s;
}

.watch-btn:hover {
  background: var(--vp-c-brand-1);
  color: black;
}

/* Community Section */
.community-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.community-card {
  background: #0a0a0a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 12px;
}

.tweet-card {
  padding: 0; /* Remove padding for tweet to fit better */
  display: flex;
  /* align-items: center; Removed to allow full height stretch */
  justify-content: center;
  overflow: hidden;
}

.highlight-link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.highlight-link:hover {
  text-decoration: underline;
}

.community-card h4 {
  color: white;
  margin: 0 0 0.5rem 0;
  font-weight: bold;
}

.community-card p {
  font-size: 0.9rem;
  color: #888;
}

/* Responsive */
@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .video-intro-section {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .home-content {
    padding: 0 1rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .community-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .video-intro-section {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .content-grid {
    margin-bottom: 2rem;
    gap: 1.5rem;
  }
}
</style>
