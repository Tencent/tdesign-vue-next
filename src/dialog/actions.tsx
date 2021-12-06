import { defineComponent } from 'vue';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
import { renderTNodeJSX } from '../utils/render-tnode';
import TButton, { ButtonProps } from '../button';
import { PopconfirmConfig, DialogConfig, DrawerConfig } from '../config-provider';
import { ClassName, TNode } from '../common';

export type MixnsFooterButton = string | ButtonProps | TNode;

export interface MixinsConfirmBtn {
  theme?: MixinsThemeType;
  className?: ClassName;
  confirmBtn: MixnsFooterButton;
  globalConfirm: PopconfirmConfig['confirm'] | DrawerConfig['confirm'] | DialogConfig['confirm'];
  globalConfirmBtnTheme?: PopconfirmConfig['confirmBtnTheme'] | DialogConfig['confirmBtnTheme'];
}

export interface MixinsCancelBtn {
  className?: ClassName;
  cancelBtn: MixnsFooterButton;
  globalCancel: PopconfirmConfig['cancel'] | DrawerConfig['cancel'] | DialogConfig['cancel'];
}

export type MixinsThemeType = keyof (PopconfirmConfig['confirmBtnTheme'] & DialogConfig['confirmBtnTheme']);

export default defineComponent({
  methods: {
    getConfirmBtn(options: MixinsConfirmBtn) {
      const { confirmBtn, className } = options;
      if (confirmBtn === null) return null;
      if (confirmBtn && this.$slots.confirmBtn) {
        console.warn('Both $props.confirmBtn and $scopedSlots.confirmBtn exist, $props.confirmBtn is preferred.');
      }
      const defaultButtonProps = this.getDefaultConfrimBtnProps(options);
      // 属性和插槽都不存在，就返回全局默认配置
      if (!confirmBtn && !this.$slots.confirmBtn) {
        return <TButton class={className} {...defaultButtonProps} />;
      }
      // 如果属性存在，优先返回属性配置
      if (confirmBtn && ['string', 'object'].includes(typeof confirmBtn)) {
        return this.getButtonByProps(confirmBtn as string | ButtonProps, defaultButtonProps, className);
      }
      // 渲染插槽 或 function 类型的 confirmBtn，属性优先级更高
      return renderTNodeJSX(this, 'confirmBtn');
    },

    getCancelBtn(options: MixinsCancelBtn) {
      const { cancelBtn, className } = options;
      if (cancelBtn === null) return null;
      if (cancelBtn && this.$slots.cancelBtn) {
        console.warn('Both $props.cancelBtn and $scopedSlots.cancelBtn exist, $props.cancelBtn is preferred.');
      }
      const defaultButtonProps: ButtonProps = this.getDefaultCancelBtnProps(options);
      // 属性和插槽都不存在，就返回全局默认配置
      if (!cancelBtn && !this.$slots.cancelBtn) {
        return <TButton class={className} {...defaultButtonProps} />;
      }
      // 如果属性存在，优先返回属性配置
      if (cancelBtn && ['string', 'object'].includes(typeof cancelBtn)) {
        return this.getButtonByProps(cancelBtn as string | ButtonProps, defaultButtonProps);
      }
      // 渲染插槽 或 function 类型的 confirmBtn，属性优先级更高
      return renderTNodeJSX(this, 'cancelBtn');
    },

    getButtonByProps(button: string | ButtonProps, defaultButton: ButtonProps, className?: ClassName) {
      let newOptions = defaultButton;
      if (isString(button)) {
        newOptions.content = button;
      } else if (isObject(button)) {
        newOptions = { ...newOptions, ...button };
      }
      return <TButton class={className} {...newOptions} />;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    confirmBtnAction(e: MouseEvent) {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cancelBtnAction(e: MouseEvent) {},

    // 全局配置属性综合
    getDefaultConfrimBtnProps(options: MixinsConfirmBtn): ButtonProps {
      const { globalConfirm, theme, globalConfirmBtnTheme } = options;
      const defaultTheme = globalConfirmBtnTheme?.[theme] || 'primary';
      let props: ButtonProps = {
        theme: defaultTheme,
        content: '确定',
        onClick: (e) => {
          this.confirmBtnAction(e);
        },
      };
      if (isString(globalConfirm)) {
        props.content = globalConfirm;
      } else if (isObject(globalConfirm)) {
        props = { ...props, ...globalConfirm };
      }
      return props;
    },

    // 全局配置属性综合
    getDefaultCancelBtnProps(options: MixinsCancelBtn): ButtonProps {
      const { globalCancel } = options;
      let props: ButtonProps = {
        theme: 'default',
        content: '取消',
        onClick: (e) => {
          this.cancelBtnAction(e);
        },
      };
      if (isString(globalCancel)) {
        props.content = globalCancel;
      } else if (isObject(globalCancel)) {
        props = { ...props, ...globalCancel };
      }
      return props;
    },
  },
});
