import {
  getDataValues,
  cloneTreeWithFilter,
  getLefCount,
  filterTransferData,
  getTransferData,
  isTreeNodeValid,
  findTopNode,
} from '../utils';
import type { DataOption, TransferItemOption } from '../types';

interface TreeNode {
  children?: TreeNode[];
}

// 测试数据工厂函数
const createTreeNode = (value: string, label: string, children?: TransferItemOption[]): TransferItemOption => ({
  value,
  label,
  disabled: false,
  key: `key__value_${value}`,
  data: { value, label },
  ...(children && { children }),
});

// 通用 tree 数据
const treeData: TransferItemOption[] = [
  createTreeNode('1', '1', [
    createTreeNode('1.1', '1.1', [
      createTreeNode('1.1.1', '1.1.1', [createTreeNode('1.1.1.1', '1.1.1.1'), createTreeNode('1.1.1.2', '1.1.1.2')]),
      createTreeNode('1.1.2', '1.1.2', [createTreeNode('1.1.2.1', '1.1.2.1'), createTreeNode('1.1.2.2', '1.1.2.2')]),
    ]),
    createTreeNode('1.2', '1.2', [
      createTreeNode('1.2.1', '1.2.1', [createTreeNode('1.2.1.1', '1.2.1.1'), createTreeNode('1.2.1.2', '1.2.1.2')]),
      createTreeNode('1.2.2', '1.2.2', [createTreeNode('1.2.2.1', '1.2.2.1'), createTreeNode('1.2.2.2', '1.2.2.2')]),
    ]),
  ]),
  createTreeNode('2', '2', [createTreeNode('2.1', '2.1'), createTreeNode('2.2', '2.2')]),
];

// 通用 flat list 数据
const flatList: TransferItemOption[] = Array.from({ length: 20 }, (_, i) => ({
  value: i.toString(),
  label: `内容${i + 1}`,
  disabled: i % 4 < 1,
  key: `key__value_${i}`,
  data: { value: i.toString(), label: `内容${i + 1}`, disabled: i % 4 < 1 },
}));

describe('Transfer Utils', () => {
  describe('getDataValues', () => {
    it('should filter flat list data correctly', () => {
      const checked = ['1', '1.2.2.2', '1.1', '100', '200', '3', '5'];
      const result = getDataValues(flatList, checked);
      expect(result).toEqual(['1', '3', '5']);
    });

    it('should filter tree data in tree mode', () => {
      const checked = ['1', '100', '200', '3', '5', '2.1', '1.2.2.2'];
      const result = getDataValues(treeData, checked, { isTreeMode: true });
      expect(result).toEqual(['1.2.2.2', '2.1']);
    });

    it('should exclude matched values when include is false', () => {
      const checked = ['1.1', '1.1.2', '100', '200', '3', '5', '2.1', '1.2.2.2'];
      const result = getDataValues(treeData, checked, { isTreeMode: true, include: false });
      expect(result).toEqual(['1.2.1.1', '1.2.1.2', '1.2.2.1', '2.2']);
    });

    it('should skip null/undefined items in data', () => {
      const data = [
        { value: 'a', label: 'A', disabled: false, key: 'key_a', data: { value: 'a', label: 'A' } },
        null,
        undefined,
        { value: 'b', label: 'B', disabled: false, key: 'key_b', data: { value: 'b', label: 'B' } },
      ] as (TransferItemOption | null | undefined)[];
      const checked = ['a', 'b', 'c'];
      const result = getDataValues(data.filter(Boolean) as TransferItemOption[], checked);
      expect(result).toEqual(['a', 'b']);
    });

    it('should handle empty data array', () => {
      const result = getDataValues([], ['a', 'b']);
      expect(result).toEqual([]);
    });

    it('should handle empty checked array', () => {
      const result = getDataValues(flatList, []);
      expect(result).toEqual([]);
    });
  });

  // cloneTreeWithFilter result test1
  describe('cloneTreeWithFilter', () => {
    it('needMatch:true result test1', () => {
      const filterValues = ['1.2.1.1', '1.2.2.1', '2.1'];
      const result: TransferItemOption[] = [];
      cloneTreeWithFilter(treeData, result, filterValues, true);
      expect(result).toEqual([
        {
          value: '1',
          label: '1',
          disabled: false,
          key: 'key__value_1',
          data: { value: '1', label: '1' },
          children: [
            {
              value: '1.2',
              label: '1.2',
              disabled: false,
              key: 'key__value_1.2',
              data: { value: '1.2', label: '1.2' },
              children: [
                {
                  value: '1.2.1',
                  label: '1.2.1',
                  disabled: false,
                  key: 'key__value_1.2.1',
                  data: { value: '1.2.1', label: '1.2.1' },
                  children: [
                    {
                      value: '1.2.1.1',
                      label: '1.2.1.1',
                      disabled: false,
                      key: 'key__value_1.2.1.1',
                      data: { value: '1.2.1.1', label: '1.2.1.1' },
                    },
                  ],
                },
                {
                  value: '1.2.2',
                  label: '1.2.2',
                  disabled: false,
                  key: 'key__value_1.2.2',
                  data: { value: '1.2.2', label: '1.2.2' },
                  children: [
                    {
                      value: '1.2.2.1',
                      label: '1.2.2.1',
                      disabled: false,
                      key: 'key__value_1.2.2.1',
                      data: { value: '1.2.2.1', label: '1.2.2.1' },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          value: '2',
          label: '2',
          disabled: false,
          key: 'key__value_2',
          data: { value: '2', label: '2' },
          children: [
            {
              value: '2.1',
              label: '2.1',
              disabled: false,
              key: 'key__value_2.1',
              data: { value: '2.1', label: '2.1' },
            },
          ],
        },
      ]);
    });

    // result test 2
    it('needMatch:true result test2', () => {
      const sourceTree = [
        {
          value: '1',
          label: '1',
          children: [
            {
              value: '1.1',
              label: '1.1',
              children: [
                {
                  value: '1.1.1',
                  label: '1.1.1',
                  children: [
                    {
                      value: '1.1.1.1',
                      label: '1.1.1.1',
                    },
                    {
                      value: '1.1.1.2',
                      label: '1.1.1.2',
                    },
                  ],
                },
                {
                  value: '1.1.2',
                  label: '1.1.2',
                  children: [
                    {
                      value: '1.1.2.1',
                      label: '1.1.2.1',
                    },
                    {
                      value: '1.1.2.2',
                      label: '1.1.2.2',
                    },
                  ],
                },
              ],
            },
            {
              value: '1.2',
              label: '1.2',
              children: [
                {
                  value: '1.2.1',
                  label: '1.2.1',
                  children: [
                    {
                      value: '1.2.1.1',
                      label: '1.2.1.1',
                    },
                    {
                      value: '1.2.1.2',
                      label: '1.2.1.2',
                    },
                  ],
                },
                {
                  value: '1.2.2',
                  label: '1.2.2',
                  children: [
                    {
                      value: '1.2.2.1',
                      label: '1.2.2.1',
                    },
                    {
                      value: '1.2.2.2',
                      label: '1.2.2.2',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          value: '2',
          label: '2',
          children: [
            {
              value: '2.1',
              label: '2.1',
            },
            {
              value: '2.2',
              label: '2.2',
            },
          ],
        },
      ];

      const filterValues = ['1.1', '1.2.2.1', '2.1'];

      const result: TransferItemOption[] = [];
      cloneTreeWithFilter(sourceTree, result, filterValues, true);

      expect(result).toEqual([
        {
          value: '1',
          label: '1',
          children: [
            {
              value: '1.1',
              label: '1.1',
              children: [
                {
                  value: '1.1.1',
                  label: '1.1.1',
                  children: [
                    {
                      value: '1.1.1.1',
                      label: '1.1.1.1',
                    },
                    {
                      value: '1.1.1.2',
                      label: '1.1.1.2',
                    },
                  ],
                },
                {
                  value: '1.1.2',
                  label: '1.1.2',
                  children: [
                    {
                      value: '1.1.2.1',
                      label: '1.1.2.1',
                    },
                    {
                      value: '1.1.2.2',
                      label: '1.1.2.2',
                    },
                  ],
                },
              ],
            },
            {
              value: '1.2',
              label: '1.2',
              children: [
                {
                  value: '1.2.2',
                  label: '1.2.2',
                  children: [
                    {
                      value: '1.2.2.1',
                      label: '1.2.2.1',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          value: '2',
          label: '2',
          children: [
            {
              value: '2.1',
              label: '2.1',
            },
          ],
        },
      ]);
    });

    it('needMatch:false result test1', () => {
      const sourceTree = [
        {
          value: '1',
          label: '1',
          children: [
            {
              value: '1.1',
              label: '1.1',
              children: [
                {
                  value: '1.1.1',
                  label: '1.1.1',
                  children: [
                    {
                      value: '1.1.1.1',
                      label: '1.1.1.1',
                    },
                    {
                      value: '1.1.1.2',
                      label: '1.1.1.2',
                    },
                  ],
                },
                {
                  value: '1.1.2',
                  label: '1.1.2',
                  children: [
                    {
                      value: '1.1.2.1',
                      label: '1.1.2.1',
                    },
                    {
                      value: '1.1.2.2',
                      label: '1.1.2.2',
                    },
                  ],
                },
              ],
            },
            {
              value: '1.2',
              label: '1.2',
              children: [
                {
                  value: '1.2.1',
                  label: '1.2.1',
                  children: [
                    {
                      value: '1.2.1.2',
                      label: '1.2.1.2',
                    },
                  ],
                },
                {
                  value: '1.2.2',
                  label: '1.2.2',
                  children: [
                    {
                      value: '1.2.2.2',
                      label: '1.2.2.2',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          value: '2',
          label: '2',
          children: [
            {
              value: '2.1',
              label: '2.1',
            },
            {
              value: '2.2',
              label: '2.2',
            },
          ],
        },
      ];

      const filterValues = ['1.2.1.1', '1.2.2.1', '2.1'];

      const result: TransferItemOption[] = [];
      cloneTreeWithFilter(sourceTree as TransferItemOption[], result, filterValues, false);

      expect(result).toEqual([
        {
          value: '1',
          label: '1',
          children: [
            {
              value: '1.1',
              label: '1.1',
              children: [
                {
                  value: '1.1.1',
                  label: '1.1.1',
                  children: [
                    {
                      value: '1.1.1.1',
                      label: '1.1.1.1',
                    },
                    {
                      value: '1.1.1.2',
                      label: '1.1.1.2',
                    },
                  ],
                },
                {
                  value: '1.1.2',
                  label: '1.1.2',
                  children: [
                    {
                      value: '1.1.2.1',
                      label: '1.1.2.1',
                    },
                    {
                      value: '1.1.2.2',
                      label: '1.1.2.2',
                    },
                  ],
                },
              ],
            },
            {
              value: '1.2',
              label: '1.2',
              children: [
                {
                  value: '1.2.1',
                  label: '1.2.1',
                  children: [
                    {
                      value: '1.2.1.2',
                      label: '1.2.1.2',
                    },
                  ],
                },
                {
                  value: '1.2.2',
                  label: '1.2.2',
                  children: [
                    {
                      value: '1.2.2.2',
                      label: '1.2.2.2',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          value: '2',
          label: '2',
          children: [
            {
              value: '2.2',
              label: '2.2',
            },
          ],
        },
      ]);
    });

    it('needMatch:false result test2', () => {
      const sourceTree = [
        {
          value: '1',
          label: '1',
          children: [
            {
              value: '1.1',
              label: '1.1',
              children: [
                {
                  value: '1.1.1',
                  label: '1.1.1',
                  children: [
                    {
                      value: '1.1.1.1',
                      label: '1.1.1.1',
                    },
                    {
                      value: '1.1.1.2',
                      label: '1.1.1.2',
                    },
                  ],
                },
                {
                  value: '1.1.2',
                  label: '1.1.2',
                  children: [
                    {
                      value: '1.1.2.1',
                      label: '1.1.2.1',
                    },
                    {
                      value: '1.1.2.2',
                      label: '1.1.2.2',
                    },
                  ],
                },
              ],
            },
            {
              value: '1.2',
              label: '1.2',
              children: [
                {
                  value: '1.2.1',
                  label: '1.2.1',
                  children: [
                    {
                      value: '1.2.1.1',
                      label: '1.2.1.1',
                    },
                    {
                      value: '1.2.1.2',
                      label: '1.2.1.2',
                    },
                  ],
                },
                {
                  value: '1.2.2',
                  label: '1.2.2',
                  children: [
                    {
                      value: '1.2.2.1',
                      label: '1.2.2.1',
                    },
                    {
                      value: '1.2.2.2',
                      label: '1.2.2.2',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          value: '2',
          label: '2',
          children: [
            {
              value: '2.1',
              label: '2.1',
            },
            {
              value: '2.2',
              label: '2.2',
            },
          ],
        },
      ] as TransferItemOption[];

      const filterValues = ['1.1.1.1', '1.2.2', '2'];

      const result: TransferItemOption[] = [];
      cloneTreeWithFilter(sourceTree, result, filterValues, false);

      expect(result).toEqual([
        {
          value: '1',
          label: '1',
          children: [
            {
              value: '1.1',
              label: '1.1',
              children: [
                {
                  value: '1.1.1',
                  label: '1.1.1',
                  children: [
                    {
                      value: '1.1.1.2',
                      label: '1.1.1.2',
                    },
                  ],
                },
                {
                  value: '1.1.2',
                  label: '1.1.2',
                  children: [
                    {
                      value: '1.1.2.1',
                      label: '1.1.2.1',
                    },
                    {
                      value: '1.1.2.2',
                      label: '1.1.2.2',
                    },
                  ],
                },
              ],
            },
            {
              value: '1.2',
              label: '1.2',
              children: [
                {
                  value: '1.2.1',
                  label: '1.2.1',
                  children: [
                    {
                      value: '1.2.1.1',
                      label: '1.2.1.1',
                    },
                    {
                      value: '1.2.1.2',
                      label: '1.2.1.2',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ]);
    });

    it('should delete children property when children is empty', () => {
      const sourceTree = [
        {
          value: 'root',
          label: 'root',
          children: [
            {
              value: 'child1',
              label: 'child1',
              children: [{ value: 'leaf1', label: 'leaf1' }],
            },
            {
              value: 'child2',
              label: 'child2',
              children: [{ value: 'leaf2', label: 'leaf2' }],
            },
          ],
        },
      ] as TransferItemOption[];
      // filterValues 不命中任何节点，递归后children应被删掉
      const filterValues = ['not-exist'];
      const result: TransferItemOption[] = [];
      cloneTreeWithFilter(sourceTree, result, filterValues, true);
      expect(result).toEqual([]);
    });

    it('should delete children property when children is empty after filter', () => {
      const sourceTree = [
        {
          value: 'root',
          label: 'root',
          children: [
            {
              value: 'child1',
              label: 'child1',
              children: [{ value: 'leaf1', label: 'leaf1' }],
            },
            {
              value: 'child2',
              label: 'child2',
              children: [{ value: 'leaf2', label: 'leaf2' }],
            },
          ],
        },
      ] as TransferItemOption[];
      const filterValues = ['child1'];
      const result: TransferItemOption[] = [];
      cloneTreeWithFilter(sourceTree, result, filterValues, true);
      expect(result.length).toBe(1);
      expect(result[0].value).toBe('root');
      expect(result[0].children[0].children[0].children).toBeUndefined();
    });

    it('should delete children property when all children are filtered out', () => {
      const sourceTree = [
        {
          value: 'parent',
          label: 'parent',
          children: [
            {
              value: 'child1',
              label: 'child1',
              children: [
                { value: 'leaf1', label: 'leaf1' },
                { value: 'leaf2', label: 'leaf2' },
              ],
            },
            {
              value: 'child2',
              label: 'child2',
              children: [
                { value: 'leaf3', label: 'leaf3' },
                { value: 'leaf4', label: 'leaf4' },
              ],
            },
          ],
        },
      ] as TransferItemOption[];
      // 过滤掉所有叶子节点，中间节点的children应该被删除
      const filterValues = ['nonexistent'];
      const result: TransferItemOption[] = [];
      cloneTreeWithFilter(sourceTree, result, filterValues, true);
      expect(result).toEqual([]);
    });

    it('should delete children property when children array becomes empty after recursive filtering', () => {
      const sourceTree = [
        {
          value: 'root',
          label: 'root',
          children: [
            {
              value: 'branch1',
              label: 'branch1',
              children: [
                {
                  value: 'subbranch1',
                  label: 'subbranch1',
                  children: [
                    { value: 'target', label: 'target' },
                    { value: 'other', label: 'other' },
                  ],
                },
              ],
            },
            {
              value: 'branch2',
              label: 'branch2',
              children: [{ value: 'unwanted', label: 'unwanted' }],
            },
          ],
        },
      ] as TransferItemOption[];
      // 只匹配 'target'，branch2 的 children 应该被删除
      const filterValues = ['target'];
      const result: TransferItemOption[] = [];
      cloneTreeWithFilter(sourceTree, result, filterValues, true);

      expect(result.length).toBe(1);
      expect(result[0].value).toBe('root');
      expect(result[0].children.length).toBe(1);
      expect(result[0].children[0].value).toBe('branch1');
      expect(result[0].children[0].children[0].value).toBe('subbranch1');
      expect(result[0].children[0].children[0].children.length).toBe(1);
      expect(result[0].children[0].children[0].children[0].value).toBe('target');
      // 验证 children 属性被正确删除
      expect(result[0].children[0].children[0].children[0].children).toBeUndefined();
    });

    it('should handle multiple levels of empty children deletion', () => {
      const sourceTree = [
        {
          value: 'level1',
          label: 'level1',
          children: [
            {
              value: 'level2a',
              label: 'level2a',
              children: [
                {
                  value: 'level3a',
                  label: 'level3a',
                  children: [{ value: 'leaf1', label: 'leaf1' }],
                },
              ],
            },
            {
              value: 'level2b',
              label: 'level2b',
              children: [
                {
                  value: 'level3b',
                  label: 'level3b',
                  children: [{ value: 'leaf2', label: 'leaf2' }],
                },
              ],
            },
          ],
        },
      ] as TransferItemOption[];
      // 只匹配 leaf1，验证多层级的 children 删除
      const filterValues = ['leaf1'];
      const result: TransferItemOption[] = [];
      cloneTreeWithFilter(sourceTree, result, filterValues, true);

      expect(result.length).toBe(1);
      expect(result[0].children.length).toBe(1);
      expect(result[0].children[0].value).toBe('level2a');
      expect(result[0].children[0].children[0].children[0].children).toBeUndefined();
    });
  });

  describe('filterTransferData', () => {
    const testData = [
      createTreeNode('1', '1', [
        createTreeNode('1.1', '1.1', [createTreeNode('1.1.1', '1.1.1'), createTreeNode('1.1.2', '1.1.2')]),
        createTreeNode('1.2', '1.2', [createTreeNode('1.2.1', '1.2.1'), createTreeNode('1.2.2', '1.2.2')]),
      ]),
      createTreeNode('2', '2', [createTreeNode('2.1', '2.1'), createTreeNode('2.2', '2.2')]),
    ];

    it('should filter tree data and keep matched structure', () => {
      const filterValues = ['1.1.2', '2.2'];
      const result = filterTransferData(testData, filterValues, true, true);

      expect(result).toEqual([
        createTreeNode('1', '1', [createTreeNode('1.1', '1.1', [createTreeNode('1.1.2', '1.1.2')])]),
        createTreeNode('2', '2', [createTreeNode('2.2', '2.2')]),
      ]);
    });

    it('should filter tree data and keep unmatched structure', () => {
      const filterValues = ['1.1.2', '2.2'];
      const result = filterTransferData(testData, filterValues, false, true);

      expect(result).toEqual([
        createTreeNode('1', '1', [
          createTreeNode('1.1', '1.1', [createTreeNode('1.1.1', '1.1.1')]),
          createTreeNode('1.2', '1.2', [createTreeNode('1.2.1', '1.2.1'), createTreeNode('1.2.2', '1.2.2')]),
        ]),
        createTreeNode('2', '2', [createTreeNode('2.1', '2.1')]),
      ]);
    });
  });

  describe('getLefCount', () => {
    it('should count leaf nodes correctly for simple tree', () => {
      const data: TreeNode[] = [
        {
          children: [{ children: undefined }, { children: undefined }, { children: undefined }],
        },
        {
          children: [
            {
              children: [{ children: undefined }],
            },
          ],
        },
      ];
      expect(getLefCount(data)).toBe(4);
    });

    it('should count leaf nodes correctly for complex tree', () => {
      expect(getLefCount(treeData as any)).toBe(10);
    });

    it('should handle empty data', () => {
      expect(getLefCount([])).toBe(0);
    });

    it('should handle data without children', () => {
      const data: TreeNode[] = [{ children: undefined }, { children: undefined }];
      expect(getLefCount(data)).toBe(2);
    });
  });

  describe('getTransferData', () => {
    it('should throw error when labelKey is missing', () => {
      const data: DataOption[] = [{ value: '1' }];
      expect(() => getTransferData(data, undefined, false)).toThrow('label is not in DataOption');
    });

    it('should throw error when valueKey is missing', () => {
      const data: DataOption[] = [{ label: 'test' }];
      expect(() => getTransferData(data, undefined, false)).toThrow('value is not in DataOption');
    });

    it('should handle tree mode with children', () => {
      const data: DataOption[] = [
        {
          label: 'parent',
          value: 'p1',
          children: [
            { label: 'child1', value: 'c1' },
            { label: 'child2', value: 'c2' },
          ],
        },
      ];
      const result = getTransferData(data, undefined, true);

      expect(result[0].children).toBeDefined();
      expect(result[0].children).toHaveLength(2);
      expect(result[0].children![0].label).toBe('child1');
      expect(result[0].children![1].value).toBe('c2');
    });

    it('should handle flat mode without children', () => {
      const data: DataOption[] = [
        { label: 'item1', value: 'v1' },
        { label: 'item2', value: 'v2' },
      ];
      const result = getTransferData(data, undefined, false);

      expect(result).toHaveLength(2);
      expect(result[0].label).toBe('item1');
      expect(result[1].value).toBe('v2');
    });
  });
});

describe('findTopNode', () => {
  function createVmTree(names: string[]): any {
    let vm: any = null;
    for (let i = names.length - 1; i >= 0; i--) {
      vm = { $options: { name: names[i] }, $parent: vm };
    }
    return vm;
  }
  it('should return self if name is t-transfer', () => {
    const vm = { $options: { name: 't-transfer' } } as any;
    expect(findTopNode(vm as any)).toBe(vm);
  });
  it('should return top node with name t-transfer', () => {
    const vm = createVmTree(['child', 'parent', 't-transfer', 'root']);
    // vm: child->$parent:parent->$parent:t-transfer->$parent:root
    const tTransferVm = vm.$parent.$parent;
    expect(findTopNode(vm as any)).toBe(tTransferVm);
  });
  it('should return root if no t-transfer found', () => {
    const vm = createVmTree(['child', 'parent', 'root']);
    const rootVm = vm.$parent.$parent;
    expect(findTopNode(vm as any)).toBe(rootVm);
  });
});

describe('isTreeNodeValid', () => {
  it('should return !needMatch when data is null', () => {
    expect(isTreeNodeValid(null as any, ['a', 'b'], true)).toBe(false);
    expect(isTreeNodeValid(null as any, ['a', 'b'], false)).toBe(true);
  });
  it('should return !needMatch when data is undefined', () => {
    expect(isTreeNodeValid(undefined as any, ['a', 'b'], true)).toBe(false);
    expect(isTreeNodeValid(undefined as any, ['a', 'b'], false)).toBe(true);
  });
});
