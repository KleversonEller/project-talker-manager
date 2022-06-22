const fs = require('fs').promises;

const readFile = async (file) => {
    try {
        const read = await fs.readFile(file, 'utf-8');
        return JSON.parse(read);
    } catch (error) {
        return null;
    }
};

const writeContentFile = async (file, content) => {
        const readContent = await readFile(file);
        readContent.push(content);
        await fs.writeFile(file, JSON.stringify(readContent));
};

const writeFile = async (file, content) => {
        await fs.writeFile(file, JSON.stringify(content));
};

module.exports = { readFile, writeContentFile, writeFile };
