import { App, Modal, Setting } from 'obsidian';

export class RemovePropModal extends Modal {
    propertyName: string;
    onSubmit: (name: string) => void;

    constructor(app: App, onSubmit: (name: string) => void) {
        super(app);
        this.onSubmit = onSubmit;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.setText('Remove Property from Selected Tabs');

        new Setting(contentEl)
            .setName('Property Name')
            .addText(text =>
                text.onChange(value => {
                    this.propertyName = value;
                }));

        new Setting(contentEl)
            .addButton(btn =>
                btn
                    .setButtonText('Remove')
                    .setCta()
                    .onClick(() => {
                        this.close();
                        this.onSubmit(this.propertyName);
                    }));
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}
