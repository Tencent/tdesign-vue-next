import { defineComponent, Transition } from 'vue';
import { createPopper } from '@popperjs/core';
import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import config from '../config';
import CLASSNAMES from '../utils/classnames';
import { on, off, addClass, removeClass, getAttach } from '../utils/dom';
import props from './props';
import { renderTNodeJSX, renderContent } from '../utils/render-tnode';
import { PopupVisibleChangeContext } from './type';

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

  props: { ...props },

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
      const base =  [
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

    this.createPopperJS();
    const reference = this.referenceElm;
    const popper = this.popperElm;
    // 无论哪种触发方式都支持 esc 隐藏浮层
    on(reference, 'keydown', this.handleKeydown);
    if (this.clickTrigger) {
      on(reference, 'click', (e: MouseEvent) => this.doToggle({ e, trigger: 'trigger-element-click' }));
    }
    if (this.hoverTrigger) {
      const show = () => this.doShow({ trigger: 'trigger-element-hover' });
      const close = () => this.doClose({ trigger: 'trigger-element-hover' });
      on(reference, 'mouseenter', show);
      on(popper, 'mouseenter', show);
      on(reference, 'mouseleave', close);
      on(popper, 'mouseleave', close);
    }
    if (this.focusTrigger) {
      if (reference.querySelector('input, textarea')) {
        on(reference, 'focusin', () => this.doShow({ trigger: 'trigger-element-focus' }));
        on(reference, 'focusout', () => this.doClose({ trigger: 'trigger-element-blur' }));
      } else {
        on(reference, 'mousedown', () => this.doShow({ trigger: 'trigger-element-click' }));
        on(reference, 'mouseup', () => this.doClose({ trigger: 'trigger-element-click' }));
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
    off(reference, 'mouseup', this.doClose);
    off(reference, 'mousedown', this.doShow);
    off(reference, 'focusin', this.doShow);
    off(reference, 'focusout', this.doClose);
    off(reference, 'mousedown', this.doShow);
    off(reference, 'mouseup', this.doClose);
    off(reference, 'mouseleave', this.doClose);
    off(reference, 'mouseenter', this.doShow);
  },
  methods: {
    createPopperJS(): void {
      const overlayContainer = getAttach(this.attach);
      overlayContainer.appendChild(this.popperElm);
      if (this.popperJS && this.popperJS.destroy) {
        this.popperJS.destroy();
      }
      this.popperJS = createPopper(this.referenceElm, this.popperElm, {
        placement: placementMap[this.currentPlacement],
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
          Object.keys(styles).map(key => `${key}: ${styles[key]}`)
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
    doShow(context: Pick<PopupVisibleChangeContext, 'trigger'>): void {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.emitPopVisible(true, context);
      }, this.clickTrigger ? 0 : showTimeout);
    },
    doClose(context: Pick<PopupVisibleChangeContext, 'trigger'>): void {
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
        this.doClose({ trigger: 'keydown-esc' });
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
  },

  render() {
    return (
      <div class={`${name}-reference`}>
        <transition name={`${name}_animation`} appear>
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
              {this.showArrow && <div class={`${name}__arrow`} data-popper-arrow></div>}
            </div>
          </div>
        </transition>
        {renderContent(this, 'default', 'triggerElement')}
      </div>
    );
  },
});
