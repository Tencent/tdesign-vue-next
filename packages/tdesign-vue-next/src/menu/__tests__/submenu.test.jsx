import { mount } from '@vue/test-utils';
import { ref } from '@td/adapter-vue';
import { Submenu } from 'tdesign-vue-next';

const Menu = {
  theme: ref('light'),
  activeValue: ref(''),
  activeValues: ref([]),
  mode: ref('normal'),
};

// every component needs four parts: props/events/slots/functions.
describe('submenu', () => {
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
