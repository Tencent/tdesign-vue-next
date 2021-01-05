import { mount } from '@vue/test-utils';
import { Message } from '@/src/message/index.ts';
import Button from '@/src/button/index.ts';
import TIconClose from '@/src/icon/close';
import TIconMore from '@/src/icon/more';
import TIconInfoCircleFilled from '@/src/icon/info-circle-filled';
import TIconCheckCircleFilled from '@/src/icon/check-circle-filled';
import TIconErrorCircleFilled from '@/src/icon/error-circle-filled';
import TIconHelpFill from '@/src/icon/help-circle-filled';
import TIconLoadingFill from '@/src/icon/loading';

// every component needs four parts: props/events/slots/functions.
describe('Message', () => {
  // test props api
  describe(':props', () => {
    const THEME_MAP = {
      info: TIconInfoCircleFilled,
      success: TIconCheckCircleFilled,
      warning: TIconErrorCircleFilled,
      error: TIconErrorCircleFilled,
      question: TIconHelpFill,
      loading: TIconLoadingFill,
    };
    const THEME_LIST = Object.keys(THEME_MAP);

    it('pure message contains two classes', () => {
      const wrapper = mount(Message);
      const classes = wrapper.classes();
      expect(classes).toContain('t-message');
      expect(classes).toContain('t-is-info');
      expect(wrapper.contains(TIconClose)).toBe(false);
      expect(wrapper).toMatchSnapshot();
    });

    it(`:theme ${THEME_LIST.join()}`, () => {
      THEME_LIST.forEach((t) => {
        const wrapper = mount({
          render() {
            return <Message theme={t}></Message>;
          },
        });
        const msg = wrapper.find(Message);
        expect(msg.classes()).toContain(`t-is-${t}`);
        expect(msg.contains(THEME_MAP[t]));
        expect(wrapper).toMatchSnapshot();
      });
    });

    it(':closeBtn is true, render default close button.', () => {
      const wrapper = mount({
        render() {
          return <Message closeBtn={true}></Message>;
        },
      });
      const msg = wrapper.find(Message);
      expect(msg.contains('.t-message-close')).toBe(true);
      expect(msg.contains(TIconClose)).toBe(true);
      expect(wrapper).toMatchSnapshot();
    });

    it(':closeBtn is a tring, equal "关闭".', () => {
      const wrapper = mount({
        render() {
          return <Message closeBtn='关闭'></Message>;
        },
      });
      const msg = wrapper.find(Message);
      const close = msg.find('.t-message-close');
      expect(close.isEmpty()).toBe(false);
      expect(close.text()).toBe('关闭');
      expect(wrapper).toMatchSnapshot();
    });

    it(':closeBtn is a function, () => VNode.', () => {
      const wrapper = mount({
        render() {
          return (
            <Message
              closeBtn={() => <b class='t-message-close-content'>x</b>}
            ></Message>
          );
        },
      });
      const msg = wrapper.find(Message);
      const close = msg.find('.t-message-close-content');
      expect(close.isEmpty()).toBe(false);
      expect(close.html()).toBe('<b class="t-message-close-content">x</b>');
      expect(wrapper).toMatchSnapshot();
    });

    it(':icon is false', () => {
      const wrapper = mount({
        render() {
          return <Message icon={false} ></Message>;
        },
      });
      const msg = wrapper.find(Message);
      expect(msg.contains('.t-icon')).toBe(false);
      expect(wrapper).toMatchSnapshot();
    });

    it(':icon is a funtion, () => TIconMore', () => {
      const wrapper = mount({
        render() {
          return (
            <Message
              icon={() => <TIconMore></TIconMore>}
            ></Message>
          );
        },
      });
      expect(wrapper.contains(TIconMore)).toBe(true);
      expect(wrapper).toMatchSnapshot();
    });

    it(':default is a funtion, () => <b>这是重要信息</b>', () => {
      const wrapper = mount({
        render() {
          return (
            <Message
              content={() => <b>这是重要信息</b>}
            ></Message>
          );
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':default is a string, 这是普通信息', () => {
      const wrapper = mount({
        render() {
          return (
            <Message content='这是普通信息'></Message>
          );
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  // test events
  describe('@event', () => {
    it('@click-close-btn', async () => {
      const wrapper = mount({
        render() {
          return <Message closeBtn={true}></Message>;
        },
      });
      const msg = wrapper.find(Message);
      await msg.find('.t-icon-close').trigger('click');
      expect(msg.emitted()['click-close-btn']).toBeTruthy();
    });

    it('@duration-end', (done) => {
      const wrapper = mount({
        render() {
          return <Message duration={3000}></Message>;
        },
      });
      const msg = wrapper.find(Message);
      expect(msg.emitted()['duration-end']).toBeFalsy();
      const timer = setTimeout(() => {
        const msg = wrapper.find(Message);
        expect(msg.emitted()['duration-end']).toBeTruthy();
        done();
        clearTimeout(timer);
      }, 3100);
    });
  });

  // test slots
  describe('<slot>', () => {
    it('<default>', () => {
      const wrapper = mount({
        render() {
          return (
            <Message
              {...{
                scopedSlots: {
                  default: () => <Button class='custom-message'>自定义细心内容</Button>,
                },
              }}
            ></Message>
          );
        },
      });
      expect(wrapper.contains(Button)).toBe(true);
      expect(wrapper.contains('.custom-message')).toBe(true);
    });

    it('<icon>', () => {
      const wrapper = mount({
        render() {
          return (
            <Message
              {...{
                scopedSlots: {
                  icon: () => <TIconMore></TIconMore>,
                },
              }}
            ></Message>
          );
        },
      });
      expect(wrapper.contains(TIconMore)).toBe(true);
      expect(wrapper).toMatchSnapshot();
    });

    it('<closeBtn>', () => {
      const wrapper = mount({
        render() {
          return (
            <Message
              {...{
                scopedSlots: {
                  closeBtn: () => <div class='custome-close-btn'>x</div>,
                },
              }}
            ></Message>
          );
        },
      });
      expect(wrapper.contains('.custome-close-btn')).toBe(true);
    });
  });
});
