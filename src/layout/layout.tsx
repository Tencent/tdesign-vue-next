import { defineComponent } from 'vue';
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';

const name = `${prefix}-layout`;

export default defineComponent({
  name,

  components: {
    RenderComponent,
  },

  props: {},

  data() {
    return {};
  },

  computed: {
    hasSider() {
      if (this.$slots && this.$slots.default) {
        const defaultSlot = this.$slots.default();
        return defaultSlot.some((vnode: any) => {
          const tag = vnode.type && vnode.type.name;
          return tag === `${prefix}-aside`;
        });
      }
      return false;
    },
  },

  watch: {},

  methods: {
    renderContent() {
      return this.$slots.default() ? this.$slots.default(null) : '';
    },
  },

  render() {
    const classes: ClassName = [
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
