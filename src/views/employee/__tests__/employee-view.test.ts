import { expect, fixture, html } from '@open-wc/testing';
import { it, vi, beforeEach } from 'vitest';
import { store } from '@/store/store';
import { type RootState } from '@/store/store';
import '@/views/employee/employee-view.ts';

beforeEach(() => {
  vi.resetAllMocks();
});

it('should render app-header, employee-header and app-table when in list view', async () => {
  vi.spyOn(store, 'getState').mockReturnValue({
    employee: {
      viewMode: 'list',
      employees: [],
      currentView: 'employeeList',
      selectedEmployeeId: null
    }
  } as unknown as RootState);

  const el = await fixture(
    html`<employee-view></employee-view>`
  );

  const root = el.shadowRoot ?? el;

  expect(root.querySelector('app-header')).to.exist;
  expect(root.querySelector('employee-header')).to.exist;
  expect(root.querySelector('app-table')).to.exist;
  expect(root.querySelector('employee-grid')).to.not.exist;
  expect(root.querySelector('employee-form')).to.not.exist;
});
