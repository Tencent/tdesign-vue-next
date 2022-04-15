import { computed } from 'vue';
import { usePrefixClass } from '../hooks/useConfig';

// 允许 Form 统一控制的表单
export const FORM_CONTROL_COMPONENTS = [
  'TInput',
  'TInputNumber',
  'TTextarea',
  'TCascader',
  'TSelect',
  'TOption',
  'TSwitch',
  'TCheckbox',
  'TCheckboxGroup',
  'TRadio',
  'TRadioGroup',
  'TTreeSelect',
  'TDatePicker',
  'TTimePicker',
  'TUpload',
  'TTransfer',
  'TSlider',
];

export const useCLASSNAMES = () => {
  const classPrefix = usePrefixClass();

  return computed(() => {
    const form = `${classPrefix.value}-form`;
    const input = `${classPrefix.value}-input`;
    const is = `${classPrefix.value}-is`;

    return {
      form,
      label: `${form}__label`,
      labelTop: `${form}__label--top`,
      inline: `${form}-inline`,
      formItem: `${form}__item`,
      formItemWithHelp: `${form}__item-with-help`,
      formItemWithExtra: `${form}__item-with-extra`,
      controls: `${form}__controls`,
      controlsContent: `${form}__controls-content`,
      status: `${form}__status`,
      extra: `${input}__extra`,
      success: `${is}-success`,
      successBorder: `${form}--success-border`,
      error: `${is}-error`,
      warning: `${is}-warning`,
    };
  });
};
