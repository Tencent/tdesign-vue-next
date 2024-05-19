import { largeIntNumberAdd } from '../../../js/input-number/large-number';

describe('largeIntNumberAdd', () => {
  it('0 + 0', () => {
    expect(largeIntNumberAdd('0', '0')).toBe(String(0 + 0));
  });

  it('0 + 1', () => {
    expect(largeIntNumberAdd('0', '1')).toBe(String(0 + 1));
  });

  it('1 + 1', () => {
    expect(largeIntNumberAdd('1', '1')).toBe(String(1 + 1));
  });

  it('10 + 1', () => {
    expect(largeIntNumberAdd('10', '1')).toBe(String(10 + 1));
  });

  it('9 + 1', () => {
    expect(largeIntNumberAdd('9', '1')).toBe(String(9 + 1));
  });

  it('99 + 1', () => {
    expect(largeIntNumberAdd('99', '1')).toBe(String(99 + 1));
  });

  it('88 + 22', () => {
    expect(largeIntNumberAdd('88', '22')).toBe(String(88 + 22));
  });

  it('41241234 + 56252345', () => {
    expect(largeIntNumberAdd('41241234', '56252345')).toBe(String(41241234 + 56252345));
  });

  it('99999 + 99999', () => {
    expect(largeIntNumberAdd('99999', '99999')).toBe(String(99999 + 99999));
  });

  it('100000000 + 99999', () => {
    expect(largeIntNumberAdd('100000000', '99999')).toBe(String(100000000 + 99999));
  });
});
