const fs = require('fs');
const path = require('path');
const way = path.join(__dirname, 'text.txt');
const stream = fs.ReadStream(way, 'utf-8');

stream.on('data', chunk => {
  console.log(chunk);
});
