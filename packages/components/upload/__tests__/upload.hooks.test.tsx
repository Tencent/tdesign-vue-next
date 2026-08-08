import { defineComponent, h, ref } from 'vue';
import { flushPromises, mount } from '@vue/test-utils';
import { vi } from 'vitest';
import * as uploadModule from '@tdesign/common-js/upload/main';
import type { UploadRequestReturn } from '@tdesign/common-js/upload/main';
import type { HandleUploadParams, InnerProgressContext, SuccessContext } from '@tdesign/common-js/upload/types';
import uploadProps from '@tdesign/components/upload/props';
import useDrag from '@tdesign/components/upload/hooks/useDrag';
import useUpload from '@tdesign/components/upload/hooks/useUpload';
import type { TdUploadProps, UploadFile } from '@tdesign/components/upload/type';

const mockUpload = vi.spyOn(uploadModule, 'upload');

const successResult = (files: UploadFile[], overrides: Partial<UploadRequestReturn> = {}): UploadRequestReturn => ({
  status: 'success',
  data: { files, response: { ok: true }, XMLHttpRequest: {} as XMLHttpRequest },
  failedFiles: [],
  list: [{ status: 'success', data: { files, response: { item: true } } }],
  ...overrides,
});

const mountUploadHook = (overrides: TdUploadProps = {}) => {
  let hook!: ReturnType<typeof useUpload>;
  const Harness = defineComponent({
    props: uploadProps,
    setup(props) {
      hook = useUpload(props as TdUploadProps);
      return () => h('input', { ref: hook.inputRef, type: 'file' });
    },
  });
  const wrapper = mount(Harness, { props: overrides });
  return { hook, wrapper };
};

describe('useUpload', () => {
  afterEach(() => {
    mockUpload.mockReset();
    vi.clearAllMocks();
  });

  describe('computed', () => {
    it('locale and class names', () => {
      const { hook } = mountUploadHook({ locale: { triggerUploadText: { fileInput: 'Pick file' } } });
      expect(hook.triggerUploadText.value).toBe('Pick file');
      expect(hook.tipsClasses).toBe('t-upload__tips t-size-s');
      expect(hook.errorClasses).toEqual(['t-upload__tips t-size-s', 't-upload__tips-error']);
      expect(hook.placeholderClass).toBe('t-upload__placeholder');
    });

    it('normalizes a non-array model value', () => {
      const { hook } = mountUploadHook({
        files: null,
      });
      expect(hook.uploadValue.value).toEqual([]);
    });
  });

  describe('uploadFilePercent', () => {
    it('updates waiting files in auto upload mode', () => {
      const raw = new File(['auto'], 'auto.txt');
      const file = { name: raw.name, raw, percent: 0 };
      const { hook } = mountUploadHook({ autoUpload: true });
      hook.toUploadFiles.value = [file];

      hook.uploadFilePercent({ file, percent: 35 });

      expect(hook.toUploadFiles.value[0].percent).toBe(35);
    });

    it('updates the model in manual upload mode', () => {
      const raw = new File(['manual'], 'manual.txt');
      const file = { name: raw.name, raw, percent: 0 };
      const { hook } = mountUploadHook({ autoUpload: false, defaultFiles: [file] });

      hook.uploadFilePercent({ file, percent: 60 });

      expect(hook.uploadValue.value[0].percent).toBe(60);
    });
  });

  describe('file selection', () => {
    it('ignores files while disabled', () => {
      const onSelectChange = vi.fn<NonNullable<TdUploadProps['onSelectChange']>>();
      const { hook } = mountUploadHook({ disabled: true, onSelectChange });
      hook.onFileChange([new File(['disabled'], 'disabled.txt')]);
      expect(onSelectChange).not.toHaveBeenCalled();
    });

    it('handles normal, dragged, and pasted files', async () => {
      const onSelectChange = vi.fn<NonNullable<TdUploadProps['onSelectChange']>>();
      const onChange = vi.fn<NonNullable<TdUploadProps['onChange']>>();
      const { hook } = mountUploadHook({ autoUpload: false, multiple: true, onSelectChange, onChange });
      const normal = new File(['normal'], 'normal.txt');
      const dragged = new File(['dragged'], 'dragged.txt');
      const pasted = new File(['pasted'], 'pasted.txt');

      hook.onNormalFileChange({ target: { files: [normal] } } as unknown as InputEvent);
      hook.onDragFileChange([dragged]);
      hook.onPasteFileChange({ clipboardData: { files: [pasted] } } as unknown as ClipboardEvent);
      await flushPromises();

      expect(onSelectChange).toHaveBeenCalledTimes(3);
      expect(onChange).toHaveBeenCalled();
    });

    it('reports a custom before-upload rejection', async () => {
      const onValidate = vi.fn<NonNullable<TdUploadProps['onValidate']>>();
      const { hook } = mountUploadHook({ autoUpload: false, beforeUpload: () => false, onValidate });
      hook.onFileChange([new File(['rejected'], 'rejected.txt')]);
      await flushPromises();
      expect(onValidate).toHaveBeenCalledWith(expect.objectContaining({ type: 'CUSTOM_BEFORE_UPLOAD' }));
    });

    it('returns when the file count limit rejects every selected file', async () => {
      const onValidate = vi.fn<NonNullable<TdUploadProps['onValidate']>>();
      const { hook } = mountUploadHook({
        autoUpload: false,
        multiple: true,
        max: 1,
        defaultFiles: [{ name: 'existing.txt' }],
        onValidate,
      });
      hook.onFileChange([new File(['new'], 'new.txt')]);
      await flushPromises();
      expect(onValidate).toHaveBeenCalledWith(expect.objectContaining({ type: 'FILES_OVER_LENGTH_LIMIT' }));
      expect(hook.uploadValue.value).toEqual([{ name: 'existing.txt' }]);
    });

    it('reports size errors with default and custom messages', async () => {
      const onValidate = vi.fn<NonNullable<TdUploadProps['onValidate']>>();
      const defaultMessage = mountUploadHook({ autoUpload: false, sizeLimit: { size: 1, unit: 'B' }, onValidate });
      defaultMessage.hook.onFileChange([new File(['too large'], 'large.txt')]);
      await flushPromises();
      expect(defaultMessage.hook.sizeOverLimitMessage.value).toContain('1 B');

      const customMessage = mountUploadHook({
        autoUpload: false,
        sizeLimit: { size: 1, unit: 'B', message: 'Limit {sizeLimit}' },
        onValidate,
      });
      customMessage.hook.onFileChange([new File(['too large'], 'large.txt')]);
      await flushPromises();
      expect(customMessage.hook.sizeOverLimitMessage.value).toBe('Limit 1');
    });
  });

  describe('uploadFiles', () => {
    it('returns when there are no files', () => {
      const { hook } = mountUploadHook();
      hook.uploadFiles();
      expect(mockUpload).not.toHaveBeenCalled();
    });

    it('forwards all request props and stores unique XHR objects', async () => {
      const raw = new File(['file'], 'file.txt');
      const file = { name: raw.name, raw, status: 'waiting' as const };
      const onSuccess = vi.fn<NonNullable<TdUploadProps['onSuccess']>>();
      const requestMethod: NonNullable<TdUploadProps['requestMethod']> = async () => ({
        status: 'success',
        response: { url: 'https://example.com/file.txt' },
      });
      mockUpload.mockResolvedValue(successResult([{ ...file, status: 'success' }]));
      const { hook } = mountUploadHook({
        action: '/upload',
        headers: { token: 'header' },
        method: 'PUT',
        name: 'asset',
        withCredentials: true,
        multiple: true,
        isBatchUpload: true,
        uploadAllFilesInOneRequest: true,
        useMockProgress: false,
        mockProgressDuration: 10,
        data: { folder: 'test' },
        requestMethod,
        onSuccess,
      });

      hook.uploadFiles([file]);
      const params = mockUpload.mock.calls[0][0];
      expect(params).toMatchObject({
        action: '/upload',
        headers: { token: 'header' },
        method: 'PUT',
        name: 'asset',
        withCredentials: true,
        multiple: true,
        isBatchUpload: true,
        uploadAllFilesInOneRequest: true,
        useMockProgress: false,
        mockProgressDuration: 10,
        data: { folder: 'test' },
        requestMethod,
      });

      const abort = vi.fn();
      const xhr = { abort } as unknown as XMLHttpRequest;
      params.setXhrObject?.({ files: [file], xhrReq: xhr });
      params.setXhrObject?.({ files: [file], xhrReq: xhr });
      params.setXhrObject?.({ files: [{ name: 'without-raw.txt' }], xhrReq: xhr });
      expect(hook.xhrReq.value).toHaveLength(2);

      await flushPromises();
      expect(onSuccess).toHaveBeenCalledOnce();
      expect(hook.uploading.value).toBe(false);
      expect(hook.xhrReq.value).toEqual([]);
    });

    it('uses list responses when the aggregate response is absent', async () => {
      const file = { name: 'list.txt', status: 'waiting' as const };
      const onSuccess = vi.fn<NonNullable<TdUploadProps['onSuccess']>>();
      mockUpload.mockResolvedValue(
        successResult([{ ...file, status: 'success' }], {
          data: { files: [{ ...file, status: 'success' }] },
          list: [{ status: 'success', data: { files: [file], response: { id: 1 } } }],
        }),
      );
      const { hook } = mountUploadHook({ onSuccess });
      hook.uploadFiles([file]);
      await flushPromises();
      expect(onSuccess.mock.calls[0][0].response).toEqual([{ id: 1 }]);
      expect(onSuccess.mock.calls[0][0].results).toEqual([expect.objectContaining({ response: { id: 1 } })]);
    });

    it('reports an aggregate failure and keeps failed auto-upload files waiting', async () => {
      const failed = { name: 'failed.txt', status: 'fail' as const };
      const onFail = vi.fn<NonNullable<TdUploadProps['onFail']>>();
      const onWaitingUploadFilesChange = vi.fn<NonNullable<TdUploadProps['onWaitingUploadFilesChange']>>();
      mockUpload.mockResolvedValue({
        status: 'fail',
        data: { files: [], response: { error: 'failed' }, event: new ProgressEvent('error') },
        failedFiles: [failed],
      });
      const { hook } = mountUploadHook({ autoUpload: true, onFail, onWaitingUploadFilesChange });
      hook.uploadFiles([failed]);
      await flushPromises();
      expect(onFail).toHaveBeenCalledWith(expect.objectContaining({ file: failed, failedFiles: [failed] }));
      expect(hook.toUploadFiles.value).toEqual([failed]);
      expect(onWaitingUploadFilesChange).toHaveBeenCalledWith({ files: [failed], trigger: 'uploaded' });
    });

    it('uploads unfinished model files in manual mode', () => {
      const waiting = { name: 'waiting.txt', status: 'waiting' as const };
      mockUpload.mockResolvedValue(successResult([{ ...waiting, status: 'success' }]));
      const { hook } = mountUploadHook({
        autoUpload: false,
        defaultFiles: [{ name: 'done.txt', status: 'success' }, waiting],
      });
      hook.uploadFiles();
      expect(mockUpload.mock.calls[0][0].toUploadFiles).toEqual([waiting]);
    });
  });

  describe('upload callbacks', () => {
    const prepareCallbacks = (props: TdUploadProps = {}) => {
      const file = { name: 'callback.txt', raw: new File(['callback'], 'callback.txt'), status: 'waiting' as const };
      mockUpload.mockResolvedValue(successResult([{ ...file, status: 'success' }]));
      const mounted = mountUploadHook(props);
      mounted.hook.uploadFiles([file]);
      return { ...mounted, file, params: mockUpload.mock.calls.at(-1)[0] as HandleUploadParams };
    };

    it('onResponseProgress', () => {
      const onProgress = vi.fn<NonNullable<TdUploadProps['onProgress']>>();
      const { params, file } = prepareCallbacks({ onProgress });
      const context: InnerProgressContext = {
        event: new ProgressEvent('progress'),
        file,
        files: [file],
        percent: 48,
        type: 'real',
        XMLHttpRequest: {} as XMLHttpRequest,
      };
      params.onResponseProgress?.(context);
      expect(onProgress).toHaveBeenCalledWith(expect.objectContaining({ percent: 48, type: 'real', file }));
    });

    it('onResponseSuccess only for separate multiple requests', () => {
      const onOneFileSuccess = vi.fn<NonNullable<TdUploadProps['onOneFileSuccess']>>();
      const { params, file } = prepareCallbacks({
        multiple: true,
        uploadAllFilesInOneRequest: false,
        onOneFileSuccess,
      });
      const context: SuccessContext = { event: new ProgressEvent('load'), files: [file], response: { id: 1 } };
      params.onResponseSuccess?.(context);
      expect(onOneFileSuccess).toHaveBeenCalledWith(expect.objectContaining({ file, response: { id: 1 } }));

      const together = prepareCallbacks({ multiple: true, uploadAllFilesInOneRequest: true, onOneFileSuccess });
      together.params.onResponseSuccess?.(context);
      expect(onOneFileSuccess).toHaveBeenCalledTimes(1);
    });

    it('onResponseError ignores empty contexts and reports a valid failure', () => {
      const onOneFileFail = vi.fn<NonNullable<TdUploadProps['onOneFileFail']>>();
      const onChange = vi.fn<NonNullable<TdUploadProps['onChange']>>();
      const { params, file } = prepareCallbacks({ multiple: false, onOneFileFail, onChange });
      params.onResponseError?.(undefined as never);
      params.onResponseError?.({ files: [], response: undefined });
      expect(onOneFileFail).not.toHaveBeenCalled();

      const event = new ProgressEvent('error');
      params.onResponseError?.({ event, files: [file], response: { error: 'failed' } });
      expect(onOneFileFail).toHaveBeenCalledWith(expect.objectContaining({ file, failedFiles: [file] }));
      expect(onChange).toHaveBeenCalledWith([], expect.objectContaining({ trigger: 'progress-fail', file }));
    });
  });

  describe('onInnerRemove', () => {
    const event = { stopPropagation: vi.fn() } as unknown as MouseEvent;

    it('clears a single or batch upload', () => {
      const onChange = vi.fn<NonNullable<TdUploadProps['onChange']>>();
      const onRemove = vi.fn<NonNullable<TdUploadProps['onRemove']>>();
      const onWaitingUploadFilesChange = vi.fn<NonNullable<TdUploadProps['onWaitingUploadFilesChange']>>();
      const file = { name: 'single.txt' };
      const { hook } = mountUploadHook({ defaultFiles: [file], onChange, onRemove, onWaitingUploadFilesChange });
      hook.toUploadFiles.value = [file];
      hook.sizeOverLimitMessage.value = 'error';
      hook.onInnerRemove({ file, index: 0, e: event });
      expect(hook.sizeOverLimitMessage.value).toBe('');
      expect(onChange).toHaveBeenCalledWith([], expect.objectContaining({ trigger: 'remove' }));
      expect(onWaitingUploadFilesChange).toHaveBeenCalledWith({ files: [], trigger: 'remove' });
      expect(onRemove).toHaveBeenCalled();
    });

    it('splices the model in manual multiple mode', () => {
      const onChange = vi.fn<NonNullable<TdUploadProps['onChange']>>();
      const files = [{ name: 'one.txt' }, { name: 'two.txt' }];
      const { hook } = mountUploadHook({ autoUpload: false, multiple: true, defaultFiles: files, onChange });
      hook.onInnerRemove({ file: files[1], index: 1, e: event });
      expect(onChange).toHaveBeenCalledWith([files[0]], expect.objectContaining({ index: 1 }));
    });

    it('removes uploaded and waiting files separately in auto multiple mode', () => {
      const onChange = vi.fn<NonNullable<TdUploadProps['onChange']>>();
      const onWaitingUploadFilesChange = vi.fn<NonNullable<TdUploadProps['onWaitingUploadFilesChange']>>();
      const uploaded = { name: 'uploaded.txt', status: 'success' as const };
      const waiting = { name: 'waiting.txt', status: 'waiting' as const };
      const { hook } = mountUploadHook({
        autoUpload: true,
        multiple: true,
        defaultFiles: [uploaded],
        onChange,
        onWaitingUploadFilesChange,
      });
      hook.toUploadFiles.value = [waiting];

      hook.onInnerRemove({ file: uploaded, index: 0, e: event });
      expect(onChange).toHaveBeenCalledWith([], expect.objectContaining({ file: uploaded }));

      hook.onInnerRemove({ file: waiting, index: 0, e: event });
      expect(onWaitingUploadFilesChange).toHaveBeenCalledWith({ files: [], trigger: 'remove' });
    });
  });

  describe('triggerUpload', () => {
    it('clicks the input and stops the initiating event', () => {
      const { hook } = mountUploadHook();
      const click = vi.spyOn(hook.inputRef.value, 'click');
      const stopPropagation = vi.fn();
      hook.triggerUpload({ stopPropagation } as unknown as MouseEvent);
      expect(stopPropagation).toHaveBeenCalledOnce();
      expect(click).toHaveBeenCalledOnce();
    });

    it('returns while disabled or before the input exists', () => {
      const disabled = mountUploadHook({ disabled: true });
      const click = vi.spyOn(disabled.hook.inputRef.value, 'click');
      disabled.hook.triggerUpload();
      expect(click).not.toHaveBeenCalled();

      const enabled = mountUploadHook();
      enabled.hook.inputRef.value = undefined;
      expect(() => enabled.hook.triggerUpload()).not.toThrow();
    });
  });

  describe('cancelUpload', () => {
    it('aborts XHRs and clears auto-upload files', () => {
      const abort = vi.fn();
      const onCancelUpload = vi.fn<NonNullable<TdUploadProps['onCancelUpload']>>();
      const { hook } = mountUploadHook({ autoUpload: true, onCancelUpload });
      hook.xhrReq.value = [{ files: [], xhrReq: { abort } as unknown as XMLHttpRequest }];
      hook.toUploadFiles.value = [{ name: 'waiting.txt' }];
      hook.uploading.value = true;

      hook.cancelUpload();

      expect(abort).toHaveBeenCalledOnce();
      expect(hook.uploading.value).toBe(false);
      expect(hook.toUploadFiles.value).toEqual([]);
      expect(onCancelUpload).toHaveBeenCalledOnce();
    });

    it('resets manual files and removes a contextual file', () => {
      const onChange = vi.fn<NonNullable<TdUploadProps['onChange']>>();
      const onRemove = vi.fn<NonNullable<TdUploadProps['onRemove']>>();
      const success = { name: 'success.txt', status: 'success' as const };
      const failed = { name: 'failed.txt', status: 'fail' as const };
      const { hook } = mountUploadHook({
        autoUpload: false,
        multiple: true,
        defaultFiles: [success, failed],
        onChange,
        onRemove,
      });

      hook.cancelUpload({ file: failed, e: { stopPropagation: vi.fn() } as unknown as MouseEvent });

      expect(onChange).toHaveBeenCalledWith(
        [success, { ...failed, status: 'waiting' }],
        expect.objectContaining({ trigger: 'abort' }),
      );
      expect(onRemove).toHaveBeenCalledWith(expect.objectContaining({ file: failed }));
    });
  });
});

describe('useDrag', () => {
  const createDragEvent = (type: string, target: EventTarget, files: File[] = []) =>
    ({ type, target, dataTransfer: { files }, preventDefault: vi.fn() } as unknown as DragEvent);

  it('handles dragenter, dragover, dragleave, and drop', () => {
    const onDragFileChange = vi.fn();
    const onDragenter = vi.fn();
    const onDragleave = vi.fn();
    const onDrop = vi.fn();
    const drag = useDrag({ onDragFileChange, onDragenter, onDragleave, onDrop }, ref(''));
    const target = document.createElement('div');
    const file = new File(['drag'], 'drag.txt');

    const enter = createDragEvent('dragenter', target, [file]);
    drag.handleDragenter(enter);
    expect(drag.dragActive.value).toBe(true);
    expect(onDragenter).toHaveBeenCalledWith({ e: enter });

    const otherLeave = createDragEvent('dragleave', document.createElement('span'), [file]);
    drag.handleDragleave(otherLeave);
    expect(onDragleave).not.toHaveBeenCalled();

    const leave = createDragEvent('dragleave', target, [file]);
    drag.handleDragleave(leave);
    expect(drag.dragActive.value).toBe(false);
    expect(onDragleave).toHaveBeenCalledWith({ e: leave });

    const over = createDragEvent('dragover', target, [file]);
    drag.handleDragover(over);
    expect(over.preventDefault).toHaveBeenCalledOnce();

    const drop = createDragEvent('drop', target, [file]);
    drag.handleDrop(drop);
    expect(onDrop).toHaveBeenCalledWith({ e: drop });
    expect(onDragFileChange).toHaveBeenCalledWith([file]);
  });

  it('does not emit a file change for an empty drop', () => {
    const onDragFileChange = vi.fn();
    const drag = useDrag({ onDragFileChange }, ref(''));
    drag.handleDrop(createDragEvent('drop', document.createElement('div')));
    expect(onDragFileChange).not.toHaveBeenCalled();
  });
});
