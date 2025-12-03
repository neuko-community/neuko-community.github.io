<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  id: String
})

const tweetContainer = ref(null)

onMounted(() => {
  if (window.twttr) {
    window.twttr.widgets.createTweet(props.id, tweetContainer.value, {
      theme: 'dark',
      align: 'center'
    })
  } else {
    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    script.async = true
    script.onload = () => {
      window.twttr.widgets.createTweet(props.id, tweetContainer.value, {
        theme: 'dark',
        align: 'center'
      })
    }
    document.head.appendChild(script)
  }
})
</script>

<template>
  <div class="tweet-wrapper">
    <div ref="tweetContainer" class="tweet-container"></div>
  </div>
</template>

<style scoped>
.tweet-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  width: 100%;
  height: 100%;
}

.tweet-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .tweet-container {
    width: 100% !important;
  }
}
</style>
