<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { data as comicsData } from '../../data/comics.data'
import type { Post } from '../timeline/timeline.types'

type SortOption = 'announced-desc' | 'announced-asc'

type ComicCard = {
  mediaUrl: string
  tweetUrl: string
  alt: string
  announced: string
}

const sortOption = ref<SortOption>('announced-desc')

const applyQueryParams = () => {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  const sort = params.get('sort')
  if (sort === 'announced-desc' || sort === 'announced-asc') {
    sortOption.value = sort
  }
}

const updateQueryParams = () => {
  if (typeof window === 'undefined') return
  const params: string[] = []
  params.push(`sort=${encodeURIComponent(sortOption.value)}`)

  const query = params.join('&')
  const url = query ? `${window.location.pathname}?${query}` : window.location.pathname
  window.history.replaceState(null, '', url)
}

onMounted(() => {
  applyQueryParams()
})

watch(sortOption, () => updateQueryParams())

const cards = computed<ComicCard[]>(() => {
  return (comicsData as Post[])
    .map((post) => {
      const tweet = post.tweet
      const shouldUseSecondImage = tweet?.id_str === '2006397200226550216'
      const photoIndex = shouldUseSecondImage ? 1 : 0
      const mediaUrl = tweet?.photos?.[photoIndex]?.url ?? tweet?.video?.poster ?? ''
      if (!mediaUrl) return null

      const tweetUrl = tweet
        ? `https://x.com/${tweet.user.screen_name}/status/${tweet.id_str}`
        : post.url
      const alt = tweet ? `${tweet.user.name} comic cover` : 'Comic cover'

      return {
        mediaUrl,
        tweetUrl,
        alt,
        announced: post.date
      }
    })
    .filter((item): item is ComicCard => Boolean(item))
})

const sortedCards = computed(() => {
  const items = [...cards.value]
  return sortOption.value === 'announced-asc'
    ? items.sort((a, b) => new Date(a.announced).getTime() - new Date(b.announced).getTime())
    : items.sort((a, b) => new Date(b.announced).getTime() - new Date(a.announced).getTime())
})
</script>

<template>
  <div class="comics-page">
    <header class="comics-header">
      <h1>Comics</h1>
    </header>

    <div class="comics-controls">
      <div class="comics-sort">
        <label for="comics-sort">Sort</label>
        <select id="comics-sort" v-model="sortOption">
          <option value="announced-desc">Announced (newest)</option>
          <option value="announced-asc">Announced (oldest)</option>
        </select>
      </div>
    </div>

    <div class="comics-grid">
      <a
        v-for="card in sortedCards"
        :key="card.tweetUrl"
        class="comics-card"
        :href="card.tweetUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img :src="card.mediaUrl" :alt="card.alt" loading="lazy" />
      </a>
    </div>
  </div>
</template>

<style scoped>
.comics-page {
  width: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.comics-header h1 {
  font-family: var(--vp-font-family-mono);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin: 0 0 1.5rem 0;
  text-transform: uppercase;
}

.comics-controls {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  background: var(--vp-c-bg-alt);
}

.comics-sort {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-3);
}

.comics-sort select {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-1);
  border-radius: 8px;
  padding: 0.4rem 0.7rem;
  font-size: 0.8rem;
  font-weight: 600;
  font-family: var(--vp-font-family-mono);
  cursor: pointer;
}

.comics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
}

.comics-card {
  display: block;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-alt);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.comics-card:hover {
  transform: translateY(-3px);
  border-color: var(--vp-c-brand-1);
}

.comics-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@media (max-width: 768px) {
  .comics-page {
    padding: 0 1rem;
  }

  .comics-header h1 {
    font-size: 1.9rem;
  }
}
</style>
