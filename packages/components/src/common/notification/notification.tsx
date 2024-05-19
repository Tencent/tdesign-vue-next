import { isFunction } from 'lodash-es';
import { defineComponent, h, onBeforeMount, onMounted, ref } from '@td/adapter-vue';
import {
  CheckCircleFilledIcon as TdCheckCircleFilledIcon,
  CloseIcon as TdCloseIcon,
  InfoCircleFilledIcon as TdInfoCircleFilledIcon,
} from 'tdesign-icons-vue-next';

import props from '@td/intel/components/notification/props';
import { useContent, useGlobalIcon, usePrefixClass, useTNodeJSX } from '@td/adapter-hooks';

import { fadeIn, fadeOut } from './utils/animate';

export default defineComponent({
  name: 'TNotification',
  props: {
    ...props,
    placement: String, // just for animation
  },
  setup(props, { slots, expose }) {
    const COMPONENT_NAME = usePrefixClass('notification');
    const classPrefix = usePrefixClass();
    const { InfoCircleFilledIcon, CheckCircleFilledIcon, CloseIcon } = useGlobalIcon({
      InfoCircleFilledIcon: TdInfoCircleFilledIcon,
      CheckCircleFilledIcon: TdCheckCircleFilledIcon,
      CloseIcon: TdCloseIcon,
    });
    const renderTNode = useTNodeJSX();
    const renderContent = useContent();
    const timer = ref(null);
    const notificationRef = ref(null);

    const close = (e?: MouseEvent) => {
      const dom = notificationRef.value as HTMLElement;
      fadeOut(dom, props.placement, () => {
        props.onCloseBtnClick?.({ e });
      });
    };

    const renderIcon = () => {
      let iconContent;
      if (props.icon === false) {
        return null;
      }
      if (isFunction(props.icon)) {
        iconContent = props.icon(h);
      } else if (slots.icon) {
        iconContent = slots.icon(null);
      } else if (props.theme) {
        const iconType
          = props.theme === 'success'
            ? (
              <CheckCircleFilledIcon class={`${classPrefix.value}-is-${props.theme}`} />
              )
            : (
              <InfoCircleFilledIcon class={`${classPrefix.value}-is-${props.theme}`} />
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

    const clearTimer = () => {
      props.duration && clearTimeout(timer.value);
    };

    const setTimer = () => {
      if (!props.duration) {
        return;
      }
      timer.value = Number(
        setTimeout(() => {
          clearTimer();
          const dom = notificationRef.value as HTMLElement;
          fadeOut(dom, props.placement, () => {
            props.onDurationEnd?.();
          });
        }, props.duration),
      );
    };

    onBeforeMount(() => {
      props.duration && setTimer();
    });

    onMounted(() => {
      const dom = notificationRef.value;
      fadeIn(dom, props.placement);
    });

    expose({ close });
    return () => (
      <div ref={notificationRef} class={`${COMPONENT_NAME.value}`} onMouseenter={clearTimer} onMouseleave={setTimer}>
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
