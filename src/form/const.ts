import { prefix } from '../config';

export const FORM_ITEM_CLASS_PREFIX = 't-form-item__';

const form = `${prefix}-form`;
const input = `${prefix}-input`;
const is = `${prefix}-is`;

export const CLASS_NAMES = {
  form,
  label: `${form}__label`,
  labelTop: `${form}__label--top`,
  inline: `${form}-inline`,
  formItem: `${form}__item`,
  formItemWithHelp: `${form}__item-with-help`,
  formItemWithExtra: `${form}__item-with-extra`,
  controls: `${form}__controls`,
  controlsContent: `${form}__controls--content`,
  status: `${form}__status`,
  help: `${form}__help`,
  extra: `${input}__extra`,
  success: `${is}-success`,
  successBorder: `${form}--success-border`,
  error: `${is}-error`,
  warning: `${is}-warning`,
};
