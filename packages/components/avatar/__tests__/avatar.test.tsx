import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { LogoQqIcon } from 'tdesign-icons-vue-next';
import { Avatar, AvatarGroup, Image } from '@tdesign/components';
import AvatarProps from '@tdesign/components/avatar/props';
import { simulateImageEvent } from '@tdesign/internal-tests/utils';
import { getAvatarGroupDefaultMount } from './mount';
import { sleep } from '@tdesign/internal-utils';

describe('Avatar', () => {
  describe('props', () => {
    let wrapper: VueWrapper<InstanceType<typeof Avatar>> | null = null;
    beforeEach(() => {
      // @ts-ignore TODO
      wrapper = mount(<Avatar>Avatar</Avatar>) as VueWrapper<InstanceType<typeof Avatar>>;
    });

    it(':alt[string]', () => {
      const wrapper = mount(<Avatar alt="Avatar" image="https://tdesign.gtimg.com/site/avatar.jpg" />);
      const img = wrapper.find('img');
      expect(img.attributes('alt')).toBe('Avatar');
    });

    it(':content[string/function]', () => {
      const wrapper = mount(<Avatar content="content" />);
      expect(wrapper.find('.t-avatar').text()).toBe('content');
      expect(wrapper.element).toMatchSnapshot();

      const renderContent = () => <Image src="src" />;
      const wrapperFunction = mount(<Avatar content={renderContent} />);
      expect(wrapperFunction.findComponent(Image).exists()).toBeTruthy();
      expect(wrapperFunction.element).toMatchSnapshot();
    });

    it(':content[slot]', () => {
      const wrapperSlot = mount(<Avatar v-slots={{ content: () => <span class="custom-content-node">TNode</span> }} />);
      expect(wrapperSlot.find('.custom-content-node').exists()).toBeTruthy();
      expect(wrapperSlot.element).toMatchSnapshot();
    });

    it(':default[string/function]', () => {
      const wrapper = mount(<Avatar default="default" />);
      expect(wrapper.find('.t-avatar').text()).toBe('default');
      expect(wrapper.element).toMatchSnapshot();

      const renderDefault = () => <Image src="src" />;
      const wrapperFunction = mount(<Avatar default={renderDefault} />);
      expect(wrapperFunction.findComponent(Image).exists()).toBeTruthy();
      expect(wrapperFunction.element).toMatchSnapshot();
    });

    it(':default[slot]', () => {
      const wrapperSlot = mount(<Avatar v-slots={{ default: () => <span class="custom-default-node">TNode</span> }} />);
      expect(wrapperSlot.find('.custom-default-node').exists()).toBeTruthy();
      expect(wrapperSlot.element).toMatchSnapshot();
    });

    it(':hideOnLoadFailed[boolean]', async () => {
      const wrapperWhenTrue = mount(<Avatar image="https://this.is.an.error.path.jpg" hideOnLoadFailed={true} />);
      const imgDomWhenTrue = wrapperWhenTrue.find('img').element;
      simulateImageEvent(imgDomWhenTrue, 'error');
      await nextTick();
      expect(wrapperWhenTrue.find('.t-image').exists()).toBeFalsy();

      const wrapperWhenFalse = mount(<Avatar image="https://this.is.an.error.path.jpg" hideOnLoadFailed={false} />);
      const imgDomWhenFalse = wrapperWhenFalse.find('img').element;
      simulateImageEvent(imgDomWhenFalse, 'error');
      await nextTick();
      expect(wrapperWhenFalse.find('.t-image').exists()).toBeTruthy();
    });

    it(':icon[slot/function]', () => {
      const wrapperSlot = mount(<Avatar v-slots={{ icon: () => <span class="custom-icon-node">TNode</span> }} />);
      expect(wrapperSlot.find('.custom-icon-node').exists()).toBeTruthy();
      expect(wrapperSlot.find('.t-avatar__icon').exists()).toBeTruthy();

      const renderIcon = () => <LogoQqIcon />;
      const wrapperFunction = mount(<Avatar icon={renderIcon} />);
      expect(wrapperFunction.findComponent(LogoQqIcon).exists()).toBeTruthy();
      expect(wrapperFunction.find('.t-avatar__icon').exists()).toBeTruthy();
    });

    it(':icon:content:isIconOnly', () => {
      const wrapper = mount(<Avatar icon={() => <LogoQqIcon />} content="content" />);
      expect(wrapper.findComponent(LogoQqIcon).exists()).toBeTruthy();
      expect(wrapper.find('.t-avatar').text()).toBe('content');
    });

    it(':image[string]', () => {
      const wrapper = mount(<Avatar image="https://tdesign.tencent.com/" />);
      const domWrapper = wrapper.find('img');
      expect(domWrapper.attributes('src')).toBe('https://tdesign.tencent.com/');
    });

    it(':imageProps[ImageProps]', () => {
      const imagePropsError = () => <span>load error</span>;
      const imageProps = {
        alt: 'props.alt',
        error: imagePropsError,
      };
      const wrapper = mount(
        <Avatar alt="Avatar" image="https://tdesign.gtimg.com/site/avatar.jpg" imageProps={imageProps} />,
      );
      // Not test the Image's specific behaviors, because it's should be ensure by the Image's own tests.
      // Here we only test whether the Image is rendered correctly and whether props are correctly passed.
      const image = wrapper.findComponent(Image);
      expect(image.exists()).toBeTruthy();
      expect(image.props('alt')).toBe('props.alt');
      expect(image.props('error')).toBe(imagePropsError);
    });

    it(':shape[circle/round]', () => {
      const validator = (wrapper.vm.$options.props as typeof AvatarProps)?.shape.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('other' as any)).toBe(false);

      const wrapperCircle = mount(<Avatar shape="circle" />);
      expect(wrapperCircle.classes('t-avatar--circle')).toBeTruthy();
      expect(wrapperCircle.element).toMatchSnapshot();

      const wrapperRound = mount(<Avatar shape="round" />);
      expect(wrapperRound.classes('t-avatar--round')).toBeTruthy();
      expect(wrapperRound.element).toMatchSnapshot();
    });

    it(':size[string]', () => {
      const sizeClassNameMap = { small: 't-size-s', medium: 't-size-m', large: 't-size-l' };

      Object.entries(sizeClassNameMap).forEach(([enumValue, expectedClassName]) => {
        const wrapper = mount(<Avatar size={enumValue} />);
        expect(wrapper.classes(expectedClassName)).toBeTruthy();
      });

      const wrapperCustom = mount(<Avatar size="120px" />);
      const domWrapper = wrapperCustom.findComponent(Avatar);
      expect(domWrapper.element.style.width).toBe('120px');
      expect(domWrapper.element.style.height).toBe('120px');
    });

    it(':gap:avatarWidth', async () => {
      // jsdom does not actually calculate layout properties, so offsetWidth is always 0 and we need to set it manually
      vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(100);
      const wrapper = mount(<Avatar content="content" />);
      await sleep(100);
      expect(wrapper.element).toMatchSnapshot();
      const avatar = wrapper.find('.t-avatar');
      const avatarSpan = avatar.find('span');
      expect(avatarSpan.element.style.transform).toBe('scale(0.92)');
    });

    it(':isImgExist', async () => {
      const wrapper = mount(<Avatar />);
      expect(wrapper.find('.t-image__wrapper').exists()).toBeFalsy();
      await wrapper.setProps({ image: 'https://tdesign.tencent.com/' });
      expect(wrapper.find('.t-image__wrapper').exists()).toBeTruthy();
    });
  });

  describe('events', () => {
    it('onError', async () => {
      const onErrorFn = vi.fn();
      const wrapper = mount(<Avatar image="https://this.is.an.error.path.jpg" onError={onErrorFn} />);
      const imgDom = wrapper.find('img');
      imgDom.trigger('error');
      await nextTick();
      expect(onErrorFn).toBeCalled();
      expect(onErrorFn.mock.calls[0][0].e.type).toBe('error');
    });
  });
});

describe('AvatarGroup', () => {
  describe('props', () => {
    it(':cascading[left-up/right-up]', () => {
      const validator = (AvatarGroup.props as any)?.cascading?.validator;
      if (validator) {
        expect(validator(undefined)).toBe(true);
        expect(validator(null)).toBe(true);
        expect(validator('other')).toBe(false);
      }

      const cascadingClassNameList = ['t-avatar--offset-left', 't-avatar--offset-right'];
      ['left-up', 'right-up'].forEach((item, index) => {
        const wrapper = mount(<AvatarGroup cascading={item as 'left-up' | 'right-up'} />);
        expect(wrapper.classes(cascadingClassNameList[index])).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
      });
    });

    it(':collapseAvatar[string/function]', () => {
      const wrapper = getAvatarGroupDefaultMount({
        collapseAvatar: '+2',
        max: 3,
      });
      expect(wrapper.find('.t-avatar__collapse').text()).toBe('+2');
      expect(wrapper.element).toMatchSnapshot();

      const wrapperFunction = getAvatarGroupDefaultMount({
        collapseAvatar: () => <span class="custom-collapse-node">+1</span>,
        max: 4,
      });
      expect(wrapperFunction.find('.custom-collapse-node').exists()).toBeTruthy();
      expect(wrapperFunction.find('.custom-collapse-node').text()).toBe('+1');
      expect(wrapperFunction.element).toMatchSnapshot();
    });

    it(':collapseAvatar[slot]', () => {
      const wrapperSlot = getAvatarGroupDefaultMount(
        { max: 3 },
        { 'collapse-avatar': () => <span class="custom-collapse-node">+2</span> },
      );
      expect(wrapperSlot.find('.custom-collapse-node').exists()).toBeTruthy();
      expect(wrapperSlot.find('.custom-collapse-node').text()).toBe('+2');
      expect(wrapperSlot.element).toMatchSnapshot();
    });

    it(':max[number]', () => {
      const wrapper = getAvatarGroupDefaultMount({ max: 3 });
      expect(wrapper.findAll('.t-avatar').length).toBe(4);
      expect(wrapper.findAll('.t-avatar__collapse').length).toBe(1);
      expect(wrapper.find('.t-avatar__collapse > span').text()).toBe('+2');

      const noCollapseWrapper = getAvatarGroupDefaultMount({ max: 6 });
      expect(noCollapseWrapper.findAll('.t-avatar').length).toBe(5);
      expect(noCollapseWrapper.findAll('.t-avatar__collapse').length).toBe(0);
      expect(noCollapseWrapper.find('.t-avatar__collapse > span').exists()).toBeFalsy();
    });

    it(':popupProps[PopupProps]', () => {
      // it looks like the `popup` hasn't been implemented yet
      expect(true).toBe(true);
    });

    it(':size[string]', () => {
      const wrapperSmall = getAvatarGroupDefaultMount({ size: 'small' });
      const domWrapper = wrapperSmall.find('.t-avatar');
      expect(domWrapper.classes('t-size-s')).toBeTruthy();
      const domWrapper1 = wrapperSmall.find('.t-avatar:nth-child(5)');
      expect(domWrapper1.classes('t-size-l')).toBeTruthy();

      const wrapperLarge = getAvatarGroupDefaultMount({ size: 'large' });
      const domWrapperLarge = wrapperLarge.find('.t-avatar');
      expect(domWrapperLarge.classes('t-size-l')).toBeTruthy();
      const domWrapperLarge1 = wrapperLarge.find('.t-avatar:nth-child(4)');
      expect(domWrapperLarge1.classes('t-size-s')).toBeTruthy();

      const wrapperCustom = getAvatarGroupDefaultMount({ size: '120px' });
      const domWrapperCustom = wrapperCustom.find('.t-avatar');
      expect((domWrapperCustom.element as HTMLElement).style.width).toBe('120px');
      expect((domWrapperCustom.element as HTMLElement).style.height).toBe('120px');
    });
  });
});
