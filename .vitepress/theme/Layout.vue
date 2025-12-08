<script setup>
import DefaultTheme from 'vitepress/theme'
import HomeBanner from './components/HomeBanner.vue'
import HomeContent from './components/HomeContent.vue'
import ScrollingBar from './components/ScrollingBar.vue'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <Layout class="custom-layout">
    <template #home-hero-before>
      <div class="hero-spacer"></div>
      <HomeBanner v-if="frontmatter.layout === 'home' && !frontmatter.hide_home_elements" />
      <HomeContent v-if="frontmatter.layout === 'home' && !frontmatter.hide_home_elements" />
    </template>
    <template #layout-bottom>
      <ScrollingBar v-if="frontmatter.layout === 'home'" />
    </template>
  </Layout>
</template>

<style>
/* Hide default Navbar */
.VPNavBar {
  display: none !important;
}

/* Add padding to top of hero area */
.hero-spacer {
  height: 20px;
  display: block;
}
</style>
