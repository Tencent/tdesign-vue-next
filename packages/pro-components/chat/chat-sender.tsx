import { defineComponent, ref, computed, toRefs, reactive, Fragment } from 'vue';
import { SendFilledIcon, FileAttachmentIcon, ImageIcon } from 'tdesign-icons-vue-next';
import { Button, Textarea, Tooltip } from 'tdesign-vue-next';
import { useConfig } from 'tdesign-vue-next/es/config-provider/hooks';
import { usePrefixClass, useTNodeJSX, useVModel } from '@tdesign/shared-hooks';
import props from './chat-sender-props';

import type { TdChatSenderProps, UploadActionType, UploadActionConfig } from './type';

export default defineComponent({
  name: 'TChatSender',
  props,
  emits: ['send', 'stop', 'update:modelValue', 'blur', 'focus', 'fileSelect'], // declare the custom events here
  setup(props, { emit }) {
    let shiftDownFlag = false;
    let isComposition = false;
    const senderTextarea = ref(null);
    const COMPONENT_NAME = usePrefixClass('chat');
    const { globalConfig } = useConfig('chat');
    const { uploadImageText, uploadAttachmentText } = toRefs(globalConfig.value);
    const { value, modelValue } = toRefs(props);
    const [textValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    const focusFlag = ref(false);
    const showStopBtn = computed(() => props.loading || props.stopDisabled);
    const disabled = computed(() => props.disabled || false);
    const uploadImageRef = ref(null);
    const uploadFileRef = ref(null);
    const renderTNodeJSX = useTNodeJSX();
    // 点击了发送按钮
    const sendClick = (e: MouseEvent | KeyboardEvent) => {
      if (textValue.value && !disabled.value) {
        emit('send', textValue.value, { e });
      }
    };
    // 点击了停止按钮
    const handleStop = (e: MouseEvent) => {
      e.stopPropagation(); // 阻止事件冒泡
      emit('stop', textValue.value, {
        e,
      });
    };
    const keydownFn = (value: string, context: { e: KeyboardEvent }) => {
      const {
        e: { key },
      } = context;
      if (key === 'Shift') {
        shiftDownFlag = true;
      }
      if (key === 'Enter' && !shiftDownFlag && !isComposition) {
        context.e.cancelBubble = true;
        context.e.preventDefault();
        context.e.stopPropagation();
        sendClick(context.e);
      }
    };
    const focusFn = (value: string, context: { e: FocusEvent }) => {
      focusFlag.value = true;
      emit('focus', value, context);
    };

    const blurFn = (value: string, context: { e: FocusEvent }) => {
      focusFlag.value = false;
      shiftDownFlag = false;
      emit('blur', value, context);
    };

    const keyupFn = (value: string, context: { e: KeyboardEvent }) => {
      const {
        e: { key, shiftKey },
      } = context;
      if (key === 'Shift' || !shiftKey) {
        shiftDownFlag = false;
      }
    };

    const textChange = (value: string, context: { e: InputEvent }) => {
      setInnerValue(value, context);
    };
    // 当用户通过输入法开始输入组合文字（如中文拼音输入）时触发
    const compositionstartFn = () => {
      isComposition = true;
    };
    // 当用户通过输入法完成组合文字的选择（如从候选词中选择中文）时触发
    const compositionendFn = () => {
      isComposition = false;
    };
    const actionsDefault = reactive<UploadActionConfig[]>([
      {
        name: 'uploadImage',
        uploadProps: {
          multiple: true,
          accept: 'image/*',
        },
        action: ({ files, name }) => {
          emit('fileSelect', { files, name });
        },
      },
      {
        name: 'uploadAttachment',
        action: ({ files, name }) => {
          emit('fileSelect', { files, name });
        },
      },
    ]);
    // 默认suffixIcon
    const getDefaultSuffixIcon = (actions = actionsDefault) => {
      // 获取默认action处理函数
      const getDefaultAction = (name: UploadActionType) => {
        const defaultAction = actionsDefault.find((item) => item.name === name)?.action;
        return defaultAction || (({ files, name }) => emit('fileSelect', { files, name }));
      };

      const uploadAttachment = actions.find((item) => item.name === 'uploadAttachment');
      const uploadAttachmentButton = uploadAttachment ? (
        <Fragment>
          <input
            {...uploadAttachment.uploadProps}
            ref={uploadFileRef}
            type="file"
            onChange={(e: InputEvent) => {
              const files = Array.from((e.target as HTMLInputElement).files || []);
              if (!files.length) {
                return;
              }
              const action = uploadAttachment.action || getDefaultAction('uploadAttachment');
              action({ files, name: uploadAttachment.name });
              (e.target as HTMLInputElement).value = '';
            }}
            hidden
          />
          <Tooltip content={uploadAttachmentText.value}>
            <Button
              theme="default"
              onClick={() => uploadFileRef.value?.click()}
              shape="circle"
              variant="text"
              class={[`${COMPONENT_NAME.value}-sender__upload`]}
            >
              <FileAttachmentIcon />
            </Button>
          </Tooltip>
        </Fragment>
      ) : null;

      const uploadImage = actions.find((item) => item.name === 'uploadImage');
      const renderUploadImageButton = uploadImage ? (
        <Fragment>
          <input
            {...uploadImage.uploadProps}
            ref={uploadImageRef}
            type="file"
            onChange={(e: InputEvent) => {
              const files = Array.from((e.target as HTMLInputElement).files || []);
              if (!files.length) {
                return;
              }
              const action = uploadImage.action || getDefaultAction('uploadImage');
              action({ files, name: uploadImage.name });
              (e.target as HTMLInputElement).value = '';
            }}
            hidden
          />
          <Tooltip content={uploadImageText.value}>
            <Button
              theme="default"
              onClick={() => uploadImageRef.value?.click()}
              shape="circle"
              variant="text"
              class={[`${COMPONENT_NAME.value}-sender__upload`]}
            >
              <ImageIcon />
            </Button>
          </Tooltip>
        </Fragment>
      ) : null;
      const buttonComponents = {
        uploadAttachment: uploadAttachmentButton,
        uploadImage: renderUploadImageButton,
      };

      return (
        <Fragment>
          {actions
            .filter(
              (item): item is { name: UploadActionType; action: () => void } =>
                item.name === 'uploadAttachment' || item.name === 'uploadImage',
            )
            .map((item) => buttonComponents[item.name])}
          {!showStopBtn.value ? (
            <Button
              theme="default"
              size="small"
              variant="text"
              class={[
                `${COMPONENT_NAME.value}-sender__button__default`,
                textValue.value ? '' : `${COMPONENT_NAME.value}-sender__button--disabled`,
              ]}
              onClick={sendClick}
              disabled={disabled.value || showStopBtn.value || !textValue.value}
            >
              <SendFilledIcon />
            </Button>
          ) : (
            <Button variant="text" class={`${COMPONENT_NAME.value}-sender__button__default`} onClick={handleStop}>
              <div class={`${COMPONENT_NAME.value}-sender__button__stopicon`} />
            </Button>
          )}
        </Fragment>
      );
      // }
    };
    const renderSuffixIcon = () => {
      const suffix = renderTNodeJSX('suffix', { params: { renderPresets: getDefaultSuffixIcon } });

      return suffix ? suffix : getDefaultSuffixIcon();
    };
    return () => (
      <div class={`${COMPONENT_NAME.value}-sender`}>
        <div class={`${COMPONENT_NAME.value}-sender__header`}>{renderTNodeJSX('header')}</div>
        <div
          class={[
            `${COMPONENT_NAME.value}-sender__textarea`,
            focusFlag.value ? `${COMPONENT_NAME.value}-sender__textarea--focus` : '',
          ]}
        >
          <div class={`${COMPONENT_NAME.value}-sender__inner-header`}>{renderTNodeJSX('inner-header')}</div>
          <Textarea
            ref={senderTextarea}
            value={textValue.value}
            onChange={textChange}
            disabled={disabled.value || showStopBtn.value}
            {...{
              autosize: (props.textareaProps as TdChatSenderProps['textareaProps'])?.autosize || {
                minRows: 2,
                maxRows: 5,
              },
              ...(props.textareaProps as TdChatSenderProps['textareaProps']),
            }}
            onKeydown={keydownFn}
            onKeyup={keyupFn}
            onFocus={focusFn}
            onBlur={blurFn}
            onCompositionstart={compositionstartFn}
            onCompositionend={compositionendFn}
          />
          <div class={`${COMPONENT_NAME.value}-sender__footer`}>
            <div class={`${COMPONENT_NAME.value}-sender__mode`}>{renderTNodeJSX('prefix')}</div>
            <div class={`${COMPONENT_NAME.value}-sender__button`}>
              {/* 发送按钮 */}
              <div class={`${COMPONENT_NAME.value}-sender__button__sendbtn`}>{renderSuffixIcon()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
