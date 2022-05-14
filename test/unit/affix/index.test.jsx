import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { Affix } from '@/src/affix/index.ts';

describe('Affix', () => {
  test('_______', () => {
    expect(true).toEqual(true);
  });

  jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => cb());

  describe('Test the state of the container under the window', () => {
    const wrapper = mount({
      render() {
        return (
          <Affix offsetTop={10}>
            <div style="width: 100px; height: 20px">hello world</div>
          </Affix>
        );
      },
    }).findComponent(Affix);

    it('Test get container', async () => {
      await nextTick();
      expect(wrapper.vm.scrollContainer).toBe(window);
    });

    it('Test the scrolling state', async () => {
      // 模拟对象在 window 的情况下滚动
      jest.spyOn(wrapper.vm.affixWrapRef, 'getBoundingClientRect').mockImplementation(() => ({
        top: 5,
      }));
      window.dispatchEvent(new CustomEvent('scroll'));
      expect(wrapper.find('.t-affix').classes()).toContain('t-affix');
    });
  });

  describe('Test the specified container', () => {
    const wrapper = mount({
      methods: {
        container() {
          return this.$refs?.container;
        },
      },
      render() {
        return (
          <div class="container" ref="container">
            <Affix container={this.container} offsetTop={10}>
              <div style="width: 100px; height: 20px">hello world</div>
            </Affix>
          </div>
        );
      },
    });

    it('Test get container', async () => {
      await nextTick();
      const affixWrapper = wrapper.findComponent(Affix);
      expect(affixWrapper.vm.scrollContainer).toBe(wrapper.vm.container());
    });

    it('Test the scrolling state', async () => {
      const affixWrapper = wrapper.findComponent(Affix);
      jest.spyOn(affixWrapper.vm.affixWrapRef, 'getBoundingClientRect').mockImplementation(() => ({
        top: 5,
      }));
      wrapper.vm.container().dispatchEvent(new CustomEvent('scroll'));
      expect(affixWrapper.find('.t-affix').classes()).toContain('t-affix');
    });
  });
});
