import { mount } from '@vue/test-utils';
import { expect } from 'vitest';
import { Layout, Header, Content, Footer } from '@tdesign/components/layout';

describe('Footer', () => {
  describe('props', () => {
    it(':height[string]', () => {
      const wrapper = mount(() => (
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer height="100px">Footer</Footer>
        </Layout>
      ));
      const footer = wrapper.find('.t-layout__footer');
      expect(footer.exists()).toBeTruthy();
      expect(getComputedStyle(footer.element, null).height).toBe('100px');
    });

    it(':height without value', () => {
      const wrapper = mount(() => (
        <Layout>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      ));
      const footer = wrapper.find('.t-layout__footer');
      expect(footer.exists()).toBeTruthy();
      expect(footer.attributes('style')).toBeUndefined();
    });
  });

  describe('slots', () => {
    it('default slot', () => {
      const wrapper = mount(() => (
        <Layout>
          <Footer>
            <div class="custom-footer">Custom Footer</div>
          </Footer>
        </Layout>
      ));
      expect(wrapper.find('.custom-footer').exists()).toBeTruthy();
      expect(wrapper.find('.custom-footer').text()).toBe('Custom Footer');
    });
  });
});
