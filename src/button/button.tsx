import { computed, defineComponent } from 'vue';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import TLoading from '../loading';
import props from './props';
import { renderContent, renderTNodeJSX } from '../utils/render-tnode';
import ripple from '../utils/ripple';

const name = `${prefix}-button`;

export default defineComponent({
  name: 'TButton',
  directives: { ripple },
  inheritAttrs: false,
  props,
  setup(props) {
    const isDisabledRef = computed(() => props.disabled || props.loading);
    const mergeThemeRef = computed(() => {
      const { theme, variant } = props;
      if (theme) return theme;
      if (variant === 'base') return 'primary';
      return 'default';
    });
    return {
      isDisabled: isDisabledRef,
      mergeTheme: mergeThemeRef,
    };
  },
  render() {
    let buttonContent = renderContent(this, 'default', 'content');
    const icon = this.loading ? <TLoading inheritColor={true} /> : renderTNodeJSX(this, 'icon');
    const iconOnly = icon && !buttonContent;

    const buttonClass = [
      `${name}`,
      CLASSNAMES.SIZE[this.size],
      `${name}--variant-${this.variant}`,
      `${name}--theme-${this.mergeTheme}`,
      {
        [CLASSNAMES.STATUS.disabled]: this.isDisabled,
        [CLASSNAMES.STATUS.loading]: this.loading,
        [`${name}--icon-only`]: iconOnly,
        [`${name}--shape-${this.shape}`]: this.shape !== 'rectangle',
        [`${name}--ghost`]: this.ghost,
        [CLASSNAMES.SIZE.block]: this.block,
      },
    ];

    buttonContent = buttonContent ? <span class={`${name}__text`}>{buttonContent}</span> : '';
    if (icon) {
      buttonContent = [icon, buttonContent];
    }

    return (
      <button
        v-ripple
        class={buttonClass}
        type={this.type}
        disabled={this.disabled}
        {...this.$attrs}
        onClick={this.onClick}
      >
        {buttonContent}
      </button>
    );
  },
});
