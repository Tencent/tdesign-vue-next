// @ts-nocheck
/* eslint-disable vue/one-component-per-file */
import { nextTick } from 'vue';
import { enableAutoUnmount, mount } from '@vue/test-utils';
import Tree, {
  type TdTreeProps,
  type TreeInstanceFunctions,
  type TreeScrollToElementParams,
} from '@tdesign/components/tree';
import type { TreeOptionData } from '@tdesign/components/common';
import { defineComponent } from './adapt';
import { delay } from './kit';

enableAutoUnmount(afterEach);

describe('Tree:init', () => {
  vi.useRealTimers();
  describe(':props.data', () => {
    it('传递空数据时，展示兜底界面', async () => {
      const wrapper = mount(
        defineComponent({
          components: {
            Tree,
          },
          // 使用 template 写法是为了 vue2, vue3 统一测试用例
          template: [
            '<Tree',
            'ref="tree"',
            ':transition="false"',
            ':data="null"',
            '><template #empty><div class="tree-empty">暂无数据</div></template></Tree>',
          ].join(' '),
        }),
      );
      await delay(1);
      expect(wrapper.find('.tree-empty').exists()).toBe(true);
    });

    it('空数据初始化后，允许插入根节点', () =>
      new Promise((resolve) => {
        const wrapper = mount(
          defineComponent({
            components: {
              Tree,
            },
            mounted() {
              const { tree } = this.$refs;
              tree.appendTo('', {
                value: 'insert1',
              });
              setTimeout(() => {
                expect(wrapper.find('.tree-empty').exists()).toBe(false);
                expect(wrapper.find('[data-value="insert1"]').exists()).toBe(true);
                resolve();
              });
            },
            template: [
              '<Tree',
              'ref="tree"',
              ':transition="false"',
              ':data="null"',
              '><template #empty><div class="tree-empty">暂无数据</div></template></Tree>',
            ].join(' '),
          }),
        );
      }));

    it('可以传递一个树结构的数据来完成初始化', () => {
      const data = [
        {
          value: 't1',
          children: [
            {
              value: 't1.1',
            },
          ],
        },
        {
          value: 't2',
        },
      ];
      const wrapper = mount(
        defineComponent({
          components: {
            Tree,
          },
          data() {
            return {
              items: data,
            };
          },
          template: [
            '<Tree',
            'ref="tree"',
            ':transition="false"',
            ':data="items"',
            '><template #empty><div class="tree-empty">暂无数据</div></template></Tree>',
          ].join(' '),
        }),
      );
      expect(wrapper.find('.tree-empty').exists()).toBe(false);
      expect(wrapper.find('[data-value="t1"]').exists()).toBe(true);
      expect(wrapper.find('[data-value="t1.1"]').exists()).toBe(false);
      expect(wrapper.find('[data-value="t2"]').exists()).toBe(true);
    });
  });
});

describe('Tree', () => {
  afterEach(() => vi.restoreAllMocks());

  const renderTree = (data: TreeOptionData[]) =>
    mount(Tree, { props: { data, transition: false, expandAll: true } }).vm as unknown as TreeInstanceFunctions;

  describe('instanceFunctions', () => {
    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
    it.each([0n, 9007199254740993n])('scrollTo accepts key %s without coercing its type', (key) => {
      const values = [0n, 1n, 9007199254740993n, 0, 'zero', ''];
      const wrapper = mount(Tree, { props: { data: values.map((value) => ({ value })), transition: false } });
      const scroll = vi.spyOn(wrapper.vm.virtualConfig, 'scrollToElement').mockImplementation(() => {});
      const params = { key } satisfies TreeScrollToElementParams;
      const tree = wrapper.vm as unknown as TreeInstanceFunctions;
      tree.scrollTo(params);
      expect(scroll).toHaveBeenCalledWith({ key, index: values.indexOf(key) - 1 });
    });

    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
    it('scrollTo preserves explicit index precedence and rejects a missing bigint key', () => {
      const wrapper = mount(Tree, { props: { data: [{ value: 0n }] } });
      const scroll = vi.spyOn(wrapper.vm.virtualConfig, 'scrollToElement').mockImplementation(() => {});
      const error = vi.spyOn(console, 'error').mockImplementation(() => {});
      const tree = wrapper.vm as unknown as TreeInstanceFunctions;
      tree.scrollTo({ index: 0, key: 99n });
      expect(scroll).toHaveBeenCalledWith({ index: -1, key: 99n });
      scroll.mockClear();
      tree.scrollTo({ key: 99n });
      expect(scroll).not.toHaveBeenCalled();
      expect(error).toHaveBeenCalled();
    });

    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
    it.each([0n, 0, ''])('getTreeData(%s) exports only the requested subtree', (value) => {
      const subtree = { value, children: [{ value: 2n }] };
      const tree = renderTree([subtree, { value: 1n }]);
      expect(tree.getTreeData(value)).toEqual([subtree]);
      expect(tree.getTreeData()).toEqual([subtree, { value: 1n }]);
    });

    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
    it.each([0n, 0, ''])('getTreeData(%s) returns no nodes when the target is absent', (value) => {
      const tree = renderTree([{ value: 1n }]);
      expect(tree.getTreeData(value)).toEqual([]);
    });

    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
    it('getTreeData preserves string, number and bigint keys in nested nodes', () => {
      const data = [{ value: 1, children: [{ value: '1', children: [{ value: 1n }] }] }];
      const tree = renderTree(data);
      expect(tree.getTreeData()).toEqual(data);
      expect(tree.getTreeData('1')).toEqual(data[0].children);
      expect(tree.getTreeData(1n)).toEqual([{ value: 1n }]);
    });

    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
    it.each(['appendTo', 'insertBefore', 'insertAfter'] as const)(
      '%s moves existing zero nodes and preserves their models',
      async (method) => {
        for (const value of [0n, 0]) {
          const warn = vi.spyOn(console, 'warn');
          const tree = renderTree([{ label: 'zero', value, children: [{ value: 'descendant' }] }, { value: 'target' }]);
          const model = tree.getItem(value);
          tree[method]('target', { value });
          await nextTick();
          expect(tree.getItem(value) === model).toBe(true);
          expect(tree.getItem(value).label).toBe('zero');
          expect(tree.getParent('descendant').value).toBe(value);
          expect(tree.getItems().filter((node) => node.value === value)).toHaveLength(1);
          if (method === 'appendTo') {
            expect(tree.getParent(value).value).toBe('target');
            expect(tree.getTreeData().map((node) => node.value)).toEqual(['target']);
          } else {
            expect(tree.getTreeData().map((node) => node.value)).toEqual(
              method === 'insertBefore' ? [value, 'target'] : ['target', value],
            );
          }
          expect(warn.mock.calls.some((args) => String(args[0]).includes('Dulplicate value'))).toBe(false);
          warn.mockRestore();
        }
      },
    );
  });

  const renderCheckTree = async (
    checkAllAffectedBy: TdTreeProps['checkAllAffectedBy'],
    props: Partial<TdTreeProps> = {},
  ) => {
    const wrapper = mount(Tree, {
      props: {
        data: [{ value: 'P', children: [{ value: 'A' }, { value: 'B' }, { value: 'D', disabled: true }] }],
        checkable: true,
        expandAll: true,
        transition: false,
        valueMode: 'parentFirst',
        value: ['A', 'B'],
        checkAllAffectedBy,
        ...props,
      },
    });
    await vi.waitFor(() => expect(wrapper.find('[data-value="D"] input').exists()).toBe(true));
    return wrapper;
  };

  describe('props', () => {
    describe('checkAllAffectedBy', () => {
      it.each([
        [undefined, false],
        ['all', false],
        ['onlyEnabled', true],
      ] as const)('%s derives the parent state without selecting disabled children', async (scope, fullyChecked) => {
        const wrapper = await renderCheckTree(scope);
        expect(wrapper.props('checkAllAffectedBy')).toBe(scope ?? 'all');
        const parent = wrapper.get('[data-value="P"] .t-checkbox');
        expect(parent.classes('t-is-checked')).toBe(fullyChecked);
        expect(parent.classes('t-is-indeterminate')).toBe(!fullyChecked);
        expect((wrapper.get('[data-value="D"] input').element as HTMLInputElement).checked).toBe(false);
        expect(wrapper.props('value')).toEqual(['A', 'B']);
      });

      it('onlyEnabled does not derive a parent state when all children are disabled', async () => {
        const wrapper = await renderCheckTree('onlyEnabled', {
          data: [{ value: 'P', children: [{ value: 'D', disabled: true }] }],
          value: ['D'],
        });
        const parent = wrapper.get('[data-value="P"] .t-checkbox');
        expect(parent.classes('t-is-checked')).toBe(false);
        expect(parent.classes('t-is-indeterminate')).toBe(false);
        expect((wrapper.get('[data-value="D"] input').element as HTMLInputElement).checked).toBe(true);
      });
    });
  });

  describe('scenarios', () => {
    describe('checkAllAffectedBy with checkStrictly', () => {
      it.each(['all', 'onlyEnabled'] as const)('%s does not link parent and child selection', async (scope) => {
        const wrapper = await renderCheckTree(scope, { checkStrictly: true });
        const parent = wrapper.get('[data-value="P"] .t-checkbox');
        expect(parent.classes('t-is-checked')).toBe(false);
        expect(parent.classes('t-is-indeterminate')).toBe(false);
        expect((wrapper.get('[data-value="A"] input').element as HTMLInputElement).checked).toBe(true);
      });
    });

    describe('checkAllAffectedBy changes', () => {
      it('updates the parent state without rewriting value or emitting change', async () => {
        const onChange = vi.fn();
        const wrapper = await renderCheckTree('onlyEnabled', { onChange });
        const parent = () => wrapper.get('[data-value="P"] .t-checkbox');
        expect(parent().classes('t-is-checked')).toBe(true);
        await wrapper.setProps({ checkAllAffectedBy: 'all' });
        await vi.waitFor(() => expect(parent().classes('t-is-indeterminate')).toBe(true));
        expect(parent().classes('t-is-checked')).toBe(false);
        await wrapper.setProps({ checkAllAffectedBy: 'onlyEnabled' });
        await vi.waitFor(() => expect(parent().classes('t-is-checked')).toBe(true));
        expect(parent().classes('t-is-indeterminate')).toBe(false);
        expect(wrapper.props('value')).toEqual(['A', 'B']);
        expect(onChange).not.toHaveBeenCalled();
      });
    });
  });
});

describe('Tree', () => {
  describe('scenarios', () => {
    describe('bigint activation', () => {
      const bigintData = [{ value: 1n, children: [{ value: 2n }, { value: 3n }] }];

      // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
      it('点击 bigint 节点可以正常激活（不会触发 null 读取错误）', async () => {
        const wrapper = mount({
          data() {
            return {
              actived: [],
            };
          },
          render() {
            return (
              <Tree
                ref="tree"
                data={bigintData}
                activable
                actived={this.actived}
                onActive={(value) => {
                  this.actived = value;
                }}
                expandAll
                transition={false}
              ></Tree>
            );
          },
        });
        await delay(3);

        await wrapper.find('[data-value="2"] .t-tree__label').trigger('click');
        await delay(3);

        expect(wrapper.vm.actived).toEqual([2n]);
        expect(wrapper.find('[data-value="2"]').classes('t-is-active')).toBe(true);
      });
    });
  });
});
