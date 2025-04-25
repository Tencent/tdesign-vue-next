import { defineComponent, ref, computed, toRefs } from 'vue';
import { usePrefixClass } from '../hooks/useConfig';
import props from './chat-sender-props';
import { SendFilledIcon } from 'tdesign-icons-vue-next';
import Button from '../button';
import Textarea from '../textarea';
import useVModel from '../hooks/useVModel';
import { useTNodeJSX, useContent } from '../hooks/tnode';

import type { TdChatSenderProps } from './type';

export default defineComponent({
  name: 'TChatSender',
  props,
  emits: ['send', 'stop', 'focus', 'blur', 'update:modelValue'], // declare the custom events here
  setup(props, { emit }) {
    let shiftDownFlag = false;
    let isComposition = false;
    const senderTextarea = ref(null);
    const COMPONENT_NAME = usePrefixClass('chat');

    const { value, modelValue } = toRefs(props);
    const [textValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    const focusFlag = ref(false);
    const loading = ref(false);
    const showStopBtn = computed(() => props.stopDisabled && loading.value);
    const disabled = computed(() => props.disabled || false);

    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();
    // 点击了发送按钮
    const sendClick = (e: MouseEvent | KeyboardEvent) => {
      if (textValue.value && !disabled.value) {
        emit('send', textValue.value, { e });
        loading.value = true;
        textValue.value = '';
      }
    };
    // 点击了停止按钮
    const handleStop = (e: MouseEvent) => {
      loading.value = false;
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
      emit('blur', value, context);
    };

    const keyupFn = (value: string, context: { e: KeyboardEvent }) => {
      const {
        e: { key },
      } = context;
      if (key === 'Shift') {
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
    // 默认suffixIcon
    const getDefaultSuffixIcon = () => {
      return (
        <Button
          theme="default"
          size="small"
          variant="text"
          class={[
            `${COMPONENT_NAME.value}-sender__button__default`,
            textValue.value ? '' : `${COMPONENT_NAME.value}-sender__button--disabled`,
          ]}
          disabled={disabled.value || showStopBtn.value || !textValue.value}
        >
          <SendFilledIcon />
        </Button>
      );
      // }
    };
    const renderSuffixIcon = () => {
      const suffix = renderTNodeJSX('suffix');

      return suffix ? suffix : getDefaultSuffixIcon();
    };
    return () => (
      <div class={`${COMPONENT_NAME.value}-sender`}>
        <div
          class={[
            `${COMPONENT_NAME.value}-sender__textarea`,
            focusFlag.value ? `${COMPONENT_NAME.value}-sender__textarea--focus` : '',
          ]}
        >
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
            <div class={`${COMPONENT_NAME.value}-sender__mode`}>{renderContent('default', 'prefix')}</div>
            <div class={`${COMPONENT_NAME.value}-sender__button`}>
              {/* 发送按钮 */}
              {!showStopBtn.value && (
                <div class={`${COMPONENT_NAME.value}-sender__button__sendbtn`} onClick={sendClick}>
                  {renderSuffixIcon()}
                </div>
              )}
              {/* 停止按钮 */}
              {showStopBtn.value && (
                <div class={`${COMPONENT_NAME.value}-sender__button__stopbtn`}>
                  <Button variant="text" class={`${COMPONENT_NAME.value}-sender__button__default`} onClick={handleStop}>
                    <div class={`${COMPONENT_NAME.value}-sender__button__stopicon`} />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
});
