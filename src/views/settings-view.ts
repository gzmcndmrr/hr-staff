import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@/components/common/base-component.js';

@customElement('settings-view')
export class SettingsView extends BaseComponent {
  override render() {
    return html`
      <div class="space-y-6 h-full">
        <app-header title="Settings"></app-header>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'settings-view': SettingsView;
  }
} 