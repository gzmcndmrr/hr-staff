import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '../../common/base-component.js';
import { createElement } from 'lucide';

export interface IconConfig {
  size?: number;
  class?: string;
  stroke?: string;
  'stroke-width'?: number;
  fill?: string;
  [key: string]: any; // lucide için ek özellikler
}

@customElement('app-icon')
export class AppIcon extends BaseComponent {
  @property({ type: Object })
  iconComponent: any = null;

  @property({ type: Number })
  size?: number;

  @property({ type: String })
  class?: string;

  @property({ type: String })
  stroke?: string;

  @property({ type: Number, attribute: 'stroke-width' })
  strokeWidth?: number;

  @property({ type: String })
  fill?: string;

  private get defaultConfig() {
    return {
      size: 20,
      class: 'h-5 w-5',
      stroke: 'currentColor',
      'stroke-width': 2,
      fill: 'none'
    };
  }

  private get actualConfig() {
    const defaults = this.defaultConfig;
    return {
      size: this.size ?? defaults.size,
      class: this.class ?? defaults.class,
      stroke: this.stroke ?? defaults.stroke,
      'stroke-width': this.strokeWidth ?? defaults['stroke-width'],
      fill: this.fill ?? defaults.fill
    };
  }

  private renderIcon() {
    if (!this.iconComponent) {
      return html``;
    }

    const config = this.actualConfig;
    const iconElement = createElement(this.iconComponent, config);
    
    return html`${iconElement}`;
  }

  override render() {
    return this.renderIcon();
  }

  static renderIcon(iconComponent: any, config: IconConfig = {}) {
    const defaultConfig = {
      size: 20,
      class: 'h-5 w-5',
      stroke: 'currentColor',
      'stroke-width': 2,
      fill: 'none',
      ...config
    };

    const iconElement = createElement(iconComponent, defaultConfig);
    return html`${iconElement}`;
  }
} 