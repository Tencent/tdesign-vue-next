import { prefix } from '../config';
const name = `${prefix}-time-picker`;
import { withInstall, WithInstallType } from '../utils/withInstall';

import { defineComponent } from 'vue';

const Component = defineComponent({
  name,
})

export const TimePicker: WithInstallType<typeof Component> = withInstall(Component);

export default TimePicker;