import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BaseComponent } from '@/components/common/base-component.js';
import { Menu, Grid3X3 } from 'lucide';
import '@/components/ui/icon/app-icon.ts';
import { store, setViewMode, type ViewMode } from '@/store/store.js';

@customElement('employee-header')
export class EmployeeHeader extends BaseComponent {
  @property({ type: String })
  override title: string = 'Employee List';
  @property({ type: Boolean }) isHideActionButtons: boolean = false;

  @state()
  private viewMode: ViewMode = 'list';

  override connectedCallback() {
    super.connectedCallback();
    this.viewMode = store.getState().employee.viewMode;
    
    store.subscribe(() => {
      const newViewMode = store.getState().employee.viewMode;
      if (this.viewMode !== newViewMode) {
        this.viewMode = newViewMode;
        this.requestUpdate();
      }
    });
  }

  private handleViewModeChange(mode: ViewMode) {
    store.dispatch(setViewMode(mode));
  }


  override render() {
    return html`
      <div class="flex justify-between items-center mt-8 mb-4 px-12">
        <h1 class="text-2xl text-orange-500">${this.title || 'Employee List'}</h1>
        ${!this.isHideActionButtons ? html`
        <div class="flex space-x-2">
          <button 
            class="flex items-center"
            @click=${() => this.handleViewModeChange('list')}
            title="List View"
          >
            <app-icon 
              .iconComponent=${Menu} 
              class="w-7 h-7 ${this.viewMode === 'list' ? 'text-orange-600' : 'text-orange-200'}">
            </app-icon>
          </button>
          <button 
            class="flex items-center"
            @click=${() => this.handleViewModeChange('grid')}
            title="Grid View"
          >
            <app-icon 
              .iconComponent=${Grid3X3} 
              class="w-7 h-7 ${this.viewMode === 'grid' ? 'text-orange-600' : 'text-orange-200'}">
            </app-icon>
          </button>
        </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'employee-header': EmployeeHeader;
  }
} 