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
  nextTick,
  toRefs,
} from 'vue';
import { createPopper, Placement } from '@popperjs/core';
import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import { on, off, once } from '../utils/dom';
import { renderTNodeJSX, renderContent } from '../utils/render-tnode';
import setStyle from '../_common/js/utils/set-style';
import props from './props';
import { PopupVisibleChangeContext, TdPopupProps } from './type';
import Container from './container';
import useVModel from '../hooks/useVModel';

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

function getPopperPlacement(placement: TdPopupProps['placement']): Placement {
  return placement.replace(/-(left|top)$/, '-start').replace(/-(right|bottom)$/, '-end') as Placement;
}

function attachListeners(elm: Ref<Element>) {
  const offs: Array<() => void> = [];
  return {
    // eslint-disable-next-line no-undef
    add<K extends keyof HTMLElementEventMap>(type: K, listener: (ev: HTMLElementEventMap[K]) => void) {
      on(elm.value, type, listener);
      offs.push(() => {
        off(elm.value, type, listener);
      });
    },
    clean() {
      offs.forEach((handler) => handler?.());
      offs.length = 0;
    },
  };
}

export default defineComponent({
  name: 'TPopup',

  props: {
    ...props,
    expandAnimation: {
      type: Boolean,
    },
  },
  setup(props, { expose }) {
    const { visible, modelValue } = toRefs(props);
    const [innerVisible, setInnerVisible] = useVModel(
      visible,
      modelValue,
      props.defaultVisible,
      props.onVisibleChange,
      'visible',
    );

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

    const triggerEl = ref<HTMLElement>(null);
    const overlayEl = ref<HTMLElement>(null);
    const popperEl = ref<HTMLElement>(null);
    const containerRef = ref<typeof Container>(null);

    const parent = inject(injectionKey, undefined);

    const prefixCls = usePrefixClass('popup');
    const { STATUS: commonCls } = useCommonClassName();
    const overlayCls: any = computed(() => [
      `${prefixCls.value}__content`,
      {
        [`${prefixCls.value}__content--text`]: typeof props.content === 'string',
        [`${prefixCls.value}__content--arrow`]: props.showArrow,
        [commonCls.value.disabled]: props.disabled,
      },
      props.overlayInnerClassName,
    ]);
    const hasTrigger = computed<TriggerMap>(() =>
      triggers.reduce(
        (map, trigger) => ({
          ...map,
          [trigger]: props.trigger.includes(trigger),
        }),
        {} as TriggerMap,
      ),
    );
    const delay = computed<{ open: number; close: number }>(() => {
      const delay = [].concat(props.delay ?? [250, 150]);
      return {
        open: delay[0],
        close: delay[1] ?? delay[0],
      };
    });

    function getOverlayStyle() {
      const { overlayStyle } = props;

      if (!triggerEl.value || !overlayEl.value) return;
      if (typeof overlayStyle === 'function') {
        return overlayStyle(triggerEl.value, overlayEl.value);
      }
      if (typeof overlayStyle === 'object') {
        return overlayStyle;
      }
    }

    function updateOverlayInnerStyle() {
      const { overlayInnerStyle } = props;

      if (!triggerEl.value || !overlayEl.value) return;
      if (typeof overlayInnerStyle === 'function') {
        setStyle(overlayEl.value, overlayInnerStyle(triggerEl.value, overlayEl.value));
      } else if (typeof overlayInnerStyle === 'object') {
        setStyle(overlayEl.value, overlayInnerStyle);
      }
    }

    function updatePopper() {
      if (!popperEl.value || !innerVisible.value) return;
      if (popper) {
        popper.update();
        return;
      }

      popper = createPopper(triggerEl.value, popperEl.value, {
        placement: getPopperPlacement(props.placement as TdPopupProps['placement']),
        onFirstUpdate: () => {
          nextTick(updatePopper);
        },
      });
    }

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
      if (props.disabled || visible === innerVisible.value) return;
      if (!visible && visibleState.value > 1) return;
      setInnerVisible(visible, context);
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
      emitVisible(!innerVisible.value, context);
    }

    function handleOpen(context: Pick<PopupVisibleChangeContext, 'trigger'>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(
        () => {
          emitVisible(true, context);
        },
        hasTrigger.value.click ? 0 : delay.value.open,
      );
    }

    function handleClose(context: Pick<PopupVisibleChangeContext, 'trigger'>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(
        () => {
          emitVisible(false, context);
        },
        hasTrigger.value.click ? 0 : delay.value.close,
      );
    }

    function handleDocumentClick(ev?: MouseEvent) {
      if (contentClicked.value) {
        // clear the flag after mousedown
        setTimeout(() => {
          contentClicked.value = false;
        });
        return;
      }
      // ignore document event when clicking trigger element
      if (triggerEl.value.contains(ev.target as Node)) return;
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

    const trigger = attachListeners(triggerEl);

    watch(
      () => [props.trigger, triggerEl.value],
      () => {
        if (!triggerEl.value) return;
        trigger.clean();
        if (hasTrigger.value.hover) {
          trigger.add('mouseenter', () => handleOpen({ trigger: 'trigger-element-hover' }));
          trigger.add('mouseleave', () => handleClose({ trigger: 'trigger-element-hover' }));
        } else if (hasTrigger.value.focus) {
          trigger.add('focusin', () => handleOpen({ trigger: 'trigger-element-focus' }));
          trigger.add('focusout', () => handleClose({ trigger: 'trigger-element-blur' }));
        } else if (hasTrigger.value.click) {
          trigger.add('click', (e) => {
            handleToggle({ e, trigger: 'trigger-element-click' });
          });
        } else if (hasTrigger.value['context-menu']) {
          trigger.add('contextmenu', (e) => {
            e.preventDefault();
            // MouseEvent.button
            // 2: Secondary button pressed, usually the right button
            e.button === 2 && handleToggle({ trigger: 'context-menu' });
          });
        }
      },
    );

    watch(
      () => [props.overlayStyle, props.overlayInnerStyle, overlayEl.value],
      () => {
        updateOverlayInnerStyle();
        updatePopper();
      },
    );
    const updateScrollTop: Function = inject('updateScrollTop', () => {});
    watch(
      () => [innerVisible.value, overlayEl.value],
      () => {
        if (innerVisible.value && overlayEl.value && updateScrollTop) {
          updateScrollTop?.(overlayEl.value);
        }
      },
    );

    watch(
      () => props.placement,
      () => {
        destroyPopper();
        updatePopper();
      },
    );

    watch(contentClicked, (clicked) => {
      // sync lock state recursively
      if (parent) {
        parent.contentClicked.value = clicked;
      }
    });

    watch(
      () => innerVisible.value,
      (visible) => {
        if (visible) {
          preventClosing(true);
          if (!hasDocumentEvent) {
            on(document, 'click', handleDocumentClick, true);
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
          off(document, 'click', handleDocumentClick, true);
          hasDocumentEvent = false;
          mouseInRange.value = false;
        }
      },
    );

    onUnmounted(() => {
      if (innerVisible.value) {
        parent?.preventClosing(false);
      }
      destroyPopper();
      off(document, 'click', handleDocumentClick, true);
      clearTimeout(timeoutId);
    });

    provide(injectionKey, {
      preventClosing,
      emitVisible,
      contentClicked,
      mouseInRange,
      onMouseLeave,
      hasTrigger,
    });

    expose({
      handleClose,
      updatePopper,
      getOverlay: () => {
        return overlayEl.value;
      },
    });

    return {
      containerRef,
      innerVisible,
      triggerEl,
      overlayEl,
      popperEl,
      prefixCls,
      overlayCls,
      hasTrigger,
      contentClicked,
      updatePopper,
      destroyPopper,
      getOverlayStyle,
      updateOverlayInnerStyle,
      emitVisible,
      onMouseEnter,
      onMouseLeave,
    };
  },
  render() {
    const { prefixCls, innerVisible, destroyOnClose, hasTrigger, getOverlayStyle, onScroll } = this;
    const content = renderTNodeJSX(this, 'content');
    const hidePopup = this.hideEmptyPopup && ['', undefined, null].includes(content);

    const overlay =
      innerVisible || !destroyOnClose ? (
        <div
          class={[prefixCls, this.overlayClassName]}
          ref="popperEl"
          style={[
            hidePopup && { visibility: 'hidden', pointerEvents: 'none' },
            { zIndex: this.zIndex },
            getOverlayStyle(),
          ]}
          vShow={innerVisible}
          onMousedown={() => {
            this.contentClicked = true;
          }}
          {...(hasTrigger.hover && {
            onMouseenter: this.onMouseEnter,
            onMouseleave: this.onMouseLeave,
          })}
        >
          <div
            class={this.overlayCls}
            ref="overlayEl"
            {...(onScroll && {
              onScroll(e: WheelEvent) {
                onScroll({ e });
              },
            })}
          >
            {content}
            {this.showArrow && <div class={`${prefixCls}__arrow`} />}
          </div>
        </div>
      ) : null;

    return (
      <Container
        ref="containerRef"
        forwardRef={(ref) => (this.triggerEl = ref)}
        onContentMounted={() => {
          if (innerVisible) {
            this.updatePopper();
            this.updateOverlayInnerStyle();
          }
        }}
        onResize={() => {
          if (innerVisible) {
            this.updatePopper();
          }
        }}
        visible={innerVisible}
        attach={this.attach}
      >
        {{
          content: () => (
            <Transition
              name={this.expandAnimation ? `${prefixCls}--animation-expand` : `${prefixCls}--animation`}
              appear
              onEnter={this.updatePopper}
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
