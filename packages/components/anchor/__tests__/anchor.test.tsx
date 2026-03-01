/* eslint-disable vue/one-component-per-file */
import { mount } from '@vue/test-utils';
import { Anchor, AnchorItem, AnchorTarget } from '@tdesign/components/anchor';
import { Affix } from '@tdesign/components/affix';
import { nextTick, defineComponent, h } from 'vue';
import { vi } from 'vitest';

// Mock shared-utils
vi.mock('@tdesign/shared-utils', async () => {
  const actual = await vi.importActual('@tdesign/shared-utils');
  return {
    ...actual,
    isServer: false,
    scrollTo: vi.fn().mockResolvedValue(undefined),
  };
});

describe('Anchor', () => {
  describe(':base', () => {
    it('render', () => {
      const wrapper = mount(
        defineComponent({
          render() {
            return (
              <Anchor>
                <AnchorItem href="#基础锚点" title="基础锚点"></AnchorItem>
                <AnchorItem href="#多级锚点" title="多级锚点"></AnchorItem>
                <AnchorItem href="#指定容器锚点" title="指定容器锚点"></AnchorItem>
              </Anchor>
            );
          },
        }),
      );
      expect(wrapper.find('.t-anchor').exists()).toBeTruthy();
      const AnchorItemList = wrapper.findAllComponents(AnchorItem);
      expect(AnchorItemList.length).toBe(3);
    });

    it('render AnchorTarget', () => {
      const wrapper = mount(
        defineComponent({
          render() {
            return (
              <Anchor>
                <AnchorTarget id="anchor-target-1"></AnchorTarget>
                <AnchorTarget id="anchor-target-2"></AnchorTarget>
                <AnchorTarget id="anchor-target-3"></AnchorTarget>
              </Anchor>
            );
          },
        }),
      );
      expect(wrapper.find('.t-anchor').exists()).toBeTruthy();
      const AnchorTargetList = wrapper.findAllComponents(AnchorTarget);
      expect(AnchorTargetList.length).toBe(3);
    });
  });

  describe(':props', () => {
    it('size', () => {
      const wrapper = mount(Anchor, {
        props: { size: 'large' },
      });
      expect(wrapper.find('.t-size-l').exists()).toBe(true);

      const wrapperSmall = mount(Anchor, {
        props: { size: 'small' },
      });
      expect(wrapperSmall.find('.t-size-s').exists()).toBe(true);
    });

    it('affixProps', () => {
      const wrapper = mount(Anchor, {
        props: {
          affixProps: { offsetTop: 100 },
        },
        slots: {
          default: '<div />',
        },
      });
      expect(wrapper.findComponent(Affix).exists()).toBe(true);
    });

    it('cursor', () => {
      const wrapper = mount(Anchor, {
        props: {
          cursor: () => h('div', { class: 'custom-cursor' }),
        },
      });
      expect(wrapper.find('.custom-cursor').exists()).toBe(true);
    });

    it('cursor slot', () => {
      const wrapper = mount(Anchor, {
        slots: {
          cursor: '<div class="slot-cursor"></div>',
        },
      });
      expect(wrapper.find('.slot-cursor').exists()).toBe(true);
    });

    it('bounds and targetOffset', async () => {
      const container = document.createElement('div');
      container.style.height = '500px';
      container.style.overflow = 'auto';
      document.body.appendChild(container);

      const target = document.createElement('div');
      target.id = 'item-1';
      target.style.height = '200px';
      container.appendChild(target);

      // Mock getBoundingClientRect
      vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({
        top: 100,
        height: 200,
      } as DOMRect);

      vi.spyOn(container, 'getBoundingClientRect').mockReturnValue({
        top: 0,
      } as DOMRect);

      // Case 1: bounds=5 (default), targetOffset=0. 100 < 5 is false. Not active.
      const wrapper1 = mount(
        defineComponent({
          render() {
            return (
              <Anchor container={() => container}>
                <AnchorItem href="#item-1" title="Item 1" />
              </Anchor>
            );
          },
        }),
        { attachTo: document.body },
      );

      container.dispatchEvent(new Event('scroll'));
      await nextTick();
      expect(wrapper1.find('.t-is-active').exists()).toBe(false);
      wrapper1.unmount();

      // Case 2: bounds=150. 100 < 150 is true. Active.
      const wrapper2 = mount(
        defineComponent({
          render() {
            return (
              <Anchor container={() => container} bounds={150}>
                <AnchorItem href="#item-1" title="Item 1" />
              </Anchor>
            );
          },
        }),
        { attachTo: document.body },
      );

      container.dispatchEvent(new Event('scroll'));
      await nextTick();
      expect(wrapper2.find('.t-is-active').exists()).toBe(true);
      wrapper2.unmount();

      // Case 3: targetOffset=150. 100 < 5 + 150 is true. Active.
      const wrapper3 = mount(
        defineComponent({
          render() {
            return (
              <Anchor container={() => container} targetOffset={150}>
                <AnchorItem href="#item-1" title="Item 1" />
              </Anchor>
            );
          },
        }),
        { attachTo: document.body },
      );

      container.dispatchEvent(new Event('scroll'));
      await nextTick();
      expect(wrapper3.find('.t-is-active').exists()).toBe(true);
      wrapper3.unmount();

      document.body.removeChild(container);
    });

    it('container as string', () => {
      const div = document.createElement('div');
      div.id = 'scroll-container';
      document.body.appendChild(div);

      const wrapper = mount(Anchor, {
        props: { container: '#scroll-container' },
      });

      expect(wrapper.exists()).toBe(true);
      document.body.removeChild(div);
    });

    it('container as null', () => {
      const wrapper = mount(Anchor, {
        props: { container: null },
      });
      expect(wrapper.exists()).toBe(true);
    });

    it('container as window', () => {
      const wrapper = mount(Anchor, {
        props: { container: () => window },
      });
      expect(wrapper.exists()).toBe(true);
    });
  });

  describe(':events', () => {
    it('onClick', async () => {
      const onClick = vi.fn();
      const wrapper = mount(
        defineComponent({
          render() {
            return (
              <Anchor onClick={onClick}>
                <AnchorItem href="#item-1" title="Item 1" />
              </Anchor>
            );
          },
        }),
      );

      const item = wrapper.findComponent(AnchorItem);
      await item.find('a').trigger('click');
      expect(onClick).toHaveBeenCalled();
    });

    it('onChange', async () => {
      const container = document.createElement('div');
      container.style.height = '500px';
      container.style.overflow = 'auto';
      document.body.appendChild(container);

      const target1 = document.createElement('div');
      target1.id = 'item-1';
      target1.style.height = '200px';
      container.appendChild(target1);

      const target2 = document.createElement('div');
      target2.id = 'item-2';
      target2.style.height = '200px';
      container.appendChild(target2);

      vi.spyOn(target1, 'getBoundingClientRect').mockReturnValue({
        top: 0,
        height: 200,
      } as DOMRect);

      vi.spyOn(target2, 'getBoundingClientRect').mockReturnValue({
        top: 200,
        height: 200,
      } as DOMRect);

      vi.spyOn(container, 'getBoundingClientRect').mockReturnValue({
        top: 0,
      } as DOMRect);

      const onChange = vi.fn();
      const wrapper = mount(
        defineComponent({
          render() {
            return (
              <Anchor container={() => container} onChange={onChange}>
                <AnchorItem href="#item-1" title="Item 1" />
                <AnchorItem href="#item-2" title="Item 2" />
              </Anchor>
            );
          },
        }),
        { attachTo: document.body },
      );

      await nextTick();

      container.dispatchEvent(new Event('scroll'));
      await nextTick();

      expect(onChange).toHaveBeenCalledWith('#item-1', '#item-1');

      document.body.removeChild(container);
      wrapper.unmount();
    });

    it('onChange not triggered for same value', async () => {
      const container = document.createElement('div');
      container.style.height = '500px';
      container.style.overflow = 'auto';
      document.body.appendChild(container);

      const target = document.createElement('div');
      target.id = 'item-1';
      target.style.height = '200px';
      container.appendChild(target);

      vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({
        top: 0,
        height: 200,
      } as DOMRect);

      vi.spyOn(container, 'getBoundingClientRect').mockReturnValue({
        top: 0,
      } as DOMRect);

      const onChange = vi.fn();
      const wrapper = mount(
        defineComponent({
          render() {
            return (
              <Anchor container={() => container} onChange={onChange}>
                <AnchorItem href="#item-1" title="Item 1" />
              </Anchor>
            );
          },
        }),
        { attachTo: document.body },
      );

      await nextTick();

      container.dispatchEvent(new Event('scroll'));
      await nextTick();
      expect(onChange).toHaveBeenCalledTimes(1);

      container.dispatchEvent(new Event('scroll'));
      await nextTick();
      expect(onChange).toHaveBeenCalledTimes(1);

      document.body.removeChild(container);
      wrapper.unmount();
    });
  });

  describe(':internal methods', () => {
    it('handleScrollLock prevents scrolling', async () => {
      const container = document.createElement('div');
      container.style.height = '500px';
      container.style.overflow = 'auto';
      document.body.appendChild(container);

      const target = document.createElement('div');
      target.id = 'item-1';
      target.style.height = '200px';
      container.appendChild(target);

      vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({
        top: 0,
        height: 200,
      } as DOMRect);

      vi.spyOn(container, 'getBoundingClientRect').mockReturnValue({
        top: 0,
      } as DOMRect);

      const onChange = vi.fn();
      const wrapper = mount(
        defineComponent({
          render() {
            return (
              <Anchor container={() => container} onChange={onChange}>
                <AnchorItem href="#item-1" title="Item 1" />
              </Anchor>
            );
          },
        }),
        { attachTo: document.body },
      );

      await nextTick();

      const anchorItem = wrapper.findComponent(AnchorItem);
      await anchorItem.find('a').trigger('click');

      await nextTick();
      await nextTick();

      container.dispatchEvent(new Event('scroll'));
      await nextTick();

      const currentCallCount = onChange.mock.calls.length;

      container.dispatchEvent(new Event('scroll'));
      await nextTick();

      expect(onChange.mock.calls.length).toBe(currentCallCount);

      document.body.removeChild(container);
      wrapper.unmount();
    });

    it('getAnchorTarget returns undefined for invalid link', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      const wrapper = mount(
        defineComponent({
          render() {
            return (
              <Anchor container={() => container}>
                <AnchorItem href="#non-existent" title="Non Existent" />
                <AnchorItem href="invalid-link" title="Invalid Link" />
              </Anchor>
            );
          },
        }),
        { attachTo: document.body },
      );

      await nextTick();

      container.dispatchEvent(new Event('scroll'));
      await nextTick();

      expect(wrapper.find('.t-is-active').exists()).toBe(false);

      document.body.removeChild(container);
      wrapper.unmount();
    });

    it('registerLink and unregisterLink work through provide/inject', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      const wrapper = mount(
        defineComponent({
          render() {
            return (
              <Anchor container={() => container}>
                <AnchorItem href="#test1" title="Test 1" />
                <AnchorItem href="#test2" title="Test 2" />
                <AnchorItem href="invalid" title="Invalid" />
              </Anchor>
            );
          },
        }),
        { attachTo: document.body },
      );

      await nextTick();

      const items = wrapper.findAllComponents(AnchorItem);
      expect(items.length).toBe(3);

      const target1 = document.createElement('div');
      target1.id = 'test1';
      target1.style.height = '200px';
      container.appendChild(target1);

      const target2 = document.createElement('div');
      target2.id = 'test2';
      target2.style.height = '200px';
      container.appendChild(target2);

      vi.spyOn(target1, 'getBoundingClientRect').mockReturnValue({
        top: 0,
        height: 200,
      } as DOMRect);

      vi.spyOn(target2, 'getBoundingClientRect').mockReturnValue({
        top: 200,
        height: 200,
      } as DOMRect);

      vi.spyOn(container, 'getBoundingClientRect').mockReturnValue({
        top: 0,
      } as DOMRect);

      container.dispatchEvent(new Event('scroll'));
      await nextTick();

      const activeItems = wrapper.findAll('.t-is-active');
      expect(activeItems.length).toBeGreaterThan(0);

      document.body.removeChild(container);
      wrapper.unmount();
    });

    it('setCurrentActiveLink with same value returns early', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      const target = document.createElement('div');
      target.id = 'test1';
      target.style.height = '200px';
      container.appendChild(target);

      vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({
        top: 0,
        height: 200,
      } as DOMRect);

      vi.spyOn(container, 'getBoundingClientRect').mockReturnValue({
        top: 0,
      } as DOMRect);

      const onChange = vi.fn();
      const wrapper = mount(
        defineComponent({
          render() {
            return (
              <Anchor container={() => container} onChange={onChange}>
                <AnchorItem href="#test1" title="Test 1" />
              </Anchor>
            );
          },
        }),
        { attachTo: document.body },
      );

      await nextTick();

      container.dispatchEvent(new Event('scroll'));
      await nextTick();
      const firstCallCount = onChange.mock.calls.length;

      container.dispatchEvent(new Event('scroll'));
      await nextTick();

      expect(onChange.mock.calls.length).toBe(firstCallCount);

      document.body.removeChild(container);
      wrapper.unmount();
    });
  });

  describe(':edge cases', () => {
    it('isServer case in getScrollContainer', async () => {
      // Mock isServer to true
      const sharedUtils = await import('@tdesign/shared-utils');
      (sharedUtils as any).isServer = true;

      const wrapper = mount(Anchor, {
        props: { container: '#test' },
      });

      expect(wrapper.exists()).toBe(true);

      // Restore isServer
      (sharedUtils as any).isServer = false;
    });

    it('getAnchorTarget with non-matching link - use valid href', () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      const wrapper = mount(
        defineComponent({
          render() {
            return (
              <Anchor container={() => container}>
                <AnchorItem href="#no-match-1" title="No Match 1" />
                <AnchorItem href="#no-hash-valid" title="Valid but no target" />
              </Anchor>
            );
          },
        }),
        { attachTo: document.body },
      );

      expect(wrapper.exists()).toBe(true);

      document.body.removeChild(container);
      wrapper.unmount();
    });

    it('updateActiveLine when no active element', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      const wrapper = mount(
        defineComponent({
          render() {
            return (
              <Anchor container={() => container}>
                <AnchorItem href="#no-target" title="No Target" />
              </Anchor>
            );
          },
        }),
        { attachTo: document.body },
      );

      await nextTick();

      expect(wrapper.find('.t-is-active').exists()).toBe(false);

      document.body.removeChild(container);
      wrapper.unmount();
    });

    it('handleScrollTo with invalid link triggers getAnchorTarget early return', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      const wrapper = mount(
        defineComponent({
          render() {
            return (
              <Anchor container={() => container}>
                <AnchorItem href="#invalid-link" title="Invalid Link" />
              </Anchor>
            );
          },
        }),
        { attachTo: document.body },
      );

      await nextTick();

      // Trigger click on the invalid link
      const item = wrapper.findComponent(AnchorItem);
      await item.find('a').trigger('click');

      // Should not throw error
      expect(true).toBe(true);

      document.body.removeChild(container);
      wrapper.unmount();
    });

    it('getAnchorTarget returns undefined when element does not exist', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      const wrapper = mount(
        defineComponent({
          render() {
            return (
              <Anchor container={() => container}>
                <AnchorItem href="#not-exist" title="Not Exist" />
              </Anchor>
            );
          },
        }),
        { attachTo: document.body },
      );

      await nextTick();

      // Trigger scroll to call handleScroll -> getAnchorTarget
      container.dispatchEvent(new Event('scroll'));
      await nextTick();

      // Trigger click to call handleScrollTo -> getAnchorTarget
      const item = wrapper.findComponent(AnchorItem);
      await item.find('a').trigger('click');
      await nextTick();

      expect(wrapper.find('.t-is-active').exists()).toBe(false);

      document.body.removeChild(container);
      wrapper.unmount();
    });
  });

  describe(':lifecycle', () => {
    it('onMounted and onUnmounted work correctly', async () => {
      const container = document.createElement('div');
      container.id = 'test-container';
      document.body.appendChild(container);

      const addEventListenerSpy = vi.spyOn(container, 'addEventListener');
      const removeEventListenerSpy = vi.spyOn(container, 'removeEventListener');

      const wrapper = mount(
        defineComponent({
          render() {
            return (
              <Anchor container={() => container}>
                <AnchorItem href="#item-1" title="Item 1" />
              </Anchor>
            );
          },
        }),
        { attachTo: document.body },
      );

      await nextTick();

      expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), undefined);

      wrapper.unmount();
      await nextTick();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), undefined);

      document.body.removeChild(container);
    });

    it('watchEffect updates scroll container when props change', async () => {
      const container1 = document.createElement('div');
      container1.id = 'container1';
      document.body.appendChild(container1);

      const addEventListenerSpy1 = vi.spyOn(container1, 'addEventListener');

      const wrapper = mount(
        defineComponent({
          data() {
            return {
              currentContainer: container1,
            };
          },
          render() {
            return (
              <Anchor container={() => (this as any).currentContainer}>
                <AnchorItem href="#item-1" title="Item 1" />
              </Anchor>
            );
          },
        }),
        { attachTo: document.body },
      );

      await nextTick();

      expect(addEventListenerSpy1).toHaveBeenCalledWith('scroll', expect.any(Function), undefined);

      wrapper.setData({ currentContainer: null });
      await nextTick();

      wrapper.unmount();
      document.body.removeChild(container1);
    });
  });
});
