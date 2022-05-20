import { ComponentPublicInstance, defineComponent, provide, reactive, toRefs } from 'vue';
import props from './avatar-group-props';
import { SlotReturnValue, TNodeReturnValue } from '../common';
import Avatar from './avatar';
import { renderContent, renderTNodeJSX } from '../utils/render-tnode';
import { usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  name: 'TAvatarGroup',
  components: {
    Avatar,
  },
  props,

  setup(props) {
    provide('avatarGroup', props);

    const AVATAR_NAME = usePrefixClass('avatar');
    const COMPONENT_NAME = usePrefixClass('avatar-group');

    const renderIcon = (context: ComponentPublicInstance) => {
      return isIcon(context) && typeof props.collapseAvatar !== 'string' ? props.collapseAvatar : null;
    };

    const renderEllipsisAvatar = (
      context: ComponentPublicInstance,
      children: Array<TNodeReturnValue>,
    ): Array<TNodeReturnValue> => {
      if (children?.length > props.max) {
        const content = setEllipsisContent(context, children);
        const outAvatar = children.slice(0, props.max);
        outAvatar.push(
          <Avatar size={props.size} icon={renderIcon(context)}>
            {content}
          </Avatar>,
        );
        return [outAvatar];
      }
      return [children];
    };

    const setEllipsisContent = (context: ComponentPublicInstance, children: Array<TNodeReturnValue>) => {
      let content = '';
      if (props.collapseAvatar) {
        if (!isIcon(context)) {
          content = renderContent(context, 'collapseAvatar', 'content');
        }
      } else {
        content = `+${children.length - props.max}`;
      }
      return content;
    };

    const isIcon = (context: ComponentPublicInstance) => {
      const content = renderTNodeJSX(context, 'collapseAvatar');
      return content;
    };

    return {
      AVATAR_NAME,
      COMPONENT_NAME,
      renderEllipsisAvatar,
      isIcon,
      setEllipsisContent,
    };
  },
  render() {
    const { AVATAR_NAME } = this;
    const children: TNodeReturnValue = renderTNodeJSX(this, 'default');
    const { cascading, max } = this.$props;
    const groupClass = [
      `${this.COMPONENT_NAME}`,
      {
        [`${AVATAR_NAME}--offset-right`]: cascading === 'right-up',
        [`${AVATAR_NAME}--offset-left`]: cascading === 'left-up',
      },
    ];
    let content = [children];

    if (max && max >= 0) {
      content = [this.renderEllipsisAvatar(this, children as SlotReturnValue[])];
    }
    return <div class={groupClass}>{content}</div>;
  },
});
