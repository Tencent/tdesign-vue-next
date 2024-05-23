import { mount } from '@vue/test-utils';
import { expect, it, vi } from 'vitest';
import { nextTick } from '@td/adapter-vue';
import Avatar, { AvatarGroup } from 'tdesign-vue-next';
import { UserIcon } from 'tdesign-icons-vue-next';

// every component needs four parts: props/events/slots/functions.
describe('avatar', () => {
  // test props api
  describe(':props', () => {
    it(':image', () => {
      const wrapper = mount({
        render() {
          return <Avatar image="https://tdesign.gtimg.com/site/avatar.jpg"></Avatar>;
        },
      });
      const avatar = wrapper.find('.t-avatar');
      const img = avatar.find('img');
      expect(avatar.exists()).toBeTruthy();
      expect(img.exists()).toBeTruthy();
      expect(img.element.getAttribute('src')).toBe('https://tdesign.gtimg.com/site/avatar.jpg');
    });
    it(':icon', () => {
      const wrapper = mount(<Avatar icon={() => <UserIcon />} />);
      const icon = wrapper.find('.t-avatar__icon');
      expect(icon.exists()).toBeTruthy();
    });
    it(':shape', () => {
      const wrapper = mount({
        render() {
          return (
            <div>
              <Avatar shape="round">W</Avatar>
              <Avatar shape="circle">W</Avatar>
            </div>
          );
        },
      });
      const avatars = wrapper.findAll('.t-avatar');
      expect(avatars[0].classes()).toContain('t-avatar--round');
      expect(avatars[1].classes()).toContain('t-avatar--circle');
    });
    it(':size', async () => {
      const wrapper = mount(() => (
        <div>
          <Avatar size="small">Avatar</Avatar>
          <Avatar size="medium">W</Avatar>
          <Avatar size="large">W</Avatar>
          <Avatar size="80px">Avatar</Avatar>
        </div>
      ));
      const avatars = wrapper.findAll('.t-avatar');
      await nextTick();
      expect(avatars[0].classes()).toContain('t-size-s');
      expect(avatars[1].classes()).toContain('t-size-m');
      expect(avatars[2].classes()).toContain('t-size-l');
      expect(getComputedStyle(avatars[3].element, null).width).toBe('80px');
      expect(getComputedStyle(avatars[3].element, null).height).toBe('80px');
    });
  });

  describe('<slot>', () => {
    it('<icon>', () => {
      const slots = {
        icon: () => <div>i</div>,
      };
      const wrapper = mount(<Avatar v-slots={slots} />);
      const icon = wrapper.find('.t-avatar__icon');
      expect(icon.exists()).toBeTruthy();
      expect(icon.text()).toBe('i');
    });
  });
});

describe('avatar Events', () => {
  it(':event:error', async () => {
    const fn = vi.fn();
    const wrapper = mount(() => <Avatar image="http://123.png" onError={fn} />);
    const img = wrapper.find('.t-avatar img');
    img.trigger('error');
    await nextTick();
    expect(fn).toBeCalled();
  });
});

describe('avatarGroup', () => {
  describe(':props', () => {
    it(':cascading', () => {
      const wrapper = mount({
        render() {
          return (
            <div>
              <AvatarGroup cascading="right-up">
                <Avatar>W</Avatar>
                <Avatar>W</Avatar>
              </AvatarGroup>
              <AvatarGroup cascading="left-up">
                <Avatar>W</Avatar>
                <Avatar>W</Avatar>
              </AvatarGroup>
            </div>
          );
        },
      });
      const groups = wrapper.findAll('.t-avatar-group');
      expect(groups[0].exists()).toBeTruthy();
      expect(groups[0].classes()).toContain('t-avatar--offset-right');
      expect(groups[1].exists()).toBeTruthy();
      expect(groups[1].classes()).toContain('t-avatar--offset-left');
    });
    it(':max', () => {
      const wrapper = mount({
        render() {
          return (
            <div>
              <AvatarGroup max={2}>
                <Avatar>W</Avatar>
                <Avatar>W</Avatar>
                <Avatar>W</Avatar>
              </AvatarGroup>
            </div>
          );
        },
      });
      const avatars = wrapper.findAll('.t-avatar');
      expect(avatars.length).toBe(3);
      expect(avatars[2].text()).toBe('+1');
    });
    it(':collapseAvatar', () => {
      const wrapper = mount(() => (
        <AvatarGroup max={2} collapseAvatar="n">
          <Avatar>W</Avatar>
          <Avatar>W</Avatar>
          <Avatar>W</Avatar>
        </AvatarGroup>
      ));
      const avatars = wrapper.findAll('.t-avatar');
      expect(avatars.length).toBe(3);
      expect(avatars[2].text()).toBe('n');
    });

    it(':placement', () => {
      const wrapper = mount({
        render() {
          return (
            <div>
              <AvatarGroup max={2} placement="bottom">
                <Avatar>W</Avatar>
                <Avatar>W</Avatar>
                <Avatar>W</Avatar>
              </AvatarGroup>
            </div>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':popupProps', () => {
      const wrapper = mount({
        render() {
          return (
            <div>
              <AvatarGroup max={2} popupProps={{ trigger: 'click', placement: 'bottom' }}>
                <Avatar>W</Avatar>
                <Avatar>W</Avatar>
                <Avatar>W</Avatar>
              </AvatarGroup>
            </div>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':size', async () => {
      const wrapper = mount({
        render() {
          return (
            <div>
              <AvatarGroup size="small">
                <Avatar>W</Avatar>
                <Avatar>W</Avatar>
                <Avatar>W</Avatar>
              </AvatarGroup>
            </div>
          );
        },
      });
      const group = wrapper.find('.t-avatar-group');
      const avatar = group.findAll('.t-avatar');
      await nextTick();
      expect(avatar[0].classes()).toContain('t-size-s');
    });
  });
});
