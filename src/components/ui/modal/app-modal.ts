import { ModalConfig } from "./modal.type";
import { X, createElement } from 'lucide';
import '@/components/ui/icon/app-icon';

export class AppModal extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'description', 'proceed-text', 'cancel-text', 'open'];
  }

  private config: ModalConfig | null = null;
  private isOpen: boolean = false;

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  attributeChangedCallback() {
    this.render();
  }

  public show(config: ModalConfig) {
    this.config = config;
    this.isOpen = true;
    this.render();
    document.body.style.overflow = 'hidden';
  }

  public hide() {
    this.isOpen = false;
    this.config = null;
    this.render();
    document.body.style.overflow = '';
  }

  private handleProceed() {
    if (this.config?.onProceed) {
      this.config.onProceed();
    }
    this.dispatchEvent(new CustomEvent('modal-proceed', {
      bubbles: true,
      composed: true,
      detail: { config: this.config }
    }));
    this.hide();
  }

  private handleCancel() {
    if (this.config?.onCancel) {
      this.config.onCancel();
    }
    this.dispatchEvent(new CustomEvent('modal-cancel', {
      bubbles: true,
      composed: true,
      detail: { config: this.config }
    }));
    this.hide();
  }

  private handleBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.handleCancel();
    }
  }

  private handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.handleCancel();
    }
  }

  private setupEventListeners() {
    this.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('modal-close-btn')) {
        this.handleCancel();
      } else if (target.classList.contains('modal-proceed-btn')) {
        this.handleProceed();
      } else if (target.classList.contains('modal-cancel-btn')) {
        this.handleCancel();
      } else if (target.classList.contains('modal-backdrop')) {
        this.handleBackdropClick(event);
      }
    });
    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  private removeEventListeners() {
    document.removeEventListener('keydown', this.handleKeydown.bind(this));
  }

  private render() {
    const title = this.getAttribute('title') || this.config?.title || '';
    const description = this.getAttribute('description') || this.config?.description || '';
    const proceedText = this.getAttribute('proceed-text') || this.config?.proceedText || 'Proceed';
    const cancelText = this.getAttribute('cancel-text') || this.config?.cancelText || 'Cancel';
    const isOpen = this.hasAttribute('open') || this.isOpen;

    if (!isOpen) {
      this.innerHTML = '';
      return;
    }

    const closeIcon = createElement(X, {
      class: 'w-8 h-8',
      stroke: 'currentColor',
      'stroke-width': 2
    });

    this.innerHTML = `
      <div class="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all">
          <div class="flex items-center justify-between p-3">
            <h3 class="text-xl font-semibold text-orange-500">${title}</h3>
            <button class="modal-close-btn text-orange-500 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
              ${closeIcon.outerHTML}
            </button>
          </div>
          
          <div class="p-3">
            <p class="text-gray-600 text-md leading-relaxed">${description}</p>
          </div>
          
          <div class="flex flex-col w-full justify-center gap-3 p-3">
           <button class="modal-proceed-btn px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-transparent rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors">
              ${proceedText}
            </button>
            <button class="modal-cancel-btn px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors">
              ${cancelText}
            </button>
          </div>
        </div>
      </div>
    `;

  }
}

customElements.define('app-modal', AppModal);
