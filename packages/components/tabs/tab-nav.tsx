import { h, defineComponent, Transition, ref, computed, watch, onMounted, nextTick } from 'vue';
import { debounce } from 'lodash-es';
import {
  ChevronLeftIcon as TdChevronLeftIcon,
  ChevronRightIcon as TdChevronRightIcon,
  AddIcon as TdAddIcon,
} from 'tdesign-icons-vue-next';
import { TdTabsProps } from './type';
import tabProps from './props';
import { calcMaxOffset, calcValidOffset, calculateOffset, calcPrevOrNextOffset } from '@tdesign/common/js/tabs/base';

// 子组件
import TTabPanel from './tab-panel';
import TTabNavItem from './tab-nav-item';
import TTabNavBar from './tab-nav-bar';

// hooks
import { useResize } from '../hooks/useListener';
import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import { useGlobalIcon } from '../hooks/useGlobalIcon';
import useDragSort from '../hooks/useDragSort';
import { isFunction } from 'lodash-es';

export default defineComponent({
  name: 'TTabNav',
  ...{ resizeObserver: null },
  props: {
    theme: tabProps.theme,
    panels: {
      type: Array as { new (): Array<InstanceType<typeof TTabPanel>> },
      default: (): Array<InstanceType<typeof TTabPanel>> => [] as Array<InstanceType<typeof TTabPanel>>,
    },
    action: Array,
    value: tabProps.value,
    placement: tabProps.placement,
    scrollPosition: tabProps.scrollPosition,
    size: tabProps.size,
    disabled: tabProps.disabled,
    addable: tabProps.addable,
    onChange: tabProps.onChange,
    onAdd: tabProps.onAdd,
    onRemove: tabProps.onRemove,
    dragSort: tabProps.dragSort,
    onDragSort: tabProps.onDragSort,
  },
  setup(props) {
    const componentName = usePrefixClass('tabs');
    const { ChevronLeftIcon, ChevronRightIcon, AddIcon } = useGlobalIcon({
      ChevronLeftIcon: TdChevronLeftIcon,
      ChevronRightIcon: TdChevronRightIcon,
      AddIcon: TdAddIcon,
    });
    const classPrefix = usePrefixClass();

    const { SIZE } = useCommonClassName();

    const scrollLeft = ref(0);

    // refs
    const navsContainerRef = ref();
    const navsWrapRef = ref();
    const leftOperationsRef = ref();
    const rightOperationsRef = ref();
    const toRightBtnRef = ref();
    const activeTabRef = ref();
    const maxScrollLeft = ref(0);

    const getRefs = () => ({
      navsContainer: navsContainerRef.value,
      navsWrap: navsWrapRef.value,
      leftOperations: leftOperationsRef.value,
      rightOperations: rightOperationsRef.value,
      toRightBtn: toRightBtnRef.value,
      activeTab: activeTabRef.value,
    });

    // left right位置 选项卡的位置是在左右侧垂直方向铺开的
    const isVerticalPlacement = computed(() => ['left', 'right'].includes(props.placement.toLowerCase()));

    // 展示操作按钮
    const canToLeft = computed(() => scrollLeft.value > 1);
    const canToRight = computed(() => scrollLeft.value < maxScrollLeft.value - 1);

    // style
    const wrapTransformStyle = computed(() => {
      if (isVerticalPlacement.value) return {};
      return {
        transform: `translate3d(${-scrollLeft.value}px, 0, 0)`,
      };
    });
    const navsContainerStyle = computed(() => {
      return props.addable ? { 'min-height': '48px' } : null;
    });

    // class
    const iconBaseClass = computed(() => {
      return {
        [`${componentName.value}__btn`]: true,
        [SIZE.value.medium]: props.size === 'medium',
        [SIZE.value.large]: props.size === 'large',
      };
    });
    const leftIconClass = computed(() => {
      return {
        [`${componentName.value}__btn--left`]: true,
        ...iconBaseClass.value,
      };
    });
    const rightIconClass = computed(() => {
      return {
        [`${componentName.value}__btn--right`]: true,
        ...iconBaseClass.value,
      };
    });
    const addIconClass = computed(() => {
      return {
        [`${componentName.value}__add-btn`]: true,
        ...iconBaseClass.value,
      };
    });
    const navContainerClass = computed(() => {
      return {
        [`${componentName.value}__nav-container`]: true,
        [`${componentName.value}__nav--card`]: props.theme === 'card',
        [`${classPrefix.value}-is-${props.placement}`]: true,
        [`${classPrefix.value}-is-addable`]: props.addable,
      };
    });
    const navScrollContainerClass = computed(() => {
      return {
        [`${componentName.value}__nav-scroll`]: true,
        [`${classPrefix.value}-is-scrollable`]: canToLeft.value || canToRight.value,
      };
    });

    const navsWrapClass = computed(() => {
      return [
        `${componentName.value}__nav-wrap`,
        `${classPrefix.value}-is-smooth`,
        { [`${classPrefix.value}-is-vertical`]: isVerticalPlacement.value },
      ];
    });

    const setOffset = (offset: number) => {
      scrollLeft.value = calcValidOffset(offset, maxScrollLeft.value);
    };

    const handleScroll = (action: 'prev' | 'next') => {
      setOffset(calcPrevOrNextOffset(getRefs(), scrollLeft.value, action));
    };

    const handleWheel = (event: WheelEvent) => {
      if (!canToLeft.value && !canToRight.value) return;

      event.preventDefault();
      const { deltaX, deltaY } = event;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        setOffset(scrollLeft.value + deltaX);
      } else {
        setOffset(scrollLeft.value + deltaY);
      }
    };

    const handleActiveTabScroll = () => {
      setTimeout(() => {
        setOffset(calculateOffset(getRefs(), scrollLeft.value, props.scrollPosition));
      }, 0);
    };

    const getMaxScrollLeft = () => {
      nextTick(() => {
        maxScrollLeft.value = calcMaxOffset(getRefs());
      });
    };

    // watch
    watch([() => props.placement, () => props.panels], getMaxScrollLeft);
    watch([() => props.scrollPosition], handleActiveTabScroll);

    // life times
    useResize(debounce(getMaxScrollLeft), navsContainerRef.value);

    const handleAddTab = (e: MouseEvent) => {
      props.onAdd?.({ e });
    };

    const tabClick = (event: MouseEvent, nav: Partial<InstanceType<typeof TTabPanel>>) => {
      const { value, disabled } = nav;
      if (disabled || props.value === value) {
        return false;
      }
      props.onChange(value);
    };
    const removeBtnClick = ({ e, value, index }: Parameters<TdTabsProps['onRemove']>[0]) => {
      props.onRemove({ e, value, index });
    };
    const setActiveTab = (ref: any) => {
      if (!ref?.$el) return;
      if (ref?.value === props.value && activeTabRef.value !== ref.$el) {
        activeTabRef.value = ref.$el;
        handleActiveTabScroll();
      }
    };

    const { setNavsWrap } = useDragSort(props);

    onMounted(() => {
      setNavsWrap(navsWrapRef.value);
      getMaxScrollLeft();
      handleActiveTabScroll();
    });
    // renders
    const renderNavsContent = () => {
      return props.panels.map((panel, index) => {
        let label;
        if (panel?.children?.label) {
          label = panel.children.label();
        } else if (isFunction(panel.label)) {
          label = panel.label(h);
        } else {
          label = panel.label || `选项卡${index + 1}`;
        }
        let draggable = props.dragSort;
        if (draggable && panel.draggable === false) {
          draggable = panel.draggable;
        }
        return (
          <TTabNavItem
            ref={setActiveTab}
            draggable={draggable}
            key={panel.value}
            index={index}
            theme={props.theme}
            size={props.size}
            placement={props.placement}
            label={label}
            active={panel.value === props.value}
            disabled={props.disabled || panel.disabled}
            removable={panel.removable}
            value={panel.value}
            onClick={(e: MouseEvent) => tabClick(e, panel)}
            onRemove={removeBtnClick}
          />
        );
      });
    };
    const renderArrows = () => {
      return [
        <div
          ref={leftOperationsRef}
          class={[`${componentName.value}__operations`, `${componentName.value}__operations--left`]}
        >
          <Transition name="fade" mode="out-in" appear>
            {canToLeft.value ? (
              <div class={leftIconClass.value} onClick={() => handleScroll('prev')}>
                <ChevronLeftIcon />
              </div>
            ) : null}
          </Transition>
        </div>,
        <div
          ref={rightOperationsRef}
          class={[`${componentName.value}__operations`, `${componentName.value}__operations--right`]}
        >
          <Transition name="fade" mode="out-in" appear>
            {canToRight.value ? (
              <div ref={toRightBtnRef} class={rightIconClass.value} onClick={() => handleScroll('next')}>
                <ChevronRightIcon></ChevronRightIcon>
              </div>
            ) : null}
          </Transition>
          {props.addable ? (
            <div class={addIconClass.value} onClick={handleAddTab}>
              <AddIcon></AddIcon>
            </div>
          ) : null}
          {props.action}
        </div>,
      ];
    };
    const renderNavs = () => {
      const navContent = renderNavsContent();
      return (
        <div class={navContainerClass.value}>
          <div class={navScrollContainerClass.value} onWheel={handleWheel}>
            <div ref={navsWrapRef} class={navsWrapClass.value} style={wrapTransformStyle.value}>
              {props.theme !== 'card' && (
                <TTabNavBar placement={props.placement} value={props.value} navs={navContent} />
              )}
              {navContent}
            </div>
          </div>
        </div>
      );
    };

    return () => {
      return (
        <div ref={navsContainerRef} class={[`${componentName.value}__nav`]} style={navsContainerStyle.value}>
          {renderArrows()}
          {renderNavs()}
        </div>
      );
    };
  },
});
