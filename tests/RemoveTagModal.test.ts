import { RemoveTagModal } from '../src/RemoveTagModal';
import { MockApp } from './obsidian-mocks';

describe('RemoveTagModal', () => {
    let app: MockApp;

    beforeEach(() => {
        app = new MockApp();
    });

    it('should open the modal and have a text input and a remove button', () => {
        const modal = new RemoveTagModal(app as any, () => {});
        modal.onOpen();

        expect(modal.contentEl.textContent).toContain('Remove Tag from Selected Tabs');
        const textInput = modal.contentEl.querySelector('input[type="text"]');
        const removeButton = modal.contentEl.querySelector('button');

        expect(textInput).not.toBeNull();
        expect(removeButton).not.toBeNull();
        expect(removeButton?.textContent).toBe('Remove');
    });

    it('should call the onSubmit callback with the tag name when the remove button is clicked', () => {
        const onSubmit = jest.fn();
        const modal = new RemoveTagModal(app as any, onSubmit);
        modal.onOpen();

        const textInput = modal.contentEl.querySelector('input[type="text"]');
        const removeButton = modal.contentEl.querySelector('button');

        if (textInput && removeButton) {
            (textInput as HTMLInputElement).value = 'tag-to-remove';
            textInput.dispatchEvent(new Event('change'));
            removeButton.click();
        }

        expect(onSubmit).toHaveBeenCalledWith('tag-to-remove');
    });
});
