import { defineComponent, ref, computed, watch, isVNode, onMounted, onUpdated, nextTick } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon } from 'tdesign-icons-vue-next';
import kebabCase from 'lodash/kebabCase';
import { usePrefixClass } from '../hooks/useConfig';
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
  props: { ...props },
  setup(props, { slots }) {
    const prefix = usePrefixClass();
    let swiperTimer = 0;
    let swiperSwitchingTimer = 0;
    const currentIndex = ref(props.current || props.defaultCurrent);
    const isHovering = ref(false);
    const isSwitching = ref(false);
    const swiperItemList = ref([]);
    const showArrow = ref(false);
    const swiperWrap = ref<HTMLElement>();

    const swiperItemLength = computed(() => {
      return swiperItemList.value.length;
    });
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
        if (props.direction === 'vertical') {
          return {
            height: offsetHeight,
            transform: `translate3d(0, -${currentIndex.value * 100}%, 0px)`,
            transition: isSwitching.value ? `transform ${props.duration / 1000}s ease` : '',
          };
        }
        return {
          msTransform: `translate3d(-${currentIndex.value * 100}%, 0px, 0px)`,
          WebkitTransform: `translate3d(-${currentIndex.value * 100}%, 0px, 0px)`,
          transform: `translate3d(-${currentIndex.value * 100}%, 0px, 0px)`,
          transition: isSwitching.value ? `transform ${props.duration / 1000}s ease` : '',
        };
      }
      return {};
    });
    const swiperItems = computed(() => {
      return swiperItemList.value.map((swiperItem, index) => {
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
    });

    const swiperTo = (index: number, context: { source: SwiperChangeSource }) => {
      const targetIndex = index % swiperItemLength.value;
      props.onChange?.(targetIndex, context);
      isSwitching.value = true;
      currentIndex.value = targetIndex;
    };
    const clearTimer = () => {
      if (swiperTimer) {
        clearTimeout(swiperTimer);
        swiperTimer = 0;
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
        ) as unknown as number;
      }
    };
    const updateSwiperItems = () => {
      const originalChildren = slots.default?.({}) || [];
      const selfSwiperItemList = originalChildren
        // @ts-ignore
        .filter((swiper) => swiper.type && kebabCase(swiper.type?.name).endsWith(`${prefix.value}-swiper-item`));
      const isUnchange =
        selfSwiperItemList.length === swiperItemLength.value &&
        swiperItemList.value.every((swiperItem, index) => swiperItem === selfSwiperItemList[index]);
      if (isUnchange) return;
      swiperItemList.value = selfSwiperItemList;
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
      swiperTo(i, { source: 'hover' });
    };
    const onClickNavigationItem = (i: number) => {
      swiperTo(i, { source: 'click' });
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
        return swiperTo(swiperItemLength.value - 1, context);
      }
      return swiperTo(currentIndex.value - 1, context);
    };
    const getWrapAttribute = (attr: string) => {
      return swiperWrap.value?.parentNode?.[attr];
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
      if (navigationConfig.value.type === 'fraction') {
        return (
          <div class={[`${prefix.value}-swiper__navigation`, `${prefix.value}-swiper__navigation--fraction`]}>
            {renderPagination()}
          </div>
        );
      }

      return (
        <ul
          class={[
            `${prefix.value}-swiper__navigation`,
            {
              [`${prefix.value}-swiper__navigation-bars`]: navigationConfig.value.type === 'bars',
            },
          ]}
        >
          {swiperItemList.value.map((_, i: number) => (
            <li
              key={i}
              class={[
                `${prefix.value}-swiper__navigation-item`,
                {
                  [`${prefix.value}-is-active`]: i === currentIndex.value,
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
      return swiperItems.value;
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
      updateSwiperItems();
      setTimer();
      showArrow.value = navigationConfig.value.showSlideBtn === 'always';
    });

    onUpdated(() => {
      nextTick(() => {
        // updateSwiperItems()
      });
    });

    return () => (
      <div class={[`${prefix.value}-swiper`]} onMouseenter={onMouseEnter} onMouseLeave={onMouseLeave} ref={swiperWrap}>
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
