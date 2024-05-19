import { withInstall } from '@td/adapter-utils';
import type { Data, TdFormItemProps, TdFormProps } from '@td/intel/form/type';
import _Form from './form';
import _FormItem from './form-item';

import './style';

export * from '@td/intel/form/type';
export type FormProps<FormData extends Data = Data> = TdFormProps<FormData>;
export type FormItemProps = TdFormItemProps;

export const Form = withInstall(_Form);
export const FormItem = withInstall(_FormItem);
export default Form;
