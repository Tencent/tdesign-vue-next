import { defineComponent, onMounted, onUnmounted, ref, Fragment, Text, watch, PropType, VNode, Teleport } from 'vue';
import { getAttach } from '../utils/dom';
import props from './props';

function filterEmpty(children: VNode[] = []) {
  const vnodes: VNode[] = [];
  children.forEach((child) => {
    if (Array.isArray(child)) {
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
        ((typeof Comment !== 'undefined' && c.type === Comment) ||
          (c.type === Fragment && c.children.length === 0) ||
          (c.type === Text && (c.children as string).trim() === ''))
      ),
  );
}

function isContentRectChanged(rect1: DOMRectReadOnly, rect2: DOMRectReadOnly) {
  if (!rect1 || !rect2) return;
  if (['width', 'height', 'x', 'y'].some((k) => rect1[k] !== rect2[k])) {
    return true;
  }
  return false;
}

function observeResize(elm: HTMLElement, cb: (rect: DOMRectReadOnly) => void) {
  if (!window?.ResizeObserver || !elm) return;
  let prevContentRect = null as DOMRectReadOnly;
  const ro = new ResizeObserver((entries = []) => {
    const { contentRect } = entries[0] || {};
    if (isContentRectChanged(contentRect, prevContentRect)) {
      prevContentRect = contentRect;
      cb(contentRect);
      return;
    }
    // omit initial change
    if (!prevContentRect) {
      prevContentRect = contentRect;
    }
  });

  ro.observe(elm);
  return function () {
    ro.unobserve(elm);
  };
}

function useObserveResize(elm: () => HTMLElement, cb: Parameters<typeof observeResize>[1]) {
  let cleanOR: ReturnType<typeof observeResize>;
  onMounted(() => {
    cleanOR = observeResize(elm(), cb);
  });
  onUnmounted(() => {
    cleanOR?.();
  });
}

// eslint-disable-next-line vue/one-component-per-file
const Trigger = defineComponent({
  emits: ['resize'],
  data() {
    return {
      cleanOR: null,
    };
  },
  mounted() {
    // There is no better way to get the root element than `this.$el`
    this.cleanOR = observeResize(this.$el, () => {
      this.$emit('resize');
    });
  },
  unmounted() {
    this.cleanOR();
  },
  render() {
    const children = filterEmpty(this.$slots.default());
    if (children.length > 1 || children[0]?.type === Text) {
      return <span>{children}</span>;
    }
    return children[0];
  },
});

// eslint-disable-next-line vue/one-component-per-file
const Content = defineComponent({
  emits: ['resize'],
  setup(props, { emit }) {
    const el = ref(null);
    useObserveResize(
      () => el.value.children[0],
      () => {
        emit('resize');
      },
    );
    return { el };
  },
  render() {
    return (
      <div ref="el" style="position: absolute; top: 0px; left: 0px; width: 100%">
        {this.$slots.default()}
      </div>
    );
  },
});

// eslint-disable-next-line vue/one-component-per-file
export default defineComponent({
  inheritAttrs: false,
  props: {
    parent: Object,
    visible: Boolean,
    attach: props.attach,
    forwardRef: Function as PropType<(el: HTMLElement) => void>,
  },
  emits: ['resize', 'contentMounted'],
  setup(props, { emit }) {
    const triggerRef = ref<VNode & { $el: HTMLElement }>(null);
    const mountContent = ref(false);

    onMounted(() => {
      mountContent.value = props.visible;
      props.forwardRef(triggerRef.value.$el);
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
      triggerRef,
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
    return (
      <Fragment>
        <Trigger
          {...{
            class: this.$attrs.class,
          }}
          ref="triggerRef"
          onResize={this.emitResize}
        >
          {this.$slots.default()}
        </Trigger>
        {this.mountContent && (
          <Teleport to={getAttach(this.attach)}>
            <Content onResize={this.emitResize} onVnodeMounted={this.emitContentMounted}>
              {this.$slots.content && this.$slots.content()}
            </Content>
          </Teleport>
        )}
      </Fragment>
    );
  },
});
