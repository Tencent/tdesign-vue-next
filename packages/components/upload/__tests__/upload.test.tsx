// @ts-nocheck
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { Upload } from '@tdesign/components/upload';
import { sleep } from '@tdesign/internal-utils';
import { simulateFileChange, getFakeFileList, simulateDragFileChange } from '@tdesign/internal-tests/utils';
import { getUploadServer } from './request';

describe('Upload Component', () => {
  const server = getUploadServer();

  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('props.abridgeName: props.abridgeName works fine if theme=file-input', () => {
    const wrapper = mount(
      <Upload theme={'file-input'} files={[{ name: 'this_is_a_long_name.png' }]} abridgeName={[8, 6]}></Upload>,
    );
    expect(wrapper.find('.t-upload__single-input-text').text()).toBe('this_is_…me.png');
  });

  it('props.abridgeName: props.abridgeName works fine if theme=file and file url exists', () => {
    const wrapper = mount(
      <Upload
        theme={'file'}
        files={[{ name: 'this_is_a_long_name.png', url: 'https://xxx.png' }]}
        abridgeName={[8, 6]}
      ></Upload>,
    );
    expect(wrapper.find('.t-upload__single-name').text()).toBe('this_is_…me.png');
  });

  it('props.abridgeName: props.abridgeName works fine if theme=file and file url does not exist', () => {
    const wrapper = mount(
      <Upload theme={'file'} files={[{ name: 'this_is_a_long_name.png' }]} abridgeName={[8, 6]}></Upload>,
    );
    expect(wrapper.find('.t-upload__single-name').text()).toBe('this_is_…me.png');
  });

  it('props.abridgeName: props.abridgeName works fine if theme=image', () => {
    const wrapper = mount(
      <Upload theme={'image'} files={[{ name: 'this_is_a_long_name.png' }]} abridgeName={[8, 6]}></Upload>,
    );
    expect(wrapper.find('.t-upload__card-name').text()).toBe('this_is_…me.png');
  });

  it('props.abridgeName: props.abridgeName works fine if theme=file&draggable=true', () => {
    const wrapper = mount(
      <Upload
        theme={'file'}
        draggable={true}
        files={[{ name: 'this_is_a_long_name.png' }]}
        abridgeName={[8, 6]}
      ></Upload>,
    );
    expect(wrapper.find('.t-upload__single-name').text()).toBe('this_is_…me.png');
  });

  it('props.abridgeName: props.abridgeName works fine if theme=image&draggable=true', () => {
    const wrapper = mount(
      <Upload
        theme={'image'}
        draggable={true}
        status={'success'}
        files={[{ name: 'this_is_a_long_name.png', url: 'https://wwww.png' }]}
        abridgeName={[8, 6]}
      ></Upload>,
    );
    expect(wrapper.find('.t-upload__single-name').text()).toBe('this_is_…me.png');
  });

  it('props.abridgeName: props.abridgeName works fine if theme=image-flow', () => {
    const wrapper = mount(
      <Upload
        theme={'image-flow'}
        files={[{ name: 'this_is_a_long_name.jpg', url: 'https://xxx.jpg' }]}
        abridgeName={[8, 6]}
      ></Upload>,
    );
    expect(wrapper.find('.t-upload__card-name').text()).toBe('this_is_…me.jpg');
  });

  it('props.abridgeName: props.abridgeName works fine if theme=file-flow and file url exists', () => {
    const wrapper = mount(
      <Upload
        theme={'file-flow'}
        files={[{ name: 'this_is_a_long_name.jpg', url: 'https://xxx.jpg' }]}
        abridgeName={[8, 6]}
      ></Upload>,
    );
    expect(wrapper.find('.t-upload__file-name > a').text()).toBe('this_is_…me.jpg');
  });

  it('props.abridgeName: props.abridgeName works fine if theme=file-flow and file url does not exist', () => {
    const wrapper = mount(
      <Upload theme={'file-flow'} files={[{ name: 'this_is_a_long_name.jpg' }]} abridgeName={[8, 6]}></Upload>,
    );
    expect(wrapper.find('.t-upload__file-name').text()).toBe('this_is_…me.jpg');
  });

  it('props.accept works fine', () => {
    const wrapper = mount(<Upload accept={'image/*'}></Upload>).find('input');
    expect(wrapper.attributes('accept')).toBe('image/*');
  });

  it('props.action works fine', async () => {
    const onSelectChangeFn = vi.fn();
    const onChangeFn = vi.fn();
    const wrapper = mount(
      <Upload
        action={'https://tdesign.test.com/upload/image_success'}
        onSelectChange={onSelectChangeFn}
        onChange={onChangeFn}
      ></Upload>,
    );
    const inputDom = wrapper.find('input').element;
    const fileList = simulateFileChange(inputDom);
    await sleep(0);
    expect(onSelectChangeFn).toHaveBeenCalled();
    expect(onSelectChangeFn.mock.calls[0][0]).toEqual(fileList);
    expect(onSelectChangeFn.mock.calls[0][1].currentSelectedFiles).toEqual([
      {
        lastModified: 1674355700444,
        name: 'file-name.txt',
        percent: 0,
        raw: fileList[0],
        size: 22,
        type: 'image/png',
        status: undefined,
      },
    ]);
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0][0].lastModified).toBe(1674355700444);
    expect(onChangeFn.mock.calls[0][0][0].response).toBeTruthy();
    expect(onChangeFn.mock.calls[0][0][0].name).toBe('file-name.txt');
    expect(onChangeFn.mock.calls[0][0][0].percent).toBe(100);
    expect(onChangeFn.mock.calls[0][0][0].status).toBe('success');
    expect(onChangeFn.mock.calls[0][0][0].raw).toEqual(fileList[0]);
    expect(onChangeFn.mock.calls[0][0][0].uploadTime).toBeTruthy();
    expect(onChangeFn.mock.calls[0][1].trigger).toBe('add');
    expect(onChangeFn.mock.calls[0][1].file.raw).toEqual(fileList[0]);
    expect(onChangeFn.mock.calls[0][1].file.url).toBe('https://tdesign.gtimg.com/demo/demo-image-1.png');
    expect(onChangeFn.mock.calls[0][1].file.name).toBe('file-name.txt');
    expect(onChangeFn.mock.calls[0][1].file.uploadTime).toBeTruthy();
    expect(onChangeFn.mock.calls[0][1].file.response).toBeTruthy();
  });

  it('props.allowUploadDuplicateFile: allowUploadDuplicateFile is equal to false', async () => {
    const onValidateFn = vi.fn();
    const wrapper = mount(
      <Upload
        files={[{ name: 'file-name.txt', url: 'https://tdesign.gtimg.com/site/source/figma-pc.png' }]}
        action={'https://tdesign.test.com/upload/file_success'}
        allowUploadDuplicateFile={false}
        onValidate={onValidateFn}
      ></Upload>,
    );
    const inputDom = wrapper.find('input').element;
    const fileList = simulateFileChange(inputDom);
    await wrapper.vm.$nextTick();
    expect(onValidateFn).toHaveBeenCalled();
    expect(onValidateFn.mock.calls[0][0].type).toBe('FILTER_FILE_SAME_NAME');
    expect(onValidateFn.mock.calls[0][0].files[0].raw).toEqual(fileList[0]);
  });

  it('props.allowUploadDuplicateFile: allowUploadDuplicateFile is equal to true', async () => {
    const onValidateFn = vi.fn();
    const wrapper = mount(
      <Upload
        files={[{ name: 'file-name.txt', url: 'https://tdesign.gtimg.com/site/source/figma-pc.png' }]}
        action={'https://tdesign.test.com/upload/file_success'}
        allowUploadDuplicateFile={true}
        onValidate={onValidateFn}
      ></Upload>,
    );
    const inputDom = wrapper.find('input').element;
    simulateFileChange(inputDom);
    await wrapper.vm.$nextTick();
    expect(onValidateFn).not.toHaveBeenCalled();
  });

  it('props.autoUpload: autoUpload is equal false', async () => {
    const onChangeFn = vi.fn();
    const wrapper = mount(
      <Upload
        autoUpload={false}
        action={'https://tdesign.test.com/upload/file_success'}
        onChange={onChangeFn}
      ></Upload>,
    );
    const inputDom = wrapper.find('input').element;
    const fileList = simulateFileChange(inputDom);
    await sleep(0);
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0][0].response).toBe(undefined);
    expect(onChangeFn.mock.calls[0][0][0].raw).toEqual(fileList[0]);
    expect(onChangeFn.mock.calls[0][0][0].name).toBe('file-name.txt');
    expect(onChangeFn.mock.calls[0][0][0].status).toBe('waiting');
    expect(onChangeFn.mock.calls[0][0][0].percent).toBe(0);
  });

  it('props.autoUpload: autoUpload=false & theme=file-flow, cancel upload works fine', async () => {
    const onChangeFn1 = vi.fn();
    const onRemoveFn1 = vi.fn();
    const wrapper = mount(
      <Upload
        theme={'file-flow'}
        autoUpload={false}
        files={[
          { name: 'file1.txt', status: 'waiting', uploadTime: '2023-01-27', lastModified: 1674830942522 },
          { name: 'file2.txt', status: 'success', uploadTime: '2023-01-27', lastModified: 1674831204354 },
          { name: 'file3.txt', status: 'fail', uploadTime: '2023-01-27', lastModified: 1674831204354 },
        ]}
        action={'https://tdesign.test.com/upload/file_success'}
        onChange={onChangeFn1}
        onRemove={onRemoveFn1}
      ></Upload>,
    );
    wrapper.find('.t-upload__continue').trigger('click');
    await wrapper.vm.$nextTick();
    wrapper.find('.t-upload__cancel').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn1).toHaveBeenCalled();
    expect(onChangeFn1.mock.calls[0][0]).toEqual([
      { name: 'file1.txt', status: 'waiting', uploadTime: '2023-01-27', lastModified: 1674830942522 },
      { name: 'file2.txt', status: 'success', uploadTime: '2023-01-27', lastModified: 1674831204354 },
      { name: 'file3.txt', status: 'waiting', uploadTime: '2023-01-27', lastModified: 1674831204354 },
    ]);
    expect(onChangeFn1.mock.calls[0][1].trigger).toBe('abort');
    expect(onRemoveFn1).not.toHaveBeenCalled();
  });

  it('props.autoUpload: autoUpload=false & theme=image & draggable = true, cancel upload works fine', async () => {
    const onSuccessFn = vi.fn();
    const wrapper = mount(
      <Upload
        theme={'image'}
        autoUpload={false}
        draggable={true}
        action={'https://tdesign.test.com/upload/image_success'}
        files={[{ url: 'https://image.png', status: 'waiting' }]}
        onSuccess={onSuccessFn}
      ></Upload>,
    );
    wrapper.find('.t-upload__dragger-upload-btn').trigger('click');
    await sleep(0);
    expect(onSuccessFn).toHaveBeenCalled();
    expect(onSuccessFn.mock.calls[0][0].fileList[0].url).toBe('https://tdesign.gtimg.com/demo/demo-image-1.png');
    expect(onSuccessFn.mock.calls[0][0].currentFiles[0].url).toBe('https://tdesign.gtimg.com/demo/demo-image-1.png');
    expect(onSuccessFn.mock.calls[0][0].file.url).toBe('https://tdesign.gtimg.com/demo/demo-image-1.png');
    expect(onSuccessFn.mock.calls[0][0].results).toBe(undefined);
    expect(onSuccessFn.mock.calls[0][0].response).toBeTruthy();
    expect(onSuccessFn.mock.calls[0][0].XMLHttpRequest).toBeTruthy();
  });

  it('props.beforeAllFilesUpload: beforeAllFilesUpload can stop uploading', async () => {
    const onChangeFn = vi.fn();
    const onValidateFn = vi.fn();
    const wrapper = mount(
      <Upload
        autoUpload={false}
        beforeAllFilesUpload={() => false}
        action={'https://tdesign.test.com/upload/file_success'}
        onChange={onChangeFn}
        onValidate={onValidateFn}
      ></Upload>,
    );
    const inputDom = wrapper.find('input').element;
    const fileList = simulateFileChange(inputDom, 'file', 3);
    await sleep(0);
    expect(onChangeFn).not.toHaveBeenCalled();
    expect(onValidateFn).toHaveBeenCalled();
    expect(onValidateFn.mock.calls[0][0].type).toBe('BEFORE_ALL_FILES_UPLOAD');
    expect(onValidateFn.mock.calls[0][0].files.map((t) => t.raw)).toEqual(fileList);
  });

  it('props.beforeUpload: beforeUpload can skip all files to upload, just like beforeAllFilesUpload', async () => {
    const onChangeFn = vi.fn();
    const onValidateFn = vi.fn();
    const wrapper = mount(
      <Upload
        autoUpload={false}
        beforeUpload={() => false}
        action={'https://tdesign.test.com/upload/file_success'}
        onChange={onChangeFn}
        onValidate={onValidateFn}
      ></Upload>,
    );
    const inputDom = wrapper.find('input').element;
    const fileList = simulateFileChange(inputDom, 'file', 3);
    await sleep(0);
    expect(onChangeFn).not.toHaveBeenCalled();
    expect(onValidateFn).toHaveBeenCalled();
    expect(onValidateFn.mock.calls[0][0].type).toBe('CUSTOM_BEFORE_UPLOAD');
    expect(onValidateFn.mock.calls[0][0].files.map((t) => t.raw)).toEqual(fileList);
  });

  it('props.beforeUpload: beforeUpload can skip some of files to upload', async () => {
    const onChangeFn = vi.fn();
    const onValidateFn = vi.fn();
    const wrapper = mount(
      <Upload
        autoUpload={false}
        beforeUpload={(file) => file.name === 'file-name1.txt'}
        action={'https://tdesign.test.com/upload/file_success'}
        onChange={onChangeFn}
        onValidate={onValidateFn}
      ></Upload>,
    );
    const inputDom = wrapper.find('input').element;
    const fileList = simulateFileChange(inputDom, 'file', 3);
    await sleep(0);
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0][0].raw).toEqual(fileList[1]);
    expect(onValidateFn).toHaveBeenCalled();
    expect(onValidateFn.mock.calls[0][0].type).toBe('CUSTOM_BEFORE_UPLOAD');
    expect(onValidateFn.mock.calls[0][0].files.map((t) => t.raw)).toEqual([fileList[0], fileList[2]]);
  });

  it('props.data: upload request can send extra data', async () => {
    const onFailFn = vi.fn();
    const wrapper = mount(
      <Upload
        data={{ file_name: 'custom-file-name.excel' }}
        action={'https://tdesign.test.com/upload/fail/status_error'}
        onFail={onFailFn}
      ></Upload>,
    );
    const inputDom = wrapper.find('input').element;
    const fileList = simulateFileChange(inputDom);
    await sleep(0);
    expect(onFailFn).toHaveBeenCalled();
    expect(onFailFn.mock.calls[0][0].XMLHttpRequest.upload.requestParams).toEqual({
      file_name: 'custom-file-name.excel',
      file: fileList[0],
      length: 1,
    });
  });

  it('props.default works fine', () => {
    const wrapper = mount(
      <Upload
        default={() => <span class="custom-node">TNode</span>}
        action={'https://cdc.cdn-go.cn/tdc/latest/menu.json'}
      ></Upload>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.default works fine', () => {
    const wrapper = mount(
      <Upload
        v-slots={{ default: () => <span class="custom-node">TNode</span> }}
        action={'https://cdc.cdn-go.cn/tdc/latest/menu.json'}
      ></Upload>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.disabled works fine. `".t-input.t-is-disabled"` should exist', () => {
    const wrapper = mount(<Upload theme={'file-input'} disabled={true}></Upload>);
    expect(wrapper.find('.t-input.t-is-disabled').exists()).toBeTruthy();
  });

  it('props.disabled works fine. `".t-upload__trigger .t-button.t-is-disabled"` should exist', () => {
    const wrapper = mount(<Upload theme={'file-input'} disabled={true}></Upload>);
    expect(wrapper.find('.t-upload__trigger .t-button.t-is-disabled').exists()).toBeTruthy();
  });

  it('props.disabled works fine. `{".t-upload__delete":false}` should exist', () => {
    const wrapper = mount(
      <Upload
        theme={'file-flow'}
        disabled={true}
        multiple={true}
        files={[{ name: 'file1.txt', status: 'success' }]}
      ></Upload>,
    );
    expect(wrapper.find('.t-upload__delete').exists()).toBeFalsy();
  });

  it('props.disabled works fine. `{".t-upload__delete":false}` should exist', () => {
    const wrapper = mount(
      <Upload
        theme={'image-flow'}
        disabled={true}
        multiple={true}
        files={[{ name: 'file1.txt', status: 'success' }]}
      ></Upload>,
    );
    expect(wrapper.find('.t-upload__delete').exists()).toBeFalsy();
  });

  it('props.disabled: disabled upload can not trigger onSelectChange', async () => {
    const onSelectChangeFn = vi.fn();
    const wrapper = mount(<Upload disabled={true} onSelectChange={onSelectChangeFn}></Upload>);
    const inputDom = wrapper.find('input').element;
    simulateFileChange(inputDom);
    await sleep(0);
    expect(onSelectChangeFn).not.toHaveBeenCalled();
  });

  it('props.disabled: disabled upload can not remove file', async () => {
    const wrapper = mount(<Upload theme={'file'} files={[{ name: 'file1.txt' }]} disabled={true}></Upload>);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-upload__icon-delete').exists()).toBeFalsy();
  });

  it('props.disabled: disabled upload can not remove image', async () => {
    const wrapper = mount(
      <Upload theme={'image'} files={[{ name: 'img1.txt', url: 'https://img1.png' }]} disabled={true}></Upload>,
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-upload__icon-delete').exists()).toBeFalsy();
  });

  it('props.dragContent works fine', () => {
    const wrapper = mount(
      <Upload
        dragContent={() => <span class="custom-node">TNode</span>}
        theme={'custom'}
        draggable={true}
        action={'https://tdesign.test.com/upload/file_success'}
      ></Upload>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.dragContent works fine', () => {
    const wrapper = mount(
      <Upload
        v-slots={{ dragContent: () => <span class="custom-node">TNode</span> }}
        theme={'custom'}
        draggable={true}
        action={'https://tdesign.test.com/upload/file_success'}
      ></Upload>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });
  it('slots.drag-content works fine', () => {
    const wrapper = mount(
      <Upload
        v-slots={{ 'drag-content': () => <span class="custom-node">TNode</span> }}
        theme={'custom'}
        draggable={true}
        action={'https://tdesign.test.com/upload/file_success'}
      ></Upload>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.draggable: theme=image & draggable=true, success file render fine', () => {
    const wrapper = mount(
      <Upload
        theme={'image'}
        draggable={true}
        files={[{ url: 'https://tdesign.gtimg.com/demo/demo-image-1.png', name: 'image1.png', status: 'success' }]}
      ></Upload>,
    );
    expect(wrapper.findAll('.t-icon-check-circle-filled').length).toBe(1);
    const attrDom = wrapper.find('.t-upload__dragger-img-wrap img');
    expect(attrDom.attributes('src')).toBe('https://tdesign.gtimg.com/demo/demo-image-1.png');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.draggable: theme=image & draggable=true, success file render fine with file.response.url', () => {
    const wrapper = mount(
      <Upload
        theme={'image'}
        draggable={true}
        files={[
          {
            response: { url: 'https://tdesign.gtimg.com/demo/demo-image-1.png' },
            name: 'image1.png',
            status: 'success',
          },
        ]}
      ></Upload>,
    );
    expect(wrapper.findAll('.t-icon-check-circle-filled').length).toBe(1);
    const attrDom = wrapper.find('.t-upload__dragger-img-wrap img');
    expect(attrDom.attributes('src')).toBe('https://tdesign.gtimg.com/demo/demo-image-1.png');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.draggable: theme=image & draggable=true, fail file render fine', () => {
    const wrapper = mount(
      <Upload
        theme={'image'}
        draggable={true}
        files={[{ url: 'https://image4.png', name: 'image4.png', status: 'fail' }]}
      ></Upload>,
    );
    expect(wrapper.findAll('.t-icon-error-circle-filled').length).toBe(1);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.draggable: theme=image & draggable=true, progress file render fine', () => {
    const wrapper = mount(
      <Upload
        theme={'image'}
        draggable={true}
        files={[{ url: 'https://image2.png', name: 'image2.png', status: 'progress', percent: 80 }]}
      ></Upload>,
    );
    expect(wrapper.find('.t-upload__single-percent').text()).toBe('80%');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.draggable: theme=image & draggable=true, waiting file render fine', () => {
    const wrapper = mount(
      <Upload
        theme={'image'}
        draggable={true}
        files={[{ url: 'https://image3.png', name: 'image3.png', status: 'waiting' }]}
      ></Upload>,
    );
    expect(wrapper.findAll('.t-upload__dragger-progress-cancel').length).toBe(1);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.draggable: theme=image & draggable=true & autoUpload=false, waiting file render fine', () => {
    const wrapper = mount(
      <Upload
        theme={'image'}
        draggable={true}
        autoUpload={false}
        files={[{ url: 'https://image3.png', name: 'image3.png', status: 'waiting' }]}
      ></Upload>,
    );
    expect(wrapper.findAll('.t-upload__dragger-progress-cancel').length).toBe(1);
  });

  it('props.draggable: theme=image & draggable=true & autoUpload=false, cancel upload works fine', async () => {
    const onCancelUploadFn = vi.fn();
    const onRemoveFn = vi.fn();
    const wrapper = mount(
      <Upload
        theme={'image'}
        draggable={true}
        autoUpload={false}
        files={[{ url: 'https://image3.png', name: 'image3.png', status: 'waiting' }]}
        onCancelUpload={onCancelUploadFn}
        onRemove={onRemoveFn}
      ></Upload>,
    );
    wrapper.find('.t-upload__dragger-progress-cancel').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onCancelUploadFn).toHaveBeenCalled();
    expect(onRemoveFn).toHaveBeenCalled();
    expect(onRemoveFn.mock.calls[0][0].file).toEqual({
      url: 'https://image3.png',
      name: 'image3.png',
      status: 'waiting',
    });
    expect(onRemoveFn.mock.calls[0][0].e.type).toBe('click');
    expect(onRemoveFn.mock.calls[0][0].index).toBe(0);
  });

  it('props.fileListDisplay: theme=file, fileListDisplay works fine', () => {
    const fileList = getFakeFileList('file', 3);
    const wrapper = mount(
      <Upload
        fileListDisplay={() => <span class="custom-node">TNode</span>}
        files={fileList}
        theme={'file'}
        action={'https://tdesign.test.com/upload/file_success'}
      ></Upload>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.fileListDisplay: theme=file, fileListDisplay works fine', () => {
    const fileList = getFakeFileList('file', 3);
    const wrapper = mount(
      <Upload
        v-slots={{ fileListDisplay: () => <span class="custom-node">TNode</span> }}
        files={fileList}
        theme={'file'}
        action={'https://tdesign.test.com/upload/file_success'}
      ></Upload>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });
  it('props.fileListDisplay: theme=file, fileListDisplay works fine', () => {
    const fileList = getFakeFileList('file', 3);
    const wrapper = mount(
      <Upload
        v-slots={{ 'file-list-display': () => <span class="custom-node">TNode</span> }}
        files={fileList}
        theme={'file'}
        action={'https://tdesign.test.com/upload/file_success'}
      ></Upload>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.fileListDisplay: a function with params, props.fileListDisplay: theme=file, fileListDisplay works fine', () => {
    const fileList = getFakeFileList('file', 3);
    const fn = vi.fn();
    mount(
      <Upload
        fileListDisplay={fn}
        files={fileList}
        theme={'file'}
        action={'https://tdesign.test.com/upload/file_success'}
      ></Upload>,
    );
    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][1].files).toEqual(fileList);
  });
  it('slots.fileListDisplay: a function with params, props.fileListDisplay: theme=file, fileListDisplay works fine', () => {
    const fileList = getFakeFileList('file', 3);
    const fn = vi.fn();
    mount(
      <Upload
        v-slots={{ fileListDisplay: fn }}
        files={fileList}
        theme={'file'}
        action={'https://tdesign.test.com/upload/file_success'}
      ></Upload>,
    );

    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][0].files).toEqual(fileList);
  });

  it('props.fileListDisplay: theme=image-flow && multiple=true && draggable=true, fileListDisplay works fine', () => {
    const fileList = [{ url: 'https://tdesign.gtimg.com/demo/demo-image-1.png' }];
    const wrapper = mount(
      <Upload
        fileListDisplay={() => <span class="custom-node">TNode</span>}
        files={fileList}
        theme={'image-flow'}
        multiple={true}
        draggable={true}
        action={'https://tdesign.test.com/upload/file_success'}
      ></Upload>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.fileListDisplay: theme=image-flow && multiple=true && draggable=true, fileListDisplay works fine', () => {
    const fileList = [{ url: 'https://tdesign.gtimg.com/demo/demo-image-1.png' }];
    const wrapper = mount(
      <Upload
        v-slots={{ fileListDisplay: () => <span class="custom-node">TNode</span> }}
        files={fileList}
        theme={'image-flow'}
        multiple={true}
        draggable={true}
        action={'https://tdesign.test.com/upload/file_success'}
      ></Upload>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });
  it('props.fileListDisplay: theme=image-flow && multiple=true && draggable=true, fileListDisplay works fine', () => {
    const fileList = [{ url: 'https://tdesign.gtimg.com/demo/demo-image-1.png' }];
    const wrapper = mount(
      <Upload
        v-slots={{ 'file-list-display': () => <span class="custom-node">TNode</span> }}
        files={fileList}
        theme={'image-flow'}
        multiple={true}
        draggable={true}
        action={'https://tdesign.test.com/upload/file_success'}
      ></Upload>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.fileListDisplay: a function with params, props.fileListDisplay: theme=image-flow && multiple=true && draggable=true, fileListDisplay works fine', () => {
    const fileList = [{ url: 'https://tdesign.gtimg.com/demo/demo-image-1.png' }];
    const fn = vi.fn();
    mount(
      <Upload
        fileListDisplay={fn}
        files={fileList}
        theme={'image-flow'}
        multiple={true}
        draggable={true}
        action={'https://tdesign.test.com/upload/file_success'}
      ></Upload>,
    );
    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][1].files).toEqual(fileList);
  });
  it('slots.fileListDisplay: a function with params, props.fileListDisplay: theme=image-flow && multiple=true && draggable=true, fileListDisplay works fine', () => {
    const fileList = [{ url: 'https://tdesign.gtimg.com/demo/demo-image-1.png' }];
    const fn = vi.fn();
    mount(
      <Upload
        v-slots={{ fileListDisplay: fn }}
        files={fileList}
        theme={'image-flow'}
        multiple={true}
        draggable={true}
        action={'https://tdesign.test.com/upload/file_success'}
      ></Upload>,
    );

    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][0].files).toEqual(fileList);
  });

  it('props.fileListDisplay: theme=file-flow && multiple=true && draggable=true, fileListDisplay works fine', () => {
    const fileList = [{ url: 'https://tdesign.gtimg.com/demo/demo-image-1.png' }];
    const wrapper = mount(
      <Upload
        fileListDisplay={() => <span class="custom-node">TNode</span>}
        files={fileList}
        theme={'file-flow'}
        multiple={true}
        draggable={true}
        action={'https://tdesign.test.com/upload/file_success'}
      ></Upload>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.fileListDisplay: theme=file-flow && multiple=true && draggable=true, fileListDisplay works fine', () => {
    const fileList = [{ url: 'https://tdesign.gtimg.com/demo/demo-image-1.png' }];
    const wrapper = mount(
      <Upload
        v-slots={{ fileListDisplay: () => <span class="custom-node">TNode</span> }}
        files={fileList}
        theme={'file-flow'}
        multiple={true}
        draggable={true}
        action={'https://tdesign.test.com/upload/file_success'}
      ></Upload>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });
  it('props.fileListDisplay: theme=file-flow && multiple=true && draggable=true, fileListDisplay works fine', () => {
    const fileList = [{ url: 'https://tdesign.gtimg.com/demo/demo-image-1.png' }];
    const wrapper = mount(
      <Upload
        v-slots={{ 'file-list-display': () => <span class="custom-node">TNode</span> }}
        files={fileList}
        theme={'file-flow'}
        multiple={true}
        draggable={true}
        action={'https://tdesign.test.com/upload/file_success'}
      ></Upload>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.fileListDisplay: a function with params, props.fileListDisplay: theme=file-flow && multiple=true && draggable=true, fileListDisplay works fine', () => {
    const fileList = [{ url: 'https://tdesign.gtimg.com/demo/demo-image-1.png' }];
    const fn = vi.fn();
    mount(
      <Upload
        fileListDisplay={fn}
        files={fileList}
        theme={'file-flow'}
        multiple={true}
        draggable={true}
        action={'https://tdesign.test.com/upload/file_success'}
      ></Upload>,
    );
    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][1].files).toEqual(fileList);
  });
  it('slots.fileListDisplay: a function with params, props.fileListDisplay: theme=file-flow && multiple=true && draggable=true, fileListDisplay works fine', () => {
    const fileList = [{ url: 'https://tdesign.gtimg.com/demo/demo-image-1.png' }];
    const fn = vi.fn();
    mount(
      <Upload
        v-slots={{ fileListDisplay: fn }}
        files={fileList}
        theme={'file-flow'}
        multiple={true}
        draggable={true}
        action={'https://tdesign.test.com/upload/file_success'}
      ></Upload>,
    );

    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][0].files).toEqual(fileList);
  });

  it('props.fileListDisplay: theme=file && draggable=true, fileListDisplay works fine', () => {
    const wrapper = mount(
      <Upload
        fileListDisplay={() => <span class="custom-node">TNode</span>}
        theme={'file'}
        draggable={true}
        files={[{ name: 'file1.txt', status: 'waiting', uploadTime: 1674897038406 }]}
      ></Upload>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.fileListDisplay: theme=file && draggable=true, fileListDisplay works fine', () => {
    const wrapper = mount(
      <Upload
        v-slots={{ fileListDisplay: () => <span class="custom-node">TNode</span> }}
        theme={'file'}
        draggable={true}
        files={[{ name: 'file1.txt', status: 'waiting', uploadTime: 1674897038406 }]}
      ></Upload>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });
  it('props.fileListDisplay: theme=file && draggable=true, fileListDisplay works fine', () => {
    const wrapper = mount(
      <Upload
        v-slots={{ 'file-list-display': () => <span class="custom-node">TNode</span> }}
        theme={'file'}
        draggable={true}
        files={[{ name: 'file1.txt', status: 'waiting', uploadTime: 1674897038406 }]}
      ></Upload>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.fileListDisplay: a function with params, props.fileListDisplay: theme=file && draggable=true, fileListDisplay works fine', () => {
    const fn = vi.fn();
    mount(
      <Upload
        fileListDisplay={fn}
        theme={'file'}
        draggable={true}
        files={[{ name: 'file1.txt', status: 'waiting', uploadTime: 1674897038406 }]}
      ></Upload>,
    );
    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][1].files).toEqual([{ name: 'file1.txt', status: 'waiting', uploadTime: 1674897038406 }]);
  });
  it('slots.fileListDisplay: a function with params, props.fileListDisplay: theme=file && draggable=true, fileListDisplay works fine', () => {
    const fn = vi.fn();
    mount(
      <Upload
        v-slots={{ fileListDisplay: fn }}
        theme={'file'}
        draggable={true}
        files={[{ name: 'file1.txt', status: 'waiting', uploadTime: 1674897038406 }]}
      ></Upload>,
    );

    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][0].files).toEqual([{ name: 'file1.txt', status: 'waiting', uploadTime: 1674897038406 }]);
  });

  it('props.fileListDisplay: theme=image && draggable=true, fileListDisplay works fine', () => {
    const wrapper = mount(
      <Upload
        fileListDisplay={() => <span class="custom-node">TNode</span>}
        theme={'image'}
        draggable={true}
        files={[{ url: 'https://img1.txt', status: 'waiting', uploadTime: 1674897038406 }]}
      ></Upload>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.fileListDisplay: theme=image && draggable=true, fileListDisplay works fine', () => {
    const wrapper = mount(
      <Upload
        v-slots={{ fileListDisplay: () => <span class="custom-node">TNode</span> }}
        theme={'image'}
        draggable={true}
        files={[{ url: 'https://img1.txt', status: 'waiting', uploadTime: 1674897038406 }]}
      ></Upload>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });
  it('props.fileListDisplay: theme=image && draggable=true, fileListDisplay works fine', () => {
    const wrapper = mount(
      <Upload
        v-slots={{ 'file-list-display': () => <span class="custom-node">TNode</span> }}
        theme={'image'}
        draggable={true}
        files={[{ url: 'https://img1.txt', status: 'waiting', uploadTime: 1674897038406 }]}
      ></Upload>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.fileListDisplay: a function with params, props.fileListDisplay: theme=image && draggable=true, fileListDisplay works fine', () => {
    const fn = vi.fn();
    mount(
      <Upload
        fileListDisplay={fn}
        theme={'image'}
        draggable={true}
        files={[{ url: 'https://img1.txt', status: 'waiting', uploadTime: 1674897038406 }]}
      ></Upload>,
    );
    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][1].files).toEqual([
      { url: 'https://img1.txt', status: 'waiting', uploadTime: 1674897038406 },
    ]);
  });
  it('slots.fileListDisplay: a function with params, props.fileListDisplay: theme=image && draggable=true, fileListDisplay works fine', () => {
    const fn = vi.fn();
    mount(
      <Upload
        v-slots={{ fileListDisplay: fn }}
        theme={'image'}
        draggable={true}
        files={[{ url: 'https://img1.txt', status: 'waiting', uploadTime: 1674897038406 }]}
      ></Upload>,
    );

    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][0].files).toEqual([
      { url: 'https://img1.txt', status: 'waiting', uploadTime: 1674897038406 },
    ]);
  });

  it('props.format works fine', async () => {
    const onSelectChangeFn = vi.fn();
    const wrapper = mount(
      <Upload
        format={(fileRaw) => ({ field_custom: 'a new file field', name: 'another name', raw: fileRaw })}
        action={'https://tdesign.test.com/upload/file_success'}
        onSelectChange={onSelectChangeFn}
      ></Upload>,
    );
    const inputDom = wrapper.find('input').element;
    const fileList = simulateFileChange(inputDom);
    await sleep(0);
    expect(onSelectChangeFn).toHaveBeenCalled();
    expect(onSelectChangeFn.mock.calls[0][0]).toEqual(fileList);
    expect(onSelectChangeFn.mock.calls[0][1].currentSelectedFiles[0].name).toBe('another name');
    expect(onSelectChangeFn.mock.calls[0][1].currentSelectedFiles[0].field_custom).toBe('a new file field');
    expect(onSelectChangeFn.mock.calls[0][1].currentSelectedFiles[0].raw).toEqual(fileList[0]);
  });

  it('props.formatRequest: upload request data can be changed through formatRequest', async () => {
    const onFailFn = vi.fn();
    const wrapper = mount(
      <Upload
        formatRequest={(requestData) => ({ requestData, more_field: 'more custom field' })}
        action={'https://tdesign.test.com/upload/fail/status_error'}
        onFail={onFailFn}
      ></Upload>,
    );
    const inputDom = wrapper.find('input').element;
    const fileList = simulateFileChange(inputDom);
    await sleep(0);
    expect(onFailFn).toHaveBeenCalled();
    expect(onFailFn.mock.calls[0][0].XMLHttpRequest.upload.requestParams.requestData).toEqual({
      file: fileList[0],
      length: 1,
    });
    expect(onFailFn.mock.calls[0][0].XMLHttpRequest.upload.requestParams.more_field).toBe('more custom field');
  });

  it('props.formatResponse: format upload success response', async () => {
    const onChangeFn = vi.fn();
    const wrapper = mount(
      <Upload
        formatResponse={(response) => ({
          responseData: { ret: response.ret, data: response.data },
          url: response.data.url,
          extra_field: 'extra value',
        })}
        action={'https://tdesign.test.com/upload/file_success'}
        onChange={onChangeFn}
      ></Upload>,
    );
    const inputDom = wrapper.find('input').element;
    simulateFileChange(inputDom);
    await sleep(0);
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0][0].response.responseData).toEqual({
      ret: 0,
      data: { name: 'tdesign.min.js', url: 'https://tdesign.gtimg.com/site/spline/script/tdesign.min.js' },
    });
    expect(onChangeFn.mock.calls[0][0][0].response.url).toBe(
      'https://tdesign.gtimg.com/site/spline/script/tdesign.min.js',
    );
    expect(onChangeFn.mock.calls[0][0][0].response.extra_field).toBe('extra value');
  });

  it('props.formatResponse: format upload fail response', async () => {
    const onFailFn = vi.fn();
    const wrapper = mount(
      <Upload
        action={'https://tdesign.test.com/upload/fail/response_error'}
        formatResponse={(response) => ({ error: response.error, name: response.name })}
        onFail={onFailFn}
      ></Upload>,
    );
    const inputDom = wrapper.find('input').element;
    const fileList = simulateFileChange(inputDom);
    await sleep(0);
    expect(onFailFn).toHaveBeenCalled();
    expect(onFailFn.mock.calls[0][0].failedFiles[0].raw).toEqual(fileList[0]);
    expect(onFailFn.mock.calls[0][0].currentFiles[0].raw).toEqual(fileList[0]);
    expect(onFailFn.mock.calls[0][0].file.raw).toEqual(fileList[0]);
    expect(onFailFn.mock.calls[0][0].e.type).toBe('load');
    expect(onFailFn.mock.calls[0][0].XMLHttpRequest).toBeTruthy();
    expect(onFailFn.mock.calls[0][0].response).toEqual({ error: 'upload failed', name: 'file-name.txt' });
  });

  it('props.headers works fine', async () => {
    const onFailFn = vi.fn();
    const wrapper = mount(
      <Upload
        headers={{ 'XML-HTTP-REQUEST': 'tdesign_token' }}
        action={'https://tdesign.test.com/upload/fail/status_error'}
        onFail={onFailFn}
      ></Upload>,
    );
    const inputDom = wrapper.find('input').element;
    simulateFileChange(inputDom);
    await sleep(0);
    expect(onFailFn).toHaveBeenCalled();
    expect(onFailFn.mock.calls[0][0].XMLHttpRequest.upload.requestHeaders['XML-HTTP-REQUEST']).toBe('tdesign_token');
  });

  it(`props.inputAttributes is equal to { webkitdirectory: 'webkitdirectory' }`, () => {
    const wrapper = mount(
      <Upload inputAttributes={{ webkitdirectory: 'webkitdirectory' }} theme={'file-input'}></Upload>,
    );
    const domWrapper = wrapper.find('input');
    expect(domWrapper.attributes('webkitdirectory')).toBe('webkitdirectory');
  });

  it('props.isBatchUpload works fine', async () => {
    const onChangeFn = vi.fn();
    const wrapper = mount(
      <Upload
        isBatchUpload={true}
        autoUpload={false}
        multiple={true}
        action={'https://tdesign.test.com/upload/file_success'}
        files={[{ url: 'https://file.txt', name: 'file.txt' }]}
        onChange={onChangeFn}
      ></Upload>,
    );
    const inputDom = wrapper.find('input').element;
    simulateFileChange(inputDom, 'file', 3);
    await sleep(0);
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0].length).toBe(3);
  });

  it('props.locale: props.locale works fine if theme=file-flow', () => {
    const wrapper = mount(
      <Upload
        locale={{ progress: { uploadingText: 'uploading' } }}
        theme={'file-flow'}
        files={[{ url: 'https://tdesign.gtimg.com/demo/demo-image-1.png', status: 'progress', percent: 80 }]}
        action={'https://tdesign.test.com/upload/file_success'}
      ></Upload>,
    );
    expect(wrapper.find('.t-upload__file-flow-progress').text()).toBe('uploading 80%');
  });

  it('props.locale: props.locale works fine if theme=image', () => {
    const wrapper = mount(
      <Upload
        locale={{ progress: { uploadingText: 'uploading' } }}
        theme={'image'}
        files={[{ url: 'https://tdesign.gtimg.com/demo/demo-image-1.png', status: 'progress', percent: 80 }]}
        action={'https://tdesign.test.com/upload/file_success'}
      ></Upload>,
    );
    expect(wrapper.find('.t-upload__image-progress').text()).toBe('uploading 80%');
  });

  it('props.max: can not show image add trigger if count of image is over than max', () => {
    const wrapper = mount(
      <Upload
        theme={'image'}
        max={2}
        files={[
          { url: 'xxxx.url', name: 'file1.txt' },
          { url: 'yyyy.url', name: 'file2.txt' },
        ]}
        multiple={true}
      ></Upload>,
    );
    expect(wrapper.find('.t-upload__image-add').exists()).toBeFalsy();
  });

  it('props.max works fine', async () => {
    const onChangeFn = vi.fn();
    const wrapper = mount(
      <Upload
        max={2}
        multiple={true}
        autoUpload={false}
        files={[
          { url: 'xxxx.url', name: 'file1.txt' },
          { url: 'yyyy.url', name: 'file2.txt' },
        ]}
        onChange={onChangeFn}
      ></Upload>,
    );
    const inputDom = wrapper.find('input').element;
    simulateFileChange(inputDom, 'file', 1);
    await sleep(300);
    expect(onChangeFn).not.toHaveBeenCalled();
  });

  it('props.max: max=0 means any count of files are allowed', async () => {
    const onChangeFn = vi.fn();
    const wrapper = mount(
      <Upload max={0} multiple={true} autoUpload={false} files={[]} onChange={onChangeFn}></Upload>,
    );
    const inputDom = wrapper.find('input').element;
    simulateFileChange(inputDom, 'file', 3);
    await sleep(300);
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0].length).toBe(3);
  });

  it('props.name: rename file in request data to be file_name', async () => {
    const onFailFn = vi.fn();
    const wrapper = mount(
      <Upload
        name={'file_name'}
        action={'https://tdesign.test.com/upload/fail/status_error'}
        onFail={onFailFn}
      ></Upload>,
    );
    const inputDom = wrapper.find('input').element;
    const fileList = simulateFileChange(inputDom);
    await sleep(0);
    expect(onFailFn).toHaveBeenCalled();
    expect(onFailFn.mock.calls[0][0].XMLHttpRequest.upload.requestParams).toEqual({
      file_name: fileList[0],
      length: 1,
    });
  });

  it('props.placeholder: theme=file works fine', () => {
    const wrapper = mount(<Upload theme={'file'} placeholder={'this is placeholder'}></Upload>);
    expect(wrapper.find('.t-upload__placeholder').text()).toBe('this is placeholder');
  });

  it('props.placeholder: theme=file-input works fine', () => {
    const wrapper = mount(<Upload theme={'file-input'} placeholder={'this is placeholder'}></Upload>);
    expect(wrapper.find('.t-upload__placeholder').text()).toBe('this is placeholder');
  });

  it('props.placeholder: theme=image-flow works fine', () => {
    const wrapper = mount(<Upload theme={'image-flow'} placeholder={'this is placeholder'}></Upload>);
    expect(wrapper.find('.t-upload__placeholder').text()).toBe('this is placeholder');
  });

  it('props.placeholder: theme=file-flow works fine', () => {
    const wrapper = mount(<Upload theme={'file-flow'} placeholder={'this is placeholder'}></Upload>);
    expect(wrapper.find('.t-upload__placeholder').text()).toBe('this is placeholder');
  });

  it('props.requestMethod works fine', async () => {
    const onChangeFn = vi.fn();
    const wrapper = mount(
      <Upload
        theme={'image-flow'}
        multiple={true}
        files={[]}
        requestMethod={() =>
          Promise.resolve({ status: 'success', response: { url: 'https://tdesign.gtimg.com/demo/demo-image-1.png' } })
        }
        onChange={onChangeFn}
      ></Upload>,
    );
    const inputDom = wrapper.find('input').element;
    const fileList = simulateFileChange(inputDom, 'image');
    await sleep(0);
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0][0].raw).toEqual(fileList[0]);
    expect(onChangeFn.mock.calls[0][0][0].response.url).toBe('https://tdesign.gtimg.com/demo/demo-image-1.png');
  });

  it('props.requestMethod works fine', async () => {
    const onFailFn = vi.fn();
    const wrapper = mount(
      <Upload
        theme={'file-flow'}
        multiple={true}
        files={[]}
        requestMethod={() => Promise.resolve({ status: 'fail', error: 'upload failed' })}
        onFail={onFailFn}
      ></Upload>,
    );
    const inputDom = wrapper.find('input').element;
    const fileList = simulateFileChange(inputDom);
    await sleep(0);
    expect(onFailFn).toHaveBeenCalled();
    expect(onFailFn.mock.calls[0][0].failedFiles.map((t) => t.raw)).toEqual(fileList);
    expect(onFailFn.mock.calls[0][0].currentFiles.map((t) => t.raw)).toEqual(fileList);
  });

  it('props.showUploadProgress works fine. `{".t-upload__file-flow-progress":{"text":"上传中"}}` should exist', () => {
    const wrapper = mount(
      <Upload
        theme={'file-flow'}
        showUploadProgress={false}
        files={[
          {
            name: 'file1.txt',
            status: 'progress',
            percent: 80,
            url: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
          },
        ]}
        action={'https://tdesign.test.com/upload/file_success'}
      ></Upload>,
    );
    expect(wrapper.find('.t-upload__file-flow-progress').text()).toBe('上传中');
  });

  it('props.showUploadProgress works fine. `{".t-upload__image-progress":{"text":"上传中"}}` should exist', () => {
    const wrapper = mount(
      <Upload
        theme={'image'}
        showUploadProgress={false}
        files={[
          {
            name: 'file1.txt',
            status: 'progress',
            percent: 10,
            url: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
          },
        ]}
        action={'https://tdesign.test.com/upload/file_success'}
      ></Upload>,
    );
    expect(wrapper.find('.t-upload__image-progress').text()).toBe('上传中');
  });

  it('props.sizeLimit: file size is over than 23B, show default error tips', async () => {
    const onValidateFn = vi.fn();
    const wrapper = mount(
      <Upload
        sizeLimit={{ size: 23, unit: 'B' }}
        multiple={true}
        action={'https://tdesign.test.com/upload/file_success'}
        onValidate={onValidateFn}
      ></Upload>,
    );
    const inputDom = wrapper.find('input').element;
    simulateFileChange(inputDom, 'file', 5);
    await sleep(0);
    expect(onValidateFn).toHaveBeenCalled();
    expect(onValidateFn.mock.calls[0][0].type).toBe('FILE_OVER_SIZE_LIMIT');
    expect(onValidateFn.mock.calls[0][0].files.length).toBe(3);
  });

  it('props.sizeLimit: file size is over than 23B, show custom error tips', async () => {
    const onValidateFn = vi.fn();
    const wrapper = mount(
      <Upload
        sizeLimit={{ size: 23, unit: 'B', message: 'image size can not over than {sizeLimit}' }}
        multiple={true}
        action={'https://tdesign.test.com/upload/file_success'}
        onValidate={onValidateFn}
      ></Upload>,
    );
    const inputDom = wrapper.find('input').element;
    simulateFileChange(inputDom, 'file', 5);
    await sleep(0);
    expect(onValidateFn).toHaveBeenCalled();
    expect(onValidateFn.mock.calls[0][0].type).toBe('FILE_OVER_SIZE_LIMIT');
    expect(onValidateFn.mock.calls[0][0].files.length).toBe(3);
  });

  it('props.sizeLimit: file size is over than 0.023KB, show default error tips (KB is default unit)', async () => {
    const onValidateFn = vi.fn();
    const wrapper = mount(
      <Upload
        sizeLimit={0.023}
        multiple={true}
        action={'https://tdesign.test.com/upload/file_success'}
        onValidate={onValidateFn}
      ></Upload>,
    );
    const inputDom = wrapper.find('input').element;
    simulateFileChange(inputDom, 'file', 5);
    await sleep(0);
    expect(onValidateFn).toHaveBeenCalled();
    expect(onValidateFn.mock.calls[0][0].type).toBe('FILE_OVER_SIZE_LIMIT');
    expect(onValidateFn.mock.calls[0][0].files.length).toBe(3);
  });

  const statusExpectedDom = [
    '.t-upload__tips-default',
    '.t-upload__tips-success',
    '.t-upload__tips-warning',
    '.t-upload__tips-error',
  ];
  ['default', 'success', 'warning', 'error'].forEach((item, index) => {
    it(`props.status is equal to ${item}`, () => {
      const wrapper = mount(
        <Upload
          status={item}
          tips={'upload tips text'}
          action={'https://tdesign.test.com/upload/file_success'}
        ></Upload>,
      );
      expect(wrapper.find(statusExpectedDom[index]).exists()).toBeTruthy();
    });
  });

  it('props.theme: show image add trigger even if count of image is over than max', () => {
    const wrapper = mount(
      <Upload
        files={[
          { url: 'xxxx.url', name: 'file1.txt' },
          { url: 'yyyy.url', name: 'file2.txt' },
        ]}
        multiple={true}
        theme={'image'}
      ></Upload>,
    );
    expect(wrapper.find('.t-upload__image-add').exists()).toBeTruthy();
  });

  it('props.theme: theme=file and file status is fail works fine', () => {
    const wrapper = mount(
      <Upload theme={'file'} autoUpload={false} files={[{ name: 'file1.txt', status: 'fail' }]}></Upload>,
    );
    expect(wrapper.find('.t-icon-error-circle-filled').exists()).toBeTruthy();
  });

  it('props.theme: theme=file-input and file status is progress works fine', () => {
    const wrapper = mount(<Upload theme={'file-input'} files={[{ name: 'file1.txt', status: 'progress' }]}></Upload>);
    expect(wrapper.find('.t-upload__single-progress').exists()).toBeTruthy();
  });

  it('props.theme: theme=file-input and file status is waiting works fine', () => {
    const wrapper = mount(<Upload theme={'file-input'} files={[{ name: 'file1.txt', status: 'waiting' }]}></Upload>);
    expect(wrapper.find('.t-upload__file-waiting.t-icon-time-filled').exists()).toBeTruthy();
  });

  it('props.theme: theme=file-input and file status is fail works fine', () => {
    const wrapper = mount(<Upload theme={'file-input'} files={[{ name: 'file1.txt', status: 'fail' }]}></Upload>);
    expect(wrapper.find('.t-icon-error-circle-filled').exists()).toBeTruthy();
  });

  it('props.theme: theme=file-input and file status is success works fine', () => {
    const wrapper = mount(<Upload theme={'file-input'} files={[{ name: 'file1.txt', status: 'success' }]}></Upload>);
    expect(wrapper.find('.t-icon-check-circle-filled').exists()).toBeTruthy();
  });

  it('props.theme: theme=file-flow works fine', () => {
    const wrapper = mount(
      <Upload
        theme={'file-flow'}
        files={[
          { name: 'file1.txt', status: 'success' },
          { name: 'file2.txt', status: 'waiting' },
          { name: 'file3.txt', status: 'fail' },
          { name: 'file4.txt', status: 'progress', percent: 90 },
        ]}
      ></Upload>,
    );
    expect(wrapper.findAll('.t-upload__flow-table tbody > tr').length).toBe(4);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.theme: theme=image-flow works fine', () => {
    const wrapper = mount(
      <Upload
        theme={'image-flow'}
        files={[
          { url: '', status: 'success', name: 'img.txt' },
          { url: 'https://img1.txt', status: 'success', name: 'img1.txt' },
          { url: 'https://img2.txt', status: 'waiting', name: 'img2.txt' },
          { url: 'https://img3.txt', status: 'fail', name: 'img3.txt' },
          { url: 'https://img4.txt', status: 'progress', percent: 90, name: 'img4.txt' },
        ]}
      ></Upload>,
    );
    expect(wrapper.findAll('.t-upload__card-item').length).toBe(5);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.tips works fine', () => {
    const wrapper = mount(
      <Upload
        tips={() => <span class="custom-node">TNode</span>}
        action={'https://tdesign.test.com/upload/file_success'}
      ></Upload>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.find('.t-upload__tips').exists()).toBeTruthy();
  });

  it('slots.tips works fine', () => {
    const wrapper = mount(
      <Upload
        v-slots={{ tips: () => <span class="custom-node">TNode</span> }}
        action={'https://tdesign.test.com/upload/file_success'}
      ></Upload>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.find('.t-upload__tips').exists()).toBeTruthy();
  });

  it('props.trigger: theme = file, trigger works fine', () => {
    const wrapper = mount(<Upload trigger={() => <span class="custom-node">TNode</span>} theme={'file'}></Upload>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.trigger: theme = file, trigger works fine', () => {
    const wrapper = mount(
      <Upload v-slots={{ trigger: () => <span class="custom-node">TNode</span> }} theme={'file'}></Upload>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.trigger: theme = custom & draggable = true, trigger works fine', () => {
    const wrapper = mount(
      <Upload trigger={() => <span class="custom-node">TNode</span>} theme={'custom'} draggable={true}></Upload>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.trigger: theme = custom & draggable = true, trigger works fine', () => {
    const wrapper = mount(
      <Upload
        v-slots={{ trigger: () => <span class="custom-node">TNode</span> }}
        theme={'custom'}
        draggable={true}
      ></Upload>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.trigger: a function with params, props.trigger: theme = custom & draggable = true, trigger works fine', () => {
    const fn = vi.fn();
    mount(<Upload trigger={fn} theme={'custom'} draggable={true}></Upload>);
    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][1].dragActive).toBe(false);
    expect(fn.mock.calls[0][1].files).toEqual([]);
  });
  it('slots.trigger: a function with params, props.trigger: theme = custom & draggable = true, trigger works fine', () => {
    const fn = vi.fn();
    mount(<Upload v-slots={{ trigger: fn }} theme={'custom'} draggable={true}></Upload>);

    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][0].dragActive).toBe(false);
    expect(fn.mock.calls[0][0].files).toEqual([]);
  });

  it('props.trigger: theme = custom, trigger works fine', () => {
    const wrapper = mount(<Upload trigger={() => <span class="custom-node">TNode</span>} theme={'custom'}></Upload>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.trigger: theme = custom, trigger works fine', () => {
    const wrapper = mount(
      <Upload v-slots={{ trigger: () => <span class="custom-node">TNode</span> }} theme={'custom'}></Upload>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.trigger: theme = custom, trigger is right with files', () => {
    const wrapper = mount(
      <Upload
        trigger={() => <span class="custom-node">TNode</span>}
        theme={'custom'}
        draggable={true}
        files={[{ name: 'file-name.txt', status: 'progress' }]}
      ></Upload>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.trigger: theme = custom, trigger is right with files', () => {
    const wrapper = mount(
      <Upload
        v-slots={{ trigger: () => <span class="custom-node">TNode</span> }}
        theme={'custom'}
        draggable={true}
        files={[{ name: 'file-name.txt', status: 'progress' }]}
      ></Upload>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.trigger: a function with params, props.trigger: theme = custom, trigger is right with files', () => {
    const fn = vi.fn();
    mount(
      <Upload
        trigger={fn}
        theme={'custom'}
        draggable={true}
        files={[{ name: 'file-name.txt', status: 'progress' }]}
      ></Upload>,
    );
    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][1].dragActive).toBe(false);
    expect(fn.mock.calls[0][1].files).toEqual([{ name: 'file-name.txt', status: 'progress' }]);
  });
  it('slots.trigger: a function with params, props.trigger: theme = custom, trigger is right with files', () => {
    const fn = vi.fn();
    mount(
      <Upload
        v-slots={{ trigger: fn }}
        theme={'custom'}
        draggable={true}
        files={[{ name: 'file-name.txt', status: 'progress' }]}
      ></Upload>,
    );

    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][0].dragActive).toBe(false);
    expect(fn.mock.calls[0][0].files).toEqual([{ name: 'file-name.txt', status: 'progress' }]);
  });

  it('props.triggerButtonProps is equal { theme: warning }', () => {
    const wrapper = mount(
      <Upload
        triggerButtonProps={{ theme: 'warning' }}
        action={'https://tdesign.test.com/upload/file_success'}
      ></Upload>,
    );
    expect(wrapper.findAll('.t-button--theme-warning').length).toBe(1);
  });

  it('props.withCredentials works fine', async () => {
    const onFailFn = vi.fn();
    const wrapper = mount(
      <Upload
        withCredentials={true}
        action={'https://tdesign.test.com/upload/fail/status_error'}
        onFail={onFailFn}
      ></Upload>,
    );
    const inputDom = wrapper.find('input').element;
    simulateFileChange(inputDom);
    await sleep(0);
    expect(onFailFn).toHaveBeenCalled();
    expect(onFailFn.mock.calls[0][0].XMLHttpRequest.withCredentials).toBeTruthy();
  });

  it('events.cancelUpload works fine', async () => {
    const onChangeFn = vi.fn();
    const onCancelUploadFn = vi.fn();
    const wrapper = mount(
      <Upload
        theme={'file'}
        draggable={true}
        autoUpload={true}
        action={'https://tdesign.test.com/upload/file_success'}
        files={[{ name: 'xxx.txt', status: 'progress' }]}
        onChange={onChangeFn}
        onCancelUpload={onCancelUploadFn}
      ></Upload>,
    );
    wrapper.find('.t-upload__dragger-progress-cancel').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).not.toHaveBeenCalled();
    expect(onCancelUploadFn).toHaveBeenCalled();
  });

  it('events.change: can trigger change if autoUpload is false for image', async () => {
    const onChangeFn = vi.fn();
    const wrapper = mount(
      <Upload theme={'image'} draggable={true} autoUpload={false} files={[]} onChange={onChangeFn}></Upload>,
    );
    const inputDom = wrapper.find('input').element;
    const fileList = simulateFileChange(inputDom, 'image', 1);
    await sleep(100);
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0][0].raw).toEqual(fileList[0]);
    expect(onChangeFn.mock.calls[0][1].trigger).toBe('add');
    expect(onChangeFn.mock.calls[0][1].index).toBe(0);
    expect(onChangeFn.mock.calls[0][1].file.raw).toEqual(fileList[0]);
  });

  it('events.change: can trigger change if autoUpload is false for image-flow', async () => {
    const onChangeFn = vi.fn();
    const wrapper = mount(
      <Upload
        theme={'image-flow'}
        draggable={true}
        autoUpload={false}
        multiple={true}
        files={[{ url: 'https://image1.png', status: 'success' }]}
        onChange={onChangeFn}
      ></Upload>,
    );
    const inputDom = wrapper.find('input').element;
    const fileList = simulateFileChange(inputDom, 'image', 1);
    await sleep(100);
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0][0]).toEqual({ url: 'https://image1.png', status: 'success' });
    expect(onChangeFn.mock.calls[0][0][1].raw).toEqual(fileList[0]);
    expect(onChangeFn.mock.calls[0][1].trigger).toBe('add');
    expect(onChangeFn.mock.calls[0][1].index).toBe(1);
    expect(onChangeFn.mock.calls[0][1].file.raw).toEqual(fileList[0]);
    expect(onChangeFn.mock.calls[0][1].files.map((t) => t.raw)).toEqual(fileList);
  });

  it('events.dragenter: drag image enter, trigger onDragenter event', async () => {
    const onDragenterFn = vi.fn();
    const onDragleaveFn2 = vi.fn();
    const wrapper = mount(
      <Upload theme={'image'} draggable={true} onDragenter={onDragenterFn} onDragleave={onDragleaveFn2}></Upload>,
    );
    const tUploadDraggerDom = wrapper.find('.t-upload__dragger').element;
    const files = simulateDragFileChange(tUploadDraggerDom, 'dragEnter', 'image');
    await wrapper.vm.$nextTick();
    expect(onDragenterFn).toHaveBeenCalled();
    expect(onDragenterFn.mock.calls[0][0].e.type).toBe('dragenter');
    expect(onDragenterFn.mock.calls[0][0].e.dataTransfer.files).toEqual(files);
    const tUploadDraggerDom1 = wrapper.find('.t-upload__dragger').element;
    simulateDragFileChange(tUploadDraggerDom1, 'dragOver');
    await wrapper.vm.$nextTick();
    const tUploadDraggerDom2 = wrapper.find('.t-upload__dragger').element;
    simulateDragFileChange(tUploadDraggerDom2, 'dragLeave');
    await wrapper.vm.$nextTick();
    expect(onDragleaveFn2).toHaveBeenCalled();
    expect(onDragleaveFn2.mock.calls[0][0].e.type).toBe('dragleave');
    expect(onDragleaveFn2.mock.calls[0][0].e.dataTransfer.files).toEqual(files);
  });

  it('events.dragenter: drag file enter, trigger onDragenter event', async () => {
    const onDragenterFn = vi.fn();
    const onDragleaveFn2 = vi.fn();
    const wrapper = mount(
      <Upload theme={'file'} draggable={true} onDragenter={onDragenterFn} onDragleave={onDragleaveFn2}></Upload>,
    );
    const tUploadDraggerDom = wrapper.find('.t-upload__dragger').element;
    const files = simulateDragFileChange(tUploadDraggerDom, 'dragEnter');
    await wrapper.vm.$nextTick();
    expect(onDragenterFn).toHaveBeenCalled();
    expect(onDragenterFn.mock.calls[0][0].e.type).toBe('dragenter');
    expect(onDragenterFn.mock.calls[0][0].e.dataTransfer.files).toEqual(files);
    const tUploadDraggerDom1 = wrapper.find('.t-upload__dragger').element;
    simulateDragFileChange(tUploadDraggerDom1, 'dragOver');
    await wrapper.vm.$nextTick();
    const tUploadDraggerDom2 = wrapper.find('.t-upload__dragger').element;
    simulateDragFileChange(tUploadDraggerDom2, 'dragLeave');
    await wrapper.vm.$nextTick();
    expect(onDragleaveFn2).toHaveBeenCalled();
    expect(onDragleaveFn2.mock.calls[0][0].e.type).toBe('dragleave');
    expect(onDragleaveFn2.mock.calls[0][0].e.dataTransfer.files).toEqual(files);
  });

  it('events.dragleave: can not trigger dragleave event if drag leave other dom', async () => {
    const onDragleaveFn1 = vi.fn();
    const wrapper = mount(
      <Upload
        theme={'image'}
        draggable={true}
        action={'https://tdesign.test.com/upload/file_success'}
        onDragleave={onDragleaveFn1}
      ></Upload>,
    );
    const tUploadDraggerDom = wrapper.find('.t-upload__dragger').element;
    simulateDragFileChange(tUploadDraggerDom, 'dragEnter');
    await wrapper.vm.$nextTick();
    const tUploadTriggerDom1 = wrapper.find('.t-upload__trigger').element;
    simulateDragFileChange(tUploadTriggerDom1, 'dragLeave');
    await wrapper.vm.$nextTick();
    expect(onDragleaveFn1).not.toHaveBeenCalled();
  });

  it('events.drop: drag image drop, trigger onDrop event', async () => {
    const onDropFn = vi.fn();
    const wrapper = mount(
      <Upload
        theme={'image'}
        draggable={true}
        action={'https://tdesign.test.com/upload/file_success'}
        onDrop={onDropFn}
      ></Upload>,
    );
    const tUploadDraggerDom = wrapper.find('.t-upload__dragger').element;
    const files = simulateDragFileChange(tUploadDraggerDom, 'drop', 'image');
    await wrapper.vm.$nextTick();
    expect(onDropFn).toHaveBeenCalled();
    expect(onDropFn.mock.calls[0][0].e.type).toBe('drop');
    expect(onDropFn.mock.calls[0][0].e.dataTransfer.files).toEqual(files);
  });

  it('events.drop: drag file drop, trigger onDrop event', async () => {
    const onDropFn = vi.fn();
    const wrapper = mount(
      <Upload
        theme={'file'}
        draggable={true}
        action={'https://tdesign.test.com/upload/file_success'}
        onDrop={onDropFn}
      ></Upload>,
    );
    const tUploadDraggerDom = wrapper.find('.t-upload__dragger').element;
    const files = simulateDragFileChange(tUploadDraggerDom, 'drop');
    await wrapper.vm.$nextTick();
    expect(onDropFn).toHaveBeenCalled();
    expect(onDropFn.mock.calls[0][0].e.type).toBe('drop');
    expect(onDropFn.mock.calls[0][0].e.dataTransfer.files).toEqual(files);
  });

  it('events.fail works fine', async () => {
    const onFailFn = vi.fn();
    const wrapper = mount(
      <Upload action={'https://tdesign.test.com/upload/fail/status_error'} onFail={onFailFn}></Upload>,
    );
    const inputDom = wrapper.find('input').element;
    const fileList = simulateFileChange(inputDom);
    await sleep(0);
    expect(onFailFn).toHaveBeenCalled();
    expect(onFailFn.mock.calls[0][0].XMLHttpRequest.upload.requestParams).toEqual({ file: fileList[0], length: 1 });
  });

  it('events.preview: single image preview works fine', async () => {
    const onPreviewFn1 = vi.fn();
    const wrapper = mount(
      <Upload
        files={[{ url: 'https://tdesign.gtimg.com/demo/demo-image-1.png', name: 'demo-image-1.png' }]}
        theme={'image'}
        onPreview={onPreviewFn1}
      ></Upload>,
    );
    wrapper.find('.t-upload__card-item').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    wrapper.find('.t-icon-browse').trigger('click');
    await sleep(300);
    const attrDom1 = document.querySelector('.t-image-viewer__modal-image');
    expect(attrDom1.getAttribute('src')).toBe('https://tdesign.gtimg.com/demo/demo-image-1.png');
    document.querySelectorAll('.t-image-viewer').forEach((node) => node.remove());
    expect(onPreviewFn1).toHaveBeenCalled();
    expect(onPreviewFn1.mock.calls[0][0].file).toEqual({
      url: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
      name: 'demo-image-1.png',
    });
    expect(onPreviewFn1.mock.calls[0][0].index).toBe(0);
    expect(onPreviewFn1.mock.calls[0][0].e.type).toBe('click');
  });

  it('events.preview: multiple image preview works fine', async () => {
    const onPreviewFn1 = vi.fn();
    const wrapper = mount(
      <Upload
        files={[
          { url: 'https://tdesign.gtimg.com/demo/demo-image-1.png', name: 'demo-image-1.png' },
          { url: 'https://tdesign.gtimg.com/site/avatar.jpg', name: 'avatar.jpg' },
        ]}
        theme={'image'}
        multiple={true}
        onPreview={onPreviewFn1}
      ></Upload>,
    );
    wrapper.find('.t-upload__card-item:last-child').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    wrapper.find('.t-upload__card-item:nth-child(2) .t-icon-browse').trigger('click');
    await sleep(300);
    const attrDom1 = document.querySelector('.t-image-viewer__modal-image');
    expect(attrDom1.getAttribute('src')).toBe('https://tdesign.gtimg.com/site/avatar.jpg');
    document.querySelectorAll('.t-image-viewer').forEach((node) => node.remove());
    expect(onPreviewFn1).toHaveBeenCalled();
    expect(onPreviewFn1.mock.calls[0][0].file).toEqual({
      url: 'https://tdesign.gtimg.com/site/avatar.jpg',
      name: 'avatar.jpg',
    });
    expect(onPreviewFn1.mock.calls[0][0].index).toBe(1);
    expect(onPreviewFn1.mock.calls[0][0].e.type).toBe('click');
  });

  it('events.preview: theme=image-flow, image preview works fine', async () => {
    const onPreviewFn1 = vi.fn();
    const wrapper = mount(
      <Upload
        files={[
          { url: 'https://tdesign.gtimg.com/demo/demo-image-1.png', name: 'demo-image-1.png' },
          { url: 'https://tdesign.gtimg.com/site/avatar.jpg', name: 'avatar.jpg' },
        ]}
        theme={'image-flow'}
        multiple={true}
        onPreview={onPreviewFn1}
      ></Upload>,
    );
    wrapper.find('.t-upload__card-item:nth-child(2)').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    wrapper.find('.t-upload__card-item:nth-child(2) .t-icon-browse').trigger('click');
    await sleep(300);
    const attrDom1 = document.querySelector('.t-image-viewer__modal-image');
    expect(attrDom1.getAttribute('src')).toBe('https://tdesign.gtimg.com/site/avatar.jpg');
    document.querySelectorAll('.t-image-viewer').forEach((node) => node.remove());
    expect(onPreviewFn1).toHaveBeenCalled();
    expect(onPreviewFn1.mock.calls[0][0].file).toEqual({
      url: 'https://tdesign.gtimg.com/site/avatar.jpg',
      name: 'avatar.jpg',
    });
    expect(onPreviewFn1.mock.calls[0][0].index).toBe(1);
    expect(onPreviewFn1.mock.calls[0][0].e.type).toBe('click');
  });

  it('events.remove: remove single file, trigger remove event', async () => {
    const onChangeFn = vi.fn();
    const onRemoveFn = vi.fn();
    const wrapper = mount(
      <Upload
        files={[{ name: 'file1.txt', url: 'https://xxx1.txt' }]}
        onChange={onChangeFn}
        onRemove={onRemoveFn}
      ></Upload>,
    );
    wrapper.find('.t-upload__icon-delete').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0]).toEqual([]);
    expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
    expect(onRemoveFn).toHaveBeenCalled();
    expect(onRemoveFn.mock.calls[0][0].index).toBe(0);
    expect(onRemoveFn.mock.calls[0][0].file).toBeTruthy();
    expect(onRemoveFn.mock.calls[0][0].e.type).toBe('click');
  });

  it('events.remove: remove only one of file list, trigger remove event', async () => {
    const onChangeFn = vi.fn();
    const onRemoveFn = vi.fn();
    const wrapper = mount(
      <Upload
        multiple={true}
        files={[
          { name: 'file1.txt', url: 'https://xxx1.txt' },
          { name: 'file2.txt', url: 'https://xxx2.txt' },
          { name: 'file3.txt', url: 'https://xxx3.txt' },
        ]}
        onChange={onChangeFn}
        onRemove={onRemoveFn}
      ></Upload>,
    );
    wrapper.find('.t-upload__single-display-text .t-upload__icon-delete').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0]).toEqual([
      { name: 'file2.txt', url: 'https://xxx2.txt' },
      { name: 'file3.txt', url: 'https://xxx3.txt' },
    ]);
    expect(onChangeFn.mock.calls[0][1].index).toBe(0);
    expect(onChangeFn.mock.calls[0][1].file).toBeTruthy();
    expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
    expect(onRemoveFn).toHaveBeenCalled();
    expect(onRemoveFn.mock.calls[0][0].index).toBe(0);
    expect(onRemoveFn.mock.calls[0][0].file).toBeTruthy();
    expect(onRemoveFn.mock.calls[0][0].e.type).toBe('click');
  });

  it('events.remove: failed image file can be removed', async () => {
    const onChangeFn = vi.fn();
    const onRemoveFn = vi.fn();
    const wrapper = mount(
      <Upload
        theme={'image'}
        multiple={true}
        files={[{ name: 'image1.png', status: 'fail' }]}
        onChange={onChangeFn}
        onRemove={onRemoveFn}
      ></Upload>,
    );
    wrapper.find('.t-upload__card-mask-item .t-icon-delete').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0]).toEqual([]);
    expect(onChangeFn.mock.calls[0][1].index).toBe(0);
    expect(onChangeFn.mock.calls[0][1].file).toBeTruthy();
    expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
    expect(onRemoveFn).toHaveBeenCalled();
    expect(onRemoveFn.mock.calls[0][0].index).toBe(0);
    expect(onRemoveFn.mock.calls[0][0].file).toBeTruthy();
    expect(onRemoveFn.mock.calls[0][0].e.type).toBe('click');
  });

  it('events.remove: success status image can be removed', async () => {
    const onChangeFn = vi.fn();
    const onRemoveFn = vi.fn();
    const wrapper = mount(
      <Upload
        theme={'image'}
        multiple={true}
        files={[{ url: 'https://image1.png', status: 'success' }]}
        onChange={onChangeFn}
        onRemove={onRemoveFn}
      ></Upload>,
    );
    wrapper.find('.t-upload__card-mask-item .t-icon-delete').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0]).toEqual([]);
    expect(onChangeFn.mock.calls[0][1].index).toBe(0);
    expect(onChangeFn.mock.calls[0][1].file).toBeTruthy();
    expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
    expect(onRemoveFn).toHaveBeenCalled();
    expect(onRemoveFn.mock.calls[0][0].index).toBe(0);
    expect(onRemoveFn.mock.calls[0][0].file).toBeTruthy();
    expect(onRemoveFn.mock.calls[0][0].e.type).toBe('click');
  });

  it('events.remove: theme=file-input, file can be removed to be empty', async () => {
    const onChangeFn = vi.fn();
    const onRemoveFn = vi.fn();
    const wrapper = mount(
      <Upload
        theme={'file-input'}
        files={[{ name: 'file.txt', status: 'success' }]}
        onChange={onChangeFn}
        onRemove={onRemoveFn}
      ></Upload>,
    );
    wrapper.find('.t-upload__single-input-clear').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0]).toEqual([]);
    expect(onRemoveFn).toHaveBeenCalled();
    expect(onRemoveFn.mock.calls[0][0].e.type).toBe('click');
  });

  it('events.remove: theme=file-flow, remove file, trigger remove event', async () => {
    const onChangeFn = vi.fn();
    const onRemoveFn = vi.fn();
    const wrapper = mount(
      <Upload
        theme={'file-flow'}
        multiple={true}
        files={[{ name: 'file1.txt', url: 'https://xxx1.txt' }]}
        onChange={onChangeFn}
        onRemove={onRemoveFn}
      ></Upload>,
    );
    wrapper.find('.t-upload__delete').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0]).toEqual([]);
    expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
    expect(onRemoveFn).toHaveBeenCalled();
    expect(onRemoveFn.mock.calls[0][0].index).toBe(0);
    expect(onRemoveFn.mock.calls[0][0].file).toBeTruthy();
    expect(onRemoveFn.mock.calls[0][0].e.type).toBe('click');
  });

  it('events.remove: theme=image-flow, remove file, trigger remove event', async () => {
    const onChangeFn = vi.fn();
    const onRemoveFn = vi.fn();
    const wrapper = mount(
      <Upload
        theme={'image-flow'}
        multiple={true}
        files={[{ name: 'file1.txt', url: 'https://xxx1.txt' }]}
        onChange={onChangeFn}
        onRemove={onRemoveFn}
      ></Upload>,
    );
    wrapper.find('.t-upload__delete').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0]).toEqual([]);
    expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
    expect(onRemoveFn).toHaveBeenCalled();
    expect(onRemoveFn.mock.calls[0][0].index).toBe(0);
    expect(onRemoveFn.mock.calls[0][0].file).toBeTruthy();
    expect(onRemoveFn.mock.calls[0][0].e.type).toBe('click');
  });

  it('events.remove: theme=file-flow & isBatchUpload=true, remove all files if click delete node', async () => {
    const onChangeFn = vi.fn();
    const onRemoveFn = vi.fn();
    const wrapper = mount(
      <Upload
        theme={'file-flow'}
        multiple={true}
        isBatchUpload={true}
        files={[
          { name: 'file1.txt', url: 'https://xxx1.txt' },
          { name: 'file2.txt', url: 'https://xxx2.txt' },
        ]}
        onChange={onChangeFn}
        onRemove={onRemoveFn}
      ></Upload>,
    );
    wrapper.find('.t-upload__delete').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0]).toEqual([]);
    expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
    expect(onRemoveFn).toHaveBeenCalled();
    expect(onRemoveFn.mock.calls[0][0].index).toBe(-1);
    expect(onRemoveFn.mock.calls[0][0].file).toBe(undefined);
    expect(onRemoveFn.mock.calls[0][0].e.type).toBe('click');
  });

  it('events.remove: theme=image & draggable=true, success file can be removed', async () => {
    const onChangeFn = vi.fn();
    const onRemoveFn = vi.fn();
    const wrapper = mount(
      <Upload
        theme={'image'}
        draggable={true}
        files={[{ url: 'https://www.image.png', status: 'success' }]}
        onChange={onChangeFn}
        onRemove={onRemoveFn}
      ></Upload>,
    );
    wrapper.find('.t-upload__dragger-delete-btn').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0]).toEqual([]);
    expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
    expect(onRemoveFn).toHaveBeenCalled();
    expect(onRemoveFn.mock.calls[0][0].index).toBe(0);
    expect(onRemoveFn.mock.calls[0][0].file).toEqual({ url: 'https://www.image.png', status: 'success' });
    expect(onRemoveFn.mock.calls[0][0].e.type).toBe('click');
  });

  it('events.remove: theme=file & multiple=true & autoUpload=false', async () => {
    const onChangeFn = vi.fn();
    const onRemoveFn = vi.fn();
    const wrapper = mount(
      <Upload
        theme={'file'}
        multiple={true}
        autoUpload={false}
        files={[
          { name: 'file1.txt' },
          { name: 'file2.txt', status: 'success' },
          { name: 'file3.txt', status: 'waiting' },
        ]}
        onChange={onChangeFn}
        onRemove={onRemoveFn}
      ></Upload>,
    );
    wrapper.find('.t-upload__single-display-text:last-child .t-upload__icon-delete').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0]).toEqual([{ name: 'file1.txt' }, { name: 'file2.txt', status: 'success' }]);
    expect(onRemoveFn).toHaveBeenCalled();
    expect(onRemoveFn.mock.calls[0][0].index).toBe(2);
    expect(onRemoveFn.mock.calls[0][0].file).toEqual({ name: 'file3.txt', status: 'waiting' });
    expect(onRemoveFn.mock.calls[0][0].e.type).toBe('click');
  });

  it('events.remove: theme=file-flow & multiple=true & autoUpload=true, remove success file', async () => {
    const onChangeFn = vi.fn();
    const onRemoveFn = vi.fn();
    const wrapper = mount(
      <Upload
        theme={'file-flow'}
        multiple={true}
        autoUpload={true}
        files={[
          { name: 'file1.txt' },
          { name: 'file2.txt', status: 'success' },
          { name: 'file3.txt', status: 'waiting' },
          { name: 'file4.txt', status: 'fail' },
        ]}
        onChange={onChangeFn}
        onRemove={onRemoveFn}
      ></Upload>,
    );
    wrapper.find('.t-upload__flow-table tbody tr:nth-child(2) .t-upload__delete').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0]).toEqual([
      { name: 'file1.txt' },
      { name: 'file3.txt', status: 'waiting' },
      { name: 'file4.txt', status: 'fail' },
    ]);
    expect(onRemoveFn).toHaveBeenCalled();
    expect(onRemoveFn.mock.calls[0][0].index).toBe(1);
    expect(onRemoveFn.mock.calls[0][0].file).toEqual({ name: 'file2.txt', status: 'success' });
    expect(onRemoveFn.mock.calls[0][0].e.type).toBe('click');
  });

  it('events.remove: theme=file-flow & multiple=true & autoUpload=true, remove fail file', async () => {
    const onChangeFn1 = vi.fn();
    const onRemoveFn1 = vi.fn();
    const wrapper = mount(
      <Upload
        theme={'file-flow'}
        multiple={true}
        autoUpload={true}
        files={[{ name: 'file1.txt' }, { name: 'file2.txt', status: 'success' }]}
        action={'https://tdesign.test.com/upload/fail/status_error'}
        onChange={onChangeFn1}
        onRemove={onRemoveFn1}
      ></Upload>,
    );
    const inputDom = wrapper.find('input').element;
    simulateFileChange(inputDom);
    await sleep(0);
    wrapper.find('.t-upload__flow-table tbody tr:last-child .t-upload__delete').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn1).not.toHaveBeenCalled();
    expect(onRemoveFn1).toHaveBeenCalled();
    expect(onRemoveFn1.mock.calls[0][0].index).toBe(2);
    expect(onRemoveFn1.mock.calls[0][0].file.name).toBe('file-name.txt');
    expect(onRemoveFn1.mock.calls[0][0].file.status).toBe('fail');
    expect(onRemoveFn1.mock.calls[0][0].e.type).toBe('click');
  });
});
