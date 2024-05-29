import {
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  nextTick,
  onUnmounted,
  provide,
  ref,
  toRefs,
  watch,
} from '@td/adapter-vue';
import { createPopper } from '@popperjs/core';
import type { Instance } from '@popperjs/core';
import { debounce } from 'lodash-es';
import { getIEVersion, off, on, once, setStyle } from '@td/utils';
import {
  useCommonClassName,
  useContent,
  usePrefixClass,
  useTNodeJSX,
  useVModel,
} from '@td/adapter-hooks';
import props from '@td/components/popup/props';
import type {
  PopupTriggerEvent,
} from '@td/components/popup/type';
import type { InjectionKey } from '@td/adapter-vue';
import Container from './container';
import {
  POPUP_ATTR_NAME,
  POPUP_PARENT_ATTR_NAME,
  attachListeners,
  defaultVisibleDelay,
  getPopperPlacement,
  getPopperTree,
  getTriggerType,
  triggers,
} from './utils';

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
    updateScrollTop: {
      type: Function,
    },
  },
  setup(props, { expose }) {
    const popper = ref<HTMLDivElement>();
    // container instance
    const overlay = ref<HTMLDivElement>();
    const triggerEl = ref<HTMLElement>();

    // popperjs instance
    const popperInstance = ref<Instance | null>();
    // timeout id
    const showTimeout = ref<NodeJS.Timeout>();
    const hideTimeout = ref<NodeJS.Timeout>();
    const containerRef = ref<typeof Container | null>(null);
    // if a trusted action (opening or closing) is prevented, increase this flag
    const visibleState = ref(0);
    const mouseInRange = ref(false);
    // mark popup as clicked when mousedown, reset after mouseup
    const contentClicked = ref(false);
    // is popup leaving
    const isOverlayHover = ref(false);

    const componentName = usePrefixClass('popup');
    const { STATUS: statusClassName } = useCommonClassName();

    const { visible: propVisible, modelValue } = toRefs(props);
    const [visible, setVisible] = useVModel(
      propVisible,
      modelValue,
      props.defaultVisible,
      props.onVisibleChange,
      'visible',
    );

    const renderContent = useContent();
    const renderTNodeJSX = useTNodeJSX();

    const id
      = typeof process !== 'undefined' && process.env?.TEST
        ? ''
        : Date.now().toString(36);

    const overlayClasses = computed(() => {
      return [
        `${componentName.value}__content`,
        {
          [`${componentName.value}__content--text`]: props.content === 'string',
          [`${componentName.value}__content--arrow`]: props.showArrow,
          [statusClassName.value.disabled]: props.disabled,
        },
        props.overlayInnerClassName,
      ];
    });

    const hasTrigger = computed(() => {
      return triggers.reduce(
        (map, trigger) => ({
          ...map,
          [trigger]: props.trigger?.includes(trigger),
        }),
        {} as any,
      );
    });

    const updateOverlayInnerStyle = () => {
      const { overlayInnerStyle } = props;
      const overlayEl = overlay.value as HTMLElement;

      if (!triggerEl?.value || !overlayEl) {
        return;
      }
      if (typeof overlayInnerStyle === 'function') {
        setStyle(overlayEl, overlayInnerStyle(triggerEl.value, overlayEl));
      } else if (typeof overlayInnerStyle === 'object') {
        setStyle(overlayEl, overlayInnerStyle);
      }
    };

    const onOverlayClick = (e: MouseEvent) => {
      props.onOverlayClick?.({ e });
    };

    const getOverlayStyle = () => {
      if (!triggerEl.value || !overlay.value) {
        return;
      }

      const { overlayStyle } = props;
      const overlayEl = overlay.value as HTMLElement;

      if (typeof overlayStyle === 'function') {
        return overlayStyle(triggerEl.value, overlayEl);
      }
      if (typeof overlayStyle === 'object') {
        return overlayStyle;
      }
    };

    const updatePopper = () => {
      const popperEl = popper.value;

      if (!popperEl || !visible.value) {
        return;
      }
      if (popperInstance.value) {
        popperInstance.value.update();
        return;
      }
      popperInstance.value = createPopper(triggerEl.value, popper.value, {
        modifiers:
          getIEVersion() > 9
            ? []
            : [
                {
                  name: 'computeStyles',
                  options: {
                    // 默认为 true，即使用 transform 定位，开启 gpu 加速
                    // ie9 不支持 transform，需要添加 -ms- 前缀，@popperjs/core 没有添加这个样式，
                    // 在 ie9 下则去掉 gpu 优化加速，使用 top, right, bottom, left 定位
                    gpuAcceleration: false,
                  },
                },
              ],
        placement: getPopperPlacement(props.placement),
        onFirstUpdate: () => {
          nextTick(updatePopper);
        },
        ...props.popperOptions,
      });
    };

    const updateScrollTop = inject('updateScrollTop', undefined);

    const onDocumentMouseDown = (ev: MouseEvent) => {
      // click content
      if (popper.value?.contains(ev.target as Node)) {
        return;
      }
      // click trigger element
      if (triggerEl.value?.contains(ev.target as Node)) {
        return;
      }
      // ignore upwards
      const activatedPopper = getPopperTree(id).find(el =>
        el.contains(ev.target as Node),
      );
      if (
        activatedPopper
        && getPopperTree(
          activatedPopper.getAttribute(POPUP_PARENT_ATTR_NAME) as string,
          true,
        ).includes(popper.value)
      ) {
        return;
      }
      hide(ev);
    };
    const handleOnScroll = (e: WheelEvent) => {
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
    };
    watch(
      () => [visible.value, overlay.value],
      () => {
        if (visible.value && overlay.value && updateScrollTop) {
          // @ts-expect-error
          updateScrollTop?.(overlay.value);
        }
      },
    );

    watch(
      () => [props.overlayStyle, props.overlayInnerStyle, overlay.value],
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
        }
        // TODO
        // off(document, "mousedown", onDocumentMouseDown, true);
      },
    );

    const normalizedDelay = computed(() => {
      // @ts-expect-error
      const delay = [].concat(props.delay ?? defaultVisibleDelay);
      return {
        open: delay[0],
        close: delay[1] ?? delay[0],
      };
    });

    const onMouseEnter = () => {
      isOverlayHover.value = true;
      if (visible.value && props.trigger === 'hover') {
        clearAllTimeout();
      }
    };

    const onMouseLeave = (ev: MouseEvent) => {
      isOverlayHover.value = false;
      if (
        props.trigger !== 'hover'
        || triggerEl.value?.contains(ev.target as Node)
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
    };
    const destroyPopper = () => {
      if (popperInstance.value) {
        popperInstance.value.destroy();
        popperInstance.value = null;
      }
      if (props.destroyOnClose) {
        containerRef.value?.unmountContent?.();
      }
    };

    const clearAllTimeout = () => {
      clearTimeout(showTimeout.value);
      clearTimeout(hideTimeout.value);
    };

    const show = (ev: PopupTriggerEvent) => {
      clearAllTimeout();
      showTimeout.value = setTimeout(() => {
        setVisible(true, { trigger: getTriggerType(ev) });
        // TODO
        if (popper.value) {
          popper.value.style.display = null;
        }
      }, normalizedDelay.value.open);
    };

    function hide(ev?: PopupTriggerEvent) {
      clearAllTimeout();
      hideTimeout.value = setTimeout(() => {
        setVisible(false, { trigger: getTriggerType(ev), e: ev });
        // TODO
        if (popper.value) {
          popper.value.style.display = 'none';
        }
      }, normalizedDelay.value.close);
    }
    const trigger = attachListeners(triggerEl);

    watch(
      () => [props.trigger, triggerEl.value],
      () => {
        if (!triggerEl.value) {
          return;
        }
        trigger?.clean();
        trigger?.add(
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

        trigger?.add(
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

    const parent = inject(parentKey, undefined);

    provide(parentKey, {
      id,
      assertMouseLeave: onMouseLeave,
    });

    expose({
      update: updatePopper,
      getOverlay: () => overlay.value,
      getOverlayState: () => ({
        hover: isOverlayHover.value,
      }),
      /** close is going to be deprecated. visible is enough */
      close: () => hide(),
    });

    onUnmounted(() => {
      destroyPopper();
      clearAllTimeout();
      off(document, 'mousedown', onDocumentMouseDown, true);
    });

    return () => {
      const content = renderTNodeJSX('content');
      const instance = getCurrentInstance();
      const hidePopup
        = props.hideEmptyPopup && ['', undefined, null].includes(content);

      const overlay
        = (
          <div
            {...{
              [POPUP_ATTR_NAME]: id,
              [POPUP_PARENT_ATTR_NAME]: parent?.id,
            }}
            ref={popper}
            class={[componentName.value, props.overlayClassName]}
            style={[
              { zIndex: props.zIndex },
              getOverlayStyle(),
              hidePopup && { visibility: 'hidden' },
            ]}
            onClick={onOverlayClick}
            onMouseenter={onMouseEnter}
            onMouseleave={onMouseLeave}
          >
            <div
              class={overlayClasses.value}
              ref="overlay"
              // @ts-expect-error
              onScroll={handleOnScroll}
            >
              {content}
              {props.showArrow && (
                <div class={`${componentName.value}__arrow`} />
              )}
            </div>
          </div>
        );

      return (
        <Container
          forwardRef={(ref: HTMLElement) => {
            triggerEl.value = ref;
          }}
          ref={containerRef}
          forwardContentRef={(ref: HTMLDivElement) => {
            popper.value = ref;
          }}
          onContentMounted={() => {
            if (visible.value) {
              updatePopper();
              updateOverlayInnerStyle();
            }
          }}
          onResize={() => {
            if (visible.value) {
              updatePopper();
            }
          }}
          parent={instance as any}
          visible={visible.value}
          attach={() => ({ attach: props.attach, current: triggerEl })}
          v-slots={{
            content: () => (
              <transition
                name={
                  props.expandAnimation
                    ? `${componentName.value}--animation-expand`
                    : `${componentName.value}--animation`
                }
                appear
              >
                {overlay}
              </transition>
            ),
            default: () => renderContent('default', 'triggerElement'),
          }}
        >
        </Container>
      );
    };
  },
});
