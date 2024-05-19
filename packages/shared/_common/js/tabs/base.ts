const getDomWidth = (dom: HTMLElement): number => dom?.offsetWidth || 0;

type navPlacement = 'left' | 'right' | 'top' | 'bottom';

export interface allElementDeps {
  activeTab?: HTMLElement;
  navsContainer?: HTMLElement;
  navsWrap?: HTMLElement;
  leftOperations?: HTMLElement;
  toLeftBtn?: HTMLElement;
  rightOperations?: HTMLElement;
  toRightBtn?: HTMLElement;
}

export default {
  /**
   * 计算滚动条的当前偏移值，用于 resize 时调整
   * @returns number
   */
  calcScrollLeft(elements: allElementDeps, scrollLeft: number): number {
    const container = elements.navsContainer;
    const wrap = elements.navsWrap;
    const { rightOperations } = elements;
    const rightOperationsZoneWidth = getDomWidth(rightOperations);

    if (!wrap || !container) return scrollLeft;

    const containerWidth = getDomWidth(container);
    const wrapWidth = getDomWidth(wrap);

    if (wrapWidth <= containerWidth) {
      // 容器大于选项，则设置第一个 nav-item 和容器左边相连
      return 0;
    }

    // 一般发生在 window.resize，容器变大，此时设置最后一个 nav-item 和容器右边相连
    if (scrollLeft + containerWidth - rightOperationsZoneWidth > wrapWidth) {
      return wrapWidth + rightOperationsZoneWidth - containerWidth;
    }

    return scrollLeft;
  },

  /**
   * 计算往左滚动按钮是否应该出现
   * @param depElement 计算时依赖的元素
   * @param scrollLeft 当前的 scrollLeft
   * @param placement navs 的位置
   * @returns boolean
   */
  calculateCanToLeft(depElement: allElementDeps, scrollLeft: number, placement: navPlacement) {
    if (['left', 'right'].includes(placement.toLowerCase())) {
      return false;
    }
    const { navsContainer: container, navsWrap: wrap, leftOperations, toLeftBtn } = depElement;
    if (!wrap || !container) {
      return false;
    }
    const leftOperationsZoneWidth = getDomWidth(leftOperations);
    const leftIconWidth = getDomWidth(toLeftBtn);

    return scrollLeft + Math.round(leftOperationsZoneWidth - leftIconWidth) > 0;
  },

  /**
   * 计算往右滚动按钮是否应该出现
   * @param depElement 计算时依赖的元素
   * @param scrollLeft 当前的偏移值
   * @param placement navs 的位置
   * @returns boolean
   */
  calculateCanToRight(depElement: allElementDeps, scrollLeft: number, placement: navPlacement) {
    if (['left', 'right'].includes(placement.toLowerCase())) {
      return false;
    }
    const { navsContainer: container, navsWrap: wrap, rightOperations, toRightBtn } = depElement;
    if (!wrap || !container) {
      return false;
    }
    const rightOperationsZoneWidth = getDomWidth(rightOperations);
    const rightIconWidth = getDomWidth(toRightBtn);
    return (
      scrollLeft + getDomWidth(container) - (rightOperationsZoneWidth - rightIconWidth)
      - getDomWidth(wrap) < -1
    ); // 小数像素不精确，所以这里判断小于-1
  },

  /**
   * 计算将当前 tab 滚动到可视区域的偏移值
   * @param depElement 计算时依赖的元素
   * @param scrollLeft 当前的偏移值
   * @returns number
   */
  moveActiveTabIntoView(depElement: allElementDeps, scrollLeft: number): number {
    const {
      activeTab,
      navsContainer: container,
      navsWrap,
      leftOperations,
      toLeftBtn,
      rightOperations,
      toRightBtn,
    } = depElement;
    if (!activeTab) return scrollLeft;
    const totalWidthBeforeActiveTab = activeTab.offsetLeft;
    if (!container) return scrollLeft;
    // 如果要当前tab左边对齐左操作栏的右边以展示完整的tab，需要获取左边操作栏的宽度
    const _getLeftCoverWidth = () => {
      const leftOperationsZoneWidth = getDomWidth(leftOperations);
      const leftIconWidth = getDomWidth(toLeftBtn);
      // 判断当前tab是不是第一个tab
      if (totalWidthBeforeActiveTab === 0) {
        // 如果是第一个tab要移动到最左边，则要减去左箭头的宽度，因为此时左箭头会被隐藏起来
        return leftOperationsZoneWidth - leftIconWidth;
      }
      return leftOperationsZoneWidth;
    };
    const leftCoverWidth = _getLeftCoverWidth();
    // 判断当前tab是不是在左边被隐藏
    const isCurrentTabHiddenInLeftZone = scrollLeft + leftCoverWidth > totalWidthBeforeActiveTab;
    if (isCurrentTabHiddenInLeftZone) {
      return totalWidthBeforeActiveTab - leftCoverWidth;
    }

    // move to right
    const activeTabWidth = activeTab.offsetWidth;
    if (!container || !navsWrap) return scrollLeft;
    const containerWidth = getDomWidth(container);
    // 如果要当前tab右边对齐右操作栏的左边以展示完整的tab，需要获取右边操作栏的宽度
    const _getRightCoverWidth = () => {
      const rightOperationsZoneWidth = getDomWidth(rightOperations);
      const rightIconWidth = getDomWidth(toRightBtn);
      const wrapWidth = getDomWidth(navsWrap);
      // 判断当前tab是不是最后一个tab，小于1是防止小数像素导致值不相等的情况
      if (Math.abs(totalWidthBeforeActiveTab + activeTabWidth - wrapWidth) < 1) {
        // 如果是最后一个tab，则要减去右箭头的宽度，因为此时右箭头会被隐藏
        return rightOperationsZoneWidth - rightIconWidth;
      }
      return rightOperationsZoneWidth;
    };
    const rightCoverWidth = _getRightCoverWidth();
    // 判断当前tab是不是在右边被隐藏
    const isHiddenInRightZone = scrollLeft + containerWidth - rightCoverWidth
      < totalWidthBeforeActiveTab + activeTabWidth;
    if (isHiddenInRightZone) {
      return totalWidthBeforeActiveTab + activeTabWidth - containerWidth + rightCoverWidth;
    }
    return scrollLeft;
  },

  /**
   * 计算点击“往左按钮”时，需要的偏移值
   * @param depElement 计算时依赖的元素
   * @param scrollLeft 当前的偏移值
   * @returns number
   */
  scrollToLeft(depElement: allElementDeps, scrollLeft: number): number {
    const { navsContainer: container, leftOperations, toLeftBtn } = depElement;
    if (!container) return 0;
    const leftOperationsZoneWidth = getDomWidth(leftOperations);
    const leftIconWidth = getDomWidth(toLeftBtn);
    const containerWidth = getDomWidth(container);

    return Math.max(-(leftOperationsZoneWidth - leftIconWidth), scrollLeft - containerWidth);
  },

  /**
   * 计算点击“往右按钮”时，需要的偏移值
   * @param depElement 计算时依赖的元素
   * @param scrollLeft 当前的偏移值
   * @returns number
   */
  scrollToRight(depElement: allElementDeps, scrollLeft: number): number {
    const { navsContainer: container, navsWrap: wrap, rightOperations, toRightBtn } = depElement;
    const rightOperationsZoneWidth = getDomWidth(rightOperations);
    const rightIconWidth = getDomWidth(toRightBtn);
    const containerWidth = getDomWidth(container);
    const wrapWidth = getDomWidth(wrap);

    return Math.min(
      scrollLeft + containerWidth - rightOperationsZoneWidth - rightIconWidth,
      wrapWidth - containerWidth + rightOperationsZoneWidth - rightIconWidth,
    );
  },
};
