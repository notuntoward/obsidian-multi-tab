import {
    Plugin,
    WorkspaceLeaf,
    TFile,
    MarkdownView,
    Keymap,
} from 'obsidian';
import {
    forEachWindow,
} from 'commons/windows';
import {
    getTabHeaderEl,
    getGroupChildren,
    getLeafId,
    getEditorLeafLocations,
    getActiveLeafInFocusedWindow,
    getWindowForLeaf,
    buildNavigationModel,
    getTabsInWindow,
} from 'commons/workspace';
import { AddPropModal } from './AddPropModal';
import { RemovePropModal } from './RemovePropModal';
import { AddTagModal } from './AddTagModal';
import { RemoveTagModal } from './RemoveTagModal';
import { RenameTagModal } from './RenameTagModal';

export default class MultiTabPlugin extends Plugin {
    selectedTabs: Set<WorkspaceLeaf> = new Set();
    lastActiveTab: WorkspaceLeaf | null = null;

    async onload() {
        console.log('loading multi-tab plugin');

        this.addCommand({
            id: 'add-property-to-selected-tabs',
            name: 'Add Property to Selected Tabs',
            callback: () => {
                new AddPropModal(this.app, (name, value) => {
                    this.addPropertyToTabs(this.selectedTabs, name, value);
                }).open();
            }
        });

        this.addCommand({
            id: 'remove-property-from-selected-tabs',
            name: 'Remove Property from Selected Tabs',
            callback: () => {
                new RemovePropModal(this.app, (name) => {
                    this.removePropertyFromTabs(this.selectedTabs, name);
                }).open();
            }
        });

        this.addCommand({
            id: 'add-tag-to-selected-tabs',
            name: 'Add Tag to Selected Tabs',
            callback: () => {
                new AddTagModal(this.app, (name) => {
                    this.addTagToTabs(this.selectedTabs, name);
                }).open();
            }
        });

        this.addCommand({
            id: 'remove-tag-from-selected-tabs',
            name: 'Remove Tag from Selected Tabs',
            callback: () => {
                new RemoveTagModal(this.app, (name) => {
                    this.removeTagFromTabs(this.selectedTabs, name);
                }).open();
            }
        });

        this.addCommand({
            id: 'rename-tag-in-selected-tabs',
            name: 'Rename Tag in Selected Tabs',
            callback: () => {
                new RenameTagModal(this.app, (oldName, newName) => {
                    this.renameTagInTabs(this.selectedTabs, oldName, newName);
                }).open();
            }
        });

        // "All Tabs in Window" commands (scoped to current window via commons)
        this.addCommand({
            id: 'add-property-to-all-tabs-in-window',
            name: 'Add Property to All Tabs in Window',
            callback: () => {
                new AddPropModal(this.app, (name, value) => {
                    this.addPropertyToTabs(this.getTabsInCurrentWindow(), name, value);
                }).open();
            }
        });

        this.addCommand({
            id: 'remove-property-from-all-tabs-in-window',
            name: 'Remove Property from All Tabs in Window',
            callback: () => {
                new RemovePropModal(this.app, (name) => {
                    this.removePropertyFromTabs(this.getTabsInCurrentWindow(), name);
                }).open();
            }
        });

        this.addCommand({
            id: 'add-tag-to-all-tabs-in-window',
            name: 'Add Tag to All Tabs in Window',
            callback: () => {
                new AddTagModal(this.app, (name) => {
                    this.addTagToTabs(this.getTabsInCurrentWindow(), name);
                }).open();
            }
        });

        this.addCommand({
            id: 'remove-tag-from-all-tabs-in-window',
            name: 'Remove Tag from All Tabs in Window',
            callback: () => {
                new RemoveTagModal(this.app, (name) => {
                    this.removeTagFromTabs(this.getTabsInCurrentWindow(), name);
                }).open();
            }
        });

        this.addCommand({
            id: 'rename-tag-in-all-tabs-in-window',
            name: 'Rename Tag in All Tabs in Window',
            callback: () => {
                new RenameTagModal(this.app, (oldName, newName) => {
                    this.renameTagInTabs(this.getTabsInCurrentWindow(), oldName, newName);
                }).open();
            }
        });

        // "All Tabs across Workspace" commands
        this.addCommand({
            id: 'add-property-to-all-tabs',
            name: 'Add Property to All open Tabs',
            callback: () => {
                new AddPropModal(this.app, (name, value) => {
                    this.addPropertyToTabs(this.getAllOpenMarkdownLeaves(), name, value);
                }).open();
            }
        });

        this.addCommand({
            id: 'remove-property-from-all-tabs',
            name: 'Remove Property from All open Tabs',
            callback: () => {
                new RemovePropModal(this.app, (name) => {
                    this.removePropertyFromTabs(this.getAllOpenMarkdownLeaves(), name);
                }).open();
            }
        });

        this.addCommand({
            id: 'add-tag-to-all-tabs',
            name: 'Add Tag to All open Tabs',
            callback: () => {
                new AddTagModal(this.app, (name) => {
                    this.addTagToTabs(this.getAllOpenMarkdownLeaves(), name);
                }).open();
            }
        });

        this.addCommand({
            id: 'remove-tag-from-all-tabs',
            name: 'Remove Tag from All open Tabs',
            callback: () => {
                new RemoveTagModal(this.app, (name) => {
                    this.removeTagFromTabs(this.getAllOpenMarkdownLeaves(), name);
                }).open();
            }
        });

        this.addCommand({
            id: 'rename-tag-in-all-tabs',
            name: 'Rename Tag in All open Tabs',
            callback: () => {
                new RenameTagModal(this.app, (oldName, newName) => {
                    this.renameTagInTabs(this.getAllOpenMarkdownLeaves(), oldName, newName);
                }).open();
            }
        });

        forEachWindow(this, (win) => {
            const doc = win?.document;
            if (!doc) return;

            const onMouseDown = (evt: MouseEvent) => {
                const target = evt.target as HTMLElement | null;
                const tabHeader = target?.closest?.('.workspace-tab-header');
                if (tabHeader) {
                    const leaf = this.getLeafFromHeader(tabHeader);
                    if (leaf) {
                        this.handleTabSelection(leaf, evt);
                    }
                }
            };

            const onDragStart = (evt: DragEvent) => {
                const target = evt.target as HTMLElement | null;
                const tabHeader = target?.closest?.('.workspace-tab-header');
                if (tabHeader && this.selectedTabs.size > 0) {
                    const leaf = this.getLeafFromHeader(tabHeader);
                    if (leaf && this.selectedTabs.has(leaf)) {
                        const filePaths = this.getSelectedFilePaths();
                        evt.dataTransfer?.setData('text/plain', JSON.stringify(filePaths));
                        console.log('drag started with files:', filePaths);
                    }
                }
            };

            const onDrop = (evt: DragEvent) => {
                this.handleDrop(evt);
            };

            doc.addEventListener('mousedown', onMouseDown);
            doc.addEventListener('dragstart', onDragStart);
            doc.addEventListener('drop', onDrop);

            return () => {
                doc.removeEventListener('mousedown', onMouseDown);
                doc.removeEventListener('dragstart', onDragStart);
                doc.removeEventListener('drop', onDrop);
            };
        });
    }

    onunload() {
        console.log('unloading multi-tab plugin');
        this.clearSelection();
    }

    getLeafFromHeader(header: Element): WorkspaceLeaf | null {
        const leafId = header.getAttribute('data-leaf-id');
        if (leafId && typeof (this.app.workspace as any).getLeafById === 'function') {
            const leaf = (this.app.workspace as any).getLeafById(leafId);
            if (leaf) return leaf;
        }
        for (const loc of getEditorLeafLocations(this.app)) {
            if (loc.leaf) {
                if (getTabHeaderEl(loc.leaf) === header || (leafId && getLeafId(loc.leaf) === leafId)) {
                    return loc.leaf;
                }
            }
        }
        return null;
    }

    handleTabSelection(leaf: WorkspaceLeaf, evt: MouseEvent): void;
    handleTabSelection(leaf: WorkspaceLeaf, isMod: boolean, isShift?: boolean): void;
    handleTabSelection(leaf: WorkspaceLeaf, modKeyOrEvent: boolean | MouseEvent, shiftKey = false): void {
        let isMod = false;
        let isShift = false;

        if (typeof modKeyOrEvent === 'boolean') {
            isMod = modKeyOrEvent;
            isShift = shiftKey;
        } else if (modKeyOrEvent && typeof modKeyOrEvent === 'object') {
            isMod = Keymap.isModifier(modKeyOrEvent, 'Mod') || Boolean(modKeyOrEvent.ctrlKey || modKeyOrEvent.metaKey);
            isShift = Boolean(modKeyOrEvent.shiftKey);
        }

        if (isShift && this.lastActiveTab) {
            this.handleShiftSelect(leaf);
        } else if (isMod) {
            this.toggleTabSelection(leaf);
        } else {
            this.clearSelection();
            this.selectTab(leaf);
        }
    }

    handleShiftSelect(leaf: WorkspaceLeaf) {
        if (!this.lastActiveTab) {
            this.selectTab(leaf);
            return;
        }

        const parent = (leaf as any).parent;
        const lastParent = (this.lastActiveTab as any).parent;
        if (!parent || parent !== lastParent) {
            this.selectTab(leaf);
            return;
        }

        const children = getGroupChildren(parent);
        if (!children) {
            this.selectTab(leaf);
            return;
        }

        const startIndex = children.indexOf(this.lastActiveTab);
        const endIndex = children.indexOf(leaf);

        if (startIndex === -1 || endIndex === -1) {
            this.selectTab(leaf);
            return;
        }

        const [min, max] = [Math.min(startIndex, endIndex), Math.max(startIndex, endIndex)];
        for (let i = min; i <= max; i++) {
            const childLeaf = children[i] as WorkspaceLeaf;
            if (childLeaf) {
                this.selectTab(childLeaf);
            }
        }
    }

    selectTab(leaf: WorkspaceLeaf) {
        this.selectedTabs.add(leaf);
        this.lastActiveTab = leaf;
        const tabHeader = getTabHeaderEl(leaf);
        if (tabHeader) {
            tabHeader.classList.add('is-selected');
            tabHeader.setAttribute('draggable', 'true');
        }
        console.log('selected tabs:', this.selectedTabs);
    }

    deselectTab(leaf: WorkspaceLeaf) {
        this.selectedTabs.delete(leaf);
        const tabHeader = getTabHeaderEl(leaf);
        if (tabHeader) {
            tabHeader.classList.remove('is-selected');
            tabHeader.removeAttribute('draggable');
        }
        if (this.lastActiveTab === leaf) {
            this.lastActiveTab = null;
        }
        console.log('selected tabs:', this.selectedTabs);
    }

    toggleTabSelection(leaf: WorkspaceLeaf) {
        if (this.selectedTabs.has(leaf)) {
            this.deselectTab(leaf);
        } else {
            this.selectTab(leaf);
        }
    }

    clearSelection() {
        this.selectedTabs.forEach((leaf) => {
            const tabHeader = getTabHeaderEl(leaf);
            if (tabHeader) {
                tabHeader.classList.remove('is-selected');
                tabHeader.removeAttribute('draggable');
            }
        });
        this.selectedTabs.clear();
        this.lastActiveTab = null;
        console.log('selection cleared');
    }

    async handleDrop(evt: DragEvent) {
        const rawData = evt.dataTransfer?.getData('text/plain');
        if (!rawData) return;

        let filePaths: unknown;
        try {
            filePaths = JSON.parse(rawData);
        } catch {
            return;
        }

        if (!Array.isArray(filePaths) || filePaths.length === 0) return;

        console.log('drop event with files:', filePaths);

        let isFirst = true;
        let baseLeaf: any = null;

        for (const filePath of filePaths) {
            if (typeof filePath !== 'string') continue;
            const file = this.app.vault.getAbstractFileByPath(filePath);
            if (file instanceof TFile) {
                if (isFirst) {
                    baseLeaf = this.app.workspace.getLeaf('tab');
                    if (baseLeaf) {
                        await baseLeaf.openFile(file);
                        isFirst = false;
                    }
                } else if (baseLeaf && baseLeaf.parent && typeof (this.app.workspace as any).createLeafInParent === 'function') {
                    const leaf = (this.app.workspace as any).createLeafInParent(baseLeaf.parent, -1);
                    if (leaf) {
                        await leaf.openFile(file);
                    }
                } else {
                    const leaf = this.app.workspace.getLeaf('tab');
                    if (leaf) {
                        await leaf.openFile(file);
                    }
                }
            }
        }
    }

    getSelectedFilePaths(): string[] {
        const filePaths: string[] = [];
        this.selectedTabs.forEach((leaf) => {
            const viewState = leaf.getViewState();
            if (viewState.type === 'markdown' && viewState.state?.file && typeof viewState.state.file === 'string') {
                const file = this.app.vault.getAbstractFileByPath(viewState.state.file);
                if (file instanceof TFile) {
                    filePaths.push(file.path);
                }
            }
        });
        return filePaths;
    }

    getTabsInCurrentWindow(): WorkspaceLeaf[] {
        const activeLeaf = getActiveLeafInFocusedWindow(this.app);
        const win = activeLeaf ? getWindowForLeaf(activeLeaf) : undefined;
        if (win) {
            const model = buildNavigationModel(this.app, activeLeaf);
            return getTabsInWindow(model, win)
                .map((entry) => entry.leaf)
                .filter((leaf) => leaf.view instanceof MarkdownView || leaf.view?.getViewType?.() === 'markdown');
        }
        return this.getAllOpenMarkdownLeaves();
    }

    getAllOpenMarkdownLeaves(): WorkspaceLeaf[] {
        return this.app.workspace.getLeavesOfType('markdown');
    }

    async addPropertyToTabs(leaves: Iterable<WorkspaceLeaf>, name: string, value: string) {
        for (const leaf of leaves) {
            const view = leaf.view;
            if (view instanceof MarkdownView) {
                const file = view.file;
                if (file) {
                    await this.app.fileManager.processFrontMatter(file, (frontmatter) => {
                        frontmatter[name] = value;
                    });
                }
            }
        }
    }

    async removePropertyFromTabs(leaves: Iterable<WorkspaceLeaf>, name: string) {
        for (const leaf of leaves) {
            const view = leaf.view;
            if (view instanceof MarkdownView) {
                const file = view.file;
                if (file) {
                    await this.app.fileManager.processFrontMatter(file, (frontmatter) => {
                        delete frontmatter[name];
                    });
                }
            }
        }
    }

    async addTagToTabs(leaves: Iterable<WorkspaceLeaf>, tag: string) {
        for (const leaf of leaves) {
            const view = leaf.view;
            if (view instanceof MarkdownView) {
                const file = view.file;
                if (file) {
                    await this.app.fileManager.processFrontMatter(file, (frontmatter) => {
                        let tags = frontmatter.tags;
                        if (!tags) {
                            tags = [];
                        } else if (typeof tags === 'string') {
                            tags = [tags];
                        }
                        if (!tags.includes(tag)) {
                            tags.push(tag);
                        }
                        frontmatter.tags = tags;
                    });
                }
            }
        }
    }

    async removeTagFromTabs(leaves: Iterable<WorkspaceLeaf>, tag: string) {
        for (const leaf of leaves) {
            const view = leaf.view;
            if (view instanceof MarkdownView) {
                const file = view.file;
                if (file) {
                    await this.app.fileManager.processFrontMatter(file, (frontmatter) => {
                        const tags = frontmatter.tags;
                        if (Array.isArray(tags)) {
                            const index = tags.indexOf(tag);
                            if (index > -1) {
                                tags.splice(index, 1);
                                frontmatter.tags = tags;
                            }
                        } else if (typeof tags === 'string' && tags === tag) {
                            delete frontmatter.tags;
                        }
                    });
                }
            }
        }
    }

    async renameTagInTabs(leaves: Iterable<WorkspaceLeaf>, oldTag: string, newTag: string) {
        for (const leaf of leaves) {
            const view = leaf.view;
            if (view instanceof MarkdownView) {
                const file = view.file;
                if (file) {
                    await this.app.fileManager.processFrontMatter(file, (frontmatter) => {
                        const tags = frontmatter.tags;
                        if (Array.isArray(tags)) {
                            const index = tags.indexOf(oldTag);
                            if (index > -1) {
                                tags[index] = newTag;
                                frontmatter.tags = tags;
                            }
                        } else if (typeof tags === 'string' && tags === oldTag) {
                            frontmatter.tags = newTag;
                        }
                    });
                }
            }
        }
    }
}
