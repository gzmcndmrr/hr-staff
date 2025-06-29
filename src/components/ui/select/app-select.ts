import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SelectOption } from '@/components/ui/select/select.type';
import { ChevronDown } from 'lucide';
import '@/components/ui/icon/app-icon';

@customElement('app-select')
export class AppSelect extends LitElement {
  @property({ type: String }) value = '';
  @property({ type: Array }) options: SelectOption[] = [];
  @property({ type: String }) placeholder = 'Select...';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) required = false;
  @property({ type: String }) error = '';
  @property({ type: Boolean }) hasError = false;

  override createRenderRoot() {
    return this;
  }

  private handleChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    this.value = target.value;
    
    this.dispatchEvent(new CustomEvent('select-change', {
      detail: { value: target.value },
      bubbles: true,
      composed: true
    }));
  }

  private handleBlur(e: Event) {
    this.dispatchEvent(new CustomEvent('select-blur', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  override render() {
    const baseClasses = 'w-form-input px-3 py-2 border rounded-md shadow-sm text-sm bg-white transition-all duration-150 outline-none appearance-none pr-10';
    
    const focusClasses = 'focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50';
    const disabledClasses = 'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50';
    const errorClasses = this.hasError 
      ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500/50' 
      : 'border-gray-400';
    
    const selectClasses = `${baseClasses} ${focusClasses} ${disabledClasses} ${errorClasses}`;

    return html`
      <div class="relative w-form-input">
        <select
          .value=${this.value}
          ?disabled=${this.disabled}
          ?required=${this.required}
          class=${selectClasses}
          @change=${this.handleChange}
          @blur=${this.handleBlur}
        >
          <option value="">${this.placeholder}</option>
          ${this.options.map(option => html`
            <option value="${option.value}" ?selected=${this.value === option.value}>
              ${option.label}
            </option>
          `)}
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <app-icon
            .iconComponent=${ChevronDown}
            class="h-4 w-4 text-gray-400"
          ></app-icon>
        </div>
        ${this.hasError && this.error
          ? html`<div class="mt-1 text-sm text-red-500">${this.error}</div>`
          : ''
        }
      </div>
    `;
  }
} 