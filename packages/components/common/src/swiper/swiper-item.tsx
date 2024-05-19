import { defineComponent, computed } from '@td/adapter-vue';
import props from '@td/intel/swiper/props';
import { usePrefixClass } from '@td/adapter-hooks';

const swiperItemProps = {
  index: {
    type: Number,
  },
  currentIndex: {
    type: Number,
  },
  isSwitching: {
    type: Boolean,
    default: false,
  },
  getWrapAttribute: {
    type: Function,
  },
  swiperItemLength: {
    type: Number,
    default: 0,
  },
};
const CARD_SCALE = 210 / 332; // 缩放比例
const itemWidth = 0.415; // 依据设计稿使用t-swiper__card控制每个swiper的宽度为41.5%

export default defineComponent({
  name: 'TSwiperItem',
  props: {
    ...props,
    ...swiperItemProps,
  },
  setup(props, { slots }) {
    const prefix = usePrefixClass();
    const active = computed(() => props.index === props.currentIndex);
    const disposeIndex = computed(() => {
      if (props.type !== 'card') return 0;
      if (props.currentIndex === 0 && props.index === props.swiperItemLength - 1) {
        return -1;
      }
      if (props.currentIndex === props.swiperItemLength - 1 && props.index === 0) {
        return props.swiperItemLength;
      }
      if (props.index < props.currentIndex - 1 && props.currentIndex - props.index >= props.swiperItemLength / 2) {
        return props.swiperItemLength + 1;
      }
      if (props.index > props.currentIndex + 1 && props.index - props.currentIndex >= props.swiperItemLength / 2) {
        return -2;
      }
      return props.index;
    });
    const translateX = computed(() => {
      if (props.type !== 'card') return 0;
      const wrapWidth = props.getWrapAttribute('offsetWidth') || 0;
      const translateIndex = !active.value && props.swiperItemLength > 2 ? disposeIndex.value : props.index;
      const inStage = Math.abs(translateIndex - props.currentIndex) <= 1;
      if (inStage) {
        return (wrapWidth * ((translateIndex - props.currentIndex) * (1 - itemWidth * CARD_SCALE) - itemWidth + 1)) / 2;
      }
      if (translateIndex < props.currentIndex) {
        return (-itemWidth * (1 + CARD_SCALE) * wrapWidth) / 2;
      }
      return ((2 + itemWidth * (CARD_SCALE - 1)) * wrapWidth) / 2;
    });
    const zIndex = computed(() => {
      if (props.type !== 'card') return 0;
      const translateIndex = !active.value && props.swiperItemLength > 2 ? disposeIndex.value : props.index;
      const isActivity = translateIndex === props.currentIndex;
      const inStage = Math.round(Math.abs(translateIndex - props.currentIndex)) <= 1;
      if (isActivity) {
        return 2;
      }
      if (inStage) {
        return 1;
      }
      return 0;
    });
    const itemStyle = computed(() => {
      if (props.animation === 'fade') {
        return {
          opacity: active.value ? 1 : 0,
          transition: props.isSwitching ? `opacity ${props.duration / 1000}s` : '',
          zIndex: active.value ? 1 : 0,
        };
      }
      if (props.type === 'card') {
        const translateIndex = !active.value && props.swiperItemLength > 2 ? disposeIndex.value : props.index;
        const isActivity = translateIndex === props.currentIndex;
        return {
          transform: `translateX(${translateX.value}px) scale(${isActivity ? 1 : CARD_SCALE})`,
          transition: `transform ${props.duration / 1000}s ease`,
          zIndex: zIndex.value,
        };
      }
      return {};
    });

    return () => (
      <div
        class={[
          `${prefix.value}-swiper__container__item`,
          {
            [`${prefix.value}-swiper__card`]: props.type === 'card',
            [`${prefix.value}-is-active`]: props.type === 'card' && active.value,
            [`${prefix.value}-swiper__fade`]: props.animation === 'fade',
          },
        ]}
        style={itemStyle.value}
      >
        {slots.default?.({}) || []}
      </div>
    );
  },
});
