# Obsidian Multi-Tab Plugin

This plugin allows you to select and manage multiple tabs in Obsidian.

## Usage Guide

Once you have installed the plugin from the Obsidian Community Plugins store, you can manage multiple tabs using the following methods:

### Selecting Tabs

You can select multiple tabs in the same way you would select multiple files in your operating system:

-   **Ctrl+Click:** Hold down the `Ctrl` key (or `Cmd` on macOS) and click on any tab to add it to your selection. Click a selected tab again to deselect it.
-   **Shift+Click:** Select a tab, then hold down the `Shift` key and click another tab to select all the tabs in between.

Selected tabs will be highlighted, making them easy to identify.

### Running Commands on Selected Tabs

After selecting your desired tabs, open the Obsidian Command Palette (`Ctrl+P` or `Cmd+P`) and search for "Multi Tab" to see the available commands. You can perform the following actions on all selected tabs at once:

-   **Add Property to Selected Tabs**
-   **Remove Property from Selected Tabs**
-   **Add Tag to Selected Tabs**
-   **Remove Tag from Selected Tabs**
-   **Rename Tag in Selected Tabs**

You can also run these commands on **all open tabs** in the current window.

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

