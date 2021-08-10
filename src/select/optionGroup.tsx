import { defineComponent, inject } from 'vue';
import { renderTNodeJSX } from '../utils/render-tnode';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import props from '../../types/option-group/props';
import type { TdSelect } from './instance';
import { ClassName } from '../common';

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
  setup() {
    const tSelect: TdSelect = inject('tSelect');

    return {
      tSelect,
    };
  },
  computed: {
    classes(): ClassName {
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
