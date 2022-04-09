import { defineComponent, computed } from 'vue';
import props from './props';
import { renderTNodeJSX } from '../utils/render-tnode';

import { usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  name: 'TComment',
  props,
  slots: ['avatar', 'reply', 'author', 'datetime', 'content', 'quote', 'actions'],
  setup() {
    const COMPONENT_NAME = usePrefixClass('comment');

    return {
      COMPONENT_NAME,
    };
  },
  render() {
    const { COMPONENT_NAME } = this;
    const reply = renderTNodeJSX(this, 'reply');
    const author = renderTNodeJSX(this, 'author');
    const datetime = renderTNodeJSX(this, 'datetime');
    const quote = renderTNodeJSX(this, 'quote');
    const actions = renderTNodeJSX(this, 'actions');
    const content = renderTNodeJSX(this, 'content');
    const avatar = renderTNodeJSX(this, 'avatar');
    const showAuthorDatetime = computed(() => author || datetime);

    const replyDom = reply ? <div class={`${COMPONENT_NAME}__reply`}>{reply}</div> : null;

    const quoteDom = quote ? <div class={`${COMPONENT_NAME}__quote`}>{quote}</div> : null;

    const avatarDom = avatar ? (
      <div class={`${COMPONENT_NAME}__avatar`}>
        {typeof avatar === 'string' ? <img src={avatar} alt="" class={`${COMPONENT_NAME}__avatar-image`} /> : avatar}
      </div>
    ) : null;

    const authorDatetimeDom = showAuthorDatetime.value && (
      <div class={`${COMPONENT_NAME}__author`}>
        {author && <span class={`${COMPONENT_NAME}__name`}>{author}</span>}
        {datetime && <span class={`${COMPONENT_NAME}__time`}>{datetime}</span>}
      </div>
    );

    const renderActions = () => {
      if (!actions || !actions.length) return null;

      return (
        <ul class={`${COMPONENT_NAME}__actions`}>
          {(Array.isArray(actions) ? actions : [actions]).map((action, index: number) => (
            <li key={`action-${index}`}>{action}</li>
          ))}
        </ul>
      );
    };

    const contentDom = (
      <div class={`${COMPONENT_NAME}__content`}>
        {authorDatetimeDom}
        <div class={`${COMPONENT_NAME}__detail`}>{content}</div>
        {quoteDom}
        {renderActions()}
      </div>
    );

    return (
      <div class={COMPONENT_NAME}>
        <div class={`${COMPONENT_NAME}__inner`}>
          {avatarDom}
          {contentDom}
        </div>
        {replyDom}
      </div>
    );
  },
});
