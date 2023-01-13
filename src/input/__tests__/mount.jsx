import { mount } from '@vue/test-utils';
import { Input } from '..';

export function getInputGroupDefaultMount(InputGroup, props) {
  return mount(
    <InputGroup {...props}>
      <Input />
      <Input />
    </InputGroup>,
  );
}

export default getInputGroupDefaultMount;
