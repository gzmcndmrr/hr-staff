import { TableStaffColumn } from "./table.type";

export const tableStaffColumns: TableStaffColumn[] = [
  { key: 'firstName', header: 'First Name' },
  { key: 'lastName', header: 'Last Name' },
  { key: 'dateOfEmployment', header: 'Date of Employment' },
  { key: 'dateOfBirth', header: 'Date of Birth' },
  { key: 'phone', header: 'Phone' },
  { key: 'email', header: 'Email' },
  { key: 'department', header: 'Department' },
  { key: 'position', header: 'Position' },
  { key: 'actions', header: 'Actions' }
];

export const headerColumnClass = "px-6 py-3 text-left text-xs font-medium text-orange-500 border-b border-gray-200";

export const DEFAULT_CURRENT_PAGE = 1;
export const DEFAULT_ITEMS_PER_PAGE = 10;
export const MAX_VISIBLE_PAGES = 5;
