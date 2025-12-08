<script setup>
import { onMounted, ref, computed } from 'vue'
import CustomTweet from './CustomTweet.vue'

const props = defineProps({
  id: String,
  data: Object // Optional: pre-fetched data
})

const internalData = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  if (props.data) {
    loading.value = false
    return
  }
  
  if (!props.id) {
    loading.value = false
    return
  }

  try {
    const res = await fetch(`https://react-tweet.vercel.app/api/tweet/${props.id}`)
    const json = await res.json()
    if (json.data) {
      internalData.value = json.data
    } else {
      error.value = 'Tweet not found'
    }
  } catch (e) {
    console.error(e)
    error.value = 'Error loading tweet'
  } finally {
    loading.value = false
  }
})

const finalData = computed(() => props.data || internalData.value)

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
    <CustomTweet v-else-if="mappedProps" v-bind="mappedProps" />
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
