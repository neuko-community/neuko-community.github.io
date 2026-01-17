export interface TimelineEvent {
  date: string
  source: SourceType
  type: EventType
}

export interface LegacyEvent extends TimelineEvent {
  title?: string
  description?: string
  postUrl?: string
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
