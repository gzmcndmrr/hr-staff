import { expect, fixture, html } from '@open-wc/testing';
import { beforeEach, describe, it, vi } from 'vitest';
import '../components/employee-grid.ts';
import { LitElement } from 'lit';

describe('EmployeeGrid', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
it('renders employee first and last name', async () => {
  const mockEmployee = {
    firstName: 'Gizem',
    lastName: 'Candemir',
    department: 'Engineering',
    position: 'Staff Frontend Engineer',
    email: 'gizem@example.com',
    phone: '+90 111 123 45 65',
    dateOfBirth: '1993-01-01',
    dateOfEmployment: '2020-05-10',
  };

  const el = await fixture(
    html`<employee-grid .employees=${[mockEmployee]}></employee-grid>`
  );
  await (el as LitElement).updateComplete;

  const root = el.shadowRoot ?? el;

  expect(root.textContent).to.include('Gizem');
  expect(root.textContent).to.include('Candemir');
});
});