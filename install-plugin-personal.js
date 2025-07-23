const fs = require('fs');
const path = require('path');

const pluginDirName = 'obsidian-multi-tab';
const personalVaultPath = process.env.OBSIDIAN_PERSONAL_VAULT_PATH;

if (!personalVaultPath) {
    console.error('Error: OBSIDIAN_PERSONAL_VAULT_PATH environment variable not set.');
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
