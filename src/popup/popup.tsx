import { defineComponent, Transition } from 'vue';
import { createPopper, Placement } from '@popperjs/core';
import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import config from '../config';
import CLASSNAMES from '../utils/classnames';
import {
  on, off, once, getAttach,
} from '../utils/dom';
import props from './props';
import { renderTNodeJSX, renderContent } from '../utils/render-tnode';
import { PopupVisibleChangeContext } from './type';
import { ClassName, Styles } from '../common';
import setStyle from '../utils/set-style';

const { prefix } = config;

const stop = (e: MouseEvent): void => e.stopPropagation();
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
const triggers = ['click', 'hover', 'focus', 'context-menu'] as const;

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
      offEvents: [],
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
    hasTrigger(): Record<typeof triggers[number], boolean> {
      return triggers.reduce((map, trigger) => ({
        ...map,
        [trigger]: this.trigger.includes(trigger),
      }), {} as any);
    },
  },
  watch: {
    visible(val) {
      if (val) {
        this.updatePopper();
        if (!this.hasDocumentEvent && (this.hasTrigger['context-menu'] || this.hasTrigger.click)) {
          on(document, 'click', this.handleDocumentClick);
          this.hasDocumentEvent = true;
        }
        // focus trigger esc 隐藏浮层
        if (this.referenceElm && this.hasTrigger.focus) {
          once(this.referenceElm, 'keydown', (ev: KeyboardEvent) => {
            if (ev.code === 'Escape') {
              this.handleClose({ trigger: 'keydown-esc' });
            }
          });
        }
      } else {
        off(document, 'click', this.handleDocumentClick);
        this.hasDocumentEvent = false;
      }
    },
    overlayStyle() {
      if (this.popper) {
        this.popper.update();
        this.updateOverlayStyle();
      }
    },
  },
  mounted() {
    if (typeof this.content === 'string') {
      // set 480px max width when the content type is string
      this.setOverlayStyle({ maxWidth: '480px' });
    }

    this.referenceElm = this.referenceElm || this.$el;

    if (!this.referenceElm || !this.$refs.popper) return;

    if (this.visible) {
      this.createPopper();
      this.updateOverlayStyle();
    }

    const reference = this.referenceElm;
    const popperElm = this.$refs.popper as HTMLElement;

    const offEvents: (() => void)[] = [];

    if (this.hasTrigger.click) {
      offEvents.push(
        on(reference, 'click', (e: MouseEvent) => this.handleToggle({ e, trigger: 'trigger-element-click' })),
      );
    }

    if (this.hasTrigger.hover) {
      const open = () => this.handleOpen({ trigger: 'trigger-element-hover' });
      const close = () => this.handleClose({ trigger: 'trigger-element-hover' });
      offEvents.push(on(reference, 'mouseenter', open));
      offEvents.push(on(reference, 'mouseleave', close));
      offEvents.push(on(popperElm, 'mouseenter', open));
      offEvents.push(on(popperElm, 'mouseleave', close));
    }

    if (this.hasTrigger.focus) {
      if (reference.querySelector('input,textarea')) {
        offEvents.push(on(reference, 'focusin', () => this.handleOpen({ trigger: 'trigger-element-focus' })));
        offEvents.push(on(reference, 'focusout', () => this.handleClose({ trigger: 'trigger-element-blur' })));
      } else {
        offEvents.push(on(reference, 'mousedown', () => this.handleOpen({ trigger: 'trigger-element-click' })));
        offEvents.push(on(reference, 'mouseup', () => this.handleClose({ trigger: 'trigger-element-click' })));
      }
    }
    if (this.hasTrigger['context-menu']) {
      reference.oncontextmenu = () => false;
      offEvents.push(
        on(reference, 'mousedown', (e: MouseEvent) => {
          // MouseEvent.button
          // 2: Secondary button pressed, usually the right button
          e.button === 2 && this.handleToggle({ trigger: 'context-menu' });
        }),
      );
    }
    this.offEvents = offEvents;
  },
  beforeUnmount(): void {
    if (this.popper && !this.visible) {
      this.popper.destroy();
      this.popper = null;
    }

    const popperElm = this.$refs.popper as HTMLElement;
    if (popperElm && popperElm.parentNode === document.body) {
      popperElm.removeEventListener('click', stop);
      document.body.removeChild(popperElm);
    }
    this.offEvents.forEach((handler) => handler && handler());
  },
  methods: {
    createPopper(): void {
      const currentPlacement = this.placement;
      const popperElm = this.$refs.popper as HTMLElement;

      const overlayContainer = getAttach(this.attach);
      overlayContainer.appendChild(popperElm);
      if (this.popper && this.popper.destroy) {
        this.popper.destroy();
      }

      let placement = placementMap[currentPlacement] as Placement;
      if (this.expandAnimation) {
        // 如果有展开收起动画 需要在beforeEnter阶段设置max-height为0 这导致popperjs无法知道overflow了 所以需要在这里手动判断设置placment
        popperElm.style.display = '';
        this.presetMaxHeight = parseInt(getComputedStyle(this.getContentElm(popperElm)).maxHeight, 10) || Infinity;
        const referenceElmBottom = innerHeight - this.referenceElm.getBoundingClientRect().bottom;
        const referenceElmTop = this.referenceElm.getBoundingClientRect().top;
        if (referenceElmBottom < popperElm.scrollHeight && referenceElmTop >= popperElm.scrollHeight) {
          placement = /left/.test(currentPlacement) ? 'top-start' : 'top-end';
        }
        popperElm.style.display = 'none';
      }

      this.popperJS = createPopper(this.referenceElm, popperElm, {
        placement,
        onFirstUpdate: () => {
          this.$nextTick(this.updatePopper);
        },
      });
      popperElm.addEventListener('click', stop);
      // 监听trigger元素尺寸变化
      this.resizeSensor = new ResizeSensor(this.referenceElm, () => {
        this.popper && this.popperJS.update();
        this.updateOverlayStyle();
      });
    },

    updatePopper(): void {
      if (this.popperJS) {
        this.popperJS.update();
      } else {
        this.createPopper();
      }
    },

    updateOverlayStyle() {
      const { overlayStyle } = this;
      const referenceElm = this.$el as HTMLElement;
      if (!this.$refs) return;
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
        setStyle(refOverlayElm, styles);
      }
    },

    doDestroy(forceDestroy: boolean): void {
      if (!this.popperJS || (this.visible && !forceDestroy)) return;
      this.popperJS.destroy();
      this.popperJS = null;
    },

    destroyPopper(el: HTMLElement): void {
      this.resetExpandStyles(el);
      if (this.popper) {
        this.popper.destroy();
        this.popper = null;
        if (this.destroyOnClose) {
          const popperElm = this.$refs.popper as HTMLElement;
          popperElm.parentNode.removeChild(popperElm);
        }
      }
    },

    handleToggle(context: PopupVisibleChangeContext): void {
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
    handleDocumentClick(e: Event): void {
      const popperElm = this.$refs.popper as HTMLElement;
      if (!this.$el || this.$el.contains(e.target as Element)
        || !popperElm || popperElm.contains(e.target as Node)) return;
      this.emitPopVisible(false, { trigger: 'document' });
    },
    emitPopVisible(val: boolean, context: PopupVisibleChangeContext) {
      this.$nextTick(() => {
        this.$emit('visible-change', val, context);
      });
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
        if (this.presetMaxHeight !== Infinity) {
          content.style.maxHeight = '';
        }
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
              {renderTNodeJSX(this, 'content')}
              {this.showArrow && <div class={`${name}__arrow`}></div>}
            </div>
          </div>
        </transition>
        {renderContent(this, 'default', 'triggerElement')}
      </div>
    );
  },
});
