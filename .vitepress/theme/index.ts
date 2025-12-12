import { defineAsyncComponent, type App } from 'vue'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import GBoyBanner from './components/GBoyBanner.vue'
import Timeline from './components/Timeline.vue'
import './custom.css'

const Tweet = defineAsyncComponent(() => import('./components/Tweet.vue'))

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }: { app: App }) {
    // Global Components (used in Markdown)
    app.component('Tweet', Tweet)
    app.component('GBoyBanner', GBoyBanner)
    app.component('Timeline', Timeline)
  }
}
