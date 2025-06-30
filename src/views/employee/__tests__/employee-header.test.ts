import { expect, fixture, html } from '@open-wc/testing';
import { it, beforeEach, vi, expect as vitestExpect, describe } from 'vitest';
import { LitElement } from 'lit';
import { store, setViewMode } from '@/store/store.js';
import '../components/employee-header.ts';


describe('EmployeeHeader', () => {
beforeEach(() => {
  vi.clearAllMocks();
});
it('renders given title prop', async () => {
    const el = await fixture(
      html`<employee-header title="Test Başlık"></employee-header>`
    );
    await (el as LitElement).updateComplete;
      
    const root = el.shadowRoot ?? el;
   
    const h1 = root.querySelector('h1');
    expect(h1).to.exist;
    expect(h1!.textContent).to.include('Test Başlık');
  });

  it('clicking grid button dispatches setViewMode("grid")', async () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
  
    const el = await fixture(
      html`<employee-header></employee-header>`
    );
    await (el as LitElement).updateComplete;
  
    const root = el.shadowRoot ?? el;
  
    const buttons = root.querySelectorAll('button');
    const gridButton = Array.from(buttons).find(btn =>
      btn.getAttribute('title')?.toLowerCase().includes('grid')
    );
  
    expect(gridButton).to.exist;
  
    gridButton!.click();
  
    vitestExpect(dispatchSpy).toHaveBeenCalledWith(setViewMode('grid'));
  });
});
