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
      const wrapper1 = mountItem({}, { default: () => '页面' });
      await nextTick();
      expect(wrapper1.find('.t-breadcrumb--text-overflow').classes()).not.toContain('t-is-disabled');
      wrapper1.unmount();

      // disabled=true: class 变化
      const wrapper2 = mountItem({ disabled: true }, { default: () => '页面' });
      await nextTick();
      expect(wrapper2.find('.t-breadcrumb--text-overflow').classes()).toContain('t-is-disabled');
      wrapper2.unmount();

      // disabled 阻止 onClick
      const onClick = vi.fn();
      const wrapper3 = mountItem({ disabled: true, onClick }, { default: () => '页面' });
      await nextTick();
      await wrapper3.findComponent(BreadcrumbItem).trigger('click');
      expect(onClick).not.toHaveBeenCalled();
      wrapper3.unmount();

      // disabled + href 不渲染链接
      const wrapper4 = mountItem({ disabled: true, href: 'https://tdesign.tencent.com' }, { default: () => '页面' });
      await nextTick();
      expect(wrapper4.find('a.t-link').exists()).toBe(false);
      expect(wrapper4.find('.t-is-disabled').exists()).toBe(true);
      wrapper4.unmount();
    });

    it(':href[string]', async () => {
      // 正常 href
      const wrapper1 = mountItem({ href: 'https://tdesign.tencent.com' }, { default: () => '页面' });
      await nextTick();
      const link = wrapper1.find('a.t-link');
      expect(link.exists()).toBe(true);
      expect(link.attributes('href')).toBe('https://tdesign.tencent.com');
      wrapper1.unmount();

      // 空 href 不渲染链接
      const wrapper2 = mountItem({ href: '' }, { default: () => '页面' });
      await nextTick();
      expect(wrapper2.find('a.t-link').exists()).toBe(false);
      expect(wrapper2.find('.t-breadcrumb--text-overflow').element.tagName).toBe('SPAN');
      wrapper2.unmount();

      // 无 href 无 to 渲染为 span
      const wrapper3 = mountItem({}, { default: () => '页面' });
      await nextTick();
      expect(wrapper3.find('.t-breadcrumb--text-overflow').element.tagName).toBe('SPAN');
      wrapper3.unmount();
    });

    it(':target[_blank/_self/_parent/_top]', async () => {
      // validator
      const validator = breadcrumbItemProps.target.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('_blank')).toBe(true);
      expect(validator('_self')).toBe(true);
      expect(validator('_parent')).toBe(true);
      expect(validator('_top')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);

      // _blank + href: 调用 window.open
      const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
      const wrapper1 = mountItem({ href: 'https://tdesign.tencent.com', target: '_blank' }, { default: () => '页面' });
      await nextTick();
      expect(wrapper1.find('a.t-link').attributes('target')).toBe('_blank');
      await wrapper1.find('a.t-link').trigger('click');
      expect(openSpy).toHaveBeenCalledWith('https://tdesign.tencent.com');
      openSpy.mockRestore();
      wrapper1.unmount();

      // _blank + to: 调用 window.open
      const openSpy2 = vi.spyOn(window, 'open').mockImplementation(() => null);
      const wrapper2 = mountItem({ to: '/home', target: '_blank' }, { default: () => '页面' });
      await nextTick();
      await wrapper2.find('a.t-link').trigger('click');
      expect(openSpy2).toHaveBeenCalledWith('/home');
      openSpy2.mockRestore();
      wrapper2.unmount();
    });

    it(':to[string/object] + :replace[boolean] + :router[object]', async () => {
      // string to + router.push
      const push1 = vi.fn();
      const wrapper1 = mountItem({ to: '/home' }, { default: () => '页面' }, { push: push1 });
      await nextTick();
      await wrapper1.find('.t-breadcrumb__inner').trigger('click');
      expect(push1).toHaveBeenCalledWith('/home');
      wrapper1.unmount();

      // object to + router.push
      const push2 = vi.fn();
      const wrapper2 = mountItem({ to: { path: '/detail' } }, { default: () => '页面' }, { push: push2 });
      await nextTick();
      await wrapper2.find('.t-breadcrumb__inner').trigger('click');
      expect(push2).toHaveBeenCalledWith({ path: '/detail' });
      wrapper2.unmount();

      // replace=true + router.replace
      const replaceFn = vi.fn();
      const wrapper3 = mountItem({ to: '/home', replace: true }, { default: () => '页面' }, { replace: replaceFn });
      await nextTick();
      await wrapper3.find('.t-breadcrumb__inner').trigger('click');
      expect(replaceFn).toHaveBeenCalledWith('/home');
      wrapper3.unmount();

      // 自定义 router prop 优先于 $router
      const push3 = vi.fn();
      const wrapper4 = mount(Breadcrumb, {
        slots: {
          default: () => (
            <BreadcrumbItem to="/page" router={{ push: push3 }}>
              页面
            </BreadcrumbItem>
          ),
        },
      });
      await nextTick();
      await wrapper4.find('.t-breadcrumb__inner').trigger('click');
      expect(push3).toHaveBeenCalledWith('/page');
      wrapper4.unmount();

      // 无 router: 降级渲染为 <a>
      const wrapper5 = mountItem({ to: '/page' }, { default: () => '页面' });
      await nextTick();
      expect(wrapper5.find('a.t-link').exists()).toBe(true);
      wrapper5.unmount();
    });

    it(':maxWidth[string]', async () => {
      const wrapper = mount(Breadcrumb, {
        props: { maxItemWidth: '150' },
        slots: {
          default: () => [<BreadcrumbItem maxWidth="80">A</BreadcrumbItem>, <BreadcrumbItem>B</BreadcrumbItem>],
        },
      });
      await nextTick();
      const items = wrapper.findAllComponents(BreadcrumbItem);
      // maxWidth 覆盖 maxItemWidth
      expect((items[0].find('.t-breadcrumb__inner').element as HTMLElement).style.maxWidth).toBe('80px');
      // 未设置 maxWidth 时使用 maxItemWidth
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

    it('isCutOff tooltip', async () => {
      // isCutOff=true: 显示 tooltip
      const spy1 = vi.spyOn(sharedUtils, 'isTextEllipsis').mockReturnValue(true);
      const wrapper1 = mountItem({}, { default: () => '超长文本超长文本超长文本' });
      await nextTick();
      expect(wrapper1.findComponent({ name: 'TTooltip' }).exists()).toBe(true);
      spy1.mockRestore();
      wrapper1.unmount();

      // isCutOff=false: 不显示 tooltip
      const spy2 = vi.spyOn(sharedUtils, 'isTextEllipsis').mockReturnValue(false);
      const wrapper2 = mountItem({}, { default: () => '短' });
      await nextTick();
      expect(wrapper2.findComponent({ name: 'TTooltip' }).exists()).toBe(false);
      spy2.mockRestore();
      wrapper2.unmount();

      // 更新时重新计算
      const spy3 = vi.spyOn(sharedUtils, 'isTextEllipsis').mockReturnValue(false);
      const UpdateWrapper = defineComponent({
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
      const wrapper3 = mount(UpdateWrapper);
      await nextTick();
      const callsBefore = spy3.mock.calls.length;
      spy3.mockReturnValue(true);
      wrapper3.vm.text = '超长文本超长文本超长文本超长文本';
      await nextTick();
      expect(spy3.mock.calls.length).toBeGreaterThan(callsBefore);
      spy3.mockRestore();
      wrapper3.unmount();
    });
  });

  describe('events', () => {
    it('onClick', async () => {
      // 正常触发
      const onClick = vi.fn();
      const wrapper1 = mountItem({ onClick }, { default: () => '页面' });
      await nextTick();
      await wrapper1.findComponent(BreadcrumbItem).trigger('click');
      expect(onClick).toHaveBeenCalledTimes(1);
      wrapper1.unmount();

      // disabled 时不触发
      const onClick2 = vi.fn();
      const wrapper2 = mountItem({ disabled: true, onClick: onClick2 }, { default: () => '页面' });
      await nextTick();
      await wrapper2.findComponent(BreadcrumbItem).trigger('click');
      expect(onClick2).not.toHaveBeenCalled();
      wrapper2.unmount();
    });
  });

  describe('edge cases', () => {
    it('separator textOverflow', async () => {
      // isCutOff=true: textOverflow=ellipsis
      const spy1 = vi.spyOn(sharedUtils, 'isTextEllipsis').mockReturnValue(true);
      const wrapper1 = mountItem({}, { default: () => '超长文本' });
      await nextTick();
      expect((wrapper1.find('.t-breadcrumb__separator').element as HTMLElement).style.textOverflow).toBe('ellipsis');
      spy1.mockRestore();
      wrapper1.unmount();

      // isCutOff=false: textOverflow=clip
      const spy2 = vi.spyOn(sharedUtils, 'isTextEllipsis').mockReturnValue(false);
      const wrapper2 = mountItem({}, { default: () => '短' });
      await nextTick();
      expect((wrapper2.find('.t-breadcrumb__separator').element as HTMLElement).style.textOverflow).toBe('clip');
      spy2.mockRestore();
      wrapper2.unmount();
    });
  });
});
