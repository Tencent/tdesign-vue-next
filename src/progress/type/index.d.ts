
import { VNode } from 'vue/types/umd';

export interface ProgressProps {
  theme?: string;
  percentage?: number;
  label?: boolean |  (() => VNode) | TNode;
  status?: string;
  color?: string | any;
  trackColor?: string;
  strokeWidth?: string | number;
  size?: string;
  className?: ClassName;
}

export interface DiameterType {
  getDiameter?: number;
}
