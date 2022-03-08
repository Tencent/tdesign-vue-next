import { defineComponent, computed, toRefs } from 'vue';
import { InfoCircleFilledIcon, ErrorCircleFilledIcon } from 'tdesign-icons-vue-next';
import { useConfig } from '../config-provider';
import Popup, { PopupProps } from '../popup/index';
import props from './props';
import { PopconfirmVisibleChangeContext } from './type';
import { useAction } from '../dialog/hooks';
import { useContent, useTNodeJSX, useTNodeDefault } from '../hooks/tnode';
import useVModel from '../hooks/useVModel';

export default defineComponent({
  name: 'TPopconfirm',
  props,
  setup(props, context) {
    const { global, classPrefix } = useConfig('popconfirm');

    const { visible, modelValue } = toRefs(props);
    const [innerVisible, setInnerVisible] = useVModel(
      visible,
      modelValue,
      props.defaultVisible,
      props.onVisibleChange,
      context.emit,
      'visible',
    );
    const componentName = computed(() => {
      return `${classPrefix.value}-popconfirm`;
    });

    const confirmBtnAction = (e: MouseEvent) => {
      props.onConfirm?.({ e });
      setInnerVisible(false, { e });
    };

    const cancelBtnAction = (e: MouseEvent) => {
      props.onCancel?.({ e });
      setInnerVisible(false, { e });
    };

    const { getConfirmBtn, getCancelBtn } = useAction({ confirmBtnAction, cancelBtnAction });

    const renderTNodeJSX = useTNodeJSX();
    const innerPopupProps = computed(() => {
      return {
        showArrow: props.showArrow,
        overlayClassName: componentName.value,
        trigger: 'click',
        destroyOnClose: props.destroyOnClose,
        placement: props.placement,
        ...(props.popupProps as PopupProps),
      };
    });

    const renderTNodeDefault = useTNodeDefault();
    const renderContent = () => {
      const cancelBtn = getCancelBtn({
        cancelBtn: props.cancelBtn,
        globalCancel: global.value.cancel,
        className: `${componentName.value}__cancel`,
      });

      const confirmBtn = getConfirmBtn({
        theme: props.theme,
        confirmBtn: props.confirmBtn,
        globalConfirm: global.value.confirm,
        globalConfirmBtnTheme: global.value.confirmBtnTheme,
        className: `${componentName.value}__confirm`,
      });

      const renderIcon = () => {
        const Icon = {
          default: InfoCircleFilledIcon,
          warning: ErrorCircleFilledIcon,
          danger: ErrorCircleFilledIcon,
        }[props.theme];
        const theme = props.theme || 'default';
        return renderTNodeDefault('icon', <Icon class={`${componentName.value}__icon--${theme}`} />);
      };

      return (
        <div class={`${componentName.value}__content`}>
          <div class={`${componentName.value}__body`}>
            {renderIcon()}
            <div class={`${componentName.value}__inner`}>{renderTNodeJSX('content')}</div>
          </div>
          {Boolean(cancelBtn || confirmBtn) && (
            <div class={`${componentName.value}__buttons`}>
              {cancelBtn}
              {confirmBtn}
            </div>
          )}
        </div>
      );
    };

    const onPopupVisibleChange = (val: boolean, context: PopconfirmVisibleChangeContext) => {
      setInnerVisible(val, context);
    };

    const renderTNodeContent = useContent();
    const renderTriggerElement = () => renderTNodeContent('default', 'triggerElement');

    return {
      innerVisible,
      innerPopupProps,
      onPopupVisibleChange,
      renderContent,
      renderTriggerElement,
    };
  },
  render() {
    return (
      <Popup
        ref="popup"
        visible={this.innerVisible}
        {...this.innerPopupProps}
        onVisibleChange={this.onPopupVisibleChange}
        v-slots={{
          content: this.renderContent,
        }}
      >
        {this.renderTriggerElement()}
      </Popup>
    );
  },
});
