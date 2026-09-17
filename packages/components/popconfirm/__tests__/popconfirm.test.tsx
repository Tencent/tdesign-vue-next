import { defineComponent, nextTick, onUnmounted } from 'vue';
import type { PropType, Slot, VNodeChild } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { vi } from 'vitest';
import Popconfirm from '@tdesign/components/popconfirm';
import type { TdPopconfirmProps } from '@tdesign/components/popconfirm/type';
import popconfirmProps from '@tdesign/components/popconfirm/props';

type PopconfirmTestProps = TdPopconfirmProps & { modelValue?: boolean };
type PopconfirmSlots = Record<string, Slot | (() => VNodeChild)>;

const onPopupUnmounted = vi.fn();

const PopupStub = defineComponent({
  name: 'TPopup',
  inheritAttrs: false,
  props: {
    visible: Boolean,
    showArrow: Boolean,
    overlayClassName: [String, Array, Object] as PropType<unknown>,
    trigger: [String, Array] as PropType<unknown>,
    destroyOnClose: Boolean,
    placement: String,
    attach: [String, Function] as PropType<unknown>,
    disabled: Boolean,
    zIndex: Number,
  },
  emits: ['visible-change'],
  setup(props, { emit, slots }) {
    onUnmounted(onPopupUnmounted);
    return () => (
      <section class="popup-stub">
        <div class="popup-trigger">{slots.default?.()}</div>
        <button
          class="popup-visible-change"
          onClick={(e) => emit('visible-change', !props.visible, { e, trigger: 'trigger-element-click' })}
        >
          toggle
        </button>
        <div class="popup-content">{slots.content?.()}</div>
      </section>
    );
  },
});

describe('Popconfirm', () => {
  const wrappers: VueWrapper[] = [];

  const mountPopconfirm = (props: PopconfirmTestProps = {}, slots: PopconfirmSlots = {}) => {
    const wrapper = mount(Popconfirm, {
      props: props as unknown as InstanceType<typeof Popconfirm>['$props'],
      slots,
      global: {
        stubs: {
          TPopup: PopupStub,
        },
      },
    });
    wrappers.push(wrapper);
    return wrapper;
  };

  const getPopup = (wrapper: VueWrapper) => wrapper.findComponent(PopupStub);

  afterEach(() => {
    wrappers.splice(0).forEach((wrapper) => wrapper.unmount());
    document.body.innerHTML = '';
    vi.restoreAllMocks();
    onPopupUnmounted.mockClear();
  });

  describe('props', () => {
    it('renders with default props', () => {
      const wrapper = mountPopconfirm();
      const popup = getPopup(wrapper);

      expect(wrapper.findComponent(Popconfirm).exists()).toBe(true);
      expect(popup.props()).toMatchObject({
        visible: false,
        showArrow: true,
        overlayClassName: 't-popconfirm',
        trigger: 'click',
        destroyOnClose: true,
        placement: 'top',
      });
      expect(wrapper.find('.t-popconfirm__cancel').text()).toBe('取消');
      expect(wrapper.find('.t-popconfirm__confirm').text()).toBe('确定');
    });

    it(':cancelBtn[string]', () => {
      const wrapper = mountPopconfirm({ cancelBtn: 'Not now' });
      const button = wrapper.find('.t-popconfirm__cancel');

      expect(button.text()).toBe('Not now');
      expect(button.classes()).toContain('t-size-s');
    });

    it(':cancelBtn[object]', () => {
      const wrapper = mountPopconfirm({
        cancelBtn: { content: 'Object cancel', disabled: true, variant: 'outline' },
      });
      const button = wrapper.find('.t-popconfirm__cancel');

      expect(button.text()).toBe('Object cancel');
      expect(button.attributes('disabled')).toBeDefined();
      expect(button.classes()).toContain('t-button--variant-outline');
    });

    it(':cancelBtn[function]', () => {
      const wrapper = mountPopconfirm({ cancelBtn: () => <span class="cancel-function">Function cancel</span> });

      expect(wrapper.find('.cancel-function').text()).toBe('Function cancel');
      expect(wrapper.find('.t-popconfirm__cancel').exists()).toBe(false);
    });

    it(':cancelBtn[slot]', () => {
      const wrapper = mountPopconfirm({}, { cancelBtn: () => <span class="cancel-slot">Slot cancel</span> });

      expect(wrapper.find('.cancel-slot').text()).toBe('Slot cancel');
      expect(wrapper.find('.t-popconfirm__cancel').exists()).toBe(false);
    });

    it(':cancelBtn[null]', () => {
      const wrapper = mountPopconfirm({ cancelBtn: null });

      expect(wrapper.find('.t-popconfirm__cancel').exists()).toBe(false);
      expect(wrapper.find('.t-popconfirm__confirm').exists()).toBe(true);
    });

    it(':confirmBtn[string]', () => {
      const wrapper = mountPopconfirm({ confirmBtn: 'Continue' });
      const button = wrapper.find('.t-popconfirm__confirm');

      expect(button.text()).toBe('Continue');
      expect(button.classes()).toContain('t-size-s');
    });

    it(':confirmBtn[object]', () => {
      const wrapper = mountPopconfirm({
        confirmBtn: { content: 'Object confirm', disabled: true, variant: 'outline' },
      });
      const button = wrapper.find('.t-popconfirm__confirm');

      expect(button.text()).toBe('Object confirm');
      expect(button.attributes('disabled')).toBeDefined();
      expect(button.classes()).toContain('t-button--variant-outline');
    });

    it(':confirmBtn[function]', () => {
      const wrapper = mountPopconfirm({ confirmBtn: () => <span class="confirm-function">Function confirm</span> });

      expect(wrapper.find('.confirm-function').text()).toBe('Function confirm');
      expect(wrapper.find('.t-popconfirm__confirm').exists()).toBe(false);
    });

    it(':confirmBtn[slot]', () => {
      const wrapper = mountPopconfirm({}, { confirmBtn: () => <span class="confirm-slot">Slot confirm</span> });

      expect(wrapper.find('.confirm-slot').text()).toBe('Slot confirm');
      expect(wrapper.find('.t-popconfirm__confirm').exists()).toBe(false);
    });

    it(':confirmBtn[null]', () => {
      const wrapper = mountPopconfirm({ confirmBtn: null });

      expect(wrapper.find('.t-popconfirm__confirm').exists()).toBe(false);
      expect(wrapper.find('.t-popconfirm__cancel').exists()).toBe(true);
    });

    it(':cancelBtn[null] + :confirmBtn[null]', () => {
      const wrapper = mountPopconfirm({ cancelBtn: null, confirmBtn: null });

      expect(wrapper.find('.t-popconfirm__buttons').exists()).toBe(false);
    });

    it(':content[string]', () => {
      const wrapper = mountPopconfirm({ content: 'String content' });

      expect(wrapper.find('.t-popconfirm__inner').text()).toBe('String content');
    });

    it(':content[function]', () => {
      const wrapper = mountPopconfirm({ content: () => <strong class="content-function">Function content</strong> });

      expect(wrapper.find('.content-function').text()).toBe('Function content');
    });

    it(':content[slot]', () => {
      const wrapper = mountPopconfirm({}, { content: () => <strong class="content-slot">Slot content</strong> });

      expect(wrapper.find('.content-slot').text()).toBe('Slot content');
    });

    it(':default[string]', () => {
      const wrapper = mountPopconfirm({ default: 'String trigger' });

      expect(wrapper.find('.popup-trigger').text()).toBe('String trigger');
    });

    it(':default[function]', () => {
      const wrapper = mountPopconfirm({ default: () => <span class="default-function">Function trigger</span> });

      expect(wrapper.find('.default-function').text()).toBe('Function trigger');
    });

    it(':default[slot]', () => {
      const wrapper = mountPopconfirm({}, { default: () => <span class="default-slot">Slot trigger</span> });

      expect(wrapper.find('.default-slot').text()).toBe('Slot trigger');
    });

    it(':destroyOnClose[boolean]', async () => {
      const wrapper = mountPopconfirm();
      const popup = getPopup(wrapper);

      expect(popup.props('destroyOnClose')).toBe(true);
      await wrapper.setProps({ destroyOnClose: false });
      expect(popup.props('destroyOnClose')).toBe(false);
    });

    it(':icon[function]', () => {
      const wrapper = mountPopconfirm({ icon: () => <span class="icon-function">!</span> });

      expect(wrapper.find('.icon-function').text()).toBe('!');
      expect(wrapper.find('.t-popconfirm__icon--default').exists()).toBe(false);
    });

    it(':icon[slot]', () => {
      const wrapper = mountPopconfirm({}, { icon: () => <span class="icon-slot">?</span> });

      expect(wrapper.find('.icon-slot').text()).toBe('?');
      expect(wrapper.find('.t-popconfirm__icon--default').exists()).toBe(false);
    });

    it(':placement[string]', async () => {
      const values: TdPopconfirmProps['placement'][] = [
        'top',
        'left',
        'right',
        'bottom',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
        'left-top',
        'left-bottom',
        'right-top',
        'right-bottom',
      ];
      const validator = popconfirmProps.placement.validator;
      const wrapper = mountPopconfirm();
      const popup = getPopup(wrapper);

      for (const placement of values) {
        expect(validator(placement)).toBe(true);
        await wrapper.setProps({ placement });
        expect(popup.props('placement')).toBe(placement);
      }
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      // @ts-expect-error validate invalid runtime input
      expect(validator('center')).toBe(false);
    });

    it(':popupProps[object]', () => {
      const wrapper = mountPopconfirm({
        popupProps: {
          attach: '#popup-container',
          disabled: true,
          zIndex: 6000,
          trigger: 'hover',
          placement: 'bottom-right',
          showArrow: false,
          destroyOnClose: false,
          overlayClassName: 'popup-props-class',
        },
      });

      expect(getPopup(wrapper).props()).toMatchObject({
        attach: '#popup-container',
        disabled: true,
        zIndex: 6000,
        trigger: 'hover',
        placement: 'bottom-right',
        showArrow: false,
        destroyOnClose: false,
        overlayClassName: 'popup-props-class',
      });
    });

    it(':showArrow[boolean]', async () => {
      const wrapper = mountPopconfirm();
      const popup = getPopup(wrapper);

      expect(popup.props('showArrow')).toBe(true);
      await wrapper.setProps({ showArrow: false });
      expect(popup.props('showArrow')).toBe(false);
    });

    it(':theme[string]', async () => {
      const validator = popconfirmProps.theme.validator;
      const wrapper = mountPopconfirm();

      expect(wrapper.find('.t-popconfirm__icon--default').exists()).toBe(true);
      expect(wrapper.find('.t-popconfirm__confirm').classes()).toContain('t-button--theme-primary');

      await wrapper.setProps({ theme: 'warning' });
      expect(wrapper.find('.t-popconfirm__icon--warning').exists()).toBe(true);

      await wrapper.setProps({ theme: 'danger' });
      expect(wrapper.find('.t-popconfirm__icon--danger').exists()).toBe(true);

      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('default')).toBe(true);
      expect(validator('warning')).toBe(true);
      expect(validator('danger')).toBe(true);
      // @ts-expect-error validate invalid runtime input
      expect(validator('success')).toBe(false);
    });

    it(':theme accepts an empty string but cannot render the default icon', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      // @ts-expect-error verify the runtime validator's current falsy-value behavior
      expect(popconfirmProps.theme.validator('')).toBe(true);

      const wrapper = mountPopconfirm({ theme: '' as TdPopconfirmProps['theme'] });

      expect(wrapper.find('.t-popconfirm__body svg').exists()).toBe(false);
      expect(warn.mock.calls[0][0]).toContain('Invalid vnode type');
    });

    it(':triggerElement[string]', () => {
      const wrapper = mountPopconfirm({ triggerElement: 'String trigger element' });

      expect(wrapper.find('.popup-trigger').text()).toBe('String trigger element');
    });

    it(':triggerElement[function]', () => {
      const wrapper = mountPopconfirm({
        triggerElement: () => <span class="trigger-function">Function trigger element</span>,
      });

      expect(wrapper.find('.trigger-function').text()).toBe('Function trigger element');
    });

    it(':triggerElement[slot]', () => {
      const wrapper = mountPopconfirm(
        {},
        { triggerElement: () => <span class="trigger-slot">Slot trigger element</span> },
      );

      expect(wrapper.find('.trigger-slot').text()).toBe('Slot trigger element');
    });

    it(':default has priority over :triggerElement', () => {
      const wrapper = mountPopconfirm({ default: 'Default trigger', triggerElement: 'Trigger element' });

      expect(wrapper.find('.popup-trigger').text()).toBe('Default trigger');
    });

    it(':visible[boolean]', async () => {
      const wrapper = mountPopconfirm({ visible: true });
      const popup = getPopup(wrapper);

      expect(popup.props('visible')).toBe(true);
      await wrapper.setProps({ visible: false });
      expect(popup.props('visible')).toBe(false);
    });

    it(':modelValue[boolean]', async () => {
      const wrapper = mountPopconfirm({ modelValue: true });
      const popup = getPopup(wrapper);

      expect(popup.props('visible')).toBe(true);
      await wrapper.setProps({ modelValue: false });
      expect(popup.props('visible')).toBe(false);
    });

    it(':modelValue has priority over :visible', () => {
      const wrapper = mountPopconfirm({ modelValue: false, visible: true });

      expect(getPopup(wrapper).props('visible')).toBe(false);
    });

    it(':defaultVisible[boolean]', async () => {
      const wrapper = mountPopconfirm({ defaultVisible: true });
      const popup = getPopup(wrapper);

      expect(popup.props('visible')).toBe(true);
      await wrapper.find('.popup-visible-change').trigger('click');
      await nextTick();
      expect(popup.props('visible')).toBe(false);
    });
  });

  describe('events', () => {
    it('cancel', async () => {
      const onCancel = vi.fn();
      const onVisibleChange = vi.fn();
      const wrapper = mountPopconfirm({ visible: true, onCancel, onVisibleChange });

      await wrapper.find('.t-popconfirm__cancel').trigger('click');

      expect(onCancel).toHaveBeenCalledTimes(1);
      expect(onCancel.mock.calls[0][0].e).toBeInstanceOf(MouseEvent);
      expect(onVisibleChange).toHaveBeenCalledWith(
        false,
        expect.objectContaining({ e: expect.any(MouseEvent), trigger: 'cancel' }),
      );
      expect(wrapper.emitted('update:visible')).toEqual([[false]]);
    });

    it('confirm', async () => {
      const onConfirm = vi.fn();
      const onVisibleChange = vi.fn();
      const wrapper = mountPopconfirm({ modelValue: true, onConfirm, onVisibleChange });

      await wrapper.find('.t-popconfirm__confirm').trigger('click');

      expect(onConfirm).toHaveBeenCalledTimes(1);
      expect(onConfirm.mock.calls[0][0].e).toBeInstanceOf(MouseEvent);
      expect(onVisibleChange).toHaveBeenCalledWith(
        false,
        expect.objectContaining({ e: expect.any(MouseEvent), trigger: 'confirm' }),
      );
      expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
    });

    it('visible-change in uncontrolled mode', async () => {
      const onVisibleChange = vi.fn();
      const wrapper = mountPopconfirm({ onVisibleChange });
      const popup = getPopup(wrapper);

      await wrapper.find('.popup-visible-change').trigger('click');
      await nextTick();

      expect(popup.props('visible')).toBe(true);
      expect(onVisibleChange).toHaveBeenCalledWith(
        true,
        expect.objectContaining({ e: expect.any(MouseEvent), trigger: 'trigger-element-click' }),
      );
      expect(wrapper.emitted('update:visible')).toBeUndefined();
      expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    });

    it('visible-change in visible controlled mode', async () => {
      const onVisibleChange = vi.fn();
      const wrapper = mountPopconfirm({ visible: false, onVisibleChange });

      await wrapper.find('.popup-visible-change').trigger('click');

      expect(onVisibleChange).toHaveBeenCalledWith(
        true,
        expect.objectContaining({ e: expect.any(MouseEvent), trigger: 'trigger-element-click' }),
      );
      expect(wrapper.emitted('update:visible')).toEqual([[true]]);
      expect(getPopup(wrapper).props('visible')).toBe(false);
    });

    it('visible-change in modelValue controlled mode', async () => {
      const onVisibleChange = vi.fn();
      const wrapper = mountPopconfirm({ modelValue: false, onVisibleChange });

      await wrapper.find('.popup-visible-change').trigger('click');

      expect(onVisibleChange).toHaveBeenCalledWith(
        true,
        expect.objectContaining({ e: expect.any(MouseEvent), trigger: 'trigger-element-click' }),
      );
      expect(wrapper.emitted('update:modelValue')).toEqual([[true]]);
      expect(getPopup(wrapper).props('visible')).toBe(false);
    });
  });

  describe('lifecycle', () => {
    it('removes rendered content after unmount', () => {
      const wrapper = mountPopconfirm({ content: 'Popconfirm content' });

      expect(wrapper.find('.popup-stub').exists()).toBe(true);
      wrapper.unmount();
      expect(onPopupUnmounted).toHaveBeenCalledTimes(1);
    });
  });
});
