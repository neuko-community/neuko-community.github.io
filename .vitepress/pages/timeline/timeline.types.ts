import type { TweetData } from '../../types'

export interface TimelineEvent {
  date: string
  source: SourceType
  type: EventType
}

export interface LegacyEvent extends TimelineEvent {
  title?: string
  description?: string
  url?: string
  caption?: string
  videoDetails?: string
  details?: string[]
  distribution?: string[]
  loreReveals?: string[]
  puzzleElements?: string[]
  metrics?: string[]
  significance?: string
}

export enum SourceType {
  OFFICIAL = 'official',
  COMMUNITY = 'community'
}

export enum EventType {
  ARTICLE = 'article',
  VIDEO = 'video',
  POST = 'post',
  THREAD = 'thread',
  INTERVIEW = 'interview',
  SPACES = 'spaces',
  DEADLINE = 'deadline',
  OTHER = 'other'
}

export interface Article extends TimelineEvent {
  title: string
  url: string
  author?: string
  subtitle?: string
  description?: string
  image?: string
  id?: string
  tweet?: TweetData
}

export interface Post extends TimelineEvent {
  url: string
  id: string
  tweet?: TweetData
}
