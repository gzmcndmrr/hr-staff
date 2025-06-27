import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@/components/common/base-component.js';
import logoUrl from '@/assets/logo.png';
import '@/components/ui/button/app-button.ts';

@customElement('app-header')
export class AppHeader extends BaseComponent {
  @property({ type: String }) override title = 'ING';
  @property({ type: String }) currentPath = '/';

  static override styles = css`
    :host {
      display: block;
    }
  `;

  override render() {
    return html`
      <header class="bg-white shadow-sm border-b border-gray-200">
          <div class="flex justify-between items-center h-14 px-4">
            <div class="flex items-center gap-2">
              <img src="${logoUrl}" alt="ING" class="w-6 h-6 rounded">
              <h1 class="text-lg font-semibold text-gray-900">${this.title}</h1>
            </div>     
            
            <!-- Action Buttons -->
            <div class="flex space-x-4">
                <app-button 
                title="Employees" 
                icon="user-plus" 
                variant="ghost">
              </app-button>
              <app-button 
                title="Add New" 
                icon="plus" 
                variant="ghost">
              </app-button>
              <app-button 
                title="Lang" 
                icon="globe" 
                variant="ghost">
              </app-button>
            </div>
          </div>  
          </div>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-header': AppHeader;
  }
}
