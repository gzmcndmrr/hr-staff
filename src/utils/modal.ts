import { ModalConfig } from '@/components/ui/modal/modal.type';
import { AppModal } from '@/components/ui/modal/app-modal';

export const showConfirmModal = (config: ModalConfig): Promise<boolean> => {
  return new Promise((resolve) => {
    customElements.whenDefined('app-modal').then(() => {
      const modal = document.createElement('app-modal') as AppModal;
      document.body.appendChild(modal);

      const handleProceed = () => {
        modal.removeEventListener('modal-proceed', handleProceed);
        modal.removeEventListener('modal-cancel', handleCancel);
        document.body.removeChild(modal);
        resolve(true);
      };

      const handleCancel = () => {
        modal.removeEventListener('modal-proceed', handleProceed);
        modal.removeEventListener('modal-cancel', handleCancel);
        document.body.removeChild(modal);
        resolve(false);
      };

      modal.addEventListener('modal-proceed', handleProceed);
      modal.addEventListener('modal-cancel', handleCancel);

      modal.show(config);
    });
  });
}; 