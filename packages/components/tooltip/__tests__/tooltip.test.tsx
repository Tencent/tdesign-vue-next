import { nextTick } from 'vue';
import type { CSSProperties } from 'vue';
import { afterEach, expect, vi } from 'vitest';
import type { TooltipProps } from '@tdesign/components/tooltip';
import tooltipProps from '@tdesign/components/tooltip/props';
import popupProps from '@tdesign/components/popup/props';
import type { PopupVisibleChangeContext } from '@tdesign/components/popup';
import {
  cleanup,
  getPopupStub,
  getVisibleChange,
  popupUpdate,
  renderTooltip,
  renderTooltipWithPopupStub,
  waitForPopupRender,
} from './mount';

describe('Tooltip', () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('props', () => {
    it(':attach[string]', () => {
      const wrapper = renderTooltipWithPopupStub({ attach: '#popup-container' });

      expect(getPopupStub(wrapper).props('attach')).toBe('#popup-container');
    });

    it(':attach[function]', () => {
      const attach = () => document.body;
      const wrapper = renderTooltipWithPopupStub({ attach });

      expect(getPopupStub(wrapper).props('attach')).toBe(attach);
    });

    it(':content[string]', () => {
      const wrapper = renderTooltipWithPopupStub({ content: 'tooltip content' });

      expect(wrapper.find('.popup-content').text()).toBe('tooltip content');
      expect(getPopupStub(wrapper).props('content')).toBeUndefined();
    });

    it(':content[function]', () => {
      const wrapper = renderTooltipWithPopupStub({
        content: () => <span class="function-content">function content</span>,
      });

      expect(wrapper.find('.function-content').text()).toBe('function content');
    });

    it(':content[slot]', () => {
      const wrapper = renderTooltipWithPopupStub({}, { content: () => <span class="slot-content">slot content</span> });

      expect(wrapper.find('.slot-content').text()).toBe('slot content');
    });

    it(':content[empty]', () => {
      const wrapper = renderTooltipWithPopupStub({ content: '' });

      expect(wrapper.find('.popup-content').exists()).toBe(false);
      expect(getPopupStub(wrapper).props('hideEmptyPopup')).toBe(true);
    });

    it(':default[string]', () => {
      const wrapper = renderTooltipWithPopupStub({ default: 'property trigger' });

      expect(wrapper.find('.popup-trigger').text()).toBe('property trigger');
      expect(getPopupStub(wrapper).props('default')).toBeUndefined();
    });

    it(':default[function]', () => {
      const wrapper = renderTooltipWithPopupStub({
        default: () => <button class="function-trigger">function trigger</button>,
      });

      expect(wrapper.find('.function-trigger').text()).toBe('function trigger');
    });

    it(':default[slot]', () => {
      const wrapper = renderTooltipWithPopupStub(
        {},
        { default: () => <button class="slot-trigger">slot trigger</button> },
      );

      expect(wrapper.find('.slot-trigger').text()).toBe('slot trigger');
    });

    it(':delay[number]', () => {
      const wrapper = renderTooltipWithPopupStub({ delay: 120 });

      expect(getPopupStub(wrapper).props('delay')).toBe(120);
    });

    it(':destroyOnClose[boolean]', () => {
      const defaultWrapper = renderTooltipWithPopupStub();
      const trueWrapper = renderTooltipWithPopupStub({ destroyOnClose: true });
      const falseWrapper = renderTooltipWithPopupStub({ destroyOnClose: false });

      // Tooltip declares true as its default, but only raw vnode props are forwarded to Popup.
      expect(getPopupStub(defaultWrapper).props('destroyOnClose')).toBe(false);
      expect(getPopupStub(trueWrapper).props('destroyOnClose')).toBe(true);
      expect(getPopupStub(falseWrapper).props('destroyOnClose')).toBe(false);
    });

    it(':disabled[boolean]', () => {
      const wrapper = renderTooltipWithPopupStub({ disabled: true });

      expect(getPopupStub(wrapper).props('disabled')).toBe(true);
    });

    it(':duration[number]', async () => {
      vi.useFakeTimers();
      const onVisibleChange = vi.fn();
      const wrapper = renderTooltipWithPopupStub({ defaultVisible: true, duration: 100, onVisibleChange });

      expect(getPopupStub(wrapper).props('visible')).toBe(true);
      vi.advanceTimersByTime(100);
      await nextTick();
      expect(onVisibleChange).toHaveBeenCalledWith(false, {});
      expect(getPopupStub(wrapper).props('visible')).toBe(false);
    });

    it(':duration[number] with modelValue', () => {
      vi.useFakeTimers();
      const onVisibleChange = vi.fn();
      const wrapper = renderTooltipWithPopupStub({ modelValue: true, duration: 100, onVisibleChange });

      vi.advanceTimersByTime(100);

      // Current duration initialization ignores modelValue and does not start a timer.
      expect(onVisibleChange).not.toHaveBeenCalled();
      expect(getPopupStub(wrapper).props('visible')).toBe(true);
    });

    it(':duration[number] with controlled false visible', () => {
      vi.useFakeTimers();
      const onVisibleChange = vi.fn();
      const wrapper = renderTooltipWithPopupStub({
        visible: false,
        defaultVisible: true,
        duration: 100,
        onVisibleChange,
      });

      expect(getPopupStub(wrapper).props('visible')).toBe(false);
      vi.advanceTimersByTime(100);

      // Current initialization uses `visible || defaultVisible`, so a hidden controlled Tooltip still starts the timer.
      expect(onVisibleChange).toHaveBeenCalledWith(false, {});
    });

    it(':hideEmptyPopup[boolean]', () => {
      const wrapper = renderTooltipWithPopupStub({ hideEmptyPopup: false });

      expect(getPopupStub(wrapper).props('hideEmptyPopup')).toBe(true);
    });

    it(':overlayClassName[string/array/object]', () => {
      const overlayClassName = ['custom-overlay', { 'custom-active': true }];
      const wrapper = renderTooltipWithPopupStub({ overlayClassName, theme: 'success' });

      expect(getPopupStub(wrapper).props('overlayClassName')).toEqual([
        't-tooltip',
        { 't-tooltip--success': 'success' },
        overlayClassName,
      ]);
    });

    it(':overlayInnerClassName[string/array/object]', () => {
      const overlayInnerClassName = ['inner-class', { active: true }];
      const wrapper = renderTooltipWithPopupStub({ overlayInnerClassName });

      expect(getPopupStub(wrapper).props('overlayInnerClassName')).toEqual(overlayInnerClassName);
    });

    it(':overlayInnerStyle[boolean]', () => {
      const wrapper = renderTooltipWithPopupStub({
        overlayInnerStyle: false as unknown as TooltipProps['overlayInnerStyle'],
      });

      expect(getPopupStub(wrapper).props('overlayInnerStyle')).toBe(false);
    });

    it(':overlayInnerStyle[object]', async () => {
      const wrapper = renderTooltipWithPopupStub({ placement: 'mouse', overlayInnerStyle: { color: 'red' } });
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: 120 }));
      getVisibleChange(wrapper)(true, { trigger: 'trigger-element-hover' });
      await nextTick();

      const trigger = document.createElement('button');
      const popup = document.createElement('div');
      vi.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({ left: 20 } as DOMRect);
      const style = getPopupStub(wrapper).props('overlayInnerStyle') as unknown as (
        triggerElement: HTMLElement,
        popupElement: HTMLElement,
      ) => CSSProperties;

      expect(style(trigger, popup)).toEqual({ transform: 'translateX(100px)', color: 'red' });
    });

    it(':overlayInnerStyle[function]', async () => {
      const overlayInnerStyle = vi.fn(() => ({ color: 'blue' }));
      const wrapper = renderTooltipWithPopupStub({ placement: 'mouse', overlayInnerStyle });
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: 90 }));
      getVisibleChange(wrapper)(true, { trigger: 'trigger-element-hover' });
      await nextTick();

      const trigger = document.createElement('button');
      const popup = document.createElement('div');
      vi.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({ left: 30 } as DOMRect);
      const style = getPopupStub(wrapper).props('overlayInnerStyle') as unknown as (
        triggerElement: HTMLElement,
        popupElement: HTMLElement,
      ) => CSSProperties;

      expect(style(trigger, popup)).toEqual({ transform: 'translateX(60px)', color: 'blue' });
      expect(overlayInnerStyle).toHaveBeenCalledWith(trigger, popup);
    });

    it(':overlayStyle[boolean]', () => {
      const falseWrapper = renderTooltipWithPopupStub({
        overlayStyle: false as unknown as TooltipProps['overlayStyle'],
      });

      expect(getPopupStub(falseWrapper).props('overlayStyle')).toBe(false);
    });

    it(':overlayStyle[object]', () => {
      const objectWrapper = renderTooltipWithPopupStub({ overlayStyle: { width: '120px' } });

      expect(getPopupStub(objectWrapper).props('overlayStyle')).toEqual({ width: '120px' });
    });

    it(':overlayStyle[function]', () => {
      const styleFunction = vi.fn(() => ({ color: 'red' }));
      const functionWrapper = renderTooltipWithPopupStub({ overlayStyle: styleFunction });

      expect(getPopupStub(functionWrapper).props('overlayStyle')).toBe(styleFunction);
    });

    it(':placement[string]', () => {
      const wrapper = renderTooltipWithPopupStub({ placement: 'bottom-right' });

      expect(getPopupStub(wrapper).props('placement')).toBe('bottom-right');
      expect(getPopupStub(wrapper).props('showArrow')).toBe(true);
    });

    it(':placement[mouse]', async () => {
      const wrapper = renderTooltipWithPopupStub({ placement: 'mouse' });

      expect(getPopupStub(wrapper).props('placement')).toBe('bottom-left');
      expect(getPopupStub(wrapper).props('showArrow')).toBe(false);
      expect(getPopupStub(wrapper).props('overlayInnerStyle')).toBe(false);

      window.dispatchEvent(new MouseEvent('mousemove', { clientX: 80 }));
      getVisibleChange(wrapper)(true, { trigger: 'trigger-element-hover' });
      await nextTick();

      const trigger = document.createElement('button');
      vi.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({ left: 25 } as DOMRect);
      const style = getPopupStub(wrapper).props('overlayInnerStyle') as unknown as (
        triggerElement: HTMLElement,
        popupElement: HTMLElement,
      ) => CSSProperties;
      expect(style(trigger, document.createElement('div'))).toEqual({ transform: 'translateX(55px)' });
    });

    it(':popperOptions[object]', () => {
      const popperOptions = { strategy: 'fixed' };
      const wrapper = renderTooltipWithPopupStub({ popperOptions });

      expect(getPopupStub(wrapper).props('popperOptions')).toEqual(popperOptions);
    });

    it(':showArrow[boolean]', () => {
      const defaultWrapper = renderTooltipWithPopupStub();
      const falseWrapper = renderTooltipWithPopupStub({ showArrow: false });

      expect(getPopupStub(defaultWrapper).props('showArrow')).toBe(true);
      expect(getPopupStub(falseWrapper).props('showArrow')).toBe(false);
    });

    it.each(['default', 'primary', 'success', 'danger', 'warning', 'light'] as const)(':theme[%s]', (theme) => {
      const wrapper = renderTooltipWithPopupStub({ theme });
      const overlayClassName = getPopupStub(wrapper).props('overlayClassName') as unknown[];

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
      const wrapper = renderTooltipWithPopupStub({ trigger });

      expect(getPopupStub(wrapper).props('trigger')).toBe(trigger);
    });

    it(':trigger[validator]', () => {
      const validator = popupProps.trigger.validator;

      expect(validator(undefined)).toBe(true);
      expect(validator('click')).toBe(true);
      expect(validator('invalid' as TooltipProps['trigger'])).toBe(false);
    });

    it(':triggerElement[string]', () => {
      const wrapper = renderTooltipWithPopupStub({ triggerElement: '#external-trigger' });

      expect(getPopupStub(wrapper).props('triggerElement')).toBe('#external-trigger');
      expect(wrapper.find('.popup-trigger').text()).toBe('#external-trigger');
    });

    it(':triggerElement[function]', () => {
      const triggerElement = () => <button class="property-trigger">property trigger</button>;
      const wrapper = renderTooltipWithPopupStub({ triggerElement });

      expect(getPopupStub(wrapper).props('triggerElement')).toBe(triggerElement);
      expect(wrapper.find('.property-trigger').text()).toBe('property trigger');
    });

    it(':triggerElement[slot]', () => {
      const wrapper = renderTooltipWithPopupStub(
        {},
        { triggerElement: () => <button class="named-trigger">named trigger</button> },
      );

      expect(wrapper.find('.named-trigger').text()).toBe('named trigger');
    });

    it(':visible[boolean]', () => {
      const wrapper = renderTooltipWithPopupStub({ visible: true });

      expect(getPopupStub(wrapper).props('visible')).toBe(true);
    });

    it(':modelValue[boolean]', () => {
      const wrapper = renderTooltipWithPopupStub({ modelValue: true });

      expect(getPopupStub(wrapper).props('visible')).toBe(true);
      expect(getPopupStub(wrapper).props('modelValue')).toBe(true);
    });

    it(':defaultVisible[boolean]', () => {
      const wrapper = renderTooltipWithPopupStub({ defaultVisible: true });

      expect(getPopupStub(wrapper).props('visible')).toBe(true);
    });

    it(':zIndex[number]', () => {
      const wrapper = renderTooltipWithPopupStub({ zIndex: 6000 });

      expect(getPopupStub(wrapper).props('zIndex')).toBe(6000);
    });
  });

  describe('events', () => {
    it('overlay-click', () => {
      const onOverlayClick = vi.fn();
      const wrapper = renderTooltipWithPopupStub({ onOverlayClick });
      const event = new MouseEvent('click');

      const handler = getPopupStub(wrapper).props('onOverlayClick') as TooltipProps['onOverlayClick'];
      handler?.({ e: event });

      expect(onOverlayClick).toHaveBeenCalledWith({ e: event });
    });

    it('scroll', () => {
      const onScroll = vi.fn();
      const wrapper = renderTooltipWithPopupStub({ onScroll });
      const event = new WheelEvent('scroll');

      const handler = getPopupStub(wrapper).props('onScroll') as TooltipProps['onScroll'];
      handler?.({ e: event });

      expect(onScroll).toHaveBeenCalledWith({ e: event });
    });

    it('scroll-to-bottom', () => {
      const onScrollToBottom = vi.fn();
      const wrapper = renderTooltipWithPopupStub({ onScrollToBottom });
      const event = new WheelEvent('scroll');

      const handler = getPopupStub(wrapper).props('onScrollToBottom') as TooltipProps['onScrollToBottom'];
      handler?.({ e: event });

      expect(onScrollToBottom).toHaveBeenCalledWith({ e: event });
    });

    it('visible-change', async () => {
      const onVisibleChange = vi.fn();
      const wrapper = renderTooltipWithPopupStub({ onVisibleChange });
      const context: PopupVisibleChangeContext = { trigger: 'trigger-element-click' };

      getVisibleChange(wrapper)(true, context);
      await nextTick();

      expect(onVisibleChange).toHaveBeenCalledWith(true, context);
      expect(getPopupStub(wrapper).props('visible')).toBe(true);
    });

    it('update:visible', () => {
      const onVisibleChange = vi.fn();
      const wrapper = renderTooltipWithPopupStub({ visible: false, onVisibleChange });
      const context: PopupVisibleChangeContext = { trigger: 'trigger-element-hover' };

      getVisibleChange(wrapper)(true, context);

      expect(wrapper.emitted('update:visible')).toEqual([[true]]);
      expect(onVisibleChange).toHaveBeenCalledWith(true, context);
    });

    it('update:modelValue', () => {
      const onVisibleChange = vi.fn();
      const wrapper = renderTooltipWithPopupStub({ modelValue: false, onVisibleChange });
      const context: PopupVisibleChangeContext = { trigger: 'trigger-element-focus' };

      getVisibleChange(wrapper)(true, context);

      expect(wrapper.emitted('update:modelValue')).toEqual([[true]]);
      expect(onVisibleChange).toHaveBeenCalledWith(true, context);
    });

    it('visible-change while duration timer is active', async () => {
      vi.useFakeTimers();
      const onVisibleChange = vi.fn();
      const wrapper = renderTooltipWithPopupStub({ defaultVisible: true, duration: 100, onVisibleChange });

      getVisibleChange(wrapper)(false, { trigger: 'trigger-element-hover' });
      expect(onVisibleChange).not.toHaveBeenCalled();

      getVisibleChange(wrapper)(false, { trigger: 'document' });
      await nextTick();
      expect(onVisibleChange).toHaveBeenCalledTimes(1);
      expect(getPopupStub(wrapper).props('visible')).toBe(false);

      // The duration ref is not synchronized, so the pending timer still fires after a document close.
      vi.advanceTimersByTime(100);
      expect(onVisibleChange).toHaveBeenCalledTimes(2);
    });
  });

  describe('instanceFunctions', () => {
    it('updatePopper()', () => {
      const wrapper = renderTooltipWithPopupStub();

      wrapper.vm.$.exposed.updatePopper();

      expect(popupUpdate).toHaveBeenCalledTimes(1);
    });

    it('updatePopper() after unmount', async () => {
      const wrapper = renderTooltipWithPopupStub();
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
      const wrapper = renderTooltipWithPopupStub({ defaultVisible: true, duration: 100, onVisibleChange });

      wrapper.unmount();
      vi.advanceTimersByTime(100);

      // Tooltip currently has no unmount cleanup for its duration timer.
      expect(onVisibleChange).toHaveBeenCalledWith(false, {});
    });
  });

  describe('integration with Popup', () => {
    it('renders content when visible', async () => {
      renderTooltip({ content: 'tooltip content', defaultVisible: true }, { default: () => <button>trigger</button> });

      await waitForPopupRender();

      expect(document.body.querySelector('.t-popup__content')?.textContent).toBe('tooltip content');
    });

    it('renders the Popup arrow', async () => {
      renderTooltip(
        { content: 'tooltip content', defaultVisible: true, showArrow: true },
        { default: () => <button>trigger</button> },
      );

      await waitForPopupRender();

      expect(document.body.querySelector('.t-popup__arrow')).not.toBeNull();
    });

    it('applies the theme class to Popup', async () => {
      renderTooltip(
        { content: 'tooltip content', defaultVisible: true, theme: 'success' },
        { default: () => <button>trigger</button> },
      );

      await waitForPopupRender();

      expect(document.body.querySelector('.t-popup')?.classList.contains('t-tooltip--success')).toBe(true);
    });

    it('opens Popup after a real trigger interaction', async () => {
      const wrapper = renderTooltip(
        { content: 'tooltip content', trigger: 'click' },
        { default: () => <button class="tooltip-trigger">trigger</button> },
      );

      expect(document.body.querySelector('.t-popup')).toBeNull();

      await waitForPopupRender();
      await wrapper.find('.tooltip-trigger').trigger('click');
      await waitForPopupRender();

      expect(document.body.querySelector('.t-popup__content')?.textContent).toBe('tooltip content');
    });
  });
});
