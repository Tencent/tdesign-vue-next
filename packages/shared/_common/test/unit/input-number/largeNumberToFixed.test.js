import { largeNumberToFixed } from '../../../js/input-number/large-number';

/**
 * 仅支持正整数
 */
describe('largeNumberToFixed', () => {
  it('0', () => {
    expect(largeNumberToFixed('0')).toBe('0');
  });

  it('0.5', () => {
    expect(largeNumberToFixed('0.5')).toBe('1');
  });

  it('0.555', () => {
    expect(largeNumberToFixed('0.555', 2)).toBe('0.56');
  });

  it('0.999', () => {
    expect(largeNumberToFixed('0.999')).toBe('1');
  });

  it('12', () => {
    expect(largeNumberToFixed('12')).toBe('12');
  });

  it('12.999', () => {
    expect(largeNumberToFixed('12.999')).toBe('13');
  });

  it('12.566', () => {
    expect(largeNumberToFixed('12.566')).toBe('13');
  });

  it('12.566', () => {
    expect(largeNumberToFixed('12.566', 1)).toBe('12.6');
  });

  it('12', () => {
    expect(largeNumberToFixed('12', 1)).toBe('12.0');
  });

  it('12', () => {
    expect(largeNumberToFixed('12', 5)).toBe('12.00000');
  });

  it('12.1234', () => {
    expect(largeNumberToFixed('12.1234', 2)).toBe('12.12');
  });

  it('12.1567', () => {
    expect(largeNumberToFixed('12.1567', 2)).toBe('12.16');
  });

  it('20000000000000001.0', () => {
    expect(largeNumberToFixed('20000000000000001.0', 2, true)).toBe('20000000000000001.00');
  });
});
