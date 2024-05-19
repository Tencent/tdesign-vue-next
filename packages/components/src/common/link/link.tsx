import { computed, defineComponent } from '@td/adapter-vue';
import { useDisabled, useContent, useTNodeJSX, usePrefixClass, useCommonClassName, useEmitEvent } from '@td/adapter-hooks';
import props from '@td/intel/components/link/props';

export default defineComponent({
  name: 'TLink',
  props,
  emits: ['click'],
  setup(props) {
    const renderContent = useContent();
    const renderTNodeJSX = useTNodeJSX();
    const COMPONENT_NAME = usePrefixClass('link');
    const classPrefix = usePrefixClass();
    const { STATUS, SIZE } = useCommonClassName();
    const isDisabled = useDisabled();
    const emitEvent = useEmitEvent();

    const linkClass = computed(() => [
      `${COMPONENT_NAME.value}`,
      `${COMPONENT_NAME.value}--theme-${props.theme}`,
      {
        [SIZE.value[props.size!]]: props.size !== 'medium',
        [STATUS.value.disabled]: isDisabled.value,
        [`${classPrefix.value}-is-underline`]: props.underline,
        [`${COMPONENT_NAME.value}--hover-${props.hover}`]: !isDisabled.value,
      },
    ]);
    // 禁用时 无点击事件
    const handleClick = (event: MouseEvent) => {
      if (!isDisabled.value) emitEvent('click', event);
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
