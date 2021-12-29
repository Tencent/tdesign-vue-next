import { defineComponent } from 'vue';
import { prefix } from '../config';
import props from './props';

const preName = `${prefix}-comment`;

export default defineComponent({
  name: 'TComment',
  props,
  slots: ['avatar', 'reply', 'author', 'datetime', 'content', 'quote', 'actions'],
  setup(props, { slots }) {
    // slot precedence
    const avatar = slots.avatar?.() ?? props.avatar;
    const reply = slots.reply?.() ?? props.reply;
    const author = slots.author?.() ?? props.author;
    const datetime = slots.author?.() ?? props.datetime;
    const quote = slots.quote?.() ?? props.quote;
    const actions = slots.actions?.() ?? props.actions;
    const content = slots.content?.() ?? props.content;

    return () => {
      const showAuthorDatetime = author || datetime;

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

      const renderAuthorDatetime = showAuthorDatetime && (
        <div class={`${preName}__author`}>
          {author && <span class={`${preName}__name`}>{author}</span>}
          {datetime && <span class={`${preName}__time`}>{datetime}</span>}
        </div>
      );

      const renderQuote = quote ? <div class={`${preName}__quote`}>{quote}</div> : null;

      const renderAvatar = avatar ? (
        <div class={`${preName}__avatar`}>
          {typeof avatar === 'string' ? <img src={avatar} alt="" class={`${preName}__avatar-image`} /> : avatar}
        </div>
      ) : null;

      const renderReply = reply ? <div class={`${preName}__reply`}>{reply}</div> : null;

      const renderContent = (
        <div class={`${preName}__content`}>
          {renderAuthorDatetime}
          <div class={`${preName}__detail`}>{content}</div>
          {renderQuote}
          {renderActions()}
        </div>
      );

      return (
        <div class={preName}>
          <div class={`${preName}__inner`}>
            {renderAvatar}
            {renderContent}
          </div>
          {renderReply}
        </div>
      );
    };
  },
});
