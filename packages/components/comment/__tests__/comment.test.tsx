import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { nextTick } from 'vue';
import { ThumbUpIcon, ChartIcon } from 'tdesign-icons-vue-next';
import Comment from '@tdesign/components/comment';

const avatarUrl = 'https://tdesign.gtimg.com/site/avatar.jpg';

describe('Comment', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  // ==================== Props Tests ====================
  describe('props', () => {
    let wrapper: VueWrapper<InstanceType<typeof Comment>> | null = null;
    beforeEach(() => {
      wrapper = mount(Comment, {
        props: {
          avatar: avatarUrl,
          author: '评论作者名',
          datetime: '今天16:38',
          content: '这里是评论内容。',
        },
      }) as VueWrapper<InstanceType<typeof Comment>>;
    });

    it(':author[string]', () => {
      const name = wrapper.find('.t-comment__name');
      expect(name.exists()).toBe(true);
      expect(name.text()).toBe('评论作者名');
    });

    it(':author[function]', async () => {
      await wrapper.setProps({ author: () => <span class="custom-author">自定义作者</span> });
      expect(wrapper.find('.custom-author').exists()).toBe(true);
      expect(wrapper.find('.custom-author').text()).toBe('自定义作者');
    });

    it(':author[slot]', () => {
      const wrapper = mount(Comment, {
        props: { content: '内容' },
        slots: { author: () => <span class="slot-author">插槽作者</span> },
      });
      expect(wrapper.find('.slot-author').exists()).toBe(true);
      expect(wrapper.find('.slot-author').text()).toBe('插槽作者');
    });

    it(':author not provided should not render name', async () => {
      await wrapper.setProps({ author: undefined, datetime: undefined });
      expect(wrapper.find('.t-comment__author').exists()).toBe(false);
      expect(wrapper.find('.t-comment__name').exists()).toBe(false);
    });

    it(':avatar[string]', () => {
      const avatarDom = wrapper.find('.t-comment__avatar');
      const img = avatarDom.find('img');
      expect(avatarDom.exists()).toBe(true);
      expect(img.exists()).toBe(true);
      expect(img.attributes('src')).toBe(avatarUrl);
      expect(img.classes('t-comment__avatar-image')).toBe(true);
    });

    it(':avatar[function]', async () => {
      await wrapper.setProps({ avatar: () => <div class="custom-avatar">头像</div> });
      const avatarDom = wrapper.find('.t-comment__avatar');
      expect(avatarDom.exists()).toBe(true);
      expect(avatarDom.find('img').exists()).toBe(false);
      expect(avatarDom.find('.custom-avatar').exists()).toBe(true);
    });

    it(':avatar[slot]', () => {
      const wrapper = mount(Comment, {
        props: { content: '内容' },
        slots: { avatar: () => <img class="slot-avatar" src={avatarUrl} /> },
      });
      expect(wrapper.find('.t-comment__avatar').exists()).toBe(true);
      expect(wrapper.find('.slot-avatar').exists()).toBe(true);
    });

    it(':avatar not provided', async () => {
      await wrapper.setProps({ avatar: undefined });
      expect(wrapper.find('.t-comment__avatar').exists()).toBe(false);
    });

    it(':content[string]', () => {
      const detail = wrapper.find('.t-comment__detail');
      expect(detail.exists()).toBe(true);
      expect(detail.text()).toBe('这里是评论内容。');
    });

    it(':content[function]', async () => {
      await wrapper.setProps({ content: () => <div class="custom-content">自定义内容</div> });
      expect(wrapper.find('.custom-content').exists()).toBe(true);
      expect(wrapper.find('.custom-content').text()).toBe('自定义内容');
    });

    it(':content[slot]', () => {
      const wrapper = mount(Comment, {
        props: { avatar: avatarUrl },
        slots: { content: () => <div class="slot-content">插槽内容</div> },
      });
      expect(wrapper.find('.slot-content').exists()).toBe(true);
      expect(wrapper.find('.slot-content').text()).toBe('插槽内容');
    });

    it(':datetime[string]', () => {
      const time = wrapper.find('.t-comment__time');
      expect(time.exists()).toBe(true);
      expect(time.text()).toBe('今天16:38');
    });

    it(':datetime[function]', async () => {
      await wrapper.setProps({ datetime: () => <span class="custom-time">2024-01-01</span> });
      expect(wrapper.find('.custom-time').exists()).toBe(true);
      expect(wrapper.find('.custom-time').text()).toBe('2024-01-01');
    });

    it(':datetime[slot]', () => {
      const wrapper = mount(Comment, {
        props: { content: '内容', author: '作者' },
        slots: { datetime: () => <span class="slot-time">slot时间</span> },
      });
      expect(wrapper.find('.slot-time').exists()).toBe(true);
      expect(wrapper.find('.slot-time').text()).toBe('slot时间');
    });

    it(':datetime not provided should not render time', async () => {
      await wrapper.setProps({ datetime: undefined });
      expect(wrapper.find('.t-comment__time').exists()).toBe(false);
    });

    it(':quote[string]', async () => {
      await wrapper.setProps({ quote: '这是引用内容' });
      const quote = wrapper.find('.t-comment__quote');
      expect(quote.exists()).toBe(true);
      expect(quote.text()).toBe('这是引用内容');
    });

    it(':quote[function]', async () => {
      await wrapper.setProps({ quote: () => <blockquote class="custom-quote">自定义引用</blockquote> });
      expect(wrapper.find('.custom-quote').exists()).toBe(true);
      expect(wrapper.find('.custom-quote').text()).toBe('自定义引用');
    });

    it(':quote[slot]', () => {
      const wrapper = mount(Comment, {
        props: { content: '内容' },
        slots: { quote: () => <blockquote class="slot-quote">插槽引用</blockquote> },
      });
      expect(wrapper.find('.slot-quote').exists()).toBe(true);
      expect(wrapper.find('.slot-quote').text()).toBe('插槽引用');
    });

    it(':quote not provided', () => {
      expect(wrapper.find('.t-comment__quote').exists()).toBe(false);
    });

    it(':reply[string]', async () => {
      await wrapper.setProps({ reply: '这是回复内容' });
      const reply = wrapper.find('.t-comment__reply');
      expect(reply.exists()).toBe(true);
      expect(reply.text()).toBe('这是回复内容');
    });

    it(':reply[function]', async () => {
      await wrapper.setProps({ reply: () => <div class="custom-reply">自定义回复</div> });
      expect(wrapper.find('.custom-reply').exists()).toBe(true);
      expect(wrapper.find('.custom-reply').text()).toBe('自定义回复');
    });

    it(':reply[slot]', () => {
      const wrapper = mount(Comment, {
        props: { content: '内容' },
        slots: { reply: () => <div class="slot-reply">插槽回复</div> },
      });
      expect(wrapper.find('.slot-reply').exists()).toBe(true);
      expect(wrapper.find('.slot-reply').text()).toBe('插槽回复');
    });

    it(':reply not provided', () => {
      expect(wrapper.find('.t-comment__reply').exists()).toBe(false);
    });

    it(':actions[slot]', () => {
      const wrapper = mount(Comment, {
        props: { avatar: avatarUrl, content: '内容' },
        slots: {
          actions: () => (
            <>
              <span>
                <ThumbUpIcon />
                <span class="action-text">6</span>
              </span>
              <span>
                <ChartIcon />
                <span class="action-text">回复</span>
              </span>
            </>
          ),
        },
      });
      const actions = wrapper.find('.t-comment__actions');
      const texts = actions.findAll('.action-text');
      expect(actions.exists()).toBe(true);
      expect(actions.findComponent(ThumbUpIcon).exists()).toBe(true);
      expect(actions.findComponent(ChartIcon).exists()).toBe(true);
      expect(texts.length).toBe(2);
      expect(texts[0].text()).toBe('6');
      expect(texts[1].text()).toBe('回复');
    });

    it(':actions[Array<TNode>]', () => {
      const actionList = [
        () => (
          <span>
            <ThumbUpIcon />
            <span class="action-text">6</span>
          </span>
        ),
        () => (
          <span>
            <ChartIcon />
            <span class="action-text">回复</span>
          </span>
        ),
      ];
      const wrapper = mount(Comment, {
        props: { content: '内容', actions: actionList },
      });
      const actions = wrapper.find('.t-comment__actions');
      expect(actions.exists()).toBe(true);
      const buttons = actions.findAll('.t-button');
      expect(buttons.length).toBe(2);
      expect(actions.findComponent(ThumbUpIcon).exists()).toBe(true);
      expect(actions.findComponent(ChartIcon).exists()).toBe(true);
    });

    it(':actions[empty array]', () => {
      const wrapper = mount(Comment, {
        props: { content: '内容', actions: [] },
      });
      expect(wrapper.find('.t-comment__actions').exists()).toBe(false);
    });

    it(':actions not provided', () => {
      expect(wrapper.find('.t-comment__actions').exists()).toBe(false);
    });

    it('should render only author without datetime', async () => {
      await wrapper.setProps({ datetime: undefined });
      expect(wrapper.find('.t-comment__author').exists()).toBe(true);
      expect(wrapper.find('.t-comment__name').exists()).toBe(true);
      expect(wrapper.find('.t-comment__name').text()).toBe('评论作者名');
      expect(wrapper.find('.t-comment__time').exists()).toBe(false);
    });

    it('should render only datetime without author', async () => {
      await wrapper.setProps({ author: undefined });
      expect(wrapper.find('.t-comment__author').exists()).toBe(true);
      expect(wrapper.find('.t-comment__name').exists()).toBe(false);
      expect(wrapper.find('.t-comment__time').exists()).toBe(true);
      expect(wrapper.find('.t-comment__time').text()).toBe('今天16:38');
    });

    it('should not render author section when both author and datetime are missing', () => {
      const wrapper = mount(Comment, {
        props: { content: '内容' },
      });
      expect(wrapper.find('.t-comment__author').exists()).toBe(false);
      expect(wrapper.find('.t-comment__name').exists()).toBe(false);
      expect(wrapper.find('.t-comment__time').exists()).toBe(false);
    });

    it('should render minimal comment with no props', () => {
      const wrapper = mount(Comment);
      expect(wrapper.find('.t-comment').exists()).toBe(true);
      expect(wrapper.find('.t-comment__inner').exists()).toBe(true);
      expect(wrapper.find('.t-comment__avatar').exists()).toBe(false);
      expect(wrapper.find('.t-comment__author').exists()).toBe(false);
      expect(wrapper.find('.t-comment__quote').exists()).toBe(false);
      expect(wrapper.find('.t-comment__reply').exists()).toBe(false);
      expect(wrapper.find('.t-comment__actions').exists()).toBe(false);
    });

    it('should render all props together', async () => {
      await wrapper.setProps({ quote: '引用内容', reply: '回复内容' });
      expect(wrapper.find('.t-comment__avatar').exists()).toBe(true);
      expect(wrapper.find('.t-comment__name').text()).toBe('评论作者名');
      expect(wrapper.find('.t-comment__time').text()).toBe('今天16:38');
      expect(wrapper.find('.t-comment__detail').text()).toBe('这里是评论内容。');
      expect(wrapper.find('.t-comment__quote').text()).toBe('引用内容');
      expect(wrapper.find('.t-comment__reply').text()).toBe('回复内容');
    });

    it('should render multiple slots together', () => {
      const wrapper = mount(Comment, {
        slots: {
          avatar: () => <div class="slot-avatar">头像</div>,
          author: () => <span class="slot-author">作者</span>,
          datetime: () => <span class="slot-time">时间</span>,
          content: () => <div class="slot-content">内容</div>,
          quote: () => <blockquote class="slot-quote">引用</blockquote>,
          reply: () => <div class="slot-reply">回复</div>,
          actions: () => <span class="slot-actions">操作</span>,
        },
      });
      expect(wrapper.find('.slot-avatar').exists()).toBe(true);
      expect(wrapper.find('.slot-author').exists()).toBe(true);
      expect(wrapper.find('.slot-time').exists()).toBe(true);
      expect(wrapper.find('.slot-content').exists()).toBe(true);
      expect(wrapper.find('.slot-quote').exists()).toBe(true);
      expect(wrapper.find('.slot-reply').exists()).toBe(true);
      expect(wrapper.find('.slot-actions').exists()).toBe(true);
    });

    it('should render proper DOM hierarchy', async () => {
      await wrapper.setProps({ quote: '引用', reply: '回复' });
      await nextTick();

      const comment = wrapper.find('.t-comment');
      const inner = comment.find('.t-comment__inner');
      const avatar = inner.find('.t-comment__avatar');
      const content = inner.find('.t-comment__content');
      const reply = comment.find('.t-comment__reply');

      expect(comment.exists()).toBe(true);
      expect(inner.exists()).toBe(true);
      expect(avatar.exists()).toBe(true);
      expect(content.exists()).toBe(true);
      expect(reply.exists()).toBe(true);

      const author = content.find('.t-comment__author');
      const detail = content.find('.t-comment__detail');
      const quote = content.find('.t-comment__quote');

      expect(author.exists()).toBe(true);
      expect(detail.exists()).toBe(true);
      expect(quote.exists()).toBe(true);
    });

    it(':minimal comment snapshot', async () => {
      const wrapper = mount(Comment, {
        props: { content: '基础评论内容' },
      });
      await nextTick();
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':complete comment snapshot', async () => {
      const wrapper = mount(Comment, {
        props: {
          avatar: avatarUrl,
          author: '评论作者名',
          datetime: '今天16:38',
          content: '这里是评论内容。',
          quote: '引用内容',
          reply: '回复内容',
          actions: [
            () => (
              <span>
                <ThumbUpIcon />赞
              </span>
            ),
            () => (
              <span>
                <ChartIcon />
                回复
              </span>
            ),
          ],
        },
      });
      await nextTick();
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':custom function props snapshot', async () => {
      const wrapper = mount(Comment, {
        props: {
          avatar: () => <div class="custom-avatar">自定义头像</div>,
          author: () => <span class="custom-author">自定义作者</span>,
          datetime: () => <span class="custom-time">自定义时间</span>,
          content: () => <div class="custom-content">自定义内容</div>,
          quote: () => <blockquote class="custom-quote">自定义引用</blockquote>,
          reply: () => <div class="custom-reply">自定义回复</div>,
        },
      });
      await nextTick();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  // ==================== Boundary Conditions Tests ====================
  describe('boundary conditions', () => {
    it('should handle empty string props', async () => {
      const wrapper = mount(Comment, {
        props: {
          author: '',
          content: '',
          datetime: '',
          quote: '',
          reply: '',
        },
      });
      await nextTick();
      expect(wrapper.find('.t-comment').exists()).toBe(true);
      expect(wrapper.find('.t-comment__inner').exists()).toBe(true);
    });

    it('should handle null/undefined props gracefully', async () => {
      const wrapper = mount(Comment, {
        props: {
          author: null,
          content: undefined,
          datetime: null,
          quote: undefined,
          reply: null,
          avatar: undefined,
          actions: null,
        },
      });
      await nextTick();
      expect(wrapper.find('.t-comment').exists()).toBe(true);
      expect(wrapper.find('.t-comment__avatar').exists()).toBe(false);
      expect(wrapper.find('.t-comment__author').exists()).toBe(false);
      expect(wrapper.find('.t-comment__quote').exists()).toBe(false);
      expect(wrapper.find('.t-comment__reply').exists()).toBe(false);
      expect(wrapper.find('.t-comment__actions').exists()).toBe(false);
    });

    it('should handle very long content', async () => {
      const longContent = 'A'.repeat(1000);
      const wrapper = mount(Comment, {
        props: { content: longContent },
      });
      await nextTick();
      expect(wrapper.find('.t-comment__detail').text()).toBe(longContent);
    });

    it('should handle special characters in content', async () => {
      const specialContent = '<script>alert("xss")</script>&nbsp;特殊字符测试';
      const wrapper = mount(Comment, {
        props: { content: specialContent },
      });
      await nextTick();
      expect(wrapper.find('.t-comment__detail').text()).toBe(specialContent);
    });

    it('should handle invalid avatar URL', async () => {
      const wrapper = mount(Comment, {
        props: {
          avatar: 'invalid-url',
          content: '内容',
        },
      });
      await nextTick();
      const img = wrapper.find('.t-comment__avatar-image');
      expect(img.exists()).toBe(true);
      expect(img.attributes('src')).toBe('invalid-url');
    });

    it('should handle actions with single item', async () => {
      const wrapper = mount(Comment, {
        props: {
          content: '内容',
          actions: [() => <span>单个操作</span>],
        },
      });
      await nextTick();
      const actions = wrapper.find('.t-comment__actions');
      expect(actions.exists()).toBe(true);
      expect(actions.findAll('.t-button').length).toBe(1);
    });
  });

  // ==================== Edge Cases Tests ====================
  describe('edge cases', () => {
    it('should handle rapid prop changes', async () => {
      const wrapper = mount(Comment, {
        props: { content: '初始内容' },
      });

      await wrapper.setProps({ author: '作者1' });
      await wrapper.setProps({ author: '作者2' });
      await wrapper.setProps({ datetime: '时间1' });
      await wrapper.setProps({ datetime: '时间2' });
      await wrapper.setProps({ content: '新内容' });

      expect(wrapper.find('.t-comment__name').text()).toBe('作者2');
      expect(wrapper.find('.t-comment__time').text()).toBe('时间2');
      expect(wrapper.find('.t-comment__detail').text()).toBe('新内容');
    });

    it('should handle component unmount gracefully', async () => {
      const wrapper = mount(Comment, {
        props: {
          avatar: avatarUrl,
          author: '作者',
          content: '内容',
        },
      });
      await nextTick();
      wrapper.unmount();
      expect(true).toBe(true);
    });

    it('should handle function props returning null', async () => {
      const wrapper = mount(Comment, {
        props: {
          author: () => null,
          content: () => null,
          datetime: () => null,
          quote: () => null,
          reply: () => null,
          avatar: (): null => null,
        },
      });
      await nextTick();
      expect(wrapper.find('.t-comment').exists()).toBe(true);
    });

    it('should handle function props returning complex objects', async () => {
      const complexAuthor = () => (
        <div class="complex-author">
          <img src="avatar.jpg" alt="avatar" />
          <span>复杂作者组件</span>
        </div>
      );

      const wrapper = mount(Comment, {
        props: {
          content: '内容',
          author: complexAuthor,
        },
      });
      await nextTick();

      expect(wrapper.find('.complex-author').exists()).toBe(true);
      expect(wrapper.find('.complex-author span').text()).toBe('复杂作者组件');
    });
  });
});
