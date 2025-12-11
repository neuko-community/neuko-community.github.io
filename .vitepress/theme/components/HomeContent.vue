<script setup lang="ts">
import { withBase } from 'vitepress'
import { data as tweets } from '../../data/tweets.data'
import { homeConfig } from '../../config/home'
</script>

<template>
  <div class="home-content">
    
    <!-- Row 1: Feature Shortcuts (Full Width Grid) - Text Only -->
    <div class="features-grid">
      <a v-for="feature in homeConfig.features" :key="feature.title" :href="feature.link" class="neuko-card feature-card">
        <h4>{{ feature.title }}</h4>
        <p>{{ feature.desc }}</p>
      </a>
    </div>

    <!-- Row 2: Video Intro -->
    <div class="video-intro-section">
      <div class="video-text">
        <span class="section-tag">{{ homeConfig.videoIntro.tag }}</span>
        <h2 class="video-title">{{ homeConfig.videoIntro.title }}</h2>
        <p class="intro-desc" v-html="homeConfig.videoIntro.desc1"></p>
        <p class="intro-desc">{{ homeConfig.videoIntro.desc2 }}</p>

      </div>
      <div class="video-embed">
        <video 
          class="neuko-video-embed" 
          controls 
          playsinline 
          :poster="homeConfig.videoIntro.poster"
        >
          <source :src="homeConfig.videoIntro.src" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
    </div>

    <!-- Row 3: How it Started & Latest Transmission -->
    <div class="content-grid">
      
      <!-- How it Started -->
      <div class="neuko-card large-item">
        <h3 class="neuko-section-title">{{ homeConfig.howItStarted.title }}</h3>
        <div class="card-content">
          <img v-if="homeConfig.howItStarted.image" :src="withBase(homeConfig.howItStarted.image)" alt="How it Started" class="section-img" />
          <p class="lore-text" v-html="homeConfig.howItStarted.p1"></p>
          <p class="lore-text" v-html="homeConfig.howItStarted.p2"></p>
          <a :href="homeConfig.howItStarted.link" class="neuko-action-btn">{{ homeConfig.howItStarted.cta }}</a>
        </div>
      </div>

      <!-- Latest Transmission -->
      <div class="neuko-card">
        <h3 class="neuko-section-title">{{ homeConfig.latestTransmission.title }}</h3>
        <div class="card-content">
          <div class="transmission-preview">
            <img :src="withBase(homeConfig.latestTransmission.image)" alt="Transmission Thumbnail" class="transmission-img" />
            <div class="transmission-info">
              <h4>{{ homeConfig.latestTransmission.subTitle }}</h4>
              <p>{{ homeConfig.latestTransmission.desc }}</p>
              <a :href="homeConfig.latestTransmission.link" class="watch-btn">{{ homeConfig.latestTransmission.cta }}</a>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Row 4: Community Spotlight -->
    <div class="community-section">
      <h3 class="neuko-section-title">{{ homeConfig.communitySpotlight.title }} <a :href="homeConfig.communitySpotlight.curatorLink" target="_blank" class="highlight-link">{{ homeConfig.communitySpotlight.curator }}</a></h3>
      <div class="community-grid">
        <div 
            v-for="id in homeConfig.communitySpotlight.tweetIds" 
            :key="id" 
            class="neuko-card tweet-card"
        >
          <Tweet :data="tweets[id]" />
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



/* Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 4rem; /* Increased to match other sections */
}

.feature-card {
  text-decoration: none;
  align-items: flex-start; /* Left align text */
  text-align: left;
}

.feature-card:hover {
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



.lore-text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #ccc;
  margin-bottom: 1rem;
}

.section-img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
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
  /* Inherits neuko-card styles */
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
