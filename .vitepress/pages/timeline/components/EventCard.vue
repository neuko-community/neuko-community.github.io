<script setup lang="ts">
import type { StyleValue } from 'vue'

const props = defineProps<{
  onClick?: () => void
  style?: StyleValue
}>()

function handleClick() {
  props.onClick?.()
}
</script>

<template>
  <div
    class="event-card neuko-card"
    :class="{ clickable: Boolean(props.onClick) }"
    :style="props.style"
    @click="handleClick"
  >
    <slot />
  </div>
</template>

<style scoped>
.event-card {
  position: relative;
  padding: 1.5rem;
}

.event-card.clickable {
  cursor: pointer;
}

:deep(.event-meta) {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  font-size: 0.75rem;
  padding: 0 1.5rem;
  border-top: 1px solid var(--vp-c-border);
}

:deep(.event-type) {
  font-weight: 700;
  color: var(--vp-c-brand-1);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
