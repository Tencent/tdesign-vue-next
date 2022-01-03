import { defineComponent } from 'vue';
import { CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import { prefix } from '../config';
import TInput, { InputValue } from '../input';
import TagList from './tag-list';
import Tag from '../tag';
import props from './props';
import { renderTNodeJSX } from '../utils/render-tnode';
import useTagScroll from './useTagScroll';
import useTagList from './useTagList';

export default defineComponent({
  name: 'TTagInput',

  props: { ...props },

  setup(props) {
    const scrollFunctions = useTagScroll(props);
    const { onClose, onInnerEnter, onInputBackspaceKeyUp, clearAll } = useTagList(props);
    return {
      ...scrollFunctions,
      onClose,
      onInnerEnter,
      onInputBackspaceKeyUp,
      clearAll,
    };
  },

  data() {
    return {
      inputValue: '',
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
      const displayNode = renderTNodeJSX(this, 'valueDisplay');
      const newList = this.minCollapsedNum ? this.value.slice(0, this.minCollapsedNum) : this.value;
      const list = displayNode ?? [
        <TagList list={newList} tagProps={this.tagProps} readonly={this.readonly} onClose={this.onClose} />,
      ];
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

    onInputEnter(value: InputValue, context: { e: KeyboardEvent }) {
      this.onInnerEnter(value, context);
      this.inputValue = '';
      this.$nextTick(() => {
        this.scrollToRight();
      });
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
