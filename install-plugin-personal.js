const fs = require('fs');
const path = require('path');
const { personalVaultPath } = require('./obsidian-vaults.config');

const pluginDirName = 'obsidian-multi-tab';

if (!personalVaultPath) {
    console.error('Error: personalVaultPath not set in obsidian-vaults.config.js');
    process.exit(1);
}

const pluginDestPath = path.join(personalVaultPath, '.obsidian', 'plugins', pluginDirName);

if (!fs.existsSync(pluginDestPath)) {
    fs.mkdirSync(pluginDestPath, { recursive: true });
}

const filesToCopy = ['main.js', 'manifest.json', 'styles.css'];

filesToCopy.forEach(file => {
    const sourceFile = path.resolve(__dirname, file);
    const destFile = path.join(pluginDestPath, file);
    if (fs.existsSync(sourceFile)) {
        fs.copyFileSync(sourceFile, destFile);
        console.log(`Copied ${file} to ${pluginDestPath}`);
    } else {
        console.error(`Error: ${sourceFile} not found. Make sure to run 'npm run build' first.`);
    }
});
