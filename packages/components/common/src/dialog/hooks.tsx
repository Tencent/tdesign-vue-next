import { getCurrentInstance } from 'vue';
import { isString } from 'lodash-es';
import { isObject } from 'lodash-es';
import { omit } from 'lodash-es';
import { useTNodeJSX } from '../hooks/tnode';
import TButton, { ButtonProps } from '../button';
import { PopconfirmConfig, DialogConfig, DrawerConfig } from '../config-provider';
import type { ClassName } from '../common';
import type { TdDialogProps } from '@td/intel/dialog/type';

export interface MixinsConfirmBtn {
  theme?: MixinsThemeType;
  className?: ClassName;
  confirmBtn: TdDialogProps['confirmBtn'];
  globalConfirm: PopconfirmConfig['confirm'] | DrawerConfig['confirm'] | DialogConfig['confirm'];
  globalConfirmBtnTheme?: PopconfirmConfig['confirmBtnTheme'] | DialogConfig['confirmBtnTheme'];
  size?: ButtonProps['size'];
  confirmLoading?: boolean;
}

export interface MixinsCancelBtn {
  className?: ClassName;
  cancelBtn: TdDialogProps['cancelBtn'];
  globalCancel: PopconfirmConfig['cancel'] | DrawerConfig['cancel'] | DialogConfig['cancel'];
  size?: ButtonProps['size'];
}

export type MixinsThemeType = keyof (PopconfirmConfig['confirmBtnTheme'] & DialogConfig['confirmBtnTheme']);

export interface BtnAction {
  confirmBtnAction: (e: MouseEvent) => void;
  cancelBtnAction: (e: MouseEvent) => void;
}

export function useAction(action: BtnAction) {
  const instance = getCurrentInstance();
  const renderTNodeJSX = useTNodeJSX();
  // 全局配置属性综合
  const getDefaultConfirmBtnProps = (options: MixinsConfirmBtn): ButtonProps => {
    const { globalConfirm, theme, globalConfirmBtnTheme } = options;
    const defaultTheme = omit(globalConfirmBtnTheme, ['info'])?.[theme] || 'primary';
    let props: ButtonProps = {
      theme: defaultTheme,
      size: options.size,
      onClick: (e) => {
        action.confirmBtnAction(e);
      },
    };
    if (isString(globalConfirm)) {
      props.content = globalConfirm;
    } else if (isObject(globalConfirm)) {
      props = { ...props, ...globalConfirm };
    }
    return props;
  };
  // 全局配置属性综合
  const getDefaultCancelBtnProps = (options: MixinsCancelBtn): ButtonProps => {
    const { globalCancel } = options;
    let props: ButtonProps = {
      theme: 'default',
      size: options.size,
      onClick: (e) => {
        action.cancelBtnAction(e);
      },
    };
    if (isString(globalCancel)) {
      props.content = globalCancel;
    } else if (isObject(globalCancel)) {
      props = { ...props, ...globalCancel };
    }
    return props;
  };
  const getButtonByProps = (
    button: string | ButtonProps,
    params: {
      defaultButtonProps: ButtonProps;
      className?: ClassName;
      confirmLoading?: boolean;
    },
  ) => {
    const { defaultButtonProps, className, confirmLoading } = params;
    let newOptions = defaultButtonProps;
    if (isString(button)) {
      newOptions.content = button;
    } else if (isObject(button)) {
      newOptions = { ...newOptions, ...button };
    }
    if (confirmLoading !== undefined) {
      newOptions.loading = confirmLoading;
    }
    return <TButton class={className} {...newOptions} />;
  };
  const getConfirmBtn = (options: MixinsConfirmBtn) => {
    const { confirmBtn, className, confirmLoading } = options;
    if (confirmBtn === null) return null;
    if (confirmBtn && instance.slots.confirmBtn) {
      console.warn('Both $props.confirmBtn and $scopedSlots.confirmBtn exist, $props.confirmBtn is preferred.');
    }
    const defaultButtonProps = getDefaultConfirmBtnProps(options);
    // 属性和插槽都不存在，就返回全局默认配置
    if (!confirmBtn && !instance.slots.confirmBtn) {
      return <TButton class={className} loading={confirmLoading} {...defaultButtonProps} />;
    }
    // 如果属性存在，优先返回属性配置
    if (confirmBtn && ['string', 'object'].includes(typeof confirmBtn)) {
      return getButtonByProps(confirmBtn as string | ButtonProps, {
        defaultButtonProps,
        className,
        confirmLoading,
      });
    }
    // 渲染插槽 或 function 类型的 confirmBtn，属性优先级更高
    return renderTNodeJSX('confirmBtn');
  };
  const getCancelBtn = (options: MixinsCancelBtn) => {
    const { cancelBtn, className } = options;
    if (cancelBtn === null) return null;
    if (cancelBtn && instance.slots.cancelBtn) {
      console.warn('Both $props.cancelBtn and $scopedSlots.cancelBtn exist, $props.cancelBtn is preferred.');
    }
    const defaultButtonProps: ButtonProps = getDefaultCancelBtnProps(options);
    // 属性和插槽都不存在，就返回全局默认配置
    if (!cancelBtn && !instance.slots.cancelBtn) {
      return <TButton class={className} {...defaultButtonProps} />;
    }
    // 如果属性存在，优先返回属性配置
    if (cancelBtn && ['string', 'object'].includes(typeof cancelBtn)) {
      return getButtonByProps(cancelBtn as string | ButtonProps, { defaultButtonProps });
    }
    // 渲染插槽 或 function 类型的 confirmBtn，属性优先级更高
    return renderTNodeJSX('cancelBtn');
  };
  return { getConfirmBtn, getCancelBtn };
}

export function useSameTarget(handleClick?: (e: MouseEvent) => void) {
  // 判断 click 事件的起点和落点所在元素是否一致
  let MOUSEDOWN_TARGET = false;
  let MOUSEUP_TARGET = false;

  const onClick = (e: MouseEvent) => {
    if (MOUSEDOWN_TARGET && MOUSEUP_TARGET) {
      handleClick(e);
    }
    MOUSEDOWN_TARGET = false;
    MOUSEUP_TARGET = false;
  };

  const onMousedown = (e: MouseEvent) => {
    MOUSEDOWN_TARGET = e.target === e.currentTarget;
  };
  const onMouseup = (e: MouseEvent) => {
    MOUSEUP_TARGET = e.target === e.currentTarget;
  };

  return { onClick, onMousedown, onMouseup };
}
