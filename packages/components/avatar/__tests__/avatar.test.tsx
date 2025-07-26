// @ts-nocheck
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { it, expect, vi } from 'vitest';
import { Avatar, AvatarGroup } from '@tdesign/components/avatar';
import { getAvatarGroupDefaultMount } from './mount';
import { simulateImageEvent } from '@tdesign/internal-tests/utils';
import { LogoQqIcon } from 'tdesign-icons-vue-next';
import { Image } from '@tdesign/components';

describe('Avatar', () => {
  it(':alt', () => {
    const wrapper = mount(<Avatar alt={'Avatar'} image={'https://tdesign.gtimg.com/site/avatar.jpg'}></Avatar>).find(
      'img',
    );
    expect(wrapper.attributes('alt')).toBe('Avatar');
  });

  it(':content[string]', () => {
    const wrapper = mount(<Avatar content="content"></Avatar>);
    expect(wrapper.find('.t-avatar').text()).toBe('content');
    expect(wrapper.element).toMatchSnapshot();
  });

  it(':content[slot/function]', () => {
    const wrapperSlot = mount(
      <Avatar v-slots={{ content: () => <span class="custom-content-node">TNode</span> }}></Avatar>,
    );
    expect(wrapperSlot.find('.custom-content-node').exists()).toBeTruthy();
    expect(wrapperSlot.element).toMatchSnapshot();

    const renderContent = () => <Image src="src"></Image>;
    const wrapperFunction = mount(<Avatar content={renderContent}></Avatar>);
    expect(wrapperFunction.findComponent(Image).exists()).toBeTruthy();
    expect(wrapperFunction.element).toMatchSnapshot();
  });

  it(':default[string]', () => {
    const wrapper = mount(<Avatar default="default"></Avatar>);
    expect(wrapper.find('.t-avatar').text()).toBe('default');
    expect(wrapper.element).toMatchSnapshot();
  });

  it(':default[slot/function]', () => {
    const wrapperSlot = mount(
      <Avatar v-slots={{ default: () => <span class="custom-default-node">TNode</span> }}></Avatar>,
    );
    expect(wrapperSlot.find('.custom-default-node').exists()).toBeTruthy();
    expect(wrapperSlot.element).toMatchSnapshot();

    const renderDefault = () => <Image src="src"></Image>;
    const wrapperFunction = mount(<Avatar default={renderDefault}></Avatar>);
    expect(wrapperFunction.findComponent(Image).exists()).toBeTruthy();
    expect(wrapperFunction.element).toMatchSnapshot();
  });

  it(':hideOnLoadFailed[boolean]', async () => {
    const wrapperWhenTrue = mount(
      <Avatar image={'https://this.is.an.error.path.jpg'} hideOnLoadFailed={true}></Avatar>,
    );
    const imgDomWhenTrue = wrapperWhenTrue.find('img').element;
    simulateImageEvent(imgDomWhenTrue, 'error');
    await nextTick();
    expect(wrapperWhenTrue.find('.t-image').exists()).toBeFalsy();

    const wrapperWhenFalse = mount(
      <Avatar image={'https://this.is.an.error.path.jpg'} hideOnLoadFailed={false}></Avatar>,
    );
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
    const wrapperFunction = mount(<Avatar icon={renderIcon}></Avatar>);
    expect(wrapperFunction.findComponent(LogoQqIcon).exists()).toBeTruthy();
    expect(wrapperFunction.find('.t-avatar__icon').exists()).toBeTruthy();
  });

  it(':image[string]', () => {
    const wrapper = mount(<Avatar image="https://tdesign.tencent.com/"></Avatar>);
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
      <Avatar alt={'Avatar'} image={'https://tdesign.gtimg.com/site/avatar.jpg'} imageProps={imageProps} />,
    );
    // Not test the Image's specific behaviors, because it's should be ensure by the Image's own tests.
    // Here we only test whether the Image is rendered correctly and whether props are correctly passed.
    const image = wrapper.findComponent(Image);
    expect(image.exists()).toBeTruthy();
    expect(image.props('alt')).toBe('props.alt');
    expect(image.props('error')).toBe(imagePropsError);
  });

  ['circle', 'round'].forEach((item) => {
    it(`:shape['${item}']`, () => {
      const wrapper = mount(<Avatar shape={item}></Avatar>);
      expect(wrapper.classes(`t-avatar--${item}`)).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  const sizeClassNameMap = { small: 't-size-s', medium: 't-size-m', large: 't-size-l' };
  Object.entries(sizeClassNameMap).forEach(([enumValue, expectedClassName]) => {
    it(`:size['${enumValue}']`, () => {
      let propValue = { true: true, false: false }[enumValue];
      propValue = propValue === undefined ? enumValue : propValue;
      const wrapper = mount(<Avatar size={propValue}></Avatar>);
      expect(wrapper.classes(expectedClassName)).toBeTruthy();
    });
  });

  it(`:size['120px']`, () => {
    const wrapper = mount(<Avatar size={'120px'}></Avatar>);
    const domWrapper = wrapper.findComponent(Avatar);
    expect(domWrapper.element.style.width).toBe('120px');
    expect(domWrapper.element.style.height).toBe('120px');
  });

  it(':onError[Function]', async () => {
    const onErrorFn = vi.fn();
    const wrapper = mount(<Avatar image="https://this.is.an.error.path.jpg" onError={onErrorFn} />);
    const imgDom = wrapper.find('img');
    imgDom.trigger('error');
    await nextTick();
    expect(onErrorFn).toBeCalled();
    expect(onErrorFn.mock.calls[0][0].e.type).toBe('error');
  });
});

describe('AvatarGroup', () => {
  const cascadingClassNameList = ['t-avatar--offset-left', 't-avatar--offset-right'];
  ['left-up', 'right-up'].forEach((item, index) => {
    it(`:cascading['${item}']`, () => {
      const wrapper = mount(<AvatarGroup cascading={item}></AvatarGroup>);
      expect(wrapper.classes(cascadingClassNameList[index])).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  it(':collapseAvatar[string]', () => {
    const wrapper = getAvatarGroupDefaultMount({
      collapseAvatar: '+2',
      max: 3,
    });
    expect(wrapper.find('.t-avatar__collapse').text()).toBe('+2');
    expect(wrapper.element).toMatchSnapshot();
  });

  it(':collapseAvatar[slot/Function]', () => {
    const wrapperSlot = getAvatarGroupDefaultMount(
      {
        max: 3,
      },
      {},
      {
        'collapse-avatar': () => <span class="custom-collapse-node">+2</span>,
      },
    );
    expect(wrapperSlot.find('.custom-collapse-node').exists()).toBeTruthy();
    expect(wrapperSlot.find('.custom-collapse-node').text()).toBe('+2');
    expect(wrapperSlot.element).toMatchSnapshot();

    const wrapperFunction = getAvatarGroupDefaultMount({
      collapseAvatar: () => <span class="custom-collapse-node">+1</span>,
      max: 4,
    });
    expect(wrapperFunction.find('.custom-collapse-node').exists()).toBeTruthy();
    expect(wrapperFunction.find('.custom-collapse-node').text()).toBe('+1');
    expect(wrapperFunction.element).toMatchSnapshot();
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

  it(`:size['small']`, () => {
    const wrapper = getAvatarGroupDefaultMount({ size: 'small' });
    const domWrapper = wrapper.find('.t-avatar');
    expect(domWrapper.classes('t-size-s')).toBeTruthy();
    const domWrapper1 = wrapper.find('.t-avatar:nth-child(5)');
    expect(domWrapper1.classes('t-size-l')).toBeTruthy();
  });
  it(`:size['large']`, () => {
    const wrapper = getAvatarGroupDefaultMount({ size: 'large' });
    const domWrapper = wrapper.find('.t-avatar');
    expect(domWrapper.classes('t-size-l')).toBeTruthy();
    const domWrapper1 = wrapper.find('.t-avatar:nth-child(4)');
    expect(domWrapper1.classes('t-size-s')).toBeTruthy();
  });

  it(`:size['120px']`, () => {
    const wrapper = getAvatarGroupDefaultMount({ size: '120px' });
    const domWrapper = wrapper.find('.t-avatar');
    expect(domWrapper.element.style.width).toBe('120px');
    expect(domWrapper.element.style.height).toBe('120px');
  });

  it(':popupProps[PopupProps]', () => {
    // it looks like the `popup` hasn't been implemented yet
    expect(true).toBe(true);
  });
});
