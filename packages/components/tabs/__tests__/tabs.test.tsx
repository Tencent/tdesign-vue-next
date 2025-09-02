import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { vi } from 'vitest';
import { Tabs, TabPanel } from '@tdesign/components/tabs';

// every component needs four parts: props/events/slots/functions.
describe('Tabs', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Tabs />;
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
    it(':theme', () => {
      const wrapper = mount({
        render() {
          return <Tabs theme={'card'} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':value', () => {
      const wrapper = mount({
        render() {
          return <Tabs value={1} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':size', () => {
      const wrapper = mount({
        render() {
          return <Tabs size={'large'} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':placement', () => {
      const wrapper = mount({
        render() {
          return <Tabs placement={'left'} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':addable', () => {
      const wrapper = mount({
        render() {
          return <Tabs addable={true} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':disabled', () => {
      const wrapper = mount({
        render() {
          return <Tabs disabled={true} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':defaultValue', () => {
      const wrapper = mount({
        render() {
          return <Tabs defaultValue={1} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  // test events
  describe('@event', () => {
    it('@add', async () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <Tabs theme={'card'} addable={true} onAdd={fn} />;
        },
      });
      const tabs = wrapper.findComponent(Tabs);
      tabs.find('.t-tabs__add-btn').trigger('click');
      await nextTick();
      expect(tabs.props('onAdd')).toBeTruthy();
    });

    it('@change', async () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return (
            <Tabs onChange={fn} value={2}>
              <TabPanel value={1} label={'1'}>
                1
              </TabPanel>
              <TabPanel value={2} label={'2'}>
                2
              </TabPanel>
            </Tabs>
          );
        },
      });
      await nextTick();
      const tabs = wrapper.findComponent(Tabs);
      tabs.vm.$el.getElementsByClassName('t-tabs__nav-item')[0].click();
      expect(tabs.props('onChange')).toBeTruthy();
    });

    it('@remove', async () => {
      const onTabRemoveFn = vi.fn();
      const onTabPanelRemoveFn = vi.fn();
      const wrapper = mount({
        render() {
          return (
            <Tabs theme={'card'} onRemove={onTabRemoveFn} value={2}>
              <TabPanel value={1} label={'1'} removable={true} onRemove={onTabPanelRemoveFn}>
                1
              </TabPanel>
              <TabPanel value={2} label={'2'} removable={true} onRemove={onTabPanelRemoveFn}>
                2
              </TabPanel>
            </Tabs>
          );
        },
      });
      await nextTick();
      const tabs = wrapper.findComponent(Tabs);
      tabs.vm.$el.getElementsByClassName('remove-btn')[0].dispatchEvent(new Event('click'));

      expect(onTabRemoveFn).toHaveBeenCalledTimes(1);
      expect(onTabPanelRemoveFn).toHaveBeenCalledTimes(1);

      expect(onTabRemoveFn).toHaveBeenCalledWith({ value: 1, e: expect.any(Event), index: 0 });
      expect(onTabPanelRemoveFn).toHaveBeenCalledWith({ value: 1, e: expect.any(Event) });
    });
    it('子组件没有 onRemove 但 removable 为 true 时', async () => {
      const onTabRemoveFn = vi.fn();
      const wrapper = mount({
        render() {
          return (
            <Tabs theme={'card'} onRemove={onTabRemoveFn} value={2}>
              <TabPanel value={1} label={'1'} removable={true}>
                1
              </TabPanel>
              <TabPanel value={2} label={'2'} removable={true}>
                2
              </TabPanel>
            </Tabs>
          );
        },
      });
      await nextTick();
      const tabs = wrapper.findComponent(Tabs);
      // 点击第一个标签的删除按钮
      tabs.vm.$el.getElementsByClassName('remove-btn')[0].dispatchEvent(new Event('click'));

      expect(onTabRemoveFn).toHaveBeenCalledTimes(1);
      expect(onTabRemoveFn).toHaveBeenCalledWith({ value: 1, e: expect.any(Event), index: 0 });
    });
  });
});
