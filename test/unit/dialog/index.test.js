/* eslint-disable @typescript-eslint/no-empty-function */
import { mount } from '@vue/test-utils';
import Dialog from '@/src/dialog/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Dialog', () => {
  // test props api
  describe(':props', () => {
    it('not-modal and draggable', () => {
      const wrapper = mount(Dialog, {
        propsData: { mode: 'not-modal', draggable: true },
      });
      const dialog = wrapper.find('.t-dialog');
      expect(dialog.element.onmousedown).toBeInstanceOf(Function);
      expect(wrapper.find('.t-dialog-mask').exists()).toBe(false);
      // expect(wrapper).toMatchSnapshot();
    });

    it('set offset and width', () => {
      const wrapper = mount(Dialog, {
        propsData: {
          offset: { left: '100px', top: '200px' },
          width: '200px',
        },
      });
      const dialog = wrapper.find('.t-dialog');
      expect(dialog.element.onmousedown).not.toBeInstanceOf(Function);
      const classes = dialog.classes();
      const styles = dialog.attributes('style');
      expect(classes).not.toContain('t-dialog--center');
      expect(styles).toMatch(/left: 100px/);
      expect(styles).toMatch(/top: 200px/);
      expect(styles).toMatch(/width: 200px/);
      // expect(wrapper).toMatchSnapshot();
    });

    it('custom dialog element such as header,body,footer and closebtn', () => {
      const title = 'i am dialog title';
      const body = 'i am dialog body';
      const footer = 'i am dialog footer';
      const closeBtn = false;
      const wrapper = mount({
        render() {
          return (
            <Dialog header={title} footer={() => footer} closeBtn={closeBtn}>
              <div slot="body">{body}</div>
            </Dialog>
          );
        },
      });
      const dialogTitle = wrapper.find('.t-dialog__header');
      const dialogBody = wrapper.find('.t-dialog__body');
      const dialogFooter = wrapper.find('.t-dialog__footer');
      expect(dialogTitle.text()).toBe(title);
      expect(dialogBody.text()).toBe(body);
      expect(dialogFooter.text()).toBe(footer);
      expect(wrapper.contains('.t-icon-close')).toBe(false);
      // expect(wrapper).toMatchSnapshot();
    });

    it('showOverlay is false and zIndex is 1', () => {
      const zIndex = 1;
      const wrapper = mount(Dialog, {
        propsData: {
          showOverlay: false,
          zIndex,
        },
      });
      const mask = wrapper.find('.t-dialog-mask');
      expect(mask.classes()).toContain('t-dialog-mask--hidden');
      expect(wrapper.attributes('style')).toMatch(/z-index: 1/);
      // expect(wrapper).toMatchSnapshot();
    });

    it('dialog destory when closed', () => {
      expect(mount(Dialog, { propsData: { destroyOnClose: true } }).classes()).toContain('t-not-display');
      expect(mount(Dialog).classes()).toContain('t-not-visable');
      // expect(wrapper).toMatchSnapshot();
    });
  });

  // test events
  // describe('@event', () => {});

  // // test slots
  // describe('<slot>', () => {
  //   it('', () => {});
  // });

  // // test exposure function
  // describe('function', () => {
  //   it('', () => {});
  // });
});
