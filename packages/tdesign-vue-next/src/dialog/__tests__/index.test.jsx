/* eslint-disable @typescript-eslint/no-empty-function */
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { nextTick, ref } from '@td/adapter-vue';
import { CloseIcon } from 'tdesign-icons-vue-next';
import { Dialog } from 'tdesign-vue-next';

describe('dialog', () => {
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
