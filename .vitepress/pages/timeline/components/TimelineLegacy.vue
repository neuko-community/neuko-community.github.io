<script setup lang="ts">
import type { StyleValue } from 'vue'
import { LegacyEvent } from '../timeline.types'
import { formatDate } from '../../../data/timelineEvents'
import EventCard from './EventCard.vue'

const props = defineProps<{
  event: LegacyEvent
  onClick?: () => void
  style?: StyleValue
}>()
</script>
<template>
  <EventCard :onClick="props.onClick" :style="props.style">
    <div class="event-header">
      <span class="event-date">{{ formatDate(props.event.date) }}</span>
      <h3 class="event-title">{{ props.event.title }}</h3>
    </div>

    <p class="event-description">{{ props.event.description }}</p>

    <div v-if="props.event.url" class="event-embed">
      <XEmbed :url="props.event.url" />
    </div>

    <div v-if="props.event.url" class="event-embed">
      <div v-html="props.event.url" />
    </div>

    <div v-if="props.event.caption && props.event.caption !== '(blank)'" class="event-caption">
      <span class="label">Caption:</span> "{{ props.event.caption }}"
    </div>

    <div v-if="props.event.videoDetails" class="event-video">
      <span class="label">Video:</span> {{ props.event.videoDetails }}
    </div>

    <ul v-if="props.event.details && props.event.details.length" class="event-details">
      <li v-for="(detail, idx) in props.event.details" :key="idx">{{ detail }}</li>
    </ul>

    <div v-if="props.event.distribution && props.event.distribution.length" class="event-section">
      <span class="label">Distribution:</span>
      <ul>
        <li v-for="(item, idx) in props.event.distribution" :key="idx">{{ item }}</li>
      </ul>
    </div>

    <div v-if="props.event.loreReveals && props.event.loreReveals.length" class="event-section">
      <span class="label">Lore Reveals:</span>
      <ul>
        <li v-for="(item, idx) in props.event.loreReveals" :key="idx">{{ item }}</li>
      </ul>
    </div>

    <div
      v-if="props.event.puzzleElements && props.event.puzzleElements.length"
      class="event-section"
    >
      <span class="label">Puzzle Elements:</span>
      <ul>
        <li v-for="(item, idx) in props.event.puzzleElements" :key="idx">{{ item }}</li>
      </ul>
    </div>

    <div v-if="props.event.metrics && props.event.metrics.length" class="event-section">
      <span class="label">Metrics:</span>
      <ul>
        <li v-for="(item, idx) in props.event.metrics" :key="idx">{{ item }}</li>
      </ul>
    </div>

    <div v-if="props.event.significance" class="event-significance">
      <span class="label">Significance:</span> {{ props.event.significance }}
    </div>
  </EventCard>
</template>
