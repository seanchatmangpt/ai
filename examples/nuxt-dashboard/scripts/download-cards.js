// script/download_cards.js

import fs from 'fs/promises';
import path from 'path';
import { createWriteStream } from 'fs';

// Configurations
const OUTPUT_DIR = path.resolve(process.cwd(), 'mtg_dataset');
const IMAGES_DIR = path.join(OUTPUT_DIR, 'images');
const BULK_INDEX_URL = 'https://api.scryfall.com/bulk-data';
const MAX_CONCURRENT_DOWNLOADS = 5;
const RETRY_LIMIT = 3;
const RETRY_DELAY_MS = 1000;

async function fetchJson(url) {
  const resp = await fetch(url);
  if (!resp.ok)
    throw new Error(`Failed to fetch JSON: ${url}, status ${resp.status}`);
  return resp.json();
}

async function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

async function downloadImageWithRetry(uri, destPath, attempt = 1) {
  try {
    const resp = await fetch(uri);
    if (!resp.ok)
      throw new Error(`Image download failed ${uri} status ${resp.status}`);
    await fs.mkdir(path.dirname(destPath), { recursive: true });

    const writer = createWriteStream(destPath);
    const reader = resp.body.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      writer.write(value);
    }

    writer.end();
  } catch (err) {
    if (attempt < RETRY_LIMIT) {
      console.warn(`Retry ${attempt} for ${uri} after error: ${err.message}`);
      await delay(RETRY_DELAY_MS * attempt);
      return downloadImageWithRetry(uri, destPath, attempt + 1);
    } else {
      console.error(`Failed to download ${uri} after ${RETRY_LIMIT} attempts`);
      throw err;
    }
  }
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

  const dataset = [];
  const queue = [...oracleCards];

  // Worker pool to download images and metadata
  async function worker() {
    while (queue.length > 0) {
      const card = queue.shift();
      if (!card) break;

      // optional: filter by language
      if (card.lang && card.lang !== 'en') continue;
      if (!card.image_uris || !card.image_uris.normal) continue;

      const imgUri = card.image_uris.normal;
      const imgName = `${card.id}.jpg`;
      const imgDest = path.join(IMAGES_DIR, imgName);

      try {
        await downloadImageWithRetry(imgUri, imgDest);
      } catch (imgErr) {
        // skip this card if image fails
        continue;
      }

      const entry = {
        id: card.id,
        name: card.name,
        type_line: card.type_line,
        mana_cost: card.mana_cost || null,
        oracle_text: card.oracle_text || null,
        power: card.power || null,
        toughness: card.toughness || null,
        rarity: card.rarity,
        local_image: `images/${imgName}`,
      };
      dataset.push(entry);
    }
  }

  // Launch N workers
  const workers = [];
  for (let i = 0; i < MAX_CONCURRENT_DOWNLOADS; i++) {
    workers.push(worker());
  }
  await Promise.all(workers);

  console.log(`Downloaded images + metadata for ${dataset.length} cards`);

  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.writeFile(
    path.join(OUTPUT_DIR, 'cards.json'),
    JSON.stringify(dataset, null, 2),
  );

  console.log('Dataset written to', OUTPUT_DIR);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
