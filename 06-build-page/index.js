const path = require('path');
const fs = require('fs');
const { rm, mkdir, readdir, copyFile } = require('fs/promises');
const projectFolder = path.join(__dirname, 'project-dist');
const assetsFolder = path.join(__dirname, 'assets');
const assetsFolderCopy = path.join(__dirname, 'project-dist/assets');
const stylesFolder = path.join(__dirname, 'styles');
const stylesFolderCopy = path.join(__dirname, 'project-dist/style.css');
const stylesFolderCopyStream = fs.createWriteStream(stylesFolderCopy, 'utf-8');
const indexHtmlCopy = path.join(__dirname, 'project-dist/index.html');
const componentsFolder = path.join(__dirname, 'components');
const templateHtml = path.join(__dirname, 'template.html');

mkdir(projectFolder, { recursive: true });

async function createHtmlPage() {
  const readStreamTemplate = fs.createReadStream(templateHtml, {
    encoding: 'utf-8',
  });
  let result = '';
  readStreamTemplate.on('data', (data) => {
    result = data;
  });
  readStreamTemplate.on('end', async () => {
    const components = await readdir(componentsFolder, { withFileTypes: true });

    components.forEach((file) => {
      if (file.isFile()) {
        const componentsFile = path.join(componentsFolder, file.name);
        const readStreamComponent = fs.createReadStream(
          componentsFile,
          'utf-8',
        );
        readStreamComponent.on('data', (data) => {
          const writeStreamHtml = fs.createWriteStream(indexHtmlCopy);
          const replacement = data;
          result = result.replace(
            `{{${path.basename(componentsFile).split('.')[0]}}}`,
            replacement,
          );
          writeStreamHtml.write(result);
        });
      }
    });
  });
}
createHtmlPage();

function combiningStyles() {
  fs.readdir(stylesFolder, { withFileTypes: true }, (err, files) => {
    if (err) console.log(err);
    files.forEach((file) => {
      const styleComponent = path.join(stylesFolder, file.name);
      if (file.isFile() && path.extname(styleComponent) === '.css') {
        const readableStream = fs.createReadStream(styleComponent);
        readableStream.pipe(stylesFolderCopyStream);
        readableStream.on('error', (error) => {
          console.log('Error', error.message);
        });
      }
    });
  });
}

combiningStyles();

async function copyDir(folder, assetsFolderCopy) {
  try {
    await rm(assetsFolderCopy, { recursive: true, force: true });
    await mkdir(assetsFolderCopy, { recursive: true });
    const files = await readdir(folder, { withFileTypes: true });
    files.forEach((file) => {
      const component = path.join(folder, file.name);
      const componentCopy = path.join(assetsFolderCopy, file.name);
      if (file.isDirectory()) {
        copyDir(component, componentCopy);
      } else {
        copyFile(component, componentCopy);
      }
    });
  } catch (err) {
    console.log(err);
  }
}
copyDir(assetsFolder, assetsFolderCopy);
