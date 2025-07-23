# Obsidian Multi-Tab Plugin

This plugin allows you to select and manage multiple tabs in Obsidian.

## Development

To get started with development, you'll need to configure your local vault paths.

1.  **Duplicate the Example Config:**
    Copy the `obsidian-vaults.config.example.js` file and rename it to `obsidian-vaults.config.js`.

2.  **Configure Your Vaults:**
    Edit `obsidian-vaults.config.js` to add the absolute paths to your personal and test vaults.

    ```javascript
    // obsidian-vaults.config.js
    const path = require('path');

    module.exports = {
        personalVaultPath: 'C:\Users\YourUser\Documents\Obsidian\PersonalVault',
        testVaultPath: path.resolve(__dirname, 'test-vault'),
    };
    ```

3.  **Install Dependencies:**
    ```bash
    npm install
    ```

4.  **Run the Build:**
    ```bash
    npm run build
    ```

## Available Scripts

-   `npm run dev`: Watch for changes and rebuild the plugin automatically.
-   `npm run build`: Build the plugin for production.
-   `npm test`: Run the Jest test suite.
-   `npm run install-plugin-test`: Install the plugin in the test vault.
-   `npm run open-test-vault`: Open the test vault in Obsidian.
-   `npm run install-plugin-personal`: Install the plugin in your personal vault.
-   `npm run open-personal-vault`: Open your personal vault in Obsidian.

