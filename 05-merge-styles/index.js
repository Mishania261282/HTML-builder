/* eslint-disable indent */
const fs = require('fs');
const fsPromise = require('fs/promises');
const path = require('path');

async function mergeStyles() {
  const originFolderPath = path.join(__dirname, 'styles');
  const targetFolderPath = path.join(__dirname, 'project-dist');
  const resultFilePath = path.join(targetFolderPath, 'bundle.css');

  try {
    const files = await fsPromise.readdir(originFolderPath);
    const cssFiles = files.filter((file) => path.extname(file) === '.css');
    const writeStream = fs.createWriteStream(resultFilePath);
    cssFiles.forEach((file) => {
      const filePath = path.join(originFolderPath, file);
      const readStream = fs.createReadStream(filePath, 'utf-8');
      readStream.pipe(writeStream);
    }),
      process.stdout.write('The contents of the styles compiled successfully.');
  } catch (error) {
    console.error(`Error merging styles: ${error.message}`);
  }
}

mergeStyles();
