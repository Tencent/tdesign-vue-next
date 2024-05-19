import { largeNumberAdd } from '../../../js/input-number/large-number';

/**
 * 支持任意两个数相加，支持小数
 */
describe('largeNumberAdd', () => {
  it('0.1 + 0.2', () => {
    expect(largeNumberAdd('0.1', '0.2')).toBe('0.3');
  });

  it('0 + 0.2345678', () => {
    expect(largeNumberAdd('0', '0.2345678')).toBe('0.2345678');
  });

  it('0.2345678 + 0', () => {
    expect(largeNumberAdd('0.2345678', '0')).toBe('0.2345678');
  });

  it('0.9 + 0.1', () => {
    expect(largeNumberAdd('0.9', '0.1')).toBe('1');
  });

  it('5.0383412673418000000 + 0.1', () => {
    expect(largeNumberAdd('5.0383412673418000000', '0.1')).toBe(String((5.0383412673418000000 + 0.1)));
  });

  it('0.0 + 0.0', () => {
    expect(largeNumberAdd('0.0', '0.0')).toBe(String((0.0 + 0.0)));
  });

  it('0.22 + 0.88', () => {
    expect(largeNumberAdd('0.22', '0.88')).toBe(String((0.22 + 0.88)));
  });

  it('0.2222222288888888 + 0.88', () => {
    expect(largeNumberAdd('0.2222222288888888', '0.88')).toBe(String((0.2222222288888888 + 0.88)));
  });

  it('0.12 + 0.1', () => {
    expect(largeNumberAdd('0.12', '0.1')).toBe(String((0.12 + 0.1)));
  });

  it('0.99 + 0.1', () => {
    expect(largeNumberAdd('0.99', '0.1')).toBe(String((0.99 + 0.1)));
  });

  it('1234.1234 + 543.12312212313', () => {
    expect(largeNumberAdd('1234.1234', '543.12312212313')).toBe(String((1234.1234 + 543.12312212313)));
  });

  it('0 + 0', () => {
    expect(largeNumberAdd('0', '0')).toBe(String(0 + 0));
  });

  it('0 + 1', () => {
    expect(largeNumberAdd('0', '1')).toBe(String(0 + 1));
  });

  it('1 + 1', () => {
    expect(largeNumberAdd('1', '1')).toBe(String(1 + 1));
  });

  it('10 + 1', () => {
    expect(largeNumberAdd('10', '1')).toBe(String(10 + 1));
  });

  it('9 + 1', () => {
    expect(largeNumberAdd('9', '1')).toBe(String(9 + 1));
  });

  it('99 + 1', () => {
    expect(largeNumberAdd('99', '1')).toBe(String(99 + 1));
  });

  it('88 + 22', () => {
    expect(largeNumberAdd('88', '22')).toBe(String(88 + 22));
  });

  it('41241234.111 + 56252345.999', () => {
    expect(largeNumberAdd('41241234.111', '56252345.999')).toBe(String(41241234.111 + 56252345.999));
  });

  it('99999 + 99999', () => {
    expect(largeNumberAdd('99999', '99999')).toBe(String(99999 + 99999));
  });

  it('100000000 + 99999', () => {
    expect(largeNumberAdd('100000000', '99999')).toBe(String(100000000 + 99999));
  });

  it('-41241234.111 + 56252345.999', () => {
    expect(largeNumberAdd('-41241234.111', '56252345.999')).toBe(String(15011111.888));
  });

  it('-41241234.111 + (-56252345.999)', () => {
    expect(largeNumberAdd('-41241234.111', '-56252345.999')).toBe(String(-97493580.11));
  });

  it('41241234.111 + 56252345.999', () => {
    expect(largeNumberAdd('41241234.111', '56252345.999')).toBe(String(97493580.11));
  });

  it('41241234.111 + (-56252345.999)', () => {
    expect(largeNumberAdd('41241234.111', '-56252345.999')).toBe(String(-15011111.888));
  });
});
