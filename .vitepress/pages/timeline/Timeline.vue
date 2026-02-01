<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  // timelineEvents,
  upcomingEvents,
  keyMilestones,
  formatDate,
  getMonthYear
} from '../../data/timelineEvents'
// import { articles } from './data/articles.data'
import { data as articles } from './data/articles.data'
import { data as interviews } from './data/interview.data'
import { data as music } from './data/music.data'
import { data as posts } from './data/posts.data'
import { data as spaces } from './data/spaces.data'
import { Article, EventType, SourceType, type Post, type TimelineEvent } from './timeline.types'
import TimelineArticle from './components/TimelineArticle.vue'
import TimelinePost from './components/TimelinePost.vue'

type SortOrder = 'newest' | 'oldest'

const sortOrder = ref<SortOrder>('newest')
const showOfficial = ref(true)
const showCommunity = ref(true)
const selectedUser = ref('all')

const typeOptions = [
  { value: EventType.ARTICLE, label: 'Articles' },
  { value: EventType.POST, label: 'Posts' },
  { value: EventType.THREAD, label: 'Threads' },
  { value: EventType.INTERVIEW, label: 'Interviews' },
  { value: EventType.VIDEO, label: 'Videos' },
  { value: EventType.MUSIC, label: 'Music' },
  { value: EventType.SPACES, label: 'Spaces' },
  { value: EventType.MILESTONE, label: 'Milestones' },
  { value: EventType.OTHER, label: 'Other' }
]

const activeTypes = ref<EventType[]>(typeOptions.map((option) => option.value))

const applyQueryParams = () => {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)

  const source = params.get('source')?.toLowerCase()
  if (source === 'official') {
    showOfficial.value = true
    showCommunity.value = false
  } else if (source === 'community') {
    showOfficial.value = false
    showCommunity.value = true
  } else if (source === 'all') {
    showOfficial.value = true
    showCommunity.value = true
  }

  const sort = params.get('sort')?.toLowerCase()
  if (sort === 'newest' || sort === 'oldest') {
    sortOrder.value = sort as SortOrder
  }

  const typesParam = params.get('types')
  if (typesParam) {
    const allowedTypes = new Set(Object.values(EventType))
    const parsedTypes = typesParam
      .split(',')
      .map((value) => value.trim().toLowerCase())
      .filter((value) => allowedTypes.has(value as EventType)) as EventType[]

    if (parsedTypes.length) {
      activeTypes.value = parsedTypes
    }
  }

  const user = params.get('user')
  if (user) {
    selectedUser.value = user
  }
}

onMounted(() => {
  applyQueryParams()
})

const userOptions = computed(() => {
  const userMap = new Map<string, string>()
  for (const event of [...posts, ...articles, ...spaces, ...interviews, ...music]) {
    const screenName = event.tweet?.user?.screen_name
    if (!screenName) {
      continue
    }
    const displayName = event.tweet?.user?.name || screenName
    userMap.set(screenName, displayName)
  }
  return [
    { value: 'all', label: 'ALL USERS' },
    ...Array.from(userMap.entries())
      .sort((a, b) => a[1].localeCompare(b[1]))
      .map(([screenName, name]) => ({
        value: screenName,
        label: `${name} (@${screenName})`
      }))
  ]
})

const sortedEvents = computed(() => {
  const events: TimelineEvent[] = [...posts, ...articles, ...spaces, ...interviews, ...music]
  if (sortOrder.value === 'newest') {
    return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }
  return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
})

const filteredEvents = computed(() => {
  return sortedEvents.value.filter((event) => {
    const sourceAllowed =
      (event.source === SourceType.OFFICIAL && showOfficial.value) ||
      (event.source === SourceType.COMMUNITY && showCommunity.value)
    const typeAllowed = activeTypes.value.includes(event.type)
    const userAllowed =
      selectedUser.value === 'all' ||
      (event.tweet?.user?.screen_name && event.tweet.user.screen_name === selectedUser.value)
    return sourceAllowed && typeAllowed && userAllowed
  })
})

// Group events by month/year
const groupedEvents = computed(() => {
  const groups: Map<string, TimelineEvent[]> = new Map()

  for (const event of filteredEvents.value) {
    const monthYear = getMonthYear(event.date)
    if (!groups.has(monthYear)) {
      groups.set(monthYear, [])
    }
    groups.get(monthYear)!.push(event)
  }

  return groups
})

function toggleSort() {
  sortOrder.value = sortOrder.value === 'newest' ? 'oldest' : 'newest'
}

function selectAllTypes() {
  activeTypes.value = typeOptions.map((option) => option.value)
}

function clearAllTypes() {
  activeTypes.value = []
}

function isArticleEvent(event: TimelineEvent): event is Article {
  return event.type === EventType.ARTICLE
}

// function isLegacyEvent(event: TimelineEvent): event is LegacyEvent {
//   return event.type !== EventType.ARTICLE
// }

function isPostEvent(event: TimelineEvent): event is Post {
  return (
    event.type === EventType.POST
    || event.type === EventType.THREAD
    || event.type === EventType.SPACES
    || event.type === EventType.VIDEO
    || event.type === EventType.INTERVIEW
    || event.type === EventType.MUSIC
  )
}
</script>

<template>
  <div class="timeline-container">
    <!-- Header -->
    <div class="timeline-header">
      <div class="header-content">
        <h1>Neuko Timeline</h1>
        <p class="subtitle">
          Complete chronological log of Neuko events, milestones, and discoveries.
        </p>
      </div>
    </div>

    <!-- Upcoming Events -->
    <div v-if="upcomingEvents.length" class="upcoming-section">
      <h2 class="section-title">Upcoming Events</h2>
      <div class="events-list">
        <div
          v-for="(event, idx) in upcomingEvents"
          :key="idx"
          class="event-card neuko-card upcoming"
        >
          <div class="event-header">
            <span class="event-date">{{ formatDate(event.date) }}</span>
            <h3 class="event-title">{{ event.title }}</h3>
          </div>
          <p class="event-description">{{ event.description }}</p>
          <div v-if="event.significance" class="event-significance">
            <span class="label">Significance:</span> {{ event.significance }}
          </div>
        </div>
      </div>
    </div>

    <!-- Key Milestones -->
    <div class="milestones-section">
      <h2 class="section-title">Key Milestones</h2>
      <ul class="milestones-list">
        <li v-for="(milestone, idx) in keyMilestones" :key="idx">{{ milestone }}</li>
      </ul>
    </div>

    <!-- Timeline Events -->
    <div class="timeline">
      <div class="timeline-controls">
        <div class="controls-row">
          <button class="sort-btn sort-btn--compact" @click="toggleSort">
            <span class="sort-icon">{{ sortOrder === 'newest' ? '↓' : '↑' }}</span>
            {{ sortOrder === 'newest' ? 'Newest' : 'Oldest' }}
          </button>
          <div class="user-filter">
            <select v-model="selectedUser" class="filter-select filter-select--fill">
              <option v-for="user in userOptions" :key="user.value" :value="user.value">
                {{ user.label }}
              </option>
            </select>
          </div>
        </div>
        <div class="filters">
          <div class="filter-section">
            <span class="filter-title">Source</span>
            <div class="filter-group">
              <label class="filter-option">
                <input v-model="showOfficial" type="checkbox" />
                Official
              </label>
              <label class="filter-option">
                <input v-model="showCommunity" type="checkbox" />
                Community
              </label>
            </div>
          </div>
          <div class="filter-section">
            <div class="filter-section-header">
              <span class="filter-title">Type</span>
              <div class="filter-actions">
                <button class="filter-action-btn" type="button" @click="selectAllTypes">
                  Select All
                </button>
                <button class="filter-action-btn" type="button" @click="clearAllTypes">
                  Clear All
                </button>
              </div>
            </div>
            <div class="type-chips">
              <label v-for="option in typeOptions" :key="option.value" class="type-chip">
                <input v-model="activeTypes" type="checkbox" :value="option.value" />
                <span>{{ option.label }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <template v-for="[monthYear, events] in groupedEvents" :key="monthYear">
        <div class="month-section">
          <h2 class="month-header">{{ monthYear }}</h2>

          <div class="events-list">
            <template v-for="(event, idx) in events" :key="idx">
              <TimelineArticle v-if="isArticleEvent(event)" :article="event" />
              <!-- <TimelineLegacy v-else-if="isLegacyEvent(event)" :event="event" /> -->
              <TimelinePost v-if="isPostEvent(event)" :post="event" />
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.timeline-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Override VitePress h2 default border */
.timeline-container h2 {
  border-top: none !important;
  padding-top: 0 !important;
  margin-top: 0 !important;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.header-content h1 {
  font-family: var(--vp-font-family-mono);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 1rem;
  margin: 0;
}

.sort-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-1);
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
}

.sort-btn--compact {
  width: 150px;
  justify-content: center;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
}

.timeline-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.controls-row {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.user-filter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  cursor: pointer;
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 10px;
  background: var(--vp-c-bg-alt);
}

.filter-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.filter-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.filter-action-btn {
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
  align-items: center;
}

.filter-title {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-3);
}

.filter-option {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  cursor: pointer;
}

.filter-option input {
  accent-color: var(--vp-c-brand-1);
}

.type-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.type-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 999px;
  padding: 0.35rem 0.75rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  cursor: pointer;
  background: var(--vp-c-bg);
  transition: all 0.2s;
  margin: 0.25rem 0;
}

.type-chip input {
  display: none;
}

.type-chip:has(input:checked) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-1) 12%, var(--vp-c-bg));
}

.type-chip:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.filter-select {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-1);
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: var(--vp-font-family-mono);
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.filter-select--fill {
  width: 100%;
}

.filter-select:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--vp-c-brand-1) 25%, transparent);
}

.filter-select:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.filter-action-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.sort-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.sort-icon {
  font-size: 1rem;
}

/* Timeline */
.timeline {
  position: relative;
  margin-top: 1rem;
}

.month-section {
  margin-bottom: 3rem;
}

.month-header {
  font-family: var(--vp-font-family-mono);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin: 0 0 1.5rem 0;
  padding-top: 0;
  padding-bottom: 0.75rem;
  border-top: none;
  border-bottom: 2px solid var(--vp-c-border);
  text-transform: uppercase;
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.event-card {
  position: relative;
  padding: 1.5rem;
}

.event-card.upcoming {
  border-color: var(--vp-c-brand-1);
  border-style: dashed;
}

.event-date {
  display: inline-block;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  color: var(--vp-c-brand-1);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.event-title {
  font-family: var(--vp-font-family-mono);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0;
  text-transform: uppercase;
}

.event-description {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.event-embed {
  margin: 1rem 0 0 0;
}

.event-caption,
.event-video,
.event-significance {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin: 0.75rem 0;
  line-height: 1.5;
}

.label {
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 600;
}

.event-details,
.event-section ul {
  margin: 0.75rem 0;
  padding-left: 1.25rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.6;
}

.event-details li,
.event-section li {
  margin-bottom: 0.35rem;
}

.event-section {
  margin: 1rem 0;
}

.event-section .label {
  display: block;
  margin-bottom: 0.5rem;
}

/* Sections */
.section-title {
  font-family: var(--vp-font-family-mono);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin: 0 0 1.5rem 0;
  padding-top: 0;
  padding-bottom: 0.75rem;
  border-top: none;
  border-bottom: 2px solid var(--vp-c-border);
  text-transform: uppercase;
}

.upcoming-section {
  margin-bottom: 3rem;
}

.milestones-section {
  margin-bottom: 3rem;
}

.milestones-list {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 1.5rem 1.5rem 1.5rem 2.5rem;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.8;
}

.milestones-list li {
  margin-bottom: 0.5rem;
}

.milestones-list li:last-child {
  margin-bottom: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .timeline-container {
    padding: 0 1rem;
  }

  .timeline-header {
    flex-direction: column;
    align-items: stretch;
  }

  .header-content h1 {
    font-size: 1.75rem;
  }

  .sort-btn {
    width: 100%;
    justify-content: center;
  }

  .sort-btn--compact {
    width: 100%;
  }

  .controls-row {
    flex-direction: column;
    align-items: stretch;
  }

  .user-filter {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-section-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .event-card {
    padding: 1.25rem;
  }

  .event-title {
    font-size: 1.1rem;
  }
}
</style>
