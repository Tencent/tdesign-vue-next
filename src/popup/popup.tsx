import { defineComponent, Transition } from 'vue';
import { createPopper, Placement } from '@popperjs/core';
import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import { on, off, once, getAttach } from '../utils/dom';
import props from './props';
import { renderTNodeJSX, renderContent } from '../utils/render-tnode';
import { PopupVisibleChangeContext } from './type';
import { ClassName, Styles } from '../common';
import setStyle from '../utils/set-style';
import { emitEvent } from '../utils/event';
import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import useDestroyOnClose from '../hooks/useDestroyOnClose';

const stop = (e: MouseEvent) => e.stopPropagation();

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
  name: 'TPopup',

  components: {
    Transition,
  },

  provide(this: any) {
    return {
      popup: this,
    };
  },

  inject: {
    popup: {
      default: undefined,
    },
  },

  props: {
    ...props,
    expandAnimation: {
      type: Boolean,
    },
  },
  emits: ['visible-change', 'enter', 'leave'],

  setup() {
    const COMPONENT_NAME = usePrefixClass('popup');
    const { STATUS } = useCommonClassName();
    useDestroyOnClose();
    return {
      STATUS,
      COMPONENT_NAME,
    };
  },

  data() {
    return {
      currentPlacement: '',
      popperElm: null,
      referenceElm: null,
      resizeSensor: null,
      popper: null,
      timeout: null,
      refOverlayElm: null,
      hasDocumentEvent: false,
      offEvents: [],
    };
  },
  computed: {
    overlayClasses(): ClassName {
      const base = [
        `${this.COMPONENT_NAME}__content`,
        {
          [`${this.COMPONENT_NAME}__content--arrow`]: this.showArrow,
          [this.STATUS.disabled]: this.disabled,
        },
      ] as ClassName;
      return base.concat(this.overlayClassName);
    },
    hasTrigger(): Record<typeof triggers[number], boolean> {
      return triggers.reduce(
        (map, trigger) => ({
          ...map,
          [trigger]: this.trigger.includes(trigger),
        }),
        {} as any,
      );
    },
  },
  watch: {
    visible(val) {
      if (val) {
        this.updatePopper();
        if (!this.hasDocumentEvent && (this.hasTrigger['context-menu'] || this.hasTrigger.click)) {
          on(document, 'mousedown', this.handleDocumentClick);
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
        off(document, 'mousedown', this.handleDocumentClick);
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
      offEvents.push(on(reference, 'mouseenter', () => this.handleOpen({ trigger: 'trigger-element-hover' })));
      offEvents.push(on(reference, 'mouseleave', () => this.handleClose({ trigger: 'trigger-element-hover' })));
      offEvents.push(on(popperElm, 'mouseenter', () => this.handleOpen({ trigger: 'trigger-element-hover' }, true)));
      offEvents.push(
        on(popperElm, 'mouseleave', (ev: MouseEvent) => {
          const parent = (this as any).popup;
          let closeParent: boolean;
          if (parent?.visible) {
            const parentRect = parent.$refs.popper.getBoundingClientRect();
            // close parent if mouse isn't inside
            closeParent = !(
              ev.x > parentRect.left &&
              ev.x < parentRect.right &&
              ev.y > parentRect.top &&
              ev.y < parentRect.bottom
            );
          }
          this.handleClose({ trigger: 'trigger-element-hover' }, closeParent);
        }),
      );
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
  beforeUnmount() {
    if (this.popper && !this.visible) {
      this.popper.destroy();
      this.popper = null;
    }

    // remove popup element is important for table ellipsis
    const popperElement = this.$refs.popper as HTMLDivElement;
    if (popperElement) {
      (popperElement as HTMLDivElement)?.parentNode?.removeChild(popperElement);
    }

    const popperElm = this.$refs.popper as HTMLElement;
    if (popperElm && popperElm.parentNode === document.body) {
      popperElm.removeEventListener('click', stop);
      document.body.removeChild(popperElm);
    }
    this.offEvents.forEach((handler) => handler && handler());
  },

  methods: {
    createPopper() {
      const currentPlacement = this.placement;
      const popperElm = this.$refs.popper as HTMLElement;

      const overlayContainer = getAttach(this.attach);
      overlayContainer.appendChild(popperElm);
      if (this.popper && this.popper.destroy) {
        this.popper.destroy();
      }

      const placement = placementMap[currentPlacement] as Placement;

      this.popper = createPopper(this.referenceElm, popperElm, {
        placement,
        onFirstUpdate: () => {
          this.$nextTick(this.updatePopper);
        },
      });
      popperElm.addEventListener('click', stop);
      // 监听trigger元素尺寸变化
      this.resizeSensor = new ResizeSensor(this.referenceElm, () => {
        this.popper && this.popper.update();
        this.updateOverlayStyle();
      });
    },

    updatePopper() {
      if (this.popper) {
        this.popper.update();
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
        const userOverlayStyle = overlayStyle(referenceElm, refOverlayElm);
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

    destroyPopper(el: HTMLElement) {
      if (this.popper) {
        this.popper.destroy();
        this.popper = null;
        if (this.destroyOnClose) {
          const popperElm = this.$refs.popper as HTMLElement;
          popperElm.parentNode.removeChild(popperElm);
        }
      }
    },

    handleToggle(context: PopupVisibleChangeContext) {
      this.emitPopVisible(!this.visible, context);
    },

    handleOpen(context: Pick<PopupVisibleChangeContext, 'trigger'>, openParent?: boolean) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(
        () => {
          this.emitPopVisible(true, context);
        },
        this.clickTrigger ? 0 : showTimeout,
      );
      // keep parent open (recursively)
      if (openParent) {
        (this as any).popup?.handleOpen(context, true);
      }
    },
    handleClose(context: Pick<PopupVisibleChangeContext, 'trigger'>, closeParent?: boolean) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(
        () => {
          this.emitPopVisible(false, context);
        },
        this.clickTrigger ? 0 : hideTimeout,
      );
      // close parent (recursively)
      if (closeParent) {
        (this as any).popup?.handleClose({ trigger: 'trigger-element-hover' }, true);
      }
    },
    handleDocumentClick(e: Event) {
      const popperElm = this.$refs.popper as HTMLElement;
      if (!this.$el || this.$el.contains(e.target as Element) || !popperElm || popperElm.contains(e.target as Node))
        return;
      this.emitPopVisible(false, { trigger: 'document' });
    },
    emitPopVisible(val: boolean, context: PopupVisibleChangeContext) {
      this.$nextTick(() => {
        emitEvent(this, 'visible-change', val, context);
      });
    },
  },

  render() {
    return (
      <div class={`${this.COMPONENT_NAME}__reference`}>
        <transition
          name={this.expandAnimation ? `${this.COMPONENT_NAME}--animation-expand` : `${this.COMPONENT_NAME}--animation`}
          appear
          onAfterLeave={this.destroyPopper}
        >
          <div
            class={this.COMPONENT_NAME}
            ref="popper"
            v-show={!this.disabled && this.visible}
            role="tooltip"
            aria-hidden={this.disabled || !this.visible ? 'true' : 'false'}
            style={{ zIndex: this.zIndex }}
            onMouseenter={(e) => this.$emit('enter', e)}
            onMouseleave={(e) => this.$emit('leave', e)}
          >
            <div class={this.overlayClasses} ref="overlay">
              {renderTNodeJSX(this, 'content')}
              {this.showArrow && <div class={`${this.COMPONENT_NAME}__arrow`}></div>}
            </div>
          </div>
        </transition>
        {renderContent(this, 'default', 'triggerElement')}
      </div>
    );
  },
});
