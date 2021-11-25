import { defineComponent } from 'vue';
import { prefix } from '../config';
import { ClassName } from '../common';

const name = `${prefix}-layout`;

export default defineComponent({
  name,

  provide(): any {
    return {
      layout: this,
    };
  },

  props: {},

  data() {
    return {
      hasSider: false,
    };
  },

  computed: {
    classes(): ClassName {
      return [
        name,
        {
          [`${name}-has-sider`]: this.hasSider,
        },
      ];
    },
  },

  watch: {},

  methods: {
    renderContent() {
      return this.$slots.default() ? this.$slots.default(null) : '';
    },
  },

  render() {
    return <section class={this.classes}>{this.renderContent()}</section>;
  },
});
