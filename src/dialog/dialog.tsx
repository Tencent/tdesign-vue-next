import Vue from 'vue';
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';
// import CLASSNAMES from '../utils/classnames';
import Icon from '../icon';

const name = `${prefix}-dialog`;
interface StyleObject {
  width?: string | number;
}
const PositionClass = {
  center: 't-dialog--center',
};
function GetCSSValue(v: string | number) {
  return isNaN(Number(v)) ? v : `${Number(v)}px`;
};

// 注册元素的拖拽事件
function InitDragEvent(dragBox: HTMLElement) {
  const target = dragBox;
  target.onmousedown = (e: MouseEvent) => {
    // 算出鼠标相对元素的位置
    const disX = e.clientX - target.offsetLeft;
    const disY = e.clientY - target.offsetTop;
    document.onmousemove = (e) => {
      // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
      const left = e.clientX - disX;
      const top = e.clientY - disY;
      // 移动当前元素
      target.style.left = `${left}px`;
      target.style.top = `${top}px`;
    };
    document.onmouseup = () => {
      // 鼠标弹起来的时候不再移动
      document.onmousemove = null;
      // 预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
      document.onmouseup = null;
    };
  };
}
export default Vue.extend({
  name,
  components: {
    [Icon.name]: Icon,
    RenderComponent,
  },
  model: {
    prop: 'visible',
    event: 'change',
  },
  props: {
    // theme is an example api, which can be deleted.
    visible: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: 'modal',
      validator(v: string): boolean {
        return (
          [
            'modal',
            'not-modal',
          ].indexOf(v) > -1
        );
      },
    },
    offset: {
      type: [String, Object],
      default: 'center',
      validator(v: string | object): boolean {
        if (typeof v === 'string') {
          return (
            [
              'center',
            ].indexOf(v) > -1
          );
        }
        return true;
      },
    },
    width: {
      type: [String, Number],
    },
    header: {
      type: [Boolean, String, Function],
      default: true,
    },
    body: {
      type: [Boolean, String, Function],
      default: true,
    },
    footer: {
      type: [Boolean, String, Function],
      default: true,
    },
    closeBtn: {
      type: [Boolean, Function],
      default: true,
    },
    showOverlay: {
      type: Boolean,
      default: true,
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    preventScrollThrough: {
      type: Boolean,
      default: true,
    },
    zIndex: {
      type: Number,
      default: 2500,
    },
    destroyOnClose: {
      type: Boolean,
      default: false,
    },
    attach: {
      type: [Function, String, Boolean],
      default: false,
    },
    close: {
      type: Function,
    },
    theme: {
      type: String,
      default: 'line',
      validator(v: string): boolean {
        return (
          [
            'line',
            'primary',
            'dashed',
            'warning',
            'warning-line',
            'link',
            'ghost',
            'ghost-line',
          ].indexOf(v) > -1
        );
      },
    },
  },
  computed: {
    // 是否模态形式的对话框
    isModal(): boolean {
      return this.mode === 'modal';
    },
    // 挂载目标，false 代表自然挂载的子元素
    attachTarget(): Node | string | boolean {
      const { attach } = this;
      if (typeof attach === 'function') {
        return attach();
      }
      if (['string', 'boolean'].indexOf(typeof attach) > -1) {
        return attach;
      }
      return false;
    },
    ctxClass(): Array<string> {
      // 关闭时候是否卸载元素
      const closeMode = this.destroyOnClose ? 'display' : 'visable';
      return [
        't-dialog-ctx',
        this.visible ? `t-is-${closeMode}` : `t-not-${closeMode}`,
      ];
    },
    maskClass(): Array<string> {
      return [
        't-dialog-mask',
        !this.showOverlay && 't-dialog-mask--hidden',
      ];
    },
  },
  watch: {
    visible(value) {
      this.$emit('visableChange', value);
      this.disPreventScrollThrough(value);
      this.addKeyboardEvent(value);
      // 目前弹窗交互没有动画
      if (value) {
        this.$emit('opened');
      } else {
        this.$emit('closed');
      }
    },
  },
  beforeDestroy() {
    this.disPreventScrollThrough(false);
    this.addKeyboardEvent(false);
  },

  // mounted() { },

  // 注册v-draggable指令,传入ture时候初始化拖拽事件
  directives: {
    draggable(el, binding) {
      // el 指令绑定的元素
      if (el && binding && binding.value) {
        InitDragEvent(el);
      }
    },
  },
  methods: {
    disPreventScrollThrough(disabled: boolean) {
      // 防止滚动穿透,modal形态才需要
      if (this.preventScrollThrough && this.isModal) {
        document.body.style.overflow = disabled ? 'hidden' : '';
      }
    },
    addKeyboardEvent(status: boolean) {
      if (status) {
        document.addEventListener('keydown', this.keyboardEvent);
      } else {
        document.removeEventListener('keydown', this.keyboardEvent);
      }
    },
    keyboardEvent(e: KeyboardEvent) {
      // esc 键
      if (e.keyCode === 27) {
        this.$emit('keydownEsc', e);
      }
    },
    overlayAction() {
      // this.visibleChange(false)
      this.$emit('clickOverlay');
    },
    closeBtnAcion() {
      this.$emit('clickCloseBtn');
      if (typeof this.close === 'function') {
        this.close();
      }
    },
    changeVisible(visible: boolean) {
      this.$emit('change', visible);
    },
    confirmBtnAction() {
      alert('confirm');
    },
    renderTitle() {
      const defaultView = <h5 class='title'>对话框标题</h5>;
      const target = this.header;
      let view;
      let isShow = true;
      if (typeof target === 'boolean') {
        isShow = target;
        view = this.$slots.header;
      } else if (typeof target === 'string') {
        view = <h5 class="title">{target}</h5>;
      } else if (typeof target === 'function') {
        view = target();
      }
      return isShow && (
        <div class="t-dialog__header">
          {view || defaultView}
        </div>
      );
    },
    renderBody() {
      const defaultView = <div>对话框内容</div>;
      const target = this.body;
      let view;
      let isShow = true;
      if (typeof target === 'boolean') {
        isShow = target;
        view = this.$slots.body;
      } else if (typeof target === 'string') {
        view = <div>{target}</div>;
      } else if (typeof target === 'function') {
        view = target();
      }
      return isShow && (
        <div class="t-dialog__body">
          {view || defaultView}
        </div>
      );
    },
    renderFooter() {
      const defaultView = <div>
        <button class="t-button t-button--line" onClick={this.closeBtnAcion}>取消</button>
        <button class="t-button t-button--primary" onClick={this.confirmBtnAction}>确认</button>
      </div>;
      const target = this.footer;
      let view;
      let isShow = true;
      if (typeof target === 'boolean') {
        isShow = target;
        view = this.$slots.footer;
      } else if (typeof target === 'string') {
        view = <div>{target}</div>;
      } else if (typeof target === 'function') {
        view = target();
      }
      return isShow && (
        <div class="t-dialog__footer">
          {view || defaultView}
        </div>
      );
    },
    renderCloseBtn() {
      const defaultView = <Icon name='close' nativeOnClick={this.closeBtnAcion}></Icon>;
      const target = this.closeBtn;
      let view;
      let isShow = true;
      if (typeof target === 'boolean') {
        isShow = target;
        view = this.$slots.closeBtn;
      } else if (typeof target === 'function') {
        view = target();
      }
      return isShow && (view || defaultView);
    },
  },
  // onClick={this.close}
  // onClick={(event: Event) => event.stopPropagation()}
  render() {
    const dialogClass = ['t-dialog', 't-dialog--default'];
    let dialogStyle: StyleObject = { width: GetCSSValue(this.width) };
    if (typeof this.offset === 'object') {
      dialogStyle = { ...dialogStyle, ...this.offset };
    } else {
      dialogClass.push(PositionClass[this.offset]);
    }
    return (
      <div class={this.ctxClass} style={{ zIndex: this.zIndex }} v-transfer-dom={this.attachTarget}>

        {
          this.isModal && <div class={this.maskClass} onClick={this.overlayAction}></div>
        }
        {/* 非模态形态下draggable为true才允许拖拽 */}
        <div class={dialogClass} style={dialogStyle} v-draggable={!this.isModal && this.draggable}>
          {this.renderTitle()}
          {this.renderBody()}
          {this.renderFooter()}
          {this.renderCloseBtn()}
        </div>
      </div>
    );
  },
});
