const fs            = require('fs');
const path          = require('path');
const pug           = require('pug');

const pugFilesPath  = path.join(__dirname, 'build', 'views');

fs.readdir(pugFilesPath, function(error, files) {
    files.forEach((file) => {
        if(!file.startsWith('_')) {
            let thisFilePath = path.join(pugFilesPath, file);
            let newFileName = file.replace('.pug', '.html');

            let compile = pug.compileFile(thisFilePath);

            let htmlSource = compile();

            fs.writeFileSync(`./${newFileName}`, htmlSource);
        }
    })
})