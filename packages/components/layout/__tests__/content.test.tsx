import { mount } from '@vue/test-utils';
import { expect } from 'vitest';
import { Layout, Content } from '@tdesign/components/layout';

describe('Content', () => {
  describe('props', () => {
    it(':content[string]', () => {
      const wrapper = mount(() => (
        <Layout>
          <Content content="Content Text" />
        </Layout>
      ));
      expect(wrapper.find('.t-layout__content').text()).toBe('Content Text');
    });
  });

  describe('slots', () => {
    it('default slot', () => {
      const wrapper = mount(() => (
        <Layout>
          <Content>
            <div class="custom-content">Custom Content</div>
          </Content>
        </Layout>
      ));
      expect(wrapper.find('.custom-content').exists()).toBeTruthy();
      expect(wrapper.find('.custom-content').text()).toBe('Custom Content');
    });
  });
});
