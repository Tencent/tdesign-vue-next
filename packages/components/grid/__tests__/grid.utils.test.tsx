import { expect } from 'vitest';
import { getRowClasses, calcRowStyle, parseFlex, calcColPadding, getColClasses } from '@tdesign/components/grid/utils';
import type { TdRowProps, TdColProps } from '@tdesign/components/grid/type';

describe('Grid utils', () => {
  describe('getRowClasses', () => {
    it('base class', () => {
      const props: TdRowProps = {};
      const result = getRowClasses('t-row', props);
      expect(result[0]).toBe('t-row');
      expect((result[1] as Record<string, unknown>)['t-row--undefined']).toBeFalsy();
      expect((result[1] as Record<string, unknown>)['t-row--align-undefined']).toBeFalsy();
    });

    it('justify', () => {
      const justifyValues: TdRowProps['justify'][] = ['start', 'end', 'center', 'space-around', 'space-between'];
      justifyValues.forEach((justify) => {
        const result = getRowClasses('t-row', { justify, align: 'top' });
        expect((result[1] as Record<string, unknown>)[`t-row--${justify}`]).toBeTruthy();
      });
    });

    it('align', () => {
      const alignValues: TdRowProps['align'][] = [
        'start',
        'end',
        'center',
        'stretch',
        'baseline',
        'top',
        'middle',
        'bottom',
      ];
      alignValues.forEach((align) => {
        const result = getRowClasses('t-row', { justify: 'start', align });
        expect((result[1] as Record<string, unknown>)[`t-row--align-${align}`]).toBeTruthy();
      });
    });
  });

  describe('calcRowStyle', () => {
    it('gutter[number]', () => {
      expect(calcRowStyle(0, 'md')).toEqual({ marginLeft: '0px', marginRight: '0px' });
      expect(calcRowStyle(20, 'md')).toEqual({ marginLeft: '-10px', marginRight: '-10px' });
    });

    it('gutter[array]', () => {
      expect(calcRowStyle([20, 10], 'md')).toEqual({
        marginLeft: '-10px',
        marginRight: '-10px',
        rowGap: '10px',
      });

      expect(calcRowStyle([16], 'md')).toEqual({
        marginLeft: '-8px',
        marginRight: '-8px',
      });

      expect(calcRowStyle([] as any, 'md')).toEqual({});
    });

    it('gutter[object]', () => {
      const gutter = { xs: 8, sm: 16, md: 24, lg: 32, xl: 40, xxl: 48 };
      expect(calcRowStyle(gutter, 'xs')).toEqual({ marginLeft: '-4px', marginRight: '-4px' });
      expect(calcRowStyle(gutter, 'sm')).toEqual({ marginLeft: '-8px', marginRight: '-8px' });
      expect(calcRowStyle(gutter, 'md')).toEqual({ marginLeft: '-12px', marginRight: '-12px' });
      expect(calcRowStyle(gutter, 'lg')).toEqual({ marginLeft: '-16px', marginRight: '-16px' });
      expect(calcRowStyle(gutter, 'xxl')).toEqual({ marginLeft: '-24px', marginRight: '-24px' });
    });

    it('gutter[object] no matching size', () => {
      expect(calcRowStyle({ lg: 32 }, 'xs')).toEqual({});
    });

    it('gutter[array] with responsive objects', () => {
      const gutter = [
        { xs: 8, sm: 16, md: 24 },
        { xs: 4, sm: 8, md: 12 },
      ];
      expect(calcRowStyle(gutter, 'md')).toEqual({
        marginLeft: '-12px',
        marginRight: '-12px',
        rowGap: '12px',
      });
    });

    it('gutter[array] mixed [number, object]', () => {
      expect(calcRowStyle([20, { xs: 4, sm: 8, md: 12 }], 'sm')).toEqual({
        marginLeft: '-10px',
        marginRight: '-10px',
        rowGap: '8px',
      });
    });

    it('gutter[array] mixed [object, number]', () => {
      expect(calcRowStyle([{ xs: 8, sm: 16, md: 24 }, 10], 'sm')).toEqual({
        marginLeft: '-8px',
        marginRight: '-8px',
        rowGap: '10px',
      });
    });

    it('gutter[array] with undefined element', () => {
      const result = calcRowStyle([undefined, 10] as any, 'md');
      expect(result).toHaveProperty('rowGap', '10px');
    });
  });

  describe('parseFlex', () => {
    it('number', () => {
      expect(parseFlex(0)).toBe('0 0 0');
      expect(parseFlex(1)).toBe('1 1 0');
      expect(parseFlex(2)).toBe('2 2 0');
    });

    it('pixel/percentage/em/rem', () => {
      expect(parseFlex('100px')).toBe('0 0 100px');
      expect(parseFlex('50%')).toBe('0 0 50%');
      expect(parseFlex('10em')).toBe('0 0 10em');
      expect(parseFlex('5rem')).toBe('0 0 5rem');
      expect(parseFlex('10.5px')).toBe('0 0 10.5px');
    });

    it('complex string', () => {
      expect(parseFlex('1 1 200px')).toBe('1 1 200px');
      expect(parseFlex('auto')).toBe('auto');
      expect(parseFlex('none')).toBe('none');
    });
  });

  describe('calcColPadding', () => {
    it('gutter[number]', () => {
      expect(calcColPadding(0, 'md')).toEqual({ paddingLeft: '0px', paddingRight: '0px' });
      expect(calcColPadding(20, 'md')).toEqual({ paddingLeft: '10px', paddingRight: '10px' });
    });

    it('gutter[array]', () => {
      expect(calcColPadding([20, 10], 'md')).toEqual({ paddingLeft: '10px', paddingRight: '10px' });
      expect(calcColPadding([16], 'md')).toEqual({ paddingLeft: '8px', paddingRight: '8px' });
    });

    it('gutter[object]', () => {
      expect(calcColPadding({ xs: 8, sm: 16, md: 24, lg: 32 }, 'md')).toEqual({
        paddingLeft: '12px',
        paddingRight: '12px',
      });
    });

    it('gutter[array] with responsive object', () => {
      expect(calcColPadding([{ xs: 8, sm: 16, md: 24 }], 'sm')).toEqual({
        paddingLeft: '8px',
        paddingRight: '8px',
      });
    });

    it('gutter no matching size', () => {
      expect(calcColPadding({ lg: 32 }, 'xs')).toEqual({});
      expect(calcColPadding([{ lg: 32 }], 'xs')).toEqual({});
    });
  });

  describe('getColClasses', () => {
    it('span', () => {
      const result = getColClasses('t-col', { span: 6 });
      expect((result as Record<string, unknown>)['t-col']).toBe(true);
      expect((result as Record<string, unknown>)['t-col-6']).toBe(true);
    });

    it('undefined span', () => {
      const result = getColClasses('t-col', {});
      expect((result as Record<string, unknown>)['t-col']).toBe(true);
      expect((result as Record<string, unknown>)['t-col-undefined']).toBe(false);
    });

    it('offset/order/push/pull', () => {
      const result = getColClasses('t-col', { span: 6, offset: 3, order: 2, push: 3, pull: 2 });
      expect((result as Record<string, unknown>)['t-col-offset-3']).toBe(3);
      expect((result as Record<string, unknown>)['t-col-order-2']).toBe(2);
      expect((result as Record<string, unknown>)['t-col-push-3']).toBe(3);
      expect((result as Record<string, unknown>)['t-col-pull-2']).toBe(2);
    });

    it('zero values for offset/order/push/pull', () => {
      const result = getColClasses('t-col', { span: 6, offset: 0, order: 0, push: 0, pull: 0 });
      expect((result as Record<string, unknown>)['t-col-offset-0']).toBe(0);
      expect((result as Record<string, unknown>)['t-col-order-0']).toBe(0);
      expect((result as Record<string, unknown>)['t-col-push-0']).toBe(0);
      expect((result as Record<string, unknown>)['t-col-pull-0']).toBe(0);
    });

    it('responsive[number]', () => {
      const props: TdColProps = { xs: 12, sm: 8, md: 6, lg: 4, xl: 3, xxl: 2 };
      const result = getColClasses('t-col', props);
      expect((result as Record<string, unknown>)['t-col-xs-12']).toBe(true);
      expect((result as Record<string, unknown>)['t-col-sm-8']).toBe(true);
      expect((result as Record<string, unknown>)['t-col-md-6']).toBe(true);
      expect((result as Record<string, unknown>)['t-col-lg-4']).toBe(true);
      expect((result as Record<string, unknown>)['t-col-xl-3']).toBe(true);
      expect((result as Record<string, unknown>)['t-col-xxl-2']).toBe(true);
    });

    it('responsive[object]', () => {
      const result = getColClasses('t-col', {
        xs: { span: 12, offset: 0 },
        md: { span: 6, offset: 3, order: 1, push: 2, pull: 1 },
      });
      expect((result as Record<string, unknown>)['t-col-xs-12']).toBe(true);
      expect((result as Record<string, unknown>)['t-col-xs-offset-0']).toBe(true);
      expect((result as Record<string, unknown>)['t-col-md-6']).toBe(true);
      expect((result as Record<string, unknown>)['t-col-md-offset-3']).toBe(true);
      expect((result as Record<string, unknown>)['t-col-md-order-1']).toBe(true);
      expect((result as Record<string, unknown>)['t-col-md-push-2']).toBe(true);
      expect((result as Record<string, unknown>)['t-col-md-pull-1']).toBe(true);
    });

    it('responsive[object] with zero order', () => {
      const result = getColClasses('t-col', { xs: { span: 12, order: 0 } });
      expect((result as Record<string, unknown>)['t-col-xs-12']).toBe(true);
      expect((result as Record<string, unknown>)['t-col-xs-order-0']).toBe(true);
    });
  });
});
