export const DEFAULT_Z_INDEX = 6000;
export const DISTANCE = '16px';

export const PLACEMENT_OFFSET = {
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
