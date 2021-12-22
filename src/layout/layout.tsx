import { defineComponent } from 'vue';
import { prefix } from '../config';
import { ClassName } from '../common';
import { renderTNodeJSX } from '../utils/render-tnode';

const name = `${prefix}-layout`;

export default defineComponent({
  name: 'TLayout',

  provide(): any {
    return {
      layout: this,
    };
  },

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
          [`${name}--with-sider`]: this.hasSider,
        },
      ];
    },
  },

  render() {
    return <section class={this.classes}>{renderTNodeJSX(this, 'default')}</section>;
  },
});
