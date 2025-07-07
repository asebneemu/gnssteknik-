import fs from "fs";
import path from "path";
import { glob, globSync } from "glob";

const WEBP_DIR = "public";
const ORIGINAL_DIR = "public";

glob(`${WEBP_DIR}/*.webp`, {}, (err, files) => {
  if (err) {
    console.error("HATA:", err);
    return;
  }

  files.forEach((filePath) => {
    const fileName = path.basename(filePath);

    const jpgMatch = globSync(`${ORIGINAL_DIR}/**/${fileName.replace(".webp", ".jpg")}`);
    const pngMatch = globSync(`${ORIGINAL_DIR}/**/${fileName.replace(".webp", ".png")}`);
    const matches = [...jpgMatch, ...pngMatch];

    if (matches.length === 0) {
      console.warn(`Orijinal dosya bulunamadı: ${fileName}`);
      return;
    }

    const originalPath = matches[0];
    const originalDir = path.dirname(originalPath);
    const newLocation = path.join(originalDir, fileName);

    fs.renameSync(filePath, newLocation);
    console.log(`✅ Taşındı: ${fileName} → ${newLocation}`);
  });
});
