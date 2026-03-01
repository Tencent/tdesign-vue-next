import { describe, it, expect } from 'vitest';
import { getRowClasses, calcRowStyle, parseFlex, calcColPadding, getColClasses } from '@tdesign/components/grid/utils';
import type { TdRowProps, TdColProps } from '@tdesign/components/grid/type';

describe('Grid utils', () => {
  describe('getRowClasses', () => {
    it('base class with default props', () => {
      const props: TdRowProps = { justify: 'start', align: 'top' };
      const result = getRowClasses('t-row', props);
      expect(result).toContain('t-row');
    });

    it('justify class', () => {
      const props: TdRowProps = { justify: 'center', align: 'top' };
      const result = getRowClasses('t-row', props);
      expect(result[0]).toBe('t-row');
      expect((result[1] as Record<string, unknown>)['t-row--center']).toBeTruthy();
      expect((result[1] as Record<string, unknown>)['t-row--align-top']).toBeTruthy();
    });

    it('align class', () => {
      const props: TdRowProps = { justify: 'start', align: 'middle' };
      const result = getRowClasses('t-row', props);
      expect((result[1] as Record<string, unknown>)['t-row--align-middle']).toBeTruthy();
    });

    it('all justify values', () => {
      const justifyValues: TdRowProps['justify'][] = ['start', 'end', 'center', 'space-around', 'space-between'];
      justifyValues.forEach((justify) => {
        const props: TdRowProps = { justify, align: 'top' };
        const result = getRowClasses('t-row', props);
        expect((result[1] as Record<string, unknown>)[`t-row--${justify}`]).toBeTruthy();
      });
    });

    it('all align values', () => {
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
        const props: TdRowProps = { justify: 'start', align };
        const result = getRowClasses('t-row', props);
        expect((result[1] as Record<string, unknown>)[`t-row--align-${align}`]).toBeTruthy();
      });
    });

    it('empty justify and align', () => {
      const props: TdRowProps = {};
      const result = getRowClasses('t-row', props);
      expect(result[0]).toBe('t-row');
      expect((result[1] as Record<string, unknown>)['t-row--undefined']).toBeFalsy();
      expect((result[1] as Record<string, unknown>)['t-row--align-undefined']).toBeFalsy();
    });
  });

  describe('calcRowStyle', () => {
    it('gutter 0', () => {
      const result = calcRowStyle(0, 'md');
      expect(result).toEqual({
        marginLeft: '0px',
        marginRight: '0px',
      });
    });

    it('gutter[number]', () => {
      const result = calcRowStyle(20, 'md');
      expect(result).toEqual({
        marginLeft: '-10px',
        marginRight: '-10px',
      });
    });

    it('gutter[array] with [horizontal, vertical]', () => {
      const result = calcRowStyle([20, 10], 'md');
      expect(result).toEqual({
        marginLeft: '-10px',
        marginRight: '-10px',
        rowGap: '10px',
      });
    });

    it('gutter[array] horizontal only', () => {
      const result = calcRowStyle([16], 'md');
      expect(result).toEqual({
        marginLeft: '-8px',
        marginRight: '-8px',
      });
    });

    it('gutter[object] responsive values', () => {
      const gutter = { xs: 8, sm: 16, md: 24, lg: 32 };
      const result = calcRowStyle(gutter, 'md');
      expect(result).toEqual({
        marginLeft: '-12px',
        marginRight: '-12px',
      });
    });

    it('gutter[object] different breakpoints', () => {
      const gutter = { xs: 8, sm: 16, md: 24, lg: 32, xl: 40, xxl: 48 };
      expect(calcRowStyle(gutter, 'xs')).toEqual({
        marginLeft: '-4px',
        marginRight: '-4px',
      });
      expect(calcRowStyle(gutter, 'lg')).toEqual({
        marginLeft: '-16px',
        marginRight: '-16px',
      });
    });

    it('gutter[array] with responsive objects', () => {
      const gutter = [
        { xs: 8, sm: 16, md: 24 },
        { xs: 4, sm: 8, md: 12 },
      ];
      const result = calcRowStyle(gutter, 'md');
      expect(result).toEqual({
        marginLeft: '-12px',
        marginRight: '-12px',
        rowGap: '12px',
      });
    });

    it('gutter[array] mixed [number, object]', () => {
      const gutter = [20, { xs: 4, sm: 8, md: 12 }];
      const result = calcRowStyle(gutter, 'sm');
      expect(result).toEqual({
        marginLeft: '-10px',
        marginRight: '-10px',
        rowGap: '8px',
      });
    });

    it('gutter[array] mixed [object, number]', () => {
      const gutter = [{ xs: 8, sm: 16, md: 24 }, 10];
      const result = calcRowStyle(gutter, 'sm');
      expect(result).toEqual({
        marginLeft: '-8px',
        marginRight: '-8px',
        rowGap: '10px',
      });
    });

    it('gutter[object] no matching size', () => {
      const gutter = { lg: 32 };
      const result = calcRowStyle(gutter, 'xs');
      expect(result).toEqual({});
    });

    it('gutter[object] plain object with currentSize', () => {
      // This tests the isObject strategy when gutter is a plain object
      const gutter = { xs: 8, sm: 16, md: 24, lg: 32, xl: 40, xxl: 48 };

      // Test each breakpoint
      expect(calcRowStyle(gutter, 'xs')).toEqual({ marginLeft: '-4px', marginRight: '-4px' });
      expect(calcRowStyle(gutter, 'sm')).toEqual({ marginLeft: '-8px', marginRight: '-8px' });
      expect(calcRowStyle(gutter, 'xxl')).toEqual({ marginLeft: '-24px', marginRight: '-24px' });
    });

    it('gutter[array] empty', () => {
      const gutter: any[] = [];
      const result = calcRowStyle(gutter, 'md');
      expect(result).toEqual({});
    });

    it('gutter[array] with undefined', () => {
      const gutter = [undefined, 10];
      const result = calcRowStyle(gutter as any, 'md');
      // First element undefined, so only rowGap from second element
      expect(result).toHaveProperty('rowGap', '10px');
    });
  });

  describe('parseFlex', () => {
    it('flex[number]', () => {
      expect(parseFlex(1)).toBe('1 1 0');
      expect(parseFlex(2)).toBe('2 2 0');
      expect(parseFlex(0)).toBe('0 0 0');
    });

    it('flex[percentage]', () => {
      expect(parseFlex('50%')).toBe('0 0 50%');
      expect(parseFlex('100%')).toBe('0 0 100%');
    });

    it('flex[pixel]', () => {
      expect(parseFlex('100px')).toBe('0 0 100px');
      expect(parseFlex('200px')).toBe('0 0 200px');
    });

    it('flex[em/rem]', () => {
      expect(parseFlex('10em')).toBe('0 0 10em');
      expect(parseFlex('5rem')).toBe('0 0 5rem');
    });

    it('flex[string] complex', () => {
      expect(parseFlex('1 1 200px')).toBe('1 1 200px');
      expect(parseFlex('auto')).toBe('auto');
      expect(parseFlex('none')).toBe('none');
    });

    it('flex[decimal]', () => {
      expect(parseFlex('10.5px')).toBe('0 0 10.5px');
      expect(parseFlex('50.5%')).toBe('0 0 50.5%');
    });
  });

  describe('calcColPadding', () => {
    it('gutter 0', () => {
      const result = calcColPadding(0, 'md');
      expect(result).toEqual({
        paddingLeft: '0px',
        paddingRight: '0px',
      });
    });

    it('gutter[number]', () => {
      const result = calcColPadding(20, 'md');
      expect(result).toEqual({
        paddingLeft: '10px',
        paddingRight: '10px',
      });
    });

    it('gutter[array] with numbers', () => {
      const result = calcColPadding([20, 10], 'md');
      expect(result).toEqual({
        paddingLeft: '10px',
        paddingRight: '10px',
      });
    });

    it('gutter[array] horizontal only', () => {
      const result = calcColPadding([16], 'md');
      expect(result).toEqual({
        paddingLeft: '8px',
        paddingRight: '8px',
      });
    });

    it('gutter[object] responsive values', () => {
      const gutter = { xs: 8, sm: 16, md: 24, lg: 32 };
      const result = calcColPadding(gutter, 'md');
      expect(result).toEqual({
        paddingLeft: '12px',
        paddingRight: '12px',
      });
    });

    it('gutter[array] with responsive object', () => {
      const gutter = [{ xs: 8, sm: 16, md: 24 }];
      const result = calcColPadding(gutter, 'sm');
      expect(result).toEqual({
        paddingLeft: '8px',
        paddingRight: '8px',
      });
    });

    it('gutter[object] no matching size', () => {
      const gutter = { lg: 32 };
      const result = calcColPadding(gutter, 'xs');
      expect(result).toEqual({});
    });

    it('gutter[array] no matching size', () => {
      const gutter = [{ lg: 32 }];
      const result = calcColPadding(gutter, 'xs');
      expect(result).toEqual({});
    });
  });

  describe('getColClasses', () => {
    it('base class with span', () => {
      const props: TdColProps = { span: 6 };
      const result = getColClasses('t-col', props);
      expect((result as Record<string, unknown>)['t-col']).toBe(true);
      expect((result as Record<string, unknown>)['t-col-6']).toBe(true);
    });

    it('offset prop', () => {
      const props: TdColProps = { span: 6, offset: 3 };
      const result = getColClasses('t-col', props);
      expect((result as Record<string, unknown>)['t-col-6']).toBe(true);
      expect((result as Record<string, unknown>)['t-col-offset-3']).toBe(3);
    });

    it('order prop', () => {
      const props: TdColProps = { span: 6, order: 2 };
      const result = getColClasses('t-col', props);
      expect((result as Record<string, unknown>)['t-col-order-2']).toBe(2);
    });

    it('push and pull props', () => {
      const props: TdColProps = { span: 6, push: 3, pull: 2 };
      const result = getColClasses('t-col', props);
      expect((result as Record<string, unknown>)['t-col-push-3']).toBe(3);
      expect((result as Record<string, unknown>)['t-col-pull-2']).toBe(2);
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

    it('responsive[object] with span', () => {
      const props: TdColProps = {
        xs: { span: 12, offset: 0 },
        md: { span: 6, offset: 3 },
      };
      const result = getColClasses('t-col', props);
      expect((result as Record<string, unknown>)['t-col-xs-12']).toBe(true);
      expect((result as Record<string, unknown>)['t-col-xs-offset-0']).toBe(true);
      expect((result as Record<string, unknown>)['t-col-md-6']).toBe(true);
      expect((result as Record<string, unknown>)['t-col-md-offset-3']).toBe(true);
    });

    it('responsive[object] with order, push, pull', () => {
      const props: TdColProps = {
        md: { span: 6, order: 1, push: 2, pull: 1 },
      };
      const result = getColClasses('t-col', props);
      expect((result as Record<string, unknown>)['t-col-md-6']).toBe(true);
      expect((result as Record<string, unknown>)['t-col-md-order-1']).toBe(true);
      expect((result as Record<string, unknown>)['t-col-md-push-2']).toBe(true);
      expect((result as Record<string, unknown>)['t-col-md-pull-1']).toBe(true);
    });

    it('undefined span', () => {
      const props: TdColProps = {};
      const result = getColClasses('t-col', props);
      expect((result as Record<string, unknown>)['t-col']).toBe(true);
      expect((result as Record<string, unknown>)['t-col-undefined']).toBe(false);
    });

    it('zero values for offset, order, push, pull', () => {
      const props: TdColProps = { span: 6, offset: 0, order: 0, push: 0, pull: 0 };
      const result = getColClasses('t-col', props);
      expect((result as Record<string, unknown>)['t-col-6']).toBe(true);
      expect((result as Record<string, unknown>)['t-col-offset-0']).toBe(0);
      expect((result as Record<string, unknown>)['t-col-order-0']).toBe(0);
      expect((result as Record<string, unknown>)['t-col-push-0']).toBe(0);
      expect((result as Record<string, unknown>)['t-col-pull-0']).toBe(0);
    });

    it('responsive[object] with zero order', () => {
      const props: TdColProps = {
        xs: { span: 12, order: 0 },
      };
      const result = getColClasses('t-col', props);
      expect((result as Record<string, unknown>)['t-col-xs-12']).toBe(true);
      expect((result as Record<string, unknown>)['t-col-xs-order-0']).toBe(true);
    });
  });
});
