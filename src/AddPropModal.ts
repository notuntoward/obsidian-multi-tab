import { App, Modal, Setting } from 'obsidian';
import { applyModalAppearance } from 'commons/modal';

export class AddPropModal extends Modal {
    propertyName: string;
    propertyValue: string;
    onSubmit: (name: string, value: string) => void;

    constructor(app: App, onSubmit: (name: string, value: string) => void) {
        super(app);
        this.onSubmit = onSubmit;
    }

    onOpen() {
        const { contentEl } = this;
        this.titleEl.setText('Add Property to Selected Tabs');
        applyModalAppearance(this, { size: 'compact' });

        new Setting(contentEl)
            .setName('Property Name')
            .addText(text =>
                text.onChange(value => {
                    this.propertyName = value;
                }));

        new Setting(contentEl)
            .setName('Property Value')
            .addText(text =>
                text.onChange(value => {
                    this.propertyValue = value;
                }));

        new Setting(contentEl)
            .addButton(btn =>
                btn
                    .setButtonText('Add')
                    .setCta()
                    .onClick(() => {
                        this.close();
                        this.onSubmit(this.propertyName, this.propertyValue);
                    }));
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}
