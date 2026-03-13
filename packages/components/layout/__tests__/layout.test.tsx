import { mount } from '@vue/test-utils';
import { it, expect, describe } from 'vitest';
import { ref, nextTick, defineComponent } from 'vue';
import { Layout, Header, Content, Footer, Aside } from '@tdesign/components/layout';

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

    it(':header without height', () => {
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

    it(':footer without height', () => {
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

    it(':aside without width', () => {
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

  describe('with-sider class', () => {
    it('Aside present', async () => {
      const wrapper = mount(() => (
        <Layout>
          <Aside>Aside</Aside>
          <Content>Content</Content>
        </Layout>
      ));
      await nextTick();
      expect(wrapper.find('.t-layout').classes()).toContain('t-layout--with-sider');
    });

    it('Aside absent', () => {
      const wrapper = mount(() => (
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
        </Layout>
      ));
      expect(wrapper.find('.t-layout').classes()).not.toContain('t-layout--with-sider');
    });
  });

  describe('Aside unmount', () => {
    it('with-sider class removed', async () => {
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
    });
  });

  describe('Aside outside Layout', () => {
    it('renders nothing', () => {
      const wrapper = mount(() => <Aside>Standalone Aside</Aside>);
      expect(wrapper.find('.t-layout__sider').exists()).toBeFalsy();
    });
  });

  describe('nested Layout', () => {
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
    });
  });

  describe('content prop', () => {
    it(':content', () => {
      const wrapper = mount(() => (
        <Layout>
          <Content content="Content Text" />
        </Layout>
      ));
      expect(wrapper.find('.t-layout__content').text()).toBe('Content Text');
    });

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

  describe('edge cases', () => {
    it('empty Layout', () => {
      const wrapper = mount(() => <Layout></Layout>);
      expect(wrapper.find('.t-layout').exists()).toBeTruthy();
      expect(wrapper.find('.t-layout').text()).toBe('');
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
    });

    it('Layout with only Header', () => {
      const wrapper = mount(() => (
        <Layout>
          <Header>Only Header</Header>
        </Layout>
      ));
      expect(wrapper.find('.t-layout__header').exists()).toBeTruthy();
    });

    it('Layout with only Footer', () => {
      const wrapper = mount(() => (
        <Layout>
          <Footer>Only Footer</Footer>
        </Layout>
      ));
      expect(wrapper.find('.t-layout__footer').exists()).toBeTruthy();
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
    });
  });
});
