const fs = require('fs').promises;
const path = require('path');

async function createFolder(folderPath, extension) {
    const folderName = `${extension}`.toUpperCase();
    const newFolderPath = path.join(folderPath, `${folderName} Files`);

    // Try to create the new Folder path
    try {
        await fs.mkdir(newFolderPath);
        console.log(`Folder Created! \n${newFolderPath}`);
    } catch (error) {
        if (err.code !== 'EEXIST') {
            throw err;
        } else {
            console.log(`Folder already exists: ${newFolderPath}`);
        }
        
    }
    return newFolderPath;
}
module.exports = { createFolder };
