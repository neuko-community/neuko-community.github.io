import { defineAsyncComponent, type App } from 'vue'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import GBoyBanner from './components/GBoyBanner.vue'
import Timeline from '../pages/timeline/Timeline.vue'
import CipherTool from './components/CipherTool.vue'
import SteganographyTool from './components/SteganographyTool.vue'
import SpectrogramTool from './components/SpectrogramTool.vue'
import CommunityXnWallet from './components/CommunityXnWallet.vue'

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
    app.component('CipherTool', CipherTool)
    app.component('SteganographyTool', SteganographyTool)
    app.component('SpectrogramTool', SpectrogramTool)
    app.component('CommunityXnWallet', CommunityXnWallet)
  }
}
