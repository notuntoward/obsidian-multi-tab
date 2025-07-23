// obsidian-vaults.config.example.js
//
// This file provides a template for configuring the paths to your Obsidian vaults.
// To use it, duplicate this file and rename it to `obsidian-vaults.config.js`.
// Then, fill in the absolute paths to your personal and test vaults.

// IMPORTANT:
// After creating your `obsidian-vaults.config.js` file, it will be automatically
// ignored by Git to ensure your local paths are not committed to the repository.

module.exports = {
    // The absolute path to your personal Obsidian vault.
    // This is used by the `install-plugin-personal` and `open-personal-vault` scripts.
    // Example: 'C:\Users\YourUser\Documents\Obsidian\PersonalVault'
    personalVaultPath: '',

    // The absolute path to the test vault included in this repository.
    // This is used by the `install-plugin-test` and `open-test-vault` scripts.
    // The path should be resolved relative to the project's root directory.
    // Example: require('path').resolve(__dirname, 'test-vault')
    testVaultPath: '',
};
