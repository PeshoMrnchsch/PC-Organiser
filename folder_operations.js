const fs = require('fs').promises;
const path = require('path');

async function createFolder(newFolderPath) {
    // Try to create the new Folder path
    try {
        await fs.mkdir(newFolderPath);
        console.log(`Folder Created! \n${newFolderPath}`);
   
    } catch (error) {
        // If exists go to the next file without throwing an error
        // otherwise - throws an error
        if (error.code === 'EEXIST') {
            console.log(`Folder already exists: ${newFolderPath}`);
        } else if (error.code === 'EACCES') {
            console.error(`Permission denied: Unable to create folder at ${newFolderPath}`);
            throw error;
        } else if (error.code === 'EINVAL') {
            console.error(`Invalid path: ${newFolderPath}`);
            throw error;
        } else if (error.code === 'ENOENT') {
            console.error(`No such file or directory: Unable to create folder at ${newFolderPath}`);
            throw error;
        } else if (error.code === 'EDQUOT') {
            console.error(`Disk quota exceeded: Unable to create folder at ${newFolderPath}`);
            throw error;
        } else {
            console.error(`An unexpected error occurred: ${error.message}`);
            throw error;
        }
    }
}
module.exports = { createFolder };
