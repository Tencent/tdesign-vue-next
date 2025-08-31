// @ts-nocheck
import { nextTick, ref } from 'vue';
import type { Ref } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { CloseIcon } from 'tdesign-icons-vue-next';
import Dialog from '@tdesign/components/dialog';

describe('props', () => {
  let wrapper: VueWrapper<InstanceType<typeof Dialog>> | null = null;
  let visible: Ref<boolean>;

  beforeEach(() => {
    visible = ref(true);
    wrapper = mount(() => <Dialog v-model:visible={visible.value}>this is content</Dialog>) as VueWrapper<
      InstanceType<typeof Dialog>
    >;
  });

  it('renders dialog content through default slot', async () => {
    const body = wrapper.find('.t-dialog .t-dialog__body');
    await nextTick();
    expect(body.exists()).toBeTruthy();
    expect(body.text()).toBe('this is content');
  });

  it(':body - renders content through body prop as string', async () => {
    const wrapper = mount(() => <Dialog v-model:visible={visible.value} body="this is content"></Dialog>);
    const body = wrapper.find('.t-dialog .t-dialog__body');
    await nextTick();
    expect(body.exists()).toBeTruthy();
    expect(body.text()).toBe('this is content');
  });

  it(':body - renders content through body prop as function', async () => {
    const bodyFn = () => 'function content';
    const wrapper = mount(() => <Dialog v-model:visible={visible.value} body={bodyFn}></Dialog>);
    const body = wrapper.find('.t-dialog .t-dialog__body');
    await nextTick();
    expect(body.exists()).toBeTruthy();
    expect(body.text()).toBe('function content');
  });

  it(':default prop works same as body', async () => {
    const wrapper = mount(() => <Dialog v-model:visible={visible.value} default="default content"></Dialog>);
    const body = wrapper.find('.t-dialog .t-dialog__body');
    await nextTick();
    expect(body.exists()).toBeTruthy();
    expect(body.text()).toBe('default content');
  });

  it(':attach - attaches dialog to specified element', async () => {
    const attachElement = document.createElement('div');
    attachElement.id = 'attach-container';
    document.body.appendChild(attachElement);

    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} attach="#attach-container" body="this is content"></Dialog>
    ));
    await nextTick();

    expect(attachElement.children.length).toBeGreaterThan(0);
    document.body.removeChild(attachElement);
  });

  it(':attach - supports function type', async () => {
    const attachElement = document.createElement('div');
    document.body.appendChild(attachElement);

    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} attach={() => attachElement} body="this is content"></Dialog>
    ));
    await nextTick();

    expect(attachElement.children.length).toBeGreaterThan(0);
    document.body.removeChild(attachElement);
  });

  it(':cancelBtn - renders default cancel button', async () => {
    const btn = wrapper.find('.t-dialog__footer .t-dialog__cancel');
    await nextTick();
    expect(btn.exists()).toBeTruthy();
    expect(btn.text()).toBe('取消');
  });

  it(':cancelBtn - renders custom cancel button with string', async () => {
    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} cancelBtn="自定义取消" body="this is content"></Dialog>
    ));
    const btn = wrapper.find('.t-dialog__footer .t-dialog__cancel');
    await nextTick();
    expect(btn.exists()).toBeTruthy();
    expect(btn.text()).toBe('自定义取消');
  });

  it(':cancelBtn - renders custom cancel button with object', async () => {
    const wrapper = mount(() => (
      <Dialog
        v-model:visible={visible.value}
        cancelBtn={{ content: '自定义取消', theme: 'danger' }}
        body="this is content"
      ></Dialog>
    ));
    const btn = wrapper.find('.t-dialog__footer .t-dialog__cancel');
    await nextTick();
    expect(btn.exists()).toBeTruthy();
    expect(btn.text()).toBe('自定义取消');
    expect(btn.classes()).toContain('t-button--theme-danger');
  });

  it(':cancelBtn - hides cancel button when null', async () => {
    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} cancelBtn={null} body="this is content"></Dialog>
    ));
    const btn = wrapper.find('.t-dialog__footer .t-dialog__cancel');
    await nextTick();
    expect(btn.exists()).toBeFalsy();
  });

  it(':cancelBtn - renders custom cancel button with function', async () => {
    const cancelBtnFn = () => <button class="custom-cancel">Custom Cancel</button>;
    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} cancelBtn={cancelBtnFn} body="this is content"></Dialog>
    ));
    await nextTick();
    expect(wrapper.find('.custom-cancel').exists()).toBeTruthy();
  });

  it(':confirmBtn - renders default confirm button', async () => {
    const btn = wrapper.find('.t-dialog__footer .t-dialog__confirm');
    await nextTick();
    expect(btn.exists()).toBeTruthy();
    expect(btn.text()).toBe('确认');
  });

  it(':confirmBtn - renders custom confirm button with string', async () => {
    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} confirmBtn="自定义确认" body="this is content"></Dialog>
    ));
    const btn = wrapper.find('.t-dialog__footer .t-dialog__confirm');
    await nextTick();
    expect(btn.exists()).toBeTruthy();
    expect(btn.text()).toBe('自定义确认');
  });

  it(':confirmBtn - renders custom confirm button with object', async () => {
    const wrapper = mount(() => (
      <Dialog
        v-model:visible={visible.value}
        confirmBtn={{ content: '自定义确认', theme: 'success' }}
        body="this is content"
      ></Dialog>
    ));
    const btn = wrapper.find('.t-dialog__footer .t-dialog__confirm');
    await nextTick();
    expect(btn.exists()).toBeTruthy();
    expect(btn.text()).toBe('自定义确认');
    expect(btn.classes()).toContain('t-button--theme-success');
  });

  it(':confirmBtn - hides confirm button when null', async () => {
    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} confirmBtn={null} body="this is content"></Dialog>
    ));
    const btn = wrapper.find('.t-dialog__footer .t-dialog__confirm');
    await nextTick();
    expect(btn.exists()).toBeFalsy();
  });

  it(':confirmBtn - renders custom confirm button with function', async () => {
    const confirmBtnFn = () => <button class="custom-confirm">Custom Confirm</button>;
    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} confirmBtn={confirmBtnFn} body="this is content"></Dialog>
    ));
    await nextTick();
    expect(wrapper.find('.custom-confirm').exists()).toBeTruthy();
  });

  it(':closeBtn - renders default close button', async () => {
    const close = wrapper.find('.t-dialog__close');
    await nextTick();
    expect(close.exists()).toBeTruthy();
    expect(close.findComponent(CloseIcon).exists()).toBeTruthy();
  });

  it(':closeBtn - hides close button when false', async () => {
    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} closeBtn={false} body="this is content"></Dialog>
    ));
    const close = wrapper.find('.t-dialog__close');
    await nextTick();
    expect(close.exists()).toBeFalsy();
  });

  it(':closeBtn - renders custom close button with string', async () => {
    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} closeBtn="关闭" body="this is content"></Dialog>
    ));
    const close = wrapper.find('.t-dialog__close');
    await nextTick();
    expect(close.exists()).toBeTruthy();
    expect(close.text()).toBe('关闭');
  });

  it(':closeBtn - renders custom close button with function', async () => {
    const closeBtnFn = () => <span class="custom-close">×</span>;
    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} closeBtn={closeBtnFn} body="this is content"></Dialog>
    ));
    await nextTick();
    expect(wrapper.find('.custom-close').exists()).toBeTruthy();
  });

  it(':closeOnEscKeydown - true by default, closes dialog on ESC', async () => {
    const onClose = vi.fn();
    mount(() => <Dialog v-model:visible={visible.value} onClose={onClose} body="this is content"></Dialog>);
    await nextTick();

    // 模拟按下ESC键
    const escEvent = new KeyboardEvent('keydown', { code: 'Escape' });
    document.dispatchEvent(escEvent);

    expect(onClose).toHaveBeenCalledWith(expect.objectContaining({ trigger: 'esc' }));
  });

  it(':closeOnEscKeydown - false prevents closing on ESC', async () => {
    const onClose = vi.fn();
    const wrapper = mount(() => (
      <Dialog
        v-model:visible={visible.value}
        closeOnEscKeydown={false}
        onClose={onClose}
        body="this is content"
      ></Dialog>
    ));
    await nextTick();

    const escEvent = new KeyboardEvent('keydown', { code: 'Escape' });
    document.dispatchEvent(escEvent);

    expect(onClose).not.toHaveBeenCalled();
  });

  it(':closeOnOverlayClick - true by default, closes dialog on overlay click', async () => {
    const onClose = vi.fn();
    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} onClose={onClose} body="this is content"></Dialog>
    ));
    await nextTick();

    const wrap = wrapper.find('.t-dialog__position');
    await wrap.trigger('mousedown');
    await wrap.trigger('mouseup');
    await wrap.trigger('click');
    await nextTick();

    expect(visible.value).toBe(false); // 检查状态变化
    expect(onClose).toHaveBeenCalledTimes(1); // 确保回调触发
    expect(onClose).toHaveBeenCalledWith(
      expect.objectContaining({ trigger: 'overlay' }), // 验证回调参数
    );
  });

  it(':closeOnOverlayClick - false prevents closing on overlay click', async () => {
    const onClose = vi.fn();
    const wrapper = mount(() => (
      <Dialog
        v-model:visible={visible.value}
        closeOnOverlayClick={false}
        onClose={onClose}
        body="this is content"
      ></Dialog>
    ));
    await nextTick();

    const wrap = wrapper.find('.t-dialog__position');
    await wrap.trigger('mousedown');
    await wrap.trigger('mouseup');
    await wrap.trigger('click');
    await nextTick();

    expect(visible.value).toBe(true); // 检查状态变化
    expect(onClose).not.toHaveBeenCalled();
  });

  it(':confirmLoading - shows loading state on confirm button', async () => {
    const confirmLoading = ref(true);
    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} confirmLoading={confirmLoading.value} body="this is content"></Dialog>
    ));
    await nextTick();

    const confirmBtn = wrapper.find('.t-dialog__confirm');
    expect(confirmBtn.classes()).toContain('t-is-loading');
  });

  it(':confirmOnEnter - triggers confirm on Enter key', async () => {
    visible = ref(true);
    const onConfirm = vi.fn();
    mount(() => (
      <Dialog v-model:visible={visible.value} confirmOnEnter onConfirm={onConfirm} body="this is content"></Dialog>
    ));
    await nextTick();

    // 触发 Enter 键，确保 event.target 存在，避免 undefined 报错
    const enterEvent = new KeyboardEvent('keydown', { code: 'Enter' });
    Object.defineProperty(enterEvent, 'target', { value: document.body });
    document.dispatchEvent(enterEvent);

    await nextTick();

    expect(onConfirm).toHaveBeenCalled();
  });

  it(':confirmOnEnter - triggers confirm on NumpadEnter key', async () => {
    visible = ref(true);
    const onConfirm = vi.fn();
    mount(() => (
      <Dialog v-model:visible={visible.value} confirmOnEnter onConfirm={onConfirm} body="this is content"></Dialog>
    ));
    await nextTick();

    // 触发 NumpadEnter 键，确保 event.target 存在，避免 undefined 报错
    const enterEvent = new KeyboardEvent('keydown', { code: 'NumpadEnter' });
    Object.defineProperty(enterEvent, 'target', { value: document.body });
    document.dispatchEvent(enterEvent);

    await nextTick();

    expect(onConfirm).toHaveBeenCalled();
  });

  it(':confirmOnEnter - does not trigger confirm when target is input', async () => {
    const onConfirm = vi.fn();
    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} confirmOnEnter onConfirm={onConfirm}>
        <input type="text" class="test-input" />
      </Dialog>
    ));
    await nextTick();

    const input = wrapper.find('.test-input');
    const enterEvent = new KeyboardEvent('keydown', { code: 'Enter' });
    Object.defineProperty(enterEvent, 'target', { value: input.element });
    document.dispatchEvent(enterEvent);

    expect(onConfirm).not.toHaveBeenCalled();
  });

  it(':destroyOnClose - destroys content when dialog closes', async () => {
    visible = ref(false);
    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} destroyOnClose body="this is content"></Dialog>
    ));
    visible.value = true;
    await nextTick();

    expect(wrapper.find('.t-dialog__ctx').exists()).toBeTruthy();

    visible.value = false;
    await nextTick();

    expect(document.querySelector('.t-dialog__ctx')).toBeNull();
  });

  it(':footer - renders default footer', async () => {
    const footer = wrapper.find('.t-dialog__footer');
    await nextTick();
    expect(footer.exists()).toBeTruthy();
    expect(footer.findAll('button').length).toBe(2);
  });

  it(':footer - hides footer when false', async () => {
    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} footer={false} body="this is content"></Dialog>
    ));
    const footer = wrapper.find('.t-dialog__footer');
    await nextTick();
    expect(footer.exists()).toBeFalsy();
  });

  it(':footer - renders custom footer with function', async () => {
    const footerFn = () => <div class="custom-footer">Custom Footer</div>;
    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} footer={footerFn} body="this is content"></Dialog>
    ));
    await nextTick();
    expect(wrapper.find('.custom-footer').exists()).toBeTruthy();
  });

  it(':header - renders default header', async () => {
    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} header="this is header" body="this is content"></Dialog>
    ));
    const header = wrapper.find('.t-dialog__header');
    await nextTick();
    expect(header.exists()).toBeTruthy();
    expect(header.text()).toBe('this is header');
  });

  it(':header - hides header when false', async () => {
    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} header={false} closeBtn={false} body="this is content"></Dialog>
    ));
    const header = wrapper.find('.t-dialog__header');
    await nextTick();
    expect(header.exists()).toBeFalsy();
  });

  it(':header - renders custom header with function', async () => {
    const headerFn = () => <div class="custom-header">Custom Header</div>;
    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} header={headerFn} body="this is content"></Dialog>
    ));
    await nextTick();
    expect(wrapper.find('.custom-header').exists()).toBeTruthy();
  });

  it(':lazy - does not render content when lazy=true and visible=false', async () => {
    const invisibleVisible = ref(false);
    const wrapper = mount(() => <Dialog v-model:visible={invisibleVisible.value} lazy body="this is content"></Dialog>);
    await nextTick();
    expect(wrapper.find('.t-dialog__body').exists()).toBeFalsy();
  });

  it(':lazy - renders content after first open when lazy=true', async () => {
    const lazyVisible = ref(false);
    const wrapper = mount(() => <Dialog v-model:visible={lazyVisible.value} lazy body="this is content"></Dialog>);
    await nextTick();

    lazyVisible.value = true;
    await nextTick();
    expect(wrapper.find('.t-dialog__body').exists()).toBeTruthy();

    lazyVisible.value = false;
    await nextTick();
    expect(wrapper.find('.t-dialog__body').exists()).toBeTruthy(); // 仍然存在
  });

  it(':mode - renders normal dialog', async () => {
    const wrapper = mount(() => <Dialog v-model:visible={visible.value} mode="" body="this is content"></Dialog>);
    const ctx = wrapper.find('.t-dialog__ctx');
    await nextTick();
    expect(ctx.find('.t-dialog__position').exists()).toBeFalsy();
  });

  it(':mode - renders modal dialog by default', async () => {
    const ctx = wrapper.find('.t-dialog__ctx');
    expect(ctx.find('.t-dialog__position').exists()).toBeTruthy();
  });

  it(':mode - renders modeless dialog', async () => {
    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} mode="modeless" body="this is content"></Dialog>
    ));
    const ctx = wrapper.find('.t-dialog__ctx');
    await nextTick();
    expect(ctx.exists()).toBeTruthy();
    expect(ctx.classes()).toContain('t-dialog__ctx--modeless');
  });

  it(':mode - renders normal dialog', async () => {
    const wrapper = mount(() => <Dialog v-model:visible={visible.value} mode="normal" body="this is content"></Dialog>);
    const ctx = wrapper.find('.t-dialog__ctx');
    await nextTick();
    expect(ctx.find('.t-dialog__position').exists()).toBeFalsy();
  });

  it(':mode - renders full-screen dialog', async () => {
    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} mode="full-screen" body="this is content"></Dialog>
    ));
    const ctx = wrapper.find('.t-dialog__ctx');
    await nextTick();
    expect(ctx.find('.t-dialog__position_fullscreen').exists()).toBeTruthy();
  });

  it(':placement - renders top placement by default', async () => {
    const dialog = wrapper.find('.t-dialog');
    await nextTick();
    expect(dialog.classes()).toContain('t-dialog--top');
  });

  it(':placement - renders by placement', async () => {
    const placements = ['top', 'center', ''];
    for (const placement of placements) {
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} placement={placement} body="this is content"></Dialog>
      ));
      const dialog = wrapper.find('.t-dialog');
      await nextTick();
      if (placement === 'top') {
        expect(dialog.classes()).toContain('t-dialog--top');
      } else if (placement === 'center') {
        expect(dialog.classes()).toContain('t-dialog--center');
      }
    }
  });

  it(':preventScrollThrough - prevents scroll through by default', async () => {
    visible = ref(false);
    const wrapper = mount(() => (
      <Dialog preventScrollThrough v-model:visible={visible.value} body="this is content"></Dialog>
    ));
    visible.value = true;
    await nextTick();
    const styleElements = document.body.querySelectorAll('style');
    expect(styleElements.length).toBeGreaterThan(0);
  });

  it(':showInAttachedElement - shows dialog in attached element', async () => {
    const attachElement = document.createElement('div');
    attachElement.style.position = 'relative';
    document.body.appendChild(attachElement);

    const wrapper = mount(() => (
      <Dialog
        v-model:visible={visible.value}
        attach={() => attachElement}
        showInAttachedElement
        body="this is content"
      ></Dialog>
    ));
    await nextTick();

    expect(attachElement.children.length).toBeGreaterThan(0);
    document.body.removeChild(attachElement);
  });

  it(':showOverlay - shows overlay by default', async () => {
    const ctx = wrapper.find('.t-dialog__ctx');
    await nextTick();
    expect(ctx.find('.t-dialog__mask').exists()).toBeTruthy();
  });

  it(':showOverlay - hides overlay when false', async () => {
    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} showOverlay={false} body="this is content"></Dialog>
    ));
    const mask = wrapper.find('.t-dialog__mask');
    await nextTick();
    expect(mask.classes()).toContain('t-is-hidden');
  });

  it(':theme - renders different themes', async () => {
    const themeList = ['default', 'success', 'info', 'warning', 'danger', ''];

    for (const theme of themeList) {
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} theme={theme} body="this is content"></Dialog>
      ));
      const dialog = wrapper.find('.t-dialog');
      await nextTick();
      expect(dialog.classes()).toContain(`t-dialog__modal-${theme}`);
    }
  });

  it(':top - sets custom top position', async () => {
    const wrapper = mount(() => <Dialog v-model:visible={visible.value} top="200" body="this is content"></Dialog>);
    const position = wrapper.find('.t-dialog__position');
    await nextTick();
    expect(getComputedStyle(position.element, null).paddingTop).toBe('200px');
  });

  it(':top - supports number type', async () => {
    const wrapper = mount(() => <Dialog v-model:visible={visible.value} top={300} body="this is content"></Dialog>);
    const position = wrapper.find('.t-dialog__position');
    await nextTick();
    expect(getComputedStyle(position.element, null).paddingTop).toBe('300px');
  });

  it(':width - sets custom width with percentage', async () => {
    const wrapper = mount(() => <Dialog v-model:visible={visible.value} width="80%" body="this is content"></Dialog>);
    const dialog = wrapper.find('.t-dialog');
    await nextTick();
    expect(getComputedStyle(dialog.element, null).width).toBe('80%');
  });

  it(':width - sets custom width with pixels', async () => {
    const wrapper = mount(() => <Dialog v-model:visible={visible.value} width="500px" body="this is content"></Dialog>);
    const dialog = wrapper.find('.t-dialog');
    await nextTick();
    expect(getComputedStyle(dialog.element, null).width).toBe('500px');
  });

  it(':width - supports number type', async () => {
    const wrapper = mount(() => <Dialog v-model:visible={visible.value} width={600} body="this is content"></Dialog>);
    const dialog = wrapper.find('.t-dialog');
    await nextTick();
    expect(getComputedStyle(dialog.element, null).width).toBe('600px');
  });

  it(':zIndex - sets custom z-index', async () => {
    const wrapper = mount(() => <Dialog v-model:visible={visible.value} zIndex={2022} body="this is content"></Dialog>);
    const ctx = wrapper.find('.t-dialog__ctx');
    await nextTick();
    expect(getComputedStyle(ctx.element, null).zIndex).toBe('2022');
  });

  it(':draggable - enables dragging for modeless dialog', async () => {
    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} draggable mode="modeless" body="this is content"></Dialog>
    ));
    const dialog = wrapper.find('.t-dialog');
    await nextTick();
    expect(dialog.classes()).toContain('t-dialog--draggable');
  });

  it(':dialogClassName - adds custom class', async () => {
    const wrapper = mount(() => (
      <Dialog
        v-model:visible={visible.value}
        dialogClassName="custom-class"
        mode="modeless"
        body="this is content"
      ></Dialog>
    ));
    const dialog = wrapper.find('.t-dialog');
    await nextTick();
    expect(dialog.classes()).toContain('custom-class');
  });

  it(':dialogStyle - applies custom styles', async () => {
    const wrapper = mount(() => (
      <Dialog
        v-model:visible={visible.value}
        dialogStyle={{ padding: '99px' }}
        mode="modeless"
        body="this is content"
      ></Dialog>
    ));
    const dialog = wrapper.find('.t-dialog');
    await nextTick();
    expect(getComputedStyle(dialog.element, null).padding).toBe('99px');
  });

  it('updates confirmBtnLoading reactively', async () => {
    const loading = ref(false);
    const wrapper = mount(() => (
      <Dialog
        v-model:visible={visible.value}
        mode="modal"
        confirmBtn={{
          content: 'Saving',
          theme: 'primary',
          loading: loading.value,
        }}
        body="this is content"
      ></Dialog>
    ));
    const dialog = wrapper.find('.t-dialog');
    await nextTick();
    expect(dialog.find('.t-button--theme-primary.t-is-loading.t-dialog__confirm').exists()).toBeFalsy();

    loading.value = true;
    await nextTick();
    const updateDialog = wrapper.find('.t-dialog');
    expect(updateDialog.find('.t-button--theme-primary.t-is-loading.t-dialog__confirm').exists()).toBeTruthy();
  });

  it('supports drag functionality', async () => {
    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} draggable mode="modeless" body="this is content"></Dialog>
    ));
    await nextTick();

    const dialog = wrapper.find('.t-dialog');
    const dialogElement = dialog.element;

    // 设置初始样式
    dialogElement.style.position = 'absolute';
    dialogElement.style.left = '100px';
    dialogElement.style.top = '100px';
    dialogElement.style.width = '500px';
    dialogElement.style.height = '300px';

    const initialLeft = parseInt(getComputedStyle(dialogElement).left, 10);
    const initialTop = parseInt(getComputedStyle(dialogElement).top, 10);

    // 模拟拖拽事件
    const mousedownEvent = new MouseEvent('mousedown', { clientX: 100, clientY: 100 });
    const mousemoveEvent = new MouseEvent('mousemove', { clientX: 150, clientY: 150 });
    const mouseupEvent = new MouseEvent('mouseup');

    dialogElement.dispatchEvent(mousedownEvent);
    document.dispatchEvent(mousemoveEvent);
    document.dispatchEvent(mouseupEvent);

    await nextTick();

    const finalLeft = parseInt(getComputedStyle(dialogElement).left, 10);
    const finalTop = parseInt(getComputedStyle(dialogElement).top, 10);

    expect(finalLeft).not.toBe(initialLeft);
    expect(finalTop).not.toBe(initialTop);
  });

  it('mode prop: invalid value should trigger warning', () => {
    const visible = ref(true);
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    mount(() => <Dialog v-model:visible={visible} mode="invalid-mode" />);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('placement prop: invalid value should trigger warning', () => {
    const visible = ref(true);
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    mount(() => <Dialog v-model:visible={visible} placement="invalid-placement" />);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('theme prop: invalid value should trigger warning', () => {
    const visible = ref(true);
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    mount(() => <Dialog v-model:visible={visible} theme="invalid-theme" />);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe('events', () => {
  it('onCancel - triggers when cancel button is clicked', async () => {
    const visible = ref(false);
    const onCancel = vi.fn();
    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} onCancel={onCancel} body="this is content"></Dialog>
    ));

    visible.value = true;
    await nextTick();

    const btn = wrapper.find('.t-dialog__footer .t-dialog__cancel');
    await nextTick();
    await btn.trigger('click');
    expect(onCancel).toHaveBeenCalled();
  });

  it('onConfirm - triggers when confirm button is clicked', async () => {
    const visible = ref(false);
    const onConfirm = vi.fn();
    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} onConfirm={onConfirm} body="this is content"></Dialog>
    ));
    visible.value = true;
    await nextTick();

    const btn = wrapper.find('.t-dialog__footer .t-dialog__confirm');
    await nextTick();
    await btn.trigger('click');

    expect(onConfirm).toHaveBeenCalled();
  });

  it('onClose - triggers when dialog is closed', async () => {
    const visible = ref(false);
    const onClose = vi.fn();
    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} onClose={onClose} body="this is content"></Dialog>
    ));
    visible.value = true;
    await nextTick();

    const btn = wrapper.find('.t-dialog__close');
    await nextTick();
    await btn.trigger('click');

    expect(onClose).toHaveBeenCalledWith(expect.objectContaining({ trigger: 'close-btn' }));
  });

  it('onCloseBtnClick - triggers when close button is clicked', async () => {
    const visible = ref(false);
    const onCloseBtnClick = vi.fn();
    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} onCloseBtnClick={onCloseBtnClick} body="this is content"></Dialog>
    ));
    visible.value = true;
    await nextTick();

    const btn = wrapper.find('.t-dialog__close');
    await nextTick();
    await btn.trigger('click');

    expect(onCloseBtnClick).toHaveBeenCalled();
  });

  it('onEscKeydown - triggers when ESC key is pressed', async () => {
    const visible = ref(false);
    const onEscKeydown = vi.fn();
    mount(() => <Dialog v-model:visible={visible.value} onEscKeydown={onEscKeydown} body="this is content"></Dialog>);
    visible.value = true;
    await nextTick();

    const escEvent = new KeyboardEvent('keydown', {
      code: 'Escape',
    });
    Object.defineProperty(escEvent, 'target', { value: document.body }); // 保证 target 存在
    document.dispatchEvent(escEvent);

    expect(onEscKeydown).toHaveBeenCalled();
  });

  it('onOverlayClick - triggers when overlay is clicked', async () => {
    const visible = ref(true);
    const onOverlayClick = vi.fn();
    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} onOverlayClick={onOverlayClick} body="this is content"></Dialog>
    ));
    await nextTick();

    const mask = wrapper.find('.t-dialog__position');
    await mask.trigger('mousedown');
    await mask.trigger('mouseup');
    await mask.trigger('click');

    expect(onOverlayClick).toHaveBeenCalled();
  });

  it('closes dialog when cancel button is clicked', async () => {
    const visible = ref(false);
    const onClose = vi.fn();
    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} onClose={onClose} body="this is content"></Dialog>
    ));
    visible.value = true;
    await nextTick();

    const cancelBtn = wrapper.find('.t-dialog__cancel');
    await cancelBtn.trigger('click');

    expect(onClose).toHaveBeenCalledWith(expect.objectContaining({ trigger: 'cancel' }));
  });

  // it('onBeforeOpen - triggers before dialog is opened', async () => {
  //   const visible = ref(false);
  //   const onBeforeOpen = vi.fn();
  //   const wrapper = mount(() => (
  //     <Dialog
  //       v-model:visible={visible.value}
  //       onBeforeOpen={onBeforeOpen}
  //       destroyOnClose
  //       body="this is content"
  //     ></Dialog>
  //   ));
  //   visible.value = true;
  //   await nextTick(); // 确保 DOM 更新
  //   expect(onBeforeOpen).toHaveBeenCalled();
  // });

  it('onOpened - triggers after dialog is opened', async () => {
    const visible = ref(false);
    const onOpened = vi.fn();
    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} onOpened={onOpened} body="this is content"></Dialog>
    ));

    visible.value = true;
    await nextTick();

    // 模拟动画结束事件，触发 afterEnter 回调
    const transition = wrapper.findComponent({ name: 'Transition' });
    if (transition.exists()) {
      await transition.vm.$emit('after-enter');
    }

    expect(onOpened).toHaveBeenCalled();
  });

  // it('onBeforeClose - triggers before dialog is closed', async () => {
  //   const visible = ref(true);
  //   const onBeforeClose = vi.fn();
  //   const wrapper = mount(() => (
  //     <Dialog v-model:visible={visible.value} onBeforeClose={onBeforeClose} body="this is content"></Dialog>
  //   ));
  //   visible.value = false;
  //   await nextTick();
  //   expect(onBeforeClose).toHaveBeenCalled();
  // });

  // it('onClosed - triggers after dialog is closed', async () => {
  //   const visible = ref(true);
  //   const onClosed = vi.fn();
  //   const wrapper = mount(() => (
  //     <Dialog v-model:visible={visible.value} onClosed={onClosed} body="this is content"></Dialog>
  //   ));
  //   visible.value = false;
  //   await nextTick(); // 确保 DOM 更新
  //   expect(onClosed).toHaveBeenCalled();
  // });
});

describe('special scenarios', () => {
  it('handles multiple dialogs with different z-index', async () => {
    const visible1 = ref(false);
    const visible2 = ref(false);

    const wrapper1 = mount(() => <Dialog v-model:visible={visible1.value} zIndex={1000} body="dialog 1"></Dialog>);
    const wrapper2 = mount(() => <Dialog v-model:visible={visible2.value} zIndex={2000} body="dialog 2"></Dialog>);

    visible1.value = true;
    visible2.value = true;
    await nextTick();

    expect(getComputedStyle(wrapper1.find('.t-dialog__ctx').element).zIndex).toBe('1000');
    expect(getComputedStyle(wrapper2.find('.t-dialog__ctx').element).zIndex).toBe('2000');
  });

  it('handles keyboard events only for top dialog', async () => {
    const visible1 = ref(true);
    const visible2 = ref(true);
    const onEscKeydown1 = vi.fn();
    const onEscKeydown2 = vi.fn();

    const wrapper1 = mount(() => (
      <Dialog v-model:visible={visible1.value} zIndex={1000} onEscKeydown={onEscKeydown1} body="dialog 1"></Dialog>
    ));
    const wrapper2 = mount(() => (
      <Dialog v-model:visible={visible2.value} zIndex={2000} onEscKeydown={onEscKeydown2} body="dialog 2"></Dialog>
    ));

    await nextTick();

    // 修复 eventSrc 可能为 undefined 的情况
    const escEvent = new KeyboardEvent('keydown', { code: 'Escape' });
    Object.defineProperty(escEvent, 'target', { value: document.body }); // 保证 target 存在
    document.dispatchEvent(escEvent);

    // 只有顶层dialog应该响应ESC事件
    expect(onEscKeydown2).toHaveBeenCalled();
    expect(onEscKeydown1).not.toHaveBeenCalled();
  });

  it('cleans up styles when dialog closes', async () => {
    const visible = ref(true);
    const wrapper = mount(() => (
      <Dialog v-model:visible={visible.value} mode="modal" preventScrollThrough body="modal content"></Dialog>
    ));

    await nextTick();
    const initialStyleCount = document.querySelectorAll('style').length;

    visible.value = false;
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 200)); // 等待清理

    const finalStyleCount = document.querySelectorAll('style').length;
    expect(finalStyleCount).toBeLessThanOrEqual(initialStyleCount);
  });
});
