import { describe, it, expect } from 'vitest';
import props from '../props';

describe('Dropdown props validators', () => {
  it('direction validator returns true for empty', () => {
    // @ts-expect-error test empty val branch
    expect(props.direction.validator(undefined)).toBe(true);
  });
  it('direction validator accepts left/right', () => {
    expect(props.direction.validator('left')).toBe(true);
    expect(props.direction.validator('right')).toBe(true);
  });
  it('placement validator returns true for empty', () => {
    // @ts-expect-error test empty val branch
    expect(props.placement.validator(undefined)).toBe(true);
  });
  it('placement validator accepts all placements', () => {
    const placements = [
      'top','left','right','bottom',
      'top-left','top-right','bottom-left','bottom-right',
      'left-top','left-bottom','right-top','right-bottom'
    ] as const;
    placements.forEach((p) => expect(props.placement.validator(p)).toBe(true));
  });
  it('trigger validator returns true for empty', () => {
    // @ts-expect-error test empty val branch
    expect(props.trigger.validator(undefined)).toBe(true);
  });
  it('trigger validator accepts hover/click/focus/context-menu', () => {
    const triggers = ['hover','click','focus','context-menu'] as const;
    triggers.forEach((t) => expect(props.trigger.validator(t)).toBe(true));
  });
});