<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { data as pathogenzData } from '../../data/pathogenz.data'
import type { Post } from '../timeline/timeline.types'

type PathogenzRank = 'legendary' | 'mythic'
type SortOption = 'announced-desc' | 'announced-asc' | 'hp-desc' | 'hp-asc'

type PathogenzPost = Post & {
  rank: PathogenzRank
  hp: number
}

type PathogenzCard = {
  mediaUrl: string
  tweetUrl: string
  alt: string
  announced: string
  hp: number
  rank: PathogenzRank
}

const sortOption = ref<SortOption>('announced-desc')
const selectedRanks = ref<PathogenzRank[]>(['legendary', 'mythic'])

const applyQueryParams = () => {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)

  const sort = params.get('sort')
  if (sort === 'announced-desc' || sort === 'announced-asc' || sort === 'hp-desc' || sort === 'hp-asc') {
    sortOption.value = sort
  }

  const ranksParam = params.get('ranks')
  if (ranksParam) {
    const parsed = ranksParam
      .split(',')
      .map((value) => value.trim().toLowerCase())
      .filter((value) => value === 'legendary' || value === 'mythic') as PathogenzRank[]
    if (parsed.length) {
      selectedRanks.value = parsed
    }
  }
}

const updateQueryParams = () => {
  if (typeof window === 'undefined') return

  const params: string[] = []
  params.push(`sort=${encodeURIComponent(sortOption.value)}`)

  if (selectedRanks.value.length) {
    const ranksValue = selectedRanks.value.join(',')
    const encodedRanks = encodeURIComponent(ranksValue).replace(/%2C/g, ',')
    params.push(`ranks=${encodedRanks}`)
  }

  const query = params.join('&')
  const url = query ? `${window.location.pathname}?${query}` : window.location.pathname
  window.history.replaceState(null, '', url)
}

onMounted(() => {
  applyQueryParams()
})

watch([sortOption, selectedRanks], () => updateQueryParams(), { deep: true })

const cards = computed<PathogenzCard[]>(() => {
  return (pathogenzData as PathogenzPost[])
    .map((post) => {
      const tweet = post.tweet
      const mediaUrl = tweet?.photos?.[0]?.url ?? tweet?.video?.poster ?? ''
      if (!mediaUrl) return null

      const tweetUrl = tweet
        ? `https://x.com/${tweet.user.screen_name}/status/${tweet.id_str}`
        : post.url
      const alt = tweet ? `${tweet.user.name} card art` : 'Pathogenz card art'

      return {
        mediaUrl,
        tweetUrl,
        alt,
        announced: post.date,
        hp: post.hp,
        rank: post.rank
      }
    })
    .filter((item): item is PathogenzCard => Boolean(item))
})

const filteredCards = computed(() => {
  return cards.value.filter((card) => selectedRanks.value.includes(card.rank))
})

const sortedCards = computed(() => {
  const items = [...filteredCards.value]
  switch (sortOption.value) {
    case 'announced-asc':
      return items.sort((a, b) => new Date(a.announced).getTime() - new Date(b.announced).getTime())
    case 'announced-desc':
      return items.sort((a, b) => new Date(b.announced).getTime() - new Date(a.announced).getTime())
    case 'hp-asc':
      return items.sort((a, b) => a.hp - b.hp)
    case 'hp-desc':
      return items.sort((a, b) => b.hp - a.hp)
    default:
      return items
  }
})
</script>

<template>
  <div class="pathogenz-page">
    <header class="pathogenz-header">
      <img class="pathogenz-logo" src="/images/pathogenz.jpg" alt="Pathogenz TCG" loading="lazy" />
      <div class="pathogenz-header-content">
        <h1>Pathogenz TCG</h1>
        <p class="pathogenz-subtitle">
          Collectible trading card game inspired by the
          <a class="pathogenz-mention" href="https://x.com/neukoai" target="_blank" rel="noopener noreferrer">
            @neukoai
          </a>
          universe. Created by badge holding community members.
        </p>
      </div>
    </header>
    <div class="pathogenz-link-container">
      <a class="pathogenz-link" href="https://x.com/PathogenzTCG" target="_blank" rel="noopener noreferrer">
        https://x.com/PathogenzTCG
      </a>
    </div>

    <div class="pathogenz-controls">
      <div class="pathogenz-sort">
        <label for="pathogenz-sort">Sort</label>
        <select id="pathogenz-sort" v-model="sortOption">
          <option value="announced-desc">Announced (newest)</option>
          <option value="announced-asc">Announced (oldest)</option>
          <option value="hp-desc">HP (high to low)</option>
          <option value="hp-asc">HP (low to high)</option>
        </select>
      </div>
      <div class="pathogenz-filters">
        <span class="filter-label">Rank</span>
        <label class="filter-option">
          <input v-model="selectedRanks" type="checkbox" value="legendary" />
          Legendary
        </label>
        <label class="filter-option">
          <input v-model="selectedRanks" type="checkbox" value="mythic" />
          Mythic
        </label>
      </div>
    </div>

    <div class="pathogenz-grid">
      <a v-for="card in sortedCards" :key="card.tweetUrl" class="pathogenz-card" :href="card.tweetUrl" target="_blank"
        rel="noopener noreferrer">
        <img :src="card.mediaUrl" :alt="card.alt" loading="lazy" />
      </a>
    </div>
  </div>
</template>

<style scoped>
.pathogenz-page {
  width: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.pathogenz-header {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.pathogenz-logo {
  width: 120px;
  height: 120px;
  border-radius: 16px;
  object-fit: cover;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-alt);
}

.pathogenz-header h1 {
  font-family: var(--vp-font-family-mono);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
}

.pathogenz-subtitle {
  color: var(--vp-c-text-2);
  font-size: 1rem;
  margin: 0;
  max-width: 520px;
}

.pathogenz-mention {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.pathogenz-link-container {
  display: flex;
  margin-bottom: 1.5rem;
}

.pathogenz-link {
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  border: 1px solid var(--vp-c-border);
  padding: 0.5rem 0.85rem;
  border-radius: 999px;
  background: var(--vp-c-bg-alt);
}

.pathogenz-link:hover {
  border-color: var(--vp-c-brand-1);
}

.pathogenz-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
}

.pathogenz-controls {
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

.pathogenz-sort {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-3);
}

.pathogenz-sort select {
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

.pathogenz-filters {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.filter-label {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-3);
}

.filter-option {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  cursor: pointer;
}

.filter-option input {
  accent-color: var(--vp-c-brand-1);
}

.pathogenz-card {
  display: block;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-alt);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.pathogenz-card:hover {
  transform: translateY(-3px);
  border-color: var(--vp-c-brand-1);
}

.pathogenz-card img {
  width: 100%;
  height: 100%;
  /* aspect-ratio: 3 / 4; */
  object-fit: cover;
  display: block;
}

@media (max-width: 768px) {
  .pathogenz-page {
    padding: 0 1rem;
  }

  .pathogenz-logo {
    width: 96px;
    height: 96px;
  }

  .pathogenz-header h1 {
    font-size: 1.9rem;
  }

  .pathogenz-link {
    width: fit-content;
  }
}
</style>
