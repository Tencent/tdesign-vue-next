import { List, ListItem } from '@tdesign/components/list';
import { mount } from '@vue/test-utils';

describe('ListItem', () => {
  describe('props', () => {
    it('action[string]', () => {
      const wrapper = mount(() => (
        <List stripe>
          <ListItem action="操作">描述性文字</ListItem>
        </List>
      ));
      expect(wrapper.find('.t-list-item .t-list-item__action').text()).toBe('操作');
    });

    it('action[slot]', () => {
      const wrapper = mount(() => (
        <List stripe>
          <ListItem v-slots={{ action: () => '操作' }}>描述性文字</ListItem>
        </List>
      ));
      expect(wrapper.find('.t-list-item .t-list-item__action').text()).toBe('操作');
    });

    it('action[function]', () => {
      const wrapper = mount(() => (
        <List stripe>
          <ListItem action={() => '操作'}>描述性文字</ListItem>
        </List>
      ));
      expect(wrapper.find('.t-list-item .t-list-item__action').text()).toBe('操作');
    });
    it('content[string]', () => {
      const wrapper = mount(() => (
        <List stripe>
          <ListItem content="描述性文字"></ListItem>
        </List>
      ));
      const [item] = wrapper.findAll('.t-list-item .t-list-item-main');
      expect(item.exists()).toBeTruthy();
      expect(item.text()).toBe('描述性文字');
    });

    it('content[slot]', () => {
      const wrapper = mount(() => (
        <List stripe>
          <ListItem v-slots={{ content: () => '描述性文字' }}></ListItem>
        </List>
      ));
      const [item] = wrapper.findAll('.t-list-item .t-list-item-main');
      expect(item.exists()).toBeTruthy();
      expect(item.text()).toBe('描述性文字');
    });

    it('content[function]', () => {
      const wrapper = mount(() => (
        <List stripe>
          <ListItem content={() => '描述性文字'}></ListItem>
        </List>
      ));
      const [item] = wrapper.findAll('.t-list-item .t-list-item-main');
      expect(item.exists()).toBeTruthy();
      expect(item.text()).toBe('描述性文字');
    });
    it('default[string]', () => {
      const wrapper = mount(() => (
        <List stripe>
          <ListItem default="描述性文字"></ListItem>
        </List>
      ));
      const [item] = wrapper.findAll('.t-list-item .t-list-item-main');
      expect(item.exists()).toBeTruthy();
      expect(item.text()).toBe('描述性文字');
    });
    it('default[slot]', () => {
      const wrapper = mount(() => (
        <List stripe>
          <ListItem v-slots={{ default: () => '描述性文字' }}></ListItem>
        </List>
      ));
      const [item] = wrapper.findAll('.t-list-item .t-list-item-main');
      expect(item.exists()).toBeTruthy();
      expect(item.text()).toBe('描述性文字');
    });
    it('default[function]', () => {
      const wrapper = mount(() => (
        <List stripe>
          <ListItem default={() => '描述性文字'}></ListItem>
        </List>
      ));
      const [item] = wrapper.findAll('.t-list-item .t-list-item-main');
      expect(item.exists()).toBeTruthy();
      expect(item.text()).toBe('描述性文字');
    });
  });
});
