import { mount } from '@vue/test-utils';
import ColorPicker from '@/src/color-picker/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('ColorPicker', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <ColorPicker></ColorPicker>;
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
  });

  // it(':value', () => {
  //   const wrapper = mount({
  //     render() {
  //       return <DatePicker value={'1998-11-11'}></DatePicker>;
  //     },
  //   });
  //   expect(wrapper.element).toMatchSnapshot();
  // });

  // it(':mode', () => {
  //   const wrapper = mount({
  //     render() {
  //       return <DatePicker mode={'year'}></DatePicker>;
  //     },
  //   });
  //   expect(wrapper.element).toMatchSnapshot();
  // });

  // it(':range', () => {
  //   const wrapper = mount({
  //     render() {
  //       const testRange = [
  //         '2018-08', // new Date(2017, 7)
  //         '2028-04', // new Date(2027, 3)
  //       ];
  //       return <DatePicker value={testRange} range></DatePicker>;
  //     },
  //   });
  //   expect(wrapper.element).toMatchSnapshot();
  // });

  // // test events
  // describe('@event', () => {
  //   window.console.info('DatePicker test @event');
  // });

  // // test slots
  // describe('<slot>', () => {
  //   it('', () => {
  //     window.console.info('DatePicker test<slot>');
  //   });
  // });

  // // test exposure function
  // describe('function', () => {
  //   it('', () => {
  //     window.console.info('DatePicker test function');
  //   });
  // });
});
