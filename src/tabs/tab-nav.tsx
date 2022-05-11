import { defineComponent, Transition, ref, computed, watch, onMounted } from 'vue';
import debounce from 'lodash/debounce';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon, AddIcon } from 'tdesign-icons-vue-next';
import { TdTabsProps } from './type';
import tabProps from './props';
import tabBase from '../_common/js/tabs/base';

// 子组件
import TTabPanel from './tab-panel';
import TTabNavItem from './tab-nav-item';
import TTabNavBar from './tab-nav-bar';

// hooks
import { useResize } from '../hooks/useListener';
import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import useDragSort from '../hooks/useDragSort';

const { calculateCanToLeft, calculateCanToRight, calcScrollLeft, scrollToLeft, scrollToRight, moveActiveTabIntoView } =
  tabBase;

export default defineComponent({
  name: 'TTabNav',
  components: {
    TTabNavItem,
    TTabNavBar,
    ChevronLeftIcon,
    ChevronRightIcon,
    CloseIcon,
    AddIcon,
    Transition,
  },
  ...{ resizeObserver: null },
  props: {
    theme: tabProps.theme,
    panels: {
      type: Array as { new (): Array<InstanceType<typeof TTabPanel>> },
      default: (): Array<InstanceType<typeof TTabPanel>> => [] as Array<InstanceType<typeof TTabPanel>>,
    },
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
    const COMPONENT_NAME = usePrefixClass('tabs');
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

    // style
    const wrapTransformStyle = computed(() => {
      if (['left', 'right'].includes(props.placement.toLowerCase())) return {};
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
        [`${COMPONENT_NAME.value}__btn`]: true,
        [SIZE.value.medium]: props.size === 'medium',
        [SIZE.value.large]: props.size === 'large',
      };
    });
    const leftIconClass = computed(() => {
      return {
        [`${COMPONENT_NAME.value}__btn--left`]: true,
        ...iconBaseClass.value,
      };
    });
    const rightIconClass = computed(() => {
      return {
        [`${COMPONENT_NAME.value}__btn--right`]: true,
        ...iconBaseClass.value,
      };
    });
    const addIconClass = computed(() => {
      return {
        [`${COMPONENT_NAME.value}__add-btn`]: true,
        ...iconBaseClass.value,
      };
    });
    const navContainerClass = computed(() => {
      return {
        [`${COMPONENT_NAME.value}__nav-container`]: true,
        [`${COMPONENT_NAME.value}__nav--card`]: props.theme === 'card',
        [`${classPrefix.value}-is-${props.placement}`]: true,
        [`${classPrefix.value}-is-addable`]: props.theme === 'card' && props.addable,
      };
    });
    const navScrollContainerClass = computed(() => {
      return {
        [`${COMPONENT_NAME.value}__nav-scroll`]: true,
        [`${classPrefix.value}-is-scrollable`]: canToLeft.value || canToRight.value,
      };
    });

    const navsWrapClass = computed(() => {
      return [
        `${COMPONENT_NAME.value}__nav-wrap`,
        `${classPrefix.value}-is-smooth`,
        { [`${classPrefix.value}-is-vertical`]: props.placement === 'left' || props.placement === 'right' },
      ];
    });

    const totalAdjust = () => {
      adjustArrowDisplay();
      adjustScrollLeft();
    };
    // watch
    watch([scrollLeft, () => props.placement], totalAdjust);

    // life times
    useResize(debounce(totalAdjust), navsContainerRef.value);
    onMounted(totalAdjust);

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
        } else {
          label = panel.label || `选项卡${index + 1}`;
        }

        return (
          <TTabNavItem
            ref={setActiveTab}
            draggable={props.dragSort}
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
          ></TTabNavItem>
        );
      });
    });
    const renderArrows = () => {
      return [
        <div
          ref={leftOperationsRef}
          class={[`${COMPONENT_NAME.value}__operations`, `${COMPONENT_NAME.value}__operations--left`]}
        >
          <transition name="fade" mode="out-in" appear>
            {canToLeft.value ? (
              <div ref={toLeftBtnRef} class={leftIconClass.value} onClick={() => handleScroll('left')}>
                <ChevronLeftIcon />
              </div>
            ) : null}
          </transition>
        </div>,
        <div
          ref={rightOperationsRef}
          class={[`${COMPONENT_NAME.value}__operations`, `${COMPONENT_NAME.value}__operations--right`]}
        >
          <transition name="fade" mode="out-in" appear>
            {canToRight.value ? (
              <div ref={toRightBtnRef} class={rightIconClass.value} onClick={() => handleScroll('right')}>
                <ChevronRightIcon></ChevronRightIcon>
              </div>
            ) : null}
          </transition>
          {props.theme === 'card' && props.addable ? (
            <div class={addIconClass.value} onClick={handleAddTab}>
              <AddIcon></AddIcon>
            </div>
          ) : null}
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
        <div ref={navsContainerRef} class={[`${COMPONENT_NAME.value}__nav`]} style={navsContainerStyle.value}>
          {renderArrows()}
          {renderNavs()}
        </div>
      );
    };
  },
});
