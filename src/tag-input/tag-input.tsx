import { defineComponent, ref, nextTick } from 'vue';
import { CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import { prefix } from '../config';
import TInput, { InputValue } from '../input';
import Tag from '../tag';
import props from './props';
import { renderTNodeJSX } from '../utils/render-tnode';
import useTagScroll from './useTagScroll';
import useTagList from './useTagList';

export default defineComponent({
  name: 'TTagInput',

  props: { ...props },

  setup(props) {
    const inputValue = ref<InputValue>();
    const scrollFunctions = useTagScroll(props);
    const { onClose, onInnerEnter, onInputBackspaceKeyUp, clearAll } = useTagList(props);

    const onInputEnter = (value: InputValue, context: { e: KeyboardEvent }) => {
      onInnerEnter(value, context);
      inputValue.value = '';
      nextTick(() => {
        scrollFunctions.scrollToRight();
      });
    };

    return {
      inputValue,
      ...scrollFunctions,
      onInputEnter,
      onClose,
      onInnerEnter,
      onInputBackspaceKeyUp,
      clearAll,
    };
  },

  mounted() {
    const element = this.$el;
    this.setScrollElement(element);
    this.addListeners(element);
  },

  unmounted() {
    this.removeListeners(this.$el);
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
  },

  render() {
    return (
      <TInput
        v-model={this.inputValue}
        readonly={this.readonly}
        label={this.renderLabel}
        onBlur={this.scrollToLeft}
        onEnter={this.onInputEnter}
        onKeyup={this.onInputBackspaceKeyUp}
        class={`${prefix}-tag-input`}
        placeholder={!this.value?.length ? this.placeholder : ''}
        status={this.status}
        suffixIcon={
          this.readonly || !this.clearable ? undefined : () => <CloseCircleFilledIcon onClick={this.clearAll} />
        }
        {...this.inputProps}
      />
    );
  },
});
