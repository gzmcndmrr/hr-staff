import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { t, getCurrentLanguage, changeLanguage, translateWithPath, formatDate, formatCurrency } from '@/utils/i18n';
import i18n from '@/utils/i18n';

export abstract class BaseComponent extends LitElement {
  @property({ type: String }) currentLanguage = getCurrentLanguage();

  override createRenderRoot() {
    return this;
  }

  override connectedCallback() {
    super.connectedCallback();
        i18n.on('languageChanged', this.handleLanguageChange.bind(this));
    this.currentLanguage = getCurrentLanguage();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    i18n.off('languageChanged', this.handleLanguageChange.bind(this));
  }

  private handleLanguageChange(lng: string) {
    this.currentLanguage = lng;
    this.requestUpdate();
  }

  protected t(key: string, options?: any, namespace?: string): string {
    return t(key, options, namespace);
  }

  protected tPath(key: string, options?: any): string {
    const componentName = this.constructor.name.replace(/([A-Z])/g, '-$1').toLowerCase().slice(1);
    return translateWithPath(`components/${componentName}.ts`, key, options);
  }

  protected tEmployee(key: string, options?: any): string {
    return t(key, options, 'Employee');
  }

  protected tCommon(key: string, options?: any): string {
    return t(key, options, 'Common');
  }

  protected formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
    return formatDate(date, options);
  }

  protected formatCurrency(amount: number, currency?: string): string {
    return formatCurrency(amount, currency);
  }

  protected async changeLanguage(lng: string): Promise<void> {
    await changeLanguage(lng);
    this.currentLanguage = lng;
    this.requestUpdate();
  }

  protected getCurrentLanguage(): string {
    return getCurrentLanguage();
  }
} 