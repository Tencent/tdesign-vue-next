import { h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { simulateDragFileChange } from '@tdesign/internal-tests/utils';
import DraggerFile from '@tdesign/components/upload/components/dragger-file';
import type { TdUploadProps, UploadFile } from '@tdesign/components/upload/type';
import { createCommonProps } from './fixtures';

describe('UploadDraggerFile', () => {
  describe('props', () => {
    it(':displayFiles[empty]', () => {
      const wrapper = mount(DraggerFile, {
        props: { ...createCommonProps(), dragEvents: {} },
      });
      expect(wrapper.classes()).toContain('t-upload__dragger-center');
      expect(wrapper.text()).toContain('拖拽到此区域');
    });

    it(':displayFiles[success]', () => {
      const wrapper = mount(DraggerFile, {
        props: {
          ...createCommonProps({
            displayFiles: [
              { name: 'this_is_a_long_name.txt', size: 1024, status: 'success', uploadTime: '2026-08-08' },
            ],
            abridgeName: [8, 6],
          }),
          dragEvents: {},
        },
      });
      expect(wrapper.find('.t-upload__single-name').text()).toBe('this_is_…me.txt');
      expect(wrapper.find('.t-icon-check-circle-filled').exists()).toBe(true);
      expect(wrapper.text()).toContain('1.0 KB');
      expect(wrapper.text()).toContain('2026-08-08');
    });

    it(':displayFiles[fail]', () => {
      const wrapper = mount(DraggerFile, {
        props: {
          ...createCommonProps({ displayFiles: [{ name: 'fail.txt', size: 0, status: 'fail' }] }),
          dragEvents: {},
        },
      });
      expect(wrapper.classes()).toContain('t-upload__dragger-error');
      expect(wrapper.find('.t-icon-error-circle-filled').exists()).toBe(true);
      expect(wrapper.text()).toContain('：-');
    });

    it(':displayFiles[unknown status] uses the trigger content', () => {
      const wrapper = mount(DraggerFile, {
        props: {
          ...createCommonProps({
            displayFiles: [{ name: 'unknown.txt', status: 'unknown' as UploadFile['status'] }],
          }),
          dragEvents: {},
        },
      });
      expect(wrapper.find('.t-upload__trigger').exists()).toBe(true);
      expect(wrapper.find('.t-upload__dragger-progress').exists()).toBe(false);
    });

    it(':displayFiles[progress]', () => {
      const visible = mount(DraggerFile, {
        props: {
          ...createCommonProps({ displayFiles: [{ name: 'progress.txt', status: 'progress', percent: 35 }] }),
          dragEvents: {},
        },
      });
      expect(visible.find('.t-upload__single-percent').text()).toBe('35%');

      const hidden = mount(DraggerFile, {
        props: {
          ...createCommonProps({
            displayFiles: [{ name: 'progress.txt', status: 'progress', percent: 35 }],
            showUploadProgress: false,
          }),
          dragEvents: {},
        },
      });
      expect(hidden.find('.t-upload__single-percent').exists()).toBe(false);
    });

    it(':theme[image]', () => {
      const responseUrl = mount(DraggerFile, {
        props: {
          ...createCommonProps({
            theme: 'image',
            displayFiles: [
              { name: 'response.png', status: 'success', response: { url: 'https://example.com/response.png' } },
            ],
          }),
          dragEvents: {},
        },
      });
      expect(responseUrl.find('img').attributes('src')).toBe('https://example.com/response.png');

      const raw = new File(['image'], 'raw.png', { type: 'image/png' });
      const rawFile = mount(DraggerFile, {
        props: {
          ...createCommonProps({ theme: 'image', displayFiles: [{ name: 'raw.png', status: 'success', raw }] }),
          dragEvents: {},
        },
      });
      expect(rawFile.find('img').attributes('src')).toBeDefined();
    });

    it(':fileListDisplay[function/slot]', () => {
      const renderList: NonNullable<TdUploadProps['fileListDisplay']> = (_h, { files }) =>
        h('span', { class: 'list-function' }, files[0].name);
      const functionWrapper = mount(DraggerFile, {
        props: {
          ...createCommonProps({
            displayFiles: [{ name: 'function.txt', status: 'success' }],
            fileListDisplay: renderList,
          }),
          dragEvents: {},
        },
      });
      expect(functionWrapper.find('.list-function').text()).toBe('function.txt');

      const slotWrapper = mount(DraggerFile, {
        props: { ...createCommonProps(), dragEvents: {} },
        slots: { default: () => h('span', { class: 'default-slot' }, 'slot') },
      });
      expect(slotWrapper.find('.default-slot').exists()).toBe(true);
    });

    it(':trigger[function]', () => {
      const trigger: NonNullable<TdUploadProps['trigger']> = (_h, { dragActive, files }) =>
        h('span', { class: 'custom-trigger' }, `${dragActive}-${files.length}`);
      const wrapper = mount(DraggerFile, {
        props: { ...createCommonProps(), trigger, dragEvents: {} },
      });
      expect(wrapper.find('.custom-trigger').text()).toBe('false-0');
    });

    it(':autoUpload[boolean]', () => {
      const wrapper = mount(DraggerFile, {
        props: {
          ...createCommonProps({
            autoUpload: false,
            displayFiles: [{ name: 'waiting.txt', status: 'waiting' }],
          }),
          dragEvents: {},
        },
      });
      expect(wrapper.find('.t-upload__dragger-upload-btn').exists()).toBe(true);
    });

    it(':disabled[boolean]', () => {
      const wrapper = mount(DraggerFile, {
        props: {
          ...createCommonProps({ disabled: true, displayFiles: [{ name: 'success.txt', status: 'success' }] }),
          dragEvents: {},
        },
      });
      expect(wrapper.findAll('.t-upload__dragger-btns .t-button')).toHaveLength(0);
    });
  });

  describe('events', () => {
    it('dragenter/dragleave/drop', async () => {
      const onDragFileChange = vi.fn();
      const onDragenter = vi.fn();
      const onDragleave = vi.fn();
      const onDrop = vi.fn();
      const wrapper = mount(DraggerFile, {
        props: {
          ...createCommonProps(),
          dragEvents: { onDragFileChange, onDragenter, onDragleave, onDrop },
        },
      });
      const element = wrapper.element;
      simulateDragFileChange(element, 'dragEnter');
      await nextTick();
      expect(wrapper.text()).toContain('释放鼠标');
      simulateDragFileChange(element, 'dragLeave');
      simulateDragFileChange(element, 'drop');
      expect(onDragenter).toHaveBeenCalledOnce();
      expect(onDragleave).toHaveBeenCalledOnce();
      expect(onDrop).toHaveBeenCalledOnce();
      expect(onDragFileChange).toHaveBeenCalledOnce();
    });

    it('cancel upload with waiting file', async () => {
      const cancelUpload = vi.fn();
      const waitingFile = { name: 'waiting.txt', status: 'waiting' as const };
      const wrapper = mount(DraggerFile, {
        props: {
          ...createCommonProps({ displayFiles: [waitingFile], toUploadFiles: [waitingFile], files: [] }),
          dragEvents: {},
          cancelUpload,
        },
      });
      await wrapper.find('.t-upload__dragger-progress-cancel').trigger('click');
      expect(cancelUpload).toHaveBeenCalledWith(expect.objectContaining({ file: waitingFile }));
    });

    it('cancel upload falls back to uploaded file', async () => {
      const cancelUpload = vi.fn();
      const progressFile = { name: 'progress.txt', status: 'progress' as const };
      const wrapper = mount(DraggerFile, {
        props: {
          ...createCommonProps({ displayFiles: [progressFile], toUploadFiles: [], files: [progressFile] }),
          dragEvents: {},
          cancelUpload,
        },
      });
      await wrapper.find('.t-upload__dragger-progress-cancel').trigger('click');
      expect(cancelUpload).toHaveBeenCalledWith(expect.objectContaining({ file: progressFile }));
    });

    it('upload waiting file', async () => {
      const uploadFiles = vi.fn();
      const wrapper = mount(DraggerFile, {
        props: {
          ...createCommonProps({ autoUpload: false, displayFiles: [{ name: 'waiting.txt', status: 'waiting' }] }),
          dragEvents: {},
          uploadFiles,
        },
      });
      await wrapper.find('.t-upload__dragger-upload-btn').trigger('click');
      expect(uploadFiles).toHaveBeenCalledOnce();
    });

    it('reupload and remove', async () => {
      const triggerUpload = vi.fn();
      const onRemove = vi.fn();
      const file = { name: 'success.txt', status: 'success' as const };
      const wrapper = mount(DraggerFile, {
        props: {
          ...createCommonProps({ displayFiles: [file], onRemove }),
          dragEvents: {},
          triggerUpload,
        },
      });
      await wrapper.find('.t-upload__dragger-progress-cancel').trigger('click');
      await wrapper.find('.t-upload__dragger-delete-btn').trigger('click');
      expect(triggerUpload).toHaveBeenCalledOnce();
      expect(onRemove).toHaveBeenCalledWith(expect.objectContaining({ file, index: 0 }));
    });
  });
});
