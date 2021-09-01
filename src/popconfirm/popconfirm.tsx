import { defineComponent, ComponentPublicInstance } from 'vue';
import { renderTNodeJSX, renderContent, renderTNodeJSXDefault } from '../utils/render-tnode';
import mixins from '../utils/mixins';
import getLocalRecevierMixins from '../locale/local-receiver';
import Popup, { PopupProps }  from '../popup/index';
import { prefix } from '../config';
import props from './props';
import { TdPopconfirmProps, PopconfirmVisibleChangeContext } from './type';
import TIconInfoCircleFilled from '../icon/info-circle-filled';
import TIconErrorCircleFilled from '../icon/error-circle-filled';
const name = `${prefix}-popconfirm`;
const popupName = `${prefix}-popup`;
const PopconfirmLocalReceiver = getLocalRecevierMixins('popconfirm');
type IconConstructor = typeof TIconInfoCircleFilled;
export default defineComponent({
  ...mixins(PopconfirmLocalReceiver),
  name,
  props: {
    ...props,
  },
  emits: ['close', 'cancel', 'confirm', 'visible-change'],
  data() {
    return {
      name,
      popupName,
    };
  },
  computed: {
    themeIcon(): IconConstructor {
      const iconMap = {
        default: TIconInfoCircleFilled,
        warning: TIconErrorCircleFilled,
        danger: TIconErrorCircleFilled,
      };
      return iconMap[this.theme];
    },
    iconCls(): string {
      const theme = this.theme || 'default';
      return `${name}__icon--${theme}`;
    },
    innerPopupProps(): PopupProps {
      return {
        showArrow: this.showArrow,
        overlayClassName: name,
        trigger: 'manual',
        destroyOnClose: this.destroyOnClose,
        placement: this.placement,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ...this.popupProps,
      };
    },
  },
  methods: {
    handleCancel(e: MouseEvent) {
      this.$emit('cancel', { e });
      const cancelContext: PopconfirmVisibleChangeContext = { e, trigger: 'cancel' };
      this.$emit('visible-change', false, cancelContext);
    },
    handleConfirm(e: MouseEvent) {
      this.$emit('confirm', { e });
      const confirmContext: PopconfirmVisibleChangeContext = { e, trigger: 'confirm' };
      this.$emit('visible-change', false, confirmContext);
    },
    renderIcon() {
      const ICON = this.themeIcon;
      return renderTNodeJSXDefault(this as ComponentPublicInstance, 'icon', <ICON class={this.iconCls} />);
    },
    getBtnText(api: TdPopconfirmProps['cancelBtn']) {
      return typeof api === 'object' ? api.content : api;
    },
    getBtnProps(api: TdPopconfirmProps['confirmBtn']) {
      return typeof api === 'object' ? api : {};
    },
    renderCancel(cancelBtn: TdPopconfirmProps['cancelBtn']) {
      return (
        <t-button theme="default" size="small" {...this.getBtnProps(cancelBtn)}>
          {this.getBtnText(cancelBtn)}
        </t-button>
      );
    },
    renderConfirm(confirmBtn: TdPopconfirmProps['confirmBtn']) {
      return (
        <t-button theme="primary" size="small" {...this.getBtnProps(confirmBtn)}>
          {this.getBtnText(confirmBtn)}
        </t-button>
      );
    },
    onPopupVisibleChange(val: boolean, context: PopconfirmVisibleChangeContext) {
      this.$emit('visible-change', val, context);
    },
  },
  render() {
    const triggerElement = renderContent(this as ComponentPublicInstance, 'default', 'triggerElement');
    const baseTypes = ['string', 'object'];
    let confirmBtn: any = null;
    if (![undefined, null].includes(this.confirmBtn)) {
      const mBtn = this.confirmBtn || this.t(this.locale.confirm);
      confirmBtn = baseTypes.includes(typeof mBtn)
        ? this.renderConfirm(mBtn)
        : renderTNodeJSX(this as ComponentPublicInstance, 'confirmBtn');
    }
    let cancelBtn: any = null;
    if (![undefined, null].includes(this.cancelBtn)) {
      const cBtn = this.cancelBtn || this.t(this.locale.cancel);
      cancelBtn = baseTypes.includes(typeof cBtn)
        ? this.renderCancel(cBtn)
        : renderTNodeJSX(this as ComponentPublicInstance, 'cancelBtn');
    }
    const slots = {
      content: () => (
        <div class={`${name}__content`}>
          <div class={`${name}__body`}>
            {this.renderIcon()}
            <div class={`${name}__inner`}>
              {renderTNodeJSX(this as ComponentPublicInstance, 'content')}
            </div>
          </div>
          {Boolean(cancelBtn || confirmBtn) && (
            <div class="t-popconfirm__buttons">
              <span class="t-popconfirm__cancel" onClick={this.handleCancel}>{cancelBtn}</span>
              <span class="t-popconfirm__confirm" onClick={this.handleConfirm}>{confirmBtn}</span>
            </div>
          )}
        </div>
      ),
    };
    return (
      <div>
        <Popup
          ref="popup"
          visible={this.visible}
          {...this.innerPopupProps}
          onVisibleChange={this.onPopupVisibleChange}
          v-slots={slots}
        >
          {triggerElement}
        </Popup>
      </div>
    );
  },
});
