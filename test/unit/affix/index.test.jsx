import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { Affix } from '@/src/affix';
import { scrollTo } from '@/src/utils/dom.ts';

describe('Affix', () => {
  test('_______', () => {
    expect(true).toEqual(true);
  });

  describe('Test the state of the container under the window', () => {
    const wrapper = mount({
      render() {
        return (
          <Affix>
            <div style="width: 100px; height: 20px">hello world</div>
          </Affix>
        );
      },
    }).findComponent(Affix);

    it('Test get container', async () => {
      await nextTick();
      expect(wrapper.vm.scrollContainer).toBe(window);
    });

    // it('Test the scrolling state', async () => {
    //   await scrollTo(10, { container: wrapper.vm.scrollContainer });
    //   expect(wrapper.find('.t-affix').classes()).toContain('t-affix');
    // });
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
            <Affix container={this.container}>
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

    // it('Test the scrolling state', async () => {
    //   const affixWrapper = wrapper.findComponent(Affix);
    //   await scrollTo(10, { container: affixWrapper.vm.scrollContainer });
    //   expect(affixWrapper.find('.t-affix').classes()).toContain('t-affix');
    // });
  });
});
