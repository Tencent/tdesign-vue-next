import Vue, { VNode } from 'vue';
import { prefix } from '../config';

export default Vue.extend({
  name: `${prefix}-tree-node`,
  props: {
    item: {
      type: Object,
      default(): object {
        return {};
      },
    },
  },
  data() {
    return {

    };
  },
  methods: {
    renderItem(): Array<VNode> {
      const itemNodes: Array<VNode> = [];
      return itemNodes;
    },
  },
  render() {
    return <li>{this.renderItem()}</li>;
  },
});
