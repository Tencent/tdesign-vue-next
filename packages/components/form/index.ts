import _Form from './form';
import _FormItem from './form-item';
import { withInstall } from '@tdesign/shared-utils';
import { TdFormProps, TdFormItemProps, Data } from './type';

import './style';

export * from './type';
export type FormProps<FormData extends Data = Data> = TdFormProps<FormData>;
export type FormItemProps = TdFormItemProps;

export const Form = withInstall(_Form);
export const FormItem = withInstall(_FormItem);
export default Form;
