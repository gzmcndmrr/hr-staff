import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@/components/common/base-component.js';
import '@/components/ui/table/table.tsx';

@customElement('home-view')
export class HomeView extends BaseComponent {
  override render() {
    return html`
      <div class="space-y-6 h-full">
        <div class="bg-white shadow rounded-lg p-6">
          <app-header title="Home"></app-header>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'home-view': HomeView;
  }
} 