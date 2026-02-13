import { mount } from '@vue/test-utils';
import { expect } from 'vitest';
import { Comment } from '@tdesign/components/comment';

describe('Comment', () => {
  describe('props', () => {
    it(':author[string]', () => {
      const wrapper1 = mount(<Comment author="张三" />);
      expect(wrapper1.find('.t-comment__name').exists()).toBe(true);
      expect(wrapper1.find('.t-comment__name').text()).toBe('张三');
      wrapper1.unmount();

      // 不传 author 不渲染 author 区域
      const wrapper2 = mount(<Comment />);
      expect(wrapper2.find('.t-comment__author').exists()).toBe(false);
      wrapper2.unmount();
    });

    it(':author[slot/function]', () => {
      const wrapper = mount(Comment, {
        slots: { author: () => <span class="custom-author">自定义作者</span> },
      });
      expect(wrapper.find('.t-comment__name .custom-author').exists()).toBe(true);
      expect(wrapper.find('.custom-author').text()).toBe('自定义作者');
      wrapper.unmount();
    });

    it(':datetime[string]', () => {
      const wrapper1 = mount(<Comment datetime="2024-01-01" />);
      expect(wrapper1.find('.t-comment__time').exists()).toBe(true);
      expect(wrapper1.find('.t-comment__time').text()).toBe('2024-01-01');
      wrapper1.unmount();

      // 不传 datetime 不渲染 time
      const wrapper2 = mount(<Comment />);
      expect(wrapper2.find('.t-comment__time').exists()).toBe(false);
      wrapper2.unmount();
    });

    it(':datetime[slot/function]', () => {
      const wrapper = mount(Comment, {
        slots: { datetime: () => <span class="custom-time">刚刚</span> },
      });
      expect(wrapper.find('.t-comment__time .custom-time').exists()).toBe(true);
      wrapper.unmount();
    });

    it(':author + :datetime renders author area', () => {
      // 仅有 author
      const wrapper1 = mount(<Comment author="张三" />);
      expect(wrapper1.find('.t-comment__author').exists()).toBe(true);
      expect(wrapper1.find('.t-comment__name').exists()).toBe(true);
      expect(wrapper1.find('.t-comment__time').exists()).toBe(false);
      wrapper1.unmount();

      // 仅有 datetime
      const wrapper2 = mount(<Comment datetime="2024-01-01" />);
      expect(wrapper2.find('.t-comment__author').exists()).toBe(true);
      expect(wrapper2.find('.t-comment__name').exists()).toBe(false);
      expect(wrapper2.find('.t-comment__time').exists()).toBe(true);
      wrapper2.unmount();

      // 两者都有
      const wrapper3 = mount(<Comment author="张三" datetime="2024-01-01" />);
      expect(wrapper3.find('.t-comment__author').exists()).toBe(true);
      expect(wrapper3.find('.t-comment__name').text()).toBe('张三');
      expect(wrapper3.find('.t-comment__time').text()).toBe('2024-01-01');
      wrapper3.unmount();
    });

    it(':avatar[string]', () => {
      const wrapper1 = mount(<Comment avatar="https://example.com/avatar.png" />);
      expect(wrapper1.find('.t-comment__avatar').exists()).toBe(true);
      const img = wrapper1.find('.t-comment__avatar-image');
      expect(img.exists()).toBe(true);
      expect(img.attributes('src')).toBe('https://example.com/avatar.png');
      wrapper1.unmount();

      // 不传 avatar 不渲染
      const wrapper2 = mount(<Comment />);
      expect(wrapper2.find('.t-comment__avatar').exists()).toBe(false);
      wrapper2.unmount();
    });

    it(':avatar[slot/function]', () => {
      const wrapper = mount(Comment, {
        slots: { avatar: () => <div class="custom-avatar">A</div> },
      });
      expect(wrapper.find('.t-comment__avatar').exists()).toBe(true);
      expect(wrapper.find('.custom-avatar').exists()).toBe(true);
      // 非字符串 avatar 不渲染 img
      expect(wrapper.find('.t-comment__avatar-image').exists()).toBe(false);
      wrapper.unmount();
    });

    it(':content[string]', () => {
      const wrapper = mount(<Comment content="这是一条评论内容" />);
      expect(wrapper.find('.t-comment__detail').exists()).toBe(true);
      expect(wrapper.find('.t-comment__detail').text()).toBe('这是一条评论内容');
      wrapper.unmount();
    });

    it(':content[slot/function]', () => {
      const wrapper = mount(Comment, {
        slots: { content: () => <p class="custom-content">自定义内容</p> },
      });
      expect(wrapper.find('.t-comment__detail .custom-content').exists()).toBe(true);
      expect(wrapper.find('.custom-content').text()).toBe('自定义内容');
      wrapper.unmount();
    });

    it(':quote[string]', () => {
      const wrapper1 = mount(<Comment quote="引用内容" />);
      expect(wrapper1.find('.t-comment__quote').exists()).toBe(true);
      expect(wrapper1.find('.t-comment__quote').text()).toBe('引用内容');
      wrapper1.unmount();

      // 不传 quote 不渲染
      const wrapper2 = mount(<Comment />);
      expect(wrapper2.find('.t-comment__quote').exists()).toBe(false);
      wrapper2.unmount();
    });

    it(':quote[slot/function]', () => {
      const wrapper = mount(Comment, {
        slots: { quote: () => <blockquote class="custom-quote">引用</blockquote> },
      });
      expect(wrapper.find('.t-comment__quote .custom-quote').exists()).toBe(true);
      wrapper.unmount();
    });

    it(':actions[array]', () => {
      const wrapper1 = mount(Comment, {
        slots: {
          actions: () => [<span key="like">点赞</span>, <span key="reply">回复</span>],
        },
      });
      expect(wrapper1.find('.t-comment__actions').exists()).toBe(true);
      // actions 会被 Button 包裹
      const buttons = wrapper1.findAll('.t-comment__actions .t-button');
      expect(buttons.length).toBe(2);
      wrapper1.unmount();

      // 不传 actions 不渲染
      const wrapper2 = mount(<Comment />);
      expect(wrapper2.find('.t-comment__actions').exists()).toBe(false);
      wrapper2.unmount();
    });

    it(':reply[string]', () => {
      const wrapper1 = mount(<Comment reply="回复区域" />);
      expect(wrapper1.find('.t-comment__reply').exists()).toBe(true);
      expect(wrapper1.find('.t-comment__reply').text()).toBe('回复区域');
      wrapper1.unmount();

      // 不传 reply 不渲染
      const wrapper2 = mount(<Comment />);
      expect(wrapper2.find('.t-comment__reply').exists()).toBe(false);
      wrapper2.unmount();
    });

    it(':reply[slot/function]', () => {
      const wrapper = mount(Comment, {
        slots: { reply: () => <div class="custom-reply">回复表单</div> },
      });
      expect(wrapper.find('.t-comment__reply .custom-reply').exists()).toBe(true);
      wrapper.unmount();
    });
  });

  describe('rendering', () => {
    it('renders basic structure', () => {
      const wrapper = mount(<Comment />);
      expect(wrapper.find('.t-comment').exists()).toBe(true);
      expect(wrapper.find('.t-comment__inner').exists()).toBe(true);
      expect(wrapper.find('.t-comment__content').exists()).toBe(true);
      expect(wrapper.find('.t-comment__detail').exists()).toBe(true);
      wrapper.unmount();
    });

    it('renders all sections together', () => {
      const wrapper = mount(Comment, {
        props: {
          author: '张三',
          datetime: '2024-01-01',
          avatar: 'https://example.com/avatar.png',
          content: '评论内容',
          quote: '引用内容',
          reply: '回复区域',
        },
        slots: {
          actions: () => [<span key="like">点赞</span>],
        },
      });
      expect(wrapper.find('.t-comment__avatar').exists()).toBe(true);
      expect(wrapper.find('.t-comment__name').text()).toBe('张三');
      expect(wrapper.find('.t-comment__time').text()).toBe('2024-01-01');
      expect(wrapper.find('.t-comment__detail').text()).toBe('评论内容');
      expect(wrapper.find('.t-comment__quote').text()).toBe('引用内容');
      expect(wrapper.find('.t-comment__actions').exists()).toBe(true);
      expect(wrapper.find('.t-comment__reply').text()).toBe('回复区域');
      wrapper.unmount();
    });

    it('nested comments', () => {
      const wrapper = mount(Comment, {
        props: { author: '张三', content: '外层评论' },
        slots: {
          reply: () => <Comment author="李四" content="内层回复" />,
        },
      });
      expect(wrapper.find('.t-comment__reply .t-comment').exists()).toBe(true);
      expect(wrapper.find('.t-comment__reply .t-comment__name').text()).toBe('李四');
      expect(wrapper.find('.t-comment__reply .t-comment__detail').text()).toBe('内层回复');
      wrapper.unmount();
    });
  });
});
