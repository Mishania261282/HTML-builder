const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const pathFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathFolder, { withFileTypes: true }, (error, files) => {
  if (error) {
    console.log(error);
  }

  files.forEach((file) => {
    if (file.isFile()) {
      const pathFile = path.join(pathFolder, file.name);
      fs.stat(pathFile, (error, stats) => {
        if (error) {
          console.log(error);
        } else {
          const extension = path.extname(file.name);
          const name = path.basename(file.name, extension);
          stdout.write(
            `${name}-${extension.slice(1)}-${(stats.size / 1024).toFixed(2)}kb\n`,
          );
          // console.log(`${name}-${extension}-${(stats.size / 1024).toFixed(2)}kb`);
        }
      });
    }
  });
});
