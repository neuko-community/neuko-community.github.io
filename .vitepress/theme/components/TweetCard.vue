<script setup>
defineProps({
  content: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  mediaType: {
    type: String,
    default: 'none' // 'gif', 'video', 'image', 'none'
  },
  mediaUrl: {
    type: String,
    default: ''
  },
  authorName: {
    type: String,
    default: 'Marcotics.eth 🫡'
  },
  authorHandle: {
    type: String,
    default: '@_Marcotics_'
  },
  authorAvatar: {
    type: String,
    default: 'https://unavatar.io/twitter/_Marcotics_'
  },
  tweetUrl: {
    type: String,
    default: ''
  }
})

const openTweet = (url) => {
  if (url) {
    window.open(url, '_blank')
  }
}
</script>

<template>
  <div 
    class="custom-tweet" 
    :class="{ 'clickable': tweetUrl }"
    @click="openTweet(tweetUrl)"
  >
    <!-- Header -->
    <div class="tweet-header">
      <div class="tweet-avatar">
        <img :src="authorAvatar" :alt="authorHandle" class="avatar-img" />
      </div>
      <div class="tweet-user-info">
        <div class="tweet-name-row">
          <span class="tweet-name">{{ authorName }}</span>
          <span class="tweet-verified">
            <svg viewBox="0 0 24 24" aria-label="Verified account" class="verified-icon">
              <g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .495.083.965.238 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g>
            </svg>
          </span>
        </div>
        <div class="tweet-handle">{{ authorHandle }}</div>
      </div>
      <div class="tweet-logo">
        <svg viewBox="0 0 24 24" aria-hidden="true" class="x-logo"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
      </div>
    </div>

    <!-- Content -->
    <div class="tweet-content" v-html="content"></div>

    <!-- Media Placeholder -->
    <div class="tweet-media" v-if="mediaType !== 'none'">
      <!-- If mediaType is video and mediaUrl is provided, try to show it as image/poster with play button -->
      <!-- If mediaType video and NO mediaUrl, show default placeholder -->
      <div class="media-placeholder" v-if="(mediaType === 'video' || mediaType === 'gif') && !mediaUrl">
        <div class="play-button">▶</div>
        <span class="gif-badge" v-if="mediaType === 'gif'">GIF</span>
      </div>
      
      <!-- Video/GIF with poster (using mediaUrl as image source for consistency with existing impl) -->
      <div class="media-container" v-else-if="(mediaType === 'video' || mediaType === 'gif') && mediaUrl">
         <img :src="mediaUrl" alt="Video Thumbnail" class="tweet-image" />
         <div class="play-overlay">
            <div class="play-button">▶</div>
            <span class="gif-badge" v-if="mediaType === 'gif'">GIF</span>
         </div>
      </div>

      <img v-else-if="mediaType === 'image'" :src="mediaUrl" alt="Tweet Media" class="tweet-image" />
    </div>

    <!-- Footer -->
    <div class="tweet-footer" :class="{ 'mt-auto': mediaType === 'none' }">
      <span class="tweet-date">{{ date }}</span>
      <span class="info-icon">ⓘ</span>
    </div>
  </div>
</template>

<style scoped>
.custom-tweet {
  width: 100%;
  height: 100%; /* Fill the card height */
  font-family: var(--vp-font-family-base);
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
  border-radius: 12px; /* Ensure hover effect looks right */
  transition: background-color 0.2s;
}

.custom-tweet.clickable {
  cursor: pointer;
}

.custom-tweet.clickable:hover {
  background-color: rgba(255, 255, 255, 0.03);
}

.mt-auto {
  margin-top: auto !important;
}

/* Header */
.tweet-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.tweet-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background: #333;
  flex-shrink: 0;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tweet-user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.tweet-name-row {
  display: flex;
  align-items: center;
  gap: 4px;
}

.tweet-name {
  font-weight: 700;
  font-size: 0.95rem;
  color: #fff;
}

.verified-icon {
  width: 18px;
  height: 18px;
  fill: #fff;
}

.tweet-handle {
  font-size: 0.9rem;
  color: #71767b;
}

.tweet-logo {
  margin-left: auto;
}

.x-logo {
  width: 20px;
  height: 20px;
  fill: #fff;
}

/* Content */
.tweet-content {
  font-size: 1rem;
  line-height: 1.5;
  color: #fff;
}

.tweet-content :deep(p) {
  margin: 0 0 0.5rem 0;
}

.tweet-content :deep(p:last-child) {
  margin: 0;
}

.tweet-content :deep(.highlight) {
  color: var(--vp-c-brand-1);
}

/* Media */
.tweet-media {
  margin-top: auto; /* Push media to bottom */
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #333;
  position: relative;
}

.media-placeholder {
  width: 100%;
  height: 250px; /* Fixed height for uniformity */
  background: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-image: radial-gradient(circle at center, #222 0%, #111 100%);
}

.media-container {
  position: relative;
  width: 100%;
  height: 250px;
}

.play-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.2);
}

.tweet-image {
  width: 100%;
  height: 250px; /* Fixed height for uniformity */
  object-fit: cover; /* Ensure image covers the area */
  display: block;
}

.play-button {
  width: 50px;
  height: 50px;
  background: var(--vp-c-brand-1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-size: 1.5rem;
  padding-left: 4px;
}

.gif-badge {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(0,0,0,0.7);
  color: #fff;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 4px;
}

/* Footer */
.tweet-footer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #71767b;
  margin-top: 0.25rem; /* Reset to small margin since media handles the push */
  border-top: 1px solid #333;
  padding-top: 0.75rem;
}

.info-icon {
  margin-left: auto;
}
</style>
