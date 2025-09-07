import { describe, it, expect } from 'vitest';
import {
  findTopNode,
  getTransferListOption,
  getDataValues,
  getTransferData,
  cloneTreeWithFilter,
  filterTransferData,
  getLefCount,
  isTreeNodeValid,
  SOURCE,
  TARGET,
  TRANSFER_NAME,
} from '../utils';
import type { TransferItemOption, DataOption } from '../types';

describe('Transfer utils', () => {
  describe('Constants', () => {
    it('should export correct constants', () => {
      expect(SOURCE).toBe('source');
      expect(TARGET).toBe('target');
      expect(TRANSFER_NAME).toBe('TTransfer');
    });
  });

  describe('findTopNode', () => {
    it('should return self if component name is t-transfer', () => {
      const vm = {
        $options: { name: 't-transfer' },
        $parent: null,
      } as any;

      expect(findTopNode(vm)).toBe(vm);
    });

    it('should find parent with t-transfer name', () => {
      const transferVm = {
        $options: { name: 't-transfer' },
        $parent: null,
      } as any;

      const childVm = {
        $options: { name: 'child-component' },
        $parent: transferVm,
      } as any;

      expect(findTopNode(childVm)).toBe(transferVm);
    });

    it('should return root if no t-transfer found', () => {
      const rootVm = {
        $options: { name: 'root' },
        $parent: null,
      } as any;

      const childVm = {
        $options: { name: 'child' },
        $parent: rootVm,
      } as any;

      expect(findTopNode(childVm)).toBe(rootVm);
    });
  });

  describe('getTransferListOption', () => {
    it('should handle array input', () => {
      const input = ['source-value', 'target-value'];
      const result = getTransferListOption(input);

      expect(result).toEqual({
        source: 'source-value',
        target: 'target-value',
      });
    });

    it('should handle single value input', () => {
      const input = 'same-value';
      const result = getTransferListOption(input);

      expect(result).toEqual({
        source: 'same-value',
        target: 'same-value',
      });
    });

    it('should handle object input', () => {
      const input = { key: 'value' };
      const result = getTransferListOption(input);

      expect(result).toEqual({
        source: { key: 'value' },
        target: { key: 'value' },
      });
    });
  });

  describe('getDataValues', () => {
    const flatData: TransferItemOption[] = [
      { value: '1', label: 'Item 1', disabled: false, key: 'key_1', data: {} },
      { value: '2', label: 'Item 2', disabled: true, key: 'key_2', data: {} },
      { value: '3', label: 'Item 3', disabled: false, key: 'key_3', data: {} },
      { value: '4', label: 'Item 4', disabled: false, key: 'key_4', data: {} },
    ];

    const treeData: TransferItemOption[] = [
      {
        value: '1',
        label: 'Parent 1',
        disabled: false,
        key: 'key_1',
        data: {},
        children: [
          { value: '1.1', label: 'Child 1.1', disabled: false, key: 'key_1_1', data: {} },
          { value: '1.2', label: 'Child 1.2', disabled: true, key: 'key_1_2', data: {} },
        ],
      },
      {
        value: '2',
        label: 'Parent 2',
        disabled: false,
        key: 'key_2',
        data: {},
        children: [{ value: '2.1', label: 'Child 2.1', disabled: false, key: 'key_2_1', data: {} }],
      },
    ];

    describe('flat mode', () => {
      it('should filter values with include=true', () => {
        const filterValues = ['1', '3', '5'];
        const result = getDataValues(flatData, filterValues);

        expect(result).toEqual(['1', '3']);
      });

      it('should filter values with include=false', () => {
        const filterValues = ['1', '3'];
        const result = getDataValues(flatData, filterValues, { include: false });

        expect(result).toEqual(['4']); // '2' is disabled so excluded
      });

      it('should handle disabled items with remainValue', () => {
        const filterValues = ['1', '2', '3'];
        const result = getDataValues(flatData, filterValues, {
          include: false,
          remainValue: ['2'],
        });

        expect(result).toEqual(['4']); // '2' is disabled and not in remainValue for this case
      });

      it('should handle empty data', () => {
        const result = getDataValues([], ['1', '2']);
        expect(result).toEqual([]);
      });
    });

    describe('tree mode', () => {
      it('should get leaf node values with include=true', () => {
        const filterValues = ['1.1', '2.1'];
        const result = getDataValues(treeData, filterValues, { isTreeMode: true });

        expect(result).toEqual(['1.1', '2.1']);
      });

      it('should get leaf node values with include=false', () => {
        const filterValues = ['1.1'];
        const result = getDataValues(treeData, filterValues, {
          isTreeMode: true,
          include: false,
        });

        expect(result).toEqual(['1.2', '2.1']); // All leaf nodes except '1.1', including disabled '1.2'
      });

      it('should handle parent node filtering', () => {
        const filterValues = ['1'];
        const result = getDataValues(treeData, filterValues, { isTreeMode: true });

        expect(result).toEqual([]); // Parent nodes are not leaf nodes
      });

      it('should handle disabled leaf nodes', () => {
        const filterValues = ['1.2'];
        const result = getDataValues(treeData, filterValues, { isTreeMode: true });

        expect(result).toEqual([]); // Disabled node excluded
      });
    });
  });

  describe('getTransferData', () => {
    const rawData: DataOption[] = [
      { label: 'Item 1', value: '1', disabled: false },
      { label: 'Item 2', value: '2', disabled: true },
      { label: 'Item 3', value: '3' }, // no disabled field
    ];

    const treeRawData: DataOption[] = [
      {
        label: 'Parent 1',
        value: '1',
        children: [
          { label: 'Child 1.1', value: '1.1' },
          { label: 'Child 1.2', value: '1.2', disabled: true },
        ],
      },
    ];

    it('should transform flat data correctly', () => {
      const result = getTransferData(rawData, undefined, false);

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({
        label: 'Item 1',
        value: '1',
        key: 'key__value_1_index_0',
        disabled: false,
        data: rawData[0],
      });
      expect(result[2].disabled).toBe(false); // default disabled value
    });

    it('should handle custom keys', () => {
      const customData = [{ name: 'Custom Item', id: 'custom1', isDisabled: true }];

      const keys = {
        label: 'name',
        value: 'id',
        disabled: 'isDisabled',
      };

      const result = getTransferData(customData, keys, false);

      expect(result[0]).toEqual({
        label: 'Custom Item',
        value: 'custom1',
        key: 'key__value_custom1_index_0',
        disabled: true,
        data: customData[0],
      });
    });

    it('should handle tree mode', () => {
      const result = getTransferData(treeRawData, undefined, true);

      expect(result).toHaveLength(1);
      expect(result[0].children).toHaveLength(2);
      expect(result[0].children![0]).toEqual({
        label: 'Child 1.1',
        value: '1.1',
        key: 'key__value_1.1_index_0',
        disabled: false,
        data: treeRawData[0].children![0],
      });
    });

    it('should throw error when label key is missing', () => {
      const invalidData = [{ value: '1' }];

      expect(() => getTransferData(invalidData, undefined, false)).toThrow('label is not in DataOption');
    });

    it('should throw error when value key is missing', () => {
      const invalidData = [{ label: 'Item' }];

      expect(() => getTransferData(invalidData, undefined, false)).toThrow('value is not in DataOption');
    });

    it('should throw error when custom key is missing', () => {
      const data = [{ name: 'Item', value: '1' }];
      const keys = { label: 'title', value: 'value' }; // 'title' doesn't exist

      expect(() => getTransferData(data, keys, false)).toThrow('title is not in DataOption');
    });
  });

  describe('isTreeNodeValid', () => {
    const nodeWithChildren: TransferItemOption = {
      value: 'parent',
      label: 'Parent',
      disabled: false,
      key: 'key_parent',
      data: {},
      children: [
        { value: 'child1', label: 'Child 1', disabled: false, key: 'key_child1', data: {} },
        { value: 'child2', label: 'Child 2', disabled: false, key: 'key_child2', data: {} },
      ],
    };

    const leafNode: TransferItemOption = {
      value: 'leaf',
      label: 'Leaf',
      disabled: false,
      key: 'key_leaf',
      data: {},
    };

    it('should return needMatch when node value matches', () => {
      expect(isTreeNodeValid(leafNode, ['leaf'], true)).toBe(true);
      expect(isTreeNodeValid(leafNode, ['leaf'], false)).toBe(false);
    });

    it('should return !needMatch when node value does not match and no children', () => {
      expect(isTreeNodeValid(leafNode, ['other'], true)).toBe(false);
      expect(isTreeNodeValid(leafNode, ['other'], false)).toBe(true);
    });

    it('should check children when node has children', () => {
      expect(isTreeNodeValid(nodeWithChildren, ['child1'], true)).toBe(true);
      expect(isTreeNodeValid(nodeWithChildren, ['child1'], false)).toBe(true);
      expect(isTreeNodeValid(nodeWithChildren, ['other'], true)).toBe(false);
      expect(isTreeNodeValid(nodeWithChildren, ['other'], false)).toBe(true);
    });

    it('should handle null/undefined data', () => {
      expect(isTreeNodeValid(null as any, ['test'], true)).toBe(false);
      expect(isTreeNodeValid(null as any, ['test'], false)).toBe(true);
      expect(isTreeNodeValid(undefined as any, ['test'], true)).toBe(false);
      expect(isTreeNodeValid(undefined as any, ['test'], false)).toBe(true);
    });
  });

  describe('cloneTreeWithFilter', () => {
    const sourceTree: TransferItemOption[] = [
      {
        value: '1',
        label: 'Parent 1',
        disabled: false,
        key: 'key_1',
        data: {},
        children: [
          { value: '1.1', label: 'Child 1.1', disabled: false, key: 'key_1_1', data: {} },
          { value: '1.2', label: 'Child 1.2', disabled: false, key: 'key_1_2', data: {} },
        ],
      },
      {
        value: '2',
        label: 'Parent 2',
        disabled: false,
        key: 'key_2',
        data: {},
        children: [{ value: '2.1', label: 'Child 2.1', disabled: false, key: 'key_2_1', data: {} }],
      },
    ];

    it('should clone tree with matching nodes (needMatch=true)', () => {
      const targetTree: TransferItemOption[] = [];
      const filterValues = ['1.1', '2.1'];

      cloneTreeWithFilter(sourceTree, targetTree, filterValues, true);

      expect(targetTree).toHaveLength(2);
      expect(targetTree[0].value).toBe('1');
      expect(targetTree[0].children).toHaveLength(1);
      expect(targetTree[0].children![0].value).toBe('1.1');
      expect(targetTree[1].children![0].value).toBe('2.1');
    });

    it('should clone tree excluding matching nodes (needMatch=false)', () => {
      const targetTree: TransferItemOption[] = [];
      const filterValues = ['1.1'];

      cloneTreeWithFilter(sourceTree, targetTree, filterValues, false);

      expect(targetTree).toHaveLength(2);
      expect(targetTree[0].children).toHaveLength(1);
      expect(targetTree[0].children![0].value).toBe('1.2');
      expect(targetTree[1].children![0].value).toBe('2.1');
    });

    it('should handle direct node matches', () => {
      const targetTree: TransferItemOption[] = [];
      const filterValues = ['1'];

      cloneTreeWithFilter(sourceTree, targetTree, filterValues, true);

      expect(targetTree).toHaveLength(1);
      expect(targetTree[0].value).toBe('1');
      expect(targetTree[0].children).toHaveLength(2); // All children copied
    });

    it('should remove empty children arrays', () => {
      const targetTree: TransferItemOption[] = [];
      const filterValues = ['nonexistent'];

      cloneTreeWithFilter(sourceTree, targetTree, filterValues, true);

      expect(targetTree).toHaveLength(0);
    });
  });

  describe('filterTransferData', () => {
    const flatData: TransferItemOption[] = [
      { value: '1', label: 'Item 1', disabled: false, key: 'key_1', data: {} },
      { value: '2', label: 'Item 2', disabled: false, key: 'key_2', data: {} },
      { value: '3', label: 'Item 3', disabled: false, key: 'key_3', data: {} },
    ];

    const treeData: TransferItemOption[] = [
      {
        value: '1',
        label: 'Parent 1',
        disabled: false,
        key: 'key_1',
        data: {},
        children: [{ value: '1.1', label: 'Child 1.1', disabled: false, key: 'key_1_1', data: {} }],
      },
    ];

    describe('flat mode', () => {
      it('should filter with needMatch=true', () => {
        const result = filterTransferData(flatData, ['2', '1'], true, false);

        expect(result).toHaveLength(2);
        expect(result[0].value).toBe('2'); // Maintains filterValues order
        expect(result[1].value).toBe('1');
      });

      it('should filter with needMatch=false', () => {
        const result = filterTransferData(flatData, ['2'], false, false);

        expect(result).toHaveLength(2);
        expect(result.map((item) => item.value)).toEqual(['1', '3']);
      });

      it('should handle non-existent values', () => {
        const result = filterTransferData(flatData, ['nonexistent'], true, false);

        expect(result).toHaveLength(0);
      });
    });

    describe('tree mode', () => {
      it('should filter tree with needMatch=true', () => {
        const result = filterTransferData(treeData, ['1.1'], true, true);

        expect(result).toHaveLength(1);
        expect(result[0].value).toBe('1');
        expect(result[0].children).toHaveLength(1);
        expect(result[0].children![0].value).toBe('1.1');
      });

      it('should filter tree with needMatch=false', () => {
        const result = filterTransferData(treeData, ['1.1'], false, true);

        expect(result).toHaveLength(0); // No other leaf nodes
      });
    });
  });

  describe('getLefCount', () => {
    interface TreeNode {
      children?: TreeNode[];
    }

    it('should count leaf nodes correctly', () => {
      const tree: TreeNode[] = [
        {
          children: [
            { children: undefined }, // leaf
            { children: undefined }, // leaf
            {
              children: [{ children: undefined }], // leaf
            },
          ],
        },
        { children: undefined }, // leaf
      ];

      expect(getLefCount(tree)).toBe(4);
    });

    it('should handle empty tree', () => {
      expect(getLefCount([])).toBe(0);
    });

    it('should handle tree with only leaf nodes', () => {
      const tree: TreeNode[] = [{ children: undefined }, { children: undefined }, { children: undefined }];

      expect(getLefCount(tree)).toBe(3);
    });

    it('should handle tree with empty children arrays', () => {
      const tree: TreeNode[] = [{ children: [] }, { children: [] }];

      expect(getLefCount(tree)).toBe(2);
    });
  });
});
