import Vue, { CreateElement } from 'vue';
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';
import TIconClose from '../icon/close';
import TButton from '../button';
import { ButtonProps } from '../button/type';

const name = `${prefix}-dialog`;

function GetCSSValue(v: string | number) {
  return isNaN(Number(v)) ? v : `${Number(v)}px`;
};

// 计算dialog元素的偏移量，根据offset跟placement确定
function GetTransformByOffset(offset: any, placement: string) {
  if (!offset) return undefined;

  const { left, right, top, bottom } = offset;
  let translateY: string = placement === 'center' ? '-50%' : '0px';
  let translateX = '-50%';
  left && (translateX = `${translateX} - ${GetCSSValue(left)}`);
  right && (translateX = `${translateX} + ${GetCSSValue(right)}`);
  top && (translateY = `${translateY} - ${GetCSSValue(top)}`);
  bottom && (translateY = `${translateY} + ${GetCSSValue(bottom)}`);
  return `translate(calc(${translateX}),calc(${translateY}))`;
}
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
    TIconClose,
    RenderComponent,
  },
  model: {
    prop: 'visible',
    event: 'visible-change',
  },
  props: {
    visible: {
      type: Boolean,
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
    placement: {
      type: String,
      default: 'top',
      validator(v: string): boolean {
        return (
          [
            'top',
            'center',
          ].indexOf(v) > -1
        );
      },
    },
    offset: {
      type: Object,
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
    },
    attach: {
      type: [Function, String, Boolean],
      default: false,
    },
    confirmContent: {
      type: [String, Function, Object, Boolean],
      default: '确认',
    },
    cancelContent: {
      type: [String, Function, Object, Boolean],
      default: '取消',
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
    ctxClass(): ClassName {
      // 关闭时候是否卸载元素 this.$el.parentNode.removeChild(this.$el)
      const closeMode = this.destroyOnClose ? 'display' : 'visable';
      return [
        `${name}-ctx`,
        this.visible ? `${prefix}-is-${closeMode}` : `${prefix}-not-${closeMode}`,
      ];
    },
    maskClass(): ClassName {
      return [
        `${name}-mask`,
        !this.showOverlay && `${name}-mask--hidden`,
      ];
    },
  },
  watch: {
    visible(value) {
      this.disPreventScrollThrough(value);
      this.addKeyboardEvent(value);
      // 目前弹窗交互没有动画
      if (value) {
        this.$emit('opened');
      } else {
        this.$emit('closed');
      }
      // 关闭时，销毁元素
      if (!value && this.destroyOnClose) {
        this.$el.parentNode.removeChild(this.$el);
      }
    },
  },
  beforeDestroy() {
    this.disPreventScrollThrough(false);
    this.addKeyboardEvent(false);
  },
  // 注册v-draggable指令,传入ture时候初始化拖拽事件
  directives: {
    draggable(el, binding) {
      // el 指令绑定的元素
      if (el && binding && binding.value) {
        InitDragEvent(el);
      }
    },
  },
  data() {
    return {
      transform: undefined,
    };
  },
  created() {
    this.initOffsetWatch();
  },
  methods: {
    initOffsetWatch() {
      this.transform = GetTransformByOffset(this.offset, this.placement);
      // 这里主要是因为offset是对象，直接用computed or watch 的话，同样会造成不必要的重复计算
      this.$watch(() => JSON.stringify(this.offset) + this.placement, () => {
        this.transform = GetTransformByOffset(this.offset, this.placement);
      });
    },
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
      if (e.code === 'Escape') {
        this.$emit('keydown-esc', this.close, e);
      }
    },
    overlayAction(e: Event) {
      this.$emit('click-overlay', this.close, e);
    },
    closeBtnAcion(e: Event) {
      this.$emit('click-close-btn', this.close, e);
      this.changeVisible(false);
    },
    close() {
      this.changeVisible(false);
    },
    changeVisible(visible: boolean) {
      this.$emit('visible-change', visible);
    },
    cancelBtnAction(e: Event) {
      this.$emit('click-cancel', this.close, e);
      this.changeVisible(false);
    },
    confirmBtnAction(e: Event) {
      this.$emit('click-confirm', this.close, e);
    },
    renderTitle() {
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
        <div class={`${name}__header`}>
          {view}
        </div>
      );
    },
    renderBody() {
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
        <div class={`${name}__body`}>
          {view}
        </div>
      );
    },
    renderDefaultBtn(
      h: CreateElement,
      type: string,
      btnNode: string | Function | ButtonProps
    ) {
      if (!btnNode) return null;
      const r = {
        confirm: {
          theme: 'primary',
          onClick: this.confirmBtnAction,
        },
        cancel: {
          theme: 'line',
          onClick: this.cancelBtnAction,
        },
      }[type];
      if (typeof btnNode === 'function') {
        return btnNode(h);
      }
      if (typeof btnNode === 'object') {
        return <TButton theme={r.theme} onClick={r.onClick} {...{ props: btnNode }}>{btnNode.content}</TButton>;
      }
      return <TButton theme={r.theme} onClick={r.onClick}>{btnNode}</TButton>;
    },
    renderFooter(h: CreateElement) {
      const defaultView = (
        <div>
          {this.renderDefaultBtn(h, 'cancel', this.cancelContent)}
          {this.renderDefaultBtn(h, 'confirm', this.confirmContent)}
        </div>
      );
      const target = this.footer;
      let view;
      let isShow = true;
      if (typeof target === 'boolean') {
        isShow = target;
        view = this.$slots.footer;
      } else if (typeof target === 'string') {
        view = <div>{target}</div>;
      } else if (typeof target === 'function') {
        view = target(this.$createElement);
      }
      return isShow && (
        <div class={`${name}__footer`}>
          {view || defaultView}
        </div>
      );
    },
    renderCloseBtn() {
      const defaultView = <t-icon-close name='close' nativeOnClick={this.closeBtnAcion}></t-icon-close>;
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
  render(h: CreateElement) {
    const dialogClass = [`${name}`, `${name}--default`, `${name}--${this.placement}`];
    const dialogStyle = { width: GetCSSValue(this.width), transform: this.transform };
    return (
      <div class={this.ctxClass} style={{ zIndex: this.zIndex }} v-transfer-dom={this.attachTarget}>

        {
          this.isModal && <div class={this.maskClass} onClick={this.overlayAction}></div>
        }
        {/* 非模态形态下draggable为true才允许拖拽 */}
        <div class={dialogClass} style={dialogStyle} v-draggable={!this.isModal && this.draggable}>
          {this.renderTitle()}
          {this.renderBody()}
          {this.renderFooter(h)}
          {this.renderCloseBtn()}
        </div>
      </div>
    );
  },
});
