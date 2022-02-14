import { computed, defineComponent } from 'vue';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import TLoading from '../loading';
import props from './props';
import { renderContent, renderTNodeJSX } from '../utils/render-tnode';
import ripple from '../utils/ripple';

// hooks
import { useFormDisabled } from '../form/hooks';

const name = `${prefix}-button`;

export default defineComponent({
  name: 'TButton',
  directives: { ripple },
  inheritAttrs: false,
  props,
  setup(props) {
    const disabled = useFormDisabled();
    const isDisabledRef = computed(() => props.disabled || props.loading || disabled.value);
    const mergeThemeRef = computed(() => {
      const { theme, variant } = props;
      if (theme) return theme;
      if (variant === 'base') return 'primary';
      return 'default';
    });
    const buttonClassRef = computed(() => [
      `${name}`,
      CLASSNAMES.SIZE[props.size],
      `${name}--variant-${props.variant}`,
      `${name}--theme-${mergeThemeRef.value}`,
      {
        [CLASSNAMES.STATUS.disabled]: isDisabledRef.value,
        [CLASSNAMES.STATUS.loading]: props.loading,
        [`${name}--shape-${props.shape}`]: props.shape !== 'rectangle',
        [`${name}--ghost`]: props.ghost,
        [CLASSNAMES.SIZE.block]: props.block,
      },
    ]);

    return {
      disabled: isDisabledRef,
      mergeTheme: mergeThemeRef,
      buttonClass: buttonClassRef,
    };
  },
  render() {
    let buttonContent = renderContent(this, 'default', 'content');
    const icon = this.loading ? <TLoading inheritColor={true} /> : renderTNodeJSX(this, 'icon');
    const iconOnly = icon && !buttonContent;

    buttonContent = buttonContent ? <span class={`${name}__text`}>{buttonContent}</span> : '';
    if (icon) {
      buttonContent = [icon, buttonContent];
    }

    return (
      <button
        v-ripple
        class={[...this.buttonClass, { [`${name}--icon-only`]: iconOnly }]}
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
