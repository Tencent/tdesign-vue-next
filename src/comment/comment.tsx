import { defineComponent, computed } from 'vue';
import { prefix } from '../config';
import props from './props';
import { renderTNodeJSX } from '../utils/render-tnode';

const preName = `${prefix}-comment`;

export default defineComponent({
  name: 'TComment',
  props,
  slots: ['avatar', 'reply', 'author', 'datetime', 'content', 'quote', 'actions'],
  render() {
    const reply = renderTNodeJSX(this, 'reply');
    const author = renderTNodeJSX(this, 'author');
    const datetime = renderTNodeJSX(this, 'datetime');
    const quote = renderTNodeJSX(this, 'quote');
    const actions = renderTNodeJSX(this, 'actions');
    const content = renderTNodeJSX(this, 'content');
    const avatar = renderTNodeJSX(this, 'avatar');
    const showAuthorDatetime = computed(() => author || datetime);

    const replyDom = reply ? <div class={`${preName}__reply`}>{reply}</div> : null;

    const quoteDom = quote ? <div class={`${preName}__quote`}>{quote}</div> : null;

    const avatarDom = avatar ? (
      <div class={`${preName}__avatar`}>
        {typeof avatar === 'string' ? <img src={avatar} alt="" class={`${preName}__avatar-image`} /> : avatar}
      </div>
    ) : null;

    const authorDatetimeDom = showAuthorDatetime.value && (
      <div class={`${preName}__author`}>
        {author && <span class={`${preName}__name`}>{author}</span>}
        {datetime && <span class={`${preName}__time`}>{datetime}</span>}
      </div>
    );

    const renderActions = () => {
      if (!actions || !actions.length) return null;

      return (
        <ul class={`${preName}__actions`}>
          {(Array.isArray(actions) ? actions : [actions]).map((action, index: number) => (
            <li key={`action-${index}`}>{action}</li>
          ))}
        </ul>
      );
    };

    const contentDom = (
      <div class={`${preName}__content`}>
        {authorDatetimeDom}
        <div class={`${preName}__detail`}>{content}</div>
        {quoteDom}
        {renderActions()}
      </div>
    );

    return (
      <div class={preName}>
        <div class={`${preName}__inner`}>
          {avatarDom}
          {contentDom}
        </div>
        {replyDom}
      </div>
    );
  },
});
