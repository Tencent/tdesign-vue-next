import { nextTick, computed } from 'vue';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { useBreadcrumbOptions, useEllipsis } from '@tdesign/components/breadcrumb/hooks';
import { Breadcrumb, BreadcrumbItem } from '@tdesign/components/breadcrumb';
import type { TdBreadcrumbProps } from '@tdesign/components/breadcrumb';

const makeItems = (count: number) => Array.from({ length: count }, (_, i) => ({ content: `P${i + 1}`, index: i }));

const mountEllipsis = (props: TdBreadcrumbProps, itemData: { content: string; index: number }[]) =>
  mount({
    setup() {
      const items = computed(() => itemData);
      const { getDisplayItems, getEllipsisItems } = useEllipsis(props, items, '...');
      return { displayItems: getDisplayItems, ellipsisItems: getEllipsisItems };
    },
    render() {
      return <div />;
    },
  });

describe('Breadcrumb hooks', () => {
  describe('useBreadcrumbOptions', () => {
    it('returns items from options prop', async () => {
      // 无 options: 空数组
      const wrapper1 = mount({
        setup() {
          const { breadcrumbOptions } = useBreadcrumbOptions({});
          return { breadcrumbOptions };
        },
        render() {
          return <div />;
        },
      });
      await nextTick();
      expect((wrapper1.vm as any).breadcrumbOptions).toEqual([]);
      wrapper1.unmount();

      // 有 options: 正确的 content/href/index
      const wrapper2 = mount({
        setup() {
          const { breadcrumbOptions } = useBreadcrumbOptions({
            options: [{ content: '首页', href: '/' }, { content: '产品' }, { content: '详情' }],
          });
          return { breadcrumbOptions };
        },
        render() {
          return <div />;
        },
      });
      await nextTick();
      const opts = (wrapper2.vm as any).breadcrumbOptions;
      expect(opts.length).toBe(3);
      expect(opts[0].content).toBe('首页');
      expect(opts[0].href).toBe('/');
      expect(opts[0].index).toBe(0);
      expect(opts[1].content).toBe('产品');
      expect(opts[1].index).toBe(1);
      expect(opts[2].index).toBe(2);
      wrapper2.unmount();
    });

    it('collects items from slot children', async () => {
      // 文本子节点
      const wrapper1 = mount(Breadcrumb, {
        slots: {
          default: () => [<BreadcrumbItem>A</BreadcrumbItem>, <BreadcrumbItem>B</BreadcrumbItem>],
        },
      });
      await nextTick();
      expect(wrapper1.findAll('.t-breadcrumb__item').length).toBe(2);
      expect(wrapper1.findAll('.t-breadcrumb__inner')[0].text()).toBe('A');
      expect(wrapper1.findAll('.t-breadcrumb__inner')[1].text()).toBe('B');
      wrapper1.unmount();

      // VNode 子节点
      const wrapper2 = mount(Breadcrumb, {
        slots: {
          default: () => (
            <BreadcrumbItem>
              <span class="vnode">复杂</span>
            </BreadcrumbItem>
          ),
        },
      });
      await nextTick();
      expect(wrapper2.find('.vnode').exists()).toBe(true);
      expect(wrapper2.find('.vnode').text()).toBe('复杂');
      wrapper2.unmount();

      // icon slot
      const wrapper3 = mount(Breadcrumb, {
        slots: {
          default: () => <BreadcrumbItem v-slots={{ icon: () => <span class="ic">I</span> }}>A</BreadcrumbItem>,
        },
      });
      await nextTick();
      expect(wrapper3.find('.ic').exists()).toBe(true);
      wrapper3.unmount();
    });
  });

  describe('useEllipsis', () => {
    it('does not ellipsis in boundary cases', async () => {
      // maxItems <= 0
      const wrapper1 = mountEllipsis({ maxItems: 0, itemsBeforeCollapse: 1, itemsAfterCollapse: 1 }, makeItems(5));
      await nextTick();
      expect(wrapper1.vm.displayItems.length).toBe(5);
      expect(wrapper1.vm.ellipsisItems.length).toBe(0);
      wrapper1.unmount();

      // totalItems <= maxItems
      const wrapper2 = mountEllipsis({ maxItems: 10, itemsBeforeCollapse: 2, itemsAfterCollapse: 1 }, makeItems(3));
      await nextTick();
      expect(wrapper2.vm.displayItems.length).toBe(3);
      expect(wrapper2.vm.ellipsisItems.length).toBe(0);
      wrapper2.unmount();

      // collapse sum >= totalItems
      const wrapper3 = mountEllipsis({ maxItems: 2, itemsBeforeCollapse: 3, itemsAfterCollapse: 3 }, makeItems(4));
      await nextTick();
      expect(wrapper3.vm.displayItems.length).toBe(4);
      wrapper3.unmount();
    });

    it('inserts ellipsis item and returns collapsed items', async () => {
      const wrapper = mountEllipsis({ maxItems: 3, itemsBeforeCollapse: 1, itemsAfterCollapse: 1 }, makeItems(5));
      await nextTick();

      // displayItems: P1 + ellipsis + P5
      const display = wrapper.vm.displayItems;
      expect(display.length).toBe(3);
      expect((display[0] as any).content).toBe('P1');
      expect((display[1] as any).content).toBe('...');
      expect((display[1] as any).isEllipsisItem).toBe(true);
      expect((display[1] as any).disabled).toBe(true);
      expect((display[2] as any).content).toBe('P5');

      // ellipsisItems: P2/P3/P4, 最后一项 isLast=true
      const collapsed = wrapper.vm.ellipsisItems;
      expect(collapsed.length).toBe(3);
      expect(collapsed[0].content).toBe('P2');
      expect(collapsed[0].isLast).toBe(false);
      expect(collapsed[2].content).toBe('P4');
      expect(collapsed[2].isLast).toBe(true);
      wrapper.unmount();
    });

    it('warns on invalid collapse config', async () => {
      // itemsBeforeCollapse=0
      const spy1 = vi.spyOn(console, 'error').mockImplementation(() => {});
      const wrapper1 = mountEllipsis({ maxItems: 3, itemsBeforeCollapse: 0, itemsAfterCollapse: 1 }, makeItems(5));
      await nextTick();
      expect(wrapper1.vm.displayItems.length).toBe(5);
      spy1.mockRestore();
      wrapper1.unmount();

      // itemsAfterCollapse=undefined
      const spy2 = vi.spyOn(console, 'error').mockImplementation(() => {});
      const wrapper2 = mountEllipsis(
        { maxItems: 3, itemsBeforeCollapse: 1, itemsAfterCollapse: undefined },
        makeItems(5),
      );
      await nextTick();
      expect(wrapper2.vm.displayItems.length).toBe(5);
      spy2.mockRestore();
      wrapper2.unmount();
    });

    it('reacts to item count changes', async () => {
      const wrapper = mount(
        {
          props: { count: { type: Number, default: 5 } },
          setup(props: { count: number }) {
            const items = computed(() => makeItems(props.count));
            const { getDisplayItems, getEllipsisItems } = useEllipsis(
              { maxItems: 3, itemsBeforeCollapse: 1, itemsAfterCollapse: 1 },
              items,
              '...',
            );
            return { displayItems: getDisplayItems, ellipsisItems: getEllipsisItems };
          },
          render() {
            return <div />;
          },
        },
        { props: { count: 5 } },
      );
      await nextTick();
      expect(wrapper.vm.displayItems.length).toBe(3);
      expect(wrapper.vm.ellipsisItems.length).toBe(3);

      await wrapper.setProps({ count: 2 });
      await nextTick();
      expect(wrapper.vm.displayItems.length).toBe(2);
      expect(wrapper.vm.ellipsisItems.length).toBe(0);
      wrapper.unmount();
    });
  });
});
