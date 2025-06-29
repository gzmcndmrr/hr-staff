import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BaseComponent } from '@/components/common/base-component';
import { Loader2 } from 'lucide';
import { 
  EmployeeFormData, 
  Employee,
  EmployeeFormFieldKeys,
  EmployeeFormValidation,
  EmployeeFormSubmitDetail,
  EmployeeFormState
} from '@/views/employee/models/employee';
import { departments, positions, validateField } from '@/views/employee/employee.util';
import { SelectOption } from '@/components/ui/select/select.type';
import { store } from '@/store/store';
import { addEmployee, updateEmployee, showEmployeeList } from '@/store/slices/employeeSlice';
import { TableStaffData } from '@/components/ui/table/table.type';
import '@/components/ui/select/app-select';

@customElement('employee-form')
export class EmployeeForm extends BaseComponent {
  @property({ type: [String, Number] }) employeeId?: string | number | null;

  @state() private formState: EmployeeFormState = {
    formData: this.initializeEmptyForm(),
    isSubmitting: false,
    isEdit: false,
    employee: undefined
  };

  private get isEdit(): boolean {
    return this.employeeId !== null && this.employeeId !== undefined;
  }

  override connectedCallback() {
    super.connectedCallback();
    this.initializeComponent();
  }

  private async initializeComponent(): Promise<void> {
    this.formState = {
      ...this.formState,
      isEdit: this.isEdit
    };
    
    if (this.isEdit && this.employeeId) {
      await this.loadEmployeeData();
    }
  }

  private async loadEmployeeData(): Promise<void> {
    try {
      const employee = this.findEmployeeById(this.employeeId);
      if (employee) {
        this.formState = {
          ...this.formState,
          employee: employee
        };
        this.initializeForm(employee);
      } else {
        console.error(`Employee with ID ${this.employeeId} not found`);
      }
    } catch (error) {
      console.error('Error loading employee data:', error);
    }
  }

  private findEmployeeById(id: string | number | null | undefined): Employee | null {
    if (id === null || id === undefined) return null;
    
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    const state = store.getState();
    const employeeData = state.employee.employees.find(emp => emp.id === numericId);
    
    if (employeeData) {
      return this.convertTableStaffDataToEmployee(employeeData);
    }
    
    return null;
  }

  private convertTableStaffDataToEmployee(data: TableStaffData): Employee {
    return {
      id: data.id.toString(),
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfEmployment: data.dateOfEmployment,
      dateOfBirth: data.dateOfBirth,
      phone: data.phone,
      email: data.email,
      department: data.department,
      position: data.position
    };
  }

  private convertEmployeeToTableStaffData(employee: Employee, id?: number): TableStaffData {
    return {
      id: id || parseInt(employee.id || '0', 10),
      firstName: employee.firstName,
      lastName: employee.lastName,
      dateOfEmployment: employee.dateOfEmployment,
      dateOfBirth: employee.dateOfBirth,
      phone: employee.phone,
      email: employee.email,
      department: employee.department,
      position: employee.position
    };
  }

  private generateUniqueId(): number {
    const state = store.getState();
    const maxId = state.employee.employees.reduce((max, emp) => Math.max(max, emp.id), 0);
    return maxId + 1;
  }

  public getCurrentEmployeeCount(): number {
    const state = store.getState();
    return state.employee.employees.length;
  }

  public getAllEmployees() {
    const state = store.getState();
    return state.employee.employees;
  }

  private addNewEmployeeToStore(formData: Record<string, string>): Employee {
    const newId = this.generateUniqueId();
    
    const newEmployee: Employee = {
      id: newId.toString(),
      firstName: formData['firstName'] ?? '',
      lastName: formData['lastName'] ?? '',
      dateOfEmployment: formData['dateOfEmployment'] ?? '',
      dateOfBirth: formData['dateOfBirth'] ?? '',
      phone: formData['phone'] ?? '',
      email: formData['email'] ?? '',
      department: formData['department'] ?? '',
      position: formData['position'] ?? ''
    };

    const tableStaffData = this.convertEmployeeToTableStaffData(newEmployee, newId);
    store.dispatch(addEmployee(tableStaffData));

    return newEmployee;
  }

  private updateEmployeeInStore(formData: Record<string, string>): Employee | undefined {
    if (!this.employeeId) return undefined;
    
    const numericId = typeof this.employeeId === 'string' ? parseInt(this.employeeId, 10) : this.employeeId;
    
    const updatedEmployee: Employee = {
      id: numericId.toString(),
      firstName: formData['firstName'] ?? '',
      lastName: formData['lastName'] ?? '',
      dateOfEmployment: formData['dateOfEmployment'] ?? '',
      dateOfBirth: formData['dateOfBirth'] ?? '',
      phone: formData['phone'] ?? '',
      email: formData['email'] ?? '',
      department: formData['department'] ?? '',
      position: formData['position'] ?? ''
    };

    const tableStaffData = this.convertEmployeeToTableStaffData(updatedEmployee, numericId);
    store.dispatch(updateEmployee(tableStaffData));

    return updatedEmployee;
  }

  private initializeEmptyForm(): EmployeeFormData {
    return {
      firstName: { value: '', touched: false },
      lastName: { value: '', touched: false },
      dateOfEmployment: { value: '', touched: false },
      dateOfBirth: { value: '', touched: false },
      phone: { value: '', touched: false },
      email: { value: '', touched: false },
      department: { value: '', touched: false },
      position: { value: '', touched: false }
    };
  }

  private initializeForm(employee?: Employee): void {
    if (employee) {
      this.formState = {
        ...this.formState,
        formData: {
          firstName: { value: employee.firstName || '', touched: false },
          lastName: { value: employee.lastName || '', touched: false },
          dateOfEmployment: { value: employee.dateOfEmployment || '', touched: false },
          dateOfBirth: { value: employee.dateOfBirth || '', touched: false },
          phone: { value: employee.phone || '', touched: false },
          email: { value: employee.email || '', touched: false },
          department: { value: employee.department || '', touched: false },
          position: { value: employee.position || '', touched: false }
        }
      };
    }
  }

  private handleInputChange(field: EmployeeFormFieldKeys, value: string): void {
    const error = validateField(field, value);
    this.formState = {
      ...this.formState,
      formData: {
        ...this.formState.formData,
        [field]: {
          value,
          error,
          touched: true
        }
      }
    };
    this.requestUpdate();
  }

  private handleBlur(field: EmployeeFormFieldKeys): void {
    const currentField = this.formState.formData[field];
    const error = validateField(field, currentField.value);
    this.formState = {
      ...this.formState,
      formData: {
        ...this.formState.formData,
        [field]: {
          ...currentField,
          error,
          touched: true
        }
      }
    };
    this.requestUpdate();
  }

  private validateForm(): EmployeeFormValidation {
    const errors: Partial<Record<EmployeeFormFieldKeys, string>> = {};
    let hasErrors = false;

    Object.entries(this.formState.formData).forEach(([key, field]) => {
      const fieldKey = key as EmployeeFormFieldKeys;
      const error = validateField(fieldKey, field.value);
      if (error) {
        errors[fieldKey] = error;
        hasErrors = true;
      }
    });

    const allFieldsFilled = Object.values(this.formState.formData).every(field => field.value.trim());
    const isValid = !hasErrors && allFieldsFilled;

    return {
      isValid,
      errors
    };
  }

  private async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();
    
    const touchedFormData = Object.fromEntries(
      Object.entries(this.formState.formData).map(([key, field]) => [
        key,
        { 
          ...field, 
          touched: true, 
          error: validateField(key as EmployeeFormFieldKeys, field.value) 
        }
      ])
    ) as EmployeeFormData;

    this.formState = {
      ...this.formState,
      formData: touchedFormData
    };

    const validation = this.validateForm();
    if (!validation.isValid) {
      this.requestUpdate();
      return;
    }

    this.formState = {
      ...this.formState,
      isSubmitting: true
    };
    this.requestUpdate();

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const formResult = Object.fromEntries(
        Object.entries(this.formState.formData).map(([key, field]) => [key, field.value.trim()])
      );

      let newEmployee: Employee | undefined;
      
      if (!this.isEdit) {
        newEmployee = this.addNewEmployeeToStore(formResult);
      } else {
        newEmployee = this.updateEmployeeInStore(formResult);
      }

      const submitDetail: EmployeeFormSubmitDetail = {
        data: formResult,
        isEdit: this.isEdit,
        ...(this.formState.employee && { originalEmployee: this.formState.employee }),
        ...(newEmployee && { newEmployee: newEmployee })
      };

      this.dispatchEvent(new CustomEvent('form-submit', {
        detail: submitDetail,
        bubbles: true,
        composed: true
      }));

      if (!this.isEdit) {
        this.resetForm();
      }

      store.dispatch(showEmployeeList());

    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      this.formState = {
        ...this.formState,
        isSubmitting: false
      };
      this.requestUpdate();
    }
  }

  private resetForm(): void {
    this.formState = {
      ...this.formState,
      formData: this.initializeEmptyForm()
    };
    this.requestUpdate();
  }

  private handleReset(): void {
      store.dispatch(showEmployeeList());
  }

  private renderFormField(
    id: EmployeeFormFieldKeys,
    type: string = 'text',
    options?: SelectOption[]
  ) {
    const field = this.formState.formData[id];
    const label = this.tEmployee(`form.fields.${id}`);
    const placeholder = options ? this.tEmployee('form.placeholders.select') : '';
    
    return html`
      <div class="form-group">
        <label for="${id}" class="block text-sm font-medium text-gray-700 mb-1">
          ${label} ${this.tEmployee('form.requiredField')}
        </label>
        ${options ? html`
          <app-select
            .value=${field.value}
            .options=${options}
            .disabled=${this.formState.isSubmitting}
            .hasError=${field.touched && !!field.error}
            .error=${field.error || ''}
            placeholder="${placeholder}"
            @select-change=${(e: CustomEvent) => this.handleInputChange(id, e.detail.value)}
            @select-blur=${() => this.handleBlur(id)}
          ></app-select>
        ` : html`
          <input
            id="${id}"
            type="${type}"
            .value=${field.value}
            @input=${(e: InputEvent) => this.handleInputChange(id, (e.target as HTMLInputElement).value)}
            @blur=${() => this.handleBlur(id)}
            class="w-form-input px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              field.touched && field.error 
                ? 'border-red-500 bg-red-50' 
                : 'border-gray-400'
            }"
            ?disabled=${this.formState.isSubmitting}
          />
        `}
        ${!options && field.touched && field.error
          ? html`<p class="mt-1 text-sm text-red-600">${field.error}</p>`
          : ''
        }
      </div>
    `;
  }

  override render() {
    const validation = this.validateForm();
    
    return html`
      <div class="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
        <form @submit=${this.handleSubmit} class="space-y-6">
          <!-- Form Fields Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
            ${this.renderFormField('firstName')}
            ${this.renderFormField('lastName')}
            ${this.renderFormField('dateOfEmployment', 'date')}
            ${this.renderFormField('dateOfBirth', 'date')}
            ${this.renderFormField('phone')}
            ${this.renderFormField('email', 'email')}
            ${this.renderFormField('department', 'text', departments)}
            ${this.renderFormField('position', 'text', positions)}
          </div>

          <div class="flex space-x-3 pt-4 justify-center w-2/4 mx-auto">
            <button
              type="submit"
              ?disabled=${this.formState.isSubmitting || !validation.isValid}
              class="flex-1 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ${this.formState.isSubmitting 
                ? html`
                    <span class="flex items-center justify-center">
                      <app-icon 
                        .iconComponent=${Loader2} 
                        class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        stroke="currentColor">
                      </app-icon>
                      ${this.tEmployee('form.processing')}
                    </span>
                  `
                : this.isEdit ? this.tCommon('actions.update') : this.tCommon('actions.add')
              }
            </button>
            
            <button
              type="button"
              @click=${this.handleReset}
              ?disabled=${this.formState.isSubmitting}
              class="flex-1 text-gray-700 border border-gray-400 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ${this.tCommon('actions.cancel')}
            </button>
          </div>
        </form>
      </div>
    `;
  }
}
