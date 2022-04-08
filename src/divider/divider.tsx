import { defineComponent } from 'vue';
import props from './props';
import { renderContent } from '../utils/render-tnode';
import { usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  name: 'TDivider',

  props: { ...props },

  setup() {
    const COMPONENT_NAME = usePrefixClass('divider');
    return {
      COMPONENT_NAME,
    };
  },
  render() {
    const { theme, dashed, align, COMPONENT_NAME } = this;
    const children = renderContent(this, 'default', 'content');

    const dividerClassNames = [
      `${COMPONENT_NAME}`,
      [`${COMPONENT_NAME}--${theme}`],
      {
        [`${COMPONENT_NAME}--dashed`]: !!dashed,
        [`${COMPONENT_NAME}--with-text`]: !!children,
        [`${COMPONENT_NAME}--with-text-${align}`]: !!children,
      },
    ];

    return (
      <div class={dividerClassNames} {...this.$attrs}>
        {children && <span class={`${COMPONENT_NAME}__inner-text`}>{children}</span>}
      </div>
    );
  },
});
