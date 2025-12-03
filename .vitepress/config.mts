import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

// Helper to parse SUMMARY.md
function parseSummary() {
    const summaryPath = path.resolve(__dirname, '../wiki/SUMMARY.md')
    if (!fs.existsSync(summaryPath)) return []

    const content = fs.readFileSync(summaryPath, 'utf-8')
    const lines = content.split('\n')

    interface SidebarItem {
        text: string
        link?: string
        items?: SidebarItem[]
    }

    const sidebar: SidebarItem[] = []
    let currentSection: SidebarItem | null = null

    for (const line of lines) {
        const linkMatch = line.match(/^\* \[(.*?)\]\((.*?)\)/)
        const subLinkMatch = line.match(/^  \* \[(.*?)\]\((.*?)\)/)
        const headerMatch = line.match(/^## (.*)/)

        if (headerMatch) {
            // New section from H2
            currentSection = {
                text: headerMatch[1],
                items: []
            }
            sidebar.push(currentSection)
        } else if (linkMatch) {
            // Top level link
            const item: SidebarItem = {
                text: linkMatch[1],
                link: linkMatch[2].replace('.md', '')
            }

            // If we are in a section, add to it, otherwise it's a root item
            // But based on SUMMARY.md structure, usually H2 defines sections.
            // If there is no current section, we might want to create a "General" one or just add it.
            // Looking at the file, "Start Here" is a header.
            if (currentSection) {
                currentSection.items!.push(item)
            } else {
                // Items before any header (like README)
                // We might want to ignore README if it's the home page, or add it.
                // Let's add it as a standalone item if it's not README (which is usually home)
                if (item.link !== 'README') {
                    sidebar.push(item)
                }
            }
        } else if (subLinkMatch) {
            // Indented item - add to the last item of the current section
            if (currentSection && currentSection.items && currentSection.items.length > 0) {
                const parentItem = currentSection.items[currentSection.items.length - 1]
                if (!parentItem.items) parentItem.items = []
                parentItem.items.push({
                    text: subLinkMatch[1],
                    link: subLinkMatch[2].replace('.md', '')
                })
            }
        }
    }
    return sidebar
}

export default defineConfig({
    title: "Neuko Wiki",
    description: "Community-Built Wiki for Neuko",
    cleanUrls: true,
    base: '/wiki/',
    srcDir: './wiki',
    appearance: 'dark',
    head: [
        ['script', { src: 'https://platform.twitter.com/widgets.js', async: 'true', charset: 'utf-8' }]
    ],
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Neuko.ai', link: 'https://neuko.ai' }
        ],

        sidebar: parseSummary(),

        socialLinks: [
            { icon: 'github', link: 'https://github.com/neuko-community/neuko-wiki' }
        ],

        search: {
            provider: 'local'
        }
    }
})
