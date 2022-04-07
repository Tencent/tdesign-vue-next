import { computed, defineComponent, h, VNode } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';
import { useConfig, usePrefixClass } from '../hooks/useConfig';
import CLASSNAMES from '../utils/classnames';
import props from './props';
import { renderTNodeJSX, renderContent } from '../utils/render-tnode';

export default defineComponent({
  name: 'TTag',
  props,
  setup(props) {
    const { global: tagGlobalConfig } = useConfig('tag');
    const COMPONENT_NAME = usePrefixClass('tag');

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
        CLASSNAMES.SIZE[props.size],
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

    return {
      COMPONENT_NAME,
      tagClass,
      tagStyle,
      getCloseIcon,
      handleClick,
    };
  },
  render() {
    // 关闭按钮 自定义组件使用 nativeOnClick 绑定事件
    const closeIcon = this.getCloseIcon();
    // 标签内容
    const tagContent = renderContent(this, 'default', 'content');
    // 图标
    const icon = renderTNodeJSX(this, 'icon');

    return (
      <span class={this.tagClass} style={this.tagStyle} onClick={this.handleClick}>
        {icon}
        {this.maxWidth ? (
          <span style={this.tagStyle} class={`${this.COMPONENT_NAME}--text`}>
            {tagContent}
          </span>
        ) : (
          tagContent
        )}
        {closeIcon}
      </span>
    );
  },
});
