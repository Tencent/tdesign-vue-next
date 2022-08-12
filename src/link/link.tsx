import { computed, defineComponent, h } from 'vue';
import camelCase from 'lodash/camelCase';
import kebabCase from 'lodash/kebabCase';
import { useConfig, usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import { useContent } from '../hooks/tnode';
import props from './props';

export default defineComponent({
  name: 'TLink',
  props: { ...props },
  emits: ['click'],
  setup(props, { slots, emit }) {
    const renderContent = useContent();
    const COMPONENT_NAME = usePrefixClass('link');
    const { STATUS, SIZE } = useCommonClassName();
    const { classPrefix } = useConfig('classPrefix');

    const linkClass = computed(() => [
      `${COMPONENT_NAME.value}`,
      SIZE.value[props.size],
      `${COMPONENT_NAME.value}--theme-${props.theme}`,
      {
        [STATUS.value.disabled]: props.disabled,
        [`${classPrefix.value}-is-underline`]: props.underline,
        [`${COMPONENT_NAME.value}--hover-${props.hover}`]: !props.disabled,
      },
    ]);
    // 渲染前后icon
    const renderIcon = (icon: string | Function | undefined, iconType: 'prefix-icon' | 'suffix-icon') => {
      if (typeof icon === 'function') {
        return icon(h);
      }
      // 插槽名称为中划线
      if (slots[kebabCase(iconType)]) {
        return slots[kebabCase(iconType)](null);
      }
      // 插槽名称为驼峰
      if (slots[camelCase(iconType)]) {
        return slots[camelCase(iconType)](null);
      }
      return null;
    };
    // 禁用时 无点击事件
    const handleClick = (event: MouseEvent) => {
      if (!props.disabled) emit('click', event);
    };
    return () => {
      const linkContent = renderContent('default', 'content');
      const prefixIcon = renderIcon(props.prefixIcon, 'prefix-icon');
      const suffixIcon = renderIcon(props.suffixIcon, 'suffix-icon');

      return (
        <a
          class={[...linkClass.value]}
          href={props.disabled || !props.href ? undefined : props.href}
          target={props.target}
          onClick={handleClick}
        >
          {prefixIcon ? <span class="t-link__prefix-icon">{prefixIcon}</span> : null}
          {linkContent}
          {suffixIcon ? <span class="t-link__suffix-icon">{suffixIcon}</span> : null}
        </a>
      );
    };
  },
});
