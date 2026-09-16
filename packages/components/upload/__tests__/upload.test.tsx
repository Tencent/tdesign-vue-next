import { h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { vi } from 'vitest';
import { ImageViewer } from '@tdesign/components/image-viewer';
import { Upload } from '@tdesign/components/upload';
import uploadProps from '@tdesign/components/upload/props';
import type {
  TdUploadProps,
  UploadFile,
  UploadInstanceFunctions,
  RequestMethodResponse,
} from '@tdesign/components/upload/type';
import { sleep } from '@tdesign/internal-utils';
import { getFakeFileList, simulateDragFileChange, simulateFileChange } from '@tdesign/internal-tests/utils';
import { getUploadServer } from './request';

const SUCCESS_ACTION = 'https://tdesign.test.com/upload/image_success';
const FAIL_ACTION = 'https://tdesign.test.com/upload/fail/status_error';

type UploadExpose = UploadInstanceFunctions & {
  cancelUpload: (context?: { file?: UploadFile; e?: MouseEvent }) => void;
  uploading: { value: boolean };
};

const mountUpload = (props: TdUploadProps = {}, slots?: Record<string, () => unknown>) =>
  mount(Upload, { props, slots }) as VueWrapper;

const getExposed = (wrapper: VueWrapper) => wrapper.vm.$.exposed as unknown as UploadExpose;

const selectFiles = async (wrapper: VueWrapper, type = 'file', count = 1) => {
  const files = simulateFileChange(wrapper.find('input').element as HTMLInputElement, type, count);
  await sleep(0);
  return files;
};

const createRequestMethod = (
  response: RequestMethodResponse = {
    status: 'success',
    response: { url: 'https://example.com/request-method.png' },
  },
) => {
  const requestMethod: NonNullable<TdUploadProps['requestMethod']> = vi.fn(async () => response);
  return requestMethod;
};

describe('Upload', () => {
  const server = getUploadServer();

  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterEach(() => {
    vi.useRealTimers();
    server.resetHandlers();
    document.querySelectorAll('.t-image-viewer').forEach((node) => node.remove());
  });
  afterAll(() => server.close());

  describe('props', () => {
    it(':abridgeName[array]', () => {
      const wrapper = mountUpload({
        theme: 'file-input',
        files: [{ name: 'this_is_a_long_name.png' }],
        abridgeName: [8, 6],
      });

      expect(wrapper.find('.t-upload__single-input-text').text()).toBe('this_is_…me.png');
    });

    it(':accept[string]', () => {
      const wrapper = mountUpload({ accept: 'image/*' });
      expect(wrapper.find('input').attributes('accept')).toBe('image/*');
    });

    it(':action[string]', async () => {
      const onSuccess = vi.fn<NonNullable<TdUploadProps['onSuccess']>>();
      const wrapper = mountUpload({ action: SUCCESS_ACTION, onSuccess });

      await selectFiles(wrapper);

      expect(onSuccess).toHaveBeenCalledOnce();
      expect(onSuccess.mock.calls[0][0].fileList[0].url).toBe('https://tdesign.gtimg.com/demo/demo-image-1.png');
    });

    it(':allowUploadDuplicateFile[boolean]', async () => {
      const onValidate = vi.fn<NonNullable<TdUploadProps['onValidate']>>();
      const props: TdUploadProps = {
        autoUpload: false,
        files: [{ name: 'file-name.txt' }],
        onValidate,
      };
      const filtered = mountUpload(props);
      await selectFiles(filtered);
      expect(onValidate).toHaveBeenCalledWith(expect.objectContaining({ type: 'FILTER_FILE_SAME_NAME' }));

      onValidate.mockClear();
      const allowed = mountUpload({ ...props, allowUploadDuplicateFile: true });
      await selectFiles(allowed);
      expect(onValidate).not.toHaveBeenCalled();
    });

    it(':autoUpload[boolean]', async () => {
      const onChange = vi.fn<NonNullable<TdUploadProps['onChange']>>();
      const wrapper = mountUpload({ autoUpload: false, onChange });

      await selectFiles(wrapper);

      expect(onChange.mock.calls[0][0][0]).toMatchObject({ status: 'waiting', percent: 0 });
    });

    it(':beforeAllFilesUpload[function]', async () => {
      const onChange = vi.fn<NonNullable<TdUploadProps['onChange']>>();
      const onValidate = vi.fn<NonNullable<TdUploadProps['onValidate']>>();
      const wrapper = mountUpload({
        autoUpload: false,
        beforeAllFilesUpload: async () => false,
        onChange,
        onValidate,
      });

      await selectFiles(wrapper, 'file', 2);

      expect(onChange).not.toHaveBeenCalled();
      expect(onValidate).toHaveBeenCalledWith(expect.objectContaining({ type: 'BEFORE_ALL_FILES_UPLOAD' }));
    });

    it(':beforeUpload[function]', async () => {
      const onChange = vi.fn<NonNullable<TdUploadProps['onChange']>>();
      const onValidate = vi.fn<NonNullable<TdUploadProps['onValidate']>>();
      const wrapper = mountUpload({
        autoUpload: false,
        multiple: true,
        beforeUpload: (file) => file.name === 'file-name1.txt',
        onChange,
        onValidate,
      });

      await selectFiles(wrapper, 'file', 3);

      expect(onChange.mock.calls[0][0]).toHaveLength(1);
      expect(onChange.mock.calls[0][0][0].name).toBe('file-name1.txt');
      expect(onValidate).toHaveBeenCalledWith(expect.objectContaining({ type: 'CUSTOM_BEFORE_UPLOAD' }));
    });

    it(':cancelUploadButton[object]', () => {
      const wrapper = mountUpload({
        theme: 'file-flow',
        autoUpload: false,
        files: [{ name: 'manual.txt', status: 'waiting' }],
        cancelUploadButton: { content: 'Stop', theme: 'warning' },
      });

      const button = wrapper.find('.t-upload__cancel');
      expect(button.text()).toBe('Stop');
      expect(button.classes()).toContain('t-button--theme-warning');
    });

    it(':cancelUploadButton[function/slot]', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      const renderCancel: NonNullable<TdUploadProps['cancelUploadButton']> = (_h, { cancelUpload }) =>
        h('button', { class: 'cancel-function', onClick: cancelUpload }, 'function cancel');
      const functionWrapper = mountUpload({
        theme: 'file-flow',
        autoUpload: false,
        files: [{ name: 'manual.txt', status: 'waiting' }],
        cancelUploadButton: renderCancel,
      });
      // Current behavior: a lone cancel button TNode is skipped because MultipleFlowList
      // checks uploadButton when deciding whether cancelUploadButton is a TNode.
      expect(functionWrapper.find('.cancel-function').exists()).toBe(false);

      const slotWrapper = mountUpload(
        { theme: 'file-flow', autoUpload: false, files: [{ name: 'manual.txt', status: 'waiting' }] },
        { cancelUploadButton: () => h('button', { class: 'cancel-slot' }, 'slot cancel') },
      );
      expect(slotWrapper.find('.cancel-slot').exists()).toBe(false);
      expect(warn).toHaveBeenCalled();
      warn.mockRestore();
    });

    it(':data[object/function]', async () => {
      const objectFail = vi.fn<NonNullable<TdUploadProps['onFail']>>();
      const objectWrapper = mountUpload({
        action: FAIL_ACTION,
        data: { token: 'object-token' },
        onFail: objectFail,
      });
      await selectFiles(objectWrapper);
      const objectXhr = objectFail.mock.calls[0][0].XMLHttpRequest as XMLHttpRequest & {
        upload: { requestParams: Record<string, unknown> };
      };
      expect(objectXhr.upload.requestParams.token).toBe('object-token');

      const data = vi.fn(() => ({ token: 'function-token' }));
      const functionFail = vi.fn<NonNullable<TdUploadProps['onFail']>>();
      const functionWrapper = mountUpload({ action: FAIL_ACTION, data, onFail: functionFail });
      await selectFiles(functionWrapper);
      expect(data).toHaveBeenCalledOnce();
      const functionXhr = functionFail.mock.calls[0][0].XMLHttpRequest as XMLHttpRequest & {
        upload: { requestParams: Record<string, unknown> };
      };
      expect(functionXhr.upload.requestParams.token).toBe('function-token');
    });

    it(':default[string]', () => {
      const wrapper = mountUpload({ default: 'Choose a document' });
      expect(wrapper.find('.t-upload__trigger').text()).toContain('Choose a document');
    });

    it(':default[function/slot]', () => {
      const functionWrapper = mountUpload({ default: () => h('span', { class: 'default-function' }, 'function') });
      expect(functionWrapper.find('.default-function').exists()).toBe(true);

      const slotWrapper = mountUpload({}, { default: () => h('span', { class: 'default-slot' }, 'slot') });
      expect(slotWrapper.find('.default-slot').exists()).toBe(true);
    });

    it(':disabled[boolean]', async () => {
      const onSelectChange = vi.fn<NonNullable<TdUploadProps['onSelectChange']>>();
      const wrapper = mountUpload({ theme: 'file-input', disabled: true, onSelectChange });

      expect(wrapper.find('input').attributes('disabled')).toBeDefined();
      expect(wrapper.find('.t-button').classes()).toContain('t-is-disabled');
      await selectFiles(wrapper);
      expect(onSelectChange).not.toHaveBeenCalled();
    });

    it(':dragContent[function/slot]', () => {
      const functionWrapper = mountUpload({
        theme: 'custom',
        draggable: true,
        dragContent: () => h('span', { class: 'drag-function' }, 'function'),
      });
      expect(functionWrapper.find('.drag-function').exists()).toBe(true);

      const slotWrapper = mountUpload(
        { theme: 'custom', draggable: true },
        { dragContent: () => h('span', { class: 'drag-slot' }, 'slot') },
      );
      expect(slotWrapper.find('.drag-slot').exists()).toBe(true);
    });

    it(':draggable[boolean]', () => {
      expect(mountUpload({ theme: 'file', draggable: true }).find('.t-upload__dragger').exists()).toBe(true);
      expect(mountUpload({ theme: 'file', draggable: false }).find('.t-upload__single-file').exists()).toBe(true);
    });

    it(':fileListDisplay[function/slot]', () => {
      const functionWrapper = mountUpload({
        files: [{ name: 'function.txt' }],
        fileListDisplay: (_h, { files }) => h('span', { class: 'list-function' }, files[0].name),
      });
      expect(functionWrapper.find('.list-function').text()).toBe('function.txt');

      const slotWrapper = mountUpload(
        { files: [{ name: 'slot.txt' }] },
        { fileListDisplay: () => h('span', { class: 'list-slot' }, 'slot list') },
      );
      expect(slotWrapper.find('.list-slot').text()).toBe('slot list');
    });

    it(':files[array]', () => {
      const wrapper = mountUpload({ files: [{ name: 'controlled.txt' }] });
      expect(wrapper.find('.t-upload__single-name').text()).toBe('controlled.txt');
    });

    it(':defaultFiles[array]', () => {
      const wrapper = mountUpload({ defaultFiles: [{ name: 'default-files.txt' }] });
      expect(wrapper.find('.t-upload__single-name').text()).toBe('default-files.txt');
    });

    it(':format[function]', async () => {
      const format = vi.fn((file: File): UploadFile => ({ name: `formatted-${file.name}`, raw: file }));
      const onChange = vi.fn<NonNullable<TdUploadProps['onChange']>>();
      const wrapper = mountUpload({ autoUpload: false, format, onChange });

      await selectFiles(wrapper);

      expect(format).toHaveBeenCalled();
      expect(onChange.mock.calls[0][0][0].name).toBe('formatted-file-name.txt');
    });

    it(':formatRequest[function]', async () => {
      const formatRequest = vi.fn((data: Record<string, unknown>) => ({ payload: data.file }));
      const onFail = vi.fn<NonNullable<TdUploadProps['onFail']>>();
      const wrapper = mountUpload({ action: FAIL_ACTION, formatRequest, onFail });

      const files = await selectFiles(wrapper);

      expect(formatRequest).toHaveBeenCalledOnce();
      const xhr = onFail.mock.calls[0][0].XMLHttpRequest as XMLHttpRequest & {
        upload: { requestParams: Record<string, unknown> };
      };
      expect(xhr.upload.requestParams).toEqual({ payload: files[0] });
    });

    it(':formatResponse[function]', async () => {
      const formatResponse = vi.fn(() => ({ url: 'https://example.com/formatted.png' }));
      const onSuccess = vi.fn<NonNullable<TdUploadProps['onSuccess']>>();
      const wrapper = mountUpload({ action: SUCCESS_ACTION, formatResponse, onSuccess });

      await selectFiles(wrapper);

      expect(formatResponse).toHaveBeenCalledOnce();
      expect(onSuccess.mock.calls[0][0].fileList[0].url).toBe('https://example.com/formatted.png');
    });

    it(':headers[object]', async () => {
      const headers = { Authorization: 'token' };
      const wrapper = mountUpload({ headers });
      expect((wrapper.vm.$props as TdUploadProps).headers).toEqual(headers);
    });

    it(':imageViewerProps[object]', () => {
      const wrapper = mountUpload({
        theme: 'image',
        files: [{ name: 'image.png', url: 'https://example.com/image.png' }],
        imageViewerProps: { closeOnEscKeydown: false },
      });
      expect(wrapper.findComponent(ImageViewer).props('closeOnEscKeydown')).toBe(false);
    });

    it(':inputAttributes[object]', () => {
      const wrapper = mountUpload({ inputAttributes: { webkitdirectory: 'webkitdirectory', 'data-id': 'picker' } });
      expect(wrapper.find('input').attributes()).toMatchObject({
        webkitdirectory: 'webkitdirectory',
        'data-id': 'picker',
      });
    });

    it(':isBatchUpload[boolean]', () => {
      const wrapper = mountUpload({
        theme: 'file-flow',
        multiple: true,
        isBatchUpload: true,
        files: [
          { name: 'one.txt', status: 'success' },
          { name: 'two.txt', status: 'success' },
        ],
      });
      expect(wrapper.find('.t-upload__flow-table__batch-row').attributes('rowspan')).toBe('2');
    });

    it(':locale[object]', () => {
      const wrapper = mountUpload({
        theme: 'file-flow',
        multiple: true,
        files: [{ name: 'custom.txt' }],
        locale: { triggerUploadText: { fileInput: 'Pick custom' }, file: { fileNameText: 'Custom name' } },
      });
      expect(wrapper.text()).toContain('Pick custom');
      expect(wrapper.text()).toContain('Custom name');
    });

    it(':max[number]', () => {
      const full = mountUpload({ theme: 'image', multiple: true, max: 1, files: [{ name: 'one.png' }] });
      expect(full.find('.t-upload__image-add').exists()).toBe(false);
      const unlimited = mountUpload({ theme: 'image', multiple: true, max: 0, files: [{ name: 'one.png' }] });
      expect(unlimited.find('.t-upload__image-add').exists()).toBe(true);
    });

    it(':method[string]', async () => {
      expect(uploadProps.method.validator(undefined)).toBe(true);
      expect(uploadProps.method.validator('PUT')).toBe(true);
      // @ts-expect-error intentional invalid API value
      expect(uploadProps.method.validator('DELETE')).toBe(false);

      const wrapper = mountUpload({ method: 'PATCH' });
      expect((wrapper.vm.$props as TdUploadProps).method).toBe('PATCH');
    });

    it(':mockProgressDuration[number]', async () => {
      const requestMethod = createRequestMethod();
      const wrapper = mountUpload({ mockProgressDuration: 25, requestMethod });
      await selectFiles(wrapper);
      expect(requestMethod).toHaveBeenCalledOnce();
    });

    it(':multiple[boolean]', () => {
      const wrapper = mountUpload({ multiple: true });
      expect(wrapper.find('input').attributes('multiple')).toBeDefined();
    });

    it(':name[string]', async () => {
      const onFail = vi.fn<NonNullable<TdUploadProps['onFail']>>();
      const wrapper = mountUpload({ action: FAIL_ACTION, name: 'custom_file', onFail });
      const files = await selectFiles(wrapper);
      const xhr = onFail.mock.calls[0][0].XMLHttpRequest as XMLHttpRequest & {
        upload: { requestParams: Record<string, unknown> };
      };
      expect(xhr.upload.requestParams.custom_file).toEqual(files[0]);
    });

    it(':placeholder[string]', () => {
      expect(mountUpload({ placeholder: 'Select file' }).text()).toContain('Select file');
      expect(mountUpload({ theme: 'file-input', placeholder: 'Input file' }).text()).toContain('Input file');
      expect(mountUpload({ theme: 'file-flow', placeholder: 'Flow file' }).text()).toContain('Flow file');
    });

    it(':requestMethod[function]', async () => {
      const requestMethod = createRequestMethod({
        status: 'success',
        response: { url: 'https://example.com/custom.png' },
      });
      const onSuccess = vi.fn<NonNullable<TdUploadProps['onSuccess']>>();
      const wrapper = mountUpload({ requestMethod, onSuccess });

      await selectFiles(wrapper);

      expect(requestMethod).toHaveBeenCalledOnce();
      expect(onSuccess.mock.calls[0][0].fileList[0].url).toBe('https://example.com/custom.png');
    });

    it(':showImageFileName[boolean]', () => {
      const props: TdUploadProps = { theme: 'image', files: [{ name: 'visible.png' }] };
      expect(mountUpload(props).find('.t-upload__card-name').exists()).toBe(true);
      expect(
        mountUpload({ ...props, showImageFileName: false })
          .find('.t-upload__card-name')
          .exists(),
      ).toBe(false);
    });

    it(':showThumbnail[boolean]', () => {
      const raw = new File(['image'], 'image.png', { type: 'image/png' });
      const wrapper = mountUpload({
        theme: 'file-flow',
        showThumbnail: true,
        files: [{ name: 'image.png', raw, size: raw.size }],
      });
      expect(wrapper.find('.t-upload__file-thumbnail').exists()).toBe(true);
    });

    it(':showUploadProgress[boolean]', () => {
      const props: TdUploadProps = {
        files: [{ name: 'progress.txt', status: 'progress', percent: 40 }],
      };
      expect(mountUpload(props).find('.t-upload__single-percent').text()).toBe('40%');
      expect(
        mountUpload({ ...props, showUploadProgress: false })
          .find('.t-upload__single-percent')
          .exists(),
      ).toBe(false);
    });

    it(':sizeLimit[number/object]', async () => {
      const onValidate = vi.fn<NonNullable<TdUploadProps['onValidate']>>();
      const numberWrapper = mountUpload({ autoUpload: false, sizeLimit: 0.001, onValidate });
      await selectFiles(numberWrapper);
      expect(onValidate).toHaveBeenCalledWith(expect.objectContaining({ type: 'FILE_OVER_SIZE_LIMIT' }));

      onValidate.mockClear();
      const objectWrapper = mountUpload({
        autoUpload: false,
        sizeLimit: { size: 1, unit: 'B', message: 'No more than {sizeLimit} byte' },
        onValidate,
      });
      await selectFiles(objectWrapper);
      expect(objectWrapper.text()).toContain('No more than 1 byte');
    });

    it(':status[string]', () => {
      expect(uploadProps.status.validator(undefined)).toBe(true);
      expect(uploadProps.status.validator('warning')).toBe(true);
      // @ts-expect-error intentional invalid API value
      expect(uploadProps.status.validator('unknown')).toBe(false);
      const wrapper = mountUpload({ tips: 'Warning', status: 'warning' });
      expect(wrapper.find('.t-upload__tips-warning').exists()).toBe(true);
    });

    it.each(['custom', 'file', 'file-input', 'file-flow', 'image', 'image-flow'] as const)(':theme[%s]', (theme) => {
      expect(uploadProps.theme.validator(theme)).toBe(true);
      expect(mountUpload({ theme }).classes()).toContain(
        theme === 'file-input' ? 't-upload--theme-file-input' : 't-upload',
      );
    });

    it(':theme[validator]', () => {
      expect(uploadProps.theme.validator(undefined)).toBe(true);
      // @ts-expect-error intentional invalid API value
      expect(uploadProps.theme.validator('unknown')).toBe(false);
    });

    it(':tips[string]', () => {
      expect(mountUpload({ tips: 'Upload tip' }).find('.t-upload__tips').text()).toBe('Upload tip');
    });

    it(':tips[function/slot]', () => {
      const functionWrapper = mountUpload({ tips: () => h('span', { class: 'tips-function' }, 'function') });
      expect(functionWrapper.find('.tips-function').exists()).toBe(true);
      const slotWrapper = mountUpload({}, { tips: () => h('span', { class: 'tips-slot' }, 'slot') });
      expect(slotWrapper.find('.tips-slot').exists()).toBe(true);
    });

    it(':trigger[function/slot]', () => {
      const functionWrapper = mountUpload({
        theme: 'custom',
        trigger: (_h, { files }) => h('button', { class: 'trigger-function' }, String(files.length)),
      });
      expect(functionWrapper.find('.trigger-function').text()).toBe('0');
      const slotWrapper = mountUpload(
        { theme: 'image' },
        { trigger: () => h('button', { class: 'trigger-slot' }, 'slot') },
      );
      expect(slotWrapper.find('.trigger-slot').exists()).toBe(true);
    });

    it(':triggerButtonProps[object]', () => {
      const wrapper = mountUpload({ triggerButtonProps: { theme: 'warning', content: 'Select custom' } });
      expect(wrapper.find('.t-button').classes()).toContain('t-button--theme-warning');
      expect(wrapper.find('.t-button').text()).toBe('Select custom');
    });

    it(':uploadAllFilesInOneRequest[boolean]', async () => {
      const requestMethod = createRequestMethod({ status: 'success', response: { files: [] } });
      const wrapper = mountUpload({ multiple: true, uploadAllFilesInOneRequest: true, requestMethod });
      await selectFiles(wrapper, 'file', 2);
      expect(requestMethod).toHaveBeenCalledOnce();
      expect(requestMethod).toHaveBeenCalledWith(
        expect.arrayContaining([expect.objectContaining({ raw: expect.any(File) })]),
      );
      expect(vi.mocked(requestMethod).mock.calls[0][0]).toHaveLength(2);
    });

    it(':uploadButton[object]', () => {
      const wrapper = mountUpload({
        theme: 'file-flow',
        autoUpload: false,
        files: [{ name: 'manual.txt', status: 'waiting' }],
        uploadButton: { content: 'Start', theme: 'warning' },
      });
      expect(wrapper.find('.t-upload__continue').text()).toBe('Start');
      expect(wrapper.find('.t-upload__continue').classes()).toContain('t-button--theme-warning');
    });

    it(':uploadButton[function/slot]', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      const renderUpload: NonNullable<TdUploadProps['uploadButton']> = (_h, { uploadFiles }) =>
        h('button', { class: 'upload-function', onClick: uploadFiles }, 'function upload');
      const functionWrapper = mountUpload({
        theme: 'file-flow',
        autoUpload: false,
        files: [{ name: 'manual.txt', status: 'waiting' }],
        uploadButton: renderUpload,
      });
      // Current behavior mirrors cancelUploadButton: the TNode detection uses the other button prop.
      expect(functionWrapper.find('.upload-function').exists()).toBe(false);

      const slotWrapper = mountUpload(
        { theme: 'file-flow', autoUpload: false, files: [{ name: 'manual.txt', status: 'waiting' }] },
        { uploadButton: () => h('button', { class: 'upload-slot' }, 'slot upload') },
      );
      expect(slotWrapper.find('.upload-slot').exists()).toBe(false);
      expect(warn).toHaveBeenCalled();
      warn.mockRestore();
    });

    it(':uploadPastedFiles[boolean]', async () => {
      const onSelectChange = vi.fn<NonNullable<TdUploadProps['onSelectChange']>>();
      const file = new File(['paste'], 'paste.txt', { type: 'text/plain' });
      const dispatchPaste = async (wrapper: VueWrapper) => {
        const event = new Event('paste', { bubbles: true }) as ClipboardEvent;
        Object.defineProperty(event, 'clipboardData', { value: { files: [file] } });
        wrapper.element.dispatchEvent(event);
        await sleep(0);
      };

      await dispatchPaste(mountUpload({ autoUpload: false, uploadPastedFiles: true, onSelectChange }));
      expect(onSelectChange).toHaveBeenCalledOnce();
      onSelectChange.mockClear();
      await dispatchPaste(mountUpload({ autoUpload: false, uploadPastedFiles: false, onSelectChange }));
      expect(onSelectChange).not.toHaveBeenCalled();
    });

    it(':useMockProgress[boolean]', async () => {
      const requestMethod = createRequestMethod();
      const wrapper = mountUpload({ useMockProgress: false, requestMethod });
      await selectFiles(wrapper);
      expect(requestMethod).toHaveBeenCalledOnce();
    });

    it(':value[array]', () => {
      const wrapper = mountUpload({ value: [{ name: 'value.txt' }] });
      // Current behavior: useUpload only binds files/modelValue/defaultFiles, so value is ignored.
      expect(wrapper.text()).not.toContain('value.txt');
    });

    it(':modelValue[array]', () => {
      expect(mountUpload({ modelValue: [{ name: 'model-value.txt' }] }).text()).toContain('model-value.txt');
    });

    it(':defaultValue[array]', () => {
      const wrapper = mountUpload({ defaultValue: [{ name: 'default-value.txt' }] });
      // Current behavior: defaultValue is declared publicly but is not passed to useVModel.
      expect(wrapper.text()).not.toContain('default-value.txt');
    });

    it(':withCredentials[boolean]', async () => {
      const onFail = vi.fn<NonNullable<TdUploadProps['onFail']>>();
      const wrapper = mountUpload({ action: FAIL_ACTION, withCredentials: true, onFail });
      await selectFiles(wrapper);
      expect(onFail.mock.calls[0][0].XMLHttpRequest.withCredentials).toBe(true);
    });
  });

  describe('events', () => {
    it('cancel-upload', async () => {
      const onCancelUpload = vi.fn<NonNullable<TdUploadProps['onCancelUpload']>>();
      const wrapper = mountUpload({
        theme: 'file-flow',
        autoUpload: false,
        files: [{ name: 'manual.txt', status: 'waiting' }],
        onCancelUpload,
      });
      getExposed(wrapper).cancelUpload();
      expect(onCancelUpload).toHaveBeenCalledOnce();
    });

    it('change', async () => {
      const onChange = vi.fn<NonNullable<TdUploadProps['onChange']>>();
      const wrapper = mountUpload({ autoUpload: false, onChange });
      await selectFiles(wrapper);
      expect(onChange).toHaveBeenCalledWith(
        [expect.objectContaining({ name: 'file-name.txt' })],
        expect.objectContaining({ trigger: 'add' }),
      );
    });

    it('dragenter/dragleave/drop', async () => {
      const onDragenter = vi.fn<NonNullable<TdUploadProps['onDragenter']>>();
      const onDragleave = vi.fn<NonNullable<TdUploadProps['onDragleave']>>();
      const onDrop = vi.fn<NonNullable<TdUploadProps['onDrop']>>();
      const wrapper = mountUpload({
        theme: 'file',
        draggable: true,
        autoUpload: false,
        onDragenter,
        onDragleave,
        onDrop,
      });
      const dragger = wrapper.find('.t-upload__dragger').element;

      simulateDragFileChange(dragger, 'dragEnter');
      simulateDragFileChange(dragger, 'dragLeave');
      simulateDragFileChange(dragger, 'drop');
      await nextTick();

      expect(onDragenter).toHaveBeenCalledOnce();
      expect(onDragleave).toHaveBeenCalledOnce();
      expect(onDrop).toHaveBeenCalledOnce();
    });

    it('fail', async () => {
      const onFail = vi.fn<NonNullable<TdUploadProps['onFail']>>();
      const wrapper = mountUpload({ action: FAIL_ACTION, onFail });
      await selectFiles(wrapper);
      expect(onFail).toHaveBeenCalledOnce();
    });

    it('one-file-fail', async () => {
      const onOneFileFail = vi.fn<NonNullable<TdUploadProps['onOneFileFail']>>();
      const wrapper = mountUpload({ multiple: true, action: FAIL_ACTION, onOneFileFail });
      await selectFiles(wrapper, 'file', 2);
      expect(onOneFileFail).toHaveBeenCalled();
    });

    it('one-file-success', async () => {
      const onOneFileSuccess = vi.fn<NonNullable<TdUploadProps['onOneFileSuccess']>>();
      const wrapper = mountUpload({ multiple: true, action: SUCCESS_ACTION, onOneFileSuccess });
      await selectFiles(wrapper, 'file', 2);
      expect(onOneFileSuccess).toHaveBeenCalledTimes(2);
    });

    it('preview', async () => {
      const onPreview = vi.fn<NonNullable<TdUploadProps['onPreview']>>();
      const file = { name: 'preview.png', url: 'https://example.com/preview.png' };
      const wrapper = mountUpload({ theme: 'image', files: [file], onPreview });
      await wrapper.find('.t-icon-browse').trigger('click');
      expect(onPreview).toHaveBeenCalledWith(expect.objectContaining({ file, index: 0 }));
    });

    it('progress', async () => {
      const onProgress = vi.fn<NonNullable<TdUploadProps['onProgress']>>();
      const wrapper = mountUpload({ onProgress });
      expect((wrapper.vm.$props as TdUploadProps).onProgress).toBe(onProgress);
    });

    it('remove', async () => {
      const onRemove = vi.fn<NonNullable<TdUploadProps['onRemove']>>();
      const wrapper = mountUpload({ files: [{ name: 'remove.txt' }], onRemove });
      await wrapper.find('.t-upload__icon-delete').trigger('click');
      expect(onRemove).toHaveBeenCalledWith(expect.objectContaining({ index: 0, file: { name: 'remove.txt' } }));
    });

    it('select-change', async () => {
      const onSelectChange = vi.fn<NonNullable<TdUploadProps['onSelectChange']>>();
      const wrapper = mountUpload({ autoUpload: false, onSelectChange });
      const files = await selectFiles(wrapper);
      expect(onSelectChange).toHaveBeenCalledWith(files, {
        currentSelectedFiles: [expect.objectContaining({ raw: files[0] })],
      });
    });

    it('success', async () => {
      const onSuccess = vi.fn<NonNullable<TdUploadProps['onSuccess']>>();
      const wrapper = mountUpload({ action: SUCCESS_ACTION, onSuccess });
      await selectFiles(wrapper);
      expect(onSuccess).toHaveBeenCalledWith(expect.objectContaining({ fileList: expect.any(Array) }));
    });

    it('validate', async () => {
      const onValidate = vi.fn<NonNullable<TdUploadProps['onValidate']>>();
      const wrapper = mountUpload({ autoUpload: false, max: 1, multiple: true, onValidate });
      await selectFiles(wrapper, 'file', 2);
      expect(onValidate).toHaveBeenCalledWith(expect.objectContaining({ type: 'FILES_OVER_LENGTH_LIMIT' }));
    });

    it('waiting-upload-files-change', async () => {
      const onWaitingUploadFilesChange = vi.fn<NonNullable<TdUploadProps['onWaitingUploadFilesChange']>>();
      const wrapper = mountUpload({
        autoUpload: true,
        requestMethod: createRequestMethod(),
        onWaitingUploadFilesChange,
      });
      await selectFiles(wrapper);
      expect(onWaitingUploadFilesChange).toHaveBeenCalledWith(
        expect.objectContaining({ trigger: 'validate', files: expect.any(Array) }),
      );
      expect(onWaitingUploadFilesChange).toHaveBeenCalledWith({ trigger: 'uploaded', files: [] });
    });
  });

  describe('instanceFunctions', () => {
    it('triggerUpload()', () => {
      const wrapper = mountUpload();
      const click = vi.spyOn(wrapper.find('input').element as HTMLInputElement, 'click');
      getExposed(wrapper).triggerUpload();
      expect(click).toHaveBeenCalledOnce();
    });

    it('uploadFiles(files)', async () => {
      const onSuccess = vi.fn<NonNullable<TdUploadProps['onSuccess']>>();
      const requestMethod = createRequestMethod();
      const wrapper = mountUpload({ requestMethod, onSuccess });
      const raw = getFakeFileList()[0];
      getExposed(wrapper).uploadFiles([{ name: raw.name, raw, status: 'waiting' }]);
      await sleep(0);
      expect(requestMethod).toHaveBeenCalledOnce();
      expect(onSuccess).toHaveBeenCalledOnce();
    });

    it('uploadFilePercent(params)', async () => {
      const raw = getFakeFileList()[0];
      const wrapper = mountUpload({
        autoUpload: false,
        defaultFiles: [{ name: raw.name, raw, status: 'progress', percent: 0 }],
      });
      getExposed(wrapper).uploadFilePercent({ file: { raw }, percent: 42 });
      await nextTick();
      expect(wrapper.find('.t-upload__single-percent').text()).toBe('42%');
    });

    it('cancelUpload()', () => {
      const onCancelUpload = vi.fn<NonNullable<TdUploadProps['onCancelUpload']>>();
      const wrapper = mountUpload({ onCancelUpload });
      getExposed(wrapper).cancelUpload();
      expect(onCancelUpload).toHaveBeenCalledOnce();
    });
  });
});
