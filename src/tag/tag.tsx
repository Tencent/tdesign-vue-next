import { computed, defineComponent, h } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';
import { useEmitEvent } from '../hooks/event';
import { useReceiver } from '../config-provider';
import CLASSNAMES from '../utils/classnames';
import config from '../config';
import props from './props';
import { renderTNodeJSX, renderContent } from '../utils/render-tnode';
import { ClassName, TNodeReturnValue } from '../common';

const { prefix } = config;
const name = `${prefix}-tag`;

export default defineComponent({
  name: 'TTag',
  props,
  emits: ['close', 'click'],
  setup(props, { emit }) {
    const emitEvent = useEmitEvent(props, emit);
    const { global: tagGlobalConfig } = useReceiver<{ closeIcon: Function }>('tag');
    const tagClass = computed<ClassName>(() => {
      return [
        `${name}`,
        `${name}--${props.theme}`,
        CLASSNAMES.SIZE[props.size],
        `${name}--${props.variant}`,
        props.shape !== 'square' && `${name}--${props.shape}`,
        {
          [`${name}--ellipsis`]: props.maxWidth,
          [`${name}--close`]: props.closable,
          [`${prefix}-is-disabled`]: props.disabled,
          [`${name}--disabled`]: props.disabled,
        },
      ];
    });
    const tagStyle = computed<Record<string, string>>(() => {
      return props.maxWidth ? { maxWidth: `${props.maxWidth}px` } : {};
    });

    const handleClose: ({ e }: { e: MouseEvent }) => void = (e) => emitEvent('close', e);
    const handleClick: (e: MouseEvent) => void = (e) => emitEvent('click', { e });

    const getCloseIcon = () => {
      if (!props.closable) return null;
      const iconClassName = `${prefix}-tag__icon-close`;
      if (tagGlobalConfig.value.closeIcon) {
        const component = tagGlobalConfig.value.closeIcon();
        return h(component, {
          class: iconClassName,
        });
      }
      return <CloseIcon onClick={handleClose} class={iconClassName} />;
    };

    return {
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
    const tagContent: TNodeReturnValue = renderContent(this, 'default', 'content');
    // 图标
    const icon = renderTNodeJSX(this, 'icon');

    return (
      <span class={this.tagClass} style={this.tagStyle} onClick={this.handleClick}>
        {icon}
        {this.maxWidth ? (
          <span style={this.tagStyle} class={`${name}--text`}>
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
