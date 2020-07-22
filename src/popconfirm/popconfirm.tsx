import Vue, { VNode } from 'vue';
import Icon from '../icon';
import Button from '../button';
import Popup from '../popup';
import { prefix } from '../config';

const name = `${prefix}-popconfirm`;
const popupName = `${prefix}-popup`;

export default Vue.extend({
  name,
  props: {
    theme: {
      type: String,
      default: 'default',
      validator(v: string): boolean {
        return (
          [
            'default',
            'info',
            'warning',
            'error',
          ].indexOf(v) > -1
        );
      },
    },
    icon: [String, Function],
    content: [String, Function],
    cancelText: {
      type: String,
      default: '取消',
    },
    confirmText: {
      type: String,
      default: '确定',
    },
  },
  data() {
    return {
      name,
      popupName,
    };
  },
  computed: {
    iconName(): string {
      return this.theme === 'default' ? '' : 'prompt_fill';
    },
    iconColor(): string {
      let color = '';
      switch (this.theme) {
        case 'warning':    // 黄色
          color = '#FFAA00';
          break;
        case 'error':
          color = '#FF3E00';   // 红色
          break;
        default:
          color = '#0052D9';   // 蓝色
      }
      return `color:${color}`;
    },
  },
  methods: {
    handleClose(event: any): void {
      this.$emit('close', event);
    },
    handleCancel(event: any): void {
      this.setVisible(false, event);
      this.$emit('cancel', event);
    },
    handleConfirm(event: any): void {
      this.setVisible(false, event);
      this.$emit('confirm', event);
    },
    setVisible(visible: boolean, event: any): void{
      (this.$refs.popup as any).doClose();
      this.$emit('visibleChange', visible, event);
    },
    renderIcon(): JsxNode {
      // 优先级 slot > Funtion > string
      if (this.$slots.icon) {
        return this.$slots.icon;
      }
      const arg = this.icon;
      if (typeof arg === 'function') {
        return arg();
      }
      const iconName = arg || this.iconName;
      return iconName ? <Icon name={ iconName } style={ this.iconColor }/> : '';
    },
    renderContent(): JsxNode {
      // 优先级 slot > Function > string
      if (this.$slots.content) {
        return this.$slots.content;
      }
      const node = this.content;
      if (typeof node === 'function') {
        return (node as Function)();
      }
      return <div>{ node }</div>;
    },
    renderCancel(): JsxNode {
      if (this.$slots.cancelText) {
        return this.$slots.cancelText;
      }
      return (
        <Button size='small'
                theme='link'
                style='color: #222'
                onclick={ this.handleCancel }
        >{ this.cancelText }</Button>
      );
    },
    renderConfirm(): JsxNode {
      if (this.$slots.confirmText) {
        return this.$slots.confirmText;
      }
      return (
        <Button size='small'
                theme="link"
                onclick={ this.handleConfirm }
        >{ this.confirmText }</Button>
      );
    },
  },
  render() {
    const trigger: VNode[] | VNode | string = this.$scopedSlots.default
      ? this.$scopedSlots.default(null) : '';
    const popupProps = {
      props: {
        ...this.$attrs,
        visibleArrow: true,
        overlayClassName: name,
      },
      ref: 'popup',
      on: {
        ...this.$listeners,
      },
    };

    return (
      <div>
        <Popup { ...popupProps }>
          <template slot='content' role='poppconfirm'>
            <div class={`${name}__content`}>
              <div class={`${name}__body`}>
                { this.renderIcon() }
                <div class={`${name}__inner`}>
                  { this.renderContent() }
                </div>
              </div>
              <div class="t-popconfirm__buttons">
                { this.renderCancel() }
                { this.renderConfirm() }
              </div>
            </div>
          </template>
          {trigger}
        </Popup>
        <slot/>
      </div>
    );
  },
});
