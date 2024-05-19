import Vue from 'vue';
import {
  InfoCircleFilledIcon as TdInfoCircleFilledIcon,
  ErrorCircleFilledIcon as TdErrorCircleFilledIcon,
  GlobalIconType,
} from 'tdesign-icons-vue';
import mixins from '../utils/mixins';
import getConfigReceiverMixins, { PopconfirmConfig, getGlobalIconMixins } from '../config-provider/config-receiver';
import Popup, { PopupProps } from '../popup/index';
import props from './props';
import { renderTNodeJSX, renderContent, renderTNodeJSXDefault } from '../utils/render-tnode';
import { PopconfirmVisibleChangeContext, TdPopconfirmProps } from './type';
import { emitEvent } from '../utils/event';
import ActionMixin from '../dialog/actions';

export default mixins(
  ActionMixin,
  getConfigReceiverMixins<Vue, PopconfirmConfig>('popconfirm'),
  getGlobalIconMixins(),
).extend({
  name: 'TPopconfirm',
  props: { ...props },
  model: {
    prop: 'visible',
    event: 'visible-change',
  },
  computed: {
    themeIcon(): GlobalIconType {
      const { InfoCircleFilledIcon, ErrorCircleFilledIcon } = this.useGlobalIcon({
        InfoCircleFilledIcon: TdInfoCircleFilledIcon,
        ErrorCircleFilledIcon: TdErrorCircleFilledIcon,
      });
      const iconMap = {
        default: InfoCircleFilledIcon,
        warning: ErrorCircleFilledIcon,
        danger: ErrorCircleFilledIcon,
      };
      return iconMap[this.theme];
    },
    iconCls(): string {
      const theme = this.theme || 'default';
      return `${this.componentName}__icon--${theme}`;
    },
    innerPopupProps(): PopupProps {
      return {
        showArrow: this.showArrow,
        overlayClassName: [this.componentName, `${this.componentName}__popup--${this.theme || 'default'}`],
        trigger: 'click',
        destroyOnClose: this.destroyOnClose,
        placement: this.placement,
        ...this.popupProps,
      };
    },
  },
  methods: {
    // used in ActionMixin, do not Delete
    cancelBtnAction(e: MouseEvent) {
      emitEvent<Parameters<TdPopconfirmProps['onCancel']>>(this, 'cancel', { e });
      const cancelContext: PopconfirmVisibleChangeContext = { e, trigger: 'cancel' };
      emitEvent<Parameters<TdPopconfirmProps['onVisibleChange']>>(this, 'visible-change', false, cancelContext);
    },
    // used in ActionMixin, do not Delete
    confirmBtnAction(e: MouseEvent) {
      emitEvent<Parameters<TdPopconfirmProps['onConfirm']>>(this, 'confirm', { e });
      const confirmContext: PopconfirmVisibleChangeContext = { e, trigger: 'confirm' };
      emitEvent<Parameters<TdPopconfirmProps['onVisibleChange']>>(this, 'visible-change', false, confirmContext);
    },
    renderIcon() {
      const Icon = this.themeIcon;
      return renderTNodeJSXDefault(this, 'icon', <Icon class={this.iconCls} />);
    },
    onPopupVisibleChange(val: boolean, context: PopconfirmVisibleChangeContext) {
      this.$emit('visible-change', val, context);
      this.onVisibleChange && this.onVisibleChange(val, context);
    },
  },
  render() {
    const triggerElement = renderContent(this, 'default', 'triggerElement');
    // this.getCancelBtn is a function of ActionMixin
    const cancelBtn = this.getCancelBtn({
      cancelBtn: this.cancelBtn,
      globalCancel: this.global.cancel,
      size: 'small',
      className: `${this.componentName}__cancel`,
    });
    // this.getConfirmBtn is a function of ActionMixin
    const confirmBtn = this.getConfirmBtn({
      theme: this.theme,
      confirmBtn: this.confirmBtn,
      globalConfirm: this.global.confirm,
      size: 'small',
      globalConfirmBtnTheme: this.global.confirmBtnTheme,
      className: `${this.componentName}__confirm`,
    });
    return (
      <Popup
        ref="popup"
        visible={this.visible}
        props={this.innerPopupProps}
        on={{ 'visible-change': this.onPopupVisibleChange }}
      >
        <template slot="content" role="popconfirm">
          <div class={`${this.componentName}__content`}>
            <div class={`${this.componentName}__body`}>
              {this.renderIcon()}
              <div class={`${this.componentName}__inner`}>{renderTNodeJSX(this, 'content')}</div>
            </div>
            {Boolean(cancelBtn || confirmBtn) && (
              <div class={`${this.componentName}__buttons`}>
                {cancelBtn}
                {confirmBtn}
              </div>
            )}
          </div>
        </template>
        {triggerElement}
      </Popup>
    );
  },
});
