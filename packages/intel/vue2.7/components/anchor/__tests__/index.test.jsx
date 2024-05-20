import { mount } from '@vue/test-utils';
import { Anchor, AnchorItem } from '@/src/anchor/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Anchor', () => {
  // test props api
  describe('test register and unregister link', () => {
    it('should register&unregister correctly', () => {
      const wrapper = mount({
        render() {
          return (
            <Anchor>
              <AnchorItem href="#test-a" />
              <AnchorItem href="#test-b" />
            </Anchor>
          );
        },
      }).findComponent(Anchor);
      const { vm } = wrapper;
      expect(vm.$data.links).toEqual(['#test-a', '#test-b']);
      wrapper.findAllComponents(AnchorItem).at(1).destroy();
      expect(vm.$data.links).toEqual(['#test-a']);
    });
  });
  describe('test activeLink', () => {
    it('should set active correctly', () => {
      const wrapper = mount({
        render() {
          return (
            <Anchor>
              <AnchorItem href="#test-a" />
              <AnchorItem href="#test-b" />
            </Anchor>
          );
        },
      }).findComponent(Anchor);
      const { vm } = wrapper;
      expect(vm.$data.active).toBe('');
      const link = wrapper.findComponent(AnchorItem);
      link.find('a').trigger('click');
      expect(vm.$data.active).toBe('#test-a');
    });
  });

  // test events
  describe('@event', () => {
    it('should emit click event', () => {
      const onClick = vi.fn();
      const wrapper = mount({
        render() {
          return (
            <Anchor onClick={onClick}>
              <AnchorItem href="#test-a" />
            </Anchor>
          );
        },
      }).findComponent(Anchor);
      const link = wrapper.findComponent(AnchorItem);
      link.find('a').trigger('click');
      expect(onClick).toBeCalledWith({
        href: '#test-a',
        title: '',
        e: expect.any(MouseEvent),
      });
    });
    it('should trigger onClick props', () => {
      const onClick = vi.fn();
      const wrapper = mount({
        render(h) {
          return h(
            Anchor,
            {
              props: {
                onClick,
              },
            },
            [
              h(AnchorItem, {
                props: {
                  href: '#test-a',
                },
              }),
              h(AnchorItem, {
                props: {
                  href: '#test-b',
                },
              }),
            ],
          );
        },
      }).findComponent(Anchor);
      const link = wrapper.findComponent(AnchorItem);
      link.find('a').trigger('click');
      expect(onClick).toBeCalledWith({
        href: '#test-a',
        title: '',
        e: expect.any(MouseEvent),
      });
    });
    it('should emit change event', () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return (
            <Anchor onChange={onChange}>
              <AnchorItem href="#test-a" />
              <AnchorItem href="#test-b" />
            </Anchor>
          );
        },
      }).findComponent(Anchor);
      const links = wrapper.findAllComponents(AnchorItem);
      links.at(0).find('a').trigger('click');
      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toBeCalledWith('#test-a', '');
      links.at(1).find('a').trigger('click');
      expect(onChange).toBeCalledTimes(2);
      expect(onChange).toBeCalledWith('#test-b', '#test-a');
    });
    it('should trigger onChange props', () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render(h) {
          return h(
            Anchor,
            {
              props: {
                onChange,
              },
            },
            [
              h(AnchorItem, {
                props: {
                  href: '#test-a',
                },
              }),
              h(AnchorItem, {
                props: {
                  href: '#test-b',
                },
              }),
            ],
          );
        },
      }).findComponent(Anchor);
      const links = wrapper.findAllComponents(AnchorItem);
      links.at(0).find('a').trigger('click');
      expect(onChange).toBeCalledTimes(2);
      expect(onChange).toBeCalledWith('#test-b', '');
      links.at(1).find('a').trigger('click');
      expect(onChange).toBeCalledTimes(3);
      expect(onChange).toBeCalledWith('#test-b', '#test-a');
    });
  });

  // test slots
  describe('<slot>', () => {
    it('should render another slots', () => {
      const wrapper = mount({
        render() {
          return (
            <Anchor>
              <div id="test-slot">123</div>
            </Anchor>
          );
        },
      });
      expect(wrapper.find('#test-slot').exists()).toBeTruthy();
    });
  });

  describe('test container', () => {
    it('should get container by string', () => {
      document.body.innerHTML = '<div id="container"></div>';
      const wrapper = mount(Anchor, {
        propsData: {
          container: '#container',
        },
      });
      expect(wrapper.vm.scrollContainer).toEqual(document.getElementById('container'));
    });
    it('should get container by method', () => {
      document.body.innerHTML = '<div id="container2"></div>';
      const dom = document.getElementById('container2');
      const wrapper = mount(Anchor, {
        propsData: {
          container: () => dom,
        },
      });
      expect(wrapper.vm.scrollContainer).toEqual(dom);
    });
  });

  describe('test scroll', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <div id="anchor-1"></div>
        <div id="anchor-2"></div>
        <div id="anchor-3"></div>
        <div id="anchor-4"></div>
        <div id="anchor-5"></div>
      `;
    });
    /**
     * @returns {import('@vue/test-utils').Wrapper<Vue>}
     */
    function getWrapper({ bounds, targetOffset } = {}) {
      return mount({
        render() {
          return (
            <Anchor bounds={bounds} targetOffset={targetOffset}>
              <AnchorItem href="#anchor-1"></AnchorItem>
              <AnchorItem href="#anchor-2"></AnchorItem>
              <AnchorItem href="#anchor-3"></AnchorItem>
              <AnchorItem href="#anchor-4"></AnchorItem>
              <AnchorItem href="#anchor-5"></AnchorItem>
            </Anchor>
          );
        },
      }).findComponent(Anchor);
    }
    /**
     *
     * @param {import('@vue/test-utils').Wrapper<Vue>} wrapper
     * @returns {Wrapper<Vue>[]}
     */
    function getAnchor() {
      const anchor1 = document.getElementById('anchor-1');
      const anchor2 = document.getElementById('anchor-2');
      const anchor3 = document.getElementById('anchor-3');
      const anchor4 = document.getElementById('anchor-4');
      const anchor5 = document.getElementById('anchor-5');
      const anchors = [anchor1, anchor2, anchor3, anchor4, anchor5];
      return anchors;
    }
    /**
     *
     * @param {import('@vue/test-utils').Wrapper<Vue>[]} anchors
     * @param {number[]} array
     */
    function setAnchorTop(anchors, array) {
      array.forEach((each, index) => {
        Object.defineProperty(anchors[index], 'getBoundingClientRect', {
          get() {
            return function () {
              return {
                top: each,
              };
            };
          },
        });
      });
    }
    it('should set active correctly', async () => {
      const wrapper = getWrapper();
      const anchors = getAnchor();
      setAnchorTop(anchors, [-400, -200, 0, 200, 400]);
      const event = new Event('scroll');
      const { vm } = wrapper.findComponent(Anchor);
      window.dispatchEvent(event);
      expect(vm.active).toEqual('#anchor-3');
    });
    it('should set active correctly with bounds&targetOffset', () => {
      const wrapper = getWrapper({ bounds: 50, targetOffset: 150 });
      const anchors = getAnchor();
      setAnchorTop(anchors, [-400, -200, -10, 190, 400]);
      const event = new Event('scroll');
      const { vm } = wrapper.findComponent(Anchor);
      window.dispatchEvent(event);
      expect(vm.active).toEqual('#anchor-4');
    });
    it('should scrollTo anchor-1', async () => {
      const wrapper = getWrapper();
      const anchors = getAnchor();
      setAnchorTop(anchors, [-400, -200, -10, 190, 400]);
      const scrollTo = vi.fn();
      Object.defineProperty(window, 'scrollTo', {
        get() {
          return scrollTo;
        },
      });
      Object.defineProperty(window, 'pageYOffset', {
        get() {
          return 610;
        },
      });
      const { vm } = wrapper;
      await vm.handleScrollTo('#anchor-2');
      expect(vm.active).toEqual('#anchor-2');
      expect(scrollTo.mock.calls.slice(-1)[0][1]).toEqual(610 - 200);
    });
    it('should scrollTo anchor-1 with targetOffset', async () => {
      const wrapper = getWrapper({ targetOffset: 150, bounds: 50 });
      const anchors = getAnchor();
      setAnchorTop(anchors, [-400, -200, -10, 190, 400]);
      const scrollTo = vi.fn();
      Object.defineProperty(window, 'scrollTo', {
        get() {
          return scrollTo;
        },
      });
      Object.defineProperty(window, 'pageYOffset', {
        get() {
          return 610;
        },
      });
      const { vm } = wrapper;
      await vm.handleScrollTo('#anchor-2');
      expect(vm.active).toEqual('#anchor-2');
      expect(scrollTo.mock.calls.slice(-1)[0][1]).toEqual(610 - 200 - 150);
    });
  });
});
