/* eslint-disable @typescript-eslint/no-empty-function */
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { ref, nextTick } from 'vue';
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

    it('attach', async () => {
      const visible = ref(true);
      const wrapper = mount(() => (
        <div>
          <div id="attach"></div>
          <Dialog v-model:visible={visible.value} attach="#content">
            this is content
          </Dialog>
        </div>
      ));
      await nextTick();
      const dialog = wrapper.find('.t-dialog__ctx');
      expect(dialog.exists()).toBeTruthy();
      expect(dialog.element.parentNode).toEqual(document.getElementById('content'));
    });
  });
});
