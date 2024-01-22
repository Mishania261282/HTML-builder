const path = require('path');
const fs = require('fs');
const { stdin, stdout } = process;

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));
stdout.write('Hi! Enter some information:\n');

stdin.on('data', (chunk) => {
  chunk.includes('exit') ? process.exit() : output.write(chunk);
});
process.on('exit', () => stdout.write('Good luck!'));
process.on('SIGINT', () => process.exit());
