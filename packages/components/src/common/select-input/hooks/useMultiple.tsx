import type { Ref, SetupContext } from '@td/adapter-vue';
import { computed, ref, toRefs } from '@td/adapter-vue';
import { isObject } from 'lodash-es';
import type { SelectInputChangeContext, SelectInputKeys, TdSelectInputProps } from '@td/intel/components/select-input/type';
import { useDefaultValue, useDisabled, usePrefixClass } from '@td/adapter-hooks';
import type { SelectInputCommonProperties } from '../interface';
import type { TagInputProps, TagInputValue } from '../../tag-input';
import TagInput from '../../tag-input';
import { Loading } from '@td/component';
import type { PopupInstanceFunctions } from '../popup';

export interface RenderSelectMultipleParams {
  commonInputProps: SelectInputCommonProperties;
  onInnerClear: (context: { e: MouseEvent }) => void;
  popupVisible: boolean;
  allowInput: boolean;
}

const DEFAULT_KEYS = {
  label: 'label',
  key: 'key',
  children: 'children',
};

export default function useMultiple(
  props: TdSelectInputProps,
  context: SetupContext,
  popupRef: Ref<PopupInstanceFunctions>,
) {
  const { inputValue } = toRefs(props);
  const classPrefix = usePrefixClass();
  const tagInputRef = ref();
  const isMultipleFocus = ref(props.autofocus);
  const [tInputValue, setTInputValue] = useDefaultValue(
    inputValue,
    props.defaultInputValue,
    props.onInputChange,
    'inputValue',
  );
  const disable = useDisabled();

  const iKeys = computed<SelectInputKeys>(() => ({ ...DEFAULT_KEYS, ...props.keys }));
  const tags = computed<TagInputValue>(() => {
    if (!(Array.isArray(props.value))) {
      return isObject(props.value) ? [props.value[iKeys.value.label]] : [props.value];
    }
    return props.value.map(item => (isObject(item) ? item[iKeys.value.label] : item));
  });

  const tPlaceholder = computed<string>(() => (!tags.value || !tags.value.length ? props.placeholder : ''));

  const onTagInputChange = (val: TagInputValue, context: SelectInputChangeContext) => {
    // 避免触发浮层的显示或隐藏
    if (context.trigger === 'tag-remove') {
      context.e?.stopPropagation();
    }
    props.onTagChange?.(val, context);
  };

  const onInputChange: TagInputProps['onInputChange'] = (val, ctx) => {
    if (ctx.trigger === 'enter' || ctx.trigger === 'blur') {
      return;
    }
    setTInputValue(val, { trigger: ctx.trigger, e: ctx.e });
  };

  /**
   * 筛选器统一特性：
   * 1. 筛选器按下回车时不清空输入框;
   * 2. SelectInput 的失焦不等于 TagInput。如点击下拉面板时，TagInput 失去焦点，但 SelectInput 依旧保持聚焦，允许继续选择。
   */
  const onBlur: TagInputProps['onBlur'] = (val, ctx) => {
    const overlayState = popupRef.value?.getOverlayState();
    if (overlayState?.hover) {
      return;
    }
    isMultipleFocus.value = false;
    props.onBlur?.(props.value, { ...ctx, tagInputValue: val });
  };

  const onFocus: TagInputProps['onFocus'] = (val, ctx) => {
    const overlayState = popupRef.value?.getOverlayState();
    if (isMultipleFocus.value || overlayState?.hover) {
      return;
    }
    isMultipleFocus.value = true;
    const params = { ...ctx, tagInputValue: val };
    props.onFocus?.(props.value, params);
  };

  const onEnter: TagInputProps['onEnter'] = (val, ctx) => {
    const params = { ...ctx, tagInputValue: val };
    props.onEnter?.(props.value, params);
  };

  const renderSelectMultiple = (p: RenderSelectMultipleParams) => {
    const tagInputProps = {
      ...p.commonInputProps,
      tagProps: props.tagProps,
      label: props.label,
      autoWidth: props.autoWidth,
      readonly: props.readonly,
      placeholder: tPlaceholder.value,
      minCollapsedNum: props.minCollapsedNum,
      collapsedItems: props.collapsedItems,
      tag: props.tag,
      value: tags.value,
      valueDisplay: props.valueDisplay,
      inputValue: p.popupVisible && p.allowInput ? tInputValue.value : '',
      inputProps: {
        readonly: !props.allowInput || props.readonly,
        inputClass: {
          [`${classPrefix.value}-input--focused`]: p.popupVisible,
        },
        ...props.inputProps,
      },
      suffixIcon: !disable.value && props.loading ? () => <Loading loading size="small" /> : props.suffixIcon,
      ...props.tagInputProps,
    };

    // eslint-disable-next-line
    const { tips, ...slots } = context.slots;
    return (
      <TagInput
        ref={tagInputRef}
        {...tagInputProps}
        v-slots={slots}
        onInputChange={onInputChange}
        onChange={onTagInputChange}
        onClear={p.onInnerClear}
        onBlur={onBlur}
        onEnter={onEnter}
        onFocus={onFocus}
      />
    );
  };

  return {
    tags,
    tPlaceholder,
    tagInputRef,
    isMultipleFocus,
    multipleInputValue: tInputValue,
    renderSelectMultiple,
  };
}
