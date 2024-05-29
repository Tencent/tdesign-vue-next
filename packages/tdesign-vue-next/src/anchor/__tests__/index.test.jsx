import { mount } from '@vue/test-utils';
import { Anchor, AnchorItem, AnchorTarget } from 'tdesign-vue-next';

describe('anchor', () => {
  describe(':base', () => {
    it('render:href', () => {
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
    it('render:id', () => {
      const wrapper = mount({
        render() {
          return (
            <Anchor>
              <AnchorTarget id="#anchor-target-1"></AnchorTarget>
              <AnchorTarget id="#anchor-target-2"></AnchorTarget>
              <AnchorTarget id="#anchor-target-3"></AnchorTarget>
            </Anchor>
          );
        },
      });
      expect(wrapper.find('.t-anchor').exists()).toBeTruthy();
      const AnchorTargetList = wrapper.findAllComponents(AnchorTarget);
      expect(AnchorTargetList.length).toBe(3);
    });
  });
});
