declare global {
  interface Window {
    lucide?: {
      createIcons: () => void;
    };
  }
}

export class AppButton extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'icon', 'disabled', 'type', 'variant'];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.addEventListener('click', this.handleClick.bind(this));
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick.bind(this));
  }

  attributeChangedCallback() {
    this.render();
  }

  private handleClick() {
    if (this.hasAttribute('disabled')) return;
    
    const clickEvent = new CustomEvent('button-click', {
      bubbles: true,
      detail: { title: this.getAttribute('title') }
    });
    this.dispatchEvent(clickEvent);
  }

  private render() {
    const title = this.getAttribute('title') || '';
    const icon = this.getAttribute('icon') || '';
    const disabled = this.hasAttribute('disabled');
    const variant = this.getAttribute('variant') || 'primary';
    
    const baseClasses = 'px-3 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 text-sm';
    
    let variantClasses = '';
    switch (variant) {
      case 'primary':
        variantClasses = disabled 
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700';
        break;
      case 'secondary':
        variantClasses = disabled
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-orange-100 text-orange-700 hover:bg-orange-200 active:bg-orange-300';
        break;
      case 'info':
        variantClasses = disabled
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700';
        break;
      case 'ghost':
        variantClasses = disabled
          ? 'text-gray-400 cursor-not-allowed'
          : 'text-orange-500 hover:text-orange-700 hover:bg-orange-50 active:bg-orange-100';
        break;
    }
    
    const buttonClasses = `${baseClasses} ${variantClasses}`;

    this.innerHTML = `
      <button 
        class="${buttonClasses}"
        type="${this.getAttribute('type') || 'button'}"
        ${disabled ? 'disabled' : ''}
      >
        ${icon ? `<i data-lucide="${icon}" class="w-4 h-4"></i>` : ''}
        <span>${title}</span>
      </button>
    `;

    if (icon && window.lucide) {
      window.lucide.createIcons();
    }
  }
}

customElements.define('app-button', AppButton);
