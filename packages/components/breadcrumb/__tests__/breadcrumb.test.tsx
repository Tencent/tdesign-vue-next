import { defineComponent, nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { Breadcrumb, BreadcrumbItem } from '@tdesign/components/breadcrumb';
import breadcrumbProps from '@tdesign/components/breadcrumb/props';

const eightItems = () => [
  <BreadcrumbItem>页面1</BreadcrumbItem>,
  <BreadcrumbItem>页面2</BreadcrumbItem>,
  <BreadcrumbItem>页面3</BreadcrumbItem>,
  <BreadcrumbItem>页面4</BreadcrumbItem>,
  <BreadcrumbItem>页面5</BreadcrumbItem>,
  <BreadcrumbItem>页面6</BreadcrumbItem>,
  <BreadcrumbItem>页面7</BreadcrumbItem>,
  <BreadcrumbItem>页面8</BreadcrumbItem>,
];

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
      // 默认 120px
      wrapper = mount(Breadcrumb, {
        slots: { default: () => <BreadcrumbItem>页面1</BreadcrumbItem> },
      }) as VueWrapper<InstanceType<typeof Breadcrumb>>;
      await nextTick();
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
      wrapper.unmount();

      // 默认渲染 ChevronRightIcon (svg)
      wrapper = mount(Breadcrumb, {
        slots: {
          default: () => [<BreadcrumbItem>页面1</BreadcrumbItem>, <BreadcrumbItem>页面2</BreadcrumbItem>],
        },
      }) as VueWrapper<InstanceType<typeof Breadcrumb>>;
      await nextTick();
      expect(wrapper.find('.t-breadcrumb__separator svg').exists()).toBe(true);
    });

    it(':separator[slot/function]', async () => {
      wrapper = mount(Breadcrumb, {
        slots: {
          separator: () => <span class="my-sep">&gt;</span>,
          default: () => [<BreadcrumbItem>页面1</BreadcrumbItem>, <BreadcrumbItem>页面2</BreadcrumbItem>],
        },
      }) as VueWrapper<InstanceType<typeof Breadcrumb>>;
      await nextTick();
      expect(wrapper.find('.t-breadcrumb__separator .my-sep').exists()).toBe(true);
    });

    it(':options[array]', async () => {
      wrapper = mount(Breadcrumb, {
        props: {
          options: [{ content: '首页' }, { content: '产品', href: 'https://tdesign.tencent.com' }, { content: '详情' }],
        },
      }) as VueWrapper<InstanceType<typeof Breadcrumb>>;
      await nextTick();
      expect(wrapper.findAll('.t-breadcrumb__item').length).toBe(3);
      expect(wrapper.findAll('.t-breadcrumb__inner')[0].text()).toBe('首页');
      expect(wrapper.findAll('.t-breadcrumb__inner')[1].text()).toBe('产品');
      expect(wrapper.findAll('.t-breadcrumb__inner')[2].text()).toBe('详情');
      expect(wrapper.find('a.t-link').attributes('href')).toBe('https://tdesign.tencent.com');
    });

    it(':maxItems[number] + :itemsBeforeCollapse[number] + :itemsAfterCollapse[number]', async () => {
      // 正常省略: 8 项, before=2, after=1 → 显示 4 项
      wrapper = mount(Breadcrumb, {
        props: { maxItems: 5, itemsBeforeCollapse: 2, itemsAfterCollapse: 1 },
        slots: { default: eightItems },
      }) as VueWrapper<InstanceType<typeof Breadcrumb>>;
      await nextTick();
      const items = wrapper.findAllComponents(BreadcrumbItem);
      expect(items.length).toBe(4);
      expect(items[0].text()).toBe('页面1');
      expect(items[1].text()).toBe('页面2');
      expect(items[3].text()).toBe('页面8');
      wrapper.unmount();

      // maxItems <= 0: 显示全部
      wrapper = mount(Breadcrumb, {
        props: { maxItems: 0 },
        slots: {
          default: () => [
            <BreadcrumbItem>A</BreadcrumbItem>,
            <BreadcrumbItem>B</BreadcrumbItem>,
            <BreadcrumbItem>C</BreadcrumbItem>,
          ],
        },
      }) as VueWrapper<InstanceType<typeof Breadcrumb>>;
      await nextTick();
      expect(wrapper.findAllComponents(BreadcrumbItem).length).toBe(3);
      wrapper.unmount();

      // totalItems <= maxItems: 显示全部
      wrapper = mount(Breadcrumb, {
        props: { maxItems: 10, itemsBeforeCollapse: 2, itemsAfterCollapse: 1 },
        slots: {
          default: () => [<BreadcrumbItem>A</BreadcrumbItem>, <BreadcrumbItem>B</BreadcrumbItem>],
        },
      }) as VueWrapper<InstanceType<typeof Breadcrumb>>;
      await nextTick();
      expect(wrapper.findAllComponents(BreadcrumbItem).length).toBe(2);
      wrapper.unmount();

      // collapse sum >= totalItems: 显示全部
      wrapper = mount(Breadcrumb, {
        props: { maxItems: 2, itemsBeforeCollapse: 2, itemsAfterCollapse: 2 },
        slots: {
          default: () => [
            <BreadcrumbItem>A</BreadcrumbItem>,
            <BreadcrumbItem>B</BreadcrumbItem>,
            <BreadcrumbItem>C</BreadcrumbItem>,
          ],
        },
      }) as VueWrapper<InstanceType<typeof Breadcrumb>>;
      await nextTick();
      expect(wrapper.findAllComponents(BreadcrumbItem).length).toBe(3);
      wrapper.unmount();

      // itemsBeforeCollapse=0: warn 并显示全部
      const spy1 = vi.spyOn(console, 'error').mockImplementation(() => {});
      wrapper = mount(Breadcrumb, {
        props: { maxItems: 3, itemsBeforeCollapse: 0, itemsAfterCollapse: 1 },
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
      expect(wrapper.findAllComponents(BreadcrumbItem).length).toBe(4);
      spy1.mockRestore();
      wrapper.unmount();

      // itemsAfterCollapse=0: warn 并显示全部
      const spy2 = vi.spyOn(console, 'error').mockImplementation(() => {});
      wrapper = mount(Breadcrumb, {
        props: { maxItems: 3, itemsBeforeCollapse: 1, itemsAfterCollapse: 0 },
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
      expect(wrapper.findAllComponents(BreadcrumbItem).length).toBe(4);
      spy2.mockRestore();
      wrapper.unmount();

      // 动态更新
      const DynamicWrapper = defineComponent({
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
      wrapper = mount(DynamicWrapper) as any;
      await nextTick();
      expect(wrapper.findAllComponents(BreadcrumbItem).length).toBe(4);
      (wrapper.vm as any).before = 1;
      (wrapper.vm as any).after = 2;
      await nextTick();
      expect(wrapper.findAllComponents(BreadcrumbItem).length).toBe(4);
      const dynamicItems = wrapper.findAllComponents(BreadcrumbItem);
      expect(dynamicItems[0].text()).toBe('A');
      expect(dynamicItems[2].text()).toBe('E');
      expect(dynamicItems[3].text()).toBe('F');
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

    it(':ellipsis[slot/function]', async () => {
      // function
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
      expect(wrapper.find('.fn-ellipsis').exists()).toBe(true);
      expect(wrapper.find('.fn-ellipsis').text()).toBe('省略3项');
      wrapper.unmount();

      // slot
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
    it('renders empty breadcrumb and single item', async () => {
      // 空
      const wrapper1 = mount(Breadcrumb);
      await nextTick();
      expect(wrapper1.find('.t-breadcrumb').exists()).toBe(true);
      expect(wrapper1.findAllComponents(BreadcrumbItem).length).toBe(0);
      wrapper1.unmount();

      // 单项
      const wrapper2 = mount(Breadcrumb, {
        slots: { default: () => <BreadcrumbItem>唯一</BreadcrumbItem> },
      });
      await nextTick();
      expect(wrapper2.findAllComponents(BreadcrumbItem).length).toBe(1);
      expect(wrapper2.find('.t-breadcrumb__inner').text()).toBe('唯一');
      wrapper2.unmount();
    });
  });
});
