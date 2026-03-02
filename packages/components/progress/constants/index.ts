export const PRO_THEME = {
  LINE: 'line',
  PLUMP: 'plump',
  CIRCLE: 'circle',
};
export const CIRCLE_SIZE = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};
export const CIRCLE_SIZE_PX = {
  SMALL: 72,
  MEDIUM: 112,
  LARGE: 160,
};
export const CIRCLE_FONT_SIZE_RATIO = {
  SMALL: 14 / CIRCLE_SIZE_PX.SMALL,
  MEDIUM: 20 / CIRCLE_SIZE_PX.MEDIUM,
  LARGE: 36 / CIRCLE_SIZE_PX.LARGE,
};
export const STATUS_TEXT = ['success', 'error', 'warning', 'active', 'normal'];
export const STATUS_ICON = ['success', 'error', 'warning'];

export default {
  PRO_THEME,
  CIRCLE_SIZE,
  CIRCLE_SIZE_PX,
  STATUS_TEXT,
  STATUS_ICON,
};
