import { expect, fixture, html } from '@open-wc/testing';
import { beforeEach, describe, it, vi } from 'vitest';
import '../components/employee-form.ts';
import { LitElement } from 'lit';
import { store } from '@/store/store.ts';
import { EmployeeForm } from '../components/employee-form.ts';
import { addEmployee, updateEmployee } from '@/store/slices/employeeSlice';
import { testEmployeeFormData, testEmployeesData } from '@/test-setup';

describe('EmployeeForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
it('should render first name input field', async () => {
  const el = await fixture(
    html`<employee-form></employee-form>`
  );
  await (el as LitElement).updateComplete;

  const root = el.shadowRoot ?? el;

  const input = root.querySelector('input[id="firstName"]');
  expect(input).to.exist;
});

it('should display error message when field has validation error', async () => {
  const el = await fixture(
    html`<employee-form></employee-form>`
  );
  await (el as LitElement).updateComplete;

  const root = el.shadowRoot ?? el;
  
  const emailInput = root.querySelector('input[id="email"]') as HTMLInputElement;
  expect(emailInput).to.exist;

  emailInput.value = 'invalid-email';
  emailInput.dispatchEvent(new Event('input'));
  
  emailInput.dispatchEvent(new Event('blur'));
  
  await (el as LitElement).updateComplete;

  const errorMessage = root.querySelector('p.text-red-600');
  expect(errorMessage).to.exist;
  expect(errorMessage?.textContent).to.include('email');
});

it('should dispatch addEmployee and return correct employee when adding new employee to store', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    const form = new EmployeeForm();
  
    const result = (form as any).addNewEmployeeToStore(testEmployeeFormData.addNew);
  
    expect(dispatchSpy.mock.calls.length).to.be.greaterThan(0);
    const dispatchedArg = dispatchSpy.mock.calls[0]?.[0];
    expect(dispatchedArg).to.exist;
    expect(dispatchedArg?.type).to.equal(addEmployee.type);
   
    expect(result.firstName).to.equal('Gizem');
    expect(result.email).to.equal('gizem@example.com');
  });

it('should handle employee updates correctly', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    
    const formWithId = new EmployeeForm();
    formWithId.employeeId = 1;
  
    const resultWithId = (formWithId as any).updateEmployeeInStore(testEmployeeFormData.update);
  
    expect(dispatchSpy.mock.calls.length).to.be.greaterThan(0);
    const dispatchedArg = dispatchSpy.mock.calls[0]?.[0];
    expect(dispatchedArg).to.exist;
    expect(dispatchedArg?.type).to.equal(updateEmployee.type);
   
    expect(resultWithId).to.exist;
    expect(resultWithId?.firstName).to.equal('Updated Gizem');
    expect(resultWithId?.email).to.equal('updated.gizem@example.com');
    expect(resultWithId?.id).to.equal('1');
    
    const formWithoutId = new EmployeeForm();
  
    const resultWithoutId = (formWithoutId as any).updateEmployeeInStore(testEmployeeFormData.withoutId);
  
    expect(resultWithoutId).to.be.undefined;
  });

it('should return correct unique ID', () => {
  const form = new EmployeeForm();
  
  const mockGetStateEmpty = vi.spyOn(store, 'getState').mockReturnValue({
    employee: {
      employees: []
    }
  } as any);

  const resultEmpty = (form as any).generateUniqueId();

  expect(resultEmpty).to.equal(1);
  
  mockGetStateEmpty.mockRestore();
  
  // Test with existing employees
  const mockGetStateWithEmployees = vi.spyOn(store, 'getState').mockReturnValue({
    employee: {
      employees: testEmployeesData.forUniqueId
    }
  } as any);

  const resultWithEmployees = (form as any).generateUniqueId();

  expect(resultWithEmployees).to.equal(6);
  
  mockGetStateWithEmployees.mockRestore();
});

it('should return correct employee count', () => {
  const form = new EmployeeForm();
  
  const mockGetStateWithEmployees = vi.spyOn(store, 'getState').mockReturnValue({
    employee: {
      employees: testEmployeesData.forCount
    }
  } as any);

  const resultWithEmployees = form.getCurrentEmployeeCount();

  expect(resultWithEmployees).to.equal(3);
  
  mockGetStateWithEmployees.mockRestore();
  
  const mockGetStateEmpty = vi.spyOn(store, 'getState').mockReturnValue({
    employee: {
      employees: []
    }
  } as any);

  const resultEmpty = form.getCurrentEmployeeCount();

  expect(resultEmpty).to.equal(0);
  
  mockGetStateEmpty.mockRestore();
});

it('should return employees from store', () => {
  const form = new EmployeeForm();
  
  const mockGetStateWithEmployees = vi.spyOn(store, 'getState').mockReturnValue({
    employee: {
      employees: testEmployeesData.fullList
    }
  } as any);

  const resultWithEmployees = form.getAllEmployees();

  expect(resultWithEmployees).to.deep.equal(testEmployeesData.fullList);
  expect(resultWithEmployees.length).to.equal(3);
  
  mockGetStateWithEmployees.mockRestore();
  
  const mockGetStateEmpty = vi.spyOn(store, 'getState').mockReturnValue({
    employee: {
      employees: []
    }
  } as any);

  const resultEmpty = form.getAllEmployees();

  expect(resultEmpty).to.deep.equal([]);
  expect(resultEmpty.length).to.equal(0);
  
  mockGetStateEmpty.mockRestore();
});
});