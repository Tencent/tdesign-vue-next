import { largeNumberSubtract } from '../../../js/input-number/large-number';

describe('largeNumberSubtract', () => {
  it('0.1 - 0.2', () => {
    expect(largeNumberSubtract('0.1', '0.2')).toBe(String(-0.1));
  });

  it('3 - 0.1', () => {
    expect(largeNumberSubtract('3', '0.1')).toBe(String(2.9));
  });

  it('3 - 0.11', () => {
    expect(largeNumberSubtract('3', '0.11')).toBe(String(2.89));
  });

  it('1 - 2', () => {
    expect(largeNumberSubtract('1', '2')).toBe(String(-1));
  });

  it('1 - 99', () => {
    expect(largeNumberSubtract('1', '99')).toBe(String(1 - 99));
  });

  it('1000 - 2', () => {
    expect(largeNumberSubtract('1000', '2')).toBe(String(1000 - 2));
  });

  it('0 - 0.2345678', () => {
    expect(largeNumberSubtract('0', '0.2345678')).toBe('-0.2345678');
  });

  it('0.2345678 - 0', () => {
    expect(largeNumberSubtract('0.2345678', '0')).toBe('0.2345678');
  });

  it('100000000 - 1', () => {
    expect(largeNumberSubtract('100000000', '1')).toBe(String(100000000 - 1));
  });

  it('99 - 1', () => {
    expect(largeNumberSubtract('99', '1')).toBe(String(99 - 1));
  });

  it('41234 - 31234', () => {
    expect(largeNumberSubtract('41234', '31234')).toBe(String(41234 - 31234));
  });

  it('42143.11111 - 31234.999', () => {
    expect(largeNumberSubtract('42143.11111', '31234.999')).toBe(String(10908.11211));
  });

  it('42143, 31234.999', () => {
    expect(largeNumberSubtract('42143', '31234.999')).toBe(String(10908.001));
  });

  it('1, 31234.999', () => {
    expect(largeNumberSubtract('1', '31234.999')).toBe(String(1 - 31234.999));
  });

  it('0, 0.999', () => {
    expect(largeNumberSubtract('0', '0.999')).toBe(String(0 - 0.999));
  });

  it('0 - 0.2', () => {
    expect(largeNumberSubtract('0', '0.2')).toBe(String(-0.2));
  });

  it('0.2222 - 0.888', () => {
    expect(largeNumberSubtract('0.2222', '0.888')).toBe(String(0.2222 - 0.888));
  });

  it('0.888, 0.2222', () => {
    expect(largeNumberSubtract('0.888', '0.2222')).toBe(String(0.888 - 0.2222));
  });

  it('0.2 - 0.2222', () => {
    expect(largeNumberSubtract('0.2', '0.2222')).toBe(String(-0.0222));
  });

  it('0.999 - 0.1', () => {
    expect(largeNumberSubtract('0.999', '0.1')).toBe(String(0.999 - 0.1));
  });

  it('0.1 - 0.999', () => {
    expect(largeNumberSubtract('0.1', '0.999')).toBe(String(0.1 - 0.999));
  });

  it('-0.6658 - 0.888', () => {
    expect(largeNumberSubtract('-0.6658', '0.888')).toBe(String(-1.5538));
  });

  it('-0.6658 - (-0.888)', () => {
    expect(largeNumberSubtract('-0.6658', '-0.888')).toBe(String(0.2222));
  });

  it('0.6658 - (-0.888)', () => {
    expect(largeNumberSubtract('0.6658', '-0.888')).toBe(String(1.5538));
  });

  it('0.6658 - 0.888', () => {
    expect(largeNumberSubtract('0.6658', '0.888')).toBe(String(-0.2222));
  });

  it('0.1 - (-0.2)', () => {
    expect(largeNumberSubtract('0.1', '-0.2')).toBe(String(0.3));
  });
});
