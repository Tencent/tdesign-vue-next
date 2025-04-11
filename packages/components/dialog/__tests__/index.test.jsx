/* eslint-disable @typescript-eslint/no-empty-function */
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { ref, nextTick } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';
import Dialog from '../index';

describe('Dialog', () => {
  describe(':props', () => {
    it('', async () => {
      const visible = ref(true);
      const wrapper = mount(() => <Dialog v-model:visible={visible.value}>this is content</Dialog>);
      const body = wrapper.find('.t-dialog .t-dialog__body');
      await nextTick();
      expect(body.exists()).toBeTruthy();
      expect(body.text()).toBe('this is content');
    });

    it('default', async () => {
      const visible = ref(true);
      const wrapper = mount(() => <Dialog v-model:visible={visible.value}>this is content</Dialog>);
      const body = wrapper.find('.t-dialog .t-dialog__body');
      await nextTick();
      expect(body.exists()).toBeTruthy();
      expect(body.text()).toBe('this is content');
    });

    it('default', async () => {
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

    it(':draggable', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} draggable mode="modeless" body="this is content"></Dialog>
      ));
      const dialog = wrapper.find('.t-dialog');
      await nextTick();
      expect(dialog.classes()).toContain('t-dialog--draggable');
    });

    it(':draggable', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <Dialog v-model:visible={visible.value} draggable mode="modeless" body="this is content"></Dialog>
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

    it('update dialog confirmBtnLoading', async () => {
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

    it('drag dialog', async () => {
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
  });

  describe(':events', () => {
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
  });
});
