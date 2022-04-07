import { defineComponent, h, onMounted } from 'vue';
import { InfoCircleFilledIcon, CheckCircleFilledIcon, CloseIcon } from 'tdesign-icons-vue-next';
import isFunction from 'lodash/isFunction';
import { useTNodeJSX, useContent } from '../hooks/tnode';
import props from './props';
import { TdNotificationProps } from './type';
import { useConfig, usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  name: 'TNotification',
  props,
  setup(props: TdNotificationProps, { slots, expose }) {
    const COMPONENT_NAME = usePrefixClass('notification');
    const { classPrefix } = useConfig('classPrefix');
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
        <span class={`${classPrefix.value}-message__close`} onClick={close}>
          {renderTNode('closeBtn', defaultClose)}
        </span>
      );
    };

    const renderMainContent = () => {
      return <div class={`${COMPONENT_NAME.value}__content`}>{renderContent('default', 'content')}</div>;
    };

    onMounted(() => {
      if (props.duration > 0) {
        const timer = setTimeout(() => {
          clearTimeout(timer);
          props.onDurationEnd?.();
        }, props.duration);
      }
    });

    expose({ close });
    return () => (
      <div class={`${COMPONENT_NAME.value}`}>
        {renderIcon()}
        <div class={`${COMPONENT_NAME.value}__main`}>
          <div class={`${COMPONENT_NAME.value}__title__wrap`}>
            <span class={`${COMPONENT_NAME.value}__title`}>{renderTNode('title')}</span>
            {renderClose()}
          </div>
          {renderMainContent()}
          {renderTNode('footer')}
        </div>
      </div>
    );
  },
});
