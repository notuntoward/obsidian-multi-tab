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
            await plugin.addPropertyToTabs([leaf1, leaf2], 'new-prop', 'new-value');
            expect(file1.frontmatter['new-prop']).toBe('new-value');
            expect(file2.frontmatter['new-prop']).toBe('new-value');
        });

        it('should remove a property from tabs', async () => {
            file1.frontmatter['prop-to-remove'] = 'value';
            file2.frontmatter['prop-to-remove'] = 'value';

            await plugin.removePropertyFromTabs([leaf1, leaf2], 'prop-to-remove');
            expect(file1.frontmatter['prop-to-remove']).toBeUndefined();
            expect(file2.frontmatter['prop-to-remove']).toBeUndefined();
        });

        it('should add a tag to tabs', async () => {
            await plugin.addTagToTabs([leaf1, leaf2], 'new-tag');
            expect(file1.frontmatter.tags).toContain('new-tag');
            expect(file2.frontmatter.tags).toContain('new-tag');
        });

        it('should remove a tag from tabs', async () => {
            file1.frontmatter.tags = ['tag-to-remove'];
            file2.frontmatter.tags = ['tag-to-remove'];

            await plugin.removeTagFromTabs([leaf1, leaf2], 'tag-to-remove');
            expect(file1.frontmatter.tags).not.toContain('tag-to-remove');
            expect(file2.frontmatter.tags).not.toContain('tag-to-remove');
        });

        it('should rename a tag in tabs', async () => {
            file1.frontmatter.tags = ['old-tag'];
            file2.frontmatter.tags = ['old-tag'];

            await plugin.renameTagInTabs([leaf1, leaf2], 'old-tag', 'new-tag');
            expect(file1.frontmatter.tags).not.toContain('old-tag');
            expect(file1.frontmatter.tags).toContain('new-tag');
            expect(file2.frontmatter.tags).not.toContain('old-tag');
            expect(file2.frontmatter.tags).toContain('new-tag');
        });
    });
});
