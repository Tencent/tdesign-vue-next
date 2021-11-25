export const THEME_LIST: string[] = ['info', 'success', 'warning', 'error', 'question', 'loading'];

const DISTANCE = '32px';

export const PLACEMENT_OFFSET = {
  top: {
    top: DISTANCE,
    left: '50%',
    transform: 'translateX(-50%)',
  },
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
  'top-left': {
    left: DISTANCE,
    top: DISTANCE,
  },
  'top-right': {
    right: DISTANCE,
    top: DISTANCE,
  },
  'bottom-right': {
    right: DISTANCE,
    bottom: DISTANCE,
  },
  'bottom-left': {
    left: DISTANCE,
    bottom: DISTANCE,
  },
};

export const PLACEMENT_LIST = Object.keys(PLACEMENT_OFFSET);

export default {
  THEME_LIST,
};
