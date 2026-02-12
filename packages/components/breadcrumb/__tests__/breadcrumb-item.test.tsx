import { defineComponent, nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { Breadcrumb, BreadcrumbItem } from '@tdesign/components/breadcrumb';
import breadcrumbItemProps from '@tdesign/components/breadcrumb/breadcrumb-item-props';
import * as sharedUtils from '@tdesign/shared-utils';

const mountItem = (itemProps = {}, itemSlots = {}, routerObj?: Record<string, any>) => {
  const globalConfig = routerObj ? { global: { config: { globalProperties: { $router: routerObj } as any } } } : {};
  return mount(Breadcrumb, {
    ...globalConfig,
    slots: {
      default: () => <BreadcrumbItem {...itemProps} v-slots={itemSlots} />,
    },
  });
};

describe('BreadcrumbItem', () => {
  describe('props', () => {
    it(':content[string]', async () => {
      const wrapper = mountItem({}, { default: () => '文本内容' });
      await nextTick();
      expect(wrapper.find('.t-breadcrumb__inner-text').text()).toBe('文本内容');
      wrapper.unmount();
    });

    it(':content[slot/function]', async () => {
      const wrapper = mountItem({}, { default: () => <span class="custom">自定义</span> });
      await nextTick();
      expect(wrapper.find('.custom').exists()).toBe(true);
      expect(wrapper.find('.custom').text()).toBe('自定义');
      wrapper.unmount();
    });

    it(':disabled[boolean]', async () => {
      // 默认不禁用
      const w1 = mountItem({}, { default: () => '页面' });
      await nextTick();
      expect(w1.find('.t-breadcrumb--text-overflow').classes()).not.toContain('t-is-disabled');
      w1.unmount();

      // disabled=true
      const w2 = mountItem({ disabled: true }, { default: () => '页面' });
      await nextTick();
      expect(w2.find('.t-breadcrumb--text-overflow').classes()).toContain('t-is-disabled');
      w2.unmount();
    });

    it(':disabled[boolean] prevents onClick', async () => {
      const onClick = vi.fn();
      const wrapper = mountItem({ disabled: true, onClick }, { default: () => '页面' });
      await nextTick();
      await wrapper.findComponent(BreadcrumbItem).trigger('click');
      expect(onClick).not.toHaveBeenCalled();
      wrapper.unmount();
    });

    it(':disabled[boolean] with href does not render link', async () => {
      const wrapper = mountItem({ disabled: true, href: 'https://tdesign.tencent.com' }, { default: () => '页面' });
      await nextTick();
      expect(wrapper.find('a.t-link').exists()).toBe(false);
      expect(wrapper.find('.t-is-disabled').exists()).toBe(true);
      wrapper.unmount();
    });

    it(':href[string]', async () => {
      const wrapper = mountItem({ href: 'https://tdesign.tencent.com' }, { default: () => '页面' });
      await nextTick();
      const link = wrapper.find('a.t-link');
      expect(link.exists()).toBe(true);
      expect(link.attributes('href')).toBe('https://tdesign.tencent.com');
      wrapper.unmount();
    });

    it(':href[string] empty does not render link', async () => {
      const wrapper = mountItem({ href: '' }, { default: () => '页面' });
      await nextTick();
      expect(wrapper.find('a.t-link').exists()).toBe(false);
      expect(wrapper.find('.t-breadcrumb--text-overflow').element.tagName).toBe('SPAN');
      wrapper.unmount();
    });

    it(':target[_blank/_self/_parent/_top]', () => {
      const validator = breadcrumbItemProps.target.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('_blank')).toBe(true);
      expect(validator('_self')).toBe(true);
      expect(validator('_parent')).toBe(true);
      expect(validator('_top')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);
    });

    it(':target[_blank] with href opens new window', async () => {
      const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
      const wrapper = mountItem({ href: 'https://tdesign.tencent.com', target: '_blank' }, { default: () => '页面' });
      await nextTick();
      expect(wrapper.find('a.t-link').attributes('target')).toBe('_blank');
      await wrapper.find('a.t-link').trigger('click');
      expect(openSpy).toHaveBeenCalledWith('https://tdesign.tencent.com');
      openSpy.mockRestore();
      wrapper.unmount();
    });

    it(':target[_blank] with to opens new window', async () => {
      const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
      const wrapper = mountItem({ to: '/home', target: '_blank' }, { default: () => '页面' });
      await nextTick();
      await wrapper.find('a.t-link').trigger('click');
      expect(openSpy).toHaveBeenCalledWith('/home');
      openSpy.mockRestore();
      wrapper.unmount();
    });

    it(':to[string] with router uses router.push', async () => {
      const push = vi.fn();
      const wrapper = mountItem({ to: '/home' }, { default: () => '页面' }, { push });
      await nextTick();
      await wrapper.find('.t-breadcrumb__inner').trigger('click');
      expect(push).toHaveBeenCalledWith('/home');
      wrapper.unmount();
    });

    it(':to[object] with router uses router.push', async () => {
      const push = vi.fn();
      const wrapper = mountItem({ to: { path: '/detail' } }, { default: () => '页面' }, { push });
      await nextTick();
      await wrapper.find('.t-breadcrumb__inner').trigger('click');
      expect(push).toHaveBeenCalledWith({ path: '/detail' });
      wrapper.unmount();
    });

    it(':replace[boolean] with router uses router.replace', async () => {
      const replace = vi.fn();
      const wrapper = mountItem({ to: '/home', replace: true }, { default: () => '页面' }, { replace });
      await nextTick();
      await wrapper.find('.t-breadcrumb__inner').trigger('click');
      expect(replace).toHaveBeenCalledWith('/home');
      wrapper.unmount();
    });

    it(':router[object] uses custom router over $router', async () => {
      const push = vi.fn();
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => (
            <BreadcrumbItem to="/page" router={{ push }}>
              页面
            </BreadcrumbItem>
          ),
        },
      });
      await nextTick();
      await wrapper.find('.t-breadcrumb__inner').trigger('click');
      expect(push).toHaveBeenCalledWith('/page');
      wrapper.unmount();
    });

    it(':to without router falls back to window.location', async () => {
      const wrapper = mountItem({ to: '/page' }, { default: () => '页面' });
      await nextTick();
      // 无 router 时仍渲染为 <a>
      expect(wrapper.find('a.t-link').exists()).toBe(true);
      wrapper.unmount();
    });

    it(':maxWidth[string] overrides parent maxItemWidth', async () => {
      const wrapper = mount(Breadcrumb, {
        props: { maxItemWidth: '150' },
        slots: {
          default: () => [<BreadcrumbItem maxWidth="80">A</BreadcrumbItem>, <BreadcrumbItem>B</BreadcrumbItem>],
        },
      });
      await nextTick();
      const items = wrapper.findAllComponents(BreadcrumbItem);
      expect((items[0].find('.t-breadcrumb__inner').element as HTMLElement).style.maxWidth).toBe('80px');
      expect((items[1].find('.t-breadcrumb__inner').element as HTMLElement).style.maxWidth).toBe('150px');
      wrapper.unmount();
    });

    it(':icon[slot]', async () => {
      const wrapper = mountItem({}, { default: () => '页面', icon: () => <span class="my-icon">I</span> });
      await nextTick();
      expect(wrapper.find('.my-icon').exists()).toBe(true);
      expect(wrapper.find('.my-icon').text()).toBe('I');
      wrapper.unmount();
    });

    it('no href no to renders as span', async () => {
      const wrapper = mountItem({}, { default: () => '页面' });
      await nextTick();
      expect(wrapper.find('.t-breadcrumb--text-overflow').element.tagName).toBe('SPAN');
      wrapper.unmount();
    });

    it('isCutOff shows tooltip', async () => {
      const spy = vi.spyOn(sharedUtils, 'isTextEllipsis').mockReturnValue(true);
      const wrapper = mountItem({}, { default: () => '超长文本超长文本超长文本' });
      await nextTick();
      expect(wrapper.findComponent({ name: 'TTooltip' }).exists()).toBe(true);
      spy.mockRestore();
      wrapper.unmount();
    });

    it('isCutOff false hides tooltip', async () => {
      const spy = vi.spyOn(sharedUtils, 'isTextEllipsis').mockReturnValue(false);
      const wrapper = mountItem({}, { default: () => '短' });
      await nextTick();
      expect(wrapper.findComponent({ name: 'TTooltip' }).exists()).toBe(false);
      spy.mockRestore();
      wrapper.unmount();
    });

    it('isCutOff recalculates on update', async () => {
      const spy = vi.spyOn(sharedUtils, 'isTextEllipsis').mockReturnValue(false);
      const Wrapper = defineComponent({
        setup() {
          const text = ref('短');
          return { text };
        },
        render() {
          return (
            <Breadcrumb>
              <BreadcrumbItem>{this.text}</BreadcrumbItem>
            </Breadcrumb>
          );
        },
      });
      const wrapper = mount(Wrapper);
      await nextTick();
      const callsBefore = spy.mock.calls.length;

      spy.mockReturnValue(true);
      wrapper.vm.text = '超长文本超长文本超长文本超长文本';
      await nextTick();
      expect(spy.mock.calls.length).toBeGreaterThan(callsBefore);
      spy.mockRestore();
      wrapper.unmount();
    });

    it(':isEllipsisItem renders div with flex display', async () => {
      const wrapper = mount(Breadcrumb, {
        props: { maxItems: 3, itemsBeforeCollapse: 1, itemsAfterCollapse: 1 },
        slots: {
          default: () => [
            <BreadcrumbItem>A</BreadcrumbItem>,
            <BreadcrumbItem>B</BreadcrumbItem>,
            <BreadcrumbItem>C</BreadcrumbItem>,
            <BreadcrumbItem>D</BreadcrumbItem>,
          ],
        },
      });
      await nextTick();
      const ellipsisItem = wrapper.findAllComponents(BreadcrumbItem)[1];
      expect(ellipsisItem.find('div[style*="display: flex"]').exists()).toBe(true);
      wrapper.unmount();
    });
  });

  describe('events', () => {
    it('onClick', async () => {
      const onClick = vi.fn();
      const wrapper = mountItem({ onClick }, { default: () => '页面' });
      await nextTick();
      await wrapper.findComponent(BreadcrumbItem).trigger('click');
      expect(onClick).toHaveBeenCalledTimes(1);
      wrapper.unmount();
    });

    it('onClick disabled does not fire', async () => {
      const onClick = vi.fn();
      const wrapper = mountItem({ disabled: true, onClick }, { default: () => '页面' });
      await nextTick();
      await wrapper.findComponent(BreadcrumbItem).trigger('click');
      expect(onClick).not.toHaveBeenCalled();
      wrapper.unmount();
    });
  });

  describe('edge cases', () => {
    it('separator textOverflow is ellipsis when isCutOff', async () => {
      const spy = vi.spyOn(sharedUtils, 'isTextEllipsis').mockReturnValue(true);
      const wrapper = mountItem({}, { default: () => '超长文本' });
      await nextTick();
      expect((wrapper.find('.t-breadcrumb__separator').element as HTMLElement).style.textOverflow).toBe('ellipsis');
      spy.mockRestore();
      wrapper.unmount();
    });

    it('separator textOverflow is clip when not cut off', async () => {
      const spy = vi.spyOn(sharedUtils, 'isTextEllipsis').mockReturnValue(false);
      const wrapper = mountItem({}, { default: () => '短' });
      await nextTick();
      expect((wrapper.find('.t-breadcrumb__separator').element as HTMLElement).style.textOverflow).toBe('clip');
      spy.mockRestore();
      wrapper.unmount();
    });
  });
});
