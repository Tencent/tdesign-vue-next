import Vue, { VNode } from 'vue';
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';

const name = `${prefix}-list-item`;

export default Vue.extend({
  name,
  components: {
    RenderComponent,
  },
  methods: {
    renderContent() {
      return this.$slots.default ? this.$slots.default : '';
    },
  },
  render(): VNode {
    let listItemContent: JsxNode = this.renderContent();

    listItemContent = [
      listItemContent,
      this.$slots.action ? <ul class={`${name}__action`}>{this.$slots.action}</ul> : '',
    ];

    return (
      <li class={name}>
        <div class={`${name}-main`}>
          {listItemContent}
        </div>
      </li>
    );
  },
});
