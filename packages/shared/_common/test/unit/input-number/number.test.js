import { add, subtract, formatThousandths, canInputNumber, canSetValue, formatUnCompleteNumber } from '../../../js/input-number/number';

describe('add', () => {
  it('0.1 + 0.2', () => {
    expect(add(0.1, 0.2)).toBe(0.3);
  });

  it('0.45 + 0.12', () => {
    expect(add(0.45, 0.12)).toBe(0.57);
  });

  it('0.141423 + 0.242134', () => {
    expect(add(0.141423, 0.242134)).toBe(0.383557);
  });

  it('999.999999 + 8888.8888888', () => {
    expect(add(999.999999, 8888.8888888)).toBe(9888.8888878);
  });

  it('3 + 0.1', () => {
    expect(add(3, 0.1)).toBe(3.1);
  });

  it('-1 + 0.766', () => {
    expect(add(-1, 0.766)).toBe(-0.234);
  });

  it('-0.766 + 1', () => {
    expect(add(-0.766, 1)).toBe(0.234);
  });

  it('-1 + (-0.766)', () => {
    expect(add(-1, -0.766)).toBe(-1.766);
  });

  it('1 + 0.766', () => {
    expect(add(1, 0.766)).toBe(1.766);
  });

  it('1 + (-0.766)', () => {
    expect(add(1, -0.766)).toBe(0.234);
  });

  it('0 + (-0.766)', () => {
    expect(add(0, -0.766)).toBe(-0.766);
  });
});

describe('subtract', () => {
  it('0.1 - 0.2', () => {
    expect(subtract(0.1, 0.2)).toBe(-0.1);
  });

  it('0.3 - 0.1', () => {
    expect(subtract(0.3, 0.1)).toBe(0.2);
  });

  it('0.141423 - 0.242134', () => {
    expect(subtract(0.141423, 0.242134)).toBe(-0.100711);
  });

  it('999.999999 - 8888.8888888', () => {
    expect(subtract(999.999999, 8888.8888888)).toBe(-7888.8888898);
  });

  it('3 - 0.1', () => {
    expect(subtract(3, 0.1)).toBe(2.9);
  });

  it('1 - 0.766', () => {
    expect(subtract(1, 0.766)).toBe(0.234);
  });

  it('-1 - 0.766', () => {
    expect(subtract(-1, 0.766)).toBe(-1.766);
  });

  it('1 - (-0.766)', () => {
    expect(subtract(1, -0.766)).toBe(1.766);
  });

  it('-1 - (-0.766)', () => {
    expect(subtract(-1, -0.766)).toBe(-0.234);
  });
});

describe('formatThousandths', () => {
  it('111,222,000', () => {
    expect(formatThousandths('111,222,000')).toBe('111222000');
  });

  it('111.,000.1', () => {
    expect(formatThousandths('111.,000.1')).toBe('111.,000.1');
  });
});

describe('canInputNumber', () => {
  it('normal number empty', () => {
    expect(canInputNumber('')).toBe(true);
    expect(canInputNumber('0')).toBe(true);
    expect(canInputNumber('00')).toBe(false);
    expect(canInputNumber(undefined)).toBe(true);
    expect(canInputNumber(null)).toBe(true);
  });

  it('normal number can only have one minus signal', () => {
    expect(canInputNumber('3o3')).toBe(false);
    expect(canInputNumber('--3')).toBe(false);
    expect(canInputNumber('-3')).toBe(true);
    expect(canInputNumber('3-')).toBe(false);
  });

  it('normal number: count of . can not be over than 1', () => {
    expect(canInputNumber('1.3')).toBe(true);
    expect(canInputNumber('-1.3')).toBe(true);
    expect(canInputNumber('1.3.')).toBe(false);
    expect(canInputNumber('.1.3')).toBe(false);
    expect(canInputNumber('.1.3.')).toBe(false);
  });

  it('normal number: number letters are allowed', () => {
    expect(canInputNumber('-')).toBe(true);
    expect(canInputNumber('1.3e')).toBe(true);
    expect(canInputNumber('+1.22+++')).toBe(false);
    expect(canInputNumber('1.23E')).toBe(true);
    expect(canInputNumber('1.23E+')).toBe(true);
    expect(canInputNumber('1.23E+08')).toBe(true);
    expect(canInputNumber('2e')).toBe(true);
    expect(canInputNumber('2e3')).toBe(true);
    expect(canInputNumber('1.')).toBe(true);
    expect(canInputNumber('1.2E')).toBe(true);
    expect(canInputNumber('--')).toBe(false);
    expect(canInputNumber('e')).toBe(false);
    expect(canInputNumber('ee')).toBe(false);
  });
});

describe('canSetValue', () => {
  expect(canSetValue('2', 1)).toBe(true);
  expect(canSetValue('2', 1)).toBe(true);
  expect(canSetValue('2.0', 2)).toBe(false);
  expect(canSetValue('2.00', 2)).toBe(false);
  expect(canSetValue('2.3e', 2.3)).toBe(false);
  expect(canSetValue('2.3e10', 2.3)).toBe(true);
});

describe('formatUnCompleteNumber', () => {
  it('formatUnCompleteNumber: empty number', () => {
    expect(formatUnCompleteNumber('-')).toBe(undefined);
    expect(formatUnCompleteNumber('e')).toBe(undefined);
    expect(formatUnCompleteNumber('')).toBe(undefined);
    expect(formatUnCompleteNumber(undefined)).toBe(undefined);
    expect(formatUnCompleteNumber(null)).toBe(undefined);
  });

  it('formatUnCompleteNumber: last unValid num', () => {
    expect(formatUnCompleteNumber('2.')).toBe(2);
    expect(formatUnCompleteNumber('2e')).toBe(2);
    expect(formatUnCompleteNumber('2-')).toBe(2);
    expect(formatUnCompleteNumber('2+')).toBe(2);
    expect(formatUnCompleteNumber('412784781243273894.', { largeNumber: true })).toBe('412784781243273894');
  });

  it('formatUnCompleteNumber: largeNumber formatENumber', () => {
    expect(formatUnCompleteNumber('12345e3', { largeNumber: true })).toBe('12345000');
  });

  it('formatUnCompleteNumber: decimalPlaces', () => {
    expect(formatUnCompleteNumber('123')).toBe(123);
    expect(formatUnCompleteNumber('2.1231234')).toBe(2.1231234);
    expect(formatUnCompleteNumber('2.1231234', { decimalPlaces: 2 })).toBe(2.12);
  });

  it('formatUnCompleteNumber: decimalPlaces, isToFixed', () => {
    expect(formatUnCompleteNumber('2.000', { decimalPlaces: 2 })).toBe(2);
    expect(formatUnCompleteNumber('2.000', { decimalPlaces: 2, isToFixed: true })).toBe('2.00');
  });
});
