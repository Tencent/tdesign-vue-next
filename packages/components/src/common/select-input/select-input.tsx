import type { PropType, SetupContext } from '@td/adapter-vue';
import { computed, defineComponent, onBeforeUnmount, onMounted, ref, toRefs, watch } from '@td/adapter-vue';
import type { TdSelectInputProps } from '@td/intel/components/select-input/type';
import props from '@td/intel/components/select-input/props';
import { usePrefixClass, useTNodeJSX } from '@td/adapter-hooks';
import { Popup } from '@td/component';
import type { PopupInstanceFunctions, TdPopupProps as PopupProps, PopupVisibleChangeContext } from '@td/intel/components/popup/type';

import type { SelectInputValueDisplayOptions } from './hooks/useSingle';
import useSingle from './hooks/useSingle';
import useMultiple from './hooks/useMultiple';
import useOverlayInnerStyle from './hooks/useOverlayInnerStyle';

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

    return () => {
      // 浮层显示的受控与非受控
      const visibleProps = { visible: props.popupVisible ?? innerPopupVisible.value };

      const mainContent = (
        <Popup
          ref="popupRef"
          trigger={(props.popupProps as TdSelectInputProps['popupProps'])?.trigger || 'click'}
          placement="bottom-left"
          {...visibleProps}
          content={props.panel}
          v-slots={{ ...context.slots, content: context.slots.panel }}
          hideEmptyPopup={true}
          {...{
            onVisibleChange: onInnerPopupVisibleChange,
            onOverlayClick,
            ...(props.popupProps as TdSelectInputProps['popupProps']),
            overlayInnerStyle: tOverlayInnerStyle.value,
          }}
        >
          {props.multiple
            ? renderSelectMultiple({
              commonInputProps: commonInputProps.value,
              onInnerClear,
              popupVisible: visibleProps.visible,
              allowInput: props.allowInput,
            })
            : renderSelectSingle(visibleProps.visible)}
        </Popup>
      );

      const tipsNode = renderTNodeJSX('tips');

      const tipsClasses = [
        `${classPrefix.value}-input__tips`,
        `${classPrefix.value}-tips`,
        `${classPrefix.value}-is-${props.status}`,
      ];

      return (
        <div ref={selectInputRef} class={classes.value}>
          {mainContent}
          {tipsNode && <div class={tipsClasses}>{tipsNode}</div>}
        </div>
      );
    };
  },
});
