export interface ModalConfig {
    title: string;
    description: string;
    proceedText?: string;
    cancelText?: string;
    onProceed?: () => void;
    onCancel?: () => void;
  }