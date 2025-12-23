// @ts-nocheck
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { Upload } from '@tdesign/components/upload';
import { sleep } from '@tdesign/internal-utils';
import { simulateFileChange, getFakeFileList, simulateDragFileChange } from '@tdesign/internal-tests/utils';
import { getUploadServer } from './request';

describe('Upload', () => {
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

  describe('props', () => {
    it(':abridgeName', () => {
      // theme=file-input
      const wrapperFileInput = mount(
        <Upload theme={'file-input'} files={[{ name: 'this_is_a_long_name.png' }]} abridgeName={[8, 6]}></Upload>,
      );
      expect(wrapperFileInput.find('.t-upload__single-input-text').text()).toBe('this_is_…me.png');

      // theme=file with url
      const wrapperFileWithUrl = mount(
        <Upload
          theme={'file'}
          files={[{ name: 'this_is_a_long_name.png', url: 'https://xxx.png' }]}
          abridgeName={[8, 6]}
        ></Upload>,
      );
      expect(wrapperFileWithUrl.find('.t-upload__single-name').text()).toBe('this_is_…me.png');

      // theme=file without url
      const wrapperFileWithoutUrl = mount(
        <Upload theme={'file'} files={[{ name: 'this_is_a_long_name.png' }]} abridgeName={[8, 6]}></Upload>,
      );
      expect(wrapperFileWithoutUrl.find('.t-upload__single-name').text()).toBe('this_is_…me.png');

      // theme=image
      const wrapperImage = mount(
        <Upload theme={'image'} files={[{ name: 'this_is_a_long_name.png' }]} abridgeName={[8, 6]}></Upload>,
      );
      expect(wrapperImage.find('.t-upload__card-name').text()).toBe('this_is_…me.png');

      // theme=file & draggable=true
      const wrapperFileDraggable = mount(
        <Upload
          theme={'file'}
          draggable={true}
          files={[{ name: 'this_is_a_long_name.png' }]}
          abridgeName={[8, 6]}
        ></Upload>,
      );
      expect(wrapperFileDraggable.find('.t-upload__single-name').text()).toBe('this_is_…me.png');

      // theme=image & draggable=true
      const wrapperImageDraggable = mount(
        <Upload
          theme={'image'}
          draggable={true}
          status={'success'}
          files={[{ name: 'this_is_a_long_name.png', url: 'https://wwww.png' }]}
          abridgeName={[8, 6]}
        ></Upload>,
      );
      expect(wrapperImageDraggable.find('.t-upload__single-name').text()).toBe('this_is_…me.png');

      // theme=image-flow
      const wrapperImageFlow = mount(
        <Upload
          theme={'image-flow'}
          files={[{ name: 'this_is_a_long_name.jpg', url: 'https://xxx.jpg' }]}
          abridgeName={[8, 6]}
        ></Upload>,
      );
      expect(wrapperImageFlow.find('.t-upload__card-name').text()).toBe('this_is_…me.jpg');

      // theme=file-flow with url
      const wrapperFileFlowWithUrl = mount(
        <Upload
          theme={'file-flow'}
          files={[{ name: 'this_is_a_long_name.jpg', url: 'https://xxx.jpg' }]}
          abridgeName={[8, 6]}
        ></Upload>,
      );
      expect(wrapperFileFlowWithUrl.find('.t-upload__file-name > a').text()).toBe('this_is_…me.jpg');

      // theme=file-flow without url
      const wrapperFileFlowWithoutUrl = mount(
        <Upload theme={'file-flow'} files={[{ name: 'this_is_a_long_name.jpg' }]} abridgeName={[8, 6]}></Upload>,
      );
      expect(wrapperFileFlowWithoutUrl.find('.t-upload__file-name').text()).toBe('this_is_…me.jpg');
    });

    it(':accept', () => {
      const wrapper = mount(<Upload accept={'image/*'}></Upload>).find('input');
      expect(wrapper.attributes('accept')).toBe('image/*');
    });

    it(':action', async () => {
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

    it(':allowUploadDuplicateFile[true/false]', async () => {
      // false
      const onValidateFnFalse = vi.fn();
      const wrapperFalse = mount(
        <Upload
          files={[{ name: 'file-name.txt', url: 'https://tdesign.gtimg.com/site/source/figma-pc.png' }]}
          action={'https://tdesign.test.com/upload/file_success'}
          allowUploadDuplicateFile={false}
          onValidate={onValidateFnFalse}
        ></Upload>,
      );
      const inputDomFalse = wrapperFalse.find('input').element;
      const fileListFalse = simulateFileChange(inputDomFalse);
      await wrapperFalse.vm.$nextTick();
      expect(onValidateFnFalse).toHaveBeenCalled();
      expect(onValidateFnFalse.mock.calls[0][0].type).toBe('FILTER_FILE_SAME_NAME');
      expect(onValidateFnFalse.mock.calls[0][0].files[0].raw).toEqual(fileListFalse[0]);

      // true
      const onValidateFnTrue = vi.fn();
      const wrapperTrue = mount(
        <Upload
          files={[{ name: 'file-name.txt', url: 'https://tdesign.gtimg.com/site/source/figma-pc.png' }]}
          action={'https://tdesign.test.com/upload/file_success'}
          allowUploadDuplicateFile={true}
          onValidate={onValidateFnTrue}
        ></Upload>,
      );
      const inputDomTrue = wrapperTrue.find('input').element;
      simulateFileChange(inputDomTrue);
      await wrapperTrue.vm.$nextTick();
      expect(onValidateFnTrue).not.toHaveBeenCalled();
    });

    it(':autoUpload[false]', async () => {
      // basic test
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

    it(':autoUpload[false] theme=file-flow cancel upload', async () => {
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

    it(':autoUpload[false] theme=image draggable=true', async () => {
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

    it(':beforeAllFilesUpload', async () => {
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

    it(':beforeUpload', async () => {
      // skip all files
      const onChangeFnAll = vi.fn();
      const onValidateFnAll = vi.fn();
      const wrapperAll = mount(
        <Upload
          autoUpload={false}
          beforeUpload={() => false}
          action={'https://tdesign.test.com/upload/file_success'}
          onChange={onChangeFnAll}
          onValidate={onValidateFnAll}
        ></Upload>,
      );
      const inputDomAll = wrapperAll.find('input').element;
      const fileListAll = simulateFileChange(inputDomAll, 'file', 3);
      await sleep(0);
      expect(onChangeFnAll).not.toHaveBeenCalled();
      expect(onValidateFnAll).toHaveBeenCalled();
      expect(onValidateFnAll.mock.calls[0][0].type).toBe('CUSTOM_BEFORE_UPLOAD');
      expect(onValidateFnAll.mock.calls[0][0].files.map((t) => t.raw)).toEqual(fileListAll);

      // skip some files
      const onChangeFnSome = vi.fn();
      const onValidateFnSome = vi.fn();
      const wrapperSome = mount(
        <Upload
          autoUpload={false}
          beforeUpload={(file) => file.name === 'file-name1.txt'}
          action={'https://tdesign.test.com/upload/file_success'}
          onChange={onChangeFnSome}
          onValidate={onValidateFnSome}
        ></Upload>,
      );
      const inputDomSome = wrapperSome.find('input').element;
      const fileListSome = simulateFileChange(inputDomSome, 'file', 3);
      await sleep(0);
      expect(onChangeFnSome).toHaveBeenCalled();
      expect(onChangeFnSome.mock.calls[0][0][0].raw).toEqual(fileListSome[1]);
      expect(onValidateFnSome).toHaveBeenCalled();
      expect(onValidateFnSome.mock.calls[0][0].type).toBe('CUSTOM_BEFORE_UPLOAD');
      expect(onValidateFnSome.mock.calls[0][0].files.map((t) => t.raw)).toEqual([fileListSome[0], fileListSome[2]]);
    });

    it(':data', async () => {
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

    it(':default[prop/slot]', () => {
      // prop
      const wrapperProp = mount(
        <Upload
          default={() => <span class="custom-node">TNode</span>}
          action={'https://cdc.cdn-go.cn/tdc/latest/menu.json'}
        ></Upload>,
      );
      expect(wrapperProp.find('.custom-node').exists()).toBeTruthy();

      // slot
      const wrapperSlot = mount(
        <Upload
          v-slots={{ default: () => <span class="custom-node">TNode</span> }}
          action={'https://cdc.cdn-go.cn/tdc/latest/menu.json'}
        ></Upload>,
      );
      expect(wrapperSlot.find('.custom-node').exists()).toBeTruthy();
    });

    it(':disabled[true]', async () => {
      // theme=file-input: input disabled
      const wrapperInput = mount(<Upload theme={'file-input'} disabled={true}></Upload>);
      expect(wrapperInput.find('.t-input.t-is-disabled').exists()).toBeTruthy();
      expect(wrapperInput.find('.t-upload__trigger .t-button.t-is-disabled').exists()).toBeTruthy();

      // theme=file-flow: no delete button
      const wrapperFileFlow = mount(
        <Upload
          theme={'file-flow'}
          disabled={true}
          multiple={true}
          files={[{ name: 'file1.txt', status: 'success' }]}
        ></Upload>,
      );
      expect(wrapperFileFlow.find('.t-upload__delete').exists()).toBeFalsy();

      // theme=image-flow: no delete button
      const wrapperImageFlow = mount(
        <Upload
          theme={'image-flow'}
          disabled={true}
          multiple={true}
          files={[{ name: 'file1.txt', status: 'success' }]}
        ></Upload>,
      );
      expect(wrapperImageFlow.find('.t-upload__delete').exists()).toBeFalsy();

      // can not trigger onSelectChange
      const onSelectChangeFn = vi.fn();
      const wrapperSelect = mount(<Upload disabled={true} onSelectChange={onSelectChangeFn}></Upload>);
      const inputDom = wrapperSelect.find('input').element;
      simulateFileChange(inputDom);
      await sleep(0);
      expect(onSelectChangeFn).not.toHaveBeenCalled();

      // can not remove file
      const wrapperFile = mount(<Upload theme={'file'} files={[{ name: 'file1.txt' }]} disabled={true}></Upload>);
      await wrapperFile.vm.$nextTick();
      expect(wrapperFile.find('.t-upload__icon-delete').exists()).toBeFalsy();

      // can not remove image
      const wrapperImage = mount(
        <Upload theme={'image'} files={[{ name: 'img1.txt', url: 'https://img1.png' }]} disabled={true}></Upload>,
      );
      await wrapperImage.vm.$nextTick();
      expect(wrapperImage.find('.t-upload__icon-delete').exists()).toBeFalsy();
    });

    it(':dragContent[prop/slot]', () => {
      // prop
      const wrapperProp = mount(
        <Upload
          dragContent={() => <span class="custom-node">TNode</span>}
          theme={'custom'}
          draggable={true}
          action={'https://tdesign.test.com/upload/file_success'}
        ></Upload>,
      );
      expect(wrapperProp.find('.custom-node').exists()).toBeTruthy();

      // slot: dragContent
      const wrapperSlot = mount(
        <Upload
          v-slots={{ dragContent: () => <span class="custom-node">TNode</span> }}
          theme={'custom'}
          draggable={true}
          action={'https://tdesign.test.com/upload/file_success'}
        ></Upload>,
      );
      expect(wrapperSlot.find('.custom-node').exists()).toBeTruthy();

      // slot: drag-content (kebab-case)
      const wrapperSlotKebab = mount(
        <Upload
          v-slots={{ 'drag-content': () => <span class="custom-node">TNode</span> }}
          theme={'custom'}
          draggable={true}
          action={'https://tdesign.test.com/upload/file_success'}
        ></Upload>,
      );
      expect(wrapperSlotKebab.find('.custom-node').exists()).toBeTruthy();
    });

    it(':draggable[theme=image]', async () => {
      // success file with url
      const wrapperSuccess = mount(
        <Upload
          theme={'image'}
          draggable={true}
          files={[{ url: 'https://tdesign.gtimg.com/demo/demo-image-1.png', name: 'image1.png', status: 'success' }]}
        ></Upload>,
      );
      expect(wrapperSuccess.findAll('.t-icon-check-circle-filled').length).toBe(1);
      const attrDom = wrapperSuccess.find('.t-upload__dragger-img-wrap img');
      expect(attrDom.attributes('src')).toBe('https://tdesign.gtimg.com/demo/demo-image-1.png');
      expect(wrapperSuccess.element).toMatchSnapshot('draggable-image-success');

      // success file with response.url
      const wrapperResponseUrl = mount(
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
      expect(wrapperResponseUrl.findAll('.t-icon-check-circle-filled').length).toBe(1);
      const attrDomResponse = wrapperResponseUrl.find('.t-upload__dragger-img-wrap img');
      expect(attrDomResponse.attributes('src')).toBe('https://tdesign.gtimg.com/demo/demo-image-1.png');
      expect(wrapperResponseUrl.element).toMatchSnapshot('draggable-image-success-response-url');

      // fail file
      const wrapperFail = mount(
        <Upload
          theme={'image'}
          draggable={true}
          files={[{ url: 'https://image4.png', name: 'image4.png', status: 'fail' }]}
        ></Upload>,
      );
      expect(wrapperFail.findAll('.t-icon-error-circle-filled').length).toBe(1);
      expect(wrapperFail.element).toMatchSnapshot('draggable-image-fail');

      // progress file
      const wrapperProgress = mount(
        <Upload
          theme={'image'}
          draggable={true}
          files={[{ url: 'https://image2.png', name: 'image2.png', status: 'progress', percent: 80 }]}
        ></Upload>,
      );
      expect(wrapperProgress.find('.t-upload__single-percent').text()).toBe('80%');
      expect(wrapperProgress.element).toMatchSnapshot('draggable-image-progress');

      // waiting file
      const wrapperWaiting = mount(
        <Upload
          theme={'image'}
          draggable={true}
          files={[{ url: 'https://image3.png', name: 'image3.png', status: 'waiting' }]}
        ></Upload>,
      );
      expect(wrapperWaiting.findAll('.t-upload__dragger-progress-cancel').length).toBe(1);
      expect(wrapperWaiting.element).toMatchSnapshot('draggable-image-waiting');

      // waiting file with autoUpload=false
      const wrapperWaitingNoAuto = mount(
        <Upload
          theme={'image'}
          draggable={true}
          autoUpload={false}
          files={[{ url: 'https://image3.png', name: 'image3.png', status: 'waiting' }]}
        ></Upload>,
      );
      expect(wrapperWaitingNoAuto.findAll('.t-upload__dragger-progress-cancel').length).toBe(1);

      // cancel upload
      const onCancelUploadFn = vi.fn();
      const onRemoveFn = vi.fn();
      const wrapperCancel = mount(
        <Upload
          theme={'image'}
          draggable={true}
          autoUpload={false}
          files={[{ url: 'https://image3.png', name: 'image3.png', status: 'waiting' }]}
          onCancelUpload={onCancelUploadFn}
          onRemove={onRemoveFn}
        ></Upload>,
      );
      wrapperCancel.find('.t-upload__dragger-progress-cancel').trigger('click');
      await wrapperCancel.vm.$nextTick();
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

    it(':fileListDisplay[theme=file]', () => {
      const fileList = getFakeFileList('file', 3);

      // prop
      const wrapperProp = mount(
        <Upload
          fileListDisplay={() => <span class="custom-node">TNode</span>}
          files={fileList}
          theme={'file'}
          action={'https://tdesign.test.com/upload/file_success'}
        ></Upload>,
      );
      expect(wrapperProp.find('.custom-node').exists()).toBeTruthy();

      // slot: fileListDisplay
      const wrapperSlot = mount(
        <Upload
          v-slots={{ fileListDisplay: () => <span class="custom-node">TNode</span> }}
          files={fileList}
          theme={'file'}
          action={'https://tdesign.test.com/upload/file_success'}
        ></Upload>,
      );
      expect(wrapperSlot.find('.custom-node').exists()).toBeTruthy();

      // slot: file-list-display (kebab-case)
      const wrapperSlotKebab = mount(
        <Upload
          v-slots={{ 'file-list-display': () => <span class="custom-node">TNode</span> }}
          files={fileList}
          theme={'file'}
          action={'https://tdesign.test.com/upload/file_success'}
        ></Upload>,
      );
      expect(wrapperSlotKebab.find('.custom-node').exists()).toBeTruthy();

      // prop with params
      const fnProp = vi.fn();
      mount(
        <Upload
          fileListDisplay={fnProp}
          files={fileList}
          theme={'file'}
          action={'https://tdesign.test.com/upload/file_success'}
        ></Upload>,
      );
      expect(fnProp).toHaveBeenCalled();
      expect(fnProp.mock.calls[0][1].files).toEqual(fileList);

      // slot with params
      const fnSlot = vi.fn();
      mount(
        <Upload
          v-slots={{ fileListDisplay: fnSlot }}
          files={fileList}
          theme={'file'}
          action={'https://tdesign.test.com/upload/file_success'}
        ></Upload>,
      );
      expect(fnSlot).toHaveBeenCalled();
      expect(fnSlot.mock.calls[0][0].files).toEqual(fileList);
    });

    it(':fileListDisplay[theme=image-flow multiple draggable]', () => {
      const fileList = [{ url: 'https://tdesign.gtimg.com/demo/demo-image-1.png' }];

      // prop
      const wrapperProp = mount(
        <Upload
          fileListDisplay={() => <span class="custom-node">TNode</span>}
          files={fileList}
          theme={'image-flow'}
          multiple={true}
          draggable={true}
          action={'https://tdesign.test.com/upload/file_success'}
        ></Upload>,
      );
      expect(wrapperProp.find('.custom-node').exists()).toBeTruthy();

      // slot: fileListDisplay
      const wrapperSlot = mount(
        <Upload
          v-slots={{ fileListDisplay: () => <span class="custom-node">TNode</span> }}
          files={fileList}
          theme={'image-flow'}
          multiple={true}
          draggable={true}
          action={'https://tdesign.test.com/upload/file_success'}
        ></Upload>,
      );
      expect(wrapperSlot.find('.custom-node').exists()).toBeTruthy();

      // slot: file-list-display (kebab-case)
      const wrapperSlotKebab = mount(
        <Upload
          v-slots={{ 'file-list-display': () => <span class="custom-node">TNode</span> }}
          files={fileList}
          theme={'image-flow'}
          multiple={true}
          draggable={true}
          action={'https://tdesign.test.com/upload/file_success'}
        ></Upload>,
      );
      expect(wrapperSlotKebab.find('.custom-node').exists()).toBeTruthy();

      // prop with params
      const fnProp = vi.fn();
      mount(
        <Upload
          fileListDisplay={fnProp}
          files={fileList}
          theme={'image-flow'}
          multiple={true}
          draggable={true}
          action={'https://tdesign.test.com/upload/file_success'}
        ></Upload>,
      );
      expect(fnProp).toHaveBeenCalled();
      expect(fnProp.mock.calls[0][1].files).toEqual(fileList);

      // slot with params
      const fnSlot = vi.fn();
      mount(
        <Upload
          v-slots={{ fileListDisplay: fnSlot }}
          files={fileList}
          theme={'image-flow'}
          multiple={true}
          draggable={true}
          action={'https://tdesign.test.com/upload/file_success'}
        ></Upload>,
      );
      expect(fnSlot).toHaveBeenCalled();
      expect(fnSlot.mock.calls[0][0].files).toEqual(fileList);
    });

    it(':fileListDisplay[theme=file-flow multiple draggable]', () => {
      const fileList = [{ url: 'https://tdesign.gtimg.com/demo/demo-image-1.png' }];

      // prop
      const wrapperProp = mount(
        <Upload
          fileListDisplay={() => <span class="custom-node">TNode</span>}
          files={fileList}
          theme={'file-flow'}
          multiple={true}
          draggable={true}
          action={'https://tdesign.test.com/upload/file_success'}
        ></Upload>,
      );
      expect(wrapperProp.find('.custom-node').exists()).toBeTruthy();

      // slot: fileListDisplay
      const wrapperSlot = mount(
        <Upload
          v-slots={{ fileListDisplay: () => <span class="custom-node">TNode</span> }}
          files={fileList}
          theme={'file-flow'}
          multiple={true}
          draggable={true}
          action={'https://tdesign.test.com/upload/file_success'}
        ></Upload>,
      );
      expect(wrapperSlot.find('.custom-node').exists()).toBeTruthy();

      // slot: file-list-display (kebab-case)
      const wrapperSlotKebab = mount(
        <Upload
          v-slots={{ 'file-list-display': () => <span class="custom-node">TNode</span> }}
          files={fileList}
          theme={'file-flow'}
          multiple={true}
          draggable={true}
          action={'https://tdesign.test.com/upload/file_success'}
        ></Upload>,
      );
      expect(wrapperSlotKebab.find('.custom-node').exists()).toBeTruthy();

      // prop with params
      const fnProp = vi.fn();
      mount(
        <Upload
          fileListDisplay={fnProp}
          files={fileList}
          theme={'file-flow'}
          multiple={true}
          draggable={true}
          action={'https://tdesign.test.com/upload/file_success'}
        ></Upload>,
      );
      expect(fnProp).toHaveBeenCalled();
      expect(fnProp.mock.calls[0][1].files).toEqual(fileList);

      // slot with params
      const fnSlot = vi.fn();
      mount(
        <Upload
          v-slots={{ fileListDisplay: fnSlot }}
          files={fileList}
          theme={'file-flow'}
          multiple={true}
          draggable={true}
          action={'https://tdesign.test.com/upload/file_success'}
        ></Upload>,
      );
      expect(fnSlot).toHaveBeenCalled();
      expect(fnSlot.mock.calls[0][0].files).toEqual(fileList);
    });

    it(':fileListDisplay[theme=file draggable]', () => {
      const files = [{ name: 'file1.txt', status: 'waiting', uploadTime: 1674897038406 }];

      // prop
      const wrapperProp = mount(
        <Upload
          fileListDisplay={() => <span class="custom-node">TNode</span>}
          theme={'file'}
          draggable={true}
          files={files}
        ></Upload>,
      );
      expect(wrapperProp.find('.custom-node').exists()).toBeTruthy();

      // slot: fileListDisplay
      const wrapperSlot = mount(
        <Upload
          v-slots={{ fileListDisplay: () => <span class="custom-node">TNode</span> }}
          theme={'file'}
          draggable={true}
          files={files}
        ></Upload>,
      );
      expect(wrapperSlot.find('.custom-node').exists()).toBeTruthy();

      // slot: file-list-display (kebab-case)
      const wrapperSlotKebab = mount(
        <Upload
          v-slots={{ 'file-list-display': () => <span class="custom-node">TNode</span> }}
          theme={'file'}
          draggable={true}
          files={files}
        ></Upload>,
      );
      expect(wrapperSlotKebab.find('.custom-node').exists()).toBeTruthy();

      // prop with params
      const fnProp = vi.fn();
      mount(<Upload fileListDisplay={fnProp} theme={'file'} draggable={true} files={files}></Upload>);
      expect(fnProp).toHaveBeenCalled();
      expect(fnProp.mock.calls[0][1].files).toEqual(files);

      // slot with params
      const fnSlot = vi.fn();
      mount(<Upload v-slots={{ fileListDisplay: fnSlot }} theme={'file'} draggable={true} files={files}></Upload>);
      expect(fnSlot).toHaveBeenCalled();
      expect(fnSlot.mock.calls[0][0].files).toEqual(files);
    });

    it(':fileListDisplay[theme=image draggable]', () => {
      const files = [{ url: 'https://img1.txt', status: 'waiting', uploadTime: 1674897038406 }];

      // prop
      const wrapperProp = mount(
        <Upload
          fileListDisplay={() => <span class="custom-node">TNode</span>}
          theme={'image'}
          draggable={true}
          files={files}
        ></Upload>,
      );
      expect(wrapperProp.find('.custom-node').exists()).toBeTruthy();

      // slot: fileListDisplay
      const wrapperSlot = mount(
        <Upload
          v-slots={{ fileListDisplay: () => <span class="custom-node">TNode</span> }}
          theme={'image'}
          draggable={true}
          files={files}
        ></Upload>,
      );
      expect(wrapperSlot.find('.custom-node').exists()).toBeTruthy();

      // slot: file-list-display (kebab-case)
      const wrapperSlotKebab = mount(
        <Upload
          v-slots={{ 'file-list-display': () => <span class="custom-node">TNode</span> }}
          theme={'image'}
          draggable={true}
          files={files}
        ></Upload>,
      );
      expect(wrapperSlotKebab.find('.custom-node').exists()).toBeTruthy();

      // prop with params
      const fnProp = vi.fn();
      mount(<Upload fileListDisplay={fnProp} theme={'image'} draggable={true} files={files}></Upload>);
      expect(fnProp).toHaveBeenCalled();
      expect(fnProp.mock.calls[0][1].files).toEqual(files);

      // slot with params
      const fnSlot = vi.fn();
      mount(<Upload v-slots={{ fileListDisplay: fnSlot }} theme={'image'} draggable={true} files={files}></Upload>);
      expect(fnSlot).toHaveBeenCalled();
      expect(fnSlot.mock.calls[0][0].files).toEqual(files);
    });

    it(':format', async () => {
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

    it(':formatRequest', async () => {
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

    it(':formatResponse[success/fail]', async () => {
      // success
      const onChangeFn = vi.fn();
      const wrapperSuccess = mount(
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
      const inputDomSuccess = wrapperSuccess.find('input').element;
      simulateFileChange(inputDomSuccess);
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

      // fail
      const onFailFn = vi.fn();
      const wrapperFail = mount(
        <Upload
          action={'https://tdesign.test.com/upload/fail/response_error'}
          formatResponse={(response) => ({ error: response.error, name: response.name })}
          onFail={onFailFn}
        ></Upload>,
      );
      const inputDomFail = wrapperFail.find('input').element;
      const fileList = simulateFileChange(inputDomFail);
      await sleep(0);
      expect(onFailFn).toHaveBeenCalled();
      expect(onFailFn.mock.calls[0][0].failedFiles[0].raw).toEqual(fileList[0]);
      expect(onFailFn.mock.calls[0][0].currentFiles[0].raw).toEqual(fileList[0]);
      expect(onFailFn.mock.calls[0][0].file.raw).toEqual(fileList[0]);
      expect(onFailFn.mock.calls[0][0].e.type).toBe('load');
      expect(onFailFn.mock.calls[0][0].XMLHttpRequest).toBeTruthy();
      expect(onFailFn.mock.calls[0][0].response).toEqual({ error: 'upload failed', name: 'file-name.txt' });
    });

    it(':headers', async () => {
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

    it(':inputAttributes', () => {
      const wrapper = mount(
        <Upload inputAttributes={{ webkitdirectory: 'webkitdirectory' }} theme={'file-input'}></Upload>,
      );
      const domWrapper = wrapper.find('input');
      expect(domWrapper.attributes('webkitdirectory')).toBe('webkitdirectory');
    });

    it(':isBatchUpload[true]', async () => {
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

    it(':locale[theme=file-flow/image]', () => {
      // theme=file-flow
      const wrapperFileFlow = mount(
        <Upload
          locale={{ progress: { uploadingText: 'uploading' } }}
          theme={'file-flow'}
          files={[{ url: 'https://tdesign.gtimg.com/demo/demo-image-1.png', status: 'progress', percent: 80 }]}
          action={'https://tdesign.test.com/upload/file_success'}
        ></Upload>,
      );
      expect(wrapperFileFlow.find('.t-upload__file-flow-progress').text()).toBe('uploading 80%');

      // theme=image
      const wrapperImage = mount(
        <Upload
          locale={{ progress: { uploadingText: 'uploading' } }}
          theme={'image'}
          files={[{ url: 'https://tdesign.gtimg.com/demo/demo-image-1.png', status: 'progress', percent: 80 }]}
          action={'https://tdesign.test.com/upload/file_success'}
        ></Upload>,
      );
      expect(wrapperImage.find('.t-upload__image-progress').text()).toBe('uploading 80%');
    });

    it(':max', async () => {
      // hide add trigger when reached max
      const wrapperMax = mount(
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
      expect(wrapperMax.find('.t-upload__image-add').exists()).toBeFalsy();

      // prevent upload when reached max
      const onChangeFn = vi.fn();
      const wrapperPrevent = mount(
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
      const inputDom = wrapperPrevent.find('input').element;
      simulateFileChange(inputDom, 'file', 1);
      await sleep(300);
      expect(onChangeFn).not.toHaveBeenCalled();

      // max=0 means unlimited
      const onChangeFnUnlimited = vi.fn();
      const wrapperUnlimited = mount(
        <Upload max={0} multiple={true} autoUpload={false} files={[]} onChange={onChangeFnUnlimited}></Upload>,
      );
      const inputDomUnlimited = wrapperUnlimited.find('input').element;
      simulateFileChange(inputDomUnlimited, 'file', 3);
      await sleep(300);
      expect(onChangeFnUnlimited).toHaveBeenCalled();
      expect(onChangeFnUnlimited.mock.calls[0][0].length).toBe(3);
    });

    it(':name', async () => {
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

    it(':placeholder', () => {
      // theme=file
      const wrapperFile = mount(<Upload theme={'file'} placeholder={'this is placeholder'}></Upload>);
      expect(wrapperFile.find('.t-upload__placeholder').text()).toBe('this is placeholder');

      // theme=file-input
      const wrapperFileInput = mount(<Upload theme={'file-input'} placeholder={'this is placeholder'}></Upload>);
      expect(wrapperFileInput.find('.t-upload__placeholder').text()).toBe('this is placeholder');

      // theme=image-flow
      const wrapperImageFlow = mount(<Upload theme={'image-flow'} placeholder={'this is placeholder'}></Upload>);
      expect(wrapperImageFlow.find('.t-upload__placeholder').text()).toBe('this is placeholder');

      // theme=file-flow
      const wrapperFileFlow = mount(<Upload theme={'file-flow'} placeholder={'this is placeholder'}></Upload>);
      expect(wrapperFileFlow.find('.t-upload__placeholder').text()).toBe('this is placeholder');
    });

    it(':requestMethod', async () => {
      // success
      const onChangeFn = vi.fn();
      const wrapperSuccess = mount(
        <Upload
          theme={'image-flow'}
          multiple={true}
          files={[]}
          requestMethod={() =>
            Promise.resolve({
              status: 'success',
              response: { url: 'https://tdesign.gtimg.com/demo/demo-image-1.png' },
            })
          }
          onChange={onChangeFn}
        ></Upload>,
      );
      const inputDomSuccess = wrapperSuccess.find('input').element;
      const fileListSuccess = simulateFileChange(inputDomSuccess, 'image');
      await sleep(0);
      expect(onChangeFn).toHaveBeenCalled();
      expect(onChangeFn.mock.calls[0][0][0].raw).toEqual(fileListSuccess[0]);
      expect(onChangeFn.mock.calls[0][0][0].response.url).toBe('https://tdesign.gtimg.com/demo/demo-image-1.png');

      // fail
      const onFailFn = vi.fn();
      const wrapperFail = mount(
        <Upload
          theme={'file-flow'}
          multiple={true}
          files={[]}
          requestMethod={() => Promise.resolve({ status: 'fail', error: 'upload failed' })}
          onFail={onFailFn}
        ></Upload>,
      );
      const inputDomFail = wrapperFail.find('input').element;
      const fileListFail = simulateFileChange(inputDomFail);
      await sleep(0);
      expect(onFailFn).toHaveBeenCalled();
      expect(onFailFn.mock.calls[0][0].failedFiles.map((t) => t.raw)).toEqual(fileListFail);
      expect(onFailFn.mock.calls[0][0].currentFiles.map((t) => t.raw)).toEqual(fileListFail);
    });

    it(':showUploadProgress[false]', () => {
      // theme=file-flow
      const wrapperFileFlow = mount(
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
      expect(wrapperFileFlow.find('.t-upload__file-flow-progress').text()).toBe('上传中');

      // theme=image
      const wrapperImage = mount(
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
      expect(wrapperImage.find('.t-upload__image-progress').text()).toBe('上传中');
    });

    it(':sizeLimit', async () => {
      // 23B with default error tips
      const onValidateFnDefault = vi.fn();
      const wrapperDefault = mount(
        <Upload
          sizeLimit={{ size: 23, unit: 'B' }}
          multiple={true}
          action={'https://tdesign.test.com/upload/file_success'}
          onValidate={onValidateFnDefault}
        ></Upload>,
      );
      const inputDomDefault = wrapperDefault.find('input').element;
      simulateFileChange(inputDomDefault, 'file', 5);
      await sleep(0);
      expect(onValidateFnDefault).toHaveBeenCalled();
      expect(onValidateFnDefault.mock.calls[0][0].type).toBe('FILE_OVER_SIZE_LIMIT');
      expect(onValidateFnDefault.mock.calls[0][0].files.length).toBe(3);

      // 23B with custom error tips
      const onValidateFnCustom = vi.fn();
      const wrapperCustom = mount(
        <Upload
          sizeLimit={{ size: 23, unit: 'B', message: 'image size can not over than {sizeLimit}' }}
          multiple={true}
          action={'https://tdesign.test.com/upload/file_success'}
          onValidate={onValidateFnCustom}
        ></Upload>,
      );
      const inputDomCustom = wrapperCustom.find('input').element;
      simulateFileChange(inputDomCustom, 'file', 5);
      await sleep(0);
      expect(onValidateFnCustom).toHaveBeenCalled();
      expect(onValidateFnCustom.mock.calls[0][0].type).toBe('FILE_OVER_SIZE_LIMIT');
      expect(onValidateFnCustom.mock.calls[0][0].files.length).toBe(3);

      // 0.023KB (KB is default unit)
      const onValidateFnKB = vi.fn();
      const wrapperKB = mount(
        <Upload
          sizeLimit={0.023}
          multiple={true}
          action={'https://tdesign.test.com/upload/file_success'}
          onValidate={onValidateFnKB}
        ></Upload>,
      );
      const inputDomKB = wrapperKB.find('input').element;
      simulateFileChange(inputDomKB, 'file', 5);
      await sleep(0);
      expect(onValidateFnKB).toHaveBeenCalled();
      expect(onValidateFnKB.mock.calls[0][0].type).toBe('FILE_OVER_SIZE_LIMIT');
      expect(onValidateFnKB.mock.calls[0][0].files.length).toBe(3);
    });

    it(':status[default/success/warning/error]', () => {
      const statusExpectedDom = [
        '.t-upload__tips-default',
        '.t-upload__tips-success',
        '.t-upload__tips-warning',
        '.t-upload__tips-error',
      ];
      ['default', 'success', 'warning', 'error'].forEach((item, index) => {
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

    it(':theme[image/file/file-input/file-flow/image-flow]', () => {
      // theme=image: show add trigger
      const wrapperImage = mount(
        <Upload
          files={[
            { url: 'xxxx.url', name: 'file1.txt' },
            { url: 'yyyy.url', name: 'file2.txt' },
          ]}
          multiple={true}
          theme={'image'}
        ></Upload>,
      );
      expect(wrapperImage.find('.t-upload__image-add').exists()).toBeTruthy();

      // theme=file: fail status
      const wrapperFile = mount(
        <Upload theme={'file'} autoUpload={false} files={[{ name: 'file1.txt', status: 'fail' }]}></Upload>,
      );
      expect(wrapperFile.find('.t-icon-error-circle-filled').exists()).toBeTruthy();

      // theme=file-input: progress status
      const wrapperFileInputProgress = mount(
        <Upload theme={'file-input'} files={[{ name: 'file1.txt', status: 'progress' }]}></Upload>,
      );
      expect(wrapperFileInputProgress.find('.t-upload__single-progress').exists()).toBeTruthy();

      // theme=file-input: waiting status
      const wrapperFileInputWaiting = mount(
        <Upload theme={'file-input'} files={[{ name: 'file1.txt', status: 'waiting' }]}></Upload>,
      );
      expect(wrapperFileInputWaiting.find('.t-upload__file-waiting.t-icon-time-filled').exists()).toBeTruthy();

      // theme=file-input: fail status
      const wrapperFileInputFail = mount(
        <Upload theme={'file-input'} files={[{ name: 'file1.txt', status: 'fail' }]}></Upload>,
      );
      expect(wrapperFileInputFail.find('.t-icon-error-circle-filled').exists()).toBeTruthy();

      // theme=file-input: success status
      const wrapperFileInputSuccess = mount(
        <Upload theme={'file-input'} files={[{ name: 'file1.txt', status: 'success' }]}></Upload>,
      );
      expect(wrapperFileInputSuccess.find('.t-icon-check-circle-filled').exists()).toBeTruthy();

      // theme=file-flow
      const wrapperFileFlow = mount(
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
      expect(wrapperFileFlow.findAll('.t-upload__flow-table tbody > tr').length).toBe(4);
      expect(wrapperFileFlow.element).toMatchSnapshot('theme-file-flow');

      // theme=image-flow
      const wrapperImageFlow = mount(
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
      expect(wrapperImageFlow.findAll('.t-upload__card-item').length).toBe(5);
      expect(wrapperImageFlow.element).toMatchSnapshot('theme-image-flow');
    });

    it(':tips[prop/slot]', () => {
      // prop
      const wrapperProp = mount(
        <Upload
          tips={() => <span class="custom-node">TNode</span>}
          action={'https://tdesign.test.com/upload/file_success'}
        ></Upload>,
      );
      expect(wrapperProp.find('.custom-node').exists()).toBeTruthy();
      expect(wrapperProp.find('.t-upload__tips').exists()).toBeTruthy();

      // slot
      const wrapperSlot = mount(
        <Upload
          v-slots={{ tips: () => <span class="custom-node">TNode</span> }}
          action={'https://tdesign.test.com/upload/file_success'}
        ></Upload>,
      );
      expect(wrapperSlot.find('.custom-node').exists()).toBeTruthy();
      expect(wrapperSlot.find('.t-upload__tips').exists()).toBeTruthy();
    });

    it(':trigger[theme=file/custom]', () => {
      // theme=file: prop
      const wrapperFileProp = mount(
        <Upload trigger={() => <span class="custom-node">TNode</span>} theme={'file'}></Upload>,
      );
      expect(wrapperFileProp.find('.custom-node').exists()).toBeTruthy();

      // theme=file: slot
      const wrapperFileSlot = mount(
        <Upload v-slots={{ trigger: () => <span class="custom-node">TNode</span> }} theme={'file'}></Upload>,
      );
      expect(wrapperFileSlot.find('.custom-node').exists()).toBeTruthy();

      // theme=custom & draggable: prop
      const wrapperCustomDragProp = mount(
        <Upload trigger={() => <span class="custom-node">TNode</span>} theme={'custom'} draggable={true}></Upload>,
      );
      expect(wrapperCustomDragProp.find('.custom-node').exists()).toBeTruthy();

      // theme=custom & draggable: slot
      const wrapperCustomDragSlot = mount(
        <Upload
          v-slots={{ trigger: () => <span class="custom-node">TNode</span> }}
          theme={'custom'}
          draggable={true}
        ></Upload>,
      );
      expect(wrapperCustomDragSlot.find('.custom-node').exists()).toBeTruthy();

      // theme=custom & draggable: prop with params (no files)
      const fnPropNoFiles = vi.fn();
      mount(<Upload trigger={fnPropNoFiles} theme={'custom'} draggable={true}></Upload>);
      expect(fnPropNoFiles).toHaveBeenCalled();
      expect(fnPropNoFiles.mock.calls[0][1].dragActive).toBe(false);
      expect(fnPropNoFiles.mock.calls[0][1].files).toEqual([]);

      // theme=custom & draggable: slot with params (no files)
      const fnSlotNoFiles = vi.fn();
      mount(<Upload v-slots={{ trigger: fnSlotNoFiles }} theme={'custom'} draggable={true}></Upload>);
      expect(fnSlotNoFiles).toHaveBeenCalled();
      expect(fnSlotNoFiles.mock.calls[0][0].dragActive).toBe(false);
      expect(fnSlotNoFiles.mock.calls[0][0].files).toEqual([]);

      // theme=custom: prop
      const wrapperCustomProp = mount(
        <Upload trigger={() => <span class="custom-node">TNode</span>} theme={'custom'}></Upload>,
      );
      expect(wrapperCustomProp.find('.custom-node').exists()).toBeTruthy();

      // theme=custom: slot
      const wrapperCustomSlot = mount(
        <Upload v-slots={{ trigger: () => <span class="custom-node">TNode</span> }} theme={'custom'}></Upload>,
      );
      expect(wrapperCustomSlot.find('.custom-node').exists()).toBeTruthy();

      // theme=custom & draggable with files: prop
      const wrapperWithFilesProp = mount(
        <Upload
          trigger={() => <span class="custom-node">TNode</span>}
          theme={'custom'}
          draggable={true}
          files={[{ name: 'file-name.txt', status: 'progress' }]}
        ></Upload>,
      );
      expect(wrapperWithFilesProp.find('.custom-node').exists()).toBeTruthy();

      // theme=custom & draggable with files: slot
      const wrapperWithFilesSlot = mount(
        <Upload
          v-slots={{ trigger: () => <span class="custom-node">TNode</span> }}
          theme={'custom'}
          draggable={true}
          files={[{ name: 'file-name.txt', status: 'progress' }]}
        ></Upload>,
      );
      expect(wrapperWithFilesSlot.find('.custom-node').exists()).toBeTruthy();

      // theme=custom & draggable with files: prop with params
      const fnPropWithFiles = vi.fn();
      mount(
        <Upload
          trigger={fnPropWithFiles}
          theme={'custom'}
          draggable={true}
          files={[{ name: 'file-name.txt', status: 'progress' }]}
        ></Upload>,
      );
      expect(fnPropWithFiles).toHaveBeenCalled();
      expect(fnPropWithFiles.mock.calls[0][1].dragActive).toBe(false);
      expect(fnPropWithFiles.mock.calls[0][1].files).toEqual([{ name: 'file-name.txt', status: 'progress' }]);

      // theme=custom & draggable with files: slot with params
      const fnSlotWithFiles = vi.fn();
      mount(
        <Upload
          v-slots={{ trigger: fnSlotWithFiles }}
          theme={'custom'}
          draggable={true}
          files={[{ name: 'file-name.txt', status: 'progress' }]}
        ></Upload>,
      );
      expect(fnSlotWithFiles).toHaveBeenCalled();
      expect(fnSlotWithFiles.mock.calls[0][0].dragActive).toBe(false);
      expect(fnSlotWithFiles.mock.calls[0][0].files).toEqual([{ name: 'file-name.txt', status: 'progress' }]);
    });

    it(':triggerButtonProps', () => {
      const wrapper = mount(
        <Upload
          triggerButtonProps={{ theme: 'warning' }}
          action={'https://tdesign.test.com/upload/file_success'}
        ></Upload>,
      );
      expect(wrapper.findAll('.t-button--theme-warning').length).toBe(1);
    });

    it(':withCredentials[true]', async () => {
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

    it(':uploadPastedFiles[false]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(
        <Upload
          uploadPastedFiles={false}
          action={'https://tdesign.test.com/upload/file_success'}
          onChange={onChange}
        ></Upload>,
      );

      // create paste event
      const file = new File(['content'], 'pasted-file.txt', { type: 'text/plain' });
      const pasteEvent = new Event('paste', { bubbles: true });
      Object.defineProperty(pasteEvent, 'clipboardData', {
        value: {
          files: [file],
        },
      });

      // dispatch paste event
      wrapper.element.dispatchEvent(pasteEvent);
      await sleep(100);

      // when uploadPastedFiles is false, paste should not trigger upload
      expect(onChange).not.toHaveBeenCalled();
    });

    it(':showImageFileName[true/false]', () => {
      // true (default)
      const wrapperTrue = mount(
        <Upload
          theme={'image'}
          files={[{ url: 'https://image.png', name: 'image.png' }]}
          showImageFileName={true}
        ></Upload>,
      );
      expect(wrapperTrue.find('.t-upload__card-name').exists()).toBeTruthy();

      // false
      const wrapperFalse = mount(
        <Upload
          theme={'image'}
          files={[{ url: 'https://image.png', name: 'image.png' }]}
          showImageFileName={false}
        ></Upload>,
      );
      expect(wrapperFalse.find('.t-upload__card-name').exists()).toBeFalsy();
    });

    it(':showThumbnail[true]', () => {
      const wrapper = mount(
        <Upload
          theme={'file-flow'}
          showThumbnail={true}
          files={[{ url: 'https://image.png', name: 'image.png' }]}
        ></Upload>,
      );
      expect(wrapper.find('.t-upload__flow-table').exists()).toBeTruthy();
    });

    it(':uploadAllFilesInOneRequest[true]', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(
        <Upload
          uploadAllFilesInOneRequest={true}
          multiple={true}
          action={'https://tdesign.test.com/upload/file_success'}
          onChange={onChangeFn}
        ></Upload>,
      );
      const inputDom = wrapper.find('input').element;
      simulateFileChange(inputDom, 'file', 3);
      await sleep(0);
      expect(onChangeFn).toHaveBeenCalled();
      expect(onChangeFn.mock.calls[0][0].length).toBe(3);
    });

    it(':useMockProgress[false]', async () => {
      const onProgressFn = vi.fn();
      const wrapper = mount(
        <Upload
          useMockProgress={false}
          action={'https://tdesign.test.com/upload/file_success'}
          onProgress={onProgressFn}
        ></Upload>,
      );
      const inputDom = wrapper.find('input').element;
      simulateFileChange(inputDom);
      await sleep(0);
      // when useMockProgress is false, onProgress may not be called for small files
      // this test just ensures no error is thrown
      expect(wrapper.exists()).toBeTruthy();
    });

    it(':mockProgressDuration', async () => {
      const onProgressFn = vi.fn();
      const wrapper = mount(
        <Upload
          mockProgressDuration={100}
          useMockProgress={true}
          action={'https://tdesign.test.com/upload/file_success'}
          onProgress={onProgressFn}
        ></Upload>,
      );
      const inputDom = wrapper.find('input').element;
      simulateFileChange(inputDom);
      await sleep(200);
      // with custom mockProgressDuration, progress should be updated
      expect(wrapper.exists()).toBeTruthy();
    });

    it(':imageViewerProps', () => {
      const wrapper = mount(
        <Upload
          theme={'image'}
          files={[{ url: 'https://image.png', name: 'image.png' }]}
          imageViewerProps={{ zIndex: 9999 }}
        ></Upload>,
      );
      expect(wrapper.exists()).toBeTruthy();
    });

    it(':uploadButton[theme=file-flow]', () => {
      const wrapper = mount(
        <Upload
          theme={'file-flow'}
          autoUpload={false}
          uploadButton={{ content: 'Custom Upload' }}
          files={[{ name: 'file.txt', status: 'waiting' }]}
        ></Upload>,
      );
      expect(wrapper.find('.t-upload__continue').text()).toBe('Custom Upload');
    });

    it(':cancelUploadButton[theme=file-flow]', () => {
      const wrapper = mount(
        <Upload
          theme={'file-flow'}
          autoUpload={false}
          cancelUploadButton={{ content: 'Custom Cancel' }}
          files={[{ name: 'file.txt', status: 'waiting' }]}
        ></Upload>,
      );
      expect(wrapper.find('.t-upload__cancel').text()).toBe('Custom Cancel');
    });

    it(':method[GET/PUT/PATCH]', async () => {
      // GET
      const wrapperGet = mount(
        <Upload method={'GET'} action={'https://tdesign.test.com/upload/file_success'}></Upload>,
      );
      expect(wrapperGet.exists()).toBeTruthy();

      // PUT
      const wrapperPut = mount(
        <Upload method={'PUT'} action={'https://tdesign.test.com/upload/file_success'}></Upload>,
      );
      expect(wrapperPut.exists()).toBeTruthy();

      // PATCH
      const wrapperPatch = mount(
        <Upload method={'PATCH'} action={'https://tdesign.test.com/upload/file_success'}></Upload>,
      );
      expect(wrapperPatch.exists()).toBeTruthy();
    });

    it(':showThumbnail[theme=file-flow with different file types]', () => {
      // PDF file
      const wrapperPdf = mount(
        <Upload
          theme={'file-flow'}
          showThumbnail={true}
          files={[
            {
              name: 'document.pdf',
              url: 'https://example.com/document.pdf',
              raw: new File(['content'], 'document.pdf', { type: 'application/pdf' }),
            },
          ]}
        ></Upload>,
      );
      expect(wrapperPdf.find('.t-upload__file-thumbnail').exists()).toBeTruthy();

      // Excel file
      const wrapperExcel = mount(
        <Upload
          theme={'file-flow'}
          showThumbnail={true}
          files={[
            {
              name: 'spreadsheet.xlsx',
              url: 'https://example.com/spreadsheet.xlsx',
              raw: new File(['content'], 'spreadsheet.xlsx', {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              }),
            },
          ]}
        ></Upload>,
      );
      expect(wrapperExcel.find('.t-upload__file-thumbnail').exists()).toBeTruthy();

      // Word file
      const wrapperWord = mount(
        <Upload
          theme={'file-flow'}
          showThumbnail={true}
          files={[
            {
              name: 'document.docx',
              url: 'https://example.com/document.docx',
              raw: new File(['content'], 'document.docx', {
                type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              }),
            },
          ]}
        ></Upload>,
      );
      expect(wrapperWord.find('.t-upload__file-thumbnail').exists()).toBeTruthy();

      // PowerPoint file
      const wrapperPpt = mount(
        <Upload
          theme={'file-flow'}
          showThumbnail={true}
          files={[
            {
              name: 'presentation.pptx',
              url: 'https://example.com/presentation.pptx',
              raw: new File(['content'], 'presentation.pptx', {
                type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
              }),
            },
          ]}
        ></Upload>,
      );
      expect(wrapperPpt.find('.t-upload__file-thumbnail').exists()).toBeTruthy();

      // Video file
      const wrapperVideo = mount(
        <Upload
          theme={'file-flow'}
          showThumbnail={true}
          files={[
            {
              name: 'video.mp4',
              url: 'https://example.com/video.mp4',
              raw: new File(['content'], 'video.mp4', { type: 'video/mp4' }),
            },
          ]}
        ></Upload>,
      );
      expect(wrapperVideo.find('.t-upload__file-thumbnail').exists()).toBeTruthy();

      // Image file with thumbnail
      const wrapperImage = mount(
        <Upload
          theme={'file-flow'}
          showThumbnail={true}
          files={[
            {
              name: 'image.jpg',
              url: 'https://example.com/image.jpg',
              raw: new File(['content'], 'image.jpg', { type: 'image/jpeg' }),
            },
          ]}
        ></Upload>,
      );
      expect(wrapperImage.find('.t-upload__file-thumbnail').exists()).toBeTruthy();

      // File without raw (only url)
      const wrapperUrlOnly = mount(
        <Upload
          theme={'file-flow'}
          showThumbnail={true}
          files={[
            {
              name: 'file.txt',
              url: 'https://example.com/file.txt',
            },
          ]}
        ></Upload>,
      );
      expect(wrapperUrlOnly.find('.t-upload__flow-table').exists()).toBeTruthy();

      // Generic file type
      const wrapperGeneric = mount(
        <Upload
          theme={'file-flow'}
          showThumbnail={true}
          files={[
            {
              name: 'file.txt',
              url: 'https://example.com/file.txt',
              raw: new File(['content'], 'file.txt', { type: 'text/plain' }),
            },
          ]}
        ></Upload>,
      );
      expect(wrapperGeneric.find('.t-upload__file-thumbnail').exists()).toBeTruthy();
    });

    it(':uploadButton & :cancelUploadButton[slot]', () => {
      // uploadButton slot
      const wrapperUpload = mount(
        <Upload
          theme={'file-flow'}
          autoUpload={false}
          files={[{ name: 'file.txt', status: 'waiting' }]}
          v-slots={{
            uploadButton: () => <button class="custom-upload-btn">Custom Upload</button>,
          }}
        ></Upload>,
      );
      expect(wrapperUpload.find('.custom-upload-btn').exists()).toBeTruthy();

      // cancelUploadButton slot
      const wrapperCancel = mount(
        <Upload
          theme={'file-flow'}
          autoUpload={false}
          files={[{ name: 'file.txt', status: 'waiting' }]}
          v-slots={{
            cancelUploadButton: () => <button class="custom-cancel-btn">Custom Cancel</button>,
          }}
        ></Upload>,
      );
      expect(wrapperCancel.find('.custom-cancel-btn').exists()).toBeTruthy();

      // uploadButton as function
      const uploadButtonFn = () => <button class="fn-upload-btn">Fn Upload</button>;
      const wrapperUploadFn = mount(
        <Upload
          theme={'file-flow'}
          autoUpload={false}
          files={[{ name: 'file.txt', status: 'waiting' }]}
          uploadButton={uploadButtonFn}
        ></Upload>,
      );
      expect(wrapperUploadFn.find('.fn-upload-btn').exists()).toBeTruthy();

      // cancelUploadButton as function
      const cancelButtonFn = () => <button class="fn-cancel-btn">Fn Cancel</button>;
      const wrapperCancelFn = mount(
        <Upload
          theme={'file-flow'}
          autoUpload={false}
          files={[{ name: 'file.txt', status: 'waiting' }]}
          cancelUploadButton={cancelButtonFn}
        ></Upload>,
      );
      expect(wrapperCancelFn.find('.fn-cancel-btn').exists()).toBeTruthy();

      // uploadButton=null (hide button)
      const wrapperNoUpload = mount(
        <Upload
          theme={'file-flow'}
          autoUpload={false}
          files={[{ name: 'file.txt', status: 'waiting' }]}
          uploadButton={null}
        ></Upload>,
      );
      expect(wrapperNoUpload.find('.t-upload__continue').exists()).toBeFalsy();

      // cancelUploadButton=null (hide button)
      const wrapperNoCancel = mount(
        <Upload
          theme={'file-flow'}
          autoUpload={false}
          files={[{ name: 'file.txt', status: 'waiting' }]}
          cancelUploadButton={null}
        ></Upload>,
      );
      expect(wrapperNoCancel.find('.t-upload__cancel').exists()).toBeFalsy();
    });

    it(':theme[image-flow with different statuses]', () => {
      // waiting status
      const wrapperWaiting = mount(
        <Upload
          theme={'image-flow'}
          files={[{ url: 'https://image.png', name: 'image.png', status: 'waiting' }]}
        ></Upload>,
      );
      expect(wrapperWaiting.find('.t-upload__card-image').exists()).toBeTruthy();

      // progress status
      const wrapperProgress = mount(
        <Upload
          theme={'image-flow'}
          files={[{ url: 'https://image.png', name: 'image.png', status: 'progress', percent: 50 }]}
        ></Upload>,
      );
      expect(wrapperProgress.find('.t-upload__image-flow-progress').exists()).toBeTruthy();

      // fail status
      const wrapperFail = mount(
        <Upload
          theme={'image-flow'}
          files={[{ url: 'https://image.png', name: 'image.png', status: 'fail' }]}
        ></Upload>,
      );
      expect(wrapperFail.find('.t-upload__image-flow-fail').exists()).toBeTruthy();

      // fail status with response.error
      const wrapperFailError = mount(
        <Upload
          theme={'image-flow'}
          files={[
            {
              url: 'https://image.png',
              name: 'image.png',
              status: 'fail',
              response: { error: 'Custom error message' },
            },
          ]}
        ></Upload>,
      );
      expect(wrapperFailError.text()).toContain('Custom error message');

      // success status without showImageFileName
      const wrapperNoFileName = mount(
        <Upload
          theme={'image-flow'}
          showImageFileName={false}
          files={[{ url: 'https://image.png', name: 'image.png', status: 'success' }]}
        ></Upload>,
      );
      expect(wrapperNoFileName.find('.t-upload__card-name').exists()).toBeFalsy();
    });

    it(':isBatchUpload[theme=file-flow all success]', async () => {
      const onRemoveFn = vi.fn();
      const wrapper = mount(
        <Upload
          theme={'file-flow'}
          isBatchUpload={true}
          multiple={true}
          files={[
            { name: 'file1.txt', status: 'success' },
            { name: 'file2.txt', status: 'success' },
          ]}
          onRemove={onRemoveFn}
        ></Upload>,
      );
      // batch mode: only one delete button (merged cell)
      expect(wrapper.findAll('.t-upload__delete').length).toBe(1);
      wrapper.find('.t-upload__delete').trigger('click');
      await wrapper.vm.$nextTick();
      expect(onRemoveFn).toHaveBeenCalled();
      expect(onRemoveFn.mock.calls[0][0].index).toBe(-1);
      expect(onRemoveFn.mock.calls[0][0].file).toBe(undefined);
    });

    it(':theme[file-flow empty with draggable]', () => {
      const wrapper = mount(<Upload theme={'file-flow'} draggable={true} files={[]}></Upload>);
      expect(wrapper.find('.t-upload__flow-empty').exists()).toBeTruthy();
      expect(wrapper.find('.t-upload__flow-empty').text()).toBeTruthy();
    });

    it(':theme[image-flow empty with draggable]', () => {
      const wrapper = mount(<Upload theme={'image-flow'} draggable={true} files={[]}></Upload>);
      expect(wrapper.find('.t-upload__flow-empty').exists()).toBeTruthy();
    });

    it(':theme[file-flow with response.error]', () => {
      const wrapper = mount(
        <Upload
          theme={'file-flow'}
          files={[
            {
              name: 'file.txt',
              status: 'fail',
              response: { error: 'Upload failed error' },
            },
          ]}
        ></Upload>,
      );
      expect(wrapper.text()).toContain('Upload failed error');
    });

    it(':theme[file-flow preview image with thumbnail]', async () => {
      const onPreviewFn = vi.fn();
      const wrapper = mount(
        <Upload
          theme={'file-flow'}
          showThumbnail={true}
          files={[
            {
              name: 'image.jpg',
              url: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
              raw: new File(['content'], 'image.jpg', { type: 'image/jpeg' }),
            },
          ]}
          onPreview={onPreviewFn}
        ></Upload>,
      );
      const thumbnail = wrapper.find('.t-upload__file-thumbnail');
      expect(thumbnail.exists()).toBeTruthy();
      thumbnail.trigger('click');
      await wrapper.vm.$nextTick();
      await sleep(0);
      expect(onPreviewFn).toHaveBeenCalled();
      // clean up any opened ImageViewer
      document.querySelectorAll('.t-image-viewer').forEach((node) => node.remove());
    });

    it(':draggable[false for file-flow]', () => {
      const wrapper = mount(<Upload theme={'file-flow'} draggable={false} files={[]}></Upload>);
      // when draggable is false, trigger should be visible
      expect(wrapper.find('.t-upload__trigger').exists()).toBeTruthy();
    });

    it(':showImageFileName[theme=image with url/without url]', () => {
      // with url - should display as link
      const wrapperWithUrl = mount(
        <Upload
          theme={'image'}
          showImageFileName={true}
          files={[{ url: 'https://image.png', name: 'image.png' }]}
        ></Upload>,
      );
      expect(wrapperWithUrl.find('.t-upload__card-name').element.tagName).toBe('A');

      // without url - should display as span
      const wrapperWithoutUrl = mount(
        <Upload theme={'image'} showImageFileName={true} files={[{ name: 'image.png' }]}></Upload>,
      );
      expect(wrapperWithoutUrl.find('.t-upload__card-name').element.tagName).toBe('SPAN');
    });

    it(':theme[image fail file with response.error]', () => {
      const wrapper = mount(
        <Upload
          theme={'image'}
          files={[
            {
              name: 'image.png',
              status: 'fail',
              response: { error: 'Image upload failed' },
            },
          ]}
        ></Upload>,
      );
      expect(wrapper.text()).toContain('Image upload failed');
    });

    it(':theme[file single upload fail]', () => {
      const wrapper = mount(
        <Upload
          theme={'file'}
          autoUpload={true}
          files={[
            {
              name: 'file.txt',
              status: 'fail',
              response: { error: 'Single file upload error' },
            },
          ]}
        ></Upload>,
      );
      expect(wrapper.text()).toContain('Single file upload error');
    });

    it(':fileListDisplay[null]', () => {
      const wrapper = mount(<Upload theme={'file'} fileListDisplay={null} files={[{ name: 'file.txt' }]}></Upload>);
      // when fileListDisplay is null, file list should not be displayed
      expect(wrapper.find('.t-upload__single-name').exists()).toBeFalsy();
    });

    it(':theme[custom with childrenNode]', () => {
      const wrapper = mount(
        <Upload
          theme={'custom'}
          v-slots={{
            default: () => <div class="custom-children">Custom Upload Area</div>,
          }}
        ></Upload>,
      );
      expect(wrapper.find('.custom-children').exists()).toBeTruthy();
    });

    it(':theme[custom draggable with dragActive]', async () => {
      const onDragenterFn = vi.fn();
      const wrapper = mount(<Upload theme={'custom'} draggable={true} onDragenter={onDragenterFn}></Upload>);
      const draggerDom = wrapper.find('.t-upload__dragger').element;
      const dragEnterEvent = new Event('dragenter', { bubbles: true });
      Object.defineProperty(dragEnterEvent, 'dataTransfer', {
        value: {
          files: [new File(['content'], 'file.txt', { type: 'text/plain' })],
        },
      });
      draggerDom.dispatchEvent(dragEnterEvent);
      await wrapper.vm.$nextTick();
      expect(onDragenterFn).toHaveBeenCalled();
    });

    it(':theme[file draggable fail file replace]', async () => {
      const wrapper = mount(
        <Upload
          theme={'file'}
          draggable={true}
          autoUpload={false}
          files={[{ name: 'file.txt', status: 'fail' }]}
        ></Upload>,
      );
      expect(wrapper.find('.t-upload__dragger-btns').exists()).toBeTruthy();
      const replaceBtn = wrapper.find('.t-upload__dragger-btns button');
      expect(replaceBtn.exists()).toBeTruthy();
    });

    it(':theme[image draggable with file url from response]', () => {
      const wrapper = mount(
        <Upload
          theme={'image'}
          draggable={true}
          files={[
            {
              name: 'image.png',
              response: { url: 'https://response-url.png' },
              status: 'success',
            },
          ]}
        ></Upload>,
      );
      expect(wrapper.find('.t-upload__dragger-img-wrap').exists()).toBeTruthy();
    });

    it(':theme[file-input progress without showUploadProgress]', () => {
      const wrapper = mount(
        <Upload
          theme={'file-input'}
          showUploadProgress={false}
          files={[{ name: 'file.txt', status: 'progress', percent: 50 }]}
        ></Upload>,
      );
      expect(wrapper.find('.t-upload__single-progress').exists()).toBeTruthy();
      // percent should not be shown
      expect(wrapper.find('.t-upload__single-percent').exists()).toBeFalsy();
    });

    it(':theme[file multiple with url as link]', () => {
      const wrapper = mount(
        <Upload theme={'file'} multiple={true} files={[{ name: 'file.txt', url: 'https://file.txt' }]}></Upload>,
      );
      expect(wrapper.find('.t-upload__single-name').element.tagName).toBe('A');
    });

    it(':theme[file multiple without url as span]', () => {
      const wrapper = mount(<Upload theme={'file'} multiple={true} files={[{ name: 'file.txt' }]}></Upload>);
      expect(wrapper.find('.t-upload__single-name').element.tagName).toBe('SPAN');
    });

    it(':theme[file-input with abridgeName]', () => {
      const wrapper = mount(
        <Upload theme={'file-input'} abridgeName={[5, 3]} files={[{ name: 'very_long_file_name.txt' }]}></Upload>,
      );
      expect(wrapper.find('.t-upload__single-input-text').text()).toBe('very_l….txt');
    });

    it(':theme[file-flow with abridgeName]', () => {
      const wrapper = mount(
        <Upload
          theme={'file-flow'}
          abridgeName={[5, 3]}
          files={[{ name: 'very_long_file_name.txt', size: 1024 }]}
        ></Upload>,
      );
      expect(wrapper.text()).toContain('very_l….txt');
    });

    it(':theme[file waiting and progress status]', () => {
      const wrapperWaiting = mount(
        <Upload theme={'file'} multiple={true} files={[{ name: 'file.txt', status: 'waiting' }]}></Upload>,
      );
      expect(wrapperWaiting.find('.t-upload__file-waiting').exists()).toBeTruthy();

      const wrapperProgress = mount(
        <Upload
          theme={'file'}
          multiple={true}
          files={[{ name: 'file.txt', status: 'progress', percent: 50 }]}
        ></Upload>,
      );
      expect(wrapperProgress.find('.t-upload__single-progress').exists()).toBeTruthy();
    });

    it(':theme[file-input disabled]', () => {
      const wrapper = mount(<Upload theme={'file-input'} disabled={true} files={[{ name: 'file.txt' }]}></Upload>);
      expect(wrapper.find('.t-is-disabled').exists()).toBeTruthy();
      expect(wrapper.find('.t-upload__single-input-clear').exists()).toBeFalsy();
    });

    it(':theme[file disabled cannot delete]', () => {
      const wrapper = mount(
        <Upload theme={'file'} multiple={true} disabled={true} files={[{ name: 'file.txt' }]}></Upload>,
      );
      expect(wrapper.find('.t-upload__icon-delete').exists()).toBeFalsy();
    });
  });

  describe('events', () => {
    it('cancelUpload', async () => {
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

    it('change[autoUpload=false]', async () => {
      // theme=image
      const onChangeFnImage = vi.fn();
      const wrapperImage = mount(
        <Upload theme={'image'} draggable={true} autoUpload={false} files={[]} onChange={onChangeFnImage}></Upload>,
      );
      const inputDomImage = wrapperImage.find('input').element;
      const fileListImage = simulateFileChange(inputDomImage, 'image', 1);
      await sleep(100);
      expect(onChangeFnImage).toHaveBeenCalled();
      expect(onChangeFnImage.mock.calls[0][0][0].raw).toEqual(fileListImage[0]);
      expect(onChangeFnImage.mock.calls[0][1].trigger).toBe('add');
      expect(onChangeFnImage.mock.calls[0][1].index).toBe(0);
      expect(onChangeFnImage.mock.calls[0][1].file.raw).toEqual(fileListImage[0]);

      // theme=image-flow
      const onChangeFnImageFlow = vi.fn();
      const wrapperImageFlow = mount(
        <Upload
          theme={'image-flow'}
          draggable={true}
          autoUpload={false}
          multiple={true}
          files={[{ url: 'https://image1.png', status: 'success' }]}
          onChange={onChangeFnImageFlow}
        ></Upload>,
      );
      const inputDomImageFlow = wrapperImageFlow.find('input').element;
      const fileListImageFlow = simulateFileChange(inputDomImageFlow, 'image', 1);
      await sleep(100);
      expect(onChangeFnImageFlow).toHaveBeenCalled();
      expect(onChangeFnImageFlow.mock.calls[0][0][0]).toEqual({ url: 'https://image1.png', status: 'success' });
      expect(onChangeFnImageFlow.mock.calls[0][0][1].raw).toEqual(fileListImageFlow[0]);
      expect(onChangeFnImageFlow.mock.calls[0][1].trigger).toBe('add');
      expect(onChangeFnImageFlow.mock.calls[0][1].index).toBe(1);
      expect(onChangeFnImageFlow.mock.calls[0][1].file.raw).toEqual(fileListImageFlow[0]);
      expect(onChangeFnImageFlow.mock.calls[0][1].files.map((t) => t.raw)).toEqual(fileListImageFlow);
    });

    it('dragenter & dragleave[theme=image/file]', async () => {
      // theme=image
      const onDragenterFnImage = vi.fn();
      const onDragleaveFnImage = vi.fn();
      const wrapperImage = mount(
        <Upload
          theme={'image'}
          draggable={true}
          onDragenter={onDragenterFnImage}
          onDragleave={onDragleaveFnImage}
        ></Upload>,
      );
      const tUploadDraggerDomImage = wrapperImage.find('.t-upload__dragger').element;
      const filesImage = simulateDragFileChange(tUploadDraggerDomImage, 'dragEnter', 'image');
      await wrapperImage.vm.$nextTick();
      expect(onDragenterFnImage).toHaveBeenCalled();
      expect(onDragenterFnImage.mock.calls[0][0].e.type).toBe('dragenter');
      expect(onDragenterFnImage.mock.calls[0][0].e.dataTransfer.files).toEqual(filesImage);
      const tUploadDraggerDom1Image = wrapperImage.find('.t-upload__dragger').element;
      simulateDragFileChange(tUploadDraggerDom1Image, 'dragOver');
      await wrapperImage.vm.$nextTick();
      const tUploadDraggerDom2Image = wrapperImage.find('.t-upload__dragger').element;
      simulateDragFileChange(tUploadDraggerDom2Image, 'dragLeave');
      await wrapperImage.vm.$nextTick();
      expect(onDragleaveFnImage).toHaveBeenCalled();
      expect(onDragleaveFnImage.mock.calls[0][0].e.type).toBe('dragleave');
      expect(onDragleaveFnImage.mock.calls[0][0].e.dataTransfer.files).toEqual(filesImage);

      // theme=file
      const onDragenterFnFile = vi.fn();
      const onDragleaveFnFile = vi.fn();
      const wrapperFile = mount(
        <Upload
          theme={'file'}
          draggable={true}
          onDragenter={onDragenterFnFile}
          onDragleave={onDragleaveFnFile}
        ></Upload>,
      );
      const tUploadDraggerDomFile = wrapperFile.find('.t-upload__dragger').element;
      const filesFile = simulateDragFileChange(tUploadDraggerDomFile, 'dragEnter');
      await wrapperFile.vm.$nextTick();
      expect(onDragenterFnFile).toHaveBeenCalled();
      expect(onDragenterFnFile.mock.calls[0][0].e.type).toBe('dragenter');
      expect(onDragenterFnFile.mock.calls[0][0].e.dataTransfer.files).toEqual(filesFile);
      const tUploadDraggerDom1File = wrapperFile.find('.t-upload__dragger').element;
      simulateDragFileChange(tUploadDraggerDom1File, 'dragOver');
      await wrapperFile.vm.$nextTick();
      const tUploadDraggerDom2File = wrapperFile.find('.t-upload__dragger').element;
      simulateDragFileChange(tUploadDraggerDom2File, 'dragLeave');
      await wrapperFile.vm.$nextTick();
      expect(onDragleaveFnFile).toHaveBeenCalled();
      expect(onDragleaveFnFile.mock.calls[0][0].e.type).toBe('dragleave');
      expect(onDragleaveFnFile.mock.calls[0][0].e.dataTransfer.files).toEqual(filesFile);
    });

    it('dragleave[not trigger when drag leave other dom]', async () => {
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

    it('drop[theme=image/file]', async () => {
      // theme=image
      const onDropFnImage = vi.fn();
      const wrapperImage = mount(
        <Upload
          theme={'image'}
          draggable={true}
          action={'https://tdesign.test.com/upload/file_success'}
          onDrop={onDropFnImage}
        ></Upload>,
      );
      const tUploadDraggerDomImage = wrapperImage.find('.t-upload__dragger').element;
      const filesImage = simulateDragFileChange(tUploadDraggerDomImage, 'drop', 'image');
      await wrapperImage.vm.$nextTick();
      expect(onDropFnImage).toHaveBeenCalled();
      expect(onDropFnImage.mock.calls[0][0].e.type).toBe('drop');
      expect(onDropFnImage.mock.calls[0][0].e.dataTransfer.files).toEqual(filesImage);

      // theme=file
      const onDropFnFile = vi.fn();
      const wrapperFile = mount(
        <Upload
          theme={'file'}
          draggable={true}
          action={'https://tdesign.test.com/upload/file_success'}
          onDrop={onDropFnFile}
        ></Upload>,
      );
      const tUploadDraggerDomFile = wrapperFile.find('.t-upload__dragger').element;
      const filesFile = simulateDragFileChange(tUploadDraggerDomFile, 'drop');
      await wrapperFile.vm.$nextTick();
      expect(onDropFnFile).toHaveBeenCalled();
      expect(onDropFnFile.mock.calls[0][0].e.type).toBe('drop');
      expect(onDropFnFile.mock.calls[0][0].e.dataTransfer.files).toEqual(filesFile);
    });

    it('fail', async () => {
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

    it('preview[theme=image/image-flow]', async () => {
      // theme=image: single image
      const onPreviewFnSingle = vi.fn();
      const wrapperSingle = mount(
        <Upload
          files={[{ url: 'https://tdesign.gtimg.com/demo/demo-image-1.png', name: 'demo-image-1.png' }]}
          theme={'image'}
          onPreview={onPreviewFnSingle}
        ></Upload>,
      );
      wrapperSingle.find('.t-upload__card-item').trigger('mouseenter');
      await wrapperSingle.vm.$nextTick();
      wrapperSingle.find('.t-icon-browse').trigger('click');
      await sleep(300);
      const attrDom1 = document.querySelector('.t-image-viewer__modal-image');
      expect(attrDom1.getAttribute('src')).toBe('https://tdesign.gtimg.com/demo/demo-image-1.png');
      document.querySelectorAll('.t-image-viewer').forEach((node) => node.remove());
      expect(onPreviewFnSingle).toHaveBeenCalled();
      expect(onPreviewFnSingle.mock.calls[0][0].file).toEqual({
        url: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
        name: 'demo-image-1.png',
      });
      expect(onPreviewFnSingle.mock.calls[0][0].index).toBe(0);
      expect(onPreviewFnSingle.mock.calls[0][0].e.type).toBe('click');

      // theme=image: multiple images
      const onPreviewFnMultiple = vi.fn();
      const wrapperMultiple = mount(
        <Upload
          files={[
            { url: 'https://tdesign.gtimg.com/demo/demo-image-1.png', name: 'demo-image-1.png' },
            { url: 'https://tdesign.gtimg.com/site/avatar.jpg', name: 'avatar.jpg' },
          ]}
          theme={'image'}
          multiple={true}
          onPreview={onPreviewFnMultiple}
        ></Upload>,
      );
      wrapperMultiple.find('.t-upload__card-item:last-child').trigger('mouseenter');
      await wrapperMultiple.vm.$nextTick();
      wrapperMultiple.find('.t-upload__card-item:nth-child(2) .t-icon-browse').trigger('click');
      await sleep(300);
      const attrDom2 = document.querySelector('.t-image-viewer__modal-image');
      expect(attrDom2.getAttribute('src')).toBe('https://tdesign.gtimg.com/site/avatar.jpg');
      document.querySelectorAll('.t-image-viewer').forEach((node) => node.remove());
      expect(onPreviewFnMultiple).toHaveBeenCalled();
      expect(onPreviewFnMultiple.mock.calls[0][0].file).toEqual({
        url: 'https://tdesign.gtimg.com/site/avatar.jpg',
        name: 'avatar.jpg',
      });
      expect(onPreviewFnMultiple.mock.calls[0][0].index).toBe(1);
      expect(onPreviewFnMultiple.mock.calls[0][0].e.type).toBe('click');

      // theme=image-flow
      const onPreviewFnFlow = vi.fn();
      const wrapperFlow = mount(
        <Upload
          files={[
            { url: 'https://tdesign.gtimg.com/demo/demo-image-1.png', name: 'demo-image-1.png' },
            { url: 'https://tdesign.gtimg.com/site/avatar.jpg', name: 'avatar.jpg' },
          ]}
          theme={'image-flow'}
          multiple={true}
          onPreview={onPreviewFnFlow}
        ></Upload>,
      );
      wrapperFlow.find('.t-upload__card-item:nth-child(2)').trigger('mouseenter');
      await wrapperFlow.vm.$nextTick();
      wrapperFlow.find('.t-upload__card-item:nth-child(2) .t-icon-browse').trigger('click');
      await sleep(300);
      const attrDom3 = document.querySelector('.t-image-viewer__modal-image');
      expect(attrDom3.getAttribute('src')).toBe('https://tdesign.gtimg.com/site/avatar.jpg');
      document.querySelectorAll('.t-image-viewer').forEach((node) => node.remove());
      expect(onPreviewFnFlow).toHaveBeenCalled();
      expect(onPreviewFnFlow.mock.calls[0][0].file).toEqual({
        url: 'https://tdesign.gtimg.com/site/avatar.jpg',
        name: 'avatar.jpg',
      });
      expect(onPreviewFnFlow.mock.calls[0][0].index).toBe(1);
      expect(onPreviewFnFlow.mock.calls[0][0].e.type).toBe('click');
    });

    it('remove[single file]', async () => {
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

    it('remove[one file from file list]', async () => {
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

    it('remove[failed image]', async () => {
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

    it('remove[success image]', async () => {
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

    it('remove[theme=file-input]', async () => {
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

    it('remove[theme=file-flow]', async () => {
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

    it('remove[theme=image-flow]', async () => {
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

    it('remove[theme=file-flow isBatchUpload=true remove all]', async () => {
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

    it('remove[theme=image draggable=true]', async () => {
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

    it('remove[theme=file multiple autoUpload=false]', async () => {
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

    it('remove[theme=file-flow multiple autoUpload=true success file]', async () => {
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

    it('remove[theme=file-flow multiple autoUpload=true fail file]', async () => {
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
});
