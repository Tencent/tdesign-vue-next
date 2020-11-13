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
  let originX = '-25%';
  let originY = '-25%';

  if (left) {
    translateX = `${translateX} - ${GetCSSValue(left)}`;
    originX = `${originX} - ${GetCSSValue(left)}`;
  }
  if (right) {
    translateX = `${translateX} + ${GetCSSValue(right)}`;
    originX = `${originX} + ${GetCSSValue(right)}`;
  }
  if (top) {
    translateY = `${translateY} - ${GetCSSValue(top)}`;
    originY = `${originY} - ${GetCSSValue(top)}`;
  }
  if (bottom) {
    translateY = `${translateY} + ${GetCSSValue(bottom)}`;
    originY = `${originY} + ${GetCSSValue(bottom)}`;
  }

  return {
    transform: `translate(calc(${translateX}),calc(${translateY}))`,
    transformOrigin: `calc(${originX}) calc(${originY})`,
  };
}

// 注册元素的拖拽事件
function InitDragEvent(dragBox: HTMLElement) {
  const target = dragBox;
  target.addEventListener('mousedown', (targetEvent: MouseEvent) => {
    // 算出鼠标相对元素的位置
    const disX = targetEvent.clientX - target.offsetLeft;
    const disY = targetEvent.clientY - target.offsetTop;
    function mouseMoverHander(documentEvent: MouseEvent) {
      // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
      const left = documentEvent.clientX - disX;
      const top = documentEvent.clientY - disY;
      // 移动当前元素
      target.style.left = `${left}px`;
      target.style.top = `${top}px`;
    }
    function mouseUpHandler() {
      // 鼠标弹起来的时候不再移动
      document.removeEventListener('mousemove', mouseMoverHander);
      // 预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
      document.removeEventListener('mouseup', mouseUpHandler);
    }
    // 元素按下时注册document鼠标监听事件
    document.addEventListener('mousemove', mouseMoverHander);
    // 鼠标弹起来移除document鼠标监听事件
    document.addEventListener('mouseup', mouseUpHandler);
  });
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
    confirmBtn: {
      type: [String, Function, Object, Boolean],
      default: '确认',
    },
    cancelBtn: {
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
    // ctxClass(): ClassName {
    //   // 关闭时候是否卸载元素 this.$el.parentNode.removeChild(this.$el)
    //   const closeMode = this.destroyOnClose ? 'display' : 'visable';
    //   return [
    //     `${name}-ctx`,
    //     this.visible ? `${prefix}-is-${closeMode}` : `${prefix}-not-${closeMode}`,
    //   ];
    // },
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
      // if (value) {
      //   this.$emit('opened');
      // } else {
      //   this.$emit('closed');
      // }
      // 关闭时，销毁元素
      // if (!value && this.destroyOnClose) {
      //   this.$el.parentNode.removeChild(this.$el);
      // }
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
  created() {
    this.initOffsetWatch();
  },
  data() {
    return {
      transform: {},
    };
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
        this.closeEventEmit('keydown-esc', e);
      }
    },
    overlayAction(e: Event) {
      this.closeEventEmit('click-overlay', e);
    },
    closeBtnAcion(e: Event) {
      this.closeEventEmit('click-close-btn', e);
    },
    close() {
      this.changeVisible(false);
    },
    changeVisible(visible: boolean) {
      this.$emit('visible-change', visible);
    },
    cancelBtnAction(e: Event) {
      this.closeEventEmit('click-cancel', e);
    },
    confirmBtnAction(e: Event) {
      this.closeEventEmit('click-confirm', e);
    },
    // 打开弹窗动画结束时事件
    afterEnter(el: Element) {
      this.$emit('opened', el);
    },
    // 关闭弹窗动画结束时事件
    afterLeave(el: Element) {
      this.$emit('closed', el);
    },
    // 先判断是否有该事件，有则派发当前事件，传递close函数出去
    // 再判断是否有close事件，有则派发，传递close函数出去
    // 前面都没有则执行关闭组件的方法
    closeEventEmit(name: string, event: Event) {
      if (this.hasEventOn(name)) {
        this.$emit(name, this.close, event);
      } else if (this.hasEventOn('close')) {
        this.$emit('close', this.close, event);
      } else {
        this.close();
      }
    },
    // Vue在引入阶段对事件的处理还做了哪些初始化操作。Vue在实例上用一个_events属性存贮管理事件的派发和更新，
    // 暴露出$on, $once, $off, $emit方法给外部管理事件和派发执行事件
    // 所以通过判断_events某个事件下监听函数数组是否超过一个，可以判断出组件是否监听了当前事件
    hasEventOn(name: string) {
      // _events 因没有被暴露在vue实例接口中，只能把这个规则注释掉
      /* eslint-disable dot-notation */
      const eventFuncs = this['_events']?.[name];
      return !!eventFuncs?.length;
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
          {this.renderDefaultBtn(h, 'cancel', this.cancelBtn)}
          {this.renderDefaultBtn(h, 'confirm', this.confirmBtn)}
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
      return isShow && (<span class={`${name}__close`}>
        {view || defaultView}
      </span>);
    },
    renderDialog(h: CreateElement) {
      const dialogClass = [`${name}`, `${name}--default`, `${name}--${this.placement}`];
      const dialogStyle: any = { width: GetCSSValue(this.width), ...this.transform };
      return (
        // /* 非模态形态下draggable为true才允许拖拽 */
        <div key='dialog' class={dialogClass} style={dialogStyle} v-draggable={!this.isModal && this.draggable}>
          {this.renderTitle()}
          {this.renderBody()}
          {this.renderFooter(h)}
          {this.renderCloseBtn()}
        </div>
      );
    },
  },
  render(h: CreateElement) {
    const maskView = this.isModal && <div key='mask' class={this.maskClass} onClick={this.overlayAction}></div>;
    const dialogView = this.renderDialog(h);
    const view = [maskView, dialogView];
    const ctxStyle: any = { zIndex: this.zIndex };
    const ctxClass = [`${name}-ctx`];
    return (
      <transition duration={300}
        name={`${name}-vue-zoom`}
        onAfterEnter={this.afterEnter}
        onAfterLeave={this.afterLeave}>
        {
          (!this.destroyOnClose || this.visible) && (
            <div v-show={this.visible} class={ctxClass} style={ctxStyle}
              v-transfer-dom={this.attachTarget}>
              {view}
            </div>
          )
        }
      </transition>
    );
  },
});


