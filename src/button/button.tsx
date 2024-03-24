import { computed, defineComponent, h, inject, ref } from 'vue';
import TLoading from '../loading';
import props from './props';
import useRipple from '../hooks/useRipple';
import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import { useTNodeJSX, useContent } from '../hooks/tnode';
import { useDisabled } from '../hooks/useDisabled';
import { ButtonGroupInjectionKey } from './constants';

export default defineComponent({
  name: 'TButton',
  props,
  setup(props, { attrs, slots }) {
    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();
    const COMPONENT_NAME = usePrefixClass('button');
    const { STATUS, SIZE } = useCommonClassName();
    const btnRef = ref<HTMLElement>();
    const buttonGroupData = inject(ButtonGroupInjectionKey, undefined);
    useRipple(btnRef);

    const isDisabled = useDisabled();

    const mergeTheme = computed(() => {
      const { theme, variant } = props;
      if (theme) {
        return theme;
      } else if (buttonGroupData?.value?.theme) {
        return buttonGroupData?.value?.theme;
      }
      if (variant === 'base') return 'primary';
      return 'default';
    });

    const mergeSize = computed(() => buttonGroupData?.value?.size ?? props.size);
    const mergeDisabled = computed(() => buttonGroupData?.value?.disabled || isDisabled.value);

    const buttonClass = computed(() => [
      `${COMPONENT_NAME.value}`,
      `${COMPONENT_NAME.value}--variant-${props.variant}`,
      `${COMPONENT_NAME.value}--theme-${mergeTheme.value}`,
      {
        [SIZE.value[mergeSize.value]]: mergeSize.value !== 'medium',
        [STATUS.value.disabled]: mergeDisabled.value,
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
      const suffix =
        props.suffix || slots.suffix ? (
          <span class={`${COMPONENT_NAME.value}__suffix`}>{renderTNodeJSX('suffix')}</span>
        ) : null;

      buttonContent = buttonContent ? <span class={`${COMPONENT_NAME.value}__text`}>{buttonContent}</span> : '';
      if (icon) {
        buttonContent = [icon, buttonContent];
      }
      if (suffix) {
        buttonContent = [buttonContent].concat(suffix);
      }

      const renderTag = () => {
        if (!props.tag && props.href) return 'a';
        return props.tag || 'button';
      };

      const buttonAttrs = {
        class: [...buttonClass.value, { [`${COMPONENT_NAME.value}--icon-only`]: iconOnly }],
        type: props.type,
        disabled: isDisabled.value || props.loading,
        href: props.href,
        tabindex: isDisabled.value ? undefined : '0',
      };

      return h(
        renderTag(),
        {
          ref: btnRef,
          ...attrs,
          ...buttonAttrs,
          onClick: props.onClick,
        },
        [buttonContent],
      );
    };
  },
});
