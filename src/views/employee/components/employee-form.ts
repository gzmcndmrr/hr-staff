import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BaseComponent } from '@/components/common/base-component';
import { TableStaffData } from '@/components/ui/table/table.type';
import { Loader2 } from 'lucide';
import { EmployeeFormData } from '@/views/employee/models/employee';
import { departments, positions, validateField } from '@/views/employee/employee.util';
import { SelectOption } from '@/components/ui/select/select.type';
import '@/components/ui/select/app-select';

@customElement('employee-form')
export class EmployeeForm extends BaseComponent {
  @property({ type: Object }) employee?: TableStaffData;
  @property({ type: Boolean }) isEdit: boolean = false;

  @state() private formData: EmployeeFormData = {
    firstName: { value: '', touched: false },
    lastName: { value: '', touched: false },
    dateOfEmployment: { value: '', touched: false },
    dateOfBirth: { value: '', touched: false },
    phone: { value: '', touched: false },
    email: { value: '', touched: false },
    department: { value: '', touched: false },
    position: { value: '', touched: false }
  };

  @state() private isSubmitting: boolean = false;

  override connectedCallback() {
    super.connectedCallback();
    if (this.employee && this.isEdit) {
      this.initializeForm();
    }
  }

  private initializeForm() {
    if (this.employee) {
      this.formData = {
        firstName: { value: this.employee.firstName || '', touched: false },
        lastName: { value: this.employee.lastName || '', touched: false },
        dateOfEmployment: { value: '', touched: false },
        dateOfBirth: { value: '', touched: false },
        phone: { value: '', touched: false },
        email: { value: '', touched: false },
        department: { value: '', touched: false },
        position: { value: '', touched: false }
      };
    }
  }

  private handleInputChange(field: keyof EmployeeFormData, value: string) {
    const error = validateField(field, value);
    this.formData = {
      ...this.formData,
      [field]: {
        value,
        error,
        touched: true
      }
    };
    this.requestUpdate();
  }

  private handleBlur(field: keyof EmployeeFormData) {
    const currentField = this.formData[field];
    const error = validateField(field, currentField.value);
    this.formData = {
      ...this.formData,
      [field]: {
        ...currentField,
        error,
        touched: true
      }
    };
    this.requestUpdate();
  }

  private isFormValid(): boolean {
    const hasErrors = Object.values(this.formData).some(field => field.error);
    const allFieldsFilled = Object.values(this.formData).every(field => field.value.trim());
    return !hasErrors && allFieldsFilled;
  }

  private async handleSubmit(e: Event) {
    e.preventDefault();
    
    this.formData = Object.fromEntries(
      Object.entries(this.formData).map(([key, field]) => [
        key,
        { ...field, touched: true, error: validateField(key as keyof EmployeeFormData, field.value) }
      ])
    ) as EmployeeFormData;
    
    if (!this.isFormValid()) {
      this.requestUpdate();
      return;
    }

    this.isSubmitting = true;
    this.requestUpdate();

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const formResult = Object.fromEntries(
        Object.entries(this.formData).map(([key, field]) => [key, field.value.trim()])
      );

      this.dispatchEvent(new CustomEvent('form-submit', {
        detail: {
          data: formResult,
          isEdit: this.isEdit,
          originalEmployee: this.employee
        },
        bubbles: true,
        composed: true
      }));

      if (!this.isEdit) {
        this.resetForm();
      }

    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      this.isSubmitting = false;
      this.requestUpdate();
    }
  }

  private resetForm() {
    this.formData = {
      firstName: { value: '', touched: false },
      lastName: { value: '', touched: false },
      dateOfEmployment: { value: '', touched: false },
      dateOfBirth: { value: '', touched: false },
      phone: { value: '', touched: false },
      email: { value: '', touched: false },
      department: { value: '', touched: false },
      position: { value: '', touched: false }
    };
    this.requestUpdate();
  }

  private handleReset() {
    if (this.isEdit && this.employee) {
      this.initializeForm();
    } else {
      this.resetForm();
    }
  }

  private renderFormField(
    id: keyof EmployeeFormData,
    label: string,
    type: string = 'text',
    options?: SelectOption[]
  ) {
    const field = this.formData[id];
    return html`
      <div class="form-group">
        <label for="${id}" class="block text-sm font-medium text-gray-700 mb-1">
          ${label} *
        </label>
        ${options ? html`
          <app-select
            .value=${field.value}
            .options=${options}
            .disabled=${this.isSubmitting}
            .hasError=${field.touched && !!field.error}
            .error=${field.error || ''}
            placeholder="Select..."
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
            ?disabled=${this.isSubmitting}
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
    return html`
      <div class="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
        <form @submit=${this.handleSubmit} class="space-y-6">
          <!-- Form Fields Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
            ${this.renderFormField('firstName', 'First Name')}
            ${this.renderFormField('lastName', 'Last Name')}
            ${this.renderFormField('dateOfEmployment', 'Date of Employment', 'date')}
            ${this.renderFormField('dateOfBirth', 'Date of Birth', 'date')}
            ${this.renderFormField('phone', 'Phone')}
            ${this.renderFormField('email', 'Email', 'email')}
            ${this.renderFormField('department', 'Department', 'text', departments)}
            ${this.renderFormField('position', 'Position', 'text', positions)}
          </div>

          <!-- Form Actions -->
          <div class="flex space-x-3 pt-4 justify-center w-2/4 mx-auto">
            <button
              type="submit"
              ?disabled=${this.isSubmitting || !this.isFormValid()}
              class="flex-1 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ${this.isSubmitting 
                ? html`
                    <span class="flex items-center justify-center">
                      <app-icon 
                        .iconComponent=${Loader2} 
                        class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        stroke="currentColor">
                      </app-icon>
                      Processing...
                    </span>
                  `
                : this.isEdit ? 'Update' : 'Add'
              }
            </button>
            
            <button
              type="button"
              @click=${this.handleReset}
              ?disabled=${this.isSubmitting}
              class="flex-1 text-gray-700 border border-gray-400 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ${this.isEdit ? 'Reset' : 'Cancel'}
            </button>
          </div>
        </form>
      </div>
    `;
  }
}
