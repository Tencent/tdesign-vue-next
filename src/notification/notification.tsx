import { ComponentPublicInstance, defineComponent, h, onMounted } from 'vue';
import { InfoCircleFilledIcon, CheckCircleFilledIcon, CloseIcon } from 'tdesign-icons-vue-next';
import isFunction from 'lodash/isFunction';
import { prefix } from '../config';
import { renderTNodeJSX, renderContent } from '../utils/render-tnode';
import props from './props';

const name = `${prefix}-notification`;

export default defineComponent({
  name: 'TNotification',
  props: {
    ...props,
  },
  setup(props, { slots }) {
    const close = (e?: MouseEvent) => {
      props.onCloseBtnClick({ e });
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

    const renderClose = (context: ComponentPublicInstance) => {
      const defaultClose = <CloseIcon />;
      return (
        <span class={`${prefix}-message__close`} onClick={close}>
          {renderTNodeJSX(context, 'closeBtn', defaultClose)}
        </span>
      );
    };

    const renderMainContent = (context: ComponentPublicInstance) => {
      return <div class={`${name}__content`}>{renderContent(context, 'default', 'content')}</div>;
    };

    onMounted(() => {
      if (props.duration > 0) {
        const timer = setTimeout(() => {
          clearTimeout(timer);
          props.onDurationEnd();
        }, props.duration);
      }
    });

    return {
      close,
      renderIcon,
      renderClose,
      renderMainContent,
    };
  },
  render() {
    const { renderIcon, renderClose, renderMainContent } = this;
    const icon = renderIcon();
    const close = renderClose(this);
    const content = renderMainContent(this);
    const footer = renderTNodeJSX(this, 'footer');
    const title = renderTNodeJSX(this, 'title');

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
