import { mount } from '@vue/test-utils';
import Vue from 'vue';
import { omit } from 'lodash-es';
import { AnchorItem } from '@/src/anchor/index.ts';

const defaultProvide = {
  tAnchor: {
    active: '',
    handleScrollTo: () => {
      //
    },
    registerLink: () => {
      //
    },
    unregisterLink: () => {
      //
    },
    handleLinkClick: () => {
      //
    },
  },
};

// every component needs four parts: props/events/slots/functions.
describe('AnchorItem', () => {
  // test props api
  describe('test lifecycle', () => {
    it('should render props correctly', async () => {
      const provide = {
        active: '',
        registerLink: vi.fn(),
        unregisterLink: vi.fn(),
        handleLinkClick: vi.fn(),
      };
      const props = {
        href: '#test',
        title: 'this is title',
        target: '_blank',
      };
      const wrapper = mount({
        provide: {
          tAnchor: provide,
        },
        data() {
          return props;
        },
        render() {
          return <AnchorItem href={this.href} title={this.title} target={this.target} />;
        },
      });
      const a = wrapper.find('a');
      expect(a.element.href).toEqual(location.href + props.href);
      expect(a.element.title).toEqual(props.title);
      expect(a.element.target).toEqual(props.target);
      expect(a.element.textContent).toEqual(props.title);
      expect(provide.registerLink).toBeCalledWith(props.href);
      a.trigger('click');
      expect(provide.handleLinkClick).toBeCalledWith({ ...omit(props, 'target'), e: expect.any(MouseEvent) });
      wrapper.setData({
        href: '#test-b',
      });
      await Vue.nextTick();
      expect(provide.unregisterLink).toBeCalledWith(props.href);
      expect(provide.registerLink).toBeCalledWith('#test-b');
    });
    it('should render title by function', async () => {
      const provide = {
        active: '',
        registerLink: vi.fn(),
        unregisterLink: vi.fn(),
      };
      const title = 'this is title function';
      const props = {
        href: '#test',
        title: (h) => h('span', title),
      };
      const wrapper = mount({
        provide: {
          tAnchor: provide,
        },
        data() {
          return props;
        },
        render() {
          return <AnchorItem href={this.href} title={this.title} />;
        },
      });
      const a = wrapper.find('a');
      expect(a.element.querySelector('span').innerHTML).toEqual(title);
    });
  });

  // test slots
  describe('<slot>', () => {
    it('test slot', () => {
      const wrapper = mount(AnchorItem, {
        provide: defaultProvide,
        propsData: {
          href: '#a',
        },
        slots: {
          title: '<div id="title"> this is title slot </div>',
          default: '<div id="default"> this is children content </div>',
        },
      });
      expect(wrapper.find('a').attributes('title')).toEqual('');
      expect(wrapper.find('#title').element.outerHTML).toMatchSnapshot();
      expect(wrapper.find('#default').element?.outerHTML).toMatchSnapshot();
    });
  });
});
