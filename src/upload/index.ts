import { prefix } from '../config';
const name = `${prefix}-upload`;
import { withInstall, WithInstallType } from '../utils/withInstall';

import { defineComponent } from 'vue';

const Component = defineComponent({
  name,
})

export const Upload: WithInstallType<typeof Component> = withInstall(Component);

export default Upload;