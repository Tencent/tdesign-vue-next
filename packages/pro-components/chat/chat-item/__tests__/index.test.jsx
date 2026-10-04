import { mount } from '@vue/test-utils';
import ChatItem from '../index';

/**
 * ChatItem 基础回归（组件级）
 *
 * 历史用例使用 `toMatchSnapshot()` 记录整棵 DOM，底层由 webc 换成 Vue 后必然全量失败，
 * 这里改为只断言对外语义（角色 / 变体 / 插槽），迁移前后一致。
 */
describe('ChatItem', () => {
  describe(':props', () => {
    it(':role', () => {
      const wrapper = mount(ChatItem, { props: { role: 'user' } });
      expect(wrapper.classes()).toContain('t-chat__inner');
      expect(wrapper.classes()).toContain('user');
    });

    it(':variant', () => {
      const wrapper = mount(ChatItem, { props: { variant: 'primary' } });
      expect(wrapper.classes()).toContain('t-chat__text--variant--primary');
    });

    it(':content', () => {
      const wrapper = mount(ChatItem, { props: { role: 'user', content: 'hello' } });
      expect(wrapper.find('.t-chat__detail').text()).toContain('hello');
    });
  });

  describe('<slot>', () => {
    it('content slot', () => {
      const wrapper = mount(ChatItem, {
        props: { role: 'user' },
        slots: { content: '<div class="custom-content">custom content</div>' },
      });
      expect(wrapper.find('.custom-content').exists()).toBe(true);
    });

    it('avatar slot', () => {
      const wrapper = mount(ChatItem, {
        props: { role: 'user' },
        slots: { avatar: '<div class="custom-avatar">custom avatar</div>' },
      });
      expect(wrapper.find('.custom-avatar').exists()).toBe(true);
    });
  });
});
