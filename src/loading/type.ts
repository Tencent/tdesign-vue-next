export interface LoadingProps {
  loading: boolean;
  indicator?: () => void;
  text?: string;
  size?: string;
  delay?: number;
  fullscreen?: boolean;
  className?: string;
  showOverlay?: boolean;
  preventScrollThrough?: boolean;
  isService?: boolean;
}
