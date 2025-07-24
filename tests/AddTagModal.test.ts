import { AddTagModal } from '../src/AddTagModal';
import { MockApp } from './obsidian-mocks';

describe('AddTagModal', () => {
    let app: MockApp;

    beforeEach(() => {
        app = new MockApp();
    });

    it('should open the modal and have a text input and an add button', () => {
        const modal = new AddTagModal(app as any, () => {});
        modal.onOpen();

        expect(modal.contentEl.textContent).toContain('Add Tag to Selected Tabs');
        const textInput = modal.contentEl.querySelector('input[type="text"]');
        const addButton = modal.contentEl.querySelector('button');

        expect(textInput).not.toBeNull();
        expect(addButton).not.toBeNull();
        expect(addButton?.textContent).toBe('Add');
    });

    it('should call the onSubmit callback with the tag name when the add button is clicked', () => {
        const onSubmit = jest.fn();
        const modal = new AddTagModal(app as any, onSubmit);
        modal.onOpen();

        const textInput = modal.contentEl.querySelector('input[type="text"]');
        const addButton = modal.contentEl.querySelector('button');

        if (textInput && addButton) {
            (textInput as HTMLInputElement).value = 'new-tag';
            textInput.dispatchEvent(new Event('change'));
            addButton.click();
        }

        expect(onSubmit).toHaveBeenCalledWith('new-tag');
    });
});
