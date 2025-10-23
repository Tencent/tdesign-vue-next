import { mount } from '@vue/test-utils';
import { Avatar, AvatarGroup } from '@tdesign/components';
import { TdAvatarGroupProps } from '@tdesign/components/avatar/type';
// Avatar 数量变化会影响测试用例结果
export function getAvatarGroupDefaultMount(props: TdAvatarGroupProps, slots: Record<string, any> = {}) {
  return mount(
    <AvatarGroup {...props} v-slots={slots}>
      <Avatar image="https://tdesign.gtimg.com/site/avatar.jpg" />
      <Avatar>W</Avatar>
      <Avatar icon={() => <i class="custom-node"></i>} />
      <Avatar size="small">TD</Avatar>
      <Avatar size="large">ME</Avatar>
    </AvatarGroup>,
  );
}

export default getAvatarGroupDefaultMount;
