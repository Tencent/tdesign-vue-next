import Vue, { defineComponent, getCurrentInstance, onBeforeUnmount, onMounted, onUpdated, ref, watch } from '@td/adapter-vue';
import raf from 'raf';
import { isFunction } from 'lodash-es';
import { useResizeObserver } from '@td/adapter-hooks';
import { getAttach, removeDom } from '@td/utils';
import type { TdPopupProps } from '@td/intel/popup/type';

import type { PropType } from '@td/adapter-vue';

function isRectChanged(rect1?: DOMRectReadOnly, rect2?: DOMRectReadOnly) {
  if (!rect1 && !rect2) {
    return false;
  }
  if (!rect1 || !rect2) {
    return true;
  }
  if (['width', 'height', 'x', 'y'].some(k => rect1[k] !== rect2[k])) {
    return true;
  }
  return false;
}

const Trigger = defineComponent({
  name: 'TPopupTrigger',
  emits: ['resize'],
  props: {
    forwardRef: Function as PropType<(el: HTMLElement) => void>,
  },
  setup(props, { slots, emit }) {
    const contentRect = ref<DOMRectReadOnly>();
    const triggerEl = ref();

    onMounted(() => {
      const instance = getCurrentInstance();
      // TODO
      triggerEl.value = instance?.$el as HTMLElement;
    });

    watch(triggerEl, () => {
      props.forwardRef?.(triggerEl.value);
    });

    useResizeObserver(triggerEl, ([{ contentRect: newContentRect }]) => {
      contentRect.value = newContentRect;
    });

    watch(contentRect, (newRect, oldRect) => {
      if (isRectChanged(newRect, oldRect)) {
        emit('resize');
      }
    });

    onUpdated(() => {
      const instance = getCurrentInstance();
      // TODO
      const newEl = instance?.$el;
      if (triggerEl.value !== newEl) {
        triggerEl.value = newEl;
      }
    });

    return () => {
      const children = slots.default?.() || [];
      if (children.length > 1 || children[0]?.type === Text) {
        return <span>{children}</span>;
      }
      return children[0];
    };
  },
});

const Container = defineComponent({
  name: 'TPopupContainer',
  emits: ['resize', 'contentMounted'],
  props: {
    parent: Object,
    visible: Boolean,
    // support attach to current node when current is equal to `CURRENT_NODE`
    attach: [Function] as PropType<
      () => {
        attach: TdPopupProps['attach'];
        current: HTMLElement;
      }
    >,
    forwardRef: Function as PropType<(el: HTMLElement) => void>,
    forwardContentRef: Function as PropType<(el: HTMLElement) => void>,
  },
  setup(props, { emit, slots }) {
    const content = ref();
    const triggerEl = ref<HTMLElement>();
    const triggerRef = ref<HTMLElement>();

    watch(
      () => props.visible,
      (visible) => {
        if (visible) {
          mountContent();
        }
      },
    );

    onMounted(() => {
      if (props.visible) {
        raf(mountContent);
      }
    });

    onBeforeUnmount(() => {
      if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'test') {
        return;
      }
      unmountContent();
    });

    const emitResize = () => {
      emit('resize');
    };

    const mountContent = () => {
      if (content.value) {
        return;
      }
      const parent = props?.parent;

      const elm = document.createElement('div');
      elm.style.cssText
        = 'position: absolute; top: 0px; left: 0px; width: 100%';
      elm.appendChild(document.createElement('div'));

      content.value = Vue.createApp({
        mounted() {
          emit('contentMounted');
        },
        destroyed() {
          // parent?.props.content = null;
          removeDom(elm);
        },
        render() {
          return slots.content?.();
        },
      }).mount(elm.children[0]);
      props.forwardContentRef?.(content.value.$el);

      // TODO
      // @ts-expect-error
      const { attach, current } = props.attach?.();
      const currentAttach = attach === 'CURRENT_NODE' ? current : attach;
      // @ts-expect-error
      getAttach(currentAttach, triggerRef.value).appendChild(elm);
      content.value.$mount(elm.children[0]);
    };
    const unmountContent = () => {
      if (isFunction(content.value?.$destroy)) {
        content.value.$destroy();
      }
    };

    return () => {
      return (
        <Trigger
          ref="triggerRef"
          onResize={emitResize}
          forwardRef={(el: HTMLElement) => {
            props.forwardRef?.(el);
            triggerEl.value = el;
          }}
        >
          {slots.default?.()}
        </Trigger>
      );
    };
  },
});
export default Container;
