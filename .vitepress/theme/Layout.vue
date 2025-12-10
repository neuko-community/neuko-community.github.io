<script setup>
import DefaultTheme from 'vitepress/theme'
import HomeBanner from './components/HomeBanner.vue'
import HomeContent from './components/HomeContent.vue'
import GBoyBanner from './components/GBoyBanner.vue'
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
      <GBoyBanner v-if="frontmatter.layout === 'home' && !frontmatter.hide_home_elements" />
    </template>
    <template #layout-bottom>
      <ScrollingBar v-if="frontmatter.layout === 'home' && !frontmatter.hide_scrolling_bar" />
      <div v-if="frontmatter.layout === 'home'" class="footer-credits">
        2025 - built by <a href="https://x.com/afkboom" target="_blank">@afkboom</a> | populated by the community - <a href="https://github.com/neuko-community/neuko-community.github.io" target="_blank">github repo</a>
      </div>
    </template>
  </Layout>
</template>

<style>
/* Hide default Navbar override removed - use frontmatter navbar: false instead */


/* Add padding to top of hero area */
.hero-spacer {
  height: 20px;
  display: block;
}

.footer-credits {
  text-align: right;
  color: #666;
  font-size: 10px;
  margin: 0 15px 20px 0;
  font-family: monospace;
  line-height: 1;
}

.footer-credits a {
  color: #666;
  text-decoration: none;
  border-bottom: 1px dotted #666;
}

.footer-credits a:hover {
  color: var(--vp-c-brand-1);
  border-bottom-color: var(--vp-c-brand-1);
}
</style>
