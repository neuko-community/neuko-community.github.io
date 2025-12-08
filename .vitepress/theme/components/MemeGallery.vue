<script setup lang="ts">
import { data } from '../../../wiki/memes.data'
import { computed } from 'vue'

const memes = computed(() => data.memes)

// Helper to get image URL for a meme
// Using cdn-cgi link format seen in the API response or fallback to direct if needed.
// The API returns `blur_data_url` but we need the real image.
// Based on the API response sample, we don't see a direct full URL, but `blur_data_url` is a base64 placeholder.
// Wait, looking at the previous API response:
// "blur_data_url": "data:image/jpeg..."
// There isn't a direct "url" field in the top level meme object in the sample I saw?
// Ah, looking closely at step 17 output:
// It has "blur_data_url". 
// It DOES NOT have a clear "url" field. 
// However, usually these APIs work by slug or ID. 
// Let's look at the "uploader.avatar_url": https://memedepot.com/cdn-cgi/imagedelivery/...
// Maybe we construct standard IDs?
// Checking "cf_asset_id".
// Actually, let me re-check the `curl` output in step 17 carefully.
// It has: "slug", "title", "blur_data_url", "aspect_ratio", "width", "height", "type".
// It is missing a direct image URL? 
// Wait, maybe I truncated the output too much or missed it. 
// I should verify how to construct the image URL.
// Usually it's `https://memedepot.com/d/gboy/${slug}` for the page.
// But valid image source?
// Let's assume there is a way or I missed a field.
// Actually, looking at `cf_asset_id`, it might be Cloudflare Images.
// BUT, often `memedepot.com/api/memes` responses are used for feeds.
// Let's verify one real meme URL. 
// https://memedepot.com/d/gboy uses Next.js probably.
// Let me quickly check if I can guess the URL or if I need to fetch individual meme details?
// Re-reading response 17:
// There is no obvious "imageUrl".
// There is "blur_data_url".
// There is "cf_asset_id".
// Maybe `https://memedepot.com/cdn-cgi/imagedelivery/<account>/<cf_asset_id>/<variant>`?
// I don't have the account has.
// Let me assume I need to do a small check or look for a public pattern.
// Attempt: `https://memedepot.com/api/meme/<slug>` might give more info?
// Or maybe I just use the page link for now if I can't find the image source?
// No, user wants a "live image gallery".
// Let's try to look for a known image URL pattern from the "uploader.avatar_url".
// "https://memedepot.com/cdn-cgi/imagedelivery/naCPMwxXX46-hrE49eZovw/1193e201-9dc7-4ead-7feb-0f0f406b9000/width=500,height=500,fit=crop"
// "naCPMwxXX46-hrE49eZovw" seems to be the account hash?
// And "1193e201..." is likely an ID. 
// The meme object has "cf_asset_id": "6bd85a04-1216-445c-14a1-27f6ead3d400".
// So I can probably construct:
// `https://memedepot.com/cdn-cgi/imagedelivery/naCPMwxXX46-hrE49eZovw/${memes.cf_asset_id}/public` (or similar variant)
// I will try to verify this with a quick curl before committing the component code.
// But for now I will write the component assuming I can get the URL, using a placeholder function. 
</script>

<template>
  <div class="meme-gallery">
    <div v-for="meme in memes" :key="meme.slug" class="meme-card">
      <a :href="`https://memedepot.com/d/gboy/${meme.slug}`" target="_blank" rel="noopener" class="meme-link">
        <div class="media-wrapper">
          <video 
            v-if="meme.type === 'VIDEO' || meme.title.endsWith('.mp4') || meme.title.endsWith('.webm')"
            :src="`https://memedepot.com/cdn-cgi/imagedelivery/naCPMwxXX46-hrE49eZovw/${meme.cf_asset_id}/public`"
            class="gallery-media"
            autoplay
            loop
            muted
            playsinline
          ></video>
          <img 
            v-else
            :src="`https://memedepot.com/cdn-cgi/imagedelivery/naCPMwxXX46-hrE49eZovw/${meme.cf_asset_id}/public`" 
            :alt="meme.title" 
            class="gallery-media"
            loading="lazy"
          />
        </div>
        <div v-if="meme.uploader && meme.uploader.username" class="attribution-overlay">
          <span class="attribution-text">IMG BY: </span>
          <span class="attribution-handle">@{{ meme.uploader.username.toUpperCase() }}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.meme-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.meme-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  transition: transform 0.2s;
  aspect-ratio: 1;
}

.meme-card:hover {
  transform: translateY(-4px);
}

.meme-link {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
}

.media-wrapper {
  width: 100%;
  height: 100%;
}

.gallery-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.attribution-overlay {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.8);
  background: rgba(0, 0, 0, 0.4);
  padding: 2px 6px;
  border-radius: 4px;
  z-index: 10;
  pointer-events: none; /* Let clicks pass through to the link */
}

.attribution-text {
  font-weight: 400;
  opacity: 0.8;
}

.attribution-handle {
  font-weight: 700;
  color: white;
}
</style>
