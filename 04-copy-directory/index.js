const fs = require('fs/promises');
const { rm, mkdir } = require('fs/promises');
const path = require('path');

const pathFolder = path.join(__dirname, 'files');
const pathCopiedFolder = path.join(__dirname, 'files-copy');

async function copyFolder() {
  try {
    await rm(pathCopiedFolder, { force: true, recursive: true });
    await mkdir(pathCopiedFolder, { recursive: true });
    const files = await fs.readdir(
      pathFolder,
      { withFileTypes: true },
      (error, files) => {
        if (error) {
          console.log(error);
        }
        return files;
      },
    );
    files.forEach((file) => {
      const filePath = path.join(pathFolder, file.name);
      const filepathCopiedFolder = path.join(pathCopiedFolder, file.name);
      fs.copyFile(filePath, filepathCopiedFolder);
    });
  } catch (error) {
    console.log(error.message);
  }
}

copyFolder();
