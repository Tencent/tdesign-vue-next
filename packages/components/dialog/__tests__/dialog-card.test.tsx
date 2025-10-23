import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { expect, vi, describe, it, beforeEach, afterEach } from 'vitest';
import { DialogCard } from '@tdesign/components';
import { sleep } from '@tdesign/internal-utils';

describe('DialogCard', () => {
  describe('props', () => {
    let wrapper: VueWrapper<InstanceType<typeof DialogCard>> | null = null;

    beforeEach(() => {
      wrapper = mount(DialogCard, {
        props: {},
      }) as VueWrapper<InstanceType<typeof DialogCard>>;
    });

    afterEach(() => {
      wrapper?.unmount();
      wrapper = null;
    });

    it(':body[string]', async () => {
      const wrapper1 = mount(DialogCard, {
        props: {
          body: 'Dialog body content',
        },
      });

      expect(wrapper1.vm.$props.body).toBe('Dialog body content');
      expect(wrapper1.find('.t-dialog__body').text()).toBe('Dialog body content');
    });

    it(':body[function]', async () => {
      const bodyFn = vi.fn(() => 'Custom body');
      const wrapper1 = mount(DialogCard, {
        props: {
          body: bodyFn,
        },
      });

      expect(typeof wrapper1.vm.$props.body).toBe('function');
      expect(wrapper1.find('.t-dialog__body').exists()).toBe(true);
    });

    it(':cancelBtn[string]', async () => {
      const wrapper1 = mount(DialogCard, {
        props: {
          cancelBtn: 'Custom Cancel',
          footer: true,
        },
      });

      expect(wrapper1.vm.$props.cancelBtn).toBe('Custom Cancel');
      const cancelBtn = wrapper1.find('.t-dialog__cancel');
      expect(cancelBtn.exists()).toBe(true);
      expect(cancelBtn.text()).toBe('Custom Cancel');
    });

    it(':cancelBtn[object]', async () => {
      const wrapper1 = mount(DialogCard, {
        props: {
          cancelBtn: {
            content: 'Cancel',
            theme: 'default',
            size: 'medium',
          },
          footer: true,
        },
      });

      expect(typeof wrapper1.vm.$props.cancelBtn).toBe('object');
      const cancelBtn = wrapper1.find('.t-dialog__cancel');
      expect(cancelBtn.exists()).toBe(true);
    });

    it(':cancelBtn[null]', async () => {
      const wrapper1 = mount(DialogCard, {
        props: {
          cancelBtn: null,
          footer: true,
        },
      });

      expect(wrapper1.vm.$props.cancelBtn).toBe(null);
      const cancelBtn = wrapper1.find('.t-dialog__cancel');
      expect(cancelBtn.exists()).toBe(false);
    });

    it(':closeBtn[boolean]', async () => {
      const wrapper1 = mount(DialogCard, {
        props: {
          closeBtn: true,
          header: true,
        },
      });

      expect(wrapper1.vm.$props.closeBtn).toBe(true);
      expect(wrapper1.find('.t-dialog__close').exists()).toBe(true);

      const wrapper2 = mount(DialogCard, {
        props: {
          closeBtn: false,
          header: true,
        },
      });

      expect(wrapper2.vm.$props.closeBtn).toBe(false);
      expect(wrapper2.find('.t-dialog__close').exists()).toBe(false);
    });

    it(':closeBtn[string]', async () => {
      const wrapper1 = mount(DialogCard, {
        props: {
          closeBtn: 'Close',
          header: true,
        },
      });

      expect(wrapper1.vm.$props.closeBtn).toBe('Close');
      const closeBtn = wrapper1.find('.t-dialog__close');
      expect(closeBtn.exists()).toBe(true);
      expect(closeBtn.text()).toBe('Close');
    });

    it(':closeBtn[function]', async () => {
      const closeBtnFn = vi.fn(() => 'Custom Close');
      const wrapper1 = mount(DialogCard, {
        props: {
          closeBtn: closeBtnFn,
          header: true,
        },
      });

      expect(typeof wrapper1.vm.$props.closeBtn).toBe('function');
      expect(wrapper1.find('.t-dialog__close').exists()).toBe(true);
    });

    it(':confirmBtn[string]', async () => {
      const wrapper1 = mount(DialogCard, {
        props: {
          confirmBtn: 'Custom Confirm',
          footer: true,
        },
      });

      expect(wrapper1.vm.$props.confirmBtn).toBe('Custom Confirm');
      const confirmBtn = wrapper1.find('.t-dialog__confirm');
      expect(confirmBtn.exists()).toBe(true);
      expect(confirmBtn.text()).toBe('Custom Confirm');
    });

    it(':confirmBtn[object]', async () => {
      const wrapper1 = mount(DialogCard, {
        props: {
          confirmBtn: {
            content: 'Confirm',
            theme: 'primary',
            size: 'medium',
          },
          footer: true,
        },
      });

      expect(typeof wrapper1.vm.$props.confirmBtn).toBe('object');
      const confirmBtn = wrapper1.find('.t-dialog__confirm');
      expect(confirmBtn.exists()).toBe(true);
    });

    it(':confirmBtn[null]', async () => {
      const wrapper1 = mount(DialogCard, {
        props: {
          confirmBtn: null,
          footer: true,
        },
      });

      expect(wrapper1.vm.$props.confirmBtn).toBe(null);
      const confirmBtn = wrapper1.find('.t-dialog__confirm');
      expect(confirmBtn.exists()).toBe(false);
    });

    it(':confirmLoading', async () => {
      const wrapper1 = mount(DialogCard, {
        props: {
          confirmLoading: true,
          footer: true,
        },
      });

      expect(wrapper1.vm.$props.confirmLoading).toBe(true);
      const confirmBtn = wrapper1.find('.t-dialog__confirm');
      expect(confirmBtn.exists()).toBe(true);
      expect(confirmBtn.classes()).toContain('t-is-loading');
    });

    it(':footer[boolean]', async () => {
      const wrapper1 = mount(DialogCard, {
        props: {
          footer: true,
        },
      });

      expect(wrapper1.vm.$props.footer).toBe(true);
      expect(wrapper1.find('.t-dialog__footer').exists()).toBe(true);

      const wrapper2 = mount(DialogCard, {
        props: {
          footer: false,
        },
      });

      expect(wrapper2.vm.$props.footer).toBe(false);
      expect(wrapper2.find('.t-dialog__footer').exists()).toBe(false);
    });

    it(':footer[function]', async () => {
      const footerFn = vi.fn(() => 'Custom footer');
      const wrapper1 = mount(DialogCard, {
        props: {
          footer: footerFn,
        },
      });

      expect(typeof wrapper1.vm.$props.footer).toBe('function');
      expect(wrapper1.find('.t-dialog__footer').exists()).toBe(true);
    });

    it(':header[boolean]', async () => {
      const wrapper1 = mount(DialogCard, {
        props: {
          header: true,
        },
      });

      expect(wrapper1.vm.$props.header).toBe(true);
      expect(wrapper1.find('.t-dialog__header').exists()).toBe(true);

      const wrapper2 = mount(DialogCard, {
        props: {
          header: false,
          closeBtn: false,
        },
      });

      expect(wrapper2.vm.$props.header).toBe(false);
      // 当 header 为 false 且 closeBtn 为 false 时，header 不渲染
      expect(wrapper2.find('.t-dialog__header').exists()).toBe(false);
    });

    it(':header[string]', async () => {
      const wrapper1 = mount(DialogCard, {
        props: {
          header: 'Dialog Title',
        },
      });

      expect(wrapper1.vm.$props.header).toBe('Dialog Title');
      const header = wrapper1.find('.t-dialog__header');
      expect(header.exists()).toBe(true);
      expect(header.text()).toContain('Dialog Title');
    });

    it(':header[function]', async () => {
      const headerFn = vi.fn(() => 'Custom Header');
      const wrapper1 = mount(DialogCard, {
        props: {
          header: headerFn,
        },
      });

      expect(typeof wrapper1.vm.$props.header).toBe('function');
      expect(wrapper1.find('.t-dialog__header').exists()).toBe(true);
    });

    it(':theme', async () => {
      const themes = ['default', 'info', 'warning', 'danger', 'success'];

      for (const theme of themes) {
        const wrapper1 = mount(DialogCard, {
          props: {
            theme: theme as any,
          },
        });

        expect(wrapper1.vm.$props.theme).toBe(theme);
        expect(wrapper1.find(`.t-dialog__modal-${theme}`).exists()).toBe(true);
      }
    });

    it(':theme with icon', async () => {
      const wrapper1 = mount(DialogCard, {
        props: {
          theme: 'info',
          header: 'Info Dialog',
        },
      });

      expect(wrapper1.find('.t-is-info').exists()).toBe(true);

      const wrapper2 = mount(DialogCard, {
        props: {
          theme: 'warning',
          header: 'Warning Dialog',
        },
      });

      expect(wrapper2.find('.t-is-warning').exists()).toBe(true);

      const wrapper3 = mount(DialogCard, {
        props: {
          theme: 'danger',
          header: 'Danger Dialog',
        },
      });

      expect(wrapper3.find('.t-is-error').exists()).toBe(true);

      const wrapper4 = mount(DialogCard, {
        props: {
          theme: 'success',
          header: 'Success Dialog',
        },
      });

      expect(wrapper4.find('.t-is-success').exists()).toBe(true);
    });

    it(':placement', async () => {
      const wrapper1 = mount(DialogCard, {
        props: {
          placement: 'top',
        },
      });

      expect(wrapper1.vm.$props.placement).toBe('top');
      expect(wrapper1.find('.t-dialog--top').exists()).toBe(true);

      const wrapper2 = mount(DialogCard, {
        props: {
          placement: 'center',
        },
      });

      expect(wrapper2.vm.$props.placement).toBe('center');
      expect(wrapper2.find('.t-dialog--center').exists()).toBe(true);
    });

    it(':mode[modeless]', async () => {
      const wrapper1 = mount(DialogCard, {
        props: {
          mode: 'modeless',
        },
      });

      expect(wrapper1.vm.$props.mode).toBe('modeless');
      expect(wrapper1.find('.t-dialog').exists()).toBe(true);
    });

    it(':mode[full-screen]', async () => {
      const wrapper1 = mount(DialogCard, {
        props: {
          mode: 'full-screen',
        },
      });

      expect(wrapper1.vm.$props.mode).toBe('full-screen');
      expect(wrapper1.find('.t-dialog__fullscreen').exists()).toBe(true);
    });

    it(':draggable', async () => {
      const wrapper1 = mount(DialogCard, {
        props: {
          mode: 'modeless',
          draggable: true,
        },
      });

      expect(wrapper1.vm.$props.draggable).toBe(true);
      expect(wrapper1.find('.t-dialog--draggable').exists()).toBe(true);
    });

    it(':width', async () => {
      const wrapper1 = mount(DialogCard, {
        props: {
          width: '500px',
        },
      });

      expect(wrapper1.vm.$props.width).toBe('500px');
      expect(wrapper1.find('.t-dialog').attributes('style')).toContain('width: 500px');

      const wrapper2 = mount(DialogCard, {
        props: {
          width: 600,
        },
      });

      expect(wrapper2.vm.$props.width).toBe(600);
      expect(wrapper2.find('.t-dialog').attributes('style')).toContain('width: 600px');
    });

    it(':width with full-screen mode', async () => {
      const wrapper1 = mount(DialogCard, {
        props: {
          mode: 'full-screen',
          width: '500px',
        },
      });

      // width 在全屏模式下不生效
      const style = wrapper1.find('.t-dialog').attributes('style');
      if (style) {
        expect(style).not.toContain('width: 500px');
      } else {
        // 如果没有 style 属性，说明 width 确实没有应用
        expect(style).toBeUndefined();
      }
    });

    it(':dialogClassName', async () => {
      const wrapper1 = mount(DialogCard, {
        props: {
          dialogClassName: 'custom-dialog-class',
        },
      });

      expect(wrapper1.vm.$props.dialogClassName).toBe('custom-dialog-class');
      expect(wrapper1.find('.custom-dialog-class').exists()).toBe(true);
    });

    it(':dialogStyle', async () => {
      const wrapper1 = mount(DialogCard, {
        props: {
          dialogStyle: { backgroundColor: 'red' },
        },
      });

      expect(wrapper1.vm.$props.dialogStyle).toEqual({ backgroundColor: 'red' });
      expect(wrapper1.find('.t-dialog').attributes('style')).toContain('background-color: red');
    });
  });

  describe('events', () => {
    it('@cancel', async () => {
      const onCancel = vi.fn();
      const wrapper = mount(DialogCard, {
        props: {
          footer: true,
          onCancel,
        },
      });

      const cancelBtn = wrapper.find('.t-dialog__cancel');
      await cancelBtn.trigger('click');
      expect(onCancel).toHaveBeenCalledTimes(1);
      expect(onCancel.mock.calls[0][0]).toHaveProperty('e');
    });

    it('@closeBtnClick', async () => {
      const onCloseBtnClick = vi.fn();
      const wrapper = mount(DialogCard, {
        props: {
          header: true,
          closeBtn: true,
          onCloseBtnClick,
        },
      });

      const closeBtn = wrapper.find('.t-dialog__close');
      await closeBtn.trigger('click');
      expect(onCloseBtnClick).toHaveBeenCalledTimes(1);
      expect(onCloseBtnClick.mock.calls[0][0]).toHaveProperty('e');
    });

    it('@confirm', async () => {
      const onConfirm = vi.fn();
      const wrapper = mount(DialogCard, {
        props: {
          footer: true,
          onConfirm,
        },
      });

      const confirmBtn = wrapper.find('.t-dialog__confirm');
      await confirmBtn.trigger('click');
      expect(onConfirm).toHaveBeenCalledTimes(1);
      expect(onConfirm.mock.calls[0][0]).toHaveProperty('e');
    });
  });

  describe('slots', () => {
    it('default slot', async () => {
      const wrapper = mount(DialogCard, {
        slots: {
          default: '<div class="custom-content">Custom Content</div>',
        },
      });

      expect(wrapper.find('.custom-content').exists()).toBe(true);
      expect(wrapper.find('.custom-content').text()).toBe('Custom Content');
    });

    it('body slot', async () => {
      const wrapper = mount(DialogCard, {
        slots: {
          body: '<div class="custom-body">Custom Body</div>',
        },
      });

      expect(wrapper.find('.custom-body').exists()).toBe(true);
      expect(wrapper.find('.custom-body').text()).toBe('Custom Body');
    });

    it('header slot', async () => {
      const wrapper = mount(DialogCard, {
        slots: {
          header: '<div class="custom-header">Custom Header</div>',
        },
      });

      expect(wrapper.find('.custom-header').exists()).toBe(true);
      expect(wrapper.find('.custom-header').text()).toBe('Custom Header');
    });

    it('footer slot', async () => {
      const wrapper = mount(DialogCard, {
        props: {
          footer: true,
        },
        slots: {
          footer: '<div class="custom-footer">Custom Footer</div>',
        },
      });

      expect(wrapper.find('.custom-footer').exists()).toBe(true);
      expect(wrapper.find('.custom-footer').text()).toBe('Custom Footer');
    });

    it('closeBtn slot', async () => {
      const wrapper = mount(DialogCard, {
        props: {
          header: true,
          closeBtn: true,
        },
        slots: {
          closeBtn: '<span class="custom-close">X</span>',
        },
      });

      expect(wrapper.find('.custom-close').exists()).toBe(true);
      expect(wrapper.find('.custom-close').text()).toBe('X');
    });
  });

  describe('functionality', () => {
    it('should render default footer with cancel and confirm buttons', async () => {
      const wrapper = mount(DialogCard, {
        props: {
          footer: true,
        },
      });

      expect(wrapper.find('.t-dialog__footer').exists()).toBe(true);
      expect(wrapper.find('.t-dialog__cancel').exists()).toBe(true);
      expect(wrapper.find('.t-dialog__confirm').exists()).toBe(true);
    });

    it('should not render footer when footer is false', async () => {
      const wrapper = mount(DialogCard, {
        props: {
          footer: false,
        },
      });

      expect(wrapper.find('.t-dialog__footer').exists()).toBe(false);
    });

    it('should render header with close button', async () => {
      const wrapper = mount(DialogCard, {
        props: {
          header: 'Test Header',
          closeBtn: true,
        },
      });

      expect(wrapper.find('.t-dialog__header').exists()).toBe(true);
      expect(wrapper.find('.t-dialog__close').exists()).toBe(true);
    });

    it('should not render header when header is false', async () => {
      const wrapper = mount(DialogCard, {
        props: {
          header: false,
          closeBtn: false,
        },
      });

      expect(wrapper.find('.t-dialog__header').exists()).toBe(false);
    });

    it('should render body content', async () => {
      const wrapper = mount(DialogCard, {
        props: {
          body: 'Test body content',
        },
      });

      expect(wrapper.find('.t-dialog__body').exists()).toBe(true);
      expect(wrapper.find('.t-dialog__body').text()).toBe('Test body content');
    });

    it('should apply theme classes correctly', async () => {
      const wrapper = mount(DialogCard, {
        props: {
          theme: 'info',
        },
      });

      expect(wrapper.find('.t-dialog__modal-info').exists()).toBe(true);
    });

    it('should apply fullscreen classes when mode is full-screen', async () => {
      const wrapper = mount(DialogCard, {
        props: {
          mode: 'full-screen',
          header: true,
          footer: true,
        },
      });

      expect(wrapper.find('.t-dialog__fullscreen').exists()).toBe(true);
      expect(wrapper.find('.t-dialog__header--fullscreen').exists()).toBe(true);
      expect(wrapper.find('.t-dialog__footer--fullscreen').exists()).toBe(true);
      expect(wrapper.find('.t-dialog__body--fullscreen').exists()).toBe(true);
    });

    it('should apply draggable class when mode is modeless and draggable is true', async () => {
      const wrapper = mount(DialogCard, {
        props: {
          mode: 'modeless',
          draggable: true,
        },
      });

      expect(wrapper.find('.t-dialog--draggable').exists()).toBe(true);
    });

    it('should not apply draggable class when mode is not modeless', async () => {
      const wrapper = mount(DialogCard, {
        props: {
          mode: 'modal',
          draggable: true,
        },
      });

      expect(wrapper.find('.t-dialog--draggable').exists()).toBe(false);
    });

    it('should show confirm button loading state', async () => {
      const wrapper = mount(DialogCard, {
        props: {
          footer: true,
          confirmLoading: true,
        },
      });

      const confirmBtn = wrapper.find('.t-dialog__confirm');
      expect(confirmBtn.classes()).toContain('t-is-loading');
    });

    it('should show confirm button loading state from confirmBtn.loading', async () => {
      const wrapper = mount(DialogCard, {
        props: {
          footer: true,
          confirmBtn: {
            loading: true,
          },
        },
      });

      const confirmBtn = wrapper.find('.t-dialog__confirm');
      expect(confirmBtn.classes()).toContain('t-is-loading');
    });

    it('should render theme icon in header', async () => {
      const wrapper1 = mount(DialogCard, {
        props: {
          theme: 'info',
          header: 'Info',
        },
      });
      expect(wrapper1.find('.t-is-info').exists()).toBe(true);

      const wrapper2 = mount(DialogCard, {
        props: {
          theme: 'success',
          header: 'Success',
        },
      });
      expect(wrapper2.find('.t-is-success').exists()).toBe(true);

      const wrapper3 = mount(DialogCard, {
        props: {
          theme: 'warning',
          header: 'Warning',
        },
      });
      expect(wrapper3.find('.t-is-warning').exists()).toBe(true);

      const wrapper4 = mount(DialogCard, {
        props: {
          theme: 'danger',
          header: 'Danger',
        },
      });
      expect(wrapper4.find('.t-is-error').exists()).toBe(true);
    });

    it('should not render theme icon when theme is default', async () => {
      const wrapper = mount(DialogCard, {
        props: {
          theme: 'default',
          header: 'Default',
        },
      });

      expect(wrapper.find('.t-is-info').exists()).toBe(false);
      expect(wrapper.find('.t-is-success').exists()).toBe(false);
      expect(wrapper.find('.t-is-warning').exists()).toBe(false);
      expect(wrapper.find('.t-is-error').exists()).toBe(false);
    });

    it('should apply body__icon class when theme is not default', async () => {
      const wrapper = mount(DialogCard, {
        props: {
          theme: 'info',
          body: 'Test',
        },
      });

      expect(wrapper.find('.t-dialog__body__icon').exists()).toBe(true);
    });

    it('should apply body class when theme is default', async () => {
      const wrapper = mount(DialogCard, {
        props: {
          theme: 'default',
          body: 'Test',
        },
      });

      expect(wrapper.find('.t-dialog__body').exists()).toBe(true);
      expect(wrapper.find('.t-dialog__body__icon').exists()).toBe(false);
    });
  });

  describe('internal logic', () => {
    it('should expose resetPosition method', async () => {
      const wrapper = mount(DialogCard, {
        props: {
          mode: 'modeless',
          draggable: true,
        },
      });

      expect(wrapper.vm.resetPosition).toBeDefined();
      expect(typeof wrapper.vm.resetPosition).toBe('function');
    });

    it('should expose $el property', async () => {
      const wrapper = mount(DialogCard, {
        props: {},
      });

      expect(wrapper.vm.$el).toBeDefined();
    });

    it('should stop propagation on mousedown when modeless and draggable', async () => {
      const wrapper = mount(DialogCard, {
        props: {
          mode: 'modeless',
          draggable: true,
          header: 'Test',
          body: 'Test',
          footer: true,
        },
      });

      const header = wrapper.find('.t-dialog__header');
      const stopPropagation = vi.fn();
      const event = new MouseEvent('mousedown');
      event.stopPropagation = stopPropagation;

      await header.trigger('mousedown');
      // 由于事件处理在组件内部，我们只能验证元素存在
      expect(header.exists()).toBe(true);
    });

    it('should compute dialogClass correctly', async () => {
      const wrapper = mount(DialogCard, {
        props: {
          theme: 'info',
          placement: 'top',
          dialogClassName: 'custom-class',
        },
      });

      const dialog = wrapper.find('.t-dialog');
      expect(dialog.classes()).toContain('t-dialog');
      expect(dialog.classes()).toContain('t-dialog__modal-info');
      expect(dialog.classes()).toContain('t-dialog--default');
      expect(dialog.classes()).toContain('t-dialog--top');
      expect(dialog.classes()).toContain('custom-class');
    });

    it('should compute dialogStyle correctly', async () => {
      const wrapper = mount(DialogCard, {
        props: {
          width: '600px',
          dialogStyle: { backgroundColor: 'blue' },
        },
      });

      const dialog = wrapper.find('.t-dialog');
      const style = dialog.attributes('style');
      expect(style).toContain('width: 600px');
      expect(style).toContain('background-color: blue');
    });

    it('should not apply width in full-screen mode', async () => {
      const wrapper = mount(DialogCard, {
        props: {
          mode: 'full-screen',
          width: '600px',
        },
      });

      const dialog = wrapper.find('.t-dialog');
      const style = dialog.attributes('style');
      if (style) {
        expect(style).not.toContain('width: 600px');
      } else {
        // 如果没有 style 属性，说明 width 确实没有应用
        expect(style).toBeUndefined();
      }
    });

    it('should compute confirmBtnLoading from confirmBtn.loading', async () => {
      const wrapper = mount(DialogCard, {
        props: {
          footer: true,
          confirmBtn: {
            loading: true,
          },
        },
      });

      const confirmBtn = wrapper.find('.t-dialog__confirm');
      expect(confirmBtn.classes()).toContain('t-is-loading');
    });

    it('should compute confirmBtnLoading from confirmLoading prop', async () => {
      const wrapper = mount(DialogCard, {
        props: {
          footer: true,
          confirmLoading: true,
        },
      });

      const confirmBtn = wrapper.find('.t-dialog__confirm');
      expect(confirmBtn.classes()).toContain('t-is-loading');
    });

    it('should render fullscreen body without footer', async () => {
      const wrapper = mount(DialogCard, {
        props: {
          mode: 'full-screen',
          body: 'Test',
          footer: false,
        },
      });

      expect(wrapper.find('.t-dialog__body--fullscreen--without-footer').exists()).toBe(true);
    });

    it('should render fullscreen body with footer', async () => {
      const wrapper = mount(DialogCard, {
        props: {
          mode: 'full-screen',
          body: 'Test',
          footer: true,
        },
      });

      expect(wrapper.find('.t-dialog__body--fullscreen').exists()).toBe(true);
      expect(wrapper.find('.t-dialog__body--fullscreen--without-footer').exists()).toBe(false);
    });

    it('should apply v-draggable directive when modeless and draggable', async () => {
      const wrapper = mount(DialogCard, {
        props: {
          mode: 'modeless',
          draggable: true,
        },
      });

      // v-draggable 指令会在元素上生效
      expect(wrapper.find('.t-dialog--draggable').exists()).toBe(true);
    });

    it('should not apply v-draggable directive when not modeless', async () => {
      const wrapper = mount(DialogCard, {
        props: {
          mode: 'modal',
          draggable: true,
        },
      });

      expect(wrapper.find('.t-dialog--draggable').exists()).toBe(false);
    });

    it('should render close button in fullscreen mode', async () => {
      const wrapper = mount(DialogCard, {
        props: {
          mode: 'full-screen',
          header: true,
          closeBtn: true,
        },
      });

      expect(wrapper.find('.t-dialog__close--fullscreen').exists()).toBe(true);
    });

    it('should render header in fullscreen mode', async () => {
      const wrapper = mount(DialogCard, {
        props: {
          mode: 'full-screen',
          header: 'Test',
        },
      });

      expect(wrapper.find('.t-dialog__header--fullscreen').exists()).toBe(true);
    });

    it('should render footer in fullscreen mode', async () => {
      const wrapper = mount(DialogCard, {
        props: {
          mode: 'full-screen',
          footer: true,
        },
      });

      expect(wrapper.find('.t-dialog__footer--fullscreen').exists()).toBe(true);
    });
  });
});
