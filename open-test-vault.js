const open = require('open');
const { testVaultPath } = require('./obsidian-vaults.config');

if (!testVaultPath) {
    console.error('Error: testVaultPath not set in obsidian-vaults.config.js');
    process.exit(1);
}

const vaultName = require('path').basename(testVaultPath);
const uri = `obsidian://open?vault=${encodeURIComponent(vaultName)}&path=${encodeURIComponent(testVaultPath)}`;

open(uri).catch(err => {
    console.error('Failed to open Obsidian:', err);
});
