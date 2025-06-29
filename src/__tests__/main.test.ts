import { test, expect, vi, beforeEach } from 'vitest';

vi.mock('@/utils/i18n', () => ({
  initI18n: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('@/router/router', () => ({
  initRouter: vi.fn()
}));

beforeEach(() => {
  document.body.innerHTML = `<div id="app"></div>`;
});

test('inserts #router-outlet into #app and initializes i18n and router', async () => {
  const { initI18n } = await import('@/utils/i18n');
  const { initRouter } = await import('@/router/router');
  await import('../main');

  const app = document.querySelector('#app')!;
  expect(app.innerHTML).toContain('router-outlet');

  expect(initI18n).toHaveBeenCalled();

  await new Promise(resolve => setTimeout(resolve, 10));

  expect(initRouter).toHaveBeenCalled();
});
