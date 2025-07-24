import { RenameTagModal } from '../src/RenameTagModal';
import { MockApp } from './obsidian-mocks';

describe('RenameTagModal', () => {
    let app: MockApp;

    beforeEach(() => {
        app = new MockApp();
    });

    it('should open the modal and have two text inputs and a rename button', () => {
        const modal = new RenameTagModal(app as any, () => {});
        modal.onOpen();

        expect(modal.contentEl.textContent).toContain('Rename Tag in Selected Tabs');
        const textInputs = modal.contentEl.querySelectorAll('input[type="text"]');
        const renameButton = modal.contentEl.querySelector('button');

        expect(textInputs.length).toBe(2);
        expect(renameButton).not.toBeNull();
        expect(renameButton?.textContent).toBe('Rename');
    });

    it('should call the onSubmit callback with the old and new tag names when the rename button is clicked', () => {
        const onSubmit = jest.fn();
        const modal = new RenameTagModal(app as any, onSubmit);
        modal.onOpen();

        const textInputs = modal.contentEl.querySelectorAll('input[type="text"]');
        const renameButton = modal.contentEl.querySelector('button');

        if (textInputs.length === 2 && renameButton) {
            const oldNameInput = textInputs[0] as HTMLInputElement;
            const newNameInput = textInputs[1] as HTMLInputElement;

            oldNameInput.value = 'old-tag';
            oldNameInput.dispatchEvent(new Event('change'));

            newNameInput.value = 'new-tag';
            newNameInput.dispatchEvent(new Event('change'));

            renameButton.click();
        }

        expect(onSubmit).toHaveBeenCalledWith('old-tag', 'new-tag');
    });
});
