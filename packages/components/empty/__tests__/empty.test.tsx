import { mount } from '@vue/test-utils';
import { it, expect } from 'vitest';
import Empty from '@tdesign/components/empty';
import TButton from '@tdesign/components/button';

describe('Empty', () => {
  describe('props', () => {
    it('action[function]', () => {
      const wrapper = mount(() => <Empty action={() => <TButton>重试</TButton>} />);
      expect(wrapper.find('.t-empty__action').exists()).toBeTruthy();
      expect(wrapper.find('.t-empty__action').find('.t-button').text()).toBe('重试');
    });

    it('action[slot]', () => {
      const wrapper = mount(Empty, {
        slots: {
          action: <TButton class="custom-action">Slot Action</TButton>,
        },
      });
      expect(wrapper.find('.t-empty__action').find('.custom-action').text()).toBe('Slot Action');
    });

    it('description[string]', () => {
      const wrapper = mount(() => <Empty description="description" />);
      expect(wrapper.find('.t-empty__description').element.innerHTML).toBe('description');
    });

    it('description[function]', () => {
      const wrapper = mount(() => <Empty description={() => 'function description'} />);
      expect(wrapper.find('.t-empty__description').element.innerHTML).toBe('function description');
    });

    it('description[slot]', () => {
      const wrapper = mount(Empty, {
        slots: {
          description: <div class="custom-description">Custom Description</div>,
        },
      });
      expect(wrapper.find('.t-empty__description').find('.custom-description').text()).toBe('Custom Description');
    });

    it('image[string]', () => {
      const wrapper = mount(() => <Empty image="https://example.com/image.png" />);
      expect(wrapper.find('.t-empty__image').find('img').attributes('src')).toBe('https://example.com/image.png');
    });

    it('image[object]', () => {
      const wrapper = mount(() => <Empty image={{ src: 'https://example.com/image.png', shape: 'round' }} />);
      expect(wrapper.find('.t-empty__image').find('img').attributes('src')).toBe('https://example.com/image.png');
    });

    it('image[component]', () => {
      const TestComponent = {
        setup() {
          return () => <div class="test-component">Test Component</div>;
        },
      };
      const wrapper = mount(() => <Empty image={TestComponent as any} />);
      expect(wrapper.find('.t-empty__image').find('.test-component').text()).toBe('Test Component');
    });

    it('image[object without src]', () => {
      const wrapper = mount(() => <Empty image={{ shape: 'round' } as any} />);
      expect(wrapper.find('.t-empty__image').exists()).toBeTruthy();
    });

    it('image[slot]', () => {
      const wrapper = mount(Empty, {
        slots: {
          image: <div class="custom-image">Custom Image</div>,
        },
      });
      expect(wrapper.find('.t-empty__image').find('.custom-image').text()).toBe('Custom Image');
    });

    it('imageStyle', () => {
      const wrapper = mount(() => <Empty image={{ src: 'test.png' }} imageStyle={{ width: '100px' }} />);
      expect(wrapper.find('.t-empty__image').attributes('style')).toContain('width: 100px');
    });

    it('size[large]', () => {
      const wrapper = mount(() => <Empty size="large" />);
      const empty = wrapper.find('.t-empty');
      expect(empty.classes()).toContain('t-size-l');
    });

    it('size[medium]', () => {
      const wrapper = mount(() => <Empty size="medium" />);
      const empty = wrapper.find('.t-empty');
      expect(empty.classes()).toContain('t-size-m');
    });

    it('size[small]', () => {
      const wrapper = mount(() => <Empty size="small" />);
      const empty = wrapper.find('.t-empty');
      expect(empty.classes()).toContain('t-size-s');
    });

    it('title[string]', () => {
      const wrapper = mount(() => <Empty title="title" />);
      expect(wrapper.find('.t-empty__title').element.innerHTML).toBe('title');
    });

    it('title[function]', () => {
      const wrapper = mount(() => <Empty title={() => 'function title'} />);
      expect(wrapper.find('.t-empty__title').element.innerHTML).toBe('function title');
    });

    it('title[slot]', () => {
      const wrapper = mount(Empty, {
        slots: {
          title: <div class="custom-title">Custom Title</div>,
        },
      });
      expect(wrapper.find('.t-empty__title').find('.custom-title').text()).toBe('Custom Title');
    });

    it('type[empty]', () => {
      const wrapper = mount(() => <Empty type="empty" />);
      const emptyIconPath =
        'M19 21H29V19H19V21ZM19 25H29V23H19V25ZM24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6ZM24 4C35.0457 4 44 12.9543 44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4Z';
      expect(wrapper.find('.t-empty__image').find('path').attributes('d')).toBe(emptyIconPath);
    });

    it('type[fail]', () => {
      const wrapper = mount(() => <Empty type="fail" />);
      const failIconPath =
        'M24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6ZM2 24C2 11.8497 11.8497 2 24 2C36.1503 2 46 11.8497 46 24C46 36.1503 36.1503 46 24 46C11.8497 46 2 36.1503 2 24ZM26 13V28H22V13H26ZM22 31H26.0078V35.0078H22V31Z';

      expect(wrapper.find('.t-empty__image').find('path').attributes('d')).toBe(failIconPath);
    });

    it('type[maintenance]', () => {
      const wrapper = mount(() => <Empty type="maintenance" />);
      const maintenanceIconPath =
        'M29.5237 17L24 3.82812L18.4763 17H29.5237ZM31.2011 21H16.7989L13.6699 28.4615H34.3301L31.2011 21ZM36.0076 32.4615H11.9924L9.66997 37.9997H6V41.9997H42V37.9997H38.33L36.0076 32.4615Z';

      expect(wrapper.find('.t-empty__image').find('path').attributes('d')).toBe(maintenanceIconPath);
    });

    it('type[network-error]', () => {
      const wrapper = mount(() => <Empty type="network-error" />);
      const networkErrorIconPath =
        'M26 17V2H22V17H26ZM26.0078 20H22V24.0078H26.0078V20ZM2.75751 13.45C7.29713 9.80916 12.553 7.50276 18 6.53088V28H30V6.53052C35.4475 7.50216 40.7038 9.80854 45.2438 13.4497L46.8021 14.6995L24.0006 43.2016L1.19922 14.6998L2.75751 13.45Z';

      expect(wrapper.find('.t-empty__image').find('path').attributes('d')).toBe(networkErrorIconPath);
    });

    it('type[success]', () => {
      const wrapper = mount(() => <Empty type="success" />);
      const successIconPath =
        'M24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42ZM46 24C46 36.1503 36.1503 46 24 46C11.8497 46 2 36.1503 2 24C2 11.8497 11.8497 2 24 2C36.1503 2 46 11.8497 46 24ZM21 32.8284L12.1716 24L15 21.1716L21 27.1716L33 15.1716L35.8284 18L21 32.8284Z';

      expect(wrapper.find('.t-empty__image').find('path').attributes('d')).toBe(successIconPath);
    });
  });

  describe('behavior', () => {
    it(':action[empty]', () => {
      const wrapper = mount(() => <Empty />);
      expect(wrapper.find('.t-empty__action').exists()).toBeFalsy();
    });

    it(':description[empty]', () => {
      const wrapper = mount(() => <Empty description="" />);
      expect(wrapper.find('.t-empty__description').exists()).toBeFalsy();
    });

    it(':image[empty]', () => {
      const wrapper = mount(() => <Empty image="" />);
      expect(wrapper.find('.t-empty__image').exists()).toBeFalsy();
    });

    it(':imageStyle without image', () => {
      const wrapper = mount(() => <Empty image="" imageStyle={{ width: '100px' }} />);
      expect(wrapper.find('.t-empty__image').exists()).toBeFalsy();
    });

    it(':title[empty]', () => {
      const wrapper = mount(() => <Empty title="" />);
      expect(wrapper.find('.t-empty__title').exists()).toBeFalsy();
    });

    it(':title[null] and type[null]', () => {
      const wrapper = mount(() => <Empty title={null as any} type={null as any} />);
      expect(wrapper.find('.t-empty__title').exists()).toBeFalsy();
    });

    it('props override type defaults', () => {
      const wrapper = mount(() => <Empty type="success" title="custom title" description="custom description" />);
      expect(wrapper.find('.t-empty__title').element.innerHTML).toBe('custom title');
      expect(wrapper.find('.t-empty__description').element.innerHTML).toBe('custom description');
    });

    it('slots override props and type defaults', () => {
      const wrapper = mount(Empty, {
        props: {
          title: 'prop title',
          type: 'success',
        },
        slots: {
          title: <span>slot title</span>,
        },
      });
      expect(wrapper.find('.t-empty__title').element.innerHTML).toBe('slot title');
    });

    it('slot image should override props image', () => {
      const wrapper = mount(Empty, {
        props: {
          image: 'https://example.com/image.png',
        },
        slots: {
          image: <div class="slot-image">Slot Image</div>,
        },
      });
      expect(wrapper.find('.t-empty__image').find('.slot-image').text()).toBe('Slot Image');
      expect(wrapper.find('.t-empty__image').find('img').exists()).toBeFalsy();
    });
  });
});
