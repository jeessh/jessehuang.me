const fs = require("fs");
const path = require("path");

const sharp = require("sharp");

const imageExtensions = new Set([".jpg", ".jpeg", ".png"]);
const textFileExtensions = new Set([
  ".js",
  ".ts",
  ".jsx",
  ".tsx",
  ".html",
  ".css",
  ".json",
  ".md",
]);


let originalImageCount = 0;
let convertedImageCount = 0;
let originalTotalSize = 0;
let optimizedTotalSize = 0;
const QUALITY = 80; // WebP quality, genreally 80 is good and beyond that there is barely any change to the naked eye + exponentially grows file size
let imagePathMap = new Map(); // Store old path -> new path

// Function to check if an image should be skipped
function shouldSkipImage(fileName) {
  const filesToSkip = ["GooseCart.png"];
  return filesToSkip.includes(fileName);
}

// Function to recursively scan directories for images with progress
function scanImages(dir) {
  const files = fs.readdirSync(dir);
  let imagePaths = [];

  files.forEach((file, index) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      imagePaths = imagePaths.concat(scanImages(filePath)); // Recursively scan subdirectories
    } else if (
      imageExtensions.has(path.extname(file).toLowerCase()) &&
      !shouldSkipImage(file)
    ) {
      imagePaths.push({ path: filePath, size: stat.size });
    }
  });

  return imagePaths;
}

// Function to convert image to WebP format
function convertToWebP(image) {
  const outputFilePath = image.path.replace(path.extname(image.path), ".webp");

  return sharp(image.path)
    .webp({ quality: QUALITY }) // Convert image to WebP with 80% quality
    .toFile(outputFilePath)
    .then(({ size }) => {
      convertedImageCount++;
      optimizedTotalSize += size;
      imagePathMap.set(image.path, outputFilePath); // Store old -> new path mapping

      // 🚨 Deleting the original image file after successful conversion
      fs.unlinkSync(image.path);
      console.log(
        `✅ Converted & Deleted: ${image.path} -> ${outputFilePath} (${(
          size / 1024
        ).toFixed(2)} KB)`
      );
    })
    .catch((err) => {
      console.error(`❌ Error processing ${image.path}:`, err);
    });
}

// Function to recursively scan directories for text files with progress
function scanTextFiles(dir) {
  const files = fs.readdirSync(dir);
  let textFilePaths = [];

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      textFilePaths = textFilePaths.concat(scanTextFiles(filePath)); // Recursively scan subdirectories
    } else if (textFileExtensions.has(path.extname(file).toLowerCase())) {
      textFilePaths.push(filePath);
    }
  });

  return textFilePaths;
}

// Function to replace old image paths with new .webp paths in text files
function replaceImagePathsInFiles(textFiles) {
  const totalFiles = textFiles.length;

  textFiles.forEach((filePath, index) => {
    let content = fs.readFileSync(filePath, "utf8");
    let updatedContent = content;

    imagePathMap.forEach((newPath, oldPath) => {
      // Match all instances of image paths in text files, including relative paths
      const regex = new RegExp(
        `(['"\`])([^'"\`]+)(${oldPath
          .split(path.sep)
          .pop()
          .replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")})\\1`,
        "g"
      );

      // Replace with the new .webp path, keeping the quotes intact
      updatedContent = updatedContent.replace(
        regex,
        (match, quote, pathBefore) => {
          // Ensure we replace only the last part (file name) with the new .webp name
          return `${quote}${pathBefore}${newPath
            .split(path.sep)
            .pop()}${quote}`;
        }
      );
    });

    // If the content was updated, write it back to the file
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent, "utf8");
    }
  });
}

// Start processing
console.log("🔄 Scanning for images...");

const repoPath = path.resolve(__dirname, "../src");
const images = scanImages(repoPath);

originalImageCount = images.length;
originalTotalSize = images.reduce((sum, img) => sum + img.size, 0);

if (originalImageCount === 0) {
  console.log("🚫 No images found to optimize.");
  process.exit(0);
}

console.log(
  `\n📂 Found ${originalImageCount} images. Total size: ${(
    originalTotalSize /
    1024 /
    1024
  ).toFixed(2)} MB`
);
console.log("⚡ Optimizing images...");

// Convert images to WebP
Promise.all(images.map(convertToWebP)).then(() => {
  console.log("\n🔄 Scanning for text files to update references...");
  const textFiles = scanTextFiles(repoPath);

  console.log(`📄 Found ${textFiles.length} text-based files.`);
  console.log("🔍 Replacing image references...");
  replaceImagePathsInFiles(textFiles);

  console.log("\n🎉 Image optimization complete!");
  console.log(`📉 Optimized ${convertedImageCount} images.`);
  console.log(
    `📦 Original Size: ${(originalTotalSize / 1024 / 1024).toFixed(2)} MB`
  );
  console.log(
    `📦 Optimized Size: ${(optimizedTotalSize / 1024 / 1024).toFixed(2)} MB`
  );
  console.log(
    `💾 Space Saved: ${(
      (originalTotalSize - optimizedTotalSize) /
      1024 /
      1024
    ).toFixed(2)} MB`
  );
});

// test pre push
