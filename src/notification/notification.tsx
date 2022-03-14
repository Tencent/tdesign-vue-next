import { defineComponent, h, onMounted } from 'vue';
import { InfoCircleFilledIcon, CheckCircleFilledIcon, CloseIcon } from 'tdesign-icons-vue-next';
import isFunction from 'lodash/isFunction';
import { prefix } from '../config';
import { useTNodeJSX, useContent } from '../hooks/tnode';
import props from './props';
import { TdNotificationProps } from './type';

const name = `${prefix}-notification`;

export default defineComponent({
  name: 'TNotification',
  props: {
    ...props,
  },
  setup(props: TdNotificationProps, { slots }) {
    const renderTNode = useTNodeJSX();
    const renderContent = useContent();

    const close = (e?: MouseEvent) => {
      props.onCloseBtnClick?.({ e });
    };

    const renderIcon = () => {
      let iconContent;
      if (props.icon === false) return null;
      if (isFunction(props.icon)) {
        iconContent = props.icon(h);
      } else if (slots.icon) {
        iconContent = slots.icon(null);
      } else if (props.theme) {
        const iconType =
          props.theme === 'success' ? (
            <CheckCircleFilledIcon class={`t-is-${props.theme}`} />
          ) : (
            <InfoCircleFilledIcon class={`t-is-${props.theme}`} />
          );
        iconContent = <div class="t-notification__icon">{iconType}</div>;
      }
      return iconContent;
    };

    const renderClose = () => {
      const defaultClose = <CloseIcon />;
      return (
        <span class={`${prefix}-message__close`} onClick={close}>
          {renderTNode('closeBtn', defaultClose)}
        </span>
      );
    };

    const renderMainContent = () => {
      return <div class={`${name}__content`}>{renderContent('default', 'content')}</div>;
    };

    onMounted(() => {
      if (props.duration > 0) {
        const timer = setTimeout(() => {
          clearTimeout(timer);
          props.onDurationEnd?.();
        }, props.duration);
      }
    });

    return {
      close,
      renderIcon,
      renderClose,
      renderMainContent,
      renderTNode,
    };
  },
  render() {
    const { renderIcon, renderClose, renderMainContent, renderTNode } = this;
    const icon = renderIcon();
    const close = renderClose();
    const content = renderMainContent();
    const footer = renderTNode('footer');
    const title = renderTNode('title');

    return (
      <div class={`${name}`}>
        {icon}
        <div class={`${name}__main`}>
          <div class={`${name}__title__wrap`}>
            <span class={`${name}__title`}>{title}</span>
            {close}
          </div>
          {content}
          {footer}
        </div>
      </div>
    );
  },
});
