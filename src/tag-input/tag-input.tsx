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

  setup(props: TdTagInputProps) {
    const root = ref(null);
    const inputValueRef = ref<InputValue>();
    const { isHoverRef, addHover, cancelHover } = useHover(props);
    const scrollFunctions = useTagScroll(props, root);
    const { onClose, onInnerEnter, onInputBackspaceKeyUp, clearAll } = useTagList(props);

    const classes = computed(() => {
      return [
        NAME_CLASS,
        {
          [BREAK_LINE_CLASS]: props.overTagsDisplayType === 'break-line',
        },
      ];
    });

    const tagInputPlaceholder = computed(() => {
      return isHoverRef.value || !props.value?.length ? props.placeholder : '';
    });

    const showClearIcon = computed(() => {
      return Boolean(!props.readonly && !props.disabled && props.clearable && isHoverRef.value && props.value?.length);
    });

    const onInputEnter = (value: InputValue, context: { e: KeyboardEvent }) => {
      inputValueRef.value = '';
      onInnerEnter(value, context);
      nextTick(() => {
        scrollFunctions.scrollToRight();
      });
    };

    return {
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
      const displayNode = renderTNodeJSX(this, 'valueDisplay', { params: { value: this.value } });
      const newList = this.minCollapsedNum ? this.value.slice(0, this.minCollapsedNum) : this.value;
      const list =
        displayNode ??
        newList?.map((item, index) => {
          const tagContent = renderTNodeJSX(this, 'tag', { params: { value: item } });
          return (
            <Tag
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
      if (newList.length !== this.value.length) {
        const len = this.value.length - newList.length;
        const more = renderTNodeJSX(this, 'collapsedItems', {
          params: {
            value: this.value,
            count: this.value.length,
            collapsedTags: this.value.slice(this.minCollapsedNum, this.value.length),
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
        readonly={this.readonly}
        disabled={this.disabled}
        label={this.renderLabel}
        class={this.classes}
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
          this.onFocus?.(this.value, { e: context.e, inputValue });
        }}
        onBlur={(inputValue, context) => {
          this.onBlur?.(this.value, { e: context.e, inputValue });
        }}
      />
    );
  },
});
