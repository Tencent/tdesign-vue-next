// @ts-nocheck
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref, defineComponent, type SetupContext } from 'vue';
import { useAction, useSameTarget } from '../hooks';
import type { BtnAction, MixinsConfirmBtn, MixinsCancelBtn } from '../hooks/useAction';

// Mock TButton component
vi.mock('../../button', () => ({
  default: {
    name: 'TButton',
    props: ['content', 'theme', 'size', 'loading', 'onClick'],
    template:
      '<button :class="[`t-button--theme-${theme}`, loading && \'t-is-loading\']" @click="onClick"><slot>{{ content }}</slot></button>',
  },
}));

describe('useAction', () => {
  const mockAction: BtnAction = {
    confirmBtnAction: vi.fn(),
    cancelBtnAction: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const ActionTestComponent = defineComponent({
    props: {
      confirmBtn: [String, Object, Function] as any,
      cancelBtn: [String, Object, Function] as any,
      confirmLoading: Boolean,
      theme: String,
      size: String,
      className: String,
    },
    setup(props, { expose }: SetupContext) {
      const { getConfirmBtn, getCancelBtn } = useAction(mockAction);

      const confirmOptions: MixinsConfirmBtn = {
        confirmBtn: props.confirmBtn,
        globalConfirm: '确认',
        className: props.className || 'test-confirm',
        size: props.size || 'medium',
        confirmLoading: props.confirmLoading,
        theme: props.theme as any,
        globalConfirmBtnTheme: {
          default: 'primary',
          info: 'info',
          warning: 'warning',
          danger: 'danger',
          success: 'success',
        },
      };

      const cancelOptions: MixinsCancelBtn = {
        cancelBtn: props.cancelBtn,
        globalCancel: '取消',
        className: props.className || 'test-cancel',
        size: props.size || 'medium',
      };

      const confirmBtn = getConfirmBtn(confirmOptions);
      const cancelBtn = getCancelBtn(cancelOptions);

      expose({ confirmBtn, cancelBtn, getConfirmBtn, getCancelBtn });

      return () => (
        <div>
          {confirmBtn}
          {cancelBtn}
        </div>
      );
    },
  });

  describe('getConfirmBtn', () => {
    it('should return null when confirmBtn is null', () => {
      const wrapper = mount(ActionTestComponent, {
        props: { confirmBtn: null },
      });
      expect(wrapper.vm.confirmBtn).toBe(null);
    });

    it('should return default button when confirmBtn is undefined', () => {
      const wrapper = mount(ActionTestComponent, {
        props: { confirmBtn: undefined },
      });
      const button = wrapper.find('button');
      expect(button.exists()).toBeTruthy();
      expect(button.text()).toBe('确认');
      expect(button.classes()).toContain('t-button--theme-primary');
    });

    it('should display custom content when confirmBtn is string', () => {
      const wrapper = mount(ActionTestComponent, {
        props: { confirmBtn: '自定义确认' },
      });
      const button = wrapper.find('button');
      expect(button.text()).toBe('自定义确认');
    });

    it('should apply object properties when confirmBtn is object', () => {
      const wrapper = mount(ActionTestComponent, {
        props: {
          confirmBtn: { content: '保存', theme: 'success' },
        },
      });
      const button = wrapper.find('button');
      expect(button.text()).toBe('保存');
      expect(button.classes()).toContain('t-button--theme-success');
    });

    it('should show loading state', () => {
      const wrapper = mount(ActionTestComponent, {
        props: {
          confirmBtn: '确认',
          confirmLoading: true,
        },
      });
      const button = wrapper.find('button');
      expect(button.classes()).toContain('t-is-loading');
    });

    it('should trigger confirmBtnAction on click', async () => {
      const wrapper = mount(ActionTestComponent, {
        props: { confirmBtn: '确认' },
      });
      const button = wrapper.find('button');
      await button.trigger('click');
      expect(mockAction.confirmBtnAction).toHaveBeenCalled();
    });

    it('should handle different theme types', () => {
      const wrapper = mount(ActionTestComponent, {
        props: {
          confirmBtn: '确认',
          theme: 'warning',
        },
      });
      const button = wrapper.find('button');
      expect(button.classes()).toContain('t-button--theme-warning');
    });

    it('should handle global config as object', () => {
      const TestComponent = defineComponent({
        setup(_, { expose }: SetupContext) {
          const { getConfirmBtn } = useAction(mockAction);
          const options: MixinsConfirmBtn = {
            confirmBtn: undefined,
            globalConfirm: { content: '全局确认', theme: 'info' },
            className: 'test-confirm',
            size: 'medium',
          };
          const confirmBtn = getConfirmBtn(options);
          expose({ confirmBtn });
          return () => confirmBtn;
        },
      });

      const wrapper = mount(TestComponent);
      const button = wrapper.find('button');
      expect(button.text()).toBe('全局确认');
      expect(button.classes()).toContain('t-button--theme-info');
    });
  });

  describe('getCancelBtn', () => {
    it('should return null when cancelBtn is null', () => {
      const wrapper = mount(ActionTestComponent, {
        props: { cancelBtn: null },
      });
      expect(wrapper.vm.cancelBtn).toBe(null);
    });

    it('should return default button when cancelBtn is undefined', () => {
      const wrapper = mount(ActionTestComponent, {
        props: {
          confirmBtn: null,
          cancelBtn: undefined,
        },
      });
      const buttons = wrapper.findAll('button');
      const cancelButton = buttons[0]; // 由于 confirmBtn 为 null，cancelBtn 是第一个
      expect(cancelButton.exists()).toBeTruthy();
      expect(cancelButton.text()).toBe('取消');
      expect(cancelButton.classes()).toContain('t-button--theme-default');
    });

    it('should display custom content when cancelBtn is string', () => {
      const wrapper = mount(ActionTestComponent, {
        props: {
          confirmBtn: null,
          cancelBtn: '自定义取消',
        },
      });
      const button = wrapper.find('button');
      expect(button.text()).toBe('自定义取消');
    });

    it('should apply object properties when cancelBtn is object', () => {
      const wrapper = mount(ActionTestComponent, {
        props: {
          confirmBtn: null,
          cancelBtn: { content: '关闭', theme: 'danger' },
        },
      });
      const button = wrapper.find('button');
      expect(button.text()).toBe('关闭');
      expect(button.classes()).toContain('t-button--theme-danger');
    });

    it('should trigger cancelBtnAction on click', async () => {
      const wrapper = mount(ActionTestComponent, {
        props: {
          confirmBtn: null,
          cancelBtn: '取消',
        },
      });
      const button = wrapper.find('button');
      await button.trigger('click');
      expect(mockAction.cancelBtnAction).toHaveBeenCalled();
    });
  });
});

describe('useSameTarget', () => {
  const SameTargetTestComponent = defineComponent({
    props: {
      onClick: Function,
    },
    setup(props, { expose }: SetupContext) {
      const { onClick, onMousedown, onMouseup } = useSameTarget(props.onClick);

      expose({ onClick, onMousedown, onMouseup });

      return () => (
        <div onClick={onClick} onMousedown={onMousedown} onMouseup={onMouseup}>
          测试目标
        </div>
      );
    },
  });

  it('should return event handler functions', () => {
    const handleClick = vi.fn();
    const wrapper = mount(SameTargetTestComponent, {
      props: { onClick: handleClick },
    });

    expect(typeof wrapper.vm.onClick).toBe('function');
    expect(typeof wrapper.vm.onMousedown).toBe('function');
    expect(typeof wrapper.vm.onMouseup).toBe('function');
  });

  it('should call handleClick when mousedown and mouseup targets are same', async () => {
    const handleClick = vi.fn();
    const wrapper = mount(SameTargetTestComponent, {
      props: { onClick: handleClick },
    });

    const mockTarget = document.createElement('div');

    // 模拟相同目标的事件序列
    await wrapper.vm.onMousedown({
      target: mockTarget,
      currentTarget: mockTarget,
    } as MouseEvent);

    await wrapper.vm.onMouseup({
      target: mockTarget,
      currentTarget: mockTarget,
    } as MouseEvent);

    await wrapper.vm.onClick({} as MouseEvent);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call handleClick when mousedown targets are different', async () => {
    const handleClick = vi.fn();
    const wrapper = mount(SameTargetTestComponent, {
      props: { onClick: handleClick },
    });

    const mockTarget1 = document.createElement('div');
    const mockTarget2 = document.createElement('div');

    await wrapper.vm.onMousedown({
      target: mockTarget1,
      currentTarget: mockTarget2,
    } as MouseEvent);

    await wrapper.vm.onMouseup({
      target: mockTarget1,
      currentTarget: mockTarget1,
    } as MouseEvent);

    await wrapper.vm.onClick({} as MouseEvent);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should not call handleClick when mouseup targets are different', async () => {
    const handleClick = vi.fn();
    const wrapper = mount(SameTargetTestComponent, {
      props: { onClick: handleClick },
    });

    const mockTarget1 = document.createElement('div');
    const mockTarget2 = document.createElement('div');

    await wrapper.vm.onMousedown({
      target: mockTarget1,
      currentTarget: mockTarget1,
    } as MouseEvent);

    await wrapper.vm.onMouseup({
      target: mockTarget1,
      currentTarget: mockTarget2,
    } as MouseEvent);

    await wrapper.vm.onClick({} as MouseEvent);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should reset state after click', async () => {
    const handleClick = vi.fn();
    const wrapper = mount(SameTargetTestComponent, {
      props: { onClick: handleClick },
    });

    const mockTarget = document.createElement('div');

    // 第一次点击序列
    await wrapper.vm.onMousedown({
      target: mockTarget,
      currentTarget: mockTarget,
    } as MouseEvent);

    await wrapper.vm.onMouseup({
      target: mockTarget,
      currentTarget: mockTarget,
    } as MouseEvent);

    await wrapper.vm.onClick({} as MouseEvent);
    expect(handleClick).toHaveBeenCalledTimes(1);

    // 第二次点击，没有正确的 mousedown/mouseup 序列，不应该触发
    await wrapper.vm.onClick({} as MouseEvent);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not throw error when no handleClick function provided', async () => {
    const wrapper = mount(SameTargetTestComponent, {
      props: { onClick: undefined },
    });

    const mockTarget = document.createElement('div');

    // 应该不抛出错误
    expect(() => {
      wrapper.vm.onMousedown({
        target: mockTarget,
        currentTarget: mockTarget,
      } as MouseEvent);

      wrapper.vm.onMouseup({
        target: mockTarget,
        currentTarget: mockTarget,
      } as MouseEvent);

      wrapper.vm.onClick({} as MouseEvent);
    }).not.toThrow();
  });

  it('should handle extended parameters correctly', async () => {
    const ExtendedComponent = defineComponent({
      props: {
        disabled: Boolean,
      },
      setup(props, { expose }: SetupContext) {
        const handleClick = vi.fn();
        const extendDisabled = ref(props.disabled);
        const { onClick, onMousedown, onMouseup } = useSameTarget(extendDisabled.value ? undefined : handleClick);

        expose({ onClick, onMousedown, onMouseup, handleClick, extendDisabled });

        return () => (
          <div onClick={onClick} onMousedown={onMousedown} onMouseup={onMouseup}>
            扩展测试
          </div>
        );
      },
    });

    const wrapper = mount(ExtendedComponent, {
      props: { disabled: false },
    });

    const mockTarget = document.createElement('div');

    await wrapper.vm.onMousedown({
      target: mockTarget,
      currentTarget: mockTarget,
    } as MouseEvent);

    await wrapper.vm.onMouseup({
      target: mockTarget,
      currentTarget: mockTarget,
    } as MouseEvent);

    await wrapper.vm.onClick({} as MouseEvent);

    expect(wrapper.vm.handleClick).toHaveBeenCalled();
  });

  it('should return correct state when all conditions are not met', async () => {
    const wrapper = mount(SameTargetTestComponent, {
      props: { onClick: undefined },
    });

    const mockTarget1 = document.createElement('div');
    const mockTarget2 = document.createElement('div');

    await wrapper.vm.onMousedown({
      target: mockTarget1,
      currentTarget: mockTarget2,
    } as MouseEvent);

    await wrapper.vm.onMouseup({
      target: mockTarget1,
      currentTarget: mockTarget2,
    } as MouseEvent);

    // 应该不抛出错误，即使没有 handleClick 函数
    expect(() => {
      wrapper.vm.onClick({} as MouseEvent);
    }).not.toThrow();
  });
});
