import type { TweetData } from '../../types'

export interface TimelineEvent {
  date: string
  source: SourceType
  type: EventType
  user?: string
  tweet?: TweetData
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
  MUSIC = 'music',
  POST = 'post',
  THREAD = 'thread',
  INTERVIEW = 'interview',
  SPACES = 'spaces',
  MILESTONE = 'milestone',
  OTHER = 'other'
}

export interface Article extends TimelineEvent {
  title: string
  url: string
  id: string
  user?: string
  subtitle?: string
  description?: string
  image?: string
  tweet?: TweetData
}

export interface Post extends TimelineEvent {
  url: string
  id: string
  tweet?: TweetData
  user?: string
}
