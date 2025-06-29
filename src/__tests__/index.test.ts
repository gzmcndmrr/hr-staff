import { describe, test, expect } from 'vitest';
import * as StoreModule from '@/index';

describe('re-exported store module', () => {
  test('should export store object', () => {
    expect(StoreModule.store).toBeDefined();
    expect(typeof StoreModule.store.getState).toBe('function');
  });
});
