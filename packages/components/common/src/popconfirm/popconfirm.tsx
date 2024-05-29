import { computed, defineComponent, toRefs } from '@td/adapter-vue';
import {
  ErrorCircleFilledIcon as TdErrorCircleFilledIcon,
  InfoCircleFilledIcon as TdInfoCircleFilledIcon,
} from 'tdesign-icons-vue-next';

import { useConfig, useContent, useGlobalIcon, usePrefixClass, useTNodeDefault, useTNodeJSX, useVModel } from '@td/adapter-hooks';
import props from '@td/components/popconfirm/props';
import type { PopconfirmVisibleChangeContext } from '@td/components/popconfirm/type';
import { Popup } from '@td/components';
import type { PopupProps, PopupVisibleChangeContext } from '@td/components';
import type { TdDialogProps } from '@td/components/dialog/type';
import { useAction } from '../dialog/hooks';

export default defineComponent({
  name: 'TPopconfirm',
  props,

  setup(props) {
    const { globalConfig } = useConfig('popconfirm');
    const COMPONENT_NAME = usePrefixClass('popconfirm');
    const { InfoCircleFilledIcon, ErrorCircleFilledIcon } = useGlobalIcon({
      InfoCircleFilledIcon: TdInfoCircleFilledIcon,
      ErrorCircleFilledIcon: TdErrorCircleFilledIcon,
    });

    const { visible, modelValue } = toRefs(props);
    const [innerVisible, setInnerVisible] = useVModel(
      visible,
      modelValue,
      props.defaultVisible,
      props.onVisibleChange,
      'visible',
    );

    const confirmBtnAction = (e: MouseEvent) => {
      props.onConfirm?.({ e });
      setInnerVisible(false, { e, trigger: 'confirm' });
    };

    const cancelBtnAction = (e: MouseEvent) => {
      props.onCancel?.({ e });
      setInnerVisible(false, { e, trigger: 'cancel' });
    };

    const { getConfirmBtn, getCancelBtn } = useAction({ confirmBtnAction, cancelBtnAction });

    const renderTNodeJSX = useTNodeJSX();
    const innerPopupProps = computed(() => {
      return {
        showArrow: props.showArrow,
        overlayClassName: COMPONENT_NAME.value,
        trigger: 'click' as PopupProps['trigger'],
        destroyOnClose: props.destroyOnClose,
        placement: props.placement,
        ...(props.popupProps as PopupProps),
      };
    });

    const renderTNodeDefault = useTNodeDefault();
    const renderContent = () => {
      const cancelBtn = getCancelBtn({
        cancelBtn: props.cancelBtn as TdDialogProps['cancelBtn'],
        globalCancel: globalConfig.value.cancel,
        className: `${COMPONENT_NAME.value}__cancel`,
        size: 'small',
      });

      const confirmBtn = getConfirmBtn({
        theme: props.theme,
        confirmBtn: props.confirmBtn as TdDialogProps['confirmBtn'],
        globalConfirm: globalConfig.value.confirm,
        globalConfirmBtnTheme: globalConfig.value.confirmBtnTheme,
        className: `${COMPONENT_NAME.value}__confirm`,
        size: 'small',
      });

      const renderIcon = () => {
        const Icon = {
          default: InfoCircleFilledIcon,
          warning: ErrorCircleFilledIcon,
          danger: ErrorCircleFilledIcon,
        }[props.theme];
        const theme = props.theme || 'default';
        return renderTNodeDefault('icon', <Icon class={`${COMPONENT_NAME.value}__icon--${theme}`} />);
      };

      return (
        <div class={`${COMPONENT_NAME.value}__content`}>
          <div class={`${COMPONENT_NAME.value}__body`}>
            {renderIcon()}
            <div class={`${COMPONENT_NAME.value}__inner`}>{renderTNodeJSX('content')}</div>
          </div>
          {Boolean(cancelBtn || confirmBtn) && (
            <div class={`${COMPONENT_NAME.value}__buttons`}>
              {cancelBtn}
              {confirmBtn}
            </div>
          )}
        </div>
      );
    };

    const onPopupVisibleChange = (val: boolean, context: PopupVisibleChangeContext) => {
      setInnerVisible(val, context as PopconfirmVisibleChangeContext);
    };

    const renderTNodeContent = useContent();

    return () => (
      <Popup
        visible={innerVisible.value}
        {...innerPopupProps.value}
        onVisibleChange={onPopupVisibleChange}
        v-slots={{
          content: renderContent,
        }}
      >
        {renderTNodeContent('default', 'triggerElement')}
      </Popup>
    );
  },
});
