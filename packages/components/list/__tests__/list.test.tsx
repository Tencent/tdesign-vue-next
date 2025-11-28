import { mount } from '@vue/test-utils';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { defineComponent } from 'vue';
import { List, ListItem, ListProps } from '@tdesign/components/list';

describe('List', () => {
  describe('warnings', () => {
    let originalWarn: typeof console.warn;
    let warnings: string[];

    beforeEach(() => {
      warnings = [];
      originalWarn = console.warn;
      console.warn = (...args: any[]) => {
        warnings.push(args.join(' '));
      };
    });

    afterEach(() => {
      console.warn = originalWarn;
    });

    it('should not warn about slot being invoked outside of render function when using TSX', () => {
      // This is the exact pattern from the issue that was causing warnings
      const TestComponent = defineComponent({
        setup() {
          return () => (
            <List split={true} size="small">
              <ListItem>列表内容的描述性文字</ListItem>
              <ListItem>列表内容的描述性文字</ListItem>
              <ListItem>列表内容的描述性文字</ListItem>
            </List>
          );
        },
      });

      const wrapper = mount(TestComponent);

      // Check that no Vue warnings were emitted about slot invocation outside render function
      const slotWarning = warnings.find((w) => w.includes('Slot "default" invoked outside of the render function'));

      expect(slotWarning).toBeUndefined();
      wrapper.unmount();
    });

    it('should not warn with asyncLoading prop', () => {
      const TestComponent = defineComponent({
        setup() {
          return () => (
            <List asyncLoading="loading">
              <ListItem>描述性文字一</ListItem>
              <ListItem>描述性文字二</ListItem>
            </List>
          );
        },
      });

      const wrapper = mount(TestComponent);

      const slotWarning = warnings.find((w) => w.includes('Slot "default" invoked outside of the render function'));

      expect(slotWarning).toBeUndefined();
      wrapper.unmount();
    });
  });

  describe('props', () => {
    it('asyncLoading[string]', () => {
      const wrapperLoading = mount(() => (
        <List asyncLoading="loading">
          <ListItem>描述性文字一</ListItem>
          <ListItem>描述性文字二</ListItem>
        </List>
      ));
      const loading = wrapperLoading.find('.t-list .t-list__load--loading');
      expect(loading.exists()).toBeTruthy();
      expect(loading.find('span').text()).toBe('正在加载中，请稍等');

      const wrapperLoadingMore = mount(() => (
        <List asyncLoading="loading">
          <ListItem>描述性文字一</ListItem>
          <ListItem>描述性文字二</ListItem>
        </List>
      ));
      const loadingMore = wrapperLoadingMore.find('.t-list .t-list__load--loading');
      expect(loadingMore.exists()).toBeTruthy();
      expect(loadingMore.find('span').text()).toBe('正在加载中，请稍等');
    });

    it('asyncLoading[slot]', () => {
      const wrapperLoading = mount(() => (
        <List v-slots={{ asyncLoading: () => '自定义正在加载中' }}>
          <ListItem>描述性文字一</ListItem>
          <ListItem>描述性文字二</ListItem>
        </List>
      ));
      const loading = wrapperLoading.find('.t-list .t-list__load');
      expect(loading.exists()).toBeTruthy();
      expect(loading.text()).toBe('自定义正在加载中');
    });

    it('async-loading[slot]', () => {
      const wrapperLoading = mount(() => (
        <List v-slots={{ 'async-loading': () => '自定义正在加载中' }}>
          <ListItem>描述性文字一</ListItem>
          <ListItem>描述性文字二</ListItem>
        </List>
      ));
      const loading = wrapperLoading.find('.t-list .t-list__load');
      expect(loading.exists()).toBeTruthy();
      expect(loading.text()).toBe('自定义正在加载中');
    });

    it('asyncLoading[function]', () => {
      const wrapper = mount(() => (
        <List asyncLoading={() => '自定义正在加载中'}>
          <ListItem>描述性文字一</ListItem>
          <ListItem>描述性文字二</ListItem>
        </List>
      ));
      const loading = wrapper.find('.t-list .t-list__load');
      expect(loading.exists()).toBeTruthy();
      expect(loading.text()).toBe('自定义正在加载中');
    });

    it('footer[string]', () => {
      const wrapper = mount(() => (
        <List footer="footer">
          <ListItem>描述性文字一</ListItem>
          <ListItem>描述性文字二</ListItem>
        </List>
      ));
      const footer = wrapper.find('.t-list__footer');
      expect(footer.exists()).toBeTruthy();
      expect(footer.text()).toBe('footer');
    });

    it('footer[slot]', () => {
      const wrapper = mount(() => (
        <List v-slots={{ footer: () => 'footer' }}>
          <ListItem>描述性文字一</ListItem>
          <ListItem>描述性文字二</ListItem>
        </List>
      ));
      const footer = wrapper.find('.t-list__footer');
      expect(footer.exists()).toBeTruthy();
      expect(footer.text()).toBe('footer');
    });

    it('footer[function]', () => {
      const wrapper = mount(() => (
        <List footer={() => 'footer'}>
          <ListItem>描述性文字一</ListItem>
          <ListItem>描述性文字二</ListItem>
        </List>
      ));
      const footer = wrapper.find('.t-list__footer');
      expect(footer.exists()).toBeTruthy();
      expect(footer.text()).toBe('footer');
    });

    it('header[string]', () => {
      const wrapper = mount(() => (
        <List header="header">
          <ListItem>描述性文字一</ListItem>
          <ListItem>描述性文字二</ListItem>
        </List>
      ));
      const header = wrapper.find('.t-list__header');
      expect(header.exists()).toBeTruthy();
      expect(header.text()).toBe('header');
    });

    it('header[slot]', () => {
      const wrapper = mount(() => (
        <List v-slots={{ header: () => 'header' }}>
          <ListItem>描述性文字一</ListItem>
          <ListItem>描述性文字二</ListItem>
        </List>
      ));
      const header = wrapper.find('.t-list__header');
      expect(header.exists()).toBeTruthy();
      expect(header.text()).toBe('header');
    });

    it('header[function]', () => {
      const wrapper = mount(() => (
        <List header={() => 'header'}>
          <ListItem>描述性文字一</ListItem>
          <ListItem>描述性文字二</ListItem>
        </List>
      ));
      const header = wrapper.find('.t-list__header');
      expect(header.exists()).toBeTruthy();
      expect(header.text()).toBe('header');
    });

    it('scroll[object]', () => {});

    it('size[string]', () => {
      const sizeList: Array<ListProps['size']> = ['small', 'medium', 'large'];
      sizeList.forEach((size) => {
        const wrapper = mount(() => (
          <List size={size}>
            <ListItem>描述性文字一</ListItem>
            <ListItem>描述性文字二</ListItem>
          </List>
        ));
        expect(wrapper.classes()).toContain(`t-size-${size.slice(0, 1)}`);
      });
    });

    it('split[boolean]', () => {
      const wrapper = mount(() => (
        <List split>
          <ListItem>描述性文字一</ListItem>
          <ListItem>描述性文字二</ListItem>
        </List>
      ));
      const split = wrapper.find('.t-list--split');
      expect(split.exists()).toBeTruthy();
    });

    it('stripe[boolean]', () => {
      const wrapper = mount(() => (
        <List stripe>
          <ListItem>描述性文字一</ListItem>
          <ListItem>描述性文字二</ListItem>
        </List>
      ));
      const stripes = wrapper.findAll('.t-list--stripe');
      expect(stripes.length).toBe(1);
    });
  });

  describe('events', () => {
    it('onLoadMore', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => (
        <List asyncLoading="load-more" onLoadMore={fn}>
          <ListItem>描述性文字一</ListItem>
          <ListItem>描述性文字二</ListItem>
        </List>
      ));
      const loadMore = wrapper.find('.t-list .t-list__load--load-more');
      await loadMore.trigger('click');
      expect(fn).toBeCalled();
    });

    it('onScroll', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => (
        <List asyncLoading="load-more" onScroll={fn} style={{ maxHeight: 200 }}>
          <ListItem>描述性文字</ListItem>
          <ListItem>描述性文字</ListItem>
          <ListItem>描述性文字</ListItem>
          <ListItem>描述性文字</ListItem>
          <ListItem>描述性文字</ListItem>
          <ListItem>描述性文字</ListItem>
          <ListItem>描述性文字</ListItem>
          <ListItem>描述性文字</ListItem>
          <ListItem>描述性文字</ListItem>
          <ListItem>描述性文字</ListItem>
          <ListItem>描述性文字</ListItem>
          <ListItem>描述性文字</ListItem>
          <ListItem>描述性文字</ListItem>
          <ListItem>描述性文字</ListItem>
          <ListItem>描述性文字</ListItem>
          <ListItem>描述性文字</ListItem>
        </List>
      ));
      const list = wrapper.find('.t-list');
      await list.trigger('scroll');
      expect(fn).toBeCalled();
    });
  });
});
