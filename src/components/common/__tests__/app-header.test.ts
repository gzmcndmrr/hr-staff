import { it, expect, vi } from 'vitest';
import { html, LitElement } from 'lit';
import { fixture } from '@open-wc/testing';
import '@/components/common/app-header.ts';
import { showAddNew, showEmployeeList, store } from '@/store/store';

it('should render header with employee and addNew buttons', async () => {
  const el = await fixture<HTMLDivElement>(
    html`<app-header title="Test Title"></app-header>`
  );

  const root = el.shadowRoot ?? el;

  const employeeButton = root.querySelector('#employees');
  const addNewButton = root.querySelector('#addNew');

  expect(employeeButton).to.exist;
  expect(addNewButton).to.exist;

  const heading = root.querySelector('h1');
  expect(heading?.textContent).to.include('Test Title');
});

it('should dispatch showEmployeeList when #employees button is clicked', async () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    
    const el = await fixture<HTMLDivElement>(
        html`<app-header title="Test Title"></app-header>`
      );
        await (el as unknown as LitElement).updateComplete;
  
    const root = el.shadowRoot ?? el;
    const employeeBtn = root.querySelector('#employees') as HTMLButtonElement;
    const addNewBtn = root.querySelector('#addNew') as HTMLButtonElement;

    employeeBtn?.click();
    expect(dispatchSpy).toHaveBeenCalledWith(showEmployeeList());

    addNewBtn?.click();
    expect(dispatchSpy).toHaveBeenCalledWith(showAddNew());
  });
  
