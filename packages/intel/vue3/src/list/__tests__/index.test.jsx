import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { List, ListItem, ListItemMeta } from 'tdesign-vue-next';

describe('list', () => {
  describe(':props', () => {
    it(':size', () => {
      const sizeList = ['small', 'medium', 'large'];
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
});

describe('listItem', () => {
  describe(':props', () => {
    it(':action', () => {
      const slots = {
        action: () => (
          <>
            <span>操作一</span>
            <span>操作二</span>
            <span>操作三</span>
          </>
        ),
      };
      const wrapper = mount(() => (
        <List stripe>
          <ListItem v-slots={slots}>描述性文字一</ListItem>
          <ListItem>描述性文字二</ListItem>
        </List>
      ));
      const [item] = wrapper.findAll('.t-list-item .t-list-item__action');
      const spans = item.findAll('span');
      expect(item.element.children.length).toBe(3);
      expect(spans[0].text()).toBe('操作一');
      expect(spans[1].text()).toBe('操作二');
      expect(spans[2].text()).toBe('操作三');
    });

    it(':content', () => {
      const slots = {
        content: () => <>描述一</>,
      };
      const wrapper = mount(() => (
        <List stripe>
          <ListItem v-slots={slots}></ListItem>
          <ListItem>描述性文字二</ListItem>
        </List>
      ));
      const [item] = wrapper.findAll('.t-list-item .t-list-item-main');
      expect(item.exists()).toBeTruthy();
      expect(item.text()).toBe('描述一');
    });

    it(':default', () => {
      const slots = {
        content: () => <>描述一</>,
      };
      const wrapper = mount(() => (
        <List stripe>
          <ListItem v-slots={slots}></ListItem>
          <ListItem>描述性文字二</ListItem>
        </List>
      ));
      const [item] = wrapper.findAll('.t-list-item .t-list-item-main');
      expect(item.exists()).toBeTruthy();
      expect(item.text()).toBe('描述一');
    });

    it(':asyncLoading:loading', () => {
      const wrapper = mount(() => (
        <List asyncLoading="loading">
          <ListItem>描述性文字一</ListItem>
          <ListItem>描述性文字二</ListItem>
        </List>
      ));
      const loading = wrapper.find('.t-list .t-list__load--loading');
      expect(loading.exists()).toBeTruthy();
      expect(loading.find('span').text()).toBe('正在加载中，请稍等');
    });

    it(':asyncLoading:load-more', () => {
      const wrapper = mount(() => (
        <List asyncLoading="load-more">
          <ListItem>描述性文字一</ListItem>
          <ListItem>描述性文字二</ListItem>
        </List>
      ));
      const loadMore = wrapper.find('.t-list .t-list__load--load-more');
      expect(loadMore.exists()).toBeTruthy();
      expect(loadMore.find('span').text()).toBe('点击加载更多');
    });
  });

  describe(':events', () => {
    it(':onLoadMore', async () => {
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

    it(':onScroll', async () => {
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

describe('listItemMeta', () => {
  describe(':props', () => {
    it(':description', () => {
      const wrapper = mount(() => (
        <List stripe>
          <ListItem>
            <ListItemMeta description="描述一"></ListItemMeta>
          </ListItem>
          <ListItem>
            <ListItemMeta description="描述二"></ListItemMeta>
          </ListItem>
        </List>
      ));
      const descriptions = wrapper.findAll('.t-list-item__meta .t-list-item__meta-description');
      expect(descriptions.length).toBe(2);
      expect(descriptions[0].text()).toBe('描述一');
      expect(descriptions[1].text()).toBe('描述二');
    });

    it(':title', () => {
      const wrapper = mount(() => (
        <List stripe>
          <ListItem>
            <ListItemMeta title="标题一" description="描述一"></ListItemMeta>
          </ListItem>
          <ListItem>
            <ListItemMeta title="标题一" description="描述二"></ListItemMeta>
          </ListItem>
        </List>
      ));
      const titles = wrapper.findAll('.t-list-item__meta .t-list-item__meta-title');
      expect(titles.length).toBe(2);
      expect(titles[0].text()).toBe('标题一');
      expect(titles[1].text()).toBe('标题一');
    });

    it(':image', () => {
      const imageUrl = 'https://tdesign.gtimg.com/site/avatar.jpg';
      const wrapper = mount(() => (
        <List stripe>
          <ListItem>
            <ListItemMeta image={imageUrl} title="标题一" description="描述一"></ListItemMeta>
          </ListItem>
          <ListItem>
            <ListItemMeta image={imageUrl} title="标题一" description="描述二"></ListItemMeta>
          </ListItem>
        </List>
      ));
      const images = wrapper.findAll('.t-list-item__meta .t-list-item__meta-avatar img');
      expect(images.length).toBe(2);
      expect(images[0].element.getAttribute('src')).toBe('https://tdesign.gtimg.com/site/avatar.jpg');
      expect(images[1].element.getAttribute('src')).toBe('https://tdesign.gtimg.com/site/avatar.jpg');
    });
  });
});
