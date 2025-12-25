import { TdImageViewerProps } from '../type';

export const getOverlay = (props: TdImageViewerProps) => {
  if (props.showOverlay !== undefined) {
    return props.showOverlay;
  }
  return props.mode === 'modal';
};
