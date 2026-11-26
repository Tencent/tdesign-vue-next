import { expect, vi } from 'vitest';
import {
  toString,
  debounce,
  formatRowAttributes,
  formatRowClassNames,
  formatClassNames,
  getCurrentRowByKey,
  getLocalPaginationPageData,
  getAffixProps,
  INNER_PRE_NAME,
} from '@tdesign/components/table/utils';
import type { TableRowData, TableRowAttributes, TdBaseTableProps } from '@tdesign/components/table/type';

describe('TableUtils', () => {
  describe('toString', () => {
    it('normal type', () => {
      expect(toString({})).toBe('object');
      expect(toString([])).toBe('array');
      expect(toString('')).toBe('string');
      expect(toString(0)).toBe('number');
      expect(toString(null)).toBe('null');
      expect(toString(undefined)).toBe('undefined');
      expect(toString(() => {})).toBe('function');
    });
  });

  describe('debounce', () => {
    it('only the last call is executed', () => {
      vi.useFakeTimers();
      const fn = vi.fn();
      // debounce 返回值类型声明为 () => void，但实现会转发调用参数
      const debouncedFn = debounce(fn, 100) as (...args: unknown[]) => void;

      debouncedFn(1);
      debouncedFn(2);
      debouncedFn(3);
      expect(fn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith(3);
      vi.useRealTimers();
    });

    it('default delay is 200ms', () => {
      vi.useFakeTimers();
      const fn = vi.fn();
      const debouncedFn = debounce(fn);

      debouncedFn();
      vi.advanceTimersByTime(199);
      expect(fn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(1);
      expect(fn).toHaveBeenCalledTimes(1);
      vi.useRealTimers();
    });
  });

  describe('formatRowAttributes', () => {
    const params = { row: { id: 1 }, rowIndex: 0, type: 'body' as const };

    it('attributes is empty', () => {
      expect(formatRowAttributes(undefined, params)).toBe(undefined);
      expect(formatRowAttributes(null, params)).toBe(undefined);
    });

    it('attributes could be an object', () => {
      expect(formatRowAttributes({ 'data-level': 'level-1' }, params)).toEqual({ 'data-level': 'level-1' });
    });

    it('attributes could be an Array<object>', () => {
      const attrs = [{ 'data-level': 'level-1' }, { 'data-name': 'tdesign' }];
      expect(formatRowAttributes(attrs, params)).toEqual({ 'data-level': 'level-1', 'data-name': 'tdesign' });
    });

    it('attributes could be a function', () => {
      // HTMLElementAttributes 的属性值类型为 string
      const attrs: TdBaseTableProps['rowAttributes'] = ({ rowIndex }) => ({ 'data-index': String(rowIndex) });
      expect(formatRowAttributes(attrs, params)).toEqual({ 'data-index': '0' });
    });

    it('attributes could be a nested array', () => {
      const nestedAttrs: TableRowAttributes<TableRowData> = [{ 'data-level': 'level-1' }, { 'data-name': 'tdesign' }];
      const attrs: TdBaseTableProps['rowAttributes'] = [() => nestedAttrs as never];
      expect(formatRowAttributes(attrs, params)).toEqual({
        'data-level': 'level-1',
        'data-name': 'tdesign',
      });
    });

    it('empty item in array should be ignored', () => {
      const attrs = [null, undefined, { 'data-name': 'tdesign' }];
      expect(formatRowAttributes(attrs, params)).toEqual({ 'data-name': 'tdesign' });
    });
  });

  describe('formatRowClassNames', () => {
    const row = { id: 'row-1' };
    const params = { row, rowKey: 'id', rowIndex: 1, type: 'body' as const };

    it('className could be a string', () => {
      expect(formatRowClassNames('tdesign-class', params, 'id')).toEqual(['tdesign-class']);
    });

    it('className could be an object', () => {
      const result = formatRowClassNames({ 'tdesign-class': true, 'tdesign-class-next': false }, params, 'id');
      expect(result).toEqual([{ 'tdesign-class': true, 'tdesign-class-next': false }]);
    });

    it('className could be an array', () => {
      const result = formatRowClassNames(['class-a', 'class-b'], params, 'id');
      expect(result).toEqual(['class-a', 'class-b']);
    });

    it('className could be a function', () => {
      const result = formatRowClassNames(({ rowIndex }) => `class-${rowIndex}`, params, 'id');
      expect(result).toEqual(['class-1']);
    });

    it('className could be set by row index', () => {
      const result = formatRowClassNames({ 1: 'class-by-index' }, params, 'id');
      expect(result).toEqual(['class-by-index']);
    });

    it('className could be set by row value', () => {
      const result = formatRowClassNames({ 'row-1': 'class-by-row-value' }, params, 'id');
      expect(result).toEqual(['class-by-row-value']);
    });

    it('nested array className works fine', () => {
      const result = formatRowClassNames([['class-a', () => 'class-b']], params, 'id');
      expect(result).toEqual(['class-a', 'class-b']);
    });

    it('rowKey is empty, fallback to `id`', () => {
      const result = formatRowClassNames({ 'row-1': 'class-by-row-value' }, params, undefined);
      expect(result).toEqual(['class-by-row-value']);
    });
  });

  describe('formatClassNames', () => {
    const params = { row: { id: 1 }, col: { colKey: 'name' }, rowIndex: 0, colIndex: 0, type: 'td' as const };

    it('className could be a string', () => {
      expect(formatClassNames('td-class', params)).toEqual(['td-class']);
    });

    it('className could be an array', () => {
      expect(formatClassNames(['td-class', 'td-class-next'], params)).toEqual(['td-class', 'td-class-next']);
    });

    it('className could be a function', () => {
      expect(formatClassNames(({ colIndex }) => `td-${colIndex}`, params)).toEqual(['td-0']);
    });

    it('className could be mixed', () => {
      expect(formatClassNames(['td-class', () => 'td-fn-class'], params)).toEqual(['td-class', 'td-fn-class']);
    });
  });

  describe('INNER_PRE_NAME', () => {
    it('inner prefix name should not be changed', () => {
      expect(INNER_PRE_NAME).toBe('@@inner-');
    });
  });

  describe('getCurrentRowByKey', () => {
    const columns = [
      { colKey: 'first' },
      {
        colKey: 'group',
        children: [{ colKey: 'second' }, { colKey: 'third', children: [{ colKey: 'fourth' }] }],
      },
    ];

    it('columns or key is empty', () => {
      expect(getCurrentRowByKey(undefined, 'first')).toBe(undefined);
      expect(getCurrentRowByKey(columns, undefined)).toBe(undefined);
      expect(getCurrentRowByKey(columns, '')).toBe(undefined);
    });

    it('get first level column', () => {
      expect(getCurrentRowByKey(columns, 'first')).toEqual({ colKey: 'first' });
    });

    it('get column in multiple header', () => {
      expect(getCurrentRowByKey(columns, 'second')).toEqual({ colKey: 'second' });
      expect(getCurrentRowByKey(columns, 'fourth')).toEqual({ colKey: 'fourth' });
    });

    it('column does not exist', () => {
      expect(getCurrentRowByKey(columns, 'not-exist')).toBe(undefined);
    });
  });

  describe('getLocalPaginationPageData', () => {
    const data = Array.from({ length: 12 }, (_, index) => ({ id: index + 1 }));

    it('pagination is empty', () => {
      expect(getLocalPaginationPageData(data, undefined)).toHaveLength(12);
    });

    it('current and pageSize works fine', () => {
      expect(getLocalPaginationPageData(data, { current: 2, pageSize: 5 }).map((t) => t.id)).toEqual([6, 7, 8, 9, 10]);
    });

    it('defaultCurrent and defaultPageSize works fine', () => {
      const result = getLocalPaginationPageData(data, { defaultCurrent: 3, defaultPageSize: 5 });
      expect(result.map((t) => t.id)).toEqual([11, 12]);
    });

    it('default current is 1 and default pageSize is 10', () => {
      expect(getLocalPaginationPageData(data, {}).map((t) => t.id)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it('data length is not more than pageSize', () => {
      expect(getLocalPaginationPageData(data.slice(0, 5), { current: 1, pageSize: 5 })).toHaveLength(5);
    });

    it('disableDataPage works fine', () => {
      expect(getLocalPaginationPageData(data, { current: 1, pageSize: 5 }, true)).toHaveLength(12);
    });
  });

  describe('getAffixProps', () => {
    it('main affix props is an object', () => {
      expect(getAffixProps({ offsetTop: 10 }, { offsetTop: 20 })).toEqual({ offsetTop: 10 });
    });

    it('sub affix props is an object', () => {
      expect(getAffixProps(true, { offsetTop: 20 })).toEqual({ offsetTop: 20 });
    });

    it('none of them is an object', () => {
      expect(getAffixProps(true)).toEqual({});
      expect(getAffixProps(false, undefined)).toEqual({});
    });
  });
});
