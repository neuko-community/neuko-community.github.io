<script setup>
defineProps({
  isVerified: Boolean,
  displayName: String,
  username: String,
  pfp: String,
  showXLogo: Boolean
})
</script>

<template>
  <!-- Header -->
  <div class="tweet-header">
    <div class="tweet-avatar">
      <img :src="pfp" :alt="username" class="avatar-img" />
    </div>
    <div class="tweet-user-info">
      <div class="tweet-name-row">
        <span class="tweet-name">{{ displayName }}</span>
        <span class="tweet-verified" v-if="isVerified">
          <svg viewBox="0 0 24 24" aria-label="Verified account" class="verified-icon">
            <g>
              <path
                d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .495.083.965.238 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"
              ></path>
            </g>
          </svg>
        </span>
      </div>
      <div class="tweet-handle">{{ username }}</div>
    </div>
    <div class="tweet-logo" v-if="showXLogo">
      <svg viewBox="0 0 24 24" aria-hidden="true" class="x-logo">
        <g>
          <path
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
          ></path>
        </g>
      </svg>
    </div>
  </div>
</template>

<style scoped>
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
  fill: #1d9bf0;
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
</style>
