import { defineComponent } from 'vue';
import props from './menu-group-props';
import { renderTNodeJSX } from '../utils/render-tnode';
import { usePrefixClass } from '../hooks/useConfig';

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
        <div class={`${classPrefix}-menu-group__title`}>{renderTNodeJSX(this, 'title', { silent: false })}</div>
        {renderTNodeJSX(this, 'default')}
      </div>
    );
  },
});
