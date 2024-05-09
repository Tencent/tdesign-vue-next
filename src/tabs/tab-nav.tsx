import { h, defineComponent, Transition, ref, computed, watch, onMounted, nextTick } from 'vue';

import debounce from 'lodash/debounce';
import isFunction from 'lodash/isFunction';
import {
  ChevronLeftIcon as TdChevronLeftIcon,
  ChevronRightIcon as TdChevronRightIcon,
  AddIcon as TdAddIcon,
} from 'tdesign-icons-vue-next';

import tabBase from '../_common/js/tabs/base';
import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import useDragSort from '../hooks/useDragSort';
import { useGlobalIcon } from '../hooks/useGlobalIcon';
import { useResize } from '../hooks/useListener';

import tabProps from './props';
import TTabNavBar from './tab-nav-bar';
import TTabNavItem from './tab-nav-item';
import TTabPanel from './tab-panel';
import { TdTabsProps } from './type';

// 子组件

// hooks

const { calculateCanToLeft, calculateCanToRight, calcScrollLeft, scrollToLeft, scrollToRight, moveActiveTabIntoView } =
  tabBase;

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
    const canToLeft = ref(false);
    const canToRight = ref(false);

    // refs
    // const panels = ref(props.panels);
    const navsContainerRef = ref();
    const navsWrapRef = ref();
    const leftOperationsRef = ref();
    const toLeftBtnRef = ref();
    const rightOperationsRef = ref();
    const toRightBtnRef = ref();
    const activeTabRef = ref();

    const getRefs = () => ({
      navsContainer: navsContainerRef.value,
      navsWrap: navsWrapRef.value,
      leftOperations: leftOperationsRef.value,
      toLeftBtn: toLeftBtnRef.value,
      rightOperations: rightOperationsRef.value,
      toRightBtn: toRightBtnRef.value,
    });

    // left right位置 选项卡的位置是在左右侧垂直方向铺开的
    const isVerticalPlacement = computed(() => ['left', 'right'].includes(props.placement.toLowerCase()));

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

    const totalAdjust = () => {
      nextTick(() => {
        adjustArrowDisplay();
        adjustScrollLeft();
      });
    };
    // watch
    watch([scrollLeft, () => props.placement, () => props.panels], totalAdjust);

    // life times
    useResize(debounce(totalAdjust), navsContainerRef.value);

    onMounted(() => {
      calculateMountedScrollLeft();
      totalAdjust();
    });

    // calculate scroll left after mounted
    const calculateMountedScrollLeft = () => {
      if (isVerticalPlacement.value) return;
      nextTick(() => {
        const container = navsContainerRef.value;
        const activeTabEl = activeTabRef.value;
        const activeTabWidth = activeTabEl?.offsetWidth || 0;
        const containerWidth = container?.offsetWidth || 0;

        const activeElIndex = Array.prototype.indexOf.call(navsWrapRef.value.children, activeTabEl); // index of the active tab

        const isRightBtnShow =
          navs.value.length - activeElIndex >= Math.round((containerWidth - activeTabWidth) / activeTabWidth) ? 1 : 0; // calculate whether the right btn is display or not
        const totalWidthBeforeActiveTab = activeTabEl?.offsetLeft;
        if (totalWidthBeforeActiveTab > containerWidth - activeTabWidth)
          scrollLeft.value = totalWidthBeforeActiveTab - isRightBtnShow * activeTabWidth;
      });
    };

    // methods
    const adjustScrollLeft = () => {
      scrollLeft.value = calcScrollLeft(getRefs(), scrollLeft.value);
    };

    const adjustArrowDisplay = () => {
      canToLeft.value = calculateCanToLeft(getRefs(), scrollLeft.value, props.placement);
      canToRight.value = calculateCanToRight(getRefs(), scrollLeft.value, props.placement);
    };

    const handleScroll = (direction: 'left' | 'right') => {
      if (direction === 'left') {
        scrollLeft.value = scrollToLeft(getRefs(), scrollLeft.value);
      } else {
        scrollLeft.value = scrollToRight(getRefs(), scrollLeft.value);
      }
    };

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
        scrollLeft.value = moveActiveTabIntoView(
          {
            activeTab: activeTabRef.value,
            ...getRefs(),
          },
          scrollLeft.value,
        );
      }
    };

    const { setNavsWrap } = useDragSort(props);

    onMounted(() => {
      setNavsWrap(navsWrapRef.value);
    });
    // renders
    const navs = computed(() => {
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
    });
    const renderArrows = () => {
      return [
        <div
          ref={leftOperationsRef}
          class={[`${componentName.value}__operations`, `${componentName.value}__operations--left`]}
        >
          <Transition name="fade" mode="out-in" appear>
            {canToLeft.value ? (
              <div ref={toLeftBtnRef} class={leftIconClass.value} onClick={() => handleScroll('left')}>
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
              <div ref={toRightBtnRef} class={rightIconClass.value} onClick={() => handleScroll('right')}>
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
      return (
        <div class={navContainerClass.value}>
          <div class={navScrollContainerClass.value}>
            <div ref={navsWrapRef} class={navsWrapClass.value} style={wrapTransformStyle.value}>
              {props.theme !== 'card' && (
                <TTabNavBar placement={props.placement} value={props.value} navs={navs.value} />
              )}
              {navs.value}
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
