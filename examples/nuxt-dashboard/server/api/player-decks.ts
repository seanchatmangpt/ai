import type { PlayerDeck } from '~/types'

const samplePlayerDecks: PlayerDeck[] = [
  {
    id: 'player-deck-1',
    name: 'My Izzet Control',
    format: 'Modern',
    colors: ['U', 'R'],
    cards: [
      { card: { id: '1', name: 'Murktide Regent', manaCost: '{5}{U}{U}', cmc: 7, type: 'Creature — Dragon', rarity: 'rare', set: 'mh2', setName: 'Modern Horizons 2', text: 'Flying\nMurktide Regent enters the battlefield with a +1/+1 counter on it for each instant and sorcery card in your graveyard.\nAt the beginning of combat on your turn, if Murktide Regent has seven or more +1/+1 counters on it, it gains double strike until end of turn.', artist: 'Chris Rahn', number: '58', power: '3', toughness: '3', colors: ['U'], colorIdentity: ['U'], legalities: {}, printings: [], imageUrl: '/mtg_dataset/images/1.jpg' }, quantity: 3 },
      { card: { id: '2', name: 'Lightning Bolt', manaCost: '{R}', cmc: 1, type: 'Instant', rarity: 'common', set: 'lea', setName: 'Limited Edition Alpha', text: 'Lightning Bolt deals 3 damage to any target.', artist: 'Christopher Moeller', number: '161', colors: ['R'], colorIdentity: ['R'], legalities: {}, printings: [], imageUrl: '/mtg_dataset/images/2.jpg' }, quantity: 4 }
    ],
    description: 'My personal take on Izzet control with some tweaks',
    lastPlayed: '2024-01-15T00:00:00Z',
    wins: 12,
    losses: 8
  },
  {
    id: 'player-deck-2',
    name: 'Budget Burn',
    format: 'Modern',
    colors: ['R'],
    cards: [
      { card: { id: '6', name: 'Goblin Guide', manaCost: '{R}', cmc: 1, type: 'Creature — Goblin Scout', rarity: 'rare', set: 'zen', setName: 'Zendikar', text: 'Haste\nWhenever Goblin Guide attacks, defending player reveals the top card of their library. If it\'s a land card, that player puts it into their hand.', artist: 'Steve Prescott', number: '156', power: '2', toughness: '2', colors: ['R'], colorIdentity: ['R'], legalities: {}, printings: [], imageUrl: '/mtg_dataset/images/6.jpg' }, quantity: 4 },
      { card: { id: '2', name: 'Lightning Bolt', manaCost: '{R}', cmc: 1, type: 'Instant', rarity: 'common', set: 'lea', setName: 'Limited Edition Alpha', text: 'Lightning Bolt deals 3 damage to any target.', artist: 'Christopher Moeller', number: '161', colors: ['R'], colorIdentity: ['R'], legalities: {}, printings: [], imageUrl: '/mtg_dataset/images/2.jpg' }, quantity: 4 }
    ],
    description: 'A budget-friendly burn deck for FNM',
    lastPlayed: '2024-01-10T00:00:00Z',
    wins: 8,
    losses: 5
  },
  {
    id: 'player-deck-3',
    name: 'Casual Commander',
    format: 'Commander',
    colors: ['G', 'U'],
    cards: [
      { card: { id: '9', name: 'Kruphix, God of Horizons', manaCost: '{3}{G}{U}', cmc: 5, type: 'Legendary Enchantment Creature — God', rarity: 'rare', set: 'jou', setName: 'Journey into Nyx', text: 'Indestructible\nAs long as your devotion to green and blue is less than seven, Kruphix isn\'t a creature.\nYou have no maximum hand size.\nIf unused mana would empty from your mana pool, that mana becomes colorless instead.', artist: 'Jason Chan', number: '152', power: '4', toughness: '7', colors: ['G', 'U'], colorIdentity: ['G', 'U'], legalities: {}, printings: [], imageUrl: '/mtg_dataset/images/9.jpg' }, quantity: 1 }
    ],
    description: 'Fun casual commander deck for kitchen table games',
    lastPlayed: '2024-01-05T00:00:00Z',
    wins: 3,
    losses: 2
  }
]

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  // Filter by format if provided
  if (query.format) {
    return samplePlayerDecks.filter(deck => deck.format === query.format)
  }
  
  return samplePlayerDecks
})

