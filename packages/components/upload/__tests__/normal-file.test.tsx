import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import NormalFile from '@tdesign/components/upload/components/normal-file';
import type { TdUploadProps } from '@tdesign/components/upload/type';
import { createCommonProps } from './fixtures';

describe('UploadNormalFile', () => {
  describe('props', () => {
    it(':theme[file]', () => {
      const wrapper = mount(NormalFile, {
        props: {
          ...createCommonProps({
            displayFiles: [
              { name: 'this_is_a_long_name.txt', url: 'https://example.com/file.txt', status: 'success' },
              { name: 'waiting.txt', status: 'waiting' },
              { name: 'failed.txt', status: 'fail' },
            ],
            abridgeName: [8, 6],
          }),
          multiple: true,
        },
      });

      expect(wrapper.find('a').attributes()).toMatchObject({ href: 'https://example.com/file.txt', target: '_blank' });
      expect(wrapper.find('a').text()).toBe('this_is_…me.txt');
      expect(wrapper.find('.t-upload__file-waiting').exists()).toBe(true);
      expect(wrapper.find('.t-upload__file-fail').exists()).toBe(true);
      expect(wrapper.findAll('.t-upload__icon-delete')).toHaveLength(3);
    });

    it(':files[array] renders a link without a file name', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      const wrapper = mount(NormalFile, {
        props: {
          ...createCommonProps({ displayFiles: [{ url: 'https://example.com/unnamed' }] }),
          multiple: true,
        },
      });
      expect(wrapper.find('a').exists()).toBe(true);
      expect(wrapper.find('a').text()).toBe('');
      expect(warn).toHaveBeenCalled();
      warn.mockRestore();
    });

    it(':showUploadProgress[boolean]', () => {
      const file = { name: 'progress.txt', status: 'progress' as const };
      const visible = mount(NormalFile, {
        props: { ...createCommonProps({ displayFiles: [file], showUploadProgress: true }), multiple: false },
      });
      expect(visible.find('.t-upload__single-percent').text()).toBe('0%');

      const hidden = mount(NormalFile, {
        props: { ...createCommonProps({ displayFiles: [file], showUploadProgress: false }), multiple: false },
      });
      expect(hidden.find('.t-upload__single-percent').exists()).toBe(false);
    });

    it(':disabled[boolean]', () => {
      const wrapper = mount(NormalFile, {
        props: {
          ...createCommonProps({ displayFiles: [{ name: 'disabled.txt' }], disabled: true }),
          multiple: false,
        },
      });
      expect(wrapper.find('.t-upload__icon-delete').exists()).toBe(false);
    });

    it(':theme[file-input]', () => {
      const empty = mount(NormalFile, {
        props: {
          ...createCommonProps({ theme: 'file-input', placeholder: 'Pick file', displayFiles: [] }),
          multiple: false,
        },
      });
      expect(empty.find('.t-upload__placeholder').text()).toBe('Pick file');

      const wrapper = mount(NormalFile, {
        props: {
          ...createCommonProps({
            theme: 'file-input',
            displayFiles: [{ name: 'success.txt', status: 'success' }],
          }),
          multiple: false,
        },
      });
      expect(wrapper.find('.t-icon-check-circle-filled').exists()).toBe(true);
      expect(wrapper.find('.t-upload__single-input-clear').exists()).toBe(true);
    });

    it(':status[progress/waiting/fail]', () => {
      const getWrapper = (status: 'progress' | 'waiting' | 'fail') =>
        mount(NormalFile, {
          props: {
            ...createCommonProps({
              theme: 'file-input',
              displayFiles: [{ name: `${status}.txt`, status, percent: 20 }],
            }),
            multiple: false,
          },
        });

      expect(getWrapper('progress').find('.t-upload__single-progress').exists()).toBe(true);
      expect(getWrapper('waiting').find('.t-upload__file-waiting').exists()).toBe(true);
      expect(getWrapper('fail').find('.t-upload__file-fail').exists()).toBe(true);
    });

    it(':fileListDisplay[function/slot/null]', () => {
      const renderList: NonNullable<TdUploadProps['fileListDisplay']> = (_h, { files }) =>
        h('span', { class: 'list-function' }, files[0].name);
      const functionWrapper = mount(NormalFile, {
        props: {
          ...createCommonProps({ displayFiles: [{ name: 'function.txt' }], fileListDisplay: renderList }),
          multiple: true,
        },
      });
      expect(functionWrapper.find('.list-function').text()).toBe('function.txt');

      const slotWrapper = mount(NormalFile, {
        props: { ...createCommonProps({ displayFiles: [{ name: 'slot.txt' }] }), multiple: true },
        slots: { fileListDisplay: () => h('span', { class: 'list-slot' }, 'slot') },
      });
      expect(slotWrapper.find('.list-slot').exists()).toBe(true);

      const nullWrapper = mount(NormalFile, {
        props: {
          ...createCommonProps({
            displayFiles: [{ name: 'hidden.txt' }],
            fileListDisplay: null as unknown as TdUploadProps['fileListDisplay'],
          }),
          multiple: true,
        },
      });
      expect(nullWrapper.text()).not.toContain('hidden.txt');
    });

    it(':placeholder[string]', () => {
      const wrapper = mount(NormalFile, {
        props: { ...createCommonProps({ placeholder: 'No file selected' }), multiple: false },
      });
      expect(wrapper.find('small').text()).toBe('No file selected');
    });

    it(':autoUpload[boolean] with failed single file', () => {
      const defaultMessage = mount(NormalFile, {
        props: {
          ...createCommonProps({ displayFiles: [{ name: 'fail.txt', status: 'fail' }], autoUpload: true }),
          multiple: false,
        },
      });
      expect(defaultMessage.find('.t-upload__single-display-text').exists()).toBe(false);
      expect(defaultMessage.text()).toContain('上传失败');

      const responseMessage = mount(NormalFile, {
        props: {
          ...createCommonProps({
            displayFiles: [{ name: 'fail.txt', status: 'fail', response: { error: 'Server rejected' } }],
            autoUpload: true,
          }),
          multiple: false,
        },
      });
      expect(responseMessage.text()).toContain('Server rejected');
    });
  });

  describe('events', () => {
    it('remove', async () => {
      const onRemove = vi.fn();
      const file = { name: 'remove.txt' };
      const wrapper = mount(NormalFile, {
        props: { ...createCommonProps({ displayFiles: [file], onRemove }), multiple: false },
      });
      await wrapper.find('.t-upload__icon-delete').trigger('click');
      expect(onRemove).toHaveBeenCalledWith(expect.objectContaining({ file, index: 0 }));
    });

    it('clear input', async () => {
      const onRemove = vi.fn();
      const file = { name: 'clear.txt', status: 'success' as const };
      const wrapper = mount(NormalFile, {
        props: {
          ...createCommonProps({ theme: 'file-input', displayFiles: [file], onRemove }),
          multiple: false,
        },
      });
      await wrapper.find('.t-upload__single-input-clear').trigger('click');
      expect(onRemove).toHaveBeenCalledWith(expect.objectContaining({ file, index: 0 }));
    });
  });
});
