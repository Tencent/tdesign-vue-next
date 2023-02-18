import { TNode } from '../common';

export interface TdBackTopProps {
  fixed?: boolean;
  target?: () => HTMLElement;
  shape?: 'round' | 'square';
  visibilityHeight?: number;
  onToTop?: () => void;
  icon?: TNode;
  text?: string;
}
