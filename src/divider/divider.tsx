import Vue from 'vue';
import { prefix } from '../config';
import props from '@TdTypes/divider/props';

const name = `${prefix}-divider`;

export default Vue.extend({
  name,

  props: { ...props },

  render() {
    const { theme, dashed, align } = this;

    const children = this.$slots.default;

    const dividerClassNames = [
      `${name}`,
      [`${prefix}-divider--${theme}`],
      {
        [`${prefix}-divider--dashed`]: !!dashed,
        [`${prefix}-divider--with-text`]: !!children,
        [`${prefix}-divider--with-text-${align}`]: !!children,
      },
    ];

    return (
      <div class={dividerClassNames}>
          { children ? <span class={`${prefix}-divider-inner-text`}>{children}</span> : null}
      </div>
    );
  },

});
