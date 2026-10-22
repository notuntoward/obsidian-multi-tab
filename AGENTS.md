# Agent Instructions for obsidian-multi-tab

## Shared library: commons

This plugin uses `commons` (repo `obsidian-commons`, normally `C:\Users\scott\repos\obsidian-commons`).
Window, tab group, tab, pop-out, window-focus and modal-chooser logic (and later color
logic) comes from `commons/*`. Never reimplement it here and never read Obsidian's
undocumented fields (`leaf.detached`, `container.win`, `rootSplit`, `tabHeaderEl`,
`chooser.setSelectedItem`, ...) in this plugin. If commons lacks something or is wrong,
change commons and tell the user: see the global rule "Obsidian shared library" and
`obsidian-commons/AGENTS.md`. Rules that moved to commons are enforced by its guardrail
tests; the rules below are the plugin-specific ones that remain.

Features imported from `commons/*`:
- Per-window event listener lifecycle (`forEachWindow` from `commons/windows`) ensures mouse, drag, and drop events work in both the main window and all popout windows.
- Tab header element resolution (`getTabHeaderEl` from `commons/workspace`) resolves leaf headers cleanly, replacing the legacy broken `closest('.workspace-tab-header')` lookup.
- Tab group sibling access (`getGroupChildren` from `commons/workspace`) supports shift-select across sibling tabs within a tab group without accessing undocumented properties directly.
- Window-scoped tab querying (`buildNavigationModel`, `getTabsInWindow`, `getActiveLeafInFocusedWindow`, `getWindowForLeaf` from `commons/workspace`) provides genuine window-scoped tab operations for "All Tabs in Window" commands.

## Commands

- `npm test` runs Vitest unit tests.
- `npm run build` runs `tsc -noEmit -skipLibCheck` followed by esbuild production bundle to `main.js`.

## Vault Location and Runtime Artifact

The runtime plugin in the `Test` vault at:
`C:\Users\scott\obsidian\Test\.obsidian\plugins\obsidian-multi-tab`
is symlinked directly to this repository. Running `npm run build` writes `main.js` directly into the vault plugin directory.
