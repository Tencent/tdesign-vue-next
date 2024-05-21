import { mount } from '@vue/test-utils';
import { it, expect } from 'vitest';
import { Layout, Header, Content, Footer, Aside } from 'tdesign-vue-next'

describe('Layout', () => {
  describe(':props', () => {
    it('header&content&footer', () => {
      const wrapper = mount(() => (
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      ));
      expect(wrapper.find('.t-layout').exists()).toBeTruthy();
      expect(wrapper.find('.t-layout__header').exists()).toBeTruthy();
      expect(wrapper.find('.t-layout__header').text()).toBe('Header');
      expect(wrapper.find('.t-layout__content').exists()).toBeTruthy();
      expect(wrapper.find('.t-layout__content').text()).toBe('Content');
      expect(wrapper.find('.t-layout__footer').exists()).toBeTruthy();
      expect(wrapper.find('.t-layout__footer').text()).toBe('Footer');
    });
    it('header&aside&content&footer', () => {
      const wrapper = mount(() => (
        <Layout>
          <Header>Header</Header>
          <Layout>
            <Aside>Aside</Aside>
            <Content>Content</Content>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>
      ));
      expect(wrapper.findAll('.t-layout').length).toBe(2);
      expect(wrapper.find('.t-layout__header').exists()).toBeTruthy();
      expect(wrapper.find('.t-layout__header').text()).toBe('Header');
      expect(wrapper.find('.t-layout__sider').exists()).toBeTruthy();
      expect(wrapper.find('.t-layout__sider').text()).toBe('Aside');
      expect(wrapper.find('.t-layout__content').exists()).toBeTruthy();
      expect(wrapper.find('.t-layout__content').text()).toBe('Content');
      expect(wrapper.find('.t-layout__footer').exists()).toBeTruthy();
      expect(wrapper.find('.t-layout__footer').text()).toBe('Footer');
    });
    it(':header:height', () => {
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
    it(':aside:width', () => {
      const wrapper = mount(() => (
        <Layout>
          <Header>Header</Header>
          <Layout>
            <Aside width="300px">Aside</Aside>
            <Content>Content</Content>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>
      ));
      const aside = wrapper.find('.t-layout__sider');
      expect(aside.exists()).toBeTruthy();
      expect(getComputedStyle(aside.element, null).width).toBe('300px');
    });
    it(':footer:height', () => {
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
  });
});
