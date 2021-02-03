import Vue, { CreateElement, VNode } from 'vue';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import TIconLoading from '../icon/loading';
import props from '@TdTypes/button/props';

const name = `${prefix}-button`;

export default Vue.extend({
  name,
  props,
  methods: {
    renderPropContent(h: CreateElement, propName: 'content' | 'default') {
      const propsContent = this[propName];
      if (typeof propsContent === 'function') {
        return propsContent(h);
      }
      if (typeof propsContent !== 'undefined') {
        return propsContent;
      }
      return undefined;
    },
    renderContent(h: CreateElement) {
      const propsContent = this.renderPropContent(h, 'content');
      const propsDefault = this.renderPropContent(h, 'default');

      if (typeof propsContent !== 'undefined') {
        return propsContent;
      }
      if (typeof propsDefault !== 'undefined') {
        return propsDefault;
      }

      return this.$scopedSlots.default ? this.$scopedSlots.default(null) : '';
    },
  },
  render(h: CreateElement): VNode {
    let buttonContent: JsxNode = this.renderContent(h);
    let icon: JsxNode;

    if (this.loading) {
      icon = <TIconLoading/>;
    } else if (typeof this.icon === 'function') {
      icon = this.icon(h);
    } else if (this.$scopedSlots.icon) {
      icon = this.$scopedSlots.icon(null);
    }

    const iconOnly = icon && (typeof buttonContent === 'undefined' || buttonContent === '');

    const buttonClass = [
      `${name}`,
      CLASSNAMES.SIZE[this.size],
      `${name}--variant-${this.variant}`,
      `${name}--theme-${this.theme}`,
      {
        [CLASSNAMES.STATUS.disabled]: this.disabled,
        [CLASSNAMES.STATUS.loading]: this.loading,
        [`${name}--icon-only`]: iconOnly,
        [`${name}--shape-${this.shape}`]: this.shape !== 'square',
        [`${name}--ghost`]: this.ghost,
        [CLASSNAMES.SIZE.block]: this.block,
      },
    ];

    if (icon) {
      buttonContent = [
        icon,
        !iconOnly ? <span class={`${name}__text`}>{buttonContent}</span> : '',
      ];
    }

    return (
      <button class={buttonClass} type={this.type} disabled={this.disabled} {...{ on: this.$listeners }}>
        {buttonContent}
      </button>
    );
  },
});
