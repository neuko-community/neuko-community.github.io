<script setup lang="ts">
import { computed } from 'vue'
import { formatDate } from '../../../data/timelineEvents'
import EventCard from './EventCard.vue'
import TweetCard from './TweetCard.vue'
import type { Post } from '../timeline.types'

const props = defineProps<{
  post: Post
}>()

const mappedProps = computed(() => {
  const t = props.post.tweet
  if (!t) return null

  const user = t.user
  const dateObj = new Date(t.created_at)
  const dateStr = dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  let content = t.text
  if (t.entities?.urls) {
    t.entities.urls.forEach((url) => {
      content = content.replace(
        url.url,
        `<a href="${url.expanded_url}" target="_blank" class="highlight">${url.display_url}</a>`
      )
    })
  }
  // content = content.replace(/\n/g, '<br>')

  let mediaType = 'none'
  let mediaUrl = ''

  if (t.video) {
    mediaType = 'video'
    mediaUrl = t.video.poster
  } else if (t.photos && t.photos.length > 0) {
    mediaType = 'image'
    mediaUrl = t.photos[0].url
  }

  return {
    isVerified: user.is_blue_verified,
    displayName: user.name,
    username: `@${user.screen_name}`,
    pfp: user.profile_image_url_https,
    date: dateStr,
    content,
    mediaType,
    mediaUrl,
    tweetUrl: `https://x.com/${user.screen_name}/status/${t.id_str}`
  }
})

const type = computed(() => {
  if (props.post.id === '1988946547250495549')return 'placenta'
  return props.post.type
})
</script>

<template>
  <EventCard class="timeline-post-card" style="padding: 0">
    <TweetCard
      v-if="mappedProps"
      :isVerified="mappedProps.isVerified"
      :displayName="mappedProps.displayName"
      :username="mappedProps.username"
      :pfp="mappedProps.pfp"
      :content="mappedProps.content"
      :mediaType="mappedProps.mediaType"
      :mediaUrl="mappedProps.mediaUrl"
      :tweetUrl="mappedProps.tweetUrl"
      :showXLogo="true"
    />
    <div class="event-meta">
      <p class="event-type">{{ type }}</p>
      <span class="event-date">{{ formatDate(props.post.date) }}</span>
    </div>
  </EventCard>
</template>

<style scoped></style>
