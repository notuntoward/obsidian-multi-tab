const { exec } = require('child_process');

const personalVaultPath = process.env.OBSIDIAN_PERSONAL_VAULT_PATH;

if (!personalVaultPath) {
    console.error('Error: OBSIDIAN_PERSONAL_VAULT_PATH environment variable not set.');
    process.exit(1);
}

const uri = `obsidian://open?path=${encodeURIComponent(personalVaultPath)}`;

exec(`start ${uri}`, (err) => {
    if (err) {
        console.error('Failed to open Obsidian:', err);
    }
});
