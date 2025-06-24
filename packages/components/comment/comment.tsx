import { defineComponent, computed } from 'vue';
import props from './props';

import { useTNodeJSX, usePrefixClass, useFlatChildrenSlots } from '@tdesign/shared-hooks';

import Button from '../button';
import { isString } from 'lodash-es';

export default defineComponent({
  name: 'TComment',
  props,
  setup() {
    const COMPONENT_NAME = usePrefixClass('comment');
    const renderTNodeJSX = useTNodeJSX();
    const getFlatChildren = useFlatChildrenSlots();

    return () => {
      const reply = renderTNodeJSX('reply');
      const author = renderTNodeJSX('author');
      const datetime = renderTNodeJSX('datetime');
      const quote = renderTNodeJSX('quote');
      const actions = renderTNodeJSX('actions');
      const content = renderTNodeJSX('content');
      const avatar = renderTNodeJSX('avatar');
      const showAuthorDatetime = computed(() => author || datetime);

      const replyDom = reply ? <div class={`${COMPONENT_NAME.value}__reply`}>{reply}</div> : null;

      const quoteDom = quote ? <div class={`${COMPONENT_NAME.value}__quote`}>{quote}</div> : null;

      const avatarDom = avatar ? (
        <div class={`${COMPONENT_NAME.value}__avatar`}>
          {isString(avatar) ? <img src={avatar} alt="" class={`${COMPONENT_NAME.value}__avatar-image`} /> : avatar}
        </div>
      ) : null;

      const authorDatetimeDom = showAuthorDatetime.value && (
        <div class={`${COMPONENT_NAME.value}__author`}>
          {author && <span class={`${COMPONENT_NAME.value}__name`}>{author}</span>}
          {datetime && <span class={`${COMPONENT_NAME.value}__time`}>{datetime}</span>}
        </div>
      );

      const renderActions = () => {
        if (!actions || !actions.length) return null;
        const flatChildren = getFlatChildren(actions);
        return (
          <div class={`${COMPONENT_NAME.value}__actions`}>
            {flatChildren.map((action, index) => (
              <Button key={`action-${index}`} size="small" variant="text">
                {action}
              </Button>
            ))}
          </div>
        );
      };

      const contentDom = (
        <div class={`${COMPONENT_NAME.value}__content`}>
          {authorDatetimeDom}
          <div class={`${COMPONENT_NAME.value}__detail`}>{content}</div>
          {quoteDom}
          {renderActions()}
        </div>
      );

      return (
        <div class={COMPONENT_NAME.value}>
          <div class={`${COMPONENT_NAME.value}__inner`}>
            {avatarDom}
            {contentDom}
          </div>
          {replyDom}
        </div>
      );
    };
  },
});
