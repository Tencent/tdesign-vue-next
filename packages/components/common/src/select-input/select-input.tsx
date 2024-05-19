import type { PropType, SetupContext } from '@td/adapter-vue';
import { computed, defineComponent, onBeforeUnmount, onMounted, ref, toRefs, watch } from '@td/adapter-vue';
import props from '@td/intel/select-input/props';
import type { TdSelectInputProps } from '@td/intel/select-input/type';
import { usePrefixClass } from '@td/adapter-hooks';
import type { PopupInstanceFunctions, PopupProps, PopupVisibleChangeContext } from '../popup';
import Popup from '../popup';
import { useTNodeJSX } from '../hooks';
import type { SelectInputValueDisplayOptions } from './useSingle';
import useSingle from './useSingle';
import useMultiple from './useMultiple';
import useOverlayInnerStyle from './useOverlayInnerStyle';

function useComponentClassName() {
  return {
    NAME_CLASS: usePrefixClass('select-input'),
    BASE_CLASS_BORDERLESS: usePrefixClass('select-input--borderless'),
    BASE_CLASS_MULTIPLE: usePrefixClass('select-input--multiple'),
    BASE_CLASS_POPUP_VISIBLE: usePrefixClass('select-input--popup-visible'),
    BASE_CLASS_EMPTY: usePrefixClass('select-input--empty'),
  };
}

export default defineComponent({
  name: 'TSelectInput',

  props: {
    ...props,
    /**
     * 非公开 API，请勿使用（后续即将删除）
     * 自定义值呈现的选项
     * useInputDisplay 表示在使用时仍然使用组件自带的输入回显实现，
     * usePlaceholder 表示在使用时仍然使用自带的占位符实现
     */
    valueDisplayOptions: {
      type: Object as PropType<SelectInputValueDisplayOptions>,
    },
  },

  setup(props: TdSelectInputProps & { valueDisplayOptions: SelectInputValueDisplayOptions }, context: SetupContext) {
    const { NAME_CLASS, BASE_CLASS_BORDERLESS, BASE_CLASS_MULTIPLE, BASE_CLASS_POPUP_VISIBLE, BASE_CLASS_EMPTY }
      = useComponentClassName();
    const classPrefix = usePrefixClass();
    const renderTNodeJSX = useTNodeJSX();

    const selectInputRef = ref();
    const popupRef = ref<PopupInstanceFunctions>();
    const { multiple, value, popupVisible, borderless } = toRefs(props);

    const { tOverlayInnerStyle, innerPopupVisible, onInnerPopupVisibleChange } = useOverlayInnerStyle(props);

    const { isSingleFocus, commonInputProps, onInnerClear, renderSelectSingle } = useSingle(props, context, popupRef);

    const { isMultipleFocus, tagInputRef, renderSelectMultiple } = useMultiple(props, context, popupRef);

    const isFocus = computed(() => (props.multiple ? isMultipleFocus.value : isSingleFocus.value));

    const classes = computed(() => [
      `${NAME_CLASS.value}`,
      {
        [BASE_CLASS_MULTIPLE.value]: multiple.value,
        [BASE_CLASS_BORDERLESS.value]: borderless.value,
        [BASE_CLASS_POPUP_VISIBLE.value]: popupVisible.value ?? innerPopupVisible.value,
        [BASE_CLASS_EMPTY.value]: Array.isArray(value.value) ? !value.value.length : !value.value,
      },
    ]);

    const addKeyboardEventListener = (e: KeyboardEvent) => {
      const code = e.code || e.key?.trim();
      if (/(ArrowDown|ArrowUp)/.test(code) && !popupVisible.value) {
        const ctx: PopupVisibleChangeContext = { ...context, trigger: 'trigger-element-focus' };
        props.onPopupVisibleChange?.(true, ctx);
      }
    };

    watch([isFocus], ([isFocus]) => {
      if (popupVisible.value) {
        return;
      }
      if (isFocus) {
        selectInputRef.value.addEventListener('keydown', addKeyboardEventListener);
      } else {
        selectInputRef.value.removeEventListener('keydown', addKeyboardEventListener);
      }
    });

    onMounted(() => {
      if (!popupVisible.value && isFocus) {
        selectInputRef.value.addEventListener('keydown', addKeyboardEventListener);
      }
    });

    onBeforeUnmount(() => {
      selectInputRef.value.removeEventListener('keydown', addKeyboardEventListener);
    });

    const onOverlayClick: PopupProps['onOverlayClick'] = (ctx) => {
      ctx.e?.stopPropagation();
      // do not set focus if target can be focused
      if ((ctx.e.target as HTMLElement).tabIndex >= 0) {
        return;
      }
      if (props.multiple) {
        tagInputRef.value?.focus();
      }
    };

    return {
      classPrefix,
      NAME_CLASS,
      innerPopupVisible,
      commonInputProps,
      tOverlayInnerStyle,
      selectInputRef,
      popupRef,
      classes,
      onInnerClear,
      renderTNodeJSX,
      renderSelectSingle,
      renderSelectMultiple,
      onOverlayClick,
      onInnerPopupVisibleChange,
    };
  },

  render() {
    // 浮层显示的受控与非受控
    const visibleProps = { visible: this.popupVisible ?? this.innerPopupVisible };

    const mainContent = (
      <Popup
        ref="popupRef"
        trigger={(this.popupProps as TdSelectInputProps['popupProps'])?.trigger || 'click'}
        placement="bottom-left"
        {...visibleProps}
        content={this.panel}
        v-slots={{ ...this.$slots, content: this.$slots.panel }}
        hideEmptyPopup={true}
        {...{
          onVisibleChange: this.onInnerPopupVisibleChange,
          onOverlayClick: this.onOverlayClick,
          ...(this.popupProps as TdSelectInputProps['popupProps']),
          overlayInnerStyle: this.tOverlayInnerStyle,
        }}
      >
        {this.multiple
          ? this.renderSelectMultiple({
            commonInputProps: this.commonInputProps,
            onInnerClear: this.onInnerClear,
            popupVisible: visibleProps.visible,
            allowInput: this.allowInput,
          })
          : this.renderSelectSingle(visibleProps.visible)}
      </Popup>
    );

    const tipsNode = this.renderTNodeJSX('tips');

    const tipsClasses = [
      `${this.classPrefix}-input__tips`,
      `${this.classPrefix}-tips`,
      `${this.classPrefix}-is-${this.status}`,
    ];

    return (
      <div ref="selectInputRef" class={this.classes}>
        {mainContent}
        {tipsNode && <div class={tipsClasses}>{tipsNode}</div>}
      </div>
    );
  },
});
