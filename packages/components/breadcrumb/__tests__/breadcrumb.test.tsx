import { defineComponent, nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { Breadcrumb, BreadcrumbItem } from '@tdesign/components/breadcrumb';
import breadcrumbProps from '@tdesign/components/breadcrumb/props';

describe('Breadcrumb', () => {
  describe('props', () => {
    let wrapper!: VueWrapper<InstanceType<typeof Breadcrumb>>;

    afterEach(() => {
      wrapper?.unmount();
    });

    it(':theme[light]', async () => {
      const validator = breadcrumbProps.theme.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('light')).toBe(true);
      // @ts-expect-error
      expect(validator('dark')).toBe(false);

      wrapper = mount(Breadcrumb, {
        slots: {
          default: () => [<BreadcrumbItem>页面1</BreadcrumbItem>, <BreadcrumbItem>页面2</BreadcrumbItem>],
        },
      }) as VueWrapper<InstanceType<typeof Breadcrumb>>;
      await nextTick();
      expect(wrapper.find('.t-breadcrumb').exists()).toBe(true);
    });

    it(':maxItemWidth[string]', async () => {
      wrapper = mount(Breadcrumb, {
        slots: {
          default: () => <BreadcrumbItem>页面1</BreadcrumbItem>,
        },
      }) as VueWrapper<InstanceType<typeof Breadcrumb>>;
      await nextTick();
      // 默认 120px
      expect((wrapper.find('.t-breadcrumb__inner').element as HTMLElement).style.maxWidth).toBe('120px');
      wrapper.unmount();

      // 自定义 maxItemWidth
      wrapper = mount(Breadcrumb, {
        props: { maxItemWidth: '200' },
        slots: {
          default: () => [<BreadcrumbItem>页面1</BreadcrumbItem>, <BreadcrumbItem>页面2</BreadcrumbItem>],
        },
      }) as VueWrapper<InstanceType<typeof Breadcrumb>>;
      await nextTick();
      const items = wrapper.findAllComponents(BreadcrumbItem);
      expect((items[0].find('.t-breadcrumb__inner').element as HTMLElement).style.maxWidth).toBe('200px');
      expect((items[1].find('.t-breadcrumb__inner').element as HTMLElement).style.maxWidth).toBe('200px');
    });

    it(':separator[string]', async () => {
      wrapper = mount(Breadcrumb, {
        props: { separator: '/' },
        slots: {
          default: () => [<BreadcrumbItem>页面1</BreadcrumbItem>, <BreadcrumbItem>页面2</BreadcrumbItem>],
        },
      }) as VueWrapper<InstanceType<typeof Breadcrumb>>;
      await nextTick();
      expect(wrapper.find('.t-breadcrumb__separator').text()).toBe('/');
    });

    it(':separator[slot]', async () => {
      wrapper = mount(Breadcrumb, {
        slots: {
          separator: () => <span class="my-sep">&gt;</span>,
          default: () => [<BreadcrumbItem>页面1</BreadcrumbItem>, <BreadcrumbItem>页面2</BreadcrumbItem>],
        },
      }) as VueWrapper<InstanceType<typeof Breadcrumb>>;
      await nextTick();
      expect(wrapper.find('.t-breadcrumb__separator .my-sep').exists()).toBe(true);
    });

    it(':separator default renders ChevronRightIcon', async () => {
      wrapper = mount(Breadcrumb, {
        slots: {
          default: () => [<BreadcrumbItem>页面1</BreadcrumbItem>, <BreadcrumbItem>页面2</BreadcrumbItem>],
        },
      }) as VueWrapper<InstanceType<typeof Breadcrumb>>;
      await nextTick();
      // 默认分隔符是 ChevronRightIcon，渲染为 svg
      expect(wrapper.find('.t-breadcrumb__separator svg').exists()).toBe(true);
    });

    it(':options[array]', async () => {
      wrapper = mount(Breadcrumb, {
        props: {
          options: [{ content: '首页' }, { content: '产品', href: 'https://tdesign.tencent.com' }, { content: '详情' }],
        },
      }) as VueWrapper<InstanceType<typeof Breadcrumb>>;
      await nextTick();
      const items = wrapper.findAll('.t-breadcrumb__item');
      expect(items.length).toBe(3);
      expect(wrapper.findAll('.t-breadcrumb__inner')[0].text()).toBe('首页');
      expect(wrapper.findAll('.t-breadcrumb__inner')[1].text()).toBe('产品');
      expect(wrapper.findAll('.t-breadcrumb__inner')[2].text()).toBe('详情');
      // 带 href 的项渲染为 <a>
      expect(wrapper.find('a.t-link').attributes('href')).toBe('https://tdesign.tencent.com');
    });

    it(':maxItems[number] + :itemsBeforeCollapse[number] + :itemsAfterCollapse[number]', async () => {
      wrapper = mount(Breadcrumb, {
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
      }) as VueWrapper<InstanceType<typeof Breadcrumb>>;
      await nextTick();
      const items = wrapper.findAllComponents(BreadcrumbItem);
      // 2 before + 1 ellipsis + 1 after = 4
      expect(items.length).toBe(4);
      expect(items[0].text()).toBe('页面1');
      expect(items[1].text()).toBe('页面2');
      // items[2] 是省略号项
      expect(items[3].text()).toBe('页面8');
    });

    it(':maxItems <= 0 shows all items', async () => {
      wrapper = mount(Breadcrumb, {
        props: { maxItems: 0 },
        slots: {
          default: () => [
            <BreadcrumbItem>页面1</BreadcrumbItem>,
            <BreadcrumbItem>页面2</BreadcrumbItem>,
            <BreadcrumbItem>页面3</BreadcrumbItem>,
          ],
        },
      }) as VueWrapper<InstanceType<typeof Breadcrumb>>;
      await nextTick();
      expect(wrapper.findAllComponents(BreadcrumbItem).length).toBe(3);
    });

    it(':maxItems totalItems <= maxItems shows all items', async () => {
      wrapper = mount(Breadcrumb, {
        props: { maxItems: 10, itemsBeforeCollapse: 2, itemsAfterCollapse: 1 },
        slots: {
          default: () => [<BreadcrumbItem>页面1</BreadcrumbItem>, <BreadcrumbItem>页面2</BreadcrumbItem>],
        },
      }) as VueWrapper<InstanceType<typeof Breadcrumb>>;
      await nextTick();
      expect(wrapper.findAllComponents(BreadcrumbItem).length).toBe(2);
    });

    it(':maxItems collapse sum >= totalItems shows all items', async () => {
      wrapper = mount(Breadcrumb, {
        props: { maxItems: 2, itemsBeforeCollapse: 2, itemsAfterCollapse: 2 },
        slots: {
          default: () => [
            <BreadcrumbItem>页面1</BreadcrumbItem>,
            <BreadcrumbItem>页面2</BreadcrumbItem>,
            <BreadcrumbItem>页面3</BreadcrumbItem>,
          ],
        },
      }) as VueWrapper<InstanceType<typeof Breadcrumb>>;
      await nextTick();
      expect(wrapper.findAllComponents(BreadcrumbItem).length).toBe(3);
    });

    it(':maxItems warns and shows all when itemsBeforeCollapse is 0', async () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      wrapper = mount(Breadcrumb, {
        props: { maxItems: 3, itemsBeforeCollapse: 0, itemsAfterCollapse: 1 },
        slots: {
          default: () => [
            <BreadcrumbItem>页面1</BreadcrumbItem>,
            <BreadcrumbItem>页面2</BreadcrumbItem>,
            <BreadcrumbItem>页面3</BreadcrumbItem>,
            <BreadcrumbItem>页面4</BreadcrumbItem>,
          ],
        },
      }) as VueWrapper<InstanceType<typeof Breadcrumb>>;
      await nextTick();
      expect(wrapper.findAllComponents(BreadcrumbItem).length).toBe(4);
      spy.mockRestore();
    });

    it(':maxItems warns and shows all when itemsAfterCollapse is 0', async () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      wrapper = mount(Breadcrumb, {
        props: { maxItems: 3, itemsBeforeCollapse: 1, itemsAfterCollapse: 0 },
        slots: {
          default: () => [
            <BreadcrumbItem>页面1</BreadcrumbItem>,
            <BreadcrumbItem>页面2</BreadcrumbItem>,
            <BreadcrumbItem>页面3</BreadcrumbItem>,
            <BreadcrumbItem>页面4</BreadcrumbItem>,
          ],
        },
      }) as VueWrapper<InstanceType<typeof Breadcrumb>>;
      await nextTick();
      expect(wrapper.findAllComponents(BreadcrumbItem).length).toBe(4);
      spy.mockRestore();
    });

    it(':maxItems dynamic update', async () => {
      const Wrapper = defineComponent({
        setup() {
          const before = ref(2);
          const after = ref(1);
          return { before, after };
        },
        render() {
          return (
            <Breadcrumb maxItems={4} itemsBeforeCollapse={this.before} itemsAfterCollapse={this.after}>
              <BreadcrumbItem>A</BreadcrumbItem>
              <BreadcrumbItem>B</BreadcrumbItem>
              <BreadcrumbItem>C</BreadcrumbItem>
              <BreadcrumbItem>D</BreadcrumbItem>
              <BreadcrumbItem>E</BreadcrumbItem>
              <BreadcrumbItem>F</BreadcrumbItem>
            </Breadcrumb>
          );
        },
      });
      wrapper = mount(Wrapper) as any;
      await nextTick();
      // 2 before + 1 ellipsis + 1 after = 4
      expect(wrapper.findAllComponents(BreadcrumbItem).length).toBe(4);

      (wrapper.vm as any).before = 1;
      (wrapper.vm as any).after = 2;
      await nextTick();
      // 1 before + 1 ellipsis + 2 after = 4
      expect(wrapper.findAllComponents(BreadcrumbItem).length).toBe(4);
      const items = wrapper.findAllComponents(BreadcrumbItem);
      expect(items[0].text()).toBe('A');
      expect(items[2].text()).toBe('E');
      expect(items[3].text()).toBe('F');
    });

    it(':ellipsis[string]', async () => {
      wrapper = mount(Breadcrumb, {
        props: { maxItems: 3, itemsBeforeCollapse: 1, itemsAfterCollapse: 1, ellipsis: '...' },
        slots: {
          default: () => [
            <BreadcrumbItem>A</BreadcrumbItem>,
            <BreadcrumbItem>B</BreadcrumbItem>,
            <BreadcrumbItem>C</BreadcrumbItem>,
            <BreadcrumbItem>D</BreadcrumbItem>,
          ],
        },
      }) as VueWrapper<InstanceType<typeof Breadcrumb>>;
      await nextTick();
      const items = wrapper.findAllComponents(BreadcrumbItem);
      expect(items.length).toBe(3);
      expect(items[1].text()).toBe('...');
    });

    it(':ellipsis[function]', async () => {
      wrapper = mount(Breadcrumb, {
        props: {
          maxItems: 3,
          itemsBeforeCollapse: 1,
          itemsAfterCollapse: 1,
          ellipsis: (h: any, { items }: any) => h('span', { class: 'fn-ellipsis' }, `省略${items.length}项`),
        },
        slots: {
          default: () => [
            <BreadcrumbItem>A</BreadcrumbItem>,
            <BreadcrumbItem>B</BreadcrumbItem>,
            <BreadcrumbItem>C</BreadcrumbItem>,
            <BreadcrumbItem>D</BreadcrumbItem>,
            <BreadcrumbItem>E</BreadcrumbItem>,
          ],
        },
      }) as VueWrapper<InstanceType<typeof Breadcrumb>>;
      await nextTick();
      const el = wrapper.find('.fn-ellipsis');
      expect(el.exists()).toBe(true);
      expect(el.text()).toBe('省略3项');
    });

    it(':ellipsis[slot]', async () => {
      wrapper = mount(Breadcrumb, {
        props: { maxItems: 3, itemsBeforeCollapse: 1, itemsAfterCollapse: 1 },
        slots: {
          ellipsis: () => <span class="slot-ellipsis">more</span>,
          default: () => [
            <BreadcrumbItem>A</BreadcrumbItem>,
            <BreadcrumbItem>B</BreadcrumbItem>,
            <BreadcrumbItem>C</BreadcrumbItem>,
            <BreadcrumbItem>D</BreadcrumbItem>,
          ],
        },
      }) as VueWrapper<InstanceType<typeof Breadcrumb>>;
      await nextTick();
      expect(wrapper.find('.slot-ellipsis').exists()).toBe(true);
      expect(wrapper.find('.slot-ellipsis').text()).toBe('more');
    });
  });

  describe('edge cases', () => {
    it('renders empty breadcrumb', async () => {
      const wrapper = mount(Breadcrumb);
      await nextTick();
      expect(wrapper.find('.t-breadcrumb').exists()).toBe(true);
      expect(wrapper.findAllComponents(BreadcrumbItem).length).toBe(0);
      wrapper.unmount();
    });

    it('renders single item', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: { default: () => <BreadcrumbItem>唯一</BreadcrumbItem> },
      });
      await nextTick();
      expect(wrapper.findAllComponents(BreadcrumbItem).length).toBe(1);
      expect(wrapper.find('.t-breadcrumb__inner').text()).toBe('唯一');
      wrapper.unmount();
    });
  });
});
