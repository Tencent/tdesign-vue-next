import { defineComponent, Transition } from 'vue';
import debounce from 'lodash/debounce';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon, AddIcon } from 'tdesign-icons-vue-next';
import { prefix } from '../config';
import TTabPanel from './tab-panel';
import TTabNavItem from './tab-nav-item';
import { emitEvent } from '../utils/event';
import { firstUpperCase } from '../utils/helper';
import { TdTabsProps, TdTabPanelProps as TabPanelProps } from './type';
import tabProps from './props';

const getDomWidth = (dom: HTMLElement): number => dom?.offsetWidth || 0;

const getActiveTabEl = (navs: Array<any>, value: TabPanelProps['value']): HTMLElement => {
  for (let i = 0; i < navs.length; i++) {
    if (navs[i].props.value === value) {
      return navs[i].el as HTMLElement;
    }
  }
  return null;
};

interface GetRightCoverWidth {
  rightZone: HTMLElement;
  rightIcon: HTMLElement;
  wrap: HTMLElement;
  totalWidthBeforeActiveTab: number;
  activeTabWidth: number;
}

// 如果要当前tab右边对齐右操作栏的左边以展示完整的tab，需要获取右边操作栏的宽度
const getRightCoverWidth = (p: GetRightCoverWidth) => {
  const rightOperationsZoneWidth = getDomWidth(p.rightZone);
  const rightIconWidth = getDomWidth(p.rightIcon as HTMLElement);
  const wrapWidth = getDomWidth(p.wrap);
  // 判断当前tab是不是最后一个tab，小于1是防止小数像素导致值不相等的情况
  if (Math.abs(p.totalWidthBeforeActiveTab + p.activeTabWidth - wrapWidth) < 1) {
    // 如果是最后一个tab，则要减去右箭头的宽度，因为此时右箭头会被隐藏
    return rightOperationsZoneWidth - rightIconWidth;
  }
  return rightOperationsZoneWidth;
};

export default defineComponent({
  name: 'TTabNav',
  components: {
    TTabNavItem,
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
  },
  data() {
    return {
      scrollLeft: 0,
      canToLeft: false,
      canToRight: false,
      navBarStyle: {},
    };
  },
  computed: {
    navs() {
      return this.panels.map((panel, index) => {
        let label;
        if (panel?.children?.label) {
          label = panel.children.label();
        } else {
          label = panel.label || `选项卡${index + 1}`;
        }
        return (
          <TTabNavItem
            key={panel.value}
            index={index}
            theme={this.theme}
            size={this.size}
            placement={this.placement}
            label={label}
            active={panel.value === this.value}
            disabled={this.disabled || panel.disabled}
            removable={panel.removable}
            value={panel.value}
            onClick={(e: MouseEvent) => this.tabClick(e, panel)}
            onRemove={this.removeBtnClick}
          ></TTabNavItem>
        );
      });
    },
    wrapTransformStyle(): { [key: string]: string } {
      if (['left', 'right'].includes(this.placement.toLowerCase())) return {};
      return {
        transform: `translate3d(${-this.scrollLeft}px, 0, 0)`,
      };
    },
    dataCanUpdateNavBarStyle(): Array<any> {
      return [this.scrollLeft, this.placement, this.theme, this.navs, this.value];
    },
    dataCanUpdateArrow(): Array<any> {
      return [this.scrollLeft, this.placement, this.navs];
    },
    iconBaseClass(): { [key: string]: boolean } {
      return {
        [`${prefix}-tabs__btn`]: true,
        [`${prefix}-size-m`]: this.size === 'medium',
        [`${prefix}-size-l`]: this.size === 'large',
      };
    },
    leftIconClass(): { [key: string]: boolean } {
      return {
        [`${prefix}-tabs__btn--left`]: true,
        ...this.iconBaseClass,
      };
    },
    rightIconClass(): { [key: string]: boolean } {
      return {
        [`${prefix}-tabs__btn--right`]: true,
        ...this.iconBaseClass,
      };
    },
    addIconClass(): { [key: string]: boolean } {
      return {
        [`${prefix}-tabs__add-btn`]: true,
        ...this.iconBaseClass,
      };
    },
    navContainerClass(): { [key: string]: boolean } {
      return {
        [`${prefix}-tabs__nav-container`]: true,
        [`${prefix}-tabs__nav--card`]: this.theme === 'card',
        [`${prefix}-is-${this.placement}`]: true,
        [`${prefix}-is-addable`]: this.theme === 'card' && this.addable,
      };
    },
    navScrollContainerClass(): { [key: string]: boolean } {
      return {
        [`${prefix}-tabs__nav-scroll`]: true,
        [`${prefix}-is-scrollable`]: this.canToLeft || this.canToRight,
      };
    },
    navsWrapClass(): Array<string | { [key: string]: boolean }> {
      return [
        `${prefix}-tabs__nav-wrap`,
        `${prefix}-is-smooth`,
        { [`${prefix}-is-vertical`]: this.placement === 'left' || this.placement === 'right' },
      ];
    },
    navBarClass(): Array<string> {
      return [`${prefix}-tabs__bar`, `${prefix}-is-${this.placement}`];
    },
  },
  watch: {
    dataCanUpdateArrow() {
      this.$nextTick(() => {
        this.caculateCanShowArrow();
      });
    },
    dataCanUpdateNavBarStyle() {
      this.$nextTick(() => {
        this.caculateNavBarStyle();
      });
    },
    value() {
      this.$nextTick(() => {
        this.moveActiveTabIntoView();
      });
    },
    navs() {
      this.$nextTick(() => {
        this.fixScrollLeft();
      });
    },
  },
  updated() {
    this.moveActiveTabIntoView({ needCheckUpdate: false });
  },
  mounted() {
    this.$nextTick(() => {
      this.watchDomChange();
      this.caculateNavBarStyle();
      this.caculateCanShowArrow();
    });
  },
  beforeUnmount() {
    this.cancelWatchDomChange();
  },
  methods: {
    caculateCanShowArrow() {
      this.caculateCanToLeft();
      this.caculateCanToRight();
    },

    caculateCanToLeft() {
      if (['left', 'right'].includes(this.placement.toLowerCase())) {
        this.canToLeft = false;
      }
      const container = this.$refs.navsContainer as HTMLElement;
      const wrap = this.$refs.navsWrap as HTMLElement;
      if (!wrap || !container) {
        this.canToLeft = false;
      }
      const leftOperationsZoneWidth = getDomWidth(this.$refs.leftOperationsZone as HTMLElement);
      const leftIconWidth = getDomWidth(this.$refs.leftIcon as HTMLElement);
      this.canToLeft = this.scrollLeft > -(leftOperationsZoneWidth - leftIconWidth);
    },

    caculateCanToRight() {
      if (['left', 'right'].includes(this.placement.toLowerCase())) {
        this.canToRight = false;
      }
      const container = this.$refs.navsContainer as HTMLElement;
      const wrap = this.$refs.navsWrap as HTMLElement;
      if (!wrap || !container) {
        this.canToRight = false;
      }
      this.canToRight = this.scrollLeft + getDomWidth(container) - getDomWidth(wrap) < -1; // 小数像素不精确，所以这里判断小于-1
    },

    caculateNavBarStyle() {
      const getNavBarStyle = () => {
        if (this.theme === 'card') return {};
        const getPropName = () => {
          if (['left', 'right'].includes(this.placement.toLowerCase())) {
            return ['height', 'top'];
          }
          return ['width', 'left'];
        };
        let offset = 0;
        const [sizePropName, offsetPropName] = getPropName();
        let i = 0;
        for (; i < this.navs.length; i++) {
          if (this.navs[i].props.value === this.value) {
            break;
          }
          offset += this.navs[i]?.el?.[`client${firstUpperCase(sizePropName)}`] || 0;
        }
        if (!this.navs[i]) return {};
        return {
          [offsetPropName]: `${offset}px`,
          [sizePropName]: `${this.navs[i].el?.[`client${firstUpperCase(sizePropName)}`] || 0}px`,
        };
      };
      this.navBarStyle = getNavBarStyle();
    },

    watchDomChange() {
      if (!this.$refs.navsContainer) return;
      if (!(window as Window & { ResizeObserver?: any }).ResizeObserver) return;
      this.resizeObserver = new (window as Window & { ResizeObserver?: any }).ResizeObserver(() => {
        this.resetScrollPosition();
      });
      this.resizeObserver.observe(this.$refs.navsContainer);
    },

    cancelWatchDomChange() {
      if (!this.resizeObserver) return;
      this.resizeObserver.disconnect();
    },

    resetScrollPosition: debounce(function (this: any) {
      this.caculateCanShowArrow();
    }, 300),

    handleScrollToLeft() {
      const container = this.$refs.navsContainer as HTMLElement;
      if (!container) return;
      const leftOperationsZoneWidth = getDomWidth(this.$refs.leftOperationsZone as HTMLElement);
      const leftIconWidth = getDomWidth(this.$refs.leftIcon as HTMLElement);
      const containerWidth = getDomWidth(container);
      this.scrollLeft = Math.max(-(leftOperationsZoneWidth - leftIconWidth), this.scrollLeft - containerWidth);
    },

    handleScrollToRight() {
      const container = this.$refs.navsContainer as HTMLElement;
      const wrap = this.$refs.navsWrap as HTMLElement;
      const rightOperationsZoneWidth = getDomWidth(this.$refs.rightOperationsZone as HTMLElement);
      const rightIconWidth = getDomWidth(this.$refs.rightIcon as HTMLElement);
      const containerWidth = getDomWidth(container);
      const wrapWidth = getDomWidth(wrap);
      this.scrollLeft = Math.min(
        this.scrollLeft + containerWidth,
        wrapWidth - containerWidth + rightOperationsZoneWidth - rightIconWidth,
      );
    },

    shouldMoveToLeftSide(activeTabEl: HTMLElement) {
      const totalWidthBeforeActiveTab = activeTabEl.offsetLeft;
      // 如果要当前tab左边对齐左操作栏的右边以展示完整的tab，需要获取左边操作栏的宽度
      const getLeftCoverWidth = () => {
        const leftOperationsZoneWidth = getDomWidth(this.$refs.leftOperationsZone as HTMLElement);
        const leftIconWidth = getDomWidth(this.$refs.leftIcon as HTMLElement);
        // 判断当前tab是不是第一个tab
        if (totalWidthBeforeActiveTab === 0) {
          // 如果是第一个tab要移动到最左边，则要减去左箭头的宽度，因为此时左箭头会被隐藏起来
          return leftOperationsZoneWidth - leftIconWidth;
        }
        return leftOperationsZoneWidth;
      };
      const leftCoverWidth = getLeftCoverWidth();
      // 判断当前tab是不是在左边被隐藏
      const isCurrentTabHiddenInLeftZone = () => this.scrollLeft + leftCoverWidth > totalWidthBeforeActiveTab;
      if (isCurrentTabHiddenInLeftZone()) {
        this.scrollLeft = totalWidthBeforeActiveTab - leftCoverWidth;
        return true;
      }
      return false;
    },

    shouldMoveToRightSide(activeTabEl: HTMLElement) {
      const totalWidthBeforeActiveTab = activeTabEl.offsetLeft;
      const activeTabWidth = activeTabEl.offsetWidth;
      const container = this.$refs.navsContainer as HTMLElement;
      const wrap = this.$refs.navsWrap as HTMLElement;
      if (!container || !wrap) return;
      const containerWidth = getDomWidth(container);
      const rightCoverWidth = getRightCoverWidth({
        rightZone: this.$refs.rightOperationsZone as HTMLElement,
        rightIcon: this.$refs.rightIcon as HTMLElement,
        wrap,
        totalWidthBeforeActiveTab,
        activeTabWidth,
      });
      // 判断当前tab是不是在右边被隐藏
      const isCurrentTabHiddenInRightZone = () =>
        this.scrollLeft + containerWidth - rightCoverWidth < totalWidthBeforeActiveTab + activeTabWidth;
      if (isCurrentTabHiddenInRightZone()) {
        this.scrollLeft = totalWidthBeforeActiveTab + activeTabWidth - containerWidth + rightCoverWidth;
        return true;
      }
      return false;
    },

    moveActiveTabIntoView({ needCheckUpdate } = { needCheckUpdate: true }) {
      if (['left', 'right'].includes(this.placement)) {
        return false;
      }
      const activeTabEl: HTMLElement = getActiveTabEl(this.navs, this.value);
      if (!activeTabEl) {
        return false;
      }
      return this.shouldMoveToLeftSide(activeTabEl) || this.shouldMoveToRightSide(activeTabEl);
    },

    fixIfLastItemNotTouchRightSide(containerWidth: number, wrapWidth: number) {
      const rightOperationsZoneWidth = getDomWidth(this.$refs.rightOperationsZone as HTMLElement);
      if (this.scrollLeft + containerWidth - rightOperationsZoneWidth > wrapWidth) {
        this.scrollLeft = wrapWidth + rightOperationsZoneWidth - containerWidth;
        return true;
      }
      return false;
    },

    fixIfItemTotalWidthIsLessThenContainerWidth(containerWidth: number, wrapWidth: number) {
      if (wrapWidth <= containerWidth) {
        this.scrollLeft = 0;
        return true;
      }
      return false;
    },

    fixScrollLeft() {
      if (['left', 'right'].includes(this.placement.toLowerCase())) return;
      const container = this.$refs.navsContainer as HTMLElement;
      const wrap = this.$refs.navsWrap as HTMLElement;
      if (!wrap || !container) return false;
      const containerWidth = getDomWidth(container);
      const wrapWidth = getDomWidth(wrap);
      return (
        this.fixIfItemTotalWidthIsLessThenContainerWidth(containerWidth, wrapWidth) ||
        this.fixIfLastItemNotTouchRightSide(containerWidth, wrapWidth)
      );
    },

    handleAddTab(e: MouseEvent) {
      emitEvent<Parameters<TdTabsProps['onAdd']>>(this, 'add', { e });
    },

    tabClick(event: MouseEvent, nav: Partial<InstanceType<typeof TTabPanel>>) {
      const { value, disabled } = nav;
      if (disabled || this.value === value) {
        return false;
      }
      emitEvent<Parameters<TdTabsProps['onChange']>>(this, 'change', value);
    },

    removeBtnClick({ e, value, index }: Parameters<TdTabsProps['onRemove']>[0]) {
      emitEvent<Parameters<TdTabsProps['onRemove']>>(this, 'remove', { e, value, index });
    },

    renderArrows() {
      return [
        <div ref="leftOperationsZone" class={[`${prefix}-tabs__operations`, `${prefix}-tabs__operations--left`]}>
          <transition name="fade" mode="out-in" appear>
            {this.canToLeft ? (
              <div ref="leftIcon" class={this.leftIconClass} onClick={this.handleScrollToLeft}>
                <ChevronLeftIcon />
              </div>
            ) : null}
          </transition>
        </div>,
        <div ref="rightOperationsZone" class={[`${prefix}-tabs__operations`, `${prefix}-tabs__operations--right`]}>
          <transition name="fade" mode="out-in" appear>
            {this.canToRight ? (
              <div ref="rightIcon" class={this.rightIconClass} onClick={this.handleScrollToRight}>
                <ChevronRightIcon></ChevronRightIcon>
              </div>
            ) : null}
          </transition>
          {this.theme === 'card' && this.addable ? (
            <div class={this.addIconClass} onClick={this.handleAddTab}>
              <AddIcon></AddIcon>
            </div>
          ) : null}
        </div>,
      ];
    },
    renderNavs() {
      return (
        <div class={this.navContainerClass}>
          <div class={this.navScrollContainerClass}>
            <div ref="navsWrap" class={this.navsWrapClass} style={this.wrapTransformStyle}>
              {this.renderNavBar()}
              {this.navs}
            </div>
          </div>
        </div>
      );
    },
    renderNavBar() {
      if (this.theme === 'card') return null;
      return <div class={this.navBarClass} style={this.navBarStyle}></div>;
    },
  },

  render() {
    return (
      <div ref="navsContainer" class={[`${prefix}-tabs__nav`]}>
        {this.renderArrows()}
        {this.renderNavs()}
      </div>
    );
  },
});
