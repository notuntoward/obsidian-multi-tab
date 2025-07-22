import { App, Modal, Setting } from 'obsidian';

export class RenameTagModal extends Modal {
    oldTagName: string;
    newTagName: string;
    onSubmit: (oldName: string, newName: string) => void;

    constructor(app: App, onSubmit: (oldName: string, newName: string) => void) {
        super(app);
        this.onSubmit = onSubmit;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.setText('Rename Tag in Selected Tabs');

        new Setting(contentEl)
            .setName('Old Tag Name')
            .addText(text =>
                text.onChange(value => {
                    this.oldTagName = value;
                }));

        new Setting(contentEl)
            .setName('New Tag Name')
            .addText(text =>
                text.onChange(value => {
                    this.newTagName = value;
                }));

        new Setting(contentEl)
            .addButton(btn =>
                btn
                    .setButtonText('Rename')
                    .setCta()
                    .onClick(() => {
                        this.close();
                        this.onSubmit(this.oldTagName, this.newTagName);
                    }));
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}
