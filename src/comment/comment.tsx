import { defineComponent, computed } from 'vue';
import { prefix } from '../config';
import props from './props';
import { useTNodeJSX } from '../hooks/tnode';

const preName = `${prefix}-comment`;

export default defineComponent({
  name: 'TComment',
  props,
  slots: ['avatar', 'reply', 'author', 'datetime', 'content', 'quote', 'actions'],
  setup(props, { slots }) {
    const reply = props.reply ?? slots.reply?.();
    const author = props.author ?? slots.author?.();
    const datetime = props.datetime ?? slots.author?.();
    const quote = props.quote ?? slots.quote?.();
    const actions = props.actions ?? slots.actions?.();
    const content = props.content ?? slots.content?.();
    const avatar = props.avatar ?? slots.avatar?.();

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

    return () => (
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
