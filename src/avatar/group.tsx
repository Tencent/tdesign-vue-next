import { defineComponent, provide, RendererNode } from 'vue';
import props from './avatar-group-props';
import Avatar from './avatar';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  name: 'TAvatarGroup',
  props,

  setup(props) {
    provide('avatarGroup', props);
    const renderTNodeJSX = useTNodeJSX();

    const AVATAR_NAME = usePrefixClass('avatar');
    const COMPONENT_NAME = usePrefixClass('avatar-group');

    const renderEllipsisAvatar = (children: Array<RendererNode>): Array<RendererNode> => {
      if (children?.length > props.max) {
        const content = getEllipsisContent(children);
        const outAvatar = children.slice(0, props.max);
        outAvatar.push(
          <Avatar class={`${AVATAR_NAME.value}__collapse`} size={props.size}>
            {content}
          </Avatar>,
        );
        return [outAvatar];
      }
      return [children];
    };

    // collapseAvatar
    const getEllipsisContent = (children: Array<RendererNode>) => {
      return renderTNodeJSX('collapseAvatar') || `+${children.length - props.max}`;
    };

    return () => {
      const children = renderTNodeJSX('default');
      const { cascading, max } = props;
      const groupClass = [
        `${COMPONENT_NAME.value}`,
        {
          [`${AVATAR_NAME.value}--offset-right`]: cascading === 'right-up',
          [`${AVATAR_NAME.value}--offset-left`]: cascading === 'left-up',
        },
      ];
      const content = max && max >= 0 ? [renderEllipsisAvatar(children)] : [children];

      return <div class={groupClass}>{content}</div>;
    };
  },
});
