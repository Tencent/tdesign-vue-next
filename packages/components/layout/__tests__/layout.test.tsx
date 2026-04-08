import { nextTick, ref, defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { it, expect, describe, afterEach } from 'vitest';
import { Layout, Header, Content, Footer, Aside } from '@tdesign/components/layout';

describe('Layout', () => {
  describe('props', () => {
    let wrapper: VueWrapper | null = null;

    afterEach(() => {
      wrapper?.unmount();
      wrapper = null;
    });

    it('renders basic layout structure', () => {
      wrapper = mount(() => (
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

    it('renders layout with aside', () => {
      wrapper = mount(() => (
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
      expect(wrapper.find('.t-layout__header').text()).toBe('Header');
      expect(wrapper.find('.t-layout__sider').text()).toBe('Aside');
      expect(wrapper.find('.t-layout__content').text()).toBe('Content');
      expect(wrapper.find('.t-layout__footer').text()).toBe('Footer');
    });
  });

  describe('with-sider class', () => {
    it('adds class when Aside is present', async () => {
      const wrapper = mount(() => (
        <Layout>
          <Aside>Aside</Aside>
          <Content>Content</Content>
        </Layout>
      ));
      await nextTick();
      expect(wrapper.find('.t-layout').classes()).toContain('t-layout--with-sider');
      wrapper.unmount();
    });

    it('does not add class when Aside is absent', () => {
      const wrapper = mount(() => (
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
        </Layout>
      ));
      expect(wrapper.find('.t-layout').classes()).not.toContain('t-layout--with-sider');
      wrapper.unmount();
    });

    it('removes class when Aside unmounts', async () => {
      const showAside = ref(true);

      const TestComponent = defineComponent({
        setup() {
          return () => (
            <Layout>
              {showAside.value && <Aside>Aside</Aside>}
              <Content>Content</Content>
            </Layout>
          );
        },
      });

      const wrapper = mount(TestComponent);

      await nextTick();
      expect(wrapper.find('.t-layout').classes()).toContain('t-layout--with-sider');
      expect(wrapper.find('.t-layout__sider').exists()).toBeTruthy();

      showAside.value = false;
      await nextTick();

      expect(wrapper.find('.t-layout__sider').exists()).toBeFalsy();
      expect(wrapper.find('.t-layout').classes()).not.toContain('t-layout--with-sider');
      wrapper.unmount();
    });
  });

  describe('nested layout', () => {
    it('multiple Asides', () => {
      const wrapper = mount(() => (
        <Layout>
          <Layout>
            <Aside width="200px">Left Aside</Aside>
            <Content>Content</Content>
            <Aside width="150px">Right Aside</Aside>
          </Layout>
        </Layout>
      ));
      const asides = wrapper.findAll('.t-layout__sider');
      expect(asides.length).toBe(2);
      expect(getComputedStyle(asides[0].element).width).toBe('200px');
      expect(getComputedStyle(asides[1].element).width).toBe('150px');
      wrapper.unmount();
    });

    it('deeply nested', () => {
      const wrapper = mount(() => (
        <Layout>
          <Header>Header</Header>
          <Layout>
            <Aside>Aside</Aside>
            <Layout>
              <Content>Content</Content>
            </Layout>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>
      ));
      expect(wrapper.findAll('.t-layout').length).toBe(3);
      expect(wrapper.find('.t-layout__sider').exists()).toBeTruthy();
      wrapper.unmount();
    });
  });

  describe('edge cases', () => {
    it('empty Layout', () => {
      const wrapper = mount(() => <Layout></Layout>);
      expect(wrapper.find('.t-layout').exists()).toBeTruthy();
      expect(wrapper.find('.t-layout').text()).toBe('');
      wrapper.unmount();
    });

    it('Layout with only Content', () => {
      const wrapper = mount(() => (
        <Layout>
          <Content>Only Content</Content>
        </Layout>
      ));
      expect(wrapper.find('.t-layout__content').exists()).toBeTruthy();
      expect(wrapper.find('.t-layout__header').exists()).toBeFalsy();
      expect(wrapper.find('.t-layout__footer').exists()).toBeFalsy();
      expect(wrapper.find('.t-layout__sider').exists()).toBeFalsy();
      wrapper.unmount();
    });

    it('Layout with only Header', () => {
      const wrapper = mount(() => (
        <Layout>
          <Header>Only Header</Header>
        </Layout>
      ));
      expect(wrapper.find('.t-layout__header').exists()).toBeTruthy();
      wrapper.unmount();
    });

    it('Layout with only Footer', () => {
      const wrapper = mount(() => (
        <Layout>
          <Footer>Only Footer</Footer>
        </Layout>
      ));
      expect(wrapper.find('.t-layout__footer').exists()).toBeTruthy();
      wrapper.unmount();
    });

    it('Layout with only Aside', async () => {
      const wrapper = mount(() => (
        <Layout>
          <Aside>Only Aside</Aside>
        </Layout>
      ));
      expect(wrapper.find('.t-layout__sider').exists()).toBeTruthy();
      await nextTick();
      expect(wrapper.find('.t-layout').classes()).toContain('t-layout--with-sider');
      wrapper.unmount();
    });
  });
});
