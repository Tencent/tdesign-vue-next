import { mount } from '@vue/test-utils';
import Empty from '@tdesign/components/empty';
import props from '@tdesign/components/empty/props';
import TButton from '@tdesign/components/button';

describe('Empty', () => {
  describe('props', () => {
    it('action[function]', () => {
      const wrapper = mount(<Empty action={() => <TButton>重试</TButton>} />);
      expect(wrapper.find('.t-empty__action').exists()).toBeTruthy();
      expect(wrapper.find('.t-empty__action').find('.t-button').text()).toBe('重试');
    });

    it('action[slot]', () => {
      const wrapper = mount(<Empty v-slots={{ action: () => <TButton class="custom-action">Slot Action</TButton> }} />);
      expect(wrapper.find('.t-empty__action').find('.custom-action').text()).toBe('Slot Action');
    });

    it('description[string]', () => {
      const wrapper = mount(<Empty description="description" />);
      expect(wrapper.find('.t-empty__description').element.innerHTML).toBe('description');
    });

    it('description[function]', () => {
      const wrapper = mount(<Empty description={() => 'function description'} />);
      expect(wrapper.find('.t-empty__description').exists()).toBeTruthy();
    });

    it('description[slot]', () => {
      const wrapper = mount(
        <Empty v-slots={{ description: () => <div class="custom-description">Custom Description</div> }} />,
      );
      expect(wrapper.find('.t-empty__description').find('.custom-description').text()).toBe('Custom Description');
    });

    it('image[string]', () => {
      const wrapper = mount(<Empty image="https://example.com/image.png" />);
      expect(wrapper.find('.t-empty__image').find('img').attributes('src')).toBe('https://example.com/image.png');
    });

    it('image[function]', () => {
      const wrapper = mount(<Empty image={() => <div class="custom-image">Custom Image</div>} />);
      expect(wrapper.find('.t-empty__image').exists()).toBeTruthy();
    });

    it('image[object]', () => {
      const wrapper = mount(<Empty image={{ src: 'https://example.com/image.png', shape: 'round' } as any} />);
      expect(wrapper.find('.t-empty__image').find('img').attributes('src')).toBe('https://example.com/image.png');
    });

    it('image[slot]', () => {
      const wrapper = mount(<Empty v-slots={{ image: () => <div class="custom-image">Custom Image</div> }} />);
      expect(wrapper.find('.t-empty__image').find('.custom-image').text()).toBe('Custom Image');
    });

    it('size[small/medium/large]', () => {
      const { validator } = props.size;
      expect(validator('small')).toBeTruthy();
      expect(validator('medium')).toBeTruthy();
      expect(validator('large')).toBeTruthy();
      // @ts-expect-error
      expect(validator('invalid')).toBeFalsy();
      expect(validator(undefined)).toBeTruthy();

      const sizeMap = {
        small: 't-size-s',
        medium: 't-size-m',
        large: 't-size-l',
      };

      (['small', 'medium', 'large'] as const).forEach((item) => {
        const wrapper = mount(<Empty size={item} />);
        expect(wrapper.classes(sizeMap[item])).toBeTruthy();
      });
    });

    it('title[string]', () => {
      const wrapper = mount(<Empty title="title" />);
      expect(wrapper.find('.t-empty__title').element.innerHTML).toBe('title');
    });

    it('title[function]', () => {
      const wrapper = mount(<Empty title={() => 'function title'} />);
      expect(wrapper.find('.t-empty__title').exists()).toBeTruthy();
    });

    it('title[slot]', () => {
      const wrapper = mount(<Empty v-slots={{ title: () => <div class="custom-title">Custom Title</div> }} />);
      expect(wrapper.find('.t-empty__title').find('.custom-title').text()).toBe('Custom Title');
    });

    it('type[empty/success/fail/network-error/maintenance]', () => {
      const { validator } = props.type;
      expect(validator('empty')).toBeTruthy();
      expect(validator('success')).toBeTruthy();
      expect(validator('fail')).toBeTruthy();
      expect(validator('network-error')).toBeTruthy();
      expect(validator('maintenance')).toBeTruthy();
      // @ts-expect-error
      expect(validator('invalid')).toBeFalsy();
      expect(validator(undefined)).toBeTruthy();

      (['empty', 'success', 'fail', 'network-error', 'maintenance'] as const).forEach((item) => {
        const wrapper = mount(<Empty type={item} />);
        expect(wrapper.find('.t-empty__image').exists()).toBeTruthy();
        expect(wrapper.find('.t-empty__title').exists()).toBeTruthy();
      });
    });

    it(':type[fail] with correct icon path', () => {
      const wrapper = mount(<Empty type="fail" />);
      const failIconPath =
        'M24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6ZM2 24C2 11.8497 11.8497 2 24 2C36.1503 2 46 11.8497 46 24C46 36.1503 36.1503 46 24 46C11.8497 46 2 36.1503 2 24ZM26 13V28H22V13H26ZM22 31H26.0078V35.0078H22V31Z';
      expect(wrapper.find('.t-empty__image').find('path').attributes('d')).toBe(failIconPath);
    });

    it(':type[success] with correct icon path', () => {
      const wrapper = mount(<Empty type="success" />);
      const successIconPath =
        'M24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42ZM46 24C46 36.1503 36.1503 46 24 46C11.8497 46 2 36.1503 2 24C2 11.8497 11.8497 2 24 2C36.1503 2 46 11.8497 46 24ZM21 32.8284L12.1716 24L15 21.1716L21 27.1716L33 15.1716L35.8284 18L21 32.8284Z';
      expect(wrapper.find('.t-empty__image').find('path').attributes('d')).toBe(successIconPath);
    });
  });

  describe('behavior', () => {
    it(':action[empty]', () => {
      const wrapper = mount(<Empty />);
      expect(wrapper.find('.t-empty__action').exists()).toBeFalsy();
    });

    it(':description[empty]', () => {
      const wrapper = mount(<Empty description="" />);
      expect(wrapper.find('.t-empty__description').exists()).toBeFalsy();
    });

    it(':image[empty]', () => {
      const wrapper = mount(<Empty image={null} type={null} />);
      expect(wrapper.find('.t-empty__image').exists()).toBeFalsy();
    });

    it(':title[empty]', () => {
      const wrapper = mount(<Empty title="" type={null} />);
      expect(wrapper.find('.t-empty__title').exists()).toBeFalsy();
    });

    it(':title[null] and type[null]', () => {
      const wrapper = mount(<Empty title={null} type={null} />);
      expect(wrapper.find('.t-empty__title').exists()).toBeFalsy();
    });

    it('props override type defaults', () => {
      const wrapper = mount(<Empty type="success" title="custom title" description="custom description" />);
      expect(wrapper.find('.t-empty__title').element.innerHTML).toBe('custom title');
      expect(wrapper.find('.t-empty__description').element.innerHTML).toBe('custom description');
    });
  });
});
