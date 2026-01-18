<script setup lang="ts">
import { formatDate } from '../../../data/timelineEvents'
import EventCard from './EventCard.vue'
import { Post } from '../timeline.types'

const props = defineProps<{
  post: Post
}>()

const onClick = () => {
  window.open(props.post?.url, '_blank')
}
</script>

<template>
  <EventCard :onClick="onClick" style="padding: 0">
    <div class="event-meta">
      <p class="event-type">POST</p>
      <span class="event-date">{{ formatDate(props.post.date) }}</span>
    </div>
  </EventCard>
</template>

<style scoped></style>
