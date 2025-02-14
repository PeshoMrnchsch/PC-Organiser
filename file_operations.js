const fs = require('fs').promises;
const path = require('path');
const{ createFolder } = require("./folder_operations");

async function getFiles(directoryPath) {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp', 'heif', 'svg'];

    try {
        const files = await fs.readdir(directoryPath);
        for (const file of files) {
            const filePath = path.join(directoryPath, file);
    
            try{
                const stats = await fs.lstat(filePath);
                // Checking if it is a folder
                if(stats.isDirectory()){
                    continue;
                }
                // File is NOT a folder - Getting the extension

                let ext = path.extname(file);
                let newFolderPath= "";
                if(ext) {
                    if(imageExtensions.includes(ext.slice(1))) {
                        newFolderPath = path.join(directoryPath, "Images");
                    } else {
                      ext = ext.toUpperCase();
                      newFolderPath = path.join(directoryPath, `${ext} Files`);
                    }

                    await createFolder(newFolderPath);
                    const movedFilePath =  path.join(newFolderPath, file);
                    await fs.rename(filePath, movedFilePath);
                    console.log(`File moved to ${movedFilePath}`);
                

                }
            } catch (err){
                console.error(`Error processing file ${file}:`, err);

            }
        }
    } catch (err) {
        console.error("Something went wrong:", err);
    }
}
module.exports = { getFiles };