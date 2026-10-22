import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import MultiTabPlugin from '../src/main';
import { MockApp, MockWorkspace, MockWorkspaceLeaf } from './obsidian-mocks';
import { TFile } from 'obsidian';

describe('MultiTabPlugin', () => {
    let plugin: MultiTabPlugin;
    let app: MockApp;

    beforeEach(() => {
        app = new MockApp();
        plugin = new MultiTabPlugin(app as any, { name: 'multi-tab', version: '0.1.0' } as any);
        plugin.onload();
    });

    afterEach(() => {
        plugin.onunload();
    });

    it('should load and register all commands', () => {
        expect(app.commands.length).toBe(15);
    });

    describe('Property and Tag Manipulation', () => {
        let leaf1: MockWorkspaceLeaf;
        let leaf2: MockWorkspaceLeaf;
        let file1: TFile;
        let file2: TFile;

        beforeEach(async () => {
            file1 = { path: 'file1.md', name: 'file1.md', frontmatter: {} } as TFile;
            file2 = { path: 'file2.md', name: 'file2.md', frontmatter: {} } as TFile;

            await app.vault.create('file1.md', '');
            await app.vault.create('file2.md', '');

            leaf1 = new MockWorkspaceLeaf('leaf1', file1, app);
            leaf2 = new MockWorkspaceLeaf('leaf2', file2, app);

            app.workspace.addLeaf(leaf1);
            app.workspace.addLeaf(leaf2);
        });

        it('should add a property to tabs', async () => {
            await plugin.addPropertyToTabs([leaf1, leaf2] as any, 'new-prop', 'new-value');
            expect(file1.frontmatter['new-prop']).toBe('new-value');
            expect(file2.frontmatter['new-prop']).toBe('new-value');
        });

        it('should remove a property from tabs', async () => {
            file1.frontmatter['prop-to-remove'] = 'value';
            file2.frontmatter['prop-to-remove'] = 'value';

            await plugin.removePropertyFromTabs([leaf1, leaf2] as any, 'prop-to-remove');
            expect(file1.frontmatter['prop-to-remove']).toBeUndefined();
            expect(file2.frontmatter['prop-to-remove']).toBeUndefined();
        });

        it('should add a tag to tabs', async () => {
            await plugin.addTagToTabs([leaf1, leaf2] as any, 'new-tag');
            expect(file1.frontmatter.tags).toContain('new-tag');
            expect(file2.frontmatter.tags).toContain('new-tag');
        });

        it('should remove a tag from tabs', async () => {
            file1.frontmatter.tags = ['tag-to-remove'];
            file2.frontmatter.tags = ['tag-to-remove'];

            await plugin.removeTagFromTabs([leaf1, leaf2] as any, 'tag-to-remove');
            expect(file1.frontmatter.tags).not.toContain('tag-to-remove');
            expect(file2.frontmatter.tags).not.toContain('tag-to-remove');
        });

        it('should rename a tag in tabs', async () => {
            file1.frontmatter.tags = ['old-tag'];
            file2.frontmatter.tags = ['old-tag'];

            await plugin.renameTagInTabs([leaf1, leaf2] as any, 'old-tag', 'new-tag');
            expect(file1.frontmatter.tags).not.toContain('old-tag');
            expect(file1.frontmatter.tags).toContain('new-tag');
            expect(file2.frontmatter.tags).not.toContain('old-tag');
            expect(file2.frontmatter.tags).toContain('new-tag');
        });
    });

    describe('Tab Selection and Modifiers', () => {
        let leaf1: MockWorkspaceLeaf;
        let leaf2: MockWorkspaceLeaf;
        let leaf3: MockWorkspaceLeaf;

        beforeEach(() => {
            leaf1 = new MockWorkspaceLeaf('leaf1', { path: 'file1.md' }, app);
            leaf2 = new MockWorkspaceLeaf('leaf2', { path: 'file2.md' }, app);
            leaf3 = new MockWorkspaceLeaf('leaf3', { path: 'file3.md' }, app);
            const parent = { children: [leaf1, leaf2, leaf3] };
            leaf1.parent = parent;
            leaf2.parent = parent;
            leaf3.parent = parent;
            app.workspace.addLeaf(leaf1);
            app.workspace.addLeaf(leaf2);
            app.workspace.addLeaf(leaf3);
        });

        it('should mark leaf.tabHeaderEl when selecting a tab', () => {
            plugin.selectTab(leaf1 as any);
            expect(plugin.selectedTabs.has(leaf1 as any)).toBe(true);
            expect(leaf1.tabHeaderEl.classList.contains('is-selected')).toBe(true);
            expect(leaf1.tabHeaderEl.getAttribute('draggable')).toBe('true');
        });

        it('should unmark leaf.tabHeaderEl when deselecting a tab', () => {
            plugin.selectTab(leaf1 as any);
            expect(leaf1.tabHeaderEl.classList.contains('is-selected')).toBe(true);
            plugin.deselectTab(leaf1 as any);
            expect(plugin.selectedTabs.has(leaf1 as any)).toBe(false);
            expect(leaf1.tabHeaderEl.classList.contains('is-selected')).toBe(false);
            expect(leaf1.tabHeaderEl.getAttribute('draggable')).toBeNull();
        });

        it('should support Meta key (Mac) in handleTabSelection', () => {
            plugin.handleTabSelection(leaf1 as any, { metaKey: true, ctrlKey: false, shiftKey: false } as any);
            expect(plugin.selectedTabs.has(leaf1 as any)).toBe(true);
            plugin.handleTabSelection(leaf2 as any, { metaKey: true, ctrlKey: false, shiftKey: false } as any);
            expect(plugin.selectedTabs.has(leaf1 as any)).toBe(true);
            expect(plugin.selectedTabs.has(leaf2 as any)).toBe(true);
        });

        it('should handle shift-select across sibling leaves in group', () => {
            plugin.selectTab(leaf1 as any);
            plugin.handleTabSelection(leaf3 as any, { metaKey: false, ctrlKey: false, shiftKey: true } as any);
            expect(plugin.selectedTabs.has(leaf1 as any)).toBe(true);
            expect(plugin.selectedTabs.has(leaf2 as any)).toBe(true);
            expect(plugin.selectedTabs.has(leaf3 as any)).toBe(true);
        });
    });

    describe('Drop Handling', () => {
        it('should silently ignore drop with null or missing dataTransfer', async () => {
            await expect(plugin.handleDrop({ dataTransfer: null } as any)).resolves.not.toThrow();
        });

        it('should silently ignore drop with invalid JSON', async () => {
            const evt = {
                dataTransfer: {
                    getData: () => 'invalid JSON {{{',
                },
            };
            await expect(plugin.handleDrop(evt as any)).resolves.not.toThrow();
        });

        it('should safely open files when drop data is valid JSON array', async () => {
            const openedFiles: string[] = [];
            const mockLeaf = {
                openFile: vi.fn().mockImplementation((f: any) => {
                    openedFiles.push(f.path);
                    return Promise.resolve();
                }),
                parent: { children: [] },
            };
            (app.workspace as any).getLeaf = vi.fn().mockReturnValue(mockLeaf);
            (app.workspace as any).createLeafInParent = vi.fn().mockReturnValue(mockLeaf);
            await app.vault.create('note-a.md', '');
            await app.vault.create('note-b.md', '');

            const evt = {
                dataTransfer: {
                    getData: () => JSON.stringify(['note-a.md', 'note-b.md']),
                },
            };
            await plugin.handleDrop(evt as any);
            expect(openedFiles).toEqual(['note-a.md', 'note-b.md']);
        });
    });

    describe('Window Tabs and Workspace Leaves', () => {
        it('getTabsInCurrentWindow falls back to all open markdown leaves when no window is active', () => {
            const leaf = new MockWorkspaceLeaf('leaf1', { path: 'file1.md' }, app);
            app.workspace.addLeaf(leaf);
            const tabs = plugin.getTabsInCurrentWindow();
            expect(tabs.length).toBe(1);
            expect(tabs[0]).toBe(leaf);
        });
    });
});
