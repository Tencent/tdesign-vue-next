import { computed, defineComponent, h, VNode } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';
import props from './props';
import { useConfig, usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import { useTNodeJSX, useContent } from '../hooks/tnode';

export default defineComponent({
  name: 'TTag',
  props,
  setup(props) {
    const { global: tagGlobalConfig } = useConfig('tag');
    const COMPONENT_NAME = usePrefixClass('tag');
    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();
    const { SIZE } = useCommonClassName();

    const tagClass = computed(() => {
      return [
        `${COMPONENT_NAME.value}`,
        `${COMPONENT_NAME.value}--${props.theme}`,
        `${COMPONENT_NAME.value}--${props.variant}`,
        {
          [`${COMPONENT_NAME.value}--ellipsis`]: props.maxWidth,
          [`${COMPONENT_NAME.value}--close`]: props.closable,
          [`${COMPONENT_NAME.value}--disabled`]: props.disabled,
        },
        SIZE.value[props.size],
        props.shape !== 'square' && `${COMPONENT_NAME.value}--${props.shape}`,
      ];
    });

    const tagStyle = computed<Record<string, string>>(() => {
      return props.maxWidth ? { maxWidth: `${props.maxWidth}px` } : {};
    });

    const handleClick = (e: MouseEvent) => {
      props.onClick?.({ e });
    };

    const getCloseIcon = () => {
      if (!props.closable) return null;
      const iconClassName = `${COMPONENT_NAME.value}__icon-close`;
      if (tagGlobalConfig.value.closeIcon) {
        return h(tagGlobalConfig.value.closeIcon(h) as VNode, { class: iconClassName });
      }
      return <CloseIcon onClick={({ e }: { e: MouseEvent }) => props.onClose?.({ e })} class={iconClassName} />;
    };

    return () => {
      // 关闭按钮 自定义组件使用 nativeOnClick 绑定事件
      const closeIcon = getCloseIcon();
      // 标签内容
      const tagContent = renderContent('default', 'content');
      // 图标
      const icon = renderTNodeJSX('icon');

      return (
        <span class={tagClass.value} style={tagStyle.value} onClick={handleClick}>
          {icon}
          {props.maxWidth ? (
            <span style={tagStyle.value} class={`${COMPONENT_NAME.value}--text`}>
              {tagContent}
            </span>
          ) : (
            tagContent
          )}
          {closeIcon}
        </span>
      );
    };
  },
});
