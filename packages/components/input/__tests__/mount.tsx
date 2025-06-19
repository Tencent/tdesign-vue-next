import { mount } from '@vue/test-utils';
import { Input } from '@tdesign/components/input';

export function getInputGroupDefaultMount(InputGroup, props) {
  return mount(
    <InputGroup {...props}>
      <Input />
      <Input />
    </InputGroup>,
  );
}

export default getInputGroupDefaultMount;
