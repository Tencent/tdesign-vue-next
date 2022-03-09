import { computed, defineComponent, ref } from 'vue';
import CLASSNAMES from '../utils/classnames';
import TLoading from '../loading';
import props from './props';
import { renderContent, renderTNodeJSX } from '../utils/render-tnode';
import useRipple from '../hooks/useRipple';
import { useFormDisabled } from '../form/hooks';
import { usePrefixClass } from '../config-provider';

export default defineComponent({
  name: 'TButton',
  inheritAttrs: false,
  props,
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('button');
    const disabled = useFormDisabled();
    const btnRef = ref<HTMLElement>();

    useRipple(btnRef);

    const isDisabled = computed(() => props.disabled || props.loading || disabled.value);
    const mergeTheme = computed(() => {
      const { theme, variant } = props;
      if (theme) return theme;
      if (variant === 'base') return 'primary';
      return 'default';
    });
    const buttonClass = computed(() => [
      `${COMPONENT_NAME.value}`,
      CLASSNAMES.SIZE[props.size],
      `${COMPONENT_NAME.value}--variant-${props.variant}`,
      `${COMPONENT_NAME.value}--theme-${mergeTheme.value}`,
      {
        [CLASSNAMES.STATUS.disabled]: isDisabled.value,
        [CLASSNAMES.STATUS.loading]: props.loading,
        [`${COMPONENT_NAME.value}--shape-${props.shape}`]: props.shape !== 'rectangle',
        [`${COMPONENT_NAME.value}--ghost`]: props.ghost,
        [CLASSNAMES.SIZE.block]: props.block,
      },
    ]);

    return {
      COMPONENT_NAME,
      disabled: isDisabled,
      mergeTheme,
      buttonClass,
      btnRef,
    };
  },
  render() {
    const { COMPONENT_NAME } = this;
    let buttonContent = renderContent(this, 'default', 'content');
    const icon = this.loading ? <TLoading inheritColor={true} /> : renderTNodeJSX(this, 'icon');
    const iconOnly = icon && !buttonContent;

    buttonContent = buttonContent ? <span class={`${COMPONENT_NAME}__text`}>{buttonContent}</span> : '';
    if (icon) {
      buttonContent = [icon, buttonContent];
    }

    return (
      <button
        ref="btnRef"
        class={[...this.buttonClass, { [`${COMPONENT_NAME}--icon-only`]: iconOnly }]}
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
