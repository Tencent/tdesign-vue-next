import { mount } from '@vue/test-utils';
import { Button } from '../../button';

export function getSpaceDefaultMount(Space, props = {}, events = {}) {
  const { scopedSlots } = props;
  // eslint-disable-next-line
  delete props.scopedSlots;
  return mount({
    render() {
      return (
        <Space props={props} on={events} scopedSlots={scopedSlots}>
          <Button>Text</Button>
          <Button>Text</Button>
          <Button>Text</Button>
        </Space>
      );
    },
  });
}

export default getSpaceDefaultMount;
