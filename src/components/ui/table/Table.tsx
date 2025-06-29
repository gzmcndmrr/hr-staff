import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@/components/common/base-component.js';
import { tableStaffColumns, headerColumnClass, DEFAULT_CURRENT_PAGE, DEFAULT_ITEMS_PER_PAGE } from '@/components/ui/table/table.utils.js';
import { TableStaffData } from '@/components/ui/table/table.type.js';
import { Edit, Trash2 } from 'lucide';
import '@/components/ui/table/table-pagination.ts';
import '@/components/ui/icon/app-icon.ts';
import '@/views/employee/components/employee-header';
import { store } from '@/store/store.js';
import { showEditEmployee } from '@/store/slices/employeeSlice.js';

@customElement('app-table')
export class AppTable extends BaseComponent {
  @property({ type: Array })
  data: TableStaffData[] = [];

  @property({ type: Array })
  selectedIds: number[] = [];

  @property({ type: Number })
  currentPage: number = DEFAULT_CURRENT_PAGE;

  @property({ type: Number })
  itemsPerPage: number = DEFAULT_ITEMS_PER_PAGE;

  private storeUnsubscribe?: () => void;

  override connectedCallback() {
    super.connectedCallback();
    
    this.updateDataFromStore();
    
    this.storeUnsubscribe = store.subscribe(() => {
      this.updateDataFromStore();
    });
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    
    if (this.storeUnsubscribe) {
      this.storeUnsubscribe();
    }
  }

  private updateDataFromStore() {
    const state = store.getState();
    this.data = state.employee.employees;
    this.requestUpdate();
  }

  private get paginatedData(): TableStaffData[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.data.slice(startIndex, endIndex);
  }

  private handlePageChange(event: CustomEvent) {
    this.currentPage = event.detail.currentPage;
    this.itemsPerPage = event.detail.itemsPerPage;
    
    const paginatedIds = this.paginatedData.map(item => item.id);
    this.selectedIds = this.selectedIds.filter(id => paginatedIds.includes(id));
    
    this.requestUpdate();
  }

  private toggleSelectAll() {
    const paginatedIds = this.paginatedData.map(item => item.id);
    const allPaginatedSelected = paginatedIds.every(id => this.selectedIds.includes(id));
    
    if (allPaginatedSelected) {
      this.selectedIds = this.selectedIds.filter(id => !paginatedIds.includes(id));
    } else {
      const newSelections = paginatedIds.filter(id => !this.selectedIds.includes(id));
      this.selectedIds = [...this.selectedIds, ...newSelections];
    }
    this.requestUpdate();
  }

  private toggleSelectItem(id: number) {
    const index = this.selectedIds.indexOf(id);
    if (index > -1) {
      this.selectedIds = this.selectedIds.filter(selectedId => selectedId !== id);
    } else {
      this.selectedIds = [...this.selectedIds, id];
    }
    this.requestUpdate();
  }

  private isSelected(id: number): boolean {
    return this.selectedIds.includes(id);
  }

  private isAllSelected(): boolean {
    const paginatedIds = this.paginatedData.map(item => item.id);
    return paginatedIds.length > 0 && paginatedIds.every(id => this.selectedIds.includes(id));
  }

  private isSomeSelected(): boolean {
    const paginatedIds = this.paginatedData.map(item => item.id);
    const selectedOnPage = paginatedIds.filter(id => this.selectedIds.includes(id));
    return selectedOnPage.length > 0 && selectedOnPage.length < paginatedIds.length;
  }

  private handleEditEmployee(id: number): void {
    store.dispatch(showEditEmployee(id));
  }

  override render() {
    return html`
      <div class="overflow-x-auto rounded-lg">
        <table class="min-w-full bg-white border border-gray-200">
          <thead class="bg-white h-16">
            <tr>
              <th class="${headerColumnClass}">
                <input 
                  type="checkbox" 
                  class="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                  .checked=${this.isAllSelected()}
                  .indeterminate=${this.isSomeSelected()}
                  @change=${this.toggleSelectAll}
                />
              </th>
              ${tableStaffColumns.map(column => html`
                <th class="${headerColumnClass}">${column.header}</th>
              `)}
            </tr>
          </thead>
          <tbody class="bg-white">
            ${this.paginatedData.map((item) => html`
              <tr class="border-b border-gray-200 h-16 hover:bg-blue-50 transition-colors duration-200 ${this.isSelected(item.id) ? 'bg-blue-100' : ''}">
                <td class="px-6 py-4 whitespace-nowrap">
                  <input 
                    type="checkbox" 
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    .checked=${this.isSelected(item.id)}
                    @change=${() => this.toggleSelectItem(item.id)}
                  />
                </td>
                <td class="table-cell">${item.firstName}</td>
                <td class="table-cell">${item.lastName}</td>
                <td class="table-cell">${item.dateOfEmployment}</td>
                <td class="table-cell">${item.dateOfBirth}</td>
                <td class="table-cell">${item.phone}</td>
                <td class="table-cell">
                ${item.email}
                </td>
                <td class="table-cell">
                 ${item.department}
                </td>
                <td class="table-cell">${item.position}</td>
                <td class="table-cell">
                  <button 
                    class="text-orange-500 w-6 h-6 hover:text-orange-700 mr-2"
                    @click=${() => this.handleEditEmployee(item.id)}
                  >
                    <app-icon 
                      .iconComponent=${Edit} 
                      class="w-6 h-6 text-orange-500" 
                    >
                    </app-icon>
                  </button>
                  <button class="text-orange-500 w-6 h-6 hover:text-orange-700">
                    <app-icon 
                      .iconComponent=${Trash2} 
                      class="w-6 h-6 text-orange-500">
                    </app-icon>
                  </button>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
        
        <table-pagination
          .currentPage=${this.currentPage}
          .itemsPerPage=${this.itemsPerPage}
          .totalItems=${this.data.length}
          @page-change=${this.handlePageChange}
        ></table-pagination>
        
      </div>
    `;
  }
}
