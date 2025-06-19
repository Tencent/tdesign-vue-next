import { mount } from '@vue/test-utils';
import { Button, Space } from '@tdesign/components';

export function getSpaceDefaultMount(props = {}, events = {}) {
  const slots = props['v-slots'];
  // eslint-disable-next-line
  delete props['v-slots'];
  return mount({
    render() {
      return (
        <Space {...props} {...events} v-slots={slots}>
          <Button>Text</Button>
          <Button>Text</Button>
          <Button>Text</Button>
        </Space>
      );
    },
  });
}

export default getSpaceDefaultMount;
