import { mount } from '@vue/test-utils';
import Avatar, { AvatarGroup } from '@/src/avatar/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Avatar', () => {
  // test props api
  describe(':props', () => {
    it(':image', () => {
      const wrapper = mount({
        render() {
          return <Avatar image="https://tdesign.gtimg.com/site/avatar.jpg"></Avatar>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':icon', () => {
      const wrapper = mount({
        render() {
          return <div></div>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
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
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':size', () => {
      const wrapper = mount({
        render() {
          return (
            <div>
              <Avatar size="small">Avatar</Avatar>
              <Avatar size="medium">W</Avatar>
              <Avatar size="large">W</Avatar>
              <Avatar size="80px">Avatar</Avatar>
            </div>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('<slot>', () => {
    it('<icon>', () => {
      const wrapper = mount(Avatar, {
        scopedSlots: {
          icon: '<div></div>',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

describe('AvatarGroup', () => {
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
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':collapseAvatar', () => {
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
      expect(wrapper.element).toMatchSnapshot();
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
      expect(wrapper.element).toMatchSnapshot();
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
    it(':size', () => {
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
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
