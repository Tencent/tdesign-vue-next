import { computed, defineComponent, ref, toRefs, watch } from 'vue';
import isObject from 'lodash/isObject';
import pick from 'lodash/pick';
import isFunction from 'lodash/isFunction';
import Popup, { TdPopupProps } from '../popup';
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
  'onClear',
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
    const { onTagChange, multiple, onInputChange, allowInput, popupProps } = toRefs(props);
    const inputValue = ref();
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
    const tOverlayStyle = computed(() => {
      const macthWidthFunc = (triggerElement: HTMLElement, popupElement: HTMLElement) => {
        // 避免因滚动条出现文本省略，预留宽度 8
        const SCROLLBAR_WIDTH = popupElement.scrollHeight > popupElement.offsetHeight ? 8 : 0;
        const width =
          popupElement.offsetWidth + SCROLLBAR_WIDTH > triggerElement.offsetWidth
            ? popupElement.offsetWidth
            : triggerElement.offsetWidth;
        return {
          width: `${Math.min(width, MAX_POPUP_WIDTH)}px`,
        };
      };
      let result: TdPopupProps['overlayStyle'] = macthWidthFunc;
      const overlayStyle = popupProps.value?.overlayStyle || {};
      if (isFunction(overlayStyle) || (isObject(overlayStyle) && overlayStyle.width)) {
        result = overlayStyle;
      }
      return result;
    });
    const tPlaceholder = computed<string>(() => {
      if (!tags.value || !tags.value.length) return props.placeholder;
      return '';
    });

    watch(
      [tags],
      () => {
        inputValue.value = tags.value.join();
      },
      { immediate: true },
    );

    const onTagInputChange = (val: TagInputValue, context: SelectInputChangeContext) => {
      onTagChange.value?.(val, context);
    };

    const onInnerInputChange = (value: InputValue, context: { e: InputEvent | MouseEvent }) => {
      if (allowInput.value) {
        inputValue.value = value;
        onInputChange.value?.(value, context);
      }
    };

    return {
      tags,
      inputValue,
      commonInputProps,
      tOverlayStyle,
      tPlaceholder,
      selectInputRef,
      tagInputRef,
      inputRef,
      onTagInputChange,
      onInnerInputChange,
    };
  },

  render() {
    const visibleProps =
      this.popupVisible !== undefined
        ? {
            visible: this.popupVisible,
            onVisibleChange: this.onPopupVisibleChange,
          }
        : {};
    return (
      <Popup
        ref="selectInputRef"
        trigger={this.multiple ? 'click' : 'focus'}
        placement="bottom-left"
        content={this.panel}
        v-slots={{ content: this.$slots.panel }}
        class={NAME_CLASS}
        overlayStyle={this.tOverlayStyle}
        hideEmptyPopup={true}
        {...visibleProps}
        {...this.popupProps}
      >
        {this.multiple && (
          <TagInput
            ref="tagInputRef"
            {...this.commonInputProps}
            v-slots={this.$slots}
            hideInput={this.allowInput ? false : !!this.tags.length}
            minCollapsedNum={this.minCollapsedNum}
            collapsedItems={this.collapsedItems}
            placeholder={this.tPlaceholder}
            value={this.tags}
            onChange={this.onTagInputChange}
            tagProps={this.tagProps}
            {...this.tagInputProps}
          />
        )}
        {!this.multiple && (
          <Input
            ref="inputRef"
            {...this.commonInputProps}
            placeholder={this.placeholder}
            value={this.inputValue}
            onChange={this.onInnerInputChange}
            readonly={!this.allowInput}
            {...this.inputProps}
          />
        )}
      </Popup>
    );
  },
});
