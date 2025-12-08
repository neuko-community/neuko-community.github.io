import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import Tweet from './components/Tweet.vue'
import HomeBanner from './components/HomeBanner.vue'
import GBoyBanner from './components/GBoyBanner.vue'
import ContributeForm from './components/ContributeForm.vue'
import CustomTweet from './components/CustomTweet.vue' // Import
import './custom.css'

export default {
    ...DefaultTheme,
    Layout,
    enhanceApp({ app }: { app: any }) {
        app.component('Tweet', Tweet)
        app.component('HomeBanner', HomeBanner)
        app.component('GBoyBanner', GBoyBanner)
        app.component('ContributeForm', ContributeForm)
        app.component('CustomTweet', CustomTweet) // Register
    }
}
