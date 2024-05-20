import { mount } from '@vue/test-utils';
import { Input } from '..';

export function getInputGroupDefaultMount(InputGroup, props) {
  return mount({
    render() {
      return (
        <InputGroup props={props}>
          <Input />
          <Input />
        </InputGroup>
      );
    },
  });
}

export default getInputGroupDefaultMount;
