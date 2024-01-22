const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const pathFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathFolder, (error, files) => {
  if (error) {
    console.log(error);
  }

  files.forEach((file) => {
    const pathFile = path.join(pathFolder, file);
    fs.stat(pathFile, (error, stats) => {
      if (error) {
        console.log(error);
      } else {
        const extension = path.extname(file);
        const name = path.basename(file, extension);
        stdout.write(
          `${name}-${extension.slice(1)}-${(stats.size / 1024).toFixed(2)}kb\n`,
        );
        // console.log(`${name}-${extension}-${(stats.size / 1024).toFixed(2)}kb`);
      }
    });
  });
});
