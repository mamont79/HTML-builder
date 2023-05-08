const fs = require('fs');
const path = require('path');

const stylePath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');

fs.readdir(stylePath, function(err, items) {
    let filesList = items;
    let toWrite = '';

    for (var i = 0; i < filesList.length; i++) {
        let styleFile = path.join(__dirname, 'styles', filesList[i]);
        let nameFile = path.basename(styleFile).split('.');
        if (nameFile[1] === "css") {
          let cssFile = nameFile.join('.')
          fs.readFile(path.join(__dirname, 'styles', cssFile), 'utf8', function(error, fileContent){
            if(error) throw error; 
            // console.log(fileContent);
            
            toWrite = toWrite + "\n" + fileContent;
         
            fs.writeFile(bundlePath, toWrite, function(error){
               if(error) throw error; 
               console.log('Данные успешно записаны');
            });
          });
          console.log(cssFile);
        }
    }
    
    console.log(filesList);
});
