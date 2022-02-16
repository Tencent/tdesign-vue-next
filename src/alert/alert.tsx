import { defineComponent, h, VNode, ComponentPublicInstance, ref, onMounted, onBeforeUnmount } from 'vue';
import {
  CheckCircleFilledIcon,
  CloseIcon,
  ErrorCircleFilledIcon,
  HelpCircleFilledIcon,
  InfoCircleFilledIcon,
} from 'tdesign-icons-vue-next';
import { prefix } from '../config';
import { on, off, addClass } from '../utils/dom';
import props from './props';
import { renderTNodeJSX } from '../utils/render-tnode';
import { SlotReturnValue } from '../common';
import { useEmitEvent } from '../hooks/event';
import { useIcon } from '../hooks/icon';

const name = `${prefix}-alert`;

export default defineComponent({
  name: 'TAlert',
  props,
  emits: ['close', 'closed'],
  setup(props) {
    const emitEvent = useEmitEvent();
    const renderIconTNode = useIcon();
    // alert的dom引用
    const ele = ref<HTMLElement | null>(null);
    // descriptiond的dom引用
    const description = ref<HTMLElement | null>(null);
    // desc高度
    const descHeight = ref(0);
    // 是否可见，关闭后置为false
    const visible = ref(true);
    // 是否已收起，使用折叠功能时有效，用于表示是否已折叠；默认折叠
    const collapsed = ref(true);

    const renderIcon = () => {
      const Component = {
        info: InfoCircleFilledIcon,
        success: CheckCircleFilledIcon,
        warning: ErrorCircleFilledIcon,
        error: ErrorCircleFilledIcon,
        question: HelpCircleFilledIcon,
      };
      const iconContent = renderIconTNode('icon', Component);
      return iconContent ? <div class={`${name}__icon`}>{iconContent}</div> : null;
    };

    const renderClose = () => {
      const { close } = props;
      let closeContent = null;
      if (close === true || close === '') {
        closeContent = <CloseIcon />;
      } else if (typeof close === 'string') {
        closeContent = close;
      } else {
        closeContent = renderIconTNode('close');
      }
      return closeContent ? (
        <div class={`${name}__close`} onClick={handleClose}>
          {closeContent}
        </div>
      ) : null;
    };

    const renderTitle = (context: ComponentPublicInstance) => {
      const titleContent = renderTNodeJSX(context, 'title');
      return titleContent ? <div class={`${name}__title`}> {titleContent}</div> : null;
    };

    const renderMessage = (context: ComponentPublicInstance) => {
      const operationContent = renderTNodeJSX(context, 'operation');
      return (
        <div class={`${name}__message`}>
          {renderDescription(context)}
          {operationContent ? <div class={`${name}__operation`}>{operationContent}</div> : null}
        </div>
      );
    };

    const renderDescription = (context: ComponentPublicInstance) => {
      let messageContent;

      messageContent = renderTNodeJSX(context, 'default');
      if (!messageContent) {
        messageContent = renderTNodeJSX(context, 'message');
      }
      const contentLength = Array.isArray(messageContent) ? (messageContent as Array<SlotReturnValue>).length : 1;
      const hasCollapse = props.maxLine > 0 && props.maxLine < contentLength;
      const height = (description.value?.children[0] as HTMLElement)?.offsetHeight;
      if (hasCollapse && collapsed.value) {
        // 折叠
        messageContent = (messageContent as Array<SlotReturnValue>).slice(0, props.maxLine as number);
        height && (description.value.style.height = `${descHeight.value}px`);
      } else if (hasCollapse) {
        // 展开
        height && (description.value.style.height = `${height * (contentLength - props.maxLine) + descHeight.value}px`);
      }

      // 如果需要折叠，则元素之间补<br/>；否则不补
      return (
        <div class={`${name}__description`} ref="description">
          {hasCollapse
            ? (messageContent as Array<string | VNode>).map((content) => <div>{content}</div>)
            : messageContent}
          {hasCollapse ? (
            <div
              class="t-alert__collapse"
              onClick={() => {
                collapsed.value = !collapsed.value;
              }}
            >
              {collapsed.value ? '展开全部' : '收起'}
            </div>
          ) : null}
        </div>
      );
    };
    const renderContent = (context: ComponentPublicInstance) => {
      return (
        <div class={`${name}__content`}>
          {renderTitle(context)}
          {renderMessage(context)}
        </div>
      );
    };
    const handleClose = (e: MouseEvent) => {
      emitEvent('close', { e });
      addClass(ele.value, `${name}--closing`);
    };

    const handleCloseEnd = (e: TransitionEvent) => {
      if (e.propertyName === 'opacity') {
        visible.value = false;
        emitEvent('closed', { e });
      }
    };

    onMounted(() => {
      on(ele.value, 'transitionend', handleCloseEnd);
      descHeight.value = description.value.offsetHeight;
    });
    onBeforeUnmount(() => {
      off(ele.value, 'transitionend', handleCloseEnd);
    });
    return {
      ele,
      description,
      visible,
      collapsed,
      renderIcon,
      renderTitle,
      renderMessage,
      renderDescription,
      renderContent,
      renderClose,
      handleClose,
      handleCloseEnd,
    };
  },
  render() {
    const { theme, visible, $attrs, renderIcon, renderContent, renderClose } = this;
    const CLASS = [
      `${name}`,
      `${name}--${theme}`,
      {
        [`${prefix}-is-hidden`]: !visible,
      },
    ];
    return (
      <div class={CLASS} {...$attrs} ref="ele">
        {renderIcon()}
        {renderContent(this)}
        {renderClose()}
      </div>
    );
  },
});
