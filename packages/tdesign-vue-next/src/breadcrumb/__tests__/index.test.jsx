import { mount } from '@vue/test-utils';
import { nextTick } from '@td/adapter-vue';
import { expect, vi } from 'vitest';
import { Breadcrumb, BreadcrumbItem } from 'tdesign-vue-next'

const _mount = (render, $router = {}) =>
  mount(render, {
    global: {
      provide: {
        breadcrumb: {},
      },
      config: {
        globalProperties: {
          $router,
        },
      },
    },
  });

describe('Breadcrumb', () => {
  describe(':props', () => {
    it('maxItemWidth', async () => {
      const wrapper = mount({
        render() {
          return (
            <Breadcrumb max-item-width="150">
              <BreadcrumbItem>页面1</BreadcrumbItem>
              <BreadcrumbItem>页面2面包屑文案超长时悬浮显示文案全部信息</BreadcrumbItem>
            </Breadcrumb>
          );
        },
      });
      await nextTick();
      const items = wrapper.findAllComponents(BreadcrumbItem);
      expect(items[0].find('.t-breadcrumb__inner').element.getAttribute('style')).toContain('max-width: 150px;');
      expect(items[1].find('.t-breadcrumb__inner').element.getAttribute('style')).toContain('max-width: 150px;');
    });
    it('options	', async () => {
      const wrapper = mount({
        render() {
          const options = [{ content: '页面1' }, { content: '页面2', href: 'https://www.tencent.com' }];
          return <Breadcrumb options={options} />;
        },
      });
      await nextTick();
      expect(wrapper.findAll('.t-breadcrumb__item').length).toEqual(2);
      expect(wrapper.findAll('.t-breadcrumb__inner')[0].text()).toEqual('页面1');
      expect(wrapper.findAll('.t-breadcrumb__inner')[1].text()).toEqual('页面2');
      expect(wrapper.find('.t-link').element.getAttribute('href')).toEqual('https://www.tencent.com');
    });
    it('separator	', async () => {
      const wrapper = mount({
        render() {
          return (
            <Breadcrumb separator="@">
              <BreadcrumbItem>页面1</BreadcrumbItem>
              <BreadcrumbItem>页面2</BreadcrumbItem>
            </Breadcrumb>
          );
        },
      });
      await nextTick();
      expect(wrapper.find('.t-breadcrumb__separator').text()).toEqual('@');
    });
  });
  describe('<slot>', () => {
    it('separator	', async () => {
      const wrapper = mount({
        render() {
          return (
            <Breadcrumb
              v-slots={{
                separator: () => <div class="separator">@</div>,
              }}
            >
              <BreadcrumbItem>页面1</BreadcrumbItem>
              <BreadcrumbItem>页面2</BreadcrumbItem>
            </Breadcrumb>
          );
        },
      });
      await nextTick();
      expect(wrapper.find('.t-breadcrumb__separator').html()).toContain('<div class="separator">@</div>');
    });
  });
});

describe('BreadcrumbItem', () => {
  describe(':props', () => {
    it('disabled', async () => {
      const wrapper = mount({
        render() {
          return (
            <Breadcrumb>
              <BreadcrumbItem disabled={true}>页面1</BreadcrumbItem>
            </Breadcrumb>
          );
        },
      });
      await nextTick();
      expect(wrapper.find('.t-breadcrumb--text-overflow').classes()).toContain('t-is-disabled');
    });
    it('href', async () => {
      const wrapper = mount({
        render() {
          return (
            <Breadcrumb>
              <BreadcrumbItem href="https://www.tencent.com">页面1</BreadcrumbItem>
            </Breadcrumb>
          );
        },
      });
      await nextTick();
      expect(wrapper.find('.t-breadcrumb--text-overflow').classes()).toContain('t-link');
      expect(wrapper.find('.t-link').element.getAttribute('href')).toEqual('https://www.tencent.com');
    });
    it('target', async () => {
      const wrapper = mount({
        render() {
          return (
            <Breadcrumb>
              <BreadcrumbItem href="https://www.tencent.com" target="_blank">
                页面1
              </BreadcrumbItem>
            </Breadcrumb>
          );
        },
      });
      await nextTick();
      expect(wrapper.find('.t-breadcrumb--text-overflow').classes()).toContain('t-link');
      expect(wrapper.find('.t-link').element.getAttribute('href')).toEqual('https://www.tencent.com');
      expect(wrapper.find('.t-link').element.getAttribute('target')).toEqual('_blank');
    });
    it('to', async () => {
      const push = vi.fn();
      const wrapper = _mount(
        {
          render() {
            return (
              <Breadcrumb>
                <BreadcrumbItem to={{ path: '/' }}>页面1</BreadcrumbItem>
              </Breadcrumb>
            );
          },
        },
        {
          push,
        },
      );
      await wrapper.find('.t-breadcrumb__inner').trigger('click');
      expect(push).toHaveBeenCalled();
      expect(wrapper.find('.t-breadcrumb--text-overflow').classes()).toContain('t-link');
    });
    it('replace', async () => {
      const replace = vi.fn();
      const wrapper = _mount(
        {
          render() {
            return (
              <Breadcrumb>
                <BreadcrumbItem to={{ path: '/' }} replace={true}>
                  页面1
                </BreadcrumbItem>
              </Breadcrumb>
            );
          },
        },
        {
          replace,
        },
      );
      await wrapper.find('.t-breadcrumb__inner').trigger('click');
      expect(replace).toHaveBeenCalled();
    });
    it('maxWidth', async () => {
      const wrapper = mount({
        render() {
          return (
            <Breadcrumb max-item-width="150">
              <BreadcrumbItem max-width="100">页面1超长了页面1超长了页面1超长了页面1超长了页面1超长了</BreadcrumbItem>
              <BreadcrumbItem>页面2面包屑文案超长时悬浮显示文案全部信息</BreadcrumbItem>
            </Breadcrumb>
          );
        },
      });
      await nextTick();
      const items = wrapper.findAllComponents(BreadcrumbItem);
      expect(items[0].find('.t-breadcrumb__inner').element.getAttribute('style')).toContain('max-width: 100px;');
      expect(items[1].find('.t-breadcrumb__inner').element.getAttribute('style')).toContain('max-width: 150px;');
    });
  });

  describe('@event', () => {
    it('click', async () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return (
            <Breadcrumb>
              <BreadcrumbItem onClick={fn}>页面1</BreadcrumbItem>
            </Breadcrumb>
          );
        },
      });
      await nextTick();
      await wrapper.findComponent(BreadcrumbItem).trigger('click');
      expect(fn).toHaveBeenCalled();
    });
  });

  describe('<slot>', () => {
    it('default', async () => {
      const wrapper = mount({
        render() {
          return (
            <Breadcrumb>
              <BreadcrumbItem
                v-slots={{
                  default: () => <div>页面1</div>,
                }}
              ></BreadcrumbItem>
            </Breadcrumb>
          );
        },
      });
      await nextTick();
      expect(wrapper.find('.t-breadcrumb__inner').html()).contain('<div>页面1</div>');
    });
  });
});
