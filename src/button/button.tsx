import { defineComponent, h, VNodeChild } from 'vue';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import TIconLoading from '../icon/loading';
import props from '@TdTypes/button/props';

const name = `${prefix}-button`;

export default defineComponent({
  name,
  props,
  methods: {
    renderPropContent(propName: 'content' | 'default') {
      const propsContent = this[propName];
      if (typeof propsContent === 'function') {
        return propsContent(h);
      }
      if (typeof propsContent !== 'undefined') {
        return propsContent;
      }
      return undefined;
    },
    renderContent() {
      const propsContent = this.renderPropContent('content');
      const propsDefault = this.renderPropContent('default');

      if (typeof propsContent !== 'undefined') {
        return propsContent;
      }
      if (typeof propsDefault !== 'undefined') {
        return propsDefault;
      }

      return this.$slots.default ? this.$slots.default(null) : '';
    },
  },
  render() {
    let buttonContent: VNodeChild = this.renderContent();
    let icon: VNodeChild;

    if (this.loading) {
      icon = <TIconLoading/>;
    } else if (typeof this.icon === 'function') {
      icon = this.icon(h);
    } else if (this.$slots.icon) {
      icon = this.$slots.icon(null);
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
      <button class={buttonClass} type={this.type} disabled={this.disabled} {...this.$attrs}>
        {buttonContent}
      </button>
    );
  },
});
