# Obsidian Multi-Tab Plugin

This plugin allows you to select and manage multiple tabs in Obsidian at once, streamlining your workflow when dealing with many open notes.

## Features

-   **Select Multiple Tabs:** Use `Ctrl/Cmd+Click` to select individual tabs or `Shift+Click` to select a range of tabs.
-   **Run Commands on Selections:** Perform actions like adding/removing properties and tags on all selected tabs simultaneously.
-   **Run Commands on All Tabs:** Apply commands to every open tab in the current window without needing to select them first.

---

## Development Guide

Follow these instructions to set up a local development environment. This project requires a dedicated, separate Obsidian vault for running automated tests.

### Prerequisites

-   [Node.js](https://nodejs.org/)
-   The [Obsidian](https://obsidian.md/) application.

### Step 1: Create and Configure the Test Vault

1.  **Create a New Vault:** Open the Obsidian application and create a new, empty vault. This vault will be used exclusively for running automated tests. You can name it anything you like (e.g., "Multi-Tab Test Vault").
2.  **Set the Environment Variable:** You must tell the project scripts where to find this new vault by setting the `OBSIDIAN_TEST_VAULT_PATH` environment variable. Set it to the **absolute path** of the test vault you just created.

    **Windows (PowerShell):**
    ```powershell
    $env:OBSIDIAN_TEST_VAULT_PATH="C:\Users\YourUser\Documents\Obsidian\Multi-Tab-Test-Vault"
    ```

    **macOS/Linux (bash/zsh):**
    ```bash
    export OBSIDIAN_TEST_VAULT_PATH="/Users/YourUser/Documents/Obsidian/Multi-Tab-Test-Vault"
    ```

### Step 2: Initial Project Setup

Clone the repository and install the necessary Node.js dependencies.

```bash
git clone https://github.com/your-username/obsidian-multi-tab.git
cd obsidian-multi-tab
npm install
```

### Step 3: Initialize the Test Vault

Now, run the initialization script. This command will copy the necessary test notes from the `test-notes` directory into your configured test vault and then attempt to open the vault in Obsidian.

```bash
npm run initialize-test-vault
```

### Step 4: Build and Test

1.  **Build the Plugin:** Compile the TypeScript source into `main.js`.
    ```bash
    npm run build
    ```
    *(Use `npm run dev` for automatic rebuilding during development.)*

2.  **Run Tests:** Execute the automated test suite. This command will first install the latest build of the plugin into your test vault and then run the tests.
    ```bash
    npm test
    ```

### Personal Vault Scripts (Optional)

If you want to install the plugin in your primary, day-to-day vault for manual testing, you must set the `OBSIDIAN_PERSONAL_VAULT_PATH` environment variable.

-   `npm run install-plugin-personal`: Copies the plugin into your personal vault.
-   `npm run open-personal-vault`: Opens your personal vault in Obsidian.
