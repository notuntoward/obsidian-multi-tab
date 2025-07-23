import { RemovePropModal } from '../src/RemovePropModal';
import { MockApp } from './obsidian-mocks';

describe('RemovePropModal', () => {
    let app: MockApp;

    beforeEach(() => {
        app = new MockApp();
    });

    it('should open the modal and have a text input and a remove button', () => {
        const modal = new RemovePropModal(app as any, () => {});
        modal.onOpen();

        expect(modal.contentEl.textContent).toContain('Remove Property from Selected Tabs');
        const textInput = modal.contentEl.querySelector('input[type="text"]');
        const removeButton = modal.contentEl.querySelector('button');

        expect(textInput).not.toBeNull();
        expect(removeButton).not.toBeNull();
        expect(removeButton?.textContent).toBe('Remove');
    });

    it('should call the onSubmit callback with the property name when the remove button is clicked', () => {
        const onSubmit = jest.fn();
        const modal = new RemovePropModal(app as any, onSubmit);
        modal.onOpen();

        const textInput = modal.contentEl.querySelector('input[type="text"]');
        const removeButton = modal.contentEl.querySelector('button');

        if (textInput && removeButton) {
            textInput.value = 'prop-to-remove';
            textInput.dispatchEvent(new Event('change'));
            removeButton.click();
        }

        expect(onSubmit).toHaveBeenCalledWith('prop-to-remove');
    });
});
