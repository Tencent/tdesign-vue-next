import {
  defineComponent,
  Transition,
  ref,
  Ref,
  computed,
  ComputedRef,
  watch,
  inject,
  provide,
  InjectionKey,
  onUnmounted,
  onMounted,
} from 'vue';
import { createPopper, Placement } from '@popperjs/core';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import { on, off, once } from '../utils/dom';
import { renderTNodeJSX, renderContent } from '../utils/render-tnode';
import setStyle from '../_common/js/utils/set-style';
import props from './props';
import { PopupVisibleChangeContext, TdPopupProps } from './type';
import Container from './container';

const name = `${prefix}-popup`;
const showTimeout = 250;
const hideTimeout = 150;
const triggers = ['click', 'hover', 'focus', 'context-menu'] as const;

type TriggerMap = Readonly<Record<typeof triggers[number], boolean>>;

const injectionKey = Symbol('popup') as InjectionKey<{
  preventClosing: (preventing: boolean) => void;
  emitVisible: (visible: boolean, context: PopupVisibleChangeContext) => void;
  contentClicked: Ref<boolean>;
  mouseInRange: Ref<boolean>;
  onMouseLeave: (ev: MouseEvent) => void;
  hasTrigger: ComputedRef<TriggerMap>;
}>;

function getPopperPlacement(placement: TdPopupProps['placement']) {
  return placement.replace(/-(left|top)$/, '-start').replace(/-(right|bottom)$/, '-end') as Placement;
}

export default defineComponent({
  name: 'TPopup',

  props: {
    ...props,
    expandAnimation: {
      type: Boolean,
    },
  },
  emits: ['visible-change'],
  setup(props, { emit }) {
    /** popperjs instance */
    let popper: ReturnType<typeof createPopper>;
    /** timeout id */
    let timeoutId: ReturnType<typeof setTimeout>;
    let hasDocumentEvent = false;

    /** if a trusted action (opening or closing) is prevented, increase this flag */
    const visibleState = ref(0);
    const mouseInRange = ref(false);
    /** mark popup as clicked when mousedown, reset after mouseup */
    const contentClicked = ref(false);
    /**
     * mark reference as clicked when click,
     * reset after click event bubbles to document
     */
    const triggerClicked = ref(false);

    const triggerEl = ref<HTMLElement>(null);
    const overlayEl = ref<HTMLElement>(null);
    const popperEl = ref<HTMLElement>(null);
    const containerRef = ref<typeof Container>(null);

    const parent = inject(injectionKey, undefined);

    const overlayClasses = computed(() => [
      `${name}__content`,
      {
        [`${name}__content--text`]: props.content === 'string',
        [`${name}__content--arrow`]: props.showArrow,
        [CLASSNAMES.STATUS.disabled]: props.disabled,
      },
      props.overlayClassName,
    ]);
    const hasTrigger = computed(() =>
      triggers.reduce(
        (map, trigger) => ({
          ...map,
          [trigger]: props.trigger.includes(trigger),
        }),
        {} as TriggerMap,
      ),
    );

    function updateOverlayStyle() {
      const { overlayStyle } = props;

      if (!triggerEl.value || !overlayEl.value) return;
      if (typeof overlayStyle === 'function') {
        setStyle(overlayEl.value, overlayStyle(triggerEl.value, overlayEl.value));
      } else if (typeof overlayStyle === 'object') {
        setStyle(overlayEl.value, overlayStyle);
      }
    }

    function updatePopper() {
      if (!popperEl.value || !props.visible) return;
      if (popper) {
        popper.update();
        return;
      }

      popper = createPopper(triggerEl.value, popperEl.value, {
        placement: getPopperPlacement(props.placement),
      });
    }

    /**
     * destroy popper IF NEEDED
     */
    function destroyPopper() {
      if (popper) {
        popper?.destroy();
        popper = null;
      }
      if (props.destroyOnClose) {
        containerRef.value?.unmountContent();
      }
    }

    function emitVisible(visible: boolean, context: PopupVisibleChangeContext) {
      if (props.disabled || visible === props.visible) return;
      if (!visible && visibleState.value > 1) return;
      if (visible && mouseInRange.value) return;
      emit('visible-change', visible, context);
      if (typeof props.onVisibleChange === 'function') {
        props.onVisibleChange(visible, context);
      }
    }

    function preventClosing(preventing: boolean) {
      parent?.preventClosing(preventing);
      if (preventing) {
        visibleState.value += 1;
      } else if (visibleState.value) {
        visibleState.value -= 1;
        if (!visibleState.value) {
          emitVisible(false, {});
          if (parent?.hasTrigger.value.hover && !parent?.mouseInRange) {
            parent.emitVisible(false, {});
          }
        }
      }
    }

    function handleToggle(context: PopupVisibleChangeContext) {
      emitVisible(!props.visible, context);
    }

    function handleOpen(context: Pick<PopupVisibleChangeContext, 'trigger'>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(
        () => {
          emitVisible(true, context);
        },
        hasTrigger.value.click ? 0 : showTimeout,
      );
    }

    function handleClose(context: Pick<PopupVisibleChangeContext, 'trigger'>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(
        () => {
          emitVisible(false, context);
        },
        hasTrigger.value.click ? 0 : hideTimeout,
      );
    }

    function handleDocumentClick() {
      if (contentClicked.value || triggerClicked.value) {
        triggerClicked.value = false;
        // clear the flag if mouseup handler is failed
        setTimeout(() => {
          contentClicked.value = false;
        });
        return;
      }
      visibleState.value = 0;
      emitVisible(false, { trigger: 'document' });
    }

    function onMouseEnter() {
      mouseInRange.value = true;
      handleOpen({});
    }

    function onMouseLeave(ev: MouseEvent) {
      // 子元素存在打开的 popup 时，ui 可能重叠，而 dom 节点多是并列关系
      // 需要做碰撞检测去阻止父级 popup 关闭
      if (visibleState.value > 1) {
        const rect = popperEl.value.getBoundingClientRect();
        if (ev.x > rect.x && ev.x < rect.x + rect.width && ev.y > rect.y && ev.y < rect.y + rect.height) return;
      }
      mouseInRange.value = false;
      handleClose({});

      // parent can no longer monitor mouse leave
      if (parent?.mouseInRange) {
        parent.onMouseLeave(ev);
      }
    }

    onMounted(() => {
      if (hasTrigger.value.hover) {
        on(triggerEl.value, 'mouseenter', () => handleOpen({ trigger: 'trigger-element-hover' }));
        on(triggerEl.value, 'mouseleave', () => handleClose({ trigger: 'trigger-element-hover' }));
      } else if (hasTrigger.value.focus) {
        on(triggerEl.value, 'focusin', () => handleOpen({ trigger: 'trigger-element-focus' }));
        on(triggerEl.value, 'focusout', () => handleClose({ trigger: 'trigger-element-blur' }));
      } else if (hasTrigger.value.click) {
        on(triggerEl.value, 'click', (e: MouseEvent) => {
          // override nested popups with trigger hover due to higher priority
          visibleState.value = 0;
          handleToggle({ e, trigger: 'trigger-element-click' });
        });
      } else if (hasTrigger.value['context-menu']) {
        on(triggerEl.value, 'contextmenu', (e: MouseEvent) => {
          e.preventDefault();
          // MouseEvent.button
          // 2: Secondary button pressed, usually the right button
          e.button === 2 && handleToggle({ trigger: 'context-menu' });
        });
      }
      if (!hasTrigger.value['context-menu']) {
        on(triggerEl.value, 'click', () => {
          triggerClicked.value = true;
        });
      }
    });
    onUnmounted(destroyPopper);

    watch(
      () => props.overlayStyle,
      () => {
        if (popper) {
          popper.update();
          updateOverlayStyle();
        }
      },
    );

    watch(contentClicked, (clicked) => {
      // sync lock state recursively
      if (parent) {
        parent.contentClicked.value = clicked;
      }
    });

    watch(
      () => props.visible,
      (visible) => {
        if (visible) {
          preventClosing(true);
          if (!hasDocumentEvent) {
            on(document, 'click', handleDocumentClick);
            hasDocumentEvent = true;
          }
          // focus trigger esc 隐藏浮层
          if (triggerEl.value && hasTrigger.value.focus) {
            once(triggerEl.value, 'keydown', (ev: KeyboardEvent) => {
              if (ev.code === 'Escape') {
                handleClose({ trigger: 'keydown-esc' });
              }
            });
          }
        } else {
          preventClosing(false);
          // destruction is delayed until after animation ends
          off(document, 'click', handleDocumentClick);
          hasDocumentEvent = false;
          mouseInRange.value = false;
        }
      },
    );

    provide(injectionKey, {
      preventClosing,
      emitVisible,
      contentClicked,
      mouseInRange,
      onMouseLeave,
      hasTrigger,
    });

    return {
      triggerEl,
      overlayEl,
      popperEl,
      // computed
      overlayClasses,
      hasTrigger,
      // data
      popper,
      visibleState,
      mouseInRange,
      contentClicked,
      triggerClicked,
      // methods
      /**
       * @public
       */
      getOverlay() {
        return overlayEl.value;
      },
      updatePopper,
      /**
       * destroy popper IF NEEDED
       */
      destroyPopper,
      updateOverlayStyle,
      emitVisible,
      onMouseEnter,
      onMouseLeave,
    };
  },
  render() {
    const { visible, destroyOnClose, hasTrigger, onScroll } = this;
    const content = renderTNodeJSX(this, 'content');
    const hidePopup = this.hideEmptyPopup && ['', undefined, null].includes(content);

    const overlay =
      visible || !destroyOnClose ? (
        <div
          class={name}
          ref="popperEl"
          style={hidePopup && { visibility: 'hidden', pointerEvents: 'none' }}
          vShow={visible}
          onMousedown={() => {
            this.contentClicked = true;
          }}
          onMouseup={() => {
            // make sure to execute after document click is triggered
            setTimeout(() => {
              // clear the flag which was set by mousedown
              this.contentClicked = false;
            });
          }}
          {...(hasTrigger.hover && {
            onMouseenter: this.onMouseEnter,
            onMouseleave: this.onMouseLeave,
          })}
        >
          <div
            class={this.overlayClasses}
            ref="overlayEl"
            {...(onScroll && {
              onScroll(e: WheelEvent) {
                onScroll({ e });
              },
            })}
          >
            {content}
            {this.showArrow && <div class={`${name}__arrow`} />}
          </div>
        </div>
      ) : null;

    return (
      <Container
        ref="containerRef"
        forwardRef={(ref) => (this.triggerEl = ref)}
        onContentMounted={() => {
          if (visible) {
            this.updatePopper();
            this.updateOverlayStyle();
          }
        }}
        onResize={() => {
          if (visible) {
            this.updatePopper();
          }
        }}
        visible={visible}
        attach={this.attach}
      >
        {{
          content: () => (
            <Transition
              name={this.expandAnimation ? `${name}--animation-expand` : `${name}--animation`}
              appear
              onBeforeEnter={this.updatePopper}
              onAfterEnter={this.updatePopper}
              onAfterLeave={this.destroyPopper}
            >
              {overlay}
            </Transition>
          ),
          default: () => renderContent(this, 'default', 'triggerElement'),
        }}
      </Container>
    );
  },
});
