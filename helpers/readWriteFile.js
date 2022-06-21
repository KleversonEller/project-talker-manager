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
    try {
        const readContent = readFile(file) || [];

        readContent.push(content);
        await fs.writeFile(file, JSON.stringify(readContent));

        return content;
    } catch (error) {
        return null;
    }
};

module.exports = { readFile, writeContentFile };