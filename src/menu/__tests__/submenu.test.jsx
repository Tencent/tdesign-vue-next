import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import { Submenu } from '@/src/menu';

const Menu = {
  theme: ref('light'),
  activeValue: ref(''),
  activeValues: ref([]),
  mode: ref('normal'),
};

// every component needs four parts: props/events/slots/functions.
describe('Submenu', () => {
  // test props api
  describe('props', () => {
    it(':name', () => {
      const wrapper = mount({
        provide: {
          TdMenu: Menu,
        },
        render() {
          return <Submenu name="1"></Submenu>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':disabled', () => {
      const wrapper = mount({
        provide: {
          TdMenu: Menu,
        },
        render() {
          return <Submenu disabled={true}></Submenu>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
