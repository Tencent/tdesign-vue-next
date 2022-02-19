import { computed, defineComponent, ref, toRefs, watch } from 'vue';
import isObject from 'lodash/isObject';
import pick from 'lodash/pick';
import isFunction from 'lodash/isFunction';
import Popup, { TdPopupProps, PopupVisibleChangeContext } from '../popup';
import { prefix } from '../config';
import TagInput, { TagInputValue } from '../tag-input';
import Input, { InputValue } from '../input';
import props from './props';
import { TdSelectInputProps, SelectInputKeys, SelectInputChangeContext } from './type';
// import { renderTNodeJSX } from '../utils/render-tnode';
import { useTNodeJSX } from '../hooks/tnode';
import { SelectInputCommonProperties } from './interface';

const DEFAULT_KEYS = {
  label: 'label',
  key: 'key',
  children: 'children',
};

const NAME_CLASS = `${prefix}-select-input`;
const BASE_CLASS_BORDERLESS = `${prefix}-select-input--borderless`;
const BASE_CLASS_MULTIPLE = `${prefix}-select-input--multiple`;
const BASE_CLASS_POPUP_VISIBLE = `${prefix}-select-input--popup-visible`;
const BASE_CLASS_EMPTY = `${prefix}-select-input--empty`;

// 单位：px
const MAX_POPUP_WIDTH = 1000;

const COMMON_PROPERTIES = [
  'status',
  'tips',
  'clearable',
  'disabled',
  'label',
  'placeholder',
  'readonly',
  'suffix',
  'suffixIcon',
  'onPaste',
  'onBlur',
  'onFocus',
  'onEnter',
  'onMouseenter',
  'onMouseleave',
];

export default defineComponent({
  name: 'TSelectInput',

  props: { ...props },

  setup(props: TdSelectInputProps) {
    const selectInputRef = ref();
    const tagInputRef = ref();
    const inputRef = ref();
    const {
      onTagChange,
      multiple,
      value,
      onInputChange,
      allowInput,
      popupVisible,
      popupProps,
      borderless,
      onMouseenter,
      onMouseleave,
    } = toRefs(props);
    const inputValue = ref();
    const innerPopupVisible = ref(false);

    const popupClasses = computed(() => [
      NAME_CLASS,
      {
        [BASE_CLASS_BORDERLESS]: borderless.value,
        [BASE_CLASS_MULTIPLE]: multiple.value,
        [BASE_CLASS_POPUP_VISIBLE]: popupVisible.value ?? innerPopupVisible.value,
        [BASE_CLASS_EMPTY]: value.value instanceof Array ? !value.value.length : !value.value,
      },
    ]);

    const iKeys = computed<SelectInputKeys>(() => ({ ...DEFAULT_KEYS, ...props.keys }));
    const tags = computed<TagInputValue>(() => {
      if (!(props.value instanceof Array)) {
        return isObject(props.value) ? [props.value[iKeys.value.label]] : [props.value];
      }
      return props.value.map((item) => {
        return isObject(item) ? item[iKeys.value.label] : item;
      });
    });

    const commonInputProps = computed<SelectInputCommonProperties>(() => pick(props, COMMON_PROPERTIES));
    const tOverlayStyle = ref();
    const tPlaceholder = computed<string>(() => {
      if (!tags.value || !tags.value.length) return props.placeholder;
      return '';
    });

    const isMultipleBorderless = computed(() => multiple.value && borderless.value && tags.value.length);

    const macthWidthFunc = (triggerElement: HTMLElement, popupElement: HTMLElement) => {
      // 避免因滚动条出现文本省略，预留宽度 8
      const SCROLLBAR_WIDTH = popupElement.scrollHeight > popupElement.offsetHeight ? 0 : 0;
      const width =
        popupElement.offsetWidth + SCROLLBAR_WIDTH >= triggerElement.offsetWidth
          ? popupElement.offsetWidth
          : triggerElement.offsetWidth;
      return {
        width: `${Math.min(width, MAX_POPUP_WIDTH)}px`,
      };
    };

    watch([innerPopupVisible], () => {
      if (tOverlayStyle.value) return;
      let result: TdPopupProps['overlayStyle'] = {};
      const overlayStyle = popupProps.value?.overlayStyle || {};
      if (isFunction(overlayStyle) || (isObject(overlayStyle) && overlayStyle.width)) {
        result = overlayStyle;
      } else if (!borderless.value) {
        result = macthWidthFunc;
      }
      tOverlayStyle.value = result;
    });

    watch(
      [tags],
      () => {
        inputValue.value = tags.value.join();
      },
      { immediate: true },
    );

    const onTagInputChange = (val: TagInputValue, context: SelectInputChangeContext) => {
      // 避免触发浮层的显示或隐藏
      if (context.trigger === 'tag-remove') {
        context.e?.stopPropagation();
      }
      onTagChange.value?.(val, context);
    };

    const onInnerInputChange = (value: InputValue, context: { e: InputEvent | MouseEvent }) => {
      if (allowInput.value) {
        inputValue.value = value;
        onInputChange.value?.(value, context);
      }
    };

    const onInnerPopupVisibleChange = (visible: boolean, context: PopupVisibleChangeContext) => {
      innerPopupVisible.value = visible;
      props.onPopupVisibleChange?.(visible, context);
    };

    const onInnerClear = (context: { e: MouseEvent }) => {
      context?.e?.stopPropagation();
      props.onClear?.(context);
      inputValue.value = '';
    };

    return {
      innerPopupVisible,
      isMultipleBorderless,
      tags,
      inputValue,
      commonInputProps,
      tOverlayStyle,
      tPlaceholder,
      selectInputRef,
      tagInputRef,
      inputRef,
      popupClasses,
      onInnerClear,
      onTagInputChange,
      onInnerInputChange,
      onInnerPopupVisibleChange,
    };
  },

  render() {
    // 浮层显示的受控与非受控
    const visibleProps = { visible: this.popupVisible ?? this.innerPopupVisible };
    // 单选，值的呈现方式
    const singleValueDisplay = !this.multiple
      ? useTNodeJSX('valueDisplay', { props: this.$props, slots: this.$slots })
      : null;
    // 左侧文本
    const label = useTNodeJSX('label', { props: this.$props, slots: this.$slots });
    const prefix = [singleValueDisplay, label].filter((v) => v);
    return (
      <Popup
        ref="selectInputRef"
        class={this.popupClasses}
        trigger={'click'}
        placement="bottom-left"
        content={this.panel}
        v-slots={{ ...this.$slots, content: this.$slots.panel }}
        overlayStyle={this.tOverlayStyle}
        hideEmptyPopup={true}
        onVisibleChange={this.onInnerPopupVisibleChange}
        {...visibleProps}
        {...this.popupProps}
      >
        {this.multiple && (
          <TagInput
            ref="tagInputRef"
            {...this.commonInputProps}
            v-slots={this.$slots}
            autoWidth={this.borderless}
            minCollapsedNum={this.minCollapsedNum}
            collapsedItems={this.collapsedItems}
            tag={this.tag}
            valueDisplay={this.valueDisplay}
            placeholder={this.tPlaceholder}
            value={this.tags}
            onChange={this.onTagInputChange}
            tagProps={this.tagProps}
            onClear={this.onInnerClear}
            {...this.tagInputProps}
          />
        )}
        {!this.multiple && (
          <Input
            ref="inputRef"
            {...this.commonInputProps}
            v-slots={{ ...this.$slots }}
            autoWidth={this.borderless}
            placeholder={singleValueDisplay ? '' : this.placeholder}
            value={singleValueDisplay ? undefined : this.inputValue}
            label={prefix.length ? () => prefix : undefined}
            onChange={this.onInnerInputChange}
            readonly={!this.allowInput}
            onClear={this.onInnerClear}
            {...this.inputProps}
          />
        )}
      </Popup>
    );
  },
});
