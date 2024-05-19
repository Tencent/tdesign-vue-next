import { computed, defineComponent, H } from '@td/adapter-vue';
import type { VNode } from '@td/adapter-vue';
import { CloseIcon as TdCloseIcon } from 'tdesign-icons-vue-next';

import props from '@td/intel/components/tag/props';
import { useConfig, usePrefixClass, useCommonClassName, useGlobalIcon, useTNodeJSX, useContent } from '@td/adapter-hooks';
import { isString } from 'lodash-es';

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

    const tagStyle = computed<Record<string, string>>(() => {
      const { maxWidth } = props;
      return props.maxWidth
        ? {
            maxWidth: isNaN(Number(maxWidth)) ? String(maxWidth) : `${maxWidth}px`,
          }
        : {};
    });

    const handleClick = (e: MouseEvent) => {
      if (props.disabled) return;
      props.onClick?.({ e });
    };

    const getCloseIcon = () => {
      if (!props.closable) return null;
      const iconClassName = `${COMPONENT_NAME.value}__icon-close`;
      if (tagGlobalConfig.value.closeIcon) {
        return H(tagGlobalConfig.value.closeIcon(H) as VNode, { class: iconClassName });
      }
      return (
        <CloseIcon
          onClick={({ e }: { e: MouseEvent }) => {
            e.stopPropagation();
            props.onClose?.({ e });
          }}
          class={iconClassName}
        />
      );
    };

    return () => {
      // 关闭按钮 自定义组件使用 nativeOnClick 绑定事件
      const closeIcon = getCloseIcon();
      // 标签内容
      const tagContent = renderContent('default', 'content');
      // 图标
      const icon = renderTNodeJSX('icon');

      const title = isString(tagContent) ? tagContent : '';
      const titleAttribute = title && props.maxWidth ? title : undefined;

      return (
        <div class={tagClass.value} style={tagStyle.value} onClick={handleClick}>
          {icon}
          {props.maxWidth ? (
            <span class={{ [`${COMPONENT_NAME.value}--text`]: props.maxWidth }} title={titleAttribute}>
              {tagContent}
            </span>
          ) : (
            tagContent
          )}
          {!props.disabled && closeIcon}
        </div>
      );
    };
  },
});
