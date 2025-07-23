import { AddPropModal } from '../src/AddPropModal';
import { MockApp } from './obsidian-mocks';

describe('AddPropModal', () => {
    let app: MockApp;

    beforeEach(() => {
        app = new MockApp();
    });

    it('should open the modal and have two text inputs and an add button', () => {
        const modal = new AddPropModal(app as any, () => {});
        modal.onOpen();

        expect(modal.contentEl.textContent).toContain('Add Property to Selected Tabs');
        const textInputs = modal.contentEl.querySelectorAll('input[type="text"]');
        const addButton = modal.contentEl.querySelector('button');

        expect(textInputs.length).toBe(2);
        expect(addButton).not.toBeNull();
        expect(addButton?.textContent).toBe('Add');
    });

    it('should call the onSubmit callback with the property name and value when the add button is clicked', () => {
        const onSubmit = jest.fn();
        const modal = new AddPropModal(app as any, onSubmit);
        modal.onOpen();

        const textInputs = modal.contentEl.querySelectorAll('input[type="text"]');
        const addButton = modal.contentEl.querySelector('button');

        if (textInputs.length === 2 && addButton) {
            const nameInput = textInputs[0];
            const valueInput = textInputs[1];

            nameInput.value = 'new-prop';
            nameInput.dispatchEvent(new Event('change'));

            valueInput.value = 'new-value';
            valueInput.dispatchEvent(new Event('change'));

            addButton.click();
        }

        expect(onSubmit).toHaveBeenCalledWith('new-prop', 'new-value');
    });
});
