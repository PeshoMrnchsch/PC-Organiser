const path = require('path');
const homedir = require('os').homedir();
const { getFiles } = require('./file_operations');

const downloadsFolderPath = path.join(homedir, 'Downloads');

(async function() {
    // Getting the file extensions and create the folders needed;
    await getFiles(downloadsFolderPath);
    
})();