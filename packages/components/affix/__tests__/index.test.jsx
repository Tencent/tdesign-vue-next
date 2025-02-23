import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { beforeEach, expect, it, vi } from 'vitest';
import { Affix } from '@src/affix/index.ts';

describe('Affix', () => {
  test('_______', () => {
    expect(true).toEqual(true);
  });

  vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => cb());

  describe('Test the state of the container under the window', () => {
    const offsetTop = 10;
    const slotWidth = 100;
    const slotHeight = 20;

    const wrapper = mount({
      render() {
        return (
          <Affix ref="affixRef" offsetTop={offsetTop}>
            <div style={{ width: `${slotWidth}px`, height: `${slotHeight}px` }}>hello world</div>
          </Affix>
        );
      },
    });
    const { affixRef } = wrapper.vm.$refs;
    // 模拟 affixWrap 的位置
    vi.spyOn(affixRef.affixWrapRef, 'getBoundingClientRect').mockImplementation(() => ({
      top: 5,
      width: slotWidth,
      height: slotHeight,
    }));

    it('Test get container', async () => {
      await nextTick();
      expect(affixRef.scrollContainer).toBe(window);
    });

    it('Test the scrolling state', async () => {
      // 模拟滚动触发
      window.dispatchEvent(new CustomEvent('scroll'));
      expect(wrapper.find('.t-affix').classes()).toContain('t-affix');
    });

    it('Test the position in the scroll state', () => {
      // 模拟滚动触发
      window.dispatchEvent(new CustomEvent('scroll'));
      const style = wrapper.find('.t-affix').attributes('style');
      expect(style).toBe(`top: ${offsetTop}px; width: ${slotWidth}px; height: ${slotHeight}px;`);
    });

    it('Test the generation of placeholder nodes', () => {
      // 模拟滚动触发
      window.dispatchEvent(new CustomEvent('scroll'));
      expect(wrapper.html()).toContain(`<div style="width: ${slotWidth}px; height: ${slotHeight}px;"></div>`);
    });
  });

  describe('Test the specified container', () => {
    const offsetTop = 10;
    const slotWidth = 100;
    const slotHeight = 20;
    const containerTop = 100;

    const wrapper = mount({
      methods: {
        container() {
          return this.$refs?.container;
        },
      },
      render() {
        return (
          <div class="container" ref="container">
            <Affix ref="affixRef" container={this.container} offsetTop={offsetTop}>
              <div style="width: 100px; height: 20px">hello world</div>
            </Affix>
          </div>
        );
      },
    });

    const { affixRef } = wrapper.vm.$refs;

    it('Test get container', async () => {
      await nextTick();
      expect(affixRef.scrollContainer).toBe(wrapper.vm.container());
    });
    // 模拟 affixWrap 的位置
    beforeEach(() => {
      vi.spyOn(affixRef.affixWrapRef, 'getBoundingClientRect').mockImplementation(() => ({
        top: 5,
        width: slotWidth,
        height: slotHeight,
      }));
    });

    it('Test the scrolling state', async () => {
      // 模拟容器滚动
      wrapper.vm.container().dispatchEvent(new CustomEvent('scroll'));
      expect(wrapper.find('.t-affix').classes()).toContain('t-affix');
    });

    beforeEach(() => {
      // 模拟绑定
      window.addEventListener('scroll', affixRef.handleScroll);
      // 模拟容器的位置
      vi.spyOn(affixRef.scrollContainer, 'getBoundingClientRect').mockImplementation(() => ({
        top: containerTop,
      }));
    });

    it('Test the positioning after opening the binding window sliding event', () => {
      // 模拟滚动触发
      window.dispatchEvent(new CustomEvent('scroll'));

      const style = wrapper.find('.t-affix').attributes('style');
      expect(style).toBe(`top: ${offsetTop + containerTop}px; width: ${slotWidth}px; height: ${slotHeight}px;`);
    });
  });
});
