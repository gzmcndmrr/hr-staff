import { LitElement } from 'lit';

export abstract class BaseComponent extends LitElement {
  override createRenderRoot() {
    return this;
  }
} 