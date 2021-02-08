/* eslint-disable @typescript-eslint/no-empty-function */
import { mount } from '@vue/test-utils';
import Dialog from '@/src/dialog/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Dialog', () => {
  // test props api
  describe(':props', () => {
    it('modeless', () => {
      const wrapper = mount(Dialog, {
        propsData: { mode: 'modeless' },
      });
      expect(wrapper.find('.t-dialog-mask').exists()).toBe(false);
    });

    it('placement', () => {
      const dialog = mount(Dialog).find('.t-dialog');
      const centerDialog = mount(Dialog, {
        propsData: {
          placement: 'center',
          width: '500px',
        },
      }).find('.t-dialog');
      expect(dialog.classes()).toContain('t-dialog--top');
      const centerDialogClass = centerDialog.classes();
      expect(centerDialogClass).not.toContain('t-dialog--top');
      expect(centerDialogClass).toContain('t-dialog--center');
      const centerDialogStyles = centerDialog.attributes('style');
      expect(centerDialogStyles).toMatch(/width: 500px/);
      expect(centerDialogStyles).not.toMatch(/translate/);
    });

    it('top', () => {
      const wrapper = mount(Dialog, {
        propsData: {
          top: '200px',
          width: '200px',
        },
      });
      const dialog = wrapper.find('.t-dialog');
      const classes = dialog.classes();
      const styles = dialog.attributes('style');
      expect(classes).not.toContain('t-dialog--center');
      expect(styles).toMatch(/top: 200px/);
      expect(styles).toMatch(/width: 200px/);
      // expect(wrapper).toMatchSnapshot();
    });

    it('header,body,footer and closebtn', () => {
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
    });

    it('showOverlay and zIndex', () => {
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
    });

    it('destroyOnClose', async () => {
      const wrapper = mount(Dialog, { propsData: { visible: true } });
      // 正常挂载下，弹窗关闭时不销毁Dialog子元素
      await wrapper.setProps({ visible: false });
      expect(wrapper.isEmpty()).toBe(false);

      // 弹窗关闭时销毁Dialog子元素
      await wrapper.setProps({ destroyOnClose: true, visible: true });
      expect(wrapper.isEmpty()).toBe(false);
      await wrapper.setProps({ visible: false });
      expect(wrapper.isEmpty()).toBe(true);
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
