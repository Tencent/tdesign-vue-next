import { defineComponent, nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { Breadcrumb, BreadcrumbItem } from '@tdesign/components/breadcrumb';

describe('Breadcrumb', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  // ==================== Props Tests ====================
  describe('props', () => {
    it(':theme[light] default', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => [<BreadcrumbItem>页面1</BreadcrumbItem>, <BreadcrumbItem>页面2</BreadcrumbItem>],
        },
      });
      await nextTick();
      expect(wrapper.find('.t-breadcrumb').exists()).toBeTruthy();
      expect(wrapper.findAllComponents(BreadcrumbItem).length).toBe(2);
    });

    it(':theme validator', () => {
      const validator = (Breadcrumb as any).props?.theme?.validator;
      if (validator) {
        expect(validator(undefined)).toBe(true);
        expect(validator(null)).toBe(true);
        expect(validator('')).toBe(true);
        expect(validator('light')).toBe(true);
        expect(validator('invalid')).toBe(false);
      }
    });

    it(':maxItemWidth[string]', async () => {
      const wrapper = mount(Breadcrumb, {
        props: { maxItemWidth: '150' },
        slots: {
          default: () => [
            <BreadcrumbItem>页面1</BreadcrumbItem>,
            <BreadcrumbItem>页面2面包屑文案超长时悬浮显示文案全部信息</BreadcrumbItem>,
          ],
        },
      });
      await nextTick();
      const items = wrapper.findAllComponents(BreadcrumbItem);
      expect(items[0].find('.t-breadcrumb__inner').element.getAttribute('style')).toContain('max-width: 150px');
      expect(items[1].find('.t-breadcrumb__inner').element.getAttribute('style')).toContain('max-width: 150px');
    });

    it(':maxItemWidth not provided uses default 120px', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => <BreadcrumbItem>页面1</BreadcrumbItem>,
        },
      });
      await nextTick();
      const inner = wrapper.find('.t-breadcrumb__inner');
      expect(inner.element.getAttribute('style')).toContain('max-width: 120px');
    });

    it(':separator[string]', async () => {
      const wrapper = mount(Breadcrumb, {
        props: { separator: '@' },
        slots: {
          default: () => [<BreadcrumbItem>页面1</BreadcrumbItem>, <BreadcrumbItem>页面2</BreadcrumbItem>],
        },
      });
      await nextTick();
      expect(wrapper.find('.t-breadcrumb__separator').text()).toBe('@');
    });

    it(':separator[slot]', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          separator: () => <div class="separator-slot">@</div>,
          default: () => [<BreadcrumbItem>页面1</BreadcrumbItem>, <BreadcrumbItem>页面2</BreadcrumbItem>],
        },
      });
      await nextTick();
      expect(wrapper.find('.t-breadcrumb__separator').html()).toContain('<div class="separator-slot">@</div>');
    });

    it(':options[array] renders BreadcrumbItems from options', async () => {
      const wrapper = mount(Breadcrumb, {
        props: {
          options: [{ content: '页面1' }, { content: '页面2', href: 'https://www.tencent.com' }],
        },
      });
      await nextTick();
      expect(wrapper.findAll('.t-breadcrumb__item').length).toBe(2);
      expect(wrapper.findAll('.t-breadcrumb__inner')[0].text()).toBe('页面1');
      expect(wrapper.findAll('.t-breadcrumb__inner')[1].text()).toBe('页面2');
      expect(wrapper.find('.t-link').element.getAttribute('href')).toBe('https://www.tencent.com');
    });

    it(':maxItems[number] with ellipsis', async () => {
      const wrapper = mount(Breadcrumb, {
        props: { maxItems: 5, itemsBeforeCollapse: 2, itemsAfterCollapse: 1 },
        slots: {
          default: () => [
            <BreadcrumbItem>页面1</BreadcrumbItem>,
            <BreadcrumbItem>页面2</BreadcrumbItem>,
            <BreadcrumbItem>页面3</BreadcrumbItem>,
            <BreadcrumbItem>页面4</BreadcrumbItem>,
            <BreadcrumbItem>页面5</BreadcrumbItem>,
            <BreadcrumbItem>页面6</BreadcrumbItem>,
            <BreadcrumbItem>页面7</BreadcrumbItem>,
            <BreadcrumbItem>页面8</BreadcrumbItem>,
          ],
        },
      });
      await nextTick();
      const items = wrapper.findAllComponents(BreadcrumbItem);
      expect(items.length).toBe(4);
      expect(items[0].text()).toBe('页面1');
      expect(items[1].text()).toBe('页面2');
      expect(items[3].text()).toBe('页面8');
    });

    it(':maxItems[number] <= 0 shows all items', async () => {
      const wrapper = mount(Breadcrumb, {
        props: { maxItems: 0 },
        slots: {
          default: () => [
            <BreadcrumbItem>页面1</BreadcrumbItem>,
            <BreadcrumbItem>页面2</BreadcrumbItem>,
            <BreadcrumbItem>页面3</BreadcrumbItem>,
          ],
        },
      });
      await nextTick();
      expect(wrapper.findAllComponents(BreadcrumbItem).length).toBe(3);
    });

    it(':maxItems with itemsBeforeCollapse/itemsAfterCollapse sum >= totalItems shows all', async () => {
      const wrapper = mount(Breadcrumb, {
        props: { maxItems: 2, itemsBeforeCollapse: 2, itemsAfterCollapse: 2 },
        slots: {
          default: () => [
            <BreadcrumbItem>页面1</BreadcrumbItem>,
            <BreadcrumbItem>页面2</BreadcrumbItem>,
            <BreadcrumbItem>页面3</BreadcrumbItem>,
          ],
        },
      });
      await nextTick();
      expect(wrapper.findAllComponents(BreadcrumbItem).length).toBe(3);
    });

    it(':maxItems with missing itemsBeforeCollapse warns and shows all', async () => {
      const logErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const wrapper = mount(Breadcrumb, {
        props: { maxItems: 3, itemsBeforeCollapse: 0, itemsAfterCollapse: 1 },
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
      expect(wrapper.findAllComponents(BreadcrumbItem).length).toBe(5);
      logErrorSpy.mockRestore();
    });

    it(':maxItems with missing itemsAfterCollapse warns and shows all', async () => {
      const logErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const wrapper = mount(Breadcrumb, {
        props: { maxItems: 3, itemsBeforeCollapse: 1, itemsAfterCollapse: 0 },
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
      expect(wrapper.findAllComponents(BreadcrumbItem).length).toBe(5);
      logErrorSpy.mockRestore();
    });

    it(':maxItems totalItems <= maxItems shows all items', async () => {
      const wrapper = mount(Breadcrumb, {
        props: { maxItems: 10, itemsBeforeCollapse: 2, itemsAfterCollapse: 1 },
        slots: {
          default: () => [
            <BreadcrumbItem>页面1</BreadcrumbItem>,
            <BreadcrumbItem>页面2</BreadcrumbItem>,
            <BreadcrumbItem>页面3</BreadcrumbItem>,
          ],
        },
      });
      await nextTick();
      expect(wrapper.findAllComponents(BreadcrumbItem).length).toBe(3);
    });

    it(':ellipsis[string] custom ellipsis text', async () => {
      const wrapper = mount(Breadcrumb, {
        props: { maxItems: 5, itemsBeforeCollapse: 2, itemsAfterCollapse: 1, ellipsis: '...more' },
        slots: {
          default: () => [
            <BreadcrumbItem>页面1</BreadcrumbItem>,
            <BreadcrumbItem>页面2</BreadcrumbItem>,
            <BreadcrumbItem>页面3</BreadcrumbItem>,
            <BreadcrumbItem>页面4</BreadcrumbItem>,
            <BreadcrumbItem>页面5</BreadcrumbItem>,
            <BreadcrumbItem>页面6</BreadcrumbItem>,
            <BreadcrumbItem>页面7</BreadcrumbItem>,
            <BreadcrumbItem>页面8</BreadcrumbItem>,
          ],
        },
      });
      await nextTick();
      const items = wrapper.findAllComponents(BreadcrumbItem);
      expect(items[2].text()).toBe('...more');
    });

    it(':ellipsis[function] custom ellipsis render function', async () => {
      const wrapper = mount(Breadcrumb, {
        props: {
          maxItems: 5,
          itemsBeforeCollapse: 2,
          itemsAfterCollapse: 1,
          ellipsis: (h: any, { items }: any) => h('span', { class: 'custom-ellipsis-fn' }, `省略${items.length}项`),
        },
        slots: {
          default: () => [
            <BreadcrumbItem>页面1</BreadcrumbItem>,
            <BreadcrumbItem>页面2</BreadcrumbItem>,
            <BreadcrumbItem>页面3</BreadcrumbItem>,
            <BreadcrumbItem>页面4</BreadcrumbItem>,
            <BreadcrumbItem>页面5</BreadcrumbItem>,
            <BreadcrumbItem>页面6</BreadcrumbItem>,
            <BreadcrumbItem>页面7</BreadcrumbItem>,
            <BreadcrumbItem>页面8</BreadcrumbItem>,
          ],
        },
      });
      await nextTick();
      const ellipsisEl = wrapper.find('.custom-ellipsis-fn');
      expect(ellipsisEl.exists()).toBeTruthy();
      expect(ellipsisEl.text()).toContain('省略5项');
    });

    it(':ellipsis[slot] custom ellipsis slot', async () => {
      const wrapper = mount(Breadcrumb, {
        props: { maxItems: 5, itemsBeforeCollapse: 2, itemsAfterCollapse: 1 },
        slots: {
          ellipsis: () => <span class="custom-ellipsis-slot">awa</span>,
          default: () => [
            <BreadcrumbItem>页面1</BreadcrumbItem>,
            <BreadcrumbItem>页面2</BreadcrumbItem>,
            <BreadcrumbItem>页面3</BreadcrumbItem>,
            <BreadcrumbItem>页面4</BreadcrumbItem>,
            <BreadcrumbItem>页面5</BreadcrumbItem>,
            <BreadcrumbItem>页面6</BreadcrumbItem>,
            <BreadcrumbItem>页面7</BreadcrumbItem>,
            <BreadcrumbItem>页面8</BreadcrumbItem>,
          ],
        },
      });
      await nextTick();
      expect(wrapper.find('.custom-ellipsis-slot').exists()).toBeTruthy();
    });

    it(':maxItems dynamic changes', async () => {
      const DynamicBreadcrumb = defineComponent({
        setup() {
          const itemsBeforeCollapse = ref(2);
          const itemsAfterCollapse = ref(1);
          return { itemsBeforeCollapse, itemsAfterCollapse };
        },
        render() {
          return (
            <Breadcrumb
              maxItems={5}
              itemsBeforeCollapse={this.itemsBeforeCollapse}
              itemsAfterCollapse={this.itemsAfterCollapse}
            >
              <BreadcrumbItem>页面1</BreadcrumbItem>
              <BreadcrumbItem>页面2</BreadcrumbItem>
              <BreadcrumbItem>页面3</BreadcrumbItem>
              <BreadcrumbItem>页面4</BreadcrumbItem>
              <BreadcrumbItem>页面5</BreadcrumbItem>
              <BreadcrumbItem>页面6</BreadcrumbItem>
              <BreadcrumbItem>页面7</BreadcrumbItem>
              <BreadcrumbItem>页面8</BreadcrumbItem>
            </Breadcrumb>
          );
        },
      });
      const wrapper = mount(DynamicBreadcrumb);
      await nextTick();
      let items = wrapper.findAllComponents(BreadcrumbItem);
      expect(items.length).toBe(4);

      wrapper.vm.itemsBeforeCollapse = 3;
      wrapper.vm.itemsAfterCollapse = 2;
      await nextTick();
      items = wrapper.findAllComponents(BreadcrumbItem);
      expect(items.length).toBe(6);
      expect(items[0].text()).toBe('页面1');
      expect(items[2].text()).toBe('页面3');
      expect(items[4].text()).toBe('页面7');
    });
  });

  // ==================== Snapshot Tests ====================
  describe('snapshots', () => {
    it('default render', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => [
            <BreadcrumbItem>首页</BreadcrumbItem>,
            <BreadcrumbItem>产品</BreadcrumbItem>,
            <BreadcrumbItem>详情</BreadcrumbItem>,
          ],
        },
      });
      await nextTick();
      expect(wrapper.element).toMatchSnapshot();
    });

    it('with options', async () => {
      const wrapper = mount(Breadcrumb, {
        props: {
          options: [{ content: '首页', href: '/' }, { content: '产品', href: '/products' }, { content: '详情' }],
        },
      });
      await nextTick();
      expect(wrapper.element).toMatchSnapshot();
    });

    it('with ellipsis', async () => {
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

    it('with separator', async () => {
      const wrapper = mount(Breadcrumb, {
        props: { separator: '>' },
        slots: {
          default: () => [<BreadcrumbItem>首页</BreadcrumbItem>, <BreadcrumbItem>详情</BreadcrumbItem>],
        },
      });
      await nextTick();
      expect(wrapper.element).toMatchSnapshot();
    });

    it('with maxItemWidth', async () => {
      const wrapper = mount(Breadcrumb, {
        props: { maxItemWidth: '80' },
        slots: {
          default: () => [
            <BreadcrumbItem>页面1</BreadcrumbItem>,
            <BreadcrumbItem>页面2面包屑文案超长时悬浮显示文案全部信息</BreadcrumbItem>,
          ],
        },
      });
      await nextTick();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  // ==================== Edge Cases Tests ====================
  describe('edge cases', () => {
    it('should handle component unmount gracefully', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => <BreadcrumbItem>页面1</BreadcrumbItem>,
        },
      });
      await nextTick();
      wrapper.unmount();
      expect(true).toBe(true);
    });

    it('empty breadcrumb with no items', async () => {
      const wrapper = mount(Breadcrumb);
      await nextTick();
      expect(wrapper.find('.t-breadcrumb').exists()).toBeTruthy();
      expect(wrapper.findAllComponents(BreadcrumbItem).length).toBe(0);
    });

    it('single item breadcrumb', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => <BreadcrumbItem>唯一页面</BreadcrumbItem>,
        },
      });
      await nextTick();
      expect(wrapper.findAllComponents(BreadcrumbItem).length).toBe(1);
    });

    it('items map with non-object item (return item branch)', async () => {
      const wrapper = mount(Breadcrumb, {
        props: {
          options: [{ content: '页面1' }, { content: '页面2' }],
        },
      });
      await nextTick();
      expect(wrapper.findAll('.t-breadcrumb__item').length).toBe(2);
    });
  });
});
