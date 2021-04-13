// import Vue, { VNode } from 'vue';
import { defineComponent, PropType } from 'vue';
import Icon from '../icon';
import Button from '../button';
import Popup from '../popup/index';
import { prefix } from '../config';
import props from '@TdTypes/popconfirm/props';
import {THEME_LIST} from './const'
import { Popconfirm } from '../../script/types';
const name = `${prefix}-popconfirm`;
const popupName = `${prefix}-popup`;

export default defineComponent({
  name,
  props,
  data() {
    return {
      name,
      popupName,
    };
  },
  computed: {
    iconName(): string {
      const iconMap = {
        info: 'info-circle-filled',
        warning: 'error-circle-filled',
        error: 'error-circle-filled',
      };
      return iconMap[this.theme] || '';
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
    setVisible(visible: boolean, event: any): void {
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
      return iconName ? <Icon name={iconName} style={this.iconColor} /> : '';
    },
    renderContent(): JsxNode {
      // 优先级 slot > Function > string
      if (this.$slots.content) {
        return this.$slots.content();
      }
      const node = this.content;
      if (typeof node === 'function') {
        return (node as Function)();
      }
      return <div>{node}</div>;
    },
    renderCancel(): JsxNode {
      if (this.$slots.cancelText) {
        return this.$slots.cancelText;
      }
      if (typeof this.cancelText === 'function') {
        return this.cancelText();
      }
      return (
        <Button
          size='small'
          variant='outline'
          onclick={this.handleCancel}
        >{this.cancelBtn}</Button>
      );
    },
    renderConfirm(): JsxNode {
      if (this.$slots.confirmText) {
        return this.$slots.confirmText;
      }
      if (typeof this.confirmText === 'function') {
        return this.confirmBtn();
      }
      return (
        <Button size='small'
          variant="base"
          theme="primary"
          onclick={this.handleConfirm}
        >{this.confirmBtn}</Button>
      );
    },
  },
  render() {
    const trigger: VNode[] | VNode | string = this.$slots.default()
      ? this.$slots.default(null) : '';
    const popupProps = {
      props: {
        ...this.$attrs,
        showArrow: true,
        overlayClassName: name,
        content: this.content,
      },
      ref: 'popup',
      on: {
        ...this.$attrs,
      },
    };
    const slots={
      content:()=>(
        <div class={`${name}__content`}>
          <div class={`${name}__body`}>
            {this.renderIcon()}
            <div class={`${name}__inner`}>
              {this.renderContent()}
            </div>
          </div>
          <div class="t-popconfirm__buttons">
            {this.renderCancel()}
            {this.renderConfirm()}
          </div>
        </div>
      )
    }
    return (
      <div>
        <Popup ref='popup' v-slots={slots}>
          {trigger}
        </Popup>
        <slot />
      </div>
    );
  },
});
