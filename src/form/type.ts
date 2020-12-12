export type ValueType = any;

export interface FormData {
  [key: string]: any;
}

export type ErrorList = Array<ValidateRule>;

export interface ValidateResult {
  [key: string]: boolean | ErrorList;
};

export interface FormProps {
  data: Array<FormData>;
  labelAlign: 'left' | 'right' | 'top';
  layout: 'vertical' | 'inline';
  size: 'medium' | 'large';
  colon: boolean;
  requiredMark: boolean;
  scrollToFirstError: boolean;
  showErrorMessage: boolean;
  onValidate: (validateResult: ValidateResult) => void;
  onReset: () => void;
  onSubmit: () => void;
}

export interface FormItemProps {
  name: string;
  tooltip: string;
  label: string;
  for: string;
}

export type InnerValidator = 'required' | 'email' | 'date' | 'boolean' | 'number' | 'max' | 'min' | 'length' | 'idcard' | 'telnumber' | 'url' | 'enum' | 'pattern' | 'validator';

export type CustomValidator = (val: ValueType) => boolean | Promise<boolean>

export type ValidateRule = {
  validator: CustomValidator;
  message: string;
  trigger: 'change' | 'blur';
  type: 'error' | 'warning';
} & {
  [key in InnerValidator]: string;
}

export interface ValidateRules {
  [key: string]: Array<ValidateRule>;
}

export interface ValidateOptions {
  value: ValueType;
  rules: Array<ValidateRule>;
}

export type CustomValidate = (val: ValueType) => boolean | Promise<boolean>;

export type FormValidateResult = boolean | ValidateResult;
