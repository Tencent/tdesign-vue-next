export const THEME_LIST: string[] = ['info', 'success', 'warning', 'error', 'question', 'loading'];

const DISTANCE = '32px';

export const PLACEMENT_OFFSET = {
  top: {
    top: DISTANCE,
    left: DISTANCE,
    right: DISTANCE,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  center: {
    top: '50%',
    left: DISTANCE,
    right: DISTANCE,
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  left: {
    top: '50%',
    left: DISTANCE,
    right: DISTANCE,
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
  },
  bottom: {
    bottom: DISTANCE,
    left: DISTANCE,
    right: DISTANCE,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  right: {
    top: '50%',
    left: DISTANCE,
    right: DISTANCE,
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  'top-left': {
    top: DISTANCE,
    left: DISTANCE,
    right: DISTANCE,
    display: 'flex',
    flexDirection: 'column',
  },
  'top-right': {
    top: DISTANCE,
    left: DISTANCE,
    right: DISTANCE,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  'bottom-right': {
    bottom: DISTANCE,
    left: DISTANCE,
    right: DISTANCE,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  'bottom-left': {
    bottom: DISTANCE,
    left: DISTANCE,
    right: DISTANCE,
    display: 'flex',
    flexDirection: 'column',
  },
};

export const PLACEMENT_LIST = Object.keys(PLACEMENT_OFFSET);

export default {
  THEME_LIST,
};
