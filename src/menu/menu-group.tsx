import { defineComponent } from 'vue';

import { usePrefixClass } from '../hooks/useConfig';
import { renderTNodeJSX } from '../utils/render-tnode';

import props from './menu-group-props';

export default defineComponent({
  name: 'TMenuGroup',
  props,
  setup() {
    const classPrefix = usePrefixClass();
    return {
      classPrefix,
    };
  },
  render() {
    const { classPrefix } = this;
    return (
      <div class={`${classPrefix}-menu-group`}>
        <div class={`${classPrefix}-menu-group__title`}>{this.title}</div>
        {renderTNodeJSX(this, 'default')}
      </div>
    );
  },
});
