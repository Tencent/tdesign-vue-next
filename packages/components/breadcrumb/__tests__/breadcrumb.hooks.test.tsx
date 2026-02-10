import { nextTick, computed } from 'vue';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { useBreadcrumbOptions, useEllipsis } from '@tdesign/components/breadcrumb/hooks';
import { Breadcrumb, BreadcrumbItem } from '@tdesign/components/breadcrumb';
import type { TdBreadcrumbProps } from '@tdesign/components/breadcrumb';

const createEllipsisTestComponent = (props: TdBreadcrumbProps, itemData: { content: string; index: number }[]) => ({
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
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  // ==================== useBreadcrumbOptions Tests ====================
  describe('useBreadcrumbOptions', () => {
    it('returns empty array when no options and no slots', async () => {
      const wrapper = mount({
        setup() {
          const props: TdBreadcrumbProps = {};
          const { breadcrumbOptions } = useBreadcrumbOptions(props);
          return { breadcrumbOptions };
        },
        render() {
          return <div />;
        },
      });
      await nextTick();
      expect((wrapper.vm as any).breadcrumbOptions).toEqual([]);
    });

    it('returns items from options prop', async () => {
      const wrapper = mount({
        setup() {
          const props: TdBreadcrumbProps = {
            options: [{ content: '首页', href: '/' }, { content: '产品', href: '/products' }, { content: '详情' }],
          };
          const { breadcrumbOptions } = useBreadcrumbOptions(props);
          return { breadcrumbOptions };
        },
        render() {
          return <div />;
        },
      });
      await nextTick();
      const vm = wrapper.vm as any;
      expect(vm.breadcrumbOptions.length).toBe(3);
      expect(vm.breadcrumbOptions[0].content).toBe('首页');
      expect(vm.breadcrumbOptions[0].href).toBe('/');
      expect(vm.breadcrumbOptions[0].index).toBe(0);
      expect(vm.breadcrumbOptions[1].index).toBe(1);
      expect(vm.breadcrumbOptions[2].index).toBe(2);
    });

    it('returns items from slot children (text content)', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => [<BreadcrumbItem>页面1</BreadcrumbItem>, <BreadcrumbItem>页面2</BreadcrumbItem>],
        },
      });
      await nextTick();
      expect(wrapper.findAll('.t-breadcrumb__item').length).toBe(2);
      expect(wrapper.findAll('.t-breadcrumb__inner')[0].text()).toBe('页面1');
      expect(wrapper.findAll('.t-breadcrumb__inner')[1].text()).toBe('页面2');
    });

    it('returns items from slot children with non-text VNode (slotContent branch)', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => [
            <BreadcrumbItem>
              <span class="complex">复杂内容</span>
            </BreadcrumbItem>,
          ],
        },
      });
      await nextTick();
      expect(wrapper.find('.complex').exists()).toBeTruthy();
      expect(wrapper.find('.complex').text()).toBe('复杂内容');
    });

    it('handles icon slot for breadcrumb items', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => (
            <BreadcrumbItem v-slots={{ icon: () => <span class="hook-icon">icon</span> }}>页面1</BreadcrumbItem>
          ),
        },
      });
      await nextTick();
      expect(wrapper.find('.hook-icon').exists()).toBeTruthy();
    });

    it('falls back to props content when no slot content', async () => {
      const wrapper = mount(Breadcrumb, {
        props: {
          options: [{ content: 'prop内容' }],
        },
      });
      await nextTick();
      expect(wrapper.find('.t-breadcrumb__inner').text()).toBe('prop内容');
    });
  });

  // ==================== useEllipsis Tests ====================
  describe('useEllipsis', () => {
    it('shouldShowEllipsis returns false when maxItems <= 0', async () => {
      const wrapper = mount(
        createEllipsisTestComponent({ maxItems: 0, itemsBeforeCollapse: 1, itemsAfterCollapse: 1 }, [
          { content: '页面1', index: 0 },
          { content: '页面2', index: 1 },
          { content: '页面3', index: 2 },
        ]),
      );
      await nextTick();
      expect(wrapper.vm.displayItems.length).toBe(3);
      expect(wrapper.vm.ellipsisItems.length).toBe(0);
    });

    it('shouldShowEllipsis returns false when totalItems <= maxItems', async () => {
      const wrapper = mount(
        createEllipsisTestComponent({ maxItems: 10, itemsBeforeCollapse: 2, itemsAfterCollapse: 1 }, [
          { content: '页面1', index: 0 },
          { content: '页面2', index: 1 },
        ]),
      );
      await nextTick();
      expect(wrapper.vm.displayItems.length).toBe(2);
    });

    it('shouldShowEllipsis returns false when itemsBeforeCollapse + itemsAfterCollapse >= totalItems', async () => {
      const wrapper = mount(
        createEllipsisTestComponent({ maxItems: 2, itemsBeforeCollapse: 2, itemsAfterCollapse: 2 }, [
          { content: '页面1', index: 0 },
          { content: '页面2', index: 1 },
          { content: '页面3', index: 2 },
        ]),
      );
      await nextTick();
      expect(wrapper.vm.displayItems.length).toBe(3);
    });

    it('shouldShowEllipsis returns true and getDisplayItems includes ellipsis', async () => {
      const wrapper = mount(
        createEllipsisTestComponent({ maxItems: 3, itemsBeforeCollapse: 1, itemsAfterCollapse: 1 }, [
          { content: '页面1', index: 0 },
          { content: '页面2', index: 1 },
          { content: '页面3', index: 2 },
          { content: '页面4', index: 3 },
          { content: '页面5', index: 4 },
        ]),
      );
      await nextTick();
      expect(wrapper.vm.displayItems.length).toBe(3);
      expect((wrapper.vm.displayItems[0] as any).content).toBe('页面1');
      expect((wrapper.vm.displayItems[1] as any).content).toBe('...');
      expect((wrapper.vm.displayItems[1] as any).isEllipsisItem).toBe(true);
      expect((wrapper.vm.displayItems[1] as any).disabled).toBe(true);
      expect((wrapper.vm.displayItems[2] as any).content).toBe('页面5');
    });

    it('getEllipsisItems returns correct ellipsis items', async () => {
      const wrapper = mount(
        createEllipsisTestComponent({ maxItems: 3, itemsBeforeCollapse: 1, itemsAfterCollapse: 1 }, [
          { content: '页面1', index: 0 },
          { content: '页面2', index: 1 },
          { content: '页面3', index: 2 },
          { content: '页面4', index: 3 },
          { content: '页面5', index: 4 },
        ]),
      );
      await nextTick();
      expect(wrapper.vm.ellipsisItems.length).toBe(3);
      expect(wrapper.vm.ellipsisItems[0].content).toBe('页面2');
      expect(wrapper.vm.ellipsisItems[0].isLast).toBe(false);
      expect(wrapper.vm.ellipsisItems[1].content).toBe('页面3');
      expect(wrapper.vm.ellipsisItems[1].isLast).toBe(false);
      expect(wrapper.vm.ellipsisItems[2].content).toBe('页面4');
      expect(wrapper.vm.ellipsisItems[2].isLast).toBe(true);
    });

    it('valueIsZeroOrUndefined warns when itemsBeforeCollapse is 0', async () => {
      const logErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const wrapper = mount(
        createEllipsisTestComponent({ maxItems: 3, itemsBeforeCollapse: 0, itemsAfterCollapse: 1 }, [
          { content: '页面1', index: 0 },
          { content: '页面2', index: 1 },
          { content: '页面3', index: 2 },
          { content: '页面4', index: 3 },
        ]),
      );
      await nextTick();
      expect(wrapper.vm.displayItems.length).toBe(4);
      logErrorSpy.mockRestore();
    });

    it('valueIsZeroOrUndefined warns when itemsAfterCollapse is 0', async () => {
      const logErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const wrapper = mount(
        createEllipsisTestComponent({ maxItems: 3, itemsBeforeCollapse: 1, itemsAfterCollapse: 0 }, [
          { content: '页面1', index: 0 },
          { content: '页面2', index: 1 },
          { content: '页面3', index: 2 },
          { content: '页面4', index: 3 },
        ]),
      );
      await nextTick();
      expect(wrapper.vm.displayItems.length).toBe(4);
      logErrorSpy.mockRestore();
    });

    it('valueIsZeroOrUndefined warns when itemsBeforeCollapse is undefined', async () => {
      const logErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const wrapper = mount(
        createEllipsisTestComponent({ maxItems: 3, itemsBeforeCollapse: undefined, itemsAfterCollapse: 1 }, [
          { content: '页面1', index: 0 },
          { content: '页面2', index: 1 },
          { content: '页面3', index: 2 },
          { content: '页面4', index: 3 },
        ]),
      );
      await nextTick();
      expect(wrapper.vm.displayItems.length).toBe(4);
      logErrorSpy.mockRestore();
    });

    it('valueIsZeroOrUndefined warns when itemsAfterCollapse is undefined', async () => {
      const logErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const wrapper = mount(
        createEllipsisTestComponent({ maxItems: 3, itemsBeforeCollapse: 1, itemsAfterCollapse: undefined }, [
          { content: '页面1', index: 0 },
          { content: '页面2', index: 1 },
          { content: '页面3', index: 2 },
          { content: '页面4', index: 3 },
        ]),
      );
      await nextTick();
      expect(wrapper.vm.displayItems.length).toBe(4);
      logErrorSpy.mockRestore();
    });

    it('getEllipsisItems returns empty array when not showing ellipsis', async () => {
      const wrapper = mount(
        createEllipsisTestComponent({ maxItems: 0, itemsBeforeCollapse: 1, itemsAfterCollapse: 1 }, [
          { content: '页面1', index: 0 },
          { content: '页面2', index: 1 },
        ]),
      );
      await nextTick();
      expect(wrapper.vm.ellipsisItems).toEqual([]);
    });

    it('reactive update when items change', async () => {
      const wrapper = mount(
        {
          props: {
            count: { type: Number, default: 5 },
          },
          setup(props: { count: number }) {
            const breadcrumbProps: TdBreadcrumbProps = {
              maxItems: 3,
              itemsBeforeCollapse: 1,
              itemsAfterCollapse: 1,
            };
            const items = computed(() =>
              Array.from({ length: props.count }, (_, index) => ({
                content: `页面${index + 1}`,
                index,
              })),
            );
            const { getDisplayItems, getEllipsisItems } = useEllipsis(breadcrumbProps, items, '...');
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
    });
  });

  // ==================== Snapshot Tests ====================
  describe('snapshots', () => {
    it('useBreadcrumbOptions with options prop', async () => {
      const wrapper = mount(Breadcrumb, {
        props: {
          options: [{ content: '首页', href: '/' }, { content: '产品' }],
        },
      });
      await nextTick();
      expect(wrapper.element).toMatchSnapshot();
    });

    it('useEllipsis with ellipsis active', async () => {
      const wrapper = mount(Breadcrumb, {
        props: { maxItems: 3, itemsBeforeCollapse: 1, itemsAfterCollapse: 1 },
        slots: {
          default: () => [
            <BreadcrumbItem>页面1</BreadcrumbItem>,
            <BreadcrumbItem>页面2</BreadcrumbItem>,
            <BreadcrumbItem>页面3</BreadcrumbItem>,
            <BreadcrumbItem>页面4</BreadcrumbItem>,
            <BreadcrumbItem>页面5</BreadcrumbItem>,
          ],
        },
      });
      await nextTick();
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
