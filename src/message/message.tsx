import isFunction from 'lodash/isFunction';
import {
  InfoCircleFilledIcon as TdInfoCircleFilledIcon,
  CheckCircleFilledIcon as TdCheckCircleFilledIcon,
  ErrorCircleFilledIcon as TdErrorCircleFilledIcon,
  HelpCircleFilledIcon as TdHelpCircleFilledIcon,
  CloseIcon as TdCloseIcon,
} from 'tdesign-icons-vue-next';
import { defineComponent, h, onBeforeMount, onMounted, computed, ref } from 'vue';

import { useTNodeJSX, useContent } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useConfig';
import { useGlobalIcon } from '../hooks/useGlobalIcon';
import TLoading from '../loading';

import { fadeIn, fadeOut } from './animation';
import { THEME_LIST } from './const';
import props from './props';

export default defineComponent({
  name: 'TMessage',
  props: {
    ...props,
    placement: String, // just for animation
  },
  setup(props, { slots, expose }) {
    const COMPONENT_NAME = usePrefixClass('message');
    const { InfoCircleFilledIcon, CheckCircleFilledIcon, ErrorCircleFilledIcon, HelpCircleFilledIcon, CloseIcon } =
      useGlobalIcon({
        InfoCircleFilledIcon: TdInfoCircleFilledIcon,
        CheckCircleFilledIcon: TdCheckCircleFilledIcon,
        ErrorCircleFilledIcon: TdErrorCircleFilledIcon,
        HelpCircleFilledIcon: TdHelpCircleFilledIcon,
        CloseIcon: TdCloseIcon,
      });
    const classPrefix = usePrefixClass();

    const renderTNode = useTNodeJSX();
    const renderContent = useContent();

    const msgRef = ref(null);
    const timer = ref(null);

    const classes = computed(() => {
      const status = {};
      THEME_LIST.forEach((t) => (status[`${classPrefix.value}-is-${t}`] = props.theme === t));
      return [
        COMPONENT_NAME.value,
        status,
        {
          [`${classPrefix.value}-is-closable`]: props.closeBtn || slots.closeBtn,
        },
      ];
    });

    const close = (e?: MouseEvent) => {
      props.onClose?.({ trigger: 'close-click', e });
      props.onCloseBtnClick?.({ e });
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
          const msgDom = msgRef.value as HTMLElement;
          fadeOut(msgDom, props.placement, () => {
            props.onClose?.({ trigger: 'duration-end' });
            props.onDurationEnd?.();
          });
        }, props.duration),
      );
    };

    const renderClose = () => {
      const defaultClose = <CloseIcon />;
      return (
        <span class={`${COMPONENT_NAME.value}__close`} onClick={close}>
          {renderTNode('closeBtn', defaultClose)}
        </span>
      );
    };

    const renderIcon = () => {
      if (props.icon === false) return;
      if (isFunction(props.icon)) return props.icon(h);
      if (slots.icon) {
        return slots.icon(null);
      }
      const Icon = {
        info: InfoCircleFilledIcon,
        success: CheckCircleFilledIcon,
        warning: ErrorCircleFilledIcon,
        error: ErrorCircleFilledIcon,
        question: HelpCircleFilledIcon,
        loading: TLoading,
      }[props.theme];
      return <Icon />;
    };

    onBeforeMount(() => {
      props.duration && setTimer();
    });

    onMounted(() => {
      const msgDom = msgRef.value;
      fadeIn(msgDom, props.placement);
    });

    expose({ close });

    return () => (
      <div ref={msgRef} class={classes.value} onMouseenter={clearTimer} onMouseleave={setTimer}>
        {renderIcon()}
        {renderContent('content', 'default')}
        {renderClose()}
      </div>
    );
  },
});
