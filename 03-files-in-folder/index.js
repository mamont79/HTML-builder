const fs = require('fs');
const path = require('path');
const way = path.join(__dirname, 'secret-folder');

fs.promises.readdir(way, { withFileTypes: true }).then (files =>files.forEach((elem) => {
  if (elem.isFile()) {
    let thisFile = path.join(__dirname, 'secret-folder', elem['name']);
    let outInfo = path.basename(thisFile).split('.');
    fs.stat(thisFile, (err, stats) => {
        if (!err) {
          fileSize = (stats.size / 1024).toString() + 'kB';
          outInfo.push(fileSize);
        }
        console.log(outInfo.join(' - '));
    })
    
  }
}))
