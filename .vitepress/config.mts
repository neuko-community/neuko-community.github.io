import { defineConfig } from 'vitepress'
import path from 'path'
import { parseSummary } from './utils/sidebar'

// Helper to parse SUMMARY.md
function getSidebar() {
    const summaryPath = path.resolve(__dirname, '../wiki/SUMMARY.md')
    return parseSummary(summaryPath)
}

export default defineConfig({
    title: "Neuko Wiki",
    description: "Community-Built Wiki for Neuko",
    cleanUrls: true,
    srcDir: './wiki',

    appearance: 'dark',
    head: [
        ['script', { src: 'https://platform.twitter.com/widgets.js', async: 'true', charset: 'utf-8' }],
        ['link', { rel: 'icon', href: '/favicon.png' }],
        ['meta', { property: 'og:image', content: '/og.jpg' }],
        ['meta', { name: 'twitter:image', content: '/og.jpg' }],
        ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
        ['meta', { name: 'theme-color', content: '#FFE800' }],
        // Preconnect for Fonts
        ['link', { rel: 'preconnect', href: 'https://use.typekit.net', crossorigin: '' }],
        ['link', { rel: 'preconnect', href: 'https://p.typekit.net', crossorigin: '' }],
        ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossorigin: '' }],
        ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
        ['link', { rel: 'stylesheet', href: 'https://use.typekit.net/tnn5ltb.css' }]
    ],
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Neuko.ai', link: 'https://neuko.ai' }
        ],

        sidebar: getSidebar(),

        socialLinks: [
            { icon: 'github', link: 'https://github.com/neuko-community/neuko-wiki' }
        ],

        search: {
            provider: 'local'
        }
    },
    vite: {
        publicDir: path.resolve(__dirname, '../public')
    },
    ignoreDeadLinks: true,
})
