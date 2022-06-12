import { defineComponent, provide, RendererNode } from 'vue';
import props from './avatar-group-props';
import Avatar from './avatar';
import { useContent, useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  name: 'TAvatarGroup',
  props,

  setup(props) {
    provide('avatarGroup', props);
    const renderContent = useContent();
    const renderTNodeJSX = useTNodeJSX();

    const AVATAR_NAME = usePrefixClass('avatar');
    const COMPONENT_NAME = usePrefixClass('avatar-group');

    const isIcon = () => {
      const content = renderTNodeJSX('collapseAvatar');
      return content;
    };

    const renderIcon = () => {
      return isIcon() && typeof props.collapseAvatar !== 'string' ? props.collapseAvatar : null;
    };

    const renderEllipsisAvatar = (children: Array<RendererNode>): Array<RendererNode> => {
      if (children?.length > props.max) {
        const content = setEllipsisContent(children);
        const outAvatar = children.slice(0, props.max);
        outAvatar.push(
          <Avatar size={props.size} icon={renderIcon()}>
            {content}
          </Avatar>,
        );
        return [outAvatar];
      }
      return [children];
    };

    const setEllipsisContent = (children: Array<RendererNode>) => {
      let content = '';
      if (props.collapseAvatar) {
        if (!isIcon()) {
          content = renderContent('collapseAvatar', 'content');
        }
      } else {
        content = `+${children.length - props.max}`;
      }
      return content;
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
      let content = [children];

      if (max && max >= 0) {
        content = [renderEllipsisAvatar(children)];
      }
      return <div class={groupClass}>{content}</div>;
    };
  },
});
