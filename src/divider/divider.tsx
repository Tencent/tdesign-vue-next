import { defineComponent } from 'vue';
import { prefix } from '../config';
import props from './props';
import { renderContent } from '../utils/render-tnode';

const name = `${prefix}-divider`;

export default defineComponent({
  name,

  props: { ...props },

  render() {
    const { theme, dashed, align } = this;
    const children = renderContent(this, 'default', 'content');

    const dividerClassNames = [
      `${name}`,
      [`${name}--${theme}`],
      {
        [`${name}--dashed`]: !!dashed,
        [`${name}--with-text`]: !!children,
        [`${name}--with-text-${align}`]: !!children,
      },
    ];

    return (
      <div class={dividerClassNames} {...this.$attrs}>
        {children && <span class={`${name}__inner-text`}>{children}</span>}
      </div>
    );
  },
});
