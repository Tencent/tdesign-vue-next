import { mount } from '@vue/test-utils';
import Empty from '@src/empty/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Empty', () => {
  // test props api
  describe(':props', () => {
    it('size', () => {
      const wrapper = mount(() => <Empty size="small" />);
      expect(wrapper.find('.t-empty.t-size-s')).not.toBeNull();
    });
    it('title', () => {
      const wrapper = mount(() => <Empty title="title"></Empty>);
      expect(wrapper.find('.t-empty__title').element.innerHTML).toBe('title');
    });
    it('description', () => {
      const wrapper = mount(() => <Empty description="description"></Empty>);
      expect(wrapper.find('.t-empty__description').element.innerHTML).toBe('description');
    });
    it('type', () => {
      const wrapper = mount(() => <Empty type="success"></Empty>);
      const successIconPath =
        'M24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42ZM46 24C46 36.1503 36.1503 46 24 46C11.8497 46 2 36.1503 2 24C2 11.8497 11.8497 2 24 2C36.1503 2 46 11.8497 46 24ZM21 32.8284L12.1716 24L15 21.1716L21 27.1716L33 15.1716L35.8284 18L21 32.8284Z';

      expect(wrapper.find('.t-empty__image').find('path').attributes('d')).toBe(successIconPath);
    });
  });
});
