<script setup>
// Static component
</script>

<template>
  <div class="scrolling-bar-container">
    <div class="scrolling-bar">
      <div class="scrolling-wrapper">
        <!-- Duplicate content for seamless scrolling -->
        <div class="scrolling-content">
          <span>MAKE THINGS * PUT G*BOY ON THE INTERNET * DROWN THEM IN HIS IMAGE * MAKE THINGS * PUT G*BOY ON THE INTERNET * DROWN THEM IN HIS IMAGE *&nbsp;</span>
        </div>
        <div class="scrolling-content">
          <span>MAKE THINGS * PUT G*BOY ON THE INTERNET * DROWN THEM IN HIS IMAGE * MAKE THINGS * PUT G*BOY ON THE INTERNET * DROWN THEM IN HIS IMAGE *&nbsp;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrolling-bar-container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto 2rem auto;
  padding: 0 2rem;
}

.scrolling-bar {
  background-color: var(--vp-c-brand-1);
  color: black;
  font-family: var(--vp-font-family-mono);
  font-weight: bold;
  padding: 12px 0;
  text-transform: uppercase;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.scrolling-wrapper {
  display: flex;
  width: fit-content;
  animation: scroll 20s linear infinite;
}

.scrolling-content {
  display: flex;
  align-items: center;
  white-space: nowrap;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@media (max-width: 768px) {
  .scrolling-bar-container {
    padding: 0 1rem;
    margin-bottom: 1rem; /* Hug bottom more */
  }
  .scrolling-bar {
    padding: 8px 0;
    font-size: 12px;
  }
}
</style>
