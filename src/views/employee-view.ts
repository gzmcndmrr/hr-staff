import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@/components/common/base-component.js';
import '@/components/common/app-header.ts';
import '@/components/ui/table/table.tsx';

@customElement('employee-view')
export class EmployeeView extends BaseComponent {
  @property({ type: String }) override title = 'ING';

  override render() {
    return html`
      <div class="min-h-screen bg-gray-50">
        <app-header title="${this.title}"></app-header>
        <main class="w-full mx-auto py-6 sm:px-6 lg:px-12">
          <app-table></app-table>
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
