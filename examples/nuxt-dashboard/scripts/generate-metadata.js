// scripts/generate-metadata.js

import fs from 'fs/promises';
import path from 'path';

// Configurations
const OUTPUT_DIR = path.resolve(process.cwd(), 'mtg_dataset');
const IMAGES_DIR = path.join(OUTPUT_DIR, 'images');
const BULK_INDEX_URL = 'https://api.scryfall.com/bulk-data';

async function fetchJson(url) {
  const resp = await fetch(url);
  if (!resp.ok)
    throw new Error(`Failed to fetch JSON: ${url}, status ${resp.status}`);
  return resp.json();
}

async function main() {
  console.log('Fetching bulk data index...');
  const bulkIndex = await fetchJson(BULK_INDEX_URL);
  const oracleEntry = bulkIndex.data.find(d => d.type === 'oracle_cards');
  if (!oracleEntry) {
    throw new Error('oracle_cards entry not found in bulk data index');
  }
  console.log('Oracle bulk URI:', oracleEntry.download_uri);

  console.log('Downloading oracle bulk JSON...');
  const oracleCards = await fetchJson(oracleEntry.download_uri);
  console.log('Total cards in bulk:', oracleCards.length);

  // Get list of existing image files
  console.log('Reading existing image files...');
  const imageFiles = await fs.readdir(IMAGES_DIR);
  const imageIds = new Set(imageFiles.map(file => path.parse(file).name));
  console.log(`Found ${imageIds.size} existing images`);

  // Create dataset by matching existing images with card data
  const dataset = [];
  let matchedCount = 0;
  let skippedCount = 0;

  for (const card of oracleCards) {
    // Skip if we don't have the image for this card
    if (!imageIds.has(card.id)) {
      skippedCount++;
      continue;
    }

    // Filter by language (English only)
    if (card.lang && card.lang !== 'en') {
      skippedCount++;
      continue;
    }

    // Skip cards without image URIs (shouldn't happen since we have the image)
    if (!card.image_uris || !card.image_uris.normal) {
      skippedCount++;
      continue;
    }

    const imgName = `${card.id}.jpg`;
    const entry = {
      id: card.id,
      name: card.name,
      type_line: card.type_line,
      mana_cost: card.mana_cost || null,
      oracle_text: card.oracle_text || null,
      power: card.power || null,
      toughness: card.toughness || null,
      rarity: card.rarity,
      set_name: card.set_name || null,
      set_code: card.set || null,
      local_image: `images/${imgName}`,
    };

    dataset.push(entry);
    matchedCount++;

    // Progress indicator
    if (matchedCount % 1000 === 0) {
      console.log(`Processed ${matchedCount} cards...`);
    }
  }

  console.log(`\nResults:`);
  console.log(`- Matched cards: ${matchedCount}`);
  console.log(`- Skipped cards: ${skippedCount}`);
  console.log(`- Total dataset size: ${dataset.length}`);

  // Write the dataset
  console.log('Writing cards.json...');
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.writeFile(
    path.join(OUTPUT_DIR, 'cards.json'),
    JSON.stringify(dataset, null, 2),
  );

  console.log('Dataset written to', OUTPUT_DIR);
  console.log(
    'File size:',
    (await fs.stat(path.join(OUTPUT_DIR, 'cards.json'))).size,
    'bytes',
  );
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
