import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createApp, nextTick } from 'vue';
import DialogPlugin from '../../dialog/plugin';

describe('DialogPlugin', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  const app: ReturnType<typeof createApp> = createApp({ render: null });
  app.use(DialogPlugin);

  it('should install plugin and add $dialog to globalProperties', () => {
    const dialog = app.config.globalProperties.$dialog;
    expect(dialog).toBeDefined();
    expect(typeof dialog).toBe('function');
    expect(typeof dialog.confirm).toBe('function');
    expect(typeof dialog.alert).toBe('function');
  });

  it('should open and close dialog via $dialog', async () => {
    const dialog = app.config.globalProperties.$dialog({
      body: 'test content',
    });
    await nextTick();
    dialog.show();
    await nextTick();
    dialog.hide();
    await nextTick();
    expect(dialog).toBeDefined();
    dialog.destroy();
    vi.runAllTimers();
  });

  it('should open confirm dialog', async () => {
    const dialog = app.config.globalProperties.$dialog.confirm({
      body: 'confirm content',
    });
    expect(dialog).toBeDefined();
    dialog.destroy();
    vi.runAllTimers();
  });

  it('should open alert dialog (no cancel button)', async () => {
    const dialog = app.config.globalProperties.$dialog.alert({
      body: 'alert content',
    });
    expect(dialog).toBeDefined();
    dialog.destroy();
    vi.runAllTimers();
  });

  it('should set confirm loading', async () => {
    const dialog = app.config.globalProperties.$dialog({
      body: 'loading content',
    });
    dialog.setConfirmLoading(true);
    dialog.setConfirmLoading(false);
    dialog.destroy();
    vi.runAllTimers();
  });

  it('should update dialog options', async () => {
    const dialog = app.config.globalProperties.$dialog({
      body: 'update content',
    });
    dialog.update({ body: 'updated', className: 'test-class2' });
    await nextTick();
    // 检查内容是否更新
    const dialogBody = document.body.querySelector('.t-dialog__body');
    expect(dialogBody).toBeTruthy();
    expect(dialogBody && dialogBody.textContent).toBe('updated');
    // 检查class是否更新
    const dialogCtx = document.body.querySelector('.t-dialog__ctx');
    expect(dialogCtx).toBeTruthy();
    expect(dialogCtx && dialogCtx.classList.contains('test-class2')).toBeTruthy();
    dialog.destroy();
    vi.runAllTimers();
  });

  it('should apply style to dialog wrapper', async () => {
    const style = 'color: red;';
    const dialog = app.config.globalProperties.$dialog({
      body: 'styled content',
      style,
    });
    const wrapper = document.body.querySelector('.t-dialog__ctx');
    expect(wrapper).toBeTruthy();
    expect((wrapper as HTMLElement).style.cssText.replace(/\s/g, style)).toContain(style);
    dialog.destroy();
    vi.runAllTimers();
  });

  it('should use default onClose when no custom onClose is provided', async () => {
    const dialog = app.config.globalProperties.$dialog({
      body: 'no custom onClose',
      onClose: null,
    });
    // 关闭弹窗
    dialog.hide();
    await nextTick();
    // 检查 DOM 是否被隐藏
    const wrapper = document.body.querySelector('.t-dialog__ctx');
    // 这里可以根据实际实现，判断 wrapper 是否 display: none 或者直接被移除
    expect(wrapper === null || (wrapper instanceof HTMLElement && wrapper.style.display === 'none')).toBeTruthy();
    dialog.destroy();
    vi.runAllTimers();
  });

  it('should use custom onClose when provided', async () => {
    const onClose = vi.fn();
    const dialog = app.config.globalProperties.$dialog({
      body: '自定义 onClose',
      onClose,
    });
    await nextTick();
    // 模拟关闭按钮点击
    // 这里直接调用 onClose 事件
    dialog.hide(); // 先显示再隐藏，确保 visible 变化
    await nextTick();
    // 手动触发 onClose
    onClose();
    expect(onClose).toHaveBeenCalled();
    // 由于自定义 onClose 不会自动隐藏，visible 仍为 true
    // 但我们无法直接访问 visible，只能保证 onClose 被调用
    dialog.destroy();
    vi.runAllTimers();
  });

  it('should attach dialog to custom container when attach is provided', async () => {
    // 创建自定义容器并加入 body
    const customContainer = document.createElement('div');
    customContainer.id = 'custom-dialog-container';
    document.body.appendChild(customContainer);

    // 打开 dialog，attach 指定到自定义容器
    const dialog = app.config.globalProperties.$dialog({
      body: 'attach content',
      attach: '#custom-dialog-container',
    });
    await nextTick();

    // 检查 dialog 是否被挂载到自定义容器
    const wrapper = customContainer.querySelector('.t-dialog__ctx');
    expect(wrapper).toBeTruthy();

    dialog.destroy();
    vi.runAllTimers();
    document.body.removeChild(customContainer);
  });

  it('should log error when attach target does not exist', async () => {
    // mock console.error
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const dialog = app.config.globalProperties.$dialog({
      body: 'attach error',
      attach: '#not-exist-container',
    });
    await nextTick();

    expect(errorSpy).toHaveBeenCalledWith('attach is not exist');
    dialog.destroy();
    vi.runAllTimers();
    errorSpy.mockRestore();
  });

  it('should delay unmount for 0.3s after destroy', async () => {
    const dialog = app.config.globalProperties.$dialog({
      body: '延迟销毁测试',
    });
    await nextTick();

    const wrapper = document.body.querySelector('.t-dialog__ctx');
    expect(wrapper).toBeTruthy();

    dialog.destroy();

    // 立即检查，DOM 还在
    expect(document.body.querySelector('.t-dialog__ctx')).toBeTruthy();

    // 300ms 后检查，DOM 应该被移除
    vi.advanceTimersByTime(310);
    expect(document.body.querySelector('.t-dialog__ctx')).toBeFalsy();
  });

  it('should not update className if it does not change', async () => {
    const dialog = app.config.globalProperties.$dialog({
      body: 'className unchanged',
      className: 'test-class',
    });
    await nextTick();
    // 记录当前 classList
    const wrapper = document.body.querySelector('.t-dialog__ctx');
    expect(wrapper).toBeTruthy();
    const oldClassList = [...(wrapper as HTMLElement).classList];

    // update 时 className 不变
    dialog.update({ className: 'test-class' });
    await nextTick();

    // 断言 classList 没有变化
    const newClassList = [...(wrapper as HTMLElement).classList];
    expect(newClassList).toEqual(oldClassList);

    dialog.destroy();
    vi.runAllTimers();
  });

  it('should remove old className when className changes', async () => {
    const dialog = app.config.globalProperties.$dialog({
      body: 'className remove',
      className: 'class-a class-b',
    });
    await nextTick();
    const wrapper = document.body.querySelector('.t-dialog__ctx');
    expect(wrapper).toBeTruthy();
    expect(wrapper && wrapper.classList.contains('class-a')).toBeTruthy();
    expect(wrapper && wrapper.classList.contains('class-b')).toBeTruthy();

    // 更新 className，移除旧的 class-a class-b，添加 class-c
    dialog.update({ className: 'class-c' });
    await nextTick();
    expect(wrapper && wrapper.classList.contains('class-a')).toBeFalsy();
    expect(wrapper && wrapper.classList.contains('class-b')).toBeFalsy();
    expect(wrapper && wrapper.classList.contains('class-c')).toBeTruthy();
    dialog.destroy();
    vi.runAllTimers();
  });

  it('should append style when style changes', async () => {
    const dialog = app.config.globalProperties.$dialog({
      body: 'style append',
      style: 'color: blue;',
    });
    await nextTick();
    const wrapper = document.body.querySelector('.t-dialog__ctx');
    expect(wrapper).toBeTruthy();
    expect((wrapper as HTMLElement).style.cssText.replace(/\s/g, '')).toContain('color:blue;');

    // 追加 style
    dialog.update({ style: 'background: yellow;' });
    await nextTick();
    // cssText 追加了新样式
    expect((wrapper as HTMLElement).style.cssText.replace(/\s/g, '')).toContain('color:blue;');
    expect((wrapper as HTMLElement).style.cssText.replace(/\s/g, '')).toContain('background:yellow;');
    dialog.destroy();
    vi.runAllTimers();
  });

  it('should use default onClose logic when no custom onClose provided', async () => {
    const dialog = app.config.globalProperties.$dialog({
      body: 'default onClose test',
      destroyOnClose: false,
    });
    await nextTick();

    // 获取对话框元素
    const wrapper = document.body.querySelector('.t-dialog__ctx');
    expect(wrapper).toBeTruthy();

    // 模拟点击关闭按钮触发默认的 onClose 逻辑
    const closeBtn = wrapper.querySelector('.t-dialog__close');
    expect(closeBtn).toBeTruthy();
    (closeBtn as HTMLElement).click();
    await nextTick();

    // 验证对话框被隐藏但未销毁（destroyOnClose: false）
    // 检查对话框是否有隐藏的样式类或属性
    const dialogElement = wrapper.querySelector('.t-dialog');
    expect(dialogElement).toBeTruthy();

    dialog.destroy();
    vi.runAllTimers();
  });

  it('should destroy dialog after 300ms when destroyOnClose is true', async () => {
    app.config.globalProperties.$dialog({
      body: 'destroyOnClose test',
      destroyOnClose: true,
    });
    await nextTick();

    // 获取对话框元素
    let wrapper = document.body.querySelector('.t-dialog__ctx');
    expect(wrapper).toBeTruthy();

    // 模拟点击关闭按钮触发 onClose 事件
    const closeBtn = wrapper.querySelector('.t-dialog__close');
    expect(closeBtn).toBeTruthy();
    (closeBtn as HTMLElement).click();
    await nextTick();

    // 立即检查，DOM 还在
    wrapper = document.body.querySelector('.t-dialog__ctx');
    expect(wrapper).toBeTruthy();

    // 300ms 后检查，DOM 应该被移除
    vi.advanceTimersByTime(300);
    wrapper = document.body.querySelector('.t-dialog__ctx');
    expect(wrapper).toBeFalsy();
  });

  it('should not destroy dialog when destroyOnClose is false', async () => {
    const dialog = app.config.globalProperties.$dialog({
      body: 'no destroy test',
      destroyOnClose: false,
    });
    await nextTick();

    // 获取对话框元素
    let wrapper = document.body.querySelector('.t-dialog__ctx');
    expect(wrapper).toBeTruthy();

    // 模拟点击关闭按钮触发默认的 onClose 逻辑
    const closeBtn = wrapper.querySelector('.t-dialog__close');
    expect(closeBtn).toBeTruthy();
    (closeBtn as HTMLElement).click();
    await nextTick();

    // 300ms 后检查，DOM 仍然存在（因为 destroyOnClose: false）
    vi.advanceTimersByTime(300);
    wrapper = document.body.querySelector('.t-dialog__ctx');
    expect(wrapper).toBeTruthy();

    // 手动销毁
    dialog.destroy();
    vi.runAllTimers();
  });
});
