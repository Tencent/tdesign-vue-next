import { defineComponent, Transition, ComponentPublicInstance } from 'vue';
import { createPopper } from '@popperjs/core';
import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import config from '../config';
import CLASSNAMES from '../utils/classnames';
import {
  on, off, addClass, removeClass, getAttach,
} from '../utils/dom';
import props from './props';
import { renderTNodeJSX, renderContent } from '../utils/render-tnode';
import { PopupVisibleChangeContext } from './type';
import { ClassName, Styles } from '../common';

const stop = (e: MouseEvent): void => e.stopPropagation();
const { prefix } = config;
const name = `${prefix}-popup`;
const placementMap = {
  top: 'top',
  'top-left': 'top-start',
  'top-right': 'top-end',
  bottom: 'bottom',
  'bottom-left': 'bottom-start',
  'bottom-right': 'bottom-end',
  left: 'left',
  'left-top': 'left-start',
  'left-bottom': 'left-end',
  right: 'right',
  'right-top': 'right-start',
  'right-bottom': 'right-end',
};
const showTimeout = 250;
const hideTimeout = 150;

export default defineComponent({
  name,

  components: {
    Transition,
  },

  props: {
    ...props,
    expandAnimation: {
      type: Boolean,
    },
  },

  emits: ['visible-change'],

  data() {
    return {
      name,
      currentPlacement: '',
      popperElm: null,
      referenceElm: null,
      resizeSensor: null,
      popperJS: null,
      timeout: null,
      refOverlayElm: null,
      hasDocumentEvent: false,
    };
  },
  computed: {
    overlayClasses(): ClassName {
      const base = [
        `${name}-content`,
        {
          [`${name}-content--arrow`]: this.showArrow,
          [CLASSNAMES.STATUS.disabled]: this.disabled,
        },
      ] as ClassName;
      return base.concat(this.overlayClassName);
    },
    manualTrigger(): boolean {
      return this.trigger.indexOf('manual') > -1;
    },
    hoverTrigger(): boolean {
      return this.trigger.indexOf('hover') > -1;
    },
    clickTrigger(): boolean {
      return this.trigger.indexOf('click') > -1;
    },
    focusTrigger(): boolean {
      return this.trigger.indexOf('focus') > -1;
    },
    contextMenuTrigger(): boolean {
      return this.trigger.indexOf('context-menu') > -1;
    },
  },
  watch: {
    visible(val) {
      if (val) {
        this.updatePopper();
        if (!this.hasDocumentEvent && (this.manualTrigger || this.contextMenuTrigger || this.clickTrigger)) {
          on(document, 'click', this.handleDocumentClick);
          this.hasDocumentEvent = true;
        }
      } else {
        this.destroyPopper();
        off(document, 'click', this.handleDocumentClick);
        this.hasDocumentEvent = false;
      }
    },
    overlayStyle: {
      handler() {
        if (this.popperJS) {
          this.popperJS.update();
          this.updateOverlayStyle();
        }
      },
      // 需要添加deep才能监听对象单个字段更新 https://v3.vuejs.org/guide/migration/watch.html#overview
      deep: true,
    },
  },
  mounted() {
    this.currentPlacement = this.currentPlacement || this.placement;
    this.popperElm = this.popperElm || this.$refs.popper;
    this.referenceElm = this.referenceElm || this.$el;
    if (!this.popperElm || !this.referenceElm) return;

    if (this.visible) {
      this.createPopperJS();
    }
    const reference = this.referenceElm;
    const popper = this.popperElm;
    // 无论哪种触发方式都支持 esc 隐藏浮层
    on(reference, 'keydown', this.handleKeydown);
    if (this.clickTrigger) {
      on(reference, 'click', (e: MouseEvent) => this.doToggle({ e, trigger: 'trigger-element-click' }));
    }
    if (this.hoverTrigger) {
      const show = () => this.handleOpen({ trigger: 'trigger-element-hover' });
      const close = () => this.handleClose({ trigger: 'trigger-element-hover' });
      on(reference, 'mouseenter', show);
      on(popper, 'mouseenter', show);
      on(reference, 'mouseleave', close);
      on(popper, 'mouseleave', close);
    }
    if (this.focusTrigger) {
      if (reference.querySelector('input, textarea')) {
        on(reference, 'focusin', () => this.handleOpen({ trigger: 'trigger-element-focus' }));
        on(reference, 'focusout', () => this.handleClose({ trigger: 'trigger-element-blur' }));
      } else {
        on(reference, 'mousedown', () => this.handleOpen({ trigger: 'trigger-element-click' }));
        on(reference, 'mouseup', () => this.handleClose({ trigger: 'trigger-element-click' }));
      }
    }
    if (this.contextMenuTrigger) {
      reference.oncontextmenu = (): boolean => false;
      on(reference, 'mousedown', this.handleRightClick);
    }
    if (this.manualTrigger) {
      on(reference, 'click', () => this.doToggle({ trigger: 'trigger-element-click' }));
    }
    this.updateOverlayStyle();
  },
  beforeUnmount(): void {
    this.doDestroy(true);
    if (this.popperElm && this.popperElm.parentNode === document.body) {
      this.popperElm.removeEventListener('click', stop);
      document.body.removeChild(this.popperElm);
    }
  },
  unmounted(): void {
    const reference = this.referenceElm;
    off(reference, 'click', this.doToggle);
    off(reference, 'mouseup', this.handleClose);
    off(reference, 'mousedown', this.handleOpen);
    off(reference, 'focusin', this.handleOpen);
    off(reference, 'focusout', this.handleClose);
    off(reference, 'mousedown', this.handleOpen);
    off(reference, 'mouseup', this.handleClose);
    off(reference, 'mouseleave', this.handleClose);
    off(reference, 'mouseenter', this.handleOpen);
  },
  methods: {
    createPopperJS(): void {
      const overlayContainer = getAttach(this.attach);
      overlayContainer.appendChild(this.popperElm);
      if (this.popperJS && this.popperJS.destroy) {
        this.popperJS.destroy();
      }
      let placement = placementMap[this.currentPlacement];
      if (this.expandAnimation) {
        // 如果有展开收起动画 需要在beforeEnter阶段设置max-height为0 这导致popperjs无法知道overflow了 所以需要在这里手动判断设置placment
        this.popperElm.style.display = '';
        this.presetMaxHeight = parseInt(getComputedStyle(this.getContentElm(this.popperElm)).maxHeight, 10) || Infinity;
        const referenceElmBottom = innerHeight - this.referenceElm.getBoundingClientRect().bottom;
        const referenceElmTop = this.referenceElm.getBoundingClientRect().top;
        if (referenceElmBottom < this.popperElm.scrollHeight && referenceElmTop >= this.popperElm.scrollHeight) {
          placement = 'top-start';
        }
        this.popperElm.style.display = 'none';
      }

      this.popperJS = createPopper(this.referenceElm, this.popperElm, {
        placement,
        onFirstUpdate: () => {
          this.$nextTick(this.updatePopper);
        },
        modifiers: [
          {
            name: 'arrow',
            options: {
              padding: 5, // 5px from the edges of the popper
            },
          },
        ],
      });
      this.popperElm.addEventListener('click', stop);
      // 监听trigger元素尺寸变化
      this.resizeSensor = new ResizeSensor(this.referenceElm, () => {
        this.popperJS.update();
        this.updateOverlayStyle();
      });
    },

    updatePopper(): void {
      if (this.popperJS) {
        this.popperJS.update();
      } else {
        this.createPopperJS();
      }
    },

    updateOverlayStyle() {
      const { overlayStyle } = this;
      const referenceElm = this.$el as HTMLElement;
      const refOverlayElm = this.$refs.overlay as HTMLElement;
      if (typeof overlayStyle === 'function' && referenceElm && refOverlayElm) {
        const userOverlayStyle = overlayStyle(referenceElm);
        this.setOverlayStyle(userOverlayStyle);
      } else if (typeof overlayStyle === 'object' && refOverlayElm) {
        this.setOverlayStyle(overlayStyle);
      }
    },

    setOverlayStyle(styles: Styles) {
      const refOverlayElm = this.$refs.overlay as HTMLElement;
      if (typeof styles === 'object' && refOverlayElm) {
        refOverlayElm.setAttribute(
          'style',
          Object.keys(styles).map((key) => `${key}: ${styles[key]}`)
            .join(';'),
        );
      }
    },

    doDestroy(forceDestroy: boolean): void {
      if (!this.popperJS || (this.visible && !forceDestroy)) return;
      this.popperJS.destroy();
      this.popperJS = null;
    },

    destroyPopper(): void {
      if (this.popperJS) {
        if (this.destroyOnClose) {
          this.popperJS.destroy();
          this.popperJS = null;
          this.popperElm.parentNode.removeChild(this.popperElm);
        }
      }
    },

    doToggle(context: PopupVisibleChangeContext): void {
      this.emitPopVisible(!this.visible, context);
    },
    handleOpen(context: Pick<PopupVisibleChangeContext, 'trigger'>): void {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.emitPopVisible(true, context);
      }, this.clickTrigger ? 0 : showTimeout);
    },
    handleClose(context: Pick<PopupVisibleChangeContext, 'trigger'>): void {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.emitPopVisible(false, context);
      }, this.clickTrigger ? 0 : hideTimeout);
    },
    handleFocus(): void {
      addClass(this.referenceElm, 'focusing');
      if (this.clickTrigger || this.focusTrigger) {
        this.emitPopVisible(true, { trigger: 'trigger-element-focus' });
      }
    },
    handleClick(): void {
      removeClass(this.referenceElm, 'focusing');
    },
    handleBlur(): void {
      removeClass(this.referenceElm, 'focusing');
      if (this.clickTrigger || this.focusTrigger) {
        this.emitPopVisible(false, { trigger: 'trigger-element-blur' });
      }
    },
    handleKeydown(ev: KeyboardEvent): void {
      if (ev.code === 'Escape' && this.manualTrigger) { // esc
        this.handleClose({ trigger: 'keydown-esc' });
      }
    },
    handleDocumentClick(e: Event): void {
      const popper = this.popperElm;
      if (!this.$el
        || this.$el.contains(e.target as Element)
        || !popper
        || popper.contains(e.target as Node)) return;
      this.emitPopVisible(false, { trigger: 'document' });
    },
    handleRightClick(e: MouseEvent): void {
      if (e.button === 2) {
        this.doToggle({ trigger: 'context-menu' });
      }
    },
    emitPopVisible(val: boolean, context: PopupVisibleChangeContext) {
      // 处理按钮设置了disabled，里面子元素点击还是冒泡上来的情况
      if (this.referenceElm?.querySelector?.('button:disabled')) {
        return;
      }
      this.$emit('visible-change', val, context);
    },
    // 以下代码用于处理展开-收起动画相关,
    // 需要使用popup的组件设置非对外暴露的expandAnimation开启 对不需要展开收起动画的其他组件无影响
    getContentElm(el: HTMLElement): HTMLElement {
      if (this.expandAnimation) {
        const content = el.querySelector(`.${name}-content`) as HTMLElement;
        return content;
      }
      return null;
    },
    // 动画结束后 清除展开收起动画相关属性 避免造成不必要的影响
    resetExpandStyles(el: HTMLElement): void {
      const content = this.getContentElm(el);
      if (content) {
        content.style.overflow = '';
        content.style.maxHeight = '';
      }
    },
    // 设置展开动画初始条件
    beforeEnter(el: HTMLElement): void {
      const content = this.getContentElm(el);
      if (content) {
        content.style.overflow = 'hidden';
        content.style.maxHeight = '0';
      }
    },
    // 设置max-height,触发展开动画
    enter(el: HTMLElement): void {
      const content = this.getContentElm(el);
      if (content) {
        // 对比scrollHeight和组件自身设置的maxHeight 选择小的做展开动画
        const scrollHeight = Math.min(content.scrollHeight, this.presetMaxHeight);
        content.style.maxHeight = `${scrollHeight}px`;
      }
    },
    // 设置max-height为0,触发收起动画
    leave(el: HTMLElement): void {
      const content = this.getContentElm(el);
      if (content) content.style.maxHeight = '0';
    },
    // 设置收起动画初始条件
    beforeLeave(el: HTMLElement): void {
      const content = this.getContentElm(el);
      if (content) {
        content.style.overflow = 'hidden';
        content.style.maxHeight = `${content.scrollHeight}px`;
      }
    },
  },

  render() {
    return (
      <div class={`${name}-reference`}>
        <transition name={`${name}_animation`} appear
          onBeforeEnter={this.beforeEnter}
          onEnter={this.enter}
          onAfterEnter={this.resetExpandStyles}
          onBeforeLeave={this.beforeLeave}
          onLeave={this.leave}
          onAfterLeave={this.destroyPopper}
        >
          <div
            class={name}
            ref='popper'
            v-show={!this.disabled && this.visible}
            role='tooltip'
            aria-hidden={(this.disabled || !this.visible) ? 'true' : 'false'}
            style={{ zIndex: this.zIndex }}
          >
            <div class={this.overlayClasses} ref="overlay">
              {renderTNodeJSX(this as ComponentPublicInstance, 'content')}
              {this.showArrow && <div class={`${name}__arrow`} data-popper-arrow></div>}
            </div>
          </div>
        </transition>
        {renderContent(this as ComponentPublicInstance, 'default', 'triggerElement')}
      </div>
    );
  },
});
