import { defineComponent, VNode } from 'vue';
import { renderTNodeJSX } from '../utils/render-tnode';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import props from './option-group-props';
import { ClassName } from '../common';

const name = `${prefix}-option-group`;

export default defineComponent({
  name,
  inject: {
    tSelect: {
      default: undefined,
    },
  },
  props: { ...props },
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
  render(): VNode {
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
