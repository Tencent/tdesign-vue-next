import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { it, expect, vi } from 'vitest';
import { Avatar, AvatarGroup } from '@tdesign/components/avatar';
import { getAvatarGroupDefaultMount } from './mount';
import { mockDelay, simulateImageEvent } from '@tdesign/internal-tests/utils';
import { UserIcon } from 'tdesign-icons-vue-next';

describe('Avatar Component', () => {
  it('props.alt works fine', () => {
    const wrapper = mount(<Avatar alt={'Avatar'} image={'https://tdesign.gtimg.com/site/avatar.jpg'}></Avatar>).find(
      'img',
    );
    expect(wrapper.attributes('alt')).toBe('Avatar');
  });

  it('props.content works fine', () => {
    const wrapper = mount(<Avatar content={() => <span class="custom-node">TNode</span>}></Avatar>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slots.content works fine', () => {
    const wrapper = mount(<Avatar v-slots={{ content: () => <span class="custom-node">TNode</span> }}></Avatar>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.default works fine', () => {
    const wrapper = mount(<Avatar default={() => <span class="custom-node">TNode</span>}></Avatar>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slots.default works fine', () => {
    const wrapper = mount(<Avatar v-slots={{ default: () => <span class="custom-node">TNode</span> }}></Avatar>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.hideOnLoadFailed works fine', async () => {
    const wrapper = mount(<Avatar image={'https://this.is.an.error.path.jpg'} hideOnLoadFailed={true}></Avatar>);
    const imgDom = wrapper.find('img').element;
    simulateImageEvent(imgDom, 'error');
    await mockDelay(300);
    expect(wrapper.find('.t-image').exists()).toBeFalsy();
  });

  it('props.icon works fine', () => {
    const wrapper = mount(<Avatar icon={() => <span class="custom-node">TNode</span>}></Avatar>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.find('.t-avatar__icon').exists()).toBeTruthy();
  });

  it('slots.icon works fine', () => {
    const wrapper = mount(<Avatar v-slots={{ icon: () => <span class="custom-node">TNode</span> }}></Avatar>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.find('.t-avatar__icon').exists()).toBeTruthy();
  });

  it(`props.image is equal to https://tdesign.tencent.com/`, () => {
    const wrapper = mount(<Avatar image={'https://tdesign.tencent.com/'}></Avatar>);
    const domWrapper = wrapper.find('img');
    expect(domWrapper.attributes('src')).toBe('https://tdesign.tencent.com/');
  });

  ['circle', 'round'].forEach((item) => {
    it(`props.shape is equal to ${item}`, () => {
      const wrapper = mount(<Avatar shape={item}></Avatar>);
      expect(wrapper.classes(`t-avatar--${item}`)).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  const sizeClassNameMap = { small: 't-size-s', medium: 't-size-m', large: 't-size-l' };
  Object.entries(sizeClassNameMap).forEach(([enumValue, expectedClassName]) => {
    it(`props.size is equal to ${enumValue}`, () => {
      let propValue = { true: true, false: false }[enumValue];
      propValue = propValue === undefined ? enumValue : propValue;
      const wrapper = mount(<Avatar size={propValue}></Avatar>);
      expect(wrapper.classes(expectedClassName)).toBeTruthy();
    });
  });

  it(`props.size is equal to 120px`, () => {
    const wrapper = mount(<Avatar size={'120px'}></Avatar>);
    const domWrapper = wrapper.findComponent(Avatar);
    expect(domWrapper.element.style.width).toBe('120px');
    expect(domWrapper.element.style.height).toBe('120px');
    expect(domWrapper.element.style.fontSize).toBe('60px');
  });

  it('events.error works fine', async () => {
    const onErrorFn = vi.fn();
    const wrapper = mount(<Avatar image={'https://this.is.an.error.path.jpg'} onError={onErrorFn}></Avatar>);
    const imgDom = wrapper.find('img').element;
    simulateImageEvent(imgDom, 'error');
    await mockDelay(300);
    expect(onErrorFn).toHaveBeenCalled();
    expect(onErrorFn.mock.calls[0][0].e.type).toBe('error');
  });
});

describe('AvatarGroup Component', () => {
  const cascadingClassNameList = ['t-avatar--offset-left', 't-avatar--offset-right'];
  ['left-up', 'right-up'].forEach((item, index) => {
    it(`props.cascading is equal to ${item}`, () => {
      const wrapper = mount(<AvatarGroup cascading={item}></AvatarGroup>);
      expect(wrapper.classes(cascadingClassNameList[index])).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  it('props.collapseAvatar works fine', () => {
    const wrapper = getAvatarGroupDefaultMount({
      collapseAvatar: () => <span class="custom-node">TNode</span>,
      max: 3,
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slots.collapseAvatar works fine', () => {
    const wrapper = getAvatarGroupDefaultMount({
      'v-slots': { collapseAvatar: () => <span class="custom-node">TNode</span> },
      max: 3,
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });
  it('slots.collapse-avatar works fine', () => {
    const wrapper = getAvatarGroupDefaultMount({
      'v-slots': { 'collapse-avatar': () => <span class="custom-node">TNode</span> },
      max: 3,
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.max works fine. `{".t-avatar":4,".t-avatar__collapse":1,".t-avatar__collapse > span":{"text":"+2"}}` should exist', () => {
    const wrapper = getAvatarGroupDefaultMount({ max: 3 });
    expect(wrapper.findAll('.t-avatar').length).toBe(4);
    expect(wrapper.findAll('.t-avatar__collapse').length).toBe(1);
    expect(wrapper.find('.t-avatar__collapse > span').text()).toBe('+2');
  });

  it(`props.size is equal to small`, () => {
    const wrapper = getAvatarGroupDefaultMount({ size: 'small' });
    const domWrapper = wrapper.find('.t-avatar');
    expect(domWrapper.classes('t-size-s')).toBeTruthy();
    const domWrapper1 = wrapper.find('.t-avatar:nth-child(5)');
    expect(domWrapper1.classes('t-size-l')).toBeTruthy();
  });
  it(`props.size is equal to large`, () => {
    const wrapper = getAvatarGroupDefaultMount({ size: 'large' });
    const domWrapper = wrapper.find('.t-avatar');
    expect(domWrapper.classes('t-size-l')).toBeTruthy();
    const domWrapper1 = wrapper.find('.t-avatar:nth-child(4)');
    expect(domWrapper1.classes('t-size-s')).toBeTruthy();
  });

  it(`props.size is equal to 120px`, () => {
    const wrapper = getAvatarGroupDefaultMount({ size: '120px' });
    const domWrapper = wrapper.find('.t-avatar');
    expect(domWrapper.element.style.width).toBe('120px');
    expect(domWrapper.element.style.height).toBe('120px');
    expect(domWrapper.element.style.fontSize).toBe('60px');
  });

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

describe('Avatar Events', () => {
  it(':event:error', async () => {
    const fn = vi.fn();
    const wrapper = mount(() => <Avatar image="http://123.png" onError={fn} />);
    const img = wrapper.find('.t-avatar img');
    img.trigger('error');
    await nextTick();
    expect(fn).toBeCalled();
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
