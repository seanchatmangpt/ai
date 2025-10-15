import { readFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 50
  const set = query.set as string
  const rarity = query.rarity as string
  const search = query.search as string
  
  try {
    // Read the cards.json file
    const cardsPath = join(process.cwd(), 'mtg_dataset', 'cards.json')
    const cardsData = await readFile(cardsPath, 'utf-8')
    let cards = JSON.parse(cardsData)
    
    // Apply filters
    if (set) {
      cards = cards.filter((card: any) => card.set_code === set)
    }
    
    if (rarity) {
      cards = cards.filter((card: any) => card.rarity === rarity)
    }
    
    if (search) {
      const searchLower = search.toLowerCase()
      cards = cards.filter((card: any) => 
        card.name.toLowerCase().includes(searchLower) ||
        card.type_line?.toLowerCase().includes(searchLower) ||
        card.oracle_text?.toLowerCase().includes(searchLower)
      )
    }
    
    // Get unique sets and rarities for filter options
    const sets = [...new Set(cards.map((card: any) => card.set_code))].sort()
    const rarities = [...new Set(cards.map((card: any) => card.rarity))].sort()
    
    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedCards = cards.slice(startIndex, endIndex)
    
    return {
      cards: paginatedCards,
      total: cards.length,
      page,
      limit,
      totalPages: Math.ceil(cards.length / limit),
      sets,
      rarities
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to load cards data'
    })
  }
})

