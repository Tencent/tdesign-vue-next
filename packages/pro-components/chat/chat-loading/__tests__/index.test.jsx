import { mount } from '@vue/test-utils';
import ChatLoading from '../index';

/**
 * ChatLoading 基础回归（组件级）
 *
 * 注意：当前 ChatLoading 由底层（webc 自定义元素）承载，其内容位于 shadow DOM，
 * jsdom 环境下不可见，因此这里只断言「可挂载、可传参、不抛错」这一层对外契约。
 * 迁移为纯 Vue 后，可在 __tests__ 下补充内部 DOM 断言（见 test/README.md）。
 */
describe('ChatLoading', () => {
  describe(':props', () => {
    it.each(['moving', 'gradient', 'circle'])(':animation=%s 可正常挂载', (animation) => {
      expect(() => mount(ChatLoading, { props: { animation } })).not.toThrow();
    });

    it(':text 可正常挂载', () => {
      expect(() => mount(ChatLoading, { props: { text: 'Loading...' } })).not.toThrow();
    });

    it('无参数挂载不抛错', () => {
      const wrapper = mount(ChatLoading);
      expect(wrapper.exists()).toBe(true);
    });
  });
});
