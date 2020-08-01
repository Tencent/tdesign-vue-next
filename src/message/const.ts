export const THEME_LIST: string[] = [
  'info',
  'success',
  'warning',
  'error',
  'question',
  'loading',
];

export const PLACEMENT_LIST = ['top', 'center', 'left', 'left-top', 'right-top', 'right', 'right-bottom', 'bottom', 'left-bottom'];

const DISTANCE = '32px';

export const PLACEMENT_OFFSET = {
  center: {
    left: '50%',
    top: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
  },
  left: {
    left: DISTANCE,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  bottom: {
    bottom: DISTANCE,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  right: {
    right: DISTANCE,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  top: {
    top: DISTANCE,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  'left-top': {
    left: DISTANCE,
    top: DISTANCE,
  },
  'right-top': {
    right: DISTANCE,
    top: DISTANCE,
  },
  'right-bottom': {
    right: DISTANCE,
    bottom: DISTANCE,
  },
  'left-bottom': {
    left: DISTANCE,
    bottom: DISTANCE,
  },
};

export default {
  THEME_LIST,
};
