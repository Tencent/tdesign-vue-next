import { defineComponent } from 'vue';
import { renderTNodeJSX } from '../utils/render-tnode';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import props from '@TdTypes/option-group/props';

const name = `${prefix}-option-group`;
// interface Select extends Vue {
//   tSelect: {
//     size: string;
//   };
// }

export default defineComponent({
  name,
  inject: {
    tSelect: { default: undefined },
  },
  props: { ...props },
  computed: {
    classes(): Array<string|object> {
      return [
        name,
        {
          [CLASSNAMES.SIZE[this.tSelect.size]]: this.tSelect && this.tSelect.size,
        },
      ];
    },
  },
  render() {
    const children = renderTNodeJSX(this, 'default');
    return (
      <li class={this.classes}>
        <ul class={`${name}-header`}>{ this.label }</ul>
        <ul>
          {children}
        </ul>
      </li>
    );
  },
});
