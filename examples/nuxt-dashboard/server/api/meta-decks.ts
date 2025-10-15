import type { MetaDeck } from '~/types'

const sampleMetaDecks: MetaDeck[] = [
  {
    id: 'deck-1',
    name: 'Izzet Murktide',
    archetype: 'Tempo',
    format: 'Modern',
    colors: ['U', 'R'],
    cards: [
      { card: { id: '1', name: 'Murktide Regent', manaCost: '{5}{U}{U}', cmc: 7, type: 'Creature — Dragon', rarity: 'rare', set: 'mh2', setName: 'Modern Horizons 2', text: 'Flying\nMurktide Regent enters the battlefield with a +1/+1 counter on it for each instant and sorcery card in your graveyard.\nAt the beginning of combat on your turn, if Murktide Regent has seven or more +1/+1 counters on it, it gains double strike until end of turn.', artist: 'Chris Rahn', number: '58', power: '3', toughness: '3', colors: ['U'], colorIdentity: ['U'], legalities: {}, printings: [], imageUrl: '/mtg_dataset/images/1.jpg' }, quantity: 4 },
      { card: { id: '2', name: 'Lightning Bolt', manaCost: '{R}', cmc: 1, type: 'Instant', rarity: 'common', set: 'lea', setName: 'Limited Edition Alpha', text: 'Lightning Bolt deals 3 damage to any target.', artist: 'Christopher Moeller', number: '161', colors: ['R'], colorIdentity: ['R'], legalities: {}, printings: [], imageUrl: '/mtg_dataset/images/2.jpg' }, quantity: 4 },
      { card: { id: '3', name: 'Counterspell', manaCost: '{U}{U}', cmc: 2, type: 'Instant', rarity: 'common', set: 'lea', setName: 'Limited Edition Alpha', text: 'Counter target spell.', artist: 'Christopher Moeller', number: '55', colors: ['U'], colorIdentity: ['U'], legalities: {}, printings: [], imageUrl: '/mtg_dataset/images/3.jpg' }, quantity: 4 }
    ],
    description: 'A powerful tempo deck that uses efficient threats and disruption to control the game.',
    winRate: 0.62,
    popularity: 0.15,
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'deck-2',
    name: 'Jund Midrange',
    archetype: 'Midrange',
    format: 'Modern',
    colors: ['B', 'R', 'G'],
    cards: [
      { card: { id: '4', name: 'Tarmogoyf', manaCost: '{1}{G}', cmc: 2, type: 'Creature — Lhurgoyf', rarity: 'rare', set: 'fut', setName: 'Future Sight', text: "Tarmogoyf's power is equal to the number of card types among cards in all graveyards and its toughness is equal to that number plus 1.", artist: 'Justin Murray', number: '124', power: '*', toughness: '*+1', colors: ['G'], colorIdentity: ['G'], legalities: {}, printings: [], imageUrl: '/mtg_dataset/images/4.jpg' }, quantity: 4 },
      { card: { id: '5', name: 'Lightning Bolt', manaCost: '{R}', cmc: 1, type: 'Instant', rarity: 'common', set: 'lea', setName: 'Limited Edition Alpha', text: 'Lightning Bolt deals 3 damage to any target.', artist: 'Christopher Moeller', number: '161', colors: ['R'], colorIdentity: ['R'], legalities: {}, printings: [], imageUrl: '/mtg_dataset/images/2.jpg' }, quantity: 4 }
    ],
    description: 'A classic midrange deck that uses efficient creatures and removal to grind out games.',
    winRate: 0.58,
    popularity: 0.12,
    lastUpdated: '2024-01-10T00:00:00Z'
  },
  {
    id: 'deck-3',
    name: 'Burn',
    archetype: 'Aggro',
    format: 'Modern',
    colors: ['R'],
    cards: [
      { card: { id: '6', name: 'Goblin Guide', manaCost: '{R}', cmc: 1, type: 'Creature — Goblin Scout', rarity: 'rare', set: 'zen', setName: 'Zendikar', text: 'Haste\nWhenever Goblin Guide attacks, defending player reveals the top card of their library. If it\'s a land card, that player puts it into their hand.', artist: 'Steve Prescott', number: '156', power: '2', toughness: '2', colors: ['R'], colorIdentity: ['R'], legalities: {}, printings: [], imageUrl: '/mtg_dataset/images/6.jpg' }, quantity: 4 },
      { card: { id: '2', name: 'Lightning Bolt', manaCost: '{R}', cmc: 1, type: 'Instant', rarity: 'common', set: 'lea', setName: 'Limited Edition Alpha', text: 'Lightning Bolt deals 3 damage to any target.', artist: 'Christopher Moeller', number: '161', colors: ['R'], colorIdentity: ['R'], legalities: {}, printings: [], imageUrl: '/mtg_dataset/images/2.jpg' }, quantity: 4 }
    ],
    description: 'A fast aggro deck that aims to deal 20 damage as quickly as possible.',
    winRate: 0.55,
    popularity: 0.18,
    lastUpdated: '2024-01-12T00:00:00Z'
  },
  {
    id: 'deck-4',
    name: 'Tron',
    archetype: 'Ramp',
    format: 'Modern',
    colors: ['G'],
    cards: [
      { card: { id: '7', name: 'Karn Liberated', manaCost: '{7}', cmc: 7, type: 'Planeswalker — Karn', rarity: 'mythic', set: 'nph', setName: 'New Phyrexia', text: '+4: Target player exiles a card from their hand.\n-3: Exile target permanent.\n-14: Restart the game, leaving in exile all non-Aura permanent cards exiled with Karn Liberated. Then put those cards onto the battlefield under your control.', artist: 'Jason Chan', number: '6', loyalty: '6', colors: [], colorIdentity: [], legalities: {}, printings: [], imageUrl: '/mtg_dataset/images/7.jpg' }, quantity: 4 }
    ],
    description: 'A ramp deck that uses the Urza lands to cast powerful threats ahead of schedule.',
    winRate: 0.52,
    popularity: 0.08,
    lastUpdated: '2024-01-08T00:00:00Z'
  },
  {
    id: 'deck-5',
    name: 'Hammer Time',
    archetype: 'Combo',
    format: 'Modern',
    colors: ['W'],
    cards: [
      { card: { id: '8', name: 'Colossus Hammer', manaCost: '{1}', cmc: 1, type: 'Artifact — Equipment', rarity: 'uncommon', set: 'm20', setName: 'Core Set 2020', text: 'Equipped creature gets +10/+10 and loses flying.\nEquip {8}\nEquip {0} (Activate this ability only if you control a creature with power 4 or greater.)', artist: 'Volkan Baga', number: '223', colors: [], colorIdentity: [], legalities: {}, printings: [], imageUrl: '/mtg_dataset/images/8.jpg' }, quantity: 4 }
    ],
    description: 'A combo deck that uses Colossus Hammer to create massive threats.',
    winRate: 0.60,
    popularity: 0.10,
    lastUpdated: '2024-01-14T00:00:00Z'
  }
]

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  // Filter by format if provided
  if (query.format) {
    return sampleMetaDecks.filter(deck => deck.format === query.format)
  }
  
  return sampleMetaDecks
})

