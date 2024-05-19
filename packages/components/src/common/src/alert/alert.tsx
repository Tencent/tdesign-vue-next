import { defineComponent, VNode, ref, onMounted, onBeforeUnmount } from 'vue';
import {
  CheckCircleFilledIcon as TdCheckCircleFilledIcon,
  CloseIcon as TdCloseIcon,
  ErrorCircleFilledIcon as TdErrorCircleFilledIcon,
  HelpCircleFilledIcon as TdHelpCircleFilledIcon,
  InfoCircleFilledIcon as TdInfoCircleFilledIcon,
} from 'tdesign-icons-vue-next';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';

import { on, off, addClass } from '../utils/dom';
import props from './props';
import { SlotReturnValue } from '../common';
import { useIcon } from '../hooks/icon';
import { useGlobalIcon } from '../hooks/useGlobalIcon';
import { useConfig, usePrefixClass } from '../hooks/useConfig';

import { useTNodeJSX } from '../hooks/tnode';

export default defineComponent({
  name: 'TAlert',
  props,
  setup(props) {
    const { globalConfig, classPrefix } = useConfig('alert');
    const { CheckCircleFilledIcon, CloseIcon, ErrorCircleFilledIcon, HelpCircleFilledIcon, InfoCircleFilledIcon } =
      useGlobalIcon({
        CheckCircleFilledIcon: TdCheckCircleFilledIcon,
        CloseIcon: TdCloseIcon,
        ErrorCircleFilledIcon: TdErrorCircleFilledIcon,
        HelpCircleFilledIcon: TdHelpCircleFilledIcon,
        InfoCircleFilledIcon: TdInfoCircleFilledIcon,
      });
    const COMPONENT_NAME = usePrefixClass('alert');
    const renderTNodeJSX = useTNodeJSX();

    const renderIconTNode = useIcon();
    // alert的dom引用
    const alertRef = ref<HTMLElement | null>(null);
    // description的dom引用
    const descriptionRef = ref<HTMLElement | null>(null);
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
      } else if (isString(close)) {
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

    const renderTitle = () => {
      const titleContent = renderTNodeJSX('title');
      return titleContent ? <div class={`${COMPONENT_NAME.value}__title`}> {titleContent}</div> : null;
    };

    const renderMessage = () => {
      const operationContent = renderTNodeJSX('operation');
      return (
        <div class={`${COMPONENT_NAME.value}__message`}>
          {renderDescription()}
          {operationContent ? <div class={`${COMPONENT_NAME.value}__operation`}>{operationContent}</div> : null}
        </div>
      );
    };

    const renderDescription = () => {
      let messageContent;

      messageContent = renderTNodeJSX('default');
      if (!messageContent) {
        messageContent = renderTNodeJSX('message');
      }
      const contentLength = isArray(messageContent) ? (messageContent as Array<SlotReturnValue>).length : 1;
      const hasCollapse = props.maxLine > 0 && props.maxLine < contentLength;
      const height = (descriptionRef.value?.children[0] as HTMLElement)?.offsetHeight;
      if (hasCollapse && collapsed.value) {
        // 折叠
        messageContent = (messageContent as Array<SlotReturnValue>).slice(0, props.maxLine as number);
        height && (descriptionRef.value.style.height = `${descHeight.value}px`);
      } else if (hasCollapse) {
        // 展开
        height &&
          (descriptionRef.value.style.height = `${height * (contentLength - props.maxLine) + descHeight.value}px`);
      }

      // 如果需要折叠，则元素之间补<br/>；否则不补
      return (
        <div class={`${COMPONENT_NAME.value}__description`} ref={descriptionRef}>
          {hasCollapse
            ? (messageContent as Array<string | VNode>).map((content) => <div>{content}</div>)
            : messageContent}
          {hasCollapse ? (
            <div
              class={`${COMPONENT_NAME.value}__collapse`}
              onClick={() => {
                collapsed.value = !collapsed.value;
              }}
            >
              {collapsed.value ? globalConfig.value.expandText : globalConfig.value.collapseText}
            </div>
          ) : null}
        </div>
      );
    };
    const renderContent = () => {
      return (
        <div class={`${COMPONENT_NAME.value}__content`}>
          {renderTitle()}
          {renderMessage()}
        </div>
      );
    };
    const handleClose = (e: MouseEvent) => {
      props.onClose?.({ e });
      addClass(alertRef.value, `${COMPONENT_NAME.value}--closing`);
    };

    const handleCloseEnd = (e: TransitionEvent) => {
      const isTransitionTarget = e.target === alertRef.value;
      // 防止子元素冒泡触发
      if (e.propertyName === 'opacity' && isTransitionTarget) {
        visible.value = false;
        props.onClosed?.({ e });
      }
    };

    onMounted(() => {
      on(alertRef.value, 'transitionend', handleCloseEnd);
      descHeight.value = descriptionRef.value.offsetHeight;
    });
    onBeforeUnmount(() => {
      off(alertRef.value, 'transitionend', handleCloseEnd);
    });

    return () => (
      <div
        ref={alertRef}
        class={[
          `${COMPONENT_NAME.value}`,
          `${COMPONENT_NAME.value}--${props.theme}`,
          {
            [`${classPrefix.value}-is-hidden`]: !visible.value,
          },
        ]}
      >
        {renderIcon()}
        {renderContent()}
        {renderClose()}
      </div>
    );
  },
});
