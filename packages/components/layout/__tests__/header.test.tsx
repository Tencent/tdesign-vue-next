import { mount } from '@vue/test-utils';
import { expect } from 'vitest';
import { Layout, Header, Content, Footer } from '@tdesign/components/layout';

describe('Header', () => {
  describe('props', () => {
    it(':height[string]', () => {
      const wrapper = mount(() => (
        <Layout>
          <Header height="100px">Header</Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      ));
      const header = wrapper.find('.t-layout__header');
      expect(header.exists()).toBeTruthy();
      expect(getComputedStyle(header.element, null).height).toBe('100px');
    });

    it(':height without value', () => {
      const wrapper = mount(() => (
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
        </Layout>
      ));
      const header = wrapper.find('.t-layout__header');
      expect(header.exists()).toBeTruthy();
      expect(header.attributes('style')).toBeUndefined();
    });
  });

  describe('slots', () => {
    it('default slot', () => {
      const wrapper = mount(() => (
        <Layout>
          <Header>
            <div class="custom-header">Custom Header</div>
          </Header>
        </Layout>
      ));
      expect(wrapper.find('.custom-header').exists()).toBeTruthy();
      expect(wrapper.find('.custom-header').text()).toBe('Custom Header');
    });
  });
});
