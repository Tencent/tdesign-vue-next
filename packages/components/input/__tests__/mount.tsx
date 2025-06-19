// @ts-nocheck
import { mount } from '@vue/test-utils';
import { Input, InputGroup } from '@tdesign/components/input';

export function getInputGroupDefaultMount(props) {
  return mount(
    <InputGroup {...props}>
      <Input />
      <Input />
    </InputGroup>,
  );
}

export default getInputGroupDefaultMount;
