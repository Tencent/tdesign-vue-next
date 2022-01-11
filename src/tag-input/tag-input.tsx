import { defineComponent, ref, nextTick, onMounted } from 'vue';
import { CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import { prefix } from '../config';
import TInput, { InputValue } from '../input';
import Tag from '../tag';
import props from './props';
import { renderTNodeJSX } from '../utils/render-tnode';
import useTagScroll from './useTagScroll';
import useTagList from './useTagList';
import useHover from './useHover';

const CLEAR_CLASS = `${prefix}-tag-input__suffix-clear`;

export default defineComponent({
  name: 'TTagInput',

  props: { ...props },

  setup(props) {
    const root = ref(null);
    const inputValueRef = ref<InputValue>();
    const { isHoverRef, onRootMouseenter, onRootMouseleave } = useHover(props);
    const scrollFunctions = useTagScroll(props, root);
    const { onClose, onInnerEnter, onInputBackspaceKeyUp, clearAll } = useTagList(props);

    const onInputEnter = (value: InputValue, context: { e: KeyboardEvent }) => {
      onInnerEnter(value, context);
      inputValueRef.value = '';
      nextTick(() => {
        scrollFunctions.scrollToRight();
      });
    };

    return {
      root,
      inputValueRef,
      isHoverRef,
      onRootMouseenter,
      onRootMouseleave,
      ...scrollFunctions,
      onInputEnter,
      onClose,
      onInnerEnter,
      onInputBackspaceKeyUp,
      clearAll,
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
            <Tag onClose={(e) => this.onClose({ e, item, index })} closable={!this.readonly} {...this.tagProps}>
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
      if (!this.readonly && !this.disabled && this.clearable && this.isHoverRef) {
        return <CloseCircleFilledIcon class={CLEAR_CLASS} onClick={this.clearAll} />;
      }
      return suffixIcon;
    },
  },

  render() {
    return (
      <TInput
        ref="root"
        v-model={this.inputValueRef}
        readonly={this.readonly}
        label={this.renderLabel}
        onBlur={this.scrollToLeft}
        onEnter={this.onInputEnter}
        onKeyup={this.onInputBackspaceKeyUp}
        onMouseenter={this.onRootMouseenter}
        onMouseleave={this.onRootMouseleave}
        class={`${prefix}-tag-input`}
        placeholder={!this.value?.length ? this.placeholder : ''}
        status={this.status}
        suffixIcon={this.renderSuffixIcon}
        {...this.inputProps}
      />
    );
  },
});
