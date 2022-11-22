import { mount } from '@vue/test-utils';
import { Anchor, AnchorItem, AnchorTarget } from '@/src/anchor/index.ts';

describe('Anchor', () => {
  describe(':base', () => {
    it('render', () => {
      const wrapper = mount({
        render() {
          return (
            <Anchor>
              <AnchorItem href="#基础锚点" title="基础锚点"></AnchorItem>
              <AnchorItem href="#多级锚点" title="多级锚点"></AnchorItem>
              <AnchorItem href="#指定容器锚点" title="指定容器锚点"></AnchorItem>
            </Anchor>
          );
        },
      });
      expect(wrapper.find('.t-anchor').exists()).toBeTruthy();
      const AnchorItemList = wrapper.findAllComponents(AnchorItem);
      expect(AnchorItemList.length).toBe(3);
    });
    it('render', () => {
      const wrapper = mount({
        render() {
          return (
            <Anchor>
              <AnchorTarget></AnchorTarget>
              <AnchorTarget></AnchorTarget>
              <AnchorTarget></AnchorTarget>
            </Anchor>
          );
        },
      });
      expect(wrapper.find('.t-anchor').exists()).toBeTruthy();
      const AnchorTargetList = wrapper.findAllComponents(AnchorTarget);
      expect(AnchorTargetList.length).toBe(3);
    });
  });
  describe('@event', () => {
    test('_______', () => {
      expect(true).toEqual(true);
    });
  });

  describe('<slot>', () => {
    test('_______', () => {
      expect(true).toEqual(true);
    });
  });
});
