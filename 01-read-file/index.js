const path = require('path');
const fs = require('fs');
const pathToFile = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(pathToFile, 'utf-8');
stream.on('data', (data) => process.stdout.write(data));
