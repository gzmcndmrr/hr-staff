import { describe, it, expect } from 'vitest';
import { createCard } from '@/components/ui/card/app-card.ts';

describe('AppCard', () => {
  it('should render a card with correct size and content', () => {
    const cardEl = createCard({
      size: 'small',
      children: 'Hello Card',
      className: 'custom-class'
    }).render();

    expect(cardEl).toBeInstanceOf(HTMLElement);
    expect(cardEl.tagName).toBe('DIV');
    expect(cardEl.innerHTML).toBe('Hello Card');

    expect(cardEl.className).toContain('p-3');
    expect(cardEl.className).toContain('text-sm');
    expect(cardEl.className).toContain('custom-class');
  });
});
