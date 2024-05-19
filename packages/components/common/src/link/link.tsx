import { computed, defineComponent } from 'vue';
import { useConfig, usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import { useContent, useTNodeJSX } from '../hooks/tnode';
import { useDisabled } from '../hooks/useDisabled';
import props from '@td/intel/link/props';

export default defineComponent({
  name: 'TLink',
  props: { ...props },
  emits: ['click'],
  setup(props, { emit }) {
    const renderContent = useContent();
    const renderTNodeJSX = useTNodeJSX();
    const COMPONENT_NAME = usePrefixClass('link');
    const { STATUS, SIZE } = useCommonClassName();
    const { classPrefix } = useConfig('classPrefix');
    const isDisabled = useDisabled();

    const linkClass = computed(() => [
      `${COMPONENT_NAME.value}`,
      `${COMPONENT_NAME.value}--theme-${props.theme}`,
      {
        [SIZE.value[props.size]]: props.size !== 'medium',
        [STATUS.value.disabled]: isDisabled.value,
        [`${classPrefix.value}-is-underline`]: props.underline,
        [`${COMPONENT_NAME.value}--hover-${props.hover}`]: !isDisabled.value,
      },
    ]);
    // 禁用时 无点击事件
    const handleClick = (event: MouseEvent) => {
      if (!isDisabled.value) emit('click', event);
    };
    return () => {
      const linkContent = renderContent('default', 'content');
      const prefix = renderTNodeJSX('prefixIcon');
      const suffix = renderTNodeJSX('suffixIcon');

      return (
        <a
          class={[...linkClass.value]}
          href={isDisabled.value || !props.href ? undefined : props.href}
          target={!props.target ? undefined : props.target}
          download={!props.download ? undefined : props.download}
          onClick={handleClick}
        >
          {prefix ? <span class={`${COMPONENT_NAME.value}__prefix-icon`}>{prefix}</span> : null}
          {linkContent}
          {suffix ? <span class={`${COMPONENT_NAME.value}__suffix-icon`}>{suffix}</span> : null}
        </a>
      );
    };
  },
});
