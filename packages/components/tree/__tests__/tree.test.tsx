// @ts-nocheck
/* eslint-disable vue/one-component-per-file */
import { enableAutoUnmount, mount, type VueWrapper } from '@vue/test-utils';
import { h, nextTick, ref } from 'vue';
import { afterEach } from 'vitest';
import type {
  TdTreeProps,
  TreeNodeValue,
  TreeInstanceFunctions,
  TreeScrollToElementParams,
} from '@tdesign/components/tree';
import Tree from '@tdesign/components/tree';
import type { TreeOptionData } from '@tdesign/components/common';
import { defineComponent } from './adapt';
import { delay } from './kit';

enableAutoUnmount(afterEach);

const modes = ['all', 'parentFirst', 'onlyLeaf'] as const;
const checkData = [{ value: 'P', children: [{ value: 'A' }, { value: 'B' }, { value: 'D', disabled: true }] }];
const selectionWrappers: Array<{ wrapper: VueWrapper; host: HTMLElement }> = [];
afterEach(() =>
  selectionWrappers.splice(0).forEach(({ host }) => {
    host.remove();
  }),
);
async function mountTree(
  mode: TdTreeProps['valueMode'],
  initial: TreeNodeValue[] = [],
  strategy: TdTreeProps['checkAllAffectedBy'] = undefined,
  options: Partial<TdTreeProps> = {},
) {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const value = ref(initial);
  const scope = ref(strategy);
  const onChange = vi.fn();
  const wrapper = mount(
    {
      setup: () => () =>
        h(Tree, {
          data: checkData,
          checkable: true,
          expandAll: true,
          transition: false,
          valueMode: mode,
          checkAllAffectedBy: scope.value,
          ...options,
          value: value.value,
          onChange: (next, context) => {
            value.value = next;
            onChange(next, context);
          },
        }),
    },
    { attachTo: host },
  );
  selectionWrappers.push({ wrapper, host });
  const input = (id: string) => host.querySelector<HTMLInputElement>(`[data-value="${id}"] input[type="checkbox"]`);
  await vi.waitFor(() => expect(input(options.load ? 'P' : 'D')).not.toBeNull());
  return {
    wrapper,
    host,
    input,
    value,
    scope,
    onChange,
    click: async (id: string) => {
      input(id).click();
      await nextTick();
    },
  };
}
const checked = (host: HTMLElement, id: string) =>
  host.querySelector(`[data-value="${id}"] .t-checkbox`).classList.contains('t-is-checked');
const half = (host: HTMLElement, id: string) =>
  host.querySelector(`[data-value="${id}"] .t-checkbox`).classList.contains('t-is-indeterminate');

describe('Tree', () => {
  vi.useRealTimers();
  describe('props', () => {
    describe('data', () => {
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

    describe('checkAllAffectedBy', () => {
      it('onlyEnabled derives full selection from enabled children', async () => {
        const ctx = await mountTree('parentFirst', ['A', 'B'], 'onlyEnabled');
        expect(checked(ctx.host, 'P')).toBe(true);
        expect(half(ctx.host, 'P')).toBe(false);
        expect(ctx.input('D').checked).toBe(false);
        await ctx.click('P');
        await vi.waitFor(() => expect(ctx.value.value).toEqual([]));
      });
      it.each(['all', 'onlyEnabled'] as const)('%s has no effect when checkStrictly is true', async (scope) => {
        const ctx = await mountTree('parentFirst', [], scope, { checkStrictly: true });
        await ctx.click('P');
        await vi.waitFor(() => expect(ctx.value.value).toEqual(['P']));
        expect(ctx.input('A').checked).toBe(false);
        expect(ctx.input('D').checked).toBe(false);
        expect(half(ctx.host, 'P')).toBe(false);
      });
      it('onlyEnabled leaves the parent unselected when all children are disabled', async () => {
        const ctx = await mountTree('parentFirst', ['D'], 'onlyEnabled', {
          data: [{ value: 'P', children: [{ value: 'D', disabled: true }] }],
        });
        expect(checked(ctx.host, 'P')).toBe(false);
        expect(half(ctx.host, 'P')).toBe(false);
        expect(ctx.input('D').checked).toBe(true);
      });
    });
  });
  describe('scenarios', () => {
    describe('default all with disabled children', () => {
      it.each(modes)(
        'keeps the parent half-selected when checking enabled children through the parent in %s mode',
        async (mode) => {
          const { host, input, value, click, wrapper } = await mountTree(mode);
          expect(wrapper.findComponent(Tree).props('checkAllAffectedBy')).toBe('all');
          await click('P');
          await vi.waitFor(() => expect(value.value).toEqual(['A', 'B']));
          expect(checked(host, 'P')).toBe(false);
          expect(half(host, 'P')).toBe(true);
          expect(input('D').disabled).toBe(true);
          expect(input('D').checked).toBe(false);
          await click('P');
          await vi.waitFor(() => expect(value.value).toEqual([]));
          expect(checked(host, 'P')).toBe(false);
          expect(half(host, 'P')).toBe(false);
        },
      );
      it.each(modes)('keeps the parent half-selected after checking all enabled children in %s mode', async (mode) => {
        const { host, input, value, click } = await mountTree(mode);
        await click('A');
        await vi.waitFor(() => expect(half(host, 'P')).toBe(true));
        await click('B');
        await vi.waitFor(() => expect(value.value).toEqual(['A', 'B']));
        expect(checked(host, 'P')).toBe(false);
        expect(half(host, 'P')).toBe(true);
        expect(input('D').checked).toBe(false);
        await click('A');
        await vi.waitFor(() => expect(half(host, 'P')).toBe(true));
        expect(value.value).toEqual(['B']);
      });
      it.each(['all', 'parentFirst'])(
        'preserves disabled selection when toggling the parent in %s mode',
        async (mode) => {
          const { host, input, value, click } = await mountTree(mode, ['D']);
          await click('P');
          await vi.waitFor(() => expect(checked(host, 'P')).toBe(true));
          expect(value.value).toEqual(mode === 'all' ? ['P', 'A', 'B', 'D'] : ['P', 'D']);
          expect(input('D').checked).toBe(true);
          await click('P');
          await vi.waitFor(() => expect(value.value).toEqual(['D']));
          expect(checked(host, 'P')).toBe(false);
          expect(half(host, 'P')).toBe(true);
          expect(input('D').checked).toBe(true);
        },
      );
    });

    describe('checkAllAffectedBy changes on loaded nodes', () => {
      it('updates parent selection without changing the controlled value or emitting change', async () => {
        const ctx = await mountTree('parentFirst', ['A', 'B'], 'onlyEnabled');
        expect(checked(ctx.host, 'P')).toBe(true);
        ctx.scope.value = 'all';
        await vi.waitFor(() => expect(half(ctx.host, 'P')).toBe(true));
        expect(checked(ctx.host, 'P')).toBe(false);
        expect(ctx.value.value).toEqual(['A', 'B']);
        ctx.scope.value = 'onlyEnabled';
        await vi.waitFor(() => expect(checked(ctx.host, 'P')).toBe(true));
        expect(half(ctx.host, 'P')).toBe(false);
        expect(ctx.value.value).toEqual(['A', 'B']);
        expect(ctx.onChange).not.toHaveBeenCalled();
      });
    });
    describe('lazy loading', () => {
      // Issue: https://github.com/Tencent/tdesign-common/pull/2753
      it.each(['all', 'onlyEnabled'] as const)(
        '%s preserves disabled child selection during loading',
        async (scope) => {
          let resolveLoad: (nodes: TdTreeProps['data']) => void;
          const load = vi.fn(
            () =>
              new Promise<TdTreeProps['data']>((resolve) => {
                resolveLoad = resolve;
              }),
          );
          const ctx = await mountTree('parentFirst', ['P'], scope, {
            data: [{ value: 'P', children: true }],
            load,
            lazy: true,
            expandAll: false,
          });
          expect(checked(ctx.host, 'P')).toBe(true);
          ctx.wrapper.findComponent(Tree).vm.setItem('P', { expanded: true });
          await vi.waitFor(() => expect(load).toHaveBeenCalledTimes(1));
          resolveLoad([{ value: 'A' }, { value: 'D', disabled: true }, { value: 'E', disabled: true, checked: true }]);
          await vi.waitFor(() => expect(ctx.input('E')).not.toBeNull());
          expect(ctx.input('A').checked).toBe(true);
          expect(ctx.input('D').checked).toBe(false);
          expect(ctx.input('D').disabled).toBe(true);
          expect(ctx.input('E').checked).toBe(true);
          expect(checked(ctx.host, 'P')).toBe(scope === 'onlyEnabled');
          expect(half(ctx.host, 'P')).toBe(scope === 'all');
          expect(ctx.value.value).toEqual(['P']);
          expect(ctx.onChange).not.toHaveBeenCalled();
        },
      );
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
