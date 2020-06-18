/* eslint-disable @typescript-eslint/no-empty-function */
import { mount } from '@vue/test-utils';
import Dialog from '@/src/dialog/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Dialog', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Dialog></Dialog>;
        },
      });
      expect(wrapper.isEmpty()).toBe(false);
    });
  });

  // test events
  describe('@event', () => {});

  // test slots
  describe('<slot>', () => {
    it('', () => {});
  });

  // test exposure function
  describe('function', () => {
    it('', () => {});
  });
});
