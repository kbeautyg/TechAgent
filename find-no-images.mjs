import fs from 'fs';
import path from 'path';

// Read and parse products.ts
const productsFile = fs.readFileSync('./src/data/products.ts', 'utf-8');

// Extract the products array using regex
const productsMatch = productsFile.match(/export const products: Product\[\] = \[([\s\S]*?)\];/);
if (!productsMatch) {
  console.error('Could not find products array');
  process.exit(1);
}

// Simple extraction - split by { and count to rebuild products
const productObjects = [];
const objectMatches = productsFile.matchAll(/\{\s*id:\s*'([^']+)'[^}]*?name:\s*'([^']+)'[^}]*?brand:\s*'([^']+)'[^}]*?category:\s*'([^']+)'[^}]*?\}/g);

for (const match of objectMatches) {
  productObjects.push({
    id: match[1],
    name: match[2],
    brand: match[3],
    category: match[4]
  });
}

// Read productImages.ts to get getProductImage function
const imagesFile = fs.readFileSync('./src/utils/productImages.ts', 'utf-8');

// Extract imageMap
const imageMapMatch = imagesFile.match(/const imageMap: Record<string, string> = \{([\s\S]*?)\};/);
const imageMap = {};
if (imageMapMatch) {
  const entries = imageMapMatch[1].matchAll(/'([^']+)':\s*'([^']+)'/g);
  for (const [, key, value] of entries) {
    imageMap[key] = value;
  }
}

// Extract keywordMap
const keywordMapMatch = imagesFile.match(/const keywordMap: Record<string, string> = \{([\s\S]*?)\};/);
const keywordMap = {};
if (keywordMapMatch) {
  const entries = keywordMapMatch[1].matchAll(/'([^']+)':\s*'([^']+)'/g);
  for (const [, key, value] of entries) {
    keywordMap[key] = value;
  }
}

// Implement getProductImage logic
function getProductImage(productId, productName = '') {
  const id = productId.toLowerCase();
  const name = productName.toLowerCase();

  // Try exact prefix matches first
  for (const [prefix, url] of Object.entries(imageMap)) {
    if (id.startsWith(prefix)) {
      return url;
    }
  }

  // Try keyword matches in product name
  for (const [keyword, url] of Object.entries(keywordMap)) {
    if (name.includes(keyword)) {
      return url;
    }
  }

  // Try partial keyword matches (at least 2 keywords matching)
  const nameWords = name.split(' ').filter((w) => w.length > 2);
  let bestMatchCount = 0;
  let bestMatchUrl = '';

  for (const [keyword, url] of Object.entries(keywordMap)) {
    const keywordWords = keyword.split(' ');
    let matchCount = 0;
    for (const word of keywordWords) {
      if (nameWords.includes(word)) {
        matchCount++;
      }
    }
    if (matchCount > bestMatchCount) {
      bestMatchCount = matchCount;
      bestMatchUrl = url;
    }
  }

  if (bestMatchCount >= 2) {
    return bestMatchUrl;
  }

  // Return empty string for fallback
  return '';
}

// Find products without images
const noImages = [];
for (const product of productObjects) {
  const image = getProductImage(product.id, product.name);
  if (!image || image === '') {
    noImages.push(product);
  }
}

// Format output
let output = `Products without images (${noImages.length} total):\n`;
output += '='.repeat(100) + '\n\n';

for (const product of noImages) {
  output += `ID: ${product.id}\n`;
  output += `Name: ${product.name}\n`;
  output += `Brand: ${product.brand}\n`;
  output += `Category: ${product.category}\n`;
  output += '-'.repeat(100) + '\n';
}

// Write to file
fs.writeFileSync('../no-images.txt', output);
console.log(`Found ${noImages.length} products without images`);
console.log(`Output written to no-images.txt`);
