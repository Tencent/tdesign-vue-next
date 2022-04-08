import { defineComponent, VNode, ComponentPublicInstance, ref, onMounted, onBeforeUnmount } from 'vue';
import {
  CheckCircleFilledIcon,
  CloseIcon,
  ErrorCircleFilledIcon,
  HelpCircleFilledIcon,
  InfoCircleFilledIcon,
} from 'tdesign-icons-vue-next';
import { on, off, addClass } from '../utils/dom';
import props from './props';
import { renderTNodeJSX } from '../utils/render-tnode';
import { SlotReturnValue } from '../common';
import { useIcon } from '../hooks/icon';
import { useConfig, usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  name: 'TAlert',
  props,
  setup(props) {
    const { global, classPrefix } = useConfig('alert');
    const COMPONENT_NAME = usePrefixClass('alert');

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
      return iconContent ? <div class={`${COMPONENT_NAME.value}__icon`}>{iconContent}</div> : null;
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
        <div class={`${COMPONENT_NAME.value}__close`} onClick={handleClose}>
          {closeContent}
        </div>
      ) : null;
    };

    const renderTitle = (context: ComponentPublicInstance) => {
      const titleContent = renderTNodeJSX(context, 'title');
      return titleContent ? <div class={`${COMPONENT_NAME.value}__title`}> {titleContent}</div> : null;
    };

    const renderMessage = (context: ComponentPublicInstance) => {
      const operationContent = renderTNodeJSX(context, 'operation');
      return (
        <div class={`${COMPONENT_NAME.value}__message`}>
          {renderDescription(context)}
          {operationContent ? <div class={`${COMPONENT_NAME.value}__operation`}>{operationContent}</div> : null}
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
        <div class={`${COMPONENT_NAME.value}__description`} ref="description">
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
              {collapsed.value ? global.value.expandText : global.value.collapseText}
            </div>
          ) : null}
        </div>
      );
    };
    const renderContent = (context: ComponentPublicInstance) => {
      return (
        <div class={`${COMPONENT_NAME.value}__content`}>
          {renderTitle(context)}
          {renderMessage(context)}
        </div>
      );
    };
    const handleClose = (e: MouseEvent) => {
      props.onClose?.({ e });
      addClass(ele.value, `${COMPONENT_NAME.value}--closing`);
    };

    const handleCloseEnd = (e: TransitionEvent) => {
      if (e.propertyName === 'opacity') {
        visible.value = false;
        props.onClosed?.({ e });
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
      COMPONENT_NAME,
      classPrefix,
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
    const { theme, visible, $attrs, renderIcon, renderContent, renderClose, classPrefix } = this;
    const CLASS = [
      `${this.COMPONENT_NAME}`,
      `${this.COMPONENT_NAME}--${theme}`,
      {
        [`${classPrefix}-is-hidden`]: !visible,
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
