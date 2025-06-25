import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@/components/common/base-component.js';
import { ChevronLeft, ChevronRight } from 'lucide';
import { AppIcon } from '@/components/ui/icon/app-icon.js';
import { DEFAULT_CURRENT_PAGE, DEFAULT_ITEMS_PER_PAGE, MAX_VISIBLE_PAGES } from '@/components/ui/table/table.utils.js';

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

@customElement('table-pagination')
export class TablePagination extends BaseComponent {
  @property({ type: Number })
  currentPage: number = DEFAULT_CURRENT_PAGE;

  @property({ type: Number })
  itemsPerPage: number = DEFAULT_ITEMS_PER_PAGE;

  @property({ type: Number })
  totalItems: number = 0;

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get startItem(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endItem(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }

  private goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.dispatchEvent(new CustomEvent('page-change', {
        detail: { currentPage: page, itemsPerPage: this.itemsPerPage },
        bubbles: true
      }));
    }
  }

  private getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = MAX_VISIBLE_PAGES;
    
    if (this.totalPages <= maxVisible) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, this.currentPage - 2);
      const end = Math.min(this.totalPages, this.currentPage + 2);
      
      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push(-1);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < this.totalPages) {
        if (end < this.totalPages - 1) pages.push(-1);
        pages.push(this.totalPages);
      }
    }
    
    return pages;
  }

  override render() {
    if (this.totalPages <= 1) {
      return html``;
    }

    const pageNumbers = this.getPageNumbers();

    return html`
      <div class="flex items-center justify-between bg-white px-4 py-3 sm:px-6">
        <div class="flex flex-1 justify-between sm:hidden">
          <!-- Mobile pagination -->
          <button
            @click=${() => this.goToPage(this.currentPage - 1)}
            ?disabled=${this.currentPage === 1}
            class="relative inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            @click=${() => this.goToPage(this.currentPage + 1)}
            ?disabled=${this.currentPage === this.totalPages}
            class="relative ml-3 inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
          
          <div class="flex items-center space-x-2 justify-center w-full mt-8">
            <nav class="isolate inline-flex -space-x-px rounded-md" aria-label="Pagination">
              <!-- Previous button -->
              <button
                @click=${() => this.goToPage(this.currentPage - 1)}
                ?disabled=${this.currentPage === 1}
                class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-white hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Previous</span>
                ${AppIcon.renderIcon(ChevronLeft)}
              </button>

              <!-- Page numbers -->
              ${pageNumbers.map(page => {
                if (page === -1) {
                  return html`
                    <span class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300">
                      ...
                    </span>
                  `;
                }
                
                const isCurrentPage = page === this.currentPage;
                return html`
                  <button
                    @click=${() => this.goToPage(page)}
                    class="relative inline-flex items-center px-4 py-1 text-md ${
                      isCurrentPage
                        ? 'z-10 bg-orange-500 rounded-full text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
                        : 'text-gray-500 ring-white hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                    }"
                  >
                    ${page}
                  </button>
                `;
              })}

              <!-- Next button -->
              <button
                @click=${() => this.goToPage(this.currentPage + 1)}
                ?disabled=${this.currentPage === this.totalPages}
                class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-white hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Next</span>
                ${AppIcon.renderIcon(ChevronRight)}
              </button>
            </nav>
          </div>
        </div>
      </div>
    `;
  }
} 