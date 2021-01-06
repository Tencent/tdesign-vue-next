import Form from './form';
import FormItem from './form-item';
import setInstallFn from '../utils/setInstallFn';

setInstallFn('Form', Form);
setInstallFn('FormItem', FormItem);

export * from '@TdTypes/form/TdFormProps';

export { Form, FormItem };
export default Form;
