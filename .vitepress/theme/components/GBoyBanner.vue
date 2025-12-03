<script setup>
import { withBase } from 'vitepress'
</script>

<template>
  <div class="gboy-banner-container">
    <div class="gboy-banner-wrapper">
      <div class="gboy-banner-image" :style="{ backgroundImage: `url(${withBase('/home-banner-2.jpg')})` }">
        <div class="gboy-banner-overlay">
          <div class="gboy-banner-text">
            <h2 class="gboy-title">WHO TF IS G*BOY??</h2>
            <p class="gboy-description">
              <strong style="color: var(--vp-c-brand-1);">I LITERALLY DON'T KNOW</strong> BUT SO FAR HE'S THE MAIN CHARACTER IN A STORY OF OCCULT MILITARY INDUSTRIAL SECRETS, PSIONIC EXPERIMENT ASSASSIN MONSTERS AND A WORLD-ENDING HIVE MIND HOMOGENY CONSPIRACY.
            </p>
            <a href="/lore" class="read-more-btn">READ THE FULL LORE →</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gboy-banner-container {
  width: 100%;
  max-width: 1200px; /* Match HomeContent max-width */
  margin: 4rem auto 2rem auto;
  padding: 0 2rem;
}

.gboy-banner-wrapper {
  position: relative;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.gboy-banner-image {
  position: relative;
  width: 100%;
  height: 320px;
  background-size: cover;
  background-position: center;
}

.gboy-banner-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6); /* Slightly darker for readability */
  display: flex;
  align-items: center;
  padding: 0 4rem;
}

.gboy-banner-text {
  text-align: left;
  max-width: 800px;
}

.gboy-title {
  font-family: var(--vp-font-family-mono);
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
  color: var(--vp-c-brand-1);
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  border: none !important; /* Remove default VitePress border */
}

.gboy-description {
  font-family: var(--vp-font-family-mono);
  font-size: 1.1rem;
  line-height: 1.4;
  color: #fff;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

.gboy-subtext {
  font-family: var(--vp-font-family-mono);
  font-size: 1rem;
  color: #ccc;
  text-transform: uppercase;
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
    .gboy-banner-container {
        padding: 0 1rem;
        margin: 2rem auto;
    }

    .gboy-banner-image {
        height: auto;
        min-height: 400px; /* Increased height for text */
    }
    
    .gboy-banner-overlay {
        padding: 2rem 1.5rem;
        align-items: flex-start; /* Align to top on mobile */
        padding-top: 3rem;
    }

    .gboy-title {
        font-size: 1.8rem;
    }

    .gboy-description {
        font-size: 0.9rem;
    }
    
    .gboy-subtext {
        font-size: 0.8rem;
    }
}
</style>
