import { defineComponent } from 'vue';
import { renderTNodeJSX, renderContent } from '../utils/render-tnode';
import mixins from '../utils/mixins';
import getLocalRecevierMixins from '../locale/local-receiver';
import Popup  from '../popup/index';
import { prefix } from '../config';
import props from './props';
import { TdPopconfirmProps, PopconfirmVisibleChangeContext } from './type';

const name = `${prefix}-popconfirm`;
const popupName = `${prefix}-popup`;
const PopconfirmLocalReceiver = getLocalRecevierMixins('popconfirm');
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
    iconName(): string {
      const iconMap = {
        default: 'info-circle-filled',
        warning: 'error-circle-filled',
        danger: 'error-circle-filled',
      };
      return iconMap[this.theme] || '';
    },
    iconColor(): string {
      let color = '';
      switch (this.theme) {
        case 'warning':
          color = '#FFAA00';
          break;
        case 'danger':
          color = '#E34D59';
          break;
        default:
          color = '#0052D9';
      }
      return `color:${color}`;
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
      // 优先级 slot > Funtion
      if (this.$slots.icon) {
        return this.$slots.icon(null);
      }
      const arg = this.icon;
      if (typeof arg === 'function') {
        // eslint-disable-next-line @typescript-eslint/ban-types
        return (arg as Function)();
      }
      return <t-icon name={this.iconName} style={this.iconColor} />;
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
    const triggerElement = renderContent(this, 'default', 'triggerElement');
    const popupProps = Object.assign({
      showArrow: true,
      overlayClassName: name,
      trigger: 'manual',
    }, this.popupProps);
    const baseTypes = ['string', 'object'];
    let confirmBtn: any = null;
    if (![undefined, null].includes(this.confirmBtn)) {
      const mBtn = this.confirmBtn || this.t(this.locale.confirm);
      confirmBtn = baseTypes.includes(typeof mBtn)
        ? this.renderConfirm(mBtn)
        : renderTNodeJSX(this, 'confirmBtn');
    }
    let cancelBtn: any = null;
    if (![undefined, null].includes(this.cancelBtn)) {
      const cBtn = this.cancelBtn || this.t(this.locale.cancel);
      cancelBtn = baseTypes.includes(typeof cBtn)
        ? this.renderCancel(cBtn)
        : renderTNodeJSX(this, 'cancelBtn');
    }
    const slots = {
      content: () => (
        <div class={`${name}__content`}>
          <div class={`${name}__body`}>
            {this.renderIcon()}
            <div class={`${name}__inner`}>
              {renderTNodeJSX(this, 'content')}
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
          {...popupProps}
          onVisibleChange={this.onPopupVisibleChange}
          v-slots={slots}
        >
          {triggerElement}
        </Popup>
      </div>
    );
  },
});
