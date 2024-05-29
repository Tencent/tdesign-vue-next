import { mount } from '@vue/test-utils';
import { Input } from  'tdesign-vue-next'

export function getInputGroupDefaultMount(InputGroup, props) {
  return mount(
    <InputGroup {...props}>
      <Input />
      <Input />
    </InputGroup>,
  );
}

export default getInputGroupDefaultMount;
