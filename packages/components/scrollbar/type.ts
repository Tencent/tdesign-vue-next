/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

export interface TdScrollbarProps {
  /**
   * 视图层的 aria-label 文本
   * @default ''
   */
  ariaLabel?: string;
  /**
   * 滚动条 hover 时是否向外扩展（增加交互热区）
   * @default true
   */
  autoExpand?: boolean;
  /**
   * 容器尺寸是否响应变化
   * @default true
   */
  autoresize?: boolean;
  /**
   * 设置滚动容器的最大高度/宽度
   */
  container?: {
    height?: string | number;
    maxHeight?: string | number;
    width?: string | number;
    maxWidth?: string | number;
  };
  /**
   * 禁止滚动
   * @default false
   */
  disabled?: boolean;
  /**
   * 视图层的 ID
   * @default ''
   */
  id?: string;
  /**
   * 视图层的 WAI-ARIA 角色
   * @default scrollbar
   */
  role?: string;
  /**
   * 滚动步长
   */
  step?: { x?: number; y?: number };
  /**
   * 包裹容器的 tabindex
   */
  tabindex?: string | number;
  /**
   * 滚动条滑块的最小尺寸（px）
   * @default 20
   */
  thumbMinSize?: number;
  /**
   * 视图（内容区）的自定义类名
   * @default ''
   */
  viewClassName?: string;
  /**
   * 滚动条的显示形式
   * @default hover
   */
  visibility?: 'always' | 'hover' | 'hide';
  /**
   * 包裹容器的自定义类名
   * @default ''
   */
  wrapClassName?: string;
  /**
   * 滚动时触发
   */
  onScroll?: ({ scrollTop: number, scrollLeft: number }) => void;
}

/** 组件实例方法 */
export interface ScrollbarInstanceFunctions {
  /**
   * 获取包含完整滚动信息的视图对象
   */
  getValues: () => PositionValues;
  /**
   * 滚动到一组特定坐标
   */
  scrollTo: ScrollToFn;
  /**
   * 滚动到某一边
   */
  scrollToEdge: (position: PositionEdge) => void;
}

export interface PositionValues {
  left: number;
  top: number;
  scrollLeft: number;
  scrollTop: number;
  scrollWidth: number;
  scrollHeight: number;
  clientWidth: number;
  clientHeight: number;
}

export type ScrollToFn = {
  (x: number, y: number): void;
  (options: { top?: number; left?: number; behavior?: ScrollBehavior }): void;
};

export type PositionEdge = 'left' | 'right' | 'top' | 'bottom';
