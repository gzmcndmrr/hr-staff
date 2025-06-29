import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@/components/common/base-component.js';
import { LanguageCode, LANGUAGE_NAMES, LANGUAGES } from './language-switcher.type.js';
import { LANGUAGE_CODES } from '@/utils/common.js';

@customElement('language-switcher')
export class LanguageSwitcher extends BaseComponent {
  private getOtherLanguage(): LanguageCode {
    return this.currentLanguage === LANGUAGE_CODES.TR ? LANGUAGE_CODES.EN : LANGUAGE_CODES.TR;
  }

  private getOtherLanguageName(): string {
    const otherLang = this.getOtherLanguage();
    return LANGUAGE_NAMES[otherLang];
  }

  private getOtherLanguageFlag(): string {
    const otherLang = this.getOtherLanguage();
    return LANGUAGES[otherLang].flag;
  }

  private async toggleLanguage(): Promise<void> {
    const otherLanguage = this.getOtherLanguage();
    await this.changeLanguage(otherLanguage);
  }

  override render() {
    const otherLanguageName = this.getOtherLanguageName();
    const otherLanguageFlag = this.getOtherLanguageFlag();
    
    return html`
      <button 
        class="flex items-center px-1 py-3 bg-white rounded-md cursor-pointer text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
        @click=${this.toggleLanguage}
        aria-label=${this.tCommon('actions.changeLanguage', { defaultValue: 'Change Language' })}
      >
        <img 
          src="${otherLanguageFlag}" 
          alt="${otherLanguageName}" 
          class="w-5 h-4 rounded-sm object-cover"
        />
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'language-switcher': LanguageSwitcher;
  }
} 