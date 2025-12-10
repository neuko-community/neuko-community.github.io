import { defineAsyncComponent, type App } from 'vue'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import GBoyBanner from './components/GBoyBanner.vue'
import './custom.css'

const Tweet = defineAsyncComponent(() => import('./components/Tweet.vue'))

export default {
    ...DefaultTheme,
    Layout,
    enhanceApp({ app }: { app: App }) {
        // Global Components (used in Markdown)
        app.component('Tweet', Tweet)
        app.component('GBoyBanner', GBoyBanner)

        // Debugging: Global Error Handler
        app.config.errorHandler = (err: unknown, instance: unknown, info: string) => {
            console.error('Global Vue Error:', err, info)
            if (typeof window !== 'undefined') {
                const errorDiv = document.createElement('div')
                errorDiv.style.position = 'fixed'
                errorDiv.style.top = '0'
                errorDiv.style.left = '0'
                errorDiv.style.width = '100%'
                errorDiv.style.backgroundColor = 'red'
                errorDiv.style.color = 'white'
                errorDiv.style.padding = '20px'
                errorDiv.style.zIndex = '999999'
                errorDiv.style.whiteSpace = 'pre-wrap'
                errorDiv.innerText = `Vue Error: ${(err as Error).message}\n${(err as Error).stack}`
                document.body.appendChild(errorDiv)
            }
        }
    }
}
