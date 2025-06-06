import { defineComponent, toRefs, computed } from 'vue';
import { RectangleIcon, SendIcon, StopCircleIcon } from 'tdesign-icons-vue-next';
import { Button, Textarea } from 'tdesign-vue-next';
import { useConfig } from 'tdesign-vue-next/es/config-provider/hooks';
import { useTNodeJSX, usePrefixClass, useVModel } from '@tdesign/hooks';
import props from './chat-input-props';

export default defineComponent({
  name: 'TChatInput',
  components: {
    RectangleIcon,
    SendIcon,
  },
  props,
  emits: ['send', 'stop', 'update:modelValue', 'blur', 'focus'], // declare the custom events here
  setup(props, { slots, emit }) {
    const COMPONENT_NAME = usePrefixClass('chat');
    const { globalConfig } = useConfig('chat');
    const { stopBtnText, placeholder } = globalConfig.value;
    const { value, modelValue } = toRefs(props);
    const [textValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
    // 按钮禁用，
    const disabled = computed(() => props.stopDisabled);
    // textarea禁用，
    const textareaDisabled = computed(() => props.disabled);
    // 输入框是否自动聚焦
    const autofocus = computed(() => props.autofocus);
    // 输入框高度
    const autosize = computed(() => props.autosize);
    // 输入框默认文案
    const placeholderText = computed(() => props.placeholder ?? placeholder);

    let shiftDownFlag = false;
    let isComposition = false;
    const renderTNodeJSX = useTNodeJSX();
    const suffixIcon = renderTNodeJSX('suffixIcon') || slots.suffixIcon;
    const sendClick = (e: MouseEvent | KeyboardEvent) => {
      if (textValue.value && !disabled.value) {
        emit('send', textValue.value, { e });
        setInnerValue('', { e });
      }
    };

    const handleStop = (e: MouseEvent) => {
      emit('stop', textValue.value, {
        e,
      });
    };

    const textChange = (value: string, context: { e: InputEvent }) => {
      setInnerValue(value, context);
    };
    const blurFn = (value: string, context: { e: FocusEvent }) => {
      emit('blur', value, context);
    };
    const focusFn = (value: string, context: { e: FocusEvent }) => {
      emit('focus', value, context);
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

    const keyupFn = (value: any, context: any) => {
      const {
        e: { key },
      } = context;
      if (key === 'Shift') {
        shiftDownFlag = false;
      }
    };

    const compositionstartFn = () => {
      isComposition = true;
    };

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
            `${COMPONENT_NAME.value}__footer__textarea__icon__default`,
            textValue.value ? `${COMPONENT_NAME.value}__footer__textarea__icon--focus` : '',
          ]}
          disabled={disabled.value || !textValue.value || textareaDisabled.value}
        >
          <SendIcon />
        </Button>
      );
    };
    const renderSuffixIcon = () => {
      return suffixIcon ? suffixIcon : getDefaultSuffixIcon();
    };
    return () => (
      <div class={`${COMPONENT_NAME.value}__footer__content`}>
        {/* textAreaBox */}
        <div class={`${COMPONENT_NAME.value}__footer__textarea`}>
          <Textarea
            value={textValue.value}
            class="noscrollbar"
            placeholder={placeholderText.value}
            disabled={textareaDisabled.value}
            autofocus={autofocus.value}
            autosize={autosize.value}
            onChange={textChange}
            onBlur={blurFn}
            onFocus={focusFn}
            onKeydown={keydownFn}
            onKeyup={keyupFn}
            onCompositionstart={compositionstartFn}
            onCompositionend={compositionendFn}
          />
          <div class={`${COMPONENT_NAME.value}__footer__textarea__icon`} onClick={sendClick}>
            {renderSuffixIcon()}
          </div>
        </div>
        {disabled.value && !textareaDisabled.value && (
          <div class={`${COMPONENT_NAME.value}__footer__stopbtn`}>
            <Button variant="outline" onClick={handleStop}>
              <StopCircleIcon />
              {stopBtnText}
            </Button>
          </div>
        )}
      </div>
    );
  },
});
