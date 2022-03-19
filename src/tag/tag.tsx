import { computed, defineComponent, h, VNode } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';
import { useConfig } from '../config-provider';
import CLASSNAMES from '../utils/classnames';
import props from './props';
import { renderTNodeJSX, renderContent } from '../utils/render-tnode';

export default defineComponent({
  name: 'TTag',
  props,
  setup(props) {
    const { global: tagGlobalConfig, classPrefix: prefix } = useConfig('tag');

    const name = computed(() => {
      return `${prefix.value}-tag`;
    });

    const tagClass = computed(() => {
      return [
        `${name.value}`,
        `${name.value}--${props.theme}`,
        `${name.value}--${props.variant}`,
        {
          [`${name.value}--ellipsis`]: props.maxWidth,
          [`${name.value}--close`]: props.closable,
          [`${name.value}--disabled`]: props.disabled,
        },
        CLASSNAMES.SIZE[props.size],
        props.shape !== 'square' && `${name.value}--${props.shape}`,
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
      const iconClassName = `${name.value}__icon-close`;
      if (tagGlobalConfig.value.closeIcon) {
        return h(tagGlobalConfig.value.closeIcon(h) as VNode, { class: iconClassName });
      }
      return <CloseIcon onClick={({ e }: { e: MouseEvent }) => props.onClose?.({ e })} class={iconClassName} />;
    };

    return {
      name,
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
          <span style={this.tagStyle} class={`${this.name}--text`}>
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
