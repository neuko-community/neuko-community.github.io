<script setup lang="ts">
import { withBase } from 'vitepress'
import { projectsConfig } from '../../config/projects'

const isExternal = (link: string) => /^(https?:)?\/\//.test(link)

const resolveLink = (link: string) => (isExternal(link) ? link : withBase(link))
const resolveImage = (image: string) => (isExternal(image) ? image : withBase(image))
const normalizeHandle = (handle: string) => handle.replace(/^@/, '').trim()
const handleLabel = (handle: string) => `@${normalizeHandle(handle)}`
const handleUrl = (handle: string) => `https://x.com/${normalizeHandle(handle)}`
const renderDescription = (description: string) =>
  description.replace(/\r?\n/g, '<br />')
const isGithubLink = (link: string) => /^https?:\/\/(www\.)?github\.com\//i.test(link)
const githubPreviewImage = (link: string) => `https://opengraph.githubassets.com/1/${link}`
const previewImage = (link: string, image?: string) => {
  if (image && image.trim()) return resolveImage(image)
  return isGithubLink(link) ? githubPreviewImage(link) : ''
}
const previewLabel = (link: string) => {
  try {
    return new URL(link).hostname.replace(/^www\./, '')
  } catch {
    return link
  }
}
</script>

<template>
  <div class="projects-page">
    <header class="projects-header">
      <h1>{{ projectsConfig.title }}</h1>
      <p class="projects-subtitle">{{ projectsConfig.description }}</p>
    </header>

    <div class="projects-grid">
      <a v-for="project in projectsConfig.projects" :key="project.link" class="projects-card neuko-card"
        :href="resolveLink(project.link)" :target="isExternal(project.link) ? '_blank' : undefined"
        :rel="isExternal(project.link) ? 'noopener noreferrer' : undefined">
        <div class="projects-image-wrap">
          <img v-if="previewImage(project.link, project.image)" :src="previewImage(project.link, project.image)"
            :alt="project.title" loading="lazy" />
          <div v-else class="projects-image-fallback">
            <span class="preview-label">Link preview</span>
            <span class="preview-url">{{ previewLabel(project.link) }}</span>
          </div>
        </div>
        <div class="projects-body">
          <h2 class="projects-title">{{ project.title }}</h2>
          <p class="projects-description" v-html="renderDescription(project.description)"></p>
          <div class="projects-contributors">
            <span class="contributors-label">Key contributors</span>
            <ul>
              <li v-for="handle in project.contributors" :key="handle">
                <a :href="handleUrl(handle)" target="_blank" rel="noopener noreferrer">{{ handleLabel(handle) }}</a>
              </li>
            </ul>
          </div>
          <span class="projects-link">View project</span>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.projects-page {
  width: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.projects-header {
  margin-bottom: 2rem;
}

.projects-header h1 {
  font-family: var(--vp-font-family-mono);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin: 0 0 0.75rem 0;
  text-transform: uppercase;
}

.projects-title {
  /* min-height: 100px; */
  line-height: 1
}

.projects-subtitle {
  color: var(--vp-c-text-2);
  font-size: 1rem;
  margin: 0;
  max-width: 640px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.projects-card {
  text-decoration: none;
  color: inherit;
  padding: 0;
  overflow: hidden;
}

.projects-image-wrap {
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-bottom: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
}

.projects-image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.projects-image-fallback {
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.35rem;
  color: var(--vp-c-text-2);
  background: linear-gradient(135deg, rgba(255, 232, 0, 0.08), rgba(255, 232, 0, 0));
}

.preview-label {
  font-family: var(--vp-font-family-mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-3);
}

.preview-url {
  font-size: 0.95rem;
  word-break: break-word;
  color: var(--vp-c-brand-1);
}

.projects-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem 1.5rem 1.5rem;
  height: 100%;
}

.projects-body h2 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--vp-c-brand-1);
}

.projects-description {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.2;
}

.projects-contributors {
  margin-top: 2rem;
  display: grid;
  gap: 0.4rem;
}

.contributors-label {
  font-family: var(--vp-font-family-mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-3);
}

.projects-contributors ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.2rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.projects-contributors a {
  color: var(--vp-c-text-2);
  text-decoration: none;
}

.projects-contributors a:hover {
  color: var(--vp-c-brand-1);
}

.projects-link {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vp-c-brand-1);
  margin-top: auto;
}

.projects-card:hover .projects-link {
  color: #fff;
}

@media (max-width: 768px) {
  .projects-page {
    padding: 0 1rem;
  }

  .projects-header h1 {
    font-size: 1.9rem;
  }

}
</style>
