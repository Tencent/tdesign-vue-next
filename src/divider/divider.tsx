import Vue from 'vue';
import { prefix } from '../config';

const name = `${prefix}-divider`;

export default Vue.extend({
  name,

  props: {
    type: {
      type: String,
      default: 'horizontal',
      validator(v: string): boolean {
        return (
          [
            'horizontal',
            'vertical',
          ].indexOf(v) > -1
        );
      },
    },
    dashed: {
      type: Boolean,
      default: false,
      validator(v: any): boolean {
        return typeof v === 'boolean';
      },
    },
    orientation: {
      type: String,
      default: 'center',
      validator(v: string): boolean {
        return (
          [
            'center',
            'left',
            'right',
          ].indexOf(v) > -1
        );
      },
    },
  },

  render() {
    const {
      type = 'horizontal',
      dashed,
      orientation = 'center',
    } = this.$props;

    const children = this.$slots.default;

    const dividerClassNames = [
      `${name}`,
      {
        [`${prefix}-divider--horizontal`]: type === 'horizontal',
        [`${prefix}-divider--vertical`]: type === 'vertical',
        [`${prefix}-divider--dashed`]: !!dashed,
        [`${prefix}-divider--with-text`]: !!children,
        [`${prefix}-divider--with-text-${orientation}`]: !!children,
      },
    ];

    return (
      <div class={dividerClassNames}>
          { children ? <span class={`${prefix}-divider-inner-text`}>{children}</span> : null}
      </div>
    );
  },

});
