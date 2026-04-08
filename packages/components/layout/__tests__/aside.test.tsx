import { mount } from '@vue/test-utils';
import { expect } from 'vitest';
import { Layout, Aside, Content } from '@tdesign/components/layout';

describe('Aside', () => {
  describe('props', () => {
    it(':width[string]', () => {
      const wrapper = mount(() => (
        <Layout>
          <Aside width="300px">Aside</Aside>
          <Content>Content</Content>
        </Layout>
      ));
      const aside = wrapper.find('.t-layout__sider');
      expect(aside.exists()).toBeTruthy();
      expect(getComputedStyle(aside.element, null).width).toBe('300px');
    });

    it(':width without value', () => {
      const wrapper = mount(() => (
        <Layout>
          <Aside>Aside</Aside>
          <Content>Content</Content>
        </Layout>
      ));
      const aside = wrapper.find('.t-layout__sider');
      expect(aside.exists()).toBeTruthy();
      expect(aside.attributes('style')).toBeUndefined();
    });
  });

  describe('slots', () => {
    it('default slot', () => {
      const wrapper = mount(() => (
        <Layout>
          <Aside>
            <div class="custom-aside">Custom Aside</div>
          </Aside>
        </Layout>
      ));
      expect(wrapper.find('.custom-aside').exists()).toBeTruthy();
      expect(wrapper.find('.custom-aside').text()).toBe('Custom Aside');
    });
  });

  describe('edge cases', () => {
    it('renders nothing outside Layout', () => {
      const wrapper = mount(() => <Aside>Standalone Aside</Aside>);
      expect(wrapper.find('.t-layout__sider').exists()).toBeFalsy();
    });
  });
});
