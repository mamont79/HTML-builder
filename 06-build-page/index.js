const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, 'project-dist');
const projectAssets = path.join(__dirname, 'project-dist', 'assets');


fs.mkdir(projectDir, () => { console.log('Папка успешно создана') });
fs.mkdir(projectAssets, () => { console.log('Папка успешно создана') });

fs.readdir(projectAssets, function(err, items) {
  console.log(items)


})
// merge HTML
const htmlFrom = path.join(__dirname, 'components');
const htmlIn = path.join(__dirname, 'project-dist', 'index.html');


fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', function(error, fileContent){
  if(error) throw error; 
  
  let htmlItems = fileContent.split('{{').join('---').split('}}').join('---').split('---');

  let htmlFile = "" + htmlItems[0];

  for (let i = 0; i < htmlItems.length; i++) {
    if(htmlItems[i] == "header") {
        fs.readFile(path.join(__dirname, 'components', 'header.html'), 'utf-8', function(error, fileContent){
          if(error) throw error; 
          htmlFile = (htmlFile + "\n" + fileContent) + "\n" + htmlItems[i+1];
          console.log("add header");
        });
    } else if(htmlItems[i] == "footer") {
      fs.readFile(path.join(__dirname, 'components', 'footer.html'), 'utf-8', function(error, fileContent){
        if(error) throw error; 
        htmlFile = (htmlFile + "\n" + fileContent) + "\n" + htmlItems[i+1];
        console.log("add footer");
        fs.writeFile(htmlIn, htmlFile, function(error){
          if(error) throw error; 
          console.log('Данные успешно записаны');
        });
      });
    } else if(htmlItems[i] == "articles") {
        fs.readFile(path.join(__dirname, 'components', 'articles.html'), 'utf-8', function(error, fileContent){
          if(error) throw error; 
          htmlFile = (htmlFile + "\n" + fileContent) + "\n" + htmlItems[i+1];
          console.log("add main");
        });
    } else if(htmlItems[i] == "about") {
        fs.readFile(path.join(__dirname, 'components', 'about.html'), 'utf-8', function(error, fileContent){
          if(error) throw error; 
          htmlFile = (htmlFile + "\n" + fileContent) + "\n" + htmlItems[i+1];
          console.log("add about");
        });
    }
  }
  //console.log(htmlItems);
});



// merge styles

const styleFrom = path.join(__dirname, 'styles');
const styleIn = path.join(__dirname, 'project-dist', 'style.css');

fs.readdir(styleFrom, function(err, items) {
    let filesList = items;
    let toWrite = '';

    for (var i = 0; i < filesList.length; i++) {
        let styleFile = path.join(__dirname, 'styles', filesList[i]);
        let nameFile = path.basename(styleFile).split('.');
        if (nameFile[1] === "css") {
          let cssFile = nameFile.join('.')
          fs.readFile(path.join(__dirname, 'styles', cssFile), 'utf-8', function(error, fileContent){
            if(error) throw error; 
            // console.log(fileContent);
            
            toWrite = toWrite + `/*   styles for ${cssFile}    */` + "\n" + "\n" + fileContent;
         
            fs.writeFile(styleIn, toWrite, function(error){
               if(error) throw error; 
               //console.log('Данные успешно записаны');
            });
          });
          //console.log(cssFile);
        }
    }
    
    //console.log(filesList);
});


// copy of assets
const projectAssetsFonts = path.join(__dirname, 'project-dist', 'assets', 'fonts');
const projectAssetsImg = path.join(__dirname, 'project-dist', 'assets', 'img');
const projectAssetsSvg = path.join(__dirname, 'project-dist', 'assets', 'svg');

fs.mkdir(projectAssetsFonts, () => { console.log('Папка успешно создана') });
fs.mkdir(projectAssetsImg, () => { console.log('Папка успешно создана') });
fs.mkdir(projectAssetsSvg, () => { console.log('Папка успешно создана') });



fs.readdir(projectAssets, function(err, items) {
  let folderList = items;
  for (let i = 0; i < folderList.length; i++) {
    let wayFrom = path.join(__dirname, 'project-dist', 'assets', folderList[i]);
    fs.readdir(wayFrom, function(err, items) {
      if (items.length > 0) {
        let delList = items;
    
        for (var i = 0; i < delList.length; i++) {
            let delFile = path.join(wayFrom, delList[i]);
            fs.unlink(delFile, () => { console.log('Файл успешно удалён') });
        }

      }
    });
  }
})

fs.readdir(projectAssets, function(err, items) {
  let folderList = items;
  for (let i = 0; i < folderList.length; i++) {
    let wayFrom = path.join(__dirname, 'assets', folderList[i]);
    let wayIn = path.join(__dirname, 'project-dist', 'assets', folderList[i]);

    fs.readdir(wayFrom, function(err, items) {
      let copyList = items;
      for (var i = 0; i < copyList.length; i++) {
        let thisFile = path.join(wayFrom, copyList[i]);
        let outFile = path.join(wayIn, copyList[i]);
        fs.copyFile(thisFile, outFile, () => { console.log('Файл успешно скопирован') });
      }
      
    })
  }
})



