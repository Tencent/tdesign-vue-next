import { defineComponent, ref, computed, watch, isVNode, onMounted, cloneVNode } from 'vue';
import { ChevronLeftIcon as TdChevronLeftIcon, ChevronRightIcon as TdChevronRightIcon } from 'tdesign-icons-vue-next';

import { useTNodeJSX, useGlobalIcon, usePrefixClass, useChildComponentSlots } from '@tdesign/hooks';

import props from './props';
import { SwiperNavigation, SwiperChangeSource } from './type';
import TSwiperItem from './swiper-item';

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
    const currentIndex = ref(props.current || props.defaultCurrent);
    const navActiveIndex = ref(props.current || props.defaultCurrent);
    const isHovering = ref(false);
    const isSwitching = ref(false);
    const showArrow = ref(false);
    const swiperWrap = ref<HTMLElement>();
    const getChildComponentByName = useChildComponentSlots();

    const swiperItemLength = ref(0);
    const navigationConfig = computed(() => {
      return {
        ...defaultNavigation,
        ...(isVNode(props.navigation) ? {} : (props.navigation as object)),
      };
    });
    const isEnd = computed(() => {
      if (props.type === 'card') {
        return !props.loop && currentIndex.value + 1 >= swiperItemLength.value;
      }
      return !props.loop && currentIndex.value + 2 >= swiperItemLength.value;
    });
    const propsToUpdateSetTimer = computed(() => {
      return [props.autoplay, currentIndex.value, props.duration, props.interval];
    });
    const swiperWrapClass = computed(() => {
      return {
        [`${prefix.value}-swiper__wrap`]: true,
        [`${prefix.value}-swiper--inside`]: navigationConfig.value.placement === 'inside',
        [`${prefix.value}-swiper--outside`]: navigationConfig.value.placement === 'outside',
        [`${prefix.value}-swiper--vertical`]: props.direction === 'vertical',
        [`${prefix.value}-swiper--large`]: navigationConfig.value.size === 'large',
        [`${prefix.value}-swiper--small`]: navigationConfig.value.size === 'small',
      };
    });
    const containerStyle = computed(() => {
      const offsetHeight = props.height ? `${props.height}px` : `${getWrapAttribute('offsetHeight')}px`;
      if (props.type === 'card' || props.animation === 'fade') {
        return {
          height: offsetHeight,
        };
      }
      if (props.animation === 'slide') {
        const style: Record<string, number | string> = {
          transition: isSwitching.value ? `transform ${props.duration / 1000}s ease` : '',
        };
        let active = currentIndex.value;
        if (swiperItemLength.value > 1) {
          active += 1;
          if (isBeginToEnd || isEndToBegin) {
            style.transition = '';
          }
        }
        if (props.direction === 'vertical') {
          style.height = offsetHeight;
          style.transform = `translate3d(0, -${active * 100}%, 0px)`;
        } else {
          style.transform = `translate3d(-${active * 100}%, 0px, 0px)`;
        }
        ['msTransform', 'WebkitTransform'].forEach((key) => {
          style[key] = style.transform;
        });
        return style;
      }
      return {};
    });
    const swiperItems = () => {
      const swiperItemList = getChildComponentByName('SwiperItem');
      swiperItemLength.value = swiperItemList.length;
      const items = swiperItemList.map((swiperItem: any, index) => {
        const p = { ...props, ...swiperItem.props };
        return (
          <TSwiperItem
            index={index}
            currentIndex={currentIndex.value}
            isSwitching={isSwitching.value}
            getWrapAttribute={getWrapAttribute}
            swiperItemLength={swiperItemLength.value}
            {...p}
          >
            {swiperItem.children.default()}
          </TSwiperItem>
        );
      });
      if (props.animation === 'slide' && items.length > 1) {
        const first = cloneVNode(items[0], {
          key: `swiper-item-append-${0}`,
        });
        const last = cloneVNode(items[items.length - 1], {
          key: `swiper-item-prepend-${items.length - 1}`,
        });
        items.unshift(last);
        items.push(first);
      }
      return items;
    };

    const swiperTo = (index: number, context: { source: SwiperChangeSource }) => {
      let targetIndex = index % swiperItemLength.value;
      navActiveIndex.value = targetIndex;
      emit('update:current', targetIndex);
      props.onChange?.(targetIndex, context);
      isSwitching.value = true;
      if (props.animation === 'slide' && swiperItemLength.value > 1 && props.type !== 'card') {
        targetIndex = index;
        isBeginToEnd = false;
        isEndToBegin = false;
        if (index >= swiperItemLength.value) {
          clearTimer();
          setTimeout(() => {
            isEndToBegin = true;
            currentIndex.value = 0;
          }, props.duration);
        }
        if (currentIndex.value === 0) {
          if (swiperItemLength.value >= 2 && index === swiperItemLength.value - 1) {
            targetIndex = -1;
            navActiveIndex.value = swiperItemLength.value - 1;
            clearTimer();
            setTimeout(() => {
              isBeginToEnd = true;
              currentIndex.value = swiperItemLength.value - 1;
            }, props.duration);
          }
        }
      }
      currentIndex.value = targetIndex;
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
          () => {
            swiperTo(currentIndex.value + 1, { source: 'autoplay' });
          },
          currentIndex.value === 0 ? props.interval - (props.duration + 50) : props.interval, // 当 index 为 0 的时候，表明刚从克隆的最后一项跳转过来，已经经历了duration + 50 的间隔时间，减去即可
        );
      }
    };

    const onMouseEnter = () => {
      isHovering.value = true;
      if (props.stopOnHover) {
        clearTimer();
      }
      if (navigationConfig.value.showSlideBtn === 'hover') {
        showArrow.value = true;
      }
    };
    const onMouseLeave = () => {
      isHovering.value = false;
      if (!isEnd.value) {
        setTimer();
      }
      if (navigationConfig.value.showSlideBtn === 'hover') {
        showArrow.value = false;
      }
    };
    const onMouseEnterNavigationItem = (i: number) => {
      if (props.trigger === 'hover') {
        swiperTo(i, { source: 'hover' });
      }
    };
    const onClickNavigationItem = (i: number) => {
      if (props.trigger === 'click') {
        swiperTo(i, { source: 'click' });
      }
    };
    const goNext = (context: { source: SwiperChangeSource }) => {
      if (isSwitching.value) return;
      if (props.type === 'card') {
        return swiperTo(currentIndex.value + 1 >= swiperItemLength.value ? 0 : currentIndex.value + 1, context);
      }
      return swiperTo(currentIndex.value + 1, context);
    };
    const goPrevious = (context: { source: SwiperChangeSource }) => {
      if (isSwitching.value) return;
      if (currentIndex.value - 1 < 0) {
        if (props.animation === 'slide' && swiperItemLength.value === 2) {
          return swiperTo(0, context);
        }
        return swiperTo(swiperItemLength.value - 1, context);
      }
      return swiperTo(currentIndex.value - 1, context);
    };
    const getWrapAttribute = (attr: string) => {
      return swiperWrap.value?.parentNode?.[attr as keyof ParentNode];
    };
    const renderPagination = () => {
      const fractionIndex = currentIndex.value + 1 > swiperItemLength.value ? 1 : currentIndex.value + 1;
      return (
        <div class={`${prefix.value}-swiper__arrow`}>
          <div class={`${prefix.value}-swiper__arrow-left`} onClick={() => goPrevious({ source: 'click' })}>
            <ChevronLeftIcon />
          </div>
          <div class={`${prefix.value}-swiper__navigation-text-fraction`}>
            {fractionIndex}/{swiperItemLength.value}
          </div>
          <div class={`${prefix.value}-swiper__arrow-right`} onClick={() => goNext({ source: 'click' })}>
            <ChevronRightIcon />
          </div>
        </div>
      );
    };
    const renderArrow = () => {
      if (!showArrow.value) return null;
      return (
        <div class={[`${prefix.value}-swiper__arrow`, `${prefix.value}-swiper__arrow--default`]}>
          <div class={`${prefix.value}-swiper__arrow-left`} onClick={() => goPrevious({ source: 'click' })}>
            <ChevronLeftIcon />
          </div>
          <div class={`${prefix.value}-swiper__arrow-right`} onClick={() => goNext({ source: 'click' })}>
            <ChevronRightIcon />
          </div>
        </div>
      );
    };
    const renderNavigation = () => {
      if (isVNode(props.navigation)) return props.navigation;
      const navigationSlot = renderTNodeJSX('navigation');
      if (navigationSlot && isVNode(navigationSlot?.[0])) return navigationSlot;

      if (navigationConfig.value.type === 'fraction') {
        return (
          <div class={[`${prefix.value}-swiper__navigation`, `${prefix.value}-swiper__navigation--fraction`]}>
            {renderPagination()}
          </div>
        );
      }
      const swiperItemList = getChildComponentByName('SwiperItem');
      return (
        <ul
          class={[
            `${prefix.value}-swiper__navigation`,
            {
              [`${prefix.value}-swiper__navigation-bars`]: navigationConfig.value.type === 'bars',
              [`${prefix.value}-swiper__navigation-dots`]: navigationConfig.value.type === 'dots',
              [`${prefix.value}-swiper__navigation-dots-bar`]: navigationConfig.value.type === 'dots-bar',
            },
          ]}
        >
          {swiperItemList.map((_, i: number) => (
            <li
              key={i}
              class={[
                `${prefix.value}-swiper__navigation-item`,
                {
                  [`${prefix.value}-is-active`]: i === navActiveIndex.value,
                },
              ]}
              onMouseenter={() => onMouseEnterNavigationItem(i)}
              onClick={() => onClickNavigationItem(i)}
            >
              <span></span>
            </li>
          ))}
        </ul>
      );
    };
    const renderSwiperItems = () => {
      return swiperItems();
    };

    watch(
      () => propsToUpdateSetTimer.value,
      () => {
        setTimer();
      },
    );
    watch(
      () => isSwitching.value,
      () => {
        if (isSwitching.value) {
          if (swiperSwitchingTimer) clearTimeout(swiperSwitchingTimer);
          swiperSwitchingTimer = setTimeout(() => {
            isSwitching.value = false;
            swiperSwitchingTimer = 0;
            if (isEnd.value) {
              clearTimer();
            }
          }, props.duration + 50) as unknown as number;
        }
      },
    );
    watch(
      () => props.current,
      () => {
        swiperTo(props.current, { source: 'autoplay' });
      },
    );

    onMounted(() => {
      setTimer();
      showArrow.value = navigationConfig.value.showSlideBtn === 'always';
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
              {renderSwiperItems()}
            </div>
          </div>
          {renderNavigation()}
          {renderArrow()}
        </div>
      </div>
    );
  },
});
