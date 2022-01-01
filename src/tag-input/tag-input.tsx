import { defineComponent } from 'vue';
import { TagInputValue } from '.';
import { prefix } from '../config';
import TInput, { InputValue } from '../input';
import Tag from '../tag';
import props from './props';

export default defineComponent({
  name: 'TTagInput',

  components: { TInput },

  props: { ...props },

  data() {
    return {
      inputValue: undefined as string,
      scrollDistance: 0,
      timer: null,
    };
  },

  mounted() {
    this.$el.addEventListener('mousewheel', this.onWeel);
  },

  unmounted() {
    this.$el.removeEventListener('mousewheel', this.onWeel);
  },

  // setup(props) {},

  methods: {
    renderLabel() {
      return this.value?.map((item, index) => (
        <Tag onClose={(e) => this.onClose(index)} closable={!this.readonly}>
          {item}
        </Tag>
      ));
    },

    onClose(index: number) {
      const arr = [...this.value];
      arr.splice(index, 1);
      this.onChange?.(arr, { trigger: 'tag-delete' });
    },

    onInputEnter(value: InputValue, context: { e: KeyboardEvent }) {
      if (!value) return;
      const newValue: TagInputValue = this.value instanceof Array ? this.value.concat(String(value)) : [value];
      this.onChange?.(newValue, { trigger: 'enter' });
      this.onEnter?.(newValue, { ...context, inputValue: value });
      this.inputValue = '';
      this.$nextTick(() => {
        this.scrollToRight();
      });
    },

    onInputKeyUp(value: InputValue, context: { e: KeyboardEvent }) {
      // 回车键删除，TODO: 小键盘删除测试
      if (context.e.code === 'Backspace') {
        this.onChange?.(this.value.slice(0, -1), { trigger: 'backspace' });
      } else if (context.e.code === 'ArrowRight') {
        // TODO
      }
    },

    scrollToRight() {
      this.scrollDistance = this.$el.scrollWidth - this.$el.clientWidth;
      this.scrollTo(this.scrollDistance);
    },

    scrollTo(distance: number) {
      this.$el.scroll({ left: distance, behavior: 'smooth' });
    },

    onWeel(e: WheelEvent) {
      if (this.timer) return;
      if (e.deltaX > 0) {
        const distance = Math.min(this.$el.scrollLeft + 120, this.scrollDistance);
        this.scrollTo(distance);
      } else {
        const distance = Math.max(this.$el.scrollLeft - 120, 0);
        this.scrollTo(distance);
      }
      this.timer = setTimeout(() => {
        clearTimeout(this.timer);
        this.timer = null;
      }, 500);
    },
  },

  render() {
    return (
      <TInput
        v-model={this.inputValue}
        readonly={this.readonly}
        label={this.renderLabel}
        onEnter={this.onInputEnter}
        onKeyup={this.onInputKeyUp}
        class={`${prefix}-tag-input`}
        placeholder={!this.value?.length ? this.placeholder : ''}
      />
    );
  },
});
