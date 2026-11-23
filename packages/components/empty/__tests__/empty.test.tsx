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

    it(':type[fail] with default icon', () => {
      const wrapper = mount(<Empty type="fail" />);
      expect(wrapper.find('.t-empty__image').find('.t-icon-error-circle').exists()).toBeTruthy();
    });

    it(':type[success] with default icon', () => {
      const wrapper = mount(<Empty type="success" />);
      expect(wrapper.find('.t-empty__image').find('.t-icon-check-circle').exists()).toBeTruthy();
    });

    it(':type[network-error] with default icon', () => {
      const wrapper = mount(<Empty type="network-error" />);
      expect(wrapper.find('.t-empty__image').find('.t-icon-wifi-no-filled').exists()).toBeTruthy();
    });

    it(':type[maintenance] with default icon', () => {
      const wrapper = mount(<Empty type="maintenance" />);
      expect(wrapper.find('.t-empty__image').find('.t-icon-traffic-events-filled').exists()).toBeTruthy();
    });

    it(':type[empty] with default icon', () => {
      const wrapper = mount(<Empty type="empty" />);
      expect(wrapper.find('.t-empty__image').find('.t-icon-no-result-filled').exists()).toBeTruthy();
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
