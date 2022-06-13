const fs = require('fs');
const mjml = require('mjml');
const path = require('path');

const mjmlFolder = path.join(__dirname, 'mjml');

fs.readdir(mjmlFolder, { withFileTypes: true }, (err, dirents) => {
  if (err) {
    return console.error(err);
  }

  const filesNames = dirents
    .filter((dirent) => dirent.isFile())
    .map((dirent) => dirent.name);

  filesNames.forEach((file) => {
    const filePath = path.join(mjmlFolder, file);
    let fileContent = fs.readFileSync(filePath, {
      encoding: 'utf8',
      flag: 'r'
    });
    fileContent = mjml(fileContent, { filePath });
    const emailsFolder = path.join(
      __dirname,
      'templates',
      file.replace('.mjml', '.html')
    );
    fs.writeFileSync(emailsFolder, fileContent.html);
  });
});
