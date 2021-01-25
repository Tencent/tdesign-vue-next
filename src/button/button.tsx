import Vue, { CreateElement, VNode } from 'vue';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import TIconLoading from '../icon/loading';
import props from '@TdTypes/button/props';

const name = `${prefix}-button`;

export default Vue.extend({
  name,
  props,
  render(h: CreateElement): VNode {
    let buttonContent: JsxNode = this.$scopedSlots.default ? this.$scopedSlots.default(null) : '';
    let icon: JsxNode;

    if (this.loading) {
      icon = <TIconLoading/>;
    } else if (typeof this.icon === 'function') {
      icon = this.icon(h);
    } else if (this.$scopedSlots.icon) {
      icon = this.$scopedSlots.icon(null);
    }

    const buttonClass = [
      `${name}`,
      CLASSNAMES.SIZE[this.size],
      `${name}--variant-${this.variant}`,
      `${name}--theme-${this.theme}`,
      {
        [CLASSNAMES.STATUS.disabled]: this.disabled,
        [CLASSNAMES.STATUS.loading]: this.loading,
        [`${name}--icon-only`]: icon && !buttonContent,
        [`${name}--shape-${this.shape}`]: this.shape !== 'square',
        [`${name}--ghost`]: this.ghost,
        [CLASSNAMES.SIZE.block]: this.block,
      },
    ];

    if (icon) {
      buttonContent = [
        icon,
        buttonContent ? <span class={`${name}__text`}>{buttonContent}</span> : '',
      ];
    }

    return (
      <button class={buttonClass} disabled={this.disabled} {...{ on: this.$listeners }}>
        {buttonContent}
      </button>
    );
  },
});
