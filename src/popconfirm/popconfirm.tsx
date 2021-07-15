import { defineComponent, VNodeChild, h } from 'vue';
import Icon from '../icon';
import Button from '../button';
import Popup from '../popup/index';
import { prefix } from '../config';
import props from '@TdTypes/popconfirm/props';
// import {THEME_LIST} from './const'
// import { Popconfirm } from '../../script/types';
const name = `${prefix}-popconfirm`;
const popupName = `${prefix}-popup`;

export default defineComponent({
  name,
  props: {
    ...props,
    // cancelText: {
    //   type: [String, Function],
    //   default: '取消',
    // },
    // confirmText: {
    //   type: [String, Function],
    //   default: '确定',
    // },
  },
  emits: ['close', 'cancel', 'confirm', 'visibleChange'],
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
        case 'danger':
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
    renderIcon(): VNodeChild {
      // 优先级 slot > Funtion > string
      if (this.$slots.icon) {
        return this.$slots.icon();
      }
      const arg = this.icon;
      if (typeof arg === 'function') {
        return arg(h);
      }
      const iconName = arg || this.iconName;
      return iconName ? <Icon name={iconName} style={this.iconColor} /> : '';
    },
    renderContent(): VNodeChild {
      // 优先级 slot > Function > string
      if (this.$slots.content) {
        return this.$slots.content();
      }
      const node = this.content || '确定删除吗？';
      if (typeof node === 'function') {
        return node(h);
      }
      return <div>{node}</div>;
    },
    renderCancel(): VNodeChild {
      if (this.$slots.cancelBtn) {
        return this.$slots.cancelBtn();
      }
      if (typeof this.cancelBtn === 'function') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this.cancelBtn();
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
      if (this.$slots.confirmBtn) {
        return this.$slots.confirmBtn();
      }
      if (typeof this.confirmBtn === 'function') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
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
    const trigger: VNode[] | VNode | string = this.$slots.default ? this.$slots.default() : null;
    const popupProps = {
      props: {
        showArrow: true,
        overlayClassName: name,
        content: this.content,
        // $attrs放下面来, vue3中合并顺序改变了
        // https://v3.cn.vuejs.org/guide/migration/v-bind.html#%E6%A6%82%E8%A7%88
        ...this.$attrs,
      },
      ref: 'popup',
      // https://v3.cn.vuejs.org/guide/migration/listeners-removed.html
      // 此处移除on的绑定,文档中提到v-on=$listeners已经合并到了v-bind=$attrs
      // on: {
      //   ...this.$attrs,
      // },
    };
    const slots = {
      content: () => (
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
      ),
    };
    return (
      <div>
        <Popup ref={popupProps.ref} {...popupProps.props} v-slots={slots}>
          {trigger}
        </Popup>
        <slot />
      </div>
    );
  },
});
