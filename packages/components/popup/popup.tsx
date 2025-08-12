import { createPopper, Placement } from '@popperjs/core';
import { inRange, max, min, isObject, debounce, isString, isFunction } from 'lodash-es';
import {
  computed,
  CSSProperties,
  defineComponent,
  inject,
  InjectionKey,
  nextTick,
  onUnmounted,
  provide,
  ref,
  Ref,
  toRefs,
  Transition,
  watch,
} from 'vue';
import { useVModel, useContent, useTNodeJSX, usePrefixClass, useCommonClassName } from '@tdesign/shared-hooks';

import { off, on, once } from '@tdesign/shared-utils';
import setStyle from '@tdesign/common-js/utils/setStyle';
import Container from './container';
import props from './props';
import { PopupTriggerEvent, TdPopupProps } from './type';

const POPUP_ATTR_NAME = 'data-td-popup';
const POPUP_PARENT_ATTR_NAME = 'data-td-popup-parent';

/**
 * @param id
 * @param upwards query upwards poppers
 */
function getPopperTree(id: number | string, upwards?: boolean): Element[] {
  const list = [] as any;
  const selectors = [POPUP_PARENT_ATTR_NAME, POPUP_ATTR_NAME];

  if (!id) return list;
  if (upwards) {
    selectors.unshift(selectors.pop());
  }

  recurse(id);

  return list;

  function recurse(id: number | string) {
    const children = document.querySelectorAll(`[${selectors[0]}="${id}"]`);
    children.forEach((el) => {
      list.push(el);
      const childId = el.getAttribute(selectors[1]);
      if (childId && childId !== id) {
        recurse(childId);
      }
    });
  }
}

const parentKey = Symbol() as InjectionKey<{
  id: string;
  assertMouseLeave: (ev: MouseEvent) => void;
}>;

function getPopperPlacement(placement: TdPopupProps['placement']): Placement {
  return placement.replace(/-(left|top)$/, '-start').replace(/-(right|bottom)$/, '-end') as Placement;
}

function attachListeners(elm: Ref<Element>) {
  const offs: Array<() => void> = [];
  return {
    add<K extends keyof HTMLElementEventMap>(type: K, listener: (ev: HTMLElementEventMap[K]) => void) {
      if (!type) return;
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
    const { visible: propVisible, modelValue } = toRefs(props);
    const [visible, setVisible] = useVModel(
      propVisible,
      modelValue,
      props.defaultVisible,
      props.onVisibleChange,
      'visible',
    );
    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();

    /** popperjs instance */
    let popper: ReturnType<typeof createPopper>;
    /** timeout id */
    let showTimeout: any;
    let hideTimeout: any;

    const triggerEl = ref<HTMLElement>();
    const overlayEl = ref<HTMLElement>();
    const popperEl = ref<HTMLElement>();
    const containerRef = ref<typeof Container>();
    const isOverlayHover = ref(false);

    const arrowStyle = ref<CSSProperties>({});

    const id = typeof process !== 'undefined' && process.env?.TEST ? '' : Date.now().toString(36);
    const parent = inject(parentKey, undefined);

    provide(parentKey, {
      id,
      assertMouseLeave: onMouseLeave,
    });

    const prefixCls = usePrefixClass('popup');
    const { STATUS: commonCls } = useCommonClassName();
    const delay = computed(() => {
      const delay = props.trigger !== 'hover' ? [0, 0] : [].concat(props.delay ?? [250, 150]);
      return {
        show: delay[0],
        hide: delay[1] ?? delay[0],
      };
    });

    const trigger = attachListeners(triggerEl);

    watch(
      () => [props.trigger, triggerEl.value],
      () => {
        if (!triggerEl.value) return;
        trigger.clean();

        trigger.add(
          (
            {
              hover: 'mouseenter',
              focus: 'focusin',
              'context-menu': 'contextmenu',
              click: 'click',
            } as any
          )[props.trigger],
          (ev: MouseEvent) => {
            if (props.disabled) return;

            if (ev.type === 'contextmenu') {
              ev.preventDefault();
            }

            if ((ev.type === 'click' || ev.type === 'contextmenu') && visible.value) {
              hide(ev);
              return;
            }

            show(ev);
          },
        );

        trigger.add(
          (
            {
              hover: 'mouseleave',
              focus: 'focusout',
            } as any
          )[props.trigger],
          hide,
        );
      },
    );

    watch(
      () => [props.overlayStyle, props.overlayInnerStyle, overlayEl.value],
      () => {
        updateOverlayInnerStyle();
        updatePopper();
      },
      { immediate: true },
    );

    watch(
      () => props.triggerElement,
      (v) => {
        // triggerElement 为字符串的情况，作为元素选择器使用
        if (typeof v === 'string') {
          nextTick(() => {
            triggerEl.value = document.querySelector(v);
          });
        }
      },
      { immediate: true },
    );

    watch(
      () => props.placement,
      () => {
        destroyPopper();
        updatePopper();
      },
    );

    watch(
      () => visible.value,
      (visible) => {
        if (visible) {
          on(document, 'mousedown', onDocumentMouseDown, true);
          if (props.trigger === 'focus') {
            once(triggerEl.value, 'keydown', (ev: KeyboardEvent) => {
              const code = typeof process !== 'undefined' && process.env?.TEST ? '27' : 'Escape';
              if (ev.code === code) {
                hide(ev);
              }
            });
          }
          return;
        }
        off(document, 'mousedown', onDocumentMouseDown, true);
      },
      { immediate: true },
    );

    watch(
      () => [visible.value, overlayEl.value],
      () => {
        if (visible.value && overlayEl.value && updateScrollTop) {
          updateScrollTop?.(overlayEl.value);
        }
      },
    );

    onUnmounted(() => {
      destroyPopper();
      clearAllTimeout();
      off(document, 'mousedown', onDocumentMouseDown, true);
    });

    expose({
      update: updatePopper,
      getOverlay: () => overlayEl.value,
      getOverlayState: () => ({
        hover: isOverlayHover.value,
      }),
      /** close is going to be deprecated. visible is enough */
      close: () => hide(),
    });

    function getOverlayStyle() {
      const { overlayStyle } = props;

      if (!triggerEl.value || !overlayEl.value) return;
      if (isFunction(overlayStyle)) {
        return overlayStyle(triggerEl.value, overlayEl.value);
      }
      if (isObject(overlayStyle)) {
        return overlayStyle;
      }
    }

    function updateOverlayInnerStyle() {
      const { overlayInnerStyle } = props;

      if (!triggerEl.value || !overlayEl.value) return;
      if (isFunction(overlayInnerStyle)) {
        setStyle(overlayEl.value, overlayInnerStyle(triggerEl.value, overlayEl.value));
      } else if (isObject(overlayInnerStyle)) {
        setStyle(overlayEl.value, overlayInnerStyle);
      }
    }

    function getArrowStyle() {
      if (!triggerEl.value || !popperEl.value) {
        // 不做修改
        return {};
      }

      const triggerRect = triggerEl.value.getBoundingClientRect();
      const popupRect = popperEl.value.getBoundingClientRect();

      const position = props.placement;

      if (position.startsWith('top') || position.startsWith('bottom')) {
        // 距离中线的距离
        const offsetLeft = Math.abs(triggerRect.left + triggerRect.width / 2 - popupRect.left);

        const popupWidth = popperEl.value.offsetWidth ?? popperEl.value.offsetWidth;

        // 保留 padding 的安全 offset
        const maxPopupOffsetLeft = popupWidth - 4;
        const minPopupOffsetLeft = 12;

        // 偏移超出元素本身
        if (inRange(offsetLeft, 0, popupWidth)) {
          return {
            // 加上箭头元素本身的偏移
            left: `${max([minPopupOffsetLeft, min([maxPopupOffsetLeft, offsetLeft])]) - 4}px`,
            // 覆盖可能的 margin
            marginLeft: 0,
          };
        } else {
          // 此时箭头的指向将不准确
          // 不作偏移保持默认
          // 或许考虑隐藏箭头或尽可能偏移
          return {};
        }
      }

      // 判断元素顶部和触发器中线的距离
      const offsetTop = triggerRect.top + triggerRect.height / 2 - popupRect.top;

      const popupHeight = popperEl.value.offsetHeight ?? popperEl.value.clientHeight;

      // 保留 padding 的安全 offset
      const maxPopupOffsetTop = popupHeight - 8;
      const minPopupOffsetTop = 8;

      // 偏移超出元素本身
      if (inRange(offsetTop, 0, popupHeight)) {
        return {
          // 加上箭头元素本身的偏移
          top: `${max([minPopupOffsetTop, min([maxPopupOffsetTop, offsetTop])]) - 4}px`,
          // 覆盖可能的 margin
          marginTop: 0,
        };
      } else {
        // 此时箭头的指向将不准确
        // 不作偏移保持默认
        // 或许考虑隐藏箭头或尽可能偏移
        return {};
      }
    }

    function updatePopper() {
      if (!popperEl.value || !visible.value) return;
      if (popper) {
        /**
         * web component 内的元素限制在了shadow root内，
         * 无法通过寻找父元素的方式判定是否在当前文档内
         */
        if (triggerEl.value.getRootNode() instanceof ShadowRoot) {
          popper.state.elements.reference = triggerEl.value;
          popper.update();
        } else {
          const rect = triggerEl.value.getBoundingClientRect();
          let parent = triggerEl.value;
          while (parent && parent !== document.body) {
            parent = parent.parentElement;
          }
          const isHidden = parent !== document.body || (rect.width === 0 && rect.height === 0);
          if (!isHidden) {
            popper.state.elements.reference = triggerEl.value;
            popper.update();
          } else {
            setVisible(false, { trigger: getTriggerType({ type: 'mouseenter' } as MouseEvent) });
          }
        }
        if (props.showArrow) {
          arrowStyle.value = getArrowStyle();
        }
        return;
      }

      popper = createPopper(triggerEl.value, popperEl.value, {
        placement: getPopperPlacement(props.placement),
        onFirstUpdate: () => {
          nextTick(updatePopper);
        },
        ...props.popperOptions,
      });
      if (props.showArrow) {
        arrowStyle.value = getArrowStyle();
      }
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

    function show(ev: PopupTriggerEvent) {
      clearAllTimeout();
      showTimeout = setTimeout(() => {
        setVisible(true, { trigger: getTriggerType(ev) });
      }, delay.value.show);
    }

    function hide(ev?: PopupTriggerEvent) {
      clearAllTimeout();
      hideTimeout = setTimeout(() => {
        setVisible(false, { trigger: getTriggerType(ev), e: ev });
      }, delay.value.hide);
    }

    function clearAllTimeout() {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    }

    function getTriggerType(ev?: PopupTriggerEvent) {
      switch (ev?.type) {
        case 'mouseenter':
          return 'trigger-element-hover';
        case 'mouseleave':
          return 'trigger-element-hover';
        case 'focusin':
          return 'trigger-element-focus';
        case 'focusout':
          return 'trigger-element-blur';
        case 'click':
          return 'trigger-element-click';
        case 'context-menu':
        case 'keydown':
          return 'keydown-esc';
        case 'mousedown':
          return 'document';
        default:
          return 'trigger-element-close';
      }
    }

    function onDocumentMouseDown(ev: MouseEvent) {
      // click content
      if (popperEl.value?.contains(ev.target as Node)) {
        return;
      }

      // click trigger element
      if (triggerEl.value?.contains(ev.target as Node)) {
        return;
      }

      // ignore upwards
      const activedPopper = getPopperTree(id).find((el) => el.contains(ev.target as Node));
      if (
        activedPopper &&
        getPopperTree(activedPopper.getAttribute(POPUP_PARENT_ATTR_NAME), true).some((el) => el === popperEl.value)
      ) {
        return;
      }

      hide(ev);
    }

    function onMouseLeave(ev: MouseEvent) {
      isOverlayHover.value = false;
      if (props.trigger !== 'hover' || triggerEl.value.contains(ev.target as Node)) return;

      const isCursorOverlaps = getPopperTree(id).some((el) => {
        const rect = el.getBoundingClientRect();

        return ev.x > rect.x && ev.x < rect.x + rect.width && ev.y > rect.y && ev.y < rect.y + rect.height;
      });
      if (!isCursorOverlaps) {
        hide(ev);
        parent?.assertMouseLeave(ev);
      }
    }

    function onMouseenter() {
      isOverlayHover.value = true;
      if (visible.value && props.trigger === 'hover') {
        clearAllTimeout();
      }
    }

    function onOverlayClick(e: MouseEvent) {
      props.onOverlayClick?.({ e });
    }

    const updateScrollTop = inject('updateScrollTop', undefined);

    function handleOnScroll(e: WheelEvent) {
      const { scrollTop, clientHeight, scrollHeight } = e.target as HTMLDivElement;

      // 防止多次触发添加截流
      const debounceOnScrollBottom = debounce((e) => props.onScrollToBottom?.({ e }), 100);

      // windows 下 scrollTop 会出现小数，这里取整
      if (clientHeight + Math.floor(scrollTop) === scrollHeight) {
        // touch bottom
        debounceOnScrollBottom(e);
      }
      props.onScroll?.({ e });
    }

    return () => {
      const content = renderTNodeJSX('content');
      const hidePopup = props.hideEmptyPopup && ['', undefined, null].includes(content);

      const overlay =
        visible.value || !props.destroyOnClose ? (
          <div
            {...{
              [POPUP_ATTR_NAME]: id,
              [POPUP_PARENT_ATTR_NAME]: parent?.id,
            }}
            class={[prefixCls.value, props.overlayClassName]}
            ref={(ref: HTMLElement) => (popperEl.value = ref)}
            style={[{ zIndex: props.zIndex }, getOverlayStyle(), hidePopup && { visibility: 'hidden' }]}
            v-show={visible.value}
            onClick={onOverlayClick}
            onMouseenter={onMouseenter}
            onMouseleave={onMouseLeave}
          >
            <div
              class={[
                `${prefixCls.value}__content`,
                {
                  [`${prefixCls.value}__content--text`]: isString(props.content),
                  [`${prefixCls.value}__content--arrow`]: props.showArrow,
                  [commonCls.value.disabled]: props.disabled,
                },
                props.overlayInnerClassName,
              ]}
              ref={overlayEl}
              onScroll={handleOnScroll}
            >
              {content}
              {props.showArrow && <div class={`${prefixCls.value}__arrow`} style={arrowStyle.value} />}
            </div>
          </div>
        ) : null;

      return (
        <Container
          ref={(ref: any) => (containerRef.value = ref)}
          forwardRef={(ref) => {
            if (typeof props.triggerElement !== 'string') triggerEl.value = ref;
          }}
          onContentMounted={() => {
            if (visible.value) {
              updatePopper();

              const timer = setTimeout(() => {
                /** compted after animation finished */
                updateOverlayInnerStyle();
                clearTimeout(timer);
              }, 60);
            }
          }}
          onResize={() => {
            if (visible.value) {
              updatePopper();
            }
          }}
          visible={visible.value}
          attach={props.attach}
        >
          {{
            content: () => (
              <Transition
                name={`${prefixCls.value}--animation${props.expandAnimation ? '-expand' : ''}`}
                appear
                onEnter={updatePopper}
                onAfterLeave={destroyPopper}
              >
                {overlay}
              </Transition>
            ),
            default: () => {
              if (typeof props.triggerElement === 'string') return null;
              return renderContent('default', 'triggerElement');
            },
          }}
        </Container>
      );
    };
  },
});
