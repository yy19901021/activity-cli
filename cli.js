
const fs = require('fs')
const path = require('path')
const createdFile = path.resolve(__dirname, './src/pages')
const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title><!--title--></title>
  <script> <%= require("raw-loader!babel-loader!../../../lib/ts/rem.js") %> </script> 
</head>
<body>
  <!--body content-->
</body>
</html>`
function createDirWithFile (dirNames = []) {
  for (let i = 0; i < dirNames.length; i++) {
    const element = dirNames[i];
    let filePath = createdFile + '/' + element
    let isHasDir = fs.existsSync(filePath)
    if (!isHasDir) {
      try {
        fs.mkdirSync(filePath)
        fs.appendFileSync(filePath + '/index.html', htmlTemplate, 'utf8');
        fs.appendFileSync(filePath + '/index.ts', 'import "./index.scss"', 'utf8');
        fs.appendFileSync(filePath + '/index.scss', "", 'utf8');
      } catch (error) {
        console.error(error)
        break
      }
    } else {
      console.warn('文件夹存在')
    }
  }
}

if (process.env.NODE_ENV === 'create') {
  const dirName = process.argv.slice(2)
  createDirWithFile(dirName)
}