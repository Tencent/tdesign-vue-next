import { computed, defineComponent, onMounted, onUnmounted, ref, shallowRef, Transition, watch } from 'vue';
import throttle from 'lodash/throttle';
import props from './props';
import { usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  name: 'TBackTop',
  props: {
    ...props,
  },
  emits: ['click'],
  setup(props, { emit, slots }) {
    const COMPONENT_NAME = usePrefixClass('back-top');
    const visible = ref<boolean>(false);
    const el = shallowRef<HTMLElement>();
    const backTopRef = shallowRef<HTMLDivElement>();
    const container = shallowRef<Document | HTMLElement>();

    const scrollToTop = (e: MouseEvent) => {
      const target =
        props.target === 'window'
          ? window || document.documentElement || document.body
          : document.querySelector(props.target);
      target &&
        target.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth', // 平滑滚动
        });
      emit('click', e);
    };

    const handleScroll = () => {
      if (el.value) {
        visible.value = el.value.scrollTop >= props.visibleHeight;
      }
    };

    const handleScrollThrottled = throttle(handleScroll, 300);

    const backTopStyle = computed(() => ({
      right: `${props.right}px`,
      bottom: `${props.bottom}px`,
    }));
    const stop = watch(
      () => container.value,
      (val) => {
        if (val) {
          val.addEventListener('scroll', handleScrollThrottled);
        }
      },
      { immediate: true, flush: 'post' },
    );
    onMounted(() => {
      container.value = document;
      el.value = document.documentElement;
      if (props.target && props.target !== 'window') {
        el.value = document.querySelector<HTMLElement>(props.target) ?? undefined;
        if (!el.value) {
          console.error('TdBackTop', `target is not existed: ${props.target}`);
        }
        container.value = el.value;
        if (container.value.parentElement) {
          container.value.parentElement.style.position = 'relative';
        }
        if (backTopRef.value) {
          backTopRef.value.style.position = 'absolute';
        }
      } else {
        backTopRef.value.style.position = 'fixed';
      }
    });
    onUnmounted(() => {
      stop();
      container.value.removeEventListener('scroll', handleScrollThrottled);
    });

    return () => (
      <Transition name={`${COMPONENT_NAME.value}-fade`}>
        <div
          class={COMPONENT_NAME.value}
          style={{
            ...backTopStyle.value,
          }}
          onClick={scrollToTop}
          v-show={visible.value}
          ref={backTopRef}
        >
          {slots.default ? slots.default() : <t-icon name="arrow-up" />}
        </div>
      </Transition>
    );
  },
});
