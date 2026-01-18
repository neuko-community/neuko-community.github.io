<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  // timelineEvents,
  upcomingEvents,
  keyMilestones,
  formatDate,
  getMonthYear
} from '../../data/timelineEvents'
// import { articles } from './data/articles.data'
import { data as posts } from './data/posts.data'
import { data as articles } from './data/articles.data'
import { Article, EventType, SourceType, type Post, type TimelineEvent } from './timeline.types'
import TimelineArticle from './components/TimelineArticle.vue'
import TimelinePost from './components/TimelinePost.vue'

type SortOrder = 'newest' | 'oldest'

const sortOrder = ref<SortOrder>('newest')
const showOfficial = ref(true)
const showCommunity = ref(true)

const typeOptions = [
  { value: EventType.ARTICLE, label: 'Articles' },
  { value: EventType.POST, label: 'Posts' },
  { value: EventType.THREAD, label: 'Threads' },
  { value: EventType.INTERVIEW, label: 'Interviews' },
  { value: EventType.VIDEO, label: 'Videos' },
  { value: EventType.SPACES, label: 'Spaces' },
  { value: EventType.MILESTONE, label: 'Milestones' },
  { value: EventType.OTHER, label: 'Other' }
]

const activeTypes = ref<EventType[]>(typeOptions.map((option) => option.value))

const sortedEvents = computed(() => {
  const events: TimelineEvent[] = [...posts, ...articles]
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
    return sourceAllowed && typeAllowed
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

function selectAllFilters() {
  showOfficial.value = true
  showCommunity.value = true
  activeTypes.value = typeOptions.map((option) => option.value)
}

function clearAllFilters() {
  showOfficial.value = false
  showCommunity.value = false
  activeTypes.value = []
}

function isArticleEvent(event: TimelineEvent): event is Article {
  return event.type === EventType.ARTICLE
}

// function isLegacyEvent(event: TimelineEvent): event is LegacyEvent {
//   return event.type !== EventType.ARTICLE
// }

function isPostEvent(event: TimelineEvent): event is Post {
  return event.type === EventType.POST || event.type === EventType.THREAD
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
        <button class="sort-btn" @click="toggleSort">
          <span class="sort-icon">{{ sortOrder === 'newest' ? '↓' : '↑' }}</span>
          {{ sortOrder === 'newest' ? 'Newest First' : 'Oldest First' }}
        </button>
        <div class="filters">
          <div class="filter-actions">
            <button class="filter-action-btn" type="button" @click="selectAllFilters">
              Select All
            </button>
            <button class="filter-action-btn" type="button" @click="clearAllFilters">
              Clear All
            </button>
          </div>
          <div class="filter-group">
            <span class="filter-title">Source</span>
            <label class="filter-option">
              <input v-model="showOfficial" type="checkbox" />
              Official
            </label>
            <label class="filter-option">
              <input v-model="showCommunity" type="checkbox" />
              Community
            </label>
          </div>
          <div class="filter-group">
            <span class="filter-title">Type</span>
            <label v-for="option in typeOptions" :key="option.value" class="filter-option">
              <input v-model="activeTypes" type="checkbox" :value="option.value" />
              {{ option.label }}
            </label>
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
  margin-bottom: 1rem;
}

.timeline-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
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

  .event-card {
    padding: 1.25rem;
  }

  .event-title {
    font-size: 1.1rem;
  }
}
</style>
