import Vue, { VNode } from 'vue';
import RenderComponent from '../utils/render-component';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-tag`;

export default Vue.extend({
  name: `${prefix}-check-tag`,
  components: {
    RenderComponent,
  },
  props: {
    checked: Boolean,
    disabled: Boolean,
  },
  computed: {
    tagClass(): Array<any> {
      return [
        `${name}`,
        `${name}--default`,
        {
          [`${name}--checked`]: !this.disabled && this.checked,
          [`${name}--disabled`]: this.disabled,
        },
      ];
    },
  },
  methods: {
    handleClick(event: any): void {
      if (!this.disabled) this.$emit('click', event);
    },
  },
  render() {
    // 标签内容
    const tagContent: VNode[] | VNode | string = this.$scopedSlots.default ?
      this.$scopedSlots.default(null) : '';

    return (
      <span class={ this.tagClass } on-click={ this.handleClick }>
        { tagContent }
      </span>
    );
  },
});
