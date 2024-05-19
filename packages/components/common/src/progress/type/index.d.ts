import { VNode } from 'vue';
import { ClassName } from '../../common';

export interface ProgressProps {
  theme?: string;
  percentage?: number;
  label?: boolean | (() => VNode);
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
