import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@/components/common/base-component.js';
import { type TableStaffData } from '@/components/ui/table/table.type.js';
import '@/components/ui/button/app-button';
import '@/components/ui/modal/app-modal';
import { store } from '@/store/store';
import { deleteEmployee, showEditEmployee } from '@/store/slices/employeeSlice';
import { showConfirmModal } from '@/utils/modal';
import { t } from '@/utils/i18n.js';
import '@/components/ui/icon/app-icon';
@customElement('employee-grid')
export class EmployeeGrid extends BaseComponent {
  @property({ type: Array })
  employees: TableStaffData[] = [];

  override connectedCallback() {
    super.connectedCallback();
  }

  private handleEditEmployee(id: number): void {
    store.dispatch(showEditEmployee(id));
  }

  private handleDeleteEmployee(id: number): void {
    const employee = this.employees.find(emp => emp.id === id);
    const employeeName = employee ? `${employee.firstName} ${employee.lastName}` : t('messages.unknownEmployee');
    
    showConfirmModal({
      title: t('messages.confirm'),
      description: t('messages.deleteEmployeeConfirm', { employeeName }),
      proceedText: t('actions.proceed'),
      cancelText: t('actions.cancel'),
      onProceed: () => {
        store.dispatch(deleteEmployee(id));
      }
    });
  }

  override render() {
    return html`
      <div class="flex justify-center w-full">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-20">
        ${this.employees.map(employee => html`
          <div class="bg-white border border-gray-200 w-card rounded-sm shadow-layered p-4 text-base mb-4">
              <div class="grid grid-cols-2 gap-4 mb-4">
                  <div class="text-left">
                    <div class="text-gray-400">First Name</div>
                    <div class="text-gray-900">${employee.firstName}</div>
                  </div>
                  <div class="text-left">
                    <div class="text-gray-400">Last Name</div>
                    <div class="text-gray-900">${employee.lastName}</div>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4 mb-4">
                  <div class="text-left">
                    <div class="text-gray-400">Department</div>
                    <div class="text-gray-900">${employee.department}</div>
                  </div>
                  <div class="text-left">
                    <div class="text-gray-400">Position</div>
                    <div class="text-gray-900">${employee.position}</div>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4 mb-4">
                  <div class="text-left">
                    <div class="text-gray-400">Email</div>
                    <div class="text-gray-900 truncate">${employee.email}</div>
                  </div>
                  <div class="text-left">
                    <div class="text-gray-400">Phone</div>
                    <div class="text-gray-900">${employee.phone}</div>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4 mb-4">
                  <div class="text-left">
                    <div class="text-gray-400">Birth Date</div>
                    <div class="text-gray-900">${new Date(employee.dateOfBirth).toLocaleDateString()}</div>
                  </div>
                  <div class="text-left">
                    <div class="text-gray-400">Employment Date</div>
                    <div class="text-gray-900">${new Date(employee.dateOfEmployment).toLocaleDateString()}</div>
                  </div>
              </div>
              <div class="flex justify-start space-x-4">
                <app-button title="Edit" icon="edit" variant="info" @click=${() => this.handleEditEmployee(employee.id)}>Edit</app-button>
                <app-button title="Delete" icon="trash" @click=${() => this.handleDeleteEmployee(employee.id)}>Delete</app-button>
                  </div>
          </div>
        `)}
      </div>
      </div>
    `;
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'employee-grid': EmployeeGrid;
  }
} 