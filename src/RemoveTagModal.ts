import { App, Modal, Setting } from 'obsidian';
import { applyModalAppearance } from 'commons/modal';

export class RemoveTagModal extends Modal {
    tagName: string;
    onSubmit: (name: string) => void;

    constructor(app: App, onSubmit: (name: string) => void) {
        super(app);
        this.onSubmit = onSubmit;
    }

    onOpen() {
        const { contentEl } = this;
        this.titleEl.setText('Remove Tag from Selected Tabs');
        applyModalAppearance(this, { size: 'compact' });

        new Setting(contentEl)
            .setName('Tag Name')
            .addText(text =>
                text.onChange(value => {
                    this.tagName = value;
                }));

        new Setting(contentEl)
            .addButton(btn =>
                btn
                    .setButtonText('Remove')
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
