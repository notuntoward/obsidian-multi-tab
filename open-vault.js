const path = require('path');
const { exec } = require('child_process');

const vaultName = 'obsidian-multi-tab-test-vault';
const vaultPath = path.resolve(__dirname, 'test-vault');

const uri = `obsidian://open?vault=${encodeURIComponent(vaultName)}&path=${encodeURIComponent(vaultPath)}`;

exec(`start ${uri}`, (err) => {
    if (err) {
        console.error('Failed to open Obsidian:', err);
    }
});
