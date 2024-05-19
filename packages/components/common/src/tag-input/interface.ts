import { Ref } from '@td/adapter-vue';
import { TdTagInputProps } from '@td/intel/tag-input/type';

interface DragSortContext<T> {
  currentIndex: number;
  current: T;
  targetIndex: number;
  target: T;
}

export interface DragSortProps<T> {
  sortOnDraggable: boolean;
  onDragSort?: (context: DragSortContext<T>) => void;
  onDragOverCheck?: {
    x?: boolean;
    targetClassNameRegExp?: RegExp;
  };
}

type DragFnType = (e?: DragEvent, index?: number, record?: any) => void;
interface DragSortInnerData {
  dragging?: boolean;
  onDragStart?: DragFnType;
  onDragOver?: DragFnType;
  onDrop?: DragFnType;
  onDragEnd?: DragFnType;
}

export interface DragSortInnerProps extends DragSortInnerData {
  getDragProps?: (index?: number, record?: any, tagRef?: Ref<HTMLElement>) => DragSortInnerData;
}

export interface TagInputProps extends TdTagInputProps, DragSortInnerProps {}
