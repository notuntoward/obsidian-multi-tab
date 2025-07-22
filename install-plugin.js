const fs = require('fs');
const path = require('path');

const pluginDirName = 'obsidian-multi-tab';
const testVaultPath = path.resolve(__dirname, 'test-vault');
const pluginDestPath = path.join(testVaultPath, '.obsidian', 'plugins', pluginDirName);

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
