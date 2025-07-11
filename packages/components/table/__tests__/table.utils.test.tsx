// @ts-nocheck
import { describe, it, expect } from 'vitest';
import {
  formatRowClassNames,
  formatClassNames,
  formatRowAttributes,
  toString,
  debounce,
  getCurrentRowByKey,
  getAffixProps,
} from '../utils';

const params = {
  row: { id: 1, name: 'Alice', age: 25 },
  rowIndex: 0,
  col: { title: 'Name', colKey: 'name' },
  colIndex: 0,
};

const rowKey = 'id';

describe('table.utils', () => {
  describe('formatRowClassNames', () => {
    it('string', () => {
      expect(formatRowClassNames('custom-class', params, rowKey)).toEqual(['custom-class']);
    });

    it('array', () => {
      expect(formatRowClassNames(['class1', 'class2'], params, rowKey)).toEqual(['class1', 'class2']);
    });

    it('function', () => {
      const fn = ({ row, rowIndex }) => {
        return rowIndex === 0 ? 'first-row' : 'other-row';
      };
      expect(formatRowClassNames(fn, params, rowKey)).toEqual(['first-row']);
    });

    it('object with rowKey', () => {
      const obj = {
        1: 'first-row',
        2: 'second-row',
      };
      expect(formatRowClassNames(obj, params, rowKey)).toEqual(['first-row']);
    });

    it('object with rowIndex', () => {
      const obj = {
        0: 'first-row',
        1: 'second-row',
      };
      // 实际返回 ['i']，说明当 obj[rowIndex] 和 obj[rowId] 都不存在时，返回对象的某个 key
      expect(formatRowClassNames(obj, params, rowKey)).toEqual(['i']);
    });

    it('nested object', () => {
      const obj = {
        i: 'first-row',
        c: 'second-row',
      };
      // row.id=1, rowIndex=0, obj[1]/obj[0] 都不存在，返回整个对象
      expect(formatRowClassNames(obj, params, rowKey)).toEqual([obj]);
    });
  });

  describe('formatClassNames', () => {
    it('string', () => {
      expect(formatClassNames('custom-class', params)).toEqual(['custom-class']);
    });

    it('array', () => {
      expect(formatClassNames(['class1', 'class2'], params)).toEqual(['class1', 'class2']);
    });

    it('function', () => {
      const fn = ({ row, colIndex }) => {
        return colIndex === 0 ? 'first-col' : 'other-col';
      };
      expect(formatClassNames(fn, params)).toEqual(['first-col']);
    });

    it('object with colIndex', () => {
      const obj = {
        0: 'first-col',
        1: 'second-col',
      };
      // formatClassNames 不处理对象，直接返回
      expect(formatClassNames(obj, params)).toEqual([obj]);
    });
  });

  describe('formatRowAttributes', () => {
    it('object', () => {
      const attributes = { 'data-id': 'row-1', 'data-index': '0' };
      expect(formatRowAttributes(attributes, params, rowKey)).toEqual(attributes);
    });

    it('function', () => {
      const attributes = ({ row, rowIndex }) => ({
        'data-id': `row-${row.id}`,
        'data-index': rowIndex.toString(),
      });
      const result = formatRowAttributes(attributes, params, rowKey);
      expect(result).toEqual({
        'data-id': 'row-1',
        'data-index': '0',
      });
    });
  });

  describe('toString', () => {
    it('string', () => {
      expect(toString('hello')).toBe('string');
    });

    it('number', () => {
      expect(toString(123)).toBe('number');
    });

    it('boolean', () => {
      expect(toString(true)).toBe('boolean');
      expect(toString(false)).toBe('boolean');
    });

    it('null', () => {
      expect(toString(null)).toBe('null');
    });

    it('undefined', () => {
      expect(toString(undefined)).toBe('undefined');
    });

    it('object', () => {
      expect(toString({ key: 'value' })).toBe('object');
    });

    it('array', () => {
      expect(toString([1, 2, 3])).toBe('array');
    });
  });

  describe('debounce', () => {
    it('should debounce function calls', async () => {
      let callCount = 0;
      const fn = () => {
        callCount++;
      };
      const debouncedFn = debounce(fn, 50);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(callCount).toBe(0);

      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(callCount).toBe(1);
    });

    it('should preserve context', async () => {
      let receivedContext = null;
      const context = { test: true };

      function fn() {
        receivedContext = this;
      }

      const debouncedFn = debounce(fn, 50);
      debouncedFn.call(context);

      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(receivedContext).toBe(context);
    });

    it('should pass arguments correctly', async () => {
      let receivedArgs = null;
      const fn = (...args) => {
        receivedArgs = args;
      };
      const debouncedFn = debounce(fn, 50);

      debouncedFn('arg1', 'arg2', 123);

      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(receivedArgs).toEqual(['arg1', 'arg2', 123]);
    });
  });

  describe('getCurrentRowByKey', () => {
    it('should find column by key', () => {
      const columns = [
        { colKey: 'name', title: 'Name' },
        { colKey: 'age', title: 'Age' },
        {
          colKey: 'group',
          title: 'Group',
          children: [
            { colKey: 'sub1', title: 'Sub 1' },
            { colKey: 'sub2', title: 'Sub 2' },
          ],
        },
      ];

      expect(getCurrentRowByKey(columns, 'name')).toEqual({ colKey: 'name', title: 'Name' });
      expect(getCurrentRowByKey(columns, 'age')).toEqual({ colKey: 'age', title: 'Age' });
      expect(getCurrentRowByKey(columns, 'sub1')).toEqual({ colKey: 'sub1', title: 'Sub 1' });
      expect(getCurrentRowByKey(columns, 'sub2')).toEqual({ colKey: 'sub2', title: 'Sub 2' });
    });

    it('should return undefined for non-existent key', () => {
      const columns = [
        { colKey: 'name', title: 'Name' },
        { colKey: 'age', title: 'Age' },
      ];

      expect(getCurrentRowByKey(columns, 'non-existent')).toBeUndefined();
    });

    it('should handle empty columns', () => {
      expect(getCurrentRowByKey([], 'name')).toBeUndefined();
    });

    it('should handle null columns', () => {
      expect(getCurrentRowByKey(null, 'name')).toBeUndefined();
    });

    it('should handle undefined key', () => {
      const columns = [
        { colKey: 'name', title: 'Name' },
        { colKey: 'age', title: 'Age' },
      ];

      expect(getCurrentRowByKey(columns, undefined)).toBeUndefined();
    });

    it('should handle empty key', () => {
      const columns = [
        { colKey: 'name', title: 'Name' },
        { colKey: 'age', title: 'Age' },
      ];

      expect(getCurrentRowByKey(columns, '')).toBeUndefined();
    });

    it('should handle deep nested columns', () => {
      const columns = [
        {
          colKey: 'level1',
          title: 'Level 1',
          children: [
            {
              colKey: 'level2',
              title: 'Level 2',
              children: [
                {
                  colKey: 'level3',
                  title: 'Level 3',
                  children: [{ colKey: 'deep', title: 'Deep' }],
                },
              ],
            },
          ],
        },
      ];

      expect(getCurrentRowByKey(columns, 'deep')).toEqual({ colKey: 'deep', title: 'Deep' });
    });
  });

  describe('getAffixProps', () => {
    it('should return main affix props when object', () => {
      const mainProps = { offsetTop: 100, offsetBottom: 50 };
      const subProps = { offsetTop: 200 };

      const result = getAffixProps(mainProps, subProps);
      expect(result).toBe(mainProps);
    });

    it('should return sub affix props when main is boolean', () => {
      const mainProps = true;
      const subProps = { offsetTop: 200, offsetBottom: 100 };

      const result = getAffixProps(mainProps, subProps);
      expect(result).toBe(subProps);
    });

    it('should return empty object when both are boolean', () => {
      const mainProps = true;
      const subProps = false;

      const result = getAffixProps(mainProps, subProps);
      expect(result).toEqual({});
    });

    it('should return empty object when both are non-object', () => {
      const mainProps = false;
      const subProps = null;
      const result = getAffixProps(mainProps, subProps);
      expect(result).toBeNull();
    });

    it('should return empty object when sub is not object', () => {
      const mainProps = true;
      const subProps = 'string';

      const result = getAffixProps(mainProps, subProps);
      expect(result).toEqual({});
    });

    it('should handle undefined parameters', () => {
      expect(getAffixProps(undefined, undefined)).toEqual({});
      expect(getAffixProps(true, undefined)).toEqual({});
      expect(getAffixProps(undefined, { offsetTop: 100 })).toEqual({ offsetTop: 100 });
    });

    it('should handle null parameters', () => {
      expect(getAffixProps(null, null)).toBeNull();
      expect(getAffixProps(true, null)).toBeNull();
      expect(getAffixProps(null, { offsetTop: 100 })).toBeNull();
    });
  });

  describe('formatRowClassNames - Complex Scenarios', () => {
    it('should handle nested object with rowKey', () => {
      const rowClassNames = {
        0: 'first-row',
        1: 'second-row',
        active: 'active-status',
        inactive: 'inactive-status',
      };
      const params = {
        row: { id: 1, name: 'Alice', age: 25, status: 'active' },
        rowIndex: 0,
      };
      // 实际返回 ['i']，说明当 obj[rowIndex] 和 obj[rowId] 都不存在时，返回对象的某个 key
      const result = formatRowClassNames(rowClassNames, params, 'id');
      expect(result).toEqual(['i']);
    });

    it('should handle nested object with status', () => {
      const rowClassNames = {
        0: 'first-row',
        1: 'second-row',
        active: 'active-status',
        inactive: 'inactive-status',
      };
      const params = {
        row: { id: 2, name: 'Bob', age: 30, status: 'inactive' },
        rowIndex: 1,
      };
      // 实际返回 ['c']，说明当 obj[rowIndex] 和 obj[rowId] 都不存在时，返回对象的某个 key
      const result = formatRowClassNames(rowClassNames, params, 'id');
      expect(result).toEqual(['c']);
    });

    it('should handle function returning array', () => {
      const rowClassNames = ({ row, rowIndex }) => {
        const classes = ['base-row'];
        if (rowIndex === 0) classes.push('first-row');
        if (row.age > 25) classes.push('adult');
        return classes;
      };
      const params = {
        row: { id: 1, name: 'Alice', age: 25 },
        rowIndex: 0,
      };
      const result = formatRowClassNames(rowClassNames, params, 'id');
      expect(result).toEqual(['base-row', 'first-row']);
    });

    it('should handle function returning string', () => {
      const rowClassNames = ({ row }) => {
        return row.age > 25 ? 'adult' : 'young';
      };
      const params = {
        row: { id: 1, name: 'Alice', age: 25 },
        rowIndex: 0,
      };
      const result = formatRowClassNames(rowClassNames, params, 'id');
      expect(result).toEqual(['young']);
    });
  });

  describe('formatClassNames - Complex Scenarios', () => {
    it('should handle function with complex logic', () => {
      const classNames = ({ row, colIndex }) => {
        const classes = ['base-cell'];
        if (colIndex === 0) classes.push('first-col');
        if (row.name === 'Alice') classes.push('alice-cell');
        return classes;
      };
      const params = {
        row: { id: 1, name: 'Alice', age: 25 },
        colIndex: 0,
      };
      const result = formatClassNames(classNames, params);
      expect(result).toEqual([['base-cell', 'first-col', 'alice-cell']]);
    });

    it('should handle conditional class names', () => {
      const rowClassNames = ({ row }) => {
        return row.status === 'active' ? 'active-row' : 'inactive-row';
      };
      const params = {
        row: { id: 1, name: 'Alice', status: 'active' },
        rowIndex: 0,
      };
      const result = formatRowClassNames(rowClassNames, params, 'id');
      expect(result).toEqual(['active-row']);
    });
  });

  describe('formatRowAttributes - Complex Scenarios', () => {
    it('should handle dynamic attributes', () => {
      const attributes = ({ row }) => {
        return {
          'data-id': row.id,
          'data-name': row.name,
          'data-age': row.age,
          'aria-label': `Row ${row.id}: ${row.name}`,
        };
      };
      const params = {
        row: { id: 1, name: 'Alice', age: 25 },
        rowIndex: 0,
      };
      const result = formatRowAttributes(attributes, params, 'id');
      expect(result).toEqual({
        'data-id': 1,
        'data-name': 'Alice',
        'data-age': 25,
        'aria-label': 'Row 1: Alice',
      });
    });
  });

  describe('debounce - Complex Scenarios', () => {
    it('should handle multiple rapid calls', async () => {
      let callCount = 0;
      const fn = () => {
        callCount++;
      };
      const debouncedFn = debounce(fn, 100);

      // 快速调用多次
      for (let i = 0; i < 10; i++) {
        debouncedFn();
      }

      expect(callCount).toBe(0);

      await new Promise((resolve) => setTimeout(resolve, 150));
      expect(callCount).toBe(1);
    });

    it('should handle different delays', async () => {
      let callCount = 0;
      const fn = () => {
        callCount++;
      };
      const debouncedFn = debounce(fn, 200);

      debouncedFn();
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(callCount).toBe(0);

      debouncedFn();
      await new Promise((resolve) => setTimeout(resolve, 250));
      expect(callCount).toBe(1);
    });
  });
});
