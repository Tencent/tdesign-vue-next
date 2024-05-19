import { Transition, computed, defineComponent, onBeforeMount, ref, watch } from '@td/adapter-vue';
import { debounce, isFunction, isObject, isString } from 'lodash-es';

import { useCommonClassName, usePrefixClass, useTNodeJSX } from '@td/adapter-hooks';
import { off, on, once } from '@td/adapter-utils';

import props from '@td/intel/components/popup/props';

import type { PopupTriggerEvent } from '@td/intel/components/popup/type';
import { getTriggerType } from './utils';

export default defineComponent({
  props: {
    ...props,
    triggerElement: Object,
  },
  setup(props, { expose }) {
    const prefixCls = usePrefixClass('popup');
    const renderTNodeJSX = useTNodeJSX();

    const { STATUS: commonCls } = useCommonClassName();
    const overlayEl = ref<HTMLElement | null>(null);
    const popperEl = ref<HTMLElement | null>(null);
    const overlayVisible = ref(false);

    let showTimeout: NodeJS.Timeout;
    let hideTimeout: NodeJS.Timeout;

    const delay = computed(() => {
      const delay = props.trigger !== 'hover' ? [0, 0] : [].concat(props.delay ?? [250, 150]);
      return {
        show: delay[0],
        hide: delay[1] ?? delay[0],
      };
    });

    watch(
      () => overlayVisible.value,
      (visible: boolean) => {
        if (visible) {
          on(document, 'mousedown', onDocumentMouseDown, true);
          if (props.trigger === 'focus') {
            once(props.triggerElement as HTMLElement, 'keydown', (ev: KeyboardEvent) => {
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
    );

    const getOverlayStyle = () => {
      const { overlayStyle } = props;

      if (!props.triggerElement || !overlayEl.value) {
        return;
      }
      if (isFunction(overlayStyle)) {
        return overlayStyle(props.triggerElement as HTMLElement, overlayEl.value);
      }
      if (isObject(overlayStyle)) {
        return overlayStyle;
      }
    };
    const onDocumentMouseDown = (ev: MouseEvent) => {
      const isClickContent = popperEl.value?.contains(ev.target as Node);
      const isClickTriggerElement = (props.triggerElement as HTMLElement)?.contains(ev.target as Node);
      if (isClickContent || isClickTriggerElement) {
        return;
      }

      hide(ev);
    };

    const hide = (ev?: PopupTriggerEvent) => {
      clearAllTimeout();
      hideTimeout = setTimeout(() => {
        overlayVisible.value = false;
        props.onVisibleChange?.(false, ev ? { trigger: getTriggerType(ev), e: ev } : null);
      }, delay.value.hide);
    };

    const show = (ev?: PopupTriggerEvent) => {
      clearAllTimeout();
      showTimeout = setTimeout(() => {
        overlayVisible.value = true;
        props.onVisibleChange?.(true, ev ? { trigger: getTriggerType(ev), e: ev } : null);
      }, delay.value.show);
    };

    function clearAllTimeout() {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    }

    const handleOnScroll = (e: WheelEvent) => {
      const { scrollTop, clientHeight, scrollHeight } = e.target as HTMLDivElement;

      const debounceOnScrollBottom = debounce(e => props.onScrollToBottom?.({ e }), 100);

      if (clientHeight + Math.floor(scrollTop) === scrollHeight) {
        debounceOnScrollBottom(e);
      }
      props.onScroll?.({ e });
    };

    const onOverlayClick = (e: MouseEvent) => {
      props.onOverlayClick?.({ e });
    };
    expose({
      hide,
      show,
    });

    onBeforeMount(() => {
      overlayVisible.value = true;
    });

    return {
      prefixCls,
      commonCls,
      popperEl,
      overlayEl,
      getOverlayStyle,
      handleOnScroll,
      onOverlayClick,
      renderTNodeJSX,
      overlayVisible,
    };
  },
  render() {
    const content = this.renderTNodeJSX('content');
    const hidePopup = this.hideEmptyPopup && ['', undefined, null].includes(content);

    return this.overlayVisible
      ? (
        <Transition name={`${this.prefixCls}--animation${this.expandAnimation ? '-expand' : ''}`} appear>
          <div
            class={[this.prefixCls, this.overlayClassName]}
            ref="popperEl"
            style={[{ zIndex: this.zIndex }, this.getOverlayStyle(), hidePopup && { visibility: 'hidden' }]}
            onClick={this.onOverlayClick}
          >
            <div
              class={[
              `${this.prefixCls}__content`,
              {
                [`${this.prefixCls}__content--text`]: isString(this.content),
                [`${this.prefixCls}__content--arrow`]: this.showArrow,
                [this.commonCls.disabled]: this.disabled,
              },
              this.overlayInnerClassName,
              ]}
              ref="overlayEl"
              onScroll={this.handleOnScroll}
            >
              {content}
              {this.showArrow && <div class={`${this.prefixCls}__arrow`} />}
            </div>
          </div>
        </Transition>
        )
      : null;
  },
});
