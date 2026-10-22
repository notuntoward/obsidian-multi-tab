# Obsidian Multi-Tab Plugin

This plugin allows you to select and manage multiple tabs in Obsidian at once, streamlining your workflow when dealing with many open notes.

## Features

- **Select Multiple Tabs:** Use `Ctrl/Cmd+Click` to select individual tabs or `Shift+Click` to select a range of tabs.
- **Run Commands on Selections:** Perform actions like adding/removing properties and tags on all selected tabs simultaneously.
- **Run Commands on All Tabs:** Apply commands to every open tab in the current window without needing to select them first.

---

## Development

### Prerequisites

- [Node.js](https://nodejs.org/)

### Setup and Build

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the plugin:
   ```bash
   npm run build
   ```
   *(Use `npm run dev` for automatic rebuilding during development.)*

3. Run tests:
   ```bash
   npm test
   ```

### Manual Testing in Obsidian

To test live in Obsidian, symlink or junction this repository into your vault's plugin folder:

```powershell
New-Item -ItemType SymbolicLink -Path "C:\path\to\vault\.obsidian\plugins\obsidian-multi-tab" -Target "C:\path\to\obsidian-multi-tab"
```

Then enable the plugin under Obsidian Settings -> Community Plugins.
