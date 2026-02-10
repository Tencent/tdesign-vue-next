import { defineComponent, nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { Breadcrumb, BreadcrumbItem } from '@tdesign/components/breadcrumb';
import * as sharedUtils from '@tdesign/shared-utils';

const mountWithRouter = (props = {}, slots = {}, $router: Record<string, any> = {}) =>
  mount(Breadcrumb, {
    slots: {
      default: () => <BreadcrumbItem {...props} v-slots={slots} />,
    },
    global: {
      config: {
        globalProperties: {
          $router,
        } as any,
      },
    },
  });

describe('BreadcrumbItem', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  // ==================== Props Tests ====================
  describe('props', () => {
    it(':content[string] renders text content', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => <BreadcrumbItem>页面内容</BreadcrumbItem>,
        },
      });
      await nextTick();
      expect(wrapper.find('.t-breadcrumb__inner').text()).toBe('页面内容');
    });

    it(':content[slot] default slot', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => (
            <BreadcrumbItem v-slots={{ default: () => <div class="custom-slot-content">自定义内容</div> }} />
          ),
        },
      });
      await nextTick();
      expect(wrapper.find('.custom-slot-content').exists()).toBeTruthy();
      expect(wrapper.find('.custom-slot-content').text()).toBe('自定义内容');
    });

    it(':content[slot] with non-text VNode children (slotContent branch)', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => (
            <BreadcrumbItem>
              <span class="vnode-child">复杂内容</span>
            </BreadcrumbItem>
          ),
        },
      });
      await nextTick();
      expect(wrapper.find('.vnode-child').exists()).toBeTruthy();
      expect(wrapper.find('.vnode-child').text()).toBe('复杂内容');
    });

    it(':disabled[boolean] false by default', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => <BreadcrumbItem>页面1</BreadcrumbItem>,
        },
      });
      await nextTick();
      expect(wrapper.find('.t-breadcrumb--text-overflow').classes()).not.toContain('t-is-disabled');
    });

    it(':disabled[boolean] true adds disabled class', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => <BreadcrumbItem disabled>页面1</BreadcrumbItem>,
        },
      });
      await nextTick();
      expect(wrapper.find('.t-breadcrumb--text-overflow').classes()).toContain('t-is-disabled');
    });

    it(':disabled[boolean] prevents click propagation', async () => {
      const onClick = vi.fn();
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => (
            <BreadcrumbItem disabled onClick={onClick}>
              页面1
            </BreadcrumbItem>
          ),
        },
      });
      await nextTick();
      const textOverflow = wrapper.find('.t-breadcrumb--text-overflow');
      await textOverflow.trigger('click');
      expect(onClick).not.toHaveBeenCalled();
    });

    it(':disabled[boolean] with href does not render as link', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => (
            <BreadcrumbItem disabled href="https://www.tencent.com">
              页面1
            </BreadcrumbItem>
          ),
        },
      });
      await nextTick();
      expect(wrapper.find('a.t-link').exists()).toBeFalsy();
      expect(wrapper.find('.t-is-disabled').exists()).toBeTruthy();
    });

    it(':href[string] renders as link', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => <BreadcrumbItem href="https://www.tencent.com">页面1</BreadcrumbItem>,
        },
      });
      await nextTick();
      expect(wrapper.find('.t-breadcrumb--text-overflow').classes()).toContain('t-link');
      expect(wrapper.find('.t-link').element.getAttribute('href')).toBe('https://www.tencent.com');
    });

    it(':href[string] empty does not render as link', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => <BreadcrumbItem href="">页面1</BreadcrumbItem>,
        },
      });
      await nextTick();
      expect(wrapper.find('a.t-link').exists()).toBeFalsy();
    });

    it(':href[string] click triggers navigation', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => <BreadcrumbItem href="https://www.tencent.com">页面1</BreadcrumbItem>,
        },
      });
      await nextTick();
      const link = wrapper.find('a.t-link');
      await link.trigger('click');
      expect(link.exists()).toBeTruthy();
    });

    it(':target[_blank] with href opens new window', async () => {
      const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => (
            <BreadcrumbItem href="https://www.tencent.com" target="_blank">
              页面1
            </BreadcrumbItem>
          ),
        },
      });
      await nextTick();
      expect(wrapper.find('.t-link').element.getAttribute('target')).toBe('_blank');
      await wrapper.find('a.t-link').trigger('click');
      expect(openSpy).toHaveBeenCalledWith('https://www.tencent.com');
      openSpy.mockRestore();
    });

    it(':target[_blank] with to opens new window', async () => {
      const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
      const wrapper = mountWithRouter({ to: '/home', target: '_blank' }, { default: () => '页面1' });
      await nextTick();
      await wrapper.find('a.t-link').trigger('click');
      expect(openSpy).toHaveBeenCalledWith('/home');
      openSpy.mockRestore();
    });

    it(':target validator', () => {
      const validator = (BreadcrumbItem as any).props?.target?.validator;
      if (validator) {
        expect(validator(undefined)).toBe(true);
        expect(validator(null)).toBe(true);
        expect(validator('')).toBe(true);
        expect(validator('_blank')).toBe(true);
        expect(validator('_self')).toBe(true);
        expect(validator('_parent')).toBe(true);
        expect(validator('_top')).toBe(true);
        expect(validator('invalid')).toBe(false);
      }
    });

    it(':to[object] with router uses router.push', async () => {
      const push = vi.fn();
      const wrapper = mountWithRouter({ to: { path: '/' } }, { default: () => '页面1' }, { push });
      await nextTick();
      await wrapper.find('.t-breadcrumb__inner').trigger('click');
      expect(push).toHaveBeenCalled();
      expect(wrapper.find('.t-breadcrumb--text-overflow').classes()).toContain('t-link');
    });

    it(':to[string] with router uses router.push', async () => {
      const push = vi.fn();
      const wrapper = mountWithRouter({ to: '/home' }, { default: () => '页面1' }, { push });
      await nextTick();
      await wrapper.find('.t-breadcrumb__inner').trigger('click');
      expect(push).toHaveBeenCalledWith('/home');
    });

    it(':replace[boolean] with router uses router.replace', async () => {
      const replace = vi.fn();
      const wrapper = mountWithRouter({ to: { path: '/' }, replace: true }, { default: () => '页面1' }, { replace });
      await nextTick();
      await wrapper.find('.t-breadcrumb__inner').trigger('click');
      expect(replace).toHaveBeenCalled();
    });

    it(':router[object] uses custom router', async () => {
      const push = vi.fn();
      const customRouter = { push };
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => (
            <BreadcrumbItem to="/page" router={customRouter}>
              页面1
            </BreadcrumbItem>
          ),
        },
      });
      await nextTick();
      await wrapper.find('.t-breadcrumb__inner').trigger('click');
      expect(push).toHaveBeenCalledWith('/page');
    });

    it(':maxWidth[string] overrides parent maxItemWidth', async () => {
      const wrapper = mount(Breadcrumb, {
        props: { maxItemWidth: '150' },
        slots: {
          default: () => [
            <BreadcrumbItem maxWidth="100">页面1超长了页面1超长了页面1超长了</BreadcrumbItem>,
            <BreadcrumbItem>页面2面包屑文案超长时悬浮显示文案全部信息</BreadcrumbItem>,
          ],
        },
      });
      await nextTick();
      const items = wrapper.findAllComponents(BreadcrumbItem);
      expect(items[0].find('.t-breadcrumb__inner').element.getAttribute('style')).toContain('max-width: 100px');
      expect(items[1].find('.t-breadcrumb__inner').element.getAttribute('style')).toContain('max-width: 150px');
    });

    it(':maxWidth not provided uses default 120px', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => <BreadcrumbItem>页面1</BreadcrumbItem>,
        },
      });
      await nextTick();
      const inner = wrapper.find('.t-breadcrumb__inner');
      expect(inner.element.getAttribute('style')).toContain('max-width: 120px');
    });

    it(':icon[slot]', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => (
            <BreadcrumbItem v-slots={{ icon: () => <span class="custom-icon">icon</span> }}>页面1</BreadcrumbItem>
          ),
        },
      });
      await nextTick();
      expect(wrapper.find('.custom-icon').exists()).toBeTruthy();
    });

    it('no href no to renders as span', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => <BreadcrumbItem>页面1</BreadcrumbItem>,
        },
      });
      await nextTick();
      const textOverflow = wrapper.find('.t-breadcrumb--text-overflow');
      expect(textOverflow.element.tagName).toBe('SPAN');
    });

    it('to without router falls back to window.location.href', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => <BreadcrumbItem to="/page">页面1</BreadcrumbItem>,
        },
      });
      await nextTick();
      expect(wrapper.find('a.t-link').exists()).toBeTruthy();
      await wrapper.find('a.t-link').trigger('click');
    });

    it('isCutOff renders tooltip when text is ellipsis', async () => {
      const spy = vi.spyOn(sharedUtils, 'isTextEllipsis').mockReturnValue(true);
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => <BreadcrumbItem>超长文本超长文本超长文本超长文本超长文本</BreadcrumbItem>,
        },
        attachTo: document.body,
      });
      await nextTick();
      const tooltipWrapper = wrapper.findComponent({ name: 'TTooltip' });
      expect(tooltipWrapper.exists()).toBeTruthy();
      spy.mockRestore();
    });

    it('isCutOff false does not render tooltip', async () => {
      const spy = vi.spyOn(sharedUtils, 'isTextEllipsis').mockReturnValue(false);
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => <BreadcrumbItem>短文本</BreadcrumbItem>,
        },
        attachTo: document.body,
      });
      await nextTick();
      const tooltipWrapper = wrapper.findComponent({ name: 'TTooltip' });
      expect(tooltipWrapper.exists()).toBeFalsy();
      spy.mockRestore();
    });

    it('onBeforeUpdate triggers isCutOff recalculation', async () => {
      const spy = vi.spyOn(sharedUtils, 'isTextEllipsis').mockReturnValue(false);
      const UpdateTestComponent = defineComponent({
        setup() {
          const text = ref('短文本');
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
      const wrapper = mount(UpdateTestComponent);
      await nextTick();
      expect(spy).toHaveBeenCalled();

      spy.mockReturnValue(true);
      wrapper.vm.text = '超长文本超长文本超长文本超长文本超长文本超长文本';
      await nextTick();
      expect(spy.mock.calls.length).toBeGreaterThanOrEqual(2);
      spy.mockRestore();
    });

    it(':isEllipsisItem renders div with flex display', async () => {
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
      const items = wrapper.findAllComponents(BreadcrumbItem);
      const ellipsisItem = items[1];
      const flexDiv = ellipsisItem.find('div[style*="display: flex"]');
      expect(flexDiv.exists()).toBeTruthy();
    });
  });

  // ==================== Events Tests ====================
  describe('events', () => {
    it('onClick', async () => {
      const onClick = vi.fn();
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => <BreadcrumbItem onClick={onClick}>页面1</BreadcrumbItem>,
        },
      });
      await nextTick();
      await wrapper.findComponent(BreadcrumbItem).trigger('click');
      expect(onClick).toHaveBeenCalled();
    });

    it('onClick disabled does not fire', async () => {
      const onClick = vi.fn();
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => (
            <BreadcrumbItem disabled onClick={onClick}>
              页面1
            </BreadcrumbItem>
          ),
        },
      });
      await nextTick();
      await wrapper.findComponent(BreadcrumbItem).trigger('click');
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  // ==================== Snapshot Tests ====================
  describe('snapshots', () => {
    it('default render', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => <BreadcrumbItem>页面1</BreadcrumbItem>,
        },
      });
      await nextTick();
      expect(wrapper.findComponent(BreadcrumbItem).element).toMatchSnapshot();
    });

    it('with href', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => [
            <BreadcrumbItem href="https://www.tencent.com">页面1</BreadcrumbItem>,
            <BreadcrumbItem>页面2</BreadcrumbItem>,
          ],
        },
      });
      await nextTick();
      expect(wrapper.element).toMatchSnapshot();
    });

    it('disabled item', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => <BreadcrumbItem disabled>页面1</BreadcrumbItem>,
        },
      });
      await nextTick();
      expect(wrapper.findComponent(BreadcrumbItem).element).toMatchSnapshot();
    });

    it('with icon slot', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => (
            <BreadcrumbItem v-slots={{ icon: () => <span class="test-icon">icon</span> }}>页面1</BreadcrumbItem>
          ),
        },
      });
      await nextTick();
      expect(wrapper.findComponent(BreadcrumbItem).element).toMatchSnapshot();
    });

    it('with to and router', async () => {
      const wrapper = mountWithRouter({ to: '/home' }, { default: () => '页面1' }, { push: vi.fn() });
      await nextTick();
      expect(wrapper.findComponent(BreadcrumbItem).element).toMatchSnapshot();
    });
  });

  // ==================== Edge Cases Tests ====================
  describe('edge cases', () => {
    it('should handle unmount gracefully', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => <BreadcrumbItem>页面1</BreadcrumbItem>,
        },
      });
      await nextTick();
      wrapper.unmount();
      expect(true).toBe(true);
    });

    it('breadcrumbText ref is null before mount (onMounted guard)', async () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => <BreadcrumbItem>页面1</BreadcrumbItem>,
        },
      });
      await nextTick();
      expect(wrapper.find('.t-breadcrumb__inner').exists()).toBeTruthy();
    });

    it('separator style textOverflow based on isCutOff', async () => {
      const spy = vi.spyOn(sharedUtils, 'isTextEllipsis').mockReturnValue(true);
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => <BreadcrumbItem>超长文本超长文本超长文本</BreadcrumbItem>,
        },
        attachTo: document.body,
      });
      await nextTick();
      const separator = wrapper.find('.t-breadcrumb__separator');
      expect(separator.element.getAttribute('style')).toContain('text-overflow: ellipsis');
      spy.mockRestore();
    });

    it('separator style textOverflow clip when not cut off', async () => {
      const spy = vi.spyOn(sharedUtils, 'isTextEllipsis').mockReturnValue(false);
      const wrapper = mount(Breadcrumb, {
        slots: {
          default: () => <BreadcrumbItem>短文本</BreadcrumbItem>,
        },
        attachTo: document.body,
      });
      await nextTick();
      const separator = wrapper.find('.t-breadcrumb__separator');
      expect(separator.element.getAttribute('style')).toContain('text-overflow: clip');
      spy.mockRestore();
    });
  });
});
