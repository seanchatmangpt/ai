import type { TournamentResult } from '~/types'

const sampleOpponents = [
  'Alex Chen',
  'Sarah Johnson', 
  'Mike Rodriguez',
  'Emma Thompson',
  'David Kim',
  'Lisa Wang',
  'James Wilson',
  'Maria Garcia'
]

const sampleFormats = [
  'Standard',
  'Modern', 
  'Legacy',
  'Vintage',
  'Commander',
  'Pioneer',
  'Pauper'
]

const sampleLocations = [
  'Grand Prix Chicago',
  'SCG Tour Baltimore',
  'PTQ Seattle',
  'FNM Local Store',
  'Regional Championship',
  'Pro Tour Qualifier',
  'MagicFest Dallas'
]

const tournamentResults: TournamentResult[] = []

// Generate sample tournament data
for (let i = 0; i < 20; i++) {
  const daysAgo = Math.floor(Math.random() * 90) // Last 90 days
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  
  const results: TournamentResult['result'][] = [
    '1st Place', '2nd Place', '3rd Place', 'Top 8', 'Top 16', 'Top 32', 'Eliminated'
  ]
  
  const result = results[Math.floor(Math.random() * results.length)]
  
  // Calculate winnings based on result
  let winnings = 0
  switch (result) {
    case '1st Place':
      winnings = Math.floor(Math.random() * 2000) + 1000 // $1000-3000
      break
    case '2nd Place':
      winnings = Math.floor(Math.random() * 1000) + 500 // $500-1500
      break
    case '3rd Place':
      winnings = Math.floor(Math.random() * 500) + 250 // $250-750
      break
    case 'Top 8':
      winnings = Math.floor(Math.random() * 200) + 100 // $100-300
      break
    case 'Top 16':
      winnings = Math.floor(Math.random() * 100) + 50 // $50-150
      break
    case 'Top 32':
      winnings = Math.floor(Math.random() * 50) + 25 // $25-75
      break
    default:
      winnings = 0
  }
  
  tournamentResults.push({
    id: `tournament-${i + 1}`,
    date: date.toISOString(),
    status: 'completed',
    opponent: sampleOpponents[Math.floor(Math.random() * sampleOpponents.length)],
    result,
    winnings,
    format: sampleFormats[Math.floor(Math.random() * sampleFormats.length)],
    location: sampleLocations[Math.floor(Math.random() * sampleLocations.length)]
  })
}

// Sort by date (most recent first)
tournamentResults.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  // Filter by format if provided
  if (query.format) {
    return tournamentResults.filter(t => t.format === query.format)
  }
  
  return tournamentResults
})

