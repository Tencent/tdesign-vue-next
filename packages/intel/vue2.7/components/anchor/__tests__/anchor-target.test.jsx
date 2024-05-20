import { mount } from '@vue/test-utils';
import { AnchorTarget } from '@/src/anchor/index.ts';

vi.resetModules();

// every component needs four parts: props/events/slots/functions.
describe('AnchorTarget', () => {
  // test slots
  describe('<slot>', () => {
    it('should render default slot', async () => {
      const wrapper = mount(AnchorTarget, {
        propsData: {
          id: 'test-target',
          tag: 'h1',
        },
        slots: {
          default: 'this is default slots',
        },
      });
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
