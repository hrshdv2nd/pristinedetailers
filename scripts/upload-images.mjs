import { put } from '@vercel/blob';
import { readFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';

const imagesDir = new URL('../public/images', import.meta.url).pathname;
const files = readdirSync(imagesDir);

for (const file of files) {
  const filePath = join(imagesDir, file);
  const data = readFileSync(filePath);
  const { url } = await put(`pristine/${file}`, data, { access: 'public' });
  console.log(`${file} → ${url}`);
}
