import { computed, defineComponent, ref } from 'vue';
import TLoading from '../loading';
import props from './props';
import useRipple from '../hooks/useRipple';
import { useFormDisabled } from '../form/hooks';
import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import { useTNodeJSX, useContent } from '../hooks/tnode';

export default defineComponent({
  name: 'TButton',
  inheritAttrs: false,
  props,
  setup(props, { attrs }) {
    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();
    const COMPONENT_NAME = usePrefixClass('button');
    const { STATUS, SIZE } = useCommonClassName();
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
      SIZE.value[props.size],
      `${COMPONENT_NAME.value}--variant-${props.variant}`,
      `${COMPONENT_NAME.value}--theme-${mergeTheme.value}`,
      {
        [STATUS.value.disabled]: isDisabled.value,
        [STATUS.value.loading]: props.loading,
        [`${COMPONENT_NAME.value}--shape-${props.shape}`]: props.shape !== 'rectangle',
        [`${COMPONENT_NAME.value}--ghost`]: props.ghost,
        [SIZE.value.block]: props.block,
      },
    ]);

    return () => {
      let buttonContent = renderContent('default', 'content');
      const icon = props.loading ? <TLoading inheritColor={true} /> : renderTNodeJSX('icon');
      const iconOnly = icon && !buttonContent;

      buttonContent = buttonContent ? <span class={`${COMPONENT_NAME.value}__text`}>{buttonContent}</span> : '';
      if (icon) {
        buttonContent = [icon, buttonContent];
      }

      return (
        <button
          ref={btnRef}
          class={[...buttonClass.value, { [`${COMPONENT_NAME.value}--icon-only`]: iconOnly }]}
          type={props.type}
          disabled={isDisabled.value}
          {...attrs}
          onClick={props.onClick}
        >
          {buttonContent}
        </button>
      );
    };
  },
});
