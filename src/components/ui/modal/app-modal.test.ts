import { it, expect, vi } from 'vitest';
import { AppModal } from '@/components/ui/modal/app-modal';
import { ModalConfig } from '@/components/ui/modal/modal.type';

it('should render modal with title and description when shown', () => {
  const modal = new AppModal();

  const config: ModalConfig = {
    title: 'Delete User',
    description: 'Are you sure you want to delete this user?',
    proceedText: 'Yes, Delete',
    cancelText: 'Cancel'
  };

  document.body.appendChild(modal);

  modal.show(config);

  const titleEl = modal.querySelector('h3');
  const descEl = modal.querySelector('p');
  const proceedBtn = modal.querySelector('.modal-proceed-btn') as HTMLButtonElement;
  const cancelBtn = modal.querySelector('.modal-cancel-btn') as HTMLButtonElement;

  expect(titleEl?.textContent).toBe('Delete User');
  expect(descEl?.textContent).toContain('Are you sure you want to delete this user?');
  expect(proceedBtn?.textContent?.trim()).toBe('Yes, Delete');
  expect(cancelBtn?.textContent?.trim()).toBe('Cancel');

  modal.remove();
});

it('should calls onProceed and onCancel callbacks from ModalConfig', async () => {
  const onProceed = vi.fn();
  const onCancel = vi.fn();

  const modalConfig: ModalConfig = {
    title: 'Confirm Action',
    description: 'Do you really want to proceed?',
    proceedText: 'Yes',
    cancelText: 'No',
    onProceed,
    onCancel
  };

  const modal = new AppModal();
  document.body.appendChild(modal);
  modal.show(modalConfig);

  const proceedBtn = modal.querySelector('.modal-proceed-btn')!;
  proceedBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));

  expect(onProceed).toHaveBeenCalledTimes(1);

  modal.show(modalConfig);
  const cancelBtn = modal.querySelector('.modal-cancel-btn')!;
  cancelBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));

  expect(onCancel).toHaveBeenCalledTimes(1);

  modal.remove();
});
