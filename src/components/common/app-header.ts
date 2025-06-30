import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BaseComponent } from '@/components/common/base-component.js';
import { AppIcon } from '@/components/ui/icon/app-icon.js';
import logoUrl from '@/assets/logo.png';
import { store } from '@/store/store.js';
import { showEmployeeList, showAddNew, CurrentView } from '@/store/slices/employeeSlice.js';
import { Users, Plus } from 'lucide';
import '@/components/ui/language-switcher/language-switcher.ts';

@customElement('app-header')
export class AppHeader extends BaseComponent {
  @property({ type: String }) override title = 'ING';
  @property({ type: String }) currentPath = '/';
  @state() private currentView: CurrentView = 'employeeList';

  override connectedCallback() {
    super.connectedCallback();
    this.currentView = store.getState().employee.currentView;
    store.subscribe(() => {
      const newCurrentView = store.getState().employee.currentView;
      if (this.currentView !== newCurrentView) {
        this.currentView = newCurrentView;
      }
    });
  }

  private handleEmployeesClick() {
    store.dispatch(showEmployeeList());
  }

  private handleAddNewClick() {
    store.dispatch(showAddNew());
  }

  override render() {
    return html`
      <header class="bg-white shadow-sm border-b border-gray-200">
          <div class="flex justify-between items-center h-14 px-4">
            <div class="flex items-center gap-2">
              <img src="${logoUrl}" alt="ING" class="w-6 h-6 rounded">
              <h1 class="text-lg font-semibold text-gray-900">${this.title}</h1>
            </div>     
            
            <div class="flex space-x-4">
              <button 
                id="employees"
                @click="${this.handleEmployeesClick}"
                class="px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200 flex items-center gap-2 ${
                  this.currentView === 'employeeList' 
                    ? 'text-orange-500' 
                    : ' text-orange-200'
                }">
                ${AppIcon.renderIcon(Users, { size: 16, class: 'h-4 w-4' })}
                ${this.tCommon('navigation.employees')}
              </button>
              <button 
                id="addNew"
                @click="${this.handleAddNewClick}"
                class="px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200 flex items-center gap-2 ${
                  this.currentView === 'addNew' 
                    ? 'text-orange-500' 
                    : ' text-orange-200'
                }">
                ${AppIcon.renderIcon(Plus, { size: 16, class: 'h-4 w-4' })}
                ${this.tCommon('actions.add')}
              </button>
              <language-switcher></language-switcher>
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
