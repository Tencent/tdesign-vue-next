import { computed, defineComponent, ref } from 'vue';
import { usePrefixClass } from '../hooks/useConfig';
import props from './text-props';
import { TdTextProps } from './type';
import copy from './utils/copy-to-clipboard';
import { CopyIcon } from 'tdesign-icons-vue-next';
import { TdParagraphProps, TooltipProps, TypographyEllipsis } from '..';
import Ellipsis from './ellipsis';
import { useTNodeJSX } from '../hooks/tnode';
export default defineComponent({
  name: 'TTypographyText',
  props,
  setup(props, { slots }) {
    const COMPONENT_NAME = usePrefixClass('typography');
    const copyActionState = ref(false);
    function wrapperDecorations(
      { code, underline, delete: del, strong, keyboard, mark, italic }: TdTextProps,
      content: any,
    ) {
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
    }
    const classList = computed(() => {
      const { theme, disabled, ellipsis } = props;
      const prefix = COMPONENT_NAME.value;
      const list: string[] = [prefix];
      ellipsis && list.push(`${prefix}--ellipsis`);
      if (disabled) {
        list.push(`${prefix}--disabled`);
      } else if (theme && ['primary', 'secondary', 'success', 'warning', 'error'].includes(theme)) {
        list.push(`${prefix}--${theme}`);
      }
      return list;
    });

    const content = computed(() => {
      return props.content || slots?.default();
    });
    const renderCopy = () => {
      const renderTNodeJSX = useTNodeJSX();
      const { copyable } = props;
      if (!copyable) return;
      const style = {
        color: copyActionState.value ? '' : '#0052D9',
      };
      let icon: any = <CopyIcon style={style} />;
      let tooltipConf: TooltipProps = {
        content: '复制',
        theme: 'default',
      };
      let onCopy = () => {};
      if (typeof copyable === 'object') {
        if (copyable.suffix) {
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
        <t-tooltip {...tooltipConf}>
          <span
            style="margin-left: 6px"
            onClick={(e) => onCopyClick(e, onCopy)}
            onFocus={onCopyFocus}
            onBlur={onCopyBlur}
          >
            {icon}
            {renderTNodeJSX('suffix')}
          </span>
        </t-tooltip>
      );
    };

    function getChildrenText(): string {
      if (typeof content.value === 'string') {
        return content.value;
      } else if (Array.isArray(content.value)) {
        return content.value.map((v) => v.children).join('');
      }
    }

    const onCopyFocus = () => {
      copyActionState.value = true;
    };
    const onCopyBlur = () => {
      copyActionState.value = false;
    };
    const onCopyClick = (e: MouseEvent, cb: Function) => {
      e.preventDefault();
      e.stopPropagation();

      copy(getChildrenText());
      cb && cb();
    };

    const ellipsis = computed((): TypographyEllipsis => {
      const ellipsis = props.ellipsis;
      if (!ellipsis) return {};

      return {
        row: 1,
        expandable: false,
        ...(typeof ellipsis === 'object' ? ellipsis : null),
      };
    });

    return () => {
      return (
        <Ellipsis v-bind={ellipsis.value}>
          {ellipsis.value}
          <span class={classList.value}>
            {wrapperDecorations(props, content.value)}
            {renderCopy()}
          </span>
        </Ellipsis>
      );
    };
  },
});
