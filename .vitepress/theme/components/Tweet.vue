<script setup lang="ts">
import { computed } from 'vue'
import TweetCard from './TweetCard.vue'
import { data as tweetsDataRaw } from '../../data/tweets.data'
import type { TweetData } from '../../types'

const tweetsData = tweetsDataRaw as Record<string, TweetData>

const props = defineProps<{
  id?: string
  data?: TweetData
}>()

// Use build-time data from tweets.data.ts
const finalData = computed<TweetData | null>(() => {
  // If data prop is provided, use it (for backward compatibility)
  if (props.data) {
    return props.data
  }
  
  // Otherwise, look up tweet by ID from build-time data
  if (props.id && tweetsData[props.id]) {
    return tweetsData[props.id]
  }
  
  // Tweet not found in build-time data
  if (props.id) {
    console.warn(`Tweet ${props.id} not found in build-time data`)
  }
  
  return null
})

const loading = computed(() => false) // No loading state needed for build-time data
const error = computed(() => finalData.value ? null : 'Tweet not found')

const mappedProps = computed(() => {
  const t = finalData.value
  if (!t) return null
  
  const user = t.user
  
  // Format Date: "Nov 20, 2024"
  const dateObj = new Date(t.created_at)
  const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  // Transform text to HTML
  let content = t.text
  if (t.entities && t.entities.urls) {
      t.entities.urls.forEach(url => {
          content = content.replace(url.url, `<a href="${url.expanded_url}" target="_blank" class="highlight">${url.display_url}</a>`)
      })
  }
  content = content.replace(/\n/g, '<br>')
  
  // Media
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
    authorName: user.name,
    authorHandle: `@${user.screen_name}`,
    authorAvatar: user.profile_image_url_https,
    date: dateStr,
    content: content,
    mediaType: mediaType,
    mediaUrl: mediaUrl,
    tweetUrl: `https://x.com/${user.screen_name}/status/${t.id_str}`
  }
})
</script>

<template>
  <div class="tweet-wrapper">
    <div v-if="loading" class="loading-state">Loading Tweet...</div>
    <div v-else-if="error" class="error-state">{{ error }}</div>
    <TweetCard v-else-if="mappedProps" v-bind="mappedProps" />
  </div>
</template>

<style scoped>
.tweet-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.loading-state, .error-state {
    padding: 2rem;
    color: #888;
    font-size: 0.9rem;
    background: #111;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.1);
    width: 100%;
    text-align: center;
}
</style>
