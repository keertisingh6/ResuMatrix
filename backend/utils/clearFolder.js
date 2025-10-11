import fs from 'fs';
import path from 'path';

const fsp = fs.promises;

export const clearFolder = async (folderPath) => {
    try {
        const exists = await fsp.stat(folderPath).then(() => true).catch(() => false);
        if (!exists) return;

        const files = await fsp.readdir(folderPath);
        for (const file of files) {
            const filePath = path.join(folderPath, file);
            const stat = await fsp.stat(filePath);
            if (stat.isDirectory()) {
                await fsp.rm(filePath, { recursive: true, force: true });
            } else {
                await fsp.unlink(filePath);
            }
        }
    } catch (err) {
        console.error('Error while removing files:', err);
    }
};
