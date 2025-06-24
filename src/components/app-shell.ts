import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './common/app-header.ts';

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
        <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
           main content
        </main>

        <!-- Footer -->
        <footer class="bg-white border-t border-gray-200">
          footer
        </footer>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-shell': AppShell;
  }
}
