import { mount } from '@vue/test-utils';
import { expect, it } from 'vitest';
import { ChartIcon, ThumbUpIcon } from 'tdesign-icons-vue-next';
import { Comment } from 'tdesign-vue-next';

describe('comment', () => {
  describe(':props', () => {
    it(':author', () => {
      const wrapper = mount(() => (
        <Comment
          avatar="https://tdesign.gtimg.com/site/avatar.jpg"
          author="评论作者名"
          datetime="今天16:38"
          content="这里是评论者写的评论内容。"
        />
      ));
      const inner = wrapper.find('.t-comment .t-comment__inner');
      const author = inner.find('.t-comment__content .t-comment__author');
      const name = author.find('.t-comment__name');
      expect(inner.exists()).toBeTruthy();
      expect(author.exists()).toBeTruthy();
      expect(name.exists()).toBeTruthy();
      expect(name.text()).toBe('评论作者名');
    });

    it(':avatar', () => {
      const wrapper = mount(() => (
        <Comment
          avatar="https://tdesign.gtimg.com/site/avatar.jpg"
          author="评论作者名"
          datetime="今天16:38"
          content="这里是评论者写的评论内容。"
        />
      ));
      const avatar = wrapper.find('.t-comment__avatar img');
      expect(avatar.exists()).toBeTruthy();
      expect(avatar.element.getAttribute('src')).toBe('https://tdesign.gtimg.com/site/avatar.jpg');
    });

    it(':content', () => {
      const wrapper = mount(() => (
        <Comment
          avatar="https://tdesign.gtimg.com/site/avatar.jpg"
          author="评论作者名"
          datetime="今天16:38"
          content="这里是评论者写的评论内容。"
        />
      ));
      const content = wrapper.find('.t-comment__detail');
      expect(content.exists()).toBeTruthy();
      expect(content.text()).toBe('这里是评论者写的评论内容。');
    });

    it(':datetime', () => {
      const wrapper = mount(() => (
        <Comment
          avatar="https://tdesign.gtimg.com/site/avatar.jpg"
          author="评论作者名"
          datetime="今天16:38"
          content="这里是评论者写的评论内容。"
        />
      ));
      const datetime = wrapper.find('.t-comment__author .t-comment__time');
      expect(datetime.exists()).toBeTruthy();
      expect(datetime.text()).toBe('今天16:38');
    });

    it(':quote', () => {
      const wrapper = mount(() => (
        <Comment
          avatar="https://tdesign.gtimg.com/site/avatar.jpg"
          author="评论作者名"
          datetime="今天16:38"
          content="这里是评论者写的评论内容。"
          quote="这是引用内容"
        />
      ));
      const quote = wrapper.find('.t-comment__quote');
      expect(quote.exists()).toBeTruthy();
      expect(quote.text()).toBe('这是引用内容');
    });

    it(':reply', () => {
      const wrapper = mount(() => (
        <Comment
          avatar="https://tdesign.gtimg.com/site/avatar.jpg"
          author="评论作者名"
          datetime="今天16:38"
          content="这里是评论者写的评论内容。"
          quote="这是引用内容"
          reply="这是回复内容"
        />
      ));
      const reply = wrapper.find('.t-comment__reply');
      expect(reply.exists()).toBeTruthy();
      expect(reply.text()).toBe('这是回复内容');
    });

    it(':actions', () => {
      const slots = {
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
      };
      const wrapper = mount(() => (
        <Comment
          avatar="https://tdesign.gtimg.com/site/avatar.jpg"
          author="评论作者名"
          datetime="今天16:38"
          content="这里是评论者写的评论内容。"
          v-slots={slots}
        />
      ));
      const actions = wrapper.find('.t-comment__actions');
      const texts = actions.findAll('.action-text');
      expect(actions.exists()).toBeTruthy();
      expect(actions.findComponent(ThumbUpIcon).exists()).toBeTruthy();
      expect(actions.findComponent(ChartIcon).exists()).toBeTruthy();
      expect(texts.length).toBe(2);
      expect(texts[0].text()).toBe('6');
      expect(texts[1].text()).toBe('回复');
    });
  });
});
