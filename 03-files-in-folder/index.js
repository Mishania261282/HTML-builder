const fs = require('fs');
const path = require('path');
const { stdout } = process;
const pathFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathFolder, { withFileTypes: true }, (error, files) => {
  // {withFileTypes: true} file as object, otherwise will be as a string
  if (error) {
    console.log(error);
  }

  files.forEach((file) => {
    if (file.isFile()) {
      console.log(file);
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
        }
      });
    }
  });
});
