import { mount } from '@vue/test-utils';
import { List, ListItem, ListItemMeta } from '@/src/list/index.ts';

describe('List', () => {
  describe(':props', () => {
    it(':size', () => {
      const wrapper = mount({
        render() {
          return <List size={'large'}>text</List>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':split', () => {
      const wrapper = mount({
        render() {
          return <List split={true}>text</List>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':stripe', () => {
      const wrapper = mount({
        render() {
          return <List stripe={false}>text</List>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':layout', () => {
      const wrapper = mount({
        render() {
          return <List layout={'horizontal'}>text</List>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':header is a string', () => {
      const wrapper = mount({
        render() {
          return <List header={'header'}>text</List>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':footer is a string', () => {
      const wrapper = mount({
        render() {
          return <List footer={'footer'}>text</List>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':asyncLoading is a string', () => {
      const wrapper = mount({
        render() {
          return <List asyncLoading={'loading'}>text</List>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':asyncLoading is load-more', () => {
      const wrapper = mount({
        render() {
          return <List asyncLoading='load-more'>text</List>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':header is a function, () => VNode.', () => {
      const wrapper = mount({
        render() {
          return <List header={() => <p>This is a header</p>}></List>;
        },
      });
      const list = wrapper.findComponent(List);
      const header = list.find('.t-list__header');
      expect(header.exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':footer is a function, () => VNode.', () => {
      const wrapper = mount({
        render() {
          return <List footer={() => <p>This is a footer</p>}></List>;
        },
      });
      const list = wrapper.findComponent(List);
      const footer = list.find('.t-list__footer');
      expect(footer.exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':asyncLoading is a function, () => VNode.', () => {
      const wrapper = mount({
        render() {
          return <List asyncLoading={() => <p>This is a loading</p>}></List>;
        },
      });
      const list = wrapper.findComponent(List);
      const loading = list.find('.t-list__load');
      expect(loading.exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
  describe('@event', () => {
    it('@scroll', () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <List onScroll={fn}>text</List>;
        },
      });
      wrapper.findComponent(List).trigger('scroll');
      expect(fn).toHaveBeenCalled();
    });
    it('@load-more', async () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <List onLoadMore={fn}>text</List>;
        },
      });
      const list = wrapper.findComponent(List);
      await list.find('.t-list__load').trigger('click');
      expect(list.emitted()['load-more']).toBeTruthy();
    });
  });
  describe('<slot>', () => {
    it('<asyncLoading>', () => {
      const wrapper = mount({
        render() {
          return (
            <List
              {...{
                scopedSlots: {
                  asyncLoading: () => <span>自定义loading（function）</span>,
                },
              }}
            ></List>
          );
        },
      });
      expect(wrapper.findComponent(List).exists()).toBe(true);
      expect(wrapper.find('.t-list__load').exists()).toBe(true);
    });
    it('<header>', () => {
      const wrapper = mount({
        render() {
          return (
            <List
              v-slots={{
                header: () => <span>This is a header</span>,
              }}
            ></List>
          );
        },
      });
      expect(wrapper.findComponent(List).exists()).toBe(true);
      expect(wrapper.find('.t-list__header').exists()).toBe(true);
    });
    it('<footer>', () => {
      const wrapper = mount({
        render() {
          return (
            <List
              v-slots={{
                footer: () => <span>自定义loading（function）</span>,
              }}
            ></List>
          );
        },
      });
      expect(wrapper.findComponent(List).exists()).toBe(true);
      expect(wrapper.find('.t-list__footer').exists()).toBe(true);
    });
  });
});

describe('ListItem', () => {
  describe(':props', () => {
    it(':default', () => {
      const wrapper = mount({
        render() {
          return <ListItem default={'default'}>text</ListItem>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':content', () => {
      const wrapper = mount({
        render() {
          return <ListItem content={'content'}>text</ListItem>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':action', () => {
      const wrapper = mount({
        render() {
          return <ListItem action={'action'}>text</ListItem>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':default is a function, () => VNode.', () => {
      const wrapper = mount({
        render() {
          return <ListItem default={() => <p>default</p>}></ListItem>;
        },
      });
      const listItem = wrapper.findComponent(ListItem);
      const defaultContent = listItem.find('.t-list-item-main');
      expect(defaultContent.exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':content is a function, () => VNode.', () => {
      const wrapper = mount({
        render() {
          return <ListItem content={() => <p>This is a content</p>}></ListItem>;
        },
      });
      const listItem = wrapper.findComponent(ListItem);
      const content = listItem.find('.t-list-item-main');
      expect(content.exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });
    // it(':action is a function, () => VNode.', () => {
    //   const wrapper = mount({
    //     render() {
    //       return <ListItem action={() => <p>This is a action</p>}></ListItem>;
    //     },
    //   });
    //   const listItem = wrapper.findComponent(ListItem);
    //   const action = listItem.find('.t-list-item__action');
    //   expect(action.exists()).toBe(true);
    //   expect(wrapper.element).toMatchSnapshot();
    // });
  });
  describe('<slot>', () => {
    it('<default>', () => {
      const wrapper = mount({
        render() {
          return (
            <ListItem
              {...{
                scopedSlots: {
                  default: () => <p>default</p>,
                },
              }}
            ></ListItem>
          );
        },
      });
      expect(wrapper.findComponent(ListItem).exists()).toBe(true);
      expect(wrapper.find('.t-list-item-main').exists()).toBe(true);
    });
    it('<content>', () => {
      const wrapper = mount({
        render() {
          return (
            <ListItem
              v-slots={{
                content: () => <span>This is a content</span>,
              }}
            ></ListItem>
          );
        },
      });
      expect(wrapper.findComponent(ListItem).exists()).toBe(true);
      expect(wrapper.find('.t-list-item-main').exists()).toBe(true);
    });
    it('<action>', () => {
      const wrapper = mount({
        render() {
          return (
            <ListItem
              v-slots={ {
                action: () => <span>This is a action</span>,
              }}
            ></ListItem>
          );
        },
      });
      expect(wrapper.findComponent(ListItem).exists()).toBe(true);
      expect(wrapper.find('.t-list-item__action').exists()).toBe(true);
    });
  });
});

describe('ListItemMeta', () => {
  describe(':props', () => {
    it(':image', () => {
      const wrapper = mount({
        render() {
          return <ListItemMeta image={'image'}>text</ListItemMeta>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':title', () => {
      const wrapper = mount({
        render() {
          return <ListItemMeta title={'title'}>text</ListItemMeta>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':description', () => {
      const wrapper = mount({
        render() {
          return <ListItemMeta description={'description'}>text</ListItemMeta>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    // it(':image is a function, () => VNode.', () => {
    //   const wrapper = mount({
    //     render() {
    //       return <ListItemMeta image={() => <p>image</p>}></ListItemMeta>;
    //     },
    //   });
    //   const listItemMeta = wrapper.findComponent(ListItemMeta);
    //   const avatar = listItemMeta.find('.t-list-item__meta-avatar');
    //   expect(avatar.exists()).toBe(true);
    //   expect(wrapper.element).toMatchSnapshot();
    // });
    it(':title is a function, () => VNode.', () => {
      const wrapper = mount({
        render() {
          return <ListItemMeta title={() => <p>title</p>}></ListItemMeta>;
        },
      });
      const listItemMeta = wrapper.findComponent(ListItemMeta);
      const title = listItemMeta.find('.t-list-item__meta-title');
      expect(title.exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':description is a function, () => VNode.', () => {
      const wrapper = mount({
        render() {
          return <ListItemMeta description={() => <p>description</p>}></ListItemMeta>;
        },
      });
      const listItemMeta = wrapper.findComponent(ListItemMeta);
      const description = listItemMeta.find('.t-list-item__meta-description');
      expect(description.exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
  describe('<slot>', () => {
    it('<image>', () => {
      const wrapper = mount({
        render() {
          return (
            <ListItemMeta
              v-slots={{
                image: () => <p>image</p>,
              }}
            ></ListItemMeta>
          );
        },
      });
      expect(wrapper.findComponent(ListItemMeta).exists()).toBe(true);
      expect(wrapper.find('.t-list-item__meta-avatar').exists()).toBe(true);
    });
    it('<title>', () => {
      const wrapper = mount({
        render() {
          return (
            <ListItemMeta
              v-slots={{
                title: () => <span>This is a title</span>,
              }}
            ></ListItemMeta>
          );
        },
      });
      expect(wrapper.findComponent(ListItemMeta).exists()).toBe(true);
      expect(wrapper.find('.t-list-item__meta-title').exists()).toBe(true);
    });
    it('<description>', () => {
      const wrapper = mount({
        render() {
          return (
            <ListItemMeta
              v-slots={{
                description: () => <span>This is a description</span>,
              }}
            ></ListItemMeta>
          );
        },
      });
      expect(wrapper.findComponent(ListItemMeta).exists()).toBe(true);
      expect(wrapper.find('.t-list-item__meta-description').exists()).toBe(true);
    });
  });
});
