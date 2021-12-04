import { mount } from '@vue/test-utils';
import {
  CloseIcon,
  MoreIcon,
  InfoCircleFilledIcon,
  CheckCircleFilledIcon,
  ErrorCircleFilledIcon,
  HelpCircleFilledIcon,
  LoadingIcon,
} from 'tdesign-icons-vue-next';
import { Message } from '@/src/message/index.ts';
import Button from '@/src/button/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Message', () => {
  // test props api
  describe(':props', () => {
    const THEME_MAP = {
      info: InfoCircleFilledIcon,
      success: CheckCircleFilledIcon,
      warning: ErrorCircleFilledIcon,
      error: ErrorCircleFilledIcon,
      question: HelpCircleFilledIcon,
      loading: LoadingIcon,
    };
    const THEME_LIST = Object.keys(THEME_MAP);

    it('pure message contains two classes', () => {
      const wrapper = mount(Message);
      const classes = wrapper.classes();
      expect(classes).toContain('t-message');
      expect(classes).toContain('t-is-info');
      expect(wrapper.findComponent(CloseIcon).exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(`:theme ${THEME_LIST.join()}`, () => {
      THEME_LIST.forEach((t) => {
        const wrapper = mount({
          render() {
            return <Message theme={t}></Message>;
          },
        });
        const msg = wrapper.findComponent(Message);
        expect(msg.classes()).toContain(`t-is-${t}`);
        expect(msg.findComponent(THEME_MAP[t]).exists()).toBe(true);
        expect(wrapper.element).toMatchSnapshot();
      });
    });

    it(':closeBtn is true, render default close button.', () => {
      const wrapper = mount({
        render() {
          return <Message closeBtn={true}></Message>;
        },
      });
      const msg = wrapper.findComponent(Message);
      expect(msg.find('.t-message-close').exists()).toBe(true);
      expect(msg.findComponent(CloseIcon).exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':closeBtn is a tring, equal "关闭".', () => {
      const wrapper = mount({
        render() {
          return <Message closeBtn="关闭"></Message>;
        },
      });
      const msg = wrapper.findComponent(Message);
      const close = msg.find('.t-message-close');
      expect(close.exists()).toBe(true);
      expect(close.text()).toBe('关闭');
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':closeBtn is a function, () => VNode.', () => {
      const wrapper = mount({
        render() {
          return <Message closeBtn={() => <b class="t-message-close-content">x</b>}></Message>;
        },
      });
      const msg = wrapper.findComponent(Message);
      const close = msg.find('.t-message-close-content');
      expect(close.exists()).toBe(true);
      expect(close.html()).toBe('<b class="t-message-close-content">x</b>');
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':icon is false', () => {
      const wrapper = mount({
        render() {
          return <Message icon={false}></Message>;
        },
      });
      const msg = wrapper.findComponent(Message);
      expect(msg.find('.t-icon').exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':icon is a funtion, () => MoreIcon', () => {
      const wrapper = mount({
        render() {
          return <Message icon={() => <MoreIcon></MoreIcon>}></Message>;
        },
      });
      expect(wrapper.findComponent(MoreIcon).exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':default is a funtion, () => <b>这是重要信息</b>', () => {
      const wrapper = mount({
        render() {
          return <Message content={() => <b>这是重要信息</b>}></Message>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':default is a string, 这是普通信息', () => {
      const wrapper = mount({
        render() {
          return <Message content="这是普通信息"></Message>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  // test events
  describe('@event', () => {
    it('@duration-end', (done) => {
      const wrapper = mount({
        render() {
          return <Message duration={3000}></Message>;
        },
      });
      const msg = wrapper.findComponent(Message);
      expect(msg.emitted()['duration-end']).toBeFalsy();
      const timer = setTimeout(() => {
        const msg = wrapper.findComponent(Message);
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
              v-slots={{
                default: () => <Button class="custom-message">自定义细心内容</Button>,
              }}
            ></Message>
          );
        },
      });
      expect(wrapper.findComponent(Button).exists()).toBe(true);
      expect(wrapper.find('.custom-message').exists()).toBe(true);
    });

    it('<icon>', () => {
      const wrapper = mount({
        render() {
          return (
            <Message
              v-slots={{
                icon: () => <MoreIcon></MoreIcon>,
              }}
            ></Message>
          );
        },
      });
      expect(wrapper.findComponent(MoreIcon).exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('<closeBtn>', () => {
      const wrapper = mount({
        render() {
          return (
            <Message
              v-slots={{
                closeBtn: () => <div class="custome-close-btn">x</div>,
              }}
            ></Message>
          );
        },
      });
      expect(wrapper.find('.custome-close-btn').exists()).toBe(true);
    });
  });
});
