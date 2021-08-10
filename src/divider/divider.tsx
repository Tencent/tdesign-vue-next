import { defineComponent } from 'vue';
import { prefix } from '../config';
import props from '../../types/divider/props';

const name = `${prefix}-divider`;

export default defineComponent({
  name,

  props: { ...props },

  render() {
    const { theme, dashed, align } = this;
    const children = this.$slots.default ? this.$slots.default() : '';

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
      <div class={dividerClassNames}>
          {children && <span class={`${name}-inner-text`}>{children}</span>}
      </div>
    );
  },

});
