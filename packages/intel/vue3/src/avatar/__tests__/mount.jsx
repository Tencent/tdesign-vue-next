import { mount } from '@vue/test-utils';
import { Avatar } from 'tdesign-vue-next';

// Avatar 数量变化会影响测试用例结果
export function getAvatarGroupDefaultMount(AvatarGroup, props, events) {
  return mount(
    <AvatarGroup {...props} {...events}>
      <Avatar image="https://tdesign.gtimg.com/site/avatar.jpg" />
      <Avatar>W</Avatar>
      <Avatar icon={() => <i class="custom-node"></i>} />
      <Avatar size="small">TD</Avatar>
      <Avatar size="large">ME</Avatar>
    </AvatarGroup>,
  );
}

export default getAvatarGroupDefaultMount;
