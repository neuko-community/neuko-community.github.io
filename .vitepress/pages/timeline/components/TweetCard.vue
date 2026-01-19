<script setup>
import TweetHeader from './TweetHeader.vue'
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
  displayName: String,
  username: String,
  pfp: String,
  tweetUrl: {
    type: String,
    default: ''
  },
  isVerified: Boolean
})

const openTweet = (url) => {
  if (url) {
    window.open(url, '_blank')
  }
}
</script>

<template>
  <div class="custom-tweet" :class="{ clickable: tweetUrl }" @click="openTweet(tweetUrl)">
    <!-- Header -->
    <TweetHeader
      :isVerified="isVerified"
      :displayName="displayName"
      :username="username"
      :pfp="pfp"
      :showXLogo="showXLogo"
    />

    <!-- Content -->
    <div class="tweet-content" v-html="content"></div>

    <!-- Media Placeholder -->
    <div class="tweet-media" v-if="mediaType !== 'none'">
      <!-- If mediaType is video and mediaUrl is provided, try to show it as image/poster with play button -->
      <!-- If mediaType video and NO mediaUrl, show default placeholder -->
      <div
        class="media-placeholder"
        v-if="(mediaType === 'video' || mediaType === 'gif') && !mediaUrl"
      >
        <div class="play-button">▶</div>
        <span class="gif-badge" v-if="mediaType === 'gif'">GIF</span>
      </div>

      <!-- Video/GIF with poster (using mediaUrl as image source for consistency with existing impl) -->
      <div
        class="media-container"
        v-else-if="(mediaType === 'video' || mediaType === 'gif') && mediaUrl"
      >
        <img :src="mediaUrl" alt="Video Thumbnail" class="tweet-image" />
        <div class="play-overlay">
          <div class="play-button">▶</div>
          <span class="gif-badge" v-if="mediaType === 'gif'">GIF</span>
        </div>
      </div>

      <img
        v-else-if="mediaType === 'image'"
        :src="mediaUrl"
        alt="Tweet Media"
        class="tweet-image"
      />
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
  font-weight: 500;
  font-size: 1.05rem;
  line-height: 1.4;
  color: #e7e9ea;
  white-space: pre-wrap;
  word-break: break-word;
}

.tweet-content :deep(p) {
  margin: 0 0 0.5rem 0;
}

.tweet-content :deep(p:last-child) {
  margin: 0;
}

.tweet-content :deep(.highlight) {
  color: #1d9bf0;
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
  background: rgba(0, 0, 0, 0.2);
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
  background: rgba(0, 0, 0, 0.7);
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
