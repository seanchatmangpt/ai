import type { AvatarProps } from '@nuxt/ui'

export type TournamentResultType = '1st Place' | '2nd Place' | '3rd Place' | 'Top 8' | 'Top 16' | 'Top 32' | 'Eliminated'
export type TournamentStatus = 'completed' | 'ongoing' | 'upcoming'

export interface Player {
  id: number
  name: string
  email: string
  avatar?: AvatarProps
  status: TournamentResultType
  location: string
}

export interface Mail {
  id: number
  unread?: boolean
  from: Player
  subject: string
  body: string
  date: string
}

export interface Member {
  name: string
  username: string
  role: 'member' | 'owner'
  avatar: AvatarProps
}

export interface Stat {
  title: string
  icon: string
  value: number | string
  variation: number
  formatter?: (value: number) => string
}

export interface TournamentResult {
  id: string
  date: string
  status: TournamentStatus
  opponent: string
  result: TournamentResultType
  winnings: number
  format: string
  location: string
}

export interface Notification {
  id: number
  unread?: boolean
  sender: Player
  body: string
  date: string
}

export interface MTGCard {
  id: string
  name: string
  manaCost: string
  cmc: number
  type: string
  rarity: string
  set: string
  setName: string
  text: string
  flavor?: string
  artist: string
  number: string
  power?: string
  toughness?: string
  loyalty?: string
  multiverseid?: number
  imageUrl?: string
  colors: string[]
  colorIdentity: string[]
  legalities: Record<string, string>
  printings: string[]
  originalText?: string
  originalType?: string
}

export interface MetaDeck {
  id: string
  name: string
  archetype: string
  format: string
  colors: string[]
  cards: {
    card: MTGCard
    quantity: number
  }[]
  description: string
  winRate: number
  popularity: number
  lastUpdated: string
}

export interface PlayerDeck {
  id: string
  name: string
  format: string
  colors: string[]
  cards: {
    card: MTGCard
    quantity: number
  }[]
  description?: string
  lastPlayed?: string
  wins: number
  losses: number
}

export type Period = 'daily' | 'weekly' | 'monthly'

export interface Range {
  start: Date
  end: Date
}
