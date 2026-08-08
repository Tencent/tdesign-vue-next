import { defineComponent, nextTick } from 'vue';
import type { CSSProperties, VNodeChild } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, expect, vi } from 'vitest';
import Tooltip from '@tdesign/components/tooltip';
import type { TooltipProps } from '@tdesign/components/tooltip';
import tooltipProps from '@tdesign/components/tooltip/props';
import popupProps from '@tdesign/components/popup/props';
import type { PopupVisibleChangeContext } from '@tdesign/components/popup';

const popupUpdate = vi.fn();

const PopupStub = defineComponent({
  name: 'TPopup',
  inheritAttrs: false,
  props: popupProps,
  setup(_, { expose, slots }) {
    expose({ update: popupUpdate });
    return () => (
      <section class="popup-stub">
        <div class="popup-trigger">{slots.default?.()}</div>
        {slots.content && <div class="popup-content">{slots.content()}</div>}
      </section>
    );
  },
});

const wrappers: VueWrapper[] = [];

function renderTooltip(props: Partial<TooltipProps> = {}, slots: Record<string, () => VNodeChild> = {}) {
  const wrapper = mount(Tooltip, {
    props,
    slots,
    global: {
      stubs: {
        TPopup: PopupStub,
      },
    },
  });
  wrappers.push(wrapper);
  return wrapper;
}

function getPopup(wrapper: VueWrapper) {
  return wrapper.findComponent(PopupStub);
}

function getVisibleChange(wrapper: VueWrapper) {
  return getPopup(wrapper).props('onVisibleChange') as (visible: boolean, context?: PopupVisibleChangeContext) => void;
}

describe('Tooltip', () => {
  beforeEach(() => {
    popupUpdate.mockReset();
  });

  afterEach(() => {
    wrappers.splice(0).forEach((wrapper) => wrapper.unmount());
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('props', () => {
    it(':attach[string]', () => {
      const wrapper = renderTooltip({ attach: '#popup-container' });

      expect(getPopup(wrapper).props('attach')).toBe('#popup-container');
    });

    it(':attach[function]', () => {
      const attach = () => document.body;
      const wrapper = renderTooltip({ attach });

      expect(getPopup(wrapper).props('attach')).toBe(attach);
    });

    it(':content[string]', () => {
      const wrapper = renderTooltip({ content: 'tooltip content' });

      expect(wrapper.find('.popup-content').text()).toBe('tooltip content');
      expect(getPopup(wrapper).props('content')).toBeUndefined();
    });

    it(':content[function]', () => {
      const wrapper = renderTooltip({
        content: () => <span class="function-content">function content</span>,
      });

      expect(wrapper.find('.function-content').text()).toBe('function content');
    });

    it(':content[slot]', () => {
      const wrapper = renderTooltip({}, { content: () => <span class="slot-content">slot content</span> });

      expect(wrapper.find('.slot-content').text()).toBe('slot content');
    });

    it(':content[empty]', () => {
      const wrapper = renderTooltip({ content: '' });

      expect(wrapper.find('.popup-content').exists()).toBe(false);
      expect(getPopup(wrapper).props('hideEmptyPopup')).toBe(true);
    });

    it(':default[string]', () => {
      const wrapper = renderTooltip({ default: 'property trigger' });

      expect(wrapper.find('.popup-trigger').text()).toBe('property trigger');
      expect(getPopup(wrapper).props('default')).toBeUndefined();
    });

    it(':default[function]', () => {
      const wrapper = renderTooltip({
        default: () => <button class="function-trigger">function trigger</button>,
      });

      expect(wrapper.find('.function-trigger').text()).toBe('function trigger');
    });

    it(':default[slot]', () => {
      const wrapper = renderTooltip({}, { default: () => <button class="slot-trigger">slot trigger</button> });

      expect(wrapper.find('.slot-trigger').text()).toBe('slot trigger');
    });

    it(':delay[number]', () => {
      const wrapper = renderTooltip({ delay: 120 });

      expect(getPopup(wrapper).props('delay')).toBe(120);
    });

    it(':destroyOnClose[boolean]', () => {
      const defaultWrapper = renderTooltip();
      const trueWrapper = renderTooltip({ destroyOnClose: true });
      const falseWrapper = renderTooltip({ destroyOnClose: false });

      // Tooltip declares true as its default, but only raw vnode props are forwarded to Popup.
      expect(getPopup(defaultWrapper).props('destroyOnClose')).toBe(false);
      expect(getPopup(trueWrapper).props('destroyOnClose')).toBe(true);
      expect(getPopup(falseWrapper).props('destroyOnClose')).toBe(false);
    });

    it(':disabled[boolean]', () => {
      const wrapper = renderTooltip({ disabled: true });

      expect(getPopup(wrapper).props('disabled')).toBe(true);
    });

    it(':duration[number]', async () => {
      vi.useFakeTimers();
      const onVisibleChange = vi.fn();
      const wrapper = renderTooltip({ defaultVisible: true, duration: 100, onVisibleChange });

      expect(getPopup(wrapper).props('visible')).toBe(true);
      vi.advanceTimersByTime(100);
      await nextTick();
      expect(onVisibleChange).toHaveBeenCalledWith(false, {});
      expect(getPopup(wrapper).props('visible')).toBe(false);
    });

    it(':duration[number] with modelValue', () => {
      vi.useFakeTimers();
      const onVisibleChange = vi.fn();
      const wrapper = renderTooltip({ modelValue: true, duration: 100, onVisibleChange });

      vi.advanceTimersByTime(100);

      // Current duration initialization ignores modelValue and does not start a timer.
      expect(onVisibleChange).not.toHaveBeenCalled();
      expect(getPopup(wrapper).props('visible')).toBe(true);
    });

    it(':duration[number] with controlled false visible', () => {
      vi.useFakeTimers();
      const onVisibleChange = vi.fn();
      const wrapper = renderTooltip({ visible: false, defaultVisible: true, duration: 100, onVisibleChange });

      expect(getPopup(wrapper).props('visible')).toBe(false);
      vi.advanceTimersByTime(100);

      // Current initialization uses `visible || defaultVisible`, so a hidden controlled Tooltip still starts the timer.
      expect(onVisibleChange).toHaveBeenCalledWith(false, {});
    });

    it(':hideEmptyPopup[boolean]', () => {
      const wrapper = renderTooltip({ hideEmptyPopup: false });

      expect(getPopup(wrapper).props('hideEmptyPopup')).toBe(true);
    });

    it(':overlayClassName[string/array/object]', () => {
      const overlayClassName = ['custom-overlay', { 'custom-active': true }];
      const wrapper = renderTooltip({ overlayClassName, theme: 'success' });

      expect(getPopup(wrapper).props('overlayClassName')).toEqual([
        't-tooltip',
        { 't-tooltip--success': 'success' },
        overlayClassName,
      ]);
    });

    it(':overlayInnerClassName[string/array/object]', () => {
      const overlayInnerClassName = ['inner-class', { active: true }];
      const wrapper = renderTooltip({ overlayInnerClassName });

      expect(getPopup(wrapper).props('overlayInnerClassName')).toEqual(overlayInnerClassName);
    });

    it(':overlayInnerStyle[boolean]', () => {
      const wrapper = renderTooltip({
        overlayInnerStyle: false as unknown as TooltipProps['overlayInnerStyle'],
      });

      expect(getPopup(wrapper).props('overlayInnerStyle')).toBe(false);
    });

    it(':overlayInnerStyle[object]', async () => {
      const wrapper = renderTooltip({ placement: 'mouse', overlayInnerStyle: { color: 'red' } });
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: 120 }));
      getVisibleChange(wrapper)(true, { trigger: 'trigger-element-hover' });
      await nextTick();

      const trigger = document.createElement('button');
      const popup = document.createElement('div');
      vi.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({ left: 20 } as DOMRect);
      const style = getPopup(wrapper).props('overlayInnerStyle') as unknown as (
        triggerElement: HTMLElement,
        popupElement: HTMLElement,
      ) => CSSProperties;

      expect(style(trigger, popup)).toEqual({ transform: 'translateX(100px)', color: 'red' });
    });

    it(':overlayInnerStyle[function]', async () => {
      const overlayInnerStyle = vi.fn(() => ({ color: 'blue' }));
      const wrapper = renderTooltip({ placement: 'mouse', overlayInnerStyle });
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: 90 }));
      getVisibleChange(wrapper)(true, { trigger: 'trigger-element-hover' });
      await nextTick();

      const trigger = document.createElement('button');
      const popup = document.createElement('div');
      vi.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({ left: 30 } as DOMRect);
      const style = getPopup(wrapper).props('overlayInnerStyle') as unknown as (
        triggerElement: HTMLElement,
        popupElement: HTMLElement,
      ) => CSSProperties;

      expect(style(trigger, popup)).toEqual({ transform: 'translateX(60px)', color: 'blue' });
      expect(overlayInnerStyle).toHaveBeenCalledWith(trigger, popup);
    });

    it(':overlayStyle[boolean]', () => {
      const falseWrapper = renderTooltip({ overlayStyle: false as unknown as TooltipProps['overlayStyle'] });

      expect(getPopup(falseWrapper).props('overlayStyle')).toBe(false);
    });

    it(':overlayStyle[object]', () => {
      const objectWrapper = renderTooltip({ overlayStyle: { width: '120px' } });

      expect(getPopup(objectWrapper).props('overlayStyle')).toEqual({ width: '120px' });
    });

    it(':overlayStyle[function]', () => {
      const styleFunction = vi.fn(() => ({ color: 'red' }));
      const functionWrapper = renderTooltip({ overlayStyle: styleFunction });

      expect(getPopup(functionWrapper).props('overlayStyle')).toBe(styleFunction);
    });

    it(':placement[string]', () => {
      const wrapper = renderTooltip({ placement: 'bottom-right' });

      expect(getPopup(wrapper).props('placement')).toBe('bottom-right');
      expect(getPopup(wrapper).props('showArrow')).toBe(true);
    });

    it(':placement[mouse]', async () => {
      const wrapper = renderTooltip({ placement: 'mouse' });

      expect(getPopup(wrapper).props('placement')).toBe('bottom-left');
      expect(getPopup(wrapper).props('showArrow')).toBe(false);
      expect(getPopup(wrapper).props('overlayInnerStyle')).toBe(false);

      window.dispatchEvent(new MouseEvent('mousemove', { clientX: 80 }));
      getVisibleChange(wrapper)(true, { trigger: 'trigger-element-hover' });
      await nextTick();

      const trigger = document.createElement('button');
      vi.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({ left: 25 } as DOMRect);
      const style = getPopup(wrapper).props('overlayInnerStyle') as unknown as (
        triggerElement: HTMLElement,
        popupElement: HTMLElement,
      ) => CSSProperties;
      expect(style(trigger, document.createElement('div'))).toEqual({ transform: 'translateX(55px)' });
    });

    it(':popperOptions[object]', () => {
      const popperOptions = { strategy: 'fixed' };
      const wrapper = renderTooltip({ popperOptions });

      expect(getPopup(wrapper).props('popperOptions')).toEqual(popperOptions);
    });

    it(':showArrow[boolean]', () => {
      const defaultWrapper = renderTooltip();
      const falseWrapper = renderTooltip({ showArrow: false });

      expect(getPopup(defaultWrapper).props('showArrow')).toBe(true);
      expect(getPopup(falseWrapper).props('showArrow')).toBe(false);
    });

    it.each(['default', 'primary', 'success', 'danger', 'warning', 'light'] as const)(':theme[%s]', (theme) => {
      const wrapper = renderTooltip({ theme });
      const overlayClassName = getPopup(wrapper).props('overlayClassName') as unknown[];

      expect(overlayClassName).toContain('t-tooltip');
      expect(overlayClassName).toContainEqual({ [`t-tooltip--${theme}`]: theme });
    });

    it(':theme[validator]', () => {
      const validator = tooltipProps.theme.validator;

      expect(validator(undefined)).toBe(true);
      expect(validator('primary')).toBe(true);
      expect(validator('invalid' as TooltipProps['theme'])).toBe(false);
    });

    it.each(['hover', 'click', 'focus', 'mousedown', 'context-menu'] as const)(':trigger[%s]', (trigger) => {
      const wrapper = renderTooltip({ trigger });

      expect(getPopup(wrapper).props('trigger')).toBe(trigger);
    });

    it(':trigger[validator]', () => {
      const validator = popupProps.trigger.validator;

      expect(validator(undefined)).toBe(true);
      expect(validator('click')).toBe(true);
      expect(validator('invalid' as TooltipProps['trigger'])).toBe(false);
    });

    it(':triggerElement[string]', () => {
      const wrapper = renderTooltip({ triggerElement: '#external-trigger' });

      expect(getPopup(wrapper).props('triggerElement')).toBe('#external-trigger');
      expect(wrapper.find('.popup-trigger').text()).toBe('#external-trigger');
    });

    it(':triggerElement[function]', () => {
      const triggerElement = () => <button class="property-trigger">property trigger</button>;
      const wrapper = renderTooltip({ triggerElement });

      expect(getPopup(wrapper).props('triggerElement')).toBe(triggerElement);
      expect(wrapper.find('.property-trigger').text()).toBe('property trigger');
    });

    it(':triggerElement[slot]', () => {
      const wrapper = renderTooltip({}, { triggerElement: () => <button class="named-trigger">named trigger</button> });

      expect(wrapper.find('.named-trigger').text()).toBe('named trigger');
    });

    it(':visible[boolean]', () => {
      const wrapper = renderTooltip({ visible: true });

      expect(getPopup(wrapper).props('visible')).toBe(true);
    });

    it(':modelValue[boolean]', () => {
      const wrapper = renderTooltip({ modelValue: true });

      expect(getPopup(wrapper).props('visible')).toBe(true);
      expect(getPopup(wrapper).props('modelValue')).toBe(true);
    });

    it(':defaultVisible[boolean]', () => {
      const wrapper = renderTooltip({ defaultVisible: true });

      expect(getPopup(wrapper).props('visible')).toBe(true);
    });

    it(':zIndex[number]', () => {
      const wrapper = renderTooltip({ zIndex: 6000 });

      expect(getPopup(wrapper).props('zIndex')).toBe(6000);
    });
  });

  describe('events', () => {
    it('overlay-click', () => {
      const onOverlayClick = vi.fn();
      const wrapper = renderTooltip({ onOverlayClick });
      const event = new MouseEvent('click');

      const handler = getPopup(wrapper).props('onOverlayClick') as TooltipProps['onOverlayClick'];
      handler?.({ e: event });

      expect(onOverlayClick).toHaveBeenCalledWith({ e: event });
    });

    it('scroll', () => {
      const onScroll = vi.fn();
      const wrapper = renderTooltip({ onScroll });
      const event = new WheelEvent('scroll');

      const handler = getPopup(wrapper).props('onScroll') as TooltipProps['onScroll'];
      handler?.({ e: event });

      expect(onScroll).toHaveBeenCalledWith({ e: event });
    });

    it('scroll-to-bottom', () => {
      const onScrollToBottom = vi.fn();
      const wrapper = renderTooltip({ onScrollToBottom });
      const event = new WheelEvent('scroll');

      const handler = getPopup(wrapper).props('onScrollToBottom') as TooltipProps['onScrollToBottom'];
      handler?.({ e: event });

      expect(onScrollToBottom).toHaveBeenCalledWith({ e: event });
    });

    it('visible-change', async () => {
      const onVisibleChange = vi.fn();
      const wrapper = renderTooltip({ onVisibleChange });
      const context: PopupVisibleChangeContext = { trigger: 'trigger-element-click' };

      getVisibleChange(wrapper)(true, context);
      await nextTick();

      expect(onVisibleChange).toHaveBeenCalledWith(true, context);
      expect(getPopup(wrapper).props('visible')).toBe(true);
    });

    it('update:visible', () => {
      const onVisibleChange = vi.fn();
      const wrapper = renderTooltip({ visible: false, onVisibleChange });
      const context: PopupVisibleChangeContext = { trigger: 'trigger-element-hover' };

      getVisibleChange(wrapper)(true, context);

      expect(wrapper.emitted('update:visible')).toEqual([[true]]);
      expect(onVisibleChange).toHaveBeenCalledWith(true, context);
    });

    it('update:modelValue', () => {
      const onVisibleChange = vi.fn();
      const wrapper = renderTooltip({ modelValue: false, onVisibleChange });
      const context: PopupVisibleChangeContext = { trigger: 'trigger-element-focus' };

      getVisibleChange(wrapper)(true, context);

      expect(wrapper.emitted('update:modelValue')).toEqual([[true]]);
      expect(onVisibleChange).toHaveBeenCalledWith(true, context);
    });

    it('visible-change while duration timer is active', async () => {
      vi.useFakeTimers();
      const onVisibleChange = vi.fn();
      const wrapper = renderTooltip({ defaultVisible: true, duration: 100, onVisibleChange });

      getVisibleChange(wrapper)(false, { trigger: 'trigger-element-hover' });
      expect(onVisibleChange).not.toHaveBeenCalled();

      getVisibleChange(wrapper)(false, { trigger: 'document' });
      await nextTick();
      expect(onVisibleChange).toHaveBeenCalledTimes(1);
      expect(getPopup(wrapper).props('visible')).toBe(false);

      // The duration ref is not synchronized, so the pending timer still fires after a document close.
      vi.advanceTimersByTime(100);
      expect(onVisibleChange).toHaveBeenCalledTimes(2);
    });
  });

  describe('instanceFunctions', () => {
    it('updatePopper()', () => {
      const wrapper = renderTooltip();

      wrapper.vm.$.exposed.updatePopper();

      expect(popupUpdate).toHaveBeenCalledTimes(1);
    });

    it('updatePopper() after unmount', async () => {
      const wrapper = renderTooltip();
      const updatePopper = wrapper.vm.$.exposed.updatePopper;
      wrapper.unmount();
      await nextTick();

      expect(() => updatePopper()).not.toThrow();
      expect(popupUpdate).not.toHaveBeenCalled();
    });
  });

  describe('lifecycle', () => {
    it('keeps the duration timer after unmount', () => {
      vi.useFakeTimers();
      const onVisibleChange = vi.fn();
      const wrapper = renderTooltip({ defaultVisible: true, duration: 100, onVisibleChange });

      wrapper.unmount();
      vi.advanceTimersByTime(100);

      // Tooltip currently has no unmount cleanup for its duration timer.
      expect(onVisibleChange).toHaveBeenCalledWith(false, {});
    });
  });
});
