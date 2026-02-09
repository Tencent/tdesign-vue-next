import { mount } from '@vue/test-utils';
import { it, expect } from 'vitest';
import { ThumbUpIcon, ChartIcon } from 'tdesign-icons-vue-next';
import Comment from '@tdesign/components/comment';

const avatarUrl = 'https://tdesign.gtimg.com/site/avatar.jpg';

describe('Comment', () => {
  describe(':props', () => {
    // ==================== author ====================
    it(':author[string]', () => {
      const wrapper = mount(() => (
        <Comment avatar={avatarUrl} author="评论作者名" datetime="今天16:38" content="评论内容" />
      ));
      const name = wrapper.find('.t-comment__name');
      expect(name.exists()).toBeTruthy();
      expect(name.text()).toBe('评论作者名');
    });

    it(':author[function]', () => {
      const wrapper = mount(() => (
        <Comment avatar={avatarUrl} author={() => <span class="custom-author">自定义作者</span>} content="评论内容" />
      ));
      expect(wrapper.find('.custom-author').exists()).toBeTruthy();
      expect(wrapper.find('.custom-author').text()).toBe('自定义作者');
    });

    it(':author[slot]', () => {
      const wrapper = mount(() => (
        <Comment
          avatar={avatarUrl}
          content="评论内容"
          v-slots={{ author: () => <span class="slot-author">插槽作者</span> }}
        />
      ));
      expect(wrapper.find('.slot-author').exists()).toBeTruthy();
      expect(wrapper.find('.slot-author').text()).toBe('插槽作者');
    });

    // ==================== avatar ====================
    it(':avatar[string]', () => {
      const wrapper = mount(() => <Comment avatar={avatarUrl} content="评论内容" />);
      const avatarDom = wrapper.find('.t-comment__avatar');
      const img = avatarDom.find('img');
      expect(avatarDom.exists()).toBeTruthy();
      expect(img.exists()).toBeTruthy();
      expect(img.attributes('src')).toBe(avatarUrl);
      expect(img.classes('t-comment__avatar-image')).toBeTruthy();
    });

    it(':avatar[function] renders non-string avatar (TNode branch)', () => {
      const wrapper = mount(() => <Comment avatar={() => <div class="custom-avatar">头像</div>} content="评论内容" />);
      const avatarDom = wrapper.find('.t-comment__avatar');
      expect(avatarDom.exists()).toBeTruthy();
      // 非 string 走 else 分支，不应该渲染 img
      expect(avatarDom.find('img').exists()).toBeFalsy();
      expect(avatarDom.find('.custom-avatar').exists()).toBeTruthy();
    });

    it(':avatar[slot]', () => {
      const wrapper = mount(() => (
        <Comment content="评论内容" v-slots={{ avatar: () => <img class="slot-avatar" src={avatarUrl} /> }} />
      ));
      expect(wrapper.find('.t-comment__avatar').exists()).toBeTruthy();
      expect(wrapper.find('.slot-avatar').exists()).toBeTruthy();
    });

    it(':avatar not provided should not render avatar dom', () => {
      const wrapper = mount(() => <Comment content="评论内容" />);
      expect(wrapper.find('.t-comment__avatar').exists()).toBeFalsy();
    });

    // ==================== content ====================
    it(':content[string]', () => {
      const wrapper = mount(() => <Comment avatar={avatarUrl} content="这里是评论内容。" />);
      const detail = wrapper.find('.t-comment__detail');
      expect(detail.exists()).toBeTruthy();
      expect(detail.text()).toBe('这里是评论内容。');
    });

    it(':content[function]', () => {
      const wrapper = mount(() => (
        <Comment avatar={avatarUrl} content={() => <div class="custom-content">自定义内容</div>} />
      ));
      expect(wrapper.find('.custom-content').exists()).toBeTruthy();
      expect(wrapper.find('.custom-content').text()).toBe('自定义内容');
    });

    it(':content[slot]', () => {
      const wrapper = mount(() => (
        <Comment avatar={avatarUrl} v-slots={{ content: () => <div class="slot-content">插槽内容</div> }} />
      ));
      expect(wrapper.find('.slot-content').exists()).toBeTruthy();
      expect(wrapper.find('.slot-content').text()).toBe('插槽内容');
    });

    // ==================== datetime ====================
    it(':datetime[string]', () => {
      const wrapper = mount(() => <Comment avatar={avatarUrl} author="作者" datetime="今天16:38" content="内容" />);
      const time = wrapper.find('.t-comment__time');
      expect(time.exists()).toBeTruthy();
      expect(time.text()).toBe('今天16:38');
    });

    it(':datetime[function]', () => {
      const wrapper = mount(() => (
        <Comment
          avatar={avatarUrl}
          author="作者"
          datetime={() => <span class="custom-time">2024-01-01</span>}
          content="内容"
        />
      ));
      expect(wrapper.find('.custom-time').exists()).toBeTruthy();
      expect(wrapper.find('.custom-time').text()).toBe('2024-01-01');
    });

    it(':datetime[slot]', () => {
      const wrapper = mount(() => (
        <Comment
          avatar={avatarUrl}
          author="作者"
          content="内容"
          v-slots={{ datetime: () => <span class="slot-time">slot时间</span> }}
        />
      ));
      expect(wrapper.find('.slot-time').exists()).toBeTruthy();
    });

    // ==================== quote ====================
    it(':quote[string]', () => {
      const wrapper = mount(() => <Comment avatar={avatarUrl} content="内容" quote="这是引用内容" />);
      const quote = wrapper.find('.t-comment__quote');
      expect(quote.exists()).toBeTruthy();
      expect(quote.text()).toBe('这是引用内容');
    });

    it(':quote[function]', () => {
      const wrapper = mount(() => (
        <Comment
          avatar={avatarUrl}
          content="内容"
          quote={() => <blockquote class="custom-quote">自定义引用</blockquote>}
        />
      ));
      expect(wrapper.find('.custom-quote').exists()).toBeTruthy();
      expect(wrapper.find('.custom-quote').text()).toBe('自定义引用');
    });

    it(':quote[slot]', () => {
      const wrapper = mount(() => (
        <Comment
          avatar={avatarUrl}
          content="内容"
          v-slots={{ quote: () => <blockquote class="slot-quote">插槽引用</blockquote> }}
        />
      ));
      expect(wrapper.find('.slot-quote').exists()).toBeTruthy();
    });

    it(':quote not provided should not render quote dom', () => {
      const wrapper = mount(() => <Comment avatar={avatarUrl} content="内容" />);
      expect(wrapper.find('.t-comment__quote').exists()).toBeFalsy();
    });

    // ==================== reply ====================
    it(':reply[string]', () => {
      const wrapper = mount(() => <Comment avatar={avatarUrl} content="内容" reply="这是回复内容" />);
      const reply = wrapper.find('.t-comment__reply');
      expect(reply.exists()).toBeTruthy();
      expect(reply.text()).toBe('这是回复内容');
    });

    it(':reply[function]', () => {
      const wrapper = mount(() => (
        <Comment avatar={avatarUrl} content="内容" reply={() => <div class="custom-reply">自定义回复</div>} />
      ));
      expect(wrapper.find('.custom-reply').exists()).toBeTruthy();
      expect(wrapper.find('.custom-reply').text()).toBe('自定义回复');
    });

    it(':reply[slot]', () => {
      const wrapper = mount(() => (
        <Comment avatar={avatarUrl} content="内容" v-slots={{ reply: () => <div class="slot-reply">插槽回复</div> }} />
      ));
      expect(wrapper.find('.slot-reply').exists()).toBeTruthy();
    });

    it(':reply not provided should not render reply dom', () => {
      const wrapper = mount(() => <Comment avatar={avatarUrl} content="内容" />);
      expect(wrapper.find('.t-comment__reply').exists()).toBeFalsy();
    });

    // ==================== actions ====================
    it(':actions[slot]', () => {
      const wrapper = mount(() => (
        <Comment
          avatar={avatarUrl}
          content="内容"
          v-slots={{
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
          }}
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

    it(':actions not provided should not render actions dom', () => {
      const wrapper = mount(() => <Comment avatar={avatarUrl} content="内容" />);
      expect(wrapper.find('.t-comment__actions').exists()).toBeFalsy();
    });
  });

  describe('branch coverage', () => {
    it('should not render authorDatetimeDom when neither author nor datetime provided', () => {
      const wrapper = mount(() => <Comment content="内容" />);
      expect(wrapper.find('.t-comment__author').exists()).toBeFalsy();
      expect(wrapper.find('.t-comment__name').exists()).toBeFalsy();
      expect(wrapper.find('.t-comment__time').exists()).toBeFalsy();
    });

    it('should render only author without datetime', () => {
      const wrapper = mount(() => <Comment author="作者" content="内容" />);
      expect(wrapper.find('.t-comment__author').exists()).toBeTruthy();
      expect(wrapper.find('.t-comment__name').exists()).toBeTruthy();
      expect(wrapper.find('.t-comment__name').text()).toBe('作者');
      expect(wrapper.find('.t-comment__time').exists()).toBeFalsy();
    });

    it('should render only datetime without author', () => {
      const wrapper = mount(() => <Comment datetime="今天16:38" content="内容" />);
      expect(wrapper.find('.t-comment__author').exists()).toBeTruthy();
      expect(wrapper.find('.t-comment__name').exists()).toBeFalsy();
      expect(wrapper.find('.t-comment__time').exists()).toBeTruthy();
      expect(wrapper.find('.t-comment__time').text()).toBe('今天16:38');
    });

    it('should render minimal comment with only required content', () => {
      const wrapper = mount(() => <Comment />);
      const comment = wrapper.find('.t-comment');
      expect(comment.exists()).toBeTruthy();
      expect(wrapper.find('.t-comment__inner').exists()).toBeTruthy();
      expect(wrapper.find('.t-comment__avatar').exists()).toBeFalsy();
      expect(wrapper.find('.t-comment__author').exists()).toBeFalsy();
      expect(wrapper.find('.t-comment__quote').exists()).toBeFalsy();
      expect(wrapper.find('.t-comment__reply').exists()).toBeFalsy();
      expect(wrapper.find('.t-comment__actions').exists()).toBeFalsy();
    });

    it('should render all props together', () => {
      const wrapper = mount(() => (
        <Comment
          avatar={avatarUrl}
          author="作者"
          datetime="今天16:38"
          content="评论内容"
          quote="引用内容"
          reply="回复内容"
          v-slots={{
            actions: () => (
              <span>
                <ThumbUpIcon />
                <span class="action-text">点赞</span>
              </span>
            ),
          }}
        />
      ));
      expect(wrapper.find('.t-comment__avatar').exists()).toBeTruthy();
      expect(wrapper.find('.t-comment__name').text()).toBe('作者');
      expect(wrapper.find('.t-comment__time').text()).toBe('今天16:38');
      expect(wrapper.find('.t-comment__detail').text()).toBe('评论内容');
      expect(wrapper.find('.t-comment__quote').text()).toBe('引用内容');
      expect(wrapper.find('.t-comment__reply').text()).toBe('回复内容');
      expect(wrapper.find('.t-comment__actions').exists()).toBeTruthy();
    });

    it('actions with empty array should not render actions dom', () => {
      const wrapper = mount(() => <Comment content="内容" actions={[]} />);
      expect(wrapper.find('.t-comment__actions').exists()).toBeFalsy();
    });

    it('actions with Array<TNode> should render each action in a Button', () => {
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
      const wrapper = mount(() => <Comment content="内容" actions={actionList} />);
      const actions = wrapper.find('.t-comment__actions');
      expect(actions.exists()).toBeTruthy();
      // actions 中每个 action 应被包裹在 Button 中
      const buttons = actions.findAll('.t-button');
      expect(buttons.length).toBe(2);
      expect(actions.findComponent(ThumbUpIcon).exists()).toBeTruthy();
      expect(actions.findComponent(ChartIcon).exists()).toBeTruthy();
    });
  });
});
