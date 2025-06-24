import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tableStaffColumns, headerColumnClass, sampleData } from './table.utils.js';
import { TableStaffData } from './table.type.js';
import { createElement, Edit, Trash2 } from 'lucide';

@customElement('app-table')
export class AppTable extends LitElement {
  @property({ type: Array })
  data: TableStaffData[] = sampleData;

  @property({ type: Array })
  selectedIds: number[] = [];

  override createRenderRoot() {
    return this;
  }

  private toggleSelectAll() {
    if (this.selectedIds.length === this.data.length) {
      this.selectedIds = [];
    } else {
      this.selectedIds = this.data.map(item => item.id);
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
    return this.data.length > 0 && this.selectedIds.length === this.data.length;
  }

  private isSomeSelected(): boolean {
    return this.selectedIds.length > 0 && this.selectedIds.length < this.data.length;
  }

  private renderIcon(iconComponent: any, fill: boolean = false) {
    const iconElement = createElement(iconComponent, {
      size: 12,
      class: 'w-4 h-4',
      stroke: '#f97316', // orange-500 color
      'stroke-width': 2,
      fill: fill ? '#f97316' : 'none'
    });
    return html`${iconElement}`;
  }

  override render() {
    return html`
      <div class="overflow-x-auto shadow-xl rounded-lg">
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
            ${this.data.map((item) => html`
              <tr class="border-b border-gray-200 h-16 hover:bg-blue-50 transition-colors duration-200 ${this.isSelected(item.id) ? 'bg-blue-100' : ''}">
                <td class="px-6 py-4 whitespace-nowrap">
                  <input 
                    type="checkbox" 
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    .checked=${this.isSelected(item.id)}
                    @change=${() => this.toggleSelectItem(item.id)}
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.firstName}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.lastName}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.dateOfEmployment}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.dateOfBirth}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.phone}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hover:text-blue-800">
                  <a href="mailto:${item.email}">${item.email}</a>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span class="inline-flex px-2 py-1 text-xs text-gray-500">${item.department}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.position}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button class="text-orange-500 w-6 h-6 hover:text-orange-700 mr-2">
                    ${this.renderIcon(Edit, false)}
                  </button>
                  <button class="text-orange-500 w-6 h-6 hover:text-orange-700">
                    ${this.renderIcon(Trash2, true)}
                  </button>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
        ${this.selectedIds.length > 0 ? html`
          <div class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p class="text-sm text-blue-800">
              <strong>${this.selectedIds.length}</strong> öğe seçildi: ${this.selectedIds.join(', ')}
            </p>
          </div>
        ` : ''}
      </div>
    `;
  }
}
