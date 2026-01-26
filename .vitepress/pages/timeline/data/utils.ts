import { Post, SourceType } from "../timeline.types"

export const applySourceType = (post: Omit<Post, 'source'>) => {
  if (isNeukoTeamAccount(post.user))
    return {
      ...post,
      source: SourceType.OFFICIAL
    }

  return {
    ...post,
    source: SourceType.COMMUNITY,
  }
}

const neukoTeamAccounts = [
  'neukoai',
  'austin_hurwitz',
  'SQU1NCH',
  'greenie_sr',
  'boris0chuck',
  'demdev007',
]

export const isNeukoTeamAccount = (user?: string) => user && neukoTeamAccounts.includes(user) || false