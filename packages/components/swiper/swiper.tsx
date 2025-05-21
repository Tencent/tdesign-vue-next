import { defineComponent, ref, computed, watch, isVNode, onMounted, cloneVNode } from 'vue';
import { ChevronLeftIcon as TdChevronLeftIcon, ChevronRightIcon as TdChevronRightIcon } from 'tdesign-icons-vue-next';
import { usePrefixClass } from '../hooks/useConfig';
import { useGlobalIcon } from '../hooks/useGlobalIcon';
import { useChildComponentSlots } from '../hooks';
import props from './props';
import { SwiperNavigation, SwiperChangeSource } from './type';
import TSwiperItem from './swiper-item';
import { useTNodeJSX } from '../hooks/tnode';
import { isServer } from '../utils/dom';

const defaultNavigation: SwiperNavigation = {
  placement: 'inside',
  showSlideBtn: 'always',
  size: 'medium',
  type: 'bars',
};

export default defineComponent({
  name: 'TSwiper',
  props,
  emits: ['update:current'],
  setup(props, { emit }) {
    const prefix = usePrefixClass();
    const renderTNodeJSX = useTNodeJSX();
    const { ChevronLeftIcon, ChevronRightIcon } = useGlobalIcon({
      ChevronLeftIcon: TdChevronLeftIcon,
      ChevronRightIcon: TdChevronRightIcon,
    });
    let swiperTimer: ReturnType<typeof setTimeout> | null = null;
    let swiperSwitchingTimer = 0;
    let isBeginToEnd = false;
    let isEndToBegin = false;
    const currentIndex = ref(props.current ?? props.defaultCurrent);
    const navActiveIndex = ref(props.current ?? props.defaultCurrent);
    const isSwitching = ref(false);
    const showArrow = ref(false);
    const swiperWrap = ref<HTMLElement>();
    const getChildComponentByName = useChildComponentSlots();
    const swiperItemLength = ref(0);
    let mounted = false; // 标记客户端是否已挂载

    const navigationConfig = computed(() => ({
      ...defaultNavigation,
      ...(isVNode(props.navigation) ? {} : (props.navigation as object)),
    }));

    const isEnd = computed(() => {
      if (props.type === 'card') {
        return !props.loop && currentIndex.value + 1 >= swiperItemLength.value;
      }
      return !props.loop && currentIndex.value + 2 >= swiperItemLength.value;
    });

    const propsToUpdateSetTimer = computed(() => [props.autoplay, currentIndex.value, props.duration, props.interval]);

    const swiperWrapClass = computed(() => ({
      [`${prefix.value}-swiper__wrap`]: true,
      [`${prefix.value}-swiper--inside`]: navigationConfig.value.placement === 'inside',
      [`${prefix.value}-swiper--outside`]: navigationConfig.value.placement === 'outside',
      [`${prefix.value}-swiper--vertical`]: props.direction === 'vertical',
      [`${prefix.value}-swiper--large`]: navigationConfig.value.size === 'large',
      [`${prefix.value}-swiper--small`]: navigationConfig.value.size === 'small',
    }));

    // SSR 只渲染 items，不做克隆；客户端才 clone
    const swiperItems = () => {
      const list = getChildComponentByName('SwiperItem');
      swiperItemLength.value = list.length;
      const items = list.map((item: any, idx: number) => {
        const p = { ...props, ...item.props };
        return (
          <TSwiperItem
            index={idx}
            currentIndex={currentIndex.value}
            isSwitching={isSwitching.value}
            getWrapAttribute={getWrapAttribute}
            swiperItemLength={swiperItemLength.value}
            {...p}
          >
            {item.children.default()}
          </TSwiperItem>
        );
      });
      if (!isServer && props.animation === 'slide' && items.length > 1) {
        const first = cloneVNode(items[0], { key: 'swiper-item-append-0' });
        const last = cloneVNode(items[items.length - 1], {
          key: `swiper-item-prepend-${items.length - 1}`,
        });
        items.unshift(last);
        items.push(first);
      }
      return items;
    };

    // SSR 保持 active = currentIndex；客户端 slide +1
    const containerStyle = computed(() => {
      const offsetH = props.height ? `${props.height}px` : `${getWrapAttribute('offsetHeight')}px`;
      if (props.type === 'card' || props.animation === 'fade') {
        return { height: offsetH };
      }
      const style: Record<string, string> = {
        transition: isSwitching.value ? `transform ${props.duration / 1000}s ease` : '',
      };
      let active = currentIndex.value;
      if (!isServer && props.animation === 'slide' && swiperItemLength.value > 1) {
        active += 1;
        if (isBeginToEnd || isEndToBegin) style.transition = '';
      }
      style.transform =
        props.direction === 'vertical'
          ? `translate3d(0, -${active * 100}%, 0)`
          : `translate3d(-${active * 100}%, 0, 0)`;
      ['msTransform', 'WebkitTransform'].forEach((k) => (style[k] = style.transform));
      return style;
    });

    const swiperTo = (idx: number, ctx: { source: SwiperChangeSource }) => {
      let t = idx % swiperItemLength.value;
      navActiveIndex.value = t;
      emit('update:current', t);
      props.onChange?.(t, ctx);
      isSwitching.value = true;
      if (props.animation === 'slide' && swiperItemLength.value > 1 && props.type !== 'card') {
        t = idx;
        isBeginToEnd = isEndToBegin = false;
        if (idx >= swiperItemLength.value) {
          clearTimer();
          setTimeout(() => {
            isEndToBegin = true;
            currentIndex.value = 0;
          }, props.duration);
        }
        if (
          currentIndex.value === 0 &&
          ((swiperItemLength.value > 2 && idx === swiperItemLength.value - 1) ||
            (swiperItemLength.value === 2 && idx === 0))
        ) {
          t = -1;
          navActiveIndex.value = swiperItemLength.value - 1;
          clearTimer();
          setTimeout(() => {
            isBeginToEnd = true;
            currentIndex.value = swiperItemLength.value - 1;
          }, props.duration);
        }
      }
      currentIndex.value = t;
    };

    const clearTimer = () => {
      if (swiperTimer) {
        clearTimeout(swiperTimer);
        swiperTimer = null;
      }
    };
    const setTimer = () => {
      if (props.autoplay && props.interval > 0) {
        clearTimer();
        swiperTimer = setTimeout(
          () => swiperTo(currentIndex.value + 1, { source: 'autoplay' }),
          currentIndex.value === 0 ? props.interval - (props.duration + 50) : props.interval,
        );
      }
    };

    const onMouseEnter = () => {
      if (props.stopOnHover) clearTimer();
      if (navigationConfig.value.showSlideBtn === 'hover') showArrow.value = true;
    };
    const onMouseLeave = () => {
      if (!isEnd.value) setTimer();
      if (navigationConfig.value.showSlideBtn === 'hover') showArrow.value = false;
    };

    const getWrapAttribute = (attr: string) => (swiperWrap.value?.parentNode as any)?.[attr];

    watch(
      () => props.current,
      (val) => {
        if (mounted) swiperTo(val, { source: 'autoplay' });
      },
    );
    watch(
      () => propsToUpdateSetTimer.value,
      () => setTimer(),
    );
    watch(
      () => isSwitching.value,
      () => {
        if (isSwitching.value) {
          if (swiperSwitchingTimer) clearTimeout(swiperSwitchingTimer);
          swiperSwitchingTimer = window.setTimeout(() => {
            isSwitching.value = false;
            if (isEnd.value) clearTimer();
          }, props.duration + 50);
        }
      },
    );

    onMounted(() => {
      mounted = true;
      setTimer();
      showArrow.value = navigationConfig.value.showSlideBtn === 'always';
      navActiveIndex.value = currentIndex.value;
    });

    return () => (
      <div class={[`${prefix.value}-swiper`]} onMouseenter={onMouseEnter} onMouseleave={onMouseLeave} ref={swiperWrap}>
        <div class={swiperWrapClass.value}>
          <div
            class={[
              `${prefix.value}-swiper__content`,
              {
                [`${prefix.value}-swiper-fade`]: props.animation === 'fade',
                [`${prefix.value}-swiper-card`]: props.type === 'card',
              },
            ]}
          >
            <div class={`${prefix.value}-swiper__container`} style={containerStyle.value}>
              {swiperItems()}
            </div>
          </div>
          {renderNavigation()}
          {renderArrow()}
        </div>
      </div>
    );
  },
});
