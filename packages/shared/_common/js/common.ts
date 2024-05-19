export type PlainObject = { [key: string]: any };

export type OptionData = {
  label?: string;
  value?: string | number;
} & PlainObject;

export type TreeOptionData<T = string | number> = {
  children?: Array<TreeOptionData<T>> | boolean;
  /** option label content */
  label?: any;
  /** option search text */
  text?: string;
  /** option value */
  value?: T;
} & PlainObject;

export type SizeEnum = 'small' | 'medium' | 'large';

export type HorizontalAlignEnum = 'left' | 'center' | 'right';

export type VerticalAlignEnum = 'top' | 'middle' | 'bottom';

export type ClassName = { [className: string]: any } | ClassName[] | string;

export type CSSSelector = string;

export interface Styles {
  [css: string]: string | number;
}

export enum EKeyboardDirection {
  left = 37,
  up = 38,
  right = 39,
  down = 40,
}

export const ARROW_DOWN_REG = /^ArrowDown$/i;
export const ARROW_UP_REG = /^ArrowUp$/i;
export const ESCAPE_REG = /^Escape$/i;
export const SPACE_REG = /^Space$/i;
export const ENTER_REG = /^Enter$/i;
export const SHIFT_REG = /^(Shift|ShiftLeft|ShiftRight)$/i;
export const CLEAR_REG = /^KeyC$/i;
export const ALL_REG = /^(KeyA|KeyL)$/i;
export const CHECKED_CODE_REG = /^(Enter|Space)$/i;
