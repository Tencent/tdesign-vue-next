import { computed, InjectionKey } from 'vue';
import { FormItemValidateResult } from '@src/form/form-item';
import { usePrefixClass, useTNodeJSX } from '../hooks';
import { FormItemValidateMessage, TdFormItemProps, TdFormProps, ValidateResultType, ValidateTriggerType } from './type';

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
      help: `${input}__help`,
      success: `${is}-success`,
      successBorder: `${form}--success-border`,
      error: `${is}-error`,
      warning: `${is}-warning`,
    };
  });
};

export type ErrorListType =
  | {
      result: false;
      message: string;
      type: 'error' | 'warning';
    }
  | ValidateResultType;

export type SuccessListType =
  | {
      result: true;
      message: string;
      type: 'success';
    }
  | ValidateResultType;

export interface FormItemContext {
  name: TdFormItemProps['name'];
  resetHandler: () => void;
  resetField: (resetType?: 'initial' | 'empty') => Promise<void>;
  validate: <T>(trigger: ValidateTriggerType) => Promise<FormItemValidateResult<T>>;
  setValidateMessage: (validateMessage: FormItemValidateMessage[]) => void;
}

export const FormInjectionKey: InjectionKey<{
  showErrorMessage: TdFormProps['showErrorMessage'];
  labelWidth: TdFormProps['labelWidth'];
  labelAlign: TdFormProps['labelAlign'];
  data: TdFormProps['data'];
  colon: TdFormProps['colon'];
  requiredMark: TdFormProps['requiredMark'];
  rules: TdFormProps['rules'];
  errorMessage: TdFormProps['errorMessage'];
  resetType: TdFormProps['resetType'];
  children: FormItemContext[];
  renderContent: ReturnType<typeof useTNodeJSX>;
}> = Symbol('FormProvide');

export const FormItemInjectionKey: InjectionKey<{
  handleBlur: () => Promise<void>;
}> = Symbol('FormItemProvide');
