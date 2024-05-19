import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Tabs from '@/src/tabs/index.ts';
import TabPanel from '@/src/tabs/tab-panel.tsx';

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
    it(':destroyOnHide', async () => {
      const wrapper = mount({
        data() {
          return {
            currentTab: 1,
          };
        },
        render() {
          return (
            <Tabs value={this.currentTab}>
              <TabPanel class="tab-panel-1" value={1} label={'1'} destroyOnHide={true}>
                1
              </TabPanel>
              <TabPanel class="tab-panel-2" value={2} label={'2'} destroyOnHide={true}>
                2
              </TabPanel>
            </Tabs>
          );
        },
      });

      expect(wrapper.find('.tab-panel-1').text()).toBe('1');
      expect(() => wrapper.get('.tab-panel-2')).toThrowError();

      wrapper.setData({ currentTab: 2 });
      await Vue.nextTick();
      expect(() => wrapper.get('.tab-panel-1')).toThrowError();
      expect(wrapper.find('.tab-panel-2').text()).toBe('2');
    });

    it(':lazy', async () => {
      const wrapper = mount({
        data() {
          return {
            currentTab: 1,
          };
        },
        render() {
          return (
            <Tabs value={this.currentTab}>
              <TabPanel class="tab-panel-1" lazy value={1} label={'1'} destroyOnHide={false}>
                1
              </TabPanel>
              <TabPanel class="tab-panel-2" lazy value={2} label={'2'} destroyOnHide={false}>
                2
              </TabPanel>
            </Tabs>
          );
        },
      });

      const displayNoneStyle = 'display: none;';

      expect(wrapper.find('.tab-panel-1').attributes().style).toBeFalsy();
      expect(() => wrapper.get('.tab-panel-2')).toThrowError();

      wrapper.setData({ currentTab: 2 });
      await Vue.nextTick();
      expect(wrapper.find('.tab-panel-1').attributes().style).toBe(displayNoneStyle);
      expect(wrapper.find('.tab-panel-2').attributes().style).toBeFalsy();

      wrapper.setData({ currentTab: 1 });
      await Vue.nextTick();
      expect(wrapper.find('.tab-panel-1').attributes().style).toBeFalsy();
      expect(wrapper.find('.tab-panel-2').attributes().style).toBe(displayNoneStyle);
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
      await Vue.nextTick();
      // expect(tabs.emitted().add).toBeTruthy();
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
      await Vue.nextTick();
      const tabs = wrapper.findComponent(Tabs);
      tabs.vm.$el.getElementsByClassName('t-tabs__nav-item')[0].click();
      // expect(tabs.emitted().change).toBeTruthy();
    });
    it('@remove', async () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return (
            <Tabs theme={'card'} onRemove={fn} value={2}>
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
      await Vue.nextTick();
      const tabs = wrapper.findComponent(Tabs);
      tabs.vm.$el.getElementsByClassName('remove-btn')[0].dispatchEvent(new Event('click'));
      // expect(tabs.emitted().remove).toBeTruthy();
    });
  });

  // test additional function
  describe('additional function', () => {
    it('panel:default && panel:panel', async () => {
      const wrapper = mount({
        render() {
          return (
            <Tabs value={2}>
              <TabPanel value={1} label={'1'} default={() => 1}></TabPanel>
              <TabPanel value={2} label={'2'} panel={() => 2}></TabPanel>
            </Tabs>
          );
        },
      });
      await Vue.nextTick();
      expect(wrapper.element).toMatchSnapshot();
    });
    it('panel default slot:function | panel slot:function', async () => {
      const wrapper = mount({
        render() {
          return (
            <Tabs value={2}>
              <TabPanel value={1} label={'1'}>
                {1}
              </TabPanel>
              <TabPanel value={2} label={'2'}>
                <span slot="panel">{2}</span>
              </TabPanel>
            </Tabs>
          );
        },
      });
      await Vue.nextTick();
      expect(wrapper.element).toMatchSnapshot();
    });
    it('no valid panel', async () => {
      const wrapper = mount({
        render() {
          return <Tabs value={2}>123</Tabs>;
        },
      });
      await Vue.nextTick();
      expect(wrapper.element).toMatchSnapshot();
    });
    it('@remove on panel', async () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return (
            <Tabs theme={'card'} value={2}>
              <TabPanel value={1} label={'1'} onRemove={fn} removable={true}>
                1
              </TabPanel>
              <TabPanel value={2} label={'2'} onRemove={fn} removable={true}>
                2
              </TabPanel>
            </Tabs>
          );
        },
      });
      await Vue.nextTick();
      const tabs = wrapper.findComponent(Tabs);
      tabs.vm.$el.getElementsByClassName('remove-btn')[0].dispatchEvent(new Event('click'));
      expect(fn).toBeCalled();
    });
  });

  // // test slots
  // describe('<slot>', () => {
  //   it('', () => null);
  // });

  // // test exposure function
  // describe('function', () => {
  //   it('', () => null);
  // });
});
