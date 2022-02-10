import { computed, defineComponent, h, VNode } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';
import { useEmitEvent } from '../hooks/event';
import { useReceiver, TagConfig } from '../config-provider';
import CLASSNAMES from '../utils/classnames';
import config from '../config';
import props from './props';
import { renderTNodeJSX, renderContent } from '../utils/render-tnode';
import { ClassName } from '../common';

const { prefix } = config;
const name = `${prefix}-tag`;

export default defineComponent({
  name: 'TTag',
  props,
  emits: ['close', 'click'],
  setup(props, { emit }) {
    const emitEvent = useEmitEvent(props, emit);
    const { global: tagGlobalConfig } = useReceiver<TagConfig>('tag');
    const tagClass = computed<ClassName>(() => {
      return [
        `${name}`,
        `${name}--${props.theme}`,
        `${name}--${props.variant}`,
        {
          [`${name}--ellipsis`]: props.maxWidth,
          [`${name}--close`]: props.closable,
          [`${name}--disabled`]: props.disabled,
        },
        CLASSNAMES.SIZE[props.size],
        props.shape !== 'square' && `${name}--${props.shape}`,
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
        return h(tagGlobalConfig.value.closeIcon(h) as VNode, { class: iconClassName });
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
    const tagContent = renderContent(this, 'default', 'content');
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
