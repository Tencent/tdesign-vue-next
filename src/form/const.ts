import { prefix } from '../config';

export const FORM_ITEM_CLASS_PREFIX = 't-form-item__';

const form = `${prefix}-form`;
const input = `${prefix}-input`;
const is = `${prefix}-is`;

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
  help: `${form}__help`,
  extra: `${input}__extra`,
  success: `${is}-success`,
  error: `${is}-error`,
  warning: `${is}-warning`,
};
