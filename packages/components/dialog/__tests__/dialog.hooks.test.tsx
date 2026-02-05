import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import { useAction } from '../hooks/useAction';
import { useSameTarget } from '../hooks/useSameTarget';

describe('Dialog Hooks', () => {
  describe('useAction', () => {
    it('returns getConfirmBtn and getCancelBtn functions', () => {
      const confirmBtnAction = vi.fn();
      const cancelBtnAction = vi.fn();

      const { getConfirmBtn, getCancelBtn } = useAction({
        confirmBtnAction,
        cancelBtnAction,
      });

      expect(typeof getConfirmBtn).toBe('function');
      expect(typeof getCancelBtn).toBe('function');
    });

    it('getConfirmBtn returns button with default props', () => {
      const confirmBtnAction = vi.fn();
      const cancelBtnAction = vi.fn();

      const TestComponent = defineComponent({
        setup() {
          const { getConfirmBtn } = useAction({
            confirmBtnAction,
            cancelBtnAction,
          });

          const confirmBtn = getConfirmBtn({
            confirmBtn: undefined,
            globalConfirm: '确认',
            className: 'test-confirm',
          });

          return () => h('div', [confirmBtn]);
        },
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.find('.test-confirm').exists()).toBe(true);
    });

    it('getConfirmBtn handles string confirmBtn', () => {
      const confirmBtnAction = vi.fn();
      const cancelBtnAction = vi.fn();

      const TestComponent = defineComponent({
        setup() {
          const { getConfirmBtn } = useAction({
            confirmBtnAction,
            cancelBtnAction,
          });

          const confirmBtn = getConfirmBtn({
            confirmBtn: 'Custom Confirm',
            globalConfirm: '确认',
            className: 'test-confirm',
          });

          return () => h('div', [confirmBtn]);
        },
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.find('.test-confirm').exists()).toBe(true);
      expect(wrapper.find('.test-confirm').text()).toBe('Custom Confirm');
    });

    it('getConfirmBtn handles object confirmBtn', () => {
      const confirmBtnAction = vi.fn();
      const cancelBtnAction = vi.fn();

      const TestComponent = defineComponent({
        setup() {
          const { getConfirmBtn } = useAction({
            confirmBtnAction,
            cancelBtnAction,
          });

          const confirmBtn = getConfirmBtn({
            confirmBtn: { content: 'OK', theme: 'primary' },
            globalConfirm: '确认',
            className: 'test-confirm',
          });

          return () => h('div', [confirmBtn]);
        },
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.find('.test-confirm').exists()).toBe(true);
    });

    it('getConfirmBtn returns null when confirmBtn is null', () => {
      const confirmBtnAction = vi.fn();
      const cancelBtnAction = vi.fn();

      const TestComponent = defineComponent({
        setup() {
          const { getConfirmBtn } = useAction({
            confirmBtnAction,
            cancelBtnAction,
          });

          const confirmBtn = getConfirmBtn({
            confirmBtn: null,
            globalConfirm: '确认',
            className: 'test-confirm',
          });

          return () => h('div', [confirmBtn]);
        },
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.find('.test-confirm').exists()).toBe(false);
    });

    it('getConfirmBtn handles confirmLoading', () => {
      const confirmBtnAction = vi.fn();
      const cancelBtnAction = vi.fn();

      const TestComponent = defineComponent({
        setup() {
          const { getConfirmBtn } = useAction({
            confirmBtnAction,
            cancelBtnAction,
          });

          const confirmBtn = getConfirmBtn({
            confirmBtn: 'Confirm',
            globalConfirm: '确认',
            className: 'test-confirm',
            confirmLoading: true,
          });

          return () => h('div', [confirmBtn]);
        },
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.find('.test-confirm').exists()).toBe(true);
    });

    it('getCancelBtn returns button with default props', () => {
      const confirmBtnAction = vi.fn();
      const cancelBtnAction = vi.fn();

      const TestComponent = defineComponent({
        setup() {
          const { getCancelBtn } = useAction({
            confirmBtnAction,
            cancelBtnAction,
          });

          const cancelBtn = getCancelBtn({
            cancelBtn: undefined,
            globalCancel: '取消',
            className: 'test-cancel',
          });

          return () => h('div', [cancelBtn]);
        },
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.find('.test-cancel').exists()).toBe(true);
    });

    it('getCancelBtn handles string cancelBtn', () => {
      const confirmBtnAction = vi.fn();
      const cancelBtnAction = vi.fn();

      const TestComponent = defineComponent({
        setup() {
          const { getCancelBtn } = useAction({
            confirmBtnAction,
            cancelBtnAction,
          });

          const cancelBtn = getCancelBtn({
            cancelBtn: 'Custom Cancel',
            globalCancel: '取消',
            className: 'test-cancel',
          });

          return () => h('div', [cancelBtn]);
        },
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.find('.test-cancel').exists()).toBe(true);
      expect(wrapper.find('.test-cancel').text()).toBe('Custom Cancel');
    });

    it('getCancelBtn handles object cancelBtn', () => {
      const confirmBtnAction = vi.fn();
      const cancelBtnAction = vi.fn();

      const TestComponent = defineComponent({
        setup() {
          const { getCancelBtn } = useAction({
            confirmBtnAction,
            cancelBtnAction,
          });

          const cancelBtn = getCancelBtn({
            cancelBtn: { content: 'Cancel', theme: 'default' },
            globalCancel: '取消',
            className: 'test-cancel',
          });

          return () => h('div', [cancelBtn]);
        },
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.find('.test-cancel').exists()).toBe(true);
    });

    it('getCancelBtn returns null when cancelBtn is null', () => {
      const confirmBtnAction = vi.fn();
      const cancelBtnAction = vi.fn();

      const TestComponent = defineComponent({
        setup() {
          const { getCancelBtn } = useAction({
            confirmBtnAction,
            cancelBtnAction,
          });

          const cancelBtn = getCancelBtn({
            cancelBtn: null,
            globalCancel: '取消',
            className: 'test-cancel',
          });

          return () => h('div', [cancelBtn]);
        },
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.find('.test-cancel').exists()).toBe(false);
    });

    it('confirm button triggers confirmBtnAction on click', async () => {
      const confirmBtnAction = vi.fn();
      const cancelBtnAction = vi.fn();

      const TestComponent = defineComponent({
        setup() {
          const { getConfirmBtn } = useAction({
            confirmBtnAction,
            cancelBtnAction,
          });

          const confirmBtn = getConfirmBtn({
            confirmBtn: 'Confirm',
            globalConfirm: '确认',
            className: 'test-confirm',
          });

          return () => h('div', [confirmBtn]);
        },
      });

      const wrapper = mount(TestComponent);
      const button = wrapper.find('.test-confirm');

      await button.trigger('click');

      expect(confirmBtnAction).toHaveBeenCalled();
    });

    it('cancel button triggers cancelBtnAction on click', async () => {
      const confirmBtnAction = vi.fn();
      const cancelBtnAction = vi.fn();

      const TestComponent = defineComponent({
        setup() {
          const { getCancelBtn } = useAction({
            confirmBtnAction,
            cancelBtnAction,
          });

          const cancelBtn = getCancelBtn({
            cancelBtn: 'Cancel',
            globalCancel: '取消',
            className: 'test-cancel',
          });

          return () => h('div', [cancelBtn]);
        },
      });

      const wrapper = mount(TestComponent);
      const button = wrapper.find('.test-cancel');

      await button.trigger('click');

      expect(cancelBtnAction).toHaveBeenCalled();
    });

    it('handles theme prop for confirm button', () => {
      const confirmBtnAction = vi.fn();
      const cancelBtnAction = vi.fn();

      const TestComponent = defineComponent({
        setup() {
          const { getConfirmBtn } = useAction({
            confirmBtnAction,
            cancelBtnAction,
          });

          const confirmBtn = getConfirmBtn({
            confirmBtn: 'Confirm',
            globalConfirm: '确认',
            globalConfirmBtnTheme: {
              default: 'primary',
              info: 'info',
              warning: 'warning',
              danger: 'danger',
              success: 'success',
            },
            theme: 'warning',
            className: 'test-confirm',
          });

          return () => h('div', [confirmBtn]);
        },
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.find('.test-confirm').exists()).toBe(true);
    });

    it('handles size prop for buttons', () => {
      const confirmBtnAction = vi.fn();
      const cancelBtnAction = vi.fn();

      const TestComponent = defineComponent({
        setup() {
          const { getConfirmBtn, getCancelBtn } = useAction({
            confirmBtnAction,
            cancelBtnAction,
          });

          const confirmBtn = getConfirmBtn({
            confirmBtn: 'Confirm',
            globalConfirm: '确认',
            className: 'test-confirm',
            size: 'large',
          });

          const cancelBtn = getCancelBtn({
            cancelBtn: 'Cancel',
            globalCancel: '取消',
            className: 'test-cancel',
            size: 'large',
          });

          return () => h('div', [confirmBtn, cancelBtn]);
        },
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.find('.test-confirm').exists()).toBe(true);
      expect(wrapper.find('.test-cancel').exists()).toBe(true);
    });
  });

  describe('useSameTarget', () => {
    it('returns onClick, onMousedown, and onMouseup handlers', () => {
      const handleClick = vi.fn();
      const { onClick, onMousedown, onMouseup } = useSameTarget(handleClick);

      expect(typeof onClick).toBe('function');
      expect(typeof onMousedown).toBe('function');
      expect(typeof onMouseup).toBe('function');
    });

    it('calls handleClick when mousedown and mouseup targets are the same', () => {
      const handleClick = vi.fn();
      const { onClick, onMousedown, onMouseup } = useSameTarget(handleClick);

      const target = document.createElement('div');
      const mousedownEvent = new MouseEvent('mousedown', { bubbles: true });
      Object.defineProperty(mousedownEvent, 'target', { value: target, enumerable: true });
      Object.defineProperty(mousedownEvent, 'currentTarget', { value: target, enumerable: true });

      const mouseupEvent = new MouseEvent('mouseup', { bubbles: true });
      Object.defineProperty(mouseupEvent, 'target', { value: target, enumerable: true });
      Object.defineProperty(mouseupEvent, 'currentTarget', { value: target, enumerable: true });

      const clickEvent = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(clickEvent, 'target', { value: target, enumerable: true });
      Object.defineProperty(clickEvent, 'currentTarget', { value: target, enumerable: true });

      onMousedown(mousedownEvent);
      onMouseup(mouseupEvent);
      onClick(clickEvent);

      expect(handleClick).toHaveBeenCalled();
    });

    it('does not call handleClick when mousedown target is different', () => {
      const handleClick = vi.fn();
      const { onClick, onMousedown, onMouseup } = useSameTarget(handleClick);

      const target1 = document.createElement('div');
      const target2 = document.createElement('div');

      const mousedownEvent = new MouseEvent('mousedown', { bubbles: true });
      Object.defineProperty(mousedownEvent, 'target', { value: target1, enumerable: true });
      Object.defineProperty(mousedownEvent, 'currentTarget', { value: target2, enumerable: true });

      const mouseupEvent = new MouseEvent('mouseup', { bubbles: true });
      Object.defineProperty(mouseupEvent, 'target', { value: target2, enumerable: true });
      Object.defineProperty(mouseupEvent, 'currentTarget', { value: target2, enumerable: true });

      const clickEvent = new MouseEvent('click', { bubbles: true });

      onMousedown(mousedownEvent);
      onMouseup(mouseupEvent);
      onClick(clickEvent);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call handleClick when mouseup target is different', () => {
      const handleClick = vi.fn();
      const { onClick, onMousedown, onMouseup } = useSameTarget(handleClick);

      const target1 = document.createElement('div');
      const target2 = document.createElement('div');

      const mousedownEvent = new MouseEvent('mousedown', { bubbles: true });
      Object.defineProperty(mousedownEvent, 'target', { value: target1, enumerable: true });
      Object.defineProperty(mousedownEvent, 'currentTarget', { value: target1, enumerable: true });

      const mouseupEvent = new MouseEvent('mouseup', { bubbles: true });
      Object.defineProperty(mouseupEvent, 'target', { value: target1, enumerable: true });
      Object.defineProperty(mouseupEvent, 'currentTarget', { value: target2, enumerable: true });

      const clickEvent = new MouseEvent('click', { bubbles: true });

      onMousedown(mousedownEvent);
      onMouseup(mouseupEvent);
      onClick(clickEvent);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('resets state after click', () => {
      const handleClick = vi.fn();
      const { onClick, onMousedown, onMouseup } = useSameTarget(handleClick);

      const target = document.createElement('div');

      const mousedownEvent = new MouseEvent('mousedown', { bubbles: true });
      Object.defineProperty(mousedownEvent, 'target', { value: target, enumerable: true });
      Object.defineProperty(mousedownEvent, 'currentTarget', { value: target, enumerable: true });

      const mouseupEvent = new MouseEvent('mouseup', { bubbles: true });
      Object.defineProperty(mouseupEvent, 'target', { value: target, enumerable: true });
      Object.defineProperty(mouseupEvent, 'currentTarget', { value: target, enumerable: true });

      const clickEvent = new MouseEvent('click', { bubbles: true });

      // 第一次点击
      onMousedown(mousedownEvent);
      onMouseup(mouseupEvent);
      onClick(clickEvent);

      expect(handleClick).toHaveBeenCalledTimes(1);

      // 第二次点击，但没有 mousedown 和 mouseup
      onClick(clickEvent);

      // 不应该再次调用
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('works without handleClick callback', () => {
      const { onClick, onMousedown, onMouseup } = useSameTarget();

      const target = document.createElement('div');

      const mousedownEvent = new MouseEvent('mousedown', { bubbles: true });
      Object.defineProperty(mousedownEvent, 'target', { value: target, enumerable: true });
      Object.defineProperty(mousedownEvent, 'currentTarget', { value: target, enumerable: true });

      const mouseupEvent = new MouseEvent('mouseup', { bubbles: true });
      Object.defineProperty(mouseupEvent, 'target', { value: target, enumerable: true });
      Object.defineProperty(mouseupEvent, 'currentTarget', { value: target, enumerable: true });

      const clickEvent = new MouseEvent('click', { bubbles: true });

      // 不应该抛出错误
      expect(() => {
        onMousedown(mousedownEvent);
        onMouseup(mouseupEvent);
        onClick(clickEvent);
      }).not.toThrow();
    });

    it('handles multiple clicks correctly', () => {
      const handleClick = vi.fn();
      const { onClick, onMousedown, onMouseup } = useSameTarget(handleClick);

      const target = document.createElement('div');

      const createEvent = (type: string) => {
        const event = new MouseEvent(type, { bubbles: true });
        Object.defineProperty(event, 'target', { value: target, enumerable: true });
        Object.defineProperty(event, 'currentTarget', { value: target, enumerable: true });
        return event;
      };

      // 第一次点击
      onMousedown(createEvent('mousedown'));
      onMouseup(createEvent('mouseup'));
      onClick(createEvent('click'));

      expect(handleClick).toHaveBeenCalledTimes(1);

      // 第二次点击
      onMousedown(createEvent('mousedown'));
      onMouseup(createEvent('mouseup'));
      onClick(createEvent('click'));

      expect(handleClick).toHaveBeenCalledTimes(2);
    });
  });
});
