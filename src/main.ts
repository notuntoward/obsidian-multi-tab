import { Plugin, WorkspaceLeaf, TFile, Editor, MarkdownView } from 'obsidian';
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

        this.addCommand({
            id: 'add-property-to-all-tabs-in-window',
            name: 'Add Property to All Tabs in Window',
            callback: () => {
                new AddPropModal(this.app, (name, value) => {
                    const leaves = this.app.workspace.getLeavesOfType('markdown');
                    this.addPropertyToTabs(leaves, name, value);
                }).open();
            }
        });

        this.addCommand({
            id: 'remove-property-from-all-tabs-in-window',
            name: 'Remove Property from All Tabs in Window',
            callback: () => {
                new RemovePropModal(this.app, (name) => {
                    const leaves = this.app.workspace.getLeavesOfType('markdown');
                    this.removePropertyFromTabs(leaves, name);
                }).open();
            }
        });

        this.addCommand({
            id: 'add-tag-to-all-tabs-in-window',
            name: 'Add Tag to All Tabs in Window',
            callback: () => {
                new AddTagModal(this.app, (name) => {
                    const leaves = this.app.workspace.getLeavesOfType('markdown');
                    this.addTagToTabs(leaves, name);
                }).open();
            }
        });

        this.addCommand({
            id: 'remove-tag-from-all-tabs-in-window',
            name: 'Remove Tag from All Tabs in Window',
            callback: () => {
                new RemoveTagModal(this.app, (name) => {
                    const leaves = this.app.workspace.getLeavesOfType('markdown');
                    this.removeTagFromTabs(leaves, name);
                }).open();
            }
        });

        this.addCommand({
            id: 'rename-tag-in-all-tabs-in-window',
            name: 'Rename Tag in All Tabs in Window',
            callback: () => {
                new RenameTagModal(this.app, (oldName, newName) => {
                    const leaves = this.app.workspace.getLeavesOfType('markdown');
                    this.renameTagInTabs(leaves, oldName, newName);
                }).open();
            }
        });

        this.addCommand({
            id: 'add-property-to-all-tabs',
            name: 'Add Property to All open Tabs',
            callback: () => {
                new AddPropModal(this.app, (name, value) => {
                    const leaves = this.app.workspace.getLeavesOfType('markdown');
                    this.addPropertyToTabs(leaves, name, value);
                }).open();
            }
        });

        this.addCommand({
            id: 'remove-property-from-all-tabs',
            name: 'Remove Property from All open Tabs',
            callback: () => {
                new RemovePropModal(this.app, (name) => {
                    const leaves = this.app.workspace.getLeavesOfType('markdown');
                    this.removePropertyFromTabs(leaves, name);
                }).open();
            }
        });

        this.addCommand({
            id: 'add-tag-to-all-tabs',
            name: 'Add Tag to All open Tabs',
            callback: () => {
                new AddTagModal(this.app, (name) => {
                    const leaves = this.app.workspace.getLeavesOfType('markdown');
                    this.addTagToTabs(leaves, name);
                }).open();
            }
        });

        this.addCommand({
            id: 'remove-tag-from-all-tabs',
            name: 'Remove Tag from All open Tabs',
            callback: () => {
                new RemoveTagModal(this.app, (name) => {
                    const leaves = this.app.workspace.getLeavesOfType('markdown');
                    this.removeTagFromTabs(leaves, name);
                }).open();
            }
        });

        this.addCommand({
            id: 'rename-tag-in-all-tabs',
            name: 'Rename Tag in All open Tabs',
            callback: () => {
                new RenameTagModal(this.app, (oldName, newName) => {
                    const leaves = this.app.workspace.getLeavesOfType('markdown');
                    this.renameTagInTabs(leaves, oldName, newName);
                }).open();
            }
        });

        this.registerDomEvent(document, 'mousedown', (evt: MouseEvent) => {
            const target = evt.target as HTMLElement;
            const tabHeader = target.closest('.workspace-tab-header');

            if (tabHeader) {
                const leaf = this.getLeafFromHeader(tabHeader);
                if (leaf) {
                    this.handleTabSelection(leaf, evt.ctrlKey, evt.shiftKey);
                }
            }
        });

        this.registerDomEvent(document, 'dragstart', (evt: DragEvent) => {
            const target = evt.target as HTMLElement;
            const tabHeader = target.closest('.workspace-tab-header');

            if (tabHeader && this.selectedTabs.size > 0) {
                const leaf = this.getLeafFromHeader(tabHeader);
                if (leaf && this.selectedTabs.has(leaf)) {
                    const filePaths = this.getSelectedFilePaths();
                    evt.dataTransfer?.setData('text/plain', JSON.stringify(filePaths));
                    console.log('drag started with files:', filePaths);
                }
            }
        });

        this.registerDomEvent(document, 'drop', (evt: DragEvent) => {
            const target = evt.target as HTMLElement;
            if (target.tagName === 'BODY') {
                const filePaths = JSON.parse(evt.dataTransfer?.getData('text/plain') || '[]');
                if (filePaths.length > 0) {
                    const newWindow = this.app.workspace.openPopoutLeaf();
                    filePaths.forEach((path: string) => {
                        const file = this.app.vault.getAbstractFileByPath(path);
                        if (file instanceof TFile) {
                            newWindow.openFile(file);
                        }
                    });
                }
            }
        });
    }

    onunload() {
        console.log('unloading multi-tab plugin');
        this.clearSelection();
    }

    getLeafFromHeader(header: Element): WorkspaceLeaf | null {
        const leafId = header.getAttribute('data-leaf-id');
        if (leafId) {
            return this.app.workspace.getLeafById(leafId);
        }
        return null;
    }

    handleTabSelection(leaf: WorkspaceLeaf, ctrlKey: boolean, shiftKey: boolean) {
        if (shiftKey && this.lastActiveTab) {
            this.handleShiftClick(leaf);
        } else if (ctrlKey) {
            if (this.selectedTabs.has(leaf)) {
                this.deselectTab(leaf);
            } else {
                this.selectTab(leaf);
                this.lastActiveTab = leaf;
            }
        } else {
            this.clearSelection();
            this.selectTab(leaf);
            this.lastActiveTab = leaf;
        }
    }

    handleShiftClick(leaf: WorkspaceLeaf) {
        if (!this.lastActiveTab || this.lastActiveTab.parent !== leaf.parent) {
            this.clearSelection();
            this.selectTab(leaf);
            this.lastActiveTab = leaf;
            return;
        }

        const parent = leaf.parent;
        if (!parent || !('children' in parent)) {
            return;
        }
        const children = (parent as any).children as WorkspaceLeaf[];
        const lastActiveIndex = children.indexOf(this.lastActiveTab);
        const currentIndex = children.indexOf(leaf);

        if (lastActiveIndex === -1 || currentIndex === -1) {
            return;
        }

        const start = Math.min(lastActiveIndex, currentIndex);
        const end = Math.max(lastActiveIndex, currentIndex);

        this.clearSelection();
        for (let i = start; i <= end; i++) {
            this.selectTab(children[i]);
        }
    }

    selectTab(leaf: WorkspaceLeaf) {
        this.selectedTabs.add(leaf);
        const tabHeader = leaf.view.containerEl.closest('.workspace-tab-header');
        if (tabHeader) {
            tabHeader.addClass('is-selected');
            tabHeader.setAttribute('draggable', 'true');
        }
        console.log('selected tabs:', this.selectedTabs);
    }

    deselectTab(leaf: WorkspaceLeaf) {
        this.selectedTabs.delete(leaf);
        const tabHeader = leaf.view.containerEl.closest('.workspace-tab-header');
        if (tabHeader) {
            tabHeader.removeClass('is-selected');
            tabHeader.removeAttribute('draggable');
        }
        console.log('selected tabs:', this.selectedTabs);
    }

    clearSelection() {
        this.selectedTabs.forEach(leaf => {
            const tabHeader = leaf.view.containerEl.closest('.workspace-tab-header');
            if (tabHeader) {
                tabHeader.removeClass('is-selected');
                tabHeader.removeAttribute('draggable');
            }
        });
        this.selectedTabs.clear();
        console.log('selection cleared');
    }

    getSelectedFilePaths(): string[] {
        const filePaths: string[] = [];
        this.selectedTabs.forEach(leaf => {
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
                        if (!frontmatter.tags) {
                            frontmatter.tags = [];
                        }
                        if (!frontmatter.tags.includes(tag)) {
                            frontmatter.tags.push(tag);
                        }
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
                        if (frontmatter.tags && frontmatter.tags.includes(tag)) {
                            frontmatter.tags.remove(tag);
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
                        if (frontmatter.tags && frontmatter.tags.includes(oldTag)) {
                            const index = frontmatter.tags.indexOf(oldTag);
                            frontmatter.tags[index] = newTag;
                        }
                    });
                }
            }
        }
    }
}
