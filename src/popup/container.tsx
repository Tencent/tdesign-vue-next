import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  Ref,
  Fragment,
  Text,
  watch,
  PropType,
  VNode,
  Teleport,
  onUpdated,
  ComponentInternalInstance,
} from 'vue';
import props from './props';
import useResizeObserver from '../hooks/useResizeObserver';
import isUndefined from 'lodash/isUndefined';
import isArray from 'lodash/isArray';
import { getSSRAttach, getAttach } from '../utils/dom';

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
        ((!isUndefined(Comment) && c.type === Comment) ||
          (c.type === Fragment && c.children.length === 0) ||
          (c.type === Text && (c.children as string).trim() === ''))
      ),
  );
}

function isContentRectChanged(rect1: DOMRectReadOnly, rect2: DOMRectReadOnly) {
  if (!rect1 && !rect2) return false;
  if (!rect1 || !rect2) return true;
  if (['width', 'height', 'x', 'y'].some((k) => rect1[k] !== rect2[k])) {
    return true;
  }
  return false;
}

function useElement(elmFn: (instance: ComponentInternalInstance) => HTMLElement, cb?: (el: HTMLElement) => void) {
  const el = ref<HTMLElement>(null);

  const instance = getCurrentInstance();
  if (!instance) {
    console.warn('useElement must be called in setup()');
    return;
  }

  onMounted(() => {
    el.value = elmFn(instance);
    cb?.(el.value);
  });
  onUpdated(() => {
    const newEl = elmFn(instance);
    if (el.value !== newEl) {
      el.value = newEl;
      cb?.(el.value);
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
    const el = useElement((instance) => instance.vnode.el as HTMLElement);
    const contentRect: Ref<DOMRectReadOnly> = ref(null);

    watch(el, () => {
      props.forwardRef?.(el.value);
    });

    useResizeObserver(el, ([{ contentRect: newContentRect }]) => {
      contentRect.value = newContentRect;
    });

    watch(contentRect, (newRect, oldRect) => {
      if (isContentRectChanged(newRect, oldRect)) {
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
  setup(props, { emit }) {
    const contentEl = useElement((instance) => instance.vnode.el.children[0] as HTMLElement);
    useResizeObserver(contentEl, () => {
      emit('resize');
    });
  },
  render() {
    return <div style="position: absolute; top: 0px; left: 0px; width: 100%">{this.$slots.default()}</div>;
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
  setup(props, { emit }) {
    const triggerEl = ref<HTMLElement>(null);
    const mountContent = ref(false);
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

    return {
      mountContent,
      triggerEl,
      unmountContent() {
        mountContent.value = false;
      },
      emitResize: () => {
        emit('resize');
      },
      emitContentMounted: () => {
        emit('contentMounted');
      },
    };
  },
  render() {
    const getElement = () => getSSRAttach() || getAttach(this.attach, this.triggerEl);
    return (
      <Fragment>
        <Trigger
          {...{
            class: this.$attrs.class,
          }}
          forwardRef={(el: HTMLElement) => {
            this.forwardRef(el);
            this.triggerEl = el;
          }}
          onResize={this.emitResize}
        >
          {this.$slots.default()}
        </Trigger>
        {this.mountContent && (
          <Teleport disabled={!getElement()} to={getElement()}>
            <Content onResize={this.emitResize} onVnodeMounted={this.emitContentMounted}>
              {this.$slots.content && this.$slots.content()}
            </Content>
          </Teleport>
        )}
      </Fragment>
    );
  },
});
