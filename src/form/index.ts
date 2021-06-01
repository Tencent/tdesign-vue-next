import _Form from './form';
import _FormItem from './form-item';
import { withInstall, WithInstallType } from '../utils/withInstall';

const Form: WithInstallType<typeof _Form> = withInstall(_Form);
const FormItem: WithInstallType<typeof _FormItem> = withInstall(_FormItem);

export * from '@TdTypes/form/TdFormProps';

export { Form, FormItem };
export default Form;
