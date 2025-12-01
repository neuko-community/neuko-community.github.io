import DefaultTheme from 'vitepress/theme'
import Tweet from './components/Tweet.vue'
import './custom.css'

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.component('Tweet', Tweet)
    }
}
