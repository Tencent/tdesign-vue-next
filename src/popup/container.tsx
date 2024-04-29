import isArray from 'lodash/isArray';
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  Fragment,
  Text,
  watch,
  PropType,
  VNode,
  Teleport,
  onUpdated,
  ComponentInternalInstance,
  Comment,
} from 'vue';

import useResizeObserver from '../hooks/useResizeObserver';
import { getSSRAttach, getAttach } from '../utils/dom';

import props from './props';

function filterEmpty(children: VNode[] = []) {
  const vnodes: VNode[] = [];
  children.forEach((child) => {
    if (isArray(child)) {
      vnodes.push(...child);
    } else if (child.type === Fragment) {
      vnodes.push(...filterEmpty(child.children as VNode[]));
    } else {
      vnodes.push(child);
    }
  });
  return vnodes.filter(
    (c) =>
      !(
        c &&
        (c.type === Comment ||
          (c.type === Fragment && c.children.length === 0) ||
          (c.type === Text && (c.children as string).trim() === ''))
      ),
  );
}

function isRectChanged(rect1: DOMRectReadOnly, rect2: DOMRectReadOnly) {
  if (!rect1 && !rect2) return false;
  if (!rect1 || !rect2) return true;
  if (['width', 'height', 'x', 'y'].some((k) => rect1[k] !== rect2[k])) {
    return true;
  }
  return false;
}

function useElement<T = HTMLElement>(getter: (instance: ComponentInternalInstance) => T) {
  const instance = getCurrentInstance();
  const el = ref<T>();

  onMounted(() => {
    el.value = getter(instance);
  });
  onUpdated(() => {
    const newEl = getter(instance);
    if (el.value !== newEl) {
      el.value = newEl;
    }
  });

  return el;
}

// eslint-disable-next-line vue/one-component-per-file
const Trigger = defineComponent({
  name: 'TPopupTrigger',
  props: {
    forwardRef: Function as PropType<(el: HTMLElement) => void>,
  },
  emits: ['resize'],
  setup(props, { emit, slots }) {
    const el = useElement((vm) => {
      const containerNode = vm.parent.vnode;
      // skip the first text node due to `Fragment`
      return containerNode.el.nextElementSibling;
    });
    const contentRect = ref<DOMRectReadOnly>();

    watch(el, () => {
      props.forwardRef?.(el.value);
    });

    useResizeObserver(el, ([{ contentRect: newContentRect }]) => {
      contentRect.value = newContentRect;
    });

    watch(contentRect, (newRect, oldRect) => {
      if (isRectChanged(newRect, oldRect)) {
        emit('resize');
      }
    });

    return () => {
      const children = filterEmpty(slots.default?.());
      if (children.length > 1 || children[0]?.type === Text) {
        return <span>{children}</span>;
      }
      return children[0];
    };
  },
});

// eslint-disable-next-line vue/one-component-per-file
const Content = defineComponent({
  name: 'TPopupContent',
  emits: ['resize'],
  setup(props, { emit, slots }) {
    const contentEl = useElement((vm) => vm.vnode.el.children[0]);
    useResizeObserver(contentEl, () => {
      emit('resize');
    });

    return () => {
      return <div style="position: absolute; top: 0px; left: 0px; width: 100%">{slots.default()}</div>;
    };
  },
});

// eslint-disable-next-line vue/one-component-per-file
export default defineComponent({
  name: 'TPopupContainer',
  inheritAttrs: false,
  props: {
    parent: Object,
    visible: Boolean,
    attach: props.attach,
    forwardRef: Function as PropType<(el: HTMLElement) => void>,
  },
  emits: ['resize', 'contentMounted'],
  setup(props, { emit, attrs, slots, expose }) {
    const triggerEl = ref<HTMLElement>();
    const mountContent = ref(false);

    function emitResize() {
      emit('resize');
    }

    onMounted(() => {
      requestAnimationFrame(() => {
        mountContent.value = props.visible;
      });
    });

    watch(
      () => props.visible,
      (visible) => {
        if (visible) {
          mountContent.value = props.visible;
        }
      },
    );

    expose({
      unmountContent() {
        mountContent.value = false;
      },
    });

    return () => {
      const getElement = () => getSSRAttach() || getAttach(props.attach, triggerEl.value);
      return (
        <Fragment>
          <Trigger
            class={attrs.class}
            forwardRef={(el: HTMLElement) => {
              props.forwardRef(el);
              triggerEl.value = el;
            }}
            onResize={emitResize}
          >
            {slots.default()}
          </Trigger>
          {mountContent.value && (
            <Teleport disabled={!getElement()} to={getElement()}>
              <Content onResize={emitResize} onVnodeMounted={() => emit('contentMounted')}>
                {slots.content && slots.content()}
              </Content>
            </Teleport>
          )}
        </Fragment>
      );
    };
  },
});
