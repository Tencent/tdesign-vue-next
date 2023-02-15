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

    const isIcon = () => renderTNodeJSX('collapseAvatar');

    const renderEllipsisAvatar = (children: Array<RendererNode>): Array<RendererNode> => {
      if (children?.length > props.max) {
        const content = setEllipsisContent(children);
        const outAvatar = children.slice(0, props.max);
        outAvatar.push(<Avatar size={props.size}>{content}</Avatar>);
        return [outAvatar];
      }
      return [children];
    };

    const setEllipsisContent = (children: Array<RendererNode>) => {
      if (!props.collapseAvatar) return `+${children.length - props.max}`;

      return isIcon() || renderContent('collapseAvatar', 'content');
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
