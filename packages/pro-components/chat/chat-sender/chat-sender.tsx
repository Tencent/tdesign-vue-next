import { defineComponent, ref, computed, toRefs, reactive, Fragment, onMounted, onBeforeUnmount } from 'vue';
import { SendFilledIcon, FileAttachmentIcon, ImageIcon } from 'tdesign-icons-vue-next';
import { Button, Textarea, Tooltip } from 'tdesign-vue-next';
import Attachments from '../attachments';
import { useConfig } from 'tdesign-vue-next/es/config-provider/hooks';
import { usePrefixClass, useTNodeJSX, useVModel } from '@tdesign/shared-hooks';
import props from './chat-sender-props';

import type { TdChatSenderProps, UploadActionType, UploadActionConfig } from '../type';

export default defineComponent({
  name: 'TChatSender',
  props: {
    ...props,
    attachmentsProps: {
      type: Object,
      // @ts-ignore
      default: () => ({ items: [], overflow: 'scrollX' }),
    },
  },
  emits: ['send', 'stop', 'update:modelValue', 'blur', 'focus', 'fileSelect', 'remove', 'fileClick'], // declare the custom events here
  setup(props, { emit }) {
    // 是否正在使用输入法（IME）合成中文/日文等
    const isComposition = ref(false);
    // compositionend 之后的短暂锁：Safari 在中文输入法确认候选词时，
    // 会在 compositionend 之后紧跟着派发一次 keydown Enter，且该事件的
    // isComposing 已经为 false、keyCode 也不是 229，需要额外拦截这一次。
    let compositionEndLock = false;
    const senderTextarea = ref(null);
    const COMPONENT_NAME = usePrefixClass('chat');
    const { globalConfig } = useConfig('chat');
    const { value, modelValue, onChange: onChangeRef } = toRefs(props);
    const [textValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, onChangeRef);

    const focusFlag = ref(false);
    const showStopBtn = computed(() => props.loading || props.stopDisabled);
    const disabled = computed(() => props.disabled || false);
    const isSendDisabled = computed(
      () => props.sendBtnDisabled || disabled.value || showStopBtn.value || !textValue.value,
    );
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
        e: { key, shiftKey, keyCode },
      } = context;
      if (key === 'Enter') {
        // 兼容各浏览器（尤其 Safari）：中文输入法回车"确认候选"时不应触发发送
        // - Chrome/Firefox: isComposing === true 或 keyCode === 229
        // - Safari: 上述判断都可能为 false，因此额外用 compositionstart/end 维护 isComposition，
        //   并在 compositionend 后的短暂窗口内加锁拦截这一次回车
        if (isComposition.value || context.e.isComposing || keyCode === 229 || compositionEndLock) {
          return;
        }
        if (shiftKey) {
          return;
        }
        context.e.preventDefault();
        context.e.stopPropagation();
        sendClick(context.e);
      }
    };
    const compositionStartFn = () => {
      isComposition.value = true;
    };
    const compositionEndFn = () => {
      isComposition.value = false;
      // Safari 会在 compositionend 之后紧接着派发一次 keydown Enter，用一个 tick 的锁拦掉
      compositionEndLock = true;
      // 使用宏任务队列在下一次事件循环中释放锁
      setTimeout(() => {
        compositionEndLock = false;
      }, 0);
    };
    // tdesign Textarea 未对外透传 compositionstart/compositionend 事件，
    // 通过 DOM 手动绑定到内部的原生 <textarea> 上
    let nativeTextareaEl: HTMLTextAreaElement | null = null;
    onMounted(() => {
      const rootEl = (senderTextarea.value as any)?.$el || (senderTextarea.value as any);
      const el: HTMLTextAreaElement | null =
        rootEl && rootEl.querySelector ? (rootEl.querySelector('textarea') as HTMLTextAreaElement) : null;
      if (el) {
        nativeTextareaEl = el;
        el.addEventListener('compositionstart', compositionStartFn);
        el.addEventListener('compositionend', compositionEndFn);
      }
    });
    onBeforeUnmount(() => {
      if (nativeTextareaEl) {
        nativeTextareaEl.removeEventListener('compositionstart', compositionStartFn);
        nativeTextareaEl.removeEventListener('compositionend', compositionEndFn);
        nativeTextareaEl = null;
      }
    });
    const focusFn = (value: string, context: { e: FocusEvent }) => {
      focusFlag.value = true;
      emit('focus', value, context);
    };

    const blurFn = (value: string, context: { e: FocusEvent }) => {
      focusFlag.value = false;
      emit('blur', value, context);
    };

    const textChange = (value: string, context: { e: InputEvent }) => {
      setInnerValue(value, context);
    };

    const actionsDefault = reactive<UploadActionConfig[]>([
      {
        name: 'uploadImage',
        uploadProps: {
          multiple: true,
          accept: 'image/*',
        },
        action: ({ files, name, e }) => {
          emit('fileSelect', { files, name, e });
        },
      },
      {
        name: 'uploadAttachment',
        action: ({ files, name, e }) => {
          emit('fileSelect', { files, name, e });
        },
      },
    ]);
    // 默认suffixIcon
    const getDefaultSuffixIcon = (actions = actionsDefault) => {
      // 获取默认action处理函数
      const getDefaultAction = (name: UploadActionType) => {
        const defaultAction = actionsDefault.find((item) => item.name === name)?.action;
        return defaultAction || (({ files, name, e }) => emit('fileSelect', { files, name, e }));
      };
      const { uploadAttachmentText, uploadImageText } = globalConfig.value;
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
              action({ files, name: uploadAttachment.name, e });
              (e.target as HTMLInputElement).value = '';
            }}
            hidden
          />
          <Tooltip content={uploadAttachmentText}>
            <Button
              theme="default"
              onClick={() => uploadFileRef.value?.click()}
              shape="circle"
              variant="text"
              class={[`${COMPONENT_NAME.value}-sender__upload`]}
            >
              <FileAttachmentIcon size="20px" />
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
              action({ files, name: uploadImage.name, e });
              (e.target as HTMLInputElement).value = '';
            }}
            hidden
          />
          <Tooltip content={uploadImageText}>
            <Button
              theme="default"
              onClick={() => uploadImageRef.value?.click()}
              shape="circle"
              variant="text"
              class={[`${COMPONENT_NAME.value}-sender__upload`]}
            >
              <ImageIcon size="20px" />
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
          {actions.length > 0 &&
            actions
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
                isSendDisabled.value ? `${COMPONENT_NAME.value}-sender__button--disabled` : '',
              ]}
              onClick={sendClick}
              disabled={isSendDisabled.value}
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
    };
    const renderSuffixIcon = () => {
      const suffix = renderTNodeJSX('suffix', { params: { renderPresets: getDefaultSuffixIcon } });
      // 默认没有上传附件和上传图片入口
      return suffix ? suffix : getDefaultSuffixIcon([]);
    };
    const handleRemove = (e: CustomEvent) => {
      emit('remove', e);
    };
    const handleFileClick = (e: CustomEvent) => {
      emit('fileClick', e);
    };
    const renderHeader = () => {
      return props.attachmentsProps.items.length > 0 ? (
        <Attachments
          items={props.attachmentsProps.items}
          onRemove={handleRemove}
          onFileClick={handleFileClick}
          class={`${COMPONENT_NAME.value}-sender__attachment`}
          overflow={props.attachmentsProps.overflow}
        />
      ) : (
        renderTNodeJSX('header')
      );
    };
    const renderInputPrefix = () => renderTNodeJSX('input-prefix') || null;
    return () => (
      <div class={`${COMPONENT_NAME.value}-sender`}>
        {/* <div class={`${COMPONENT_NAME.value}-sender__header`}>{renderHeader()}</div> */}
        <div
          class={[
            `${COMPONENT_NAME.value}-sender__textarea`,
            focusFlag.value ? `${COMPONENT_NAME.value}-sender__textarea--focus` : '',
          ]}
        >
          <div class={`${COMPONENT_NAME.value}-sender__header`}>{renderHeader()}</div>
          <div class={`${COMPONENT_NAME.value}-sender__inner-header`}>{renderTNodeJSX('inner-header')}</div>
          <div class={`${COMPONENT_NAME.value}-sender__textarea__wrapper`}>
            {renderInputPrefix()}
            <Textarea
              ref={senderTextarea}
              value={textValue.value}
              onChange={textChange}
              disabled={disabled.value}
              {...{
                autosize: (props.textareaProps as TdChatSenderProps['textareaProps'])?.autosize || {
                  minRows: 2,
                  maxRows: 5,
                },
                ...(props.textareaProps as TdChatSenderProps['textareaProps']),
              }}
              onKeydown={keydownFn}
              onFocus={focusFn}
              onBlur={blurFn}
            />
          </div>
          <div class={`${COMPONENT_NAME.value}-sender__footer`}>
            <div class={`${COMPONENT_NAME.value}-sender__mode`}>{renderTNodeJSX('footer-prefix')}</div>
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
