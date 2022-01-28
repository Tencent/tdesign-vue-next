import { defineComponent, ref, nextTick, computed } from 'vue';
import { CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import { prefix } from '../config';
import TInput, { InputValue } from '../input';
import { TdTagInputProps } from './type';
import Tag from '../tag';
import props from './props';
import { renderTNodeJSX } from '../utils/render-tnode';
import useTagScroll from './useTagScroll';
import useTagList from './useTagList';
import useHover from './useHover';

const NAME_CLASS = `${prefix}-tag-input`;
const CLEAR_CLASS = `${prefix}-tag-input__suffix-clear`;
const BREAK_LINE_CLASS = `${prefix}-tag-input--break-line`;

export default defineComponent({
  name: 'TTagInput',

  props: { ...props },

  setup(props: TdTagInputProps, context) {
    const root = ref(null);
    const inputValueRef = ref<InputValue>();
    const { isHoverRef, addHover, cancelHover } = useHover(props);
    const scrollFunctions = useTagScroll(props, root);
    // handle tag add and remove
    const { tagValue, onClose, onInnerEnter, onInputBackspaceKeyUp, clearAll } = useTagList(props, context);

    const classes = computed(() => {
      return [
        NAME_CLASS,
        {
          [BREAK_LINE_CLASS]: props.excessTagsDisplayType === 'break-line',
        },
      ];
    });

    const tagInputPlaceholder = computed(() => {
      return isHoverRef.value || !tagValue.value?.length ? props.placeholder : '';
    });

    const showClearIcon = computed(() => {
      return Boolean(
        !props.readonly && !props.disabled && props.clearable && isHoverRef.value && tagValue.value?.length,
      );
    });

    const onInputEnter = (value: InputValue, context: { e: KeyboardEvent }) => {
      inputValueRef.value = '';
      onInnerEnter(value, context);
      nextTick(() => {
        scrollFunctions.scrollToRight();
      });
    };

    return {
      tagValue,
      root,
      inputValueRef,
      isHoverRef,
      tagInputPlaceholder,
      showClearIcon,
      addHover,
      cancelHover,
      ...scrollFunctions,
      onInputEnter,
      onClose,
      onInnerEnter,
      onInputBackspaceKeyUp,
      clearAll,
      classes,
    };
  },

  methods: {
    renderLabel() {
      const displayNode = renderTNodeJSX(this, 'valueDisplay', { params: { value: this.tagValue } });
      const newList = this.minCollapsedNum ? this.tagValue.slice(0, this.minCollapsedNum) : this.tagValue;
      const list =
        displayNode ??
        newList?.map((item, index) => {
          const tagContent = renderTNodeJSX(this, 'tag', { params: { value: item } });
          return (
            <Tag
              size={this.size}
              disabled={this.disabled}
              onClose={(e) => this.onClose({ e, item, index })}
              closable={!this.readonly && !this.disabled}
              {...this.tagProps}
            >
              {tagContent ?? item}
            </Tag>
          );
        });
      // 左侧文本
      const label = renderTNodeJSX(this, 'label');
      if (![null, undefined, ''].includes(label)) {
        list.unshift(<div class={`${prefix}-tag-input__prefix`}>{label}</div>);
      }
      // 超出省略
      if (newList.length !== this.tagValue.length) {
        const len = this.tagValue.length - newList.length;
        const more = renderTNodeJSX(this, 'collapsedItems', {
          params: {
            value: this.tagValue,
            count: this.tagValue.length,
            collapsedTags: this.tagValue.slice(this.minCollapsedNum, this.tagValue.length),
          },
        });
        list.push(more ?? <Tag>+{len}</Tag>);
      }
      return list;
    },

    renderSuffixIcon() {
      const suffixIcon = renderTNodeJSX(this, 'suffixIcon');
      if (this.showClearIcon) {
        return <CloseCircleFilledIcon class={CLEAR_CLASS} onClick={this.clearAll} />;
      }
      return suffixIcon;
    },
  },

  render() {
    return (
      <TInput
        ref="root"
        {...this.inputProps}
        value={this.inputValueRef}
        onChange={(val) => {
          this.inputValueRef = val;
        }}
        size={this.size}
        readonly={this.readonly}
        disabled={this.disabled}
        label={this.renderLabel}
        class={this.classes}
        tips={this.tips}
        status={this.status}
        placeholder={this.tagInputPlaceholder}
        suffix={this.suffix}
        suffixIcon={this.renderSuffixIcon}
        onPaste={this.onPaste}
        onEnter={this.onInputEnter}
        onKeyup={this.onInputBackspaceKeyUp}
        onMouseenter={(context) => {
          this.addHover(context);
          this.scrollToRightOnEnter();
        }}
        onMouseleave={(context) => {
          this.cancelHover(context);
          this.scrollToLeftOnLeave();
        }}
        onFocus={(inputValue, context) => {
          this.onFocus?.(this.tagValue, { e: context.e, inputValue });
        }}
        onBlur={(inputValue, context) => {
          this.onBlur?.(this.tagValue, { e: context.e, inputValue });
        }}
      />
    );
  },
});
