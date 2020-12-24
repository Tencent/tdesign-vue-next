import Vue from 'vue';
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';

const name = `${prefix}-layout`;

export default Vue.extend({
  name,

  components: {
    RenderComponent,
  },

  props: {},

  data() {
    return {};
  },

  methods: {
    renderContent() {
      return this.$scopedSlots.default ? this.$scopedSlots.default(null) : '';
    },
  },

  computed: {
    hasSider() {
      if (this.$slots) {
        const defaultSlot = (this.$slots as any).default;
        const containSider = defaultSlot.some((vnode: any) => {
          const tag = vnode.componentOptions && vnode.componentOptions.tag;
          return tag === `${prefix}-aside`;
        }) as boolean;
        return containSider;
      }
      return false;
    },
  },

  watch: {},

  render() {
    const classes: Array<string|object> = [
      name,
      {
        [`${name}-has-sider`]: this.hasSider,
      },
    ];
    return (
      <section class={classes}>
        {this.renderContent()}
      </section>
    );
  },
});
