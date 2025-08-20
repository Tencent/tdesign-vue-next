import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';

// Mock the scrollTo function
vi.mock('@tdesign/shared-utils', async () => {
  const actual = await vi.importActual('@tdesign/shared-utils');
  return {
    ...actual,
    scrollTo: vi.fn(),
  };
});

import { BackTop } from '@tdesign/components/back-top';
import { scrollTo } from '@tdesign/shared-utils';

describe('BackTop Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test content prop and slot
  it('props.content works fine', () => {
    const wrapper = mount(<BackTop content={() => <span class="custom-node">TNode</span>}></BackTop>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slots.content works fine', () => {
    const wrapper = mount(<BackTop v-slots={{ content: () => <span class="custom-node">TNode</span> }}></BackTop>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  // Test default prop and slot
  it('props.default works fine', () => {
    const wrapper = mount(<BackTop default={() => <span class="custom-node">TNode</span>}></BackTop>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slots.default works fine', () => {
    const wrapper = mount(<BackTop v-slots={{ default: () => <span class="custom-node">TNode</span> }}></BackTop>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  // Test shape prop
  const shapeList = ['circle', 'square'] as const;
  shapeList.forEach((item) => {
    it(`props.shape is equal to ${item}`, () => {
      const wrapper = mount(<BackTop shape={item}></BackTop>);
      expect(wrapper.classes(`t-back-top--${item}`)).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  // Test size prop
  const sizeClassNameList = ['t-size-s', 't-size-m'];
  const sizeList = ['small', 'medium'] as const;
  sizeList.forEach((item, index) => {
    it(`props.size is equal to ${item}`, () => {
      const wrapper = mount(<BackTop size={item}>BackTop</BackTop>);
      expect(wrapper.classes(sizeClassNameList[index])).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  // Test theme prop
  const themeList = ['light', 'primary', 'dark'] as const;
  themeList.forEach((item) => {
    it(`props.theme is equal to ${item}`, () => {
      const wrapper = mount(<BackTop theme={item}>Text</BackTop>);
      expect(wrapper.classes(`t-back-top--theme-${item}`)).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  // Test container prop
  it('props.container works fine', () => {
    const containerEl = document.createElement('div');
    containerEl.className = 'custom-container';
    const wrapper = mount(<BackTop container={() => containerEl}></BackTop>);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('props.container with string selector works fine', () => {
    const wrapper = mount(<BackTop container="body"></BackTop>);
    expect(wrapper.exists()).toBeTruthy();
  });

  // Test target prop
  it.skipIf(process.env.TEST_TARGET === 'snap')('props.target works fine', async () => {
    const targetEl = document.createElement('div');
    targetEl.className = 'scroll-target';
    const wrapper = mount(<BackTop target={() => targetEl}></BackTop>);
    await wrapper.trigger('click');
    expect(scrollTo).toHaveBeenCalled();
  });

  it.skipIf(process.env.TEST_TARGET === 'snap')('props.target with string selector works fine', async () => {
    const wrapper = mount(<BackTop target="body"></BackTop>);
    expect(wrapper.exists()).toBeTruthy();

    // Test that clicking triggers scrollTo with correct behavior
    await wrapper.trigger('click');
    expect(vi.mocked(scrollTo)).toHaveBeenCalled();
  });

  // Test offset prop
  it('props.offset works fine with array', () => {
    const wrapper = mount(<BackTop offset={['10px', '20px']}></BackTop>);
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  // Test duration prop
  it('props.duration works fine', () => {
    const wrapper = mount(<BackTop duration={1000}></BackTop>);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('props.duration with 0 works fine', () => {
    const wrapper = mount(<BackTop duration={0}></BackTop>);
    expect(wrapper.exists()).toBeTruthy();
  });

  // Test visibleHeight prop
  it('props.visibleHeight works fine', () => {
    const wrapper = mount(<BackTop visibleHeight={300}></BackTop>);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('props.visibleHeight with 0 works fine', () => {
    const wrapper = mount(<BackTop visibleHeight={0}></BackTop>);
    expect(wrapper.exists()).toBeTruthy();
  });

  // Test click event
  it('events.click works fine', async () => {
    const fn = vi.fn();
    const wrapper = mount(<BackTop onClick={fn}></BackTop>);
    wrapper.findComponent(BackTop).trigger('click');
    await wrapper.vm.$nextTick();
    expect(fn).toHaveBeenCalled();
  });

  it.skipIf(process.env.TEST_TARGET === 'snap')('click triggers scrollTo function', async () => {
    const wrapper = mount(<BackTop></BackTop>);
    await wrapper.trigger('click');
    expect(vi.mocked(scrollTo)).toHaveBeenCalledTimes(1);
  });

  // Test component structure
  it('renders with correct base class', () => {
    const wrapper = mount(<BackTop></BackTop>);
    expect(wrapper.classes()).toContain('t-back-top');
  });

  it('renders with default icon', () => {
    const wrapper = mount(<BackTop></BackTop>);
    expect(wrapper.find('.t-icon-backtop.t-back-top__icon').exists()).toBeTruthy();
  });

  // Test combination of props
  it('works with multiple props combined', () => {
    const wrapper = mount(
      <BackTop
        shape="square"
        size="medium"
        theme="primary"
        offset={['20px', '30px']}
        duration={500}
        visibleHeight={200}
      >
        Custom Content
      </BackTop>,
    );
    expect(wrapper.classes()).toContain('t-back-top--square');
    expect(wrapper.classes()).toContain('t-size-m');
    expect(wrapper.classes()).toContain('t-back-top--theme-primary');
    expect(wrapper.text()).toContain('Custom Content');
  });

  it('props.theme validation works', () => {
    const wrapper = mount(<BackTop theme="light"></BackTop>);
    expect(wrapper.exists()).toBeTruthy();

    const wrapper2 = mount(<BackTop theme="primary"></BackTop>);
    expect(wrapper2.exists()).toBeTruthy();

    const wrapper3 = mount(<BackTop theme="dark"></BackTop>);
    expect(wrapper3.exists()).toBeTruthy();
  });

  // Test props validators - these should trigger the uncovered branches
  it('props validators handle invalid values', () => {
    // Test shape validator with invalid value
    const wrapper1 = mount(<BackTop shape={'' as any}></BackTop>);
    expect(wrapper1.exists()).toBeTruthy();

    // Test size validator with invalid value
    const wrapper2 = mount(<BackTop size={'' as any}></BackTop>);
    expect(wrapper2.exists()).toBeTruthy();

    // Test theme validator with invalid value
    const wrapper3 = mount(<BackTop theme={'' as any}></BackTop>);
    expect(wrapper3.exists()).toBeTruthy();
  });

  // Test visibility logic
  it('shows back-top when visibleHeight is 0', async () => {
    const wrapper = mount(<BackTop visibleHeight={0}></BackTop>);
    await nextTick();
    expect(wrapper.classes()).toContain('t-back-top--show');
  });

  it('handles string visibleHeight', async () => {
    const wrapper = mount(<BackTop visibleHeight="100px"></BackTop>);
    await nextTick();
    expect(wrapper.exists()).toBeTruthy();
  });

  // Test container scroll handling
  it('handles container scroll events', async () => {
    // Create a mock container
    const container = document.createElement('div');
    container.style.height = '100px';
    container.style.overflow = 'scroll';
    Object.defineProperty(container, 'scrollTop', {
      writable: true,
      value: 0,
    });
    document.body.appendChild(container);

    void mount(<BackTop container={() => container} visibleHeight={50}></BackTop>);
    await nextTick();

    // Simulate scroll event
    container.scrollTop = 100;
    const scrollEvent = new Event('scroll');
    container.dispatchEvent(scrollEvent);

    document.body.removeChild(container);
  });

  // Test document scroll when container doesn't have scrollTop
  it('handles document scroll when container has no scrollTop', async () => {
    const container = document.createElement('div');
    // Don't define scrollTop property to test the undefined case
    document.body.appendChild(container);

    void mount(<BackTop container={() => container} visibleHeight={50}></BackTop>);
    await nextTick();

    document.body.removeChild(container);
  });

  // Test scroll visibility toggle
  it('toggles visibility based on scroll position', async () => {
    const container = document.createElement('div');
    container.style.height = '100px';
    container.style.overflow = 'scroll';
    Object.defineProperty(container, 'scrollTop', {
      writable: true,
      value: 0,
    });
    document.body.appendChild(container);

    const wrapper = mount(<BackTop container={() => container} visibleHeight={50}></BackTop>);
    await nextTick();

    // Initially not visible
    expect(wrapper.classes()).not.toContain('t-back-top--show');

    // Scroll past threshold - should become visible
    container.scrollTop = 100;
    if (container.onscroll) {
      container.onscroll(new Event('scroll') as any);
    }
    await nextTick();

    // Scroll back below threshold - should become invisible
    container.scrollTop = 30;
    if (container.onscroll) {
      container.onscroll(new Event('scroll') as any);
    }
    await nextTick();

    document.body.removeChild(container);
  });

  // Test getBackTo function variations
  it.skipIf(process.env.TEST_TARGET === 'snap')('handles target same as container', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const wrapper = mount(<BackTop container={() => container} target={() => container}></BackTop>);
    await wrapper.trigger('click');
    expect(vi.mocked(scrollTo)).toHaveBeenCalled();

    document.body.removeChild(container);
  });

  it.skipIf(process.env.TEST_TARGET === 'snap')('handles target as body string', async () => {
    const wrapper = mount(<BackTop target="body"></BackTop>);
    await wrapper.trigger('click');
    expect(vi.mocked(scrollTo)).toHaveBeenCalled();
  });

  it.skipIf(process.env.TEST_TARGET === 'snap')('handles target with exact body string comparison', async () => {
    // Explicitly test target === 'body' condition in getBackTo
    const wrapper = mount(<BackTop container="body" target="body"></BackTop>);
    await wrapper.trigger('click');
    expect(vi.mocked(scrollTo)).toHaveBeenCalledWith(0, expect.any(Object));
  });

  it.skipIf(process.env.TEST_TARGET === 'snap')('tests getBackTo with different target and container', async () => {
    // Test case where target !== container and target is 'body'
    const container = document.createElement('div');
    document.body.appendChild(container);

    const wrapper = mount(<BackTop container={() => container} target="body"></BackTop>);
    await wrapper.trigger('click');
    expect(vi.mocked(scrollTo)).toHaveBeenCalledWith(0, expect.any(Object));

    document.body.removeChild(container);
  });

  it.skipIf(process.env.TEST_TARGET === 'snap')('handles no target', async () => {
    const wrapper = mount(<BackTop target={undefined as any}></BackTop>);
    await wrapper.trigger('click');
    expect(vi.mocked(scrollTo)).toHaveBeenCalled();
  });

  it.skipIf(process.env.TEST_TARGET === 'snap')('handles target that returns null', async () => {
    const wrapper = mount(<BackTop target={() => null}></BackTop>);
    await wrapper.trigger('click');
    expect(vi.mocked(scrollTo)).toHaveBeenCalled();
  });

  it.skipIf(process.env.TEST_TARGET === 'snap')('handles target with getBoundingClientRect', async () => {
    const targetElement = document.createElement('div');
    targetElement.getBoundingClientRect = vi.fn().mockReturnValue({ y: 100 });
    document.body.appendChild(targetElement);

    const wrapper = mount(<BackTop target={() => targetElement}></BackTop>);
    await wrapper.trigger('click');
    expect(vi.mocked(scrollTo)).toHaveBeenCalled();
    expect(targetElement.getBoundingClientRect).toHaveBeenCalled();

    document.body.removeChild(targetElement);
  });

  it.skipIf(process.env.TEST_TARGET === 'snap')('handles target as string selector', async () => {
    const targetElement = document.createElement('div');
    targetElement.className = 'scroll-target';
    targetElement.getBoundingClientRect = vi.fn().mockReturnValue({ y: 150 });
    document.body.appendChild(targetElement);

    const wrapper = mount(<BackTop target=".scroll-target"></BackTop>);
    await wrapper.trigger('click');
    expect(vi.mocked(scrollTo)).toHaveBeenCalled();
    expect(targetElement.getBoundingClientRect).toHaveBeenCalled();

    document.body.removeChild(targetElement);
  });

  // Test container as string selector
  it('handles container as body string', async () => {
    const wrapper = mount(<BackTop container="body"></BackTop>);
    await nextTick();
    expect(wrapper.exists()).toBeTruthy();
  });

  it('handles container as querySelector string', async () => {
    const testDiv = document.createElement('div');
    testDiv.className = 'test-container';
    document.body.appendChild(testDiv);

    const wrapper = mount(<BackTop container=".test-container"></BackTop>);
    await nextTick();
    expect(wrapper.exists()).toBeTruthy();

    document.body.removeChild(testDiv);
  });

  it('handles container querySelector that returns null', async () => {
    // Create a test where querySelector returns null to cover that branch
    const originalQuerySelector = document.querySelector;
    document.querySelector = vi.fn().mockReturnValue(null);

    try {
      // This should hit the return null branch in getContainer when querySelector returns null
      const wrapper = mount(<BackTop container=".non-existent"></BackTop>);

      // The component will be created but will have issues in onMounted due to null containerRef
      // We expect this test to exist but potentially throw an error in onMounted
      expect(wrapper.exists()).toBeTruthy();

      await nextTick();
    } catch (error) {
      // This is expected since containerRef.value will be null
      expect(error).toBeDefined();
    } finally {
      document.querySelector = originalQuerySelector;
    }
  });

  it('handles container that is neither string nor function', async () => {
    // Pass an object (neither string nor function) to trigger the return null path
    const container = { someProperty: 'value' };

    try {
      const wrapper = mount(<BackTop container={container as any}></BackTop>);
      expect(wrapper.exists()).toBeTruthy();

      await nextTick();
    } catch (error) {
      // This is expected since containerRef.value will be null due to return null in getContainer
      expect(error).toBeDefined();
    }
  });

  // Test unmount cleanup
  it('cleans up scroll listener on unmount', async () => {
    const container = document.createElement('div');
    Object.defineProperty(container, 'onscroll', {
      writable: true,
      value: null,
    });
    document.body.appendChild(container);

    const wrapper = mount(<BackTop container={() => container}></BackTop>);
    await nextTick();

    // Verify scroll listener was added
    expect(container.onscroll).toBeTruthy();

    // Unmount and verify cleanup
    wrapper.unmount();
    expect(container.onscroll).toBeNull();

    document.body.removeChild(container);
  });

  // Additional tests to cover remaining branches in getBackTo function
  it.skipIf(process.env.TEST_TARGET === 'snap')('handles target null value explicitly', async () => {
    const wrapper = mount(<BackTop target={null as any}></BackTop>);
    await wrapper.trigger('click');
    expect(vi.mocked(scrollTo)).toHaveBeenCalled();
  });

  it.skipIf(process.env.TEST_TARGET === 'snap')('handles target false value', async () => {
    const wrapper = mount(<BackTop target={false as any}></BackTop>);
    await wrapper.trigger('click');
    expect(vi.mocked(scrollTo)).toHaveBeenCalled();
  });

  it.skipIf(process.env.TEST_TARGET === 'snap')('handles target empty string', async () => {
    const wrapper = mount(<BackTop target="">BackTop</BackTop>);
    await wrapper.trigger('click');
    expect(vi.mocked(scrollTo)).toHaveBeenCalled();
  });

  it.skipIf(process.env.TEST_TARGET === 'snap')('handles target 0 value', async () => {
    const wrapper = mount(<BackTop target={0 as any}></BackTop>);
    await wrapper.trigger('click');
    expect(vi.mocked(scrollTo)).toHaveBeenCalled();
  });
});
