import { computed, defineComponent, getCurrentInstance, h, VNode } from 'vue';
import { CloseIcon as TdCloseIcon } from 'tdesign-icons-vue-next';
import { isString } from 'lodash-es';
import tinycolor from 'tinycolor2';

import props from './props';
import { useConfig, usePrefixClass, useCommonClassName } from '@tdesign/hooks';
import { useGlobalIcon } from '@tdesign/hooks';
import { useTNodeJSX, useContent } from '@tdesign/hooks';
import { Styles } from '../common';

export default defineComponent({
  name: 'TTag',
  props,
  setup(props) {
    const { globalConfig: tagGlobalConfig } = useConfig('tag');
    const COMPONENT_NAME = usePrefixClass('tag');
    const { CloseIcon } = useGlobalIcon({ CloseIcon: TdCloseIcon });
    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();
    const { SIZE } = useCommonClassName();
    const { vnode } = getCurrentInstance();

    const tagClass = computed(() => {
      return [
        `${COMPONENT_NAME.value}`,
        `${COMPONENT_NAME.value}--${props.theme}`,
        `${COMPONENT_NAME.value}--${props.variant}`,
        {
          [`${COMPONENT_NAME.value}--ellipsis`]: props.maxWidth,
          [`${COMPONENT_NAME.value}--close`]: props.closable,
          [`${COMPONENT_NAME.value}--disabled`]: props.disabled,
          [SIZE.value[props.size]]: props.size !== 'medium',
        },
        props.shape !== 'square' && `${COMPONENT_NAME.value}--${props.shape}`,
      ];
    });
    const tagStyle = computed<Styles>(() => {
      return getTagColorStyle();
    });

    const textStyle = computed<Styles>(() => {
      if (!props.maxWidth) return {};

      return {
        maxWidth: isNaN(Number(props.maxWidth)) ? String(props.maxWidth) : `${props.maxWidth}px`,
      };
    });

    const getTagColorStyle = () => {
      const { color, variant } = props;
      if (!color) return {};

      const luminance = tinycolor(color).getLuminance();

      const style: Styles = {
        color: luminance > 0.5 ? 'black' : 'white',
      };

      if (variant === 'outline' || variant === 'light-outline') {
        style.borderColor = color;
      }
      if (variant !== 'outline') {
        const getLightestShade = () => {
          const { r, g, b } = tinycolor(color).toRgb();
          // alpha 0.1  is designed by @wen1kang
          return `rgba(${r}, ${g}, ${b}, 0.1)`;
        };
        style.backgroundColor = variant === 'dark' ? color : getLightestShade();
      }
      if (variant !== 'dark') {
        style.color = color;
      }
      return style;
    };

    const handleClick = (e: MouseEvent) => {
      if (props.disabled) return;
      props.onClick?.({ e });
    };

    const getCloseIcon = () => {
      if (!props.closable) return null;
      const iconClassName = `${COMPONENT_NAME.value}__icon-close`;
      if (tagGlobalConfig.value.closeIcon) {
        return h(tagGlobalConfig.value.closeIcon(h) as VNode, { class: iconClassName });
      }
      return (
        <CloseIcon
          onClick={({ e }: { e: MouseEvent }) => {
            if (e) e.stopPropagation();
            props.onClose?.({ e });
          }}
          class={iconClassName}
        />
      );
    };

    const renderTitle = (tagContent: string) => {
      const vProps = vnode.props || {};
      if (Reflect.has(vProps, 'title')) {
        return vProps.title || undefined;
      }

      if (tagContent) {
        return tagContent;
      }

      return undefined;
    };

    return () => {
      // 关闭按钮 自定义组件使用 nativeOnClick 绑定事件
      const closeIcon = getCloseIcon();
      // 标签内容
      const tagContent = renderContent('default', 'content');
      // 图标
      const icon = renderTNodeJSX('icon');

      const title = renderTitle(isString(tagContent) ? tagContent : '');

      return (
        <div class={tagClass.value} style={tagStyle.value} onClick={handleClick}>
          {icon}
          <span
            class={props.maxWidth ? `${COMPONENT_NAME.value}--text` : undefined}
            style={textStyle.value}
            title={title}
          >
            {tagContent}
          </span>
          {!props.disabled && closeIcon}
        </div>
      );
    };
  },
});
