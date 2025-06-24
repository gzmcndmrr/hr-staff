import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './common/app-header.ts';
import './ui/table/table.tsx';

@customElement('app-shell')
export class AppShell extends LitElement {
  @property({ type: String }) override title = 'ING';

  static override styles = css`
    :host {
      display: block;
    }
  `;
  override createRenderRoot() {
    return this;
  }

  override render() {
    return html`
      <div class="min-h-screen bg-gray-50">
        <!-- Header -->
        <app-header title="${this.title}"></app-header>

        <!-- Main Content -->
        <main class="w-full mx-auto py-6 sm:px-6 lg:px-12">
          <app-table></app-table>
        </main>

      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-shell': AppShell;
  }
}
