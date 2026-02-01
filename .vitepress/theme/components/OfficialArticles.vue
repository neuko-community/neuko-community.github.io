<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { data as articles } from '../../pages/timeline/data/articles.data'
import { Article, SourceType } from '../../pages/timeline/timeline.types'
import TweetHeader from '../../pages/timeline/components/TweetHeader.vue'

const officialArticles = computed<Article[]>(() => {
  return [...articles]
    .filter((article) => article.source === SourceType.OFFICIAL)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)
})
</script>

<template>
  <section class="official-articles">
    <div class="official-articles-header">
      <h3 class="neuko-section-title">Latest Team Articles</h3>
      <a class="official-articles-link" :href="withBase('/timeline?source=official&types=article&sort=newest')">
        View more
        <span class="official-articles-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" class="chevron-icon">
            <path
              d="M9.29 6.71a1 1 0 0 0 0 1.41L13.17 12l-3.88 3.88a1 1 0 1 0 1.42 1.41l4.59-4.59a1 1 0 0 0 0-1.41l-4.59-4.59a1 1 0 0 0-1.42 0z" />
          </svg>
        </span>
      </a>
    </div>
    <div class="official-articles-grid">
      <a v-for="article in officialArticles" :key="article.id" :href="article.url" target="_blank"
        rel="noopener noreferrer" class="neuko-card official-article-card">
        <img v-if="article.image" class="official-article-image" :src="article.image" :alt="article.title" />
        <div v-if="article.tweet?.user" class="official-article-header">
          <TweetHeader :isVerified="article.tweet.user.is_blue_verified" :displayName="article.tweet.user.name"
            :username="`@${article.tweet.user.screen_name}`" :pfp="article.tweet.user.profile_image_url_https"
            :showXLogo="false" />
        </div>
        <div class="official-article-body">
          <p class="official-article-title">{{ article.title }}</p>
          <p v-if="article.subtitle" class="official-article-subtitle">
            {{ article.subtitle }}
          </p>
        </div>
      </a>
    </div>
  </section>
</template>

<style scoped>
.official-articles-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.official-articles-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.official-articles-link:hover {
  color: #fff;
}

.official-articles-icon {
  display: inline-flex;
  align-items: center;
}

.chevron-icon {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.official-articles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.official-article-card {
  text-decoration: none;
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  color: inherit;
}

.official-article-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.official-article-header {
  padding: 1rem 1.25rem 0;
}

.official-article-body {
  padding: 0.75rem 1.25rem 1.25rem;
}

.official-article-title {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
}

.official-article-subtitle {
  font-size: 0.85rem;
  color: #aaa;
  margin: 0;
}

@media (max-width: 1024px) {
  .official-articles-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .official-articles-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .official-articles-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .official-article-image {
    height: 200px;
  }
}
</style>
