const fs            = require('fs');
const path          = require('path');
const pug           = require('pug');

const config        = require('./config.json');

const pugFilesPath  = path.join(__dirname, 'build', 'views');

fs.readdir(pugFilesPath, function(error, files) {
    files.forEach((file) => {
        if(!file.startsWith('_')) {
            let thisFilePath = path.join(pugFilesPath, file);
            let newFileName = file.replace('.pug', '.html');

            let compile = pug.compileFile(thisFilePath);

            let htmlSource = compile({
                title: config.title,
                description: config.description,
                card: config.socialCard,
                
                cdnJQuery: config.cdn.jQuery,
                cdnBoostrapCss: config.cdn.bootstrapCss,
                cdnBoostrapJs: config.cdn.bootstrapJs,
                cdnFontAwesome: config.cdn.fontAwesome,

                iconPaw: config.icons.bugglePaw,
                iconChangelog: config.icons.changelog,
                iconAbout: config.icons.about,
                iconDonate: config.icons.donate
            });

            fs.writeFileSync(`./${newFileName}`, htmlSource);
        }
    })
})