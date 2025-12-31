import { List, ListItem, ListItemMeta } from '@tdesign/components/list';
import { mount } from '@vue/test-utils';

describe('ListItemMeta', () => {
  describe('props', () => {
    it('description[string]', () => {
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

    it('description[slot]', () => {
      const wrapper = mount(() => (
        <List stripe>
          <ListItem>
            <ListItemMeta v-slots={{ description: () => '描述一' }}></ListItemMeta>
          </ListItem>
          <ListItem>
            <ListItemMeta v-slots={{ description: () => '描述二' }}></ListItemMeta>
          </ListItem>
        </List>
      ));
      const descriptions = wrapper.findAll('.t-list-item__meta .t-list-item__meta-description');
      expect(descriptions.length).toBe(2);
      expect(descriptions[0].text()).toBe('描述一');
      expect(descriptions[1].text()).toBe('描述二');
    });

    it('description[function]', () => {
      const wrapper = mount(() => (
        <List stripe>
          <ListItem>
            <ListItemMeta description={() => '描述一'}></ListItemMeta>
          </ListItem>
          <ListItem>
            <ListItemMeta description={() => '描述二'}></ListItemMeta>
          </ListItem>
        </List>
      ));
      const descriptions = wrapper.findAll('.t-list-item__meta .t-list-item__meta-description');
      expect(descriptions.length).toBe(2);
      expect(descriptions[0].text()).toBe('描述一');
      expect(descriptions[1].text()).toBe('描述二');
    });

    it('title[string]', () => {
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

    it('title[slot]', () => {
      const wrapper = mount(() => (
        <List stripe>
          <ListItem>
            <ListItemMeta v-slots={{ title: () => '标题一' }} description="描述一"></ListItemMeta>
          </ListItem>
          <ListItem>
            <ListItemMeta v-slots={{ title: () => '标题二' }} description="描述二"></ListItemMeta>
          </ListItem>
        </List>
      ));
      const titles = wrapper.findAll('.t-list-item__meta .t-list-item__meta-title');
      expect(titles.length).toBe(2);
      expect(titles[0].text()).toBe('标题一');
      expect(titles[1].text()).toBe('标题二');
    });

    it('title[function]', () => {
      const wrapper = mount(() => (
        <List stripe>
          <ListItem>
            <ListItemMeta title={() => '标题一'} description="描述一"></ListItemMeta>
          </ListItem>
          <ListItem>
            <ListItemMeta title={() => '标题二'} description="描述二"></ListItemMeta>
          </ListItem>
        </List>
      ));
      const titles = wrapper.findAll('.t-list-item__meta .t-list-item__meta-title');
      expect(titles.length).toBe(2);
      expect(titles[0].text()).toBe('标题一');
      expect(titles[1].text()).toBe('标题二');
    });

    it('image[string]', () => {
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

    it('image[slot]', () => {
      const wrapper = mount(() => {
        return (
          <List stripe>
            <ListItem>
              <ListItemMeta
                v-slots={{ image: () => <img src="https://tdesign.gtimg.com/site/avatar.jpg" /> }}
                title="标题一"
                description="描述一"
              />
            </ListItem>
            <ListItem>
              <ListItemMeta
                v-slots={{ image: () => <img src="https://tdesign.gtimg.com/site/avatar.jpg" /> }}
                title="标题二"
                description="描述二"
              />
            </ListItem>
          </List>
        );
      });
      const images = wrapper.findAll('.t-list-item__meta .t-list-item__meta-avatar img');
      expect(images.length).toBe(2);
      expect(images[0].element.getAttribute('src')).toBe('https://tdesign.gtimg.com/site/avatar.jpg');
      expect(images[1].element.getAttribute('src')).toBe('https://tdesign.gtimg.com/site/avatar.jpg');
    });

    it('image[function]', () => {
      const wrapper = mount(() => (
        <List stripe>
          <ListItem>
            <ListItemMeta
              image={() => <img src="https://tdesign.gtimg.com/site/avatar.jpg" />}
              title="标题一"
              description="描述一"
            ></ListItemMeta>
          </ListItem>
          <ListItem>
            <ListItemMeta
              image={() => <img src="https://tdesign.gtimg.com/site/avatar.jpg" />}
              title="标题二"
              description="描述二"
            ></ListItemMeta>
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
