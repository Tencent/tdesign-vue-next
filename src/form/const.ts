import { prefix } from '../config';

export const FORM_ITEM_CLASS_PREFIX = 't-form-item__';

const form = `${prefix}-form`;
const input = `${prefix}-input`;

export const CLASS_NAMES = {
  form,
  row: `${prefix}-row`,
  col: `${prefix}-col`,
  col1: `${prefix}-col-1`,
  col12: `${prefix}-col-12`,
  label: `${form}__label`,
  labelTop: `${form}__label--top`,
  inline: `${form}-inline`,
  formItem: `${form}__item`,
  controls: `${form}__controls`,
  controlsContent: `${form}__controls--content`,
  status: `${form}__status`,
  extra: `${input}__extra`,
};
