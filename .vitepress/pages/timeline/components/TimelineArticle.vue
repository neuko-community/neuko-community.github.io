<script setup lang="ts">
import { computed } from 'vue'
import { formatDate } from '../../../data/timelineEvents'
import EventCard from './EventCard.vue'
import { Article } from '../timeline.types'
import TweetHeader from './TweetHeader.vue'

const props = defineProps<{
  article: Article
}>()
const articleTitle = computed(() => props.article?.title || 'Article')
const onClick = () => {
  window.open(props.article?.url, '_blank')
}
</script>

<template>
  <EventCard :onClick="onClick" style="padding: 0">
    <img
      v-if="props.article?.image"
      class="article-image"
      :src="props.article.image"
      :alt="articleTitle"
    />
    <div class="timeline-article">
      <TweetHeader
        :isVerified="props.article?.tweet?.user.is_blue_verified"
        :displayName="props.article?.tweet?.user.name"
        :username="`@${props.article?.tweet?.user.screen_name}`"
        :pfp="props.article?.tweet?.user.profile_image_url_https"
        :showXLogo="false"
      />
      <div class="article-content">
        <p class="event-title">{{ articleTitle }}</p>

        <p v-if="props.article?.subtitle" class="event-subtitle">
          {{ props.article.subtitle }}
        </p>
      </div>
      <!-- <p v-if="props.article?.user" class="event-author">
        By
        <a
          :href="`https://x.com/${props.article.user}`"
          target="_blank"
          rel="noopener noreferrer"
          @click.stop
        >
          @{{ props.article.user }}
        </a>
      </p> -->
    </div>
    <div class="event-meta">
      <p class="event-type">ARTICLE</p>
      <span class="event-date">{{ formatDate(props.article.date) }}</span>
    </div>
  </EventCard>
</template>

<style scoped>
.timeline-article {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
}

.article-content {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.event-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  text-transform: uppercase;
}

.event-subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  margin: 0;
}

.event-author {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  margin: 0;
}

.article-image {
  width: 100%;
  border-radius: 10px;
  border: 1px solid var(--vp-c-border);
}

.article-actions {
  display: flex;
  gap: 0.75rem;
}

.article-link {
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-brand-1);
}
</style>
