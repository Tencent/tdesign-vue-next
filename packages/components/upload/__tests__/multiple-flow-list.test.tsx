import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { ImageViewer } from '@tdesign/components/image-viewer';
import MultipleFlowList from '@tdesign/components/upload/components/multiple-flow-list';
import type { UploadDragEvents } from '@tdesign/components/upload/hooks/useDrag';
import type { TdUploadProps, UploadFile } from '@tdesign/components/upload/type';
import { simulateDragFileChange } from '@tdesign/internal-tests/utils';
import { createCommonProps } from './fixtures';

type FlowProps = ReturnType<typeof createCommonProps> & {
  showThumbnail?: boolean;
  uploadFiles?: (files?: UploadFile[]) => void;
  cancelUpload?: (context: { e: MouseEvent; file?: UploadFile }) => void;
  dragEvents: UploadDragEvents;
  isBatchUpload?: boolean;
  draggable?: boolean;
  showImageFileName?: boolean;
  uploadButton?: TdUploadProps['uploadButton'];
  cancelUploadButton?: TdUploadProps['cancelUploadButton'];
  onPreview?: TdUploadProps['onPreview'];
};

const mountFlow = (overrides: Partial<FlowProps> = {}, slots?: Record<string, () => unknown>) =>
  mount(MultipleFlowList, {
    props: {
      ...createCommonProps({ theme: 'file-flow' }),
      dragEvents: {},
      showImageFileName: true,
      ...overrides,
    } as never,
    slots,
  });

describe('UploadMultipleFlowList', () => {
  afterEach(() => document.querySelectorAll('.t-image-viewer').forEach((node) => node.remove()));

  describe('props', () => {
    it(':theme[file-flow] with empty list', () => {
      const wrapper = mountFlow({ placeholder: 'Flow placeholder' });
      expect(wrapper.find('.t-upload__flow-empty').text()).toContain('点击上方');
      expect(wrapper.find('.t-upload__flow-placeholder').text()).toBe('Flow placeholder');
    });

    it(':displayFiles[array] for file statuses', () => {
      const wrapper = mountFlow({
        displayFiles: [
          { name: 'success.txt', size: 1024, status: 'success', url: 'https://example.com/success.txt' },
          { name: 'waiting.txt', size: 20, status: 'waiting' },
          { name: 'progress.txt', size: 30, status: 'progress', percent: 45 },
          { name: 'fail.txt', size: 40, status: 'fail', response: { error: 'Rejected' } },
        ],
      });

      expect(wrapper.findAll('tbody tr')).toHaveLength(4);
      expect(wrapper.find('a').attributes('href')).toBe('https://example.com/success.txt');
      expect(wrapper.text()).toContain('上传成功');
      expect(wrapper.text()).toContain('待上传');
      expect(wrapper.text()).toContain('上传中 45%');
      expect(wrapper.text()).toContain('Rejected');
      expect(wrapper.findAll('.t-upload__delete')).toHaveLength(4);
    });

    it(':showUploadProgress[boolean]', () => {
      const file = { name: 'progress.txt', status: 'progress' as const };
      expect(mountFlow({ displayFiles: [file], showUploadProgress: true }).text()).toContain('0%');
      expect(mountFlow({ displayFiles: [file], showUploadProgress: false }).text()).not.toContain('0%');
    });

    it(':abridgeName[array]', () => {
      const wrapper = mountFlow({
        displayFiles: [{ name: 'this_is_a_long_name.txt', size: 10, status: 'success' }],
        abridgeName: [8, 6],
      });
      expect(wrapper.find('.t-upload__file-name').text()).toBe('this_is_…me.txt');
    });

    it(':isBatchUpload[boolean]', () => {
      const wrapper = mountFlow({
        isBatchUpload: true,
        displayFiles: [
          { name: 'one.txt', status: 'success' },
          { name: 'two.txt', status: 'success' },
        ],
      });
      expect(wrapper.findAll('.t-upload__flow-table__batch-row')).toHaveLength(1);
      expect(wrapper.find('.t-upload__flow-table__batch-row').attributes('rowspan')).toBe('2');

      const waiting = mountFlow({
        isBatchUpload: true,
        displayFiles: [{ name: 'waiting.txt', status: 'waiting' }],
      });
      expect(waiting.find('.t-upload__flow-table__batch-row').exists()).toBe(false);
    });

    it(':disabled[boolean]', () => {
      const wrapper = mountFlow({ disabled: true, displayFiles: [{ name: 'disabled.txt', status: 'success' }] });
      expect(wrapper.findAll('th')).toHaveLength(3);
      expect(wrapper.find('.t-upload__delete').exists()).toBe(false);
    });

    it(':theme[image-flow]', () => {
      const wrapper = mountFlow({
        theme: 'image-flow',
        displayFiles: [
          { name: 'success.png', status: 'success', url: 'https://example.com/success.png' },
          { name: 'waiting.png', status: 'waiting', raw: new File(['waiting'], 'waiting.png') },
          { name: 'progress.png', status: 'progress', percent: 25 },
          { name: 'fail.png', status: 'fail', response: { error: 'Bad image' } },
        ],
      });

      expect(wrapper.findAll('.t-upload__card-item')).toHaveLength(4);
      expect(wrapper.findAll('.t-upload__card-image')).toHaveLength(2);
      expect(wrapper.text()).toContain('上传中 25%');
      expect(wrapper.text()).toContain('Bad image');
      expect(wrapper.findAll('.t-upload__card-name')).toHaveLength(4);
    });

    it(':theme[image-flow] covers unnamed, default-status, and abridged files', () => {
      const wrapper = mountFlow({
        theme: 'image-flow',
        abridgeName: [4, 4],
        displayFiles: [
          { name: 'this_is_a_long_name.png', status: 'fail' },
          { url: 'https://example.com/no-status.png' },
          {},
        ],
      });
      expect(wrapper.text()).toContain('this….png');
      expect(wrapper.text()).toContain('上传失败');
      expect(wrapper.findAll('.t-upload__card-image')).toHaveLength(1);
      expect(wrapper.findAll('.t-upload__card-item')).toHaveLength(3);
    });

    it(':showImageFileName[boolean]', () => {
      const wrapper = mountFlow({
        theme: 'image-flow',
        showImageFileName: false,
        displayFiles: [{ name: 'hidden.png', status: 'success', url: 'https://example.com/hidden.png' }],
      });
      expect(wrapper.find('.t-upload__card-name').exists()).toBe(false);
    });

    it(':showThumbnail[boolean] for image and document types', () => {
      const makeRaw = (name: string, type: string) => new File(['content'], name, { type });
      const files: UploadFile[] = [
        ['image.png', 'image/png'],
        ['document.pdf', 'application/pdf'],
        ['sheet.xls', 'application/.xlsx'],
        ['document.doc', 'application/msword'],
        ['slides.ppt', 'application/.ppt'],
        ['movie.mp4', 'video/mp4'],
        ['plain.txt', 'text/plain'],
      ].map(([name, type]) => ({ name, raw: makeRaw(name, type), status: 'success', size: 10 }));
      files.push({ name: 'remote.txt', url: 'https://example.com/remote.txt', status: 'success', size: 10 });

      const wrapper = mountFlow({ showThumbnail: true, displayFiles: files });
      expect(wrapper.findAll('.t-upload__file-thumbnail')).toHaveLength(7);
      expect(wrapper.find('.t-upload__file-thumbnail img').exists()).toBe(true);
      expect(wrapper.findAll('.t-upload__file-thumbnail svg')).toHaveLength(7);
    });

    it(':fileListDisplay[function/null]', () => {
      const renderList: NonNullable<TdUploadProps['fileListDisplay']> = (_h, { files }) =>
        h('span', { class: 'custom-list' }, files[0].name);
      const custom = mountFlow({ displayFiles: [{ name: 'custom.txt' }], fileListDisplay: renderList });
      expect(custom.find('.custom-list').text()).toBe('custom.txt');
      expect(custom.find('table').exists()).toBe(false);

      const renderNothing: NonNullable<TdUploadProps['fileListDisplay']> = () => null;
      const hidden = mountFlow({ displayFiles: [{ name: 'hidden.txt' }], fileListDisplay: renderNothing });
      expect(hidden.find('table').exists()).toBe(false);
    });

    it(':fileListDisplay[function] for image-flow', () => {
      const renderList: NonNullable<TdUploadProps['fileListDisplay']> = (_h, { files }) =>
        h('span', { class: 'custom-image-list' }, files[0].name);
      const wrapper = mountFlow({
        theme: 'image-flow',
        displayFiles: [{ name: 'custom-image.png' }],
        fileListDisplay: renderList,
      });
      expect(wrapper.find('.custom-image-list').text()).toBe('custom-image.png');
      expect(wrapper.find('.t-upload__card').exists()).toBe(false);
    });

    it(':draggable[boolean]', () => {
      const enabledChange = vi.fn();
      const draggable = mountFlow({ draggable: undefined, dragEvents: { onDragFileChange: enabledChange } });
      simulateDragFileChange(draggable.find('.t-upload__flow-card-area').element, 'drop');
      expect(enabledChange).toHaveBeenCalledOnce();

      const disabledChange = vi.fn();
      const fixed = mountFlow({ draggable: false, dragEvents: { onDragFileChange: disabledChange } });
      simulateDragFileChange(fixed.find('.t-upload__flow-card-area').element, 'drop');
      expect(disabledChange).not.toHaveBeenCalled();
    });

    it(':uploadButton[object] + :cancelUploadButton[object]', () => {
      const wrapper = mountFlow({
        autoUpload: false,
        displayFiles: [{ name: 'manual.txt', status: 'waiting' }],
        uploadButton: { content: 'Start now', theme: 'warning' },
        cancelUploadButton: { content: 'Stop now', theme: 'danger' },
      });
      expect(wrapper.find('.t-upload__continue').text()).toBe('Start now');
      expect(wrapper.find('.t-upload__cancel').text()).toBe('Stop now');
    });

    it(':uploadButton[function] + :cancelUploadButton[function]', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      const uploadButton: NonNullable<TdUploadProps['uploadButton']> = (_h, { uploading }) =>
        h('button', { class: 'upload-function' }, String(uploading));
      const cancelUploadButton: NonNullable<TdUploadProps['cancelUploadButton']> = (_h, { disabled }) =>
        h('button', { class: 'cancel-function' }, String(disabled));
      const wrapper = mountFlow({
        autoUpload: false,
        uploading: true,
        displayFiles: [{ name: 'manual.txt', status: 'waiting' }],
        uploadButton,
        cancelUploadButton,
      });
      expect(wrapper.find('.upload-function').text()).toBe('true');
      expect(wrapper.find('.cancel-function').text()).toBe('false');
      expect(warn).toHaveBeenCalledTimes(2);
      warn.mockRestore();
    });

    it(':uploadButton[slot] + :cancelUploadButton[slot]', () => {
      const wrapper = mountFlow(
        { autoUpload: false, displayFiles: [{ name: 'manual.txt', status: 'waiting' }] },
        {
          uploadButton: () => h('button', { class: 'upload-slot' }, 'upload slot'),
          cancelUploadButton: () => h('button', { class: 'cancel-slot' }, 'cancel slot'),
        },
      );
      expect(wrapper.find('.upload-slot').exists()).toBe(true);
      expect(wrapper.find('.cancel-slot').exists()).toBe(true);
    });

    it(':uploadButton[null] + :cancelUploadButton[null]', () => {
      const wrapper = mountFlow({ autoUpload: false, uploadButton: null, cancelUploadButton: null });
      expect(wrapper.find('.t-upload__flow-bottom').exists()).toBe(false);
    });

    it(':autoUpload[boolean]', () => {
      const wrapper = mountFlow({ autoUpload: true, displayFiles: [{ name: 'auto.txt' }] });
      expect(wrapper.find('.t-upload__flow-bottom').exists()).toBe(false);
    });

    it(':imageViewerProps[object]', () => {
      const wrapper = mountFlow({ imageViewerProps: { closeOnEscKeydown: false } });
      expect(wrapper.findComponent(ImageViewer).props('closeOnEscKeydown')).toBe(false);
    });
  });

  describe('events', () => {
    it('remove regular and batch files', async () => {
      const onRemove = vi.fn();
      const file = { name: 'remove.txt', status: 'success' as const };
      const regular = mountFlow({ displayFiles: [file], onRemove });
      await regular.find('.t-upload__delete').trigger('click');
      expect(onRemove).toHaveBeenCalledWith(expect.objectContaining({ file, index: 0 }));

      onRemove.mockClear();
      const batch = mountFlow({ isBatchUpload: true, displayFiles: [file], onRemove });
      await batch.find('.t-upload__delete').trigger('click');
      expect(onRemove).toHaveBeenCalledWith(expect.objectContaining({ file: undefined, index: -1 }));
    });

    it('upload and cancel object buttons', async () => {
      const uploadFiles = vi.fn();
      const cancelUpload = vi.fn();
      const uploadWrapper = mountFlow({
        autoUpload: false,
        uploading: false,
        displayFiles: [{ name: 'manual.txt', status: 'waiting' }],
        uploadFiles,
        cancelUpload,
      });
      await uploadWrapper.find('.t-upload__continue').trigger('click');
      expect(uploadFiles).toHaveBeenCalledOnce();

      const cancelWrapper = mountFlow({
        autoUpload: false,
        uploading: true,
        displayFiles: [{ name: 'manual.txt', status: 'waiting' }],
        uploadFiles,
        cancelUpload,
      });
      await cancelWrapper.find('.t-upload__cancel').trigger('click');
      expect(cancelUpload).toHaveBeenCalledOnce();
    });

    it('dragenter/dragleave/drop', async () => {
      const onDragFileChange = vi.fn();
      const onDragenter = vi.fn();
      const onDragleave = vi.fn();
      const onDrop = vi.fn();
      const wrapper = mountFlow({
        draggable: true,
        dragEvents: { onDragFileChange, onDragenter, onDragleave, onDrop },
      });
      const element = wrapper.find('.t-upload__flow-card-area').element;
      simulateDragFileChange(element, 'dragEnter');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-upload__flow-empty').text()).toBe('释放鼠标');
      simulateDragFileChange(element, 'dragLeave');
      simulateDragFileChange(element, 'drop');
      expect(onDragenter).toHaveBeenCalledOnce();
      expect(onDragleave).toHaveBeenCalledOnce();
      expect(onDrop).toHaveBeenCalledOnce();
      expect(onDragFileChange).toHaveBeenCalledOnce();
    });

    it('preview image-flow file and close viewer', async () => {
      const onPreview = vi.fn();
      const files = [
        { name: 'one.png', status: 'success' as const, url: 'https://example.com/one.png' },
        { name: 'two.png', status: 'success' as const, url: 'https://example.com/two.png' },
      ];
      const wrapper = mountFlow({ theme: 'image-flow', displayFiles: files, onPreview });
      await wrapper.findAll('.t-icon-browse')[1].trigger('click');

      const viewer = wrapper.findComponent(ImageViewer);
      expect(viewer.props('visible')).toBe(true);
      expect(viewer.props('index')).toBe(1);
      expect(onPreview).toHaveBeenCalledWith(expect.objectContaining({ file: files[1], index: 1 }));

      viewer.props('onIndexChange')?.(0, { trigger: 'current' });
      await wrapper.vm.$nextTick();
      expect(wrapper.findComponent(ImageViewer).props('index')).toBe(0);
      viewer.props('onClose')?.({ trigger: 'close-btn', e: new MouseEvent('click') });
      await wrapper.vm.$nextTick();
      expect(wrapper.findComponent(ImageViewer).props('visible')).toBe(false);
    });

    it('preview file-flow image thumbnail', async () => {
      const onPreview = vi.fn();
      const raw = new File(['image'], 'image.png', { type: 'image/png' });
      const file = { name: 'image.png', raw, status: 'success' as const, size: raw.size };
      const wrapper = mountFlow({ showThumbnail: true, displayFiles: [file], onPreview });
      await wrapper.find('.t-upload__file-thumbnail').trigger('click');
      expect(onPreview).toHaveBeenCalledWith(expect.objectContaining({ file, index: 0 }));
      expect(wrapper.findComponent(ImageViewer).props('visible')).toBe(true);
    });

    it('remove image-flow file', async () => {
      const onRemove = vi.fn();
      const file = { name: 'remove.png', status: 'success' as const, url: 'https://example.com/remove.png' };
      const wrapper = mountFlow({ theme: 'image-flow', displayFiles: [file], onRemove });
      await wrapper.find('.t-upload__delete').trigger('click');
      expect(onRemove).toHaveBeenCalledWith(expect.objectContaining({ file, index: 0 }));
    });
  });
});
