# Obsidian Multi-Tab Plugin

Multi-Tab allows you to select and perform batch actions on multiple tabs in Obsidian at once, streamlining your workflow when organizing large workspaces with many open notes.

## What's Working

### Tab Multi-Selection
- **Toggle Selection:** Hold `Ctrl+Click` (Windows/Linux) or `Cmd+Click` (macOS) on tab headers to add or remove individual tabs from your selection.
- **Range Selection:** `Shift+Click` on another tab header in the same tab group to select all sibling tabs in between.
- **Clear Selection:** Clicking any tab header without modifier keys selects only that tab and clears previous multi-selections.
- **Visual Highlighting:** Selected tab headers are highlighted using Obsidian's native selection styling.
- **Multi-Window Support:** Tab selection works seamlessly across the main Obsidian window and any detached popout windows.

### Batch Property Management
Run from the Command Palette (`Ctrl+P` or `Cmd+P`):
- **Add Property:** Adds or updates a frontmatter property (`name: value`) across:
  - Selected tabs
  - All tabs in the current window
  - All open tabs across the entire workspace
- **Remove Property:** Deletes a frontmatter property by name across:
  - Selected tabs
  - All tabs in the current window
  - All open tabs across the entire workspace

### Batch Tag Management
- **Add Tag:** Appends a tag to the frontmatter `tags` list (automatically avoiding duplicates) across:
  - Selected tabs
  - All tabs in the current window
  - All open tabs across the entire workspace
- **Remove Tag:** Removes a specific tag from frontmatter `tags` across:
  - Selected tabs
  - All tabs in the current window
  - All open tabs across the entire workspace
- **Rename Tag:** Replaces an existing tag with a new tag name across:
  - Selected tabs
  - All tabs in the current window
  - All open tabs across the entire workspace

### Multi-Tab Drag and Drop
- Dragging any selected tab header exports the file paths of all currently selected notes.
- Dropping the selection into an Obsidian workspace opens all selected notes in separate tabs sequentially.

---

## How to Use

1. **Select Tabs:** Use `Ctrl/Cmd+Click` on tab headers to select multiple notes, or `Shift+Click` to select a contiguous group of tabs.
2. **Open Command Palette:** Press `Ctrl+P` (or `Cmd+P` on macOS).
3. **Execute Command:** Search for `Multi Tab` or the action you want to run (e.g. *Add Tag to Selected Tabs*, *Remove Property from All Tabs in Window*).
4. **Enter Values:** Provide the property name/value or tag in the modal prompt and confirm.

---

## Planned Features (TODO)

The following features are planned for upcoming releases:

- **Bulk Tab Operations:**
  - Close all selected tabs simultaneously.
  - Pin or unpin all selected tabs.
  - Move or detach selected tabs together into a new tab group, split, or popout window.
  - Dedicated "Clear Selection" command palette entry and hotkey.
- **Tab Bar Reordering:**
  - Moving multiple selected tabs as a single group when dragging within the tab strip (Obsidian's native tab drag currently reorders only the single dragged tab header).
- **Tab Header Context Menu:**
  - Right-click context menu options on tab headers to quickly run batch operations without opening the Command Palette.
- **Settings & Appearance:**
  - Configurable selection highlight colors and indicator styles.
