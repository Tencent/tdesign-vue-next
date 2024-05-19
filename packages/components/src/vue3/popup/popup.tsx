import { createPopper } from '@popperjs/core';
import { debounce, isFunction, isObject, isString } from 'lodash-es';
import {
  Transition,
  computed,
  defineComponent,
  inject,
  nextTick,
  onUnmounted,
  provide,
  ref,
  toRefs,
  watch,
} from '@td/adapter-vue';
import {
  useCommonClassName,
  useContent,
  usePrefixClass,
  useTNodeJSX,
  useVModel,
} from '@td/adapter-hooks';
import { off, on, once, setStyle } from '@td/adapter-utils';

import props from '@td/intel/components/popup/props';

import type { PopupTriggerEvent } from '@td/intel/components/popup/type';
import type { InjectionKey } from '@td/adapter-vue';
import {
  POPUP_ATTR_NAME,
  POPUP_PARENT_ATTR_NAME,
  attachListeners,
  getPopperPlacement,
  getPopperTree,
  getTriggerType,
} from './utils';
import Container from './container';

const parentKey = Symbol() as InjectionKey<{
  id: string;
  assertMouseLeave: (ev: MouseEvent) => void;
}>;

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

    const triggerEl = ref<HTMLElement | null>(null);
    const overlayEl = ref<HTMLElement | null>(null);
    const popperEl = ref<HTMLElement | null>(null);
    const containerRef = ref<typeof Container | null>(null);
    const isOverlayHover = ref(false);

    const id
      = typeof process !== 'undefined' && process.env?.TEST
        ? ''
        : Date.now().toString(36);
    const parent = inject(parentKey, undefined);

    provide(parentKey, {
      id,
      assertMouseLeave: onMouseLeave,
    });

    const prefixCls = usePrefixClass('popup');
    const { STATUS: commonCls } = useCommonClassName();
    const delay = computed(() => {
      const delay
        = props.trigger !== 'hover'
          ? [0, 0]
          : [].concat(props.delay ?? [250, 150]);
      return {
        show: delay[0],
        hide: delay[1] ?? delay[0],
      };
    });

    const trigger = attachListeners(triggerEl);

    watch(
      () => [props.trigger, triggerEl.value],
      () => {
        if (!triggerEl.value) {
          return;
        }
        trigger.clean();

        trigger.add(
          (
            {
              'hover': 'mouseenter',
              'focus': 'focusin',
              'context-menu': 'contextmenu',
              'click': 'click',
            } as any
          )[props.trigger],
          (ev: MouseEvent) => {
            if (props.disabled) {
              return;
            }

            if (ev.type === 'contextmenu') {
              ev.preventDefault();
            }

            if (
              (ev.type === 'click' || ev.type === 'contextmenu')
              && visible.value
            ) {
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
              const code
                = typeof process !== 'undefined' && process.env?.TEST
                  ? '27'
                  : 'Escape';
              if (ev.code === code) {
                hide(ev);
              }
            });
          }
          return;
        }
        off(document, 'mousedown', onDocumentMouseDown, true);
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

      if (!triggerEl.value || !overlayEl.value) {
        return;
      }
      if (isFunction(overlayStyle)) {
        return overlayStyle(triggerEl.value, overlayEl.value);
      }
      if (isObject(overlayStyle)) {
        return overlayStyle;
      }
    }

    function updateOverlayInnerStyle() {
      const { overlayInnerStyle } = props;

      if (!triggerEl.value || !overlayEl.value) {
        return;
      }
      if (isFunction(overlayInnerStyle)) {
        setStyle(
          overlayEl.value,
          overlayInnerStyle(triggerEl.value, overlayEl.value),
        );
      } else if (isObject(overlayInnerStyle)) {
        setStyle(overlayEl.value, overlayInnerStyle);
      }
    }

    function updatePopper() {
      if (!popperEl.value || !visible.value) {
        return;
      }
      if (popper) {
        const rect = triggerEl.value.getBoundingClientRect();
        let parent = triggerEl.value;
        while (parent && parent !== document.body) {
          parent = parent.parentElement;
        }
        const isHidden
          = parent !== document.body || (rect.width === 0 && rect.height === 0);
        if (!isHidden) {
          popper.state.elements.reference = triggerEl.value;
          popper.update();
        } else {
          setVisible(false, {
            trigger: getTriggerType({ type: 'mouseenter' } as MouseEvent),
          });
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
      const activedPopper = getPopperTree(id).find(el =>
        el.contains(ev.target as Node),
      );
      if (
        activedPopper
        && getPopperTree(
          activedPopper.getAttribute(POPUP_PARENT_ATTR_NAME),
          true,
        ).includes(popperEl.value)
      ) {
        return;
      }

      hide(ev);
    }

    function onMouseLeave(ev: MouseEvent) {
      isOverlayHover.value = false;
      if (
        props.trigger !== 'hover'
        || triggerEl.value.contains(ev.target as Node)
      ) {
        return;
      }

      const isCursorOverlaps = getPopperTree(id).some((el) => {
        const rect = el.getBoundingClientRect();

        return (
          ev.x > rect.x
          && ev.x < rect.x + rect.width
          && ev.y > rect.y
          && ev.y < rect.y + rect.height
        );
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
      const { scrollTop, clientHeight, scrollHeight }
        = e.target as HTMLDivElement;

      // 防止多次触发添加截流
      const debounceOnScrollBottom = debounce(
        e => props.onScrollToBottom?.({ e }),
        100,
      );

      // windows 下 scrollTop 会出现小数，这里取整
      if (clientHeight + Math.floor(scrollTop) === scrollHeight) {
        // touch bottom
        debounceOnScrollBottom(e);
      }
      props.onScroll?.({ e });
    }
    watch(
      () => [visible.value, overlayEl.value],
      () => {
        if (visible.value && overlayEl.value && updateScrollTop) {
          updateScrollTop?.(overlayEl.value);
        }
      },
    );

    return () => {
      const content = renderTNodeJSX('content');
      const hidePopup
        = props.hideEmptyPopup && ['', undefined, null].includes(content);

      const overlay
        = visible.value || !props.destroyOnClose
          ? (
            <div
              {...{
                [POPUP_ATTR_NAME]: id,
                [POPUP_PARENT_ATTR_NAME]: parent?.id,
              }}
              class={[prefixCls.value, props.overlayClassName]}
              ref={(ref: HTMLElement) => (popperEl.value = ref)}
              style={[
                { zIndex: props.zIndex },
                getOverlayStyle(),
                hidePopup && { visibility: 'hidden' },
              ]}
              vShow={visible.value}
              onClick={onOverlayClick}
              onMouseenter={onMouseenter}
              onMouseleave={onMouseLeave}
            >
              <div
                class={[
                `${prefixCls.value}__content`,
                {
                  [`${prefixCls.value}__content--text`]: isString(
                    props.content,
                  ),
                  [`${prefixCls.value}__content--arrow`]: props.showArrow,
                  [commonCls.value.disabled]: props.disabled,
                },
                props.overlayInnerClassName,
                ]}
                ref={overlayEl}
                onScroll={handleOnScroll}
              >
                {content}
                {props.showArrow && <div class={`${prefixCls.value}__arrow`} />}
              </div>
            </div>
            )
          : null;

      return (
        <Container
          ref={(ref: any) => (containerRef.value = ref)}
          forwardRef={ref => (triggerEl.value = ref)}
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
            default: () => renderContent('default', 'triggerElement'),
          }}
        </Container>
      );
    };
  },
});
