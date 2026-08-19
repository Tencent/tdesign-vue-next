import { nextTick } from 'vue';
import { mount, VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Popup from '@tdesign/components/popup';
import popupProps from '@tdesign/components/popup/props';
import { sleep } from '@tdesign/internal-utils';

const { createPopperMock, popperInstances } = vi.hoisted(() => ({
  createPopperMock: vi.fn(),
  popperInstances: [] as Array<{
    state: { elements: { reference: Element; popper: HTMLElement } };
    update: ReturnType<typeof vi.fn>;
    destroy: ReturnType<typeof vi.fn>;
  }>,
}));

vi.mock('@popperjs/core', () => ({
  createPopper: createPopperMock,
}));

type PopupWrapper = VueWrapper<InstanceType<typeof Popup>>;

const wrappers: PopupWrapper[] = [];
const contentText = 'popup content';

function getPopup() {
  return document.querySelector<HTMLElement>('.t-popup');
}

function getPopupContent() {
  return document.querySelector<HTMLElement>('.t-popup__content');
}

function getExposed(wrapper: PopupWrapper) {
  return wrapper.vm.$.exposed as {
    close: () => void;
    getOverlay: () => HTMLElement | undefined;
    getOverlayState: () => { hover: boolean };
    getPopper: () => any;
    update: () => void;
  };
}

function mountPopup(
  props: Record<string, unknown> = {},
  slots: Record<string, any> = { default: () => <button class="trigger">trigger</button> },
) {
  const wrapper = mount(Popup, {
    attachTo: document.body,
    props,
    slots,
  }) as PopupWrapper;
  wrappers.push(wrapper);
  return wrapper;
}

async function setVisible(wrapper: PopupWrapper, visible = true) {
  await wrapper.setProps({ visible });
  await nextTick();
}

function setRect(element: Element, rect: Partial<DOMRect>) {
  vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
    toJSON: () => ({}),
    ...rect,
  });
}

describe('Popup', () => {
  beforeEach(() => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      callback(0);
      return 1;
    });
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      bottom: 10,
      height: 10,
      left: 0,
      right: 10,
      top: 0,
      width: 10,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });
    popperInstances.length = 0;
    createPopperMock.mockImplementation((reference: Element, popper: HTMLElement, options: Record<string, any>) => {
      popper.setAttribute('data-popper-placement', options.placement);
      const instance = {
        state: { elements: { reference, popper } },
        update: vi.fn(),
        destroy: vi.fn(),
      };
      popperInstances.push(instance);
      return instance;
    });
  });

  afterEach(() => {
    wrappers
      .splice(0)
      .reverse()
      .forEach((wrapper) => wrapper.unmount());
    document.body.innerHTML = '';
    vi.useRealTimers();
    vi.restoreAllMocks();
    createPopperMock.mockReset();
  });

  describe('props', () => {
    it(':attach[string]', async () => {
      const target = document.createElement('div');
      target.id = 'popup-container';
      document.body.appendChild(target);
      const wrapper = mountPopup({ attach: '#popup-container', content: contentText, visible: false });

      await setVisible(wrapper);

      expect(target.querySelector('.t-popup__content')?.textContent).toBe(contentText);
    });

    it(':attach[function]', async () => {
      const target = document.createElement('div');
      document.body.appendChild(target);
      const attach = vi.fn(() => target);
      const wrapper = mountPopup({ attach, content: contentText, visible: false });

      await setVisible(wrapper);

      expect(attach).toHaveBeenCalled();
      expect(target.querySelector('.t-popup__content')?.textContent).toBe(contentText);
    });

    it(':content[string]', async () => {
      const wrapper = mountPopup({ content: contentText, visible: false });
      await setVisible(wrapper);

      expect(getPopupContent()?.textContent).toBe(contentText);
      expect(getPopupContent()?.classList.contains('t-popup__content--text')).toBe(true);
    });

    it(':content[function]', async () => {
      const wrapper = mountPopup({
        content: () => <strong class="function-content">function content</strong>,
        visible: false,
      });
      await setVisible(wrapper);

      expect(getPopupContent()?.querySelector('.function-content')?.textContent).toBe('function content');
      expect(getPopupContent()?.classList.contains('t-popup__content--text')).toBe(false);
    });

    it(':content[slot]', async () => {
      const wrapper = mountPopup(
        { visible: false },
        {
          default: () => <button class="trigger">trigger</button>,
          content: () => <em class="slot-content">slot content</em>,
        },
      );
      await setVisible(wrapper);

      expect(getPopupContent()?.querySelector('.slot-content')?.textContent).toBe('slot content');
    });

    it(':default[string]', () => {
      const wrapper = mountPopup({ default: 'text trigger' }, {});
      expect(wrapper.text()).toBe('text trigger');
      expect(wrapper.find('span').exists()).toBe(true);
    });

    it(':default[function]', () => {
      const wrapper = mountPopup({ default: () => <button class="function-trigger">function trigger</button> }, {});
      expect(wrapper.find('.function-trigger').text()).toBe('function trigger');
    });

    it(':default[slot]', () => {
      const wrapper = mountPopup({}, { default: () => <button class="slot-trigger">slot trigger</button> });
      expect(wrapper.find('.slot-trigger').text()).toBe('slot trigger');
    });

    it(':delay[number]', async () => {
      vi.useFakeTimers();
      const wrapper = mountPopup({ content: contentText, delay: 30 });
      await nextTick();

      await wrapper.find('.trigger').trigger('mouseenter');
      await vi.advanceTimersByTimeAsync(29);
      expect(getPopup()).toBeNull();
      await vi.advanceTimersByTimeAsync(1);
      await nextTick();
      expect(getPopup()?.style.display).not.toBe('none');

      await wrapper.find('.trigger').trigger('mouseleave');
      await vi.advanceTimersByTimeAsync(29);
      expect(getPopup()?.style.display).not.toBe('none');
      await vi.advanceTimersByTimeAsync(1);
      await nextTick();
      expect(getPopup()?.style.display).toBe('none');
    });

    it(':delay[array]', async () => {
      vi.useFakeTimers();
      const wrapper = mountPopup({ content: contentText, delay: [20, 40] });
      await nextTick();

      await wrapper.find('.trigger').trigger('mouseenter');
      await vi.advanceTimersByTimeAsync(20);
      await nextTick();
      expect(getPopup()?.style.display).not.toBe('none');

      await wrapper.find('.trigger').trigger('mouseleave');
      await vi.advanceTimersByTimeAsync(39);
      expect(getPopup()?.style.display).not.toBe('none');
      await vi.advanceTimersByTimeAsync(1);
      await nextTick();
      expect(getPopup()?.style.display).toBe('none');
    });

    it(':destroyOnClose[boolean]', async () => {
      const retained = mountPopup({ content: contentText, visible: false });
      await setVisible(retained);
      await setVisible(retained, false);
      expect(getPopup()).not.toBeNull();
      expect(getPopup()?.style.display).toBe('none');
      retained.unmount();
      wrappers.splice(wrappers.indexOf(retained), 1);
      document.body.innerHTML = '';

      const destroyed = mountPopup({ content: contentText, destroyOnClose: true, visible: false });
      await setVisible(destroyed);
      expect(getPopup()).not.toBeNull();
      await setVisible(destroyed, false);
      expect(getPopup()).toBeNull();
    });

    it(':disabled[boolean]', async () => {
      const onVisibleChange = vi.fn();
      const wrapper = mountPopup({
        content: contentText,
        disabled: true,
        trigger: 'click',
        visible: false,
        onVisibleChange,
      });
      await nextTick();

      await wrapper.find('.trigger').trigger('click');
      await sleep(0);
      expect(onVisibleChange).not.toHaveBeenCalled();
      expect(getPopup()).toBeNull();

      await wrapper.setProps({ visible: true });
      await nextTick();
      expect(getPopupContent()?.classList.contains('t-is-disabled')).toBe(true);
    });

    it.each([undefined, '', null])(':hideEmptyPopup[boolean] with content %s', async (content) => {
      const wrapper = mountPopup({ content, hideEmptyPopup: true, visible: false });
      await setVisible(wrapper);

      expect(getPopup()?.style.visibility).toBe('hidden');
    });

    it.each([
      ['string', 'outer-a outer-b'],
      ['object', { 'outer-object': true }],
      ['array', ['outer-array', { 'outer-enabled': true }]],
    ])(':overlayClassName[%s]', async (_, overlayClassName) => {
      const wrapper = mountPopup({ content: contentText, overlayClassName, visible: false });
      await setVisible(wrapper);

      expect(getPopup()?.className).toContain('outer');
    });

    it.each([
      ['string', 'inner-a inner-b'],
      ['object', { 'inner-object': true }],
      ['array', ['inner-array', { 'inner-enabled': true }]],
    ])(':overlayInnerClassName[%s]', async (_, overlayInnerClassName) => {
      const wrapper = mountPopup({ content: contentText, overlayInnerClassName, visible: false });
      await setVisible(wrapper);

      expect(getPopupContent()?.className).toContain('inner');
    });

    it(':overlayInnerStyle[object]', async () => {
      const wrapper = mountPopup({ content: contentText, overlayInnerStyle: { color: 'red' }, visible: false });
      await setVisible(wrapper);

      expect(getPopupContent()?.style.color).toBe('red');
    });

    it(':overlayInnerStyle[function]', async () => {
      const overlayInnerStyle = vi.fn(() => ({ width: '120px' }));
      const wrapper = mountPopup({ content: contentText, overlayInnerStyle, visible: false });
      await setVisible(wrapper);

      expect(overlayInnerStyle).toHaveBeenCalledWith(wrapper.find('.trigger').element, getPopupContent());
      expect(getPopupContent()?.style.width).toBe('120px');
    });

    it(':overlayInnerStyle[boolean]', async () => {
      const wrapper = mountPopup({ content: contentText, overlayInnerStyle: false, visible: false });
      await setVisible(wrapper);
      expect(getPopupContent()?.getAttribute('style')).toBeNull();
    });

    it(':overlayStyle[object]', async () => {
      const wrapper = mountPopup({ content: contentText, overlayStyle: { color: 'blue' }, visible: false });
      await setVisible(wrapper);
      expect(getPopup()?.style.color).toBe('blue');
    });

    it(':overlayStyle[function]', async () => {
      const overlayStyle = vi.fn(() => ({ width: '160px' }));
      const wrapper = mountPopup({ content: contentText, overlayStyle, visible: false });
      await setVisible(wrapper);

      expect(overlayStyle).toHaveBeenCalledWith(wrapper.find('.trigger').element, getPopupContent());
      expect(getPopup()?.style.width).toBe('160px');
    });

    it(':overlayStyle[boolean]', async () => {
      const wrapper = mountPopup({ content: contentText, overlayStyle: false, visible: false });
      await setVisible(wrapper);
      expect(getPopup()?.style.color).toBe('');
    });

    it.each([
      ['top', 'top'],
      ['left', 'left'],
      ['right', 'right'],
      ['bottom', 'bottom'],
      ['top-left', 'top-start'],
      ['top-right', 'top-end'],
      ['bottom-left', 'bottom-start'],
      ['bottom-right', 'bottom-end'],
      ['left-top', 'left-start'],
      ['left-bottom', 'left-end'],
      ['right-top', 'right-start'],
      ['right-bottom', 'right-end'],
    ])(':placement[%s]', async (placement, expected) => {
      const wrapper = mountPopup({ content: contentText, placement, visible: false });
      await setVisible(wrapper);

      if (createPopperMock.mock.calls.length) {
        expect(createPopperMock).toHaveBeenLastCalledWith(
          wrapper.find('.trigger').element,
          getPopup(),
          expect.objectContaining({ placement: expected }),
        );
        expect(getPopup()?.dataset.popperPlacement).toBe(expected);
      } else {
        expect(getExposed(wrapper).getPopper().state.options.placement).toBe(expected);
      }
    });

    it(':popperOptions[object]', async () => {
      const modifiers = [{ name: 'flip', enabled: false }];
      const wrapper = mountPopup({
        content: contentText,
        popperOptions: { placement: 'bottom', strategy: 'fixed', modifiers },
        visible: false,
      });
      await setVisible(wrapper);

      if (createPopperMock.mock.calls.length) {
        expect(createPopperMock).toHaveBeenLastCalledWith(
          wrapper.find('.trigger').element,
          getPopup(),
          expect.objectContaining({ placement: 'bottom', strategy: 'fixed', modifiers }),
        );
      } else {
        expect(getExposed(wrapper).getPopper().state.options).toEqual(
          expect.objectContaining({ placement: 'bottom', strategy: 'fixed', modifiers }),
        );
      }
    });

    it(':showArrow[boolean] calculates horizontal arrow position', async () => {
      const wrapper = mountPopup({ content: contentText, placement: 'top', showArrow: true, visible: false });
      await setVisible(wrapper);
      const trigger = wrapper.find('.trigger').element;
      const popup = getPopup();
      setRect(trigger, { left: 20, width: 20 });
      setRect(popup, { left: 0, width: 100 });
      Object.defineProperty(popup, 'offsetWidth', { configurable: true, value: 100 });

      getExposed(wrapper).update();
      await nextTick();

      const arrow = popup.querySelector<HTMLElement>('.t-popup__arrow');
      expect(arrow?.style.left).toBe('26px');
      expect(arrow?.style.marginLeft).toBe('0px');
    });

    it(':showArrow[boolean] calculates vertical arrow position', async () => {
      const wrapper = mountPopup({ content: contentText, placement: 'left', showArrow: true, visible: false });
      await setVisible(wrapper);
      const trigger = wrapper.find('.trigger').element;
      const popup = getPopup();
      setRect(trigger, { height: 20, top: 20 });
      setRect(popup, { height: 100, top: 0 });
      Object.defineProperty(popup, 'offsetHeight', { configurable: true, value: 100 });

      getExposed(wrapper).update();
      await nextTick();

      const arrow = popup.querySelector<HTMLElement>('.t-popup__arrow');
      expect(arrow?.style.top).toBe('26px');
      expect(arrow?.style.marginTop).toBe('0px');
    });

    it(':showArrow[boolean] keeps the default position when the trigger is out of range', async () => {
      const wrapper = mountPopup({ content: contentText, placement: 'top', showArrow: true, visible: false });
      await setVisible(wrapper);
      const trigger = wrapper.find('.trigger').element;
      const popup = getPopup();
      setRect(trigger, { left: 200, width: 20 });
      setRect(popup, { left: 0, width: 100 });
      Object.defineProperty(popup, 'offsetWidth', { configurable: true, value: 100 });

      getExposed(wrapper).update();
      await nextTick();
      expect(popup.querySelector<HTMLElement>('.t-popup__arrow')?.style.left).toBe('');
    });

    it(':showArrow[boolean] keeps the default vertical position when the trigger is out of range', async () => {
      const wrapper = mountPopup({ content: contentText, placement: 'left', showArrow: true, visible: false });
      await setVisible(wrapper);
      const trigger = wrapper.find('.trigger').element;
      const popup = getPopup();
      setRect(trigger, { height: 20, top: 200 });
      setRect(popup, { height: 100, top: 0 });
      Object.defineProperties(popup, {
        clientHeight: { configurable: true, value: 100 },
        offsetHeight: { configurable: true, value: undefined },
      });

      getExposed(wrapper).update();
      await nextTick();
      expect(popup.querySelector<HTMLElement>('.t-popup__arrow')?.style.top).toBe('');
    });

    it.skipIf(process.env.TEST_TARGET === 'snap')(
      ':showArrow[boolean] tolerates a missing string trigger element',
      async () => {
        createPopperMock.mockReturnValue(undefined);
        const wrapper = mountPopup(
          {
            content: contentText,
            showArrow: true,
            triggerElement: '#missing-trigger',
            visible: false,
          },
          {},
        );

        await setVisible(wrapper);

        expect(getPopup()?.querySelector('.t-popup__arrow')).not.toBeNull();
        expect(getPopup()?.querySelector<HTMLElement>('.t-popup__arrow')?.getAttribute('style')).toBeNull();
      },
    );

    it(':trigger[hover]', async () => {
      vi.useFakeTimers();
      const onVisibleChange = vi.fn();
      const wrapper = mountPopup({ content: contentText, delay: 0, onVisibleChange });
      await nextTick();

      await wrapper.find('.trigger').trigger('mouseenter');
      await vi.runOnlyPendingTimersAsync();
      expect(onVisibleChange).toHaveBeenLastCalledWith(true, { trigger: 'trigger-element-hover' });

      await wrapper.find('.trigger').trigger('mouseleave');
      await vi.runOnlyPendingTimersAsync();
      expect(onVisibleChange).toHaveBeenLastCalledWith(
        false,
        expect.objectContaining({ trigger: 'trigger-element-hover' }),
      );
    });

    it(':trigger[click]', async () => {
      const onVisibleChange = vi.fn();
      const wrapper = mountPopup({ content: contentText, trigger: 'click', onVisibleChange });
      await nextTick();

      await wrapper.find('.trigger').trigger('click');
      await sleep(0);
      expect(onVisibleChange).toHaveBeenLastCalledWith(true, { trigger: 'trigger-element-click' });

      await wrapper.find('.trigger').trigger('click');
      await sleep(0);
      expect(onVisibleChange).toHaveBeenLastCalledWith(
        false,
        expect.objectContaining({ trigger: 'trigger-element-click' }),
      );
    });

    it(':trigger[focus]', async () => {
      const onVisibleChange = vi.fn();
      const wrapper = mountPopup({ content: contentText, trigger: 'focus', onVisibleChange });
      await nextTick();

      await wrapper.find('.trigger').trigger('focusin');
      await sleep(0);
      expect(onVisibleChange).toHaveBeenLastCalledWith(true, { trigger: 'trigger-element-focus' });

      await wrapper.find('.trigger').trigger('focusout');
      await sleep(0);
      expect(onVisibleChange).toHaveBeenLastCalledWith(
        false,
        expect.objectContaining({ trigger: 'trigger-element-blur' }),
      );
    });

    it(':trigger[context-menu] toggles on the contextmenu event', async () => {
      const onVisibleChange = vi.fn();
      const wrapper = mountPopup({ content: contentText, trigger: 'context-menu', onVisibleChange });
      await nextTick();
      const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
      const preventDefault = vi.spyOn(event, 'preventDefault');

      wrapper.find('.trigger').element.dispatchEvent(event);
      await sleep(0);

      expect(preventDefault).toHaveBeenCalled();
      // Current behavior: getTriggerType checks `context-menu`, while the native event type is `contextmenu`.
      expect(onVisibleChange).toHaveBeenLastCalledWith(true, { trigger: 'trigger-element-close' });
    });

    it(":trigger[context-menu] maps the source code's hyphenated event name to keydown-esc", async () => {
      vi.useFakeTimers();
      const addEventListener = vi.spyOn(HTMLElement.prototype, 'addEventListener');
      const onVisibleChange = vi.fn();
      const wrapper = mountPopup({ content: contentText, trigger: 'context-menu', onVisibleChange });
      await nextTick();
      const contextMenuCalls = addEventListener.mock.calls.filter(([type]) => type === 'contextmenu');
      const contextMenuCall = contextMenuCalls[contextMenuCalls.length - 1];
      const listener = contextMenuCall?.[1] as EventListener;
      const event = new MouseEvent('context-menu', { cancelable: true });

      listener.call(wrapper.find('.trigger').element, event);
      await vi.runOnlyPendingTimersAsync();

      expect(onVisibleChange).toHaveBeenLastCalledWith(true, { trigger: 'keydown-esc' });
    });

    it(':trigger[mousedown] currently does not register a mousedown listener', async () => {
      const onVisibleChange = vi.fn();
      const wrapper = mountPopup({ content: contentText, trigger: 'mousedown', onVisibleChange });
      await nextTick();

      await wrapper.find('.trigger').trigger('mousedown');
      await sleep(0);

      // Current behavior: `mousedown` is accepted by props but is absent from the event-name map.
      expect(onVisibleChange).not.toHaveBeenCalled();
      expect(getPopup()).toBeNull();
    });

    it(':triggerElement[string]', async () => {
      const trigger = document.createElement('button');
      trigger.id = 'external-trigger';
      document.body.appendChild(trigger);
      const onVisibleChange = vi.fn();
      mountPopup({ content: contentText, trigger: 'click', triggerElement: '#external-trigger', onVisibleChange }, {});
      await nextTick();

      trigger.click();
      await sleep(0);
      expect(onVisibleChange).toHaveBeenLastCalledWith(true, { trigger: 'trigger-element-click' });
    });

    it(':triggerElement[function]', () => {
      const wrapper = mountPopup(
        { triggerElement: () => <button class="function-element">function element</button> },
        {},
      );
      expect(wrapper.find('.function-element').text()).toBe('function element');
    });

    it(':triggerElement[slot]', () => {
      const wrapper = mountPopup({}, { default: () => <button class="slot-element">slot element</button> });
      expect(wrapper.find('.slot-element').text()).toBe('slot element');
    });

    it(':visible[boolean]', async () => {
      const wrapper = mountPopup({ content: contentText, visible: false });
      expect(getPopup()).toBeNull();

      await setVisible(wrapper);
      expect(getPopup()?.style.display).not.toBe('none');

      await setVisible(wrapper, false);
      expect(getPopup()?.style.display).toBe('none');
    });

    it(':defaultVisible[boolean]', async () => {
      mountPopup({ content: contentText, defaultVisible: true });
      await nextTick();
      expect(getPopup()?.style.display).not.toBe('none');
    });

    it(':modelValue[boolean]', async () => {
      const wrapper = mountPopup({ content: contentText, modelValue: false });
      expect(getPopup()).toBeNull();

      await wrapper.setProps({ modelValue: true });
      await nextTick();
      expect(getPopup()?.style.display).not.toBe('none');
    });

    it(':zIndex[number]', async () => {
      const wrapper = mountPopup({ content: contentText, visible: false, zIndex: 6000 });
      await setVisible(wrapper);
      expect(getPopup()?.style.zIndex).toBe('6000');
    });
  });

  describe('events', () => {
    it('onOverlayClick', async () => {
      const onOverlayClick = vi.fn();
      const wrapper = mountPopup({ content: contentText, onOverlayClick, visible: false });
      await setVisible(wrapper);

      const event = new MouseEvent('click', { bubbles: true });
      getPopup().dispatchEvent(event);
      expect(onOverlayClick).toHaveBeenCalledWith({ e: event });
    });

    it('onScroll', async () => {
      const onScroll = vi.fn();
      const wrapper = mountPopup({ content: contentText, onScroll, visible: false });
      await setVisible(wrapper);
      const event = new WheelEvent('scroll', { bubbles: true });

      getPopupContent().dispatchEvent(event);
      expect(onScroll).toHaveBeenCalledWith({ e: event });
    });

    it('onScrollToBottom', async () => {
      vi.useFakeTimers();
      const onScrollToBottom = vi.fn();
      const wrapper = mountPopup({ content: contentText, onScrollToBottom, visible: false });
      await setVisible(wrapper);
      const content = getPopupContent();
      Object.defineProperties(content, {
        clientHeight: { configurable: true, value: 100 },
        scrollHeight: { configurable: true, value: 300 },
        scrollTop: { configurable: true, value: 100, writable: true },
      });

      content.dispatchEvent(new WheelEvent('scroll', { bubbles: true }));
      await vi.advanceTimersByTimeAsync(100);
      expect(onScrollToBottom).not.toHaveBeenCalled();

      content.scrollTop = 199.5;
      const event = new WheelEvent('scroll', { bubbles: true });
      content.dispatchEvent(event);
      await vi.advanceTimersByTimeAsync(100);
      expect(onScrollToBottom).toHaveBeenCalledWith({ e: event });
    });

    it('onVisibleChange + update:modelValue', async () => {
      const onVisibleChange = vi.fn();
      const wrapper = mountPopup({
        content: contentText,
        modelValue: false,
        trigger: 'click',
        onVisibleChange,
      });
      await nextTick();

      await wrapper.find('.trigger').trigger('click');
      await sleep(0);

      expect(onVisibleChange).toHaveBeenCalledWith(true, { trigger: 'trigger-element-click' });
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
    });

    it('update:visible', async () => {
      const wrapper = mountPopup({ content: contentText, visible: false, trigger: 'click' });
      await nextTick();

      await wrapper.find('.trigger').trigger('click');
      await sleep(0);

      expect(wrapper.emitted('update:visible')?.[0]).toEqual([true]);
    });

    it('closes on a document mousedown', async () => {
      const onVisibleChange = vi.fn();
      mountPopup({ content: contentText, defaultVisible: true, trigger: 'click', onVisibleChange });
      await nextTick();
      const event = new MouseEvent('mousedown', { bubbles: true });

      document.body.dispatchEvent(event);
      await sleep(0);

      expect(onVisibleChange).toHaveBeenLastCalledWith(false, { e: event, trigger: 'document' });
    });

    it('does not close on a mousedown inside the trigger or popup', async () => {
      const onVisibleChange = vi.fn();
      const wrapper = mountPopup({ content: contentText, defaultVisible: true, trigger: 'click', onVisibleChange });
      await nextTick();

      wrapper.find('.trigger').element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      getPopupContent().dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      await sleep(0);

      expect(onVisibleChange).not.toHaveBeenCalled();
    });

    it('keeps parent popups open for interactions inside a nested popup', async () => {
      vi.useFakeTimers();
      const onParentVisibleChange = vi.fn();
      const onChildVisibleChange = vi.fn();
      mountPopup({
        content: () => (
          <Popup content="nested content" defaultVisible delay={0} onVisibleChange={onChildVisibleChange}>
            <button class="nested-trigger">nested trigger</button>
          </Popup>
        ),
        defaultVisible: true,
        delay: 0,
        onVisibleChange: onParentVisibleChange,
      });
      await nextTick();
      const popups = [...document.querySelectorAll<HTMLElement>('.t-popup')];
      const childPopup = popups.find((popup) => popup.hasAttribute('data-td-popup-parent'));
      const parentPopup = popups.find((popup) => !popup.hasAttribute('data-td-popup-parent'));
      expect(childPopup).toBeDefined();
      expect(parentPopup).toBeDefined();

      setRect(childPopup, { height: 10, width: 10, x: 0, y: 0 });
      const mouseleave = new MouseEvent('mouseleave');
      Object.defineProperties(mouseleave, {
        x: { value: 5 },
        y: { value: 5 },
      });
      parentPopup.dispatchEvent(mouseleave);
      await vi.runOnlyPendingTimersAsync();
      expect(onParentVisibleChange).not.toHaveBeenCalled();

      childPopup.querySelector('.t-popup__content').dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      await vi.runOnlyPendingTimersAsync();

      expect(onChildVisibleChange).not.toHaveBeenCalled();
      expect(onParentVisibleChange).not.toHaveBeenCalled();
    });

    it('propagates a mouseleave from a nested hover popup to its parent', async () => {
      vi.useFakeTimers();
      const onParentVisibleChange = vi.fn();
      const onChildVisibleChange = vi.fn();
      mountPopup({
        content: () => (
          <Popup content="nested content" defaultVisible delay={0} onVisibleChange={onChildVisibleChange}>
            <button>nested trigger</button>
          </Popup>
        ),
        defaultVisible: true,
        delay: 0,
        onVisibleChange: onParentVisibleChange,
      });
      await nextTick();
      const childPopup = [...document.querySelectorAll<HTMLElement>('.t-popup')].find((popup) =>
        popup.hasAttribute('data-td-popup-parent'),
      );
      setRect(childPopup, { height: 10, width: 10, x: 0, y: 0 });

      childPopup.dispatchEvent(new MouseEvent('mouseleave', { clientX: 50, clientY: 50 }));
      await vi.runOnlyPendingTimersAsync();

      expect(onChildVisibleChange).toHaveBeenLastCalledWith(
        false,
        expect.objectContaining({ trigger: 'trigger-element-hover' }),
      );
      expect(onParentVisibleChange).toHaveBeenLastCalledWith(
        false,
        expect.objectContaining({ trigger: 'trigger-element-hover' }),
      );
    });

    it.each([
      ['key', { key: 'Escape' }],
      ['code', { key: 'Enter', code: 'Escape' }],
      ['keyCode', { key: 'Enter', code: 'Enter', keyCode: 27 }],
    ])('closes a focus popup with Escape detected by %s', async (_, keyboardInit) => {
      const onVisibleChange = vi.fn();
      const wrapper = mountPopup({ content: contentText, trigger: 'focus', onVisibleChange });
      await nextTick();

      await wrapper.find('.trigger').trigger('focusin');
      await sleep(0);
      onVisibleChange.mockClear();

      wrapper.find('.trigger').element.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, ...keyboardInit }));
      await sleep(0);

      expect(onVisibleChange).toHaveBeenLastCalledWith(false, expect.objectContaining({ trigger: 'keydown-esc' }));
    });

    it('a non-Escape key currently consumes the focus escape listener', async () => {
      const onVisibleChange = vi.fn();
      const wrapper = mountPopup({ content: contentText, trigger: 'focus', onVisibleChange });
      await nextTick();

      await wrapper.find('.trigger').trigger('focusin');
      await sleep(0);
      onVisibleChange.mockClear();

      await wrapper.find('.trigger').trigger('keydown', { key: 'Enter' });
      await wrapper.find('.trigger').trigger('keydown', { key: 'Escape' });
      await sleep(0);

      // Current behavior: the listener is registered with `once`, so Enter removes it before Escape.
      expect(onVisibleChange).not.toHaveBeenCalled();
    });
  });

  describe('instanceFunctions', () => {
    it('getOverlay()', async () => {
      const wrapper = mountPopup({ content: contentText, destroyOnClose: true, visible: false });
      expect(getExposed(wrapper).getOverlay()).toBeUndefined();

      await setVisible(wrapper);
      expect(getExposed(wrapper).getOverlay()).toBe(getPopupContent());
    });

    it('getOverlayState()', async () => {
      const wrapper = mountPopup({ content: contentText, visible: false });
      await setVisible(wrapper);
      expect(getExposed(wrapper).getOverlayState()).toEqual({ hover: false });

      getPopup().dispatchEvent(new MouseEvent('mouseenter'));
      expect(getExposed(wrapper).getOverlayState()).toEqual({ hover: true });
      getPopup().dispatchEvent(new MouseEvent('mouseleave'));
      expect(getExposed(wrapper).getOverlayState()).toEqual({ hover: false });
    });

    it('getPopper()', async () => {
      const wrapper = mountPopup({ content: contentText, visible: false });
      expect(getExposed(wrapper).getPopper()).toBeUndefined();

      await setVisible(wrapper);
      expect(getExposed(wrapper).getPopper()).toBeDefined();
      if (popperInstances.length) {
        expect(getExposed(wrapper).getPopper()).toBe(popperInstances[0]);
      }
    });

    it('update()', async () => {
      const wrapper = mountPopup({ content: contentText, visible: false });
      await setVisible(wrapper);
      const trigger = wrapper.find('.trigger').element;
      setRect(trigger, { height: 20, width: 20 });
      const popper = getExposed(wrapper).getPopper();
      const update = vi.spyOn(popper, 'update');

      getExposed(wrapper).update();

      expect(update).toHaveBeenCalled();
      expect(popper.state.elements.reference).toBe(trigger);
    });

    it('update() updates a trigger inside a shadow root', async () => {
      const host = document.createElement('div');
      document.body.appendChild(host);
      const shadowRoot = host.attachShadow({ mode: 'open' });
      const wrapper = mount(Popup, {
        attachTo: shadowRoot as unknown as Element,
        props: { content: contentText, visible: false },
        slots: { default: () => <button class="shadow-trigger">trigger</button> },
      }) as PopupWrapper;
      wrappers.push(wrapper);
      await setVisible(wrapper);
      const popper = getExposed(wrapper).getPopper();
      const update = vi.spyOn(popper, 'update');

      getExposed(wrapper).update();

      expect(update).toHaveBeenCalled();
      expect(popper.state.elements.reference.getRootNode()).toBe(shadowRoot);
    });

    it('update() closes when the trigger element is detached', async () => {
      const wrapper = mountPopup({ content: contentText, visible: false });
      await setVisible(wrapper);
      wrapper.find('.trigger').element.remove();

      getExposed(wrapper).update();

      expect(wrapper.emitted('update:visible')?.at(-1)).toEqual([false]);
    });

    it('close()', async () => {
      vi.useFakeTimers();
      const onVisibleChange = vi.fn();
      const wrapper = mountPopup({ content: contentText, defaultVisible: true, onVisibleChange });
      await nextTick();

      getExposed(wrapper).close();
      await vi.runOnlyPendingTimersAsync();

      expect(onVisibleChange).toHaveBeenCalledWith(
        false,
        expect.objectContaining({ trigger: 'trigger-element-close' }),
      );
    });
  });

  describe('lifecycle', () => {
    it('destroys popper and removes the document listener on unmount', async () => {
      const removeEventListener = vi.spyOn(document, 'removeEventListener');
      const wrapper = mountPopup({ content: contentText, visible: false });
      await setVisible(wrapper);
      const popper = getExposed(wrapper).getPopper();
      const destroy = vi.spyOn(popper, 'destroy');

      wrapper.unmount();
      wrappers.splice(wrappers.indexOf(wrapper), 1);

      expect(destroy).toHaveBeenCalled();
      expect(removeEventListener).toHaveBeenCalledWith('mousedown', expect.any(Function), true);
    });

    it('clears delayed visibility changes on unmount', async () => {
      vi.useFakeTimers();
      const onVisibleChange = vi.fn();
      const wrapper = mountPopup({ content: contentText, delay: 100, onVisibleChange });
      await wrapper.find('.trigger').trigger('mouseenter');

      wrapper.unmount();
      wrappers.splice(wrappers.indexOf(wrapper), 1);
      await vi.runAllTimersAsync();

      expect(onVisibleChange).not.toHaveBeenCalled();
    });

    it('updates an existing popper when placement changes', async () => {
      const wrapper = mountPopup({ content: contentText, placement: 'top', visible: false });
      await setVisible(wrapper);
      const firstPopper = getExposed(wrapper).getPopper();
      const destroy = vi.spyOn(firstPopper, 'destroy');

      await wrapper.setProps({ placement: 'bottom' });
      await nextTick();

      expect(destroy).toHaveBeenCalled();
      if (createPopperMock.mock.calls.length) {
        expect(createPopperMock).toHaveBeenCalledTimes(2);
      } else {
        expect(getExposed(wrapper).getPopper()).not.toBe(firstPopper);
      }
    });

    it('handles the popper onFirstUpdate callback', async () => {
      const wrapper = mountPopup({ content: contentText, visible: false });
      await setVisible(wrapper);
      const popper = getExposed(wrapper).getPopper();
      const update = vi.spyOn(popper, 'update');
      const options = createPopperMock.mock.calls.length
        ? (createPopperMock.mock.calls[0][2] as { onFirstUpdate: () => void })
        : popper.state.options;

      options.onFirstUpdate();
      await nextTick();

      expect(update).toHaveBeenCalled();
    });

    it('updates a visible popup when its container emits resize', async () => {
      const wrapper = mountPopup({ content: contentText, expandAnimation: true, visible: false });
      await setVisible(wrapper);
      const popper = getExposed(wrapper).getPopper();
      const update = vi.spyOn(popper, 'update');
      update.mockClear();

      wrapper.findComponent({ name: 'TPopupContainer' }).vm.$emit('resize');
      await nextTick();

      expect(update).toHaveBeenCalled();
      expect(getPopup()).not.toBeNull();
    });

    it('calls an injected updateScrollTop when the overlay opens', async () => {
      const updateScrollTop = vi.fn();
      const wrapper = mount(Popup, {
        attachTo: document.body,
        global: { provide: { updateScrollTop } },
        props: { content: contentText, visible: false },
        slots: { default: () => <button class="trigger">trigger</button> },
      }) as PopupWrapper;
      wrappers.push(wrapper);

      await setVisible(wrapper);
      expect(updateScrollTop).toHaveBeenCalledWith(getPopupContent());
    });

    it('rebinds listeners when trigger and triggerElement change', async () => {
      const triggerA = document.createElement('button');
      triggerA.id = 'trigger-a';
      const triggerB = document.createElement('button');
      triggerB.id = 'trigger-b';
      document.body.append(triggerA, triggerB);
      const onVisibleChange = vi.fn();
      const wrapper = mountPopup(
        { content: contentText, trigger: 'click', triggerElement: '#trigger-a', onVisibleChange },
        {},
      );
      await nextTick();

      await wrapper.setProps({ trigger: 'focus', triggerElement: '#trigger-b' });
      await sleep(0);
      triggerA.click();
      triggerB.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      await sleep(0);

      expect(onVisibleChange).toHaveBeenCalledTimes(1);
      expect(onVisibleChange).toHaveBeenCalledWith(true, { trigger: 'trigger-element-focus' });
    });

    it('external trigger listeners currently remain active after unmount', async () => {
      vi.useFakeTimers();
      const trigger = document.createElement('button');
      trigger.id = 'persistent-trigger';
      document.body.appendChild(trigger);
      const onVisibleChange = vi.fn();
      const wrapper = mountPopup(
        { content: contentText, trigger: 'click', triggerElement: '#persistent-trigger', onVisibleChange },
        {},
      );
      await nextTick();

      wrapper.unmount();
      wrappers.splice(wrappers.indexOf(wrapper), 1);
      trigger.click();
      await vi.runAllTimersAsync();

      // Current behavior: component teardown does not call trigger.clean() for an external triggerElement.
      expect(onVisibleChange).toHaveBeenCalledWith(true, { trigger: 'trigger-element-click' });
    });
  });

  describe('props validators', () => {
    it(':trigger[string]', () => {
      const validator = popupProps.trigger.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator('click')).toBe(true);
      expect(validator('mousedown')).toBe(true);
      expect(validator('invalid' as never)).toBe(false);
    });
  });
});
