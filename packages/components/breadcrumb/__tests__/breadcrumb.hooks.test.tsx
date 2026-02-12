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
    it('returns empty array when no options and no slots', async () => {
      const wrapper = mount({
        setup() {
          const { breadcrumbOptions } = useBreadcrumbOptions({});
          return { breadcrumbOptions };
        },
        render() {
          return <div />;
        },
      });
      await nextTick();
      expect((wrapper.vm as any).breadcrumbOptions).toEqual([]);
      wrapper.unmount();
    });

    it('returns items from options prop with correct index', async () => {
      const wrapper = mount({
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
      const opts = (wrapper.vm as any).breadcrumbOptions;
      expect(opts.length).toBe(3);
      expect(opts[0].content).toBe('首页');
      expect(opts[0].href).toBe('/');
      expect(opts[0].index).toBe(0);
      expect(opts[1].content).toBe('产品');
      expect(opts[1].index).toBe(1);
      expect(opts[2].index).toBe(2);
      wrapper.unmount();
    });

    it('collects slot children as breadcrumb items', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => [<BreadcrumbItem>A</BreadcrumbItem>, <BreadcrumbItem>B</BreadcrumbItem>],
        },
      });
      await nextTick();
      expect(wrapper.findAll('.t-breadcrumb__item').length).toBe(2);
      expect(wrapper.findAll('.t-breadcrumb__inner')[0].text()).toBe('A');
      expect(wrapper.findAll('.t-breadcrumb__inner')[1].text()).toBe('B');
      wrapper.unmount();
    });

    it('handles VNode children in slots', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => (
            <BreadcrumbItem>
              <span class="vnode">复杂</span>
            </BreadcrumbItem>
          ),
        },
      });
      await nextTick();
      expect(wrapper.find('.vnode').exists()).toBe(true);
      expect(wrapper.find('.vnode').text()).toBe('复杂');
      wrapper.unmount();
    });

    it('handles icon slot', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => <BreadcrumbItem v-slots={{ icon: () => <span class="ic">I</span> }}>A</BreadcrumbItem>,
        },
      });
      await nextTick();
      expect(wrapper.find('.ic').exists()).toBe(true);
      wrapper.unmount();
    });
  });

  describe('useEllipsis', () => {
    it('does not ellipsis when maxItems <= 0', async () => {
      const wrapper = mountEllipsis({ maxItems: 0, itemsBeforeCollapse: 1, itemsAfterCollapse: 1 }, makeItems(5));
      await nextTick();
      expect(wrapper.vm.displayItems.length).toBe(5);
      expect(wrapper.vm.ellipsisItems.length).toBe(0);
      wrapper.unmount();
    });

    it('does not ellipsis when totalItems <= maxItems', async () => {
      const wrapper = mountEllipsis({ maxItems: 10, itemsBeforeCollapse: 2, itemsAfterCollapse: 1 }, makeItems(3));
      await nextTick();
      expect(wrapper.vm.displayItems.length).toBe(3);
      expect(wrapper.vm.ellipsisItems.length).toBe(0);
      wrapper.unmount();
    });

    it('does not ellipsis when collapse sum >= totalItems', async () => {
      const wrapper = mountEllipsis({ maxItems: 2, itemsBeforeCollapse: 3, itemsAfterCollapse: 3 }, makeItems(4));
      await nextTick();
      expect(wrapper.vm.displayItems.length).toBe(4);
      wrapper.unmount();
    });

    it('inserts ellipsis item correctly', async () => {
      const wrapper = mountEllipsis({ maxItems: 3, itemsBeforeCollapse: 1, itemsAfterCollapse: 1 }, makeItems(5));
      await nextTick();
      const display = wrapper.vm.displayItems;
      expect(display.length).toBe(3);
      expect((display[0] as any).content).toBe('P1');
      expect((display[1] as any).content).toBe('...');
      expect((display[1] as any).isEllipsisItem).toBe(true);
      expect((display[1] as any).disabled).toBe(true);
      expect((display[2] as any).content).toBe('P5');
      wrapper.unmount();
    });

    it('getEllipsisItems returns collapsed items with isLast', async () => {
      const wrapper = mountEllipsis({ maxItems: 3, itemsBeforeCollapse: 1, itemsAfterCollapse: 1 }, makeItems(5));
      await nextTick();
      const collapsed = wrapper.vm.ellipsisItems;
      expect(collapsed.length).toBe(3);
      expect(collapsed[0].content).toBe('P2');
      expect(collapsed[0].isLast).toBe(false);
      expect(collapsed[2].content).toBe('P4');
      expect(collapsed[2].isLast).toBe(true);
      wrapper.unmount();
    });

    it('warns when itemsBeforeCollapse is 0', async () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const wrapper = mountEllipsis({ maxItems: 3, itemsBeforeCollapse: 0, itemsAfterCollapse: 1 }, makeItems(5));
      await nextTick();
      // 配置有误时不省略，显示全部
      expect(wrapper.vm.displayItems.length).toBe(5);
      spy.mockRestore();
      wrapper.unmount();
    });

    it('warns when itemsAfterCollapse is undefined', async () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const wrapper = mountEllipsis(
        { maxItems: 3, itemsBeforeCollapse: 1, itemsAfterCollapse: undefined },
        makeItems(5),
      );
      await nextTick();
      expect(wrapper.vm.displayItems.length).toBe(5);
      spy.mockRestore();
      wrapper.unmount();
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
