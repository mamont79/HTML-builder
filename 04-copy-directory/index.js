const fs = require('fs');
const path = require('path');
const way = path.join(__dirname, 'files');
const newWay = path.join(__dirname, 'files-copy');

fs.mkdir(newWay, () => { console.log('Папка успешно создана') });

fs.stat(newWay, err => {
  if(err) {
    fs.mkdir(newWay, () => { console.log('Папка успешно создана') });
  } 
    
});

fs.readdir(newWay, function(err, items) {
  if (items.length > 0) {
    let delList = items;

    for (var i = 0; i < delList.length; i++) {
        let delFile = path.join(__dirname, 'files-copy', delList[i]);
        fs.unlink(delFile, () => { console.log('Файл успешно удалён') });
    }

    console.log(delList);
  }
});

fs.readdir(way, function(err, items) {
  let copyList = items;
  for (var i = 0; i < copyList.length; i++) {
    let thisFile = path.join(__dirname, 'files', copyList[i]);
    let outFile = path.join(__dirname, 'files-copy', copyList[i]);
    fs.copyFile(thisFile, outFile, () => { console.log('Файл успешно скопирован') });
  }
  console.log(copyList);
})




