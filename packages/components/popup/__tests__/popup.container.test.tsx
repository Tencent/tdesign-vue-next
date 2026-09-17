import { createCommentVNode, createTextVNode, defineComponent, Fragment, h, nextTick, ref } from 'vue';
import { mount, VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import PopupContainer from '@tdesign/components/popup/container';

class ResizeObserverMock {
  static instances: ResizeObserverMock[] = [];

  readonly observe = vi.fn();

  readonly unobserve = vi.fn();

  readonly disconnect = vi.fn();

  constructor(readonly callback: ResizeObserverCallback) {
    ResizeObserverMock.instances.push(this);
  }

  emit(contentRect: Partial<DOMRectReadOnly> = {}) {
    this.callback(
      [
        {
          contentRect: {
            bottom: 0,
            height: 10,
            left: 0,
            right: 0,
            top: 0,
            width: 10,
            x: 0,
            y: 0,
            toJSON: () => ({}),
            ...contentRect,
          },
        } as ResizeObserverEntry,
      ],
      this as unknown as ResizeObserver,
    );
  }
}

const wrappers: VueWrapper[] = [];

function mountContainer(
  props: Record<string, unknown> = {},
  slots: Record<string, any> = {
    default: () => <button class="trigger">trigger</button>,
    content: () => <div class="content">content</div>,
  },
) {
  const wrapper = mount(PopupContainer, {
    attachTo: document.body,
    props: {
      attach: 'body',
      forwardRef: vi.fn(),
      ...props,
    },
    slots,
  });
  wrappers.push(wrapper);
  return wrapper;
}

describe('PopupContainer', () => {
  beforeEach(() => {
    ResizeObserverMock.instances = [];
    vi.stubGlobal('ResizeObserver', ResizeObserverMock);
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      callback(0);
      return 1;
    });
  });

  afterEach(() => {
    wrappers
      .splice(0)
      .reverse()
      .forEach((wrapper) => wrapper.unmount());
    document.body.innerHTML = '';
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  describe('props', () => {
    it(':visible[boolean]', async () => {
      const wrapper = mountContainer({ visible: false });
      expect(document.querySelector('.content')).toBeNull();

      await wrapper.setProps({ visible: true });
      await nextTick();
      expect(document.querySelector('.content')?.textContent).toBe('content');
      expect(wrapper.emitted('contentMounted')).toHaveLength(1);
    });

    it(':attach[string]', async () => {
      const target = document.createElement('div');
      target.id = 'container-target';
      document.body.appendChild(target);
      mountContainer({ attach: '#container-target', visible: true });
      await nextTick();

      expect(target.querySelector('.content')?.textContent).toBe('content');
    });

    it(':attach[function]', async () => {
      const target = document.createElement('div');
      document.body.appendChild(target);
      const attach = vi.fn(() => target);
      mountContainer({ attach, visible: true });
      await nextTick();

      expect(attach).toHaveBeenCalled();
      expect(target.querySelector('.content')?.textContent).toBe('content');
    });

    it(':forwardRef[function]', async () => {
      const forwardRef = vi.fn();
      const wrapper = mountContainer({ forwardRef });
      await nextTick();

      expect(forwardRef).toHaveBeenCalledWith(wrapper.find('.trigger').element);
    });

    it('forwards class attributes to the trigger', () => {
      const wrapper = mount(PopupContainer, {
        attrs: { class: 'custom-trigger-class', id: 'ignored-id' },
        props: { attach: 'body', forwardRef: vi.fn() },
        slots: { default: () => <button>trigger</button> },
      });
      wrappers.push(wrapper);

      expect(wrapper.find('button').classes()).toContain('custom-trigger-class');
      expect(wrapper.find('button').attributes('id')).toBeUndefined();
    });
  });

  describe('slots', () => {
    it('renders one element without an extra wrapper', () => {
      const wrapper = mountContainer();
      expect(wrapper.find('.trigger').element.tagName).toBe('BUTTON');
      expect(wrapper.find('span').exists()).toBe(false);
    });

    it('wraps a text trigger in a span', () => {
      const wrapper = mountContainer({}, { default: () => 'text trigger' });
      expect(wrapper.find('span').text()).toBe('text trigger');
    });

    it('wraps multiple trigger nodes in a span', () => {
      const wrapper = mountContainer(
        {},
        {
          default: () => [<b class="first">first</b>, <i class="second">second</i>],
        },
      );
      expect(wrapper.find('span').exists()).toBe(true);
      expect(wrapper.findAll('span > *')).toHaveLength(2);
    });

    it('flattens an array nested in trigger nodes', () => {
      const wrapper = mountContainer(
        {},
        {
          default: () => [[<button class="nested-array-trigger">trigger</button>]],
        },
      );
      expect(wrapper.find('.nested-array-trigger').exists()).toBe(true);
    });

    it('flattens fragments and removes comments and whitespace', () => {
      const wrapper = mountContainer(
        {},
        {
          default: () => [
            createTextVNode('   '),
            createCommentVNode('ignored'),
            h(Fragment, null, [<button class="real-trigger">real trigger</button>]),
          ],
        },
      );

      expect(wrapper.find('.real-trigger').exists()).toBe(true);
      expect(wrapper.find('span').exists()).toBe(false);
    });

    it('an empty Fragment currently throws while filtering trigger nodes', () => {
      // Current behavior: filterEmpty recursively reads `children` from an empty Fragment, where Vue supplies null.
      expect(() =>
        mount(PopupContainer, {
          props: { attach: 'body', forwardRef: vi.fn() },
          slots: {
            default: () => (
              <Fragment>
                <Fragment></Fragment>
                <button>trigger</button>
              </Fragment>
            ),
          },
        }),
      ).toThrow(TypeError);
    });
  });

  describe('events', () => {
    it('emits resize when the trigger rectangle changes', async () => {
      const wrapper = mountContainer();
      await nextTick();
      const triggerObserver = ResizeObserverMock.instances.find((observer) =>
        observer.observe.mock.calls.some(([element]) => (element as Element).classList?.contains('trigger')),
      );

      triggerObserver.emit({ height: 10, width: 10 });
      await nextTick();
      expect(wrapper.emitted('resize')).toHaveLength(1);

      triggerObserver.emit({ height: 10, width: 10 });
      await nextTick();
      expect(wrapper.emitted('resize')).toHaveLength(1);

      triggerObserver.emit({ height: 20, width: 10 });
      await nextTick();
      expect(wrapper.emitted('resize')).toHaveLength(2);
    });

    it('emits resize when the content resizes', async () => {
      const wrapper = mountContainer({ visible: true });
      await nextTick();
      const contentObserver = ResizeObserverMock.instances.find((observer) =>
        observer.observe.mock.calls.some(([element]) => (element as Element).classList?.contains('content')),
      );

      contentObserver.emit({ height: 30, width: 30 });
      expect(wrapper.emitted('resize')).toHaveLength(1);
    });
  });

  describe('instanceFunctions', () => {
    it('unmountContent()', async () => {
      const wrapper = mountContainer({ visible: true });
      await nextTick();
      expect(document.querySelector('.content')).not.toBeNull();

      (wrapper.vm.$.exposed as { unmountContent: () => void }).unmountContent();
      await nextTick();
      expect(document.querySelector('.content')).toBeNull();
    });
  });

  describe('lifecycle', () => {
    it('updates the forwarded element when the trigger root changes', async () => {
      const useAlternative = ref(false);
      const forwardRef = vi.fn();
      const Host = defineComponent(() => () => (
        <PopupContainer attach="body" forwardRef={forwardRef}>
          {useAlternative.value ? (
            <div class="alternative-trigger">alternative</div>
          ) : (
            <button class="initial-trigger">initial</button>
          )}
        </PopupContainer>
      ));
      const wrapper = mount(Host, { attachTo: document.body });
      wrappers.push(wrapper);
      await nextTick();
      expect(forwardRef).toHaveBeenLastCalledWith(wrapper.find('.initial-trigger').element);

      useAlternative.value = true;
      await nextTick();
      expect(forwardRef).toHaveBeenLastCalledWith(wrapper.find('.alternative-trigger').element);
    });

    it('disconnects resize observers on unmount', async () => {
      const wrapper = mountContainer({ visible: true });
      await nextTick();
      const observers = [...ResizeObserverMock.instances];

      wrapper.unmount();
      wrappers.splice(wrappers.indexOf(wrapper), 1);

      observers.forEach((observer) => {
        expect(observer.unobserve).toHaveBeenCalled();
        expect(observer.disconnect).toHaveBeenCalled();
      });
    });
  });
});
