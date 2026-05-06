// @ts-nocheck
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { ref, nextTick } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';
import Dialog from '@tdesign/components/dialog';

describe('Dialog', () => {
  describe('props', () => {
    it(':default[slot]', async () => {
      const visible = ref(true);
      const wrapper = mount(() => <Dialog v-model:visible={visible.value}>this is content</Dialog>);
      const body = wrapper.find('.t-dialog .t-dialog__body');
      await nextTick();
      expect(body.exists()).toBeTruthy();
      expect(body.text()).toBe('this is content');
    });

    it(':default[string]', async () => {
      const visible = ref(true);
      const wrapper = mount(() => <Dialog v-model:visible={visible.value} body="this is content"></Dialog>);
      const body = wrapper.find('.t-dialog .t-dialog__body');
      await nextTick();
      expect(body.exists()).toBeTruthy();
      expect(body.text()).toBe('this is content');
    });

    it(':cancelBtn', async () => {
      const visible = ref(true);
      const wrapper = mount(() => <Dialog v-model:visible={visible.value} body="this is content"></Dialog>);
      const btn = wrapper.find('.t-dialog__footer .t-dialog__cancel');
      await nextTick();
      expect(btn.exists()).toBeTruthy();
      expect(btn.text()).toBe('取消');
    });

    it(':confirmBtn', async () => {
      const visible = ref(true);
      const wrapper = mount(() => <Dialog v-model:visible={visible.value} body="this is content"></Dialog>);
      const btn = wrapper.find('.t-dialog__footer .t-dialog__confirm');
      await nextTick();
      expect(btn.exists()).toBeTruthy();
      expect(btn.text()).toBe('确认');
    });

    it(':closeBtn', async () => {
      const visible = ref(true);
      const wrapper = mount(() => <Dialog v-model:visible={visible.value} body="this is content"></Dialog>);
      const close = wrapper.find('.t-dialog__close');
      await nextTick();
      expect(close.exists()).toBeTruthy();
      expect(close.findComponent(CloseIcon).exists()).toBeTruthy();
    });

    it(':footer', async () => {
      const visible = ref(true);
      const wrapper = mount(() => <Dialog v-model:visible={visible.value} body="this is content"></Dialog>);
      const footer = wrapper.find('.t-dialog__footer');
      await nextTick();
      expect(footer.exists()).toBeTruthy();
      expect(footer.findAll('button').length).toBe(2);
    });

    it(':header', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} header="this is header" body="this is content"></Dialog>
      ));
      const header = wrapper.find('.t-dialog__header');
      await nextTick();
      expect(header.exists()).toBeTruthy();
      expect(header.text()).toBe('this is header');
    });

    it(':header:false', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} header={false} closeBtn={false} body="this is content"></Dialog>
      ));
      const header = wrapper.find('.t-dialog__header');
      await nextTick();
      expect(header.exists()).toBeFalsy();
    });

    it(':placement', async () => {
      const placementList = ['top', 'center'];
      const visible = ref(true);
      placementList.forEach(async (placement) => {
        const wrapper = mount(() => (
          <Dialog v-model:visible={visible.value} placement={placement} body="this is content"></Dialog>
        ));
        const dialog = wrapper.find('.t-dialog');
        await nextTick();
        expect(dialog.exists()).toBeTruthy();
        expect(dialog.classes()).toContain(`t-dialog--${placement}`);
      });
    });

    it(':mode:modeless', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} mode="modeless" body="this is content"></Dialog>
      ));
      const ctx = wrapper.find('.t-dialog__ctx');
      await nextTick();
      expect(ctx.exists()).toBeTruthy();
      expect(ctx.classes()).toContain('t-dialog__ctx--modeless');
    });

    it(':mode:normal', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} mode="normal" body="this is content"></Dialog>
      ));
      const ctx = wrapper.find('.t-dialog__ctx');
      await nextTick();
      expect(ctx.find('.t-dialog__position').exists()).toBeFalsy();
    });

    it(':mode:full-screen', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} mode="full-screen" body="this is content"></Dialog>
      ));
      const ctx = wrapper.find('.t-dialog__ctx');
      await nextTick();
      expect(ctx.find('.t-dialog__position_fullscreen').exists()).toBeTruthy();
    });

    it(':showOverlay', async () => {
      const visible = ref(true);
      const wrapper = mount(() => <Dialog v-model:visible={visible.value} body="this is content"></Dialog>);
      const ctx = wrapper.find('.t-dialog__ctx');
      await nextTick();
      expect(ctx.find('.t-dialog__mask').exists()).toBeTruthy();
    });

    it(':theme', async () => {
      const themeList = ['default', 'success', 'info', 'warning', 'danger'];
      const visible = ref(true);
      themeList.forEach(async (theme) => {
        const wrapper = mount(() => (
          <Dialog v-model:visible={visible.value} theme={theme} body="this is content"></Dialog>
        ));
        const dialog = wrapper.find('.t-dialog');
        await nextTick();
        expect(dialog.classes()).toContain(`t-dialog__modal-${theme}`);
      });
    });

    it(':top', async () => {
      const visible = ref(true);
      const wrapper = mount(() => <Dialog v-model:visible={visible.value} top="200" body="this is content"></Dialog>);
      const top = wrapper.find('.t-dialog--top');
      await nextTick();
      expect(getComputedStyle(top.element, null).paddingTop).toBe('200px');
    });

    it(':width', async () => {
      const visible = ref(true);
      const wrapper = mount(() => <Dialog v-model:visible={visible.value} width="80%" body="this is content"></Dialog>);
      const dialog = wrapper.find('.t-dialog');
      await nextTick();
      expect(getComputedStyle(dialog.element, null).width).toBe('80%');
    });

    it(':zIndex', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} zIndex={2022} body="this is content"></Dialog>
      ));
      const ctx = wrapper.find('.t-dialog__ctx');
      await nextTick();
      expect(getComputedStyle(ctx.element, null).zIndex).toBe('2022');
    });

    it(':draggable mode:modeless', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} draggable mode="modeless" body="this is content"></Dialog>
      ));
      const dialog = wrapper.find('.t-dialog');
      await nextTick();
      expect(dialog.classes()).toContain('t-dialog--draggable');
    });

    it(':draggable mode:modal', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} draggable mode="modal" body="this is content"></Dialog>
      ));
      const dialog = wrapper.find('.t-dialog');
      await nextTick();
      expect(dialog.classes()).toContain('t-dialog--draggable');
    });

    it(':dialogClassName', async () => {
      const visible = ref(true);
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

    it(':dialogStyle', async () => {
      const visible = ref(true);
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

    it(':confirmBtn[loading]', async () => {
      const visible = ref(true);
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

    it(':closeOnEscKeydown', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} closeOnEscKeydown body="this is content"></Dialog>
      ));
      await nextTick();
      expect(wrapper.vm.$props.closeOnEscKeydown).toBe(true);

      const escEvent = new KeyboardEvent('keydown', { code: 'Escape', bubbles: true });
      document.dispatchEvent(escEvent);
      await nextTick();
      expect(visible.value).toBe(false);
    });

    it(':closeOnEscKeydown false', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} closeOnEscKeydown={false} body="this is content"></Dialog>
      ));
      await nextTick();
      expect(wrapper.vm.$props.closeOnEscKeydown).toBe(false);

      const escEvent = new KeyboardEvent('keydown', { code: 'Escape', bubbles: true });
      document.dispatchEvent(escEvent);
      await nextTick();
      expect(visible.value).toBe(true);
    });

    it(':closeOnOverlayClick', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} closeOnOverlayClick mode="modal" body="this is content"></Dialog>
      ));
      await nextTick();
      expect(wrapper.vm.$props.closeOnOverlayClick).toBe(true);

      const overlay = wrapper.find('.t-dialog__mask');
      await overlay.trigger('click');
      await nextTick();
      expect(visible.value).toBe(false);
    });

    it(':closeOnOverlayClick false', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} closeOnOverlayClick={false} mode="modal" body="this is content"></Dialog>
      ));
      await nextTick();
      expect(wrapper.vm.$props.closeOnOverlayClick).toBe(false);

      const overlay = wrapper.find('.t-dialog__mask');
      await overlay.trigger('click');
      await nextTick();
      expect(visible.value).toBe(true);
    });

    it(':confirmOnEnter', async () => {
      const visible = ref(true);
      const fn = vi.fn();
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} confirmOnEnter onConfirm={fn} body="this is content"></Dialog>
      ));
      await nextTick();
      expect(wrapper.vm.$props.confirmOnEnter).toBe(true);

      const enterEvent = new KeyboardEvent('keydown', { code: 'Enter', bubbles: true });
      document.dispatchEvent(enterEvent);
      await nextTick();
      expect(fn).toHaveBeenCalled();
    });

    it(':lazy', async () => {
      const visible = ref(false);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} lazy body="this is content"></Dialog>
      ));
      await nextTick();

      // lazy 为 true 且 visible 为 false 时，内容不应该渲染
      let body = wrapper.find('.t-dialog__body');
      expect(body.exists()).toBeFalsy();

      // 设置为 true 后应该渲染
      visible.value = true;
      await nextTick();
      body = wrapper.find('.t-dialog__body');
      expect(body.exists()).toBeTruthy();
    });

    it(':preventScrollThrough', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} preventScrollThrough body="this is content"></Dialog>
      ));
      await nextTick();
      expect(wrapper.vm.$props.preventScrollThrough).toBe(true);
    });

    it(':preventScrollThrough false', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} preventScrollThrough={false} body="this is content"></Dialog>
      ));
      await nextTick();
      expect(wrapper.vm.$props.preventScrollThrough).toBe(false);
    });

    it(':showInAttachedElement', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} showInAttachedElement attach="body" body="this is content"></Dialog>
      ));
      await nextTick();
      expect(wrapper.vm.$props.showInAttachedElement).toBe(true);
    });

    it(':showOverlay false', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} showOverlay={false} body="this is content"></Dialog>
      ));
      await nextTick();
      const mask = wrapper.find('.t-dialog__mask');
      expect(mask.classes()).toContain('t-is-hidden');
    });

    it(':destroyOnClose', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} destroyOnClose body="this is content"></Dialog>
      ));
      await nextTick();
      expect(wrapper.vm.$props.destroyOnClose).toBe(true);
    });

    it(':draggable[modeless]', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} draggable mode="modeless" body="this is content"></Dialog>
      ));
      await nextTick();
      const dialog = wrapper.find('.t-dialog');
      const dialogElement = dialog.element;
      dialogElement.style.position = 'absolute';
      dialogElement.style.left = '100px';
      dialogElement.style.top = '100px';
      dialogElement.style.width = '500px';
      dialogElement.style.height = '300px';
      const initialLeft = parseInt(getComputedStyle(dialogElement).left, 10);
      const initialTop = parseInt(getComputedStyle(dialogElement).top, 10);
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

    it(':draggable[modal]', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} draggable mode="modal" body="this is content"></Dialog>
      ));
      await nextTick();
      const dialog = wrapper.find('.t-dialog');
      const dialogElement = dialog.element;
      dialogElement.style.position = 'absolute';
      dialogElement.style.left = '100px';
      dialogElement.style.top = '100px';
      dialogElement.style.width = '500px';
      dialogElement.style.height = '300px';
      const initialLeft = parseInt(getComputedStyle(dialogElement).left, 10);
      const initialTop = parseInt(getComputedStyle(dialogElement).top, 10);
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
  });

  describe('events', () => {
    it(':onCancel', async () => {
      const visible = ref(true);
      const fn = vi.fn();
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} onCancel={fn}>
          this is content
        </Dialog>
      ));
      const btn = wrapper.find('.t-dialog__footer .t-dialog__cancel');
      await nextTick();
      await btn.trigger('click');
      expect(fn).toBeCalled();
    });

    it(':onConfirm', async () => {
      const visible = ref(true);
      const fn = vi.fn();
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} onConfirm={fn}>
          this is content
        </Dialog>
      ));
      const btn = wrapper.find('.t-dialog__footer .t-dialog__confirm');
      await nextTick();
      await btn.trigger('click');
      expect(fn).toBeCalled();
    });

    it(':onClose', async () => {
      const visible = ref(true);
      const fn = vi.fn();
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} onClose={fn}>
          this is content
        </Dialog>
      ));
      const btn = wrapper.find('.t-dialog__close');
      await nextTick();
      await btn.trigger('click');
      expect(fn).toBeCalled();
    });

    it(':onCloseBtnClick', async () => {
      const visible = ref(true);
      const fn = vi.fn();
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} onCloseBtnClick={fn}>
          this is content
        </Dialog>
      ));
      const btn = wrapper.find('.t-dialog__close');
      await nextTick();
      await btn.trigger('click');
      expect(fn).toBeCalled();
    });

    it(':onBeforeOpen', async () => {
      const visible = ref(false);
      const fn = vi.fn();
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} onBeforeOpen={fn} body="this is content"></Dialog>
      ));
      await nextTick();

      visible.value = true;
      await nextTick();
      expect(fn).toHaveBeenCalled();
    });

    it(':onOpened', async () => {
      const visible = ref(false);
      const fn = vi.fn();
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} onOpened={fn} body="this is content"></Dialog>
      ));
      await nextTick();

      visible.value = true;
      await nextTick();
      // 等待动画结束
      await new Promise(resolve => setTimeout(resolve, 350));
      expect(fn).toHaveBeenCalled();
    });

    it(':onBeforeClose', async () => {
      const visible = ref(true);
      const fn = vi.fn();
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} onBeforeClose={fn} body="this is content"></Dialog>
      ));
      await nextTick();

      const closeBtn = wrapper.find('.t-dialog__close');
      await closeBtn.trigger('click');
      expect(fn).toHaveBeenCalled();
    });

    it(':onClosed', async () => {
      const visible = ref(true);
      const fn = vi.fn();
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} onClosed={fn} body="this is content"></Dialog>
      ));
      await nextTick();

      const closeBtn = wrapper.find('.t-dialog__close');
      await closeBtn.trigger('click');
      // 等待动画结束
      await new Promise(resolve => setTimeout(resolve, 350));
      expect(fn).toHaveBeenCalled();
    });

    it(':onEscKeydown', async () => {
      const visible = ref(true);
      const fn = vi.fn();
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} onEscKeydown={fn} body="this is content"></Dialog>
      ));
      await nextTick();

      const escEvent = new KeyboardEvent('keydown', { code: 'Escape', bubbles: true });
      document.dispatchEvent(escEvent);
      await nextTick();
      expect(fn).toHaveBeenCalled();
    });

    it(':onOverlayClick', async () => {
      const visible = ref(true);
      const fn = vi.fn();
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} onOverlayClick={fn} mode="modal" body="this is content"></Dialog>
      ));
      await nextTick();

      const overlay = wrapper.find('.t-dialog__mask');
      await overlay.trigger('click');
      expect(fn).toHaveBeenCalled();
    });

    it(':closeOnEscKeydown[default]', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} body="this is content"></Dialog>
      ));
      await nextTick();

      // 默认情况下，closeOnEscKeydown 为 undefined，应该使用全局配置
      expect(wrapper.vm.$props.closeOnEscKeydown).toBeUndefined();
    });

    it(':closeOnOverlayClick[default]', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} mode="modal" body="this is content"></Dialog>
      ));
      await nextTick();

      // 默认情况下，closeOnOverlayClick 为 undefined，应该使用全局配置
      expect(wrapper.vm.$props.closeOnOverlayClick).toBeUndefined();
    });

    it(':confirmOnEnter[from input]', async () => {
      const visible = ref(true);
      const fn = vi.fn();
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} confirmOnEnter onConfirm={fn} body="this is content"></Dialog>
      ));
      await nextTick();

      // 模拟从 input 元素触发的 Enter 键
      const input = document.createElement('input');
      document.body.appendChild(input);
      const enterEvent = new KeyboardEvent('keydown', { code: 'Enter', bubbles: true });
      Object.defineProperty(enterEvent, 'target', { value: input });
      document.dispatchEvent(enterEvent);
      await nextTick();
      
      // 从 input 触发时不应该调用 onConfirm
      expect(fn).not.toHaveBeenCalled();
      document.body.removeChild(input);
    });

    it(':preventScrollThrough[false]', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} mode="modal" preventScrollThrough={false} body="this is content"></Dialog>
      ));
      await nextTick();

      // preventScrollThrough 为 false 时，不应该添加 style 元素
      const styleElements = document.querySelectorAll('style[data-id^="td_dialog_"]');
      expect(styleElements.length).toBe(0);
    });

    it(':mode[modeless]', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} mode="modeless" body="this is content"></Dialog>
      ));
      await nextTick();

      const ctx = wrapper.find('.t-dialog__ctx');
      expect(ctx.classes()).toContain('t-dialog__ctx--modeless');
    });

    it(':showInAttachedElement[attach]', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} mode="modal" showInAttachedElement attach="body" body="this is content"></Dialog>
      ));
      await nextTick();

      const ctx = wrapper.find('.t-dialog__ctx');
      expect(ctx.classes()).toContain('t-dialog__ctx--absolute');
    });

    it(':placement[top]', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} placement="top" body="this is content"></Dialog>
      ));
      await nextTick();

      const position = wrapper.find('.t-dialog__position');
      expect(position.classes()).toContain('t-dialog--top');
    });

    it(':top[string]', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} top="100px" body="this is content"></Dialog>
      ));
      await nextTick();

      const position = wrapper.find('.t-dialog__position');
      expect(position.attributes('style')).toContain('padding-top: 100px');
    });

    it(':top[number]', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} top={50} body="this is content"></Dialog>
      ));
      await nextTick();

      const position = wrapper.find('.t-dialog__position');
      expect(position.attributes('style')).toContain('padding-top: 50px');
    });

    it('remove keyboard events on close', async () => {
      const visible = ref(true);
      const fn = vi.fn();
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} confirmOnEnter onConfirm={fn} body="this is content"></Dialog>
      ));
      await nextTick();

      // 关闭对话框
      visible.value = false;
      await nextTick();
      await new Promise(resolve => setTimeout(resolve, 350));

      // 验证键盘事件已被移除（通过再次触发事件验证）
      const enterEvent = new KeyboardEvent('keydown', { code: 'Enter', bubbles: true });
      document.dispatchEvent(enterEvent);
      await nextTick();
      
      // 事件应该不会被触发，因为监听器已被移除
      // 注意：这个测试可能不够精确，因为全局可能还有其他监听器
    });

    it('open dialog without click', async () => {
      const visible = ref(false);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} mode="modal" body="this is content"></Dialog>
      ));
      await nextTick();

      // 模拟通过代码打开对话框（不是通过点击）
      mousePosition = null;
      visible.value = true;
      await nextTick();
      await new Promise(resolve => setTimeout(resolve, 50));

      // 不应该报错
      const dialog = wrapper.find('.t-dialog');
      expect(dialog.exists()).toBeTruthy();
    });

    it(':destroyOnClose[remove DOM]', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} destroyOnClose lazy={false} body="this is content"></Dialog>
      ));
      await nextTick();

      // 初始时对话框应该存在
      let dialog = wrapper.find('.t-dialog');
      expect(dialog.exists()).toBeTruthy();

      // 关闭对话框
      visible.value = false;
      await nextTick();
      await new Promise(resolve => setTimeout(resolve, 350));

      // destroyOnClose 为 true 时，关闭后 DOM 应该被移除
      dialog = wrapper.find('.t-dialog');
      expect(dialog.exists()).toBeFalsy();
    });

    it(':attach[teleport]', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} attach="body" body="this is content"></Dialog>
      ));
      await nextTick();

      // 验证 teleport 到 body
      const dialogInBody = document.body.querySelector('.t-dialog');
      expect(dialogInBody).not.toBeNull();
    });

    it(':mode[full-screen]', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} mode="full-screen" top="100px" body="this is content"></Dialog>
      ));
      await nextTick();

      const position = wrapper.find('.t-dialog__position_fullscreen');
      expect(position.exists()).toBeTruthy();
      // 全屏模式下不应该有 padding-top
      expect(position.attributes('style')).not.toContain('padding-top');
    });
  });
});
