import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('app-shell')
export class AppShell extends LitElement {
  @property({ type: String }) override title = 'HR Staff Management';

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
        <header class="bg-red-500 shadow-sm border-b border-gray-200">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
              <div class="flex items-center">
                <h1 class="text-xl font-semibold text-gray-900">${this.title}</h1>
              </div>
              <nav class="flex space-x-4">
                <a href="#" class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </a>
                <a href="#" class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Staff
                </a>
                <a href="#" class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Settings
                </a>
              </nav>
            </div>
          </div>
        </header>

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
