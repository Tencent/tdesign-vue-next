import { nextTick } from 'vue';
import type { Slots, VNode } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Popup from '@tdesign/components/popup';
import { StickyItem } from '@tdesign/components/sticky-tool';
import stickyItemProps from '@tdesign/components/sticky-tool/sticky-item-props';

type StickyItemMountProps = Partial<InstanceType<typeof StickyItem>['$props']>;

const getPopupTrigger = (wrapper: VueWrapper) => {
  const popupSlots = wrapper.findComponent(Popup).vm.$slots as Slots;
  return popupSlots.default?.()[0] as VNode;
};

const getVNodeText = (node: VNode) => {
  if (typeof node.children === 'string') return node.children;
  if (!Array.isArray(node.children)) return '';
  return node.children.map((child) => (typeof child === 'string' ? child : (child as VNode).children)).join('');
};

describe('StickyItem', () => {
  const wrappers: VueWrapper[] = [];

  const mountStickyItem = (props: StickyItemMountProps = {}, slots: Record<string, () => unknown> = {}) => {
    const wrapper = mount(StickyItem, {
      props: {
        onClick: vi.fn(),
        onHover: vi.fn(),
        ...props,
      },
      slots,
    });
    wrappers.push(wrapper);
    return wrapper;
  };

  afterEach(() => {
    wrappers.forEach((wrapper) => wrapper.unmount());
    wrappers.length = 0;
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  describe('props', () => {
    it(':icon[function]', () => {
      const wrapper = mountStickyItem({ icon: () => <span class="function-icon">icon</span> });

      expect(wrapper.find('.function-icon').text()).toBe('icon');
    });

    it(':icon[slot]', () => {
      const wrapper = mountStickyItem({}, { icon: () => <span class="slot-icon">icon slot</span> });

      expect(wrapper.find('.slot-icon').text()).toBe('icon slot');
    });

    it(':label[string]', () => {
      const wrapper = mountStickyItem({ label: 'Feedback' });

      expect(wrapper.find('.t-sticky-item__label').text()).toBe('Feedback');
    });

    it(':label[function]', () => {
      const wrapper = mountStickyItem({ label: () => <span class="function-label">Feedback</span> });

      expect(wrapper.find('.function-label').text()).toBe('Feedback');
    });

    it(':label[slot]', () => {
      const wrapper = mountStickyItem({}, { label: () => <span class="slot-label">Feedback slot</span> });

      expect(wrapper.find('.slot-label').text()).toBe('Feedback slot');
    });

    it(':label[function] takes precedence over label slot', () => {
      const wrapper = mountStickyItem(
        { label: () => <span class="function-label">Function</span> },
        { label: () => <span class="slot-label">Slot</span> },
      );

      expect(wrapper.find('.function-label').exists()).toBe(true);
      expect(wrapper.find('.slot-label').exists()).toBe(false);
    });

    it(':popup[string]', async () => {
      const wrapper = mountStickyItem({ popup: 'Popup text', popupProps: { visible: true } });
      await nextTick();

      const content = wrapper.findComponent(Popup).props('content') as () => unknown;
      expect(content()).toBe('Popup text');
    });

    it(':popup[function]', () => {
      const wrapper = mountStickyItem({
        popup: () => <span class="function-popup">Function popup</span>,
      });
      const content = wrapper.findComponent(Popup).props('content') as () => unknown;
      const node = content() as VNode;

      expect(node.props?.class).toBe('function-popup');
      expect(getVNodeText(node)).toBe('Function popup');
    });

    it(':popup[slot]', () => {
      const wrapper = mountStickyItem({}, { popup: () => <span class="slot-popup">Slot popup</span> });
      const content = wrapper.findComponent(Popup).props('content') as () => unknown;
      const nodes = content() as VNode[];

      expect(nodes).toHaveLength(1);
      expect(nodes[0].props?.class).toBe('slot-popup');
      expect(getVNodeText(nodes[0])).toBe('Slot popup');
    });

    it(':popupProps[object]', () => {
      const wrapper = mountStickyItem({
        popup: 'Popup',
        basePopupProps: { disabled: true, showArrow: false, overlayInnerClassName: 'base-popup' },
        popupProps: { showArrow: true, overlayInnerClassName: 'item-popup' },
      });
      const popup = wrapper.findComponent(Popup);

      expect(popup.props('disabled')).toBe(true);
      expect(popup.props('showArrow')).toBe(true);
      expect(popup.props('overlayInnerClassName')).toBe('item-popup');
      expect(popup.props('hideEmptyPopup')).toBe(true);
    });

    it(':trigger[string]', () => {
      const validator = stickyItemProps.trigger.validator;
      const defaultWrapper = mountStickyItem();
      const clickWrapper = mountStickyItem({ trigger: 'click' });

      expect(validator(undefined as never)).toBe(true);
      expect(validator(null as never)).toBe(true);
      expect(validator('hover')).toBe(true);
      expect(validator('focus' as never)).toBe(false);
      expect(defaultWrapper.findComponent(Popup).props('trigger')).toBe('hover');
      expect(clickWrapper.findComponent(Popup).props('trigger')).toBe('click');
    });

    it(':type[string]', async () => {
      const wrapper = mountStickyItem({ label: 'Feedback' });

      expect(wrapper.find('.t-sticky-item').classes()).toContain('t-sticky-item--normal');
      expect(wrapper.find('.t-sticky-item__label').exists()).toBe(true);

      await wrapper.setProps({ type: 'compact' });
      expect(wrapper.find('.t-sticky-item').classes()).toContain('t-sticky-item--compact');
      expect(wrapper.find('.t-sticky-item__label').exists()).toBe(false);
    });

    it(':shape[string]', async () => {
      const wrapper = mountStickyItem();

      expect(wrapper.find('.t-sticky-item').classes()).toContain('t-sticky-item--square');
      await wrapper.setProps({ shape: 'round' });
      expect(wrapper.find('.t-sticky-item').classes()).toContain('t-sticky-item--round');
    });

    it(':placement[string]', async () => {
      const wrapper = mountStickyItem({ placement: 'right-bottom' });

      expect(wrapper.findComponent(Popup).props('placement')).toBe('left');
      await wrapper.setProps({ placement: 'left-top' });
      expect(wrapper.findComponent(Popup).props('placement')).toBe('right');
    });

    it(':baseWidth[number]', () => {
      const normalWrapper = mountStickyItem({ baseWidth: 120 });
      const compactWrapper = mountStickyItem({ baseWidth: 120, type: 'compact' });

      expect(getPopupTrigger(normalWrapper).props?.style).toEqual({ margin: 'calc((120 - 56px)/2)' });
      expect(getPopupTrigger(compactWrapper).props?.style).toEqual({ margin: 'calc((120 - 40px)/2)' });
    });

    it(':baseWidth[string]', () => {
      const wrapper = mountStickyItem({ baseWidth: '10rem' });

      expect(getPopupTrigger(wrapper).props?.style).toEqual({ margin: 'calc((10rem - 56px)/2)' });
    });
  });

  describe('events', () => {
    it('click', async () => {
      const onClick = vi.fn();
      const icon = () => <span>icon</span>;
      const wrapper = mountStickyItem({ label: 'Feedback', icon, trigger: 'click', onClick });

      await wrapper.find('.t-sticky-item').trigger('click');

      expect(onClick).toHaveBeenCalledTimes(1);
      const context = onClick.mock.calls[0][0];
      expect(context.e).toBeInstanceOf(MouseEvent);
      expect(context.item).toMatchObject({ icon, label: 'Feedback', trigger: 'click' });
    });

    it('hover', async () => {
      const onHover = vi.fn();
      const wrapper = mountStickyItem({ label: 'Feedback', onHover });

      await wrapper.find('.t-sticky-item').trigger('mouseenter');

      expect(onHover).toHaveBeenCalledTimes(1);
      const context = onHover.mock.calls[0][0];
      expect(context.e).toBeInstanceOf(MouseEvent);
      expect(context.item).toMatchObject({ label: 'Feedback', trigger: 'hover' });
    });

    it('reports errors for omitted standalone event handlers [current behavior]', async () => {
      const errorHandler = vi.fn();
      const wrapper = mount(StickyItem, {
        global: { config: { errorHandler } },
      });
      wrappers.push(wrapper);

      await wrapper.find('.t-sticky-item').trigger('click');
      await wrapper.find('.t-sticky-item').trigger('mouseenter');

      expect(errorHandler).toHaveBeenCalledTimes(2);
      expect(errorHandler.mock.calls[0][0]).toBeInstanceOf(TypeError);
      expect(errorHandler.mock.calls[1][0]).toBeInstanceOf(TypeError);
    });
  });

  describe('lifecycle', () => {
    it('does not react to popupProps replacement [current behavior]', async () => {
      const wrapper = mountStickyItem({
        basePopupProps: { disabled: false },
        popupProps: { showArrow: false },
      });
      const popup = wrapper.findComponent(Popup);

      await wrapper.setProps({
        basePopupProps: { disabled: true },
        popupProps: { showArrow: true },
      });

      // popupProps is merged once during setup and the merged object is not recomputed after prop replacement.
      expect(popup.props('showArrow')).toBe(false);
      expect(popup.props('disabled')).toBe(false);
    });

    it('removes the item on unmount', () => {
      const wrapper = mount(StickyItem, {
        props: { onClick: vi.fn(), onHover: vi.fn() },
        attachTo: document.body,
      });
      wrappers.push(wrapper);
      expect(document.querySelector('.t-sticky-item')).not.toBeNull();

      wrapper.unmount();
      expect(document.querySelector('.t-sticky-item')).toBeNull();
    });
  });
});
