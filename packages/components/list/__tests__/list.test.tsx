import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { List, ListItem, ListProps } from '@tdesign/components/list';

describe('List', () => {
  describe('props', () => {
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

    it(':header', () => {
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

    it(':footer', () => {
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

    it(':split', () => {
      const wrapper = mount(() => (
        <List split>
          <ListItem>描述性文字一</ListItem>
          <ListItem>描述性文字二</ListItem>
        </List>
      ));
      const split = wrapper.find('.t-list--split');
      expect(split.exists()).toBeTruthy();
    });

    it(':stripe', () => {
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
