import { prefix } from '../config';
const name = `${prefix}-dropdown`;
import { defineComponent } from 'vue';
import { withInstall, WithInstallType } from '../utils/withInstall';

const Component = defineComponent({
  name
})

export const Dropdown: WithInstallType<typeof Component> = withInstall(Component);

export default Dropdown;