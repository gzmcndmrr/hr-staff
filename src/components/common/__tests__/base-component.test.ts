import { test, expect, vi } from 'vitest';
import { html, fixture } from '@open-wc/testing';
import i18n from '@/utils/i18n';
import { BaseComponent } from '@/components/common/base-component.ts';

vi.spyOn(i18n, 'on');
vi.spyOn(i18n, 'off');

class TestComponent extends BaseComponent {
  override render() {
    return html`<div>Test</div>`;
  }
  
  public testGetCurrentLanguage() {
    return this.getCurrentLanguage();
  }
}

customElements.define('test-component', TestComponent);

test('BaseComponent registers and unregisters language change listener', async () => {
  const el = await fixture<TestComponent>(
    html`<test-component></test-component>`
  );

  expect(i18n.on).toHaveBeenCalledWith('languageChanged', expect.any(Function));

  el.remove();

  expect(i18n.off).toHaveBeenCalledWith('languageChanged', expect.any(Function));
});

test('getCurrentLanguage() calls i18n.getCurrentLanguage()', async () => {
    const mockGetCurrentLanguage = vi.spyOn(
      await import('@/utils/i18n'),
      'getCurrentLanguage'
    ).mockReturnValue('tr');
  
    const instance = new TestComponent();
    const result = instance.testGetCurrentLanguage();
  
    expect(mockGetCurrentLanguage).toHaveBeenCalled();
    expect(result).toBe('tr');
  });