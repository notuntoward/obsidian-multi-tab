import { App, Modal, Setting } from 'obsidian';

export class AddTagModal extends Modal {
    tagName: string;
    onSubmit: (name: string) => void;

    constructor(app: App, onSubmit: (name: string) => void) {
        super(app);
        this.onSubmit = onSubmit;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.setText('Add Tag to Selected Tabs');

        new Setting(contentEl)
            .setName('Tag Name')
            .addText(text =>
                text.onChange(value => {
                    this.tagName = value;
                }));

        new Setting(contentEl)
            .addButton(btn =>
                btn
                    .setButtonText('Add')
                    .setCta()
                    .onClick(() => {
                        this.close();
                        this.onSubmit(this.tagName);
                    }));
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}
