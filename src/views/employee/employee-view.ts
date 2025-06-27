import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BaseComponent } from '@/components/common/base-component.js';
import { store, type RootState } from '@/store/store.js';
import { type TableStaffData } from '@/components/ui/table/table.type.js';
import '@/components/common/app-header.ts';
import './components/employee-grid.ts';
import '@/components/ui/table/table.tsx';

@customElement('employee-view')
export class EmployeeView extends BaseComponent {
  @property({ type: String }) override title = 'ING';
  @state() private viewMode: 'list' | 'grid' = 'list';
  @state() private employees: TableStaffData[] = [];

  override connectedCallback() {
    super.connectedCallback();
    this.updateFromStore();
    store.subscribe(() => this.updateFromStore());
  }

  private updateFromStore() {
    const state = store.getState() as RootState;
    this.viewMode = state.employee.viewMode;
    this.employees = state.employee.employees;
  }

  override render() {
    return html`
      <div class="min-h-screen bg-gray-50">
        <app-header title="${this.title}"></app-header>
        <employee-header title="Employee List"></employee-header>
        <main class="w-full mx-auto py-6 sm:px-6 lg:px-12">
          ${this.viewMode === 'list' 
            ? html`<app-table></app-table>`
            : html`<employee-grid .employees=${this.employees}></employee-grid>`
          }
        </main>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'employee-view': EmployeeView;
  }
}
