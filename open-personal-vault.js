const open = require('open');
const { personalVaultPath } = require('./obsidian-vaults.config');

if (!personalVaultPath) {
    console.error('Error: personalVaultPath not set in obsidian-vaults.config.js');
    process.exit(1);
}

const uri = `obsidian://open?path=${encodeURIComponent(personalVaultPath)}`;

open(uri).catch(err => {
    console.error('Failed to open Obsidian:', err);
});
