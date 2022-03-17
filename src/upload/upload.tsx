import { VNode, defineComponent, reactive, computed, toRefs } from 'vue';

import { UploadIcon } from 'tdesign-icons-vue-next';
import Dragger from './dragger';
import ImageCard from './image';
import FlowList from './flow-list';
import TButton from '../button';
import TDialog from '../dialog';
import SingleFile from './single-file';

import props from './props';
import { UploadCtxType } from './interface';

import { useFormDisabled } from '../form/hooks';
import { useComponentsStatus, useImgPreview, useDragger, useRemove, useActions, useBatchUpload } from './hooks';
import { useConfig } from '../config-provider';
import { useContent } from '../hooks/tnode';
import useVModel from '../hooks/useVModel';

export default defineComponent({
  name: 'TUpload',
  props: { ...props },
  setup(props, context) {
    const renderContent = useContent();

    const { classPrefix: prefix } = useConfig('upload');

    const UPLOAD_NAME = computed(() => {
      return `${prefix.value}-upload`;
    });

    const { files, modelValue } = toRefs(props);

    // handle controlled property and uncontrolled property
    const [uploadValue, setUploadValue] = useVModel(
      files,
      modelValue,
      props.defaultFiles || [],
      props.onChange,
      context.emit,
      'files',
    );

    const uploadCtx: UploadCtxType = reactive({
      uploadValue,
      setUploadValue,
      // 加载中的文件
      loadingFile: null,
      // 等待上传的文件队列
      toUploadFiles: [],
      errorMsg: '',
    });

    const disabled = useFormDisabled();

    // 组件状态
    const { showUploadList, showTips, showErrorMsg, singleDraggable } = useComponentsStatus(props, uploadCtx);

    // 图片预览
    const { showImageViewUrl, showImageViewDialog, handlePreviewImg, cancelPreviewImgDialog } = useImgPreview(props);

    // 拖动
    const { handleDragenter, handleDragleave, dragActive } = useDragger(props, disabled);

    // 删除
    const { handleFileInputRemove, handleSingleRemove, handleMultipleRemove, handleListRemove } = useRemove(
      props,
      uploadCtx,
    );

    // 上传相关动作
    const { handleChange, multipleUpload, triggerUpload, cancelUpload, handleDragChange, upload, inputRef } =
      useActions(props, uploadCtx, disabled);

    // input 节点
    const renderInput = () => {
      return (
        <input
          ref="inputRef"
          type="file"
          disabled={disabled.value}
          onChange={handleChange}
          multiple={props.multiple}
          accept={props.accept}
          hidden
        />
      );
    };

    // 渲染单文件预览：设计稿有两种单文件预览方式，文本型和输入框型。输入框型的需要在右侧显示「删除」按钮
    const renderSingleDisplay = (triggerElement: VNode) =>
      !props.draggable &&
      ['file', 'file-input'].includes(props.theme) && (
        <SingleFile
          file={uploadValue.value && uploadValue.value[0]}
          loadingFile={uploadCtx.loadingFile}
          theme={props.theme}
          onRemove={handleSingleRemove}
          showUploadProgress={props.showUploadProgress}
          placeholder={props.placeholder}
        >
          <div class={`${prefix.value}-upload__trigger`} onclick={triggerUpload}>
            {triggerElement}
            {!!(props.theme === 'file-input' && uploadValue.value?.length) && (
              <TButton theme="primary" variant="text" onClick={handleFileInputRemove}>
                删除
              </TButton>
            )}
          </div>
        </SingleFile>
      );

    const renderDraggerTrigger = () => {
      const params = {
        dragActive: dragActive.value,
        uploadingFile: props.multiple ? uploadCtx.toUploadFiles : uploadCtx.loadingFile,
      };
      let triggerElement = renderContent('default', 'trigger', { params });
      if (!Array.isArray(triggerElement)) {
        triggerElement = {};
      }
      return (
        <Dragger
          showUploadProgress={props.showUploadProgress}
          loadingFile={uploadCtx.loadingFile}
          file={uploadValue.value && uploadValue.value[0]}
          theme={props.theme}
          autoUpload={props.autoUpload}
          onChange={handleDragChange}
          onDragenter={handleDragenter}
          onDragleave={handleDragleave}
          onCancel={cancelUpload}
          onClick={triggerUpload}
          onRemove={handleSingleRemove}
          onUpload={upload}
        >
          {triggerElement}
        </Dragger>
      );
    };

    const renderTrigger = () => {
      const getDefaultTrigger = () => {
        if (props.theme === 'file-input' || showUploadList.value) {
          return <t-button variant="outline">选择文件</t-button>;
        }
        const iconSlot = { icon: () => <UploadIcon /> };
        return (
          <TButton variant="outline" v-slots={iconSlot}>
            {uploadValue.value?.length ? '重新上传' : '点击上传'}
          </TButton>
        );
      };

      const defaultNode = getDefaultTrigger();
      return renderContent('default', 'trigger', defaultNode);
    };

    // 完全自定义上传
    const renderCustom = (triggerElement: VNode) => {
      if (props.theme !== 'custom') return;
      return props.draggable ? (
        renderDraggerTrigger()
      ) : (
        <div class={`${UPLOAD_NAME.value}__trigger`} onclick={triggerUpload}>
          {triggerElement}
        </div>
      );
    };

    const renderImgCard = () =>
      !props.draggable &&
      props.theme === 'image' && (
        <ImageCard
          files={uploadValue.value}
          loadingFile={uploadCtx.loadingFile}
          showUploadProgress={props.showUploadProgress}
          multiple={props.multiple}
          max={props.max}
          disabled={disabled.value}
          onClick={triggerUpload}
          onRemove={handleMultipleRemove}
          onImgPreview={handlePreviewImg}
        />
      );

    const renderFlowList = (triggerElement: VNode) =>
      showUploadList.value && (
        <FlowList
          files={uploadValue.value}
          placeholder={props.placeholder}
          autoUpload={props.autoUpload}
          toUploadFiles={uploadCtx.toUploadFiles}
          theme={props.theme}
          showUploadProgress={props.showUploadProgress}
          onRemove={handleListRemove}
          onUpload={multipleUpload}
          onCancel={cancelUpload}
          onImgPreview={handlePreviewImg}
          onChange={handleDragChange}
          onDragenter={handleDragenter}
          onDragleave={handleDragleave}
        >
          <div class={`${UPLOAD_NAME.value}__trigger`} onclick={triggerUpload}>
            {triggerElement}
          </div>
        </FlowList>
      );

    const renderDialog = () =>
      ['image', 'image-flow', 'custom'].includes(props.theme) && (
        <TDialog
          visible={showImageViewDialog.value}
          showOverlay
          width="auto"
          top="10%"
          class={`${UPLOAD_NAME.value}__dialog`}
          footer={false}
          header={false}
          onClose={cancelPreviewImgDialog}
        >
          <div class={`${prefix}__dialog-body-img-box`}>
            <img src={showImageViewUrl.value} alt="" />
          </div>
        </TDialog>
      );

    const tipsClasses = computed(() => {
      return [`${UPLOAD_NAME.value}__tips ${prefix.value}-size-s`];
    });

    const errorClasses = computed(() => {
      return tipsClasses.value.concat(`${UPLOAD_NAME.value}__tips-error`);
    });

    const renderTip = () => {
      const renderErrorMsg = () =>
        !uploadCtx.errorMsg && showTips.value && <small class={tipsClasses.value}>{props.tips}</small>;
      const renderCustomMsg = () =>
        showErrorMsg.value && <small class={errorClasses.value}>{uploadCtx.errorMsg}</small>;

      return [renderErrorMsg(), renderCustomMsg()];
    };

    return {
      UPLOAD_NAME,
      inputRef,
      singleDraggable,
      renderInput,
      renderSingleDisplay,
      renderTrigger,
      renderCustom,
      renderDraggerTrigger,
      renderImgCard,
      renderFlowList,
      renderDialog,
      renderTip,
      triggerUpload,
      uploadCtx,
    };
  },
  render() {
    const triggerElement = this.renderTrigger();
    return (
      <div class={`${this.UPLOAD_NAME}`}>
        {this.renderInput()}
        {this.renderCustom(triggerElement)}
        {this.renderSingleDisplay(triggerElement)}
        {this.singleDraggable && this.renderDraggerTrigger()}
        {this.renderImgCard()}
        {this.renderFlowList(triggerElement)}
        {this.renderDialog()}
        {this.renderTip()}
      </div>
    );
  },
});
