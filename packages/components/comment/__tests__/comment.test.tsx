import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { expect } from 'vitest';
import { ThumbUpIcon, ChartIcon } from 'tdesign-icons-vue-next';
import Comment from '@tdesign/components/comment';

const avatarUrl = 'https://tdesign.gtimg.com/site/avatar.jpg';

describe('Comment', () => {
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
      expect(name.exists()).eq(true);
      expect(name.text()).eq('评论作者名');
    });

    it(':author[function]', async () => {
      await wrapper.setProps({ author: () => <span class="custom-author">自定义作者</span> });
      expect(wrapper.find('.custom-author').exists()).eq(true);
      expect(wrapper.find('.custom-author').text()).eq('自定义作者');
    });

    it(':author[slot]', () => {
      const w = mount(Comment, {
        props: { content: '内容' },
        slots: { author: () => <span class="slot-author">插槽作者</span> },
      });
      expect(w.find('.slot-author').exists()).eq(true);
      expect(w.find('.slot-author').text()).eq('插槽作者');
    });

    it(':author not provided should not render name', async () => {
      await wrapper.setProps({ author: undefined, datetime: undefined });
      expect(wrapper.find('.t-comment__author').exists()).eq(false);
      expect(wrapper.find('.t-comment__name').exists()).eq(false);
    });

    it(':avatar[string]', () => {
      const avatarDom = wrapper.find('.t-comment__avatar');
      const img = avatarDom.find('img');
      expect(avatarDom.exists()).eq(true);
      expect(img.exists()).eq(true);
      expect(img.attributes('src')).eq(avatarUrl);
      expect(img.classes('t-comment__avatar-image')).eq(true);
    });

    it(':avatar[function]', async () => {
      await wrapper.setProps({ avatar: () => <div class="custom-avatar">头像</div> });
      const avatarDom = wrapper.find('.t-comment__avatar');
      expect(avatarDom.exists()).eq(true);
      expect(avatarDom.find('img').exists()).eq(false);
      expect(avatarDom.find('.custom-avatar').exists()).eq(true);
    });

    it(':avatar[slot]', () => {
      const w = mount(Comment, {
        props: { content: '内容' },
        slots: { avatar: () => <img class="slot-avatar" src={avatarUrl} /> },
      });
      expect(w.find('.t-comment__avatar').exists()).eq(true);
      expect(w.find('.slot-avatar').exists()).eq(true);
    });

    it(':avatar not provided', async () => {
      await wrapper.setProps({ avatar: undefined });
      expect(wrapper.find('.t-comment__avatar').exists()).eq(false);
    });

    it(':content[string]', () => {
      const detail = wrapper.find('.t-comment__detail');
      expect(detail.exists()).eq(true);
      expect(detail.text()).eq('这里是评论内容。');
    });

    it(':content[function]', async () => {
      await wrapper.setProps({ content: () => <div class="custom-content">自定义内容</div> });
      expect(wrapper.find('.custom-content').exists()).eq(true);
      expect(wrapper.find('.custom-content').text()).eq('自定义内容');
    });

    it(':content[slot]', () => {
      const w = mount(Comment, {
        props: { avatar: avatarUrl },
        slots: { content: () => <div class="slot-content">插槽内容</div> },
      });
      expect(w.find('.slot-content').exists()).eq(true);
      expect(w.find('.slot-content').text()).eq('插槽内容');
    });

    it(':datetime[string]', () => {
      const time = wrapper.find('.t-comment__time');
      expect(time.exists()).eq(true);
      expect(time.text()).eq('今天16:38');
    });

    it(':datetime[function]', async () => {
      await wrapper.setProps({ datetime: () => <span class="custom-time">2024-01-01</span> });
      expect(wrapper.find('.custom-time').exists()).eq(true);
      expect(wrapper.find('.custom-time').text()).eq('2024-01-01');
    });

    it(':datetime[slot]', () => {
      const w = mount(Comment, {
        props: { content: '内容', author: '作者' },
        slots: { datetime: () => <span class="slot-time">slot时间</span> },
      });
      expect(w.find('.slot-time').exists()).eq(true);
      expect(w.find('.slot-time').text()).eq('slot时间');
    });

    it(':datetime not provided should not render time', async () => {
      await wrapper.setProps({ datetime: undefined });
      expect(wrapper.find('.t-comment__time').exists()).eq(false);
    });

    it(':quote[string]', async () => {
      await wrapper.setProps({ quote: '这是引用内容' });
      const quote = wrapper.find('.t-comment__quote');
      expect(quote.exists()).eq(true);
      expect(quote.text()).eq('这是引用内容');
    });

    it(':quote[function]', async () => {
      await wrapper.setProps({ quote: () => <blockquote class="custom-quote">自定义引用</blockquote> });
      expect(wrapper.find('.custom-quote').exists()).eq(true);
      expect(wrapper.find('.custom-quote').text()).eq('自定义引用');
    });

    it(':quote[slot]', () => {
      const w = mount(Comment, {
        props: { content: '内容' },
        slots: { quote: () => <blockquote class="slot-quote">插槽引用</blockquote> },
      });
      expect(w.find('.slot-quote').exists()).eq(true);
      expect(w.find('.slot-quote').text()).eq('插槽引用');
    });

    it(':quote not provided', () => {
      expect(wrapper.find('.t-comment__quote').exists()).eq(false);
    });

    it(':reply[string]', async () => {
      await wrapper.setProps({ reply: '这是回复内容' });
      const reply = wrapper.find('.t-comment__reply');
      expect(reply.exists()).eq(true);
      expect(reply.text()).eq('这是回复内容');
    });

    it(':reply[function]', async () => {
      await wrapper.setProps({ reply: () => <div class="custom-reply">自定义回复</div> });
      expect(wrapper.find('.custom-reply').exists()).eq(true);
      expect(wrapper.find('.custom-reply').text()).eq('自定义回复');
    });

    it(':reply[slot]', () => {
      const w = mount(Comment, {
        props: { content: '内容' },
        slots: { reply: () => <div class="slot-reply">插槽回复</div> },
      });
      expect(w.find('.slot-reply').exists()).eq(true);
      expect(w.find('.slot-reply').text()).eq('插槽回复');
    });

    it(':reply not provided', () => {
      expect(wrapper.find('.t-comment__reply').exists()).eq(false);
    });

    it(':actions[slot]', () => {
      const w = mount(Comment, {
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
      const actions = w.find('.t-comment__actions');
      const texts = actions.findAll('.action-text');
      expect(actions.exists()).eq(true);
      expect(actions.findComponent(ThumbUpIcon).exists()).eq(true);
      expect(actions.findComponent(ChartIcon).exists()).eq(true);
      expect(texts.length).eq(2);
      expect(texts[0].text()).eq('6');
      expect(texts[1].text()).eq('回复');
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
      const w = mount(Comment, {
        props: { content: '内容', actions: actionList },
      });
      const actions = w.find('.t-comment__actions');
      expect(actions.exists()).eq(true);
      const buttons = actions.findAll('.t-button');
      expect(buttons.length).eq(2);
      expect(actions.findComponent(ThumbUpIcon).exists()).eq(true);
      expect(actions.findComponent(ChartIcon).exists()).eq(true);
    });

    it(':actions[empty array]', () => {
      const w = mount(Comment, {
        props: { content: '内容', actions: [] },
      });
      expect(w.find('.t-comment__actions').exists()).eq(false);
    });

    it(':actions not provided', () => {
      expect(wrapper.find('.t-comment__actions').exists()).eq(false);
    });

    it('should render only author without datetime', async () => {
      await wrapper.setProps({ datetime: undefined });
      expect(wrapper.find('.t-comment__author').exists()).eq(true);
      expect(wrapper.find('.t-comment__name').exists()).eq(true);
      expect(wrapper.find('.t-comment__name').text()).eq('评论作者名');
      expect(wrapper.find('.t-comment__time').exists()).eq(false);
    });

    it('should render only datetime without author', async () => {
      await wrapper.setProps({ author: undefined });
      expect(wrapper.find('.t-comment__author').exists()).eq(true);
      expect(wrapper.find('.t-comment__name').exists()).eq(false);
      expect(wrapper.find('.t-comment__time').exists()).eq(true);
      expect(wrapper.find('.t-comment__time').text()).eq('今天16:38');
    });

    it('should render minimal comment with no props', () => {
      const w = mount(Comment);
      expect(w.find('.t-comment').exists()).eq(true);
      expect(w.find('.t-comment__inner').exists()).eq(true);
      expect(w.find('.t-comment__avatar').exists()).eq(false);
      expect(w.find('.t-comment__author').exists()).eq(false);
      expect(w.find('.t-comment__quote').exists()).eq(false);
      expect(w.find('.t-comment__reply').exists()).eq(false);
      expect(w.find('.t-comment__actions').exists()).eq(false);
    });

    it('should render all props together', async () => {
      await wrapper.setProps({ quote: '引用内容', reply: '回复内容' });
      expect(wrapper.find('.t-comment__avatar').exists()).eq(true);
      expect(wrapper.find('.t-comment__name').text()).eq('评论作者名');
      expect(wrapper.find('.t-comment__time').text()).eq('今天16:38');
      expect(wrapper.find('.t-comment__detail').text()).eq('这里是评论内容。');
      expect(wrapper.find('.t-comment__quote').text()).eq('引用内容');
      expect(wrapper.find('.t-comment__reply').text()).eq('回复内容');
    });
  });
});
