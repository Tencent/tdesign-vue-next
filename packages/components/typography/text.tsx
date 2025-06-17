import { computed, defineComponent, ref } from 'vue';
import { useContent, usePrefixClass } from '@tdesign/shared-hooks';
import props from './text-props';
import copy from './utils/copy-to-clipboard';
import { CopyIcon, CheckIcon } from 'tdesign-icons-vue-next';
import Ellipsis from './ellipsis';
import TTooltip from '../tooltip';
import TButton from '../button';
import { useConfig } from '../config-provider/hooks/useConfig';

import type { TdTextProps } from './type';
import type { TdTooltipProps } from '../tooltip/type';

export default defineComponent({
  name: 'TTypographyText',
  props,
  setup(props, { slots }) {
    const COMPONENT_NAME = usePrefixClass('typography');
    const { globalConfig } = useConfig('typography');
    const isCopied = ref(false);
    const renderContent = useContent();

    const wrapperDecorations = (
      { code, underline, delete: del, strong, keyboard, mark, italic }: TdTextProps,
      content: any,
    ) => {
      let currentContent = content;

      function wrap(needed: boolean, Tag: string, styles: object = {}) {
        if (!needed) return;
        currentContent = <Tag style={styles}>{currentContent}</Tag>;
      }

      wrap(strong, 'strong');
      wrap(underline, 'u');
      wrap(del, 'del');
      wrap(code, 'code');
      wrap(mark !== false, 'mark', mark ? { color: mark } : {});
      wrap(keyboard, 'kbd');
      wrap(italic, 'i');
      return currentContent;
    };

    const classList = computed(() => {
      const { theme, disabled } = props;
      const prefix = COMPONENT_NAME.value;
      const list: string[] = [prefix];
      if (disabled) {
        list.push(`${prefix}--disabled`);
      } else if (theme && ['primary', 'secondary', 'success', 'warning', 'error'].includes(theme)) {
        list.push(`${prefix}--${theme}`);
      }
      return list;
    });

    const tooltipText = computed(() => {
      const { copyable } = props;
      if (isCopied.value) return globalConfig.value.copiedText;
      else if (typeof copyable === 'object') return copyable.tooltipProps?.content;
      return null;
    });

    const content = computed(() => {
      return props.content || slots?.default();
    });

    const renderCopy = () => {
      const { copyable } = props;
      if (!copyable) return;

      let icon: any = isCopied.value ? () => <CheckIcon /> : () => <CopyIcon />;
      let tooltipConf: TdTooltipProps = {
        theme: 'default',
      };

      let onCopy = () => {};
      if (typeof copyable === 'object') {
        if (copyable.suffix && !isCopied.value) {
          icon = copyable.suffix;
        }
        if (copyable.tooltipProps) {
          tooltipConf = copyable.tooltipProps;
        }
        if (typeof copyable.onCopy === 'function') {
          onCopy = copyable.onCopy;
        }
      }
      return (
        <TTooltip {...tooltipConf} content={tooltipText.value}>
          <TButton icon={icon} shape="square" theme="primary" variant="text" onClick={(e) => onCopyClick(e, onCopy)} />
        </TTooltip>
      );
    };

    const getChildrenText = () => {
      if (typeof content.value === 'string') {
        return content.value;
      } else if (Array.isArray(content.value)) {
        return content.value.map((v) => v.children).join('');
      }
    };

    const onCopyClick = (e: MouseEvent, cb: Function) => {
      e.preventDefault();
      e.stopPropagation();

      isCopied.value = true;
      setTimeout(() => {
        isCopied.value = false;
      }, 1500);

      copy(getChildrenText());
      cb?.();
    };

    return () => {
      const content = renderContent('default', 'content');
      return props.ellipsis ? (
        <Ellipsis {...props} class={classList.value}>
          {wrapperDecorations(props, content)}
          {props.copyable ? renderCopy() : null}
        </Ellipsis>
      ) : (
        <span class={classList.value}>
          {wrapperDecorations(props, content)}
          {props.copyable ? renderCopy() : null}
        </span>
      );
    };
  },
});
