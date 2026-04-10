import { Post, SourceType } from '../timeline.types'

export const applySourceType = (post: Omit<Post, 'source'> & { source?: SourceType }) => {
  if ('source' in post && post.source) {
    return post as Post
  }

  if (isNeukoTeamAccount(post.user))
    return {
      ...post,
      source: SourceType.OFFICIAL
    }

  return {
    ...post,
    source: SourceType.COMMUNITY
  }
}

const neukoTeamAccounts = [
  'neukoai',
  'austin_hurwitz',
  'SQU1NCH',
  'greenie_sr',
  'boris0chuck',
  'demdev007',
  'blowfishbot',
  'iris_aurelian',
  '1nk_bloc'
]

export const isNeukoTeamAccount = (user?: string) =>
  (user && neukoTeamAccounts.includes(user)) || false
